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
 * projectData/closeoutData.js 					23      THRU     957
 * projectData/permitData.js					961     THRU     1419
 * projectData.js								1420    THRU     2000
 * projectManager.js							2001    THRU     2679
 * findProject.js 								2683	THRU     3800
 * projectData/changeOrderData.js				3801	TRHU	 4019
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
	    $('#closeoutData').find("#plumbingDate").datepicker();
	    $('#closeoutData').find("#sprinkleDate").datepicker();
	    $('#closeoutData').find("#roofingDate").datepicker();
	    $('#closeoutData').find("#HTIDate").datepicker();
	    $('#closeoutData').find("#otherFinalLiensDate").datepicker();
	    
	    	// Final Inspections //Move other fields here from above
	    $('#closeoutData').find("#tmpCertificateDate").datepicker();
	    $('#closeoutData').find("#mechFinalDate").datepicker();
	    $('#closeoutData').find("#elecFinalDate").datepicker();
	    $('#closeoutData').find("#plumbingFinalDate").datepicker();
	    $('#closeoutData').find("#sprinkleFinalDate").datepicker();
	    $('#closeoutData').find("#certificateDate").datepicker();
	    $('#closeoutData').find("#buildingPermitCL").datepicker();
	    
	    
	        // Warranty Letters
	    $('#closeoutData').find("#GCWarrantyDate").datepicker();
	    $('#closeoutData').find("#mechanicalWarrantyDate").datepicker();
	    $('#closeoutData').find("#electricalWarrantyDate").datepicker();
	    $('#closeoutData').find("#plumbingWarrantyDate").datepicker();
	    $('#closeoutData').find("#sprinkleWarrantyDate").datepicker();
	    $('#closeoutData').find("#roofingWarrantyDate").datepicker();
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
		$('#closeoutData').find("#closeoutNotes").val(json.closeoutDetails.closeoutNotes);
		
		$('#closeoutData').find("#buildingPermitCL").val(json.closeoutDetails.buildingPermitCL);
		$('#closeoutData').find("#closeoutPhotosCL").val(json.closeoutDetails.closeoutPhotosCL);
		$('#closeoutData').find("#MCSWarranty").val(json.closeoutDetails.mCSWarranty);
		$('#closeoutData').find("#equipmentSubCL").val(json.closeoutDetails.equipmentSubCL);
		$('#closeoutData').find("#traneCL").val(json.closeoutDetails.traneCL);

		$('#closeoutData').find("#numOfChangeOrders").val(json.closeoutDetails.numOfChangeOrders);
		$('#closeoutData').find("#numOfChangeOrdersCompleted").val(json.closeoutDetails.numOfChangeOrdersCompleted);
		
		$('#closeoutData').find("#numOfMCSChangeOrders").val(json.closeoutDetails.numOfMCSChangeOrders);
		$('#closeoutData').find("#numOfMCSChangeOrdersCompleted").val(json.closeoutDetails.numOfMCSChangeOrdersCompleted);
		
		$('#closeoutData').find("#tmpCertificateStatus").val(json.closeoutDetails.tmpCertificateStatus);
		$('#closeoutData').find("#tmpCertificateDate").val(json.closeoutDetails.tmpCertificateDate);
		
		$('#closeoutData').find("#mechFinalStatus").val(json.closeoutDetails.mechFinalStatus);
		$('#closeoutData').find("#mechFinalDate").val(json.closeoutDetails.mechFinalDate);
		
		$('#closeoutData').find("#elecFinalNotes").val(json.closeoutDetails.elecFinalNotes);
		$('#closeoutData').find("#elecFinalDate").val(json.closeoutDetails.elecFinalDate);
		$('#closeoutData').find("#elecFinalStatus").val(json.closeoutDetails.elecFinalStatus);
		
		$('#closeoutData').find("#plumbingFinalStatus").val(json.closeoutDetails.plumbingFinalStatus);
		$('#closeoutData').find("#plumbingFinalDate").val(json.closeoutDetails.plumbingFinalDate);
		
		$('#closeoutData').find("#sprinkleFinalStatus").val(json.closeoutDetails.sprinkleFinalStatus);
		$('#closeoutData').find("#sprinkleFinalDate").val(json.closeoutDetails.sprinkleFinalDate);
		
		$('#closeoutData').find("#certificateStatus").val(json.closeoutDetails.certificateStatus);
		$('#closeoutData').find("#certificateDate").val(json.closeoutDetails.certificateDate);
		
		$('#closeoutData').find("#buildFinalStatus").val(json.closeoutDetails.buildingFinalStatus);
		
		$('#closeoutData').find("#equipmentSubmittalStatus").val(json.closeoutDetails.equipmentSubmittalStatus);
		
		$('#closeoutData').find("#manualStatus").val(json.closeoutDetails.manualStatus);
		$('#closeoutData').find("#manualDate").val(json.closeoutDetails.manualDate);
		
		$('#closeoutData').find("#punchListStatus").val(json.closeoutDetails.punchListStatus);
		
		$('#closeoutData').find("#asBuiltDrawingsStatus").val(json.closeoutDetails.asBuiltDrawingsStatus);
		
		$('#closeoutData').find("#closeOutPhotosStatus").val(json.closeoutDetails.closeOutPhotosStatus);
		
		$('#closeoutData').find("#HVACstartupFormStatus").val(json.closeoutDetails.HVACstartupFormStatus);
		$('#closeoutData').find("#HVACstartupFormDate").val(json.closeoutDetails.HVACstartupFormDate);
		
		$('#closeoutData').find("#alarmFormStatus").val(json.closeoutDetails.alarmFormStatus);
		
		$('#closeoutData').find("#verisaeReportStatus").val(json.closeoutDetails.verisaeReportStatus);
		
		$('#closeoutData').find("#MCSWarrantyStatus").val(json.closeoutDetails.MCSWarrantyStatus);
		
		$('#closeoutData').find("#GCWarrantyStatus").val(json.closeoutDetails.GCWarrantyStatus);
		$('#closeoutData').find("#GCWarrantyDate").val(json.closeoutDetails.GCWarrantyDate);
		
		$('#closeoutData').find("#mechanicalWarrantyStatus").val(json.closeoutDetails.mechanicalWarrantyStatus);
		$('#closeoutData').find("#mechanicalWarrantyDate").val(json.closeoutDetails.mechanicalWarrantyDate);
		
		$('#closeoutData').find("#electricalWarrantyStatus").val(json.closeoutDetails.electricalWarrantyStatus);
		$('#closeoutData').find("#electricalWarrantyDate").val(json.closeoutDetails.electricalWarrantyDate);
		
		$('#closeoutData').find("#plumbingWarrantyStatus").val(json.closeoutDetails.plumbingWarrantyStatus);
		$('#closeoutData').find("#plumbingWarrantyDate").val(json.closeoutDetails.plumbingWarrantyDate);
		
		$('#closeoutData').find("#sprinkleWarrantyStatus").val(json.closeoutDetails.sprinkleWarrantyStatus);
		$('#closeoutData').find("#sprinkleWarrantyDate").val(json.closeoutDetails.sprinkleWarrantyDate);
		
		$('#closeoutData').find("#roofingWarrantyStatus").val(json.closeoutDetails.roofingWarrantyStatus);
		$('#closeoutData').find("#roofingWarrantyDate").val(json.closeoutDetails.roofingWarrantyDate);
		
		$('#closeoutData').find("#HTIWarrantyStatus").val(json.closeoutDetails.HTIWarrantyStatus);
		$('#closeoutData').find("#HTIWarrantyDate").val(json.closeoutDetails.HTIWarrantyDate);
		
		$('#closeoutData').find("#otherWarrantyStatusA").val(json.closeoutDetails.otherWarrantyStatusA);
		$('#closeoutData').find("#otherWarrantyDateA").val(json.closeoutDetails.otherWarrantyDateA);
		
		$('#closeoutData').find("#otherWarrantyStatusB").val(json.closeoutDetails.otherWarrantyStatusB);
		$('#closeoutData').find("#otherWarrantyDateB").val(json.closeoutDetails.otherWarrantyDateB);
		
		$('#closeoutData').find("#MCSStatus").val(json.closeoutDetails.MCSStatus);
		$('#closeoutData').find("#MCSDate").val(json.closeoutDetails.MCSDate);
		
		$('#closeoutData').find("#GCStatus").val(json.closeoutDetails.GCStatus);
		$('#closeoutData').find("#GCDate").val(json.closeoutDetails.GCDate);
		
		$('#closeoutData').find("#mechanicalStatus").val(json.closeoutDetails.mechanicalStatus);
		$('#closeoutData').find("#mechanicalDate").val(json.closeoutDetails.mechanicalDate);
		
		$('#closeoutData').find("#electricalStatus").val(json.closeoutDetails.electricalStatus);
		$('#closeoutData').find("#electricalDate").val(json.closeoutDetails.electricalDate);
		
		$('#closeoutData').find("#plumbingStatus").val(json.closeoutDetails.plumbingStatus);
		$('#closeoutData').find("#plumbingDate").val(json.closeoutDetails.plumbingDate);
		
		$('#closeoutData').find("#sprinkleStatus").val(json.closeoutDetails.sprinkleStatus);
		$('#closeoutData').find("#sprinkleDate").val(json.closeoutDetails.sprinkleDate);
		
		$('#closeoutData').find("#roofingStatus").val(json.closeoutDetails.roofingStatus);
		$('#closeoutData').find("#roofingDate").val(json.closeoutDetails.roofingDate);
		
		$('#closeoutData').find("#HTIStatus").val(json.closeoutDetails.HTIStatus);
		$('#closeoutData').find("#HTIDate").val(json.closeoutDetails.HTIDate);
		
		$('#closeoutData').find("#otherFinalLiensStatus").val(json.closeoutDetails.otherFinalLeinsStatus);
		$('#closeoutData').find("#otherFinalLiensDate").val(json.closeoutDetails.otherFinalLeinsDate);
		
		$('#closeoutData').find("#mg2CompletionDate").val(json.closeoutDetails.mg2CompletionDate);
		$('#closeoutData').find("#mg2CompletionStatus").val(json.closeoutDetails.mg2CompletionStatus);
		
		$('#closeoutData').find("#finalInspectionNotes").val(json.closeoutDetails.finalInspectionNotes);
		$('#closeoutData').find("#finalLiensNotes").val(json.closeoutDetails.finalLiensNotes);
		$('#closeoutData').find("#closeoutDocumentsNotes").val(json.closeoutDetails.closeoutDocumentsNotes);
		$('#closeoutData').find("#warrantyNotes").val(json.closeoutDetails.warrantyNotes);
		
		$('#closeoutData').find('#substantialCompletionStatus').val(json.closeoutDetails.substantialCompletionStatus);
		$('#closeoutData').find('#substantialCompletionDate').val(json.closeoutDetails.substantialCompletionDate);
		
		$('#closeoutData').find('#paymentOfDebtsAndClaimsStatus').val(json.closeoutDetails.paymentOfDebtsAndClaimsStatus);
		$('#closeoutData').find('#paymentOfDebtsAndClaimsDate').val(json.closeoutDetails.paymentOfDebtsAndClaimsDate);
		
		$('#closeoutData').find('#releaseOfLiensStatus').val(json.closeoutDetails.releaseOfLiensStatus);
		$('#closeoutData').find('#releaseOfLiensDate').val(json.closeoutDetails.releaseOfLiensDate);
		
		$('#closeoutData').find('#mulvannySignOffStatus').val(json.closeoutDetails.mulvannySignOffStatus);
		$('#closeoutData').find('#mulvannySignOffDate').val(json.closeoutDetails.mulvannySignOffDate);
		
		if(json.closeoutDetails.salvageValue != null)
		{
			$('#closeoutData').find("#salvageDate").val(json.closeoutDetails.salvageValue.date);
			$('#closeoutData').find("#salvageAmount").val(json.closeoutDetails.salvageValue.value);
		}
	
		
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
    
    var sprinkleStatus = $('#closeoutData').find("#sprinkleStatus").val();
    var sprinkleDate = $('#closeoutData').find("#sprinkleDate").val();
    
    var roofingStatus = $('#closeoutData').find("#roofingStatus").val();
    var roofingDate = $('#closeoutData').find("#roofingDate").val();
    
    var HTIStatus = $('#closeoutData').find("#HTIStatus").val();
    var HTIDate = $('#closeoutData').find("#HTIDate").val();
    
    var otherFinalLeinsStatus = $('#closeoutData').find("#otherFinalLiensStatus").val();
    var otherFinalLeinsDate = $('#closeoutData').find("#otherFinalLiensDate").val();
    
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
    
    var sprinkleFinalStatus = $('#closeoutData').find("#sprinkleFinalStatus").val();
    var sprinkleFinalDate = $('#closeoutData').find("#sprinkleFinalDate").val();
    
    var certificateStatus = $('#closeoutData').find("#certificateStatus").val();
    var certificateDate = $('#closeoutData').find("#certificateDate").val();
    
    // buildingPermitCL = buildingFinalDate;
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
    
    var sprinkleWarrantyStatus = $('#closeoutData').find("#sprinkleWarrantyStatus").val();
    var sprinkleWarrantyDate = $('#closeoutData').find("#sprinkleWarrantyDate").val();
    
    var roofingWarrantyStatus = $('#closeoutData').find("#roofingWarrantyStatus").val();
    var roofingWarrantyDate = $('#closeoutData').find("#roofingWarrantyDate").val();
    
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
    // alarmHVAC = alarmFormDate
    
    var verisaeReportStatus = $('#closeoutData').find("#verisaeReportStatus").val();
    // verisae = verisaeReportDate

    var closeoutDocumentsNotes = $('#closeoutData').find("#closeoutDocumentsNotes").val();
    
    var salvageDate = $('#closeoutData').find("#salvageDate").val();
    var salvageAmount = $('#closeoutData').find("#salvageAmount").val();
    
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
				
				MCSDate, GCDate, mechanicalDate, electricalDate, plumbingDate, 
				sprinkleDate, roofingDate, HTIDate, otherFinalLeinsDate,
				
				sprinkleFinalDate, certificateDate, mechFinalDate, elecFinalDate, plumbingFinalDate, tmpCertificateDate,
				
				GCWarrantyDate, mechanicalWarrantyDate, electricalWarrantyDate, sprinkleWarrantyDate, 
				roofingWarrantyDate, HTIWarrantyDate, otherWarrantyDateA, otherWarrantyDateB,
				
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
    		if(i == 9) sprinkleDate = dates_CLOSEOUT[i];
    		if(i == 10) roofingDate = dates_CLOSEOUT[i];
    		if(i == 11) HTIDate = dates_CLOSEOUT[i];
    		if(i == 12) otherFinalLeinsDate = dates_CLOSEOUT[i];
    		if(i == 13) sprinkleFinalDate = dates_CLOSEOUT[i];
    		if(i == 14) certificateDate = dates_CLOSEOUT[i];
    		if(i == 15) mechFinalDate = dates_CLOSEOUT[i];
    		if(i == 16) elecFinalDate = dates_CLOSEOUT[i];
    		if(i == 17) plumbingFinalDate = dates_CLOSEOUT[i];
    		if(i == 18) tmpCertificateDate = dates_CLOSEOUT[i];
    		if(i == 19) GCWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 20) mechanicalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 21) electricalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 22) sprinkleWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 23) roofingWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 24) HTIWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 25) otherWarrantyDateA = dates_CLOSEOUT[i];
    		if(i == 26) otherWarrantyDateB = dates_CLOSEOUT[i];
    		if(i == 27) manualDate = dates_CLOSEOUT[i];
    		if(i == 28) HVACstartupFormDate = dates_CLOSEOUT[i];
    		if(i == 29) salvageDate = dates_CLOSEOUT[i];
    		if(i == 30) substantialCompletionDate = dates_CLOSEOUT[i];
    		if(i == 31) paymentOfDebtsAndClaimsDate = dates_CLOSEOUT[i];
    		if(i == 32) releaseOfLiensDate = dates_CLOSEOUT[i];
    		if(i == 33) mulvannySignOffDate = dates_CLOSEOUT[i];
    		if(i == 34) asBuilts = dates_CLOSEOUT[i];
    		if(i == 35) punchList = dates_CLOSEOUT[i];
    		if(i == 36) alarmHvac = dates_CLOSEOUT[i];
    		if(i == 37) verisae = dates_CLOSEOUT[i];
    	}
		var action = "editCloseout";
		var CLOSEOUT_ID = PROJECT_DATA.closeoutDetails.id
		var SALVAGE_ID = 0;
		if(PROJECT_DATA.closeoutDetails.salvageValue != null)
			SALVAGE_ID = PROJECT_DATA.closeoutDetails.salvageValue.id;
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
				
				'sprinkleStatus': sprinkleStatus,
				'sprinkleDate': sprinkleDate,
				
				'roofingStatus': roofingStatus,
				'roofingDate': roofingDate,
				
				'HTIStatus': HTIStatus,
				'HTIDate': HTIDate,
				
				'finalLiensNotes': finalLiensNotes,
				
				'otherFinalLeinsStatus': otherFinalLeinsStatus,
				'otherFinalLeinsDate': otherFinalLeinsDate,
				
				'mechFinalStatus': mechFinalStatus,
				'mechFinalDate': mechFinalDate,
				
				'elecFinalStatus': elecFinalStatus,
				'elecFinalDate': elecFinalDate,
				
				'plumbingFinalStatus': plumbingFinalStatus,
				'plumbingFinalDate': plumbingFinalDate,
				
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
				
				'sprinkleWarrantyStatus': sprinkleWarrantyStatus,
				'sprinkleWarrantyDate': sprinkleWarrantyDate,
				
				'roofingWarrantyStatus': roofingWarrantyStatus,
				'roofingWarrantyDate': roofingWarrantyDate,
				
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
				getProject_PROJECT_MANAGER(projectID);
				alert('Project Saved');
				console.log(data);
				$('#closeoutData').find('#saveButton > button').prop('disabled', false);

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function()
			{
				alert('Project Saved');
				$('#closeoutData').find('#saveButton > button').prop('disabled', false);

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

function createTask() {
	window.location.href = "taskForm.html?id=" + projectID;
}

/**
 * This function makes the findProject div visible and hides all other divs
 * INNER FUNCTION CALLS: none
 * @returns
 */
function goToFindProject() {
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
			$('#permitData').find('#permits').addClass('active');
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
	
	console.log("CURRENT LOCATION = ", currentDivLocation);
	switch(currentDivLocation){
		case "projectData":
			getProject_PROJECT_MANAGER(projectID);
			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('.nav-tabs > li.active').removeClass('active');
			$('#projectData').find('#generalInformation').addClass('active');
			$('#projectData').find('#generalInformationTabLink').addClass('active');
			$('#projectManager').find('#projectInformationTabLink').addClass('active');
			break;
		case "permitData":
			getProject_PROJECT_MANAGER(projectID);
			$('#permitData').find('.info-tab').removeClass('active');
			$('#permitData').find('.nav-tabs > li.active').removeClass('active');
			let activeTab = $('#projectManager').find('.nav-tabs > li.active').id;
			$('#permitData').find('#buildingPermit').addClass('active');
			$('#permitData').find('#permits').addClass('active');
			$('#projectManager').find('#'+activeTab).addClass('active');
			break;
		case "closeoutData":
			getProject_PROJECT_MANAGER(projectID);
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('.nav-tabs > li.active').removeClass('active');
			$('#closeoutData').find('#closeout').addClass('active');
			$('#closeoutData').find('#closeoutDocuments').addClass('active');
			$('#projectManager').find('#closeoutTabLink').addClass('active');
			break;
		case "changeOrder":
			getProject_PROJECT_MANAGER(projectID);
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
			
	}
	
	setCurrentDivLocation('projectManager');
}





var CLOSEOUTSTATUS_DROPDOWNS = [
                                "mg2CompletionStatus",                
                                
                				"copSubmittedStatus", "copApprovedStatus", "copCompletedStatus", "changeOrderSubmittedStatus",
                				"changeOrderApprovedStatus","revisionsSubmittedStatus", "revisionsApprovedStatus",
                				
                				"MCSStatus", "GCStatus", "mechanicalStatus", "electricalStatus", "plumbingStatus", 
                				"sprinkleStatus", "roofingStatus", "HTIStatus", "otherFinalLiensStatus",
                				
                				"sprinkleFinalStatus", "certificateStatus", "tmpCertificateStatus", "mechFinalStatus", "elecFinalStatus",
                				"plumbingFinalStatus", "buildFinalStatus",
                				
                				"MCSWarrantyStatus", "GCWarrantyStatus", "mechanicalWarrantyStatus", "electricalWarrantyStatus", "sprinkleWarrantyStatus", 
                				"plumbingWarrantyStatus", "roofingWarrantyStatus", "HTIWarrantyStatus", "otherWarrantyStatusA", "otherWarrantyStatusB",
                				
                				"equipmentSubmittalStatus", "manualStatus","punchListStatus", "asBuiltDrawingsStatus", 
                                "closeOutPhotosStatus", "HVACstartupFormStatus", "alarmFormStatus", "verisaeReportStatus",   
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
	$('#permitData').find("#roofingPermitLastUpdated").datepicker();
	$('#permitData').find("#roofingInspectionLastUpdated").datepicker();
	$('#permitData').find("#mechanicalPermitLastUpdated").datepicker();
	$('#permitData').find("#mechanicalInspectionLastUpdated").datepicker();
	$('#permitData').find("#electricalPermitLastUpdated").datepicker();
	$('#permitData').find("#electricalInspectionLastUpdated").datepicker();
	$('#permitData').find("#plumbingPermitLastUpdated").datepicker();
	$('#permitData').find("#plumbingInspectionLastUpdated").datepicker();
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

				fillTabs_PERMIT(PROJECT_DATA);
				getTasks();
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
			'permitstage': true
		},
		success: function(data)
		{
			fillDropdowns_PERMIT(data);
			if(edit == true)
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
	console.log("PERMIT JSON = ", json);
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
		
		$('#permitData').find("#roofingPermitLastUpdated").val(json.permits.roofing);
		$('#permitData').find("#roofingPermitStatus").val(json.permits.roofingPermitStatus);
		$('#permitData').find("#roofingInspectionStatus").val(json.permits.roofingInspectionStatus);
		$('#permitData').find("#roofingInspectionLastUpdated").val(json.permits.roofingInspectionLastUpdated);
		
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
	    
	    $('#permitData').find('#permitNotes').text(json.permits.permitNotes);
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
    
    var roofingPermitStatus = $('#permitData').find("#roofingPermitStatus").val();
    var roofingPermitLastUpdated = $('#permitData').find("#roofingPermitLastUpdated").val();
    var roofingInspectionStatus = $('#permitData').find("#roofingInspectionStatus").val();
    var roofingInspectionLastUpdated = $('#permitData').find("#roofingInspectionLastUpdated").val();
    
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
    
    
    if(isValidInput_PERMIT(dates_PERMIT))
    {
    	console.log("we got valid data now");
    	
    	for(var i = 0; i < dates_PERMIT.length; i++) {
    		if(dates_PERMIT[i]) dates_PERMIT[i] = dateCleaner(dates_PERMIT[i]);
    		if(i == 0) buildingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 1) buildingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 2) roofingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 3) roofingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 4) mechanicalPermitLastUpdated = dates_PERMIT[i];
    		if(i == 5) mechanicalInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 6) electricalPermitLastUpdated = dates_PERMIT[i];
    		if(i == 7) electricalInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 8) plumbingPermitLastUpdated = dates_PERMIT[i];
    		if(i == 9) plumbingInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 10) sprinklerPermitLastUpdated = dates_PERMIT[i];
    		if(i == 11) sprinklerInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 12) fireAlarmPermitLastUpdated = dates_PERMIT[i];
    		if(i == 13) fireAlarmInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 14) voltagePermitLastUpdated = dates_PERMIT[i];
    		if(i == 15) voltageInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 16) otherAPermitLastUpdated = dates_PERMIT[i];
    		if(i == 17) otherAInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 18) otherBPermitLastUpdated = dates_PERMIT[i];
    		if(i == 19) otherBInspectionLastUpdated = dates_PERMIT[i];
    	}
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
				updateFrontEnd();
				alert('Save Complete!');
				getProject_PROJECT_MANAGER(projectID);
				$('#permitData').find('#saveButton > button').prop('disabled', false);

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function(data)
			{
				console.log(data);
				getProject_PROJECT_MANAGER(projectID);
				alert('Save Complete!');
				$('#permitData').find('#saveButton > button').prop('disabled', false);

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
var edit;


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
	$('#projectData').find("#costcoDate").datepicker();
	$('#projectData').find("#proposalDate_pd").datepicker();
	$('#projectData').find("#startDate").datepicker();
	$('#projectData').find("#scheduledTurnover").datepicker();
	$('#projectData').find("#actualTurnover").datepicker();
	$('#projectData').find("#permitApp").datepicker();
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
			'type': true
		},
		success: function(data)
		{
			console.log(data);
			console.log("about ot fill dropdowns");
			fillDropdowns_PROJECT_DATA(data);
			
			//PAGETYPE_PROJECT_DATA = getParameterByName("type");	
			if(edit == true) {
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
			$('#projectData').find("#" +closeoutstatus_dropdowns[i]).find('option').remove();
			$('#projectData').find("#" +closeoutstatus_dropdowns[i]).append(copy);	
		}
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
	var costco = $('#projectData').find("#costcoDate").val();
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
		$('#projectData').find('.info-tab').removeClass('active');
		$('#projectData').find('#saveButton').addClass('active');
		
		$('#projectData').find('.nav-tabs > li.active').removeClass('active');
		$('#projectData').find('#saveProjectLink').addClass('active');
		let updateData = {
				mcsNum : mcsNumber,
				warehouse_id : warehouse,
				item_id : item,
				manager : $('#projectData').find('#manager').find(":selected").text(),
				stage_id : stage
		};
		

		var action = 'addNewProject';
		if (edit == true) {
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
				
				
				if(!PAGE_ENTRY){
				updateProjectDisplay(updateData);
				updateFrontEnd();
				}
				//updateProjectManager();
				
				alert('Save Complete!');				
				$('#saveButton > button').prop('disabled', false);
				
				

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
				getTasks();
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
	console.log(data);
	var json = (data);	
	$('#projectData').find("#mcsNumber").val(json.McsNumber);

    $('#projectData').find("#warehouse").val(json.warehouse.id);
	$('#projectData').find("#class").val(json.projectClass.id);
	$('#projectData').find("#project").val(json.projectItem.id);
	$('#projectData').find("#manager").val(json.projectManagers.id);
	$('#projectData').find("#supervisor").val(json.supervisors[0].id);
	$('#projectData').find("#stage").val(json.stage.id);
	$('#projectData').find("#status").val(json.status.id);
	$('#projectData').find("#pType").val(json.projectType.id);
	$('#projectData').find("#scope").val(json.scope);

	
	$('#projectData').find("#initiatedDate").val(json.projectInitiatedDate);;
	$('#projectData').find("#surveyDate").val(json.siteSurvey);
	$('#projectData').find("#costcoDate").val(json.costcoDueDate);
	$('#projectData').find("#proposalDate_pd").val(json.proposalSubmitted);
	$('#projectData').find("#startDate").val(json.scheduledStartDate);
	$('#projectData').find("#scheduledTurnover").val(json.scheduledTurnover);
	$('#projectData').find("#actualTurnover").val(json.actualTurnover);
	$('#projectData').find("#permitApp").val(json.permitApp);

	$('#projectData').find("#shouldInvoice").val(json.shouldInvoice);
	$('#projectData').find("#actualInvoice").val(json.invoiced);
	$('#projectData').find("#notes").val(json.projectNotes);
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
	
	$('#general-info-item').click(function() {
		console.log("IN YITS");
		if(document.getElementById('general-info-item-content').style.display == 'none') $('#general-info-item-content').show();
		else $('#general-info-item-content').hide();
	});

});



