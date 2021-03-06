'use strict';
/*
 * There were several html/javascript files that are associated with the project.
 * This file will concatenate them into one file to save on load time
 * 
 * 							TABLE OF CONTENTS FOR projects.js
 * 
 * Corresponding Javascript File				Lines pertaining to file
 * ______________________________				____________________________
 * 
 * projectData/closeoutData.js 					94      THRU     962
 * projectData/permitData.js					963     THRU     1533
 * projectData.js								1536    THRU     2235
 * projectManager.js							2238    THRU     3448
 * findProject.js 								3450	THRU     4364
 * projectData/changeOrderData.js				4365	TRHU	 4967
 * equipment									4970	THRU	 5261
 * Navigational									5265	THRU	 5514
 */



$(document).ready(function(){$('textarea').keydown(function(){
	autoSizeTextAreas(this);
})});

$(document).ready(function(){$('.autofill_NA').click(function(){
	
	if(!(confirm("Are you sure you want to mark all of the Permits and Inspections for this project as N/A?")))
		return;
	
	$('.autofill_NA').each(function(index){
			$(this).val('true');
	});

	
	fillPermitsAndInspectionsWithNA(this);
})});


//NEXT 3 FUNCTIONS CORRESPOND TO CHOSEN STUFF
/*
$(document).ready(function(){
	$('.stageSelection').chosen({ width : "500px"});
	$('.stageSelection').on('change' , function(evt , params) {
    	
    	if(params.selected) {
    		if(params.selected == "All") 
    			selectAllProjectStages();
    		if(params.selected == "None")
    			deselectAllProjectStages();
    	}  
    	
    	updateFrontEnd();
    });
});

function deselectAllProjectStages() {
	let stageSelection = document.getElementById("stageSelector");
	
	for(var i = 0; i < stageSelection.options.length; i++) {
		stageSelection.options[i].selected = false;
	}
	
	$('#stageSelector').trigger('chosen:updated');

	
}

function selectAllProjectStages() {
	let stageSelection = document.getElementById("stageSelector");
	
	for(var i = 0; i < stageSelection.options.length; i++) {		
		if(stageSelection.options[i].value == "None") {
			continue;
		}
		else if(stageSelection.options[i].value == "All") {
			stageSelection.options[i].selected = false;
		}
		else {
			if(stageSelection.options[i].className == "commonStage")
				stageSelection.options[i].selected = true;
			else
				stageSelection.options[i].selected = false;
		}
	}
	
	$('#stageSelector').trigger('chosen:updated');
	
}

*/



/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE CLOSEOUTDATA.JS FILE
*/

var PAGETYPE_CLOSEOUT = 'closeout';

var PROJECT_DATA;
var projectID;


var currentDivLocation = 'findProject';
let tasks;
let PAGE_ENTRY;
let RETRIEVED_PROJECTS;
let DISPLAYABLE_PROJECTS;
let taskAssigneeType = "EMPLOYEE";
let TASK_EMPLOYEE_ASSIGNEE = "EMPLOYEE";
let TASK_SUB_ASSIGNEE = "SUBCONTRACTOR";
let TASK_ACTION = "createTask";
let CHANGE_ORDER_TYPES = new Array();





var PAGETYPE_EQUIP = "add";
var projectID_EQUIP;
var EQUIPMENT_ID_EQUIP;

var PROJECT_DATA_EQUIP;



// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	$('#closeoutData').find('.nav-tabs > li').click(function () {
		$('#closeoutData').find('.info-tab').removeClass('active');
		$('#closeoutData').find('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		$('#closeoutData').find('#saveButton > button').prop('disabled', true);
	});
	
	 	$('#closeoutData').find("#MCSDate").datepicker();   
	    $('#closeoutData').find("#GCDate").datepicker();
	    $('#closeoutData').find("#mechanicalDate").datepicker();
	    $('#closeoutData').find("#electricalDate").datepicker();
	    $('#closeoutData').find("#gasDate").datepicker();
	    $('#closeoutData').find("#plumbingDate").datepicker();
	    $('#closeoutData').find("#sprinkleDate").datepicker();
	    $('#closeoutData').find("#HTIDate").datepicker();
	    $('#closeoutData').find("#otherFinalLiensDate").datepicker();
	    $('#closeoutData').find("#otherFinalLiensBDate").datepicker();
	    
	    	// Final Inspections //Move other fields here from above
	    $('#closeoutData').find("#tmpCertificateDate").datepicker();
	    $('#closeoutData').find("#mechFinalDate").datepicker();
	    $('#closeoutData').find("#elecFinalDate").datepicker();
	    $('#closeoutData').find("#plumbingFinalDate").datepicker();
	    $('#closeoutData').find("#gasFinalDate").datepicker();
	    $('#closeoutData').find("#ceilingFinalDate").datepicker();
	    $('#closeoutData').find("fireAlarmFinalDate").datepicker();
	    $('#closeoutData').find("#lowVolFinalDate").datepicker();
	    $('#closeoutData').find("#sprinkleFinalDate").datepicker();
	    $('#closeoutData').find("#certificateDate").datepicker();
	    $('#closeoutData').find("#buildingPermitCL").datepicker();
	    
	    
	        // Warranty Letters
	    $('#closeoutData').find("#GCWarrantyDate").datepicker();
	    $('#closeoutData').find("#mechanicalWarrantyDate").datepicker();
	    $('#closeoutData').find("#electricalWarrantyDate").datepicker();
	    $('#closeoutData').find("#plumbingWarrantyDate").datepicker();
	    $('#closeoutData').find("#gasWarrantyDate").datepicker();
	    $('#closeoutData').find("#sprinkleWarrantyDate").datepicker();
	    $('#closeoutData').find("#HTIWarrantyDate").datepicker();
	    $('#closeoutData').find("#otherWarrantyDateA").datepicker();
	    $('#closeoutData').find("#otherWarrantyDateB").datepicker();
	    
	        // Closeout documents
	    $('#closeoutData').find("#manualDate").datepicker();
	    $('#closeoutData').find("#HVACstartupFormDate").datepicker();
	    
		$('#closeoutData').find("#mg2CompletionDate").datepicker();
		$('#closeoutData').find("#MCSWarranty").datepicker();
		$('#closeoutData').find("#equipmentSubCL").datepicker();
		$('#closeoutData').find("#punchList").datepicker();
		$('#closeoutData').find("#asBuilts").datepicker();
		$('#closeoutData').find("#closeoutPhotosCL").datepicker();
		$('#closeoutData').find("#alarmHvac").datepicker();
		$('#closeoutData').find("#verisae").datepicker();
		$('#closeoutData').find('#substantialCompletionDate').datepicker();
		$('#closeoutData').find('#paymentOfDebtsAndClaimsDate').datepicker();
		$('#closeoutData').find('#releaseOfLiensDate').datepicker();
		$('#closeoutData').find('#mulvannySignOffDate').datepicker();
		
		$('#closeoutData').find("#salvageDate").datepicker();
		
	$('#closeoutData').find('.closeout-input').change(function () {
		console.log($(this).attr('data-associated-date'));
		$('#closeoutData').find('#' + $(this).attr('data-associated-date')).val(getToday());
	});
	
});



/**
 * This function retrieves data for a specific project from the server
 * INNER FUNCTION CALLS: setProjectHeader(), fillTabs_CLOSEOUT(), getDropdownItems_CLOSEOUT()
 * @param project to edit
 * @returns
 */
function getProjectEnums_CLOSEOUT(edit)
{
	//console.log(getParameterByName("id"));
	if (PAGETYPE_CLOSEOUT == 'closeout')
	{
		//projectID_CLOSEOUT = getParameterByName("id");
		
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
				PROJECT_DATA = data;
				setProjectHeader(data, currentDivLocation);

				
				
				getDropdownItems_CLOSEOUT();
				
				
				
				//getTasks();
			}
		});
	}
	else
	{
		alert("That's weird... You might want to go back and try again");
	}
}

/**
 * This function retrieves the potential drop down items
 * INNER FUNCTION CALLS: fillDropdowns_CLOSEOUT()
 * @param
 * @returns
 */
function getDropdownItems_CLOSEOUT()
{

	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',
			'closeoutstatus': true
		},
		success: function(data)
		{
			fillDropdowns_CLOSEOUT(data);
			//fillTabs_CLOSEOUT(PROJECT_DATA);
			
		}
	});
}


function convertSalvage( value )
{
  if(value === -2 || value === undefined)
	  return "TBD";
  else if(value === -1)
	  return "N/A";
  
  return value;
}


function convertDefault( value )
{
  if(value === undefined || value === "default")	
	  return "default";
 
  return value;
}


/**
 * This function fills the closeout information for the project
 * INNER FUNCTION CALLS: none
 * @param
 * @returns
 */
function fillTabs_CLOSEOUT(data)
{
	var json = data;
	console.log(json);
	if (json.closeoutDetails != null)
	{	
		
		$('#closeoutData').find("#airGas").val(json.closeoutDetails.airGas);
		$('#closeoutData').find("#permits").val(json.closeoutDetails.permitsClosed);
		$('#closeoutData').find("#asBuilts").val(json.closeoutDetails.asBuilts);
		$('#closeoutData').find("#punchList").val(json.closeoutDetails.punchList);
		$('#closeoutData').find("#alarmHvac").val(json.closeoutDetails.alarmHvacForm);
		$('#closeoutData').find("#verisae").val(json.closeoutDetails.verisaeShutdownReport);
		$('#closeoutData').find("#closeoutBook").val(json.closeoutDetails.closeoutBook);
	    formatRelativeTextAreas(json.closeoutDetails.closeoutNotes, "closeoutNotes", "closeoutData");
		$('#closeoutData').find("#closeoutNotes").val(json.closeoutDetails.closeoutNotes);
		
		$('#closeoutData').find("#buildingPermitCL").val(json.closeoutDetails.buildingPermitCL);

		$('#closeoutData').find("#closeoutPhotosCL").val(json.closeoutDetails.closeoutPhotosCL);
		$('#closeoutData').find("#MCSWarranty").val(json.closeoutDetails.mCSWarranty);
		$('#closeoutData').find("#equipmentSubCL").val(json.closeoutDetails.equipmentSubCL);
		$('#closeoutData').find("#traneCL").val(json.closeoutDetails.traneCL);

		$('#closeoutData').find("#numOfChangeOrders").val(json.closeoutDetails.numOfChangeOrders);
		$('#closeoutData').find("#numOfChangeOrdersCompleted").val(json.closeoutDetails.numOfChangeOrdersCompleted);
		
		$('#closeoutData').find("#numOfMCSChangeOrders").val(json.changeOrders.length);
		
		var cos = json.changeOrders;
		var completed = 0;

		for(var i = 0; i < cos.length; i++)
		{
			var changeOrder = cos[i];
			if(changeOrder.status === "5")
				completed = completed + 1;
		}
		
		$('#closeoutData').find("#numOfMCSChangeOrdersCompleted").val(completed);
		
		$('#closeoutData').find("#tmpCertificateStatus").val(convertDefault(json.closeoutDetails.tmpCertificateStatus));
		$('#closeoutData').find("#tmpCertificateDate").val(json.closeoutDetails.tmpCertificateDate);
		
		$('#closeoutData').find("#mechFinalStatus").val(convertDefault(json.closeoutDetails.mechFinalStatus));
		$('#closeoutData').find("#mechFinalDate").val(json.closeoutDetails.mechFinalDate);
		
		$('#closeoutData').find("#elecFinalNotes").val(json.closeoutDetails.elecFinalNotes);
		$('#closeoutData').find("#elecFinalDate").val(json.closeoutDetails.elecFinalDate);
		$('#closeoutData').find("#elecFinalStatus").val(convertDefault(json.closeoutDetails.elecFinalStatus));
		
		$('#closeoutData').find("#plumbingFinalStatus").val(convertDefault(json.closeoutDetails.plumbingFinalStatus));
		$('#closeoutData').find("#plumbingFinalDate").val(json.closeoutDetails.plumbingFinalDate);
		
		$('#closeoutData').find("#gasFinalStatus").val(convertDefault(json.closeoutDetails.gasFinalStatus));
		$('#closeoutData').find("#gasFinalDate").val(json.closeoutDetails.gasFinalDate);
		
		$('#closeoutData').find("#ceilingFinalStatus").val(convertDefault(json.closeoutDetails.ceilingFinalStatus));
		$('#closeoutData').find("#ceilingFinalDate").val(json.closeoutDetails.ceilingFinalDate);
		
		$('#closeoutData').find("#fireAlarmFinalStatus").val(convertDefault(json.closeoutDetails.fireAlarmFinalStatus));
		$('#closeoutData').find("#fireAlarmFinalDate").val(json.closeoutDetails.fireAlarmFinalDate);
		
		$('#closeoutData').find("#lowVolFinalStatus").val(convertDefault(json.closeoutDetails.lowVolFinalStatus));
		$('#closeoutData').find("#lowVolFinalDate").val(json.closeoutDetails.lowVolFinalDate);
		
		$('#closeoutData').find("#sprinkleFinalStatus").val(convertDefault(json.closeoutDetails.sprinkleFinalStatus));
		$('#closeoutData').find("#sprinkleFinalDate").val(json.closeoutDetails.sprinkleFinalDate);
		
		$('#closeoutData').find("#certificateStatus").val(convertDefault(json.closeoutDetails.certificateStatus));
		$('#closeoutData').find("#certificateDate").val(json.closeoutDetails.certificateDate);
		
		$('#closeoutData').find("#buildFinalStatus").val(convertDefault(json.closeoutDetails.buildingFinalStatus));
		
		$('#closeoutData').find("#equipmentSubmittalStatus").val(convertDefault(json.closeoutDetails.equipmentSubmittalStatus));
		
		$('#closeoutData').find("#manualStatus").val(convertDefault(json.closeoutDetails.manualStatus));
		$('#closeoutData').find("#manualDate").val(json.closeoutDetails.manualDate);
		
		$('#closeoutData').find("#punchListStatus").val(convertDefault(json.closeoutDetails.punchListStatus));
		
		$('#closeoutData').find("#asBuiltDrawingsStatus").val(convertDefault(json.closeoutDetails.asBuiltDrawingsStatus));
		
		$('#closeoutData').find("#closeOutPhotosStatus").val(convertDefault(json.closeoutDetails.closeOutPhotosStatus));
		
		$('#closeoutData').find("#HVACstartupFormStatus").val(convertDefault(json.closeoutDetails.HVACstartupFormStatus));
		$('#closeoutData').find("#HVACstartupFormDate").val(json.closeoutDetails.HVACstartupFormDate);
		
		$('#closeoutData').find("#alarmFormStatus").val(convertDefault(json.closeoutDetails.alarmFormStatus));
		
		$('#closeoutData').find("#salvageStatus").val(convertDefault(json.closeoutDetails.salvageStatus));
		
		$('#closeoutData').find("#verisaeReportStatus").val(convertDefault(json.closeoutDetails.verisaeReportStatus));
		
		$('#closeoutData').find("#MCSWarrantyStatus").val(convertDefault(json.closeoutDetails.MCSWarrantyStatus));
		
		$('#closeoutData').find("#GCWarrantyStatus").val(convertDefault(json.closeoutDetails.GCWarrantyStatus));
		$('#closeoutData').find("#GCWarrantyDate").val(json.closeoutDetails.GCWarrantyDate);
		
		$('#closeoutData').find("#mechanicalWarrantyStatus").val(convertDefault(json.closeoutDetails.mechanicalWarrantyStatus));
		$('#closeoutData').find("#mechanicalWarrantyDate").val(json.closeoutDetails.mechanicalWarrantyDate);
		
		$('#closeoutData').find("#electricalWarrantyStatus").val(convertDefault(json.closeoutDetails.electricalWarrantyStatus));
		$('#closeoutData').find("#electricalWarrantyDate").val(json.closeoutDetails.electricalWarrantyDate);
		
		$('#closeoutData').find("#plumbingWarrantyStatus").val(convertDefault(json.closeoutDetails.plumbingWarrantyStatus));
		$('#closeoutData').find("#plumbingWarrantyDate").val(json.closeoutDetails.plumbingWarrantyDate);
		
		$('#closeoutData').find("#gasWarrantyStatus").val(convertDefault(json.closeoutDetails.gasWarrantyStatus));
		$('#closeoutData').find("#gasWarrantyDate").val(json.closeoutDetails.gasWarrantyDate);
		
		$('#closeoutData').find("#sprinkleWarrantyStatus").val(convertDefault(json.closeoutDetails.sprinkleWarrantyStatus));
		$('#closeoutData').find("#sprinkleWarrantyDate").val(json.closeoutDetails.sprinkleWarrantyDate);
				
		$('#closeoutData').find("#HTIWarrantyStatus").val(convertDefault(json.closeoutDetails.HTIWarrantyStatus));
		$('#closeoutData').find("#HTIWarrantyDate").val(json.closeoutDetails.HTIWarrantyDate);
		
		$('#closeoutData').find("#otherWarrantyStatusA").val(convertDefault(json.closeoutDetails.otherWarrantyStatusA));
		$('#closeoutData').find("#otherWarrantyDateA").val(json.closeoutDetails.otherWarrantyDateA);
		
		$('#closeoutData').find("#otherWarrantyStatusB").val(convertDefault(json.closeoutDetails.otherWarrantyStatusB));
		$('#closeoutData').find("#otherWarrantyDateB").val(json.closeoutDetails.otherWarrantyDateB);
		
		$('#closeoutData').find("#MCSStatus").val(convertDefault(json.closeoutDetails.MCSStatus));
		$('#closeoutData').find("#MCSDate").val(json.closeoutDetails.MCSDate);
		
		$('#closeoutData').find("#GCStatus").val(convertDefault(json.closeoutDetails.GCStatus));
		$('#closeoutData').find("#GCDate").val(json.closeoutDetails.GCDate);
		
		$('#closeoutData').find("#mechanicalStatus").val(convertDefault(json.closeoutDetails.mechanicalStatus));
		$('#closeoutData').find("#mechanicalDate").val(json.closeoutDetails.mechanicalDate);
		
		$('#closeoutData').find("#electricalStatus").val(convertDefault(json.closeoutDetails.electricalStatus));
		$('#closeoutData').find("#electricalDate").val(json.closeoutDetails.electricalDate);
		
		$('#closeoutData').find("#plumbingStatus").val(convertDefault(json.closeoutDetails.plumbingStatus));
		$('#closeoutData').find("#plumbingDate").val(json.closeoutDetails.plumbingDate);
		
		$('#closeoutData').find("#gasStatus").val(convertDefault(json.closeoutDetails.gasStatus));
		$('#closeoutData').find("#gasDate").val(json.closeoutDetails.gasDate);
		
		$('#closeoutData').find("#sprinkleStatus").val(convertDefault(json.closeoutDetails.sprinkleStatus));
		$('#closeoutData').find("#sprinkleDate").val(json.closeoutDetails.sprinkleDate);
		
		$('#closeoutData').find("#HTIStatus").val(convertDefault(json.closeoutDetails.HTIStatus));
		$('#closeoutData').find("#HTIDate").val(json.closeoutDetails.HTIDate);
		
		$('#closeoutData').find("#otherFinalLiensStatus").val(convertDefault(json.closeoutDetails.otherFinalLeinsStatus));
		$('#closeoutData').find("#otherFinalLiensDate").val(json.closeoutDetails.otherFinalLeinsDate);
		
		$('#closeoutData').find("#otherFinalLiensBStatus").val(convertDefault(json.closeoutDetails.otherFinalLeinsBStatus));
		$('#closeoutData').find("#otherFinalLiensBDate").val(json.closeoutDetails.otherFinalLeinsBDate);
		
		$('#closeoutData').find("#mg2CompletionDate").val(json.closeoutDetails.mg2CompletionDate);
		$('#closeoutData').find("#mg2CompletionStatus").val(json.closeoutDetails.mg2CompletionStatus);
		
		
	    formatRelativeTextAreas(json.closeoutDetails.finalInspectionNotes, "finalInspectionNotes", "closeoutData");
		$('#closeoutData').find("#finalInspectionNotes").val(json.closeoutDetails.finalInspectionNotes);
	    
	    formatRelativeTextAreas(json.closeoutDetails.finalLiensNotes, "finalLiensNotes", "closeoutData");
		$('#closeoutData').find("#finalLiensNotes").val(json.closeoutDetails.finalLiensNotes);
	    formatRelativeTextAreas(json.closeoutDetails.closeoutDocumentNotes, "closeoutDocumentNotes", "closeoutData");
		$('#closeoutData').find("#closeoutDocumentsNotes").val(json.closeoutDetails.closeoutDocumentsNotes);
	    formatRelativeTextAreas(json.closeoutDetails.warrantyNotes, "warrantyNotes", "closeoutData");
		$('#closeoutData').find("#warrantyNotes").val(json.closeoutDetails.warrantyNotes);
		
		$('#closeoutData').find('#substantialCompletionStatus').val(convertDefault(json.closeoutDetails.substantialCompletionStatus));
		$('#closeoutData').find('#substantialCompletionDate').val(json.closeoutDetails.substantialCompletionDate);
		
		$('#closeoutData').find('#paymentOfDebtsAndClaimsStatus').val(convertDefault(json.closeoutDetails.paymentOfDebtsAndClaimsStatus));
		$('#closeoutData').find('#paymentOfDebtsAndClaimsDate').val(json.closeoutDetails.paymentOfDebtsAndClaimsDate);
		
		$('#closeoutData').find('#releaseOfLiensStatus').val(convertDefault(json.closeoutDetails.releaseOfLiensStatus));
		$('#closeoutData').find('#releaseOfLiensDate').val(json.closeoutDetails.releaseOfLiensDate);
		
		$('#closeoutData').find('#mulvannySignOffStatus').val(convertDefault(json.closeoutDetails.mulvannySignOffStatus));
		$('#closeoutData').find('#mulvannySignOffDate').val(json.closeoutDetails.mulvannySignOffDate);
		
		if(json.closeoutDetails.salvageValue != null)
		{
			$('#otherItemsSalvageTable').find("#salvageDate").val(json.closeoutDetails.salvageValue.date);
			$('#otherItemsSalvageTable').find("#salvageAmount").val(convertSalvage(json.closeoutDetails.salvageValue.value));
		}
		
	    console.log("SALVAGE AMOUNT FILL" , 			$('#otherItemsSalvageTable').find("#salvageAmount").val());
;

	
		
	}
	
}

/**
 * This function fills the dropdowns in the closeoutData div
 * @param the closeout data options
 * INNER FUNCTION CALLS: none
 * @returns
 */
function fillDropdowns_CLOSEOUT(data)
{
	var json = JSON.parse(data["closeoutstatus"]);
	var d = document.createDocumentFragment();
    console.log("CLOSEOUT DATA = ", data);
	for (var i = 0; i < json.length; i++)
	{	
		var option = document.createElement("option");
		option.innerHTML=json[i].name;
		option.setAttribute("value", json[i].id);	
		d.appendChild(option);
	}

	for(var i = 0; i < CLOSEOUTSTATUS_DROPDOWNS.length; i++)
	{
		var copy = d.cloneNode(true);
		$('#closeoutData').find("#" +CLOSEOUTSTATUS_DROPDOWNS[i]).find('[value != "default"]').remove();	
		$('#closeoutData').find("#" +CLOSEOUTSTATUS_DROPDOWNS[i]).append(copy);	
	}
	
	fillTabs_CLOSEOUT(PROJECT_DATA);

}



/**
 * This function saves the current project to the server based off of the values that the user entered
 * INNER FUNCTION CALLS: isValidInput_CLOSEOUT()
 * @returns
 */
