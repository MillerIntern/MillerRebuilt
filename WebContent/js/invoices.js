/*
Order of functions being called in order to maintain consistency
1. getAllProjects() - this is called form invoices.html file to fetch all the projects
2. approvingMembers() - This it so fetch the list of approving members and all the users who can be approving members
3. getInvs(1) - function to fetch the invoices
4. fetchApprovalsAll() - fetch all the invoice approval details
5. fetchCustomerEmails()- This is to fetch the emails of customer group
6. 
7. 

*/

var invs; //??
var invApprovals; //??
var userType; //??
var noOfApprovals; //??
var customerEmails //??
var approvingMembers; //??
var name; // Currently logged in USER
var userApprovalIndex; //??
var invoiceInformation; //??
var specificProjectInformation; //??

//this runs upon loading of all the page - but for what figure it out
$(document).ready(function(){
	
	//This by default opens the Invoice Queue tab within the Invoice Queue Module
	document.getElementById("defaultOpen").click();

	
	//???
	$('.addmore').on('click', function() {
        $(".mytemplate").clone().removeClass("mytemplate").show().appendTo(".dates");
    });
	
	//Enables the date picker - should we even need a date picker - because all we are doing here is read only or autopopulated dates
    $(document).on("focus", ".datepicker", function(){
        $(this).datepicker();
    });
    
    
    //??? - why do we need this?
    fetchNoOfApprovals();
    
});


//gets list of invoices for project

/*
 *Gets the list of invoices to be loaded on the screen
 *Stores that information in the invs variable
 *Every time a save or a reload happens, this gets triggered 
 */
function getInvs(stopServerCalls) {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectInvs',
			'id': -1
		}, success: function (data) {
			invs = data;
			
			//This puts the latest Requested Date Invoice at the top
			function sortBySubmittedDate(a, b) {
			    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
			}

			invs.sort(sortBySubmittedDate);
			
			
			
			if (data) {
				clearInvoiceTable();				
				name = getJavaScriptCookie("name");
				//fetchCustomerEmails(); //?? - do we even need this now?								
//				fillInvsTable();
				fillInvsTableAG(); //123AG
			}
			if(!stopServerCalls) getUserData();

		}, error: function (data) {
			alert('Server Error!10 INVOICES');
		}
	});	
}

let projects; //???
let RETRIEVED_PROJECTS; //???
let lengthProjects; //???


/*
 * This retrieves all the projects from the PROJECT table.
 * ??? - why do we even need this?
 * ???  -from where is this being called.
 */
function getAllProjects() {
	
	userType = getJavaScriptCookie("usertype"); //From the cookies, stores the type of the user. Admin or superadmin etc
	t0 = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getAllProjects'
		}, success: function (data) {
			projects = data;
			RETRIEVED_PROJECTS = JSON.parse(projects['projects']);
			lengthProjects = RETRIEVED_PROJECTS.length;
			establishRetrievedProjects();
			if(RETRIEVED_PROJECTS) console.log("getAllProjects() - PROJECTS HAVE BEEN RETRIEVED");
			t1 = new Date().getTime();
//			console.log('took: ' + (t1 - t0) + 'ms');
//			console.log("PROJECTS ARE : ", RETRIEVED_PROJECTS);
			//getSearchCriteria();
			
			//fetchApprovalsAll();
								
			//fillInvsTable(data);
			
			approvingMembers();
			
			//getInvs(1);
		}
	});
}


function establishRetrievedProjects()
{
	
	
	for(var i = 0; i < RETRIEVED_PROJECTS.length; i++){
		RETRIEVED_PROJECTS[i].id = RETRIEVED_PROJECTS[i][0];
		RETRIEVED_PROJECTS[i].McsNumber = RETRIEVED_PROJECTS[i][1];
		RETRIEVED_PROJECTS[i].projectItem = RETRIEVED_PROJECTS[i][2];
		RETRIEVED_PROJECTS[i].projectType = RETRIEVED_PROJECTS[i][3];
		RETRIEVED_PROJECTS[i].stage = RETRIEVED_PROJECTS[i][4];
		RETRIEVED_PROJECTS[i].status = RETRIEVED_PROJECTS[i][5];
		RETRIEVED_PROJECTS[i].warehouse = RETRIEVED_PROJECTS[i][6];
		RETRIEVED_PROJECTS[i].projectManagers = RETRIEVED_PROJECTS[i][7];
		RETRIEVED_PROJECTS[i].projectClass = RETRIEVED_PROJECTS[i][8];
		RETRIEVED_PROJECTS[i].mediumScore = RETRIEVED_PROJECTS[i][9];
		if(RETRIEVED_PROJECTS[i][10]!=null)
			RETRIEVED_PROJECTS[i].scheduledStartDate = RETRIEVED_PROJECTS[i][10];
		else
			RETRIEVED_PROJECTS[i].scheduledStartDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][11]!=null)
			RETRIEVED_PROJECTS[i].scheduledTurnover = RETRIEVED_PROJECTS[i][11];
		else
			RETRIEVED_PROJECTS[i].scheduledTurnover = "Unavailable";
		
		
		
		if(RETRIEVED_PROJECTS[i][12]!=null)
			RETRIEVED_PROJECTS[i].budgetaryDueDate = RETRIEVED_PROJECTS[i][12];
		else
			RETRIEVED_PROJECTS[i].budgetaryDueDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][13]!=null)
			RETRIEVED_PROJECTS[i].budgetarySubmittedDate = RETRIEVED_PROJECTS[i][13];
		else
			RETRIEVED_PROJECTS[i].budgetarySubmittedDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][14]!=null)
			RETRIEVED_PROJECTS[i].proposalDueDate = RETRIEVED_PROJECTS[i][14];
		else
			RETRIEVED_PROJECTS[i].proposalDueDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][15]!=null)
			RETRIEVED_PROJECTS[i].proposalSubmittedDate = RETRIEVED_PROJECTS[i][15];
		else
			RETRIEVED_PROJECTS[i].proposalSubmittedDate = "Unavailable";	
		
		if(RETRIEVED_PROJECTS[i][16]!=null)
			RETRIEVED_PROJECTS[i].keyStatus = RETRIEVED_PROJECTS[i][16];
		else
			RETRIEVED_PROJECTS[i].keyStatus = "     ----------     ";		
		
		if(RETRIEVED_PROJECTS[i][17]!=null)
			RETRIEVED_PROJECTS[i].proposalScopeDate = RETRIEVED_PROJECTS[i][17];
		else
			RETRIEVED_PROJECTS[i].proposalScopeDate = "Unavailable";
		
		if(RETRIEVED_PROJECTS[i][18]!=null)
			RETRIEVED_PROJECTS[i].draftScheduleDate = RETRIEVED_PROJECTS[i][18];
		else
			RETRIEVED_PROJECTS[i].draftScheduleDate = "Unavailable";
		
		
		
		for(var q = 0; q < 9; q++){
			var num = 8 - q;
			RETRIEVED_PROJECTS[i].splice(num, 1);
		}
	}
}


//This enables the user to filter invoices based off status
$(document).on('change', '#invoiceSelector2', function () {	
	
	clearInvoiceTable(); // Why do we need this call here, because fillInvsTable already calls this internally
//	fillInvsTable(invs); //Need to change this to AG as well
	fillInvsTableAG(invs);
});


//set the color of icons based on the availability of file of the invoice

function getFilteredInvoices(selector, invs){
	var filteredInvs = invs;
	
	var invStatusMapping = {
			"requested": "Requested",
			"processing": "Processing",
			"review": "Review",
			"approved": "Approved",
			"submitted": "Submitted",
			"rejected": "Rejected",
			
	}
	
	filteredInvs = invs.filter(function(item) {		
		if(selector == 'all' || item.invoiceStatus == invStatusMapping[selector])
			{
			return item
			}
	})
	
	return filteredInvs;
	
	
	
	//Get filtered Invoice list - probably need a function
}


// Add an event listener to each checkbox
document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('#invoiceFilter input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            handleCheckboxChange(checkbox);
        });
    });
});

// Handle the checkbox change
function handleCheckboxChange(changedCheckbox) {
	
	var checkboxes = document.querySelectorAll('#invoiceFilter input[type="checkbox"]');
	var dropdown = document.getElementById('invoiceSelector2');
	
    // If the "All" checkbox was checked
    if (changedCheckbox.value == "all" && changedCheckbox.checked) {
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = true;
        });
        
        // Enable the dropdown if 'All' is checked
        dropdown.disabled = !changedCheckbox.checked;
    } 
    // If the "All" checkbox was unchecked
    else if (changedCheckbox.value == "all" && !changedCheckbox.checked) {
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
    } 
    // If any other checkbox was unchecked
    else if (!changedCheckbox.checked) {
        document.querySelector('#invoiceFilter input[value="all"]').checked = false;
    }
    // If all other checkboxes are checked manually, check the "All" checkbox
    else {
        var allChecked = true;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.value !== "all" && !checkbox.checked) {
                allChecked = false;
            }
        });
        if (allChecked) {
            document.querySelector('#invoiceFilter input[value="all"]').checked = true;
        }
    }
    
    fillInvsTableAG(invs);
    
    // Here, you would call your function to filter the invoices based on selected checkboxes
    // var filteredInvs = getFilteredInvoices(getSelectedStatuses(), invs);
    // Then, render your filteredInvs as needed
}


function getSelectedStatuses() {
    // Get all checkboxes inside the div with the ID "invoiceFilter"
    var checkboxes = document.querySelectorAll('#invoiceFilter input[type="checkbox"]');
    var selectedStatuses = [];

    // Loop through each checkbox to see if it's checked
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedStatuses.push(checkboxes[i].value);
        }
    }

    return selectedStatuses; // This will return an array of selected statuses
}


// New function to filter invoices by select and checkboxes
function getFilteredInvoicesSD(selectedStatuses, invs, source){
    var invStatusMapping = {
        "requested": "Requested",
        "processing": "Processing",
        "review": "Review",
        "approved": "Approved",
        "submitted": "Submitted",
        "rejected": "Rejected"
    };
    
    //alert(selectedStatuses);

    if (source === "dropdown") {
        if (selectedStatuses[0] === "all") {
            return invs;
        }
        return invs.filter(function(item) {
            return item.invoiceStatus === invStatusMapping[selectedStatuses[0]];
        });
    }

    if (source === "checkbox") {
        if (selectedStatuses.length === 0) {
            return invs;  // return all invoices if no checkboxes are selected
        }
        return invs.filter(function(item) {
            // Check if the invoice's status matches any of the selected statuses
            return selectedStatuses.includes(item.invoiceStatus.toLowerCase());
        });
    }
}


function fillInvsTableAG(){
	let selector = $('#invoiceSelector2').val();
	clearInvoiceTable();
	
	
	//'var filteredInvs = getFilteredInvoices(selector,invs);
	
	// Adding checkbox functionality
	var checkboxes = document.querySelectorAll('#invoiceFilter input[type="checkbox"]');
    var allCheckbox = document.querySelector('#invoiceFilter input[value="all"]');
    var dropdown = document.getElementById('invoiceSelector2');
    
    var selectedStatuses = [];  // Array to store statuses selected via checkboxes
    

	checkboxes.forEach(function(checkbox) {
        if (checkbox.checked && checkbox.value !== "all") {
            selectedStatuses.push(checkbox.value);
            isCheckboxUsed = true;
        }
    });
    
    
    var isCheckboxUsed = !allCheckbox.checked; // If 'All' is unchecked, checkboxes are being used for filtering
    console.log(isCheckboxUsed);
    
    if (isCheckboxUsed) {
        // If checkboxes are used for filtering, use the getFilteredInvoicesSD function with selectedStatuses
        var filteredInvs = getFilteredInvoicesSD(selectedStatuses, invs, "checkbox");
        
        // Disable the dropdown and set its value to 'all' when checkboxes are used
        dropdown.disabled = true;
        dropdown.value = 'all';
    } else {
        // If dropdown is used for filtering, use the getFilteredInvoicesSD function with selected value from dropdown
        var statusFromDropdown = [document.getElementById('invoiceSelector2').value];
        var filteredInvs = getFilteredInvoicesSD(statusFromDropdown, invs, "dropdown");
    }
	
		
	if(filteredInvs.length == 0){
		clearAndAddSingleRowInvs("No Invoices to Show");		
	}
	//Then loop through the filtered invoice list
	for (var i = 0; i < filteredInvs.length; i++) {
		var inv = filteredInvs[i];
		fillInvoiceListView(inv);		
	}
	
	
	//Preview Button Login
	var previewIcon = document.getElementById('previewInvoice');
	previewIcon.onclick = function(){									
		var invoiceFileName = invoiceInformation.invoiceFileName;			
		openInvoice(invoiceFileName.toString());
	}
	
	
	//Upload a new file logic
	var uploadButton = document.getElementById('uploadInvoiceFile');
	uploadButton.onclick = function(){
		
		var pdf = document.getElementById("filepdf");
		pdf.accept = ".pdf";
		pdf.click();
		
		
		pdf.onchange = function() {								
			
			var mcsNumber = specificProjectInformation.McsNumber.toString();
			var peNumber = invoiceInformation.peInvNum.toString();
			
			//Call a function to actually upload it to server
			
			var newFileName = 'mcs_'+mcsNumber+'_'+peNumber;			
			uploadInvoiceSD(newFileName);			
			//Call a function to set the InvoiceFileName in the database
			setInvoiceFileName(invoiceInformation.id.toString(), newFileName);
			invoiceInformation.invoiceFileName = newFileName;
			invoiceFileName.innerHTML = invoiceInformation.invoiceFileName;
			var preview = document.getElementById('previewInvoice');
			preview.style.display = '';
		}
		
	}
	
	//Cancel Invoice Notes logic
	var closeInvoiceNotes = document.getElementById('closeInvoiceModal');
	closeInvoiceNotes.onclick = function(){
		var modal = document.getElementById("notesModal");
		modal.style.display = "none";
	}
	
	
	//Save Invoice Notes logic
	var saveInvoiceNotes = document.getElementById('saveInvoiceNotes');
	saveInvoiceNotes.onclick = function(){
		
		
		var incorrectAmount = document.getElementById('incorrectAmount');
		var incorrectCustomer = document.getElementById('incorrectCustomer');
		var customerRejected = document.getElementById('customerRejected');
		var incompleteWork = document.getElementById('incompleteWork');
		var invoiceNotes = document.getElementById('invoiceNotes');
		var currInvoice = document.getElementById('invoiceNoteId').value;
		
		//alert(currInvoice);
		
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {

				'action': 'updateInvoiceNotes',
				'currInvoice':currInvoice,
				'incorrectAmount': incorrectAmount.checked,
				'incorrectCustomer': incorrectCustomer.checked,
				'customerRejected': customerRejected.checked,
				'incompleteWork': incompleteWork.checked,
				'invoiceNotes': invoiceNotes.value,					
				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);

				if (response === 'UPDATED_INVOICE_FROM_QUEUE') {}
				alert('Invoice Notes Updated Successfully');
				
				
				var curNoteIcon = document.getElementById('notes_'+currInvoice);
				
				
				if(incompleteWork.checked || incorrectAmount.checked || incorrectCustomer.checked || customerRejected.checked)
					curNoteIcon.src = "icons/notes_red.png";
				else if(invoiceNotes.value)
					curNoteIcon.src = "icons/notes_green.png";
				else
					curNoteIcon.src = "icons/notes.png";
				
				var btn = document.getElementById('btn_Inv_'+currInvoice);
				
				rejectionNotesJSON = {
						'incorrectAmount': incorrectAmount.checked,
						'incorrectCustomer': incorrectCustomer.checked,
						'customerRejected': customerRejected.checked,
						'incompleteWork': incompleteWork.checked	
				};

				var invStatus = document.getElementById('invoiceStatus_Inv_'+currInvoice)
				var invListing = document.getElementById('Inv_'+currInvoice);
				
				
				btn.onclick = function() {
					saveInvoiceAG(rejectionNotesJSON, currInvoice, invStatus, invListing);					
				};
				
			}
			});
		
		
		
		
		var modal = document.getElementById("notesModal");
		modal.style.display = "none";
	}
	
	
}


