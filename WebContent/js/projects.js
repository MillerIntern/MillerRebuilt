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

var location = 'findProject';


// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	$('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		$('#saveButton > button').prop('disabled', true);
	});
	
	 	$("#MCSDate").datepicker();   
	    $("#GCDate").datepicker();
	    $("#mechanicalDate").datepicker();
	    $("#electricalDate").datepicker();
	    $("#plumbingDate").datepicker();
	    $("#sprinkleDate").datepicker();
	    $("#roofingDate").datepicker();
	    $("#HTIDate").datepicker();
	    $("#otherFinalLiensDate").datepicker();
	    
	    	// Final Inspections //Move other fields here from above
	    $("#tmpCertificateDate").datepicker();
	    $("#mechFinalDate").datepicker();
	    $("#elecFinalDate").datepicker();
	    $("#plumbingFinalDate").datepicker();
	    $("#sprinkleFinalDate").datepicker();
	    $("#certificateDate").datepicker();
	    $("#buildingPermitCL").datepicker();
	    
	    
	        // Warranty Letters
	    $("#GCWarrantyDate").datepicker();
	    $("#mechanicalWarrantyDate").datepicker();
	    $("#electricalWarrantyDate").datepicker();
	    $("#plumbingWarrantyDate").datepicker();
	    $("#sprinkleWarrantyDate").datepicker();
	    $("#roofingWarrantyDate").datepicker();
	    $("#HTIWarrantyDate").datepicker();
	    $("#otherWarrantyDateA").datepicker();
	    $("#otherWarrantyDateB").datepicker();
	    
	        // Closeout documents
	    $("#manualDate").datepicker();
	    $("#HVACstartupFormDate").datepicker();
	    
		$("#mg2CompletionDate").datepicker();
		$("#MCSWarranty").datepicker();
		$("#equipmentSubCL").datepicker();
		$("#punchList").datepicker();
		$("#asBuilts").datepicker();
		$("#closeoutPhotosCL").datepicker();
		$("#alarmHvac").datepicker();
		$("#verisae").datepicker();
		$('#substantialCompletionDate').datepicker();
		$('#paymentOfDebtsAndClaimsDate').datepicker();
		$('#releaseOfLiensDate').datepicker();
		$('#mulvannySignOffDate').datepicker();
		
		$("#salvageDate").datepicker();
		
	$('.closeout-input').change(function () {
		console.log($(this).attr('data-associated-date'));
		$('#' + $(this).attr('data-associated-date')).val(getToday());
	});
});



function getProjectEnums_CLOSEOUT()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE_CLOSEOUT == 'closeout')
	{
		projectID_CLOSEOUT = getParameterByName("id");
		
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

				fillTabs_CLOSEOUT(data);
				getTasks();
			}
		});
	}
	else
	{
		alert("That's weird... You might want to go back and try again");
	}
}

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
			getProjectEnums_CLOSEOUT();
		}
	});
}