function saveProject_CLOSEOUT()
{
    console.log("Saving Closeout Information");
    var punchList = $('#closeoutData').find("#punchList").val();
	var alarmHvac = $('#closeoutData').find("#alarmHvac").val();
	var verisae = $('#closeoutData').find("#verisae").val();
	var asBuilts = $('#closeoutData').find("#asBuilts").val();
	
	var buildingPermitCL = $('#closeoutData').find("#buildingPermitCL").val();
	
	var closeoutPhotosCL = $('#closeoutData').find("#closeoutPhotosCL").val();
	var MCSWarranty = $('#closeoutData').find("#MCSWarranty").val();
	var equipmentSubCL = $('#closeoutData').find("#equipmentSubCL").val();
    
    
    // NEW Closeout CONTENT
	
	var mg2CompletionStatus = $('#closeoutData').find("#mg2CompletionStatus").val();
	var mg2CompletionDate = $('#closeoutData').find("#mg2CompletionDate").val();
	
	var numOfChangeOrders = $('#closeoutData').find("#numOfChangeOrders").val();
	var numOfChangeOrdersCompleted = $('#closeoutData').find("#numOfChangeOrdersCompleted").val();
	
	var numOfMCSChangeOrders = $('#closeoutData').find("#numOfMCSChangeOrders").val();
	var numOfMCSChangeOrdersCompleted = $('#closeoutData').find("#numOfMCSChangeOrdersCompleted").val();
    
        // LIENS
    var MCSStatus = $('#closeoutData').find("#MCSStatus").val(); 
    var MCSDate = $('#closeoutData').find("#MCSDate").val(); 
    
    var GCStatus = $('#closeoutData').find("#GCStatus").val();
    var GCDate = $('#closeoutData').find("#GCDate").val();
    
    var mechanicalStatus = $("#mechanicalStatus").val();
    var mechanicalDate = $("#mechanicalDate").val();
    
    var electricalStatus = $('#closeoutData').find("#electricalStatus").val();
    var electricalDate = $('#closeoutData').find("#electricalDate").val();
    
    var plumbingStatus = $('#closeoutData').find("#plumbingStatus").val();
    var plumbingDate = $('#closeoutData').find("#plumbingDate").val();
    
    var gasStatus = $('#closeoutData').find("#gasStatus").val();
    var gasDate = $('#closeoutData').find("#gasDate").val();
    
    var sprinkleStatus = $('#closeoutData').find("#sprinkleStatus").val();
    var sprinkleDate = $('#closeoutData').find("#sprinkleDate").val();
    
    var HTIStatus = $('#closeoutData').find("#HTIStatus").val();
    var HTIDate = $('#closeoutData').find("#HTIDate").val();
    
    var otherFinalLeinsStatus = $('#closeoutData').find("#otherFinalLiensStatus").val();
    var otherFinalLeinsDate = $('#closeoutData').find("#otherFinalLiensDate").val();

    var otherFinalLeinsBStatus = $('#closeoutData').find("#otherFinalLiensBStatus").val();
    var otherFinalLeinsBDate = $('#closeoutData').find("#otherFinalLiensBDate").val();
    
    var finalLiensNotes = $('#closeoutData').find("#finalLiensNotes").val();
        
    	// INSPECTIONS
    
    var tmpCertificateStatus = $('#closeoutData').find("#tmpCertificateStatus").val();
    var tmpCertificateDate = $('#closeoutData').find("#tmpCertificateDate").val();
    
    var mechFinalStatus = $('#closeoutData').find("#mechFinalStatus").val();
    var mechFinalDate = $('#closeoutData').find("#mechFinalDate").val();
    
    var elecFinalDate = $('#closeoutData').find("#elecFinalDate").val();
    var elecFinalStatus = $('#closeoutData').find("#elecFinalStatus").val();
    
    var plumbingFinalDate = $('#closeoutData').find("#plumbingFinalDate").val();
    var plumbingFinalStatus = $('#closeoutData').find("#plumbingFinalStatus").val();
    
    var gasFinalDate = $('#closeoutData').find("#gasFinalDate").val();
    var gasFinalStatus = $('#closeoutData').find("#gasFinalStatus").val();
    
    var ceilingFinalDate = $('#closeoutData').find("#ceilingFinalDate").val();
    var ceilingFinalStatus = $('#closeoutData').find("#ceilingFinalStatus").val();
    
    var fireAlarmFinalDate = $('#closeoutData').find("#fireAlarmFinalDate").val();
    var fireAlarmFinalStatus = $('#closeoutData').find("#fireAlarmFinalStatus").val();
    
    var lowVolFinalDate = $('#closeoutData').find("#lowVolFinalDate").val();
    var lowVolFinalStatus = $('#closeoutData').find("#lowVolFinalStatus").val();
    
    var sprinkleFinalStatus = $('#closeoutData').find("#sprinkleFinalStatus").val();
    var sprinkleFinalDate = $('#closeoutData').find("#sprinkleFinalDate").val();
    
    var certificateStatus = $('#closeoutData').find("#certificateStatus").val();
    var certificateDate = $('#closeoutData').find("#certificateDate").val();
    
    var buildingFinalStatus = $('#closeoutData').find("#buildFinalStatus").val();
    
    var finalInspectionNotes = $('#closeoutData').find("#finalInspectionNotes").val();

    	// WARRANTIES
    
    var MCSWarrantyStatus = $('#closeoutData').find("#MCSWarrantyStatus").val();
    // MCSWarranty = MCSWarrantyDate
    
    var GCWarrantyStatus = $('#closeoutData').find("#GCWarrantyStatus").val();
    var GCWarrantyDate = $('#closeoutData').find("#GCWarrantyDate").val();
    
    var mechanicalWarrantyStatus = $('#closeoutData').find("#mechanicalWarrantyStatus").val();
    var mechanicalWarrantyDate = $('#closeoutData').find("#mechanicalWarrantyDate").val();
    
    var electricalWarrantyStatus = $('#closeoutData').find("#electricalWarrantyStatus").val();
    var electricalWarrantyDate = $('#closeoutData').find("#electricalWarrantyDate").val();
    
    var plumbingWarrantyStatus = $('#closeoutData').find("#plumbingWarrantyStatus").val();
    var plumbingWarrantyDate = $('#closeoutData').find("#plumbingWarrantyDate").val();
    
    var gasWarrantyStatus = $('#closeoutData').find("#gasWarrantyStatus").val();
    var gasWarrantyDate = $('#closeoutData').find("#gasWarrantyDate").val();
    
    var sprinkleWarrantyStatus = $('#closeoutData').find("#sprinkleWarrantyStatus").val();
    var sprinkleWarrantyDate = $('#closeoutData').find("#sprinkleWarrantyDate").val();
        
    var HTIWarrantyStatus = $('#closeoutData').find("#HTIWarrantyStatus").val();
    var HTIWarrantyDate = $('#closeoutData').find("#HTIWarrantyDate").val();
    
    var otherWarrantyStatusA = $('#closeoutData').find("#otherWarrantyStatusA").val();
    var otherWarrantyDateA = $('#closeoutData').find("#otherWarrantyDateA").val();
    
    var otherWarrantyStatusB = $('#closeoutData').find("#otherWarrantyStatusB").val();
    var otherWarrantyDateB = $('#closeoutData').find("#otherWarrantyDateB").val();
    
    var warrantyNotes = $('#closeoutData').find("#warrantyNotes").val();
    
        // CLOSEOUT DOCUMENTS
    var equipmentSubmittalStatus = $('#closeoutData').find("#equipmentSubmittalStatus").val();
    // equipmentSubCL = equipmentSubmittalDate
    
    var manualStatus = $('#closeoutData').find("#manualStatus").val();
    var manualDate = $('#closeoutData').find("#manualDate").val();
    
    var punchListStatus = $('#closeoutData').find("#punchListStatus").val();
    //punchList = punchListDate
    
    var asBuiltDrawingsStatus = $('#closeoutData').find("#asBuiltDrawingsStatus").val();
    // asBuilts = asBuiltDrawingsDate
    
    var closeOutPhotosStatus = $('#closeoutData').find("#closeOutPhotosStatus").val();
    //closeoutPhotosCL = closeOutPhotosDate
    
    var HVACstartupFormStatus = $('#closeoutData').find("#HVACstartupFormStatus").val();
    var HVACstartupFormDate = $('#closeoutData').find("#HVACstartupFormDate").val();
    
    var alarmFormStatus = $('#closeoutData').find("#alarmFormStatus").val();
    
    
    var salvageStatus = $('#closeoutData').find("#salvageStatus").val();
    // alarmHVAC = alarmFormDate
    
    var verisaeReportStatus = $('#closeoutData').find("#verisaeReportStatus").val();
    // verisae = verisaeReportDate

    var closeoutDocumentsNotes = $('#closeoutData').find("#closeoutDocumentsNotes").val();
    
    var salvageDate = $('#otherItemsSalvageTable').find("#salvageDate").val();
    var salvageAmount = $('#otherItemsSalvageTable').find("#salvageAmount").val();
    
    if(salvageAmount === "N/A")
    	salvageAmount = -1;
    else if(salvageAmount === "TBD")
    	salvageAmount = -2;
    
    console.log("SALVAGE AMOUNT " , salvageAmount);
    
    var substantialCompletionStatus = $('#closeoutData').find('#substantialCompletionStatus').val();
    var substantialCompletionDate = $('#closeoutData').find('#substantialCompletionDate').val();
    
    var paymentOfDebtsAndClaimsStatus = $('#closeoutData').find('#paymentOfDebtsAndClaimsStatus').val();
    var paymentOfDebtsAndClaimsDate = $('#closeoutData').find('#paymentOfDebtsAndClaimsDate').val();
    
    var releaseOfLiensStatus = $('#closeoutData').find('#releaseOfLiensStatus').val();
    var releaseOfLiensDate = $('#closeoutData').find('#releaseOfLiensDate').val();
    
    var mulvannySignOffStatus = $('#closeoutData').find('#mulvannySignOffStatus').val();
    var mulvannySignOffDate = $('#closeoutData').find('#mulvannySignOffDate').val();
    ////////////// END NEW CONTENT
    
    var dates_CLOSEOUT =[
				 
				buildingPermitCL,
				 
				closeoutPhotosCL,
				MCSWarranty,//41
				equipmentSubCL,
				
				
				// new closeout info
				//mg2CompletionDate,
				
				MCSDate, GCDate, mechanicalDate, electricalDate, plumbingDate, gasDate,
				sprinkleDate, HTIDate, otherFinalLeinsDate,
				
				
				sprinkleFinalDate, certificateDate, mechFinalDate, elecFinalDate, plumbingFinalDate, gasFinalDate,
				ceilingFinalDate, fireAlarmDate, lowVolDate, tmpCertificateDate,
				
				
				GCWarrantyDate, mechanicalWarrantyDate, electricalWarrantyDate, sprinkleWarrantyDate, plumbingWarrantyDate, 
				gasWarrantyDate, HTIWarrantyDate, otherWarrantyDateA, otherWarrantyDateB,
				
				manualDate, HVACstartupFormDate, salvageDate, substantialCompletionDate, 
				paymentOfDebtsAndClaimsDate, releaseOfLiensDate, mulvannySignOffDate, asBuilts,
				punchList, alarmHvac, verisae
                ];
    
    
    if(isValidInput_CLOSEOUT(dates_CLOSEOUT))
    {
    	console.log("we got valid data now");
    	for(var i = 0; i < dates_CLOSEOUT.length; i++) {
    		if(dates_CLOSEOUT[i]) dates_CLOSEOUT[i] = dateCleaner(dates_CLOSEOUT[i]);
 
    		
    		if(i == 0) buildingPermitCL = dates_CLOSEOUT[i];
    		if(i == 1) closeoutPhotosCL = dates_CLOSEOUT[i];
    		if(i == 2) MCSWarranty = dates_CLOSEOUT[i];
    		if(i == 3) equipmentSubCL = dates_CLOSEOUT[i];
    		if(i == 4) MCSDate = dates_CLOSEOUT[i];
    		if(i == 5) GCDate = dates_CLOSEOUT[i];
    		if(i == 6) mechanicalDate = dates_CLOSEOUT[i];
    		if(i == 7) electricalDate = dates_CLOSEOUT[i];
    		if(i == 8) plumbingDate = dates_CLOSEOUT[i];
    		if(i == 9) gasDate = dates_CLOSEOUT[i];
    		if(i == 10) sprinkleDate = dates_CLOSEOUT[i];
    		if(i == 11) HTIDate = dates_CLOSEOUT[i];
    		if(i == 12) otherFinalLeinsDate = dates_CLOSEOUT[i];
    		if(i == 13) sprinkleFinalDate = dates_CLOSEOUT[i];
    		if(i == 14) certificateDate = dates_CLOSEOUT[i];
    		if(i == 15) mechFinalDate = dates_CLOSEOUT[i];
    		if(i == 16) elecFinalDate = dates_CLOSEOUT[i];
    		if(i == 17) plumbingFinalDate = dates_CLOSEOUT[i];
    		if(i == 18) gasFinalDate = dates_CLOSEOUT[i];
    		if(i == 19) ceilingFinalDate = dates_CLOSEOUT[i];
    		if(i == 20) fireAlarmFinalDate = dates_CLOSEOUT[i];
    		if(i == 21) lowVolFinalDate = dates_CLOSEOUT[i];
    		if(i == 22) tmpCertificateDate = dates_CLOSEOUT[i];
    		if(i == 23) GCWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 24) mechanicalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 25) electricalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 26) sprinkleWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 27) plumbingWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 28) gasWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 29) HTIWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 30) otherWarrantyDateA = dates_CLOSEOUT[i];
    		if(i == 31) otherWarrantyDateB = dates_CLOSEOUT[i];
    		if(i == 32) manualDate = dates_CLOSEOUT[i];
    		if(i == 33) HVACstartupFormDate = dates_CLOSEOUT[i];
    		if(i == 34) salvageDate = dates_CLOSEOUT[i];
    		if(i == 35) substantialCompletionDate = dates_CLOSEOUT[i];
    		if(i == 36) paymentOfDebtsAndClaimsDate = dates_CLOSEOUT[i];
    		if(i == 37) releaseOfLiensDate = dates_CLOSEOUT[i];
    		if(i == 38) mulvannySignOffDate = dates_CLOSEOUT[i];
    		if(i == 39) asBuilts = dates_CLOSEOUT[i];
    		if(i == 40) punchList = dates_CLOSEOUT[i];
    		if(i == 41) alarmHvac = dates_CLOSEOUT[i];
    		if(i == 42) verisae = dates_CLOSEOUT[i];
    	}
		var action = "editCloseout";
		var CLOSEOUT_ID = PROJECT_DATA.closeoutDetails.id
		var SALVAGE_ID = 0;
		if(PROJECT_DATA.closeoutDetails.salvageValue != null)
			SALVAGE_ID = PROJECT_DATA.closeoutDetails.salvageValue.id;
		
		if( (!PROJECT_DATA || !PROJECT_DATA.id))
		{
			alert("Server Error! (Project ID)");
			return;
		}
		
		if(!CLOSEOUT_ID)
		{
			alert("Server Error! (Closeout ID)");
			return;
		}
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				'projectID':PROJECT_DATA.id,
				'closeoutID':CLOSEOUT_ID,
				'salvageID': SALVAGE_ID,

				'asBuilts':asBuilts,
				'punchList':punchList,
				'alarmHvac':alarmHvac,
				'verisae':verisae,
				

				'buildingPermitCL':buildingPermitCL,
				
				'closeoutPhotosCL': closeoutPhotosCL,
				'MCSWarranty': MCSWarranty,
				'equipmentSubCL': equipmentSubCL, 
				
				// new closeout info
				'mg2CompletionStatus': mg2CompletionStatus,
				//'mg2CompletionDate': mg2CompletionDate,
				
				'numOfChangeOrders': numOfChangeOrders,
				'numOfChangeOrdersCompleted': numOfChangeOrdersCompleted,
				
				'numOfMCSChangeOrders': numOfMCSChangeOrders,
				'numOfMCSChangeOrdersCompleted': numOfMCSChangeOrdersCompleted,
				
				'MCSStatus': MCSStatus,
				'MCSDate': MCSDate,
				
				'GCStatus': GCStatus,
				'GCDate': GCDate,
				
				'mechanicalStatus': mechanicalStatus,
				'mechanicalDate': mechanicalDate,
				
				'electricalStatus': electricalStatus,
				'electricalDate': electricalDate,
				
				'plumbingStatus': plumbingStatus,
				'plumbingDate': plumbingDate,
				
				'gasStatus': gasStatus,
				'gasDate': gasDate,
				
				'sprinkleStatus': sprinkleStatus,
				'sprinkleDate': sprinkleDate,
				
				'HTIStatus': HTIStatus,
				'HTIDate': HTIDate,
				
				'finalLiensNotes': finalLiensNotes,
				
				'otherFinalLeinsStatus': otherFinalLeinsStatus,
				'otherFinalLeinsDate': otherFinalLeinsDate,
				
				'otherFinalLeinsBStatus': otherFinalLeinsBStatus,
				'otherFinalLeinsBDate': otherFinalLeinsBDate,
				
				'mechFinalStatus': mechFinalStatus,
				'mechFinalDate': mechFinalDate,
				
				'elecFinalStatus': elecFinalStatus,
				'elecFinalDate': elecFinalDate,
				
				'plumbingFinalStatus': plumbingFinalStatus,
				'plumbingFinalDate': plumbingFinalDate,
				
				'gasFinalStatus': gasFinalStatus,
				'gasFinalDate': gasFinalDate,
				
				'ceilingFinalStatus': ceilingFinalStatus,
				'ceilingFinalDate': ceilingFinalDate,
				
				'fireAlarmFinalStatus': fireAlarmFinalStatus,
				'fireAlarmFinalDate': fireAlarmFinalDate,
				
				'lowVolFinalStatus': lowVolFinalStatus,
				'lowVolFinalDate': lowVolFinalDate,
				
				'sprinkleFinalStatus': sprinkleFinalStatus,
				'sprinkleFinalDate': sprinkleFinalDate,
				
				'buildingFinalStatus': buildingFinalStatus,	
				
				'tmpCertificateStatus': tmpCertificateStatus,
				'tmpCertificateDate': tmpCertificateDate,
				
				'certificateStatus': certificateStatus,
				'certificateDate': certificateDate,
				
				'finalInspectionNotes': finalInspectionNotes,
			
				'MCSWarrantyStatus': MCSWarrantyStatus,
				
				'GCWarrantyStatus': GCWarrantyStatus,
				'GCWarrantyDate': GCWarrantyDate,
				
				'mechanicalWarrantyStatus': mechanicalWarrantyStatus,
				'mechanicalWarrantyDate': mechanicalWarrantyDate,
				
				'electricalWarrantyStatus': electricalWarrantyStatus,
				'electricalWarrantyDate': electricalWarrantyDate,
				
				'plumbingWarrantyStatus': plumbingWarrantyStatus,
				'plumbingWarrantyDate': plumbingWarrantyDate,
				
				'gasWarrantyStatus': gasWarrantyStatus,
				'gasWarrantyDate': gasWarrantyDate,
				
				'sprinkleWarrantyStatus': sprinkleWarrantyStatus,
				'sprinkleWarrantyDate': sprinkleWarrantyDate,
								
				'HTIWarrantyStatus': HTIWarrantyStatus,
				'HTIWarrantyDate': HTIWarrantyDate,
				
				'otherWarrantyStatusA': otherWarrantyStatusA,
				'otherWarrantyDateA': otherWarrantyDateA,
				
				'otherWarrantyStatusB': otherWarrantyStatusB,
				'otherWarrantyDateB': otherWarrantyDateB,
				
				'warrantyNotes': warrantyNotes,
								
				'equipmentSubmittalStatus': equipmentSubmittalStatus,
				
				'manualStatus': manualStatus,
				'manualDate': manualDate,
				
				'punchListStatus': punchListStatus,
				
				'asBuiltDrawingsStatus': asBuiltDrawingsStatus,
				
				'closeOutPhotosStatus': closeOutPhotosStatus,
				
				'HVACstartupFormStatus': HVACstartupFormStatus,
				'HVACstartupFormDate': HVACstartupFormDate,
				
				'alarmFormStatus': alarmFormStatus,
				
				'salvageStatus': salvageStatus,
				
				'verisaeReportStatus': verisaeReportStatus,
				
				'closeoutDocumentsNotes': closeoutDocumentsNotes,
				
				'salvageDate': salvageDate,
				'salvageAmount': salvageAmount,
				
				'substantialCompletionDate': substantialCompletionDate,
				'substantialCompletionStatus': substantialCompletionStatus,
				
				'paymentOfDebtsAndClaimsDate': paymentOfDebtsAndClaimsDate,
				'paymentOfDebtsAndClaimsStatus': paymentOfDebtsAndClaimsStatus,
				
				'releaseOfLiensDate': releaseOfLiensDate,
				'releaseOfLiensStatus': releaseOfLiensStatus,
				
				'mulvannySignOffDate': mulvannySignOffDate,
				'mulvannySignOffStatus': mulvannySignOffStatus,
			},
			success:function(data){
				updateFrontEnd();			
				//getProject_PROJECT_MANAGER(projectID , 1);
				alert('Project Saved');
				console.log(data);
				//UPDATE CLOSEOUT SUMMARY
				$('#closeoutData').find('#saveButton > button').prop('disabled', false);
				goToProjectManager();

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function()
			{
				alert('Project Saved');
				$('#closeoutData').find('#saveButton > button').prop('disabled', false);
				//UPDATE CLOSEOUT SUMMARY
				//getProject_PROJECT_MANAGER(projectID , 1);
				goToProjectManager();

			       //alert("Status: " + textStatus); 
				   //alert("Error: " + errorThrown);
			//error:function(xhr){
				//alert(xhr.responceText);
				//console.log(xhr.responseText);
							
			}
		});

    }
    
}
/**
 * This function checks the closeout data to make sure it is all valid
 * INNER FUNCTION CALLS: none
 * @param data that the user entered
 * @returns
 */