function fillInvoiceListView(inv){
	var invListing = document.createElement('tr');
	invListing.setAttribute("value", inv);
	invListing.value = inv.id;
	invListing.id = "Inv_" + inv.id;
	


	//This piece of code can be improved post MVP
	var invProject;
	for(var j = 0; j < lengthProjects; j++){
		if(RETRIEVED_PROJECTS[j].id == inv.invoice_id){
			invProject = RETRIEVED_PROJECTS[j];
		}
	}

	
	var invWarehouse = invProject.warehouse;
	var invLocation = invWarehouse.city.name + ' ' +invWarehouse.warehouseID;
	var invProjName = invProject.projectItem.name;
	var invMCSPE  = invProject.McsNumber + ' ' +inv.peInvNum;
	var invAmount = cleanNumericValueForDisplaying(inv.invoiceAmount);
	var invStatus = inv.invoiceStatus;
	var invoiceFileName = inv.invoiceFileName;
	var invRequestedDate = inv.submittedDate;
	var invCompletedDate = inv.completedDate;
	
	
	//Define the Table Columns
	let invoiceCustomer = document.createElement('td');	
	let invoiceLocation = document.createElement('td');
	let invoiceProject = document.createElement('td');
	let invoiceMCSPE = document.createElement('td');
	let invoiceAmount = document.createElement('td');
	let invoiceStatus = generateInvoiceStatusDropdown(invStatus, invListing);
	
	
	let invoiceReqDate = document.createElement('td');
	let invoiceCompDate = document.createElement('td');
	let invoicePdf = document.createElement('td');
	let invoiceNotes = document.createElement('td');
	let invoiceSubmitBtn = document.createElement('td');
	
	let invoiceCheckSubmit = document.createElement("td");

	
	
	//Populate the table columns
	invoiceCustomer.innerHTML = inv.invoiceCustomer;
	invoiceLocation.innerHTML = invLocation;
	invoiceProject.innerHTML = invProjName;
	invoiceMCSPE.innerHTML = invMCSPE;
	invoiceAmount.innerHTML = invAmount;
	invoiceReqDate.innerHTML = invRequestedDate;
	invoiceCompDate.innerHTML = invCompletedDate ? invCompletedDate : '';
	//invoiceNotes.innerHTML = inv.notes;
	
	
	invListing.appendChild(invoiceCustomer);
	invListing.appendChild(invoiceLocation);
	invListing.appendChild(invoiceProject);
	invListing.appendChild(invoiceMCSPE);
	invListing.appendChild(invoiceAmount);
	invListing.appendChild(invoiceStatus);
	invListing.appendChild(invoiceReqDate);
	invListing.appendChild(invoiceCompDate);
//	invListing.appendChild(invoiceNotes);
	
	let notesIcon = generateNotesIcon(inv, invListing);

	
	let invIcon = generateInvoiceIcon(invStatus, invListing, invoiceFileName);
	
	//call function to display div on mouse hover
	invIcon.onmouseover = function(){
		displayApprovals(invIcon.id.split('_').pop());		
	}
	
	//call function on mouse not hover to hide div
	invIcon.onmouseleave = function() {
		hideApprovals(invIcon.id.split('_').pop());
	}
	
	
	let approvalsHover = document.createElement("div");
	approvalsHover.id = "approvals_" + invListing.value;
	approvalsHover.style.backgroundColor = "#cfcbca";
	approvalsHover.style.display = "none";
	approvalsHover.style.position = "absolute";
	approvalsHover.style.border = "1px solid #ccc";
    approvalsHover.style.border = "2px solid black";
    approvalsHover.style.margin.top = "-5em";
    approvalsHover.style.margin.left = "-5em";
	
	invoicePdf.appendChild(approvalsHover);
	invoicePdf.appendChild(invIcon);
	invListing.appendChild(invoicePdf);
	
	invoiceNotes.appendChild(notesIcon);
	invListing.appendChild(invoiceNotes);
	
	//Save invoice functionality - two reasons
	//1. Save the attachment
	//2. Save the Status of the invoice, as in who approved or not.
	let btn = document.createElement('button');
	btn.style = "color:white; background-color : #039c0a; border:#014704; border-radius: 3px;";
	btn.class = "btn btn-success";
	btn.id = "btn_" + invListing.id;
	btn.innerHTML = "Save";
	
	
	//Save Button Beginning
	var rejectionNotesJSON = {
			'incorrectAmount': inv.incorrectAmount,
			'incorrectCustomer': inv.incorrectCustomer,
			'customerRejected': inv.customerRejected,
			'incompleteWork': inv.incompleteWork	
	};
	
	btn.onclick = function() {		
		
		saveInvoiceAG(rejectionNotesJSON, inv.id, invStatus, invListing);
		//editSelectedInvBtn(this.id.split('_').pop());
	};

	
	invoiceSubmitBtn.appendChild(btn);
	invListing.appendChild(invoiceSubmitBtn);
//	if(inv.invoiceStatus == 'Submitted'){	
//		invoiceSubmitBtn.style.disabled = "true";
//	}
	
	
	
	$('#invoiceTable > tbody').append(invListing);
	
	//finally add the approvals
	addApproval(inv.invoiceID, invListing.value);
	
	
}

function saveInvoiceAG(rejectionNotesJSON, invID, invStatus, invListing){
	
	var invStatusPrev = invStatus;
	invStatus = document.getElementById('invoiceStatus_Inv_'+invListing.value).value;
	var mandatoryNote = false;
	if(rejectionNotesJSON.incorrectAmount || rejectionNotesJSON.incorrectCustomer || rejectionNotesJSON.customerRejected || rejectionNotesJSON.incompleteWork)
		mandatoryNote = true;	
	
	var rejectConfirm = false;
	if(invStatus == 'Rejected'){
		if(mandatoryNote == false){
			alert("Please add a Rejection Reason before rejecting the invoice");
		}
		else{
			rejectConfirm = confirm("Rejecting the invoice, will reset all the approvals back to Review");
			$('#invoiceCreationZone').hide();
			$('#invoiceDisplay').show();
			clearInvoiceTable();
			fetchApprovalsAll();
		}
	}
	
	
	if(invStatus != 'Rejected' || rejectConfirm == true){
		

		if(invStatusPrev != invStatus){
			//Need to update the completed date
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			
			//Need to update the notes
			
			
			//Now make the call to update the Notes, Completed date, and invoice status 
			
			$.ajax({
				type: 'POST',
				url: 'Project',
				data: {

					'action': 'updateFromInvoiceQueue',
					'currInvoice':invID,
					'completedDate': today,
					'invoiceStatus': invStatus,					
					//'notes' : notes,
				}, complete: function (serverResponse) {
					console.log(serverResponse);
					let response = $.trim(serverResponse.responseText);
//					alert(response);
					if (response === 'UPDATED_INVOICE_FROM_QUEUE') {
						if(invStatus == 'Approved'){
							//Step 1 - update the associated approval record only if status changes to Approved
							//This internally is setting the status to approved if all are approved
							$.ajax({
								type: 'POST',
								url: 'UpdateApprovals', 
								data: {

									'action': 'updateInvoiceApprovalsAG',
									'id': invID,
									'approvalStatus' : 'Approved',
									'userApprovalIndex' : userApprovalIndex

								}, complete: function (serverResponse) {
									console.log(serverResponse);
									let response = $.trim(serverResponse.responseText);
									if (response === 'UPDATED_APPROVALS') {
										alert('Invoice Updated Successfully');
										
										$('#invoiceCreationZone').hide();
										$('#invoiceDisplay').show();
										clearInvoiceTable();
										fetchApprovalsAll();
									}
								}
							});
						}
						
						else if(invStatus == 'Rejected'){ //Need to function this at a later time
							//Step 5- if the state changes from review to Rejected
							//Then WHAT TO DO? - Keep the notes, clear the approvals and the approval dates, reset it back to processing

							//1. Clear the approvals - need a confirmation box saying that this will clear the approvals - please complete notes
							//clearInvoiceApprovalsAG
							$.ajax({
								type: 'POST',
								url: 'UpdateApprovals', 
								data: {

									'action': 'clearInvoiceApprovalsAG',
									'id': invID,
									'userApprovalIndex' : userApprovalIndex

								}, complete: function (serverResponse) {
									console.log(serverResponse);
									let response = $.trim(serverResponse.responseText);
									if (response === 'UPDATED_APPROVALS') {
										alert('Invoice Approvals Cleared Successfully');
										
										$('#invoiceCreationZone').hide();
										$('#invoiceDisplay').show();
										clearInvoiceTable();
										fetchApprovalsAll();
									}
								}
							});
							
							
							//2. Future - Reset the state to processing - update date
							
						}
						
						else{
							alert('Invoice Updated Successfully');
							//Makes the user return to the invoice screen 
							
							$('#invoiceCreationZone').hide();
							$('#invoiceDisplay').show();
							clearInvoiceTable();
							fetchApprovalsAll();
						}
					}
				}
			});
		}
	}
}
	


function generateInvoiceStatusDropdown(invStatus,invListing){
	
	//adding dropdown in the status
	let invoiceStatus = document.createElement('td');
	
	let selectStatus = document.createElement("select");
	selectStatus.id = "invoiceStatus_" + invListing.id;

	
	var opt = document.createElement("Option");
	opt.value = "Requested";
	opt.textContent = "Requested";
	selectStatus.appendChild(opt);
	//invoiceStatus.appendChild(opt);
//	var opt2 = document.createElement("Option");
//	opt2.value = "Processing";
//	opt2.textContent = "Processing";
//	selectStatus.appendChild(opt2)
	var opt3 = document.createElement("Option");
	opt3.value = "Review";
	opt3.textContent = "Review";
	selectStatus.appendChild(opt3);
	var opt4 = document.createElement("Option");
	opt4.value = "Approved";
	opt4.textContent = "Approved";
	selectStatus.appendChild(opt4);
	var opt5 = document.createElement("Option");
	opt5.value = "Submitted";
	opt5.textContent = "Submitted";
	selectStatus.appendChild(opt5);
	var opt6 = document.createElement("Option");
	opt6.value = "Rejected";
	opt6.textContent = "Rejected";
	selectStatus.appendChild(opt6);
	
	selectStatus.value = invStatus;
	invoiceStatus.appendChild(selectStatus);
	
	
	//Need to encapsulate this in a function
	let userInApprovers = 0;
	for(let a = 0; a < noOfApprovals; a++){
		if(name.toLowerCase() == approvingMembers[0][a].name.toLowerCase()){
			userApprovalIndex = a;
			userInApprovers = 1;
		}
	}
	
	
	//Need better conditions here
	if(userType == "basic"){
		selectStatus.disabled = true;
	}
	
	
	if(userInApprovers == 0) {
		selectStatus.disabled = true;
	}
	
	
	// Temporarily enabling the dropdown for Tracy
	//if(name == 'tracy' && selectStatus.value == 'Requested'){
	if(name == 'tracy'){
		selectStatus.disabled = false;
		/*selectStatus.remove(2);
		selectStatus.remove(2);
		selectStatus.remove(2);*/
	}
	
	/*if(name == 'tracy' && selectStatus.value == 'Approved'){
		selectStatus.disabled = false;
		selectStatus.remove(0);
		selectStatus.remove(0);
		selectStatus.remove(2);
	}*/
	
	return invoiceStatus;
}



function generateNotesIcon(invoiceInformation, invListing){
	
	let notesIcon = document.createElement('img');
	notesIcon.id = "notes_" + invListing.value;
	if(invoiceInformation.incompleteWork || invoiceInformation.incorrectAmount || invoiceInformation.incorrectCustomer || invoiceInformation.customerRejected)
		notesIcon.src = "icons/notes_red.png";
	else if(invoiceInformation.notes)
		notesIcon.src = "icons/notes_green.png";
	else
		notesIcon.src = "icons/notes.png";
	notesIcon.width = "22";
	notesIcon.height = "22";
	
	
	//edit notes modal box
	let notesEdit = document.createElement("div");
	notesEdit.id = "edit_notes_" + invListing.value;
	notesEdit.style.backgroundColor = "white";
	notesEdit.style.position = "absolute";
	notesEdit.style.float = "Left";
	notesEdit.style.overflow = "auto";
	notesEdit.style.right = "150px";
	notesEdit.style.borderRadius = "5px";
	notesEdit.style.width = "210px";
	notesEdit.style.height = "200px";
	notesEdit.style.display = "none";
	notesEdit.style.border = "1px solid blue";
    notesEdit.style.border = "2px solid black";
    notesEdit.style.margin.top = "-5em";
    notesEdit.style.margin.left = "-5em";
    notesEdit.style.padding = "3px";
	
	
	notesIcon.onclick = function() {
		
		var id = this.id;
		id = id.split('_').pop();
		
		invoiceInformation = getInvoiceInformation(id);		
		
		document.getElementById("invoiceNoteId").value = id;
		
		var incorrectAmount = document.getElementById('incorrectAmount');
		var incorrectCustomer = document.getElementById('incorrectCustomer');
		var customerRejected = document.getElementById('customerRejected');
		var incompleteWork = document.getElementById('incompleteWork');
		var invoiceNotes = document.getElementById('invoiceNotes');
		
		incorrectAmount.checked = invoiceInformation.incorrectAmount;
		incorrectCustomer.checked = invoiceInformation.incorrectCustomer;
		customerRejected.checked = invoiceInformation.customerRejected;
		incompleteWork.checked = invoiceInformation.incompleteWork;
		invoiceNotes.value = invoiceInformation.notes;
		
		var modal = document.getElementById("notesModal");
		modal.style.display = "block";
		
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("closeAGNotes")[0];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
		
	}
	
	return notesIcon;
}

//Generated the html content for an image
//Contains the onclick functionality of the invoice icon as well
//Returns the same
function generateInvoiceIcon(invStatus, invListing, invoiceFileName){
	
	
	
	let invIcon = document.createElement('img');
	invIcon.id = "inv_att_" + invListing.value;
	invIcon.src = "icons/invattachment.png";
	invIcon.width = "22";
	invIcon.height = "22";
	
	
	if(invoiceFileName == '' || invoiceFileName == undefined || invoiceFileName == null){
		invIcon.src =  "icons/grey_pdf.png";
	}
	
	else{
		switch(invStatus){
		case "Submitted":
			invIcon.src = "icons/green_pdf.png";
			break;
		case "Approved":
			invIcon.src = "icons/green_pdf.png";
			break;
		case "Rejected":
			invIcon.src = "icons/red_pdf.png";
			break;
		case "Review":
			invIcon.src = "icons/yellow_pdf.png";
			break;
		case "Requested":
			invIcon.src = "icons/yellow_pdf.png";
			break;
		default:
		}
	}
	

	
	//Invoice Icon On click logic
	invIcon.onclick = function(){
		
		var preview = document.getElementById('previewInvoice');
		preview.style.display = '';
		var invoiceFileName = document.getElementById('invoiceFileName')
		
		var id = this.id;
		id = id.split('_').pop();
		invoiceInformation = getInvoiceInformation(id);		
		specificProjectInformation = getProjectInformation(invoiceInformation.invoice_id)[0]; 	
		if(invoiceInformation.invoiceFileName){
			invoiceFileName.innerHTML = invoiceInformation.invoiceFileName;	
		}
		else{
			invoiceFileName.innerHTML = "Please attach a new file";
			var preview = document.getElementById('previewInvoice');
			preview.style.display = 'none';		
		}
		
		var modal = document.getElementById("myModalAG");
		modal.style.display = "block";
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("closeAG")[0];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
	}
	
	return invIcon;
}




//fills invoice table 
/*
 * This function alone has more that thousand lines, segregate it and reduce it
 * Find your own logic for approval piece, coloring etc.
 * 
 * */