/**
 * This function retrieves a specific project from the database
 * INNER FUNCTION CALLS: setProjectHeader(), fillTabs_PROJECT_MANAGER(), getTasks()
 * @params project_id
 * @returns
 */
function getProject_PROJECT_MANAGER(project_id) {
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
				
				setProjectHeader(data, currentDivLocation);

				fillTabs_PROJECT_MANAGER(data, currentDivLocation);
				
				getTasks();
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
function editProjectInfo () {
	document.getElementById("projectManager").style.display = 'none';
	getProjectEnums_PROJECT_DATA(true);
	currentDivLocation = "projectData";
	document.getElementById("projectData").style.display = 'inline';
	//window.location.href = PROJECTINFO + '?type=edit&id=' + projectID;
}

/**
 * This function makes the permitData div visible and projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_PERMIT()
 * @returns
 */
function editPermitsAndInspections () {
	document.getElementById("projectManager").style.display = 'none';
	edit = true;
	getProjectEnums_PERMIT(true);
	currentDivLocation = "permitData";
	document.getElementById("permitData").style.display = 'inline';
	$('#permitData').find('#permits').addClass('active');
	
	//window.location.href = PROJECT_PERMITS_AND_INSPECTIONS + '?id=' + projectID;
}


/**
 * This function makes the closeoutData div visible and projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_CLOSEOUT()
 * @returns
 */
function editCloseout () {
	document.getElementById("projectManager").style.display = 'none';
	edit = true;
	getProjectEnums_CLOSEOUT(true);
	currentDivLocation = "closeoutData";
	document.getElementById("closeoutData").style.display = 'inline';
	//window.location.href = PROJECT_CLOSEOUT + '?id=' + projectID;
}

function addChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=add&id=' + projectID;
}