function isValidInput_CLOSEOUT(dates_CLOSEOUT)
{	
	//Check if all of the dates are in the correct format
	for (var i = 0; i < dates_CLOSEOUT.length; i++)
	{
		var date = dates_CLOSEOUT[i];
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

/**
 * This function returns to the the ProjectManager.html page with a give projectID.
 * -------- NOT USED -------------
 * @returns
 */
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}

var CLOSEOUTSTATUS_DROPDOWNS = [
                                "mg2CompletionStatus",                
                                
                				"copSubmittedStatus", "copApprovedStatus", "copCompletedStatus", "changeOrderSubmittedStatus",
                				"changeOrderApprovedStatus","revisionsSubmittedStatus", "revisionsApprovedStatus",
                				
                				"MCSStatus", "GCStatus", "mechanicalStatus", "electricalStatus", "plumbingStatus", "gasStatus",
                				"sprinkleStatus", "HTIStatus", "otherFinalLiensStatus", "otherFinalLiensBStatus",
                				
                				
                				"sprinkleFinalStatus", "certificateStatus", "tmpCertificateStatus", "mechFinalStatus", "elecFinalStatus",
                				"plumbingFinalStatus", "gasFinalStatus", "buildFinalStatus", "ceilingFinalStatus", "fireAlarmFinalStatus", "lowVolFinalStatus",

                				
                				"MCSWarrantyStatus", "GCWarrantyStatus", "mechanicalWarrantyStatus", "electricalWarrantyStatus", "sprinkleWarrantyStatus", 
                				"plumbingWarrantyStatus", "gasWarrantyStatus", "HTIWarrantyStatus", "otherWarrantyStatusA", "otherWarrantyStatusB",
                				
                				"equipmentSubmittalStatus", "manualStatus","punchListStatus", "asBuiltDrawingsStatus", 
                                "closeOutPhotosStatus", "HVACstartupFormStatus", "salvageStatus", "alarmFormStatus", "verisaeReportStatus",   
                                'substantialCompletionStatus', 'paymentOfDebtsAndClaimsStatus', 'releaseOfLiensStatus',
                                'mulvannySignOffStatus'
                                                ];

//END OF CLOSEOUT DATA JAVASCRIPT

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE PERMITDATA.JS FILE
*/

var PAGETYPE_PERMIT = 'permit';



// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	
	$('#permitData').find('.nav-tabs > li').click(function () {
		$('#permitData').find('.info-tab').removeClass('active');
		$('#permitData').find('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#permitData').find('#saveButton > button').prop('disabled', true);

	});
	
	$('#permitData').find("#buildingPermitLastUpdated").datepicker();
	$('#permitData').find("#buildingInspectionLastUpdated").datepicker();
	$('#permitData').find("#ceilingPermitLastUpdated").datepicker();
	$('#permitData').find("#ceilingInspectionLastUpdated").datepicker();
	$('#permitData').find("#mechanicalPermitLastUpdated").datepicker();
	$('#permitData').find("#mechanicalInspectionLastUpdated").datepicker();
	$('#permitData').find("#electricalPermitLastUpdated").datepicker();
	$('#permitData').find("#electricalInspectionLastUpdated").datepicker();
	$('#permitData').find("#plumbingPermitLastUpdated").datepicker();
	$('#permitData').find("#plumbingInspectionLastUpdated").datepicker();
	$('#permitData').find("#gasPermitLastUpdated").datepicker();
	$('#permitData').find("#gasInspectionLastUpdated").datepicker();
	$('#permitData').find("#sprinklerPermitLastUpdated").datepicker();
	$('#permitData').find("#sprinklerInspectionLastUpdated").datepicker();
	$('#permitData').find("#fireAlarmInspectionLastUpdated").datepicker();
	$('#permitData').find("#fireAlarmPermitLastUpdated").datepicker();
	$('#permitData').find("#voltagePermitLastUpdated").datepicker();
	$('#permitData').find("#voltageInspectionLastUpdated").datepicker();
	$('#permitData').find("#otherAPermitLastUpdated").datepicker();
	$('#permitData').find("#otherBPermitLastUpdated").datepicker();
	$('#permitData').find("#otherAInspectionLastUpdated").datepicker();
	$('#permitData').find("#otherBInspectionLastUpdated").datepicker();
	
	/*
	$('.permitStatus, .inspectionStatus').change(function () {
		//console.log($(this).attr('data-associated-date'));
		$('#' + $(this).attr('data-associated-date')).val(getToday());
	});
	*/
	
});

/**
 * This function retrieves a specific project from the database
 * INNER FUNCTION CALLS: setProjectHeader(), fillTabs_PERMIT(), getTasks()
 * @returns
 */
function getProject_PERMIT()
{
	
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
				setProjectHeader(data, currentDivLocation);

				let autofilled = false;
				$('.autofill_NA').each(function(index){
					if($(this).val() == 'true') autofilled = true;
					else return;
				});
				
				if(!autofilled)
					fillTabs_PERMIT(PROJECT_DATA);
				else
					fillPermitsAndInspectionsWithNA();
				//getTasks();
			}
		});
	} else {
		alert("That's weird... You might want to go back and try again");
	}
}

/**
 * This function retrieves all permit stages from database
 * INNER FUNCTION CALLS: fillDropdowns_PERMIT(), fillTabs_PERMIT(), getProject_PERMIT()
 * @returns
 */
function getProjectEnums_PERMIT()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',	
			'permitstage': true ,
			'inspectionstatus' : true
		},
		success: function(data)
		{
			fillDropdowns_PERMIT(data);
			if(EDIT_INTENTION == true)
				getProject_PERMIT();
		}
	});
}

/**
 * This function retrieves a specific project from the database
 * INNER FUNCTION CALLS: none
 * @returns
 * @params a json object
 */
function fillDropdowns_PERMIT(json)
{
	console.log("PERMIT/INSPECTION JSON = ", json);
	
	var permitStage = JSON.parse(json["permitstage"]);
	permitStage.sort(function(a , b) {
		if(a.id < b.id) return -1;
		else if(a.id > b.id ) return 1;
		else return 0;
	});
	
	var inspectionStage = JSON.parse(json["inspectionstatus"]);
	inspectionStage.sort(function(a , b) {
		if(a.id < b.id) return -1;
		else if(a.id > b.id ) return 1;
		else return 0;
	});
	//var permitStage = [{"name": "Preparing"}, {"name": "Submitted"}, {"name": "Approved"}, {"name": 'Issued'}, {'name': 'Closed'}, {'name': 'N/A'} , {'name' : 'TBD'}];
	//var inspectionStage = [{'name': 'Scheduled'}, {'name': 'Passed'}, {'name': 'Failed'}, {'name': 'N/A'} , {'name' : 'TBD'}];
	
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < permitStage.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = permitStage[i].name;
		option.setAttribute("value", permitStage[i].name);
		d.appendChild(option);
	}
	
	$('#permitData').find(".permitStatus").find('option').remove();
	$('#permitData').find(".permitStatus").append(d);
	
	var dd = document.createDocumentFragment();
	for (var i = 0; i < inspectionStage.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = inspectionStage[i].name;
		option.setAttribute("value", inspectionStage[i].name);
		dd.appendChild(option);
	}
	
	$('#permitData').find('.inspectionStatus').find('option').remove();
	$('#permitData').find('.inspectionStatus').append(dd);
	
}


function fillPermitsAndInspectionsWithNA()
{
	let today = getToday();
	
	
	
	$('.permitTableData').each(function(index){
		
		if($(this).attr('id').includes("Date"))
		{
			$(this).html(today);
		}		
		else
		{
			$(this).html('N/A');
		}	
	});
	
	$('.inspectionTableData').each(function(index){
		
		if($(this).attr('id').includes("Date"))
		{
			$(this).html(today);
		}		
		else
		{
			$(this).html('N/A');
		}	
	});
	
	$('.permitAndInspectionStatusDate').each(function(index){
		$(this).val(today);
	});
	
	$('.permitStatus').each(function(index){
		$(this).val('N/A');
	});
	
	$('.inspectionStatus').each(function(index){
		$(this).val('N/A');
	});
}





/**
 * This function fills all of the tabs in the permitData div
 * INNER FUNCTION CALLS: none
 * @returns
 * @params a json object with all necessary permit info
 */
function fillTabs_PERMIT(data)
{
	var json = data;
	
	$('#permitData').find(".projectIdentifier").html(json.warehouse.city.name 
			+ ", " + json.warehouse.state + " --- " +  json.projectItem.name);
	
	console.log(json);
	if (json.permits != null)
	{	
		$('#permitData').find("#buildingPermitLastUpdated").val(json.permits.building);
		$('#permitData').find("#buildingPermitStatus").val(json.permits.buildingPermitStatus);
		$('#permitData').find("#buildingInspectionStatus").val(json.permits.buildingInspectionStatus);
		$('#permitData').find("#buildingInspectionLastUpdated").val(json.permits.buildingInspectionLastUpdated);
		
		$('#permitData').find("#ceilingPermitLastUpdated").val(json.permits.ceiling);
		$('#permitData').find("#ceilingPermitStatus").val(json.permits.ceilingPermitStatus);
		$('#permitData').find("#ceilingInspectionStatus").val(json.permits.ceilingInspectionStatus);
		$('#permitData').find("#ceilingInspectionLastUpdated").val(json.permits.ceilingInspectionLastUpdated);
		
		$('#permitData').find("#mechanicalPermitLastUpdated").val(json.permits.mechanical);
		$('#permitData').find("#mechanicalPermitStatus").val(json.permits.mechanicalPermitStatus);
		$('#permitData').find("#mechanicalInspectionStatus").val(json.permits.mechanicalInspectionStatus);
		$('#permitData').find("#mechanicalInspectionLastUpdated").val(json.permits.mechanicalInspectionLastUpdated);
		
		$('#permitData').find("#electricalPermitLastUpdated").val(json.permits.electrical);
		$('#permitData').find("#electricalPermitStatus").val(json.permits.electricalPermitStatus);
		$('#permitData').find("#electricalInspectionStatus").val(json.permits.electricalInspectionStatus);
		$('#permitData').find("#electricalInspectionLastUpdated").val(json.permits.electricalInspectionLastUpdated);
		
		$('#permitData').find("#plumbingPermitLastUpdated").val(json.permits.plumbing);
		$('#permitData').find("#plumbingPermitStatus").val(json.permits.plumbingPermitStatus);
		$('#permitData').find("#plumbingInspectionStatus").val(json.permits.plumbingInspectionStatus);
		$('#permitData').find("#plumbingInspectionLastUpdated").val(json.permits.plumbingInspectionLastUpdated);
		
		$('#permitData').find("#gasPermitLastUpdated").val(json.permits.gas);
		$('#permitData').find("#gasPermitStatus").val(json.permits.gasPermitStatus);
		$('#permitData').find("#gasInspectionStatus").val(json.permits.gasInspectionStatus);
		$('#permitData').find("#gasInspectionLastUpdated").val(json.permits.gasInspectionLastUpdated);
				
		$('#permitData').find("#sprinklerPermitLastUpdated").val(json.permits.fire_sprinkler);
		$('#permitData').find("#sprinklerPermitStatus").val(json.permits.sprinklerPermitStatus);
		$('#permitData').find("#sprinklerInspectionStatus").val(json.permits.sprinklerInspectionStatus);
		$('#permitData').find("#sprinklerInspectionLastUpdated").val(json.permits.sprinklerInspectionLastUpdated);
		
		$('#permitData').find("#fireAlarmPermitLastUpdated").val(json.permits.fire_alarm);
		$('#permitData').find("#fireAlarmPermitStatus").val(json.permits.fireAlarmPermitStatus);
		$('#permitData').find("#fireAlarmInspectionStatus").val(json.permits.fireAlarmInspectionStatus);
		$('#permitData').find("#fireAlarmInspectionLastUpdated").val(json.permits.fireAlarmInspectionLastUpdated);
		
		$('#permitData').find("#voltagePermitLastUpdated").val(json.permits.low_voltage);
		$('#permitData').find("#voltagePermitStatus").val(json.permits.voltagePermitStatus);
		$('#permitData').find("#voltageInspectionStatus").val(json.permits.voltageInspectionStatus);
		$('#permitData').find("#voltageInspectionLastUpdated").val(json.permits.voltageInspectionLastUpdated);
		
	    $('#permitData').find("#otherAPermitStatus").val(json.permits.otherAPermitStatus);
	    $('#permitData').find("#otherAPermitLastUpdated").val(json.permits.otherAPermit);
	    $('#permitData').find("#otherAInspectionStatus").val(json.permits.otherAInspectionStatus);
	    $('#permitData').find("#otherAInspectionLastUpdated").val(json.permits.otherAInspectionLastUpdated);
	    
	    $('#permitData').find("#otherBPermitStatus").val(json.permits.otherBPermitStatus);
	    $('#permitData').find("#otherBPermitLastUpdated").val(json.permits.otherBPermit);
	    $('#permitData').find("#otherBInspectionStatus").val(json.permits.otherBInspectionStatus);
	    $('#permitData').find("#otherBInspectionLastUpdated").val(json.permits.otherBInspectionLastUpdated);
	    
	    formatRelativeTextAreas(json.permits.permitNotes , "permitNotes", "permitData");
	    $('#permitData').find('#permitNotes').text(json.permits.permitNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "inspectionNotes", "permitData");
	    $('#permitData').find('#inspectionNotes').text(json.permits.inspectionNotes);
	}
	    
}

function convert(param)
{
	
}

/**
 * This function saves a certain project's permit info to the database
 * INNER FUNCTION CALLS: isValidInput_PERMIT(), updateFrontEnd()
 * @returns
 */
function saveProject_PERMIT()
{
    console.log("Saving Permit Information");
	
    var buildingPermitStatus = $('#permitData').find("#buildingPermitStatus").val();
    var buildingPermitLastUpdated = $('#permitData').find("#buildingPermitLastUpdated").val();
    var buildingInspectionStatus = $('#permitData').find("#buildingInspectionStatus").val();
    var buildingInspectionLastUpdated = $('#permitData').find("#buildingInspectionLastUpdated").val();
    
    var ceilingPermitStatus = $('#permitData').find("#ceilingPermitStatus").val();
    var ceilingPermitLastUpdated = $('#permitData').find("#ceilingPermitLastUpdated").val();
    var ceilingInspectionStatus = $('#permitData').find("#ceilingInspectionStatus").val();
    var ceilingInspectionLastUpdated = $('#permitData').find("#ceilingInspectionLastUpdated").val();
    
    var mechanicalPermitStatus = $('#permitData').find("#mechanicalPermitStatus").val();
    var mechanicalPermitLastUpdated = $('#permitData').find("#mechanicalPermitLastUpdated").val();
    var mechanicalInspectionStatus = $('#permitData').find("#mechanicalInspectionStatus").val();
    var mechanicalInspectionLastUpdated = $('#permitData').find("#mechanicalInspectionLastUpdated").val();
    
    var electricalPermitStatus = $('#permitData').find("#electricalPermitStatus").val();
    var electricalPermitLastUpdated = $('#permitData').find("#electricalPermitLastUpdated").val();
    var electricalInspectionStatus = $('#permitData').find("#electricalInspectionStatus").val();
    var electricalInspectionLastUpdated = $('#permitData').find("#electricalInspectionLastUpdated").val();
    
    var plumbingPermitStatus = $('#permitData').find("#plumbingPermitStatus").val();
    var plumbingPermitLastUpdated = $('#permitData').find("#plumbingPermitLastUpdated").val();
    var plumbingInspectionStatus = $('#permitData').find("#plumbingInspectionStatus").val();
    var plumbingInspectionLastUpdated = $('#permitData').find("#plumbingInspectionLastUpdated").val();
    
    var gasPermitStatus = $('#permitData').find("#gasPermitStatus").val();
    var gasPermitLastUpdated = $('#permitData').find("#gasPermitLastUpdated").val();
    var gasInspectionStatus = $('#permitData').find("#gasInspectionStatus").val();
    var gasInspectionLastUpdated = $('#permitData').find("#gasInspectionLastUpdated").val();
    
    var sprinklerPermitStatus = $('#permitData').find("#sprinklerPermitStatus").val();
    var sprinklerPermitLastUpdated = $('#permitData').find("#sprinklerPermitLastUpdated").val();
    var sprinklerInspectionStatus = $('#permitData').find("#sprinklerInspectionStatus").val();
    var sprinklerInspectionLastUpdated = $('#permitData').find("#sprinklerInspectionLastUpdated").val();
    
    var fireAlarmPermitStatus = $('#permitData').find("#fireAlarmPermitStatus").val();
    var fireAlarmPermitLastUpdated = $('#permitData').find("#fireAlarmPermitLastUpdated").val();
    var fireAlarmInspectionStatus = $('#permitData').find("#fireAlarmInspectionStatus").val();
    var fireAlarmInspectionLastUpdated = $('#permitData').find("#fireAlarmInspectionLastUpdated").val();
    
    var voltagePermitStatus = $('#permitData').find("#voltagePermitStatus").val();
    var voltagePermitLastUpdated = $('#permitData').find("#voltagePermitLastUpdated").val();
    var voltageInspectionStatus = $('#permitData').find("#voltageInspectionStatus").val();
    var voltageInspectionLastUpdated = $('#permitData').find("#voltageInspectionLastUpdated").val();
    
    var otherAPermitStatus = $('#permitData').find("#otherAPermitStatus").val();
    var otherAPermitLastUpdated = $('#permitData').find("#otherAPermitLastUpdated").val();
    var otherAInspectionStatus = $('#permitData').find("#otherAInspectionStatus").val();
    var otherAInspectionLastUpdated = $('#permitData').find("#otherAInspectionLastUpdated").val();
    
    var otherBPermitStatus = $('#permitData').find("#otherBPermitStatus").val();
    var otherBPermitLastUpdated = $('#permitData').find("#otherBPermitLastUpdated").val();
    var otherBInspectionStatus = $('#permitData').find("#otherBInspectionStatus").val();
    var otherBInspectionLastUpdated = $('#permitData').find("#otherBInspectionLastUpdated").val();

    var permitNotes = $('#permitData').find('#permitNotes').val();
    var inspectionNotes = $('#permitData').find('#inspectionNotes').val();
    
    console.log(permitNotes);
    console.log(inspectionNotes);
    
    var dates_PERMIT =[
				buildingPermitLastUpdated, buildingInspectionLastUpdated,
				ceilingPermitLastUpdated, ceilingInspectionLastUpdated,
				mechanicalPermitLastUpdated, mechanicalInspectionLastUpdated, 
				electricalPermitLastUpdated, electricalInspectionLastUpdated,
				plumbingPermitLastUpdated, plumbingInspectionLastUpdated,
				gasPermitLastUpdated, gasInspectionLastUpdated,
				sprinklerPermitLastUpdated, sprinklerInspectionLastUpdated,
				fireAlarmPermitLastUpdated, fireAlarmInspectionLastUpdated,
				voltagePermitLastUpdated, voltageInspectionLastUpdated,
				otherAPermitLastUpdated, otherAInspectionLastUpdated,
				otherBPermitLastUpdated, otherBInspectionLastUpdated,
                ];
    
    
    if(isValidInput_PERMIT(dates_PERMIT))
    {
    	console.log("we got valid data now");
    	
    	for(var i = 0; i < dates_PERMIT.length; i++) {
    		if(dates_PERMIT[i]) dates_PERMIT[i] = dateCleaner(dates_PERMIT[i]);
    		if(i == 0) buildingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 1) buildingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 2) ceilingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 3) ceilingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 4) mechanicalPermitLastUpdated = dates_PERMIT[i];
    		if(i == 5) mechanicalInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 6) electricalPermitLastUpdated = dates_PERMIT[i];
    		if(i == 7) electricalInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 8) plumbingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 9) plumbingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 10) gasPermitLastUpdated = dates_PERMIT[i];
    		if(i == 11) gasInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 12) sprinklerPermitLastUpdated = dates_PERMIT[i];
    		if(i == 13) sprinklerInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 14) fireAlarmPermitLastUpdated = dates_PERMIT[i];
    		if(i == 15) fireAlarmInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 16) voltagePermitLastUpdated = dates_PERMIT[i];
    		if(i == 17) voltageInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 18) otherAPermitLastUpdated = dates_PERMIT[i];
    		if(i == 19) otherAInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 20) otherBPermitLastUpdated = dates_PERMIT[i];
    		if(i == 21) otherBInspectionLastUpdated = dates_PERMIT[i];
    	}
		var action = "editPermits";
		var PERMIT_ID = 0;
		if(PROJECT_DATA.permits != null)
			PERMIT_ID = PROJECT_DATA.permits.id;
		else
			PERMIT_ID = 0;
		
		if(!PROJECT_DATA || !PROJECT_DATA.id)
		{
			alert("Server Error! (Project ID)");
			return;
		}
		if(!PERMIT_ID)
		{
			alert("Server Error! (Permit ID)");
			return;
		}
		
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
	//		dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				'projectID':PROJECT_DATA.id,
				
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
				
				'ceilingPermit': ceilingPermitLastUpdated,
				'ceilingPermitStatus': ceilingPermitStatus,
				'ceilingInspectionStatus': ceilingInspectionStatus,
				'ceilingInspectionLastUpdated': ceilingInspectionLastUpdated,
				
				'gasPermit': gasPermitLastUpdated,
				'gasPermitStatus': gasPermitStatus,
				'gasInspectionStatus': gasInspectionStatus,
				'gasInspectionLastUpdated': gasInspectionLastUpdated,
				
				'otherPermitA': otherAPermitLastUpdated,
				'otherAPermitStatus': otherAPermitStatus,
				'otherAInspectionStatus': otherAInspectionStatus,
				'otherAInspectionLastUpdated': otherAInspectionLastUpdated,
				
				'otherBPermit': otherBPermitLastUpdated,
				'otherBPermitStatus': otherBPermitStatus,
				'otherBInspectionStatus': otherBInspectionStatus,
				'otherBInspectionLastUpdated': otherBInspectionLastUpdated,

				'permitNotes': permitNotes,
				'inspectionNotes': inspectionNotes,
			},
			success:function(data){
				console.log(data);
				updateFrontEnd();
				alert('Save Complete!');
				
				
				//getProject_PROJECT_MANAGER(projectID , 1);
				/*
				$('#permitData').find('#saveButton > button').prop('disabled', false);
				$('#permitData').find('.active').removeClass('active');
				$('#permitData').find('#buildingPermit').addClass('active');

				$(".editProject").hide();
				$("#projectManager").show();
				*/
				
				
				goToProjectManager();

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function(data)
			{
				console.log(data);
				updateFrontEnd();
				//getProject_PROJECT_MANAGER(projectID , 1);
				alert('Save Complete!');
				/*
				$('#permitData').find('#saveButton > button').prop('disabled', false);
				$('#permitData').find('.active').removeClass('active');
				$('#permitData').find('#buildingPermit').addClass('active');

				$(".editProject").hide();
				$("#projectManager").show();
				*/
				goToProjectManager();
			
				
			}
		});
    }  
}

/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

/**
 * This function checks to see that all permit dates are in "MM/DD/YYYY" format
 * INNER FUNCTION CALLS: none
 * @returns
 * @params permit dates
 */
function isValidInput_PERMIT(dates_PERMIT)
{	
	//Check if all of the dates are in the correct format
	for (var i = 0; i < dates_PERMIT.length; i++)
	{
		var date = dates_PERMIT[i];
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

//THIS ENDS THE PERMIT DATA JAVASCRIPT

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE PROJECTDATA.JS FILE
*/


//globals
var numChangeOrders = 0;
var PAGETYPE_PROJECT_DATA = "add";
let CHANGE_ORDERS = new Array();
let EDIT_INTENTION;


var stages=["Active", "Proposal", "Budgetary", "Closed", "Canceled", "Billing Closeout", "On Hold", "Closeout"];
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
	$('#projectData').find('.nav-tabs > li').click(function () {
		if($(this).attr('id') !== 'saveProjectLink') {

			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('#' + $(this).attr('data-tab')).addClass('active');
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('#saveButton > button').prop('disabled', true);
		}
		
	});
	
	$('#projectData').find("#initiatedDate").datepicker();
	$('#projectData').find("#surveyDate").datepicker();
	$('#projectData').find("#proposalDueDate").datepicker();
	$('#projectData').find("#budgetaryDueDate").datepicker();
	$('#projectData').find("#budgetarySubmittedDate").datepicker();
	$('#projectData').find("#proposalDate_pd").datepicker();
	$('#projectData').find("#startDate").datepicker();
	$('#projectData').find("#scheduledTurnover").datepicker();
	$('#projectData').find("#actualTurnover").datepicker();
	$('#projectData').find("#permitApp").datepicker();
	$('#projectData').find("#taskCreationZone").find('#initDate').datepicker();
	$('#projectData').find("#taskCreationZone").find('#dueDate').datepicker();
});

/**
*This function retrieves all of the enumerated data (warehouses, statuses, etc) from the database
*Input: none
*Output: none
*INNER FUNCTION CALLS: fillDropdowns_PROJECT_DATA, getProject_PROJECT_DATA
*/
function getProjectEnums_PROJECT_DATA(edit)
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
			'type': true,
			'subcontractors' : true,
		},
		success: function(data)
		{
			console.log(data);
			console.log("about ot fill dropdowns");
			
			fillDropdowns_PROJECT_DATA(data);
			
			//PAGETYPE_PROJECT_DATA = getParameterByName("type");	
			if(EDIT_INTENTION == true) {
				getProject_PROJECT_DATA();
			}
			else {
				$('#projectData').find("#projectHeader").text("New Project");
			}
		}
	});
}


//This function fills multiple dropdowns with data aswell as fills the equipment data
//Input: JSON array of arrays.
//Output: none (fills dropdowns with data)
function fillDropdowns_PROJECT_DATA(data)
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
	generateDropdowns(data["subcontractors"], "subcontractors")
}

