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
	
 	$("#buildingPermit").datepicker();   
 	$("#mechanicalPermit").datepicker(); 
 	$("#electricalPermit").datepicker();   
 	$("#plumbingPermit").datepicker();   
 	$("#fireSprinklePermit").datepicker();   
 	$("#fireAlarmPermit").datepicker();   
 	$("#lowVoltagePermit").datepicker();   



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
		$("#buildingPermit").val(json.permits.building);
		$("#mechanicalPermit").val(json.permits.mechanical);
		$("#electricalPermit").val(json.permits.electrical);
		$("#plumbingPermit").val(json.permits.plumbing);
		$("#fireSprinklePermit").val(json.permits.fire_sprinkler);
		$("#fireAlarmPermit").val(json.permits.fire_alarm);
		$("#lowVoltagePermit").val(json.permits.low_voltage);
	}
}


function saveProject()
{
    console.log("Saving Permit Information");
	
    var buildingPermit = $("#buildingPermit").val();
    var mechanicalPermit = $("#mechanicalPermit").val();
    var electricalPermit = $("#electricalPermit").val();
    var plumbingPermit = $("#plumbingPermit").val();
    var fireSprinklePermit = $("#fireSprinklePermit").val();
    var fireAlarmPermit = $("#fireAlarmPermit").val();
    var lowVoltagePermit = $("#lowVoltagePermit").val();
    
    var dates =[
				buildingPermit, mechanicalPermit, electricalPermit, plumbingPermit, 
				fireSprinklePermit, fireAlarmPermit, lowVoltagePermit,
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
				'building_p':buildingPermit, 
				'mechanical_p' :mechanicalPermit,
				'electrical_p':electricalPermit,
				'plumbing_p':plumbingPermit,
				'fireSprinkler_p':fireSprinklePermit,
				'fireAlarm_p':fireAlarmPermit, 
				'lowVoltage_p':lowVoltagePermit,
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