function fillTabs_CLOSEOUT(data)
{
	var json = data;
	console.log(json);
	if (json.closeoutDetails != null)
	{	
		$("#airGas").val(json.closeoutDetails.airGas);
		$("#permits").val(json.closeoutDetails.permitsClosed);
		$("#asBuilts").val(json.closeoutDetails.asBuilts);
		$("#punchList").val(json.closeoutDetails.punchList);
		$("#alarmHvac").val(json.closeoutDetails.alarmHvacForm);
		$("#verisae").val(json.closeoutDetails.verisaeShutdownReport);
		$("#closeoutBook").val(json.closeoutDetails.closeoutBook);
		$("#closeoutNotes").val(json.closeoutDetails.closeoutNotes);
		
		$("#buildingPermitCL").val(json.closeoutDetails.buildingPermitCL);
		$("#closeoutPhotosCL").val(json.closeoutDetails.closeoutPhotosCL);
		$("#MCSWarranty").val(json.closeoutDetails.mCSWarranty);
		$("#equipmentSubCL").val(json.closeoutDetails.equipmentSubCL);
		$("#traneCL").val(json.closeoutDetails.traneCL);

		$("#numOfChangeOrders").val(json.closeoutDetails.numOfChangeOrders);
		$("#numOfChangeOrdersCompleted").val(json.closeoutDetails.numOfChangeOrdersCompleted);
		
		$("#tmpCertificateStatus").val(json.closeoutDetails.tmpCertificateStatus);
		$("#tmpCertificateDate").val(json.closeoutDetails.tmpCertificateDate);
		
		$("#mechFinalStatus").val(json.closeoutDetails.mechFinalStatus);
		$("#mechFinalDate").val(json.closeoutDetails.mechFinalDate);
		
		$("#elecFinalNotes").val(json.closeoutDetails.elecFinalNotes);
		$("#elecFinalDate").val(json.closeoutDetails.elecFinalDate);
		$("#elecFinalStatus").val(json.closeoutDetails.elecFinalStatus);
		
		$("#plumbingFinalStatus").val(json.closeoutDetails.plumbingFinalStatus);
		$("#plumbingFinalDate").val(json.closeoutDetails.plumbingFinalDate);
		
		$("#sprinkleFinalStatus").val(json.closeoutDetails.sprinkleFinalStatus);
		$("#sprinkleFinalDate").val(json.closeoutDetails.sprinkleFinalDate);
		
		$("#certificateStatus").val(json.closeoutDetails.certificateStatus);
		$("#certificateDate").val(json.closeoutDetails.certificateDate);
		
		$("#buildFinalStatus").val(json.closeoutDetails.buildingFinalStatus);
		
		$("#equipmentSubmittalStatus").val(json.closeoutDetails.equipmentSubmittalStatus);
		
		$("#manualStatus").val(json.closeoutDetails.manualStatus);
		$("#manualDate").val(json.closeoutDetails.manualDate);
		
		$("#punchListStatus").val(json.closeoutDetails.punchListStatus);
		
		$("#asBuiltDrawingsStatus").val(json.closeoutDetails.asBuiltDrawingsStatus);
		
		$("#closeOutPhotosStatus").val(json.closeoutDetails.closeOutPhotosStatus);
		
		$("#HVACstartupFormStatus").val(json.closeoutDetails.HVACstartupFormStatus);
		$("#HVACstartupFormDate").val(json.closeoutDetails.HVACstartupFormDate);
		
		$("#alarmFormStatus").val(json.closeoutDetails.alarmFormStatus);
		
		$("#verisaeReportStatus").val(json.closeoutDetails.verisaeReportStatus);
		
		$("#MCSWarrantyStatus").val(json.closeoutDetails.MCSWarrantyStatus);
		
		$("#GCWarrantyStatus").val(json.closeoutDetails.GCWarrantyStatus);
		$("#GCWarrantyDate").val(json.closeoutDetails.GCWarrantyDate);
		
		$("#mechanicalWarrantyStatus").val(json.closeoutDetails.mechanicalWarrantyStatus);
		$("#mechanicalWarrantyDate").val(json.closeoutDetails.mechanicalWarrantyDate);
		
		$("#electricalWarrantyStatus").val(json.closeoutDetails.electricalWarrantyStatus);
		$("#electricalWarrantyDate").val(json.closeoutDetails.electricalWarrantyDate);
		
		$("#plumbingWarrantyStatus").val(json.closeoutDetails.plumbingWarrantyStatus);
		$("#plumbingWarrantyDate").val(json.closeoutDetails.plumbingWarrantyDate);
		
		$("#sprinkleWarrantyStatus").val(json.closeoutDetails.sprinkleWarrantyStatus);
		$("#sprinkleWarrantyDate").val(json.closeoutDetails.sprinkleWarrantyDate);
		
		$("#roofingWarrantyStatus").val(json.closeoutDetails.roofingWarrantyStatus);
		$("#roofingWarrantyDate").val(json.closeoutDetails.roofingWarrantyDate);
		
		$("#HTIWarrantyStatus").val(json.closeoutDetails.HTIWarrantyStatus);
		$("#HTIWarrantyDate").val(json.closeoutDetails.HTIWarrantyDate);
		
		$("#otherWarrantyStatusA").val(json.closeoutDetails.otherWarrantyStatusA);
		$("#otherWarrantyDateA").val(json.closeoutDetails.otherWarrantyDateA);
		
		$("#otherWarrantyStatusB").val(json.closeoutDetails.otherWarrantyStatusB);
		$("#otherWarrantyDateB").val(json.closeoutDetails.otherWarrantyDateB);
		
		$("#MCSStatus").val(json.closeoutDetails.MCSStatus);
		$("#MCSDate").val(json.closeoutDetails.MCSDate);
		
		$("#GCStatus").val(json.closeoutDetails.GCStatus);
		$("#GCDate").val(json.closeoutDetails.GCDate);
		
		$("#mechanicalStatus").val(json.closeoutDetails.mechanicalStatus);
		$("#mechanicalDate").val(json.closeoutDetails.mechanicalDate);
		
		$("#electricalStatus").val(json.closeoutDetails.electricalStatus);
		$("#electricalDate").val(json.closeoutDetails.electricalDate);
		
		$("#plumbingStatus").val(json.closeoutDetails.plumbingStatus);
		$("#plumbingDate").val(json.closeoutDetails.plumbingDate);
		
		$("#sprinkleStatus").val(json.closeoutDetails.sprinkleStatus);
		$("#sprinkleDate").val(json.closeoutDetails.sprinkleDate);
		
		$("#roofingStatus").val(json.closeoutDetails.roofingStatus);
		$("#roofingDate").val(json.closeoutDetails.roofingDate);
		
		$("#HTIStatus").val(json.closeoutDetails.HTIStatus);
		$("#HTIDate").val(json.closeoutDetails.HTIDate);
		
		$("#otherFinalLiensStatus").val(json.closeoutDetails.otherFinalLeinsStatus);
		$("#otherFinalLiensDate").val(json.closeoutDetails.otherFinalLeinsDate);
		
		$("#mg2CompletionDate").val(json.closeoutDetails.mg2CompletionDate);
		$("#mg2CompletionStatus").val(json.closeoutDetails.mg2CompletionStatus);
		
		$("#finalInspectionNotes").val(json.closeoutDetails.finalInspectionNotes);
		$("#finalLiensNotes").val(json.closeoutDetails.finalLiensNotes);
		$("#closeoutDocumentsNotes").val(json.closeoutDetails.closeoutDocumentsNotes);
		$("#warrantyNotes").val(json.closeoutDetails.warrantyNotes);
		
		$('#substantialCompletionStatus').val(json.closeoutDetails.substantialCompletionStatus);
		$('#substantialCompletionDate').val(json.closeoutDetails.substantialCompletionDate);
		
		$('#paymentOfDebtsAndClaimsStatus').val(json.closeoutDetails.paymentOfDebtsAndClaimsStatus);
		$('#paymentOfDebtsAndClaimsDate').val(json.closeoutDetails.paymentOfDebtsAndClaimsDate);
		
		$('#releaseOfLiensStatus').val(json.closeoutDetails.releaseOfLiensStatus);
		$('#releaseOfLiensDate').val(json.closeoutDetails.releaseOfLiensDate);
		
		$('#mulvannySignOffStatus').val(json.closeoutDetails.mulvannySignOffStatus);
		$('#mulvannySignOffDate').val(json.closeoutDetails.mulvannySignOffDate);
		
		if(json.closeoutDetails.salvageValue != null)
		{
			$("#salvageDate").val(json.closeoutDetails.salvageValue.date);
			$("#salvageAmount").val(json.closeoutDetails.salvageValue.value);
		}
		
	}
	
}