function addEquipment () {
	window.location.href = PROJECT_EQUIPMENT + '?type=add&id=' + projectID;
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
	console.log("CALLED FILL CO");
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
	
	for(var i = 0; i < changeOrders.length; i++)
	{
		changeOrders[i].mcsCO = i + 1;
	}
	
	
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
		coNumber.width = "5%";
		coNumber.appendChild(document.createTextNode(i + 1));
		
		var title = document.createElement('td');
		title.width = "13%";
		if(changeOrder.title) title.appendChild(document.createTextNode(changeOrder.title));
		else  title.appendChild(document.createTextNode("---"));
		
		var briefDescription = document.createElement('td');
		briefDescription.appendChild(document.createTextNode(changeOrder.briefDescription))
		
		var status = document.createElement('td');
		status.width = "10%";
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));
		
		var subNames = document.createElement('td');
		subNames.width = "15%";
		subNames.appendChild(document.createTextNode(changeOrder.subNames));
		
		var notes = document.createElement('td');
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
		tableRow.appendChild(notes);
		tableRow.ondblclick = function() {
			goToChangeOrder(1);
		};
		$('#projectManager').find("#changeOrderTable").append(tableRow);
	}
}


/**
 * This function fills out the information on the page for the permits and inspections
 * INNER FUNCTION CALLS: none
 * @returns
 */