/**
*This function puts data into a specific dropdown menu
*INNER FUNCTION CALLS: hasStage()
*@params string representation of JSON array
*Output: none (fills specific dropdown menu with data)
*/
function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	var sent=true;
	

	if (className == "warehouse" || className=="projecteq" || className == "subcontractors")
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
			if(json[i].state && (json[i].state == "UNKNOWN" || json[i].state == "Unknown")) 
			{
				option.innerHTML = json[i].city.name + ", " + json[i].region;
			}
			else
			{
				option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
			}
		}
		else if(className == "subcontractors") {
			option.innerHTML = json[i].name;
			option.value = json[i].name;
		}
		else
		{
			option.innerHTML=json[i].name;
			
		}

		if(sent)
		{
			if(className != "subcontractors") option.setAttribute("value", json[i].id);	
			d.appendChild(option);
		}

	}

	if(className == "closeoutstatus")
	{				
		for(var i = 0; i < closeoutstatus_dropdowns.length; i++)
		{
			var copy = d.cloneNode(true);
			$('#projectData').find("#" +closeoutstatus_dropdowns[i]).find('option').remove();
			$('#projectData').find("#" +closeoutstatus_dropdowns[i]).append(copy);	
		}
	}
	else if(className == "subcontractors") 
	{
		$('#taskCreationZone').find("#subcontractorsDropdown").find('option').remove();
		$('#taskCreationZone').find("#subcontractorsDropdown").append(d);
	}
	else
		{
		$('#projectData').find("#" +className).find('option').remove();
		$('#projectData').find("#"+className).append(d);
		}
}

/**
 * This function saves a project to the database
 * INNER FUNCTION CALLS: updateFrontEnd()
 * @returns
 */
function saveProject_PROJECT_DATA() {
	var mcsNumber = $('#projectData').find('#mcsNumber').val();
	
	// Required Information
	var warehouse = $('#projectData').find('#warehouse').val();
	var projectClass = $('#projectData').find('#class').val();
	var item = $('#projectData').find('#project').val();
	var manager = $('#projectData').find('#manager').val();
	var supervisor = $('#projectData').find('#supervisor').val();
	var status = $('#projectData').find('#status').val();
	var stage = $('#projectData').find("#stage").val();
	var pType = $('#projectData').find('#pType').val();
	var scope = $('#projectData').find("#scope").val();
	

	// scheduling
	var initiated = $('#projectData').find("#initiatedDate").val();
	var survey = $('#projectData').find("#surveyDate").val();
	var budgetaryDue = $('#projectData').find("#budgetaryDueDate").val();
	var budgetarySubmitted = $('#projectData').find("#budgetarySubmittedDate").val();
	var costco = $('#projectData').find("#proposalDueDate").val();
	var proposalDate = $('#projectData').find("#proposalDate_pd").val();
	var startDate = $('#projectData').find("#startDate").val();
	var scheduledTurnover = $('#projectData').find("#scheduledTurnover").val();
	var actualTurnover = $('#projectData').find("#actualTurnover").val();
	var permitApp = $('#projectData').find("#permitApp").val();

	// financial
	var shouldInvoice = $('#projectData').find("#shouldInvoice").val();
	var actualInvoice = $('#projectData').find("#actualInvoice").val();
	var notes = $('#projectData').find("#notes").val();
	var refrigNotes = $('#projectData').find("#zUpdates").val();
	var cost = $('#projectData').find("#projectCost").val();
	if(cost) {cost = cleanNumericValueForSaving($('#projectData').find("#projectCost")[0].value); cost = parseFloat(cost);}
	var customerNumber = $('#projectData').find("#custNum").val();
	
	var required = [warehouse, projectClass, item, manager, supervisor, status, stage, pType, scope];
	var dates_PROJECT_DATA = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover, permitApp];
	
	
	if(isValidInput_PROJECT_DATA(required, dates_PROJECT_DATA)) {
		for(var i = 0; i < dates_PROJECT_DATA.length; i++) {
			if(dates_PROJECT_DATA[i]) dates_PROJECT_DATA[i] = dateCleaner(dates_PROJECT_DATA[i]);
			if(i == 0) initiated = dates_PROJECT_DATA[i];
			if(i == 1) survey = dates_PROJECT_DATA[i];
			if(i == 2) costco = dates_PROJECT_DATA[i];
			if(i == 3) proposalDate = dates_PROJECT_DATA[i];
			if(i == 4) startDate = dates_PROJECT_DATA[i];
			if(i == 5) scheduledTurnover = dates_PROJECT_DATA[i];
			if(i == 6) actualTurnover = dates_PROJECT_DATA[i];
			if(i == 7) permitApp = dates_PROJECT_DATA[i];
		}
	//	$('#projectData').find('.info-tab').removeClass('active');
	//	$('#projectData').find('#saveButton').addClass('active');
		
	//	$('#projectData').find('.nav-tabs > li.active').removeClass('active');
	//	$('#projectData').find('#saveProjectLink').addClass('active');
		
		let updateData = {
				mcsNum : mcsNumber,
				warehouse_id : warehouse,
				item_id : item,
				manager : $('#projectData').find('#manager').find(":selected").text(),
				stage_id : stage
		};
		

		var action = 'addNewProject';
		if (EDIT_INTENTION == true) {
			action = 'editExistingProject';
		}
		
		if(!projectID)
		{
			alert("Server Error! (Project ID)");
			return;
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
				'budgetaryDue' : budgetaryDue , 
				'budgetarySubmitted' : budgetarySubmitted,
			}, complete: function (data) {
				console.log(data);
				projectID = data.responseJSON;
				
				
				if(!PAGE_ENTRY){
				updateProjectDisplay(updateData);
				updateFrontEnd();
				}
				//updateProjectManager();
				
				alert('Save Complete!');				
				$('#saveButton > button').prop('disabled', false);
				
				/*
				
				$('#projectManager').find('.info-tab').removeClass('active');
				$('#projectManager').find('.nav-tabs > li.active').removeClass('active');
				$('#projectManager').find('#projectInformation').addClass('active');
				$('#projectManager').find('#projectInformationTabLink').addClass('active');
				$('#projectManager').find('#projectInformationTabLink').addClass('active');
				
				$(".editProject").hide();
				$("#projectManager").show();
				*/
				goToProjectManager();
				
				
				
			}
			
		});
	}
}

let updatedProjectWarehouse;
let updatedProjectItem;
let updatedManager;
let updatedMCSnumber;
let updatedStage = {id: "", name: ""};

/**
 * This function updates the front end project display
 * @param data containing either warehouse, mcsNumber, item, and manager fields
 * INNER FUNCTION CALLS: filterProjects()
 * @returns
 */
function updateProjectDisplay(data) {
	console.log("THE UPDATE DATA = ", data);
	
	convertStage(data);
	
	updatedManager = {
			name : data.manager,
			id : matchUsernameToPerson(data.manager)
	};
	
	updatedMCSnumber = data.mcsNum;
	
	convertItem(data);
	
}

function convertStage(data) {
	if(!data) return;
	
	let stageId = data.stage_id;
	updatedStage.id = stageId;
	
	switch(stageId) {
		case "1":
			updatedStage.name = "Proposal";
			break;
		case "2":
			updatedStage.name = "Active";
			break;
		case "4":
			updatedStage.name = "Closed";
			break;
		case "8":
			updatedStage.name = "Budgetary";
			break;
		case "9":
			updatedStage.name = "On Hold";
			break;
		case "15":
			updatedStage.name = "Canceled";
			break;
		case "16":
			updatedStage.name = "Billing Closeout";
			break;
		case "17":
			updatedStage.name = "Closeout";
			break;

	}
}

/**
 * This function matches the user's first name to the appropriate person ID
 * INNER FUNCTION CALLS: removeParam()
 */
function matchUsernameToPerson(userFirstName){
	switch(userFirstName) {
	case 'Bart': 
		return '14';
		break;
	case "Alex":
		return '3';
		break;
	case "Andy":
		return '2';
		break;
	case "Craig":
		return '12';
		break;
	case "Dave":
		return '7';
		break;
	case "David":
		return '1';
		break;
	case "Jim": 
		return '8';
		break;
	case "Joe":
		return '5';
		break;
	case "Adrienne":
		return '17';
		break;
	case "Tony":
		return '4';
		break;
	case "Marvin":
		return '18';
		break;
	}

}

function convertItem(data){
	let warehouse_data = data;
	console.log("ITEMMMM ID = ", data.item_id);
	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: 'json',
		data: 
		{
			'domain': 'project',
			'action': 'getItem',
			'id': data.item_id
		},
		success:function(data){
			console.log("ITEM DATA = ", data);
			updatedProjectItem = data;
			convertWarehouse(warehouse_data.warehouse_id);

		},
		error: function(data) {
			console.log("AN ERROR!",  data);
		}
	});
}

function convertWarehouse(id){
	
	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: 'json',
		data: 
		{
			'domain': 'project',
			'action': 'getWarehouse',
			'id': id,
		},
		success:function(data){
			console.log("WAREHOUSE DATA = ", data);
			updatedProjectWarehouse = data;
			for(var i = 0; i < DISPLAYABLE_PROJECTS.length; i++){
				if(!DISPLAYABLE_PROJECTS[i]) continue;
				if(projectID == DISPLAYABLE_PROJECTS[i].id){
					DISPLAYABLE_PROJECTS[i].warehouse = updatedProjectWarehouse;
					DISPLAYABLE_PROJECTS[i].projectItem = updatedProjectItem;
					DISPLAYABLE_PROJECTS[i].McsNumber = updatedMCSnumber;
					DISPLAYABLE_PROJECTS[i].projectManagers.id = updatedManager.id;
					DISPLAYABLE_PROJECTS[i].projectManagers.name = updatedManager.name;
					DISPLAYABLE_PROJECTS[i].stage.id = updatedStage.id;
					DISPLAYABLE_PROJECTS[i].stage.name = updatedStage.name;
					//console.log("THE UPDATE = ", DISPLAYABLE_PROJECTS[i]);
				}
			}
			
			for(var i = 0; i < RETRIEVED_PROJECTS.length; i++){
				if(!RETRIEVED_PROJECTS[i]) continue;
				if(projectID == RETRIEVED_PROJECTS[i].id){
					RETRIEVED_PROJECTS[i].stage.id = updatedStage.id;
					RETRIEVED_PROJECTS[i].stage.name = updatedStage.name;
					//console.log("THE UPDATE = ", DISPLAYABLE_PROJECTS[i]);
				}
			}
			
			getProject_PROJECT_MANAGER(projectID);
			filterProjects();
		}
	});
}





/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

/**
* This function validates the nunmerous fields of this page, separated by categories
* Input: array of str, array of str, array of ints, str, str, int
* output: true if all of the fields are valid. False otherwise
* TODO: Numbers, notes, 
*/
function isValidInput_PROJECT_DATA(requiredFields, dates)
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

/**
* This function retrieves project information from a project, and prepares it to be edited.
* INNER FUNCTION CALLS: setProjectHeader(), fillForm_PROJECT_DATA(), getTasks()
* Input: none
* Output: none
*/
function getProject_PROJECT_DATA()
{
	console.log("IN PROJ DATA");
	
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
				setProjectHeader(data, currentDivLocation);
				fillForm_PROJECT_DATA(data);
				//getTasks();
			}
		});
	}
}

/**
* This function fills out the page with project data. This is so the user can edit the project information
* Input: JSON object representing a project
* Output: none (fills out data on the page)
*/
function fillForm_PROJECT_DATA(data)
{
	console.log("PROJECT DATA" , data);
	var json = (data);	
	
	$('#projectData').find("#mcsNumber").val(json.McsNumber);

	console.log("WARE ID : " , json.warehouse.id);
    $('#projectData').find("#warehouse").val(json.warehouse.id);
	$('#projectData').find("#class").val(json.projectClass.id);
	$('#projectData').find("#project").val(json.projectItem.id);
	$('#projectData').find("#manager").val(json.projectManagers.id);
	$('#projectData').find("#supervisor").val(json.supervisors[0].id);
	$('#projectData').find("#stage").val(json.stage.id);
	$('#projectData').find("#status").val(json.status.id);
	$('#projectData').find("#pType").val(json.projectType.id);
    formatRelativeTextAreas(json.scope , "scope", "projectData");
	$('#projectData').find("#scope").val(json.scope);

	
	$('#projectData').find("#initiatedDate").val(json.projectInitiatedDate);;
	$('#projectData').find("#surveyDate").val(json.siteSurvey);
	$('#projectData').find("#budgetaryDueDate").val(json.budgetaryDue);
	$('#projectData').find("#budgetarySubmittedDate").val(json.budgetarySubmitted);
	$('#projectData').find("#proposalDueDate").val(json.proposalDue);
	$('#projectData').find("#proposalDate_pd").val(json.proposalSubmitted);
	$('#projectData').find("#startDate").val(json.scheduledStartDate);
	$('#projectData').find("#scheduledTurnover").val(json.scheduledTurnover);
	$('#projectData').find("#actualTurnover").val(json.actualTurnover);
	$('#projectData').find("#permitApp").val(json.permitApp);

	$('#projectData').find("#shouldInvoice").val(json.shouldInvoice);
	$('#projectData').find("#actualInvoice").val(json.invoiced);
    formatRelativeTextAreas(json.projectNotes , "notes", "projectData");
	$('#projectData').find("#notes").val(json.projectNotes);
    formatRelativeTextAreas(json.zachUpdates , "zUpdates", "projectData");
	$('#projectData').find("#zUpdates").val(json.zachUpdates);
	if(json.cost) json.cost = cleanNumericValueForDisplaying(json.cost);
	$('#projectData').find("#projectCost").val(json.cost);
	$('#projectData').find("#custNum").val(json.customerNumber);
}




/**
 * This function sorts cities or other objects my name alphabetically
 * INNER FUNCTION CALLS: none
 * @returns
 */
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


/**
 * This function checks to see if a project has a certain stage
 * INNER FUNCTION CALLS: none
 * @returns true if it has stage / false otherwise
 */
function hasStage(stageList, stage)
{
	for(var i=0; i<stageList.length; i++)
	{
		if(stageList[i]==stage)
			return true;
		
	}

	return false;
}

//THIS ENDS THE JAVASCRIPT FOR PROJECT DATA

/**
 * THE FOLLOWING JAVASCRIPT CORRESPONDS TO PROJECTMANAGER.js
 */


let selectedChangeOrder = null;
let selectedEquipment = null;


//Does the tab work to set the proper active one
$(document).ready(function () {
	$('#projectManager').find('.nav-tabs > li').click(function () {
		$('#projectManager').find('.info-tab').removeClass('active');
		$('#projectManager').find('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});	
	
	$('.project-info-list-item').click(function() {
		editProjectInfo(this.id);
	});
	
	$('.closeout-info-list-item').click(function() {
		editCloseout(this.id);
	});

});

function createTask() {

	TASK_ACTION = "createTask";
	clearTaskForm();
	let dateObj = new Date();
	let month = dateObj.getUTCMonth() + 1;
	let day = dateObj.getUTCDate();
	let year = dateObj.getUTCFullYear();
	
	let todaysDate = month + "/" + day + "/" + year;
	
	$('#taskCreationZone').find('#initDate').val(todaysDate);
	
	document.getElementById('tasksInformation').style.width = "55%";
	$('#taskDisplay').hide();
	$('#taskCreationZone').show();
	
}

function viewTasks() {
	
	let updateMessage = "These changes will not be saved, are you sure you want to leave the screen?";
	let createMessage = "This task will not be added, are you sure you want to leave this screen?";
	let displayedMessage;
	
	if(TASK_ACTION == "createTask")
		displayedMessage = createMessage;
	else 
		displayedMessage = updateMessage;
	
	if(confirm(displayedMessage))
	{
		document.getElementById('tasksInformation').style.width = "100%";
		$('#taskCreationZone').hide();
		$('#taskDisplay').show();
	}

}

/**
 * This function retrieves a specific project from the database
 * INNER FUNCTION CALLS: setProjectHeader(), fillTabs_PROJECT_MANAGER(), getTasks()
 * @params project_id
 * @returns
 */
function getProject_PROJECT_MANAGER(project_id , stopServerCalls) {
	console.log("ID = ", project_id);
    projectID = project_id;
	if (projectID !== null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'get',
				'id': projectID
			}, success: function (data) {
				//getTheProjects();
				
				PROJECT_DATA = data;
				setProjectHeader(data, currentDivLocation);

				fillTabs_PROJECT_MANAGER(data, currentDivLocation);
				
				
				getTasks(stopServerCalls);
			}, error: function (data) {
				alert('Server Error!');
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = FINDPROJECT;
		}
	}
}

/**
 * This function calls all the other functions that help fill out projectInfo
 * INNER FUNCTION CALLS: fillProjectInformation(), fillChangeOrders(), fillPermitsAndInspections(),
 * 						 fillEquipment(), fillCloseout()
 * @returns
 */
function fillTabs_PROJECT_MANAGER (data) {
	fillProjectInformation(data);
	fillChangeOrders(data);
	fillPermitsAndInspections(data);
	fillEquipment(data);
	fillCloseout(data);
}

/**
 * This function makes the projectData div visible and the projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_PROJECT_DATA()
 * @returns
 */
function editProjectInfo (source_id) {
	if(source_id) prepareProjectData(source_id);
	document.getElementById("projectManager").style.display = 'none';
	getProjectEnums_PROJECT_DATA(true);
	currentDivLocation = "projectData";
	document.getElementById("projectData").style.display = 'inline';
	//window.location.href = PROJECTINFO + '?type=edit&id=' + projectID;
}

function prepareCloseout(source_id){
	
	if(source_id && !(isNaN(source_id))) projectID = source_id;
	setCurrentDivLocation("scorecard");
	setProjectHeader(PROJECT_DATA, currentDivLocation);

	
	$('#scorecard').find(".nav-tabs").find("[class~=active]").removeClass("active");
	$('#scorecard').find("[class~=active]").removeClass("active");

	if(source_id == "closeout-documents-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=closeoutDocuments]").addClass("active");
		$('#closeoutData').find("#closeoutDocuments").addClass("active");

	}
	
	else if(source_id == "final-inspection-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=finalInspections]").addClass("active");
		$('#closeoutData').find("#finalInspections").addClass("active");

	}
	else if(source_id == "warranty-letters-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=warrantyLetters]").addClass("active");
		$('#closeoutData').find("#warrantyLetters").addClass("active");

	}
	else if(source_id == "final-liens-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=finalLiens]").addClass("active");
		$('#closeoutData').find("#finalLiens").addClass("active");

	}
	else if(source_id == "aia-mg2-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=otherItems]").addClass("active");
		$('#closeoutData').find("#otherItems").addClass("active");

	}
	else if(source_id == "closeout-summary-item")
	{
		
		$('#closeoutData').find(".nav-tabs").find("[data-tab=closeoutSummary]").addClass("active");
		$('#closeoutData').find("#closeoutSummary").addClass("active");
		

	}	
	else console.log("Bad ID in prepareProjectData");
}

function prepareProjectData(source_id){
	
	if(source_id && !(isNaN(source_id))) projectID = source_id;
	setCurrentDivLocation('projectData');
	setProjectHeader(PROJECT_DATA, currentDivLocation);
	$('#projectData').find(".nav-tabs").find("[class~=active]").removeClass("active");
	$('#projectData').find("[class~=active]").removeClass("active");

	document.getElementById('tasksInformation').style.width = "100%";
	$('#taskCreationZone').hide();
	$('#taskDisplay').show();
	
	
	if(source_id == "general-info-item")
	{
		$('#projectData').find(".nav-tabs").find("[data-tab=generalInformation]").addClass("active");
		$('#projectData').find("#generalInformation").addClass("active");

	}
	else if(source_id == "scheduling-item")
	{
		$('#projectData').find(".nav-tabs").find("[data-tab=schedulingInformation]").addClass("active");
		$('#projectData').find("#schedulingInformation").addClass("active");

	}
	else if(source_id == "tasks-item")
	{
		//getUserData();
		document.getElementById('tasksInformation').style.width = "100%";
		$('#taskDisplay').show();
		$('#taskCreationZone').hide();
		$('#projectData').find(".nav-tabs").find("[data-tab=tasksInformation]").addClass("active");
		$('#projectData').find("#tasksInformation").addClass("active");
		

	}
	else if(source_id == "financial-item")
	{
		$('#projectData').find(".nav-tabs").find("[data-tab=financialInformation]").addClass("active");
		$('#projectData').find("#financialInformation").addClass("active");

	}
	else console.log("Bad ID in prepareProjectData");
}

function prepareCloseout(source_id){
	
	if(source_id && !(isNaN(source_id))) projectID = source_id;
	setCurrentDivLocation("closeoutData");
	setProjectHeader(PROJECT_DATA, currentDivLocation);

	
	$('#closeoutData').find(".nav-tabs").find("[class~=active]").removeClass("active");
	$('#closeoutData').find("[class~=active]").removeClass("active");

	if(source_id == "closeout-documents-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=closeoutDocuments]").addClass("active");
		$('#closeoutData').find("#closeoutDocuments").addClass("active");

	}

	else if(source_id == "final-inspection-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=finalInspections]").addClass("active");
		$('#closeoutData').find("#finalInspections").addClass("active");

	}
	else if(source_id == "warranty-letters-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=warrantyLetters]").addClass("active");
		$('#closeoutData').find("#warrantyLetters").addClass("active");

	}
	else if(source_id == "final-liens-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=finalLiens]").addClass("active");
		$('#closeoutData').find("#finalLiens").addClass("active");

	}
	else if(source_id == "aia-mg2-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=otherItems]").addClass("active");
		$('#closeoutData').find("#otherItems").addClass("active");

	}
	else if(source_id == "closeout-summary-item")
	{
		
		$('#closeoutData').find(".nav-tabs").find("[data-tab=closeoutSummary]").addClass("active");
		$('#closeoutData').find("#closeoutSummary").addClass("active");
		

	}	
	else console.log("Bad ID in prepareProjectData");
}

/**
 * This function makes the permitData div visible and projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_PERMIT()
 * @returns
 */
function editPermitsAndInspections () {
	document.getElementById("projectManager").style.display = 'none';
	EDIT_INTENTION = true;
	getProjectEnums_PERMIT(true);
	
	
	currentDivLocation = "permitData";
	document.getElementById("permitData").style.display = 'inline';
	$('#permitData').find('#buildingPermit').addClass('active');
	$('#permitData').find('#buildingPermits').addClass('active');
	
	//window.location.href = PROJECT_PERMITS_AND_INSPECTIONS + '?id=' + projectID;
}


/**
 * This function makes the closeoutData div visible and projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_CLOSEOUT()
 * @returns
 */
function editCloseout (source_id) {
	if(source_id) prepareCloseout(source_id);
	document.getElementById("projectManager").style.display = 'none';
	EDIT_INTENTION = true;
	getProjectEnums_CLOSEOUT(true);
	currentDivLocation = "closeoutData";
	document.getElementById("closeoutData").style.display = 'inline';

	//window.location.href = PROJECT_CLOSEOUT + '?id=' + projectID;
}

function addChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=add&id=' + projectID;
}

function addEquipment () {
	//window.location.href = PROJECT_EQUIPMENT + '?type=add&id=' + projectID;
	
	PAGETYPE_EQUIP = "add";	
	projectID_EQUIP = projectID;
	setCurrentDivLocation("equipmentDiv");
	
	clearEquipmentFormValues();
	
	$('.editProject').hide();

	$('#equipmentForm').addClass('active');
	$('#equipmentDiv').find(".nav-tabs").find("[data-tab=saveButton]").removeClass("active");
	$('#equipmentDiv').find(".nav-tabs").find("[data-tab=equipmentForm]").addClass("active");
	$('.projectNavigator-projectManager').show();
	$('.projectEdit').show();
	$('.projectNavigator').show();
	$('#equipmentDiv').show();
	$('#deleteEquipment').hide();
	
	getDropdownInfo_EQUIP();

}