function fillInvsTable() {
	
	let selector = $('#invoiceSelector2').val();	
		
	clearInvoiceTable();
	//let invs = data;
	let count = 0;
	
	//shows invoices based on filter selection
	mainLoop:
	for (var i = 0; i < invs.length; i++) {
		if(	(selector == 'all' && (invs[i].invoiceStatus != "Requested" && invs[i].invoiceStatus != "Processing" && 
				invs[i].invoiceStatus != "Review" && invs[i].invoiceStatus != "Approved" 
				&& invs[i].invoiceStatus != "Submitted" && invs[i].invoiceStatus != "Rejected")) ||	//adding this part for testing purpose only
				(selector == 'requested' && invs[i].invoiceStatus != "Requested") || 
				(selector == 'processing' && invs[i].invoiceStatus != "Processing") ||
				(selector == 'review' && invs[i].invoiceStatus != "Review") ||
				(selector == 'approved' && invs[i].invoiceStatus != "Approved") ||
				(selector == 'submitted' && invs[i].invoiceStatus != "Submitted") ||
				(selector == 'rejected' && invs[i].invoiceStatus != "Rejected")) 
				continue; // do nothing
		
		let individualStatus = 0;
		//if the top selector is all or requested or processing then don't do the invdividual approvers thing
		if( selector == 'all' || selector == 'requested' || selector == 'processing') {
			//alert('inside');
			invividualStatus = 0;
			
			for(var j = 0; j < noOfApprovals; j++){
			
				//alert("Inside user checked");
			
				let checkedUser = document.getElementById("invoice_sort_user_" + j)
				//alert(checkedUser.id);
			
				checkedUser.setAttribute('checked', true);
				checkedUser.disabled = true;
				//alert(skip);
			}
			
		}
		
		else{
			individualStatus = 1;
			for(var j = 0; j < noOfApprovals; j++){
			
				//alert("Inside user checked");
			
				let checkedUser = document.getElementById("invoice_sort_user_" + j)
			
				//checkedUser.setAttribute('checked', true);
				checkedUser.disabled = false;
				//alert(skip);
			}
		}
		
		//set the variable if the user is in the approvers list
		let userInApprovers = 0;
		//let userApprovalIndex = 0;
		for(let a = 0; a < noOfApprovals; a++){
			
			//alert(name+approvingMembers[0][a].name);
			
			if(name.toLowerCase() == approvingMembers[0][a].name.toLowerCase()){
				userApprovalIndex = a;
				userInApprovers = 1;
				console.log("User index in approval list is- " + (a+1));
			}
			//alert(approvingMembers[0][a].name);
		}
		
		let skip = 0;
		
		
		
		
	
		
		//variable to continue loop or not
		let checkContinue = 1;
		
		//first of all make sure selector is at review
		if(selector == 'review'){
			
			checkContinue = 0;
		
			//first iterate through all the users of approvals, i.e. all the check boxes
			for(let z = 0; z < noOfApprovals; z++){
				
				//check whether the approving user is checked or not
				let checkedUser = document.getElementById("invoice_sort_user_" + z);				
				let checkedUserStatus = checkedUser.getAttribute('checked');
				//alert(checkedUserStatus);
				
						
				//the next two lines is there to match the same invoice with invoice approvals
				for(let k = 0; k < invApprovals.length; k++){
					if(invs[i].invoiceID == invApprovals[k].invoice_id){
						
						
						//if the user is checked then....
						if(checkedUserStatus == 'true'){
							//alert(true);
							
							//check if the status is review or not for that user
							if(invApprovals[k]["status_" + (z+1)] == "Review"){
								
								//alert(true);
								
								//if status is review then set checkContinue to 1 to include the invoice in the invoice queue to show
								checkContinue = 1;
							} 
						}
						
					}
					
				}
			}
		}
		
		if(checkContinue == 0){
			continue mainLoop;
		}
		
		var inv = invs[i];
		
		var invListing = document.createElement('tr');
		invListing.setAttribute("value", inv);
		
		//allows invoice to be edited
		//disabling this temporarily
		/*invListing.onclick = function() {
			toggleInv(this);
		};
		
		invListing.ondblclick = function(){
			alert(this);
			//editSelectedInv(this);
		}; */ 
				
		count++;
		invListing.value = invs[i].id;
		invListing.id = "Inv_" + invs[i].id;
		//invListing.value = invs[i].invoiceID;
		//invListing.id = "Inv_" + invs[i].invoiceID;
		
		//alert(invListing.id);
		
		//createa dummy element for saving project id
		let projectID = document.createElement("INPUT");
		projectID.id = "projectID_" + invListing.value;
		projectID.setAttribute("type", "hidden");
		let projectDetails = document.createElement('td'); 
		projectDetails.width = "10%";
		
		//variable for showing fully project details
		let projDetailsHover = document.createElement("div");
		
		//projectDetails.style.width = "10px";
		//projectDetails.className = "text"
		let projectLocation = document.createElement('td');
		projectLocation.width = "10%";
		let mcsNumber = document.createElement('td');
		mcsNumber.width = "10%";
		let invoiceID = document.createElement('td');
		invoiceID.width = "10%";
		let associatedPE = document.createElement('td');
		let invoiceTitle = document.createElement('td');
		//let invoiceType = document.createElement('td');		
		let invoiceAmount = document.createElement('td');
		let submittedDate = document.createElement('td');
		let submitRejectDate = document.createElement('td');
		let invoiceCustomer = document.createElement('td');
		let invoiceApproval = document.createElement('td');
		let invoicePdf = document.createElement('td');
		let notes = document.createElement('td');
		let invoiceSubmitBtn = document.createElement('td');
		let emailSendBtn = document.createElement('td');
		
				
		
		
		let invoiceNumber = document.createElement('td');
		
		
		//invoiceID.innerHTML = invs[i].associatedPE + '-' + (i+1);
		//invoiceID.innerHTML = invs[i].peInvNum;
		invoiceTitle.innerHTML = invs[i].invoiceTitle;
		//invoiceNumber.innerHTML = invs[i].invoiceNumber;
		invoiceNumber.innerHTML = invs[i].invoiceNumber != undefined ? invs[i].invoiceNumber : '';
		//invoiceType.innerHTML = invs[i].invoiceType;
		
		/*
		alert(RETRIEVED_PROJECTS[4].warehouse.city.name);
		alert(RETRIEVED_PROJECTS[4].warehouse.state);
		alert(RETRIEVED_PROJECTS[4].projectItem.name);
		*/
		
		for(var j = 0; j < lengthProjects; j++){
			
			if(RETRIEVED_PROJECTS[j].id == invs[i].invoice_id){
				
				var projItem = RETRIEVED_PROJECTS[j].projectItem.name;
				var projItemComp = projItem;
				if(projItem.length > 15){
					
					projItem = projItem.substring(0,14);
					projItem = projItem + "...";
				} 
				projectID.value = RETRIEVED_PROJECTS[j].id;
				projectDetails.id = "project_" + invListing.value;
				
				//truncate and show full item on hover part
				let projItemHover = document.createElement("div");
				projItemHover.id = "hover_project_" + invListing.value;
				//alert(notesHover.id);
				projItemHover.innerHTML = projItemComp;
				projItemHover.style.backgroundColor = "#f7f5a8";
				projItemHover.style.display = "none";
				projItemHover.style.position = "absolute";
				projItemHover.style.border = "1px solid #ccc";
        		projItemHover.style.border = "2px solid black";
        		projItemHover.style.margin.top = "-5em";
        		projItemHover.style.margin.left = "-5em";
			
				
			
				//projectDetails.innerHTML = RETRIEVED_PROJECTS[j].warehouse.city.name +  " #" + RETRIEVED_PROJECTS[j].warehouse.warehouseID + " " + projItem;
				projectDetails.innerHTML = projItem;
				
				//call function to show entire name of project details as pop up but only when length is greater than a particular value
				if(projItem.length > 15){
					projectDetails.onmouseover = function () {
						showFullProjectName(projectDetails.id);
					}
					
					//call the function to remove pop up on mouse leave
					//call fucntion on mouse not hover to hide div
					projectDetails.onmouseleave = function() {
						hideProjectPopup(projectDetails.id);
					}
				
				}
				
				projectDetails.appendChild(projItemHover);
				
				//projectDetails.className = "tooltip";
				projectLocation.id = "project_location_" + invListing.value;
				projectLocation.innerHTML = RETRIEVED_PROJECTS[j].warehouse.city.name + " " + RETRIEVED_PROJECTS[j].warehouse.warehouseID ;
				
				//alert(RETRIEVED_PROJECTS[i].warehouse.city.name);
				
				
				//setting the mcsNumber id and value
				mcsNumber.id = "mcs_pe_" + invListing.value;
				mcsNumber.innerHTML = RETRIEVED_PROJECTS[j].McsNumber + "-" + invs[i].peInvNum;
				//mcsNumber.innerHTML = RETRIEVED_PROJECTS[j].McsNumber + "-" + invs[i].peInvNum;
				
				//alert(invs[i].peInvNum);
				
				var hovertext = document.createElement("div");
				hovertext.class = "tooltiptext";
				hovertext.innerHTML = projItemComp;
				
				
				
				break;
			}
			}
		
		//alert(RETRIEVED_PROJECTS[j].mcsnumber);

		
		if(invs[i].invoiceAmount)
			invoiceAmount.innerHTML = '$' + invs[i].invoiceAmount;
		else
			invoiceAmount.innerHTML = "---";		
		
		//doing the date part, loading the invoice date and adding the date input too
		submittedDate.innerHTML = invs[i].submittedDate;
		
		let submittedDateElement = document.createElement("input");
		submittedDateElement.type = "text";
		//submittedDateElement.placeholder = invs[i].submittedDate;
		submittedDateElement.placeholder = "---";
		submittedDateElement.id = "submitted_date_" + invListing.id; 
		
		let dateComp = document.createElement("input");
		dateComp.type = "date";
		
		if(invs[i].submitRejectDate) {
			//submitRejectDate.innerHTML = invs[i].submitRejectDate;
			
			
			/*const d = new Date(invs[i].submitRejectDate)
			
			const str = invs[i].submitRejectDate;

			const [day, month, year] = str.split('/');

			const date = `${year}-${month}-${day}`; */
			
			
			//alert(invs[i].submitRejectDate);
			submittedDateElement.value = invs[i].submitRejectDate;
			//submittedDateElement.value = date;
	
			//dateComp.value = invs[i].submitRejectDate;
			//submittedDateElement.max = date;
			//submittedDateElement.min = invs[i].submitRejectDate;
		
			//submitRejectDate.innerHTML = "---";
			//submittedDateElement.placeholder = "---";
		}
		
		//submittedDateElement.style.zIndex = 9999;
		submittedDateElement.size = "9";
		
		
		
		//submittedDateElement.className = "datepicker";
		//alert(submittedDateElement.id);
		submittedDateElement.classList.add("datepicker");
		
		//call the enable button function on change of date
		submittedDateElement.onchange = function(){
			enableSubmitButton(this.id.split('_').pop());
		}
		
		
		//alert(submittedDateElement.id);
		
		//$('#submitted_date_Inv_3').datepicker();
		//$('#'+ submittedDateElement.id).datepicker();
		
		
		
		//var name = this.name;
		//$("input[name=" + name + "]").hide();
		
		let dateId = submittedDateElement.id;
		$("input[name=" + dateId + "]").datepicker();
		$(submittedDateElement.id).datepicker();
		$('#' + submittedDateElement.id).datepicker();
		$('#' + dateId).datepicker();
		//$(`${submittedDateElement.id}`).datepicker();
		//$('#' + submittedDateElement.id).datepicker(); 
		//$(submittedDateElement.id).datepicker();
		
		submitRejectDate.appendChild(submittedDateElement);
		
		//html date function
		
		
		
		//submitRejectDate.appendChild(dateComp);
		
		//Setting the customer value and also adding the truncate if length exceeds particular value
		invoiceCustomer.id = "invoice_customer_" + invListing.value;
		
		

		//call function to show entire name of project details as pop up but only when length is greater than a particular value
		let invoiceCustomerVal = invs[i].invoiceCustomer;
		let invoiceCustomerValFull = invs[i].invoiceCustomer;
		if(invoiceCustomerValFull.length > 15){
			//first truncate the value
			invoiceCustomerVal = invoiceCustomerVal.substring(0,15);
			invoiceCustomerVal = invoiceCustomerVal + "...";
			
			invoiceCustomer.onmouseover = function () {
				showFullCustomerName(invoiceCustomer.id);
			}
					
			//call the function to remove pop up on mouse leave
			//call fucntion on mouse not hover to hide div
			invoiceCustomer.onmouseleave = function() {
				hideInvoiceCustomerPopup(invoiceCustomer.id);
			}		
		}
		
		//truncate and show full item on hover part
		let invoiceCustomerHover = document.createElement("div");
		invoiceCustomerHover.id = "hover_invoice_customer_" + invListing.value;
		//alert(invoiceCustomerHover  .id);
		invoiceCustomerHover.innerHTML = invoiceCustomerValFull;
		invoiceCustomerHover.style.backgroundColor = "#f7f5a8";
		invoiceCustomerHover.style.display = "none";
		invoiceCustomerHover.style.position = "absolute";
		invoiceCustomerHover.style.border = "1px solid #ccc";
		invoiceCustomerHover.style.border = "2px solid black";
		invoiceCustomerHover.style.margin.top = "-5em";
		invoiceCustomerHover.style.margin.left = "-5em";
		invoiceCustomer.innerHTML = invoiceCustomerVal;
		invoiceCustomer.appendChild(invoiceCustomerHover)
		
		//selecting the dropdown value of inovice status based on value fetched from the database
		//invoiceStatus.innerHTML = invs[i].invoiceStatus;
		
		//alert(invs[i].invoiceStatus);
		
		//$("#invoiceStatus_" + invListing.id).val(invs[i].invoiceStatus);
		var invoiceIDdropdown = "invoiceStatus_Inv_" + invListing.value;
		//alert(invoiceIDdropdown);
		
		
		
		var setdropdown = document.getElementById(invoiceIDdropdown);
		var myEle = document.getElementById(invoiceIDdropdown);
    		if(myEle){
        		alert("value exists");
    	}
    	
    	//adding dropdown in the status
		let invoiceStatus = document.createElement('td');
		
	
		let selectStatus = document.createElement("select");
		selectStatus.id = "invoiceStatus_" + invListing.id;
		//select.onchange = "enableSubmitBtn(invListing.id)";
		//select.onchange = function(){enableSubmitBtn(select)}
		
		var opt = document.createElement("Option");
		opt.value = "Requested";
		opt.textContent = "Requested";
		selectStatus.appendChild(opt);
		//invoiceStatus.appendChild(opt);
//		var opt2 = document.createElement("Option");
//		opt2.value = "Processing";
//		opt2.textContent = "Processing";
//		selectStatus.appendChild(opt2)
		var opt3 = document.createElement("Option");
		opt3.value = "Review";
		opt3.textContent = "Review";
		selectStatus.appendChild(opt3);
		var opt4 = document.createElement("Option");
		opt4.value = "Approved";
		opt4.textContent = "Approved";
		selectStatus.appendChild(opt4);
		var opt5 = document.createElement("Option");
		opt5.value = "Submitted";
		opt5.textContent = "Submitted";
		selectStatus.appendChild(opt5);
		var opt6 = document.createElement("Option");
		opt6.value = "Rejected";
		opt6.textContent = "Rejected";
		selectStatus.appendChild(opt6);
		
		selectStatus.onchange = function() {
			//alert(invListing.value);
			//enableSubmitButton(invListing.id);
			//enableSubmitButton(this.id.substring(this.id.length - 1));
			enableSubmitButton(this.id.split('_').pop());
			//id = id.split('_').pop();
			
		}; 
		
		//invoiceStatus.innerHTML = invs[i].invoiceStatus
		invoiceStatus.appendChild(selectStatus);
		
		//selectStatus.value = invs[i].invoiceStatus;
		//alert(invs[i].invoiceStatus);
		selectStatus.setAttribute("original", invs[i].invoiceStatus);
		
		alert("name");
		
		
		//alert("user type is " + userType);
		//disable select if user is basic user
		if(userType == "basic"){
			alert("usertype");
			selectStatus.disabled = true;
		}
		
		//disable the select if user is not in the approvers list
		if(userInApprovers == 0) {
			//alert("inside");
			selectStatus.disabled = true;
		}
		
		//set the dropdown value based on the type of user, for basic set it to main value, for approvers set it to
		// their value of dropdown
		if(userType=="basic"){
			selectStatus.value = invs[i].invoiceStatus;
		}
		
		//if user is not the basic user
		else{
			
			//if the individual user status is not on because of the status bar then show the universal status
			if(userInApprovers == 0) {
				//alert("inside");
				selectStatus.value = invs[i].invoiceStatus;
			}
			//now in this case, when the top status is review, then show the individual users status based on checkbox
			else{
				
				if( invs[i].invoiceStatus == "Requested" || invs[i].invoiceStatus == "Completed" || invs[i].invoiceStatus == "Rejected" 
				|| invs[i].invoiceStatus == "Approved" || invs[i].invoiceStatus == "Submitted"){
					selectStatus.value = invs[i].invoiceStatus;
				}
				else{
					approvingMembers[0][userApprovalIndex];
					for(let k = 0; k < invApprovals.length; k++){
						if(invs[i].invoiceID == invApprovals[k].invoice_id){
							//alert(true);
							
							//if(invApprovals[k].hasOwnProperty)
							//alert(invApprovals[k]["status_" + (userApprovalIndex + 1)]);
				
							selectStatus.value = invApprovals[k]["status_" + (userApprovalIndex + 1)];
						}
					}
				}
				
			}
		}
					
		//permissionCheckforStatus(invListing.value);
		//setInvoiceIcon(invListing.value);
		

		invoiceApproval.innerHTML = invs[i].invoiceApproval;
		
		associatedPE.innerHTML = invs[i].associatedPE;
		
		//alert(invs[i].associatedPE);
		
		//doing the notes part
		//add notes icon to each row
		let notesIcon = document.createElement('img');
		notesIcon.id = "notes_" + invListing.value;
		//alert(notesIcon.id);
		notesIcon.src = "icons/notes.png";
		notesIcon.width = "22";
		notesIcon.height = "22";
		
		//if there is some ontes or one of the notes is checked set the notes icon color to red
		if(invs[i].notes.length > 4){
			notesIcon.src = "icons/notes_red.png";
		}
		else{
			for(let x = 0; x<4; x++){
				if(invs[i].notes[x] == 1) {
					notesIcon.src = "icons/notes_red.png";
					break;
				}
			}	
		}
		
		
		
		//call function to display div on mouse hover
		notesIcon.onmouseover = function(){
			//alert(notesIcon.id);
			//displayNotes(notesIcon.id);
			var id = this.id;
			id = id.split('_').pop();
			displayNotes(id);	
		}
		
		//call fucntion on mouse not hover to hide div
		notesIcon.onmouseleave = function() {
			hideNotes(notesIcon.id);
		}
		
		//double click notes icon to edit it
		notesIcon.onclick = function() {
			//alert("icon double clicked");
			
			editNotes2(notesIcon.id);
		}
		
		//notesIcon.innerHTML = "image";
		notes.appendChild(notesIcon);
		//alert(notesIcon.src);
		//console.log(notesIcon);
		//notes.innerHTML = invs[i].notes;
		let notesHover = document.createElement("div");
		notesHover.id = "hover_" + notesIcon.id;
		//alert(notesHover.id);
		//alert(invs[i].notes);
		notesHover.innerHTML = invs[i].notes.substring(0, invs[i].notes.length-4);
		notesHover.style.backgroundColor = "#f7f5a8";
		notesHover.style.display = "none";
		notesHover.style.position = "absolute";
		notesHover.style.border = "1px solid #ccc";
        notesHover.style.border = "2px solid black";
        notesHover.style.margin.top = "-5em";
        notesHover.style.margin.left = "-5em";
		
		//notes.appendChild(notesHover);
		
		//edit notes modal box
		let notesEdit = document.createElement("div");
		notesEdit.id = "edit_notes_" + invListing.value;
		notesEdit.style.backgroundColor = "white";
		notesEdit.style.position = "absolute";
		notesEdit.style.float = "Left";
		notesEdit.style.overflow = "auto";
		notesEdit.style.right = "150px";
		notesEdit.style.borderRadius = "5px";
		notesEdit.style.width = "210px";
		notesEdit.style.height = "200px";
		notesEdit.style.display = "none";
		notesEdit.style.border = "1px solid blue";
        notesEdit.style.border = "2px solid black";
        notesEdit.style.margin.top = "-5em";
        notesEdit.style.margin.left = "-5em";
        notesEdit.style.padding = "3px";
        
        let notesEditTable = document.createElement("table");
        notesEditTable.id = "notes_edit_modal_" + invListing.value;
        let notesEditTableBody = document.createElement("tbody")
        notesEditTable.appendChild(notesEditTableBody);
        let notesEditTableRow = document.createElement("tr");
        
        
        
        //new notes section with checkbox
        let notesEditT = document.createElement("table");
        let notesEditTB = document.createElement("tbody");
        
        
        let notesEditTR1 = document.createElement("tr");
        let notesEditTRTD11 = document.createElement("td");
        notesEditTRTD11.colSpan = "2";
        //notesEditTRTD11.style.width = "20px";
        let notesEditCheckBox1 = document.createElement('input');
        notesEditCheckBox1.type = 'checkbox';
        //notesEditCheckBox1.setAttribute('checked', false);
        notesEditCheckBox1.id = 'notes_check_box_incorrectAmount_' + invListing.value;
        //notesEditCheckBox1.value = "Incorrect Amount";
        //notesEditCheckBox1.setAttribute('checked', true);
        //set the value
        if(invs[i].notes[invs[i].notes.length-4] == "1"){
			//alert(true);
			notesEditCheckBox1.setAttribute('checked', true);
			notesEditCheckBox1.setAttribute('original', true);
		}
		else{
			//alert(false);
			//notesEditCheckBox1.setAttribute('checked', false);
			notesEditCheckBox1.checked = false;
			notesEditCheckBox1.setAttribute('original', false);
		}
        
        notesEditTRTD11.appendChild(notesEditCheckBox1);
        //let notesEditTRTD12 = document.createElement("td");
        //notesEditTRTD12.style.width = "180px";
        notesEditTRTD11.innerHTML += "&nbsp&nbspIncorrect Amount";
        notesEditTR1.appendChild(notesEditTRTD11);
        //notesEditTR1.appendChild(notesEditTRTD12);
        notesEditTB.appendChild(notesEditTR1);
        //notesEditT.appendChild(notesEditTB);
        
        let notesEditTR2 = document.createElement("tr");
        let notesEditTRTD21 = document.createElement("td");
        notesEditTRTD21.colSpan = "2";
        let notesEditCheckBox2 = document.createElement('input');
        notesEditCheckBox2.type = 'checkbox';
        //notesEditCheckBox2.setAttribute('checked', false);
        notesEditCheckBox2.id = 'notes_check_box_incorrectCustomer_' + invListing.value;
        //notesEditCheckBox2.value = "Incorrect Customer";
        notesEditTRTD21.appendChild(notesEditCheckBox2);
        if(invs[i].notes[invs[i].notes.length-3] == "1"){
			//alert(true);
			notesEditCheckBox2.setAttribute('checked', true);
			notesEditCheckBox2.setAttribute('original', true);
		}
		else{
			//alert(false);
			//notesEditCheckBox2.setAttribute('checked', false);
			notesEditCheckBox2.checked = false;
			notesEditCheckBox2.setAttribute('original', false);
		}
        
        //let notesEditTRTD22 = document.createElement("td");
        notesEditTRTD21.innerHTML += "&nbsp&nbspIncorrect Customer";
        notesEditTR2.appendChild(notesEditTRTD21);
        //notesEditTR2.appendChild(notesEditTRTD22);
        notesEditTB.appendChild(notesEditTR2);
        //notesEditT.appendChild(notesEditTB);
        
        let notesEditTR3 = document.createElement("tr");
        let notesEditTRTD31 = document.createElement("td");
        notesEditTRTD31.colSpan = "2";
        let notesEditCheckBox3 = document.createElement('input');
        notesEditCheckBox3.type = 'checkbox';
        notesEditCheckBox3.id = 'notes_check_box_customerRejected_' + invListing.value;
        notesEditCheckBox3.value = "Customer Rejected";
        if(invs[i].notes[invs[i].notes.length-2] == "1"){
			//alert(true);
			notesEditCheckBox3.setAttribute('checked', true);
			notesEditCheckBox3.setAttribute('original', true);
		}
		else{
			//alert(false);
			//notesEditCheckBox3.setAttribute('checked', false);
			notesEditCheckBox3.checked = false;
			notesEditCheckBox3.setAttribute('original', false);
		}
        notesEditTRTD31.appendChild(notesEditCheckBox3);
        //let notesEditTRTD32 = document.createElement("td");
        notesEditTRTD31.innerHTML += "&nbsp&nbspCustomer Rejected";
        notesEditTR3.appendChild(notesEditTRTD31);
        //notesEditTR3.appendChild(notesEditTRTD32);
        notesEditTB.appendChild(notesEditTR3);
        //notesEditT.appendChild(notesEditTB);
        
        let notesEditTR4 = document.createElement("tr");
        let notesEditTRTD41 = document.createElement("td");
        notesEditTRTD41.colSpan = "2";
        let notesEditCheckBox4 = document.createElement('input');
        notesEditCheckBox4.type = 'checkbox';
        notesEditCheckBox4.id = 'notes_check_box_incompleteWork_' + invListing.value;
        notesEditCheckBox4.value = "Incomplete Work";
        if(invs[i].notes[invs[i].notes.length-1] == "1"){
			//alert(true);
			notesEditCheckBox4.setAttribute('checked', true);
			notesEditCheckBox4.setAttribute('original', true);
		}
		else{
			//alert(false);
			//notesEditCheckBox4.setAttribute('checked', false);
			notesEditCheckBox4.checked = false;
			notesEditCheckBox4.setAttribute('original', false);
		}
        notesEditTRTD41.appendChild(notesEditCheckBox4);
        //let notesEditTRTD42 = document.createElement("td");
        notesEditTRTD41.innerHTML += "&nbsp&nbspIncomplete Work";
        notesEditTR4.appendChild(notesEditTRTD41);
        //notesEditTR4.appendChild(notesEditTRTD42);
        notesEditTB.appendChild(notesEditTR4);
        
        //new text field
        let notesEditTR5 = document.createElement("tr");
		//notesEditTableRow3.id = id;
		notesEditTR5.id = "notes_checkbox_edit_text_" + invListing.value;
		let notesEditTTextD = document.createElement("td");
		notesEditTTextD.colSpan = "2";
        notesEditTTextD.align = "center";
        notesEditTTextD.height = "20";
        let notesEditTextT = document.createElement("textarea");
        //notesEditText.type = "text";
        notesEditTextT.rows = "2";
        notesEditTextT.id = "notes_text_field_" + invListing.value;
        notesEditTextT.maxLength = "30";
        //notesEditText.size = "10";
        notesEditTextT.placeholder = "Please describe";
        
        notesEditTTextD.append(notesEditTextT);
        notesEditTR5.append(notesEditTTextD);
        notesEditTB.appendChild(notesEditTR5);
        
        //new save buttons
        let notesEditTR6 = document.createElement("tr");
        //notesEditTR5.style.width = "200px";
        let notesEditTBtnSave = document.createElement("td");
        notesEditTBtnSave.height = "30";
        notesEditTBtnSave.align = "center"
        
        let saveNotesTBtn = document.createElement("button");
		saveNotesTBtn.createTextNode = "Save Changes";
		saveNotesTBtn.type = "submit";
		saveNotesTBtn.name = "submit";
		saveNotesTBtn.class = "btn btn-success";
		//saveNotesBtn.style = "background-color: #33e307; text-color:blue;";
		saveNotesTBtn.style = "background-color: #5e5e5e; color:white;";
		saveNotesTBtn.onmouseover = function(){
			this.style = "background-color: green;"
		}
		saveNotesTBtn.onmouseleave = function() {
			this.style = "background-color: #5e5e5e; color:white;";
		}
		//saveNotesBtn.disabled = true;
		saveNotesTBtn.class = "project-edit btn";
		saveNotesTBtn.innerHTML = "Save Notes";
		saveNotesTBtn.id = "save_notes_checkbox_btn_" + invListing.value;
		notesEditTBtnSave.appendChild(saveNotesTBtn);
		notesEditTR6.appendChild(notesEditTBtnSave);
		
		//set selected on notes save button
		saveNotesTBtn.onclick = function () {
			var id = this.id;
			id = id.split('_').pop();
			let editId = "edit_notes_" + id;
			
			// set the selected value of the notes modal box
			//var selectedValue = document.getElementbyId = "edit_notes_" + id;
					
			document.getElementById(editId).style.display = "none";
			
			enableSubmitButton(id);
		}
        
        
        //new cancel button
        let notesEditTBtnCancel = document.createElement("td");
		notesEditTBtnCancel.height = "30";
		notesEditTBtnCancel.align = "center"
		var cancelNotesTBtn = document.createElement("button");
		cancelNotesTBtn.id = "cancel_notes_checkbox_btn_" + invListing.value;
		cancelNotesTBtn.type = "submit";
		cancelNotesTBtn.name = "submit";
		//saveNotesBtn.style = "background-color: #33e307; text-color:blue;";
		cancelNotesTBtn.style = "background-color: #5e5e5e; color:white;";
		//cancelNotesBtn.disabled = true;
		cancelNotesTBtn.class = "project-edit btn";
		cancelNotesTBtn.innerHTML = "Cancel";
		
		cancelNotesTBtn.onmouseover = function(){
			this.style = "background-color: red;"
		}
		cancelNotesTBtn.onmouseleave = function() {
			this.style = "background-color: #5e5e5e; color:white;";
		}
		notesEditTBtnCancel.appendChild(cancelNotesTBtn);
		notesEditTR6.appendChild(notesEditTBtnCancel);
		
		//close model on cancel notesBtn
		cancelNotesTBtn.onclick = function () {
			let id = this.id;
			id = id.split('_').pop();
			
			modalId = "edit_notes_" + id;
			
			var incAmt = document.getElementById("notes_check_box_incorrectAmount_" + id);
			var incCus = document.getElementById("notes_check_box_incorrectCustomer_" + id);
			var cusRej = document.getElementById("notes_check_box_customerRejected_" + id);
			var incWor = document.getElementById("notes_check_box_incompleteWork_" + id);
			//alert(incWor.id);
			
			//let note = invs[i].notes;
			//var x = document.getElementById(modalDropdownId);
			
			//alert(x.getAttribute("original"));
			
			//set the value back to the value from the original database
			//alert(incAmt.getAttribute('original'));
			
			if(incAmt.getAttribute('original') == 'true') {
				//alert("inside");
				incAmt.setAttribute('checked', true);
			}
			else{
				//incAmt.setAttribute('checked', false);
				incAmt.checked = false;
			} 
			if(incCus.getAttribute('original') == 'true') {
				//alert("inside");
				incCus.setAttribute('checked', true);
			}
			else{
				//incCus.setAttribute('checked', false);
				incCus.checked = false;
			} 
			if(cusRej.getAttribute('original') == 'true') {
				cusRej.setAttribute('checked', true);
			}
			else{
				//cusRej.setAttribute('checked', false);
				cusRej.checked = false;
			} 
			if(incWor.getAttribute('original') == 'true') {
				incWor.setAttribute('checked', true);
			}
			else {
				//incWor.setAttribute('checked', false);
				incWor.checked = false;
			} 
			
			//alert(id);
			document.getElementById(modalId).style.display = "none";
		}
		
		
        
        notesEditTB.appendChild(notesEditTR6);
        notesEditT.appendChild(notesEditTB);
        
        notesEdit.appendChild(notesEditT);
        notes.appendChild(notesEdit);
        
        //doing the new notes hover part
        let notesHoverNew = document.createElement("div");
		notesHoverNew.id = "hover_new_" + notesIcon.id;
		notesHoverNew.style.backgroundColor = "#f7f5a8";
		notesHoverNew.style.display = "none";
		notesHoverNew.style.position = "absolute";
		notesHoverNew.style.border = "1px solid #ccc";
        notesHoverNew.style.border = "2px solid black";
        notesHoverNew.style.margin.top = "-5em";
        notesHoverNew.style.margin.left = "-5em";
		
		//alert(notesHover.id);
		//alert(invs[i].notes[0]);
		if(invs[i].notes[0] == 1){
			//alert(true);
			notesHoverNew.innerHTML += "Incorrect Amount  <br>";
		}
		if(invs[i].notes[1] == "1"){
			notesHoverNew.innerHTML += "Incorrect Customer  <br>\n";
		}
		if(invs[i].notes[2] == "1"){
			notesHoverNew.innerHTML += "Customer Rejected  <br>\n";
		}
		if(invs[i].notes[3] == "1"){
			notesHoverNew.innerHTML += "Incomplete Work  <br>\n";
		}
				
		notesHoverNew.innerHTML += invs[i].notes.substring(0, invs[i].notes.length-4);
		
		//alert(notesHoverNew.innerHTML);
		
		
		
        notes.appendChild(notesHoverNew);
        

		
		let invIcon = document.createElement('img');
		invIcon.id = "inv_att_" + invListing.value;
		invIcon.src = "icons/invattachment.png";
		invIcon.width = "22";
		invIcon.height = "22";
		
		//fetchApprovals(invs[i].invoiceID, invs[i].id);
		//alert(invs[i].invoiceID);
		
		//call function to display div on mouse hover
		invIcon.onmouseover = function(){
			//alert(notesIcon.id);
			displayApprovals(invIcon.id.split('_').pop());		
		}
		
		//call fucntion on mouse not hover to hide div
		invIcon.onmouseleave = function() {
			hideApprovals(invIcon.id.split('_').pop());
		}
		
		//notesIcon.innerHTML = "image";
		
		//alert(notesIcon.src);
		//console.log(notesIcon);
		//notes.innerHTML = invs[i].notes;
		let approvalsHover = document.createElement("div");
		approvalsHover.id = "approvals_" + invListing.value;
		//alert(notesHover.id);
		//approvalsHover.innerHTML = invs[i].notes;
		approvalsHover.style.backgroundColor = "#cfcbca";
		approvalsHover.style.display = "none";
		approvalsHover.style.position = "absolute";
		approvalsHover.style.border = "1px solid #ccc";
        approvalsHover.style.border = "2px solid black";
        approvalsHover.style.margin.top = "-5em";
        approvalsHover.style.margin.left = "-5em";
		
		//invIcon.appendChild(approvalsHover);
		
		invoicePdf.appendChild(approvalsHover);
		
		//getInvoiceAttStatus(invIcon.id, invs[i].invoiceStatus, mcsNumber.innerHTML);
		
		//Preview Button Logiv
		var previewIcon = document.getElementById('previewInvoice');
		previewIcon.onclick = function(){									
			var invoiceFileName = invoiceInformation.invoiceFileName;			
			openInvoice(invoiceFileName.toString());
		}
		
		
		//Upload a new file logic
		var uploadButton = document.getElementById('uploadInvoiceFile');
		uploadButton.onclick = function(){
			
			var pdf = document.getElementById("filepdf");
			pdf.accept = ".pdf";
			pdf.click();
			
			
			pdf.onchange = function() {								
				
				var mcsNumber = specificProjectInformation.McsNumber.toString();
				var peNumber = invoiceInformation.peInvNum.toString();
				
				//Call a function to actually upload it to server
				
				var newFileName = 'mcs_'+mcsNumber+'_'+peNumber;			
				uploadInvoiceSD(newFileName);			
				//Call a function to set the InvoiceFileName in the database
				setInvoiceFileName(invoiceInformation.id.toString(), newFileName);
				invoiceInformation.invoiceFileName = newFileName;
				invoiceFileName.innerHTML = invoiceInformation.invoiceFileName;
				var preview = document.getElementById('previewInvoice');
				preview.style.display = '';
			}
			
		}
		
		//Invoice Icon On click logic
		invIcon.onclick = function(){
			var preview = document.getElementById('previewInvoice');
			preview.style.display = '';
			var invoiceFileName = document.getElementById('invoiceFileName')
			
			var id = this.id;
			id = id.split('_').pop();
			invoiceInformation = getInvoiceInformation(id);		
			specificProjectInformation = getProjectInformation(invoiceInformation.invoice_id)[0]; 	
			if(invoiceInformation.invoiceFileName){
				invoiceFileName.innerHTML = invoiceInformation.invoiceFileName;	
			}
			else{
				invoiceFileName.innerHTML = "Please attach a new file";
				var preview = document.getElementById('previewInvoice');
				preview.style.display = 'none';		
			}
			
			var modal = document.getElementById("myModalAG");
			modal.style.display = "block";
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("closeAG")[0];
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
			  modal.style.display = "none";
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			  if (event.target == modal) {
			    modal.style.display = "none";
			  }
			}
		}
		
	
		
		
		//create a form for file 
		let fileDiv = document.createElement("div");
		//let file = new FormData();
		let file = document.createElement("form");
		file.setAttribute('method', 'POST');
		file.setAttribute('enctype', 'multipart/form-data')
		
		file.id = "form_file_" + invListing.value;
		//file.setAttribute
		fileDiv.style.display = "none";

		invoicePdf.appendChild(invIcon);
		
		//showing the approvals based on users
		
		let approvals = document.createElement("div");
		approvals.id = "approvalsBox";
		approvals.style.width = "50px";
		approvals.style.display = "inline-block";
		approvals.style.verticalAlign = "middle";
		let approval1 = document.createElement("input");
		approval1.type = "checkbox";
		approval1.id = "approval1";
		approval1.style.display = "inline-block";
		approval1.style.verticalAlign = "middle";
		let approval2 = document.createElement("input");
		approval2.type = "checkbox";
		approval2.id = "approval2";
		approval2.style.display = "inline-block";
		approval2.style.verticalAlign = "middle";
		let approval3 = document.createElement("input");
		approval3.type = "checkbox";
		approval3.id = "approval3";
		approval3.style.display = "inline-block";
		approval3.style.verticalAlign = "middle";
		approvals.appendChild(approval1);
		approvals.appendChild(approval2);
		approvals.appendChild(approval3);
		
		//var userType = getUserType();
		
		
		
		
		//add the save button to the laste column
		
		//<li style="top:4px;float:right;" class="btn btn-success" id="saveProjectLink" onclick="saveProject_PROJECT_DATA()">
	     //   				Save<span class="glyphicon glyphicon-floppy-saved"></span></li>
	     
	    /*<button class="btn" style="color: white; background: rgb(23, 42, 86);">Add Invoice</button> */
	        				
	    let btn = document.createElement('button');
	    //btn.style = "top:4px;float:right;";
	    btn.style = "color:white; background-color : #039c0a; border:#014704; border-radius: 3px;";
	    btn.class = "btn btn-success";
	    btn.id = "btn_" + invListing.id;
	    //alert(btn.id);
	    //btn.onclick = function(){};
	    btn.innerHTML = "Save";
	    btn.disabled = "true";
		
	    //Save Button Beginning
		btn.onclick = function() {
			//toggleInv(this);
			//let value = invListing
			//alert(this.id);
			editSelectedInvBtn(this.id.split('_').pop());
		};
		
		/*invListing.ondblclick = function(){

			editSelectedInv(this);
		};  */
		
		//invoiceSubmitBtn.appendChild(submitBtn);
		invoiceSubmitBtn.appendChild(btn);
		

		
		//Sending email button part
		let emailBtn = document.createElement('button');
	    //btn.style = "top:4px;float:right;";
	    emailBtn.style = "color:white; background-color : #039c0a; border:#014704; border-radius: 3px;";
	    emailBtn.class = "btn btn-success";
	    emailBtn.id = "email_btn_" + invListing.id;
	    //alert(btn.id);
	    //btn.onclick = function(){};
	    emailBtn.innerHTML = "Email";
	    	
		emailBtn.onclick = function() {
			sendEmail(this.id.split('_').pop())
		};
		
		/*invListing.ondblclick = function(){

			editSelectedInv(this);
		};  */
		
		//invoiceSubmitBtn.appendChild(submitBtn);
		emailSendBtn.appendChild(emailBtn);
		
			
		invListing.appendChild(invoiceCustomer);
		invListing.appendChild(projectLocation);
		invListing.appendChild(projectDetails);
		invListing.appendChild(mcsNumber);
		//invListing.appendChild(invoiceID);
		//invListing.appendChild(invoiceTitle);
		//invListing.appendChi ld(invoiceType);
		invListing.appendChild(invoiceAmount);
		invListing.appendChild(invoiceStatus);
		invListing.appendChild(submittedDate);
		invListing.appendChild(submitRejectDate);
		
		//invListing.appendChild(invoiceApproval);
		
		//invListing.appendChild(invoiceNumber);
		
		invListing.appendChild(invoicePdf);
		//invListing.appendChild(approvals);
		invListing.appendChild(notes);
		invListing.appendChild(projectID);
		invListing.appendChild(emailSendBtn);
		invListing.appendChild(invoiceSubmitBtn);
		
		if(invs[i].invoiceStatus == 'Submitted'){
			//invListing.appendChild(emailSendBtn);	
			invoiceSubmitBtn.style.display = "none";
		}
		else{
			//invListing.appendChild(invoiceSubmitBtn);
			emailSendBtn.style.display = "none";
		}
		

		$('#invoiceTable > tbody').append(invListing);
		
		//need to put in in the end othervise it'll show it doesnt exist
		//setInvoiceIcon(invListing.value);
		
		//set the color of invoice Icon
		
		
		setInvoiceIconColor(invListing.value, invs[i].invoiceID);
		
		
		//finally add the approvals
		addApproval(invs[i].invoiceID, invListing.value);
		
	}
	
	//fillInvoiceApprovals();
	
	//This adds No Invoices to Show to the table if there are none in that filter or category (Ex: Open, Complete)
	if (count === 0) {
		clearAndAddSingleRowInvs("No Invoices to Show");		
	}		
}

