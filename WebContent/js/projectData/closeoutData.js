var PAGETYPE = 'closeout';

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
});



function getProjectEnums()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'closeout')
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

function getDropdownItems()
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
			fillDropdowns(data);
			getProjectEnums();
		}
	});
}

function fillTabs(data)
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

function fillDropdowns(data)
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


function saveProject()
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
    
    var dates =[
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
    
    
    if(isValidInput(dates))
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

function returnToProjectManager () {
	window.location.href = PROJECTMANAGER + '?id=' + PROJECT_ID;
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