/**
 * This function fills out all of the project information
 * INNER FUNCTION CALLS: none
 * @returns
 * @params a JSON with all necessary project data
 */
function fillProjectInformation (data) {
	
	$('#projectManager').find('#mcsNumber').text(data.McsNumber);
	$('#projectManager').find('#projectItem').text(data.projectItem.name);
	$('#projectManager').find('#projectStatus').text(data.status.name);
	$('#projectManager').find('#projectType').text(data.projectType.name);
	$('#projectManager').find('#projectStage').text(data.stage.name);
	$('#projectManager').find('#projectManager').text(data.projectManagers.name);
	$('#projectManager').find('#projectSupervisor').text(data.supervisors[0].name);
	
} // fillProjectInformation

/**
 * This function fills out the changeOrder table
 * INNER FUNCTION CALLS: none
 * @returns
 */
function fillChangeOrders (data) {
	clearChangeOrderTable();
	console.log("CALLED FILL CO" , data);
	if(data) CHANGE_ORDERS = data.changeOrders;
	let changeOrders = CHANGE_ORDERS;
	
	changeOrders.sort(function(a, b){
		if(!a.id) return -1;
		if(!b.id) return 1;
		
		if(a.id < b.id) return -1;
		else if(a.id > b.id) return 1;
		else return 0;
		
	});
	console.log("CO's = ", changeOrders);
		
	
	for (var i = 0; i < changeOrders.length; i++) {
		let changeOrder = changeOrders[i];
		
		if($('#changeOrderSelector').val() == "preparing" && changeOrders[i].status != "1") continue;
		else if($('#changeOrderSelector').val() == "submitted" && changeOrders[i].status != "2") continue;
		else if($('#changeOrderSelector').val() == "approved" && changeOrders[i].status != "3") continue;
		else if($('#changeOrderSelector').val() == "rejected" && changeOrders[i].status != "4") continue;
		else if($('#changeOrderSelector').val() == "complete" && changeOrders[i].status != "5") continue;
		else if($('#changeOrderSelector').val() == "review" && changeOrders[i].status != "6") continue;
		
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", changeOrder.id);
		tableRow.onclick = function() {toggleChangeOrder(this)};

		//var changeType = document.createElement('td');
		//changeType.appendChild(document.createTextNode(parseChangeOrderType(changeOrder.type)));
		
		var coNumber = document.createElement('td');
		coNumber.className = 'coNumber';
		coNumber.width = "5%";
		coNumber.align = 'center';
		coNumber.appendChild(document.createTextNode(changeOrder.mcsCO));
		
		var title = document.createElement('td');
		title.width = "10%";
		title.align = 'center';
		if(changeOrder.title) title.appendChild(document.createTextNode(changeOrder.title));
		else  title.appendChild(document.createTextNode("---"));
		
		var briefDescription = document.createElement('td');
		briefDescription.width = "20%";
		briefDescription.align = 'center';
		briefDescription.appendChild(document.createTextNode(changeOrder.briefDescription))
		
		var status = document.createElement('td');
		status.width = "9%";
		status.align = 'center';
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));
		
		var subNames = document.createElement('td');
		subNames.width = "12%";
		subNames.align = 'center';
		subNames.appendChild(document.createTextNode(changeOrder.subNames));
		
		var type = document.createElement('td');
		type.width = "10%";
		type.align = 'center';
		type.appendChild(document.createTextNode(convertChangeOrderType(changeOrder.type)));
		
		var submittedDate = document.createElement('td');
		submittedDate.width = "8%";
		submittedDate.align = 'center';
		if(changeOrder.submittedDate)
			submittedDate.appendChild(document.createTextNode(changeOrder.submittedDate));
		else submittedDate.appendChild(document.createTextNode("---"));
		
		var cost = document.createElement('td');
		cost.width = "5%";
		cost.align = 'center';
		if(changeOrder.cost)
			cost.appendChild(document.createTextNode("$" + cleanNumericValueForDisplaying(changeOrder.cost)));
		else 
			cost.appendChild(document.createTextNode("---"));

		
		var sell = document.createElement('td');
		sell.width = "5%";
		sell.align = 'center';
		if(changeOrder.sell)
			sell.appendChild(document.createTextNode("$" + cleanNumericValueForDisplaying(changeOrder.sell)));
		else 
			sell.appendChild(document.createTextNode("---"));		
		
		var notes = document.createElement('td');
		notes.align = 'center';
		notes.appendChild(document.createTextNode(changeOrder.notes));
		
		//var approvedDate = document.createElement('td');
		//if (changeOrder.approvedDate === undefined)
		//	approvedDate.appendChild(document.createTextNode("---"))
		//else
		//	approvedDate.appendChild(document.createTextNode(changeOrder.approvedDate));
		
		tableRow.appendChild(coNumber);
		tableRow.appendChild(title);
		tableRow.appendChild(briefDescription);
		tableRow.appendChild(status);
		tableRow.appendChild(subNames);
		tableRow.appendChild(type);
		tableRow.appendChild(submittedDate);
		tableRow.appendChild(cost);
		tableRow.appendChild(sell);
		tableRow.appendChild(notes);
		tableRow.ondblclick = function() {
			goToChangeOrder(1);
		};
		$('#projectManager').find("#changeOrderTable").append(tableRow);
	}
}

function convertChangeOrderType(type , co) {
	if(!type) return "---";
	console.log("CO_TYPES = " , CHANGE_ORDER_TYPES , co);
	for(var i = 0; i < CHANGE_ORDER_TYPES.length; i++) {
		//console.log( " TYPE = " , type , CHANGE_ORDER_TYPES[i]);
		if(CHANGE_ORDER_TYPES[i].id == type)
			return CHANGE_ORDER_TYPES[i].name;
	}
	
	return "---";
}

function convertRequired(req)
{
	if(req == "default" || req == undefined || req == null)
		return "";
	else if(req == "2")
		return "No";
	else if(req == "1")
		return "Yes";
	else if(req == "0")
		return "TBD";
	else 
		return;
}

/**
 * This function fills out the information on the page for the permits and inspections
 * INNER FUNCTION CALLS: none
 * @returns
 */
function fillPermitsAndInspections (data) {
	
	let tabData = data.permits;
	console.log("TAB DATA" , tabData);
	
	// permits 
	$('#projectManager').find('#buildingPermitRequired').text(tabData.buildingPermitRequired);
	$('#projectManager').find('#buildingPermitDate').text(tabData.building);
	$('#projectManager').find('#buildingPermit').text(tabData.buildingPermitStatus);
	
	$('#projectManager').find('#ceilingPermitRequired').text(tabData.ceilingPermitRequired);
	$('#projectManager').find('#ceilingPermitDate').text(tabData.ceiling);
	$('#projectManager').find('#ceilingPermit').text(tabData.ceilingPermitStatus);
	
	$('#projectManager').find('#mechanicalPermitRequired').text(tabData.mechanicalPermitRequired);
	$('#projectManager').find('#mechanicalPermitDate').text(tabData.mechanical);
	$('#projectManager').find('#mechanicalPermit').text(tabData.mechanicalPermitStatus);
	
	$('#projectManager').find('#electricalPermitRequired').text(tabData.electricalPermitRequired);
	$('#projectManager').find('#electricalPermitDate').text(tabData.electrical);
	$('#projectManager').find('#electricalPermit').text(tabData.electricalPermitStatus);
	
	$('#projectManager').find('#plumbingPermitRequired').text(tabData.plumbingPermitRequired);
	$('#projectManager').find('#plumbingPermitDate').text(tabData.plumbing);
	$('#projectManager').find('#plumbingPermit').text(tabData.plumbingPermitStatus);
	
	$('#projectManager').find('#gasPermitRequired').text(tabData.gasPermitRequired);
	$('#projectManager').find('#gasPermitDate').text(tabData.gas);
	$('#projectManager').find('#gasPermit').text(tabData.gasPermitStatus);
	
	$('#projectManager').find('#sprinklerPermitRequired').text(tabData.sprinklerPermitRequired);
	$('#projectManager').find('#sprinklerPermitDate').text(tabData.fire_sprinkler);
	$('#projectManager').find('#sprinklerPermit').text(tabData.sprinklerPermitStatus);
	
	$('#projectManager').find('#fireAlarmPermitRequired').text(tabData.fireAlarmPermitRequired);
	$('#projectManager').find('#fireAlarmPermitDate').text(tabData.fire_alarm);
	$('#projectManager').find('#fireAlarmPermit').text(tabData.fireAlarmPermitStatus);
	
	$('#projectManager').find('#lowVoltagePermitRequired').text(tabData.voltagePermitRequired);
	$('#projectManager').find('#lowVoltagePermitDate').text(tabData.low_voltage);
	$('#projectManager').find('#lowVoltagePermit').text(tabData.voltagePermitStatus);
	
	// inspections
	$('#projectManager').find('#buildingInspectionRequired').text(tabData.buildingInspectionRequired);
	$('#projectManager').find('#buildingInspectionDate').text(tabData.buildingInspectionLastUpdated);
	$('#projectManager').find('#buildingInspection').text(tabData.buildingInspectionStatus);
	
	$('#projectManager').find('#ceilingInspectionRequired').text(tabData.ceilingInspectionRequired);
	$('#projectManager').find('#ceilingInspectionDate').text(tabData.ceilingInspectionLastUpdated);
	$('#projectManager').find('#ceilingInspection').text(tabData.ceilingInspectionStatus);
	
	$('#projectManager').find('#mechanicalInspectionRequired').text(tabData.mechanicalInspectionRequired);
	$('#projectManager').find('#mechanicalInspectionDate').text(tabData.mechanicalInspectionLastUpdated);
	$('#projectManager').find('#mechanicalInspection').text(tabData.mechanicalInspectionStatus);
	
	$('#projectManager').find('#electricalInspectionRequired').text(tabData.electricalInspectionRequired);
	$('#projectManager').find('#electricalInspectionDate').text(tabData.electricalInspectionLastUpdated);
	$('#projectManager').find('#electricalInspection').text(tabData.electricalInspectionStatus);
	
	$('#projectManager').find('#plumbingInspectionRequired').text(tabData.plumbingInspectionRequired);
	$('#projectManager').find('#plumbingInspectionDate').text(tabData.plumbingInspectionLastUpdated);
	$('#projectManager').find('#plumbingInspection').text(tabData.plumbingInspectionStatus);
	
	$('#projectManager').find('#gasInspectionRequired').text(tabData.gasInspectionRequired);
	$('#projectManager').find('#gasInspectionDate').text(tabData.gasInspectionLastUpdated);
	$('#projectManager').find('#gasInspection').text(tabData.gasInspectionStatus);
	
	$('#projectManager').find('#sprinklerInspectionRequired').text(tabData.sprinklerInspectionRequired);
	$('#projectManager').find('#sprinklerInspectionDate').text(tabData.sprinklerInspectionLastUpdated);
	$('#projectManager').find('#sprinklerInspection').text(tabData.sprinklerInspectionStatus);
	
	$('#projectManager').find('#fireAlarmInspectionRequired').text(tabData.fireAlarmInspectionRequired);
	$('#projectManager').find('#fireAlarmInspectionDate').text(tabData.fireAlarmInspectionLastUpdated);
	$('#projectManager').find('#fireAlarmInspection').text(tabData.fireAlarmInspectionStatus);
	
	$('#projectManager').find('#lowVoltageInspectionRequired').text(tabData.fireAlarmInspectionRequired);
	$('#projectManager').find('#lowVoltageInspectionDate').text(tabData.voltageInspectionLastUpdated);
	$('#projectManager').find('#lowVoltageInspection').text(tabData.voltageInspectionStatus);
	
}

function clearPermitsAndInspectionsOverview () {
	
	$('.permitTableData').each(function(i , obj){
		obj.innerHTML = "";
	});
	
	$('.inspectionTableData').each(function(i , obj){
		obj.innerHTML = "";
	});
}


/**
 * This function fills out the equipment info
 * WARNING: Unsure if the function really works, never knew how to properly test its functionality
 * @param data with equipment info
 * @returns
 */
function fillEquipment (data) {
	$('#equipmentTable').find('tbody').find('tr').remove();
	
	let equipmentList = data.projEquipment;
	console.log("FILLING EQUIPMENT ",equipmentList )

	if(equipmentList) {
		 equipmentList.sort(function(a,b){
			 	if(a.equipmentName && b.equipmentName) {
			 		if(a.equipmentName < b.equipmentName) return -1;
			 		else if(a.equipmentName > b.equipmentName) return 1;
			 		else return 0;
			 	} else if(!a.equipmentName) {
			 		return -1;
			 	} else {
			 		return 1;
			 	}
		    	return 0;
		    });
	}
	for (var i = 0; i < equipmentList.length; i++) {
		var equipment = equipmentList[i];
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", equipment.id);
		tableRow.onclick = function() {toggleEquipment(this)};
		tableRow.ondblclick = function () {editSelectedEquipment(this.value)};

		
		
		var equipmentName = document.createElement('td');
		equipmentName.width = "120px";
		equipmentName.align = 'center';
		equipmentName.appendChild(document.createTextNode(equipment.equipmentName));
		
		var equipmentDescription = document.createElement('td');
		equipmentDescription.width = "175px";
		equipmentDescription.align = 'center';
		
		var descriptionText = equipment.description;
		if(descriptionText == undefined || descriptionText == "undefined")
			descriptionText = "";
		
		equipmentDescription.appendChild(document.createTextNode(descriptionText));
		
		var deliveryStatus = document.createElement('td');
		deliveryStatus.width = "80px";
		deliveryStatus.align = 'center';
		var deliveryStatusText = "";
		if(equipment.eqStatus)
			deliveryStatusText = equipment.eqStatus.name;
		
		if(deliveryStatusText == undefined || deliveryStatusText == "undefined" || deliveryStatusText == "default")
			deliveryStatusText = "";
		deliveryStatus.appendChild(document.createTextNode(deliveryStatusText));
		
		
		var supplier = document.createElement('td');
		supplier.width = "80px";
		supplier.align = 'center';
		var supplierText = "";
		if(equipment.eqSupplier)
			supplierText = equipment.eqSupplier.name;
		supplier.appendChild(document.createTextNode(supplierText));
		
		
		var orderedDate = document.createElement('td');
		orderedDate.width = "70px";
		orderedDate.align = 'center';
		if (equipment.orderedDate === undefined)
			orderedDate.appendChild(document.createTextNode("---"));
		else
			orderedDate.appendChild(document.createTextNode(equipment.orderedDate));
		
		var estDeliveryDate = document.createElement('td');
		estDeliveryDate.width = "70px";
		estDeliveryDate.align = 'center';
		if (equipment.estDeliveryDate === undefined)
			estDeliveryDate.appendChild(document.createTextNode("---"));
		else
			estDeliveryDate.appendChild(document.createTextNode(equipment.estDeliveryDate));
		
		var deliveryDate = document.createElement('td');
		deliveryDate.width = "70px";
		deliveryDate.align = 'center';
		if (equipment.deliveryDate === undefined)
			deliveryDate.appendChild(document.createTextNode('---'));
		else 
			deliveryDate.appendChild(document.createTextNode(equipment.deliveryDate));
		
		var equipmentNotes = document.createElement('td');
		equipmentNotes.width = "200px";
		equipmentNotes.align = 'center';
		equipmentNotes.appendChild(document.createTextNode(equipment.notes));
		
		tableRow.appendChild(equipmentName);
		tableRow.appendChild(equipmentDescription);
		tableRow.appendChild(supplier);
		tableRow.appendChild(deliveryStatus);
		tableRow.appendChild(orderedDate);
		tableRow.appendChild(estDeliveryDate);
		tableRow.appendChild(deliveryDate);
		tableRow.appendChild(equipmentNotes);
		$("#equipmentTable").find('tbody').append(tableRow);
		
	}
}

/**
 * This function fills out the closeout info
 * @param data with closeout info
 * @returns
 */
function fillCloseout (data) {
	let closeoutData = data.closeoutDetails;
	$('#closeoutSummary').find('#mg2Completion').html(closeoutStatusConverter(closeoutData.mg2CompletionStatus));
	$('#closeoutSummary').find('#punchList').html(closeoutStatusConverter(closeoutData.punchListStatus));
	$('#closeoutSummary').find('#verisaeReport').html(closeoutStatusConverter(closeoutData.verisaeReportStatus));
	
	let required = 0;
	let completed = 0;
	
	
	switch (closeoutData.mechFinalStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2':
			required++;
			break;
	} 
	switch (closeoutData.elecFinalStatus) {
		case '1': 
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	switch (closeoutData.plumbingFinalStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	switch (closeoutData.gasFinalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.ceilingFinalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.fireAlarmFinalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.lowVolFinalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.sprinkleFinalStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	switch (closeoutData.buildingFinalStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	$('#closeoutSummary').find('#finalInspectionsRequired').text(completed + ' / ' + required);
	required = 0;
	completed = 0;
	switch (closeoutData.GCWarrantyStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	switch (closeoutData.HTIWarrantyStatus) {
		case '1':
			required++;
			completed++;
			break;
		case '2': 
			required++;
			break;
	}
	switch (closeoutData.MCSWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.electricalWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.mechanicalWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.otherWarrantyStatusA) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.otherWarrantyStatusB) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.plumbingWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.gasWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.sprinkleWarrantyStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	$('#closeoutSummary').find('#finalWarrantiesRequired').text(completed + ' / ' + required);
	completed = 0;
	required = 0;
	
	switch (closeoutData.GCSStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.HTIStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.MCSStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.electricalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.mechanicalStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.otherFinalLeinsStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch (closeoutData.otherFinalLeinsBStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch(closeoutData.plumbingStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch(closeoutData.gasStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	switch(closeoutData.sprinkleStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	
	$('#closeoutSummary').find('#finalLiensRequired').text(completed + ' / ' + required);
}

/**
 * This function converts the closeoutStatus from a number to a string
 * @param param value
 * @returns the string value
 */
function closeoutStatusConverter(param)
{
	if (param == 1)
		return "Complete";
	else if (param == 2)
		return "Incomplete";
	else if (param == 3)
		return "N/A";
	else if(param == 4)
		return "Required";
	else
		return "---";
}

/**
 * This function converts the permit from a number to a string
 * @param param value
 * @returns the string value
 */
function convertPermit(param)
{
	if (param == '1')
		return "Preparing";
	else if (param == '2')
		return "Submitted";
	else if (param == '3')
		return "Issued";
	else if (param == '4')
		return "Closed";
	else
		return "---";
}

/**
 * This function converts the changeOrder type from a number to a string
 * @param param value
 * @returns the string value
 */
function parseChangeOrderType (param) {
	switch (param) {
		case "1":
			return "COP";
		case "2":
			return "REF";
		case "3":
			return "WHS";
		case "4": 
			return "FAC";
		case "5":
			return "VEN";
		case "6":
		default:
			return "UDF";
	}
}

/**
 * This function converts the changeOrder status from a number to a string
 * @param param value
 * @returns the string value
 */
function parseChangeOrderStatus (param) {
	switch (param) {
		case "1":
			return "Preparing";
		case "2":
			return "Submitted";
		case "3":
			return "Approved";
		case "4":
			return "Rejected";
		case "5":
			return "Complete";
		case "6":
			return "Review";
		default:
			return "---";
	}
}

/*
function toggleChangeOrder (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editChangeOrder').prop('disabled', false);
	selectedChangeOrder = $(source).attr('value');
	CHANGE_ORDER_ID = selectedChangeOrder;
}
*/

function editSelectedChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=edit&id=' + projectID + '&changeOrderID=' + selectedChangeOrder;
}


function toggleEquipment (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editEquipment').prop('disabled', false);
	selectedEquipment = $(source).attr('value');
}

function editSelectedEquipment (source) {
	//window.location.href = PROJECT_EQUIPMENT + '?type=edit&id=' + projectID + '&equipmentID=' + selectedEquipment;
	console.log(source);
	
	if(source) EQUIPMENT_ID_EQUIP = source;
	else EQUIPMENT_ID_EQUIP = selectedEquipment;
	
	PAGETYPE_EQUIP = "edit";	
	projectID_EQUIP = projectID;
	clearEquipmentFormValues();
	
	setCurrentDivLocation("equipmentDiv");


	
	$('.editProject').hide();
	$('#equipmentForm').addClass('active');
	$('#equipmentDiv').find(".nav-tabs").find("[data-tab=saveButton]").removeClass("active");
	$('#equipmentDiv').find(".nav-tabs").find("[data-tab=equipmentForm]").addClass("active");
	$('.projectNavigator-projectManager').show();
	$('.projectEdit').show();
	$('.projectNavigator').show();
	$('#equipmentDiv').show();
	$('#deleteEquipment').show();
	
	getDropdownInfo_EQUIP();
}

function equipmentReport () {
	window.location.href = EQUIPMENT_PRINT + 'id=' + projectID;
}

/**
 * This function warns the user that they are about to permanently delete a project and then deletes
 * it after receiving confirmation
 */
function deleteConfirm () {
	if (confirm("Are you sure you want to delete this project permanently?")) {
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'domain': 'project',
				'action': 'deleteProject',
				'id': projectID,
			}, complete: function(data) {
				console.log(data);
				if(data.responseJSON === "PROJECT_DELETED") {
					alert("Project Deleted!");
					window.location.href = 'findProject.html';
				} else
					alert("Could not Delete Project");
			}
		});
	}
}

/**
 * This function takes the user to the task form to create a task
 * @returns
 */
function goToTaskForm () {
	window.location.href = TASK_CREATOR + '?id=' + projectID;
}

/**
 * This function fills the task table with the given tasks
 * INNER FUNCTION CALLS: none
 */
function fillTasksTable(tasks) {
	let selector = $('#taskSelector2').val();
	console.log(selector);
	clearTaskTable();
	let count = 0;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'open' && tasks[i].status.id != 1) || 
				(selector === 'complete' && tasks[i].status.id != 2) ||
				(selector === 'open_complete' && tasks[i].status.id == 3) ||
				(selector === 'closed' && tasks[i].status.id != 3)) 
				continue; // do nothing
		var task = tasks[i];
		var taskListing = document.createElement('tr');
		taskListing.setAttribute("value", task.id);
		taskListing.onclick = function() {
			toggleTask(this);
		};
		
		taskListing.ondblclick = function () {
			TASK_ACTION = "updateTask";
			displayTaskWell();
			fillTaskWell(this);
		};

		count++;
			
		taskListing.value = tasks[i].id;
		taskListing.id = "task_" + tasks[i].id;
		
		let taskTitle = document.createElement('td');
		let taskDesc = document.createElement('td');
		let assignedTo = document.createElement('td');
		let dueDate = document.createElement('td');
		let severity = document.createElement('td');
		let status = document.createElement('td');
		let notes = document.createElement('td');

		taskTitle.innerHTML = tasks[i].title;
		taskTitle.align = 'center';
		
		taskDesc.innerHTML = tasks[i].description;
		taskDesc.align = 'center';
				
		if(tasks[i].type == TASK_EMPLOYEE_ASSIGNEE)
			assignedTo.innerHTML = tasks[i].assignee.firstName;
		else
			assignedTo.innerHTML = tasks[i].subAssignee.name;
		assignedTo.align = 'center';
		
		dueDate.innerHTML = tasks[i].dueDate;
		dueDate.align = 'center';
		
		severity.innerHTML = tasks[i].severity;
		severity.align = 'center';
		
		status.innerHTML = tasks[i].status.status;
		status.align = 'center';
		
		notes.innerHTML = tasks[i].notes;
		notes.align = 'center';
		
		taskListing.appendChild(taskTitle);
		taskListing.appendChild(taskDesc);
		taskListing.appendChild(assignedTo);
		taskListing.appendChild(dueDate);
		taskListing.appendChild(severity);
		taskListing.appendChild(status);
		taskListing.appendChild(notes);
			
		$('#taskTable > tbody').append(taskListing);
		
	}

	if (count === 0) {
		clearAndAddSingleRowTask("No Tasks to Show");
	}
	
}


let SELECTED_TASK_ID;

function toggleTask (source)
{
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editTask').prop('disabled', false);
	SELECTED_TASK_ID = $(source).attr('value');
	console.log("task id = ", SELECTED_TASK_ID);
}

function editSelectedTask()
{
	TASK_ACTION = "updateTask";
	displayTaskWell();
	fillTaskWell(SELECTED_TASK_ID);
}

function displayTaskWell() {
	console.log("TASK ACTION: ", TASK_ACTION);
	
	$('#tasksInformation').find('#taskDisplay').hide();
	$('#tasksInformation').find('#taskCreationZone').show();
	$('#tasksInformation').find('#taskCreationZone').find('#taskStatusSelectionRow').show();
	document.getElementById('tasksInformation').style.width = "55%";
}

function fillTaskWell(source) {
	let tmp_id = source;
	
	let selected_task;
	for(var i = 0; i < tasks.length; i++) {
		if(tasks[i].id == tmp_id) {
			selected_task = tasks[i];
			SELECTED_TASK_ID = tasks[i].id;
		}
		
	}
	
	if(!selected_task) {
		console.log("IMPROPER TASK SELECTION");
		return;
	}
	
	$('#taskCreationZone').find('#titleEntry').val(selected_task.title);
	$('#taskCreationZone').find('#descriptionEntry').val(selected_task.description);
	
	if(selected_task.type == TASK_SUB_ASSIGNEE) {
		$('#taskCreationZone').find('#employeeAssigneeTableElement').hide();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').show();
		taskAssigneeType = TASK_SUB_ASSIGNEE;
		document.getElementById('toggleTaskAssignee').innerHTML = "Assign to Employee";
		document.getElementById('toggleTaskAssignee').value = TASK_SUB_ASSIGNEE;
		$('#taskCreationZone').find('#subcontractorsDropdown').val(selected_task.subAssignee.name);
	}
	else {
		$('#taskCreationZone').find('#employeeAssigneeTableElement').show();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').hide();
		document.getElementById('toggleTaskAssignee').innerHTML = "Assign to Subcontractor";
		document.getElementById('toggleTaskAssignee').value = TASK_EMPLOYEE_ASSIGNEE;
		taskAssigneeType = TASK_EMPLOYEE_ASSIGNEE;
		$('#taskCreationZone').find('#assigneeEntry').val(selected_task.assignee.firstName);
	}

		
	$('#taskCreationZone').find('#initDate').val(selected_task.assignedDate);
	$('#taskCreationZone').find('#dueDate').val(selected_task.dueDate);
	$('#taskCreationZone').find('#severity').val(selected_task.severity);
	$('#taskCreationZone').find('#taskStatus').val(selected_task.status.status);
	$('#taskCreationZone').find('#notes').val(selected_task.notes);

		
}


/**
 * This function clears and adds a single row to the task table
 * Displays a message after cleaning the table
 * INNER FUNCTION CALLS: none
 */
function clearAndAddSingleRowTask(msg) {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');

	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	
	$('#taskTable > tbody').append(placeHolder);
}

/**
 * This function clears the task table
 * INNER FUNCTION CALLS: none
 */
function clearTaskTable () {
	$('#taskDisplay').find('#taskTable').find('tr:not(.head)').remove();
}


/**
 * This function clears the change order table
 * INNER FUNCTION CALLS: none
 */
function clearChangeOrderTable(){
	$('#changeOrderTable > tbody').find('tr').remove();
}

//THIS ENDS THE JAVASCRIPT FOR PROJECTMANAGER.js

/**
 * THE FOLLOWING JAVASCRIPT CORRESPONDS TO FINDPROJECT.js
 */

let ready = false;

let projects;

let parameterFields = ["Warehouse", "Project", "Item",
                       "Manager", "Supervisor", "Type", "Status"];

let paramNum = 2;

let warehouseOptions;
let classOptions;
let itemOptions;
let managerOptions;
let supervisorOptions;
let typeOptions;
let statusOptions;
let stageOptions;


let taskFinder;

let t0;
let t1;

//Keeps track of stage selections
//STAGE SELECTION FOR CHECKMARKS

$(document).on('click', '#AllStages', function(){
	if(document.getElementById("AllStages").checked == true){
		$('.commonStage').each(function(i, obj) {
			obj.checked = true;
		});
		document.getElementById("NoStages").checked = false;
	}
	updateFrontEnd();
});


//Keeps track of stage selections

$(document).on('click', '#NoStages', function(){
	if(document.getElementById("NoStages").checked == true){
		$('.commonStage').each(function(i, obj) {
			obj.checked = false;
		});
		document.getElementById("AllStages").checked = false;
	}
	updateFrontEnd();
});



//Keeps track of stage selections
$(document).on('click', '.commonStage', function(){
	if(this.checked == false) document.getElementById('AllStages').checked = false;
    document.getElementById('NoStages').checked = false;
    updateFrontEnd();
});


//UNCOMMENT FOR MULTIPLE CHOSEN SELECT
/*
$(document).on('click', '.stageSelection', function(){
	updateFrontEnd();
});
*/


$(document).on('click', '.stageLabel', function(){
	console.log("THISS ID = ", this.id);
	let stage_id = this.id;
	if(stage_id == 'all') {
			let checked = document.getElementById('AllStages').checked;
			if(checked == true) {
				document.getElementById('AllStages').checked = false;
				checked = false;
			}
			else {
				document.getElementById('NoStages').checked = false;
				document.getElementById('AllStages').checked = true;
				checked = true;
			}
			$('.commonStage').each(function(i, obj) {
				if(checked == true) obj.checked = true;		
			});
	} else if(stage_id == 'none') {
			let checked = document.getElementById('NoStages').checked;
			if(checked == true) {
				document.getElementById('NoStages').checked = false;
				checked = false;
			}
			else {
				document.getElementById('NoStages').checked = true;
				document.getElementById('AllStages').checked = false;
				checked = true;
			}
			$('.commonStage').each(function(i, obj) {
				if(checked == true) obj.checked = false;			
			});
	}
	else {
			$('.stage').each(function(i, obj) {
				if(obj.value == stage_id) {
					if(obj.checked == true) obj.checked = false;
					else {
						document.getElementById('NoStages').checked = false;
						obj.checked = true;
					}
					};
			});
	}
	updateFrontEnd();
});

/**
 * This function retrieves all of the projects from the database as well as sets initial display
 * INNER FUNCTION CALLS: clearAndAddSingleRow(), getSearchCriteria(), filterProjects()
 */
function getAllProjects() {
	
	if(getParameterByName("from")) $('.projectNavigator-projectFinder').hide();
	clearAndAddSingleRow("Retrieving Projects...");
	if (getParameterByName('type') === 'findTaskProject') {
		$('#param-field').before('<h3>Select a Project to Create Task for:</h3>');
		taskFinder = true;
	} else taskFinder = false;
	
	t0 = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getAllProjects'
		}, success: function (data) {
			projects = data;
			RETRIEVED_PROJECTS = JSON.parse(projects['projects']);
			establishRetrievedProjects();
			if(RETRIEVED_PROJECTS) console.log("getAllProjects() - PROJECTS HAVE BEEN RETRIEVED");
			$('.projectNavigator-projectFinder').show();
			t1 = new Date().getTime();
			console.log('took: ' + (t1 - t0) + 'ms');
			console.log("PROJECTS ARE : ", RETRIEVED_PROJECTS);
			getSearchCriteria();
		}
	});
}