function fillDropdowns_CLOSEOUT(data)
{
	var json = JSON.parse(data["closeoutstatus"]);
	var d = document.createDocumentFragment();

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
		$("#" +CLOSEOUTSTATUS_DROPDOWNS[i]).append(copy);	
	}

}


function saveProject_CLOSEOUT()
{
    console.log("Saving Closeout Information");
    var punchList = $("#punchList").val();
	var alarmHvac = $("#alarmHvac").val();
	var verisae = $("#verisae").val();
	var asBuilts = $("#asBuilts").val();
	
	var buildingPermitCL = $("#buildingPermitCL").val();
	var closeoutPhotosCL = $("#closeoutPhotosCL").val();
	var MCSWarranty = $("#MCSWarranty").val();
	var equipmentSubCL = $("#equipmentSubCL").val();
    
    
    // NEW Closeout CONTENT
	
	var mg2CompletionStatus = $("#mg2CompletionStatus").val();
	var mg2CompletionDate = $("#mg2CompletionDate").val();
	
	var numOfChangeOrders = $("#numOfChangeOrders").val();
	var numOfChangeOrdersCompleted = $("#numOfChangeOrdersCompleted").val();
    
        // LIENS
    var MCSStatus = $("#MCSStatus").val(); 
    var MCSDate = $("#MCSDate").val(); 
    
    var GCStatus = $("#GCStatus").val();
    var GCDate = $("#GCDate").val();
    
    var mechanicalStatus = $("#mechanicalStatus").val();
    var mechanicalDate = $("#mechanicalDate").val();
    
    var electricalStatus = $("#electricalStatus").val();
    var electricalDate = $("#electricalDate").val();
    
    var plumbingStatus = $("#plumbingStatus").val();
    var plumbingDate = $("#plumbingDate").val();
    
    var sprinkleStatus = $("#sprinkleStatus").val();
    var sprinkleDate = $("#sprinkleDate").val();
    
    var roofingStatus = $("#roofingStatus").val();
    var roofingDate = $("#roofingDate").val();
    
    var HTIStatus = $("#HTIStatus").val();
    var HTIDate = $("#HTIDate").val();
    
    var otherFinalLeinsStatus = $("#otherFinalLiensStatus").val();
    var otherFinalLeinsDate = $("#otherFinalLiensDate").val();
    
    var finalLiensNotes = $("#finalLiensNotes").val();
        
    	// INSPECTIONS
    
    var tmpCertificateStatus = $("#tmpCertificateStatus").val();
    var tmpCertificateDate = $("#tmpCertificateDate").val();
    
    var mechFinalStatus = $("#mechFinalStatus").val();
    var mechFinalDate = $("#mechFinalDate").val();
    
    var elecFinalDate = $("#elecFinalDate").val();
    var elecFinalStatus = $("#elecFinalStatus").val();
    
    var plumbingFinalDate = $("#plumbingFinalDate").val();
    var plumbingFinalStatus = $("#plumbingFinalStatus").val();
    
    var sprinkleFinalStatus = $("#sprinkleFinalStatus").val();
    var sprinkleFinalDate = $("#sprinkleFinalDate").val();
    
    var certificateStatus = $("#certificateStatus").val();
    var certificateDate = $("#certificateDate").val();
    
    // buildingPermitCL = buildingFinalDate;
    var buildingFinalStatus = $("#buildFinalStatus").val();
    
    var finalInspectionNotes = $("#finalInspectionNotes").val();
       
    	// WARRANTIES
    
    var MCSWarrantyStatus = $("#MCSWarrantyStatus").val();
    // MCSWarranty = MCSWarrantyDate
    
    var GCWarrantyStatus = $("#GCWarrantyStatus").val();
    var GCWarrantyDate = $("#GCWarrantyDate").val();
    
    var mechanicalWarrantyStatus = $("#mechanicalWarrantyStatus").val();
    var mechanicalWarrantyDate = $("#mechanicalWarrantyDate").val();
    
    var electricalWarrantyStatus = $("#electricalWarrantyStatus").val();
    var electricalWarrantyDate = $("#electricalWarrantyDate").val();
    
    var plumbingWarrantyStatus = $("#plumbingWarrantyStatus").val();
    var plumbingWarrantyDate = $("#plumbingWarrantyDate").val();
    
    var sprinkleWarrantyStatus = $("#sprinkleWarrantyStatus").val();
    var sprinkleWarrantyDate = $("#sprinkleWarrantyDate").val();
    
    var roofingWarrantyStatus = $("#roofingWarrantyStatus").val();
    var roofingWarrantyDate = $("#roofingWarrantyDate").val();
    
    var HTIWarrantyStatus = $("#HTIWarrantyStatus").val();
    var HTIWarrantyDate = $("#HTIWarrantyDate").val();
    
    var otherWarrantyStatusA = $("#otherWarrantyStatusA").val();
    var otherWarrantyDateA = $("#otherWarrantyDateA").val();
    
    var otherWarrantyStatusB = $("#otherWarrantyStatusB").val();
    var otherWarrantyDateB = $("#otherWarrantyDateB").val();
    
    var warrantyNotes = $("#warrantyNotes").val();
    
        // CLOSEOUT DOCUMENTS
    var equipmentSubmittalStatus = $("#equipmentSubmittalStatus").val();
    // equipmentSubCL = equipmentSubmittalDate
    
    var manualStatus = $("#manualStatus").val();
    var manualDate = $("#manualDate").val();
    
    var punchListStatus = $("#punchListStatus").val();
    //punchList = punchListDate
    
    var asBuiltDrawingsStatus = $("#asBuiltDrawingsStatus").val();
    // asBuilts = asBuiltDrawingsDate
    
    var closeOutPhotosStatus = $("#closeOutPhotosStatus").val();
    //closeoutPhotosCL = closeOutPhotosDate
    
    var HVACstartupFormStatus = $("#HVACstartupFormStatus").val();
    var HVACstartupFormDate = $("#HVACstartupFormDate").val();
    
    var alarmFormStatus = $("#alarmFormStatus").val();
    // alarmHVAC = alarmFormDate
    
    var verisaeReportStatus = $("#verisaeReportStatus").val();
    // verisae = verisaeReportDate

    var closeoutDocumentsNotes = $("#closeoutDocumentsNotes").val();
    
    var salvageDate = $("#salvageDate").val();
    var salvageAmount = $("#salvageAmount").val();
    
    var substantialCompletionStatus = $('#substantialCompletionStatus').val();
    var substantialCompletionDate = $('#substantialCompletionDate').val();
    
    var paymentOfDebtsAndClaimsStatus = $('#paymentOfDebtsAndClaimsStatus').val();
    var paymentOfDebtsAndClaimsDate = $('#paymentOfDebtsAndClaimsDate').val();
    
    var releaseOfLiensStatus = $('#releaseOfLiensStatus').val();
    var releaseOfLiensDate = $('#releaseOfLiensDate').val();
    
    var mulvannySignOffStatus = $('#mulvannySignOffStatus').val();
    var mulvannySignOffDate = $('#mulvannySignOffDate').val();
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
				
				alert('Project Saved');
				console.log(data);
				$('#saveButton > button').prop('disabled', false);

			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function()
			{
				alert('Project Saved');
				$('#saveButton > button').prop('disabled', false);

			       //alert("Status: " + textStatus); 
				   //alert("Error: " + errorThrown);
			//error:function(xhr){
				//alert(xhr.responceText);
				//console.log(xhr.responseText);
							
			}
		});

    }
    
}

