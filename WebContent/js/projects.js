/*
 * There were several html/javascript files that are associated with the project.
 * This file will concatenate them into one file to save on load time
 */

'use strict';

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE CLOSEOUTDATA.JS FILE
*/

var PAGETYPE_CLOSEOUT = 'closeout';

var PROJECT_DATA;
var projectID;


var currentDivLocation = 'findProject';
let tasks;
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

				
				fillTabs_CLOSEOUT(data);
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
		$('#closeoutData').find("#" +CLOSEOUTSTATUS_DROPDOWNS[i]).find().remove();	
		$('#closeoutData').find("#" +CLOSEOUTSTATUS_DROPDOWNS[i]).append(copy);	
	}

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
				mg2CompletionDate,
				
				MCSDate, GCDate, mechanicalDate, electricalDate, plumbingDate, 
				sprinkleDate, roofingDate, HTIDate, otherFinalLeinsDate,
				
				sprinkleFinalDate, certificateDate, mechFinalDate, elecFinalDate, plumbingFinalDate, tmpCertificateDate,
				
				GCWarrantyDate, mechanicalWarrantyDate, electricalWarrantyDate, sprinkleWarrantyDate, 
				roofingWarrantyDate, HTIWarrantyDate, otherWarrantyDateA, otherWarrantyDateB,
				
				manualDate, HVACstartupFormDate, salvageDate, substantialCompletionDate, 
				paymentOfDebtsAndClaimsDate, releaseOfLiensDate, mulvannySignOffDate
                ];
    
    
    if(isValidInput_CLOSEOUT(dates_CLOSEOUT))
    {
    	console.log("we got valid data now");
    	
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
				'mg2CompletionDate': mg2CompletionDate,
				
				'numOfChangeOrders': numOfChangeOrders,
				'numOfChangeOrdersCompleted': numOfChangeOrdersCompleted,
				
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
			$('#permitData').find('#buildingPermit').addClass('active');
			$('#permitData').find('#permits').addClass('active');
			$('#projectManager').find('#permitsTabLink').addClass('active');
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
			break;
			
	}
	$('#projectManager').find('#changeOrderTable').find('tr').remove();
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
var changeOrders = [];
var edit;


