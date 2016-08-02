const PAGETYPE = 'navigateTo';
const EDIT_PAGE = 'projectData.html?type=edit&id=';
const CLOSEOUT_PAGE = 'closeoutData.html?type=closeout&id=';
const PERMIT_PAGE = 'permitData.html?type=permit&id=';
const INSPECTION_PAGE = 'permitData.html?type=permit&id=';
const BASIC_PAGE = 'projectData.html?type=edit&id=';
const CHANGE_ORDER_PAGE = 'changeOrderData.html?type=add&id=';
const CHANGE_ORDER_EDIT = 'changeOrderData.html?type=edit&id=';
const CHANGE_ORDER_PRINT = 'changeOrderPrint.html?type=project&id=';

	
var ID;
var changeOrderCount;
var changeOrderToEdit = null;

$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});

//This function retrieves project information from a project, and prepares it for displaying
function getProject()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'navigateTo')
	{
		var PROJECT_ID = getParameterByName("id");
		ID = PROJECT_ID;

		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': PROJECT_ID,
				
			},
			success: function(data)
			{
				fillTabs(data);
			}
		});
	}
	else
	{
		alert("That's weird... You might want to go back and try again.");
	}
}

function fillTabs(data)
{
	changeOrderCount = 0;
	console.log(data);
	var json = data;

	$(".deleteThis").remove(); // Remove tmp fields in the HTML	

	// Build project information tab
	buildProjectInformation(json);
	
	// Build Change order tab
	buildChangeOrders(json);
	
	// Build Equipment tab
	
	// Build Permit Tab
	buildPermit(json);
	
	// Build inspection tab
	buildInspection(json);
	
	// Build Closeout tab
	buildCloseout(json);
	
	// Build Triggers tab
	generateTriggers(json);
}

function navigateToEditPage(param)
{
	console.log(param);
	console.log("Ah, so you want to edit a page!");
	window.location.href = (BASIC_PAGE+ID);
}

function navigateToCloseoutPage(param)
{
	console.log(param);
	console.log("Ah, so you want the closeout page!");
	window.location.href = (CLOSEOUT_PAGE+ID);
}

function navigateToPermitPage(param)
{
	console.log(param);
	console.log("Ah, so you want the permit page!");
	window.location.href = (PERMIT_PAGE+ID);
}

function navigateToInspectionPage(param)
{
	console.log(param);
	console.log("Ah, so you want the inspection page!");
	window.location.href = (INSPECTION_PAGE+ID);
}

function navigateToChangeOrderPage(param)
{
	console.log(param);
	console.log("Ah, so you want the change order page!");
	window.location.href = CHANGE_ORDER_PAGE+ID;
}

function printChangeOrders()
{
	window.location.href = CHANGE_ORDER_PRINT+ID;
}

function statusConverter(param)
{
	if(param == 1)
		return "Complete";
	else if(param == 2)
		return "Incomplete";
	else if(param == 3)
		return "N/A";
	else
		return "---";
}

/**
 * Builds the basic project information with the json information
 * @param json
 */
function buildProjectInformation(json)
{
	$("#mcsNumber").html(json.McsNumber);
	$("#warehouse").html(json.warehouse.city.name + ", " + json.warehouse.state);
	$("#class").html(json.projectClass.name);
	$("#type").html(json.projectType.name);
	$("#stage").html(json.stage.name);
	$("#manager").html(json.projectManagers.name);
	$("#supervisor").html(json.supervisors[0].name);
	$("#status").html(json.status.name);
	$("#item").html(json.projectItem.name);
	
	var projectEditButton = document.createElement("button");
	projectEditButton.onclick = function() {navigateToEditPage(this)};
	projectEditButton.innerHTML = "Edit Project Information";
	$("#projectInformation").append(projectEditButton);		
}