function isValidInput_CLOSEOUT(dates_CLOSEOUT)
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

function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
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
	
	/*
	$('.permitStatus, .inspectionStatus').change(function () {
		//console.log($(this).attr('data-associated-date'));
		$('#' + $(this).attr('data-associated-date')).val(getToday());
	});
	*/
	
});

function getProject_PERMIT()
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
			//if(PAGETYPE == 'edit')
			getProject_PERMIT();
		}
	});
}

function fillDropdowns_PERMIT(json)
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

function fillTabs_PERMIT(data)
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

function saveProject_PERMIT()
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
    
    
    if(isValidInput(dates_PERMIT))
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

/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

function isValidInput_PERMIT(dates_PERMIT)
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

//THIS ENDS THE PERMIT DATA JAVASCRIPT

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE PROJECTDATA.JS FILE
*/


//globals
var numChangeOrders = 0;
var PAGETYPE_PROJECT_DATA = "add";
var changeOrders = [];


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
	$('.nav-tabs > li').click(function () {
		if($(this).attr('id') !== 'saveProjectLink') {

			$('.info-tab').removeClass('active');
			$('#' + $(this).attr('data-tab')).addClass('active');
			
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

//This function retrieves all of the enumerated data (warehouses, statuses, etc) from the database
//Input: none
//Output: none (calls functions to fill in all of the dropdown functions)
function getProjectEnums_PROJECT_DATA()
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
			
			PAGETYPE_PROJECT_DATA = getParameterByName("type");	
			if(PAGETYPE_PROJECT_DATA == 'edit') {
				getProject_PROJECT_DATA();
			}
			else {
				$("#projectHeader").text("New Project");
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
			$("#" +closeoutstatus_dropdowns[i]).append(copy);	
		}
	}
	else
		$("#"+className).append(d);
}

function saveProject_PROJECT_DATA() {
	var mcsNumber = $('#mcsNumber').val();
	
	// Required Information
	var warehouse = $('#warehouse').val();
	var projectClass = $('#class').val();
	var item = $('#project').val();
	var manager = $('#manager').val();
	var supervisor = $('#supervisor').val();
	var status = $('#status').val();
	var stage = $("#stage").val();
	var pType = $('#pType').val();
	var scope = $("#scope").val();
	

	// scheduling
	var initiated = $("#initiatedDate").val();
	var survey = $("#surveyDate").val();
	var costco = $("#costcoDate").val();
	var proposalDate = $("#proposalDate").val();
	var startDate = $("#startDate").val();
	var scheduledTurnover = $("#scheduledTurnover").val();
	var actualTurnover = $("#actualTurnover").val();
	var permitApp = $("#permitApp").val();

	// financial
	var shouldInvoice = $("#shouldInvoice").val();
	var actualInvoice = $("#actualInvoice").val();
	var notes = $("#notes").val();
	var refrigNotes = $("#zUpdates").val();
	var cost = $("#projectCost").val();
	var customerNumber = $("#custNum").val();
	
	var required = [warehouse, projectClass, item, manager, supervisor, status, stage, pType, scope];
	var dates_PROJECT_DATA = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover, permitApp];
	
	if(isValidInput_PROJECT_DATA(required, dates_PROJECT_DATA)) {
		$('.info-tab').removeClass('active');
		$('#saveButton').addClass('active');
		
		$('.nav-tabs > li.active').removeClass('active');
		$('#saveProjectLink').addClass('active');
		
		var action = 'addNewProject';
		if (PAGETYPE_PROJECT_DATA === 'edit') {
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
				alert('Save Complete!');
				$('#saveButton > button').prop('disabled', false);

			}
			
		});
	}
}

