var PAGETYPE = 'permit';

var PROJECT_DATA;
var PROJECT_ID;

// This gets run upon loading and handles tabbing and the datepickers
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
	
	$("#buildingPermitLastUpdated").datepicker();
	$("#buildingInspectionLastUpdated").datepicker();
	$("#roofingPermitLastUpdated").datepicker();
	$("#roofingInspectionLastUpdated").datepicker();
	$("#mechanicalPermitLastUpdated").datepicker();
	$("#mechanicalInspectionLastUpdated").datepicker();
	$("#electricalPermitLastUpdated").datepicker();
	$("#electricalInspectionLastUpdated").datepicker();
	$("#plumbingPermitLastUpdated").datepicker();
	$("#plumbingInspectionLastUpdated").datepicker();
	$("#sprinklerPermitLastUpdated").datepicker();
	$("#sprinklerInspectionLastUpdated").datepicker();
	$("#fireAlarmInspectionLastUpdated").datepicker();
	$("#fireAlarmPermitLastUpdated").datepicker();
	$("#voltagePermitLastUpdated").datepicker();
	$("#voltageInspectionLastUpdated").datepicker();
	$("#otherAPermitLastUpdated").datepicker();
	$("#otherBPermitLastUpdated").datepicker();
	$("#otherAInspectionLastUpdated").datepicker();
	$("#otherBInspectionLastUpdated").datepicker();
});

function getProjectEnums()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'permit')
	{
		PROJECT_ID = getParameterByName("id");
		
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
				PROJECT_DATA = (data);

				fillTabs(data);
			}
		});
	}
	else
	{
		alert("That's weird... You might want to go back and try again");
	}
}

function fillTabs(data)
{
	var json = data;
	
	$(".projectIdentifier").html(json.warehouse.city.name 
			+ ", " + json.warehouse.state + " --- " +  json.projectItem.name);
	
	console.log(json);
	if (json.permits != null)
	{	
		$("#buildingPermitLastUpdated").val(json.permits.building);
		$("#mechanicalPermitLastUpdated").val(json.permits.mechanical);
		$("#electricalPermitLastUpdated").val(json.permits.electrical);
		$("#plumbingPermitLastUpdated").val(json.permits.plumbing);
		$("#sprinklerPermitLastUpdated").val(json.permits.fire_sprinkler);
		$("#fireAlarmPermitLastUpdated").val(json.permits.fire_alarm);
		$("#voltagePermitLastUpdated").val(json.permits.low_voltage);
	}
}