function buildChangeOrders(json)
{
	var row = document.createElement('tr');
	
	var type = document.createElement('td');
	type.appendChild(document.createTextNode("Type"));
	
	var name = document.createElement('td');
	name.appendChild(document.createTextNode("Brief Description"));
	
	var stat = document.createElement('td');
	stat.appendChild(document.createTextNode("Status"));
	
	var submitted = document.createElement('td');
	submitted.appendChild(document.createTextNode("Submitted Date"));
	
	var approved = document.createElement('td');
	approved.appendChild(document.createTextNode("Approved Date"));
	
	row.appendChild(type);
	row.appendChild(name);
	row.appendChild(stat);
	row.appendChild(submitted);
	row.appendChild(approved);
	$("#changeOrderTable").append(row);
	
	for(var i = 0; i < json.changeOrders.length; i++)
	{
		var changeOrder = json.changeOrders[i];
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", changeOrder.id);
		changeOrderCount++;
		tableRow.onclick = function() {toggleChangeOrder(this)};

		var changeType = document.createElement('td');
		changeType.appendChild(document.createTextNode(parseChangeOrderType(changeOrder.type)));
		
		var briefDescription = document.createElement('td');
		briefDescription.appendChild(document.createTextNode(changeOrder.briefDescription))
		
		var status = document.createElement('td');
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));
		
		var submittedDate = document.createElement('td');
		submittedDate.appendChild(document.createTextNode(changeOrder.submittedDate));
		
		var approvedDate = document.createElement('td');
		if(changeOrder.approvedDate == 'Undefined')
			approvedDate.appendChild(document.createTextNode("---"))
		else
			approvedDate.appendChild(document.createTextNode(changeOrder.approvedDate));
		
		tableRow.appendChild(changeType);
		tableRow.appendChild(briefDescription);
		tableRow.appendChild(status);
		tableRow.appendChild(submittedDate);
		tableRow.appendChild(approvedDate);
		$("#changeOrderTable").append(tableRow);
	}
	var changeOrderAddButton = document.createElement("button");
	changeOrderAddButton.onclick = function() {navigateToChangeOrderPage(this)};
	changeOrderAddButton.innerHTML = "Add Change Order";
	changeOrderAddButton.style.marginRight = "10px";
	$("#changeOrders").append(changeOrderAddButton);
	
	var editChangeOrderButton = document.createElement("button");
	editChangeOrderButton.onclick = function() {editChangeOrder()};
	editChangeOrderButton.innerHTML = "Edit Change Order";
	editChangeOrderButton.setAttribute("id", "editButton");
	editChangeOrderButton.style.marginRight = "10px";
	editChangeOrderButton.disabled = true;
	$("#changeOrders").append(editChangeOrderButton);
	
	var printChangeOrderButton = document.createElement("button");
	printChangeOrderButton.onclick = function() {printChangeOrders()};
	printChangeOrderButton.innerHTML = "Print Change Orders";
	printChangeOrderButton.setAttribute("id", "printButton")
	$("#changeOrders").append(printChangeOrderButton);
}

function buildInspection(json)
{
	$("#buildingInspection").html(json.permits.buildingInspectionLastUpdated);
	$("#buildingInspectionStatus").html(convertPermit(json.permits.buildingInspectionStatus));
	$("#roofingInspection").html(json.permits.roofingInspectionLastUpdated);
	$("#roofingInspectionStatus").html(convertPermit(json.permits.roofingInspectionStatus));
	$("#mechanicalInspection").html(json.permits.mechanicalInspectionLastUpdated);
	$("#mechanicalInspectionStatus").html(convertPermit(json.permits.mechanicalInspectionStatus));
	$("#electricalInspection").html(json.permits.electricalInspectionLastUpdated);
	$("#electricalInspectionStatus").html(convertPermit(json.permits.electricalInspectionStatus));
	$("#plumbingInspection").html(json.permits.plumbingInspectionLastUpdated);
	$("#plumbingInspectionStatus").html(convertPermit(json.permits.plumbingInspectionStatus));
	$("#fireSprinkleInspection").html(json.permits.sprinklerInspectionLastUpdated);
	$("#sprinklerInspectionStatus").html(convertPermit(json.permits.sprinklerInspectionStatus));
	$("#fireAlarmInspection").html(json.permits.fireAlarmInspectionLastUpdated);
	$("#fireAlarmInspectionStatus").html(convertPermit(json.permits.fireAlarmInspectionStatus));
	$("#lowVoltageInspection").html(json.permits.voltageInspectionLastUpdated);
	$("#voltageInspectionStatus").html(convertPermit(json.permits.voltageInspectionStatus));
	
	/*$("#framingInspection").html(json.inspections.framing);
	$("#celingInspection").html(json.inspections.ceiling);
	$("#mechLightSmokeInspection").html(json.inspections.mechanicalLightSmoke);
	$("#roughMechanicalInspection").html(json.inspections.roughin_mechanical);
	$("#roughElectricalInspection").html(json.inspections.roughin_electric);
	$("#roughPlumbingInspection").html(json.inspections.roughin_plumbing);
	$("#fireMarshalInspection").html(json.inspections.fire_marshal);
	$("#healthInspection").html(json.inspections.health);*/
	
	var projectEditButton = document.createElement("button");
	projectEditButton.onclick = function() {navigateToInspectionPage(this)};
	projectEditButton.innerHTML = "Edit Inspection Information";
	$("#inspections").append(projectEditButton);	
}

