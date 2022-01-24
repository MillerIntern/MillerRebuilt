
//globals
var numChangeOrders = 0;
var PAGETYPE = "add";
var changeOrders = [];
var projectID = 0;
var PROJECT_DATA = null;
var stages=["Active", "Proposal", "Budgetary", "Closed", "Inactive"];
var INSPECTION_ID = 0;
var CLOSEOUT_ID = 0;
var SALVAGE_ID = 0;
var PERMITS_ID = 0;
var EQUIP_ID = 0;

var TABLE_ROW = 1;

var eqpid_array = [];
let user;


//functions starting at runtime
$(document).ready(function()
{
	$('.nav-tabs > li').click(function () {
		if($(this).attr('id') !== 'saveProjectLink') {

			$('.info-tab').removeClass('active');
			$('#' + $(this).attr('data-tab')).addClass('active');
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('#saveButton > button').prop('disabled', true);
		}
		
	});
	
	$("#initiatedDate").datepicker();
	$("#surveyDate").datepicker();
	$("#proposalScopeDate").datepicker();
	$("#draftScheduleDate").datepicker();
	$("#budgetaryDueDate").datepicker();
	$("#budgetarySubmittedDate").datepicker();
	$("#proposalDueDate").datepicker();
	$("#proposalDate_pd").datepicker();
	$("#startDate").datepicker();
	$("#scheduledTurnover").datepicker();
	$("#actualTurnover").datepicker();
	$("#initiatedDate").val(getToday());
	getUserInfo();
	
	//getMasterScopes();
});


function getMasterScopes()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getMasterScopes',
			'id': 0
		
		}, complete: function (data) {
			console.log("data", data.responseJSON);
			var dat = data.responseJSON;
			for(var i = 0; i < dat.length; i++)
			{
				var json = dat[i];
				console.log(json[0]);
			    getProjItem(json[0]);				
			}
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function fillNavScopeDropdowns(data)
{		
	console.log(data);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < data.length; i++)
	{
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = data[i].name;
		a.setAttribute("value", data[i].id);
		a.setAttribute("href", "masterScope.html?projItem=" + data[i].id);
		a.setAttribute("onmouseover", "style='background-color: rgb(42, 112, 224); color: white'");
		a.setAttribute("onmouseout", "style='background-color: none;'");
		li.appendChild(a);
		d.appendChild(li);
	}

	$('#dropdown').append(d);
	
}

function getProjItem(id)
{
	console.log("get proj item", id);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectItem',
			'id': id
		
		}, complete: function (data) {
			console.log("projItem: ", data.responseJSON);
			fillNavScopeDropdowns(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function getUserInfo(){

	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, success: function (data) {
			user = data;
			console.log(user);
			 if(user.permission.canAccessAdminPage == false)
				 hideAdminContent();	
			}
		});
}

//This function retrieves all of the enumerated data (warehouses, statuses, etc) from the database
//Input: none
//Output: none (calls functions to fill in all of the dropdown functions)
function getProjectEnums()
{

	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',
			'warehouse': true,
			'class': true,
			'item': true,
			'person': true,
			'stage': true,
			'status': true,
			'customerApproval': true,
			'type': true
		},
		success: function(data)
		{
			console.log(data);
			console.log("about ot fill dropdowns");
			fillDropdowns(data);
			
			PAGETYPE = getParameterByName("type");	
			if(PAGETYPE == 'edit') {
				getProject();
			}
			else {
				$("#projectHeader").text("New Project");
			}
		}
	});
}


//This function fills multiple dropdowns with data aswell as fills the equipment data
//Input: JSON array of arrays.
//Output: none (fills dropdowns with data)
function fillDropdowns(data)
{
	console.log("here comes data" , data["status"]);
	generateDropdowns(data["warehouse"], "warehouse");
	generateDropdowns(data["class"], "class");
	generateDropdowns(data["item"], "project");
	generateDropdowns(data["person"], "manager");
	generateDropdowns(data["person"], "supervisor");
	generateDropdowns(data["status"], "status");
	generateDropdowns(data["customerApproval"], "customerApproval");
	generateDropdowns(data["stage"], "stage");
	generateDropdowns(data["type"], "pType");	
}