function saveProject()
{
    console.log("Saving Permit Information");
	
    var buildingPermitStatus = $("#buildingPermitStatus");
    var buildingPermitLastUpdated = $("#buildingPermitLastUpdated");
    var buildingInspectionStatus = $("#buildingInspectionStatus");
    var buildingInspectionLastUpdated = $("#buildingInspectionLastUpdated");
    var buildingNotes = $("#buildingNotes");
    
    var roofingPermitStatus = $("#roofingPermitStatus");
    var roofingPermitLastUpdated = $("#roofingPermitLastUpdated");
    var roofingInspectionStatus = $("#roofingInspectionStatus");
    var roofingInspectionLastUpdated = $("#roofingInspectionLastUpdated");
    var roofingNotes = $("#roofingNotes");
    
    var mechanicalPermitStatus = $("#mechanicalPermitStatus");
    var mechanicalPermitLastUpdated = $("#mechanicalPermitLastUpdated");
    var mechanicalInspectionStatus = $("#mechanicalInspectionStatus");
    var mechanicalInspectionLastUpdated = $("#mechanicalInspectionLastUpdated");
    var mechanicalNotes = $("#mechanicalNotes");
    
    var electricalPermitStatus = $("#electricalPermitStatus");
    var electricalPermitLastUpdated = $("#electricalPermitLastUpdated");
    var electricalInspectionStatus = $("#electricalInspectionStatus");
    var electricalInspectionLastUpdated = $("#electricalInspectionLastUpdated");
    var electricalNotes = $("#electricalNotes");
    
    var plumbingPermitStatus = $("#plumbingPermitStatus");
    var plumbingPermitLastUpdated = $("#plumbingPermitLastUpdated");
    var plumbingInspectionStatus = $("#plumbingInspectionStatus");
    var plumbingInspectionLastUpdated = $("#plumbingInspectionLastUpdated");
    var plumbingNotes = $("#plumbingNotes");    
    
    var sprinklerPermitStatus = $("#sprinklerPermitStatus");
    var sprinklerPermitLastUpdated = $("#sprinklerPermitLastUpdated");
    var sprinklerInspectionStatus = $("#sprinklerInspectionStatus");
    var sprinklerInspectionLastUpdated = $("#sprinklerInspectionLastUpdated");
    var sprinklerNotes = $("#sprinklerNotes");    
    
    var fireAlarmPermitStatus = $("#fireAlarmPermitStatus");
    var fireAlarmPermitLastUpdated = $("#fireAlarmPermitLastUpdated");
    var fireAlarmInspectionStatus = $("#fireAlarmInspectionStatus");
    var fireAlarmInspectionLastUpdated = $("#fireAlarmInspectionLastUpdated");
    var fireAlarmNotes = $("#fireAlarmNotes");  
    
    var voltagePermitStatus = $("#voltagePermitStatus");
    var voltagePermitLastUpdated = $("#voltagePermitLastUpdated");
    var voltageInspectionStatus = $("#voltageInspectionStatus");
    var voltageInspectionLastUpdated = $("#voltageInspectionLastUpdated");
    var voltageNotes = $("#voltageNotes");  
    
    var otherAPermitStatus = $("#otherAPermitStatus");
    var otherAPermitLastUpdated = $("#otherAPermitLastUpdated");
    var otherAInspectionStatus = $("#otherAInspectionStatus");
    var otherAInspectionLastUpdated = $("#otherAInspectionLastUpdated");
    var otherANotes = $("#otherANotes");    
    
    var otherBPermitStatus = $("#otherBPermitStatus");
    var otherBPermitLastUpdated = $("#otherBPermitLastUpdated");
    var otherBInspectionStatus = $("#otherBInspectionStatus");
    var otherBInspectionLastUpdated = $("#otherBInspectionLastUpdated");
    var otherBNotes = $("#otherBNotes");    
    
    var dates =[
				buildingPermitLastUpdated, buildingInspectionLastUpdated,
				roofingPermitLastUpdated, roofingInspectionLastUpdated,
				mechanicalPermitLastUpdated, mechanicalInspectionLastUpdated, 
				electricalPermitLastUpdated, electricalInspectionLastUpdated,
				plumbingPermitLastUpdated, plumbingInspectionLastUpdated,
				sprinklerPermitLastUpdated, sprinklerInspectionLastUpdated,
				fireAlarmPermitLastUpdated, fireAlarmInspectionLastUpdated,
				voltagePermitLastUpdated, voltageInspectionLastUpdated,
				otherAPermitLastUpdated, otherAInspectionLastUpdated,
				otherBPermitLastUpdated, otherBInspectionLastUpdated,
                ];
    
    
    if(isValidInput(dates))
    {
    	console.log("we got valid data now");
    	
		var action = "editPermits";
		var PERMIT_ID = 0;
		if(PROJECT_DATA.permits != null)
			PERMIT_ID = PROJECT_DATA.permits.id;
		else
			PERMIT_ID = 0;
		if(false)
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				'projectID':PROJECT_DATA.id,
				
				//Permit Data
				'permitsID':PERMIT_ID,
				
				'building_p':buildingPermitLastUpdated, 
				'buildingPermitStatus': buildingPermitStatus,
				'buildingInspectionStatus': buildingInspectionStatus,
				'buildingInspectionLastUpdated': buildingInspectionLastUpdated,
				'buildingNotes': buildingNotes,
				
				'mechanical_p' :mechanicalPermitLastUpdated,
				'mechanicalPermitStatus': mechanicalPermitStatus,
				'mechanicalInspectionStatus': mechanicalInspectionStatus,
				'mechanicalInspectionLastUpdated': mechanicalInspectionLastUpdated,
				'mechanicalNotes': mechanicalNotes,
				
				'electrical_p':electricalPermitLastUpdated,
				'electricalPermitStatus': electricalPermitStatus,
				'electricalInspectionStatus': electricalInspectionStatus,
				'electricalInspectionLastUpdated': electricalInspectionLastUpdated,
				'electricalNotes': electricalNotes,
				
				'plumbing_p':plumbingPermitLastUpdated,
				'plumbingPermitStatus': plumbingPermitStatus,
				'plumbingInspectionStatus': plumbingInspectionStatus,
				'plubmingInspectionLastUpdated': plumbingInspectionLastUpdated,
				'plumbingNotes': plumbingNotes,
				
				'fireSprinkler_p':sprinklerPermitLastUpdated,
				'sprinklerPermitStatus': sprinklerPermitStatus,
				'sprinklerInspectionStatus': sprinklerInspectionStatus,
				'sprinklerInspectionLastUpdated': sprinklerInspectionLastUpdated,
				'sprinklerNotes': sprinklerNotes,
				
				'fireAlarm_p':fireAlarmPermitLastUpdated, 
				'fireAlarmPermitStatus': fireAlarmPermitStatus,
				'fireAlarmInspectionStatus': fireAlarmInspectionStatus,
				'fireAlarmInspectionLastUpdated': fireAlarmInspectionLastUpdated,
				'fireAlarmNotes': fireAlarmNotes,
				
				'lowVoltage_p':voltagePermitLastUpdated,
				'voltagePermitStatus': voltagePermitStatus,
				'voltageInspectionStatus': voltageInspectionStatus,
				'voltageInspectionLastUpdated': voltageInspectionLastUpdated,
				'voltageNotes': voltageNotes,
				
				'roofingPermit': roofingPermitLastUpdated,
				'roofingPermitStatus': roofingPermitStatus,
				'roofingInspectionStatus': roofingInspectionStatus,
				'roofingInspectionLastUpdated': roofingInspectionLastUpdated,
				'roofingNotes': roofingNotes,
				
				'otherPermitA': otherAPermitLastUpdated,
				'otherAPermitStatus': otherAPermitStatus,
				'otherAInspectionStatus': otherAInspectionStatus,
				'otherAInspectionLastUpdated': otherAInspectionLastUpdated,
				'otherANotes': otherANotes,
				
				'otherBPermit': otherBPermitLastUpdated,
				'otherBPermitStatus': otherBPermitStatus,
				'otherBInspectionStatus': otherBInspectionStatus,
				'otherBInspectionLastUpdated': otherBInspectionLastUpdated,
				'otherBNotes': otherBNotes,
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
	else
		console.log("hey");

    }
    
}

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