var stages=["Active", "Proposal", "Budgetary", "Closed", "Inactive"];
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
	
	$("#initiatedDate").datepicker();
	$("#surveyDate").datepicker();
	$("#costcoDate").datepicker();
	$("#proposalDate").datepicker();
	$("#startDate").datepicker();
	$("#scheduledTurnover").datepicker();
	$("#actualTurnover").datepicker();
	$("#permitApp").datepicker();
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
	var proposalDate = $('#projectData').find("#proposalDate").val();
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
	var customerNumber = $('#projectData').find("#custNum").val();
	
	var required = [warehouse, projectClass, item, manager, supervisor, status, stage, pType, scope];
	var dates_PROJECT_DATA = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover, permitApp];
	
	if(isValidInput_PROJECT_DATA(required, dates_PROJECT_DATA)) {
		$('#projectData').find('.info-tab').removeClass('active');
		$('#projectData').find('#saveButton').addClass('active');
		
		$('#projectData').find('.nav-tabs > li.active').removeClass('active');
		$('#projectData').find('#saveProjectLink').addClass('active');
		let updateData = {
				mcsNum : mcsNumber,
				warehouse_id : warehouse,
				item_id : item,
				manager : $('#projectData').find('#manager').find(":selected").text()
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
				updateProjectDisplay(updateData);
				updateFrontEnd();
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
/**
 * This function updates the front end project display
 * @param data containing either warehouse, mcsNumber, item, and manager fields
 * INNER FUNCTION CALLS: filterProjects()
 * @returns
 */
function updateProjectDisplay(data) {
	console.log("THE UPDATE DATA = ", data);
	convertItem(data);
	
	updatedManager = {
			name : data.manager,
			id : matchUsernameToPerson(data.manager)
	};
	
	updatedMCSnumber = data.mcsNum;
	
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
					console.log("THE UPDATE = ", DISPLAYABLE_PROJECTS[i]);
				}
			}
			getProject_PROJECT_MANAGER(projectID);
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
	$('#projectData').find("#proposalDate").val(json.proposalSubmitted);
	$('#projectData').find("#startDate").val(json.scheduledStartDate);
	$('#projectData').find("#scheduledTurnover").val(json.scheduledTurnover);
	$('#projectData').find("#actualTurnover").val(json.actualTurnover);
	$('#projectData').find("#permitApp").val(json.permitApp);

	$('#projectData').find("#shouldInvoice").val(json.shouldInvoice);
	$('#projectData').find("#actualInvoice").val(json.invoiced);
	$('#projectData').find("#notes").val(json.projectNotes);
	$('#projectData').find("#zUpdates").val(json.zachUpdates);
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
				
				console.log("the data eqausl == " ,data);
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
	let changeOrders = data.changeOrders;
	for (var i = 0; i < changeOrders.length; i++) {
		let changeOrder = changeOrders[i];
		
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", changeOrder.id);
		tableRow.onclick = function() {toggleChangeOrder(this)};

		var changeType = document.createElement('td');
		changeType.appendChild(document.createTextNode(parseChangeOrderType(changeOrder.type)));
		
		var briefDescription = document.createElement('td');
		briefDescription.appendChild(document.createTextNode(changeOrder.briefDescription))
		
		var status = document.createElement('td');
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));
		
		var submittedDate = document.createElement('td');
		submittedDate.appendChild(document.createTextNode(changeOrder.submittedDate));
		
		var approvedDate = document.createElement('td');
		if (changeOrder.approvedDate === undefined)
			approvedDate.appendChild(document.createTextNode("---"))
		else
			approvedDate.appendChild(document.createTextNode(changeOrder.approvedDate));
		
		tableRow.appendChild(changeType);
		tableRow.appendChild(briefDescription);
		tableRow.appendChild(status);
		tableRow.appendChild(submittedDate);
		tableRow.appendChild(approvedDate);
		$("#changeOrderTable").append(tableRow);
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
			return "Submitted";
		case "2":
			return "MCS Reviewing";
		default:
			return "Undefined";
	}
}


function toggleChangeOrder (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editChangeOrder').prop('disabled', false);
	selectedChangeOrder = $(source).attr('value');
}

function editSelectedChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=edit&id=' + projectID + '&changeOrderID=' + selectedChangeOrder;
}

function changeOrderReport () {
	window.location.href = CHANGE_ORDER_PRINT + 'id=' + projectID;
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

//THIS ENDS THE JAVASCRIPT FOR PROJECTMANAGER.js

/**
 * THE FOLLOWING JAVASCRIPT CORRESPONDS TO FINDPROJECT.js
 */

let ready = false;

let projects;

let parameterFields = ["Warehouse", "Classification", "Item",
                       "Manager", "Supervisor", "Type", "Status",
                       "Stage"];

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
});

//Keeps track of stage selections
$(document).on('click', '#NoStages', function(){
	if(document.getElementById("NoStages").checked == true){
		$('.commonStage').each(function(i, obj) {
			obj.checked = false;
		});
		document.getElementById("AllStages").checked = false;
	}
});

//Keeps track of stage selections
$(document).on('click', '.commonStage', function(){
	if(this.checked == false) document.getElementById('AllStages').checked = false;

    document.getElementById('NoStages').checked = false;
    	
    
	
});

/**
 * This function retrieves all of the projects from the database as well as sets initial display
 * INNER FUNCTION CALLS: clearAndAddSingleRow(), getSearchCriteria(), filterProjects()
 */
function getAllProjects() {
	
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
			console.log("getAllProjects() - PROJECTS HAVE BEEN RETRIEVED", RETRIEVED_PROJECTS);
			t1 = new Date().getTime();
			console.log('took: ' + (t1 - t0) + 'ms');
			getSearchCriteria();
			filterProjects();
		}
	});
}

/**
 * This function updates the front end project display
 * INNER FUNCTION CALLS: clearAndAddSingleRow(), filterProjects()
 */
