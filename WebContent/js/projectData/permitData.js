var PAGETYPE = 'permit';

var PROJECT_DATA;
var PROJECT_ID;

// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	$('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#saveButton > button').prop('disabled', true);

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

function getProject()
{
	console.log(getParameterByName("id"));
		PROJECT_ID = getParameterByName("id");
	if(PROJECT_ID !== null) {
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
				setProjectHeader(data);

				fillTabs(PROJECT_DATA);
			}
		});
	} else {
		alert("That's weird... You might want to go back and try again");
	}
}

function getProjectEnums()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',	
			'permitstage': true
		},
		success: function(data)
		{
			fillDropdowns(data);
			//if(PAGETYPE == 'edit')
			getProject();
		}
	});
}

function fillDropdowns(json)
{
	console.log(json);
	var permitStage = JSON.parse(json["permitstage"]);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < permitStage.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = permitStage[i].name;
		option.setAttribute("value", permitStage[i].id);
		d.appendChild(option);
	}
	$(".status").append(d);
	
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
		$("#buildingPermitStatus").val(json.permits.buildingPermitStatus);
		$("#buildingInspectionStatus").val(json.permits.buildingInspectionStatus);
		$("#buildingInspectionLastUpdated").val(json.permits.buildingInspectionLastUpdated);
		$("#buildingNotes").val(json.permits.buildingNotes);
		
		$("#roofingPermitLastUpdated").val(json.permits.roofing);
		$("#roofingPermitStatus").val(json.permits.roofingPermitStatus);
		$("#roofingInspectionStatus").val(json.permits.roofingInspectionStatus);
		$("#roofingInspectionLastUpdated").val(json.permits.roofingInspectionLastUpdated);
		$("#roofingNotes").val(json.permits.roofingNotes);
		
		$("#mechanicalPermitLastUpdated").val(json.permits.mechanical);
		$("#mechanicalPermitStatus").val(json.permits.mechanicalPermitStatus);
		$("#mechanicalInspectionStatus").val(json.permits.mechanicalInspectionStatus);
		$("#mechanicalInspectionLastUpdated").val(json.permits.mechanicalInspectionLastUpdated);
		$("#mechanicalNotes").val(json.permits.mechanicalNotes);
		
		$("#electricalPermitLastUpdated").val(json.permits.electrical);
		$("#electricalPermitStatus").val(json.permits.electricalPermitStatus);
		$("#electricalInspectionStatus").val(json.permits.electricalInspectionStatus);
		$("#electricalInspectionLastUpdated").val(json.permits.electricalInspectionLastUpdated);
		$("#electricalNotes").val(json.permits.electricalNotes);
		
		$("#plumbingPermitLastUpdated").val(json.permits.plumbing);
		$("#plumbingPermitStatus").val(json.permits.plumbingPermitStatus);
		$("#plumbingInspectionStatus").val(json.permits.plumbingInspectionStatus);
		$("#plumbingInspectionLastUpdated").val(json.permits.plumbingInspectionLastUpdated);
		$("#plumbingNotes").val(json.permits.plumbingNotes);
		
		$("#sprinklerPermitLastUpdated").val(json.permits.fire_sprinkler);
		$("#sprinklerPermitStatus").val(json.permits.sprinklerPermitStatus);
		$("#sprinklerInspectionStatus").val(json.permits.sprinklerInspectionStatus);
		$("#sprinklerInspectionLastUpdated").val(json.permits.sprinklerInspectionLastUpdated);
		$("#sprinklerNotes").val(json.permits.sprinklerNotes);
		
		$("#fireAlarmPermitLastUpdated").val(json.permits.fire_alarm);
		$("#fireAlarmPermitStatus").val(json.permits.fireAlarmPermitStatus);
		$("#fireAlarmInspectionStatus").val(json.permits.fireAlarmInspectionStatus);
		$("#fireAlarmInspectionLastUpdated").val(json.permits.fireAlarmInspectionLastUpdated);
		$("#fireAlarmNotes").val(json.permits.fireAlarmNotes);
		
		$("#voltagePermitLastUpdated").val(json.permits.low_voltage);
		$("#voltagePermitStatus").val(json.permits.voltagePermitStatus);
		$("#voltageInspectionStatus").val(json.permits.voltageInspectionStatus);
		$("#voltageInspectionLastUpdated").val(json.permits.voltageInspectionLastUpdated);
		$("#voltageNotes").val(json.permits.voltageNotes);
		
	    $("#otherAPermitStatus").val(json.permits.otherAPermitStatus);
	    $("#otherAPermitLastUpdated").val(json.permits.otherAPermit);
	    $("#otherAInspectionStatus").val(json.permits.otherAInspectionStatus);
	    $("#otherAInspectionLastUpdated").val(json.permits.otherAInspectionLastUpdated);
	    $("#otherANotes").val(json.permits.otherANotes);    
	    
	    $("#otherBPermitStatus").val(json.permits.otherBPermitStatus);
	    $("#otherBPermitLastUpdated").val(json.permits.otherBPermit);
	    $("#otherBInspectionStatus").val(json.permits.otherBInspectionStatus);
	    $("#otherBInspectionLastUpdated").val(json.permits.otherBInspectionLastUpdated);
	    $("#otherBNotes").val(json.permits.otherBNotes);  	
	}
	    
}