function fillPermitsAndInspections (data) {
	let tabData = data.permits;
	
	// permits 
	$('#projectManager').find('#buildingPermitDate').text(tabData.building);
	$('#projectManager').find('#buildingPermit').text(tabData.buildingPermitStatus);
	$('#projectManager').find('#roofingPermitDate').text(tabData.roofing);
	$('#projectManager').find('#roofingPermit').text(tabData.roofingPermitStatus);
	$('#projectManager').find('#mechanicalPermitDate').text(tabData.mechanical);
	$('#projectManager').find('#mechanicalPermit').text(tabData.mechanicalPermitStatus);
	$('#projectManager').find('#electricalPermitDate').text(tabData.electrical);
	$('#projectManager').find('#electricalPermit').text(tabData.electricalPermitStatus);
	$('#projectManager').find('#plumbingPermitDate').text(tabData.plumbing);
	$('#projectManager').find('#plumbingPermit').text(tabData.plumbingPermitStatus);
	$('#projectManager').find('#sprinklerPermitDate').text(tabData.fire_sprinkler);
	$('#projectManager').find('#sprinklerPermit').text(tabData.sprinklerPermitStatus);
	$('#projectManager').find('#fireAlarmPermitDate').text(tabData.fire_alarm);
	$('#projectManager').find('#fireAlarmPermit').text(tabData.fireAlarmPermitStatus);
	$('#projectManager').find('#lowVoltagePermitDate').text(tabData.low_voltage);
	$('#projectManager').find('#lowVoltagePermit').text(tabData.voltagePermitStatus);
	
	// inspections
	$('#projectManager').find('#buildingInspectionDate').text(tabData.buildingInspectionLastUpdated);
	$('#projectManager').find('#buildingInspection').text(tabData.buildingInspectionStatus);
	$('#projectManager').find('#roofingInspectionDate').text(tabData.roofingInspectionLastUpdated);
	$('#projectManager').find('#roofingInspection').text(tabData.roofingInspectionStatus);
	$('#projectManager').find('#mechanicalInspectionDate').text(tabData.mechanicalInspectionLastUpdated);
	$('#projectManager').find('#mechanicalInspection').text(tabData.mechanicalInspectionStatus);
	$('#projectManager').find('#electricalInspectionDate').text(tabData.electricalInspectionLastUpdated);
	$('#projectManager').find('#electricalInspection').text(tabData.electricalInspectionStatus);
	$('#projectManager').find('#plumbingInspectionDate').text(tabData.plumbingInspectionLastUpdated);
	$('#projectManager').find('#plumbingInspection').text(tabData.plumbingInspectionStatus);
	$('#projectManager').find('#sprinklerInspectionDate').text(tabData.sprinklerInspectionLastUpdated);
	$('#projectManager').find('#sprinklerInspection').text(tabData.sprinklerInspectionStatus);
	$('#projectManager').find('#fireAlarmInspectionDate').text(tabData.fireAlarmInspectionLastUpdated);
	$('#projectManager').find('#fireAlarmInspection').text(tabData.fireAlarmInspectionStatus);
	$('#projectManager').find('#lowVoltageInspectionDate').text(tabData.voltageInspectionLastUpdated);
	$('#projectManager').find('#lowVoltageInspection').text(tabData.voltageInspectionStatus);
}