//This function puts data into a specific dropdown menu
//Input: string representation of JSON array
//Output: none (fills specific dropdown menu with data)
function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	var sent=true;

	if (className == "warehouse" || className=="projecteq")
		{
		json = sortByName(json, className);
	
		}
	for (var i = 0; i < json.length; i++)
	{
		sent=true;
		var option = document.createElement("option");
		if (className=="stage")
		{
			if(hasStage(stages, json[i].name))
			{
				option.innerHTML=json[i].name;
			}
			else
				sent=false;
		}
		if(className == "class")
		{
			if(json[i].id == 8)
				continue;
			else 
				option.innerHTML = json[i].name;
		}
		if(className == "closeoutstatus")
		{
			option.innerHTML=json[i].name;
		}
		else if(className=="warehouse" || className=="projecteq")
		{
			console.log(json[i]);
			if(json[i].state && (json[i].state == "UNKNOWN" || json[i].state == "Unknown")) 
			{
				option.innerHTML = json[i].city.name + ", " + json[i].region;
			}
			else
			{
				option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
			}
		}
		else if(className == "manager" || className == "supervisor")
		{	
			if(json[i].name == "Bart" || json[i].name == "Lillian")
			{
				continue;
			}
			else
			{
				option.innerHTML = json[i].name;
			}
		} 
		else
		{
			option.innerHTML=json[i].name;
			console.log(json[i].name);
		}

		if(sent)
		{
			option.setAttribute("value", json[i].id);	
			d.appendChild(option);
		}

	}

	if(className == "closeoutstatus")
	{				
		for(var i = 0; i < closeoutstatus_dropdowns.length; i++)
		{
			var copy = d.cloneNode(true);
			$("#" +closeoutstatus_dropdowns[i]).append(copy);	
		}
	}
	else
		$("#"+className).append(d);
}