function updateFrontEnd() {
	
	clearAndAddSingleRow("Retrieving Projects...");
	if (getParameterByName('type') === 'findTaskProject') {
		$('#param-field').before('<h3>Select a Project to Create Task for:</h3>');
		taskFinder = true;
	} else taskFinder = false;
	
	
	filterProjects();
	
	
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
			'status': true,
			'stage': true
		}, success: function(data) {
			
			fillDropdowns_FIND_PROJECT(data);
			
			$('#paramID1').val('Warehouse');
			$('#paramVal1').empty();
			$('#paramVal1').append(warehouseOptions.cloneNode(true));
			
			$('#paramID2').val('Stage');
			$('#paramVal2').empty();
			$('#paramVal2').append(stageOptions.cloneNode(true));
			
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
	} else {
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
				$('#paramID2').val('Manager');
				$('#paramVal2').empty();
				$('#paramVal2').append(managerOptions.cloneNode(true));
				matchUsernameToPersonID(user.firstName);
				filterProjects();
			}
		});		
	}
}

/**
 * This function matches the user's first name to the appropriate person ID
 * INNER FUNCTION CALLS: removeParam()
 */
function matchUsernameToPersonID(userFirstName){
	switch(userFirstName) {
	case 'Bart': 
		document.getElementById('paramVal2').value = '14';
		return '14';
		break;
	case "Alex":
		document.getElementById('paramVal2').value = '3';
		return '3';
		break;
	case "Andy":
		document.getElementById('paramVal2').value = '2';
		return '2';
		break;
	case "Craig":
		document.getElementById('paramVal2').value = '12';
		return '12';
		break;
	case "Dave":
		document.getElementById('paramVal2').value = '7';
		return '7';
		break;
	case "David":
		document.getElementById('paramVal2').value = '1';
		return '1';
		break;
	case "Jim": 
		document.getElementById('paramVal2').value = '8';
		return '8';
		break;
	case "Joe":
		document.getElementById('paramVal2').value = '5';
		return '5';
		break;
	case "Adrienne":
		document.getElementById('paramVal2').value = '17';
		return '17';
		break;
	case "Tony":
		document.getElementById('paramVal2').value = '4';
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
	stageOptions = generateDropdowns_FIND_PROJECTS(data['stage'], parameterFields[7]);
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

/**
 * This function sets the order for the project stages to be displayed
 * INNER FUNCTION CALLS: none
 */
function projectStageSort(json) {
	var sortedStages = new Array();
	for(var i = 0; i < json.length; i++){
		if(json.name = "Budgetary") sortedStages[0] = json[i];
		if(json.name = "Proposal") sortedStages[1] = json[i];
		if(json.name = "Active") sortedStages[2] = json[i];
		if(json.name = "Closeout") sortedStages[3] = json[i];
		if(json.name = "Billing Closeout") sortedStages[4] = json[i];
		if(json.name = "Closed") sortedStages[5] = json[i];
		if(json.name = "On Hold") sortedStages[6] = json[i];
		if(json.name = "Canceled") sortedStages[7] = json[i];
	}
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
			tasks = data;
			if (data) {
				fillTasksTable(data);
			}
		}, error: function (data) {
			alert('Server Error!');
		}
	});
}

/**
 * This function fills the task table with the given tasks
 * INNER FUNCTION CALLS: none
 */
function fillTasksTable(tasks) {
	let selector = $('#taskSelector2').val();
	console.log(selector);
	
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
		
		
		$(taskListing).append(taskTitle);
		$(taskListing).append(taskDesc);
		$(taskListing).append(assignedTo);
		$(taskListing).append(dueDate);
		$(taskListing).append(severity);
		$(taskListing).append(status);
		$(taskListing).append(notes);
		
		
		$('#taskTable > tbody').append(taskListing);
	}

	if (count === 0) {
		clearAndAddSingleRowTask("No Tasks to Show");
	}
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
				PROJECT_DATA = (data);
				setProjectHeader(data, currentDivLocation);
				
				if(edit_CHANGE_ORDER == 'true') {
					//CHANGE_ORDER_ID = getParameterByName("changeOrderID");
					PROJECT_DATA = data;
					fillTabs_CHANGE_ORDER(PROJECT_DATA);
					console.log("IT WAS truuuuu");
				}
				getTasks();

	
			}
		});
	} else {
		alert('Something went wrong');
	}
}

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
			getProject_CHANGE_ORDER();
		}
	});
}