function setInvoiceFileName(invoiceId, fileName){
	
	$.ajax({
	type: 'POST',
	url: 'Project', 
	async: false,
	data: {
		'action': 'updateInvoiceFileName',
		'invoiceId' : invoiceId,
		'fileName' : fileName
		},
		success: function(data)
		{
			invoiceName = data;
		}
	});
}

function getProjectInformation(projectID){
	
	var projectInfo = '';
	$.ajax({
		type: 'POST',
		url: 'Project', 
		async: false,
		data: {
			'action': 'getSpecProject',
			'id' : projectID,
			},
			success: function(data)
			{
				projectInfo = data;
			}
		});
	return projectInfo;
}

function getInvoiceInformation(invoiceId){	
	var invoiceName = '';
	$.ajax({
	type: 'POST',
	url: 'Project', 
	async: false,
	data: {
		'action': 'getSpecificInvoice',
		'invoiceID' : invoiceId,
		},
		success: function(data)
		{
			invoiceName = data;
		}
	});
	
	return invoiceName;
}

//function to send email
function sendEmail(id){
	
	var emailLink = "mailto:";
	
	let projectID = document.getElementById("projectID_" + id).value;
	let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
	
	mcsPE = mcsPE.split("-")[1];
	
	//alert(mcsPE);
	
	
	for(var i = 0; i<customerEmails.length; i++){
		//alert(i);
		let y = customerEmails[i];
		
		if(y[1]){
			//alert(y[y.length-1].id);
			//only add email to the particular row with the same invlistin id otherwise contines
			if(id == y[y.length-1].id){
				//alert(y.length);
				console.log(y.length);
				for(var c = 0; c<y.length-1; c++){
					console.log(c);
					if(c == y.length-2){
						//alert("false");
						emailLink += y[c].email;
					}
					else{
						//alert("true");
						emailLink += y[c].email + ";";
					}
					
				}	
			}	
		}		
	}
	
	//create the subject fot the email
	let location = document.getElementById("project_location_" + id).innerHTML;
	let project_name = document.getElementById("hover_project_" + id).innerHTML;
	
	let subject = location + " - " + project_name + " - Invoice"; 
	
	//create the email body
	let PEtitle = document.getElementById("") 
	
	//fetching the changeorder title for PE title
	
    $.ajax({
        type: "POST",
        url: "Emails",
        data: {
			action : "getChangeOrderTitle",
			projectID : projectID,
			mcsPE : mcsPE,
		},
        timeout: 600000,
        success: function (data) {
			
			console.log(data);
			data = JSON.parse(data);
			
			let body = "Please find the attached invoice for " + data.title + ".%0D%0A%0D%0AThank you.";
			
			emailLink += "?subject=" + encodeURIComponent(subject)
		     	+ "&body=" + body;
		    emailLink += "&attachment=";
		    //alert(mcsPE);
		    let fileLoc = location.host + "/MillerRebuilt/upload/" + mcsPE + ".pdf";
			//emailLink += fileLoc;     	
			console.log("Email link is- " + emailLink);
			
			//window.location.href = link;
			window.location.href = emailLink;
            return true;

        },
        error: function (e) {

            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
            
        }
    });

		
	

	
}