/*
function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + projectID;
}
*/

//This function validates the nunmerous fields of this page, separated by categories
//Input: array of str, array of str, array of ints, str, str, int
//output: true if all of the fields are valid. False otherwise
//TODO: Numbers, notes, 
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

//This function retrieves project information from a project, and prepares it to be edited.
//Input: none
//Output: none
function getProject_PROJECT_DATA()
{
	projectID = getParameterByName("id");
	
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
				setProjectHeader(data);
				fillForm(data);
				getTasks();
			}
		});
	}
}

//This function fills out the page with project data. This is so the user can edit the project information
//Input: JSON object representing a project
//Output: none (fills out data on the page)
function fillForm_PROJECT_DATA(data)
{
	console.log(data);
	var json = (data);	
	$("#mcsNumber").val(json.McsNumber);

  $("#warehouse").val(json.warehouse.id);
	$("#class").val(json.projectClass.id);
	$("#project").val(json.projectItem.id);
	$("#manager").val(json.projectManagers.id);
	$("#supervisor").val(json.supervisors[0].id);
	$("#stage").val(json.stage.id);
	$("#status").val(json.status.id);
	$("#pType").val(json.projectType.id);
	$("#scope").val(json.scope);

	
	$("#initiatedDate").val(json.projectInitiatedDate);;
	$("#surveyDate").val(json.siteSurvey);
	$("#costcoDate").val(json.costcoDueDate);
	$("#proposalDate").val(json.proposalSubmitted);
	$("#startDate").val(json.scheduledStartDate);
	$("#scheduledTurnover").val(json.scheduledTurnover);
	$("#actualTurnover").val(json.actualTurnover);
	$("#permitApp").val(json.permitApp);

	$("#shouldInvoice").val(json.shouldInvoice);
	$("#actualInvoice").val(json.invoiced);
	$("#notes").val(json.projectNotes);
	$("#zUpdates").val(json.zachUpdates);
	$("#projectCost").val(json.cost);
	$("#custNum").val(json.customerNumber);
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

//THIS ENDS THE JAVASCRIPT FOR PROJECT DATA

/**
 * THE FOLLOWING JAVASCRIPT CORRESPONDS TO PROJECTMANAGER.js
 */


let selectedChangeOrder = null;
let selectedEquipment = null;

$(document).ready(function () {
	$('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
	
	
});

function getProject_PROJECT_MANAGER() {
	//console.log(getParameterByName('id'));
	projectID = getParameterByName('id');
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
				setProjectHeader(data);

				fillTabs_PROJECT_MANAGER(data);
				
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

function fillTabs_PROJECT_MANAGER (data) {
	fillProjectInformation(data);
	fillChangeOrders(data);
	fillPermitsAndInspecionts(data);
	fillEquipment(data);
	fillCloseout(data);
}

function editProjectInfo () {
	window.location.href = PROJECTINFO + '?type=edit&id=' + projectID;
}

function editPermitsAndInspections () {
	window.location.href = PROJECT_PERMITS_AND_INSPECTIONS + '?id=' + projectID;
}

function editCloseout () {
	window.location.href = PROJECT_CLOSEOUT + '?id=' + projectID;
}

function addChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=add&id=' + projectID;
}

function addEquipment () {
	window.location.href = PROJECT_EQUIPMENT + '?type=add&id=' + projectID;
}

function fillProjectInformation (data) {
	$('#mcsNumber').text(data.McsNumber);
	$('#projectItem').text(data.projectItem.name);
	$('#projectStatus').text(data.status.name);
	$('#projectType').text(data.projectType.name);
	$('#projectStage').text(data.stage.name);
	$('#projectManager').text(data.projectManagers.name);
	$('#projectSupervisor').text(data.supervisors[0].name);
} // fillProjectInformation

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

// sorry for the weird readability of the code.. though it reads strangely it works
function fillPermitsAndInspecionts (data) {
	let tabData = data.permits;
	
	// permits 
	$('#buildingPermitDate').text(tabData.building);
	$('#buildingPermit').text(tabData.buildingPermitStatus);
	$('#roofingPermitDate').text(tabData.roofing);
	$('#roofingPermit').text(tabData.roofingPermitStatus);
	$('#mechanicalPermitDate').text(tabData.mechanical);
	$('#mechanicalPermit').text(tabData.mechanicalPermitStatus);
	$('#electricalPermitDate').text(tabData.electrical);
	$('#electricalPermit').text(tabData.electricalPermitStatus);
	$('#plumbingPermitDate').text(tabData.plumbing);
	$('#plumbingPermit').text(tabData.plumbingPermitStatus);
	$('#sprinklerPermitDate').text(tabData.fire_sprinkler);
	$('#sprinklerPermit').text(tabData.sprinklerPermitStatus);
	$('#fireAlarmPermitDate').text(tabData.fire_alarm);
	$('#fireAlarmPermit').text(tabData.fireAlarmPermitStatus);
	$('#lowVoltagePermitDate').text(tabData.low_voltage);
	$('#lowVoltagePermit').text(tabData.voltagePermitStatus);
	
	// inspections
	$('#buildingInspectionDate').text(tabData.buildingInspectionLastUpdated);
	$('#buildingInspection').text(tabData.buildingInspectionStatus);
	$('#roofingInspectionDate').text(tabData.roofingInspectionLastUpdated);
	$('#roofingInspection').text(tabData.roofingInspectionStatus);
	$('#mechanicalInspectionDate').text(tabData.mechanicalInspectionLastUpdated);
	$('#mechanicalInspection').text(tabData.mechanicalInspectionStatus);
	$('#electricalInspectionDate').text(tabData.electricalInspectionLastUpdated);
	$('#electricalInspection').text(tabData.electricalInspectionStatus);
	$('#plumbingInspectionDate').text(tabData.plumbingInspectionLastUpdated);
	$('#plumbingInspection').text(tabData.plumbingInspectionStatus);
	$('#sprinklerInspectionDate').text(tabData.sprinklerInspectionLastUpdated);
	$('#sprinklerInspection').text(tabData.sprinklerInspectionStatus);
	$('#fireAlarmInspectionDate').text(tabData.fireAlarmInspectionLastUpdated);
	$('#fireAlarmInspection').text(tabData.fireAlarmInspectionStatus);
	$('#lowVoltageInspectionDate').text(tabData.voltageInspectionLastUpdated);
	$('#lowVoltageInspection').text(tabData.voltageInspectionStatus);
}

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
	$('#finalInspectionsRequired').text(completed + ' / ' + required);
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
	$('#finalWarrantiesRequired').text(completed + ' / ' + required);
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
	
	$('#finalLiensRequired').text(completed + ' / ' + required);
}

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
			t1 = new Date().getTime();
			console.log('took: ' + (t1 - t0) + 'ms');
			getSearchCriteria();
		}
	});
}

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