/**
 * This function fills out the equipment info
 * WARNING: Unsure if the function really works, never knew how to properly test its functionality
 * @param data with equipment info
 * @returns
 */
function fillEquipment (data) {
	let equipmentList = data.projEquipment;
	for (var i = 0; i < equipmentList.length; i++) {
		var equipment = equipmentList[i];
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", equipment.id);
		tableRow.onclick = function() {toggleEquipment(this)};

		var poNum = document.createElement('td');
		poNum.appendChild(document.createTextNode(equipment.poNum));
		
		var equipmentName = document.createElement('td');
		equipmentName.appendChild(document.createTextNode(equipment.equipmentName))
		
		var vendor = document.createElement('td');
		vendor.appendChild(document.createTextNode(equipment.vendor));
		
		var estDeliveryDate = document.createElement('td');
		if (equipment.estDeliveryDate === undefined)
			estDeliveryDate.appendChild(document.createTextNode("---"));
		else
			estDeliveryDate.appendChild(document.createTextNode(equipment.estDeliveryDate));
		
		var deliveryDate = document.createElement('td');
		if (equipment.deliveryDate === undefined)
			deliveryDate.appendChild(document.createTextNode('---'));
		else 
			deliveryDate.appendChild(document.createTextNode(equipment.deliveryDate));
		
		tableRow.appendChild(poNum);
		tableRow.appendChild(equipmentName);
		tableRow.appendChild(vendor);
		tableRow.appendChild(estDeliveryDate);
		tableRow.appendChild(deliveryDate);
		$("#equipmentTable").append(tableRow);
		
	}
}