//function to display approvals on mouse over on invoice icon
function displayApprovals(id){
	var displayApprovalsID = "approvals_" + id;
	//alert(displayApprovalsID);
	
	var approvals = document.getElementById(displayApprovalsID);
	approvals.style.zIndex = "100";
	approvals.style.display = "block";
	
	//new method
	var el, x, y;

	el = document.getElementById(displayApprovalsID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 72; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "block";
	document.getElementById('PopUpTextApprovals').innerHTML = displayApprovalsID.innerHTML;
	
}

//function to hide approvals on mouse leave
function hideApprovals(id) {
	var approvalsID = "approvals_" + id;
	//alert(notesHoverID);
	var approval = document.getElementById(approvalsID);
	approval.style.display = "none";
	
	document.getElementById("PopUpTextApprovals").style.display = "none";

}

//function to show text input in notes edit modal box when the value in dropdown is selected to others
function addNotesEditTextField(id) {
	//let id = this.id;
	id = id.split('_').pop();
	let notesEditSelectId = "notes_edit_" + id;
	
	//alert(id);
	
	let notesEditTable = document.getElementById("notes_edit_modal_" + id);
	
	//alert(notesEditTable.id);
	
	let notesEditText = document.getElementById("notes_edit_text_" + id);
	
	
	let x = document.getElementById(notesEditSelectId);
	
	if (x.value == "Others"){
		
		notesEditText.style.display = "table-row";
		//change size of modal
		
		var modal = document.getElementById("edit_notes_" + id);
		//alert(modal.id);
		//modal.style.width = "200px";
		modal.style.height = "155px";
	}
	else {
		notesEditText.style.display = "none";
	}
	
	
}

//function to upload the pdf file
function uploadInvoice(fileName) {
	
    event.preventDefault();
  
    var form = $('#fileUploadForm')[0]; 
    var data = new FormData(form);
	data.append("fileName", fileName);
		
	alert("File is being uploaded, Please wait for some time for file to be copied properly");
	
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "fileuploadservlet",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
			//alert(data);
            //$("#result").text(data);
            console.log("SUCCESS : ", data);
            //$("#btnSubmit").prop("disabled", false);
            //alert("Invoice uploaded successfully");            
            return true;

        },
        error: function (e) {

            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
            $("#btnSubmit").prop("disabled", false);
			alert("Unable to upload invoice due to system error");
			return false;
        }
    });

    //});
}

// New function with spinner
function uploadInvoiceSD(fileName) {
    event.preventDefault();

    // Show the spinner and backdrop when upload starts
    $("#spinner-wrp, #spinner-backdrop").css("display", "block");

    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    data.append("fileName", fileName);

    // Define xhr outside the AJAX function so we can reference it
    var xhr = new window.XMLHttpRequest();

    // Handle cancel button click
    $("#cancel-upload-btn").on("click", function() {
        xhr.abort(); // abort the upload
        // Navigate back or reload the page, based on your requirement
        //window.location.reload(); // or use history.back();
         $("#spinner-wrp, #spinner-backdrop").css("display", "none");
    });

    $.ajax({
        xhr: function() {
            return xhr;
        },
        type: "POST",
        enctype: 'multipart/form-data',
        url: "fileuploadservlet",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(data) {
            console.log("SUCCESS : ", data);
            alert("Invoice uploaded successfully");

            // Hide the spinner and backdrop once upload is complete
            $("#spinner-wrp, #spinner-backdrop").css("display", "none");
        },
        error: function(e) {
            if(e.statusText == "abort") {
                console.log("Upload was cancelled");
            } else {
                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                alert("Unable to upload invoice due to system error");
            }

            // Hide the spinner and backdrop once upload is complete or aborted
            $("#spinner-wrp, #spinner-backdrop").css("display", "none");
        }
    });
}