/**
 * 
 * @param json
 */
function buildPermit(json)
{
	$("#buildingPermit").html(json.permits.building);
	$("#buildingPermitStatus").html(convertPermit(json.permits.buildingPermitStatus));
	$("#roofingPermit").html(json.permits.roofing);
	$("#roofingPermitStatus").html(convertPermit(json.permits.roofingPermitStatus));
	$("#mechanicalPermit").html(json.permits.mechanical);
	$("#mechanicalPermitStatus").html(convertPermit(json.permits.mechanicalPermitStatus));
	$("#electricalPermit").html(json.permits.electrical);
	$("#electricalPermitStatus").html(convertPermit(json.permits.electricalPermitStatus));
	$("#plumbingPermit").html(json.permits.plumbing);
	$("#plumbingPermitStatus").html(convertPermit(json.permits.plumbingPermitStatus));
	$("#fireSprinklePermit").html(json.permits.fire_sprinkler);
	$("#sprinklerPermitStatus").html(convertPermit(json.permits.sprinklerPermitStatus));
	$("#fireAlarmPermit").html(json.permits.fire_alarm);
	$("#fireAlarmPermitStatus").html(convertPermit(json.permits.fireAlarmPermitStatus));
	$("#lowVoltagePermit").html(json.permits.low_voltage);
	$("#voltagePermitStatus").html(convertPermit(json.permits.voltagePermitStatus));
	
	var projectEditButton = document.createElement("button");
	projectEditButton.onclick = function() {navigateToPermitPage(this)};
	projectEditButton.innerHTML = "Edit Permit Information";
	$("#permits").append(projectEditButton);
}

/**
 * builds the closeout information witht the json information
 * @param json
 */