function checkInitFilter () {
	if(getParameterByName('id') === 'user') {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getManager'
			}, success: function (data) {
				if(data !== '') {
					$('#paramID1').val('Manager');
					$('#paramVal1').empty();
					$('#paramVal1').append(managerOptions.cloneNode(true));
					
					switch(data) {
						case 'Bart': 
							document.getElementById('paramVal1').value = '14';
							break;
						case "Alex":
							document.getElementById('paramVal1').value = '3';
							break;
						case "Andy":
							document.getElementById('paramVal1').value = '2';
							break;
						case "Craig":
							document.getElementById('paramVal1').value = '12';
							break;
						case "Daves":
							document.getElementById('paramVal1').value = '7';
							break;
						case "David":
							document.getElementById('paramVal1').value = '1';
							break;
						case "Jim": 
							document.getElementById('paramVal1').value = '8';
							break;
						case "Joe":
							document.getElementById('paramVal1').value = '5';
							break;
						case "Sai":
							document.getElementById('paramVal1').value = '10';
							break;
						case "Tony":
							document.getElementById('paramVal1').value = '4';
							break;
					}
				filterProjects();
				}
			}
		});
		filterProjects();
	} else if (getParameterByName('id') == 'activePermit') {
		$('#paramID1').val('Status');
		$("#paramVal1").empty();
		$("#paramVal1").append(statusOptions.cloneNode(true));

		document.getElementById('paramVal1').value = '30';
		filterProjects();
	} else {
		filterProjects();
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

function generateDropdowns_FIND_PROJECTS(jsonData, field) {
	let json = JSON.parse(jsonData);
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		if (field == 'Warehouse') {
			option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
		} else {
			option.innerHTML = json[i].name;
		}
		
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

function removeParam(param) {
	param.parentNode.remove();
	paramNum--;
	filterProjects();
}

function filterProjects () {
	let json = JSON.parse(projects['projects']);
	
	let parameters = $('.paramHolder').children('select');
	
	let remaining = json.length;
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

function navigateTo(source) {
	console.log($(source).attr('id'));
	if(taskFinder) {
		window.location.href = TASK_CREATOR + '?id=' + 
			$(source).attr('id').replace('project', '');
	} else {
		window.location.href = PROJECTMANAGER + '?id=' + 
			$(source).attr('id').replace('project', '');
	}

}

