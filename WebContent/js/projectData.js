
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
	$("#costcoDate").datepicker();
	$("#proposalDate").datepicker();
	$("#startDate").datepicker();
	$("#scheduledTurnover").datepicker();
	$("#actualTurnover").datepicker();
	$("#permitApp").datepicker();
});

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
		if(className == "closeoutstatus")
		{
			option.innerHTML=json[i].name;
		}
		else if(className=="warehouse" || className=="projecteq")
		{
			option.innerHTML = json[i].city.name+", "+json[i].state;
		}
		else
		{
			option.innerHTML=json[i].name;
			
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
	var mcsNumber = $('#mcsNumber').val();
	
	// Required Information
	var warehouse = $('#warehouse').val();
	var projectClass = $('#class').val();
	var item = $('#project').val();
	var manager = $('#manager').val();
	var supervisor = $('#supervisor').val();
	var status = $('#status').val();
	var stage = $("#stage").val();
	var pType = $('#pType').val();
	var scope = $("#scope").val();
	

	// scheduling
	var initiated = $("#initiatedDate").val();
	var survey = $("#surveyDate").val();
	var costco = $("#costcoDate").val();
	var proposalDate = $("#proposalDate").val();
	var startDate = $("#startDate").val();
	var scheduledTurnover = $("#scheduledTurnover").val();
	var actualTurnover = $("#actualTurnover").val();
	var permitApp = $("#permitApp").val();

	// financial
	var shouldInvoice = $("#shouldInvoice").val();
	var actualInvoice = $("#actualInvoice").val();
	var notes = $("#notes").val();
	var refrigNotes = $("#zUpdates").val();
	var cost = $("#projectCost").val();
	var customerNumber = $("#custNum").val();
	
	var required = [warehouse, projectClass, item, manager, supervisor, status, stage, pType, scope];
	var dates = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover, permitApp];
	
	if(isValidInput(required, dates)) {
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
				'pType': pType,
				'scope': scope,
				
				'initiated': initiated,
				'survey': survey,
				'costco': costco,
				'proposalDate': proposalDate,
				'startDate': startDate,
				'scheduledTurnover': scheduledTurnover,
				'actualTurnover': actualTurnover,
				'permitApp': permitApp,
				
				'shouldInvoice': shouldInvoice,
				'actualInvoice': actualInvoice,
				'notes': notes,
				'refrigNotes': refrigNotes,
				'cost': cost,
				'customerNumber': customerNumber,
			}, complete: function (data) {
				console.log(data);
				projectID = data.responseJSON;
				alert('Save Complete!');
				$('#saveButton > button').prop('disabled', false);

			}
			
		});
	}
}

function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}

//This function validates the nunmerous fields of this page, separated by categories
//Input: array of str, array of str, array of ints, str, str, int
//output: true if all of the fields are valid. False otherwise
// TODO: Numbers, notes, 
function isValidInput(requiredFields, dates)
{
	//Check required Fields 
	
	for (var i = 0; i < requiredFields.length; i++)
	{
		var field = requiredFields[i];
		if (field === "default")
		{
			alert("You cannot leave any of the values in the 'Required Information' blank!");
			return false;
		}
	}

	
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

//This function fills out the page with project data. This is so the user can edit the project information
//Input: JSON object representing a project
//Output: none (fills out data on the page)
function fillForm(data)
{
	console.log(data);
	var json = (data);	
	$("#mcsNumber").val(json.McsNumber);

    $("#warehouse").val(json.warehouse.id);
	$("#class").val(json.projectClass.id);
	$("#project").val(json.projectItem.id);
	$("#manager").val(json.projectManagers.id);
	$("#supervisor").val(json.supervisors[0].id);
	$("#stage").val(json.stage.id);
	$("#status").val(json.status.id);
	$("#pType").val(json.projectType.id);
	$("#scope").val(json.scope);

	
	$("#initiatedDate").val(json.projectInitiatedDate);;
	$("#surveyDate").val(json.siteSurvey);
	$("#costcoDate").val(json.costcoDueDate);
	$("#proposalDate").val(json.proposalSubmitted);
	$("#startDate").val(json.scheduledStartDate);
	$("#scheduledTurnover").val(json.scheduledTurnover);
	$("#actualTurnover").val(json.actualTurnover);
	$("#permitApp").val(json.permitApp);

	$("#shouldInvoice").val(json.shouldInvoice);
	$("#actualInvoice").val(json.invoiced);
	$("#notes").val(json.projectNotes);
	$("#zUpdates").val(json.zachUpdates);
	$("#projectCost").val(json.cost);
	$("#custNum").val(json.customerNumber);
}


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

