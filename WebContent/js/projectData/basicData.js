var PAGETYPE = 'edit';

var stages=["Active", "Proposal", "Budgetary", "Closed", "Inactive"];


var PROJECT_ID;

$(document).ready(function(){
	
	$('ul.tabs li').click(function()
    {
        
		var tab_id = $(this).attr('data-tab');
        if(tab_id == "saveButton")
            return;

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	
 	$("#fireMarshalInspection").datepicker();   
 	$("#healthInspection").datepicker(); 
 	$("#roughinElectricalInspection").datepicker();   
 	$("#roughinMechanicalInspection").datepicker();   
 	$("#roughinPlumbingInspection").datepicker();   
 	$("#mechanicalLightSmokeInspection").datepicker();   
 	$("#ceilingInspection").datepicker();   
 	$("#framingInspection").datepicker();   
});

function getDropdownItems()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getAllObjects',
		},
		success: function(data)
		{
			fillDropdowns(data);
			fillInProjectData();
		}
	});
}

function fillInProjectData()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'edit')
	{
		PROJECT_ID = getParameterByName("id");
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': PROJECT_ID
				
			},
			success: function(data)
			{
				PROJECT_DATA = (data);
				fillForm(data);
			}
		});
	}
}

function fillDropdowns(data)
{
	var itemTypes = ["warehouse", "class", "project", "manager", "supervisor", "status", "stage", "pType", "vendor", "projecteq", "component",
	                 "enteredBy", "equipStatus", "closeoutstatus"];

	generateDropdowns(data["warehouse"], itemTypes[0]);
	generateDropdowns(data["class"], itemTypes[1]);
	generateDropdowns(data["item"], itemTypes[2]);
	generateDropdowns(data["person"], itemTypes[3]);
	generateDropdowns(data["person"], itemTypes[4]);
	generateDropdowns(data["status"], itemTypes[5]);
	generateDropdowns(data["stage"], itemTypes[6]);
	generateDropdowns(data["type"], itemTypes[7]);
	generateDropdowns(data["equipmentvendor"], itemTypes[8]);
	generateDropdowns(data["warehouse"], itemTypes[9]);
	generateDropdowns(data["item"], itemTypes[10]);
	generateDropdowns(data["person"], itemTypes[11]);
	generateDropdowns(data["equipmentstatus"], itemTypes[12]);
	generateDropdowns(data["closeoutstatus"], itemTypes[13]);
	
	
	//retrieves and manipulates all of the equipment data
	/*generateEquipment(data["equipment"]);
	
	//creates seperate arrays for main data
	generateArray(data["warehouse"],itemTypes[0] );
	generateArray(data["item"],"item" );
	generateArray(data["equipmentvendor"], "equipmentVendor");*/
	
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
		else if(className=="warehouse" || className=="projecteq")
		{
			option.innerHTML = json[i].city.name+", "+json[i].state+" -- #"+json[i].warehouseID;
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

	$("#"+className).append(d);
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

function fillForm(data)
{
	console.log(data);
    $("#warehouse").val(data.warehouse.id);
    $("#class").val(data.projectClass.id);
	$("#project").val(data.projectItem.id);
	$("#manager").val(data.projectManagers.id);
	$("#supervisor").val(data.supervisors[0].id);
	$("#status").val(data.status.id);
	$("#scope").val(data.scope);
	$("#stage").val(data.stage.id);
	$("#pType").val(data.projectType.id);
	$("#initiatedDate").val(data.projectInitiatedDate);;
	$("#surveyDate").val(data.siteSurvey);
	$("#costcoDate").val(data.costcoDueDate);
	$("#proposalDate").val(data.proposalSubmitted);
	$("#shouldInvoice").val(data.shouldInvoice);
	$("#actualInvoice").val(data.invoiced);
	$("#notes").val(data.projectNotes);
	$("#startDate").val(data.scheduledStartDate);
	$("#scheduledTurnover").val(data.scheduledTurnover);
	$("#actualTurnover").val(data.actualTurnover);
	$("#stage").val(data.stage.id);
	$("#mcsNumber").val(data.McsNumber);
	$("#permitApp").val(data.permitApp);
	$("#zUpdates").val(data.zachUpdates);
	$("#projectCost").val(data.cost);
	$("#custNum").val(data.customerNumber);
}

function saveProject()
{
	 console.log("Saving Project Information");
		
		var warehouse = $("#warehouse").val();
		var projectClass = $("#class").val();
		var project = $("#project").val();
		var manager = $("#manager").val();
		var supervisor = $("#supervisor").val();
		var status = $("#status").val();
		var pType = $("#pType").val();
		var scope = $("#scope").val();
		var initiated = $("#initiatedDate").val();
		var survey = $("#surveyDate").val();
		var costco = $("#costcoDate").val();
		var proposalDate = $("#proposalDate").val();
		var shouldInvoice = $("#shouldInvoice").val();;
		var actualInvoice = $("#actualInvoice").val();;
		var notes = $("#notes").val();
		var startDate = $("#startDate").val();;
		var scheduledTurnover = $("#scheduledTurnover").val();;
		var actualTurnover = $("#actualTurnover").val();;
	    

		var stage = $("#stage").val();
		var mcsNumber = $("#mcsNumber").val();
		var zachNotes = $("#zUpdates").val();
		var cost = $("#projectCost").val();
		var customerNumber = $("#custNum").val();
		var permitApp = $("#permitApp").val();
	    
		var requiredFields = [warehouse, projectClass, project, manager, supervisor, status, stage, mcsNumber, pType];

	    var dates =[
					initiated, survey, costco, proposalDate, startDate, scheduledTurnover,
					permitApp, actualTurnover,
	                ];
	    
	    
	    if(isValidInput(dates, requiredFields))
	    {
	    	console.log("we got valid data now");
	    	
	    	var action = "addNewProject";
			if (PAGETYPE == "edit")
			{
				action = "editProjectInfo";
				projectID = PROJECT_ID;
			}
			$.ajax({
				type: 'POST',
				url: 'Project', 
				dataType: 'json',
				data: 
				{
					'domain': 'project',
					'action': action,
					'projectID':PROJECT_ID,
					
					'domain': 'project',
					'action': action,
					'mcsNumber': mcsNumber,
					'warehouse': warehouse,
					'class':projectClass,
					'projectItem': project,
					'manager':manager,
					'supervisor':supervisor,
					'status': status,
					'stage':stage,
					'pType':pType,
					'scope': scope,
					'initiated': initiated,
					'survey':survey,
					'costco':costco,
					'proposal':proposalDate,
					'shouldInvoice':shouldInvoice,
					'actualInvoice':actualInvoice,
					'startDate':startDate,
					'scheduledTurnover':scheduledTurnover,
					'actualTurnover':actualTurnover,
					'notes':notes,
					'zachUpdates': zachNotes,
					'cost':cost,
					'customerNumber':customerNumber,
					'permitApp': permitApp,
				},
				success:function(data){
					
					createConfirmWindow();
					console.log(data);
				},
				/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
				 * Code works perfectly with error statement 
				  Need to figure out how to fix this error to work 100 percent correctly*/
				
				 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
				error: function()
				{
				       //alert("Status: " + textStatus); 
					   //alert("Error: " + errorThrown);
				       createConfirmWindow();
				//error:function(xhr){
					//alert(xhr.responceText);
					//console.log(xhr.responseText);
								
				}
			});

	    }
}

function isValidInput(dates, requiredFields)
{	
	for (var i = 0; i < requiredFields.length; i++)
	{
		var field = requiredFields[i];
		if (field == "default")
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

function createConfirmWindow()
{
	$("#saveConfirm").dialog({
		resizable: false,
		height: 350,
		width: 450,
		modal: true,
		buttons: {
			"Stay on this page": function()
			{
				$("#saveConfirm").dialog('close');
			},
			"Return to project manager": function() {
				window.location.href="projectManager.html?type=navigateTo&id=" + PROJECT_ID;
			},
			"Go to Home Page": function() {
				window.location.href="homepage.html";
			},
			"Find another project": function() {
				window.location.href="findProject.html";
			},

			
		}
	});	
}


