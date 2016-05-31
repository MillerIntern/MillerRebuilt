//Statuses for the different types of triggers
const STATUS1 = "info"; 
const STATUS2 = "warning";
const STATUS3 = "severe";

//Selections for the different types of triggers
const SELECTOR1 = "infoSel";
const SELECTOR2 = "warningSel";
const SELECTOR3 = "severeSel";

//URL for forwarding modifications
const EDIT_PAGE_URL = "projectData.html?type=edit";

const PROJECT_START = "Project is starting soon!";
const COSTCO_DUE = "Costco due date is soon!";
const SCHEDULED_TURN_OVER = "Turn over is soon!";

var infoState = "closed";
var warningState = "closed";
var severeState = "closed";

//This function retrieves all of the user data from the server
//Input: none
//Output: none 
function getTriggers()
{	
	$.ajax({
		type: 'POST',
		url: 'Trigger', 
		data: 
		{
			'action': 'getTriggers',
		},
		success: function(data)
		{	
			fillInNotificationPanes(data);
		}
	});
}

//Input: JSON array (contains triggers)
//Output: none (puts HTML elements in the document)
//Purpose: This function fills each HTML trigger pane with the appropriate trigger notifications
function fillInNotificationPanes(triggers)
{
	var infoCount = 0;
	var warningCount = 0;
	var severeCount = 0;
	for (var i = 0; i < triggers.length; i++)
	{
		//Get all projects that fall under the trigger
		var trigger = triggers[i];
		var projects = trigger.projects;
		
		for (var j = 0; j < projects.length; j++)
		{
			//Create notification
			var project = projects[j];
			var p = createNotificationElement(project, trigger);
			
			if (trigger.severity == 0)
				{
					$("#info").append(p);
					infoCount++;
				}
			else if (trigger.severity == 1)
				{
					$("#warning").append(p);
					warningCount++;
				}
			else
				{
					$("#severe").append(p);
					severeCount++;
				}
		}
	}
	$("#infoSel").append("(" +infoCount+ ")");
	$("#warningSel").append("(" +warningCount+ ")");
	$("#severeSel").append("(" + severeCount+ ")");
	
}

//Input: json object (Project), json object (project trigger)
//Output: HTML element
//Purpose: This function returns an element containing information about the project trigger
function createNotificationElement(project, trigger)
{
	var dateType = undefined;
	
	if(trigger.desc == COSTCO_DUE)
		dateType = ("Costco due date: " + project.costcoDueDate);
	if(trigger.desc == PROJECT_START)
		dateType = ("Scheduled Start Date: " + project.scheduledStartDate);
	if(trigger.desc == SCHEDULED_TURN_OVER)
		dateType = ("Scheduled Turnover: " + project.scheduledTurnover);
	var note;
	if(dateType != undefined)
		note = "#"+project.McsNumber+" | "+project.warehouse.city.name+" | "+project.projectItem.name+":</br> <span style='font-weight: bold;'>"+trigger.desc+"</br>" + dateType +"</span><br/>";
	
	else
		note = "#"+project.McsNumber+" | "+project.warehouse.city.name+" | "+project.projectItem.name+":</br> <span style='font-weight: bold;'>"+trigger.desc+"</span><br/>";
		
	var p = document.createElement("button");
	p.innerHTML = note;
	p.className = "notification";
	p.style.display = "none";
	p.onclick =  function() {getInfo(project.warehouse.id, project.stage.id, project.projectClass.id, project.projectItem.id, project.McsNumber, project.id);};
	return p;
}

//Retrieves data from the project that is clicked on
//Input: 
//Output: None
function getInfo(warehouse, stage, classs, item, project, pid)
{

	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getEditableProject',
			'whID' : warehouse,
			'stageID' : stage,
			'classID' : classs,
			'itemID' : item,
			'projectID' : project,
		},
		success: function(data)
		{
			var json = data;
			projectToEdit(data);
			
		}
	});
}



//Input: str (element id)
//Output: none (opens or closes a trigger pane)
//Purpose: THis function governs what happens when a trigger pane is clicked on.
function clickPane(id)
{
	if (id == SELECTOR1)
	{
		if (infoState == "closed")
		{
			openPane(STATUS1);
			infoState = "open";
		}
		else
		{
			closePane(STATUS1);
			infoState = "closed";
		}
	}
	
	else if (id == SELECTOR2)
	{
		if (warningState == "closed")
		{
			openPane(STATUS2);
			warningState = "open";
		}
		else
		{
			closePane(STATUS2);
			warningState = "closed";
		}
	}
	
	else if (id == SELECTOR3)
	{
		if (severeState == "closed")
		{
			openPane(STATUS3);
			severeState = "open";
		}
		else
		{
			closePane(STATUS3);
			severeState = "closed";
		}
	}
}

//Input: str (HTML element id)
//Output: none
//Purpose: This function displays all of the trigger notifications of a pane.
function openPane(id)
{
	var pane = document.getElementById(id);
	for (var i = 0; i < pane.childNodes.length; i++)
	{
		var node = pane.childNodes[i];
		if (node.className == "notification")
			node.style.display = "inline";
	}
}

//Input: str (HTML element id)
//Output: none
//Purpose: This function hides all of the trigger notifications of a pane.
function closePane(id)
{
	var pane = document.getElementById(id);
	for (var i = 0; i < pane.childNodes.length; i++)
	{
		var node = pane.childNodes[i];
		if (node.className == "notification")
			node.style.display = "none";
	}
}

//This function fills in the confirmation data in the window
//Input: JSON array of projects
//Output: none (populates the project picker popup window)
function projectToEdit(data)
{
	document.location.href=EDIT_PAGE_URL+'&id='+data[0].id;
}
