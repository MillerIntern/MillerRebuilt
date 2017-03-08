var PAGETYPE = 'inspection';

var PROJECT_DATA;

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
 	$("#roughinElectrical").datepicker();   
 	$("#roughinMechanical").datepicker();   
 	$("#roughinPlumbing").datepicker();   
 	$("#mechanicalLightSmokeInspection").datepicker();   
 	$("#ceilingInspection").datepicker();   
 	$("#framingInspection").datepicker();   
});

function getProjectEnums()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'inspection')
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
				setProjectHeader(data);

				fillTabs(data);
			}
		});
	}
	else
	{
		alert("That's weird... You might want to go back and try again");
	}
}

function fillTabs(json)
{
	console.log(json);
	$("#fireMarshalInspection").val(json.inspections.fire_marshal);
	$("#healthInspection").val(json.inspections.health);
	$("#roughinMechanical").val(json.inspections.roughin_mechanical);
	$("#roughinElectrical").val(json.inspections.roughin_electric);
	$("#roughinPlumbing").val(json.inspections.roughin_plumbing);
	$("#framingInspection").val(json.inspections.framing);
	$("#ceilingInspection").val(json.inspections.ceiling);
	$("#mechanicalLightSmokeInspection").val(json.inspections.mechanicalLightSmoke);
}

function saveProject()
{
    console.log("Saving Inspections Information");
	
    var fireMarshalInspection = $("#fireMarshalInspection").val();
    var healthInspection = $("#healthInspection").val();
    var roughinMechanical = $("#roughinMechanical").val();
    var roughinElectrical = $("#roughinElectrical").val();
    var roughinPlumbing = $("#roughinPlumbing").val();
    var framingInspection = $("#framingInspection").val();
    var mechanicalLightSmokeInspection = $("#mechanicalLightSmokeInspection").val();
    var ceilingInspection = $("#ceilingInspection").val();
    
    var dates =[
				fireMarshalInspection, healthInspection, roughinMechanical, roughinElectrical, 
				roughinPlumbing, framingInspection, mechanicalLightSmokeInspection,ceilingInspection
                ];
    
    
    if(isValidInput(dates))
    {
    	console.log("we got valid data now");
    	
		var action = "editInspections";
		var INSPECTION_ID = 0;
		if(PROJECT_DATA.inspections != null)
			INSPECTION_ID = PROJECT_DATA.inspections.id;

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
				'inspectionID':INSPECTION_ID,
				'framing':framingInspection, 
				'ceiling' :ceilingInspection,
				'mechanicalLightSmoke':mechanicalLightSmokeInspection,
				'roughin_mechanical':roughinMechanical,
				'roughin_electric':roughinElectrical,
				'roughin_plumbing':roughinPlumbing, 
				'health':healthInspection,
				'fire_marshal': fireMarshalInspection,
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
