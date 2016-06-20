var PAGETYPE = 'navigateTo';
var EDIT_PAGE = 'projectData.html?type=edit&id=';
var CLOSEOUT_PAGE = 'closeoutData.html?type=closeout&id=';
	
var ID;

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
		PROJECT_ID = getParameterByName("id");
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
	console.log(data);
	var json = data;

	$(".deleteThis").remove(); // Remove tmp fields in the HTML	

	// Build project information tab
	buildProjectInformation(json);
	
	// Build Change order tab
	
	
	// Build Equipment tab
	
	
	// Build Closeout tab
	buildCloseout(json);
	
	// Build Triggers tab
	generateTriggers(json);
}

function navigateToEditPage(param)
{
	console.log(param);
	console.log("Ah, so you want to edit a page!");
	window.location.href = (EDIT_PAGE+ID);
}

function navigateToCloseoutPage(param)
{
	console.log(param);
	console.log("Ah, so you want the closeout page!");
	window.location.href = (CLOSEOUT_PAGE+ID);
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
		triggerElement.style.color = "#ff9900";
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