function establishRetrievedProjects()
{
	console.log()
	for(var i = 0; i < RETRIEVED_PROJECTS.length; i++){
		RETRIEVED_PROJECTS[i].id = RETRIEVED_PROJECTS[i][0];
		RETRIEVED_PROJECTS[i].McsNumber = RETRIEVED_PROJECTS[i][1];
		RETRIEVED_PROJECTS[i].projectItem = RETRIEVED_PROJECTS[i][2];
		RETRIEVED_PROJECTS[i].projectType = RETRIEVED_PROJECTS[i][3];
		RETRIEVED_PROJECTS[i].stage = RETRIEVED_PROJECTS[i][4];
		RETRIEVED_PROJECTS[i].status = RETRIEVED_PROJECTS[i][5];
		RETRIEVED_PROJECTS[i].warehouse = RETRIEVED_PROJECTS[i][6];
		RETRIEVED_PROJECTS[i].projectManagers = RETRIEVED_PROJECTS[i][7];
		RETRIEVED_PROJECTS[i].projectClass = RETRIEVED_PROJECTS[i][8];
		RETRIEVED_PROJECTS[i].lowScore = RETRIEVED_PROJECTS[i][9];
		RETRIEVED_PROJECTS[i].mediumScore = RETRIEVED_PROJECTS[i][10];
		RETRIEVED_PROJECTS[i].highScore = RETRIEVED_PROJECTS[i][11];
		RETRIEVED_PROJECTS[i].scoreLastUpdated = RETRIEVED_PROJECTS[i][12];

		
		for(var q = 0; q < 13; q++){
			var num = 12 - q;
			RETRIEVED_PROJECTS[i].splice(num, 1);
		}
	}
}
/**
 * This function updates the front end project display
 * INNER FUNCTION CALLS: clearAndAddSingleRow(), filterProjects()
 */
function updateFrontEnd() {
	let from = getParameterByName("from");
	if(from == "projectData") getTheProjects();
	else {
		clearAndAddSingleRow("Retrieving Projects...");
		if (getParameterByName('type') === 'findTaskProject') {
			$('#param-field').before('<h3>Select a Project to Create Task for:</h3>');
			taskFinder = true;
		} else taskFinder = false;
		
		
		filterProjects();
	}
	
	
}

/**
 * This function updates all of the displayable projects based off the selected stages
 * INNER FUNCTION CALLS: none
 */
function updateDisplayableProjects(){
	if(!RETRIEVED_PROJECTS) {console.log("Should have projects by now!"); return;}

	DISPLAYABLE_PROJECTS = new Array();
	
	
	var stagesOfInterest = new Array();
			$('.stage').each(function(i, obj) {
				if(obj.checked == true) stagesOfInterest.push(obj);
			}); 
		
	/*	
	UNCOMMENT FOR CHOSEN	
	//var stagesOfInterest = new Array();
	//var stageOptions = document.getElementById('stageSelector').options;
	for(var i = 0; i < stageOptions.length; i++) {
		if(stagesOptions[i].selected == true) stagesOfInterest.push(stageOptions[i]);
	}
	*/
			
	for(var i = 0; i < RETRIEVED_PROJECTS.length; i++){
		for(var q = 0; q < stagesOfInterest.length; q++){
			if(stagesOfInterest[q].value == RETRIEVED_PROJECTS[i].stage.id) {
				DISPLAYABLE_PROJECTS.push(RETRIEVED_PROJECTS[i]);
			}
		}
	}	
	
	console.log("FINISHED UPDATING DISPLAYABLE PROJECTS");
	
}


/**
 * This function retrieves all of the search criteria from the database
 *  that the user can filter projects with
 * INNER FUNCTION CALLS: clearAndAddSingleRow(), fillDropdowns_FIND_PROJECT(), checkInitFilter()
 */
function getSearchCriteria(_stopServerCalls) {
	
	clearAndAddSingleRow("Retrieving Search Criteria...");
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificObjects',
			'warehouse': true,
			'class': true,
			'item': true,
			'person': true,
			'type': true,
			'status': true,
			'changeordertype' : true ,
		}, success: function(data) {
			
			
			CHANGE_ORDER_TYPES = JSON.parse(data.changeordertype);

			fillDropdowns_FIND_PROJECT(data);
			
			
			$('#paramID1').val('Warehouse');
			$('#paramVal1').empty();
			$('#paramVal1').append(warehouseOptions.cloneNode(true));
			
			//$('#paramID2').val('Stage');
			//$('#paramVal2').empty();
			//$('#paramVal2').append(stageOptions.cloneNode(true));
			
			checkInitFilter();
			filterProjects();
			 
			
		}, error: function(data) {
			console.log(data);
			alert('Something has gone horribly wrong!');
		}
	});
}

/**
 * This function clears the project display table and adds a single row with a message
 * INNER FUNCTION CALLS: none
 * @params message to be displayed
 */
function clearAndAddSingleRow(msg) {
	
	$('#results > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	
	$('#results > tbody').append(placeHolder);
}

/**
 * This function sets the initial filter when finding projects
 * INNER FUNCTION CALLS: matchUsernameToPersonID, filterProjects()
 */
function checkInitFilter () {
	if (getParameterByName('id') == 'activePermit') {
		$('#paramID1').val('Status');
		$("#paramVal1").empty();
		$("#paramVal1").append(statusOptions.cloneNode(true));

		document.getElementById('paramVal1').value = '30';
		filterProjects();
	} 
	else if(getParameterByName('from') == 'findUserProjects'){
		
		let user;
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getUserInfo'
			}, success: function (data) {
				user = data;
				 if(user.permission.canAccessAdminPage == false) hideAdminContent();	
				 if(user.firstName == "Sandy") {
					 $('#paramID1').val('Warehouse');
						$('#paramVal1').empty(); 
						$('#paramVal1').append(warehouseOptions.cloneNode(true));
						removeParam(document.getElementById('paramID2'));
						//CHANGE BACK TO CHECKED AND .stage if NEED BE
						$('.stageSelection').each(function(i, obj) {   
							if(obj.value == '2') obj.checked = true;
							else if(obj.value == '1') obj.checked = true;
							else obj.checked = false;
						});
						//$('#stageSelector').trigger('chosen:updated');

						//document.getElementById('AllStages').checked = false;
						//document.getElementById('NoStages').checked = false;
						
				 } else {
					$('#paramID1').val('Manager');
					$('#paramVal1').empty(); 
					$('#paramVal1').append(managerOptions.cloneNode(true));
					matchUsernameToPersonID(user.firstName, 1);
				 }
				filterProjects();
			}
		});
	} 
	else if(getParameterByName('from') == 'findAwaitingPermits'){
		$('#paramID1').val('Status');
		$('#paramVal1').empty();
		$('#paramVal1').append(statusOptions.cloneNode(true));
		$('#paramVal1').val('30');
		
		$('.stageSelection').each(function(i, obj) {
			if(obj.value == '2') obj.checked = true;
			else obj.checked = false;
		});
		
		//$('#stageSelector').trigger('chosen:updated');

		
		removeParam(document.getElementById('paramID2'));
		filterProjects();
		
	}	
	else {
		$('#paramID1').val('Warehouse');
		let user;
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getUserInfo'
			}, success: function (data) {
				user = data;
				 if(user.permission.canAccessAdminPage == false) hideAdminContent();	 
				 if(user.firstName == "Sandy") {
					 $('.stage').each(function(i, obj) {
							if(obj.value == '2') obj.checked = true;
							else if(obj.value == '1') obj.checked = true;
							else obj.checked = false;
						});
						//document.getElementById('AllStages').checked = false;
						//document.getElementById('NoStages').checked = false;
				 }
				 
				 $('#paramID2').val('Manager');
			     $('#paramVal2').empty();
				 $('#paramVal2').append(managerOptions.cloneNode(true));
				 matchUsernameToPersonID(user.firstName, 2);
				 
				 //$('#stageSelector').trigger('chosen:updated');

				
				filterProjects();
			}
		});		
	}
}

/**
 * This function matches the user's first name to the appropriate person ID
 * INNER FUNCTION CALLS: removeParam()
 */
function matchUsernameToPersonID(userFirstName, paramNum){
	switch(userFirstName) {
	case 'Bart': 
		document.getElementById('paramVal'+paramNum).value = '14';
		removeParam(document.getElementById('paramID2'));
		return '14';
		break;
	case "Alex":
		document.getElementById('paramVal'+paramNum).value = '3';
		removeParam(document.getElementById('paramID2'));
		return '3';
		break;
	case "Andy":
		document.getElementById('paramVal'+paramNum).value = '2';
		removeParam(document.getElementById('paramID2'));
		return '2';
		break;
	case "Craig":
		document.getElementById('paramVal'+paramNum).value = '12';
		removeParam(document.getElementById('paramID2'));
		return '12';
		break;
	case "Dave":
		document.getElementById('paramVal'+paramNum).value = '7';
		removeParam(document.getElementById('paramID2'));
		return '7';
		break;
	case "David":
		document.getElementById('paramVal'+paramNum).value = '1';
		removeParam(document.getElementById('paramID2'));
		return '1';
		break;
	case "Jim": 
		document.getElementById('paramVal'+paramNum).value = '8';
		removeParam(document.getElementById('paramID2'));
		return '8';
		break;
	case "Joe":
		document.getElementById('paramVal'+paramNum).value = '5';
		removeParam(document.getElementById('paramID2'));
		return '5';
		break;
	case "Adrienne":
		document.getElementById('paramVal'+paramNum).value = '17';
		removeParam(document.getElementById('paramID2'));
		return '17';
		break;
	case "Tony":
		document.getElementById('paramVal'+paramNum).value = '4';
		removeParam(document.getElementById('paramID2'));
		return '4';
		break;
	case 'Marvin': 
		document.getElementById('paramVal'+paramNum).value = '18';
		removeParam(document.getElementById('paramID2'));
		return '18';
		break;
	default:
		removeParam(document.getElementById('paramID2'));
}
}



function fillDropdowns_FIND_PROJECT(data) {
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < parameterFields.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	
	$('.parameterID').append(d);
	
	console.log("DATA PERSON = ", data['person']);
	warehouseOptions = generateDropdowns_FIND_PROJECTS(data['warehouse'], parameterFields[0]);
	classOptions = generateDropdowns_FIND_PROJECTS(data['class'], parameterFields[1]);
	itemOptions = generateDropdowns_FIND_PROJECTS(data['item'], parameterFields[2]);
	managerOptions = generateDropdowns_FIND_PROJECTS(data['person'], parameterFields[3]);
	supervisorOptions = generateDropdowns_FIND_PROJECTS(data['person'], parameterFields[4]);
	typeOptions = generateDropdowns_FIND_PROJECTS(data['type'], parameterFields[5]);
	statusOptions = generateDropdowns_FIND_PROJECTS(data['status'], parameterFields[6]);
	//stageOptions = generateDropdowns_FIND_PROJECTS(data['stage'], parameterFields[7]);
}

/**
 * This function generates the dropdowns for the findProject search criteria
 * INNER FUNCTION CALLS: none
 */
function generateDropdowns_FIND_PROJECTS(jsonData, field) {
	
	let json = JSON.parse(jsonData);
	
	let d = document.createDocumentFragment();
	let sorted = false;
	for (var i = 0; i < json.length; i++) {
		
		if(field == "Manager" || field == "Supervisor") {
			if(json[i].name == "Bart") continue;
		}
		let option = document.createElement('option');
		if (field == 'Warehouse') {
			if(json[i].state && (json[i].state == "UNKNOWN" || json[i].state == "Unknown")) 
			{
				option.innerHTML = json[i].city.name + ", " + json[i].region;
			}
			else
			{
				option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
			}
			
		} else if(field == 'Stage') {
			if(sorted == false){
				let sortedStages = new Array(9);
				
				sortedStages[5] = {name:"----------------------"};
				for(var q = 0; q < json.length; q++){
					
					if(json[q].id == 8) {sortedStages[0] = json[q];}
					else if(json[q].id == 1) {sortedStages[1] = json[q];}
					else if(json[q].id == 2) {sortedStages[2] = json[q];}
					else if(json[q].id == 17){sortedStages[3] = json[q]; }
					else if(json[q].id == 16) {sortedStages[4] = json[q];}
					else if(json[q].id == 4) {sortedStages[6] = json[q];}
					else if(json[q].id == 9) {sortedStages[7] = json[q];}
					else if(json[q].id == 15) {sortedStages[8] = json[q];}
				}

				
				for(var q = 0; q < sortedStages.length; q++){
					var optionStage = document.createElement('option');
					optionStage.innerHTML = sortedStages[q].name;
					if(sortedStages[q].name == "----------------------"){
						optionStage.setAttribute('disabled', 'disabled');
						d.appendChild(optionStage);
						continue;
					}
					optionStage.setAttribute('value', sortedStages[q].id);
					d.appendChild(optionStage);
				}
				sorted = true;
				
			}	
		} else {
			option.innerHTML = json[i].name;
		}
		
		if(field == 'Stage') continue;
		option.setAttribute('value', json[i].id);
		d.appendChild(option);
	}
	return d;
}



$(document).on('change', 'select.parameterValue', function () {
	filterProjects();
});

$(document).on('change', 'select.parameterID', function () {
	setVals($(this));
	filterProjects();
});

/**
 * This function sets the value for the parameter
 * INNER FUNCTION CALLS: none
 */
function setVals (param) {
	let modParam = $(param).siblings('select');
	let valOptions = $(param).val();
	
	switch(valOptions)
	{
	
	case 'Warehouse':
		modParam.empty();
		modParam.append(warehouseOptions.cloneNode(true));	
		break;
	case 'Project':
		modParam.empty();
		modParam.append(classOptions.cloneNode(true));
		break;
	case 'Item':
		modParam.empty();
		modParam.append(itemOptions.cloneNode(true));
		break;
	case 'Manager':
		modParam.empty();
		modParam.append(managerOptions.cloneNode(true));
		break;
	case 'Supervisor':
		modParam.empty();
		modParam.append(supervisorOptions.cloneNode(true));
		break;
	case 'Type':
		modParam.empty();
		modParam.append(typeOptions.cloneNode(true));
		break;
	case 'Status':
		modParam.empty();
		modParam.append(statusOptions.cloneNode(true));
		break;
	case 'Stage':
		modParam.empty();
		modParam.append(stageOptions.cloneNode(true));
		break;
	}
}

/**
 * This function adds a parameter to the search criteria
 * INNER FUNCTION CALLS: none
 */
function addParameter() {
	paramNum++;
	
	let parameterHolder = document.createElement('div');
	parameterHolder.className = 'paramHolder';
	
	let selectID = document.createElement('select');
	selectID.className = 'parameterID';
	selectID.id = ('paramID' + paramNum);
	$(selectID).css('margin-right', '4px');
	
	let optionObject = document.createElement('option');
	optionObject.value = 'none';
	optionObject.innerHTML = '-- Please select an option --';
	
	let removeTag = document.createElement('span');
	removeTag.onclick = function() {removeParam(this)};
	removeTag.innerHTML = '&times;';
	
	let selectVal = document.createElement('select');
	selectVal.className = 'parameterValue';
	selectVal.id = ('paramVal' + paramNum);
	$(selectVal).css('margin-right', '4px');
	
	let optionObject2 = document.createElement('option');
	optionObject2.innerHTML = '---';
	
	selectID.appendChild(optionObject);
	selectVal.appendChild(optionObject2);
	parameterHolder.appendChild(selectID);
	parameterHolder.appendChild(selectVal);
	parameterHolder.appendChild(removeTag);
	
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < parameterFields.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	$(selectID).append(d);
	
	$('#param-field').append(parameterHolder);
}

/**
 * This function removes a param from the search criteria
 * INNER FUNCTION CALLS: filterProjects()
 */
function removeParam(param) {
	param.parentNode.remove();
	paramNum--;
	filterProjects();
}

/**
 * This function filters through the projects based off of the given
 * search criteria and then displays the appropriate projects
 * INNER FUNCTION CALLS: updateDisplayableProjects(), clearAndAddSingleRow()
 */