function saveProject() {
	//document.getElementById("saveProjectLink").onclick = "";
	//I(Akash) commented the above line and inserted it below after the ajax call. save is now working fine
	
	// Required Information
	var mcsNumber = $('#mcsNumber').val();
	if(mcsNumber === 'undefined' || mcsNumber === '')
		return alert("The MCS Project # field is required. Please give it a value.");

	var item = $('#project').val();
    if(item === 'undefined' || item === 'default')
    	return alert("The Item field is required. Please give it a value.");
	
	var warehouse = $('#warehouse').val();
	if(warehouse === 'undefined' || warehouse === 'default')
		return alert("The Warehouse field is required. Please give it a value.");
		
	var manager = $('#manager').val();
	if(manager === 'undefined' || manager === 'default')
		return alert("The Manager field is required. Please give it a value.");
	
	var supervisor = $('#supervisor').val();
	if(supervisor === 'undefined' || supervisor === 'default')
		return alert("The Supervisor field is required. Please give it a value.");
	
	var stage = $("#stage").val();
	if(stage === 'undefined' || stage === 'default')
		return alert("The Stage field is required. Please give it a value.");
	
	var status = $('#status').val();
	if(status === 'undefined' || status === 'default')
		return alert("The Status field is required. Please give it a value.");
		
	//add field for customerApproval
	var customerApproval = $('#customerApproval').val();
	if(customerApproval === 'undefined' || customerApproval === 'default')
		return alert("The Customer Approval field is required. Please give it a value.");
		
	var pType = $('#pType').val();
	if(pType === 'undefined' || pType === 'default')
		return alert("The Type field is required. Please give it a value.");
	
	var projectClass = $('#class').val();
	if(projectClass === 'undefined' || projectClass === 'default')
		return alert("The Project field is required. Please give it a value.");
	projectClass = determineAutofillValue(projectClass);

	var HVAC = $('#autofill-HVAC').val();
	if(HVAC === 'undefined' || HVAC === 'default')
		return alert("The HVAC field is required. Please give it a value.");
	
	var refrigeration = $('#autofill-Refrigeration').val();
	if(refrigeration === 'undefined' || refrigeration === 'default')
		return alert("The Refrigeration field is required. Please give it a value.");
	
	var permits = $('#autofill-Permits').val();
	if(permits === 'undefined' || permits === 'default')
		return alert("The Permits field is required. Please give it a value.");
	
	var scope = $('#scope').val();
	if(scope === 'undefined' || scope === '')
		return alert("The Scope field is required. Please give it a value.");

	
	
	// scheduling
	var initiated = $("#initiatedDate").val();
	var survey = $("#surveyDate").val();
	var proposalScopeDate = $("#proposalScopeDate").val();
	var draftScheduleDate = $("#draftScheduleDate").val();
	var budgetaryDue = $("#budgetaryDueDate").val();
	var budgetarySubmitted = $("#budgetarySubmittedDate").val();
	var costco = $("#proposalDueDate").val();
	var proposalDate = $("#proposalDate_pd").val();
	var startDate = $("#startDate").val();
	var scheduledTurnover = $("#scheduledTurnover").val();
	var actualTurnover = $("#actualTurnover").val();

	
	// financial
	var shouldInvoice = $("#shouldInvoice").val();
	var actualInvoice = $("#actualInvoice").val();
	var notes = $("#notes").val();
	var keyStatus = $("#keyStatus").val();
	var refrigNotes = $("#zUpdates").val();
	var cost = $("#projectCost").val();
	var customerNumber = $("#custNum").val();
	
	
	// autofill
	var autoFillHVAC = determineAutofillValue($('#autofill-HVAC').val());
	var autoFillRefrigeration = determineAutofillValue($('#autofill-Refrigeration').val());
	var autoFillPermits = determineAutofillValue($('#autofill-Permits').val());
	
	
	var dates = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover];
	
	if(isValidInput(dates)) {
		$('.info-tab').removeClass('active');
		$('#saveButton').addClass('active');
		
		$('.nav-tabs > li.active').removeClass('active');
		$('#saveProjectLink').addClass('active');
		
		var action = 'addNewProject';
		if (PAGETYPE === 'edit') {
			action = 'editExistingProject';
		}
		
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': action,
				'projectID': projectID,
				'mcsNumber': mcsNumber,
				
				'warehouse': warehouse,
				'class': projectClass,
				'item': item,
				'manager': manager,
				'supervisor': supervisor,
				'stage': stage,
				'status': status,
				'customerApproval': customerApproval,
				'pType': pType,
				'scope': scope,
				
				'initiated': initiated,
				'survey': survey,
				'proposalScopeDate': proposalScopeDate,
				'draftScheduleDate': draftScheduleDate,
				'costco' : costco, 
				'proposalDate': proposalDate,
				'startDate': startDate,
				'scheduledTurnover': scheduledTurnover,
				'actualTurnover': actualTurnover,
				
				'shouldInvoice': shouldInvoice,
				'actualInvoice': actualInvoice,
				'notes': notes,
				'keyStatus': keyStatus,
				'refrigNotes': refrigNotes,
				'cost': cost,
				'customerNumber': customerNumber,
				'budgetaryDue': budgetaryDue,
				'budgetarySubmitted' : budgetarySubmitted,
				
				'autofill-HVAC' : autoFillHVAC,
				'autofill-Refrigeration' : autoFillRefrigeration ,
				'autofill-Permits' : autoFillPermits,
			}, complete: function (data) {
				console.log(data);
				projectID = data.responseJSON;
				alert('Save Complete!');
				document.getElementById("saveProjectLink").onclick = "";// Added it here by removing it at the top
				$('#saveButton > button').prop('disabled', false);
				
			}
			
		});
	}
}

function determineAutofillValue(value)
{
	console.log("VALUE" , value);
	if(!value)
		return "-1";
	
	if(value == "default")
		return "-1";
	
	return value;
	
}

function returnToProjectManager () {
	window.location.href = 'projects.html?id=' + projectID +'&from=projectData';
}

//This function validates the nunmerous fields of this page, separated by categories
//Input: array of str, array of str, array of ints, str, str, int
//output: true if all of the fields are valid. False otherwise
// TODO: Numbers, notes, 
function isValidInput(dates)
{
		
	//Check if all of the dates are in the correct format
	for (var i = 0; i < dates.length; i++)
	{
		var date = dates[i];
		if (date != "" && !isDate(date))
		{
			console.log("----------");

			console.log(date);
			console.log("----------");
			console.log(i);

			alert("Dates must be in this format: mm/dd/yyyy");
			return false
		}
	}
	return true;
}