/**
 * This function fills out the closeout info
 * @param data with closeout info
 * @returns
 */
function fillCloseout (data) {
	let closeoutData = data.closeoutDetails;
	$('#mg2Completion').html(closeoutStatusConverter(closeoutData.mg2CompletionStatus));
	$('#punchList').html(closeoutStatusConverter(closeoutData.punchListStatus));
	$('#verisaeReport').html(closeoutStatusConverter(closeoutData.verisaeReportStatus));
	
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
	$('#projectManager').find('#finalInspectionsRequired').text(completed + ' / ' + required);
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
	switch (closeoutData.roofingWarrantyStatus) {
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
	$('#projectManager').find('#finalWarrantiesRequired').text(completed + ' / ' + required);
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
	switch(closeoutData.plumbingStatus) {
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
	switch(closeoutData.roofingStatus) {
	case '1':
		required++;
		completed++;
		break;
	case '2': 
		required++;
		break;
	}
	
	$('#projectManager').find('#finalLiensRequired').text(completed + ' / ' + required);
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

function editSelectedEquipment () {
	window.location.href = PROJECT_EQUIPMENT + '?type=edit&id=' + projectID + '&equipmentID=' + selectedEquipment;
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

		count++;
		let taskListing = document.createElement('tr');
		
	
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
		taskDesc.innerHTML = tasks[i].description;
		assignedTo.innerHTML = tasks[i].assignee.firstName;
		dueDate.innerHTML = tasks[i].dueDate;
		severity.innerHTML = tasks[i].severity;
		severity.align = 'center';
		status.innerHTML = tasks[i].status.status;
		notes.innerHTML = tasks[i].notes;
		
		
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
	
	$('#taskTable tr:not(.head)').click(function() {		
		toggleTask(this);
	});
	
	$('#taskTable tr:not(.head)').dblclick(function() {		
		let tmp = this.id.replace("task_","");
		console.log(tmp);
		location.href = "taskBrowser.html?id="+tmp;
	});
	
}

function toggleTask (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	//$('#editChangeOrder').prop('disabled', false);
	//selectedChangeOrder = $(source).attr('value');
	//CHANGE_ORDER_ID = selectedChangeOrder;
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
	$('#taskTable > tbody').children('tr:not(.head)').remove();
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

let parameterFields = ["Warehouse", "Classification", "Item",
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

$(document).on('click', '.stage', function(){
	updateFrontEnd();
});

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
			filterProjects();
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
		
		for(var q = 0; q < 8; q++){
			var num = 7 - q;
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
	if(from == "projectData") getAllProjects();
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
function getSearchCriteria() {
	
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
			'status': true
		}, success: function(data) {
			
			fillDropdowns_FIND_PROJECT(data);
			
			$('#paramID1').val('Warehouse');
			$('#paramVal1').empty();
			$('#paramVal1').append(warehouseOptions.cloneNode(true));
			
			//$('#paramID2').val('Stage');
			//$('#paramVal2').empty();
			//$('#paramVal2').append(stageOptions.cloneNode(true));
			
			checkInitFilter();
			
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
						$('.stage').each(function(i, obj) {
							if(obj.value == '2') obj.checked = true;
							else if(obj.value == '1') obj.checked = true;
							else obj.checked = false;
						});
						document.getElementById('AllStages').checked = false;
						document.getElementById('NoStages').checked = false;
						
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
		
		$('.stage').each(function(i, obj) {
			if(obj.value == '2') obj.checked = true;
			else obj.checked = false;
		});
		
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
						document.getElementById('AllStages').checked = false;
						document.getElementById('NoStages').checked = false;
				 }
				 
				 $('#paramID2').val('Manager');
			     $('#paramVal2').empty();
				 $('#paramVal2').append(managerOptions.cloneNode(true));
				 matchUsernameToPersonID(user.firstName, 2);
				 
				
				
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
		let option = document.createElement('option');
		if (field == 'Warehouse') {
			option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
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
	case 'Classification':
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
	
	let parameters = $('.paramHolder').children('select');
	
	
	let remaining = json.length;
	if(paramNum != 0){
	for (var i = 0; i < (paramNum * 2); i+= 2) {
		let id = $(parameters[i]).val();
		let val = $(parameters[i + 1]).val();
		
		for (var j = 0; j < json.length; j++) {
			if(id === 'Warehouse') { 
				if(json[j] != null && json[j].warehouse.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Classification') {
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
			} else if (id == 'Supervisor') {
				if (json[j] != null && json[j].supervisors[0].id != val) {
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
		} else if (remaining > 50) {
			clearAndAddSingleRow('Too many results. Refine your search.');
		} else {
			for (var k = 0; k < json.length; k++) {
				if(json[k] != null) {
					let projectListing = document.createElement('tr');
					let listDetails0 = document.createElement('td');
					let listDetails1 = document.createElement('td');
					let listDetails2 = document.createElement('td');
					let listDetails3 = document.createElement('td');
					
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}

					listDetails0.innerHTML = json[k].warehouse.city.name + ' #' +
											json[k].warehouse.warehouseID;
					listDetails1.innerHTML = json[k].McsNumber;
					listDetails2.innerHTML = json[k].projectItem.name;
					listDetails3.innerHTML = json[k].projectManagers.name;
					
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					$(projectListing).append(listDetails3);
					
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
					let listDetails0 = document.createElement('td');
					let listDetails1 = document.createElement('td');
					let listDetails2 = document.createElement('td');
					let listDetails3 = document.createElement('td');
					
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}

					listDetails0.innerHTML = json[k].warehouse.city.name + ' #' +
											json[k].warehouse.warehouseID;
					listDetails1.innerHTML = json[k].McsNumber;
					listDetails2.innerHTML = json[k].projectItem.name;
					listDetails3.innerHTML = json[k].projectManagers.name;
					
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					$(projectListing).append(listDetails3);
					
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
	edit = true;
	console.log($(source).attr('id'));
	if(taskFinder) {
		window.location.href = TASK_CREATOR + '?id=' + 
			$(source).attr('id').replace('project', '');
	} else {
		document.getElementById("findProject").style.display = 'none';
		$(source).attr('id').replace('project', '');
		var proj_id = $(source).attr('id');
		proj_id = proj_id.replace('project','');
		getProject_PROJECT_MANAGER(proj_id);
		currentDivLocation = "projectManager";
		document.getElementById("projectManager").style.display = 'inline';
		//window.location.href = PROJECTMANAGER + '?id=' + 
			
	}

}
//This enables the user to filter tasks based off status
$(document).on('change', '#taskSelector2', function () {
	clearTaskTable();
	fillTasksTable(tasks);
	console.log("Right here \n");
});

/**
 * This function retrieves all of the taks from the server
 * INNER FUNCTION CALLS: fillTasksTable()
 */
function getTasks() {
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
			if(type && type == "taskForm" && !RETRIEVED_PROJECTS) getAllProjects();
			tasks = data;
			if (data) {
				fillTasksTable(data);
			}
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
					$('#changeOrder').find('#mcsCO').html(mcsCO);
				}
				getTasks();

	
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
			'changeorderstatus': true
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
	$('#changeOrder').find("#mcsCO").html(changeOrderToEdit.mcsCO);
	$('#changeOrder').find("#subCO").val(changeOrderToEdit.subCO);
	$('#changeOrder').find("#proposalDate").val(changeOrderToEdit.proposalDate);
	$('#changeOrder').find("#briefDescription").val(changeOrderToEdit.briefDescription);
	$('#changeOrder').find("#subNames").val(changeOrderToEdit.subNames);
	
	if(changeOrderToEdit.cost) changeOrderToEdit.cost = cleanNumericValueForDisplaying(changeOrderToEdit.cost);
	$('#changeOrder').find("#cost").val(changeOrderToEdit.cost);
	
	if(changeOrderToEdit.sell) changeOrderToEdit.sell = cleanNumericValueForDisplaying(changeOrderToEdit.sell);
	$('#changeOrder').find("#sell").val(changeOrderToEdit.sell);
	
	$('#changeOrder').find("#status").val(changeOrderToEdit.status);
	$('#changeOrder').find("#submittedTo").val(changeOrderToEdit.submittedTo);
	$('#changeOrder').find("#submittedDate").val(changeOrderToEdit.submittedDate);
	$('#changeOrder').find("#approvedDate").val(changeOrderToEdit.approvedDate);
	$('#changeOrder').find("#notes").val(changeOrderToEdit.notes);
	$('#changeOrder').find('#title').val(changeOrderToEdit.title);
	$('#changeOrder').find('#invoiceNumber').val(changeOrderToEdit.invoiceNumber);
	
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
	console.log("BEFORE: ", num);
	var str = num.toString();
	
	var price, cleanPrice;
	var dollars, cleanDollars;
	var dollarArray = new Array();
	var correctOrder = "";
	var cents, cleanCents;
    
	if(str.indexOf(".") != -1) 
	{
		price = str.split(".");
		console.log("PRICE = ", price);
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
		console.log("AFTER: ", cleanPrice);
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
		console.log("D ARRAY = ", dollarArray);
		cleanDollars = dollarArray.toString();

		while(cleanDollars.indexOf(",") != -1) {
			cleanDollars = cleanDollars.replace(",","");
		}
		
		console.log("CLEAN DOLLARS = ", cleanDollars);
		
		while(cleanDollars.indexOf("-") != -1) {
		cleanDollars = cleanDollars.replace("-",",");
		}
		
		
		for(var i = cleanDollars.length -1; i > -1; i--) {
			correctOrder += cleanDollars[i];
		}
		
		cleanPrice = correctOrder;
		console.log("AFTER: ", cleanPrice);
		return cleanPrice;
		
	}
	
}

/**
 * This function clears the change order tabs of their values
 */
function clearTabs_CHANGE_ORDER(){
	
	$('#changeOrder').find("#customerCO").val("");
	$('#changeOrder').find("#mcsCO").html("");
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
	var mcsCO = $('#changeOrder').find("#mcsCO").html();

	var subCO = $('#changeOrder').find("#subCO").val();
	var subNames = $('#changeOrder').find("#subNames").val();
	var status = $('#changeOrder').find("#status").val();
	var submittedTo = $('#changeOrder').find("#submittedTo").val();
	
	var briefDescription = $('#changeOrder').find("#briefDescription").val();
	var notes = $('#changeOrder').find("#notes").val();
	var title = $('#changeOrder').find('#title').val();
	
	var cost = $('#changeOrder').find("#cost").val();
	if(cost) {cost = cleanNumericValueForSaving($('#changeOrder').find("#cost")[0].value); cost = parseFloat(cost);}
	
	var sell = $('#changeOrder').find("#sell").val();
	if(sell) {sell = cleanNumericValueForSaving($('#changeOrder').find("#sell")[0].value); sell = parseFloat(sell);}
	
	var invoiceNumber = $('#changeOrder').find("#invoiceNumber").val();
	
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
				'submittedTo': submittedTo,
				'briefDescription': briefDescription,
				'notes': notes,
				'cost': cost,
				'sell': sell,
				'title':title,
				'invoiceNumber' : invoiceNumber
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
		edit = true;
		console.log("PROJECT ID = ", id);
		currentDivLocation = "projectManager";
		getProject_PROJECT_MANAGER(id);
		$('#projectManager').show();
		$('.projectNavigator').hide();
		$('.projectNavigator-projectManager').show();
		PAGE_ENTRY = "fromTask";
		if(from) {
			PAGE_ENTRY = from;
			getAllProjects();
		}
	} else {
		$('.projectNavigator').show();
		$('.projectNavigator-projectFinder').hide();
		getAllProjects();
		$('#findProject').show();
	}
}