function filterProjects () {

	updateDisplayableProjects();
	//let json = JSON.parse(projects['projects']);
	let json = DISPLAYABLE_PROJECTS;
	console.log("DISPLAYABLE " , DISPLAYABLE_PROJECTS);
	let parameters = $('.paramHolder').children('select');
	
	
	let remaining = json.length;
	if(paramNum != 0){
	for (var i = 0; i < (paramNum * 2); i+= 2) {
		let id = $(parameters[i]).val();
		let val = $(parameters[i + 1]).val();
		console.log("VAL = ", val);
		
		for (var j = 0; j < json.length; j++) {
			if(id === 'Warehouse') { 
				if(json[j] != null && json[j].warehouse.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Project') {
				if (json[j] != null && json[j].projectClass.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Item') {
				if (json[j] != null && json[j].projectItem.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Manager') {
				if (json[j] != null && json[j].projectManagers.id != val) {
					json[j] = null;
					remaining = remaining -1;
				}
			} else if (id === 'Supervisor') {
				console.log("ID VAL: ", json[j].supervisors);
				if (json[j] != null && json[j].supervisors != null && json[j].supervisors[0].id != val) {
					json[j] = null
					remaining = remaining - 1;
				}
			} else if (id === 'Type') {
				if (json[j] != null && json[j].projectType.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Status') {
				if(json[j] != null && json[j].status.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if(id === 'Stage') {
				if(json[j] != null && json[j].stage.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			}
		}

		$('#results > tbody').children('tr:not(.head)').remove();
		if (remaining == 0) {
			clearAndAddSingleRow('No Results Found!');
		}  
		else {
			for (var k = 0; k < json.length; k++) {
				if(json[k] != null) {
					let projectListing = document.createElement('tr');
					let listDetails0 = document.createElement('td'); //Warehouse
					let listDetails1 = document.createElement('td'); //Item
					let listDetails2 = document.createElement('td'); //Manager
					let listDetails3 = document.createElement('td'); //Low
					let listDetails4 = document.createElement('td'); //Medium
					let listDetails5 = document.createElement('td'); //High
					let listDetails6 = document.createElement('td'); //Last Updated
					
					
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}

					//if(json[k].warehouse.city.name == "APANA") 
					if(json[k].warehouse && json[k].warehouse.city && json[k].warehouse.city.name && json[k].warehouse.city.name.includes("APANA")) {
						listDetails0.innerHTML = json[k].warehouse.city.name + ', ' +
						json[k].warehouse.region;
					}
					else {
						listDetails0.innerHTML = json[k].warehouse.city.name + ' #' +
											json[k].warehouse.warehouseID;
					}
					listDetails1.innerHTML = json[k].projectItem.name;
					listDetails2.innerHTML = json[k].projectManagers.name;
					listDetails3.innerHTML = json[k].lowScore;
					listDetails4.innerHTML = json[k].mediumScore;
					listDetails5.innerHTML = json[k].highScore;
					listDetails6.innerHTML = json[k].scoreLastUpdated;
		
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					$(projectListing).append(listDetails3);
					$(projectListing).append(listDetails4);
					$(projectListing).append(listDetails5);
					$(projectListing).append(listDetails6);
					
					
					$('#results > tbody').append(projectListing);
				}
			}
		}		
	}
	}
	else {
		$('#results > tbody').children('tr:not(.head)').remove();
		if (remaining == 0) {
			clearAndAddSingleRow('No Results Found!');
		} else if (remaining > 50) {
			clearAndAddSingleRow('Too many results. Refine your search.');
		} else {
			for (var k = 0; k < json.length; k++) {
				if(json[k] != null) {
					let projectListing = document.createElement('tr');
					let listDetails0 = document.createElement('td'); //Warehouse
					let listDetails1 = document.createElement('td'); //Item
					let listDetails2 = document.createElement('td'); //Manager
					let listDetails3 = document.createElement('td'); //Low
					let listDetails4 = document.createElement('td'); //Medium
					let listDetails5 = document.createElement('td'); //High
					let listDetails6 = document.createElement('td'); //Last Updated 
					
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}

					//if(json[k].warehouse.city.name == "APANA") 
					if(json[k].warehouse && json[k].warehouse.city && json[k].warehouse.city.name && json[k].warehouse.city.name.includes("APANA")) {
						listDetails0.innerHTML = json[k].warehouse.city.name + ', ' +
						json[k].warehouse.region;
					}
					else {
						listDetails0.innerHTML = json[k].warehouse.city.name + ' #' +
											json[k].warehouse.warehouseID;
					}
					listDetails1.innerHTML = json[k].projectItem.name;
					listDetails2.innerHTML = json[k].projectManagers.name;
					listDetails3.innerHTML = json[k].lowScore;
					listDetails4.innerHTML = json[k].mediumScore;
					listDetails5.innerHTML = json[k].highScore;
					listDetails6.innerHTML = json[k].scoreLastUpdated;
		
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					$(projectListing).append(listDetails3);
					$(projectListing).append(listDetails4);
					$(projectListing).append(listDetails5);
					$(projectListing).append(listDetails6);
					
					
					$('#results > tbody').append(projectListing);
				}
			}
		}
	}
}


/**
 * This function displays the proper div
 * INNER FUNCTION CALLS: none
 */
function navigateTo(source) {
	EDIT_INTENTION = true;
	if(taskFinder) {
		window.location.href = TASK_CREATOR + '?id=' + 
			$(source).attr('id').replace('project', '');
	} else {
		
		document.getElementById("findProject").style.display = 'none';
		$(source).attr('id').replace('project', '');
		var proj_id = $(source).attr('id');
		proj_id = proj_id.replace('project','');
		projectID = proj_id;			
		getProject_PROJECT_RULE_MANAGER(proj_id);
	
		//currentDivLocation = "projectManager";
		//document.getElementById("projectManager").style.display = 'inline';
		//window.location.href = PROJECTMANAGER + '?id=' + 
			
	}

}

function navigateToProjManager() {
	if (confirm('Are you sure you want to leave this page?')) {
		window.location.href = "projects.html?id=" + projectID + "&from=rules";
	}
}


function getProject_PROJECT_RULE_MANAGER(project_id) {
	if (project_id !== null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'get',
				'id': project_id
			}, success: function (data) {
				
				PROJECT_DATA = data;
				RULE_DATA = data;
				
				reevaluateProject(project_id);

			}, error: function (data) {
				alert('Server Error!');
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = FINDPROJECT;
		}
	}
}

let RULES;
let FAILED_RULES;
let RULE_DATA;

let LOW_COLOR = "rgb(0, 255, 0)";
let MEDIUM_COLOR = "rgb(255, 255, 0)";
let HIGH_COLOR = "rgb(255, 92, 51)";

let NO_COLOR = "rgb(255, 255, 255)";

function reevaluateProject(project_id) {
	if (project_id != null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'evaluateProject',
				'projectId': project_id
			}, success: function (data) {
				console.log("DAT" , data);
				prepareRuleManager(data);
			}, error: function (data) {
				alert('Server Error!');
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = "rules.html";
		}
	}
}

function prepareRuleManager(data)
{
	var rules = data.applicableRules;
	RULES = data.applicableRules;
	console.log("PRM" , data);
	for(var rule in data)
	{
		if(rule == "PROJECT" || rule == "applicableRules")
			continue;
		
		for(var i = 0; i < RULES.length; i++)
		{
			if(RULES[i].id == data[rule].RULE_ID) 
			{
				if(data[rule].passed != undefined)
					RULES[i].passed = data[rule].passed;
				else if(data[rule].taskResults || data[rule].equipmentResult || data[rule].changeOrderResults)
				{
					if(evaluateSetResults(data[rule]) == true)
						RULES[i].passed = "true";
					else
						RULES[i].passed = "false";
				}

					
			}
		}	
	}
	
	
	let city = data.PROJECT.warehouse.city.name;
	let state = data.PROJECT.warehouse.state;
	
	state = state.replace('_', ' ');
	state = toTitleCase(state);
	
	let item = data.PROJECT.projectItem.name;
	
	$("#ruleManagerHeader").find('span').html("  " + city + " #" + data.PROJECT.warehouse.warehouseID  + " - " +  item +" ");


	
	$('#ruleManagerTopLevelDiv').find('ul').find('li').each(function(index) {
		$(this).css("background-color" , NO_COLOR );
		$(this).click(function(event) {
			if($(this).css("background-color") == NO_COLOR)
				return;
			displayFailedRules(this.id.replace("Item" , ""));
		});
		
		var worst = getWorstRuleResult(data , rules , this.id.replace("Item" , ""));
		switch(worst)
		{
			case "LOW":
				$(this).css("background-color" , LOW_COLOR);
				break;
			case "MEDIUM":
				$(this).css("background-color" , MEDIUM_COLOR);
				break;
			case "HIGH":
				$(this).css("background-color" , HIGH_COLOR);
				break;	 
		}
	});

	
	$('#ruleManagerDiv').show();
}


function evaluateSetResults(data)
{
	if(data.taskResults)
	{
		for(var task in data.taskResults)
		{
			if(task == "TASKS")
				continue;
			
			if(data.taskResults[task].passed == "false")
				return false;
		}
	}
	
	if(data.changeOrderResults)
	{
		for(var changeOrder in data.changeOrderResults)
		{
			if(changeOrder == "CHANGE ORDER")
				continue;
			
			if(data.changeOrderResults[changeOrder].passed == "false")
				return false;
		}
	}
	
	if(data.equipmentResults)
	{
		for(var equipment in data.equipmentResults)
		{
			if(equipment == "CHANGE ORDER")
				continue;
			
			if(data.equipmentResults[equipment].passed == "false")
				return false;
		}
	}

	return true;
}

function displayFailedRules(domain)
{
	console.log("RULEZZ" , RULES);
	$('#ruleManagerDiv').hide();
	$('#failedRulesDiv').show();
	
	var header = domain;
	if(domain == "PermitsAndInspections")
		header = "Permits/Inspections";
	if(domain == "ChangeOrders")
		header = "Change Orders";
	if(domain == "GeneralInfo")
		header = "General Information";
	
	$('#failedRulesHeader').find('span').html(header);
	
	fillFailedRulesTable(domain);
}

function fillFailedRulesTable(domain)
{
	console.log("RULES" , RULES , domain);
	if(RULES == undefined)
		return;
	
	$('#failedRulesTable').find('tbody').find('tr').remove();
	
	for(var i = 0; i < RULES.length; i++)
	{
		//console.log("RULES EYE" , RULES[i] , domain);
		if(RULES[i].domain != domain)
			continue;
		if(RULES[i].passed == "true")
			continue;
		
		
		var tr = document.createElement('tr');
		var title = document.createElement('td');
		var action = document.createElement('td');
		
		title.innerHTML = RULES[i].title;
		action.innerHTML = RULES[i].failMessage;
		
		$(tr).append(title);
		$(tr).append(action);
		
		if(RULES[i].severity == "HIGH")
			$(tr).css("background-color" , HIGH_COLOR);
		if(RULES[i].severity == "MEDIUM")
			$(tr).css("background-color" , MEDIUM_COLOR);
		if(RULES[i].severity == "LOW")
			$(tr).css("background-color" , LOW_COLOR);
		
		$('#failedRulesTable').find('tbody').append(tr);		
	}
}



function displayProjectFinder()
{
	$('#findProject').show();
	$('#ruleManagerDiv').hide();
	$('#failedRulesDiv').hide();
//	updateScore(PROJECT_DATA);
}

function displayRuleManager()
{
	$('#findProject').hide();
	$('#ruleManagerDiv').show();
	$('#failedRulesDiv').hide();
}



function getWorstRuleResult(data , rules , domain)
{
	console.log("GETTING WORST" , data, rules , domain);
	var worst;
	for(var i = 0; i < rules.length; i++)
	{

		if(rules[i].domain != domain)
			continue;
		
		if(data[rules[i].title].passed == undefined)
		{
			return getWorstSetResult(data , rules , domain);
		}	
		
		
		if(data[rules[i].title] && (data[rules[i].title].passed == "false" || data[rules[i].title].passed == undefined))
		{
			if(worst == undefined)
				worst = rules[i].severity;
			else if(worst == "LOW" && (rules[i].severity == "MEDIUM" || rules[i].severity == "HIGH"))
				worst = rules[i].severity;
			else if(worst == "MEDIUM" && rules[i].severity == "HIGH")
				return "HIGH";
			else if(worst == "HIGH" && rules[i].severity == "HIGH")
				return "HIGH";
		}
	}
	
	return worst;
}

function getWorstSetResult(data , rules , domain)
{
	console.log("GET WORST " , data , rules , domain);
	//return "LOW";
	
	var worst;
	for(var i = 0; i < rules.length; i++)
	{
		if(rules[i].domain != domain)
			continue;
		
		if(data[rules[i].title].taskResults)
		{
			console.log("IN TASK");
			for(var task in data[rules[i].title].taskResults)
			{
				console.log("IN TASK" , task);
				if(data[rules[i].title].taskResults[task].passed == "false")
				{
					if(worst == undefined)
						worst = rules[i].severity;
					else if(worst == "LOW" && (rules[i].severity == "MEDIUM" || rules[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "MEDIUM" && rules[i].severity == "HIGH")
						return "HIGH";
					else if(worst == "HIGH" && rules[i].severity == "HIGH")
						return"HIGH";
				}
			}
		}
		
		if(data[rules[i].title].changeOrderResults)
		{
			for(var changeOrder in data[rules[i].title].changeOrderResults)
			{
				if(data[rules[i].title].changeOrderResults[changeOrder].passed == "false")
				{
					if(worst == undefined)
						worst = rules[i].severity;
					else if(worst == "LOW" && (rules[i].severity == "MEDIUM" || rules[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "MEDIUM" && rules[i].severity == "HIGH")
						return "HIGH";
					else if(worst == "HIGH" && rules[i].severity == "HIGH")
						return "HIGH";
				}
			}
		}
		
		if(data[rules[i].title].equipmentResults)
		{
			for(var equipment in data[rules[i].title].equipmentResults)
			{
				if(data[rules[i].title].equipmentResults[equipment].passed == "false")
				{
					if(worst == undefined)
						worst = rules[i].severity;
					else if(worst == "LOW" && (rules[i].severity == "MEDIUM" || rules[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "MEDIUM" && rules[i].severity == "HIGH")
						return "HIGH";
					else if(worst == "HIGH" && rules[i].severity == "HIGH")
						return "HIGH";
				}
			}
		}
		
	}
	
	return worst;
	
}



//This enables the user to filter tasks based off status
$(document).on('change', '#taskSelector2', function () {
	clearTaskTable();
	fillTasksTable(tasks);
	console.log("Right here \n");
	console.log($('#taskSelector2').val());
});

/**
 * This function retrieves all of the taks from the server
 * INNER FUNCTION CALLS: fillTasksTable()
 */
function getTasks(stopServerCalls) {
	console.log(projectID);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectTasks',
			'id': projectID
		}, success: function (data) {
			console.log(data);
			let type = getParameterByName("from");
			//if(type && type == "taskForm" && !RETRIEVED_PROJECTS) getTheProjects();
			tasks = data;
			if (data) {
				clearTaskTable();
				fillTasksTable(data);
			}
			if(!stopServerCalls) getUserData();
		//	if(PAGE_ENTRY == "fromTask") getAllProjects();
		}, error: function (data) {
			alert('Server Error!');
		}
	});
}



///////////////////////////////////////////////////////////////////////////////////////////
/////////////       This begins the javascript that applies to the change order div 
///////////////////////////////////////////////////////////////////////////////////////////

var PAGETYPE = "add";

var CHANGE_ORDER_ID;

var PROJECT_DATA;
var edit_CHANGE_ORDER;


$(document).ready(function()
{
	$('#changeOrder').find('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#changeOrder').find('#saveButton > button').prop('disabled', true);

	});
	
 	$('#changeOrder').find("#proposalDate").datepicker();   
 	$('#changeOrder').find("#submittedDate").datepicker();   
 	$('#changeOrder').find("#approvedDate").datepicker();  
});

/**
 * This function gets the specific project from the database
 * INNER FUNCTION CALLS : fillsTabs_CHANGE_ORDER(), fillTabs_CHANGE_ORDER(), getTasks()
 */
function getProject_CHANGE_ORDER()
{
	console.log("P ID = ", projectID);
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
				PROJECT_DATA = data;
				setProjectHeader(data, currentDivLocation);
				console.log("PROJ DATA = ", data);
				
				if(edit_CHANGE_ORDER == 'true') {
					
					fillTabs_CHANGE_ORDER(PROJECT_DATA);
					console.log("IT WAS truuuuu");
				} 
				else {
					let mcsCO;
					if(PROJECT_DATA.changeOrders)
					{
						if(PROJECT_DATA.changeOrders.length != 0) {mcsCO = PROJECT_DATA.changeOrders.length + 1;}
						else mcsCO = 1;
					}
					else 
				    {
						mcsCO = 1;
				    }
					console.log("MCS CO = ", mcsCO);
					$('#changeOrder').find('#mcsCO').val(mcsCO);
				}
				//getTasks();

	
			}
		});
	} else {
		alert('Something went wrong');
	}
}

/**
 * This function retrives the change order drop down info from the server
 * INNER FUNCTION CALLS : fillDropdowns_CHANGE_ORDER(), getProject_CHANGE_ORDER()
 */
function getDropdownInfo_CHANGE_ORDER()
{
	//PAGETYPE = getParameterByName("type");	
	//projectID = getParameterByName("id");
	if(projectID === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
	//if(projectID !== null) {}
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',		
			'changeordertype': true,
			'changeorderstatus': true,
		},
		success: function(data)
		{
			fillDropdowns_CHANGE_ORDER(data);
			if(edit_CHANGE_ORDER == "true") getProject_CHANGE_ORDER();
			else 
			{
				clearTabs_CHANGE_ORDER();
				getProject_CHANGE_ORDER();
				
			}
		}
	});
}

/**
 * This function fills the change order tabs with the appropriate
 * data for a specific change order
 * @param the specific change order data
 */
function fillTabs_CHANGE_ORDER(json)
{
	
	console.log("EDIT == ", edit_CHANGE_ORDER);
	console.log("CHANGE ORDERS = ", PROJECT_DATA.changeOrders);
	
	var nextCOnum;
	
	if(PROJECT_DATA.changeOrders.length) nextCOnum = PROJECT_DATA.changeOrders.length;
	else nextCOnum = 1;
	
	
	var changeOrderToEdit;
	for(var i = 0; i < json.changeOrders.length; i++)
	{
		if(json.changeOrders[i].id == selectedChangeOrder)
			changeOrderToEdit = json.changeOrders[i];
	}
	console.log("CO TO EDIT = ", changeOrderToEdit);
	if(changeOrderToEdit){
	$('#changeOrder').find("#customerCO").val(changeOrderToEdit.type);
	$('#changeOrder').find("#mcsCO").val(changeOrderToEdit.mcsCO);
	$('#changeOrder').find("#subCO").val(changeOrderToEdit.subCO);
	$('#changeOrder').find("#proposalDate").val(changeOrderToEdit.proposalDate);
    formatRelativeTextAreas(changeOrderToEdit.briefDescription , "briefDescription", "changeOrder");
	$('#changeOrder').find("#briefDescription").val(changeOrderToEdit.briefDescription);
	$('#changeOrder').find("#subNames").val(changeOrderToEdit.subNames);
	
	if(changeOrderToEdit.cost) changeOrderToEdit.cost = cleanNumericValueForDisplaying(changeOrderToEdit.cost);
	$('#changeOrder').find("#cost").val(changeOrderToEdit.cost);
	
	if(changeOrderToEdit.sell) changeOrderToEdit.sell = cleanNumericValueForDisplaying(changeOrderToEdit.sell);
	$('#changeOrder').find("#sell").val(changeOrderToEdit.sell);
	
	$('#changeOrder').find("#status").val(changeOrderToEdit.status);
	//$('#changeOrder').find("#submittedTo").val(changeOrderToEdit.submittedTo);
	$('#changeOrder').find("#submittedDate").val(changeOrderToEdit.submittedDate);
	$('#changeOrder').find("#approvedDate").val(changeOrderToEdit.approvedDate);
    formatRelativeTextAreas(changeOrderToEdit.notes , "notes", "changeOrder");
	$('#changeOrder').find("#notes").val(changeOrderToEdit.notes);
	$('#changeOrder').find('#title').val(changeOrderToEdit.title);
	$('#changeOrder').find('#invoiceNumber').val(changeOrderToEdit.invoiceNumber);
	$('#changeOrder').find('#customerCOPnum').val(changeOrderToEdit.customerCOPnum);

	
	}
}

/**
 * This function makes a number more computer friendly by removing commas
 *
 * @param a number
 * @returns computer friendly number
 */
function cleanNumericValueForSaving(num)
{
	while(num.indexOf(",") != -1) {
		num = num.replace(",","");
	}
	return num;
}

/**
 * This function makes a number more human friendly by adding commas and by adding a 0 to the decimal
 * Example : instead of 123456.7 being displayed, this method turns it into 123,456.70
 * @param a number
 * @returns human friendly number
 */
function cleanNumericValueForDisplaying(num)
{
	//console.log("BEFORE: ", num);
	var str = num.toString();
	
	var price, cleanPrice;
	var dollars, cleanDollars;
	var dollarArray = new Array();
	var correctOrder = "";
	var cents, cleanCents;
    
	if(str.indexOf(".") != -1) 
	{
		price = str.split(".");
		//console.log("PRICE = ", price);
		dollars = price[0];
		cents = price[1];
		if(cents.length == 1) cleanCents = cents + "0";
		else cleanCents = cents;
		var commaCount = 0;
		for(var i = dollars.length - 1; i > -1; i--)
		{
			commaCount++;
			dollarArray.push(dollars[i]);
			if(commaCount % 3 == 0 && i != 0) dollarArray.push("-");
		}
		
		cleanDollars = dollarArray.toString();
		while(cleanDollars.indexOf(",") != -1) {
			cleanDollars = cleanDollars.replace(",","");
		}
		
		while(cleanDollars.indexOf("-") != -1) {
			cleanDollars = cleanDollars.replace("-",",");
		}
		
		for(var i = cleanDollars.length -1; i > -1; i--) {
			correctOrder += cleanDollars[i];
		}
		
		cleanPrice = correctOrder + "." + cleanCents;
		//console.log("AFTER: ", cleanPrice);
		return cleanPrice;
	} 
	else
	{

		var commaCount = 0;
		for(var i = str.length - 1; i > -1; i--)
		{
			commaCount++;
			dollarArray.push(str[i]);
			if(commaCount % 3 == 0 && i != 0) dollarArray.push("-");
		}
		//console.log("D ARRAY = ", dollarArray);
		cleanDollars = dollarArray.toString();

		while(cleanDollars.indexOf(",") != -1) {
			cleanDollars = cleanDollars.replace(",","");
		}
		
		//console.log("CLEAN DOLLARS = ", cleanDollars);
		
		while(cleanDollars.indexOf("-") != -1) {
		cleanDollars = cleanDollars.replace("-",",");
		}
		
		
		for(var i = cleanDollars.length -1; i > -1; i--) {
			correctOrder += cleanDollars[i];
		}
		
		cleanPrice = correctOrder;
		//console.log("AFTER: ", cleanPrice);
		return cleanPrice;
		
	}
	
}

/**
 * This function clears the change order tabs of their values
 */
function clearTabs_CHANGE_ORDER(){
	
	$('#changeOrder').find("#customerCO").val("");
	$('#changeOrder').find("#mcsCO").val("");
	$('#changeOrder').find("#subCO").val("");
	$('#changeOrder').find("#proposalDate").val("");
	$('#changeOrder').find("#briefDescription").val("");
	$('#changeOrder').find("#subNames").val("");
	$('#changeOrder').find("#cost").val("");
	$('#changeOrder').find("#sell").val("");
	$('#changeOrder').find("#status").val("");
	$('#changeOrder').find("#submittedTo").val("");
	$('#changeOrder').find("#submittedDate").val("");
	$('#changeOrder').find("#approvedDate").val("");
	$('#changeOrder').find("#notes").val("");
	$('#changeOrder').find("#title").val("");
	$('#changeOrder').find("#invoiceNumber").val("");
}