//This function retrieves project information from a project, and prepares it to be edited.
//Input: none
//Output: none
function getProject()
{
	projectID = getParameterByName("id");
	
	if (projectID)
	{
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': projectID
			},
			success: function(data)
			{
				PROJECT_DATA = (data);
				setProjectHeader(data);
				fillForm(data);
				getTasks();
			}
		});
	}
}


////This function fills out the page with project data. This is so the user can edit the project information
////Input: JSON object representing a project
////Output: none (fills out data on the page)
//function fillForm(data)
//{
//	console.log(data);
//	var json = (data);	
//	$("#mcsNumber").val(json.McsNumber);
//
//    $("#warehouse").val(json.warehouse.id);
//	$("#class").val(json.projectClass.id);
//	$("#project").val(json.projectItem.id);
//	$("#manager").val(json.projectManagers.id);
//	$("#supervisor").val(json.supervisors[0].id);
//	$("#stage").val(json.stage.id);
//	$("#status").val(json.status.id);
//	$("#pType").val(json.projectType.id);
//	$("#scope").val(json.scope);
//
//	
//	$("#initiatedDate").val(json.projectInitiatedDate);;
//	$("#surveyDate").val(json.siteSurvey);
//	$("#costcoDate").val(json.costcoDueDate);
//	$("#proposalDate").val(json.proposalSubmitted);
//	$("#startDate").val(json.scheduledStartDate);
//	$("#scheduledTurnover").val(json.scheduledTurnover);
//	$("#actualTurnover").val(json.actualTurnover);
//	$("#permitApp").val(json.permitApp);
//
//	$("#shouldInvoice").val(json.shouldInvoice);
//	$("#actualInvoice").val(json.invoiced);
//	$("#notes").val(json.projectNotes);
//	$("#zUpdates").val(json.zachUpdates);
//	$("#projectCost").val(json.cost);
//	$("#custNum").val(json.customerNumber);
//}


function sortByName(object, className)
{
	object.sort(
	function(a, b)
	{
		if(className=="warehouse" || className=="projecteq")
			return a.city.name > b.city.name;
		else
			return a.name > b.name;
			}
	);
	return object;
}

function hasStage(stageList, stage)
{
	for(var i=0; i<stageList.length; i++)
	{
		if(stageList[i]==stage)
			return true;
		
	}

	return false;
}

function dateFillFunction(x){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	var firstName = ' ('+ user.firstName + ') -  ';
	var cursorPosition = today.length + firstName.length-1;
	x.value = today + firstName + x.value;
	$(x).prop('selectionEnd', cursorPosition);

	
}

function changeStatus(){		
	//code to remove all options
	$('#status').empty();
	
	//code to add multiple options at the same time depending on the stage
	var projectStage = $('#stage').val();
	
	if(projectStage == "2"){//Active

		//if the current Permit autofill is TBD, then display message
		if($('#generalInformation').find('#autofill-Permits').val() == "0"){
				
			window.alert("Setting project to Active: Permits are still set to TBD");		
		}
		
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));
		$('#status ').append($('<option>', {value:29, text:'Scheduled'}));
		$('#status ').append($('<option>', {value:26, text:'Scheduling'}));	
	}
	else if(projectStage == "8"){//Budgetary)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:38, text:'Budgetary - Preparing'}));
		$('#status ').append($('<option>', {value:37, text:'Budgetary - Submitted'}));
	}
	else if(projectStage == "15"){//Canceled)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:34, text:'Lost'}));
	}
	else if(projectStage == "4"){//Closed)
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));
	}
	else if(projectStage == "9"){//On Hold)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:38, text:'Budgetary - Preparing'}));
		$('#status ').append($('<option>', {value:37, text:'Budgetary - Submitted'}));
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));		
		$('#status ').append($('<option>', {value:1, text:'Proposal - Preparing'}));
		$('#status ').append($('<option>', {value:3, text:'Proposal - Submitted'}));
		$('#status ').append($('<option>', {value:29, text:'Scheduled'}));
		$('#status ').append($('<option>', {value:26, text:'Scheduling'}));	
	}
	else if(projectStage == "1"){//Proposal)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:1, text:'Proposal - Preparing'}));
		$('#status ').append($('<option>', {value:3, text:'Proposal - Submitted'}));
	}
}