//function to show full project name on hover
function showFullCustomerName(invoice_customer_id){
	
	//(invoice_customer_id);
	var invoiceCustomerNameID = "hover_" + invoice_customer_id;
	//alert(invoiceCustomerNameID);
	
	var notes = document.getElementById(invoiceCustomerNameID);
	notes.style.zIndex = "100";
	notes.style.display = "block";
	
	//new method
	var el, x, y;

	el = document.getElementById(invoiceCustomerNameID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 2; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "block";
	document.getElementById('PopUpTextInvoiceCustomer').innerHTML = invoiceCustomerNameID.innerHTML;
}

//function to hide project name pop up on mouse leave
function hideInvoiceCustomerPopup (invoice_customer_id) {
	var invoiceCustomerID = "hover_" + invoice_customer_id;
	//alert(projectID);
	var project = document.getElementById(invoiceCustomerID);
	project.style.display = "none";
	
	document.getElementById("PopUpTextInvoiceCustomer").style.display = "none";

}

//function to show full project name on hover
function showFullProjectName(project_id){
	
	var projectNameID = "hover_" + project_id;
	//alert(projectNameID);
	
	var notes = document.getElementById(projectNameID);
	notes.style.zIndex = "100";
	notes.style.display = "block";
	
	//new method
	var el, x, y;

	el = document.getElementById(projectNameID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 2; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "block";
	document.getElementById('PopUpTextProject').innerHTML = projectNameID.innerHTML;
}

//function to hide project name pop up on mouse leave
function hideProjectPopup (project_id) {
	var projectID = "hover_" + project_id;
	//alert(projectID);
	var project = document.getElementById(projectID);
	project.style.display = "none";
	
	document.getElementById("PopUpTextProject").style.display = "none";

}

//Enable submit button on change of dropdown of invoice status
function enableSubmitButton(id) {
	//alert(id);
	//alert("onchange called");
	var x = document.getElementById("invoiceStatus_Inv_" + id);
	//alert(invStatus_id);
	
	var selectValue = x.value;
	//alert(selectValue);
	
	//Set completed date to today if the value is Submitted or Rejected
	if(selectValue === "Rejected"){
		//alert("Rejected selected");		
		var dateCompleted = x.element
	}
	
	//invId = invStatus_id.substring(invStatus_id.length - 5);
	invId = "Inv_" + id;
	//alert(invId);
	
	//var buttonId = invId.substring(id);
	var buttonId = "btn_Inv_" + id;
	//alert(buttonId);
	
	var button = document.getElementById(buttonId);
	//alert(button.id);
	//button.style = "background-color: #02de18;";
	//alert("Button enabling function called");
	button.disabled = false;
	
	//also set the date to current date
	//var dateId = x.id;
	//alert(dateId);
	
	//dateId = dateId.substring(dateId.length - 1);
	var dateId = "submitted_date_Inv_" + id;
	//alert(dateId);
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	//alert(today);
	document.getElementById(dateId).value = today; 
	
}

//set date to today's date
function setTodayDate(id){
	var x = document.getElementById(invStatus_id);
	var dateId = x.id;
	//alert(dateId);
	
	dateId = dateId.substring(dateId.length - 1);
	dateId = "submitted_date_Inv_" + dateId;
	//alert(dateId);
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
	//alert(today);
	document.getElementById(dateId).value = today;
}


//function to display notes on Hover
function displayNotes(id){
	var notesHoverID = "hover_new_notes_" + id;
	//alert(notesHoverID);
	
	var notes = document.getElementById(notesHoverID);
	notes.style.zIndex = "100";
	notes.style.display = "block";
	
	//new method
	var el, x, y;

	el = document.getElementById(notesHoverID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 2; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "block";
	document.getElementById('PopUpText').innerHTML = notesHoverID.innerHTML;
	
}

//function to hide notes on mouse leave
function hideNotes(notesID) {
	var notesHoverID = "hover_new_" + notesID;
	//alert(notesHoverID);
	var notes = document.getElementById(notesHoverID);
	notes.style.display = "none";
	
	document.getElementById("PopUpText").style.display = "none";

}

//function to edit notes no double click
function editNotes2(notesID){
	var notesEditID = "edit_" + notesID;
	
	var notes = document.getElementById(notesEditID);

	
	document.getElementById("PopUpText").style.display = "none";
	
	//new method
	var el, x, y;

	el = document.getElementById(notesEditID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 100; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "flex";
	
	document.getElementById('editNotesText').innerHTML = notesEditID.innerHTML;
	
	//close the dropdown box when clicked outside
	/*window.addEventListener('click', function(e){   
		if (document.getElementById('editNotesText').contains(e.target)){
    		// Clicked in box
    		alert("inside box");
		}
		else{
    		// Clicked outside the box
    		alert("function called");
    		document.getElementById('editNotesText').style.display = "none";
		}
	}); */
}



//function to edit notes
function editNotes(notesID) {

	//get the notes id
	var notesHoverID = "hover_" + notesID;
	
	var selectNotes = document.createElement("select");
	
	selectNotes.id = "select_" + notesID;	
	var opt = document.createElement("Option");
	opt.value = "Option 1 for notes";
	opt.textContent = "Option 1 for notes";
	selectNotes.appendChild(opt);
	var opt2 = document.createElement("Option");
	opt2.value = "Option 2 for notes";
	opt2.textContent = "Option 2 for notes";
	selectNotes.appendChild(opt2);
	
	// Get the modal
	var modal = document.getElementById("notesModal");
	modal.appendChild(selectNotes);
	// Get the button that opens the modal
	//var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	//position the modal box
	//new method
	var el, x, y;

	el = document.getElementById(notesHoverID);
	if (window.event) {
		x = window.event.clientX + document.documentElement.scrollLeft
		+ document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop +
		+ document.body.scrollTop;
	}
	else {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	x -= 2; y -= 2;
	y = y+15
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.display = "block";

	// When the user clicks the button, open the modal 
	modal.style.display = "block";


	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
 		if (event.target == modal) {
    		modal.style.display = "none";
		}
	}
}


function clearInvoiceTable () {
	$('#invoiceTable').find('tr:not(.head)').remove();
}

function clearAndAddSingleRowInvs(msg) {
	$('#invoiceTable > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	let listDetails9 = document.createElement('td');
	let listDetails8 = document.createElement('td');

	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	$(placeHolder).append(listDetails6);
	$(placeHolder).append(listDetails7);
	$(placeHolder).append(listDetails8);
	$(placeHolder).append(listDetails9);
	
	$('#invoiceTable > tbody').append(placeHolder);
}

function toggleInv (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editInvoice').prop('disabled', false);
	editSelectedInv(source);
	
}

//allows user to edit invoice
function editSelectedInv(source)
{
	//alert(source.id);
	INV_ACTION = "updateInv";
	clearInvForm();
	displayInvWell();
	fillInvWell(source);
	hideExtraValues();
}

//allow user to save invoice using the button
function editSelectedInvBtn(id)
{

	var invListingId = "Inv_" + id;
	var invListing = document.getElementById(invListingId);
		
	INV_ACTION = "updateInv";
	clearInvForm();
	fillInvWell(invListing);
	hideExtraValues();
	
	//if the pdf is being uploaded then upload the pdf invoice otherwise call the invoice submit button
	let file = document.getElementById("filepdf");
	if(file.value != "" ){
		/*if(uploadInvoice(invId)){
			alert("File uploaded successfully"); 
		}*/
		//alert("File is being uploaded, Please make sure to click save otherwise file will not be saved");
		var x = uploadInvoiceSD(invId);
		//alert(x);
		
		
	}
	else{
		//alert("file not selected");
		submitInvBtn(id, 0);
	}
	
	
	
}


//clears invoice form
function clearInvForm()
{
	$('#invoiceCreationZone').find('#invoiceID').val('');
	$('#invoiceCreationZone').find('#associatedPE').val('');
	$('#invoiceCreationZone').find('#invoiceTitle').val('');
	$('#invoiceCreationZone').find('#invoiceNumber').val('');
	$('#invoiceCreationZone').find('#invoiceType').val('');
	$('#invoiceCreationZone').find('#invoiceStatus').val('Requested');
	$('#invoiceCreationZone').find('#submittedDateInv').val('');
	$('#invoiceCreationZone').find('#invoiceAmount').val('');
	$('#invoiceCreationZone').find('#invoiceCustomer').val('');		
	$('#invoiceCreationZone').find('#invoiceApproval').val('');	
	$('#invoiceCreationZone').find('#notes').val('');	
	$('#invoiceCreationZone').find('#invTotal').val('');
	$('#invoiceCreationZone').find('#currInvoiced').val('');
	
	$('#invoiceCreationZone').find('#approval1').val('2');
	$('#invoiceCreationZone').find('#approval2').val('2');
	$('#invoiceCreationZone').find('#approval3').val('2');
}

function displayInvWell() {

	document.querySelector('.bg-modal').style.display = "flex";
	
	$('.bg-modal').show();
	$('.bg-modal').css({top: '200', left: '200', position:'absolute'});
	
	var vertical = event.clientY;
	
	//alert(vertical);
	
	var width = $('#invoiceCreationZone').width();
	//alert("width is-  "+ width);
	
	$("#invoiceCreationZone").css({postion: 'absolute', left: '50%', top: '-15px',
									 'margin-left' : (-$('.className').outerWidth()/2) - width/2, 
									 'margin-top': 'width'});
	
}

//Checks to see if a submit/reject date should be added
//A date is added when the status is changed to Rejected or Submitted. It then sets it to the day the status was changed
function submitRejectDateCheck(){

	//Status is set to "Rejected" or "Submitted"
	if(($('#invoiceCreationZone').find('#invoiceStatusSelectionRow').find('#invoiceStatus').val() == "Rejected" || 
	$('#invoiceCreationZone').find('#invoiceStatusSelectionRow').find('#invoiceStatus').val() == "Submitted")){
			
		//Generates today's date
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		
		$('#invoiceCreationZone').find('#submitRejectDate').val(today);

	}
	
	//Status is not Rejected or Submitted, make it blank
	else{
		$('#invoiceInformation').find('#invoiceCreationZone').find('#submitRejectDate').val('');
	}
}


function fillInvWell(source) {
	
	clearInvForm();
	let tmp_id = source;	
	//alert(tmp_id.id);
	
	let selected_Inv;
		
	for(var i = 0; i < invs.length; i++) {
		
		//compares all invoices to find the one selected
		if("Inv_"+invs[i].id == tmp_id.id) {
			
			selected_Inv = invs[i];
			INVOICES_STORED = invs[i].id;
		
			break;
		}	
	}
	
	if(!selected_Inv) {
		console.log("IMPROPER INV SELECTION");
		return;
	}	
		
	$('#invoiceCreationZone').find('#invoiceID').val(selected_Inv.invoiceID);
	$('#invoiceCreationZone').find('#associatedPE').val(selected_Inv.associatedPE);
	$('#invoiceCreationZone').find('#invoiceNumber').val(selected_Inv.invoiceNumber);
	$('#invoiceCreationZone').find('#invoiceTitle').val(selected_Inv.invoiceTitle);
	$('#invoiceCreationZone').find('#invoiceType').val(selected_Inv.invoiceType);
	$('#invoiceCreationZone').find('#submittedDateInv').val(selected_Inv.submittedDate);
	$('#invoiceCreationZone').find('#invoiceCustomer').val(selected_Inv.invoiceCustomer);
	$('#invoiceCreationZone').find('#invoiceStatus').val(selected_Inv.invoiceStatus);
	$('#invoiceCreationZone').find('#invoiceApproval').val(selected_Inv.invoiceApproval);	
	$('#invoiceCreationZone').find('#submitRejectDate').val(selected_Inv.submitRejectDate);
	$('#invoiceCreationZone').find('#notes').val(selected_Inv.notes);	
	$('#invoiceCreationZone').find('#projID').val(selected_Inv.invoice_id);	
	//testing purpose only
	//alert(selected_Inv.invoice_id);
	
	
	//testing over
	
	$('#invoiceCreationZone').find('#invoiceAmount').val(selected_Inv.invoiceAmount);
	$('#invoiceCreationZone').find('#invoiceAmount').val(selected_Inv.invoiceAmount);
	$('#invoiceCreationZone').find('#invoiceAmount').val(selected_Inv.invoiceAmount);
	$('#invoiceCreationZone').find('#invoiceAmount').val(selected_Inv.invoiceAmount);
	
	$('#invoiceCreationZone').find('#approval1').val(selected_Inv.approval1);	
	$('#invoiceCreationZone').find('#approval2').val(selected_Inv.approval2);	
	$('#invoiceCreationZone').find('#approval3').val(selected_Inv.approval3);	
			

	
}

//prompts user when they want to back out of invoice
function viewInv() {
	
	let updateMessage = "These changes will not be saved, are you sure you want to leave the screen?";
	let createMessage = "This Invoice will not be added, are you sure you want to leave this screen?";
	let displayedMessage;
	
	if(INV_ACTION == "createInv")
		displayedMessage = createMessage;
	else 
		displayedMessage = updateMessage;
	
	if(confirm(displayedMessage))
	{
		//document.getElementById('invoiceInformation').style.width = "100%";
		$('#invoiceCreationZone').hide();
		$('#invoiceDisplay').show();
		//$('#returnAccountsReceivable').show();
	}
	
	$('#invoiceCreationZone').find('#percentOrAmountRow').hide();
	
	$('#invoiceCreationZone').find('#invoiceStatusSelectionRow').show();
}

function hideExtraValues(){
	
	$('#invoiceCreationZone').find('#invoiceStatusSelectionRow').show();

	$('#invoiceCreationZone').find('#percentOrAmountRow').hide();
	$('#invoiceCreationZone').find('#invoiceAmountHide').hide();
	$('#invoiceCreationZone').find('#hide1').hide();
	$('#invoiceCreationZone').find('#hide2').hide();
	$('#invoiceCreationZone').find('#hide3').hide();
	$('#invoiceCreationZone').find('#hide4').hide();
	$('#invoiceCreationZone').find('#hide5').hide();
	$('#invoiceCreationZone').find('#hide6').hide();
	$('#invoiceCreationZone').find('#hide7').hide();
	$('#invoiceCreationZone').find('#hide8').hide();
	$('#invoiceCreationZone').find('#hide10').hide();
	$('#invoiceCreationZone').find('#hide11').hide();
	$('#invoiceCreationZone').find('#hide12').hide();
	
	
	if($('#invoiceCreationZone').find('#invoiceStatus').val() != "Approved"){
		$('#invoiceCreationZone').find('#hide13').hide();
		$('#invoiceCreationZone').find('#hide14').hide();
		$('#invoiceCreationZone').find('#hide15').hide();
	}
	else{
		$('#invoiceCreationZone').find('#hide13').show();
		$('#invoiceCreationZone').find('#hide14').show();
		$('#invoiceCreationZone').find('#hide15').show();
	}

}


function submitInv() {
		
	let invoiceID = $('#invoiceCreationZone').find('#invoiceID').val();
	
	let associatedPE = $('#invoiceCreationZone').find('#associatedPE').val();

	let invoiceTitle = $('#invoiceCreationZone').find('#invoiceTitle').val();
	let invoiceNumber = $('#invoiceCreationZone').find('#invoiceNumber').val();
	let invoiceType = $('#invoiceCreationZone').find('#invoiceType').val();

	let invoice_id = $('#invoiceCreationZone').find('#projID').val();
	let projectID = $('#invoiceCreationZone').find('#projID').val();

	let amountType = $('#invoiceCreationZone').find('#percentOrAmount').val();	

	let submittedDate = $('#invoiceCreationZone').find('#submittedDateInv').val();		
	let submitRejectDate = $('#invoiceCreationZone').find('#submitRejectDate').val();		
	let invoiceAmount = $('#invoiceCreationZone').find('#invoiceAmount').val();
	let invoiceCustomer = $('#invoiceCreationZone').find('#invoiceCustomer').val();
	
	
	let invoiceStatus = $('#invoiceCreationZone').find('#invoiceStatus').val();
	
	let invoiceApproval = $('#invoiceCreationZone').find('#invoiceApproval').val();
	let notes = $('#invoiceCreationZone').find('#notes').val();
	
	let approval1 = $('#invoiceCreationZone').find('#approval1').val();
	let approval2 = $('#invoiceCreationZone').find('#approval2').val();
	let approval3 = $('#invoiceCreationZone').find('#approval3').val();
		
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");

	submitRejectDateCheck();
	
	if(INV_ACTION == "updateInv"){
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				
				'action': 'updateInvoice',
				'project': projectID,
				'currInvoice':INVOICES_STORED,
				'invoiceID': invoiceID,
				'associatedPE': associatedPE,
				'invoiceTitle': invoiceTitle,
				'invoiceNumber': invoiceNumber,
				'invoiceType': invoiceType,
				'submittedDate': submittedDate,
				'submitRejectDate':submitRejectDate,
				'invoiceAmount': invoiceAmount,
				'invoiceCustomer': invoiceCustomer,
				'invoiceStatus': invoiceStatus,
				'invoiceApproval' : invoiceApproval,				
				'notes' : notes,
				'approval1' : approval1,
				'approval2' : approval2,
				'approval3' : approval3,
				'invoice_id' : invoice_id,
																																																				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'UPDATED_INVOICE') {
					alert('Invoice Updated Successfully');
				
					//Makes the user return to the invoice screen 
					//document.getElementById('invoiceInformation').style.width = "100%";
					$('#invoiceCreationZone').hide();
					$('#invoiceDisplay').show();
					clearInvoiceTable();
					getInvs(1);
				}
			}
		});
	}	
}

function submitInvBtn(id, invAvailable) {
	
	//alert("Invoice pdf uploaded or not? " +  invAvailable);
	//alert("btnId");
	
	//alert(id);
	
	let invId = id.split('_').pop();
	let Id = invId;
	//alert(invId);
	
	invId = "Inv_"+invId;	
	let invoiceIDForm = invId;
	let invStatus = "invoiceStatus_" + invoiceIDForm;
	
	let invoiceID = $('#invoiceCreationZone').find('#invoiceID').val();
	//alert("invoice ID id - " + invoiceID);
	let associatedPE = $('#invoiceCreationZone').find('#associatedPE').val();
	//alert("associated pe number is - " + associatedPE);
	
	//let peInvNum = invoiceID + "-" + associatedPE;
	let peInvNum = document.getElementById("mcs_pe_" + id).innerHTML;
	peInvNum = peInvNum.substring(6);
	
	let invoiceTitle = $('#invoiceCreationZone').find('#invoiceTitle').val();
	let invoiceNumber = $('#invoiceCreationZone').find('#invoiceNumber').val();
	let invoiceType = $('#invoiceCreationZone').find('#invoiceType').val();

	let invoice_id = $('#invoiceCreationZone').find('#projID').val();
	
	let projectID = $('#invoiceCreationZone').find('#projID').val();

	let amountType = $('#invoiceCreationZone').find('#percentOrAmount').val();	

	let submittedDate = $('#invoiceCreationZone').find('#submittedDateInv').val();		
	
	//this is the date which is automatically generated when status is changed from requested to any other,
	// need to get it from the invoice que rather than the modal box
	//let submitRejectDate = $('#invoiceCreationZone').find('#submitRejectDate').val();		
	let submitRejectDate = document.getElementById("submitted_date_" + invId);
	submitRejectDate = submitRejectDate.value;
	
	//convert html date todd-mm-yyyy format
	//submitRejectDate.innerHTML = invs[i].submitRejectDate;
	/*const d = new Date(submitRejectDate)
	
	const str = submitRejectDate;

	const [year, month, day] = str.split('-');

	submitRejectDate = `${day}/${month}/${year}`;
	
	alert(submitRejectDate); */
	
	let invoiceAmount = $('#invoiceCreationZone').find('#invoiceAmount').val();
	let invoiceCustomer = $('#invoiceCreationZone').find('#invoiceCustomer').val();
	
	//this is the status variable, need to take the value from the invoice queue rather than the modal form
	//let invoiceStatus = $('#invoiceCreationZone').find('#invoiceStatus').val();
	
	
	
	
	//invoiceStatus = $(invStatus).val()
	//alert(invoiceStatus);
	
	let invoiceApproval = $('#invoiceCreationZone').find('#invoiceApproval').val();
	
	//let notes = document.getElementById("notes_edit_" + id).value;
	//redoing the notes based on the checkbox parts
	let notes = document.getElementById("notes_text_field_" + id).value;
	let incAmt = document.getElementById("notes_check_box_incorrectAmount_" + id).checked;
	let incCus = document.getElementById("notes_check_box_incorrectCustomer_" + id).checked;
	let cusRej = document.getElementById("notes_check_box_customerRejected_" + id).checked;
	let incWor = document.getElementById("notes_check_box_incompleteWork_" + id).checked;
	
	if(incAmt) notes = notes + "1"; else notes = notes + "0";
	if(incCus) notes = notes + "1"; else notes = notes + "0";
	if(cusRej) notes = notes + "1"; else notes = notes + "0";
	if(incWor) notes = notes + "1"; else notes = notes + "0";
	
	//alert(notes);
	
	//alert("notes_edit_text_field_" + id);
	
	if(notes == "Others"){
		notes = document.getElementById("notes_edit_text_field_" + id).value;
	}
	
	//alert(notes);
	
	let approval1 = $('#invoiceCreationZone').find('#approval1').val();
	let approval2 = $('#invoiceCreationZone').find('#approval2').val();
	let approval3 = $('#invoiceCreationZone').find('#approval3').val();
		
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");

	//submitRejectDateCheck();
	
	//if the user is attaching the invoice then get the changed Review dropdown
	let invoiceStatus = document.getElementById("invoiceStatus_Inv_" + id);
	//invoiceStatus = invoiceStatus.value;
	
	//if one of the approving members is changing the status from review to anything else then do not change the value in original invoice queue
	let invoiceStatusToSubmit;
	if(invoiceStatus.getAttribute('original') === "Review"){
		invoiceStatusToSubmit = invoiceStatus.getAttribute('original');
	}
	else{
		invoiceStatusToSubmit = invoiceStatus.value;
	}
	
	//alert(invoiceStatusToSubmit);
	
	//now handling the variables for the approvals part
	let approvalStatus = document.getElementById("invoiceStatus_Inv_" + id).value;
	let statusDate = getToday();
	
	if(INV_ACTION == "updateInv"){
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				
				'action': 'updateInvoice',
				'project': projectID,
				'currInvoice':INVOICES_STORED,
				'invoiceID': invoiceID,
				'associatedPE': associatedPE,
				'invoiceTitle': invoiceTitle,
				'invoiceNumber': invoiceNumber,
				'invoiceType': invoiceType,
				'submittedDate': submittedDate,
				'submitRejectDate':submitRejectDate,
				'invoiceAmount': invoiceAmount,
				'invoiceCustomer': invoiceCustomer,
				'invoiceStatus': invoiceStatusToSubmit,
				'invoiceApproval' : invoiceApproval,				
				'notes' : notes,
				'approval1' : approval1,
				'approval2' : approval2,
				'approval3' : approval3,
				'invoice_id' : invoice_id,
				'peInvNum' : peInvNum,
																																																				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'UPDATED_INVOICE') {
					
					//now update the approvals too
	
					//only update the individual user approvals if it changes from review to approved or rejected
					if(invoiceStatusToSubmit === "Review"){
						
					$.ajax({
						type: 'POST',
						url: 'UpdateApprovals', 
						data: {
							
							'action': 'updateInvoiceApprovals',
							'id': id,
							'project': projectID,
							'currInvoice':INVOICES_STORED,
							'invoiceID': invoiceID,
							'approvalStatus' : approvalStatus,
							'statusDate' : statusDate,
							'userApprovalIndex' : userApprovalIndex,
							'invAvailable' : invAvailable,
																																																							
						}, complete: function (serverResponse) {
							console.log(serverResponse);
							let response = $.trim(serverResponse.responseText);
							if (response === 'UPDATED_APPROVALS') {
								alert('Invoice Updated Successfully');
							
								//Makes the user return to the invoice screen 
								//document.getElementById('invoiceInformation').style.width = "100%";
								$('#invoiceCreationZone').hide();
								$('#invoiceDisplay').show();
								clearInvoiceTable();
								//getInvs(1);
								fetchApprovalsAll();
							}
						}
					});
					}
					
					else{
						alert('Invoice Updated Successfully');
						//Makes the user return to the invoice screen 
						//document.getElementById('invoiceInformation').style.width = "100%";
						$('#invoiceCreationZone').hide();
						$('#invoiceDisplay').show();
						clearInvoiceTable();
						//getInvs(1);
						fetchApprovalsAll();
					}
					
				
					//Makes the user return to the invoice screen 
					//document.getElementById('invoiceInformation').style.width = "100%";
					$('#invoiceCreationZone').hide();
					$('#invoiceDisplay').show();
					//clearInvoiceTable();
					//getInvs(1);
				}
			}
		});
		
	}	
	
}

