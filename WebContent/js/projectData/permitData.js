var PAGETYPE = 'permit';

var PROJECT_DATA;
var projectID;

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
	
	$('.permitStatus, .inspectionStatus').change(function () {
		console.log($(this).attr('data-associated-date'));
		$('#' + $(this).attr('data-associated-date')).val(getToday());
	});
	
});

function getProject()
{
	console.log(getParameterByName("id"));
		projectID = getParameterByName("id");
	if(projectID !== null) {
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': projectID,
				
			},
			success: function(data)
			{
				PROJECT_DATA = (data);
				setProjectHeader(data);

				fillTabs(PROJECT_DATA);
				getTasks();
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
	var permitStage = [{"name": "Preparing"}, {"name": "Submitted"}, {"name": "Approved"}, {"name": 'Issued'}, {'name': 'Closed'}, {'name': 'N/A'}];
	var inspectionStage = [{'name': 'Scheduled'}, {'name': 'Passed'}, {'name': 'Failed'}, {'name': 'N/A'}];
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < permitStage.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = permitStage[i].name;
		option.setAttribute("value", permitStage[i].name);
		d.appendChild(option);
	}
	$(".permitStatus").append(d);
	
	var dd = document.createDocumentFragment();
	for (var i = 0; i < inspectionStage.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = inspectionStage[i].name;
		option.setAttribute("value", inspectionStage[i].name);
		dd.appendChild(option);
	}
	$('.inspectionStatus').append(dd);
	
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
		
		$("#roofingPermitLastUpdated").val(json.permits.roofing);
		$("#roofingPermitStatus").val(json.permits.roofingPermitStatus);
		$("#roofingInspectionStatus").val(json.permits.roofingInspectionStatus);
		$("#roofingInspectionLastUpdated").val(json.permits.roofingInspectionLastUpdated);
		
		$("#mechanicalPermitLastUpdated").val(json.permits.mechanical);
		$("#mechanicalPermitStatus").val(json.permits.mechanicalPermitStatus);
		$("#mechanicalInspectionStatus").val(json.permits.mechanicalInspectionStatus);
		$("#mechanicalInspectionLastUpdated").val(json.permits.mechanicalInspectionLastUpdated);
		
		$("#electricalPermitLastUpdated").val(json.permits.electrical);
		$("#electricalPermitStatus").val(json.permits.electricalPermitStatus);
		$("#electricalInspectionStatus").val(json.permits.electricalInspectionStatus);
		$("#electricalInspectionLastUpdated").val(json.permits.electricalInspectionLastUpdated);
		
		$("#plumbingPermitLastUpdated").val(json.permits.plumbing);
		$("#plumbingPermitStatus").val(json.permits.plumbingPermitStatus);
		$("#plumbingInspectionStatus").val(json.permits.plumbingInspectionStatus);
		$("#plumbingInspectionLastUpdated").val(json.permits.plumbingInspectionLastUpdated);
		
		$("#sprinklerPermitLastUpdated").val(json.permits.fire_sprinkler);
		$("#sprinklerPermitStatus").val(json.permits.sprinklerPermitStatus);
		$("#sprinklerInspectionStatus").val(json.permits.sprinklerInspectionStatus);
		$("#sprinklerInspectionLastUpdated").val(json.permits.sprinklerInspectionLastUpdated);
		
		$("#fireAlarmPermitLastUpdated").val(json.permits.fire_alarm);
		$("#fireAlarmPermitStatus").val(json.permits.fireAlarmPermitStatus);
		$("#fireAlarmInspectionStatus").val(json.permits.fireAlarmInspectionStatus);
		$("#fireAlarmInspectionLastUpdated").val(json.permits.fireAlarmInspectionLastUpdated);
		
		$("#voltagePermitLastUpdated").val(json.permits.low_voltage);
		$("#voltagePermitStatus").val(json.permits.voltagePermitStatus);
		$("#voltageInspectionStatus").val(json.permits.voltageInspectionStatus);
		$("#voltageInspectionLastUpdated").val(json.permits.voltageInspectionLastUpdated);
		
	    $("#otherAPermitStatus").val(json.permits.otherAPermitStatus);
	    $("#otherAPermitLastUpdated").val(json.permits.otherAPermit);
	    $("#otherAInspectionStatus").val(json.permits.otherAInspectionStatus);
	    $("#otherAInspectionLastUpdated").val(json.permits.otherAInspectionLastUpdated);
	    
	    $("#otherBPermitStatus").val(json.permits.otherBPermitStatus);
	    $("#otherBPermitLastUpdated").val(json.permits.otherBPermit);
	    $("#otherBInspectionStatus").val(json.permits.otherBInspectionStatus);
	    $("#otherBInspectionLastUpdated").val(json.permits.otherBInspectionLastUpdated);
	    
	    $('#permitNotes').text(json.permits.permitNotes);
	    $('#inspectionNotes').text(json.permits.inspectionNotes);
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
    
    var roofingPermitStatus = $("#roofingPermitStatus").val();
    var roofingPermitLastUpdated = $("#roofingPermitLastUpdated").val();
    var roofingInspectionStatus = $("#roofingInspectionStatus").val();
    var roofingInspectionLastUpdated = $("#roofingInspectionLastUpdated").val();
    
    var mechanicalPermitStatus = $("#mechanicalPermitStatus").val();
    var mechanicalPermitLastUpdated = $("#mechanicalPermitLastUpdated").val();
    var mechanicalInspectionStatus = $("#mechanicalInspectionStatus").val();
    var mechanicalInspectionLastUpdated = $("#mechanicalInspectionLastUpdated").val();
    
    var electricalPermitStatus = $("#electricalPermitStatus").val();
    var electricalPermitLastUpdated = $("#electricalPermitLastUpdated").val();
    var electricalInspectionStatus = $("#electricalInspectionStatus").val();
    var electricalInspectionLastUpdated = $("#electricalInspectionLastUpdated").val();
    
    var plumbingPermitStatus = $("#plumbingPermitStatus").val();
    var plumbingPermitLastUpdated = $("#plumbingPermitLastUpdated").val();
    var plumbingInspectionStatus = $("#plumbingInspectionStatus").val();
    var plumbingInspectionLastUpdated = $("#plumbingInspectionLastUpdated").val();
    
    var sprinklerPermitStatus = $("#sprinklerPermitStatus").val();
    var sprinklerPermitLastUpdated = $("#sprinklerPermitLastUpdated").val();
    var sprinklerInspectionStatus = $("#sprinklerInspectionStatus").val();
    var sprinklerInspectionLastUpdated = $("#sprinklerInspectionLastUpdated").val();
    
    var fireAlarmPermitStatus = $("#fireAlarmPermitStatus").val();
    var fireAlarmPermitLastUpdated = $("#fireAlarmPermitLastUpdated").val();
    var fireAlarmInspectionStatus = $("#fireAlarmInspectionStatus").val();
    var fireAlarmInspectionLastUpdated = $("#fireAlarmInspectionLastUpdated").val();
    
    var voltagePermitStatus = $("#voltagePermitStatus").val();
    var voltagePermitLastUpdated = $("#voltagePermitLastUpdated").val();
    var voltageInspectionStatus = $("#voltageInspectionStatus").val();
    var voltageInspectionLastUpdated = $("#voltageInspectionLastUpdated").val();
    
    var otherAPermitStatus = $("#otherAPermitStatus").val();
    var otherAPermitLastUpdated = $("#otherAPermitLastUpdated").val();
    var otherAInspectionStatus = $("#otherAInspectionStatus").val();
    var otherAInspectionLastUpdated = $("#otherAInspectionLastUpdated").val();
    
    var otherBPermitStatus = $("#otherBPermitStatus").val();
    var otherBPermitLastUpdated = $("#otherBPermitLastUpdated").val();
    var otherBInspectionStatus = $("#otherBInspectionStatus").val();
    var otherBInspectionLastUpdated = $("#otherBInspectionLastUpdated").val();

    var permitNotes = $('#permitNotes').val();
    var inspectionNotes = $('#inspectionNotes').val();
    
    console.log(permitNotes);
    console.log(inspectionNotes);
    
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
				
				'mechanical_p' :mechanicalPermitLastUpdated,
				'mechanicalPermitStatus': mechanicalPermitStatus,
				'mechanicalInspectionStatus': mechanicalInspectionStatus,
				'mechanicalInspectionLastUpdated': mechanicalInspectionLastUpdated,
				
				'electrical_p':electricalPermitLastUpdated,
				'electricalPermitStatus': electricalPermitStatus,
				'electricalInspectionStatus': electricalInspectionStatus,
				'electricalInspectionLastUpdated': electricalInspectionLastUpdated,
				
				'plumbing_p':plumbingPermitLastUpdated,
				'plumbingPermitStatus': plumbingPermitStatus,
				'plumbingInspectionStatus': plumbingInspectionStatus,
				'plumbingInspectionLastUpdated': plumbingInspectionLastUpdated,
				
				'fireSprinkler_p':sprinklerPermitLastUpdated,
				'sprinklerPermitStatus': sprinklerPermitStatus,
				'sprinklerInspectionStatus': sprinklerInspectionStatus,
				'sprinklerInspectionLastUpdated': sprinklerInspectionLastUpdated,
				
				'fireAlarm_p':fireAlarmPermitLastUpdated, 
				'fireAlarmPermitStatus': fireAlarmPermitStatus,
				'fireAlarmInspectionStatus': fireAlarmInspectionStatus,
				'fireAlarmInspectionLastUpdated': fireAlarmInspectionLastUpdated,
				
				'lowVoltage_p':voltagePermitLastUpdated,
				'voltagePermitStatus': voltagePermitStatus,
				'voltageInspectionStatus': voltageInspectionStatus,
				'voltageInspectionLastUpdated': voltageInspectionLastUpdated,
				
				'roofingPermit': roofingPermitLastUpdated,
				'roofingPermitStatus': roofingPermitStatus,
				'roofingInspectionStatus': roofingInspectionStatus,
				'roofingInspectionLastUpdated': roofingInspectionLastUpdated,
				
				'otherPermitA': otherAPermitLastUpdated,
				'otherAPermitStatus': otherAPermitStatus,
				'otherAInspectionStatus': otherAInspectionStatus,
				'otherAInspectionLastUpdated': otherAInspectionLastUpdated,
				
				'otherBPermit': otherBPermitLastUpdated,
				'otherBPermitStatus': otherBPermitStatus,
				'otherBInspectionStatus': otherBInspectionStatus,
				'otherBInspectionLastUpdated': otherBInspectionLastUpdated,

				'permitNotes': permitNotes,
				'inspectionNotes': inspectionNotes
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
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
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