function convert(param)
{
	
}

function saveProject()
{
    console.log("Saving Permit Information");
	
    var buildingPermitStatus = $("#buildingPermitStatus").val();
    var buildingPermitLastUpdated = $("#buildingPermitLastUpdated").val();
    var buildingInspectionStatus = $("#buildingInspectionStatus").val();
    var buildingInspectionLastUpdated = $("#buildingInspectionLastUpdated").val();
    var buildingNotes = $("#buildingNotes").val();
    
    var roofingPermitStatus = $("#roofingPermitStatus").val();
    var roofingPermitLastUpdated = $("#roofingPermitLastUpdated").val();
    var roofingInspectionStatus = $("#roofingInspectionStatus").val();
    var roofingInspectionLastUpdated = $("#roofingInspectionLastUpdated").val();
    var roofingNotes = $("#roofingNotes").val();
    
    var mechanicalPermitStatus = $("#mechanicalPermitStatus").val();
    var mechanicalPermitLastUpdated = $("#mechanicalPermitLastUpdated").val();
    var mechanicalInspectionStatus = $("#mechanicalInspectionStatus").val();
    var mechanicalInspectionLastUpdated = $("#mechanicalInspectionLastUpdated").val();
    var mechanicalNotes = $("#mechanicalNotes").val();
    
    var electricalPermitStatus = $("#electricalPermitStatus").val();
    var electricalPermitLastUpdated = $("#electricalPermitLastUpdated").val();
    var electricalInspectionStatus = $("#electricalInspectionStatus").val();
    var electricalInspectionLastUpdated = $("#electricalInspectionLastUpdated").val();
    var electricalNotes = $("#electricalNotes").val();
    
    var plumbingPermitStatus = $("#plumbingPermitStatus").val();
    var plumbingPermitLastUpdated = $("#plumbingPermitLastUpdated").val();
    var plumbingInspectionStatus = $("#plumbingInspectionStatus").val();
    var plumbingInspectionLastUpdated = $("#plumbingInspectionLastUpdated").val();
    var plumbingNotes = $("#plumbingNotes").val();    
    
    var sprinklerPermitStatus = $("#sprinklerPermitStatus").val();
    var sprinklerPermitLastUpdated = $("#sprinklerPermitLastUpdated").val();
    var sprinklerInspectionStatus = $("#sprinklerInspectionStatus").val();
    var sprinklerInspectionLastUpdated = $("#sprinklerInspectionLastUpdated").val();
    var sprinklerNotes = $("#sprinklerNotes").val();    
    
    var fireAlarmPermitStatus = $("#fireAlarmPermitStatus").val();
    var fireAlarmPermitLastUpdated = $("#fireAlarmPermitLastUpdated").val();
    var fireAlarmInspectionStatus = $("#fireAlarmInspectionStatus").val();
    var fireAlarmInspectionLastUpdated = $("#fireAlarmInspectionLastUpdated").val();
    var fireAlarmNotes = $("#fireAlarmNotes").val();  
    
    var voltagePermitStatus = $("#voltagePermitStatus").val();
    var voltagePermitLastUpdated = $("#voltagePermitLastUpdated").val();
    var voltageInspectionStatus = $("#voltageInspectionStatus").val();
    var voltageInspectionLastUpdated = $("#voltageInspectionLastUpdated").val();
    var voltageNotes = $("#voltageNotes").val();  
    
    var otherAPermitStatus = $("#otherAPermitStatus").val();
    var otherAPermitLastUpdated = $("#otherAPermitLastUpdated").val();
    var otherAInspectionStatus = $("#otherAInspectionStatus").val();
    var otherAInspectionLastUpdated = $("#otherAInspectionLastUpdated").val();
    var otherANotes = $("#otherANotes").val();    
    
    var otherBPermitStatus = $("#otherBPermitStatus").val();
    var otherBPermitLastUpdated = $("#otherBPermitLastUpdated").val();
    var otherBInspectionStatus = $("#otherBInspectionStatus").val();
    var otherBInspectionLastUpdated = $("#otherBInspectionLastUpdated").val();
    var otherBNotes = $("#otherBNotes").val();    
    
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
				'plumbingInspectionLastUpdated': plumbingInspectionLastUpdated,
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
				
				console.log(data);

				alert('Save Complete!');
				$('#saveButton > button').prop('disabled', false);

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function(data)
			{
				console.log(data);
				alert('Save Complete!');
				$('#saveButton > button').prop('disabled', false);

			}
		});
    }  
}

function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + PROJECT_ID;
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