//check whether the file exists for a particular invoice queue or not
function getInvoiceAttStatus(id, status, mcsPE){
	//id = id.substring(id.length-1);
	id = id.split('_').pop();
	
	//alert("id after splitting is - " + id);
	//alert(mcsPE);
	//const result = str.split(',').pop();
	
	//let status = document.getElementById("invoiceStatus_Inv_"+id);
	
	//alert(status.id);
	
	
	$.ajax({
			type: 'POST',
			url: 'GetInvAttStatus', 
			data: {
				action: "GetInvAttStatus",
				invStatus: status,
				invId: id,	
				mcsPE: mcsPE,
			},
			complete: function (serverResponse) {
				//console.log(serverResponse);
				//alert(serverResponse);
				let response = $.trim(serverResponse.responseText);
				
				//alert(response);
				
				let invIcon = document.getElementById("inv_att_" + id);
				
				
				
				if (response === 'true') {
					//alert('File Exists for id - ' + id);
					
					//return "true";
					invIcon.setAttribute("invoiceavailable", "yes");
					
					var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
					
					switch(invStatus.value){
						case "Submitted":
						    invIcon.src = "icons/green_pdf.png";
						    
						break;
						case "Requested":
							invIcon.src = "icons/grey_pdf.png";
						break;
						case "Review":
							invIcon.src = "icons/blue_pdf.png";
						case "Rejected":
							invIcon.src = "icons/red_pdf.png";
						default:
					}
					
				}
				else{
					invIcon.setAttribute("invoiceavailable", "no");
					invIcon.src = "icons/grey_pdf.png";
					
					
				}
				 
			}
		});
	
}

//function to check permission for each user type and populate the page based on that
function permissionCheckforStatus(id){
	//alert(id);
	let user;
	
	
	
	//first call for user type
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, success: function (data) {
			user = data;
			
			if (user.permission.name == "basic")
			{
				//alert("basic user");
				let status = document.getElementById("invoiceStatus_Inv_" + id).value;
				//alert(status.value);
				let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
				//alert(mcsPE);
				//need to do a nested call to the server to see whether the file exists or not
				$.ajax({
					type: 'POST',
					url: 'GetInvAttStatus', 
					data: {
						action: "GetInvAttStatus",
						invStatus: status,
						invId: id,	
						mcsPE: mcsPE,
					},
					complete: function (serverResponse) {
						//console.log(serverResponse);
						//alert(serverResponse);
						let response = $.trim(serverResponse.responseText);
						
						//alert(response);
						
						let invIcon = document.getElementById("inv_att_" + id);
						
						
						
						if (response === 'true') {
							//alert('Inside true for invoice available - ' + id);
							
							//return "true";
							invIcon.setAttribute("invoiceavailable", "yes");
							let link = document.createElement("a");
							link.href = "#";
							invIcon.appendChild(link);	
							
							var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
							
							switch(invStatus.value){
								case "Submitted":
								    invIcon.src = "icons/green_pdf.png";
									break;
								case "Approved":
								    invIcon.src = "icons/green_pdf.png";
									break;
								case "Rejected":
								    invIcon.src = "icons/red_pdf.png";
									break;
								case "Review":
									invIcon.src = "icons/yellow_pdf.png";
									break;
								case "Processing":
									invIcon.src = "icons/yellow_pdf.png";
									break;
								case "Requested":
									invIcon.src = "icons/grey_pdf.png";
									break;
								default:
							}
							
							//invIcon.setAttribute("invoiceavailable", "no");
							
							/*
							invIcon.onclick = function () {
							//link.onclick = function (){ 
							var id = this.id;
							
								openInvoice(mcsPE, id);
							
							}
							*/
							
							
						}
						else{
							//invIcon.setAttribute("invoiceavailable", "yes");
							
							invIcon.src = "icons/grey_pdf.png";
							invIcon.onmouseover = function() {
						
					}
							/*
							invIcon.onclick = function () {
							var id = this.id;
							
							var pdf = document.getElementById("filepdf");
							pdf.accept = ".pdf";
							pdf.click();
							
							pdf.onchange = function(){
								enableSubmitButton(id.split('_').pop());
							}
			
			
							}
							*/
						}
						 
					}
				});
	
				document.getElementById("invoiceStatus_Inv_" + id).disabled = true;
					
			
			}
		
		
			else //(user.permission.name == "admin")
			{
				//alert("admin user");
				let status = document.getElementById("invoiceStatus_Inv_" + id).value;
				//alert(status.value);
				let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
				//alert(mcsPE);
				//need to do a nested call to the server to see whether the file exists or not
				$.ajax({
					type: 'POST',
					url: 'GetInvAttStatus', 
					data: {
						action: "GetInvAttStatus",
						invStatus: status,
						invId: id,	
						mcsPE: mcsPE,
					},
					complete: function (serverResponse) {
						//console.log(serverResponse);
						//alert(serverResponse);
						let response = $.trim(serverResponse.responseText);
						
						//alert(response);
						
						let invIcon = document.getElementById("inv_att_" + id);
						
						
						
						if (response === 'true') {
							//alert('Inside true for invoice available - ' + id);
							
							//return "true";
							invIcon.setAttribute("invoiceavailable", "no");
							let link = document.createElement("a");
							link.href = "#";
							invIcon.appendChild(link);	
							
							var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
							
							switch(invStatus.value){
								case "Submitted":
								    invIcon.src = "icons/green_pdf.png";
									break;
								case "Review":
									invIcon.src = "icons/yellow_pdf.png";
									break;
								case "Processing":
									invIcon.src = "icons/yellow_pdf.png";
									break;
								case "Rejected":
								    invIcon.src = "icons/red_pdf.png";
									break;
								case "Requested":
								    invIcon.src = "icons/grey_pdf.png";
									break;
								case "Approved":
								    invIcon.src = "icons/green_pdf.png";
									break;
								default:
									invIcon.src = "icons/green_pdf.png";
									break;
							}
							
							invIcon.setAttribute("invoiceavailable", "no");
							/*invIcon.onclick = function () {
							//link.onclick = function (){ 
							var id = this.id;
							
								openInvoice(mcsPE, id);
							
							}*/
							
						}
						else{
							
							invIcon.src = "icons/grey_pdf.png";
							/*invIcon.onclick = function() {
								this.disabled = true;
							} */
							//invIcon.setAttribute("invoiceavailable", "yes");
							
							/*
							invIcon.src = "icons/red_pdf.png";
							invIcon.onclick = function () {
							var id = this.id;
							
							var pdf = document.getElementById("filepdf");
							pdf.accept = ".pdf";
							pdf.click();
							
							pdf.onchange = function(){
								enableSubmitButton(id.split('_').pop());
							}
			
			
							}
							*/
						}
						 
					}
				});
	
				//document.getElementById("invoiceStatus_Inv_" + id).disabled = true;
					
			}
			
			}
	});
	
}

function setInvoiceIcon(id){
	//alert(id);
	//if (user.permission.name == "basic")
	if(userType == "basic")
	{
		//alert("basic user");
		let status = document.getElementById("invoiceStatus_Inv_" + id).value;
		//alert(status.value);
		let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
		$.ajax({
			type: 'POST',
			url: 'GetInvAttStatus', 
			data: {
				action: "GetInvAttStatus",
				invStatus: status,
				invId: id,	
				mcsPE: mcsPE,
			},
			complete: function (serverResponse) {
				//console.log("Customer emails response is- ", serverResponse);
				//alert(serverResponse);
				let response = $.trim(serverResponse.responseText);
				
				//alert(response);
				
				//console.log("Customer emails response is- ", response);
				
				let invIcon = document.getElementById("inv_att_" + id);
				
				
				
				if (response === 'true') {
					//alert('Inside true for invoice available - ' + id);
					
					//return "true";
					invIcon.setAttribute("invoiceavailable", "yes");
					let link = document.createElement("a");
					link.href = "#";
					invIcon.appendChild(link);	
					
					var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
					//var invStatus = invStatus.getAttribute('original')
					//alert(invStatus.getAttribute('original'));
					
					switch(invStatus.getAttribute('original')){
						case "Submitted":
						    invIcon.src = "icons/green_pdf.png";
							break;
						case "Approved":
						    invIcon.src = "icons/green_pdf.png";
							break;
						case "Rejected":
						    invIcon.src = "icons/red_pdf.png";
							break;
						case "Review":
							invIcon.src = "icons/yellow_pdf.png";
							break;
						case "Processing":
							invIcon.src = "icons/yellow_pdf.png";
							break;
						case "Requested":
							invIcon.src = "icons/grey_pdf.png";
							break;
						default:
					}
					
					//invIcon.setAttribute("invoiceavailable", "no");
					/*invIcon.onclick = function () {
					//link.onclick = function (){ 
						var id = this.id;
					
						openInvoice(mcsPE, id);
					
					}*/
					
					
					
				}
				else{
					//invIcon.setAttribute("invoiceavailable", "yes");
					
					invIcon.src = "icons/grey_pdf.png";
					invIcon.onmouseover = function() {
						var x = 0;
					}
						
					
				}	 
			}
				
			});

			document.getElementById("invoiceStatus_Inv_" + id).disabled = true;
				
		
		}
	
		
	else //(user.permission.name == "admin")
	{
		//alert("admin user");
		let status = document.getElementById("invoiceStatus_Inv_" + id).value;
		//alert(status.value);
		let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
		//alert(mcsPE);
		//need to do a nested call to the server to see whether the file existx or not
		$.ajax({
			type: 'POST',
			url: 'GetInvAttStatus', 
			data: {
				action: "GetInvAttStatus",
				invStatus: status,
				invId: id,	
				mcsPE: mcsPE,
			},
			complete: function (serverResponse) {
				//console.log(serverResponse);
				//alert(serverResponse);
				let response = $.trim(serverResponse.responseText);
				
				//alert(response);
				
				let invIcon = document.getElementById("inv_att_" + id);
				
				
				
				if (response === 'true') {
					//alert('Inside true for invoice available - ' + id);
					
					//return "true";
					invIcon.setAttribute("invoiceavailable", "no");
					let link = document.createElement("a");
					link.href = "#";
					invIcon.appendChild(link);	
					
					var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
					
					//switch(invStatus.value){
					switch(invStatus.getAttribute('original')){
						case "Submitted":
							//alert(invStatus.value);
						    invIcon.src = "icons/green_pdf.png";
							break;
						case "Review":
							//alert(invStatus.value);
							invIcon.src = "icons/yellow_pdf.png";
							break;
						case "Processing":
							invIcon.src = "icons/yellow_pdf.png";
							break;
						case "Rejected":
						    invIcon.src = "icons/red_pdf.png";
							break;
						case "Requested":
						    invIcon.src = "icons/grey_pdf.png";
							break;
						case "Approved":
						    invIcon.src = "icons/green_pdf.png";
							break;
						default:
							//invIcon.src = "icons/green_pdf.png";
							break;
					}
					
					invIcon.setAttribute("invoiceavailable", "no");
					/*invIcon.onclick = function () {
					//link.onclick = function (){ 
					var id = this.id;
					
						openInvoice(mcsPE, id);
					
					}*/
					
				}
				else{
					
					invIcon.src = "icons/grey_pdf.png";
					/*invIcon.onclick = function() {
						//this.disabled = true;
					} */
					
				}
				 
			}
		});

		//document.getElementById("invoiceStatus_Inv_" + id).disabled = true;
			
	}	
}

//set the color fo the invoice icon
function setInvoiceIconColor(id, invoiceID){
	
	let invIcon = document.getElementById("inv_att_" + id);
	let mcsPE = document.getElementById("mcs_pe_" + id).innerHTML;
	
	
	for(var j = 0; j < invApprovals.length; j++){
		if(invApprovals[j].approval_id == id) {
			if (invApprovals[j].invavailable == 1) {
				//alert('Inside true for invoice available - ' + id);
				
				//return "true";
				//invIcon.setAttribute("invoiceavailable", "no");
				let link = document.createElement("a");
				link.href = "#";
				invIcon.appendChild(link);	
				
				var invStatus = document.getElementById("invoiceStatus_Inv_" + id);
				
				//alert(invStatus.getAttribute('original'));
				
				//switch(invStatus.value){
				switch(invStatus.getAttribute('original')){
					case "Submitted":
						//alert(invStatus.value);
					    invIcon.src = "icons/green_pdf.png";
						break;
					case "Review":
						//alert(invStatus.value);
						invIcon.src = "icons/yellow_pdf.png";
						break;
					case "Processing":
						invIcon.src = "icons/yellow_pdf.png";
						break;
					case "Rejected":
					    invIcon.src = "icons/red_pdf.png";
						break;
					case "Requested":
					    invIcon.src = "icons/yellow_pdf.png";
						break;
					case "Approved":
					    invIcon.src = "icons/green_pdf.png";
						break;
					default:
						//invIcon.src = "icons/green_pdf.png";
						break;
				}
				
				invIcon.setAttribute("invoiceavailable", "no");
				/*invIcon.onclick = function () {
				//link.onclick = function (){ 
					var id = this.id;
				
					openInvoice(mcsPE, id);
				
				}*/
				
			}
			else{
				
				invIcon.src = "icons/grey_pdf.png";
				/*invIcon.onclick = function() {
					//this.disabled = true;
				} */
				
			}
		}
	}
	
}

function openInvoice(mcsPE, id){
	
	var host = location.host;
	$.ajax({
			type: 'POST',
			url: 'GetInvAttStatus', 
			data: {
				action: "GetInvoice",
				mcsPE: mcsPE,
				host : host,
			},
			complete: function (data) {
				//console.log(serverResponse);
				//alert(data);
				//window.location = 'GetInvAttStatus';
				
				
				
				var href = location.href;
				var pathname = location.pathname;				
				pathname = pathname.substring(0, pathname.lastIndexOf("/"));
				//alert(pathname);
				
				//var loc = host + "/MillerRebuilt/upload/" + mcsPE + ".pdf";
				var loc = host + pathname + "/upload/" + mcsPE+".pdf";
				
				//alert(loc);
				
				//window.open("http://" + host + "/MillerRebuilt/upload/" + mcsPE + ".pdf");
				
				//window.open("http://" + host + "/MillerRebuilt_tester/upload/" + mcsPE + ".pdf");
				
				// Generate a unique query parameter (timestamp) to fool the browser to load new file
				const timestamp = new Date().getTime();	
				
				window.open("http://" + loc + "?timestamp=" + timestamp );
				
				//window.open("http://192.168.0.250/users2/Saurabh/Invoices/" +mcsPE + ".pdf");
				//var pdfWin= window.open(data);
				//window.open(data, '_blank', 'fullscreen=yes');
				//window.open("data:application/pdf," + data);
				// ADD OPEN WHIT WINDOW JAVASCRIPT
				//var pdfData = convertDataURIToBinary('data:application/pdf;base64,' + data);
				//window.open(pdfData);
				//let response = $.trim(serverResponse.responseText);
				
				//var blob = new Blob([data], { type: 'application/pdf' }),
				//fileURL = URL.createObjectURL(blob);
				
				//var blob = new Blob([data], {type: 'application/pdf'});
				//var blobURL = URL.createObjectURL(blob);
				//window.open(blobURL);
				
				
				//var file = new File( [blob], 'a_name.pdf', { type: 'application/pdf' } )
				//iframe.src = URL.createObjectURL( file )
 	
				// open new URL
				//window.open(fileURL);
				
				//alert(response);
				
				               
                       
				
				//let invIcon = document.getElementById("inv_att_" + id);
				//let link = document.createElement("a");
				
				
				
				
				
				 
			}
		});
	
}