/**
 * This function converts a change order attribute id and returns the String value
 * @param change order attribute
 * @returns the change order type
 */
function convert_CHANGE_ORDER(param)
{
	switch(param)
	{
		case "1":
			return "COP";
		case "2":
			return "REF";
		case "3":
			return "WHS";
		case "4": 
			return "FAC";
		case "5":
			return "VEN";
		case "6":
		default:
			return "UDF";
	}	
}

/**
 * This function fills the drop down selectors for the change order interface
 * @param a json containing all of the possible changeorder attributes along with each potential
 * attribute value
 * INNER FUNCTION CALLS: 
 */
function fillDropdowns_CHANGE_ORDER(json)
{
	console.log(json);
	var changeorderStatus = JSON.parse(json["changeorderstatus"]);
	changeorderStatus = sortChangeOrderStatus(changeorderStatus);
	var d = document.createDocumentFragment();
	$('#changeOrder').find('#status').empty();
	$('#changeOrder').find('#customerCO').empty();
	
	for(var i = 0; i < changeorderStatus.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = changeorderStatus[i].name;
		option.setAttribute("value", changeorderStatus[i].id);
		d.appendChild(option);
	}
	$('#changeOrder').find("#status").append(d);
	
	var changeorderType = JSON.parse(json["changeordertype"]);
	d = document.createDocumentFragment();
	for(var i = 0; i < changeorderType.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = changeorderType[i].name;
		option.setAttribute("value", changeorderType[i].id);
		d.appendChild(option);
	}
	$('#changeOrder').find("#customerCO").append(d);
}

/**
  * This function sorts the change order status drop down into the logical Miller order
 * @param a json containing all of the possible changeorder statuses along with each potential
 * attribute value
 * INNER FUNCTION CALLS: NONE
 */
function sortChangeOrderStatus(json)
{
	console.log("JSONNNN == ", json);
	let tmp = json.slice(0);
		
	tmp[0] = json[4];
	tmp[1] = json[2];
	tmp[2] = json[5];
	tmp[3] = json[0];
	tmp[4] = json[3];
	tmp[5] = json[1];
   
	return tmp;
	
}

/**
 * This function saves a project with the current chnage order values
 * INNER FUNCTION CALLS: goToProjectManager()
 */
function saveProject_CHANGE_ORDER()
{
	console.log("saving project");
	
	var proposalDate = $('#changeOrder').find("#proposalDate").val();
	var submittedDate = $('#changeOrder').find("#submittedDate").val();
	var approvedDate = $('#changeOrder').find("#approvedDate").val();
	
	var customerCO = $('#changeOrder').find("#customerCO").val();
	var mcsCO = $('#changeOrder').find("#mcsCO").val();

	var subCO = $('#changeOrder').find("#subCO").val();
	var subNames = $('#changeOrder').find("#subNames").val();
	var status = $('#changeOrder').find("#status").val();
	
	var briefDescription = $('#changeOrder').find("#briefDescription").val();
	var notes = $('#changeOrder').find("#notes").val();
	var title = $('#changeOrder').find('#title').val();
	
	var cost = $('#changeOrder').find("#cost").val();
	if(cost) {cost = cleanNumericValueForSaving($('#changeOrder').find("#cost")[0].value); cost = parseFloat(cost);}
	
	var sell = $('#changeOrder').find("#sell").val();
	if(sell) {sell = cleanNumericValueForSaving($('#changeOrder').find("#sell")[0].value); sell = parseFloat(sell);}
	
	var invoiceNumber = $('#changeOrder').find("#invoiceNumber").val();
	var customerCOPnum = $('#changeOrder').find("#customerCOPnum").val();
	
	var dates = [proposalDate, submittedDate, approvedDate];
	
	var action = "addChangeOrder";
	if(edit_CHANGE_ORDER == 'true')
		action = "editChangeOrder";
	
	if(isValidInput_CHANGE_ORDER(dates))
		for(var i = 0; i < dates.length; i++) {
			if(dates[i]) dates[i] = dateCleaner(dates[i]);
			if(i == 0) proposalDate = dates[i];
			if(i == 1) submittedDate = dates[i];
			if(i == 2) approvedDate = dates[i];
		}
	
	if(action == "editChangeOrder" && (!CHANGE_ORDER_ID || !projectID)) {
		console.log("Change Order ID: ", CHANGE_ORDER_ID, "Project ID: ", projectID);
		alert("Server Error! (Edit Change Order)");
		return;
	}
	
	if(action == "addChangeOrder" && !projectID) {
		console.log("Change Order ID: ", CHANGE_ORDER_ID, "Project ID: ", projectID);
		alert("Server Error! (Add Change Order)");
		return;
	}
	
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				
				'projectID': projectID,
				'changeOrderID': CHANGE_ORDER_ID,
				'proposalDate': proposalDate,
				'submittedDate': submittedDate,
				'approvedDate': approvedDate,
				'customerCO': customerCO,
				'mcsCO': mcsCO,
				'subCO': subCO,
				'subNames': subNames,
				'status': status,
				'briefDescription': briefDescription,
				'notes': notes,
				'cost': cost,
				'sell': sell,
				'title':title,
				'invoiceNumber' : invoiceNumber,
				'customerCOPnum' : customerCOPnum ,
			},
			success:function(data){
				
				alert('Saved Change Order');
				goToProjectManager();
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);
				

				console.log(data);
			},
			error: function(data)
			{
				alert('Saved Change Order');
				goToProjectManager();
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);
				
			}
		});
		
		
}
/**
 * This function checks to see if the entered date is in valid form
 * @param an array of dates
 * @returns true if the date is valid / false if not
 */
function isValidInput_CHANGE_ORDER(dates)
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

/**
 * This function displays the change order div along with if the user
 * is creating a new change order or if editing an old one
 * INNER FUNCTION CALLS: clearTabs_CHANGE_ORDER(), getDropdownInfo_CHANGE_ORDER()
 * @returns
 */
function goToChangeOrder(edit){
	clearTabs_CHANGE_ORDER();
	$('.editProject').hide();
	$('#changeOrder').show();
	$('#changeOrderInfo').addClass('active');
	setCurrentDivLocation('changeOrder');
	console.log("EDIT = ", edit);
	if(edit == 0) {
		edit_CHANGE_ORDER = 'false';		
		$('#deleteChangeOrderButton').hide();

	}
	else {
		edit_CHANGE_ORDER = 'true';
		$('#deleteChangeOrderButton').show();
	}
	
	
	getDropdownInfo_CHANGE_ORDER();
}

/**
 * This function deletes the selected change order from the database
 * INNER FUNCTION CALLS: goToProjectManager()
 * @returns
 */
function deleteChangeOrder() {
	if(!confirm("Are you sure you want to permanently delete the change order from the database?")) return;
	
	
	console.log("PROJECT = ", PROJECT_DATA);
	for(var i = 0; i < PROJECT_DATA.changeOrders.length; i++) {
		if(PROJECT_DATA.changeOrders[i].id == selectedChangeOrder){
			console.log("CHANGE ORDER FOUNDDDD");
			PROJECT_DATA.changeOrders.splice(i, 1);
			console.log(PROJECT_DATA, "PROJ ID = ", projectID);
			break;
		}
	}
	
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'changeorder',
			'action': 'deleteChangeOrder',
			'projectID': projectID,
			'changeOrderID': selectedChangeOrder

		},
		complete:function(data){
			console.log("Response From Change Order Deletion", data);
			alert('Deleted Change Order');
			goToProjectManager();
			//$('#changeOrder').find('#saveButton > button').prop('disabled', false);

			//console.log(data);
		}
	});
	
	
}
/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

/**
 * This function alters how a change order is displayed in the changeOrderTable
 * @param a td element
 */
function toggleChangeOrder (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editChangeOrder').prop('disabled', false);
	selectedChangeOrder = $(source).attr('value');
	CHANGE_ORDER_ID = selectedChangeOrder;
}

function changeOrderReport () {
	window.location.href = "Report?" + 'id=' + projectID + "&type=Change Order Report";
}

//
//
/// THIS ENDS THE JAVASCRIPT FOR changeOrderData.js
//
//



//////////////////////////////////////////////////////////////////////////////////

//Equipment Code

$(document).ready(function()
{
	$('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#saveButton > button').prop('disabled', true);

	});
	
 	$('#equipmentForm #estDeliveryDate').datepicker();   
 	$('#equipmentForm #deliveryDate').datepicker(); 
 	$('#equipmentForm #orderedDate').datepicker();   

});

function getDropdownInfo_EQUIP()
{
	//PAGETYPE_EQUIP = getParameterByName("type");	
	//projectID_EQUIP = getParameterByName("id");
	if(projectID_EQUIP === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
	//if(projectID !== null) {}
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',		
			'equipmentvendor': true,
			'equipmentstatus' : true
		},
		success: function(data)
		{
			fillDropdowns_EQUIP(data);
			getProject_EQUIP();
		}
	});
}

function getProject_EQUIP()
{
	console.log(getParameterByName("id"));
	if(projectID_EQUIP !== null) {	
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': projectID_EQUIP,
				
			},
			success: function(data)
			{
				PROJECT_DATA_EQUIP = (data);
				setProjectHeader(data , currentDivLocation , 'projectManager');
				
				if(PAGETYPE_EQUIP == 'edit')
				{
					$('#equipmentForm #poNum').val('');
					//EQUIPMENT_ID_EQUIP = getParameterByName("equipmentID");
					PROJECT_DATA_EQUIP = data;
					fillTabs_EQUIP(PROJECT_DATA_EQUIP);
					
				}
				//getTasks();
			}
		});
	} else {
		alert('Something went wrong');
	}
}


function fillDropdowns_EQUIP(json)
{
	
	$('#equipmentForm').find('#supplier').find('option').remove();

	console.log(json);
	var equipmentVendor = JSON.parse(json["equipmentvendor"]);
	var d = document.createDocumentFragment();
	
	var option = document.createElement("option");
	option.innerHTML = "--Select Supplier--";
	option.setAttribute("value", "default");
	d.appendChild(option);
	
	for(var i = 0; i < equipmentVendor.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = equipmentVendor[i].name;
		//option.setAttribute("value", equipmentVendor[i].name);
		option.setAttribute("value", equipmentVendor[i].id);
		d.appendChild(option);
	}
	$("#equipmentForm #supplier").append(d);
	
	$('#equipmentForm').find('#deliveryStatusEquipment').find('option').remove();

	console.log(json);
	var equipmentDeliveryStatus = JSON.parse(json["equipmentstatus"]);
	var d = document.createDocumentFragment();
	
	var option = document.createElement("option");
	option.innerHTML = "--Select Delivery Status--";
	option.setAttribute("value", "default");
	d.appendChild(option);
	
	for(var i = 0; i < equipmentDeliveryStatus.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = equipmentDeliveryStatus[i].name;
//		option.setAttribute("value", equipmentDeliveryStatus[i].name);
		option.setAttribute("value", equipmentDeliveryStatus[i].id);

		d.appendChild(option);
	}
	$("#equipmentForm #deliveryStatusEquipment").append(d);
	
	
}

function fillTabs_EQUIP(json)
{	
	console.log("EQUIP JSON: " , json);
	console.log("EQUIP SELECT: " , EQUIPMENT_ID_EQUIP);

	var equipmentToEdit;
	for(var i = 0; i < json.projEquipment.length; i++)
		if(json.projEquipment[i].id == EQUIPMENT_ID_EQUIP)
			equipmentToEdit = json.projEquipment[i];
	
	console.log(equipmentToEdit);
	$('#equipmentForm #poNum').val(equipmentToEdit.poNum);
	$('#equipmentForm #equipmentName').val(equipmentToEdit.equipmentName);
	//$('#equipmentForm #supplier').val(equipmentToEdit.vendor);
	
	if(equipmentToEdit.eqSupplier)
		$('#equipmentForm #supplier').val(equipmentToEdit.eqSupplier.id);
	else
		$('#equipmentForm #supplier').val("default");
	
	$('#equipmentForm #estDeliveryDate').val(equipmentToEdit.estDeliveryDate);
	$('#equipmentForm #deliveryDate').val(equipmentToEdit.deliveryDate);
	$('#equipmentForm #orderedDate').val(equipmentToEdit.orderedDate);
	$('#equipmentForm #notes').val(equipmentToEdit.notes);
	//$('#equipmentForm #deliveryStatusEquipment').val(equipmentToEdit.deliveryStatus);
	if(equipmentToEdit.eqStatus)
		$('#equipmentForm #deliveryStatusEquipment').val(equipmentToEdit.eqStatus.id);
	else
		$('#equipmentForm #deliveryStatusEquipment').val("default");
	$('#equipmentForm #providerName').val(equipmentToEdit.providerName);
	$('#equipmentForm #equipmentDescription').val(equipmentToEdit.description);
}

function saveProject_EQUIP()
{
	var poNum = $('#equipmentForm #poNum').val();
	var equipmentName = $('#equipmentForm #equipmentName').val();
	var equipmentDescription = $('#equipmentForm #equipmentDescription').val();
	var supplier = $('#equipmentForm #supplier').val();
	var deliveryDate = $('#equipmentForm #deliveryDate').val();
	var estDeliveryDate = $('#equipmentForm #estDeliveryDate').val();
	var orderedDate = $('#equipmentForm #orderedDate').val();
	var notes = $('#equipmentForm #notes').val();
	var deliveryStatus = $('#equipmentForm #deliveryStatusEquipment').val();
	
	var dates = [deliveryDate, estDeliveryDate];
	var action = 'addEquipment';
	if(PAGETYPE_EQUIP == 'edit')
		action = 'editEquipment';
	
	// TODO: Required Fields?
	if(isValidInput_EQUIP(dates))
	{
		$.ajax({
			type: 'POST',
			url: 'Project',
			data:
			{
				'domain': 'project',
				'projectID': projectID_EQUIP,
				'equipmentID': EQUIPMENT_ID_EQUIP,
				'action': action,
				'poNum': poNum,
				'equipmentName': equipmentName,
				'equipmentDescription' : equipmentDescription,
				'vendor': supplier,
				'deliveryDate': deliveryDate,
				'estDeliveryDate': estDeliveryDate,
				'orderedDate' : orderedDate,
				'notes': notes,
				'deliveryStatus' : deliveryStatus,
			},
			success:function(data){
				alert('Saved Equipment');
				$('#saveButton > button').prop('disabled', false);
				console.log(data);
				goToProjectManager();
			},
			error: function()
			{
				alert('Saved Equipment');
				$('#saveButton > button').prop('disabled', false);
				goToProjectManager();
			}
		});
	}
}

function isValidInput_EQUIP(dates)
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

function returnToProjectManager_EQUIP () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}

function clearEquipmentFormValues() {
	$('#equipmentForm').find('.equipment-input').val('');
	$('#equipmentForm').find('.equipment-select').val('default');
}

function deleteEquipment() {
	if(!selectedEquipment || !PROJECT_DATA) {
		alert("No equipment selected to delete!");
		return;
	}
	
	if(!confirm("Are you sure you want to delete this equipment?"))
		return;
	
	console.log("SELECTED EQUIPMENT " , selectedEquipment , PROJECT_DATA);

	$.ajax({
		type: 'POST',
		url: 'Project',
		data:
		{
			'action' : 'deleteEquipment' ,
			'equipmentID' : selectedEquipment ,
			'projectID' : PROJECT_DATA.id ,
		},
		success:function(data){
			alert('Deleted Equipment');
			goToProjectManager();
		},
		error: function(data)
		{
			console.log("DATA = " , data);
			alert('Deleted Equipment');
			goToProjectManager();
		}
	});

	
	
}

function toggleTaskAssignee() {
	if(taskAssigneeType == TASK_EMPLOYEE_ASSIGNEE) {
		taskAssigneeType = TASK_SUB_ASSIGNEE;
		$('#taskCreationZone').find('#employeeAssigneeTableElement').hide();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').show();
		document.getElementById('toggleTaskAssignee').innerHTML = "Assign to Employee";
		document.getElementById('toggleTaskAssignee').value = TASK_SUB_ASSIGNEE;

	}
	else {
		taskAssigneeType = TASK_EMPLOYEE_ASSIGNEE;
		$('#taskCreationZone').find('#employeeAssigneeTableElement').show();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').hide();
		document.getElementById('toggleTaskAssignee').innerHTML = "Assign to Subcontractor";
		document.getElementById('toggleTaskAssignee').value = TASK_EMPLOYEE_ASSIGNEE;

	}
}


//Navigational 

/**
 * This function makes the findProject div visible and hides all other divs
 * INNER FUNCTION CALLS: none
 * @returns
 */
function goToFindProject() {
	clearPermitsAndInspectionsOverview();
	updateFrontEnd();
	switch(currentDivLocation){
		case "projectData":
			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('.nav-tabs > li.active').removeClass('active');
			$('#projectData').find('#generalInformation').addClass('active');
			$('#projectData').find('#generalInformationTabLink').addClass('active');			
			break;
		case "permitData":
			$('#permitData').find('.info-tab').removeClass('active');
			$('#permitData').find('.nav-tabs > li.active').removeClass('active');
			$('#permitData').find('#buildingPermit').addClass('active');
			$('#permitData').find('#buildingPermits').addClass('active');
			break;
		case "closeoutData":
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('.nav-tabs > li.active').removeClass('active');
			$('#closeoutData').find('#closeout').addClass('active');
			$('#closeoutData').find('#closeoutDocuments').addClass('active');
			break;
		case "projectManager":
			$('#projectManager').find('.info-tab').removeClass('active');
			$('#projectManager').find('.nav-tabs > li.active').removeClass('active');
			$('#projectManager').find('#projectInformation').addClass('active');
			$('#projectManager').find('#projectInformationTabLink').addClass('active');
			break;
		case "changeOrder":
			$('#changeOrder').find('.info-tab').removeClass('active');
			$('#changeOrder').find('.nav-tabs > li.active').removeClass('active');
			$('#changeOrder').find('#changeOrderInfo').addClass('active');
			$('#changeOrder').find('#changeOrderTab').addClass('active');
			$('#projectManager').find('.info-tab').removeClass('active');
			$('#projectManager').find('.nav-tabs > li.active').removeClass('active');
			$('#projectManager').find('#changeOrders').addClass('active');
			$('#projectManager').find('#changeOrdersTabLink').addClass('active');
			break;
		
	}
	$(".editProject").hide();
	$("#findProject").show();
	
	
	
}

/**
 * This function makes the projectManager div visible while hiding the remaining divs
 * It also manages the activeness of the info-tabs
 * INNER FUNCTION CALLS: setCurrentDivLocation()
 * @returns
 */
function goToProjectManager() {
	
	$(".editProject").hide();
	$("#projectManager").show();
	
	console.log("GTPM CURRENT LOCATION = ", currentDivLocation);
	switch(currentDivLocation){
		case "projectData":
			getProject_PROJECT_MANAGER(projectID , 1);
			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('.nav-tabs > li.active').removeClass('active');
			$('#projectData').find('#generalInformation').addClass('active');
			$('#projectData').find('#generalInformationTabLink').addClass('active');
			$('#projectManager').find('#projectInformationTabLink').addClass('active');
			$('#projectManager').find('#projectInformation').addClass('active');
			break;
		case "permitData":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#permitData').find('.info-tab').removeClass('active');
			$('#permitData').find('.nav-tabs > li.active').removeClass('active');
			let activeTab = $('#projectManager').find('.nav-tabs > li.active').id;
			$('#permitData').find('#buildingPermit').addClass('active');
			$('#permitData').find('#buildingPermits').addClass('active');
			$('#projectManager').find('#permits').addClass('active');
			$('#projectManager').find('#'+activeTab).addClass('active');
			break;
		case "closeoutData":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('.nav-tabs > li.active').removeClass('active');
			$('#closeoutData').find('#closeout').addClass('active');
			$('#closeoutData').find('#closeoutDocuments').addClass('active');
			$('#projectManager').find('#closeoutTabLink').addClass('active');
			$('#projectManager').find('#closeout').addClass('active');
			break;
		case "changeOrder":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#changeOrder').find('.info-tab').removeClass('active');
			$('#changeOrder').find('.nav-tabs > li.active').removeClass('active');
			$('#changeOrder').find('#changeOrderTab').addClass('active');
			$('#changeOrder').find('#changeOrderInfo').addClass('active');
			$('#projectManager').find('.nav-tabs > li.active').removeClass('active');
			$('#projectManager').find('#changeOrdersTabLink').addClass('active');
			$('#projectManager').find('#changeOrders').addClass('active');
			$('#projectManager').find('#editChangeOrder').prop('disabled', true);
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('.nav-tabs > li.active').removeClass('active');
			$('#closeoutData').find('#closeout').addClass('active');
			$('#closeoutData').find('#closeoutDocuments').addClass('active');
			$('#projectData').find('#generalInformation').addClass('active');
			$('#saveButton').removeClass('active');
			break;
		case "equipmentDiv":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#equipment').addClass('active');
			break;
			
	}
	
	setCurrentDivLocation('projectManager');
}

/**
 * This function sets the current div location so we know what to display
 * INNER FUNCTION CALLS: none
 */
function setCurrentDivLocation(location) {
	currentDivLocation = location;
	console.log("LOCATION = ", location);
}

/**
 * This function converts the current Div Location in order to display a proper header
 * INNER FUNCTION CALLS: none
 */
function convertCurrentDivLocation (currentDivLocation){
	console.log("CURRENT DIV: ", currentDivLocation);
	switch(currentDivLocation) {
		case "projectManager":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Project Manager <small id='projectHeader'>---</small></p>");
			break;
		case "projectData":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Project Editor <small id='projectHeader'>---</small></p>");
			break;
		case "permitData":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Permit & Inspection Editor <small id='projectHeader'>---</small></p>");
			break;
		case "closeoutData":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Closeout Editor <small id='projectHeader'>---</small></p>");
			break;
		case "changeOrder":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Change Order <small id='projectHeader'>---</small></p>");
			break;
		case "equipmentDiv":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Equipment <small id='projectHeader'>---</small></p>");
			break;
	}
}

/**
 * This function updates all of the data on the front end
 * ----------CURRENTLY THIS FUNCTION DOES NOTHING ---------
 * INNER FUNCTION CALLS: none
 */
function updateProjectManager() {
	if(currentDivLocation == 'projectData'){
		
		
	}else if(currentDivLocation == 'permitData'){
		
	}else if(currentDivLocation == 'closeoutData'){
		
	} else {
		console.log("Not Prepared for this div location!");
	}
}

/**
 * This function is used in projects.html in order to properly prepare
 * which div will be displayed along with which features to make available
 * INNER FUNCTION CALLS: getParameterByName(), getProject_PROJECT_MANAGER(), getAllProjects()
 */
function preparePage() {
	
	let id = getParameterByName("id");
	let from = getParameterByName("from");
	let type = getParameterByName("type");

	$('#findProject').hide();
	$('.editProject').hide();

	if(id){ 
		projectID = id;
		EDIT_INTENTION = true;
		console.log("PROJECT ID = ", id);
		currentDivLocation = "projectManager";
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'getSpecificObjects',		
				'changeordertype': true,
			},
			success: function(data)
			{
				CHANGE_ORDER_TYPES = JSON.parse(data.changeordertype);
				console.log("CO TYPES = " , CHANGE_ORDER_TYPES);
				getProject_PROJECT_MANAGER(id);
				$('#projectManager').show();
				$('.projectNavigator-projectManager').show();
				PAGE_ENTRY = "fromTask";
				if(from) {
					PAGE_ENTRY = from;
				}
			}
		
		});
		
	
		
	} else {
		$('.projectNavigator').show();
		$('.projectNavigator-projectFinder').hide();
		//getAllProjects();
		getTheProjects();
		$('#findProject').show();
	}
}