function buildCloseout(json)
{
	$("#mg2Completion").html(statusConverter(json.closeoutDetails.mg2CompletionStatus));
	$("#punchList").html(statusConverter(json.closeoutDetails.punchListStatus));
	$("#verisae").html(statusConverter(json.closeoutDetails.verisaeReportStatus));

	var required = 0;
	var completed = 0;
		
	switch(json.closeoutDetails.mechFinalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.elecFinalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.plumbingFinalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.sprinkleFinalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.buildingFinalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.tmpCertificateStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:
			break;			
	}
	switch(json.closeoutDetails.certificateStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	$("#finalInspectionsRequired").html(required);
	$("#finalInspectionsCompleted").html(completed);
	required = 0;
	completed = 0;
	
	switch(json.closeoutDetails.GCWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.HTIWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.MCSWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.electricalWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.mechanicalWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.otherWarrantyStatusA)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:
			break;			
	}
	switch(json.closeoutDetails.otherWarrantyStatusB)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.plumbingWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.roofingWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.sprinkleWarrantyStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	$("#finalWarrantiesRequired").html(required);
	$("#finalWarrantiesCompleted").html(completed);
	required = 0;
	completed = 0;
	
	switch(json.closeoutDetails.GCStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.HTIStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.MCSStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.electricalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.mechanicalStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.otherFinalLeinsStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.plumbingStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.sprinkleStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	switch(json.closeoutDetails.roofingStatus)
	{
		case "1":
			required++;
			completed++;
			break;
		case "2":
			required++;
			break;
		case "3":
		default:

			break;			
	}
	
	$("#finalLiensRequired").html(required);
	$("#finalLiensCompleted").html(completed);
	
	var projectEditButton = document.createElement("button");
	projectEditButton.onclick = function() {navigateToCloseoutPage(this)};
	projectEditButton.innerHTML = "Edit Closeout Information";
	$("#closeout").append(projectEditButton);	
}

function generateTriggers(json)
{
	var triggerCount = 0;
	
	var triggerElement = document.createElement("p");
	
	if(json.McsNumber == "-1")
	{
		triggerElement.innerHTML = "- Change MCS Number from -1";
		$("#triggers").append(triggerElement);	
		triggerCount++;
	}
	
	if(triggerCount >0)
		$("#triggerTab").text("Triggers (" +triggerCount+")");
	else
	{
		var num = Math.floor((Math.random() * 100) + 1);
		if(num == 100)
			triggerElement.innerHTML = "That's a clean lookin' project :D";
		else if(num == 1)
			triggerElement.innerHTML = "You've done a good job cleaning this project :)";
		else if(num > 1 && num < 20)
			triggerElement.innerHTML = "No triggers set!";
		else if(num > 19 && num < 40)
			triggerElement.innerHTML = "Project is clean!";
		else if(num > 39 && num < 60)
			triggerElement.innerHTML = "This project is trigger-free!";
		else if(num > 59 && num < 80)
			triggerElement.innerHTML = "No warning in project build!";
		else if(num > 79 && num < 100)
			triggerElement.innerHTML = "No triggers!";

		$("#triggers").append(triggerElement);	
	}
}

function editChangeOrder()
{
	console.log(changeOrderToEdit);
	console.log("Ah, so you want the change order page!");
	window.location.href = CHANGE_ORDER_EDIT+ID+"&changeOrderID="+$(changeOrderToEdit).attr("value");;
}

function parseChangeOrderType(param)
{
	switch(param)
	{
		case "1":
			return "COP";
		case "2":
			return "REF";
		case "3":
			return "WHS";
		case "4": 
			return "FAC";
		case "5":
			return "VEN";
		case "6":
		default:
			return "UDF";
	}
}

function parseChangeOrderStatus(param)
{
	switch(param)
	{
		case "1":
			return "Submitted";
		case "2":
			return "MCS Reviewing";
		default:
			return "Undefined";
	}
}

function toggleChangeOrder(param)
{
	if(changeOrderToEdit != null)
		$(changeOrderToEdit).css("background-color", "#dCdCdC");
	$(param).css("background-color", "#CCB4B4");
	console.log($(param).attr("value"));
	changeOrderToEdit = param;
	$("#editButton").prop("disabled", false);
}

function showChangeOrderTable()
{
	console.log(getParameterByName("id"));
	var PROJECT_ID = getParameterByName("id");

	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'get',
			'id': PROJECT_ID,
			
		},
		success: function(data)
		{
			console.log(data);
			fillTable(data);
		}
	});
}