function fillTabs_CHANGE_ORDER(json)
{
	
	var changeOrderToEdit;
	for(var i = 0; i < json.changeOrders.length; i++)
	{
		if(json.changeOrders[i].id == selectedChangeOrder)
			changeOrderToEdit = json.changeOrders[i];
	}
	console.log(changeOrderToEdit);
	if(changeOrderToEdit){
	$('#changeOrder').find("#customerCO").val(changeOrderToEdit.type);
	$('#changeOrder').find("#mcsCO").val(changeOrderToEdit.mcsCO);
	$('#changeOrder').find("#subCO").val(changeOrderToEdit.subCO);
	$('#changeOrder').find("#proposalDate").val(changeOrderToEdit.proposalDate);
	$('#changeOrder').find("#briefDescription").val(changeOrderToEdit.briefDescription);
	$('#changeOrder').find("#subNames").val(changeOrderToEdit.subNames);
	$('#changeOrder').find("#cost").val(changeOrderToEdit.cost);
	$('#changeOrder').find("#sell").val(changeOrderToEdit.sell);
	$('#changeOrder').find("#status").val(changeOrderToEdit.status);
	$('#changeOrder').find("#submittedTo").val(changeOrderToEdit.submittedTo);
	$('#changeOrder').find("#submittedDate").val(changeOrderToEdit.submittedDate);
	$('#changeOrder').find("#approvedDate").val(changeOrderToEdit.approvedDate);
	$('#changeOrder').find("#notes").val(changeOrderToEdit.notes);
	}
}

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
}

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

function fillDropdowns_CHANGE_ORDER(json)
{
	console.log(json);
	var changeorderStatus = JSON.parse(json["changeorderstatus"]);
	var d = document.createDocumentFragment();
	
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
	var submittedTo = $('#changeOrder').find("#submittedTo").val();
	
	var briefDescription = $('#changeOrder').find("#briefDescription").val();
	var notes = $('#changeOrder').find("#notes").val();
	
	var cost = $('#changeOrder').find("#cost").val();
	var sell = $('#changeOrder').find("#sell").val();
	
	var dates = [proposalDate, submittedDate, approvedDate];
	
	var action = "addChangeOrder";
	if(edit_CHANGE_ORDER == 'true')
		action = "editChangeOrder";
	
	if(isValidInput_CHANGE_ORDER(dates))
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
			},
			success:function(data){
				
				alert('Saved Change Order');
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);

				console.log(data);
			},
			error: function(data)
			{
				alert('Saved Change Order');
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);
			}
		});
}

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

function goToChangeOrder(edit){
	$('.editProject').hide();
	$('#changeOrder').show();
	setCurrentDivLocation('changeOrder');
	console.log("EDIT = ", edit);
	if(edit == 0) {
		edit_CHANGE_ORDER = 'false';
		clearTabs_CHANGE_ORDER();
	}
	else edit_CHANGE_ORDER = 'true';
	
	getDropdownInfo_CHANGE_ORDER();
}
/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

function toggleChangeOrder (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editChangeOrder').prop('disabled', false);
	selectedChangeOrder = $(source).attr('value');
}

function changeOrderReport () {
	window.location.href = CHANGE_ORDER_PRINT + 'id=' + projectID;
}

//
//
/// THIS ENDS THE JAVASCRIPT FOR changeOrderData.html
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
			$('#'+currentDivLocation).find("#pageLocation").html("<h2>Project Manager</h2>");
			break;
		case "projectData":
			$('#'+currentDivLocation).find("#pageLocation").html("<h2>Project Editor</h2>");
			break;
		case "permitData":
			$('#'+currentDivLocation).find("#pageLocation").html("<h2>Permit & Inspection Editor</h2>");
			break;
		case "closeoutData":
			$('#'+currentDivLocation).find("#pageLocation").html("<h2>Closeout Editor</h2>");
			break;
		case "changeOrder":
			$('#'+currentDivLocation).find("#pageLocation").html("<h2>Change Order</h2>");
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