//function to fetch approvals frome the database
function fetchApprovals(invoiceID, id){
	console.log('This is NOT being called');
	$.ajax({
			type: 'POST',
			url: 'UpdateApprovals', 
			data: {
				action: "FetchApprovals",
				invoiceID: invoiceID,
			},
			complete: function (data) {
				let response = $.trim(data.responseText);
				console.log("Invoice approval data is- ", response);
				
				response = JSON.parse(response);
				
				//alert(response.length);
				
				let invIcon = document.getElementById("inv_att_" + id);
				
				if(response.length == 1){
					console.log("Number of approvals- ", response[0].noOfApprovals);
					
					
				}
				
				
				
				//const approvalusers = [response[0].user_1, response[0].user_2. response[0].user_3, response[0].user_4, response[0].user_5 ];
				//const approvaldates = [response[0].date_1, response[0].date_2, response[0].date_3, response[0].date_4, response[0].date_5];
				//const approvalstatus = [response[0].status_1, response[0].status_2, response[0].status_3, response[0].status_4, response[0].status_5];
				
				let x = document.getElementById("approvals_"+ id );
				const approvalusers = [];
				const approvaldates = [];
				const approvalstatus = [];
				
				
				
				if((response[0].user_1 != undefined) & (noOfApprovals >= 1)){
					approvalusers.push(response[0].user_1);
					approvaldates.push(response[0].date_1)
					approvalstatus.push(response[0].status_1);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[0].toUpperCase() + ": " + approvalstatus[0] + " - " + approvaldates[0].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[0] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[0] == "Approved"){
						values.style.color = "green";
					}
	
				}
				//also dont show that small onhover box without data
				else{
					invIcon.onmouseover = function() {
						
					}
				}
				
				if((response[0].user_2 != undefined) & (noOfApprovals >= 2)){
					approvalusers.push(response[0].user_2);
					approvaldates.push(response[0].date_2)
					approvalstatus.push(response[0].status_2);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[1].toUpperCase() + ": " + approvalstatus[1] + " - " + approvaldates[1].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[1] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[1] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if((response[0].user_3 != undefined) & (noOfApprovals >= 3)){
					approvalusers.push(response[0].user_3);
					approvaldates.push(response[0].date_3)
					approvalstatus.push(response[0].status_3);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[2].toUpperCase() + ": " + approvalstatus[2] + " - " + approvaldates[2].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[2] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[2] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if((response[0].user_4 != undefined) & (noOfApprovals >= 4)){
					approvalusers.push(response[0].user_4);
					approvaldates.push(response[0].date_4)
					approvalstatus.push(response[0].status_4);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[3].toUpperCase() + ": " + approvalstatus[3] + " - " + approvaldates[3]; 
					x.appendChild(values);
					if(approvalstatus[3] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[3] == "Approved"){
						values.style.color = "green";
					}
				}
					
				if((response[0].user_5 != undefined) & (noOfApprovals >= 5)){
					approvalusers.push(response[0].user_5);
					approvaldates.push(response[0].date_5)
					approvalstatus.push(response[0].status_5);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[4].toUpperCase() + ": " + approvalstatus[4] + " - " + approvaldates[4]; 
					x.appendChild(values);
					if(approvalstatus[4] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[4] == "Approved"){
						values.style.color = "green";
					}
				}
					
			}
			
		});
}

//function to fetch all the approvals of invoice approvals
function fetchApprovalsAll(){
	
	$.ajax({
		type: 'POST',
		url: 'UpdateApprovals', 
		data: {
			action: "FetchApprovalsAll",
		},
		complete: function (data) {
			let response = $.trim(data.responseText);	
			response = JSON.parse(response);
			invApprovals = response;
			
			if(response.length == 1){
				console.log("Number of approvals- ", response[0].noOfApprovals);
				
			}	
			getInvs(1);
	
		}
			
	});
}

// adding approvals data to onhover on invoice icon
//AG - need to beautify this function
function addApproval(invoiceID, id){
	for(var j = 0; j < invApprovals.length; j++){
			if(invApprovals[j].approval_id == id){

	
				let x = document.getElementById("approvals_"+ id );
				const approvalusers = [];
				const approvaldates = [];
				const approvalstatus = [];
				
				if((invApprovals[j].user_1 != undefined) & (noOfApprovals >= 1)){
					approvalusers.push(invApprovals[j].user_1);
					approvaldates.push(invApprovals[j].date_1)
					approvalstatus.push(invApprovals[j].status_1);
					let values = document.createElement("p");

					values.innerHTML = approvingMembers[0][0].name.toUpperCase() + ": " + approvalstatus[0] + " - " + approvaldates[0].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[0] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[0] == "Approved"){
						values.style.color = "green";
					}
					
					
					
				}
				//also dont show that small onhover box without data
				else{
					invIcon.onmouseover = function() {
						
					}
				}
				
				if((invApprovals[j].user_2 != undefined) & (noOfApprovals >= 2)){
					approvalusers.push(invApprovals[j].user_2);
					approvaldates.push(invApprovals[j].date_2)
					approvalstatus.push(invApprovals[j].status_2);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[1].toUpperCase() + ": " + approvalstatus[1] + " - " + approvaldates[1].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[1] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[1] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if((invApprovals[j].user_3 != undefined) & (noOfApprovals >= 3)){
					approvalusers.push(invApprovals[j].user_3);
					approvaldates.push(invApprovals[j].date_3)
					approvalstatus.push(invApprovals[j].status_3);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[2].toUpperCase() + ": " + approvalstatus[2] + " - " + approvaldates[2].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[2] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[2] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if((invApprovals[j].user_4 != undefined) & (noOfApprovals >= 4)){
					approvalusers.push(invApprovals[j].user_4);
					approvaldates.push(invApprovals[j].date_4)
					approvalstatus.push(invApprovals[j].status_4);
					let values = document.createElement("p")
					values.innerHTML = approvalusers[3].toUpperCase() + ": " + approvalstatus[3] + " - " + approvaldates[3]; 
					x.appendChild(values);
					if(approvalstatus[3] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[3] == "Approved"){
						values.style.color = "green";
					}
				}
					
				if((invApprovals[j].user_5 != undefined) & (noOfApprovals >= 5)){
					approvalusers.push(invApprovals[j].user_5);
					approvaldates.push(invApprovals[j].date_5)
					approvalstatus.push(invApprovals[j].status_5);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[4].toUpperCase() + ": " + approvalstatus[4] + " - " + approvaldates[4]; 
					x.appendChild(values);
					if(approvalstatus[4] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[4] == "Approved"){
						values.style.color = "green";
					}
				}
				
				 
			}
		}
}

//function for showing approval data  //not being used now
function fillInvoiceApprovals(){
	
	
	//alert(invs.length);
	//alert(invApprovals.length);
	
	for (var i = 0; i < invs.length; i++){
		for(var j = 0; j < invApprovals.length; j++){
			if(invApprovals[j].approval_id == invs[i].id){
				//alert("equal");
				
				let id = invs[i].id;
				
				//alert(id);
				
				let x = document.getElementById("approvals_"+ id );
				const approvalusers = [];
				const approvaldates = [];
				const approvalstatus = [];
				
				if(invApprovals[j].user_1 != undefined){
					approvalusers.push(invApprovals[j].user_1);
					approvaldates.push(invApprovals[j].date_1)
					approvalstatus.push(invApprovals[j].status_1);
					let values = document.createElement("p");
					//values.innerHTML = approvalusers[0].toUpperCase() + ": " + approvalstatus[0] + " - " + approvaldates[0].slice(0, -2); 
					values.innerHTML = approvingMembers[0][0].name.toUpperCase() + ": " + approvalstatus[0] + " - " + approvaldates[0].slice(0, -2); 
					console.log("Testing" + values.innerHTML);
					x.appendChild(values);
					if(approvalstatus[0] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[0] == "Approved"){
						values.style.color = "green";
					}
					
					
					
				}
				//also dont show that small onhover box without data
				else{
					invIcon.onmouseover = function() {
						
					}
				}
				
				if(invApprovals[j].user_2 != undefined){
					approvalusers.push(invApprovals[j].user_2);
					approvaldates.push(invApprovals[j].date_2)
					approvalstatus.push(invApprovals[j].status_2);
					let values = document.createElement("p");
					//values.innerHTML = approvalusers[1].toUpperCase() + ": " + approvalstatus[1] + " - " + approvaldates[1].slice(0, -2); 
					values.innerHTML = approvingMembers[0][1].toUpperCase() + ": " + approvalstatus[1] + " - " + approvaldates[1].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[1] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[1] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if(invApprovals[j].user_3 != undefined){
					approvalusers.push(invApprovals[j].user_3);
					approvaldates.push(invApprovals[j].date_3)
					approvalstatus.push(invApprovals[j].status_3);
					let values = document.createElement("p");
					//values.innerHTML = approvalusers[2].toUpperCase() + ": " + approvalstatus[2] + " - " + approvaldates[2].slice(0, -2); 
					values.innerHTML = approvingMembers[0][2].toUpperCase() + ": " + approvalstatus[2] + " - " + approvaldates[2].slice(0, -2); 
					x.appendChild(values);
					if(approvalstatus[2] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[2] == "Approved"){
						values.style.color = "green";
					}
				}
				
				if(invApprovals[j].user_4 != undefined){
					approvalusers.push(invApprovals[j].user_4);
					approvaldates.push(invApprovals[j].date_4)
					approvalstatus.push(invApprovals[j].status_4);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[3].toUpperCase() + ": " + approvalstatus[3] + " - " + approvaldates[3]; 
					x.appendChild(values);
					if(approvalstatus[3] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[3] == "Approved"){
						values.style.color = "green";
					}
				}
					
				if(invApprovals[j].user_5 != undefined){
					approvalusers.push(invApprovals[j].user_5);
					approvaldates.push(invApprovals[j].date_5)
					approvalstatus.push(invApprovals[j].status_5);
					let values = document.createElement("p");
					values.innerHTML = approvalusers[4].toUpperCase() + ": " + approvalstatus[4] + " - " + approvaldates[4]; 
					x.appendChild(values);
					if(approvalstatus[4] == "Rejected"){
						values.style.color = "red";
					}
					if(approvalstatus[4] == "Approved"){
						values.style.color = "green";
					}
				}
				
				 
			}
		}
	}
	
	//approvingMembers();
}

//function to fetch customer emails from customer group
function fetchCustomerEmails(){
	
	console.log("data being sent to server for group is", invs);
	
	$.ajax({
		type: 'POST',
		url: 'Customers', 
		data: {
			action: "fetchCustomerEmails",
			customerGroups: JSON.stringify(invs),
		},
		complete: function (data) {
			let response = $.trim(data.responseText);
			console.log("Customer Email data- ", response);
			
			customerEmails = JSON.parse(response);
			
			for(var i = 0; i<customerEmails.length; i++){
				//alert(i);
				let y = customerEmails[i];
				
				if(y[1]){
					//alert(y[1].id);
					let x = document.getElementById("hover_invoice_customer_" + y[y.length-1].id)
					
					//alert(y.length);
					
					for(var c = 0; c<y.length-1; c++){
						//alert("Value of c is- " + c);
						let details = document.createElement("div");
						details.innerHTML = "Name- " + y[c].name + "<br>" +
										"Email- " + y[c].email;
						//x.appendChild(details);
					}
				}
			} 
		}
	});
}


function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";  
  
}


//function to modify number of approvals in the system level
function modifyNoOfApprovals(){
	var x = document.getElementById("noOfApprovals").value;
	
	alert(x);
	
	$.ajax({
			type: 'POST',
			url: 'UpdateApprovals', 
			data: {
				action: "modifyNoOfApprovals",
				noOfApprovals: x,
			},
			complete: function (data) {
				
			
			}
	});

}

function fetchNoOfApprovals(){
	var x = document.getElementById("noOfApprovalsCurrent");
	
	//code to fetch number of approvals
	$.ajax({
			type: 'POST',
			url: 'UpdateApprovals', 
			data: {
				action: "fetchNoOfApprovals",
			},
			complete: function (data) {
				
				let response = $.trim(data.responseText);
				console.log("Current number of approvals is- ", response);
				
				response = JSON.parse(response);
				
				x.innerHTML = "&nbsp" + response[0].noofapprovals;
				noOfApprovals = response[0].noofapprovals;
				
			}
	});
}

function approvingMembers(){
	
//	alert("approving members called");
	
	//var noOfApprovals = document.getElementById("noOfApprovalsCurrent").value;
	
	//alert(noOfApprovals);
	
	//code to fetch current approving members
	$.ajax({
		type: 'POST',
		url: 'UpdateApprovals', 
		data: {
			action: "approvalMembersFetch",
		},
		complete: function (data) {
			
			let response = $.trim(data.responseText);
//			console.log("Approving users are- ", response);
			
			response = JSON.parse(response);
			approvingMembers = response;
			
//			console.log("Users list is - ", response[1] );
			
			var approving = document.getElementById("approvingMembers");
			
			//alert(response[0].id);
			
			var usersSelection = document.getElementById("usersSelection");
			
			for(let i = 0; i<noOfApprovals; i++){
				
				//alert("inside i loop");
				
				let member = document.createElement("select");
			    member.id = "approving_updated_user_" + i;
			    
			    for (let j = 0; j<response[1].length; j++){
					let opt = document.createElement("Option");
					opt.value = response[1][j].id
					opt.textContent = response[1][j].firstname;
					member.appendChild(opt);
				}
				
				member.value = response[0][i].userid;	
				
				
				
			    approving.appendChild(member);
			    
			    let userCheck = document.createElement("input");
				userCheck.type = "checkbox";
				userCheck.id = "invoice_sort_user_" + i;
				userCheck.name = response[0][i].name;
				userCheck.label = response[0][i].name;
				userCheck.value = response[0][i].id;
				userCheck.setAttribute('checked', true);
				
				userCheck.addEventListener('change', (event) => {
				  if (event.currentTarget.checked) {
					event.currentTarget.setAttribute('checked', true);
				    //alert(event.currentTarget.checked);
				    fillInvsTable();
				  } else {
					event.currentTarget.removeAttribute('checked');
				    //alert(event.currentTarget.checked);
				    fillInvsTable();
				  }
				})  
				
//				usersSelection.appendChild(userCheck); //AG - Commenting for future
				let label = document.createElement('label')
				//label.htmlFor = response[0][i].name;
				label.innerHTML =  response[0][i].name + "&nbsp&nbsp&nbsp&nbsp";
			    //label.appendChild(document.createTextNode(response[0][i].name));
			 
			    let br = document.createElement('br');
			    
			    //let container = document.getElementById('usersSelection');
//			    usersSelection.appendChild(userCheck); //AG - Commenting for future
//			    usersSelection.appendChild(label);//AG - Commenting for future
			    //container.appendChild(br);
				
			}
			fetchApprovalsAll();
			
		}
		
	});
}

function modifyApprovingMembers(){
	//alert("Modifying approving members called");
	
	//var noOfApprovals = document.getElementById("noOfApprovalsCurrent").value;
	
	const arr = [];
	
	for(let i = 0; i < noOfApprovals; i++){
		let userApp = document.getElementById("approving_updated_user_" + i);
		//alert(userApp.id);
		//alert(userApp.value);
		
		var obj = new Object();
		obj.id = userApp.value;
		obj.name = userApp.options[userApp.selectedIndex].text;
		//alert(obj.name);
		
		arr.push(obj)
		
	}
	
	var json = JSON.stringify(arr);
	//alert(json);
	
	$.ajax({
			type: 'POST',
			url: 'UpdateApprovals', 
			data: {
				action: "approvalMembersUpdateData",
				users: json,
			},
			complete: function (data) {
				
				let response = $.trim(data.responseText);
				//console.log("Approving users are- ", response);
				
				//alert(response);
				
				if(response === "true"){
					alert("Approving members updated successfully");
				}
				else{
					alert("Error occured, please try again or contact system admin");
				}
								
				
			}
	}); 
}

/**
 * This function makes a number more human friendly by adding commas and by adding a 0 to the decimal
 * Example : instead of 123456.7 being displayed, this method turns it into 123,456.70
 * @param a number
 * @returns human friendly number
 */
function cleanNumericValueForDisplaying(num) {
  var neg;
  if (num < 0) neg = true;
  else neg = false;
  num = Math.abs(num);
  var str = num.toString();

  var price, cleanPrice;
  var dollars, cleanDollars;
  var dollarArray = new Array();
  var correctOrder = '';
  var cents, cleanCents;

  if (str.indexOf('.') != -1) {
    price = str.split('.');
    dollars = price[0];
    cents = price[1];
    if (cents.length == 1) cleanCents = cents + '0';
    else cleanCents = cents;
    var commaCount = 0;
    for (var i = dollars.length - 1; i > -1; i--) {
      commaCount++;
      dollarArray.push(dollars[i]);
      if (commaCount % 3 == 0 && i != 0) dollarArray.push('-');
    }

    cleanDollars = dollarArray.toString();
    while (cleanDollars.indexOf(',') != -1) {
      cleanDollars = cleanDollars.replace(',', '');
    }

    while (cleanDollars.indexOf('-') != -1) {
      cleanDollars = cleanDollars.replace('-', ',');
    }

    for (var i = cleanDollars.length - 1; i > -1; i--) {
      correctOrder += cleanDollars[i];
    }

    cleanPrice = '$' + correctOrder + '.' + cleanCents;
    if (neg) {
      cleanPrice = '(-' + cleanPrice + ')';
    }
    return cleanPrice;
  } else {
    var commaCount = 0;
    for (var i = str.length - 1; i > -1; i--) {
      commaCount++;
      dollarArray.push(str[i]);
      if (commaCount % 3 == 0 && i != 0) dollarArray.push('-');
    }
    cleanDollars = dollarArray.toString();

    while (cleanDollars.indexOf(',') != -1) {
      cleanDollars = cleanDollars.replace(',', '');
    }

    while (cleanDollars.indexOf('-') != -1) {
      cleanDollars = cleanDollars.replace('-', ',');
    }

    for (var i = cleanDollars.length - 1; i > -1; i--) {
      correctOrder += cleanDollars[i];
    }

    cleanPrice = '$' + correctOrder;

    if (neg) {
      cleanPrice = '(-' + cleanPrice + ')';
    }
    return cleanPrice;
  }
}


// Function to check if the current logged in user is in approver list or not, returns 1 if yes, 0 if not in list
function userInApprovalList(){
	let userInApprovers = 0;
	for(let a = 0; a < noOfApprovals; a++){
		if(name.toLowerCase() == approvingMembers[0][a].name.toLowerCase()){
			userApprovalIndex = a;
			userInApprovers = 1;
		}
	}
	return userInApprovers
}