function fillTable(json)
{
	$("p").css("line-height", "5px");

	$("#location").text("Project Location: "  + json.warehouse.city.name + ", " + json.warehouse.state);
	$("#scope").text("Project Scope: " + json.projectItem.name);
	$("#manager").text("Project Manager: " + json.projectManagers.name);

	var header = document.createElement("tr");
	var cust = document.createElement("th");
	cust.appendChild(document.createTextNode("Customer CO#"));
	var mcsCO = document.createElement("th");
	mcsCO.appendChild(document.createTextNode("MCS CO#"));
	var subCO = document.createElement("th");
	subCO.appendChild(document.createTextNode("Sub Names(s)"));
	var proposalDate = document.createElement("th");
	proposalDate.appendChild(document.createTextNode("Proposal Date"));
	var briefDescription = document.createElement("th");
	briefDescription.appendChild(document.createTextNode("Brief Description"));
	var cost = document.createElement("th");
	cost.appendChild(document.createTextNode("Cost ($)"));
	var sell = document.createElement("th");
	sell.appendChild(document.createTextNode("Sell ($)"));
	var status = document.createElement("th");
	status.appendChild(document.createTextNode("Status"));
	var submittedTo = document.createElement("th");
	submittedTo.appendChild(document.createTextNode("Submitted To"));
	var submittedDate = document.createElement("th");
	submittedDate.appendChild(document.createTextNode("Submitted Date"));
	var approvedDate = document.createElement("th");
	approvedDate.appendChild(document.createTextNode("Approved Date"));
	var notes = document.createElement("th");
	notes.appendChild(document.createTextNode("Notes"));
	
	header.appendChild(cust);
	header.appendChild(mcsCO);
	header.appendChild(subCO);
	header.appendChild(proposalDate);
	header.appendChild(briefDescription);
	header.appendChild(cost);
	header.appendChild(sell);
	header.appendChild(status);
	header.appendChild(submittedTo);
	header.appendChild(submittedDate);
	header.appendChild(approvedDate);
	header.appendChild(notes);
	
	$("#changeOrderTable").append(header);
	
	for(var i = 0; i < json.changeOrders.length; i++)
	{
		var row = document.createElement("tr");
		var customer = document.createElement("td");
		customer.appendChild(document.createTextNode(convertCustomer(json.changeOrders[i].type)));
		var mcs = document.createElement("td");
		if(json.changeOrders[i].mcsCO == "" || json.changeOrders[i].mcsCO == "undefined")
			mcs.appendChild(document.createTextNode("---"));
		else
			mcs.appendChild(document.createTextNode(json.changeOrders[i].mcsCO));			
		var sub = document.createElement("td");
		if(json.changeOrders[i].subCO == "" || json.changeOrders[i].subCO == "undefined")
			sub.appendChild(document.createTextNode("---"));
		else
			sub.appendChild(document.createTextNode(json.changeOrders[i].subCO));
		var proposal = document.createElement("td");
		if(json.changeOrders[i].proposalDate == "" || json.changeOrders[i].proposalDate == "undefined")
			proposal.appendChild(document.createTextNode("---"));
		else
			proposal.appendChild(document.createTextNode(json.changeOrders[i].proposalDate));
		var description = document.createElement("td");
		description.appendChild(document.createTextNode(json.changeOrders[i].briefDescription));
		var cos = document.createElement("td");
		cos.appendChild(document.createTextNode(json.changeOrders[i].cost));
		var sel = document.createElement("td");
		sel.appendChild(document.createTextNode(json.changeOrders[i].sell));
		var stat = document.createElement("td");
		stat.appendChild(document.createTextNode(convertStatus(json.changeOrders[i].status)));
		var submittedT = document.createElement("td");
		submittedT.appendChild(document.createTextNode(json.changeOrders[i].submittedTo));
		var submittedD = document.createElement("td");
		submittedD.appendChild(document.createTextNode(json.changeOrders[i].submittedDate));
		var approved = document.createElement("td");
		approved.appendChild(document.createTextNode(json.changeOrders[i].approvedDate));
		var note = document.createElement("td");
		if(json.changeOrders[i].notes == " " || json.changeOrders[i].notes == "undefined")
			note.appendChild(document.createTextNode("---"));
		else
			note.appendChild(document.createTextNode(json.changeOrders[i].notes));
		
		row.appendChild(customer);
		row.appendChild(mcs);
		row.appendChild(sub);
		row.appendChild(proposal);
		row.appendChild(description);
		row.appendChild(cos);
		row.appendChild(sel);
		row.appendChild(stat);
		row.appendChild(submittedT);
		row.appendChild(submittedD);
		row.appendChild(approved);
		row.appendChild(note);
		
		$("#changeOrderTable").append(row);
	}
}

function convertCustomer(param)
{
	console.log(param);
	if(param == '1')
		return "COP";
	else if(param == '2')
		return "REF";
	else if(param == '3')
		return "WHS";
	else if(param == '4')
		return "FAC";
	else if(param == '5')
		return "VEN";
	else if(param == '6')
		return "UDF";
	else return "UDF";
}

function convertStatus(param)
{
	if(param == '1')
		return "Submitted";
	else if(param == '2')
		return "MCS Reviewing";
	else
		return "Undefined Status!";
}

function convertPermit(param)
{
	if(param == '1')
		return "Preparing";
	else if(param == '2')
		return "Submitted";
	else if(param == '3')
		return "Issued";
	else if(param == '4')
		return "Closed";
	else
		return "---";
}


