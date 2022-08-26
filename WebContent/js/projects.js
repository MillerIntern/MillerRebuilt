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

var noMove = 0;
var DATA = null;

//can I create a function for all this - Akash
$(document).on("click", "#equipmentFailedTable tbody tr", function(e){
	
	var row = $(this).children("td:nth-child(2)").text();
	fixingRules('equipment');
	
	$('#equipmentTable tbody tr td:nth-child(1)').each(function(){
		var otherRow = $(this).text();
		if( otherRow == row){
			 $(this).parent().click(); 
            //$(this).parent().effect("highlight", {color:'#DDDDDD'}, 20000); 
            this.scrollIntoView({behavior: "smooth"});
		}
			
	});
});

$(document).on("click", "#changeOrdersFailedTable tbody tr", function(e){
	
	var row = $(this).children("td:nth-child(2)").text();
	fixingRules('changeorders');
	
	$('#changeOrderTable tbody tr td:nth-child(2)').each(function(){
		var otherRow = $(this).text();
		if( otherRow == row){
			$(this).parent().click(); 
            this.scrollIntoView({behavior: "smooth"});
		}
			
	});
});

$(document).on("click", "#tasksFailedTable tbody tr", function(e){
	
	var row = $(this).children("td:nth-child(2)").text();
	fixingRules('tasks');
	
	$('#taskTable tbody tr td:nth-child(1)').each(function(){
		var otherRow = $(this).text();
		if( otherRow == row){
			$(this).parent().click(); 
            this.scrollIntoView({behavior: "smooth"});
		}
			
	});
});

$(document).on("click", "#permitsFailedTable tbody tr", function(e){
	
	var row = $(this).children("td:nth-child(2)").text();
	fixingRules('permits');
	
	$('#permitTable tbody tr td:nth-child(1)').each(function(){
		var otherRow = $(this).text();
		if( otherRow.includes(row)){
			$(this).parent().click(); 
			
		}
	});
});

$(document).on("click", "#closeOutFailedTable tbody tr", function(e){
	
	var row = $(this).children("td:nth-child(2)").text();
	row = row.split("-")[1];
	fixingRules('closeout');
	
	$('#closeOutList li').each(function(){
		var otherRow = $(this).text();
		console.log("OTHER ROW IN LIST IS",otherRow);
		console.log("ROW IN LIST IS",row);
		if( otherRow.includes(row)){
			$(this).click(); 
		}	
	});
});

let generalIssues,schedulingIssues,permitsIssues, equipmentIssues, changeordersIssues, tasksIssues, closeoutIssues, financialIssues;
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

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE CLOSEOUTDATA.JS FILE
*/

var PAGETYPE_CLOSEOUT = 'closeout';

var PROJECT_DATA;
var projectID;

var currentDivLocation = 'findProject';
let tasks;
let pendInvs;
let PAGE_ENTRY;
let RETRIEVED_PROJECTS;
let DISPLAYABLE_PROJECTS;
let taskAssigneeType = "EMPLOYEE";
let TASK_EMPLOYEE_ASSIGNEE = "EMPLOYEE";
let TASK_SUB_ASSIGNEE = "SUBCONTRACTOR";
let TASK_ACTION = "createTask";
let PENDINV_ACTION = "createPendInv";
let INV_ACTION = "createInv";
let CHANGE_ORDER_TYPES = new Array();
let PERSONS;

var PAGETYPE_EQUIP = "add";
var projectID_EQUIP;
var EQUIPMENT_ID_EQUIP;
var PROJECT_DATA_EQUIP;

// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	generateViewTableHeaders();
	generateSortOptions("project");
	$('#closeoutData').find('.nav-tabs > li').click(function () {
		if($(this).attr('id') !== 'save-closeout' && $(this).attr('id') !== 'backToFailedRulesCloseOut' ) {
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('#' + $(this).attr('data-tab')).addClass('active');
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			
			$('#closeoutData').find('#saveButton > button').prop('disabled', true);
		}
	});
	
	 	$('#closeoutData').find("#MCSDate").datepicker();   
	    $('#closeoutData').find("#GCDate").datepicker();
	    $('#closeoutData').find("#mechanicalDate").datepicker();
	    $('#closeoutData').find("#electricalDate").datepicker();
	    $('#closeoutData').find("#plumbingDate").datepicker();
	    $('#closeoutData').find("#gasDate").datepicker();
	    $('#closeoutData').find("#sprinkleDate").datepicker();
	    $('#closeoutData').find("#HTIDate").datepicker();
	    $('#closeoutData').find("#otherFinalLiensDate").datepicker();
	    $('#closeoutData').find("#otherFinalLiensBDate").datepicker();
	    
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
		$('#closeoutData').find("#costcoSignoff").datepicker();
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

function generateViewTableHeaders(){
	//Code to remove first row
	$('#ViewHeaderRow').remove();
	if($('#dashboardViewValue').val() == 0){
		generateSortOptions("project");
		$('#projectTableDiv').find('table tbody').prepend('<tr class="head" id = "ViewHeaderRow"></tr>');
		var projectTableRow = $('#projectTableDiv').find($('#results tbody').find('#ViewHeaderRow'));
		projectTableRow.append('<th>Warehouse</th>');
		projectTableRow.append('<th>MCS #</th>');
		projectTableRow.append('<th style="width:20%;">Item</th>');
		projectTableRow.append('<th style= "text-align:center">Score</th>');
		projectTableRow.append('<th>Status</th>');
		projectTableRow.append('<th>Start Date</th>');
		projectTableRow.append('<th>End Date</th>');
		projectTableRow.append('<th>Manager</th>');
		projectTableRow.append('<th>Key Status</th>');
	}
	else{
		generateSortOptions("proposal");
		$('#projectTableDiv').find('table tbody').prepend('<tr class="head" id = "ViewHeaderRow"></tr>');
		var projectTableRow = $('#projectTableDiv').find($('#results tbody').find('#ViewHeaderRow'));
		projectTableRow.append('<th>Warehouse</th>');
		projectTableRow.append('<th>MCS #</th>');
		projectTableRow.append('<th>Item</th>');
		projectTableRow.append('<th>Manager</th>');
		projectTableRow.append('<th>Scope Date</th>');
		projectTableRow.append('<th>Schedule</th>');
		projectTableRow.append('<th>Due Date</th>');		
		projectTableRow.append('<th>Key Status</th>');
	}
}

function generateSortOptions(viewName){	
	//Create the options here for Sort Project 
	$('#sortProjectsValue').empty();
	if(viewName == "project"){
		
		createSortProjectOption("Warehouse", "0");
		createSortProjectOption("MCS Number", "1");
		createSortProjectOption("Item", "2");
		createSortProjectOption("Manager", "7");
		createSortProjectOption("Start Date", "5");
		createSortProjectOption("End Date", "6");
		createSortProjectOption("Status", "4");		
	}
	if(viewName == "proposal"){
		
		createSortProjectOption("Warehouse", "0");
		createSortProjectOption("MCS Number", "1");
		createSortProjectOption("Item", "2");
		createSortProjectOption("Manager", "3");
		createSortProjectOption("Scope Date", "4");
		createSortProjectOption("Schedule", "5");
		createSortProjectOption("Due Date", "6");		
	}
}

function createSortProjectOption(text, value){
	var sortProjectsDropDown = document.getElementById("sortProjectsValue");
	var sortOption = document.createElement("option");
	sortOption.text = text;
	sortOption.value = value;
	sortProjectsDropDown.add(sortOption);	
}


/**
 * This function retrieves data for a specific project from the server
 * INNER FUNCTION CALLS: setProjectHeader(), fillTabs_CLOSEOUT(), getDropdownItems_CLOSEOUT()
 * @param project to edit
 * @returns
 */
function getProjectEnums_CLOSEOUT(edit)
{
	if (PAGETYPE_CLOSEOUT == 'closeout')
	{
		
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
	if (json.closeoutDetails != null)
	{	
		
		$('#closeoutData').find("#airGas").val(json.closeoutDetails.airGas);
		$('#closeoutData').find("#permits").val(json.closeoutDetails.permitsClosed);
		$('#closeoutData').find("#asBuilts").val(json.closeoutDetails.asBuilts);
		$('#closeoutData').find("#costcoSignoff").val(json.closeoutDetails.costcoSignoff);
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
			else if(changeOrder.status === "4")
				completed = completed + 1;
		}	
		
		$('#closeoutData').find("#numOfMCSChangeOrdersCompleted").val(completed);
		
		/* Field not being used anymore
		$('#closeoutData').find("#tmpCertificateStatus").val(convertDefault(json.closeoutDetails.tmpCertificateStatus));
		$('#closeoutData').find("#tmpCertificateDate").val(json.closeoutDetails.tmpCertificateDate);
		
		$('#closeoutData').find("#certificateStatus").val(convertDefault(json.closeoutDetails.certificateStatus));
		$('#closeoutData').find("#certificateDate").val(json.closeoutDetails.certificateDate);
		
		$('#closeoutData').find("#elecFinalNotes").val(json.closeoutDetails.elecFinalNotes);
		
		console.log("JSON P ", json.permits);
		*/	
		
		/* field not being used anymore
		$('#closeoutData').find("#mechFinalStatus").val(convertDefault(json.closeoutDetails.mechFinalStatus));
		$('#closeoutData').find("#mechFinalDate").val(json.closeoutDetails.mechFinalDate);
		
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
    
    	$('#closeoutData').find("#buildFinalStatus").val(convertDefault(json.closeoutDetails.buildingFinalStatus));
    	$('#closeoutData').find("#buildingPermitCL").val(json.closeoutDetails.buildingPermitCL);
		
		console.log("CS D", json.closeoutDetails);
		*/
		
		$('#closeoutData').find("#equipmentSubmittalStatus").val(convertDefault(json.closeoutDetails.equipmentSubmittalStatus));
		
		$('#closeoutData').find("#manualStatus").val(convertDefault(json.closeoutDetails.manualStatus));
		$('#closeoutData').find("#manualDate").val(json.closeoutDetails.manualDate);
		
		$('#closeoutData').find("#costcoSignoffStatus").val(convertDefault(json.closeoutDetails.costcoSignoffStatus));
		$('#closeoutData').find("#punchListStatus").val(convertDefault(json.closeoutDetails.punchListStatus));
		
		
		$('#closeoutData').find("#hvacCloseoutStatus").val(convertDefault(json.closeoutDetails.hvacCloseoutStatus));
		$('#closeoutData').find("#refrigerationCloseoutStatus").val(convertDefault(json.closeoutDetails.refrigerationCloseoutStatus));


		$('#closeoutData').find("#asBuiltDrawingsStatus").val(convertDefault(json.closeoutDetails.asBuiltDrawingsStatus));

		$('#closeoutData').find("#closeOutPhotosStatus").val(convertDefault(json.closeoutDetails.closeOutPhotosStatus));

		$('#closeoutData').find("#HVACstartupFormStatus").val(convertDefault(json.closeoutDetails.HVACstartupFormStatus));
		$('#closeoutData').find("#HVACstartupFormDate").val(json.closeoutDetails.HVACstartupFormDate);
		
		$('#closeoutData').find("#pbnMTStatus").val(convertDefault(json.closeoutDetails.pbnMTStatus));
		$('#closeoutData').find("#pbnMTDate").val(json.closeoutDetails.pbnMTDate);
		
		$('#closeoutData').find("#salvageStatus").val(convertDefault(json.closeoutDetails.salvageStatus));
		
		$('#closeoutData').find("#alarmFormStatus").val(convertDefault(json.closeoutDetails.alarmFormStatus));
		
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
		
	    console.log("SALVAGE AMOUNT FILL" ,	$('#otherItemsSalvageTable').find("#salvageAmount").val());		
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
    
    //sorts drop downs by id instead of alphabetical 
    json.sort(function(a , b) {
		if(a.id < b.id) return -1;
		else if(a.id > b.id ) return 1;
		else return 0;
	});
    
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
    var costcoSignoff = $('#closeoutData').find("#costcoSignoff").val();
    var punchList = $('#closeoutData').find("#punchList").val();
	var alarmHvac = $('#closeoutData').find("#alarmHvac").val();
	var verisae = $('#closeoutData').find("#verisae").val();
	var asBuilts = $('#closeoutData').find("#asBuilts").val();
	
	/* tempholder
	var buildingPermitCL = $('#closeoutData').find("#buildingPermitCL").val();
	*/
	
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
    
    /* Field not being used anymore
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
    */
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
    
    
    var hvacCloseoutStatus = $('#closeoutData').find("#hvacCloseoutStatus").val();
    var refrigerationCloseoutStatus = $('#closeoutData').find("#refrigerationCloseoutStatus").val();
    
    var costcoSignoffStatus = $('#closeoutData').find("#costcoSignoffStatus").val();
    
    var punchListStatus = $('#closeoutData').find("#punchListStatus").val();
    //punchList = punchListDate
    
    var asBuiltDrawingsStatus = $('#closeoutData').find("#asBuiltDrawingsStatus").val();
    // asBuilts = asBuiltDrawingsDate
    
    var closeOutPhotosStatus = $('#closeoutData').find("#closeOutPhotosStatus").val();
    //closeoutPhotosCL = closeOutPhotosDate
    
    var HVACstartupFormStatus = $('#closeoutData').find("#HVACstartupFormStatus").val();
    var HVACstartupFormDate = $('#closeoutData').find("#HVACstartupFormDate").val();
    
    var pbnMTStatus = $('#closeoutData').find("#pbnMTStatus").val();
    var pbnMTDate = $('#closeoutData').find("#pbnMTDate").val();
    
    var salvageStatus = $('#closeoutData').find("#salvageStatus").val();
    
    var alarmFormStatus = $('#closeoutData').find("#alarmFormStatus").val();
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
				/* Field not being used anymore
				buildingPermitCL,
    	*/
    	
				closeoutPhotosCL,
				MCSWarranty,//41
				equipmentSubCL,
				
				
				// new closeout info
				//mg2CompletionDate,
				
				MCSDate, GCDate, mechanicalDate, electricalDate, plumbingDate, gasDate,
				sprinkleDate, HTIDate, otherFinalLeinsDate,
				
				/* Fields not being used anymore
				sprinkleFinalDate, certificateDate, mechFinalDate, elecFinalDate, plumbingFinalDate, gasFinalDate, 
				ceilingFinalDate, fireAlarmFinalDate, lowVolFinalDate, tmpCertificateDate,
				*/
				
				GCWarrantyDate, mechanicalWarrantyDate, electricalWarrantyDate, sprinkleWarrantyDate, plumbingWarrantyDate, 
				gasWarrantyDate, HTIWarrantyDate, otherWarrantyDateA, otherWarrantyDateB,
				
				manualDate, HVACstartupFormDate, salvageDate, substantialCompletionDate, 
				paymentOfDebtsAndClaimsDate, releaseOfLiensDate, mulvannySignOffDate, asBuilts,
				costcoSignoff, punchList, alarmHvac, verisae
                ];
    
    
    if(isValidInput_CLOSEOUT(dates_CLOSEOUT))
    {
    	console.log("we got valid data now");
    	for(var i = 0; i < dates_CLOSEOUT.length; i++) {
    		if(dates_CLOSEOUT[i]) dates_CLOSEOUT[i] = dateCleaner(dates_CLOSEOUT[i]);
    		
    		/* Field not being used anymore
    		if(i == 0) buildingPermitCL = dates_CLOSEOUT[i];
    		
    		*/
    		if(i == 0) closeoutPhotosCL = dates_CLOSEOUT[i];
    		if(i == 1) MCSWarranty = dates_CLOSEOUT[i];
    		if(i == 2) equipmentSubCL = dates_CLOSEOUT[i];
    		if(i == 3) MCSDate = dates_CLOSEOUT[i];
    		if(i == 4) GCDate = dates_CLOSEOUT[i];
    		if(i == 5) mechanicalDate = dates_CLOSEOUT[i];
    		if(i == 6) electricalDate = dates_CLOSEOUT[i];
    		if(i == 7) plumbingDate = dates_CLOSEOUT[i];
    		if(i == 8) gasDate = dates_CLOSEOUT[i];
    		if(i == 9) sprinkleDate = dates_CLOSEOUT[i];
    		if(i == 10) HTIDate = dates_CLOSEOUT[i];
    		if(i == 11) otherFinalLeinsDate = dates_CLOSEOUT[i];
    		/* Field not being used anymore
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
    		*/
    		if(i == 12) GCWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 13) mechanicalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 14) electricalWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 15) sprinkleWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 16) plumbingWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 17) gasWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 18) HTIWarrantyDate = dates_CLOSEOUT[i];
    		if(i == 19) otherWarrantyDateA = dates_CLOSEOUT[i];
    		if(i == 20) otherWarrantyDateB = dates_CLOSEOUT[i];
    		if(i == 21) manualDate = dates_CLOSEOUT[i];
    		if(i == 22) HVACstartupFormDate = dates_CLOSEOUT[i];
    		if(i == 23) salvageDate = dates_CLOSEOUT[i];
    		if(i == 24) substantialCompletionDate = dates_CLOSEOUT[i];
    		if(i == 25) paymentOfDebtsAndClaimsDate = dates_CLOSEOUT[i];
    		if(i == 26) releaseOfLiensDate = dates_CLOSEOUT[i];
    		if(i == 27) mulvannySignOffDate = dates_CLOSEOUT[i];
    		if(i == 28) asBuilts = dates_CLOSEOUT[i];
    		if(i == 29) costcoSignoff = dates_CLOSEOUT[i];
    		if(i == 30) punchList = dates_CLOSEOUT[i];
    		if(i == 31) alarmHvac = dates_CLOSEOUT[i];
    		if(i == 32) verisae = dates_CLOSEOUT[i];
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
				'costcoSignoff':costcoSignoff,
				'punchList':punchList,
				'alarmHvac':alarmHvac,
				'verisae':verisae,
				
				/* field not being used anymore
				'buildingPermitCL':buildingPermitCL,
				*/
				
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
				
				/* field not being used anymore
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
				*/
				
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
				
				'costcoSignoffStatus':costcoSignoffStatus,
				'punchListStatus': punchListStatus,
				
				'hvacCloseoutStatus':hvacCloseoutStatus,
				'refrigerationCloseoutStatus':refrigerationCloseoutStatus,
				
				'asBuiltDrawingsStatus': asBuiltDrawingsStatus,
				
				'closeOutPhotosStatus': closeOutPhotosStatus,
				
				'HVACstartupFormStatus': HVACstartupFormStatus,
				'HVACstartupFormDate': HVACstartupFormDate,
				
				'pbnMTStatus': pbnMTStatus,
				'pbnMTDate': pbnMTDate,
				
				'salvageStatus': salvageStatus,
				
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

				alert('Project Saved');
				console.log(data);
				//UPDATE CLOSEOUT SUMMARY
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
				//UPDATE CLOSEOUT SUMMARY
				//getProject_PROJECT_MANAGER(projectID , 1);
				//goToProjectManager();

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
                				
                				/* field not being used anymore
                				"sprinkleFinalStatus", "certificateStatus", "tmpCertificateStatus", "mechFinalStatus", "elecFinalStatus",
                				"plumbingFinalStatus", "gasFinalStatus", "buildFinalStatus", "ceilingFinalStatus", "fireAlarmFinalStatus", 
                				"lowVolFinalStatus",
                				*/
                				
                				"MCSWarrantyStatus", "GCWarrantyStatus", "mechanicalWarrantyStatus", "electricalWarrantyStatus", "sprinkleWarrantyStatus", 
                				"plumbingWarrantyStatus", "gasWarrantyStatus", "HTIWarrantyStatus", "otherWarrantyStatusA", "otherWarrantyStatusB",
                				
                				"equipmentSubmittalStatus", "manualStatus", "costcoSignoffStatus", "punchListStatus", "asBuiltDrawingsStatus", 
                                "closeOutPhotosStatus", "HVACstartupFormStatus", "pbnMTStatus", "salvageStatus", "alarmFormStatus", "verisaeReportStatus",   
                                'substantialCompletionStatus', 'paymentOfDebtsAndClaimsStatus', 'releaseOfLiensStatus',
                                'mulvannySignOffStatus'/*, 'hvacCloseoutStatus', 'refrigerationCloseoutStatus'*/
                                                ];

//END OF CLOSEOUT DATA JAVASCRIPT

/**
* THE FOLLOWING JAVASCRIPT CORRESPONDS TO THE PERMITDATA.JS FILE
*/

var PAGETYPE_PERMIT = 'permit';



// This gets run upon loading and handles tabbing and the datepickers
$(document).ready(function(){
	
	
	$('#permitData').find('.nav-tabs > li').click(function () {
		if($(this).attr('id') !== 'save-permits' && $(this).attr('id') !== 'backToFailedRulesPermits' ) {
			$('#permitData').find('.info-tab').removeClass('active');
			$('#permitData').find('#' + $(this).attr('data-tab')).addClass('active');
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('#permitData').find('#saveButton > button').prop('disabled', true);
		}
	});
	$('#buildingPermitLastUpdated_1').datepicker();
	$('#buildingInspectionLastUpdated_1').datepicker();
	
	$('#ceilingPermitLastUpdated_1').datepicker();
	$('#ceilingInspectionLastUpdated_1').datepicker();
	
	$('#mechanicalPermitLastUpdated_1').datepicker();
	$('#mechanicalInspectionLastUpdated_1').datepicker();
	
	$('#electricalPermitLastUpdated_1').datepicker();
	$('#electricalInspectionLastUpdated_1').datepicker();
	
	$('#plumbingPermitLastUpdated_1').datepicker();
	$('#plumbingInspectionLastUpdated_1').datepicker();
	
	$('#gasPermitLastUpdated_1').datepicker();
	$('#gasInspectionLastUpdated_1').datepicker();
	
	$('#sprinklerPermitLastUpdated_1').datepicker();
	$('#sprinklerInspectionLastUpdated_1').datepicker();
	
	$('#fireAlarmPermitLastUpdated_1').datepicker();
	$('#fireAlarmInspectionLastUpdated_1').datepicker();
	
	$('#lowVoltagePermitLastUpdated_1').datepicker();
	$('#lowVoltageInspectionLastUpdated_1').datepicker();
	
	$('#tempCertOccupancyPermitLastUpdated_1').datepicker();
	$('#tempCertOccupancyInspectionLastUpdated_1').datepicker();
	
	$('#certOccupancyPermitLastUpdated_1').datepicker();
	$('#certOccupancyInspectionLastUpdated_1').datepicker();
	
	$('#buildPermExpireDate_1').datepicker();
	
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
	$('#permitData').find("#tempCertOccupancyPermitLastUpdated").datepicker();
	$('#permitData').find("#tempCertOccupancyInspectionLastUpdated").datepicker();
	
	//$('#permitData').find("#certOccupancyPermitLastUpdated").datepicker();
	//$('#permitData').find("#certOccupancyInspectionLastUpdated").datepicker();
	$('#permitData').find("#otherAPermitLastUpdated").datepicker();
	$('#permitData').find("#otherBPermitLastUpdated").datepicker();
	$('#permitData').find("#otherAInspectionLastUpdated").datepicker();
	$('#permitData').find("#otherBInspectionLastUpdated").datepicker();
	
	if(!($('#generalInformation').find('#autofill-Permits').val() == "default" || $('#generalInformation').find('#autofill-Permits').val() == undefined))
		$('.permitStatus, .inspectionStatus').change(function () {
			//console.log($(this).attr('data-associated-date'));
			$('#' + $(this).attr('data-associated-date')).val(getToday());
		});
	
	if(!($('#generalInformation').find('#autofill-Permits').val() == "default" || $('#generalInformation').find('#autofill-Permits').val() == undefined))
		$('.permitReq, .inspectionReq').change(function () {
			//console.log($(this).attr('data-associated-date'));
			$('#' + $(this).attr('data-associated-date')).val(getToday());
		});
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
				
				if(!autofilled){
					fillTabs_PERMIT(PROJECT_DATA);
					fillTabs_PERMIT1(PROJECT_DATA);
				}
				
				else
					fillPermitsAndInspectionsWithNA(PROJECT_DATA);
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
//			'permitreq' : true,
			'inspectionstatus' : true
		},
		success: function(data)
		{
			console.log("STATUSES" , data);
			fillDropdowns_PERMIT(data);
			if(EDIT_INTENTION == true)
				getProject_PERMIT();
		}
	});
}

function getProjectEnums_PERMIT1()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',	
			'permitstage': true ,
//			'permitreq' : true,
			'inspectionstatus' : true
		},
		success: function(data)
		{
			console.log("STATUSES" , data);
			fillDropdowns_PERMIT1(data);
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
		
	/*
		Akash
		Writing this piece of code to swap some values. Andy wanted the below order
		Preparing -> submitted -> approved -> issued -> closed -> N/A
		However the table in the database has a different order with id's which are already in use.
		That is why changing the order here on the front end.
	*/
	console.log("PERMIT STAGE IS", permitStage);
	var temp1 = permitStage[2];
	permitStage[2] = permitStage[4];
	var temp2 = permitStage[3];
	permitStage[3] = temp1;
	permitStage[4] = temp2;
	console.log("Changed PERMIT STAGE IS", permitStage);
	
	
	for(var i = 0; i < permitStage.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = permitStage[i].name;
		option.setAttribute("value", permitStage[i].name);
		d.appendChild(option);
	}
	
	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Status---";

	
	$('#permitData').find('.permitStatus').find('option').remove();
	$('#permitData').find('.permitStatus').append(defaultOption);
	$('#permitData').find('.permitStatus').append(d);
	
	var dd = document.createDocumentFragment();
	for (var i = 0; i < inspectionStage.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = inspectionStage[i].name;
		option.setAttribute("value", inspectionStage[i].name);
		dd.appendChild(option);
	}
	
	$('#permitData').find('.inspectionStatus').find('option').remove();
	$('#permitData').find('.inspectionStatus').append(defaultOption);
	$('#permitData').find('.inspectionStatus').append(dd);
	
}
function fillDropdowns_PERMIT1(json)
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
	
	/*
		Akash
		Writing this piece of code to swap some values. Andy wanted the below order
		Preparing -> submitted -> approved -> issued -> closed -> N/A
		However the table in the database has a different order with id's which are already in use.
		That is why changing the order here on the front end.
	*/
	
	
	console.log("PERMIT STAGE IS", permitStage);
	var temp1 = permitStage[2];
	permitStage[2] = permitStage[4];
	var temp2 = permitStage[3];
	permitStage[3] = temp1;
	permitStage[4] = temp2;
	console.log("Changed PERMIT STAGE IS", permitStage);
	
	
	for(var i = 0; i < permitStage.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = permitStage[i].name;
		option.setAttribute("value", permitStage[i].name);
		d.appendChild(option);
	}
	
	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Status---";

	
	$('#permitTable_1').find('.permitStatus').find('option').remove();
	$('#permitTable_1').find('.permitStatus').append(defaultOption);
	$('#permitTable_1').find('.permitStatus').append(d);
	
	
	var dd = document.createDocumentFragment();
	for (var i = 0; i < inspectionStage.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = inspectionStage[i].name;
		option.setAttribute("value", inspectionStage[i].name);
		dd.appendChild(option);
	}
	
	$('#permitTable_1').find('.inspectionStatus').find('option').remove();
	$('#permitTable_1').find('.inspectionStatus').append(defaultOption);
	$('#permitTable_1').find('.inspectionStatus').append(dd);

}


function fillPermitsAndInspectionsWithNA(data)
{
	var json = data;
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


function convertUndefined( value )
{
	if(value == undefined || value == "default")
		return "default";
	
	return value;
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
		$('#permitData').find("#buildingPermitStatus").val(convertUndefined(json.permits.buildingPermitStatus));
		$('#permitData').find("#buildingPermitReq").val(convertUndefined(json.permits.buildingPermitRequired));
		$('#permitData').find("#buildingInspectionReq").val(convertUndefined(json.permits.buildingInspectionRequired));
		$('#permitData').find("#buildingInspectionStatus").val(convertUndefined(json.permits.buildingInspectionStatus));
		$('#permitData').find("#buildingInspectionLastUpdated").val(json.permits.buildingInspectionLastUpdated);
		
		$('#permitData').find("#ceilingPermitLastUpdated").val(json.permits.ceiling);
		$('#permitData').find("#ceilingPermitStatus").val(convertUndefined(json.permits.ceilingPermitStatus));
		$('#permitData').find("#ceilingPermitReq").val(convertUndefined(json.permits.ceilingPermitRequired));
		$('#permitData').find("#ceilingInspectionReq").val(convertUndefined(json.permits.ceilingInspectionRequired));
		$('#permitData').find("#ceilingInspectionStatus").val(convertUndefined(json.permits.ceilingInspectionStatus));
		$('#permitData').find("#ceilingInspectionLastUpdated").val(json.permits.ceilingInspectionLastUpdated);
		
		$('#permitData').find("#mechanicalPermitLastUpdated").val(json.permits.mechanical);
		$('#permitData').find("#mechanicalPermitStatus").val(convertUndefined(json.permits.mechanicalPermitStatus));
		$('#permitData').find("#mechanicalPermitReq").val(convertUndefined(json.permits.mechanicalPermitRequired));
		$('#permitData').find("#mechanicalInspectionReq").val(convertUndefined(json.permits.mechanicalInspectionRequired));
		$('#permitData').find("#mechanicalInspectionStatus").val(convertUndefined(json.permits.mechanicalInspectionStatus));
		$('#permitData').find("#mechanicalInspectionLastUpdated").val(json.permits.mechanicalInspectionLastUpdated);
		
		$('#permitData').find("#electricalPermitLastUpdated").val(json.permits.electrical);
		$('#permitData').find("#electricalPermitStatus").val(convertUndefined(json.permits.electricalPermitStatus));
		$('#permitData').find("#electricalPermitReq").val(convertUndefined(json.permits.electricalPermitRequired));
		$('#permitData').find("#electricalInspectionReq").val(convertUndefined(json.permits.electricalInspectionRequired));
		$('#permitData').find("#electricalInspectionStatus").val(convertUndefined(json.permits.electricalInspectionStatus));
		$('#permitData').find("#electricalInspectionLastUpdated").val(json.permits.electricalInspectionLastUpdated);
		
		$('#permitData').find("#plumbingPermitLastUpdated").val(json.permits.plumbing);
		$('#permitData').find("#plumbingPermitStatus").val(convertUndefined(json.permits.plumbingPermitStatus));
		$('#permitData').find("#plumbingPermitReq").val(convertUndefined(json.permits.plumbingPermitRequired));
		$('#permitData').find("#plumbingInspectionReq").val(convertUndefined(json.permits.plumbingInspectionRequired));
		$('#permitData').find("#plumbingInspectionStatus").val(convertUndefined(json.permits.plumbingInspectionStatus));
		$('#permitData').find("#plumbingInspectionLastUpdated").val(json.permits.plumbingInspectionLastUpdated);
		
		$('#permitData').find("#gasPermitLastUpdated").val(json.permits.gas);
		$('#permitData').find("#gasPermitStatus").val(convertUndefined(json.permits.gasPermitStatus));
		$('#permitData').find("#gasPermitReq").val(convertUndefined(json.permits.gasPermitRequired));
		$('#permitData').find("#gasInspectionReq").val(convertUndefined(json.permits.gasInspectionRequired));
		$('#permitData').find("#gasInspectionStatus").val(convertUndefined(json.permits.gasInspectionStatus));
		$('#permitData').find("#gasInspectionLastUpdated").val(json.permits.gasInspectionLastUpdated);
		
		$('#permitData').find("#sprinklerPermitLastUpdated").val(json.permits.fire_sprinkler);
		$('#permitData').find("#sprinklerPermitStatus").val(convertUndefined(json.permits.sprinklerPermitStatus));
		$('#permitData').find("#sprinklerPermitReq").val(convertUndefined(json.permits.sprinklerPermitRequired));
		$('#permitData').find("#sprinklerInspectionReq").val(convertUndefined(json.permits.sprinklerInspectionRequired));
		$('#permitData').find("#sprinklerInspectionStatus").val(convertUndefined(json.permits.sprinklerInspectionStatus));
		$('#permitData').find("#sprinklerInspectionLastUpdated").val(json.permits.sprinklerInspectionLastUpdated);
		
		$('#permitData').find("#fireAlarmPermitLastUpdated").val(json.permits.fire_alarm);
		$('#permitData').find("#fireAlarmPermitStatus").val(convertUndefined(json.permits.fireAlarmPermitStatus));
		$('#permitData').find("#fireAlarmPermitReq").val(convertUndefined(json.permits.fireAlarmPermitRequired));
		$('#permitData').find("#fireAlarmInspectionReq").val(convertUndefined(json.permits.fireAlarmInspectionRequired));
		$('#permitData').find("#fireAlarmInspectionStatus").val(convertUndefined(json.permits.fireAlarmInspectionStatus));
		$('#permitData').find("#fireAlarmInspectionLastUpdated").val(json.permits.fireAlarmInspectionLastUpdated);
		
		$('#permitData').find("#voltagePermitLastUpdated").val(json.permits.low_voltage);
		$('#permitData').find("#voltagePermitStatus").val(convertUndefined(json.permits.voltagePermitStatus));
		$('#permitData').find("#voltagePermitReq").val(convertUndefined(json.permits.voltagePermitRequired));
		$('#permitData').find("#voltageInspectionReq").val(convertUndefined(json.permits.voltageInspectionRequired));
		$('#permitData').find("#voltageInspectionStatus").val(convertUndefined(json.permits.voltageInspectionStatus));
		$('#permitData').find("#voltageInspectionLastUpdated").val(json.permits.voltageInspectionLastUpdated);
		
		$('#permitData').find("#tempCertOccupancyPermitLastUpdated").val(json.permits.tempCertOccupancy);
		$('#permitData').find("#tempCertOccupancyPermitStatus").val(convertUndefined(json.permits.tempCertOccupancyPermitStatus));
		$('#permitData').find("#tempCertOccupancyPermitReq").val(convertUndefined(json.permits.tempCertOccupancyPermitRequired));
		$('#permitData').find("#tempCertOccupancyInspectionReq").val(convertUndefined(json.permits.tempCertOccupancyInspectionRequired));
		$('#permitData').find("#tempCertOccupancyInspectionStatus").val(convertUndefined(json.permits.tempCertOccupancyInspectionStatus));
		$('#permitData').find("#tempCertOccupancyInspectionLastUpdated").val(json.permits.tempCertOccupancyInspectionLastUpdated);
		
	    $('#permitData').find("#otherAPermitStatus").val(convertUndefined(json.permits.otherAPermitStatus));
	    $('#permitData').find("#otherAPermitLastUpdated").val(json.permits.otherAPermit);
//	    $('#permitData').find("#otherAPermitReq").val(json.permits.otherAPermitRequired);
//	    $('#permitData').find("#otherAInspectionReq").val(json.permits.otherAInspectionRequired);
	    $('#permitData').find("#otherAInspectionStatus").val(convertUndefined(json.permits.otherAInspectionStatus));
	    $('#permitData').find("#otherAInspectionLastUpdated").val(json.permits.otherAInspectionLastUpdated);
	    
	    $('#permitData').find("#otherBPermitStatus").val(convertUndefined(json.permits.otherBPermitStatus));
	    $('#permitData').find("#otherBPermitLastUpdated").val(json.permits.otherBPermit);
//	    $('#permitData').find("#otherBPermitReq").val(json.permits.otherBPermitRequired);
//	    $('#permitData').find("#otherBInspectionReq").val(json.permits.otherBInspectionRequired);
	    console.log(json.permits.otherBInspectionStatus);
	    $('#permitData').find("#otherBInspectionStatus").val(convertUndefined(json.permits.otherBInspectionStatus));
	    $('#permitData').find("#otherBInspectionLastUpdated").val(json.permits.otherBInspectionLastUpdated);
	    
	    
	    console.log(json.permits.permitNotes);
	    console.log(json.permits.inspectionNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "permitNotes", "permitData");
	    $('#permitData').find('#permitNotes').val(json.permits.permitNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "inspectionNotes", "permitData");
	    $('#permitData').find('#inspectionNotes').val(json.permits.inspectionNotes);
	}
	    
}
function fillTabs_PERMIT1(data)
{
	var json = data;
	

	
	console.log(json);
	if (json.permits != null)
	{	
		$('#buildingPermitLastUpdated_1').val(json.permits.building);
		$('#buildingPermitStatus_1').val(convertUndefined(json.permits.buildingPermitStatus));
		$('#buildingPermitRequired_1').val(convertUndefined(json.permits.buildingPermitRequired));
		$('#buildingInspectionRequired_1').val(convertUndefined(json.permits.buildingInspectionRequired));
		$('#buildingInspectionStatus_1').val(convertUndefined(json.permits.buildingInspectionStatus));
		$('#buildingInspectionLastUpdated_1').val(json.permits.buildingInspectionLastUpdated);
		
		$('#ceilingPermitLastUpdated_1').val(json.permits.ceiling);
		$('#ceilingPermitStatus_1').val(convertUndefined(json.permits.ceilingPermitStatus));
		$('#ceilingPermitRequired_1').val(convertUndefined(json.permits.ceilingPermitRequired));
		$('#ceilingInspectionRequired_1').val(convertUndefined(json.permits.ceilingInspectionRequired));
		$('#ceilingInspectionStatus_1').val(convertUndefined(json.permits.ceilingInspectionStatus));
		$('#ceilingInspectionLastUpdated_1').val(json.permits.ceilingInspectionLastUpdated);
	
		$('#mechanicalPermitLastUpdated_1').val(json.permits.mechanical);
		$('#mechanicalPermitStatus_1').val(convertUndefined(json.permits.mechanicalPermitStatus));
		$('#mechanicalPermitRequired_1').val(convertUndefined(json.permits.mechanicalPermitRequired));
		$('#mechanicalInspectionRequired_1').val(convertUndefined(json.permits.mechanicalInspectionRequired));
		$('#mechanicalInspectionStatus_1').val(convertUndefined(json.permits.mechanicalInspectionStatus));
		$('#mechanicalInspectionLastUpdated_1').val(json.permits.mechanicalInspectionLastUpdated);
		
		$('#electricalPermitLastUpdated_1').val(json.permits.electrical);
		$('#electricalPermitStatus_1').val(convertUndefined(json.permits.electricalPermitStatus));
		$('#electricalPermitRequired_1').val(convertUndefined(json.permits.electricalPermitRequired));
		$('#electricalInspectionRequired_1').val(convertUndefined(json.permits.electricalInspectionRequired));
		$('#electricalInspectionStatus_1').val(convertUndefined(json.permits.electricalInspectionStatus));
		$('#electricalInspectionLastUpdated_1').val(json.permits.electricalInspectionLastUpdated);
		
		$('#plumbingPermitLastUpdated_1').val(json.permits.plumbing);
		$('#plumbingPermitStatus_1').val(convertUndefined(json.permits.plumbingPermitStatus));
		$('#plumbingPermitRequired_1').val(convertUndefined(json.permits.plumbingPermitRequired));
		$('#plumbingInspectionRequired_1').val(convertUndefined(json.permits.plumbingInspectionRequired));
		$('#plumbingInspectionStatus_1').val(convertUndefined(json.permits.plumbingInspectionStatus));
		$('#plumbingInspectionLastUpdated_1').val(json.permits.plumbingInspectionLastUpdated);
		
		$('#gasPermitLastUpdated_1').val(json.permits.gas);
		$('#gasPermitStatus_1').val(convertUndefined(json.permits.gasPermitStatus));
		$('#gasPermitRequired_1').val(convertUndefined(json.permits.gasPermitRequired));
		$('#gasInspectionRequired_1').val(convertUndefined(json.permits.gasInspectionRequired));
		$('#gasInspectionStatus_1').val(convertUndefined(json.permits.gasInspectionStatus));
		$('#gasInspectionLastUpdated_1').val(json.permits.gasInspectionLastUpdated);
		
		$('#sprinklerPermitLastUpdated_1').val(json.permits.fire_sprinkler);
		$('#sprinklerPermitStatus_1').val(convertUndefined(json.permits.sprinklerPermitStatus));
		$('#sprinklerPermitRequired_1').val(convertUndefined(json.permits.sprinklerPermitRequired));
		$('#sprinklerInspectionRequired_1').val(convertUndefined(json.permits.sprinklerInspectionRequired));
		$('#sprinklerInspectionStatus_1').val(convertUndefined(json.permits.sprinklerInspectionStatus));
		$('#sprinklerInspectionLastUpdated_1').val(json.permits.sprinklerInspectionLastUpdated);
		
		$('#fireAlarmPermitLastUpdated_1').val(json.permits.fire_alarm);
		$('#fireAlarmPermitStatus_1').val(convertUndefined(json.permits.fireAlarmPermitStatus));
		$('#fireAlarmPermitRequired_1').val(convertUndefined(json.permits.fireAlarmPermitRequired));
		$('#fireAlarmInspectionRequired_1').val(convertUndefined(json.permits.fireAlarmInspectionRequired));
		$('#fireAlarmInspectionStatus_1').val(convertUndefined(json.permits.fireAlarmInspectionStatus));
		$('#fireAlarmInspectionLastUpdated_1').val(json.permits.fireAlarmInspectionLastUpdated);
		
		$('#lowVoltagePermitLastUpdated_1').val(json.permits.low_voltage);
		$('#lowVoltagePermitStatus_1').val(convertUndefined(json.permits.voltagePermitStatus));
		$('#lowVoltagePermitRequired_1').val(convertUndefined(json.permits.voltagePermitRequired));
		$('#lowVoltageInspectionRequired_1').val(convertUndefined(json.permits.voltageInspectionRequired));
		$('#lowVoltageInspectionStatus_1').val(convertUndefined(json.permits.voltageInspectionStatus));
		$('#lowVoltageInspectionLastUpdated_1').val(json.permits.voltageInspectionLastUpdated);

		$('#tempCertOccupancyPermitLastUpdated_1').val(json.permits.tempCertOccupancy);
		$('#tempCertOccupancyPermitStatus_1').val(convertUndefined(json.permits.tempCertOccupancyPermitStatus));
		$('#tempCertOccupancyPermitRequired_1').val(convertUndefined(json.permits.tempCertOccupancyPermitRequired));
		$('#tempCertOccupancyInspectionRequired_1').val(convertUndefined(json.permits.tempCertOccupancyInspectionRequired));
		$('#tempCertOccupancyInspectionStatus_1').val(convertUndefined(json.permits.tempCertOccupancyInspectionStatus));
		$('#tempCertOccupancyInspectionLastUpdated_1').val(json.permits.tempCertOccupancyInspectionLastUpdated);

		$('#certOccupancyPermitLastUpdated_1').val(json.permits.certOccupancy);
		$('#certOccupancyPermitStatus_1').val(convertUndefined(json.permits.certOccupancyPermitStatus));
		$('#certOccupancyPermitRequired_1').val(convertUndefined(json.permits.certOccupancyPermitRequired));
		$('#certOccupancyInspectionRequired_1').val(convertUndefined(json.permits.certOccupancyInspectionRequired));
		$('#certOccupancyInspectionStatus_1').val(convertUndefined(json.permits.certOccupancyInspectionStatus));
		$('#certOccupancyInspectionLastUpdated_1').val(json.permits.certOccupancyInspectionLastUpdated);
		
		
		$('#buildPermExpireDate_1').val(json.permits.buildPermExpireDate);

		
	    formatRelativeTextAreas(json.permits.permitNotes , "permitNotes", "permitData"); //What is this doing (A.G)
	    $('#permitNotes_1').val(json.permits.permitNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "inspectionNotes", "permitData");
	    $('#inspectionNotes_1').val(json.permits.inspectionNotes);
		
		/*
		
	    $('#permitData').find("#otherAPermitStatus").val(convertUndefined(json.permits.otherAPermitStatus));
	    $('#permitData').find("#otherAPermitLastUpdated").val(json.permits.otherAPermit);
//	    $('#permitData').find("#otherAPermitReq").val(json.permits.otherAPermitRequired);
//	    $('#permitData').find("#otherAInspectionReq").val(json.permits.otherAInspectionRequired);
	    $('#permitData').find("#otherAInspectionStatus").val(convertUndefined(json.permits.otherAInspectionStatus));
	    $('#permitData').find("#otherAInspectionLastUpdated").val(json.permits.otherAInspectionLastUpdated);
	    
	    $('#permitData').find("#otherBPermitStatus").val(convertUndefined(json.permits.otherBPermitStatus));
	    $('#permitData').find("#otherBPermitLastUpdated").val(json.permits.otherBPermit);
//	    $('#permitData').find("#otherBPermitReq").val(json.permits.otherBPermitRequired);
//	    $('#permitData').find("#otherBInspectionReq").val(json.permits.otherBInspectionRequired);
	    console.log(json.permits.otherBInspectionStatus);
	    $('#permitData').find("#otherBInspectionStatus").val(convertUndefined(json.permits.otherBInspectionStatus));
	    $('#permitData').find("#otherBInspectionLastUpdated").val(json.permits.otherBInspectionLastUpdated);
	    
	    
	    console.log(json.permits.permitNotes);
	    console.log(json.permits.inspectionNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "permitNotes", "permitData");
	    $('#permitData').find('#permitNotes').val(json.permits.permitNotes);
	    formatRelativeTextAreas(json.permits.permitNotes , "inspectionNotes", "permitData");
	    $('#permitData').find('#inspectionNotes').val(json.permits.inspectionNotes);*/
	}
	    
}


function fillBuilding()
{	
	if($('#permitData').find("#buildingPermitReq").val() == 1)
	{	
		$('#permitData').find("#buildingPermitStatus").val("TBD");
		$('#permitData').find("#buildingPermitLastUpdated").val(getToday());
	    $('#permitData').find("#buildingInspectionReq").val(1);
        $('#permitData').find("#buildingInspectionStatus").val("TBD");
        $('#permitData').find("#buildingInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#buildingPermitReq").val() == 2)
    {	
    	$('#permitData').find("#buildingPermitStatus").val("N/A");
    	$('#permitData').find("#buildingPermitLastUpdated").val(getToday());
		$('#permitData').find("#buildingInspectionReq").val(2);
		$('#permitData').find("#buildingInspectionStatus").val("N/A");
		$('#permitData').find("#buildingInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#buildingPermitReq").val() == 0)
    {	
    	$('#permitData').find("#buildingPermitStatus").val("TBD");
    	$('#permitData').find("#buildingPermitLastUpdated").val(getToday());
		$('#permitData').find("#buildingInspectionReq").val(0);
		$('#permitData').find("#buildingInspectionStatus").val("TBD");
		$('#permitData').find("#buildingInspectionLastUpdated").val(getToday());    
    }  
}

function fillBuilding1()
{	
	if($('#buildingPermitRequired_1').val() == 1)
	{	
		$('#buildingPermitStatus_1').val("Preparing");
		$('#buildingPermitLastUpdated_1').val(getToday());
	    $('#buildingInspectionRequired_1').val(1);
        $('#buildingInspectionStatus_1').val("TBD");
        $('#buildingInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#buildingPermitRequired_1').val() == 2)
    {	$('#buildingPermitStatus_1').val("N/A");
		$('#buildingPermitLastUpdated_1').val(getToday());
	    $('#buildingInspectionRequired_1').val(2);
	    $('#buildingInspectionStatus_1').val("N/A");
	    $('#buildingInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#buildingPermitRequired_1').val() == 0)
    {	
		$('#buildingPermitStatus_1').val("TBD");
		$('#buildingPermitLastUpdated_1').val(getToday());
	    $('#buildingInspectionRequired_1').val(0);
        $('#buildingInspectionStatus_1').val("TBD");
        $('#buildingInspectionLastUpdated_1').val(getToday());  
    }  
}


function fillCeiling()
{

	if($('#permitData').find("#ceilingPermitReq").val() == 1)
	{	
		$('#permitData').find("#ceilingPermitStatus").val("TBD");
		$('#permitData').find("#ceilingPermitLastUpdated").val(getToday());
	    $('#permitData').find("#ceilingInspectionReq").val(1);
        $('#permitData').find("#ceilingInspectionStatus").val("TBD");
        $('#permitData').find("#ceilingInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#ceilingPermitReq").val() == 2)
    {	
    	$('#permitData').find("#ceilingPermitStatus").val("N/A");
		$('#permitData').find("#ceilingPermitLastUpdated").val(getToday());
    	$('#permitData').find("#ceilingInspectionReq").val(2);
		$('#permitData').find("#ceilingInspectionStatus").val("N/A");
		$('#permitData').find("#ceilingInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#ceilingPermitReq").val() == 0)
    {	
    	$('#permitData').find("#ceilingPermitStatus").val("TBD");
		$('#permitData').find("#ceilingPermitLastUpdated").val(getToday());
    	$('#permitData').find("#ceilingInspectionReq").val(0);
		$('#permitData').find("#ceilingInspectionStatus").val("TBD");
		$('#permitData').find("#ceilingInspectionLastUpdated").val(getToday());    
    }   
}
function fillCeiling1()
{	
	if($('#ceilingPermitRequired_1').val() == 1)
	{	
		$('#ceilingPermitStatus_1').val("Preparing");
		$('#ceilingPermitLastUpdated_1').val(getToday());
	    $('#ceilingInspectionRequired_1').val(1);
        $('#ceilingInspectionStatus_1').val("TBD");
        $('#ceilingInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#ceilingPermitRequired_1').val() == 2)
    {	$('#ceilingPermitStatus_1').val("N/A");
		$('#ceilingPermitLastUpdated_1').val(getToday());
	    $('#ceilingInspectionRequired_1').val(2);
	    $('#ceilingInspectionStatus_1').val("N/A");
	    $('#ceilingInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#ceilingPermitRequired_1').val() == 0)
    {	
		$('#ceilingPermitStatus_1').val("TBD");
		$('#ceilingPermitLastUpdated_1').val(getToday());
	    $('#ceilingInspectionRequired_1').val(0);
        $('#ceilingInspectionStatus_1').val("TBD");
        $('#ceilingInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillMechanical()
{
	if($('#permitData').find("#mechanicalPermitReq").val() == 1)
	{	
		$('#permitData').find("#mechanicalPermitStatus").val("TBD");
		$('#permitData').find("#mechanicalPermitLastUpdated").val(getToday());
	    $('#permitData').find("#mechanicalInspectionReq").val(1);
        $('#permitData').find("#mechanicalInspectionStatus").val("TBD");
        $('#permitData').find("#mechanicalInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#mechanicalPermitReq").val() == 2)
    {	
    	$('#permitData').find("#mechanicalPermitStatus").val("N/A");
		$('#permitData').find("#mechanicalPermitLastUpdated").val(getToday());
    	$('#permitData').find("#mechanicalInspectionReq").val(2);
		$('#permitData').find("#mechanicalInspectionStatus").val("N/A");
		$('#permitData').find("#mechanicalInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#mechanicalPermitReq").val() == 0)
    {	
    	$('#permitData').find("#mechanicalPermitStatus").val("TBD");
		$('#permitData').find("#mechanicalPermitLastUpdated").val(getToday());
    	$('#permitData').find("#mechanicalInspectionReq").val(0);
		$('#permitData').find("#mechanicalInspectionStatus").val("TBD");
		$('#permitData').find("#mechanicalInspectionLastUpdated").val(getToday());    
    }    
}

function fillMechanical1()
{	
	if($('#mechanicalPermitRequired_1').val() == 1)
	{	
		$('#mechanicalPermitStatus_1').val("Preparing");
		$('#mechanicalPermitLastUpdated_1').val(getToday());
	    $('#mechanicalInspectionRequired_1').val(1);
        $('#mechanicalInspectionStatus_1').val("TBD");
        $('#mechanicalInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#mechanicalPermitRequired_1').val() == 2)
    {	$('#mechanicalPermitStatus_1').val("N/A");
		$('#mechanicalPermitLastUpdated_1').val(getToday());
	    $('#mechanicalInspectionRequired_1').val(2);
	    $('#mechanicalInspectionStatus_1').val("N/A");
	    $('#mechanicalInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#mechanicalPermitRequired_1').val() == 0)
    {	
		$('#mechanicalPermitStatus_1').val("TBD");
		$('#mechanicalPermitLastUpdated_1').val(getToday());
	    $('#mechanicalInspectionRequired_1').val(0);
        $('#mechanicalInspectionStatus_1').val("TBD");
        $('#mechanicalInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillElectrical()
{
	if($('#permitData').find("#electricalPermitReq").val() == 1)
	{	
		$('#permitData').find("#electricalPermitStatus").val("TBD");
		$('#permitData').find("#electricalPermitLastUpdated").val(getToday());
	    $('#permitData').find("#electricalInspectionReq").val(1);
        $('#permitData').find("#electricalInspectionStatus").val("TBD");
        $('#permitData').find("#electricalInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#electricalPermitReq").val() == 2)
    {	
    	$('#permitData').find("#electricalPermitStatus").val("N/A");
    	$('#permitData').find("#electricalPermitLastUpdated").val(getToday());
    	$('#permitData').find("#electricalInspectionReq").val(2);
		$('#permitData').find("#electricalInspectionStatus").val("N/A");
		$('#permitData').find("#electricalInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#electricalPermitReq").val() == 0)
    {	
    	$('#permitData').find("#electricalPermitStatus").val("TBD");
    	$('#permitData').find("#electricalPermitLastUpdated").val(getToday());
		$('#permitData').find("#electricalInspectionReq").val(0);
		$('#permitData').find("#electricalInspectionStatus").val("TBD");
		$('#permitData').find("#electricalInspectionLastUpdated").val(getToday());    
    }  
}

function fillElectrical1()
{	
	if($('#electricalPermitRequired_1').val() == 1)
	{	
		$('#electricalPermitStatus_1').val("Preparing");
		$('#electricalPermitLastUpdated_1').val(getToday());
	    $('#electricalInspectionRequired_1').val(1);
        $('#electricalInspectionStatus_1').val("TBD");
        $('#electricalInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#electricalPermitRequired_1').val() == 2)
    {	$('#electricalPermitStatus_1').val("N/A");
		$('#electricalPermitLastUpdated_1').val(getToday());
	    $('#electricalInspectionRequired_1').val(2);
	    $('#electricalInspectionStatus_1').val("N/A");
	    $('#electricalInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#electricalPermitRequired_1').val() == 0)
    {	
		$('#electricalPermitStatus_1').val("TBD");
		$('#electricalPermitLastUpdated_1').val(getToday());
	    $('#electricalInspectionRequired_1').val(0);
        $('#electricalInspectionStatus_1').val("TBD");
        $('#electricalInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillPlumbing()
{
	if($('#permitData').find("#plumbingPermitReq").val() == 1)
	{	
		$('#permitData').find("#plumbingPermitStatus").val("TBD");
		$('#permitData').find("#plumbingPermitLastUpdated").val(getToday());
	    $('#permitData').find("#plumbingInspectionReq").val(1);
        $('#permitData').find("#plumbingInspectionStatus").val("TBD");
        $('#permitData').find("#plumbingInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#plumbingPermitReq").val() == 2)
    {	
    	$('#permitData').find("#plumbingPermitStatus").val("N/A");
		$('#permitData').find("#plumbingPermitLastUpdated").val(getToday());
		$('#permitData').find("#plumbingInspectionReq").val(2);
		$('#permitData').find("#plumbingInspectionStatus").val("N/A");
		$('#permitData').find("#plumbingInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#plumbingPermitReq").val() == 0)
    {	
    	$('#permitData').find("#plumbingPermitStatus").val("TBD");
		$('#permitData').find("#plumbingPermitLastUpdated").val(getToday());
		$('#permitData').find("#plumbingInspectionReq").val(0);
		$('#permitData').find("#plumbingInspectionStatus").val("TBD");
		$('#permitData').find("#plumbingInspectionLastUpdated").val(getToday());    
    }  
}

function fillPlumbing1()
{	
	if($('#plumbingPermitRequired_1').val() == 1)
	{	
		$('#plumbingPermitStatus_1').val("Preparing");
		$('#plumbingPermitLastUpdated_1').val(getToday());
	    $('#plumbingInspectionRequired_1').val(1);
        $('#plumbingInspectionStatus_1').val("TBD");
        $('#plumbingInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#plumbingPermitRequired_1').val() == 2)
    {	$('#plumbingPermitStatus_1').val("N/A");
		$('#plumbingPermitLastUpdated_1').val(getToday());
	    $('#plumbingInspectionRequired_1').val(2);
	    $('#plumbingInspectionStatus_1').val("N/A");
	    $('#plumbingInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#plumbingPermitRequired_1').val() == 0)
    {	
		$('#plumbingPermitStatus_1').val("TBD");
		$('#plumbingPermitLastUpdated_1').val(getToday());
	    $('#plumbingInspectionRequired_1').val(0);
        $('#plumbingInspectionStatus_1').val("TBD");
        $('#plumbingInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillGas()
{
	if($('#permitData').find("#gasPermitReq").val() == 1)
	{	
		$('#permitData').find("#gasPermitStatus").val("TBD");
		$('#permitData').find("#gasPermitLastUpdated").val(getToday());
	    $('#permitData').find("#gasInspectionReq").val(1);
        $('#permitData').find("#gasInspectionStatus").val("TBD");
        $('#permitData').find("#gasInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#gasPermitReq").val() == 2)
    {	
    	$('#permitData').find("#gasPermitStatus").val("N/A");
		$('#permitData').find("#gasPermitLastUpdated").val(getToday());
    	$('#permitData').find("#gasInspectionReq").val(2);
		$('#permitData').find("#gasInspectionStatus").val("N/A");
		$('#permitData').find("#gasInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#gasPermitReq").val() == 0)
    {	
    	$('#permitData').find("#gasPermitStatus").val("TBD");
		$('#permitData').find("#gasPermitLastUpdated").val(getToday());
		$('#permitData').find("#gasInspectionReq").val(0);
		$('#permitData').find("#gasInspectionStatus").val("TBD");
		$('#permitData').find("#gasInspectionLastUpdated").val(getToday());    
    }   
}

function fillGas1()
{	
	if($('#gasPermitRequired_1').val() == 1)
	{	
		$('#gasPermitStatus_1').val("Preparing");
		$('#gasPermitLastUpdated_1').val(getToday());
	    $('#gasInspectionRequired_1').val(1);
        $('#gasInspectionStatus_1').val("TBD");
        $('#gasInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#gasPermitRequired_1').val() == 2)
    {	$('#gasPermitStatus_1').val("N/A");
		$('#gasPermitLastUpdated_1').val(getToday());
	    $('#gasInspectionRequired_1').val(2);
	    $('#gasInspectionStatus_1').val("N/A");
	    $('#gasInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#gasPermitRequired_1').val() == 0)
    {	
		$('#gasPermitStatus_1').val("TBD");
		$('#gasPermitLastUpdated_1').val(getToday());
	    $('#gasInspectionRequired_1').val(0);
        $('#gasInspectionStatus_1').val("TBD");
        $('#gasInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillSprinkler()
{
	if($('#permitData').find("#sprinklerPermitReq").val() == 1)
	{	
		$('#permitData').find("#sprinklerPermitStatus").val("TBD");
		$('#permitData').find("#sprinklerPermitLastUpdated").val(getToday());
	    $('#permitData').find("#sprinklerInspectionReq").val(1);
        $('#permitData').find("#sprinklerInspectionStatus").val("TBD");
        $('#permitData').find("#sprinklerInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#sprinklerPermitReq").val() == 2)
    {	
    	$('#permitData').find("#sprinklerPermitStatus").val("N/A");
		$('#permitData').find("#sprinklerPermitLastUpdated").val(getToday());
    	$('#permitData').find("#sprinklerInspectionReq").val(2);
		$('#permitData').find("#sprinklerInspectionStatus").val("N/A");
		$('#permitData').find("#sprinklerInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#sprinklerPermitReq").val() == 0)
    {	
    	$('#permitData').find("#sprinklerPermitStatus").val("TBD");
		$('#permitData').find("#sprinklerPermitLastUpdated").val(getToday());
		$('#permitData').find("#sprinklerInspectionReq").val(0);
		$('#permitData').find("#sprinklerInspectionStatus").val("TBD");
		$('#permitData').find("#sprinklerInspectionLastUpdated").val(getToday());    
    }  
}

function fillSprinkler1()
{	
	if($('#sprinklerPermitRequired_1').val() == 1)
	{	
		$('#sprinklerPermitStatus_1').val("Preparing");
		$('#sprinklerPermitLastUpdated_1').val(getToday());
	    $('#sprinklerInspectionRequired_1').val(1);
        $('#sprinklerInspectionStatus_1').val("TBD");
        $('#sprinklerInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#sprinklerPermitRequired_1').val() == 2)
    {	$('#sprinklerPermitStatus_1').val("N/A");
		$('#sprinklerPermitLastUpdated_1').val(getToday());
	    $('#sprinklerInspectionRequired_1').val(2);
	    $('#sprinklerInspectionStatus_1').val("N/A");
	    $('#sprinklerInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#sprinklerPermitRequired_1').val() == 0)
    {	
		$('#sprinklerPermitStatus_1').val("TBD");
		$('#sprinklerPermitLastUpdated_1').val(getToday());
	    $('#sprinklerInspectionRequired_1').val(0);
        $('#sprinklerInspectionStatus_1').val("TBD");
        $('#sprinklerInspectionLastUpdated_1').val(getToday());  
    }  
}


function fillFireAlarm()
{
	if($('#permitData').find("#fireAlarmPermitReq").val() == 1)
	{	
		$('#permitData').find("#fireAlarmPermitStatus").val("TBD");
		$('#permitData').find("#fireAlarmPermitLastUpdated").val(getToday());
	    $('#permitData').find("#fireAlarmInspectionReq").val(1);
        $('#permitData').find("#fireAlarmInspectionStatus").val("TBD");
        $('#permitData').find("#fireAlarmInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#fireAlarmPermitReq").val() == 2)
    {	
    	$('#permitData').find("#fireAlarmPermitStatus").val("N/A");
		$('#permitData').find("#fireAlarmPermitLastUpdated").val(getToday());
		$('#permitData').find("#fireAlarmInspectionReq").val(2);
		$('#permitData').find("#fireAlarmInspectionStatus").val("N/A");
		$('#permitData').find("#fireAlarmInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#fireAlarmPermitReq").val() == 0)
    {	
    	$('#permitData').find("#fireAlarmPermitStatus").val("TBD");
		$('#permitData').find("#fireAlarmPermitLastUpdated").val(getToday());
    	$('#permitData').find("#fireAlarmInspectionReq").val(0);
		$('#permitData').find("#fireAlarmInspectionStatus").val("TBD");
		$('#permitData').find("#fireAlarmInspectionLastUpdated").val(getToday());    
    }  
}

function fillfireAlarm1()
{	
	if($('#fireAlarmPermitRequired_1').val() == 1)
	{	
		$('#fireAlarmPermitStatus_1').val("Preparing");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(1);
        $('#fireAlarmInspectionStatus_1').val("TBD");
        $('#fireAlarmInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#fireAlarmPermitRequired_1').val() == 2)
    {	$('#fireAlarmPermitStatus_1').val("N/A");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(2);
	    $('#fireAlarmInspectionStatus_1').val("N/A");
	    $('#fireAlarmInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#fireAlarmPermitRequired_1').val() == 0)
    {	
		$('#fireAlarmPermitStatus_1').val("TBD");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(0);
        $('#fireAlarmInspectionStatus_1').val("TBD");
        $('#fireAlarmInspectionLastUpdated_1').val(getToday());  
    }  
}

function fillLowVoltage()
{
	if($('#permitData').find("#voltagePermitReq").val() == 1)
	{	
		$('#permitData').find("#voltagePermitStatus").val("TBD");
		$('#permitData').find("#voltagePermitLastUpdated").val(getToday());
	    $('#permitData').find("#voltageInspectionReq").val(1);
        $('#permitData').find("#voltageInspectionStatus").val("TBD");
        $('#permitData').find("#voltageInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#voltagePermitReq").val() == 2)
    {	
    	$('#permitData').find("#voltagePermitStatus").val("N/A");
		$('#permitData').find("#voltagePermitLastUpdated").val(getToday());
    	$('#permitData').find("#voltageInspectionReq").val(2);
		$('#permitData').find("#voltageInspectionStatus").val("N/A");
		$('#permitData').find("#voltageInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#voltagePermitReq").val() == 0)
    {	
    	$('#permitData').find("#voltagePermitStatus").val("TBD");
		$('#permitData').find("#voltagePermitLastUpdated").val(getToday());
		$('#permitData').find("#voltageInspectionReq").val(0);
		$('#permitData').find("#voltageInspectionStatus").val("TBD");
		$('#permitData').find("#voltageInspectionLastUpdated").val(getToday());    
    }  
}

function fillfireAlarm1()
{	
	if($('#fireAlarmPermitRequired_1').val() == 1)
	{	
		$('#fireAlarmPermitStatus_1').val("Preparing");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(1);
        $('#fireAlarmInspectionStatus_1').val("TBD");
        $('#fireAlarmInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#fireAlarmPermitRequired_1').val() == 2)
    {	$('#fireAlarmPermitStatus_1').val("N/A");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(2);
	    $('#fireAlarmInspectionStatus_1').val("N/A");
	    $('#fireAlarmInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#fireAlarmPermitRequired_1').val() == 0)
    {	
		$('#fireAlarmPermitStatus_1').val("TBD");
		$('#fireAlarmPermitLastUpdated_1').val(getToday());
	    $('#fireAlarmInspectionRequired_1').val(0);
        $('#fireAlarmInspectionStatus_1').val("TBD");
        $('#fireAlarmInspectionLastUpdated_1').val(getToday());  
    }  
}

function filllowVoltage1()
{	
	if($('#lowVoltagePermitRequired_1').val() == 1)
	{	
		$('#lowVoltagePermitStatus_1').val("Preparing");
		$('#lowVoltagePermitLastUpdated_1').val(getToday());
	    $('#lowVoltageInspectionRequired_1').val(1);
        $('#lowVoltageInspectionStatus_1').val("TBD");
        $('#lowVoltageInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#lowVoltagePermitRequired_1').val() == 2)
    {	$('#lowVoltagePermitStatus_1').val("N/A");
		$('#lowVoltagePermitLastUpdated_1').val(getToday());
	    $('#lowVoltageInspectionRequired_1').val(2);
	    $('#lowVoltageInspectionStatus_1').val("N/A");
	    $('#lowVoltageInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#lowVoltagePermitRequired_1').val() == 0)
    {	
		$('#lowVoltagePermitStatus_1').val("TBD");
		$('#lowVoltagePermitLastUpdated_1').val(getToday());
	    $('#lowVoltageInspectionRequired_1').val(0);
        $('#lowVoltageInspectionStatus_1').val("TBD");
        $('#lowVoltageInspectionLastUpdated_1').val(getToday());  
    }  
}	



function filltempCertOccupancy1()
{	
	if($('#tempCertOccupancyPermitRequired_1').val() == 1)
	{	
		$('#tempCertOccupancyPermitStatus_1').val("Preparing");
		$('#tempCertOccupancyPermitLastUpdated_1').val(getToday());
	    $('#tempCertOccupancyInspectionRequired_1').val(1);
        $('#tempCertOccupancyInspectionStatus_1').val("TBD");
        $('#tempCertOccupancyInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#tempCertOccupancyPermitRequired_1').val() == 2)
    {	$('#tempCertOccupancyPermitStatus_1').val("N/A");
		$('#tempCertOccupancyPermitLastUpdated_1').val(getToday());
	    $('#tempCertOccupancyInspectionRequired_1').val(2);
	    $('#tempCertOccupancyInspectionStatus_1').val("N/A");
	    $('#tempCertOccupancyInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#tempCertOccupancyPermitRequired_1').val() == 0)
    {	
		$('#tempCertOccupancyPermitStatus_1').val("TBD");
		$('#tempCertOccupancyPermitLastUpdated_1').val(getToday());
	    $('#tempCertOccupancyInspectionRequired_1').val(0);
        $('#tempCertOccupancyInspectionStatus_1').val("TBD");
        $('#tempCertOccupancyInspectionLastUpdated_1').val(getToday());  
    }  
}	

function fillcertOccupancy1()
{	
	if($('#certOccupancyPermitRequired_1').val() == 1)
	{	
		$('#certOccupancyPermitStatus_1').val("Preparing");
		$('#certOccupancyPermitLastUpdated_1').val(getToday());
	    $('#certOccupancyInspectionRequired_1').val(1);
        $('#certOccupancyInspectionStatus_1').val("TBD");
        $('#certOccupancyInspectionLastUpdated_1').val(getToday());
	}    
    else if($('#certOccupancyPermitRequired_1').val() == 2)
    {	$('#certOccupancyPermitStatus_1').val("N/A");
		$('#certOccupancyPermitLastUpdated_1').val(getToday());
	    $('#certOccupancyInspectionRequired_1').val(2);
	    $('#certOccupancyInspectionStatus_1').val("N/A");
	    $('#certOccupancyInspectionLastUpdated_1').val(getToday());
    	
    }
    else if($('#certOccupancyPermitRequired_1').val() == 0)
    {	
		$('#certOccupancyPermitStatus_1').val("TBD");
		$('#certOccupancyPermitLastUpdated_1').val(getToday());
	    $('#certOccupancyInspectionRequired_1').val(0);
        $('#certOccupancyInspectionStatus_1').val("TBD");
        $('#certOccupancyInspectionLastUpdated_1').val(getToday());  
    }  
}	



function fillOtherA()
{
	if($('#permitData').find("#otherAPermitReq").val() == 1)
	{	
		$('#permitData').find("#otherAPermitStatus").val("TBD");
        $('#permitData').find("#otherAPermitLastUpdated").val(getToday());
	    $('#permitData').find("#otherAInspectionReq").val(1);
        $('#permitData').find("#otherAInspectionStatus").val("TBD");
        $('#permitData').find("#otherAInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#otherAPermitReq").val() == 2)
    {	
    	$('#permitData').find("#otherAPermitStatus").val("N/A");
        $('#permitData').find("#otherAPermitLastUpdated").val(getToday());
		$('#permitData').find("#otherAInspectionReq").val(2);
		$('#permitData').find("#otherAInspectionStatus").val("N/A");
		$('#permitData').find("#otherAInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#otherAPermitReq").val() == 0)
    {	
    	$('#permitData').find("#otherAPermitStatus").val("TBD");
        $('#permitData').find("#otherAPermitLastUpdated").val(getToday());
		$('#permitData').find("#otherAInspectionReq").val(0);
		$('#permitData').find("#otherAInspectionStatus").val("TBD");
		$('#permitData').find("#otherAInspectionLastUpdated").val(getToday());    
    }  
   
}


function fillOtherB()
{

	if($('#permitData').find("#otherBPermitReq").val() == 1)
	{	
		$('#permitData').find("#otherBPermitStatus").val("TBD");
		$('#permitData').find("#otherBPermitLastUpdated").val(getToday());
		$('#permitData').find("#otherBInspectionReq").val(1);
        $('#permitData').find("#otherBInspectionStatus").val("TBD");
        $('#permitData').find("#otherBInspectionLastUpdated").val(getToday());
	}    
    else if($('#permitData').find("#otherBPermitReq").val() == 2)
    {	
    	$('#permitData').find("#otherBPermitStatus").val("N/A");
    	$('#permitData').find("#otherBPermitLastUpdated").val(getToday());
		$('#permitData').find("#otherBInspectionReq").val(2);
		$('#permitData').find("#otherBInspectionStatus").val("N/A");
		$('#permitData').find("#otherBInspectionLastUpdated").val(getToday());    
    }
    else if($('#permitData').find("#otherBPermitReq").val() == 0)
    {	
    	$('#permitData').find("#otherBPermitStatus").val("TBD");
    	$('#permitData').find("#otherBPermitLastUpdated").val(getToday());
		$('#permitData').find("#otherBInspectionReq").val(0);
		$('#permitData').find("#otherBInspectionStatus").val("TBD");
		$('#permitData').find("#otherBInspectionLastUpdated").val(getToday());    
    }  
}


/**
 * This function saves a certain project's permit info to the database
 * INNER FUNCTION CALLS: isValidInput_PERMIT(), updateFrontEnd()
 * @returns
 */
/*
function saveProject_PERMIT()
{
    console.log("Saving Permit Information");
	
    var buildingPermitReq = $('#permitData').find("#buildingPermitReq").val();
    var buildingPermitStatus = $('#permitData').find("#buildingPermitStatus").val();
    var buildingPermitLastUpdated = $('#permitData').find("#buildingPermitLastUpdated").val();
    var buildingInspectionReq = $('#permitData').find("#buildingInspectionReq").val();
    var buildingInspectionStatus = $('#permitData').find("#buildingInspectionStatus").val();
    var buildingInspectionLastUpdated = $('#permitData').find("#buildingInspectionLastUpdated").val();
    	
    var ceilingPermitReq = $('#permitData').find("#ceilingPermitReq").val();
    var ceilingPermitStatus = $('#permitData').find("#ceilingPermitStatus").val();
    var ceilingPermitLastUpdated = $('#permitData').find("#ceilingPermitLastUpdated").val();
    var ceilingInspectionReq = $('#permitData').find("#ceilingInspectionReq").val();
    var ceilingInspectionStatus = $('#permitData').find("#ceilingInspectionStatus").val();
    var ceilingInspectionLastUpdated = $('#permitData').find("#ceilingInspectionLastUpdated").val();
    
    var mechanicalPermitReq = $('#permitData').find("#mechanicalPermitReq").val();
    var mechanicalPermitStatus = $('#permitData').find("#mechanicalPermitStatus").val();
    var mechanicalPermitLastUpdated = $('#permitData').find("#mechanicalPermitLastUpdated").val();
    var mechanicalInspectionReq = $('#permitData').find("#mechanicalInspectionReq").val();
    var mechanicalInspectionStatus = $('#permitData').find("#mechanicalInspectionStatus").val();
    var mechanicalInspectionLastUpdated = $('#permitData').find("#mechanicalInspectionLastUpdated").val();
    
    var electricalPermitReq = $('#permitData').find("#electricalPermitReq").val();
    var electricalPermitStatus = $('#permitData').find("#electricalPermitStatus").val();
    var electricalPermitLastUpdated = $('#permitData').find("#electricalPermitLastUpdated").val();
    var electricalInspectionReq = $('#permitData').find("#electricalInspectionReq").val();
    var electricalInspectionStatus = $('#permitData').find("#electricalInspectionStatus").val();
    var electricalInspectionLastUpdated = $('#permitData').find("#electricalInspectionLastUpdated").val();
    
    var plumbingPermitReq = $('#permitData').find("#plumbingPermitReq").val();
    var plumbingPermitStatus = $('#permitData').find("#plumbingPermitStatus").val();
    var plumbingPermitLastUpdated = $('#permitData').find("#plumbingPermitLastUpdated").val();
    var plumbingInspectionReq = $('#permitData').find("#plumbingInspectionReq").val();
    var plumbingInspectionStatus = $('#permitData').find("#plumbingInspectionStatus").val();
    var plumbingInspectionLastUpdated = $('#permitData').find("#plumbingInspectionLastUpdated").val();
    
    var gasPermitReq = $('#permitData').find("#gasPermitReq").val();
    var gasPermitStatus = $('#permitData').find("#gasPermitStatus").val();
    var gasPermitLastUpdated = $('#permitData').find("#gasPermitLastUpdated").val();
    var gasInspectionReq = $('#permitData').find("#gasInspectionReq").val();
    var gasInspectionStatus = $('#permitData').find("#gasInspectionStatus").val();
    var gasInspectionLastUpdated = $('#permitData').find("#gasInspectionLastUpdated").val();
    
    var sprinklerPermitReq = $('#permitData').find("#sprinklerPermitReq").val();
    var sprinklerPermitStatus = $('#permitData').find("#sprinklerPermitStatus").val();
    var sprinklerPermitLastUpdated = $('#permitData').find("#sprinklerPermitLastUpdated").val();
    var sprinklerInspectionReq = $('#permitData').find("#sprinklerInspectionReq").val();
    var sprinklerInspectionStatus = $('#permitData').find("#sprinklerInspectionStatus").val();
    var sprinklerInspectionLastUpdated = $('#permitData').find("#sprinklerInspectionLastUpdated").val();
    
    var fireAlarmPermitReq = $('#permitData').find("#fireAlarmPermitReq").val();
    var fireAlarmPermitStatus = $('#permitData').find("#fireAlarmPermitStatus").val();
    var fireAlarmPermitLastUpdated = $('#permitData').find("#fireAlarmPermitLastUpdated").val();
    var fireAlarmInspectionReq = $('#permitData').find("#fireAlarmInspectionReq").val();
    var fireAlarmInspectionStatus = $('#permitData').find("#fireAlarmInspectionStatus").val();
    var fireAlarmInspectionLastUpdated = $('#permitData').find("#fireAlarmInspectionLastUpdated").val();
    
    var voltagePermitReq = $('#permitData').find("#voltagePermitReq").val();
    var voltagePermitStatus = $('#permitData').find("#voltagePermitStatus").val();
    var voltagePermitLastUpdated = $('#permitData').find("#voltagePermitLastUpdated").val();
    var voltageInspectionReq = $('#permitData').find("#voltageInspectionReq").val();
    var voltageInspectionStatus = $('#permitData').find("#voltageInspectionStatus").val();
    var voltageInspectionLastUpdated = $('#permitData').find("#voltageInspectionLastUpdated").val();
    
    //Temp Certificate of Occupancy
    var tempCertOccupancyReq = $('#permitData').find("#tempCertOccupancyPermitReq").val();
    var tempCertOccupancyStatus = $('#permitData').find("#tempCertOccupancyPermitStatus").val();
    var tempCertOccupancyPermitLastUpdated = $('#permitData').find("#tempCertOccupancyPermitLastUpdated").val();
    var tempCertOccupancyInspectionReq = $('#permitData').find("#tempCertOccupancyInspectionReq").val();
    var tempCertOccupancyInspectionStatus = $('#permitData').find("#tempCertOccupancyInspectionStatus").val();
    var tempCertOccupancyLastUpdated = $('#permitData').find("#tempCertOccupancyInspectionLastUpdated").val();
    
 //   var otherAPermitReq = $('#permitData').find("#otherAPermitReq").val();
    var otherAPermitStatus = $('#permitData').find("#otherAPermitStatus").val();
    var otherAPermitLastUpdated = $('#permitData').find("#otherAPermitLastUpdated").val();
 //   var otherAInspectionReq = $('#permitData').find("#otherAInspectionReq").val();
    var otherAInspectionStatus = $('#permitData').find("#otherAInspectionStatus").val();
    var otherAInspectionLastUpdated = $('#permitData').find("#otherAInspectionLastUpdated").val();
    
 //   var otherBPermitReq = $('#permitData').find("#otherBPermitReq").val();
    var otherBPermitStatus = $('#permitData').find("#otherBPermitStatus").val();
    var otherBPermitLastUpdated = $('#permitData').find("#otherBPermitLastUpdated").val();
 //   var otherBInspectionReq = $('#permitData').find("#otherBInspectionReq").val();
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
				tempCertOccupancyPermitLastUpdated,tempCertOccupancyInspectionLastUpdated,
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
    		if(i == 22) tempCertOccupancyPermitLastUpdated = dates_PERMIT[i];
    		if(i == 23) tempCertOccupancyInspectionLastUpdated = dates_PERMIT[i];
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
				'buildingPermitReq': buildingPermitReq,
				'buildingInspectionReq': buildingInspectionReq,
				'buildingInspectionStatus': buildingInspectionStatus,
				'buildingInspectionLastUpdated': buildingInspectionLastUpdated,
				
				'mechanical_p' :mechanicalPermitLastUpdated,
				'mechanicalPermitStatus': mechanicalPermitStatus,
				'mechanicalPermitReq': mechanicalPermitReq,
				'mechanicalInspectionReq': mechanicalInspectionReq,
				'mechanicalInspectionStatus': mechanicalInspectionStatus,
				'mechanicalInspectionLastUpdated': mechanicalInspectionLastUpdated,
				
				'electrical_p':electricalPermitLastUpdated,
				'electricalPermitStatus': electricalPermitStatus,
				'electricalPermitReq': electricalPermitReq,
				'electricalInspectionReq': electricalInspectionReq,
				'electricalInspectionStatus': electricalInspectionStatus,
				'electricalInspectionLastUpdated': electricalInspectionLastUpdated,
				
				'plumbing_p':plumbingPermitLastUpdated,
				'plumbingPermitStatus': plumbingPermitStatus,
				'plumbingPermitReq': plumbingPermitReq,
				'plumbingInspectionReq': plumbingInspectionReq,
				'plumbingInspectionStatus': plumbingInspectionStatus,
				'plumbingInspectionLastUpdated': plumbingInspectionLastUpdated,
				
				'fireSprinkler_p':sprinklerPermitLastUpdated,
				'sprinklerPermitStatus': sprinklerPermitStatus,
				'sprinklerPermitReq': sprinklerPermitReq,
				'sprinklerInspectionReq': sprinklerInspectionReq,
				'sprinklerInspectionStatus': sprinklerInspectionStatus,
				'sprinklerInspectionLastUpdated': sprinklerInspectionLastUpdated,
				
				'fireAlarm_p':fireAlarmPermitLastUpdated, 
				'fireAlarmPermitStatus': fireAlarmPermitStatus,
				'fireAlarmPermitReq': fireAlarmPermitReq,
				'fireAlarmInspectionReq': fireAlarmInspectionReq,
				'fireAlarmInspectionStatus': fireAlarmInspectionStatus,
				'fireAlarmInspectionLastUpdated': fireAlarmInspectionLastUpdated,
				
				'lowVoltage_p':voltagePermitLastUpdated,
				'voltagePermitStatus': voltagePermitStatus,
				'voltagePermitReq': voltagePermitReq,
				'voltageInspectionReq': voltageInspectionReq,
				'voltageInspectionStatus': voltageInspectionStatus,
				'voltageInspectionLastUpdated': voltageInspectionLastUpdated,
				
				'ceilingPermit': ceilingPermitLastUpdated,
				'ceilingPermitStatus': ceilingPermitStatus,
				'ceilingPermitReq': ceilingPermitReq,
				'ceilingInspectionReq': ceilingInspectionReq,
				'ceilingInspectionStatus': ceilingInspectionStatus,
				'ceilingInspectionLastUpdated': ceilingInspectionLastUpdated,
				
				'gasPermit': gasPermitLastUpdated,
				'gasPermitStatus': gasPermitStatus,
				'gasPermitReq': gasPermitReq,
				'gasInspectionReq': gasInspectionReq,
				'gasInspectionStatus': gasInspectionStatus,
				'gasInspectionLastUpdated': gasInspectionLastUpdated,
				
				'tempCertOccupancy_p': tempCertOccupancyLastUpdated,
				'tempCertOccupancyStatus': tempCertOccupancyStatus,
				'tempCertOccupancyReq': tempCertOccupancyReq,
				'tempCertOccupancyInspectionReq': tempCertOccupancyInspectionReq,
				'tempCertOccupancyInspectionStatus': tempCertOccupancyInspectionStatus,
				'tempCertOccupancyLastUpdated': tempCertOccupancyLastUpdated,
				
				'otherPermitA': otherAPermitLastUpdated,
				'otherAPermitStatus': otherAPermitStatus,
	//			'otherAPermitReq': otherAPermitReq,
	//			'otherAInspectionReq': otherAInspectionReq,
				'otherAInspectionStatus': otherAInspectionStatus,
				'otherAInspectionLastUpdated': otherAInspectionLastUpdated,
				
				'otherBPermit': otherBPermitLastUpdated,
				'otherBPermitStatus': otherBPermitStatus,
	//			'otherBPermitReq': otherBPermitReq,
	//			'otherBInspectionReq': otherBInspectionReq,
				'otherBInspectionStatus': otherBInspectionStatus,
				'otherBInspectionLastUpdated': otherBInspectionLastUpdated,

				'permitNotes': permitNotes,
				'inspectionNotes': inspectionNotes
			},
			success:function(data){
				console.log(data);
				updateFrontEnd();
				alert('Save Complete!');
				
				
				//getProject_PROJECT_MANAGER(projectID , 1);
				
				//goToProjectManager();

			},
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function(data)
			{
				console.log(data);
				updateFrontEnd();
				//getProject_PROJECT_MANAGER(projectID , 1);
				alert('Save Complete!');

				//goToProjectManager();
			
				
			}
		});
    }  
}
*/

function saveProject_PERMIT1()
{
    console.log("Saving Permit Information");
	
    var buildingPermitReq = $("#buildingPermitRequired_1").val();
    var buildingPermitStatus = $("#buildingPermitStatus_1").val();
    var buildingPermitLastUpdated = $("#buildingPermitLastUpdated_1").val();
    var buildingInspectionReq = $("#buildingInspectionRequired_1").val();
    var buildingInspectionStatus = $("#buildingInspectionStatus_1").val();
    var buildingInspectionLastUpdated = $("#buildingInspectionLastUpdated_1").val();
    	
    var ceilingPermitReq = $("#ceilingPermitRequired_1").val();
    var ceilingPermitStatus = $("#ceilingPermitStatus_1").val();
    var ceilingPermitLastUpdated = $("#ceilingPermitLastUpdated_1").val();
    var ceilingInspectionReq = $("#ceilingInspectionRequired_1").val();
    var ceilingInspectionStatus = $("#ceilingInspectionStatus_1").val();
    var ceilingInspectionLastUpdated = $("#ceilingInspectionLastUpdated_1").val();
    
    var mechanicalPermitReq = $("#mechanicalPermitRequired_1").val();
    var mechanicalPermitStatus = $("#mechanicalPermitStatus_1").val();
    var mechanicalPermitLastUpdated = $("#mechanicalPermitLastUpdated_1").val();
    var mechanicalInspectionReq = $("#mechanicalInspectionRequired_1").val();
    var mechanicalInspectionStatus = $("#mechanicalInspectionStatus_1").val();
    var mechanicalInspectionLastUpdated = $("#mechanicalInspectionLastUpdated_1").val();
    
    var electricalPermitReq = $("#electricalPermitRequired_1").val();
    var electricalPermitStatus = $("#electricalPermitStatus_1").val();
    var electricalPermitLastUpdated = $("#electricalPermitLastUpdated_1").val();
    var electricalInspectionReq = $("#electricalInspectionRequired_1").val();
    var electricalInspectionStatus = $("#electricalInspectionStatus_1").val();
    var electricalInspectionLastUpdated = $("#electricalInspectionLastUpdated_1").val();
    
    var plumbingPermitReq = $("#plumbingPermitRequired_1").val();
    var plumbingPermitStatus = $("#plumbingPermitStatus_1").val();
    var plumbingPermitLastUpdated = $("#plumbingPermitLastUpdated_1").val();
    var plumbingInspectionReq = $("#plumbingInspectionRequired_1").val();
    var plumbingInspectionStatus = $("#plumbingInspectionStatus_1").val();
    var plumbingInspectionLastUpdated = $("#plumbingInspectionLastUpdated_1").val();
    
    var gasPermitReq = $("#gasPermitRequired_1").val();
    var gasPermitStatus = $("#gasPermitStatus_1").val();
    var gasPermitLastUpdated = $("#gasPermitLastUpdated_1").val();
    var gasInspectionReq = $("#gasInspectionRequired_1").val();
    var gasInspectionStatus = $("#gasInspectionStatus_1").val();
    var gasInspectionLastUpdated = $("#gasInspectionLastUpdated_1").val();
    
    var sprinklerPermitReq = $("#sprinklerPermitRequired_1").val();
    var sprinklerPermitStatus = $("#sprinklerPermitStatus_1").val();
    var sprinklerPermitLastUpdated = $("#sprinklerPermitLastUpdated_1").val();
    var sprinklerInspectionReq = $("#sprinklerInspectionRequired_1").val();
    var sprinklerInspectionStatus = $("#sprinklerInspectionStatus_1").val();
    var sprinklerInspectionLastUpdated = $("#sprinklerInspectionLastUpdated_1").val();
    
    var fireAlarmPermitReq = $("#fireAlarmPermitRequired_1").val();
    var fireAlarmPermitStatus = $("#fireAlarmPermitStatus_1").val();
    var fireAlarmPermitLastUpdated = $("#fireAlarmPermitLastUpdated_1").val();
    var fireAlarmInspectionReq = $("#fireAlarmInspectionRequired_1").val();
    var fireAlarmInspectionStatus = $("#fireAlarmInspectionStatus_1").val();
    var fireAlarmInspectionLastUpdated = $("#fireAlarmInspectionLastUpdated_1").val();
    
    var voltagePermitReq = $("#lowVoltagePermitRequired_1").val();
    var voltagePermitStatus = $("#lowVoltagePermitStatus_1").val();
    var voltagePermitLastUpdated = $("#lowVoltagePermitLastUpdated_1").val();
    var voltageInspectionReq = $("#lowVoltageInspectionRequired_1").val();
    var voltageInspectionStatus = $("#lowVoltageInspectionStatus_1").val();
    var voltageInspectionLastUpdated = $("#lowVoltageInspectionLastUpdated_1").val();

    var tempCertOccupancyPermitReq = $("#tempCertOccupancyPermitRequired_1").val();
    var tempCertOccupancyPermitStatus = $("#tempCertOccupancyPermitStatus_1").val();
    var tempCertOccupancyPermitLastUpdated = $("#tempCertOccupancyPermitLastUpdated_1").val();
    var tempCertOccupancyInspectionReq = $("#tempCertOccupancyInspectionRequired_1").val();
    var tempCertOccupancyInspectionStatus = $("#tempCertOccupancyInspectionStatus_1").val();
    var tempCertOccupancyInspectionLastUpdated = $("#tempCertOccupancyInspectionLastUpdated_1").val();
    
    var certOccupancyPermitReq = $("#certOccupancyPermitRequired_1").val();
    var certOccupancyPermitStatus = $("#certOccupancyPermitStatus_1").val();
    var certOccupancyPermitLastUpdated = $("#certOccupancyPermitLastUpdated_1").val();
    var certOccupancyInspectionReq = $("#certOccupancyInspectionRequired_1").val();
    var certOccupancyInspectionStatus = $("#certOccupancyInspectionStatus_1").val();
    var certOccupancyInspectionLastUpdated = $("#certOccupancyInspectionLastUpdated_1").val();
    
    var buildPermExpireDate = $("#buildPermExpireDate_1").val();
    
    //Akash - Don't know why Lily or the previous developer commeneted some lines. It's working good without them. I am leaving them be.
    //I have given these otherA and otherB the same values as lowVoltage for now. So that in the future I can append the actual ones if they need these
 //   var otherAPermitReq = $("#lowVoltagePermitRequired_1").val();
    var otherAPermitStatus = $("#lowVoltagePermitStatus_1").val();
    var otherAPermitLastUpdated = $("#lowVoltagePermitLastUpdated_1").val();
 //   var otherAInspectionReq = $("#lowVoltageInspectionRequired_1").val();
    var otherAInspectionStatus = $("#lowVoltageInspectionStatus_1").val();
    var otherAInspectionLastUpdated = $("#lowVoltageInspectionLastUpdated_1").val();
    
 //   var otherBPermitReq = $("#lowVoltagePermitRequired_1").val();
    var otherBPermitStatus = $("#lowVoltagePermitStatus_1").val();
    var otherBPermitLastUpdated = $("#lowVoltagePermitLastUpdated_1").val();
 //   var otherBInspectionReq = $("#lowVoltageInspectionRequired_1").val();
    var otherBInspectionStatus = $("#lowVoltageInspectionStatus_1").val();
    var otherBInspectionLastUpdated = $("#lowVoltageInspectionLastUpdated_1").val();

    var permitNotes = $('#permitNotes_1').val();
    var inspectionNotes = $('#inspectionNotes_1').val();
    
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
				tempCertOccupancyPermitLastUpdated, tempCertOccupancyInspectionLastUpdated,
				certOccupancyPermitLastUpdated, certOccupancyInspectionLastUpdated,
				//buildPermExpireDate,
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
    		if(i == 22) tempCertOccupancyPermitLastUpdated = dates_PERMIT[i];
    		if(i == 23) tempCertOccupancyInspectionLastUpdated = dates_PERMIT[i];
    		if(i == 24) certOccupancyPermitLastUpdated = dates_PERMIT[i];
    		if(i == 25) certOccupancyInspectionLastUpdated = dates_PERMIT[i];
    		//if(i == 26) buildPermExpireDate = dates_PERMIT[i];
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
				'buildingPermitReq': buildingPermitReq,
				'buildingInspectionReq': buildingInspectionReq,
				'buildingInspectionStatus': buildingInspectionStatus,
				'buildingInspectionLastUpdated': buildingInspectionLastUpdated,
				
				'mechanical_p' :mechanicalPermitLastUpdated,
				'mechanicalPermitStatus': mechanicalPermitStatus,
				'mechanicalPermitReq': mechanicalPermitReq,
				'mechanicalInspectionReq': mechanicalInspectionReq,
				'mechanicalInspectionStatus': mechanicalInspectionStatus,
				'mechanicalInspectionLastUpdated': mechanicalInspectionLastUpdated,
				
				'electrical_p':electricalPermitLastUpdated,
				'electricalPermitStatus': electricalPermitStatus,
				'electricalPermitReq': electricalPermitReq,
				'electricalInspectionReq': electricalInspectionReq,
				'electricalInspectionStatus': electricalInspectionStatus,
				'electricalInspectionLastUpdated': electricalInspectionLastUpdated,
				
				'plumbing_p':plumbingPermitLastUpdated,
				'plumbingPermitStatus': plumbingPermitStatus,
				'plumbingPermitReq': plumbingPermitReq,
				'plumbingInspectionReq': plumbingInspectionReq,
				'plumbingInspectionStatus': plumbingInspectionStatus,
				'plumbingInspectionLastUpdated': plumbingInspectionLastUpdated,
				
				'fireSprinkler_p':sprinklerPermitLastUpdated,
				'sprinklerPermitStatus': sprinklerPermitStatus,
				'sprinklerPermitReq': sprinklerPermitReq,
				'sprinklerInspectionReq': sprinklerInspectionReq,
				'sprinklerInspectionStatus': sprinklerInspectionStatus,
				'sprinklerInspectionLastUpdated': sprinklerInspectionLastUpdated,
				
				'fireAlarm_p':fireAlarmPermitLastUpdated, 
				'fireAlarmPermitStatus': fireAlarmPermitStatus,
				'fireAlarmPermitReq': fireAlarmPermitReq,
				'fireAlarmInspectionReq': fireAlarmInspectionReq,
				'fireAlarmInspectionStatus': fireAlarmInspectionStatus,
				'fireAlarmInspectionLastUpdated': fireAlarmInspectionLastUpdated,
				
				'lowVoltage_p':voltagePermitLastUpdated,
				'voltagePermitStatus': voltagePermitStatus,
				'voltagePermitReq': voltagePermitReq,
				'voltageInspectionReq': voltageInspectionReq,
				'voltageInspectionStatus': voltageInspectionStatus,
				'voltageInspectionLastUpdated': voltageInspectionLastUpdated,
				
				'ceilingPermit': ceilingPermitLastUpdated,
				'ceilingPermitStatus': ceilingPermitStatus,
				'ceilingPermitReq': ceilingPermitReq,
				'ceilingInspectionReq': ceilingInspectionReq,
				'ceilingInspectionStatus': ceilingInspectionStatus,
				'ceilingInspectionLastUpdated': ceilingInspectionLastUpdated,
				
				'gasPermit': gasPermitLastUpdated,
				'gasPermitStatus': gasPermitStatus,
				'gasPermitReq': gasPermitReq,
				'gasInspectionReq': gasInspectionReq,
				'gasInspectionStatus': gasInspectionStatus,
				'gasInspectionLastUpdated': gasInspectionLastUpdated,
				
				'tempCertOccupancy_p': tempCertOccupancyPermitLastUpdated,
				'tempCertOccupancyPermitStatus': tempCertOccupancyPermitStatus,
				'tempCertOccupancyPermitReq': tempCertOccupancyPermitReq,
				'tempCertOccupancyInspectionReq': tempCertOccupancyInspectionReq,
				'tempCertOccupancyInspectionStatus': tempCertOccupancyInspectionStatus,
				'tempCertOccupancyInspectionLastUpdated': tempCertOccupancyInspectionLastUpdated,
				
				'certOccupancy_p': certOccupancyPermitLastUpdated,
				'certOccupancyPermitStatus': certOccupancyPermitStatus,
				'certOccupancyPermitReq': certOccupancyPermitReq,
				'certOccupancyInspectionReq': certOccupancyInspectionReq,
				'certOccupancyInspectionStatus': certOccupancyInspectionStatus,
				'certOccupancyInspectionLastUpdated': certOccupancyInspectionLastUpdated,
				
				'buildPermExpireDate' : buildPermExpireDate,
				
				
				'otherPermitA': otherAPermitLastUpdated,
				'otherAPermitStatus': otherAPermitStatus,
	//			'otherAPermitReq': otherAPermitReq,
	//			'otherAInspectionReq': otherAInspectionReq,
				'otherAInspectionStatus': otherAInspectionStatus,
				'otherAInspectionLastUpdated': otherAInspectionLastUpdated,
				
				'otherBPermit': otherBPermitLastUpdated,
				'otherBPermitStatus': otherBPermitStatus,
	//			'otherBPermitReq': otherBPermitReq,
	//			'otherBInspectionReq': otherBInspectionReq,
				'otherBInspectionStatus': otherBInspectionStatus,
				'otherBInspectionLastUpdated': otherBInspectionLastUpdated,

				'permitNotes': permitNotes,
				'inspectionNotes': inspectionNotes
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
				
				
				//goToProjectManager();

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
				//goToProjectManager();
			
				
			}
		});
    } 
    
    console.log("B INS", buildingInspectionStatus);
    console.log("C INS", ceilingInspectionStatus);
    console.log("M INS", mechanicalInspectionStatus);
    console.log("E INS", electricalInspectionStatus);
    console.log("P INS", plumbingInspectionStatus);
    console.log("G INS", gasInspectionStatus);
    console.log("S INS", sprinklerInspectionStatus);
    console.log("F INS", fireAlarmInspectionStatus);
    console.log("V INS", voltageInspectionStatus);    
    console.log("T INS", tempCertOccupancyInspectionStatus);
    console.log("TC INS", certOccupancyInspectionStatus);
        
}


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
		if($(this).attr('id') !== 'saveProjectLink' && $(this).attr('id') !== 'genFailedRules' ) {

			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('#' + $(this).attr('data-tab')).addClass('active');
		
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('#saveButton > button').prop('disabled', true);
		}
		
	});
	
	$('#projectData').find("#initiatedDate").datepicker();
	$('#projectData').find("#surveyDate").datepicker();
	$('#projectData').find("#proposalScopeDate").datepicker();
	$('#projectData').find("#draftScheduleDate").datepicker();
	$('#projectData').find("#proposalDueDate").datepicker();
	$('#projectData').find("#budgetaryDueDate").datepicker();
	$('#projectData').find("#budgetarySubmittedDate").datepicker();
	$('#projectData').find("#proposalDate_pd").datepicker();
	$('#projectData').find("#startDate").datepicker();
	$('#projectData').find("#scheduledTurnover").datepicker();
	$('#projectData').find("#actualTurnover").datepicker();
	$('#projectData').find("#taskCreationZone").find('#initDate').datepicker();
	$('#projectData').find("#taskCreationZone").find('#dueDate').datepicker();
	$('#projectData').find("#pendingInvoiceCreationZone").find('#submittedDatePend').datepicker();
	$('#projectData').find("#invoiceCreationZone").find('#submittedDateInv').datepicker();
	$('#projectData').find("#invoiceCreationZone").find('#submitRejectDate').datepicker();

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
			'customerApproval' : true,
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
	generateDropdowns(data["subcontractors"], "subcontractors");
	generateDropdowns(data["customerApproval"], "customerApproval")
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
    console.log(className);
	
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
		if(className == "class")
		{
			if(json[i].id == 8)
			{
				option.innerHTML=json[i].name;
				option.value = "default";
			}
			else
			{	
				option.innerHTML=json[i].name;
				option.value = json[i].name;
			}
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
		else if(className == "manager" || className == "supervisor")
		{	
			if(json[i].name == "Bart" || json[i].name == "Lillian")
			{
				continue;
			}
			else
			{
				option.innerHTML = json[i].name;
			}
		} 
		else if(className == "subcontractors")
		{
			//Adding this to sort the subcontractors within a project
			json.sort(function(a,b){
				if(a.name < b.name) return -1;
				else if(a.name > b.name) return 1;
				return 0;
			});
			option.innerHTML = json[i].name;
			option.value = json[i].name;
		}
		else
		{
			option.innerHTML=json[i].name;
			//console.log(json[i].name);
		}

		if(sent)
		{
			//console.log(className);
			if(className == "customerApproval" || className == "manager" || className == 'supervisor' || className == 'warehouse' || className == "project" || className == 'projecteq' || className == 'stage' || className == 'status' || className == 'class' || className == "pType" )
			{	
				option.setAttribute("value", json[i].id);	
			}
			
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


function autofillPermits() {

	var autofill_Permits = $('#projectData').find("#autofill-Permits").val();
	var action = 'autofillPermits';
				
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
			
			'autofill-Permits': autofill_Permits
		        
			   }, complete: function (data){
				console.log(data);
				projectID = data.responseJSON;
				
				alert('Autofill Permits Complete');				
		}
			
	});
}



function autofillHVAC() {

	var autofill_HVAC = $('#projectData').find("#autofill-HVAC").val();
	var action = 'autofillHVAC';
	
	
				
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
			
			'autofill-HVAC': autofill_HVAC
		        
			   }, complete: function (data){
				console.log(data);
				projectID = data.responseJSON;
				
				alert('Autofill HVAC Complete');				
				
			   }
	});
}

function changeOrderOnChangeHVAC(){
	
	//if HVAC is set to "Yes"
	if($('#closeoutData').find("#hvacCloseoutStatus").val() == "1"){
		changeOrderHVAC(1);
	}	
}

function changeOrderOnChangeRefrigeration(){
	
	//If Refrigeration is set to "Yes"
	if($('#closeoutData').find("#refrigerationCloseoutStatus").val() == "1"){
		changeOrderRefrigeration(1);
	}
}

//This function automatically generates a change order for HVAC
//Author: Fardeen Yaqub
function changeOrderHVAC(temp){
		
	//if HVAC is set to "Yes" or is being accessed through a drop down 
	//The check if HVAC is set to "Yes" is still here in case we want to auto generate a change order when 
	//HVAC is changed in general info
	if($('#projectData').find("#autofill-HVAC").val() == "1" || temp == 1){
		
		var choice = window.confirm('Would you like to generate a change order for HVAC?');
		
		//user wants to make a change order
		if(choice === true){
			
			//needed to ensure server doesn't crash
			edit_CHANGE_ORDER = 'false';		
			$('#deleteChangeOrderButton').hide();
			
			//clears extra fields
			$('#changeOrder').find("#briefDescription").val("");
			$('#changeOrder').find("#subNames").val("");
			$('#changeOrder').find("#proposalDate").val(null);
			$('#changeOrder').find("#submittedDate").val(null);
			$('#changeOrder').find("#approvedDate").val(null);
			$('#changeOrder').find("#cost").val("");
			$('#changeOrder').find("#sell").val("");
			$('#changeOrder').find("#invoiceNumber").val("");
			$('#changeOrder').find("#customerCOPnum").val("");
			$('#changeOrder').find("#subInvoiceNumber").val("");
			$('#changeOrder').find("#subCO").val("");
			$('#changeOrder').find("#notes").val("");
			$('#changeOrder').find("#mcsInvoiceStatus").val("0");
			$('#changeOrder').find("#subInvoiceStatus").val("0");
			
			
			
			//sets change order title
			$('#changeOrder').find("#title").val("HVAC Travel, Rentals, and Freight");
			
			//sets the status to "Preparing"
			$('#changeOrder').find("#status").val("1");
			
			//sets the customer to "Costco Refrigeration
			$('#changeOrder').find("#customerCO").val("2");
			
			//sets the description for change order  
			$('#changeOrder').find("#briefDescription").val("Revisions for pass thru items");
						
			//if there are no change orders, set mcsCO to 1, otherwise set it to the next change order number
			if(PROJECT_DATA.changeOrders.length != 0) {
			
				$('#changeOrder').find('#mcsCO').val(PROJECT_DATA.changeOrders.length + 1);	
			}
				
			else{
				
				$('#changeOrder').find('#mcsCO').val(1);
			}
						
			//noMove makes it so the user doesn't get kicked out HVAC is set to "Yes"
			noMove = 1;
			saveProject_CHANGE_ORDER();
		}
		else{
			
			window.alert('Change order not created');
		}
	}
}


function autofillRefrigeration() {

	var autofill_Refrigeration = $('#projectData').find("#autofill-Refrigeration").val();
	var action = 'autofillRefrigeration';
				
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
			
			'autofill-Refrigeration': autofill_Refrigeration
		        
			   }, complete: function (data){
				console.log(data);
				projectID = data.responseJSON;
				
				alert('Autofill Refrigeration Complete');				
		
			   }
	});
}

//This function automatically generates a change order for Refrigeration
//Author: Fardeen Yaqub
function changeOrderRefrigeration(temp){

	//if HVAC is set to "Yes" or is being accessed through a drop down
	//The check if Refrigeration is set to "Yes" is still here in case we want to auto generate a change order when 
	//Refrigeration is changed in general info
	if($('#projectData').find("#autofill-Refrigeration").val() == "1" || temp == 1){
		
		var choice = window.confirm('Would you like to generate a change order for Refrigeration?');
		
		//user wants to make a change order
		if(choice === true){
			
			//needed to ensure server doesn't crash
			edit_CHANGE_ORDER = 'false';		
			$('#deleteChangeOrderButton').hide();
			
			//clears extra fields
			$('#changeOrder').find("#briefDescription").val("");
			$('#changeOrder').find("#subNames").val("");
			$('#changeOrder').find("#proposalDate").val(null);
			$('#changeOrder').find("#submittedDate").val(null);
			$('#changeOrder').find("#approvedDate").val(null);
			$('#changeOrder').find("#cost").val("");
			$('#changeOrder').find("#sell").val("");
			$('#changeOrder').find("#invoiceNumber").val("");
			$('#changeOrder').find("#customerCOPnum").val("");
			$('#changeOrder').find("#subInvoiceNumber").val("");
			$('#changeOrder').find("#subCO").val("");
			$('#changeOrder').find("#notes").val("");
			$('#changeOrder').find("#mcsInvoiceStatus").val("0");
			$('#changeOrder').find("#subInvoiceStatus").val("0");
			
			//sets change order title
			$('#changeOrder').find("#title").val("Refrigeration Travel, Rentals, and Freight");
			
			//sets the status to "Preparing"
			$('#changeOrder').find("#status").val("1");
			
			//sets the customer to "Costco Refrigeration
			$('#changeOrder').find("#customerCO").val("2");
			
			//sets the description for change order  
			$('#changeOrder').find("#briefDescription").val("Revisions for pass thru items");
						
			//if there are no change orders, set mcsCO to 1, otherwise set it to the next change order number
			if(PROJECT_DATA.changeOrders.length != 0) {
			
				$('#changeOrder').find('#mcsCO').val(PROJECT_DATA.changeOrders.length + 1);	
			}
				
			else{
				
				$('#changeOrder').find('#mcsCO').val(1);
			}
						
			//noMove makes it so the user doesn't get kicked out when refrigeration is set to "Yes"
			noMove = 1;
			saveProject_CHANGE_ORDER();
		}
		else{
			
			window.alert('Change order not created');
		}
	}
}

function autofillProjectClass() {

	var projectClass = $('#projectData').find('#class').val();
	
	var action = 'autofillProjectClass';
				
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
			
			'class': projectClass
		        
			   }, complete: function (data){
				console.log(data);
				projectID = data.responseJSON;
				
				alert('Autofill Project Complete');				
		}
			
	});
}

function dateFillFunction(x){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	var firstName = ' ('+ user.firstName + ') -  ';
	var cursorPosition = today.length + firstName.length-1;
	x.value = today + firstName + "\n" + x.value;
	$(x).prop('selectionEnd', cursorPosition);

	
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
	var customerApproval = $('#projectData').find('#customerApproval').val();
	var stage = $('#projectData').find("#stage").val();
	var pType = $('#projectData').find('#pType').val();
	var scope = $('#projectData').find("#scope").val();
	
	
	// scheduling
	var initiated = $('#projectData').find("#initiatedDate").val();
	var survey = $('#projectData').find("#surveyDate").val();
	var budgetaryDue = $('#projectData').find("#budgetaryDueDate").val();
	var budgetarySubmitted = $('#projectData').find("#budgetarySubmittedDate").val();
	var proposalScopeDate = $('#projectData').find("#proposalScopeDate").val();
	var draftScheduleDate = $('#projectData').find("#draftScheduleDate").val();
	var costco = $('#projectData').find("#proposalDueDate").val();
	var proposalDate = $('#projectData').find("#proposalDate_pd").val();
	var startDate = $('#projectData').find("#startDate").val();
	var scheduledTurnover = $('#projectData').find("#scheduledTurnover").val();
	var actualTurnover = $('#projectData').find("#actualTurnover").val();

	// financial
	var shouldInvoice = $('#projectData').find("#shouldInvoice").val();
	var actualInvoice = $('#projectData').find("#actualInvoice").val();
	var prevNotes = PROJECT_DATA.projectNotes;
	var notes = $('#projectData').find("#notes").val();
	var customerNotes = $('#projectData').find("#customerNotes").val();
	var keyStatus = $('#projectData').find("#keyStatus").val();
	var refrigNotes = $('#projectData').find("#zUpdates").val();
	var cost = $('#projectData').find("#projectCost").val();
	if(cost) {cost = cleanNumericValueForSaving($('#projectData').find("#projectCost")[0].value); cost = parseFloat(cost);}
	var customerNumber = $('#projectData').find("#custNum").val();
	
	/*
	//labor total
	var laborTotal = $('#projectData').find("#financialSection").find("#pricingInfo").find("#laborTotal").val();
	var laborInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#laborInvoiced").val();
	var laborToInvoice = $('#projectData').find("#financialSection").find("#pricingInfo").find("#laborToInvoice").val();
	var laborPercentInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#laborPercentInvoiced").val();
	

	var materialCosts = $('#projectData').find("#financialSection").find("#pricingInfo").find("#materialCosts").val();
	var materialInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#materialInvoiced").val();
	var materialToInvoice = $('#projectData').find("#financialSection").find("#pricingInfo").find("#materialToInvoice").val();
	var materialPercentInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#materialPercentInvoiced").val();
	
	
	var projectAmount = $('#projectData').find("#financialSection").find("#pricingInfo").find("#projectAmount").val();
	var projectInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#projectInvoiced").val();
	var projectToInvoice = $('#projectData').find("#financialSection").find("#pricingInfo").find("#projectToInvoice").val();
	var projectPercentInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#projectPercentInvoiced").val();
	
	
	var aiaTotal = $('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaTotal").val();
	var aiaInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaInvoiced").val();
	var aiaToInvoice = $('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaToInvoice").val();
	var aiaPercentInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaPercentInvoiced").val();
	
	
	var totalProject = $('#projectData').find("#financialSection").find("#pricingInfo").find("#totalProject").val();
	var totalInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#totalInvoiced").val();
	var totalToInvoice = $('#projectData').find("#financialSection").find("#pricingInfo").find("#totalToInvoice").val();
	var totalPercentInvoiced = $('#projectData').find("#financialSection").find("#pricingInfo").find("#totalPercentInvoiced").val();
	*/
	
	var autofill_HVAC = $('#projectData').find("#autofill-HVAC").val();
	var autofill_Refrigeration = $('#projectData').find("#autofill-Refrigeration").val();
	var autofill_Permits = $('#projectData').find("#autofill-Permits").val();
	
	var required = [warehouse, item, manager, supervisor, status, stage, pType, scope];
	var dates_PROJECT_DATA = [initiated, survey, costco, proposalDate, startDate, scheduledTurnover, actualTurnover];
	
	
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
				'customerApproval': customerApproval,
				'pType': pType,
				'scope': scope,
				
				'initiated': initiated,
				'survey': survey,
				'proposalScopeDate': proposalScopeDate,
				'draftScheduleDate': draftScheduleDate,
				'costco': costco,
				'proposalDate': proposalDate,
				'startDate': startDate,
				'scheduledTurnover': scheduledTurnover,
				'actualTurnover': actualTurnover,
				
				'shouldInvoice': shouldInvoice,
				'actualInvoice': actualInvoice,
				'notes': notes,
				'customerNotes': customerNotes,
				'keyStatus': keyStatus,
				'refrigNotes': refrigNotes,
				'cost': cost,
				'customerNumber': customerNumber,
				'budgetaryDue' : budgetaryDue , 
				'budgetarySubmitted' : budgetarySubmitted,
				
		/*		'laborTotal': laborTotal,
				'laborInvoiced': laborInvoiced,
				'laborToInvoice': laborToInvoice,
				'laborPercentInvoiced': laborPercentInvoiced,
				
				'materialCosts': materialCosts,
				'materialInvoiced': materialInvoiced,
				'materialToInvoice': materialToInvoice,
				'materialPercentInvoiced': materialPercentInvoiced,
				
				'projectAmount': projectAmount,
				'projectInvoiced': projectInvoiced,
				'projectToInvoice': projectToInvoice,
				'projectPercentInvoiced': projectPercentInvoiced,
				
				'aiaTotal': aiaTotal,
				'aiaInvoiced': aiaInvoiced,
				'aiaToInvoice': aiaToInvoice,
				'aiaPercentInvoiced': aiaPercentInvoiced,
				
				'totalProject': totalProject,
				'totalInvoiced': totalInvoiced,
				'totalToInvoice': totalToInvoice,
				'totalPercentInvoiced': totalPercentInvoiced,
	*/			
				'autofill-HVAC': autofill_HVAC,
				'autofill-Refrigeration': autofill_Refrigeration,
		        'autofill-Permits': autofill_Permits
		        
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
				
				//goToProjectManager();
						
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
	if(! PERSONS)
		return '3';
	
	console.log("PEOPLE" , PERSONS , userFirstName);
	for(var i = 0; i < PERSONS.length; i++)
	{
		if(PERSONS[i].name.toLowerCase() == userFirstName.toLowerCase())
		{
			return PERSONS[i].id;
		}
	}
	
	return '3';
	
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

		if (field === "default" || field == "" || field == undefined)
		{
			alert("You cannot leave any of the required information blank!");
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
	if(json.supervisors[0]){
		$('#projectData').find("#supervisor").val(json.supervisors[0].id);
	}
	$('#projectData').find("#stage").val(json.stage.id);
	
	//This is filling the data when the form loads.
	//So perform the onLoad functionality of options here.
	changeStatus();
	
	$('#projectData').find("#status").val(json.status.id);
	
	//if customerApproval exists, then add data
	if(json.customerApproval)
		$('#projectData').find("#customerApproval").val(json.customerApproval.id);
	
	$('#projectData').find("#pType").val(json.projectType.id);
    formatRelativeTextAreas(json.scope , "scope", "projectData");
	$('#projectData').find("#scope").val(json.scope);

	
	$('#projectData').find("#initiatedDate").val(json.projectInitiatedDate);
	$('#projectData').find("#surveyDate").val(json.siteSurvey);
	$('#projectData').find("#proposalScopeDate").val(json.proposalScopeDate);
	$('#projectData').find("#draftScheduleDate").val(json.draftScheduleDate);
	$('#projectData').find("#budgetaryDueDate").val(json.budgetaryDue);
	$('#projectData').find("#budgetarySubmittedDate").val(json.budgetarySubmitted);
	$('#projectData').find("#proposalDueDate").val(json.proposalDue);
	$('#projectData').find("#proposalDate_pd").val(json.proposalSubmitted);
	$('#projectData').find("#startDate").val(json.scheduledStartDate);
	$('#projectData').find("#scheduledTurnover").val(json.scheduledTurnover);
	$('#projectData').find("#actualTurnover").val(json.actualTurnover);

	$('#projectData').find("#shouldInvoice").val(json.shouldInvoice);
	$('#projectData').find("#actualInvoice").val(json.invoiced);
    formatRelativeTextAreas(json.projectNotes , "notes", "projectData");
	$('#projectData').find("#notes").val(json.projectNotes);
	
	formatRelativeTextAreas(json.customerNotes , "customerNotes", "projectData");
	$('#projectData').find("#customerNotes").val(json.customerNotes);
	
	/*
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborTotal").val("$" + json.laborTotal);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborInvoiced").val(json.laborInvoiced);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborToInvoice").val(json.laborToInvoice);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborPercentInvoiced").val(json.laborPercentInvoiced);
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialCosts").val("$" + json.materialCosts);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialInvoiced").val(json.materialInvoiced);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialToInvoice").val(json.materialToInvoice);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialPercentInvoiced").val(json.materialPercentInvoiced);
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectAmount").val("$" + json.projectAmount);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectInvoiced").val(json.projectInvoiced);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectToInvoice").val(json.projectToInvoice);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectPercentInvoiced").val(json.projectPercentInvoiced);
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaTotal").val("$" + json.aiaTotal);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaInvoiced").val(json.aiaInvoiced);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaToInvoice").val(json.aiaToInvoice);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaPercentInvoiced").val(json.aiaPercentInvoiced);
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalProject").val("$" + json.totalProject);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalInvoiced").val(json.totalInvoiced);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalToInvoice").val(json.totalToInvoice);
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalPercentInvoiced").val(json.totalPercentInvoiced);
	*/
	
	//updates the pricing info values dynamically
	updatePricingInfo();
	
	$('#projectData').find("#keyStatus").val(json.keyStatus);
	
    formatRelativeTextAreas(json.zachUpdates , "zUpdates", "projectData");
	$('#projectData').find("#zUpdates").val(json.zachUpdates);
	if(json.cost) json.cost = cleanNumericValueForDisplaying(json.cost);
	$('#projectData').find("#projectCost").val(json.cost);
	$('#projectData').find("#custNum").val(json.customerNumber);
	
	if(data.autofillHVAC != undefined)
		$('#generalInformation').find('#autofill-HVAC').val(data.autofillHVAC);
	else
		$('#generalInformation').find('#autofill-HVAC').val("default");
	
	if(data.autofillRefrigeration != undefined)
		$('#generalInformation').find('#autofill-Refrigeration').val(data.autofillRefrigeration);
	else
		$('#generalInformation').find('#autofill-Refrigeration').val("default");

	if(data.autofillPermits != undefined)
		$('#generalInformation').find('#autofill-Permits').val(data.autofillPermits);
	else
		$('#generalInformation').find('#autofill-Permits').val("default");
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
	
	$('#scorecardTabLink').click(function() {
		//getColorForAllProjects();
		if((PROJECT_DATA.stage.name == "Canceled") || (PROJECT_DATA.stage.name == "On Hold")){
			$("#scoreCardDiv").show();
			$("#scoreCardFailedRulesDiv").hide();
			convertCurrentDivLocation ("scoreCardTopDiv");
			setProjectHeader(PROJECT_DATA, "scoreCardTopDiv");
			emptyingTables();
			scoreBackground(["#59ba63", PROJECT_DATA.stage.name],["#59ba63", ""],["#59ba63", ""],["#59ba63", ""],["#59ba63", ""],["#59ba63", ""],["#59ba63", ""],["#59ba63", ""]);
			issuesNumberSetter(0,0,0,0,0,0,0,0);
			
		}
		else{
			getScoreRules(projectID);
			console.log("New button is clicked");
			//document.location.href="scoreCardNew.html";
	
		}
	});
	
	$('.project-info-list-item').click(function() {
		editProjectInfo(this.id);
	});
	
	$('.project-proposals-list-item').click(function() {
		editProposals(this.id);
	});
	
	
	$('.closeout-info-list-item').click(function() {
		editCloseout(this.id);
	});
	

	$('#scoreViewButton').click(function() {
		fillScorecard();
		editScorecard(this.id);
		setProjectHeader(PROJECT_DATA, 'scorecardUpperDiv');
	});
	
	$('#scoreUpdateButton').click(function() {
		reevaluateProject(projectID);
		getProject_SCORECARD(projectID);
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
	
	document.getElementById('tasksInformation').style.width = "100%";
	$('#taskDisplay').hide();
	$('#taskCreationZone').show();
	$('#tasksInformation').find('#taskCreationZone').find('#taskStatusSelectionRow').show();
	//adding the below line because when a new task is added, it is fetching the previous value.
	$('#tasksInformation').find('#taskCreationZone').find('#taskStatusSelectionRow').find('#taskStatus').val("Open");
	
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
                var item = data.projectItem.id;
              
				fillTabs_PROJECT_MANAGER(data, currentDivLocation);
				
				
				getTasks(stopServerCalls);
				getPendInvs(stopServerCalls);
				getInvs(stopServerCalls);
				getSubcontractorsPend();
				getProjCostEstimate(stopServerCalls)
				getProjSpecScopes(stopServerCalls);
				getSpecMasterScope(item);
				getSpecificMasterScope(item);
				getSpecProjMasterScope(stopServerCalls);
				setCostCompTitle();
				getComparableCostEsts();
			}, error: function (data) {
				alert('Server Error1! DASDAS');
				console.log(data);
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = FINDPROJECT;
		}
	}
}

function getProject_PROJECT_MANAGER1(project_id , stopServerCalls) {
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
                var item = data.projectItem.id;
              
				fillTabs_PROJECT_MANAGER(data, currentDivLocation);
				
				
//				getTasks(stopServerCalls);
//				getProjCostEstimate(stopServerCalls)
//				getProjSpecScopes(stopServerCalls);
//				getSpecMasterScope(item);
//				getSpecificMasterScope(item);
//				getSpecProjMasterScope(stopServerCalls);
//				setCostCompTitle();
//				getComparableCostEsts();
			}, error: function (data) {
				alert('Server Error1!');
				console.log(data);
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

//temp holder


function fillTabs_PROJECT_MANAGER (data) {
	fillProjectInformation(data);
	fillChangeOrders(data);
	fillPermitsAndInspections(data);
	fillEquipment(data);
	fillEquipmentProposals(data);
	fillCloseout(data);
	fillProjectDetails(data);
	
	DATA = data;
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

function prepareProjectData(source_id){	
	if(source_id && !(isNaN(source_id))) projectID = source_id;
	setCurrentDivLocation('projectData');
	setProjectHeader(PROJECT_DATA, currentDivLocation);
	$('#projectData').find(".nav-tabs").find("[class~=active]").removeClass("active");
	$('#projectData').find("[class~=active]").removeClass("active");

	document.getElementById('tasksInformation').style.width = "100%";
	document.getElementById('pendingInvoiceInformation').style.width = "100%";	
	$('#taskCreationZone').hide();
	$('#pendingInvoiceCreationZone').hide();
	$('#taskDisplay').show();
	$('#pendingInvoiceDisplay').show();
	
	//clears accounts receivable table
	clearPeInvoiceTable();
	
	$('#projectData').find('#financialInformation').find('#financialInformationTable').hide();
	
	//hides data inside financial so it only appears when selected
	hideFinancialInfo();
	
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
		
		//hides financial sub section headers and information
		$('#projectData').find('#financialSection').hide();

	}
	
	//makes account payable active
	else if(source_id == "accountsPayable-item")
	{
		document.getElementById('pendingInvoiceInformation').style.width = "100%";
		$('#pendingInvoiceDisplay').show();
		$('#pendingInvoiceCreationZone').hide();
		$('#projectData').find(".nav-tabs").find("[data-tab=pendingInvoiceInformation]").addClass("active");
		$('#projectData').find("#pendingInvoiceInformation").addClass("active");	
		financialSection();
	}
	
	else if(source_id == "customerNotes-item")
		{
		
		$('#projectData').find(".nav-tabs").find("[data-tab=customerNotesInformation]").addClass("active");		
		$('#projectData').find("#customerNotesInformation").addClass("active");
		
		}
	
	//temp holder
	//makes pricing info active
	else if(source_id == "pricingInfo-item")
		{
		
		$('#projectData').find(".nav-tabs").find("[data-tab=pricingInfo]").addClass("active");		
		$('#projectData').find("#pricingInfo").addClass("active");
		financialSection();
		
		}
	
	//makes accounts receivable active
	else if(source_id == "accountsReceivable-item")
		{
		
		document.getElementById('peInvoiceInformation').style.width = "100%";
		$('#peInvoiceDisplay').show();
		//$('#peInvoiceCreationZone').hide();
		$('#projectData').find(".nav-tabs").find("[data-tab=peInvoiceInformation]").addClass("active");
		$('#projectData').find("#peInvoiceInformation").addClass("active");	
		financialSection();
		
		//clears and accounts receivable table
		clearPeInvoiceTable();
		fillPeInvsTable(DATA);
		
		}
	
	
	else console.log("Bad ID in prepareProjectData");
}

//Dynamically updates pricing info section
// Author: Fardeen yaqub
function updatePricingInfo(){
		
	var laborInvoiced = Number(0);
	var laborToInvoice = Number(0);
	var laborPercentInvoiced = Number(0);
	
	var laborTotal = Number(0);
	
	//populates the laborTotal section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a laborTotal CO
		if(DATA.changeOrders[i].peType == "1" && DATA.changeOrders[i].sell != null && DATA.changeOrders[i].type != 8 && DATA.changeOrders[i].type != 7 && parseChangeOrderStatus(DATA.changeOrders[i].status) != "Rejected"){

			laborTotal += Number(DATA.changeOrders[i].sell);		
		}
	}
	
	//populates the laborInvoiced section
	for(var i = 0; i < invs.length; i++) {
		
		//checks if the invoice is a project invoice
		if(invs[i].invoiceType == "Labor" && invs[i].invoiceAmount != null && invs[i].invoiceStatus != "Rejected" && invs[i].invoiceStatus != "Requested"){

			laborInvoiced += Number(invs[i].invoiceAmount);		
		}
	}
	
	laborToInvoice = laborTotal - laborInvoiced;
	
	if(laborTotal > 0){
		laborPercentInvoiced = (laborInvoiced/laborTotal) * 100;
	}

	var materialInvoiced = Number(0);
	var materialToInvoice = Number(0);
	var materialPercentInvoiced = Number(0);

	var materialCosts = Number(0);
	
	//populates the materialCosts section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a materialCosts CO
		if(DATA.changeOrders[i].peType == "2" && DATA.changeOrders[i].sell != null && DATA.changeOrders[i].type != 8 && DATA.changeOrders[i].type != 7 && parseChangeOrderStatus(DATA.changeOrders[i].status) != "Rejected"){

			materialCosts += Number(DATA.changeOrders[i].sell);		
		}
	}
	
	//populates the materialInvoiced section
	for(var i = 0; i < invs.length; i++) {
		
		//checks if the invoice is a project invoice
		if(invs[i].invoiceType == "Materials" && invs[i].invoiceAmount != null && invs[i].invoiceStatus != "Rejected" && invs[i].invoiceStatus != "Requested"){

			materialInvoiced += Number(invs[i].invoiceAmount);		
		}
	}
	
	materialToInvoice = materialCosts - materialInvoiced;
	
	if(materialCosts > 0){
		materialPercentInvoiced = ((materialInvoiced/materialCosts) * 100).toFixed(2);
	}
		
	var projectInvoiced = Number(0);
	var projectToInvoice = Number(0);
	var projectPercentInvoiced = Number(0);

	var projectAmount = Number(0);
	
	
	//populates the projectAmount section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a projectAmount CO
		if(DATA.changeOrders[i].peType == "0" && DATA.changeOrders[i].sell != null && DATA.changeOrders[i].type != 8 && DATA.changeOrders[i].type != 7 && parseChangeOrderStatus(DATA.changeOrders[i].status) != "Rejected"){

			projectAmount += Number(DATA.changeOrders[i].sell);		
		}
	}
	
	//populates the projectInvoiced section
	for(var i = 0; i < invs.length; i++) {
		
		//checks if the invoice is a project invoice
		if(invs[i].invoiceType == "Project" && invs[i].invoiceAmount != null && invs[i].invoiceStatus != "Rejected" && invs[i].invoiceStatus != "Requested"){

			projectInvoiced += Number(invs[i].invoiceAmount);		
		}
	}
	
	projectToInvoice = projectAmount - projectInvoiced;
	
	if(projectAmount > 0){
		projectPercentInvoiced = ((projectInvoiced/projectAmount) * 100).toFixed(2);
	}
	
	var aiaInvoiced = Number(0);
	var aiaToInvoice = Number(0);
	var aiaPercentInvoiced = Number(0);

	var aiaTotal = Number(0);
	
	//populates the aiaTotal section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a aiaTotal CO
		if(DATA.changeOrders[i].peType == "3" && DATA.changeOrders[i].sell != null && DATA.changeOrders[i].type != 8 && DATA.changeOrders[i].type != 7 && parseChangeOrderStatus(DATA.changeOrders[i].status) != "Rejected"){

			aiaTotal += Number(DATA.changeOrders[i].sell);		
		}
	}
	
	
	//populates the aiaInvoiced section
	for(var i = 0; i < invs.length; i++) {
		
		//checks if the invoice is a project invoice
		if(invs[i].invoiceType == "AIA" && invs[i].invoiceAmount != null && invs[i].invoiceStatus != "Rejected" && invs[i].invoiceStatus != "Requested"){

			aiaInvoiced += Number(invs[i].invoiceAmount);		
		}
	}
	
	aiaToInvoice = aiaTotal - aiaInvoiced;
	
	if(aiaTotal > 0){
		aiaPercentInvoiced = ((aiaInvoiced/aiaTotal) * 100).toFixed(2);
	}
	
	var totalProject = Number(0);
	var totalInvoiced = Number(0);
	var totalToInvoice = Number(0);
	var totalPercentInvoiced = Number(0);

	//calculates total cost of entire project
	totalProject = Number(laborTotal) + Number(materialCosts) + Number(projectAmount) + Number(aiaTotal);
	totalInvoiced = Number(laborInvoiced) + Number(materialInvoiced) + Number(projectInvoiced) + Number(aiaInvoiced);
	totalToInvoice = Number(laborToInvoice) + Number(materialToInvoice) + Number(projectToInvoice) + Number(aiaToInvoice);
	totalPercentInvoiced = ((totalInvoiced/totalProject)*100);

	totalPercentInvoiced = totalPercentInvoiced.toFixed(2);
	
	//fills in the fields 
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborTotal").html(cleanNumericValueForDisplaying(laborTotal.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborInvoiced").html(cleanNumericValueForDisplaying(laborInvoiced.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborToInvoice").html(cleanNumericValueForDisplaying(laborToInvoice.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#laborPercentInvoiced").html(Math.trunc(laborPercentInvoiced) + '%');
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialCosts").html(cleanNumericValueForDisplaying(materialCosts.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialInvoiced").html(cleanNumericValueForDisplaying(materialInvoiced.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialToInvoice").html(cleanNumericValueForDisplaying(materialToInvoice.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#materialPercentInvoiced").html(Math.trunc(materialPercentInvoiced) + '%');
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectAmount").html(cleanNumericValueForDisplaying(projectAmount.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectInvoiced").html(cleanNumericValueForDisplaying(projectInvoiced.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectToInvoice").html(cleanNumericValueForDisplaying(projectToInvoice.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#projectPercentInvoiced").html(Math.trunc(projectPercentInvoiced) + '%');
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaTotal").html(cleanNumericValueForDisplaying(aiaTotal.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaInvoiced").html(cleanNumericValueForDisplaying(aiaInvoiced.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaToInvoice").html(cleanNumericValueForDisplaying(aiaToInvoice.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#aiaPercentInvoiced").html(Math.trunc(aiaPercentInvoiced) + '%');
	
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalProject").html(cleanNumericValueForDisplaying(totalProject.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalInvoiced").html(cleanNumericValueForDisplaying(totalInvoiced.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalToInvoice").html(cleanNumericValueForDisplaying(totalToInvoice.toFixed(2)));
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#totalPercentInvoiced").html(Math.trunc(totalPercentInvoiced) + '%');
	
}

//shows data for financial section
//Author: Fardeen Yaqub
function financialSection(){
	
	//hides unnecessary data
	$('#projectData').find("#generalInformationTabLink").hide();
	$('#projectData').find("#schedulingInformationTabLink").hide();
	$('#projectData').find("#tasksInformationTabLink").hide();
	$('#projectData').find("#financialInformationTabLink").hide();
	$('#projectData').find("#pendingInformationTabLink").hide();
	$('#projectData').find("#customerInformationTabLink").hide();
	$('#projectData').find("#saveProjectLink").hide();
	$('#projectData').find("#returnProjectManager").hide();
	
	$('#projectData').find('#financialSection').show();
	showFinancialInfo();
	fillPeInvsTable(DATA);
	
}

//temp holder
//goes back to main financial menu
//Author: Fardeen Yaqub
function goToFinancial(){
	
	$('#projectData').find(".nav-tabs").find("[data-tab=financialInformation]").addClass("active");
	$('#projectData').find("#generalInformationTabLink").show();
	$('#projectData').find("#schedulingInformationTabLink").show();
	$('#projectData').find("#tasksInformationTabLink").show();
	$('#projectData').find("#financialInformationTabLink").show();
	$('#projectData').find("#pendingInformationTabLink").show();
	$('#projectData').find("#customerInformationTabLink").show();
	$('#projectData').find("#saveProjectLink").show();
	$('#projectData').find("#returnProjectManager").show();
	$('#projectData').find("#peInvoiceDisplay").hide();
	$('#projectData').find(".nav-tabs").find("[data-tab=financialInformation]").addClass("active");
	$('#projectData').find("#financialInformation").addClass("active");
	
	//hides financial sub section header
	$('#projectData').find('#financialSection').hide();
	$('#pendingInvoiceDisplay').hide();
	$('#pendingInvoiceCreationZone').hide();

}

//hides main financial info
//Author: Fardeen Yaqub
function hideFinancialInfo(){
	
	$('#projectData').find("#returnFinancial").hide();
	$('#projectData').find("#pricingInfoTabLink").hide();
	$('#projectData').find("#accountsReceivableTabLink").hide();
	$('#projectData').find("#accountsPayableTabLink").hide();
	$('#projectData').find("#accountsPayableTabLink").hide();
	$('#projectData').find("#aiaCostItemsTabLink").hide();
	$('#projectData').find("#financialSection").find("#saveProjectLink").hide();
	
}

//shows main financial info
//Author: Fardeen Yaqub
function showFinancialInfo(){
	
	$('#projectData').find("#returnFinancial").show();
	$('#projectData').find("#pricingInfoTabLink").show();
	$('#projectData').find("#accountsReceivableTabLink").show();
	$('#projectData').find("#accountsPayableTabLink").show();
	$('#projectData').find("#aiaCostItemsTabLink").show();
	$('#projectData').find("#financialSection").find("#pricingInfo").find("#saveProjectLink").show();
	$('#projectData').find("#peInvoiceDisplay").show();
	
}

function editProposals (source_id) {
	if(source_id) prepareProposals(source_id);
	document.getElementById("projectManager").style.display = 'none';
	getProjectEnums_PROJECT_DATA(true);
	currentDivLocation = "proposalsData";
	document.getElementById("proposalsData").style.display = 'inline';
	//window.location.href = PROJECTINFO + '?type=edit&id=' + projectID;
}


function prepareProposals(source_id){
	
	if(source_id && !(isNaN(source_id))) projectID = source_id;
	setCurrentDivLocation("proposalsData");
	setProjectHeader(PROJECT_DATA, currentDivLocation);

	
	$('#proposalsData').find(".nav-tabs").find("[class~=active]").removeClass("active");
	$('#proposalsData').find("[class~=active]").removeClass("active");

	if(source_id == "price-estimate-summary-item")
	{
		$('#proposalsData').find(".nav-tabs").find("[data-tab=priceEstimateSummary]").addClass("active");
		$('#proposalsData').find("#priceEstimateSummary").addClass("active");

	}
	else if(source_id == "equipment-item")
	{
		$('#proposalsData').find(".nav-tabs").find("[data-tab=equipmentProposals]").addClass("active");
		$('#proposalsData').find("#equipmentProposals").addClass("active");

	}
	else console.log("Bad ID in prepareProposals");
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

	/* Field not being used anymore
	else if(source_id == "final-inspection-item")
	{
		$('#closeoutData').find(".nav-tabs").find("[data-tab=finalInspections]").addClass("active");
		$('#closeoutData').find("#finalInspections").addClass("active");

	}
	*/
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
	else console.log("Bad ID in prepareCloseout");
}

/**
 * This function makes the permitData div visible and projectManager div invisible
 * INNER FUNCTION CALLS: getProjectEnums_PERMIT()
 * @returns
 */
function editPermitsAndInspections() {
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

}

function addChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=add&id=' + projectID;
}

function addEquipment () {
	
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

function addEquipmentProposals () {
	
	PAGETYPE_EQUIP = "add";	
	projectID_EQUIP = projectID;
	setCurrentDivLocation("equipmentDivProposals");
	
	clearEquipmentFormValuesProposals();
	
	$('.editProject').hide();

	$('#equipmentFormProposals').addClass('active');
	$('#equipmentDivProposals').find(".nav-tabs").find("[data-tab=saveButtonProposals]").removeClass("active");
	$('#equipmentDivProposals').find(".nav-tabs").find("[data-tab=equipmentFormProposals]").addClass("active");
	$('.projectNavigator-projectManager').show();
	$('.projectEdit').show();
	$('.projectNavigator').show();
	$('#equipmentDivProposals').show();
	$('#deleteEquipmentProposals').hide();
	
	getDropdownInfo_EQUIP_PROP();

}


/**
 * This function fills out all of the project information
 * INNER FUNCTION CALLS: none
 * @returns
 * @params a JSON with all necessary project data
 */
function fillProjectInformation (data) {
	
	console.log("DATZ" , data);
	$('#projectManager').find('#mcsNumber').text(data.McsNumber);
	$('#projectManager').find('#projectItem').text(data.projectItem.name);
	$('#projectManager').find('#projectStatus').text(data.status.name);
	$('#projectManager').find('#projectType').text(data.projectType.name);
	$('#projectManager').find('#projectStage').text(data.stage.name);
	$('#projectManager').find('#projectManager').text(data.projectManagers.name);
	if(data.supervisors[0]){
		$('#projectManager').find('#projectSupervisor').text(data.supervisors[0].name);
	}
	
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
		tableRow.ondblclick = function () {editSelectedChangeOrder(this.value)};

		var coNumber = document.createElement('td');
		coNumber.className = 'coNumber';
		coNumber.width = "5%";
		coNumber.appendChild(document.createTextNode(changeOrder.mcsCO));
		
		var title = document.createElement('td');
		title.width = "10%";
		if(changeOrder.title) title.appendChild(document.createTextNode(changeOrder.title));
		else  title.appendChild(document.createTextNode("---"));
		
		var briefDescription = document.createElement('td');
		briefDescription.width = "20%";
		briefDescription.appendChild(document.createTextNode(changeOrder.briefDescription))
		
		var status = document.createElement('td');
		status.width = "9%";
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));
		
		var invoiceStatus = document.createElement('td');
		invoiceStatus.width = "10%";
		
		//AND (and), the MCS_INVOICE_STATUS, SUB_INVOICE_STATUS
		var MCS_INVOICE_STATUS = changeOrder.mcsInvoiceStatus;
		var SUB_INVOICE_STATUS = changeOrder.subInvoiceStatus;
		var AND_INVOICE_STATUS = " ";		
		
		if(MCS_INVOICE_STATUS == "1" && SUB_INVOICE_STATUS == "1"){			
			AND_INVOICE_STATUS = "Yes";
		}
		else if(MCS_INVOICE_STATUS == "0" || SUB_INVOICE_STATUS == "0"){			
			AND_INVOICE_STATUS = "No";
		}
		else if(MCS_INVOICE_STATUS == "2" && SUB_INVOICE_STATUS == "2"){			
			AND_INVOICE_STATUS = "N/A";
		}
		else if(MCS_INVOICE_STATUS == undefined || SUB_INVOICE_STATUS == undefined){
			AND_INVOICE_STATUS = "   ";
		}
		else if(MCS_INVOICE_STATUS == "2" && SUB_INVOICE_STATUS == "1"){			
			AND_INVOICE_STATUS = "Yes";
		}
		else if(MCS_INVOICE_STATUS == "1" && SUB_INVOICE_STATUS == "2"){			
			AND_INVOICE_STATUS = "Yes";
		}
		
		invoiceStatus.appendChild(document.createTextNode(AND_INVOICE_STATUS));
		
		var subNames = document.createElement('td');
		subNames.width = "12%";
		subNames.appendChild(document.createTextNode(changeOrder.subNames));
		
		var type = document.createElement('td');
		type.width = "10%";
		type.appendChild(document.createTextNode(convertChangeOrderType(changeOrder.type)));
		
		var submittedDate = document.createElement('td');
		submittedDate.width = "8%";
		if(changeOrder.submittedDate)
			submittedDate.appendChild(document.createTextNode(changeOrder.submittedDate));
		else submittedDate.appendChild(document.createTextNode("---"));
		
		var cost = document.createElement('td');
		cost.width = "5%";
		if(changeOrder.cost)
			cost.appendChild(document.createTextNode(cleanNumericValueForDisplaying(changeOrder.cost)));
		else 
			cost.appendChild(document.createTextNode("---"));

		
		var sell = document.createElement('td');
		sell.width = "5%";
		if(changeOrder.sell)
			sell.appendChild(document.createTextNode(cleanNumericValueForDisplaying(changeOrder.sell)));
		else 
			sell.appendChild(document.createTextNode("---"));		
		
		var notes = document.createElement('td');
		notes.innerHTML = addingBreaktoHTML(changeOrder.notes);		
		
		tableRow.appendChild(coNumber);
		tableRow.appendChild(title);
		tableRow.appendChild(briefDescription);
		tableRow.appendChild(status);
		tableRow.append(invoiceStatus)
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
	//console.log("CO_TYPES = " , CHANGE_ORDER_TYPES , co);
	for(var i = 0; i < CHANGE_ORDER_TYPES.length; i++) {
		
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

function convertStatus( status )
{
	if(status == "default" || status == undefined)
		return "";
	
	return status;
}

function convertCOStatus(status){
	
	if(status == "1")
		return "Yes";
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
	$('#projectManager').find('#buildingPermitRequired').text(convertRequired(tabData.buildingPermitRequired));
	$('#projectManager').find('#buildingPermitDate').text(tabData.building);
	$('#projectManager').find('#buildingPermit').text(convertStatus(tabData.buildingPermitStatus));
	
	$('#projectManager').find('#ceilingPermitRequired').text(convertRequired(tabData.ceilingPermitRequired));
	$('#projectManager').find('#ceilingPermitDate').text(tabData.ceiling);
	$('#projectManager').find('#ceilingPermit').text(convertStatus(tabData.ceilingPermitStatus));
	
	$('#projectManager').find('#mechanicalPermitRequired').text(convertRequired(tabData.mechanicalPermitRequired));
	$('#projectManager').find('#mechanicalPermitDate').text(tabData.mechanical);
	$('#projectManager').find('#mechanicalPermit').text(convertStatus(tabData.mechanicalPermitStatus));
	
	$('#projectManager').find('#electricalPermitRequired').text(convertRequired(tabData.electricalPermitRequired));
	$('#projectManager').find('#electricalPermitDate').text(tabData.electrical);
	$('#projectManager').find('#electricalPermit').text(convertStatus(tabData.electricalPermitStatus));
	
	$('#projectManager').find('#plumbingPermitRequired').text(convertRequired(tabData.plumbingPermitRequired));
	$('#projectManager').find('#plumbingPermitDate').text(tabData.plumbing);
	$('#projectManager').find('#plumbingPermit').text(convertStatus(tabData.plumbingPermitStatus));
	
	$('#projectManager').find('#gasPermitRequired').text(convertRequired(tabData.gasPermitRequired));
	$('#projectManager').find('#gasPermitDate').text(tabData.gas);
	$('#projectManager').find('#gasPermit').text(convertStatus(tabData.gasPermitStatus));
	
	$('#projectManager').find('#sprinklerPermitRequired').text(convertRequired(tabData.sprinklerPermitRequired));
	$('#projectManager').find('#sprinklerPermitDate').text(tabData.fire_sprinkler);
	$('#projectManager').find('#sprinklerPermit').text(convertStatus(tabData.sprinklerPermitStatus));
	
	$('#projectManager').find('#fireAlarmPermitRequired').text(convertRequired(tabData.fireAlarmPermitRequired));
	$('#projectManager').find('#fireAlarmPermitDate').text(tabData.fire_alarm);
	$('#projectManager').find('#fireAlarmPermit').text(convertStatus(tabData.fireAlarmPermitStatus));
	
	$('#projectManager').find('#lowVoltagePermitRequired').text(convertRequired(tabData.voltagePermitRequired));
	$('#projectManager').find('#lowVoltagePermitDate').text(tabData.low_voltage);
	$('#projectManager').find('#lowVoltagePermit').text(convertStatus(tabData.voltagePermitStatus));
	
	$('#projectManager').find('#tempCertOccupancyPermitRequired').text(convertRequired(tabData.tempCertOccupancyPermitRequired));
	$('#projectManager').find('#tempCertOccupancyPermitDate').text(tabData.tempCertOccupancy);
	$('#projectManager').find('#tempCertOccupancyPermit').text(convertStatus(tabData.tempCertOccupancyPermitStatus));
	
	//Required
	$('#projectManager').find('#certOccupancyPermitRequired').text(convertRequired(tabData.certOccupancyPermitRequired));
	$('#projectManager').find('#certOccupancyPermitDate').text(tabData.certOccupancy);
	$('#projectManager').find('#certOccupancyPermit').text(convertStatus(tabData.certOccupancyPermitStatus));
	
	
	// inspections
	$('#projectManager').find('#buildingInspectionRequired').text(convertRequired(tabData.buildingInspectionRequired));
	$('#projectManager').find('#buildingInspectionDate').text(tabData.buildingInspectionLastUpdated);
	$('#projectManager').find('#buildingInspection').text(convertStatus(tabData.buildingInspectionStatus));
	
	$('#projectManager').find('#ceilingInspectionRequired').text(convertRequired(tabData.ceilingInspectionRequired));
	$('#projectManager').find('#ceilingInspectionDate').text(tabData.ceilingInspectionLastUpdated);
	$('#projectManager').find('#ceilingInspection').text(convertStatus(tabData.ceilingInspectionStatus));
	
	$('#projectManager').find('#mechanicalInspectionRequired').text(convertRequired(tabData.mechanicalInspectionRequired));
	$('#projectManager').find('#mechanicalInspectionDate').text(tabData.mechanicalInspectionLastUpdated);
	$('#projectManager').find('#mechanicalInspection').text(convertStatus(tabData.mechanicalInspectionStatus));
	
	$('#projectManager').find('#electricalInspectionRequired').text(convertRequired(tabData.electricalInspectionRequired));
	$('#projectManager').find('#electricalInspectionDate').text(tabData.electricalInspectionLastUpdated);
	$('#projectManager').find('#electricalInspection').text(convertStatus(tabData.electricalInspectionStatus));
	
	$('#projectManager').find('#plumbingInspectionRequired').text(convertRequired(tabData.plumbingInspectionRequired));
	$('#projectManager').find('#plumbingInspectionDate').text(tabData.plumbingInspectionLastUpdated);
	$('#projectManager').find('#plumbingInspection').text(convertStatus(tabData.plumbingInspectionStatus));
	
	$('#projectManager').find('#gasInspectionRequired').text(convertRequired(tabData.gasInspectionRequired));
	$('#projectManager').find('#gasInspectionDate').text(tabData.gasInspectionLastUpdated);
	$('#projectManager').find('#gasInspection').text(convertStatus(tabData.gasInspectionStatus));
	
	$('#projectManager').find('#sprinklerInspectionRequired').text(convertRequired(tabData.sprinklerInspectionRequired));
	$('#projectManager').find('#sprinklerInspectionDate').text(tabData.sprinklerInspectionLastUpdated);
	$('#projectManager').find('#sprinklerInspection').text(convertStatus(tabData.sprinklerInspectionStatus));
	
	$('#projectManager').find('#fireAlarmInspectionRequired').text(convertRequired(tabData.fireAlarmInspectionRequired));
	$('#projectManager').find('#fireAlarmInspectionDate').text(tabData.fireAlarmInspectionLastUpdated);
	$('#projectManager').find('#fireAlarmInspection').text(convertStatus(tabData.fireAlarmInspectionStatus));
	
	$('#projectManager').find('#lowVoltageInspectionRequired').text(convertRequired(tabData.fireAlarmInspectionRequired));
	$('#projectManager').find('#lowVoltageInspectionDate').text(tabData.voltageInspectionLastUpdated);
	$('#projectManager').find('#lowVoltageInspection').text(convertStatus(tabData.voltageInspectionStatus));

	$('#projectManager').find('#tempCertOccupancyInspectionRequired').text(convertRequired(tabData.tempCertOccupancyInspectionRequired));
	$('#projectManager').find('#tempCertOccupancyInspectionDate').text(tabData.tempCertOccupancyInspectionLastUpdated);
	$('#projectManager').find('#tempCertOccupancyInspection').text(convertStatus(tabData.tempCertOccupancyInspectionStatus));

	//Required
	$('#projectManager').find('#certOccupancyInspectionRequired').text(convertRequired(tabData.certOccupancyInspectionRequired));
	$('#projectManager').find('#certOccupancyInspectionDate').text(tabData.certOccupancyInspectionLastUpdated);
	$('#projectManager').find('#certOccupancyInspection').text(convertStatus(tabData.certOccupancyInspectionStatus));
	
	
	//$('#projectManager').find('#buildPermExpireDate').text(tabData.buildPermExpireDate);
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
	//$('#equipmentTableProposals').find('tbody').find('tr').remove();
	
	
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
		equipmentName.appendChild(document.createTextNode(equipment.equipmentName));
		
		var equipmentDescription = document.createElement('td');
		var descriptionText = equipment.description;
		
		if(descriptionText == undefined || descriptionText == "undefined")
			descriptionText = "";
		
		equipmentDescription.appendChild(document.createTextNode(descriptionText));
		
		var deliveryStatus = document.createElement('td');
		var deliveryStatusText = "";
		if(equipment.eqStatus)
			deliveryStatusText = equipment.eqStatus.name;
		
		if(deliveryStatusText == undefined || deliveryStatusText == "undefined" || deliveryStatusText == "default")
			deliveryStatusText = "";
		deliveryStatus.appendChild(document.createTextNode(deliveryStatusText));
		
		
		var supplier = document.createElement('td');
		var supplierText = "";
		if(equipment.eqSupplier)
			supplierText = equipment.eqSupplier.name;
		supplier.appendChild(document.createTextNode(supplierText));
		
		
		var orderedDate = document.createElement('td');
		if (equipment.orderedDate === undefined)
			orderedDate.appendChild(document.createTextNode("---"));
		else
			orderedDate.appendChild(document.createTextNode(equipment.orderedDate));
		
		var equipProposalDate = document.createElement('td');
		if (equipment.equipProposalDate === undefined)
			equipProposalDate.appendChild(document.createTextNode("---"));
		else
			equipProposalDate.appendChild(document.createTextNode(equipment.equipProposalDate));
		
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
		
		var equipmentNotes = document.createElement('td');
//		equipmentNotes.appendChild(document.createTextNode(addingSlashNtoHTML(equipment.notes)));
		equipmentNotes.innerHTML = addingBreaktoHTML(equipment.notes);
		
		var equipmentUnitPrice = document.createElement('td');
		if (equipment.unitPrice === undefined){
			equipmentUnitPrice.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentUnitPrice.innerHTML = addingBreaktoHTML(equipment.unitPrice);
		
		var equipmentQuantity = document.createElement('td');
		if (equipment.quantity === undefined){
			equipmentQuantity.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentQuantity.innerHTML = addingBreaktoHTML(equipment.quantity);
		
		var equipmentTotalPrice = document.createElement('td');
		if (equipment.totalPrice === undefined){
			equipmentTotalPrice.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentTotalPrice.innerHTML = addingBreaktoHTML(equipment.totalPrice);
		
		tableRow.appendChild(equipmentName);
		tableRow.appendChild(equipmentDescription);
		tableRow.appendChild(supplier);
		tableRow.appendChild(equipProposalDate);
		tableRow.appendChild(deliveryStatus);
		tableRow.appendChild(orderedDate);
		tableRow.appendChild(estDeliveryDate);
		tableRow.appendChild(deliveryDate);
		tableRow.appendChild(equipmentNotes);
		tableRow.appendChild(equipmentUnitPrice);
		tableRow.appendChild(equipmentQuantity);
		tableRow.appendChild(equipmentTotalPrice);
		$("#equipmentTable").find('tbody').append(tableRow);
		
	}
}

/**
 * This function fills out the equipment info in Proposals Tab
 * @param data with equipment info
 * @returns
 */
function fillEquipmentProposals (data) {

	$('#equipmentTableProposals').find('tbody').find('tr').remove();		
	let equipmentList = data.projEquipment;

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
		tableRow.onclick = function() {toggleEquipmentProposals(this)};
		tableRow.ondblclick = function () {editSelectedEquipmentProposals(this.value)};

		var equipmentName = document.createElement('td');
		equipmentName.appendChild(document.createTextNode(equipment.equipmentName));
		
		var equipmentDescription = document.createElement('td');
		var descriptionText = equipment.description;
		
		if(descriptionText == undefined || descriptionText == "undefined")
			descriptionText = "";
		
		equipmentDescription.appendChild(document.createTextNode(descriptionText));
		
		var deliveryStatus = document.createElement('td');
		var deliveryStatusText = "";
		if(equipment.eqStatus)
			deliveryStatusText = equipment.eqStatus.name;
		
		if(deliveryStatusText == undefined || deliveryStatusText == "undefined" || deliveryStatusText == "default")
			deliveryStatusText = "";
		deliveryStatus.appendChild(document.createTextNode(deliveryStatusText));
		
		
		var supplier = document.createElement('td');
		var supplierText = "";
		if(equipment.eqSupplier)
			supplierText = equipment.eqSupplier.name;
		supplier.appendChild(document.createTextNode(supplierText));
		
		
		var orderedDate = document.createElement('td');
		if (equipment.orderedDate === undefined)
			orderedDate.appendChild(document.createTextNode("---"));
		else
			orderedDate.appendChild(document.createTextNode(equipment.orderedDate));
		
		var equipProposalDate = document.createElement('td');
		if (equipment.equipProposalDate === undefined)
			equipProposalDate.appendChild(document.createTextNode("---"));
		else
			equipProposalDate.appendChild(document.createTextNode(equipment.equipProposalDate));
		
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
		
		var equipmentNotes = document.createElement('td');
		
		equipmentNotes.innerHTML = addingBreaktoHTML(equipment.notes);
		
		var equipmentUnitPrice = document.createElement('td');
		if (equipment.unitPrice === undefined){
			equipmentUnitPrice.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentUnitPrice.innerHTML = addingBreaktoHTML(equipment.unitPrice);
		
		var equipmentQuantity = document.createElement('td');
		if (equipment.quantity === undefined){
			equipmentQuantity.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentQuantity.innerHTML = addingBreaktoHTML(equipment.quantity);
		
		var equipmentTotalPrice = document.createElement('td');
		if (equipment.totalPrice === undefined){
			equipmentTotalPrice.appendChild(document.createTextNode('---'));			
		}
			
		else 
			equipmentTotalPrice.innerHTML = addingBreaktoHTML(equipment.totalPrice);
		
		
		tableRow.appendChild(equipmentName);
		tableRow.appendChild(equipmentDescription);
		tableRow.appendChild(supplier);
		tableRow.appendChild(equipProposalDate);
		tableRow.appendChild(deliveryStatus);
		tableRow.appendChild(orderedDate);
		tableRow.appendChild(estDeliveryDate);
		tableRow.appendChild(deliveryDate);
		tableRow.appendChild(equipmentNotes);
		tableRow.appendChild(equipmentUnitPrice);
		tableRow.appendChild(equipmentQuantity);
		tableRow.appendChild(equipmentTotalPrice);
		$("#equipmentTableProposals").find('tbody').append(tableRow);
		
	}
}

/**
 * This function fills out the closeout info
 * @param data with closeout info
 * @returns
 */
function fillCloseout (data) {
	let closeoutData = data.closeoutDetails;
	$('#closeoutSummary').find('#mg2Completion').html(closeoutStatusConverter(closeoutData.substantialCompletionStatus));
	$('#closeoutSummary').find('#punchList').html(closeoutStatusConverter(closeoutData.punchListStatus));
	$('#closeoutSummary').find('#verisaeReport').html(closeoutStatusConverter(closeoutData.verisaeReportStatus));
	
	let required = 0;
	let completed = 0;
	
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
	else if(param == 6)
		return "TBD";
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

function editSelectedChangeOrder () {
	window.location.href = PROJECT_CHANGE_ORDER + '?type=edit&id=' + projectID + '&changeOrderID=' + selectedChangeOrder;
}


function toggleEquipment (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editEquipment').prop('disabled', false);
	selectedEquipment = $(source).attr('value');
}


function toggleEquipmentProposals (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editEquipmentProposals').prop('disabled', false);
	selectedEquipment = $(source).attr('value');
}

function editSelectedEquipment (source) {
	
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

function editSelectedEquipmentProposals (source) {
	
	if(source) EQUIPMENT_ID_EQUIP = source;
	else EQUIPMENT_ID_EQUIP = selectedEquipment;
	
	PAGETYPE_EQUIP = "edit";	
	projectID_EQUIP = projectID;
	clearEquipmentFormValuesProposals();
	
	setCurrentDivLocation("equipmentDivProposals");

	$('.editProject').hide();
	$('#equipmentFormProposals').addClass('active');
	$('#equipmentDivProposals').find(".nav-tabs").find("[data-tab=saveButtonProposals]").removeClass("active");
	$('#equipmentDivProposals').find(".nav-tabs").find("[data-tab=equipmentFormProposals]").addClass("active");
	$('.projectNavigator-projectManager').show();
	$('.projectEdit').show();
	$('.projectNavigator').show();
	$('#equipmentDivProposals').show();
	$('#deleteEquipmentProposals').show();
	
	getDropdownInfo_EQUIP_PROP();
}

function equipmentReport () {

	window.open("Report?" + 'id=' + projectID + "&type=Equipment Report");
}

/**
 * This function warns the user that they are about to permanently delete a project and then deletes
 * it after receiving confirmation
 */

function permissionCheck(){
	console.log("is it working?");
	var tasksExist = tasks.length;
	let user;
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, success: function (data) {
			user = data;
			console.log(user);
			console.log("IT WORKED");

			if(user.permission.canDeleteProjects == true)
			{	//Delete the project if it does not have any tasks associated with it.
				if(tasksExist == 0){
					deleteConfirm();
				}
				else {
					alert("This project has Tasks associated with it and hence cannot be deleted");
				}
	//If a project has tasks, then it is not being deleted because of foreign key dependency			
				
/*				//If it has any tasks, delete the project if all the tasks are Closed
				else if(tasksExist!=0){
					var i;
					var flagOpen = 0;
					for(i=0;i<tasksExist;i++){
						if(tasks[i].status.status == "Open"){
							flagOpen+=1;
							break;
						}
					}
					console.log("flag open is ",flagOpen);
					if(flagOpen == 0){
						deleteConfirm();
					}
				
				
					else {
						alert("This project has Tasks associated with it and hence cannot be deleted");
					}
				}*/
			}
			else
			{
				alert("You don't have the permission to delete a project");
			}
		}
	});
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
				if(data.responseJSON === "PROJECT_OBJECT_DELETED") {
					//PROJECT_DELETED to PROJECT_OBJECT_DELETED
					alert("Project Deleted!");
					document.location.reload(true); //Is this a god fix ? I just have to reload this page to get the updated project list
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
		console.log(task);
		
		var taskListing = document.createElement('tr');
		taskListing.setAttribute("value", task.id);
		taskListing.onclick = function() {
			toggleTask(this);
		};
		
		taskListing.ondblclick = function(){
			editSelectedTask(this);
		};
		

		count++;
		
		taskListing.value = tasks[i].id;
		taskListing.id = "task_" + tasks[i].id;
		
		let taskTitle = document.createElement('td');
		let taskDesc = document.createElement('td');
		let MCS = document.createElement('td');
		let assignedTo = document.createElement('td');
		let dueDate = document.createElement('td');
		let severity = document.createElement('td');
		let status = document.createElement('td');
		let notes = document.createElement('td');

		taskTitle.innerHTML = tasks[i].title;
		
		taskDesc.innerHTML = tasks[i].description;
		
		
		MCS.innerHTML = tasks[i].assignee.firstName;
		assignedTo.innerHTML = tasks[i].subAssignee.name;
		
		dueDate.innerHTML = tasks[i].dueDate;
		
		severity.innerHTML = tasks[i].severity;
		
		status.innerHTML = tasks[i].status.status;
		
		notes.innerHTML = addingBreaktoHTML(tasks[i].notes);
		
		taskListing.appendChild(taskTitle);
		taskListing.appendChild(taskDesc);
		taskListing.appendChild(MCS);
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
let SELECTED_PENDINV_ID;

function toggleTask (source) {
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
	document.getElementById('tasksInformation').style.width = "100%";
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
		
		$('#taskCreationZone').find('#subcontractorsDropdown').val(selected_task.subAssignee.name);
	}
	else {
		$('#taskCreationZone').find('#employeeAssigneeTableElement').show();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').show();
		
		taskAssigneeType = TASK_EMPLOYEE_ASSIGNEE;
		$('#taskCreationZone').find('#assigneeEntry').val(selected_task.assignee.firstName);
		$('#taskCreationZone').find('#subcontractorsDropdown').val(selected_task.subAssignee.name);
	}

		
	$('#taskCreationZone').find('#initDate').val(selected_task.assignedDate);
	$('#taskCreationZone').find('#dueDate').val(selected_task.dueDate);
	$('#taskCreationZone').find('#severity').val(selected_task.severity);
	$('#taskCreationZone').find('#taskStatus').val(selected_task.status.status);
	$('#taskCreationZone').find('#notes').val(selected_task.notes);

		
}

////////////////////////////////////////////////////////////////////
// js for cost estimate tab
////////////////////////////////////////////////////////////////////

let costEstData;

$(document).ready(function(){
	 
	 var currentDate = new Date();
	
	 $('#costEstimateData').find('#genConSubmitDate').datepicker();
	 $('#costEstimateData').find('#refrigSubmitDate').datepicker(); 
	 $('#costEstimateData').find('#mechanicalSubmitDate').datepicker();
	 $('#costEstimateData').find('#electricalSubmitDate').datepicker();
	 $('#costEstimateData').find('#plumbingSubmitDate').datepicker();
	 $('#costEstimateData').find('#gasSubmitDate').datepicker();
	 $('#costEstimateData').find('#sprinklerSubmitDate').datepicker();
	 $('#costEstimateData').find('#fireAlarmSubmitDate').datepicker();
	 $('#costEstimateData').find('#carpenterSubmitDate').datepicker();
	 $('#costEstimateData').find('#equipmentSubmitDate').datepicker();
	 $('#costEstimateData').find('#supervisionSubmitDate').datepicker();
	 $('#costEstimateData').find('#profitSubmitDate').datepicker();
	 $('#costEstimateData').find('#taxesSubmitDate').datepicker();
	 $('#costEstimateData').find('#totalSubmitDate').datepicker();

});


function getDropdownInfoCostEst()
{
	if(projectID === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',		
			'changeorderstatus': true,
			'subcontractors' : true
		},
		success: function(data)
		{
			console.log(data);
			clearCostEstEditor();
			fillDropdownsCostEst(data);
		}
	});
}

function fillDropdownsCostEst(json)
{
	console.log(json);
	var changeorderStatus = JSON.parse(json["changeorderstatus"]);
	changeorderStatus = sortChangeOrderStatus(changeorderStatus);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < changeorderStatus.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = changeorderStatus[i].name;
		option.setAttribute("value", changeorderStatus[i].id);
		d.appendChild(option);
	}

	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "--Status--";

	
	$('#costEstimateData').find('.ceStatus').find('option').remove();
	$('#costEstimateData').find('.ceStatus').append(defaultOption);
	$('#costEstimateData').find('.ceStatus').append(d);
	
	
	var subs = JSON.parse(json["subcontractors"]);
	console.log(subs);
	d = document.createDocumentFragment();
	for(var i = 0; i < subs.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = subs[i].name;
		option.setAttribute("value", subs[i].id);
		d.appendChild(option);
	}

	
	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "--Sub Name--";

	
	$('#costEstimateData').find('.ceSubName').find('option').remove();
	$('#costEstimateData').find('.ceSubName').append(defaultOption);
	$('#costEstimateData').find('.ceSubName').append(d);
	
	if(costEstData.length > 0)
		fillCostEstEditor(costEstData);

}


function editCostEstimate () {
	document.getElementById("projectManager").style.display = 'none';
	EDIT_INTENTION = true;
	currentDivLocation = "costEstimateData";
	setProjectHeader(PROJECT_DATA, 'costEstimateData');
	document.getElementById("costEstimateData").style.display = 'inline';
	$('#costEstimateData').find('#costEstDetails').addClass('active');
	$('#costEstimateData').find('#costEstimateDetails').addClass('active');
	getDropdownInfoCostEst();
	console.log("dropdowns filled");
}

function checkDefault(data)
{
   	if(data == "0")
   		return "default";
   	else
   		return data;
}

function checkCost(data)
{
	if(data == "0")
		return "";
	else
		return data;
}

function fillCostEstEditor(data)
{
   console.log("fill cost est editor", data);
   data = data[data.length - 1];
   console.log(data.refrigSubName);
   
   $('#costEstimateData').find("#genConProposalReq").val(checkDefault(data.genConProposalReq));   
   $('#costEstimateData').find("#genConSubName").val(checkDefault(data.genConSubName));
   $('#costEstimateData').find("#genConStatus").val(checkDefault(data.genConStatus));
   $('#costEstimateData').find("#genConSubmitDate").val(data.genConSubmitDate);
   $('#costEstimateData').find("#genConCost").val(checkCost(data.genConCost));
   $('#costEstimateData').find("#genConScopeDes").val(data.genConScope);
   $('#costEstimateData').find("#genConNotes").val(data.genConNotes);
  
   $('#costEstimateData').find("#refrigProposalReq").val(checkDefault(data.refrigProposalReq));
   $('#costEstimateData').find("#refrigSubName").val(checkDefault(data.refrigSubName));
   $('#costEstimateData').find("#refrigStatus").val(checkDefault(data.refrigStatus));
   $('#costEstimateData').find("#refrigSubmitDate").val(data.refrigSubmitDate);
   $('#costEstimateData').find("#refrigCost").val(checkCost(data.refrigCost));
   $('#costEstimateData').find("#refrigScopeDes").val(data.refrigScope);
   $('#costEstimateData').find("#refrigNotes").val(data.refrigNotes);
   
   $('#costEstimateData').find("#mechanicalProposalReq").val(checkDefault(data.mechanicalProposalReq));
   $('#costEstimateData').find("#mechanicalSubName").val(checkDefault(data.mechanicalSubName));
   $('#costEstimateData').find("#mechanicalStatus").val(checkDefault(data.mechanicalStatus));
   $('#costEstimateData').find("#mechanicalSubmitDate").val(data.mechanicalSubmitDate);
   $('#costEstimateData').find("#mechanicalCost").val(checkCost(data.mechanicalCost));
   $('#costEstimateData').find("#mechanicalScopeDes").val(data.mechanicalScope);
   $('#costEstimateData').find("#mechanicalNotes").val(data.mechanicalNotes);
   
   $('#costEstimateData').find("#electricalProposalReq").val(checkDefault(data.electricalProposalReq));
   $('#costEstimateData').find("#electricalSubName").val(checkDefault(data.electricalSubName));
   $('#costEstimateData').find("#electricalStatus").val(checkDefault(data.electricalStatus));
   $('#costEstimateData').find("#electricalSubmitDate").val(data.electricalSubmitDate);
   $('#costEstimateData').find("#electricalCost").val(checkCost(data.electricalCost));
   $('#costEstimateData').find("#electricalScopeDes").val(data.electricalScope);
   $('#costEstimateData').find("#electricalNotes").val(data.electricalNotes);
   
   $('#costEstimateData').find("#plumbingProposalReq").val(checkDefault(data.plumbingProposalReq));
   $('#costEstimateData').find("#plumbingSubName").val(checkDefault(data.plumbingSubName));
   $('#costEstimateData').find("#plumbingStatus").val(checkDefault(data.plumbingStatus));
   $('#costEstimateData').find("#plumbingSubmitDate").val(data.plumbingSubmitDate);
   $('#costEstimateData').find("#plumbingCost").val(checkCost(data.plumbingCost));
   $('#costEstimateData').find("#plumbingScopeDes").val(data.plumbingScope);
   $('#costEstimateData').find("#plumbingNotes").val(data.plumbingNotes);
   
   $('#costEstimateData').find("#gasProposalReq").val(checkDefault(data.gasProposalReq));
   $('#costEstimateData').find("#gasSubName").val(checkDefault(data.gasSubName));
   $('#costEstimateData').find("#gasStatus").val(checkDefault(data.gasStatus));
   $('#costEstimateData').find("#gasSubmitDate").val(data.gasSubmitDate);
   $('#costEstimateData').find("#gasCost").val(checkCost(data.gasCost));
   $('#costEstimateData').find("#gasScopeDes").val(data.gasScope);
   $('#costEstimateData').find("#gasNotes").val(data.gasNotes);
   
   $('#costEstimateData').find("#sprinklerProposalReq").val(checkDefault(data.sprinklerProposalReq));
   $('#costEstimateData').find("#sprinklerSubName").val(checkDefault(data.sprinklerSubName));
   $('#costEstimateData').find("#sprinklerStatus").val(checkDefault(data.sprinklerStatus));
   $('#costEstimateData').find("#sprinklerSubmitDate").val(data.sprinklerSubmitDate);
   $('#costEstimateData').find("#sprinklerCost").val(checkCost(data.sprinklerCost));
   $('#costEstimateData').find("#sprinklerScopeDes").val(data.sprinklerScope);
   $('#costEstimateData').find("#sprinklerNotes").val(data.sprinklerNotes);
   
   $('#costEstimateData').find("#fireAlarmProposalReq").val(checkDefault(data.fireAlarmProposalReq));
   $('#costEstimateData').find("#fireAlarmSubName").val(checkDefault(data.fireAlarmSubName));
   $('#costEstimateData').find("#fireAlarmStatus").val(checkDefault(data.fireAlarmStatus));
   $('#costEstimateData').find("#fireAlarmSubmitDate").val(data.fireAlarmSubmitDate);
   $('#costEstimateData').find("#fireAlarmCost").val(checkCost(data.fireAlarmCost));
   $('#costEstimateData').find("#fireAlarmScopeDes").val(data.fireAlarmScope);
   $('#costEstimateData').find("#fireAlarmNotes").val(data.fireAlarmScope);
   
   $('#costEstimateData').find("#carpenterProposalReq").val(checkDefault(data.carpenterProposalReq));
   $('#costEstimateData').find("#carpenterSubName").val(checkDefault(data.carpenterSubName));
   $('#costEstimateData').find("#carpenterStatus").val(checkDefault(data.carpenterStatus));
   $('#costEstimateData').find("#carpenterSubmitDate").val(data.carpenterSubmitDate);
   $('#costEstimateData').find("#carpenterCost").val(checkCost(data.carpenterCost));
   $('#costEstimateData').find("#carpenterScopeDes").val(data.carpenterScope);
   $('#costEstimateData').find("#carpenterNotes").val(data.carpenterNotes);
   
   $('#costEstimateData').find("#equipmentProposalReq").val(checkDefault(data.equipmentProposalReq));
   $('#costEstimateData').find("#equipmentSubName").val(checkDefault(data.equipmentSubName));
   $('#costEstimateData').find("#equipmentStatus").val(checkDefault(data.equipmentStatus));
   $('#costEstimateData').find("#equipmentSubmitDate").val(data.equipmentSubmitDate);
   $('#costEstimateData').find("#equipmentCost").val(checkCost(data.equipmentCost));
   $('#costEstimateData').find("#equipmentScopeDes").val(data.equipmentScope);
   $('#costEstimateData').find("#equipmentNotes").val(data.equipmentNotes);
   
   $('#costEstimateData').find("#supervisionProposalReq").val(checkDefault(data.supervisionProposalReq));
   $('#costEstimateData').find("#supervisionSubName").val(checkDefault(data.supervisionSubName));
   $('#costEstimateData').find("#supervisionStatus").val(checkDefault(data.supervisionStatus));
   $('#costEstimateData').find("#supervisionSubmitDate").val(data.supervisionSubmitDate);
   $('#costEstimateData').find("#supervisionCost").val(checkCost(data.supervisionCost));
   $('#costEstimateData').find("#supervisionScopeDes").val(data.supervisionScope);
   $('#costEstimateData').find("#supervisionNotes").val(data.supervisionNotes);
   
   $('#costEstimateData').find("#profitProposalReq").val(checkDefault(data.profitProposalReq));
   $('#costEstimateData').find("#profitSubName").val(checkDefault(data.profitSubName));
   $('#costEstimateData').find("#profitStatus").val(checkDefault(data.profitStatus));
   $('#costEstimateData').find("#profitSubmitDate").val(data.profitSubmitDate);
   $('#costEstimateData').find("#profitCost").val(checkCost(data.profitCost));
   $('#costEstimateData').find("#profitScopeDes").val(data.profitScope);
   $('#costEstimateData').find("#profitNotes").val(data.profitNotes);
   
   $('#costEstimateData').find("#taxesProposalReq").val(checkDefault(data.taxesProposalReq));
   $('#costEstimateData').find("#taxesSubName").val(checkDefault(data.taxesSubName));
   $('#costEstimateData').find("#taxesStatus").val(checkDefault(data.taxesStatus));
   $('#costEstimateData').find("#taxesSubmitDate").val(data.taxesSubmitDate);
   $('#costEstimateData').find("#taxesCost").val(checkCost(data.taxesCost));
   $('#costEstimateData').find("#taxesScopeDes").val(data.taxesScope);
   $('#costEstimateData').find("#taxesNotes").val(data.taxesNotes);
   
   $('#costEstimateData').find("#totalProposalReq").val(checkDefault(data.totalProposalReq));
   $('#costEstimateData').find("#totalSubName").val(checkDefault(data.totalSubName));
   $('#costEstimateData').find("#totalStatus").val(checkDefault(data.totalStatus));
   $('#costEstimateData').find("#totalSubmitDate").val(data.totalSubmitDate);
   $('#costEstimateData').find("#totalCost").val(checkCost(data.totalCost));
   $('#costEstimateData').find("#totalScopeDes").val(data.totalScope);
   $('#costEstimateData').find("#totalNotes").val(data.totalNotes);
}


function calculateTotalEdit()
{
   var total = 0.0;
   
   var genConCost = $('#costEstimateData').find("#genConCost").val();
   genConCost = parseFloat(genConCost);
   if(!isNaN(genConCost))
	   total += genConCost;
   
   var refrigCost = $('#costEstimateData').find("#refrigCost").val();
   refrigCost = parseFloat(refrigCost);
   if(!isNaN(refrigCost))
	   total += refrigCost;
   
   var mechanicalCost = $('#costEstimateData').find("#mechanicalCost").val();
   mechanicalCost = parseFloat(mechanicalCost);
   if(!isNaN(mechanicalCost))
	   total += mechanicalCost;
   
   var electricalCost = $('#costEstimateData').find("#electricalCost").val();
   electricalCost = parseFloat(electricalCost);
   if(!isNaN(electricalCost))
	   total += electricalCost;
   
   var plumbingCost = $('#costEstimateData').find("#plumbingCost").val();
   plumbingCost = parseFloat(plumbingCost);
   if(!isNaN(plumbingCost))
	   total += plumbingCost;
   
   var gasCost = $('#costEstimateData').find("#gasCost").val();
   gasCost = parseFloat(gasCost);
   if(!isNaN(gasCost))
	   total += gasCost;
   
   var sprinklerCost = $('#costEstimateData').find("#sprinklerCost").val();
   sprinklerCost = parseFloat(sprinklerCost);
   if(!isNaN(sprinklerCost))
	   total += sprinklerCost;
   
   var fireAlarmCost = $('#costEstimateData').find("#fireAlarmCost").val();
   fireAlarmCost = parseFloat(fireAlarmCost);
   if(!isNaN(fireAlarmCost))
	   total += fireAlarmCost;
   
   var carpenterCost = $('#costEstimateData').find("#carpenterCost").val();
   carpenterCost = parseFloat(carpenterCost);
   if(!isNaN(carpenterCost))
	   total += carpenterCost;
   
   var equipmentCost = $('#costEstimateData').find("#equipmentCost").val();
   equipmentCost = parseFloat(equipmentCost);
   if(!isNaN(equipmentCost))
	   total += equipmentCost;
   
   var supervisionCost = $('#costEstimateData').find("#supervisionCost").val();
   supervisionCost = parseFloat(supervisionCost);
   if(!isNaN(supervisionCost))
	   total += supervisionCost;
   
   var profitCost = $('#costEstimateData').find("#profitCost").val();
   profitCost = parseFloat(profitCost);
   if(!isNaN(profitCost))
	   total += profitCost;
   
   var taxesCost = $('#costEstimateData').find("#taxesCost").val();
   taxesCost = parseFloat(taxesCost);
   if(!isNaN(taxesCost))
	   total += taxesCost;
   
   total = total.toFixed(2);
   console.log(total);
   
   $('#costEstimateData').find('#totalCost').val(total);
}

function clearCostEstEditor()
{
	   console.log("clear cost est editor")
	   $('#costEstimateData').find("#genConProposalReq").val("default");   
	   $('#costEstimateData').find("#genConSubName").val("defualt");
	   $('#costEstimateData').find("#genConStatus").val("defualt");
	   $('#costEstimateData').find("#genConSubmitDate").val("");
	   $('#costEstimateData').find("#genConCost").val("");
	   $('#costEstimateData').find("#genConScopeDes").val("");
	   $('#costEstimateData').find("#genConNotes").val("");
	  
	   $('#costEstimateData').find("#refrigProposalReq").val("default");
	   $('#costEstimateData').find("#refrigSubName").val("defualt");
	   $('#costEstimateData').find("#refrigStatus").val("defualt");
	   $('#costEstimateData').find("#refrigSubmitDate").val("");
	   $('#costEstimateData').find("#refrigCost").val("");
	   $('#costEstimateData').find("#refrigScopeDes").val("");
	   $('#costEstimateData').find("#refrigNotes").val("");
	   
	   $('#costEstimateData').find("#mechanicalProposalReq").val("default");
	   $('#costEstimateData').find("#mechanicalSubName").val("defualt");
	   $('#costEstimateData').find("#mechanicalStatus").val("defualt");
	   $('#costEstimateData').find("#mechanicalSubmitDate").val("");
	   $('#costEstimateData').find("#mechanicalCost").val("");
	   $('#costEstimateData').find("#mechanicalScopeDes").val("");
	   $('#costEstimateData').find("#mechanicalNotes").val("");
	   
	   $('#costEstimateData').find("#electricalProposalReq").val("default");
	   $('#costEstimateData').find("#electricalSubName").val("defualt");
	   $('#costEstimateData').find("#electricalStatus").val("defualt");
	   $('#costEstimateData').find("#electricalSubmitDate").val("");
	   $('#costEstimateData').find("#electricalCost").val("");
	   $('#costEstimateData').find("#electricalScopeDes").val("");
	   $('#costEstimateData').find("#electricalNotes").val("");
	   
	   $('#costEstimateData').find("#plumbingProposalReq").val("default");
	   $('#costEstimateData').find("#plumbingSubName").val("defualt");
	   $('#costEstimateData').find("#plumbingStatus").val("defualt");
	   $('#costEstimateData').find("#plumbingSubmitDate").val("");
	   $('#costEstimateData').find("#plumbingCost").val("");
	   $('#costEstimateData').find("#plumbingScopeDes").val("");
	   $('#costEstimateData').find("#plumbingNotes").val("");
	   
	   $('#costEstimateData').find("#gasProposalReq").val("default");
	   $('#costEstimateData').find("#gasSubName").val("defualt");
	   $('#costEstimateData').find("#gasStatus").val("defualt");
	   $('#costEstimateData').find("#gasSubmitDate").val("");
	   $('#costEstimateData').find("#gasCost").val("");
	   $('#costEstimateData').find("#gasScopeDes").val("");
	   $('#costEstimateData').find("#gasNotes").val("");
	   
	   $('#costEstimateData').find("#sprinklerProposalReq").val("default");
	   $('#costEstimateData').find("#sprinklerSubName").val("defualt");
	   $('#costEstimateData').find("#sprinklerStatus").val("defualt");
	   $('#costEstimateData').find("#sprinklerSubmitDate").val("");
	   $('#costEstimateData').find("#sprinklerCost").val("");
	   $('#costEstimateData').find("#sprinklerScopeDes").val("");
	   $('#costEstimateData').find("#sprinklerNotes").val("");
	   
	   $('#costEstimateData').find("#fireAlarmProposalReq").val("default");
	   $('#costEstimateData').find("#fireAlarmSubName").val("defualt");
	   $('#costEstimateData').find("#fireAlarmStatus").val("defualt");
	   $('#costEstimateData').find("#fireAlarmSubmitDate").val("");
	   $('#costEstimateData').find("#fireAlarmCost").val("");
	   $('#costEstimateData').find("#fireAlarmScopeDes").val("");
	   $('#costEstimateData').find("#fireAlarmNotes").val("");
	   
	   $('#costEstimateData').find("#carpenterProposalReq").val("default");
	   $('#costEstimateData').find("#carpenterSubName").val("defualt");
	   $('#costEstimateData').find("#carpenterStatus").val("defualt");
	   $('#costEstimateData').find("#carpenterSubmitDate").val("");
	   $('#costEstimateData').find("#carpenterCost").val("");
	   $('#costEstimateData').find("#carpenterScopeDes").val("");
	   $('#costEstimateData').find("#carpenterNotes").val("");
	   
	   $('#costEstimateData').find("#equipmentProposalReq").val("default");
	   $('#costEstimateData').find("#equipmentSubName").val("defualt");
	   $('#costEstimateData').find("#equipmentStatus").val("defualt");
	   $('#costEstimateData').find("#equipmentSubmitDate").val("");
	   $('#costEstimateData').find("#equipmentCost").val("");
	   $('#costEstimateData').find("#equipmentScopeDes").val("");
	   $('#costEstimateData').find("#equipmentNotes").val("");
	   
	   $('#costEstimateData').find("#supervisionProposalReq").val("default");
	   $('#costEstimateData').find("#supervisionSubName").val("defualt");
	   $('#costEstimateData').find("#supervisionStatus").val("defualt");
	   $('#costEstimateData').find("#supervisionSubmitDate").val("");
	   $('#costEstimateData').find("#supervisionCost").val("");
	   $('#costEstimateData').find("#supervisionScopeDes").val("");
	   $('#costEstimateData').find("#supervisionNotes").val("");
	   
	   $('#costEstimateData').find("#profitProposalReq").val("default");
	   $('#costEstimateData').find("#profitSubName").val("defualt");
	   $('#costEstimateData').find("#profitStatus").val("defualt");
	   $('#costEstimateData').find("#profitSubmitDate").val("");
	   $('#costEstimateData').find("#profitCost").val("");
	   $('#costEstimateData').find("#profitScopeDes").val("");
	   $('#costEstimateData').find("#profitNotes").val("");
	   
	   $('#costEstimateData').find("#taxesProposalReq").val("default");
	   $('#costEstimateData').find("#taxesSubName").val("defualt");
	   $('#costEstimateData').find("#taxesStatus").val("defualt");
	   $('#costEstimateData').find("#taxesSubmitDate").val("");
	   $('#costEstimateData').find("#taxesCost").val("");
	   $('#costEstimateData').find("#taxesScopeDes").val("");
	   $('#costEstimateData').find("#taxesNotes").val("");
	   
	   $('#costEstimateData').find("#totalProposalReq").val("default");
	   $('#costEstimateData').find("#totalSubName").val("defualt");
	   $('#costEstimateData').find("#totalStatus").val("defualt");
	   $('#costEstimateData').find("#totalSubmitDate").val("");
	   $('#costEstimateData').find("#totalCost").val("");
	   $('#costEstimateData').find("#totalScopeDes").val("");
	   $('#costEstimateData').find("#totalNotes").val("");
	
}

function saveCostEstimate()
{
    console.log("Saving cost estimate Information");
    console.log(projectID);

    var genConProposalReq = $('#costEstimateData').find("#genConProposalReq").val();
    var genConSubName = $('#costEstimateData').find("#genConSubName").val();
    var genConStatus = $('#costEstimateData').find("#genConStatus").val();
    var genConSubmitDate = $('#costEstimateData').find("#genConSubmitDate").val();
    var genConCost = $('#costEstimateData').find("#genConCost").val();
    var genConScope = $('#costEstimateData').find("#genConScopeDes").val();
    var genConNotes = $('#costEstimateData').find("#genConNotes").val();
   
    var refrigProposalReq = $('#costEstimateData').find("#refrigProposalReq").val();
    var refrigSubName = $('#costEstimateData').find("#refrigSubName").val();
    var refrigStatus = $('#costEstimateData').find("#refrigStatus").val();
    var refrigSubmitDate = $('#costEstimateData').find("#refrigSubmitDate").val();
    var refrigCost = $('#costEstimateData').find("#refrigCost").val();
    var refrigScope = $('#costEstimateData').find("#refrigScopeDes").val();
    var refrigNotes = $('#costEstimateData').find("#refrigNotes").val();
    
    var mechanicalProposalReq = $('#costEstimateData').find("#mechanicalProposalReq").val();
    var mechanicalSubName = $('#costEstimateData').find("#mechanicalSubName").val();
    var mechanicalStatus = $('#costEstimateData').find("#mechanicalStatus").val();
    var mechanicalSubmitDate = $('#costEstimateData').find("#mechanicalSubmitDate").val();
    var mechanicalCost = $('#costEstimateData').find("#mechanicalCost").val();
    var mechanicalScope = $('#costEstimateData').find("#mechanicalScopeDes").val();
    var mechanicalNotes = $('#costEstimateData').find("#mechanicalNotes").val();
    
    var electricalProposalReq = $('#costEstimateData').find("#electricalProposalReq").val();
    var electricalSubName = $('#costEstimateData').find("#electricalSubName").val();
    var electricalStatus = $('#costEstimateData').find("#electricalStatus").val();
    var electricalSubmitDate = $('#costEstimateData').find("#electricalSubmitDate").val();
    var electricalCost = $('#costEstimateData').find("#electricalCost").val();
    var electricalScope = $('#costEstimateData').find("#electricalScopeDes").val();
    var electricalNotes = $('#costEstimateData').find("#electricalNotes").val();
    
    var plumbingProposalReq = $('#costEstimateData').find("#plumbingProposalReq").val();
    var plumbingSubName = $('#costEstimateData').find("#plumbingSubName").val();
    var plumbingStatus = $('#costEstimateData').find("#plumbingStatus").val();
    var plumbingSubmitDate = $('#costEstimateData').find("#plumbingSubmitDate").val();
    var plumbingCost = $('#costEstimateData').find("#plumbingCost").val();
    var plumbingScope = $('#costEstimateData').find("#plumbingScopeDes").val();
    var plumbingNotes = $('#costEstimateData').find("#plumbingNotes").val();
    
    var gasProposalReq = $('#costEstimateData').find("#gasProposalReq").val();
    var gasSubName = $('#costEstimateData').find("#gasSubName").val();
    var gasStatus = $('#costEstimateData').find("#gasStatus").val();
    var gasSubmitDate = $('#costEstimateData').find("#gasSubmitDate").val();
    var gasCost = $('#costEstimateData').find("#gasCost").val();
    var gasScope = $('#costEstimateData').find("#gasScopeDes").val();
    var gasNotes = $('#costEstimateData').find("#gasNotes").val();
    
    var sprinklerProposalReq = $('#costEstimateData').find("#sprinklerProposalReq").val();
    var sprinklerSubName = $('#costEstimateData').find("#sprinklerSubName").val();
    var sprinklerStatus = $('#costEstimateData').find("#sprinklerStatus").val();
    var sprinklerSubmitDate = $('#costEstimateData').find("#sprinklerSubmitDate").val();
    var sprinklerCost = $('#costEstimateData').find("#sprinklerCost").val();
    var sprinklerScope = $('#costEstimateData').find("#sprinklerScopeDes").val();
    var sprinklerNotes = $('#costEstimateData').find("#sprinklerNotes").val();
    
    var fireAlarmProposalReq = $('#costEstimateData').find("#fireAlarmProposalReq").val();
    var fireAlarmSubName = $('#costEstimateData').find("#fireAlarmSubName").val();
    var fireAlarmStatus = $('#costEstimateData').find("#fireAlarmStatus").val();
    var fireAlarmSubmitDate = $('#costEstimateData').find("#fireAlarmSubmitDate").val();
    var fireAlarmCost = $('#costEstimateData').find("#fireAlarmCost").val();
    var fireAlarmScope = $('#costEstimateData').find("#fireAlarmScopeDes").val();
    var fireAlarmNotes = $('#costEstimateData').find("#fireAlarmNotes").val();
    
    var carpenterProposalReq = $('#costEstimateData').find("#carpenterProposalReq").val();
    var carpenterSubName = $('#costEstimateData').find("#carpenterSubName").val();
    var carpenterStatus = $('#costEstimateData').find("#carpenterStatus").val();
    var carpenterSubmitDate = $('#costEstimateData').find("#carpenterSubmitDate").val();
    var carpenterCost = $('#costEstimateData').find("#carpenterCost").val();
    var carpenterScope = $('#costEstimateData').find("#carpenterScopeDes").val();
    var carpenterNotes = $('#costEstimateData').find("#carpenterNotes").val();
    
    var equipmentProposalReq = $('#costEstimateData').find("#equipmentProposalReq").val();
    var equipmentSubName = $('#costEstimateData').find("#equipmentSubName").val();
    var equipmentStatus = $('#costEstimateData').find("#equipmentStatus").val();
    var equipmentSubmitDate = $('#costEstimateData').find("#equipmentSubmitDate").val();
    var equipmentCost = $('#costEstimateData').find("#equipmentCost").val();
    var equipmentScope = $('#costEstimateData').find("#equipmentScopeDes").val();
    var equipmentNotes = $('#costEstimateData').find("#equipmentNotes").val();
    
    var supervisionProposalReq = $('#costEstimateData').find("#supervisionProposalReq").val();
    var supervisionSubName = $('#costEstimateData').find("#supervisionSubName").val();
    var supervisionStatus = $('#costEstimateData').find("#supervisionStatus").val();
    var supervisionSubmitDate = $('#costEstimateData').find("#supervisionSubmitDate").val();
    var supervisionCost = $('#costEstimateData').find("#supervisionCost").val();
    var supervisionScope = $('#costEstimateData').find("#supervisionScopeDes").val();
    var supervisionNotes = $('#costEstimateData').find("#supervisionNotes").val();
    
    var profitProposalReq = $('#costEstimateData').find("#profitProposalReq").val();
    var profitSubName = $('#costEstimateData').find("#profitSubName").val();
    var profitStatus = $('#costEstimateData').find("#profitStatus").val();
    var profitSubmitDate = $('#costEstimateData').find("#profitSubmitDate").val();
    var profitCost = $('#costEstimateData').find("#profitCost").val();
    var profitScope = $('#costEstimateData').find("#profitScopeDes").val();
    var profitNotes = $('#costEstimateData').find("#profitNotes").val();
    
    var taxesProposalReq = $('#costEstimateData').find("#taxesProposalReq").val();
    var taxesSubName = $('#costEstimateData').find("#taxesSubName").val();
    var taxesStatus = $('#costEstimateData').find("#taxesStatus").val();
    var taxesSubmitDate = $('#costEstimateData').find("#taxesSubmitDate").val();
    var taxesCost = $('#costEstimateData').find("#taxesCost").val();
    var taxesScope = $('#costEstimateData').find("#taxesScopeDes").val();
    var taxesNotes = $('#costEstimateData').find("#taxesNotes").val();
    
    var totalProposalReq = $('#costEstimateData').find("#totalProposalReq").val();
    var totalSubName = $('#costEstimateData').find("#totalSubName").val();
    var totalStatus = $('#costEstimateData').find("#totalStatus").val();
    var totalSubmitDate = $('#costEstimateData').find("#totalSubmitDate").val();
    var totalCost = $('#costEstimateData').find("#totalCost").val();
    var totalScope = $('#costEstimateData').find("#totalScopeDes").val();
    var totalNotes = $('#costEstimateData').find("#totalNotes").val();
    
    
    var dates_CostEst =[ genConSubmitDate, refrigSubmitDate, mechanicalSubmitDate, electricalSubmitDate, plumbingSubmitDate,
    					gasSubmitDate, sprinklerSubmitDate, fireAlarmSubmitDate, carpenterSubmitDate, equipmentSubmitDate,
    					supervisionSubmitDate, profitSubmitDate, taxesSubmitDate, totalSubmitDate];
    
    
    if(isValidInput_PERMIT(dates_CostEst))
    {
    	console.log("we got valid data now");
    	
    	for(var i = 0; i < dates_CostEst.length; i++)
    	{
    		if(dates_CostEst[i]) 
    			dates_CostEst[i] = dateCleaner(dates_CostEst[i]);
    		
    		if(i == 0) genConSubmitDate = dates_CostEst[i];
    		if(i == 1) refrigSubmitDate = dates_CostEst[i];
    		if(i == 2) mechanicalSubmitDate = dates_CostEst[i];
    		if(i == 3) electricalSubmitDate = dates_CostEst[i];
    		if(i == 4) plumbingSubmitDate = dates_CostEst[i];
    		if(i == 5) gasSubmitDate = dates_CostEst[i];
    		if(i == 6) sprinklerSubmitDate = dates_CostEst[i];
    		if(i == 7) fireAlarmSubmitDate = dates_CostEst[i];
    		if(i == 8) carpenterSubmitDate = dates_CostEst[i];
    		if(i == 9) equipmentSubmitDate = dates_CostEst[i];
    		if(i == 10) supervisionSubmitDate = dates_CostEst[i];
    		if(i == 11) profitSubmitDate = dates_CostEst[i];
    		if(i == 12) taxesSubmitDate = dates_CostEst[i];
    		if(i == 13) totalSubmitDate = dates_CostEst[i];
    	}
    	
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			cache: false,
			traditional: true,
			data: 
			{
				'domain': 'project',
				'action': 'addCostEstimate',
				'projectID': projectID,
				'projItem': PROJECT_DATA.projectItem.id,
						
				'genConProposalReq': genConProposalReq, 
				'genConSubName': genConSubName,
				'genConStatus': genConStatus,
				'genConSubmitDate': genConSubmitDate,
				'genConCost': genConCost,
				'genConScope': genConScope,
				'genConNotes': genConNotes,
				
				'refrigProposalReq': refrigProposalReq,
				'refrigSubName': refrigSubName,
				'refrigStatus': refrigStatus,
				'refrigSubmitDate': refrigSubmitDate,
				'refrigCost': refrigCost,
				'refrigScope': refrigScope,
				'refrigNotes': refrigNotes,
				
				'mechanicalProposalReq': mechanicalProposalReq,
				'mechanicalSubName': mechanicalSubName,
				'mechanicalStatus': mechanicalStatus,
				'mechanicalSubmitDate': mechanicalSubmitDate,
				'mechanicalCost': mechanicalCost,
				'mechanicalScope': mechanicalScope,
				'mechanicalNotes': mechanicalNotes,
				
				'electricalProposalReq':electricalProposalReq,
				'electricalSubName': electricalSubName,
				'electricalStatus': electricalStatus,
				'electricalSubmitDate': electricalSubmitDate,
				'electricalCost': electricalCost,
				'electricalScope': electricalScope,
				'electricalNotes': electricalNotes,
				
				'plumbingProposalReq':plumbingProposalReq,
				'plumbingSubName': plumbingSubName,
				'plumbingStatus': plumbingStatus,
				'plumbingSubmitDate': plumbingSubmitDate,
				'plumbingCost': plumbingCost,
				'plumbingScope': plumbingScope,
				'plumbingNotes': plumbingNotes,
				
				'gasProposalReq': gasProposalReq,
				'gasSubName': gasSubName,
				'gasStatus': gasStatus,
				'gasSubmitDate': gasSubmitDate,
				'gasCost': gasCost,
				'gasScope': gasScope,
				'gasNotes': gasNotes,
				
				'sprinklerProposalReq':sprinklerProposalReq,
				'sprinklerSubName': sprinklerSubName,
				'sprinklerStatus': sprinklerStatus,
				'sprinklerSubmitDate': sprinklerSubmitDate,
				'sprinklerCost': sprinklerCost,
				'sprinklerScope': sprinklerScope,
				'sprinklerNotes': sprinklerNotes,
				
				'fireAlarmProposalReq':fireAlarmProposalReq, 
				'fireAlarmSubName': fireAlarmSubName,
				'fireAlarmStatus': fireAlarmStatus,
				'fireAlarmSubmitDate': fireAlarmSubmitDate,
				'fireAlarmCost': fireAlarmCost,
				'fireAlarmScope': fireAlarmScope,
				'fireAlarmNotes': fireAlarmNotes,
				
				'carpenterProposalReq': carpenterProposalReq,
				'carpenterSubName': carpenterSubName,
				'carpenterStatus': carpenterStatus,
				'carpenterSubmitDate': carpenterSubmitDate,
				'carpenterCost': carpenterCost,
				'carpenterScope': carpenterScope,
				'carpenterNotes': carpenterNotes,
				
				'equipmentProposalReq': equipmentProposalReq,
				'equipmentSubName': equipmentSubName,
				'equipmentStatus': equipmentStatus,
				'equipmentSubmitDate': equipmentSubmitDate,
				'equipmentCost': equipmentCost,
				'equipmentScope': equipmentScope,
				'equipmentNotes': equipmentNotes,
				
				'supervisionProposalReq': supervisionProposalReq,
				'supervisionSubName': supervisionSubName,
				'supervisionStatus': supervisionStatus,
				'supervisionSubmitDate': supervisionSubmitDate,
				'supervisionCost': supervisionCost,
				'supervisionScope': supervisionScope,
				'supervisionNotes': supervisionNotes,
				
				'profitProposalReq': profitProposalReq,
				'profitSubName': profitSubName,
				'profitStatus': profitStatus,
				'profitSubmitDate': profitSubmitDate,
				'profitCost': profitCost,
				'profitScope': profitScope,
				'profitNotes': profitNotes,
				
				'taxesProposalReq': taxesProposalReq,
				'taxesSubName': taxesSubName,
				'taxesStatus': taxesStatus,
				'taxesSubmitDate': taxesSubmitDate,
				'taxesCost': taxesCost,
				'taxesScope': taxesScope,
				'taxesNotes': taxesNotes,
				
				'totalProposalReq': totalProposalReq,
				'totalSubName': totalSubName,
				'totalStatus': totalStatus,
				'totalSubmitDate': totalSubmitDate,
				'totalCost': totalCost,
				'totalScope': totalScope,
				'totalNotes': totalNotes,
			},
			success:function(data)
			{
				console.log(data);

				alert('Save Complete!');
				
				goToProjectManager();
				$('#costEstimateTabLink').addClass('active');
				getProjCostEstimate(1);

			},
			error: function(data)
			{
				console.log(data);

				alert('Save Complete!');
			
				goToProjectManager();
				$('#costEstimateTabLink').addClass('active');
				getProjCostEstimate(1);
			}
		});
    }	
}


function getProjCostEstimate(stopServerCalls)
{
	console.log("get proj cost Est: ", projectID);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjCostEst',
			'id': projectID
		}, success: function (data) {
			console.log("cost est:", data);
			costEstData = data;
            if(data.length > 0)
            {	
            	fillCostEstOverview(data);
            	fillCostComparison(data);
            }
            else
            {	
            	clearCostEstOverview();
            	clearCompDropdowns();
            }
            
            if(!stopServerCalls)
				getUserData();
			
		}, error: function (data) {
			alert('Server Error2!');
		}
	});
	
}


function convertProposalReq(data)
{
   	if(data == '1')
   		return "Yes";
   	else if(data == '2')
   		return "No";
   	else if(data == '3')
    	return "TBD";
   	return "";
}

function convertSubName(data)
{
  console.log(data);	
  if(data == '2')
	  return "Expert Mechanical";
  else if(data == '4')
	  return "Heritage";
  else if(data == '5')
	  return "Harrisonburg Construction";
  else if(data == '6')
	  return "Maser Consulting";
  else if(data == '7')
	  return "MG2";
  else if(data == '8')
	  return "The Darcy Company";
  else if(data == '9')
	  return "TEI";
  else if(data == '10')
	  return "Blauch Brothers";
  else if(data == '11')
	  return "Costco";
  else if(data == '12')
	  return "Sciarretti";
  else if(data == '13')
	  return "GES";
  else if(data == '14')
	  return "BRR";
  else if(data == '15')
	  return "Crosbybrownlie";
  else if(data == '16')
	  return "Dixie";
  else if(data == '17')
	  return "FDS";
  else if(data == '18')
	  return "Miller Ref";
  else 
	  return "";
  
}

function clearCostEstOverview()
{
	console.log("clear cost est");
	$('#costEstTableO > tbody').find('td').html("");	
}

function formatCost(data)
{
  	if(data == "0")
  		return "";
  	else
  		return "$" + data;
}

function fillCostEstOverview(data)
{
	console.log("filling cost est overview", data[data.length - 1]);
	data = data[data.length - 1];
	
	$('#costEstimateOverview').find('#genConProposal').text(convertProposalReq(data.genConProposalReq));
	$('#costEstimateOverview').find('#genConSub').text(convertSubName(data.genConSubName));
	$('#costEstimateOverview').find('#genConCostO').text(formatCost(data.genConCost));
	$('#costEstimateOverview').find('#genConSubmit').text(data.genConSubmitDate);
	$('#costEstimateOverview').find('#genConScope').text(data.genConScope);
	$('#costEstimateOverview').find('#genConNotesO').text(data.genConNotes);
	
	$('#costEstimateOverview').find('#refrigProposal').text(convertProposalReq(data.refrigProposalReq));
	$('#costEstimateOverview').find('#refrigSub').text(convertSubName(data.refrigSubName));
	$('#costEstimateOverview').find('#refrigCostO').text(formatCost(data.refrigCost));
	$('#costEstimateOverview').find('#refrigSubmit').text(data.refrigSubmitDate);
	$('#costEstimateOverview').find('#refrigScope').text(data.refrigScope);
	$('#costEstimateOverview').find('#refrigNotesO').text(data.refrigNotes);
	
	$('#costEstimateOverview').find('#mechanicalProposal').text(convertProposalReq(data.mechanicalProposalReq));
	$('#costEstimateOverview').find('#mechanicalSub').text(convertSubName(data.mechanicalSubName));
	$('#costEstimateOverview').find('#mechanicalCostO').text(formatCost(data.mechanicalCost));
	$('#costEstimateOverview').find('#mechanicalSubmit').text(data.mechanicalSubmitDate);
	$('#costEstimateOverview').find('#mechanicalScope').text(data.mechanicalScope);
	$('#costEstimateOverview').find('#mechanicalNotesO').text(data.mechanicalNotes);
	
	$('#costEstimateOverview').find('#electricalProposal').text(convertProposalReq(data.electricalProposalReq));
	$('#costEstimateOverview').find('#electricalSub').text(convertSubName(data.electricalSubName));
	$('#costEstimateOverview').find('#electricalCostO').text(formatCost(data.electricalCost));
	$('#costEstimateOverview').find('#electricalSubmit').text(data.electricalSubmitDate);
	$('#costEstimateOverview').find('#electricalScope').text(data.electricalScope);
	$('#costEstimateOverview').find('#electricalNotesO').text(data.electricalNotes);
	
	$('#costEstimateOverview').find('#plumbingProposal').text(convertProposalReq(data.plumbingProposalReq));
	$('#costEstimateOverview').find('#plumbingSub').text(convertSubName(data.plumbingSubName));
	$('#costEstimateOverview').find('#plumbingCostO').text(formatCost(data.plumbingCost));
	$('#costEstimateOverview').find('#plumbingSubmit').text(data.plumbingSubmitDate);
	$('#costEstimateOverview').find('#plumbingScope').text(data.plumbingScope);
	$('#costEstimateOverview').find('#plumbingNotesO').text(data.plumbingNotes);
	
	$('#costEstimateOverview').find('#gasProposal').text(convertProposalReq(data.gasProposalReq));
	$('#costEstimateOverview').find('#gasSub').text(convertSubName(data.gasSubName));
	$('#costEstimateOverview').find('#gasCostO').text(formatCost(data.gasCost));
	$('#costEstimateOverview').find('#gasSubmit').text(data.gasSubmitDate);
	$('#costEstimateOverview').find('#gasScope').text(data.gasScope);
	$('#costEstimateOverview').find('#gasNotesO').text(data.gasNotes);

	$('#costEstimateOverview').find('#sprinklerProposal').text(convertProposalReq(data.sprinklerProposalReq));
	$('#costEstimateOverview').find('#sprinklerSub').text(convertSubName(data.sprinklerSubName));
	$('#costEstimateOverview').find('#sprinklerCostO').text(formatCost(data.sprinklerCost));
	$('#costEstimateOverview').find('#sprinklerSubmit').text(data.sprinklerSubmitDate);
	$('#costEstimateOverview').find('#sprinklerScope').text(data.sprinklerScope);
	$('#costEstimateOverview').find('#sprinklerNotesO').text(data.sprinklerNotes);
	
	$('#costEstimateOverview').find('#fireAlarmProposal').text(convertProposalReq(data.fireAlarmProposalReq));
	$('#costEstimateOverview').find('#fireAlarmSub').text(convertSubName(data.fireAlarmSubName));
	$('#costEstimateOverview').find('#fireAlarmCostO').text(formatCost(data.fireAlarmCost));
	$('#costEstimateOverview').find('#fireAlarmSubmit').text(data.fireAlarmSubmitDate);
	$('#costEstimateOverview').find('#fireAlarmScope').text(data.fireAlarmScope);
	$('#costEstimateOverview').find('#fireAlarmNotesO').text(data.fireAlarmNotes);
	
	$('#costEstimateOverview').find('#carpenterProposal').text(convertProposalReq(data.carpenterProposalReq));
	$('#costEstimateOverview').find('#carpenterSub').text(convertSubName(data.carpenterSubName));
	$('#costEstimateOverview').find('#carpenterCostO').text(formatCost(data.carpenterCost));
	$('#costEstimateOverview').find('#carpenterSubmit').text(data.carpenterSubmitDate);
	$('#costEstimateOverview').find('#carpenterScope').text(data.carpenterScope);
	$('#costEstimateOverview').find('#carpenterNotesO').text(data.carpenterNotes);
	
	$('#costEstimateOverview').find('#equipmentProposal').text(convertProposalReq(data.equipmentProposalReq));
	$('#costEstimateOverview').find('#equipmentSub').text(convertSubName(data.equipmentSubName));
	$('#costEstimateOverview').find('#equipmentCostO').text(formatCost(data.equipmentCost));
	$('#costEstimateOverview').find('#equipmentSubmit').text(data.equipmentSubmitDate);
	$('#costEstimateOverview').find('#equipmentScope').text(data.equipmentScope);
	$('#costEstimateOverview').find('#equipmentNotesO').text(data.equipmentNotes);
	
	$('#costEstimateOverview').find('#supervisionProposal').text(convertProposalReq(data.supervisionProposalReq));
	$('#costEstimateOverview').find('#supervisionSub').text(convertSubName(data.supervisionSubName));
	$('#costEstimateOverview').find('#supervisionCostO').text(formatCost(data.supervisionCost));
	$('#costEstimateOverview').find('#supervisionSubmit').text(data.supervisionSubmitDate);
	$('#costEstimateOverview').find('#supervisionScope').text(data.supervisionScope);
	$('#costEstimateOverview').find('#supervisionNotesO').text(data.supervisionNotes);
	
	$('#costEstimateOverview').find('#profitProposal').text(convertProposalReq(data.profitProposalReq));
	$('#costEstimateOverview').find('#profitSub').text(convertSubName(data.profitSubName));
	$('#costEstimateOverview').find('#profitCostO').text(formatCost(data.profitCost));
	$('#costEstimateOverview').find('#profitSubmit').text(data.profitSubmitDate);
	$('#costEstimateOverview').find('#profitScope').text(data.profitScope);
	$('#costEstimateOverview').find('#profitNotesO').text(data.profitNotes);
	
	$('#costEstimateOverview').find('#taxesProposal').text(convertProposalReq(data.taxesProposalReq));
	$('#costEstimateOverview').find('#taxesSub').text(convertSubName(data.taxesSubName));
	$('#costEstimateOverview').find('#taxesCostO').text(formatCost(data.taxesCost));
	$('#costEstimateOverview').find('#taxesSubmit').text(data.taxesSubmitDate);
	$('#costEstimateOverview').find('#taxesScope').text(data.taxesScope);
	$('#costEstimateOverview').find('#taxesNotesO').text(data.taxesNotes);
	
	$('#costEstimateOverview').find('#totalProposal').text(convertProposalReq(data.totalProposalReq));
	$('#costEstimateOverview').find('#totalSub').text(convertSubName(data.totalSubName));
	$('#costEstimateOverview').find('#totalCostO').text(formatCost(data.totalCost));
	$('#costEstimateOverview').find('#totalSubmit').text(data.totalSubmitDate);
	$('#costEstimateOverview').find('#totalScope').text(data.totalScope);
	$('#costEstimateOverview').find('#totalNotesO').text(data.totalNotes);
	
	
}

////////////////////////////////////////////////////////////////////////////
// js for cost comparison 
///////////////////////////////////////////////////////////////////////////////

function setCostCompTitle()
{
	console.log(PROJECT_DATA);
	$('#permitNotes2').val(PROJECT_DATA.permits.permitNotes);		
	$('#inspectionNotes2').val(PROJECT_DATA.permits.inspectionNotes);
	if(PROJECT_DATA.warehouse.state && (PROJECT_DATA.warehouse.state == "UNKNOWN" || PROJECT_DATA.warehouse.state == "Unknown")) 
	{
		$("#smartProjectComparison").find("#currentProj").text(PROJECT_DATA.warehouse.city.name + ", " + PROJECT_DATA.warehouse.region);
	}
	else
	{	
		$("#smartProjectComparison").find("#currentProj").text(PROJECT_DATA.warehouse.city.name + ", " + toTitleCase(PROJECT_DATA.warehouse.state.replace('_', ' ')));
	}
}

function fixCost(data)
{
  	if(data == "0")
  		return "N/A";
  	else
  		return "$" + data;
}

function fillCostComparison(data)
{
   data = data[0];
   console.log("curr proj cost est", data);
   
   $("#smartProjectComparison").find("#projGenConCost").text(fixCost(data.genConCost));
   $("#smartProjectComparison").find("#projRefrigCost").text(fixCost(data.refrigCost));
   $("#smartProjectComparison").find("#projMechanicalCost").text(fixCost(data.mechanicalCost));
   $("#smartProjectComparison").find("#projElectricalCost").text(fixCost(data.electricalCost));
   $("#smartProjectComparison").find("#projPlumbingCost").text(fixCost(data.plumbingCost));
   $("#smartProjectComparison").find("#projGasCost").text(fixCost(data.gasCost));
   $("#smartProjectComparison").find("#projSprinklerCost").text(fixCost(data.sprinklerCost));
   $("#smartProjectComparison").find("#projFireAlarmCost").text(fixCost(data.fireAlarmCost));
   $("#smartProjectComparison").find("#projTotalCost").text(fixCost(data.totalCost));
}

function getComparableCostEsts()
{
   console.log("get comp cost ests", projectID);	
   
   
   $.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getCompCostEst',
			'id': PROJECT_DATA.projectItem.id
		}, success: function (data) {
			console.log("comparable cost ests:", data);
			clearCostCompTable();
			clearDropdownItems();
			
			for(var i = 0; i < data.length; i++)
			{
				var dat = data[i];
				console.log(dat[101]);
				if(projectID != dat[100])
				{
					fillCompDropdown(dat);
				}
			}	
			
		}, error: function (data) {
			alert('Server Error3!');
			console.log(data);
		}
	});
}


function getSpecProject(id)
{
	  console.log(id);
	   $.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getSpecProject',
				'id': id[100]
			}, success: function (data) {
				console.log("project:", data);
				fillComp(id, data);
			}, error: function (data) {
				alert('Server Error4!');
			}
		});
}


function fillComp(cost, proj)
{
   proj = proj[0];	
   console.log(cost, proj);
   
	var d = document.createDocumentFragment();
	
	var op = document.createElement("option");
	if(proj.warehouse.state && (proj.warehouse.state == "UNKNOWN" || proj.warehouse.state == "Unknown")) 
	{
		op.innerHTML = proj.warehouse.city.name + ", " + proj.warehouse.region;
	}
	else
	{	
		op.innerHTML = proj.warehouse.city.name + ", " + toTitleCase(proj.warehouse.state.replace('_', ' '));
	}
	
	op.setAttribute("value", proj.id);
	op.setAttribute("class", "warehouse")
	d.appendChild(op);
	
	$('.compCostEsts').append(d);
    addSelectFunction();		
}

function clearCompDropdowns()
{
	$("#smartProjectComparison").find("#projs1").val("default");
	$("#smartProjectComparison").find("#projs2").val("default");
	$("#smartProjectComparison").find("#projs3").val("default");
	$("#smartProjectComparison").find("#projs4").val("default");
}

function clearDropdownItems()
{
   $("#smartProjectComparison").find(".warehouse").remove();	
}

function addSelectFunction()
{
	var sel1 = document.getElementById("projs1");
	sel1.onchange = function() { getSpecCostEst( this.value, "comp1") }
	
	var sel2 = document.getElementById("projs2");
	sel2.onchange = function() { getSpecCostEst( this.value, "comp2") }
	
	var sel3 = document.getElementById("projs3");
	sel3.onchange = function() { getSpecCostEst( this.value, "comp3") }

	var sel4 = document.getElementById("projs4");
	sel4.onchange = function() { getSpecCostEst( this.value, "comp4") }
}

function getSpecCostEst(id, select)
{
	console.log(id, select);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjCostEst',
			'id': id
		}, success: function (data) {
			console.log("spec cost est:", data);
			fillColumn(data, select);
		}, error: function (data) {
			alert('Server Error5!');
			console.log(data);
		}
	});
}

function fillColumn(data, col)
{ 
   data = data[0];
   console.log(col, data);
	
   $("#smartProjectComparison").find("#" + col + "GenConCost").text(fixCost(data.genConCost));
   $("#smartProjectComparison").find("#" + col + "RefrigCost").text(fixCost(data.refrigCost));
   $("#smartProjectComparison").find("#" + col + "MechanicalCost").text(fixCost(data.mechanicalCost));
   $("#smartProjectComparison").find("#" + col + "ElectricalCost").text(fixCost(data.electricalCost));
   $("#smartProjectComparison").find("#" + col + "PlumbingCost").text(fixCost(data.plumbingCost));
   $("#smartProjectComparison").find("#" + col + "GasCost").text(fixCost(data.gasCost));
   $("#smartProjectComparison").find("#" + col + "SprinklerCost").text(fixCost(data.sprinklerCost));
   $("#smartProjectComparison").find("#" + col + "FireAlarmCost").text(fixCost(data.fireAlarmCost));
   $("#smartProjectComparison").find("#" + col + "TotalCost").text(fixCost(data.totalCost));
}

function clearCostCompTable()
{
   $("#smartProjectComparison").find("#comp1GenConCost").text("");
   $("#smartProjectComparison").find("#comp1RefrigCost").text("");
   $("#smartProjectComparison").find("#comp1MechanicalCost").text("");
   $("#smartProjectComparison").find("#comp1ElectricalCost").text("");
   $("#smartProjectComparison").find("#comp1PlumbingCost").text("");
   $("#smartProjectComparison").find("#comp1GasCost").text("");
   $("#smartProjectComparison").find("#comp1SprinklerCost").text("");
   $("#smartProjectComparison").find("#comp1FireAlarmCost").text("");
   $("#smartProjectComparison").find("#comp1TotalCost").text("");
   
   $("#smartProjectComparison").find("#comp2GenConCost").text("");
   $("#smartProjectComparison").find("#comp2RefrigCost").text("");
   $("#smartProjectComparison").find("#comp2MechanicalCost").text("");
   $("#smartProjectComparison").find("#comp2ElectricalCost").text("");
   $("#smartProjectComparison").find("#comp2PlumbingCost").text("");
   $("#smartProjectComparison").find("#comp2GasCost").text("");
   $("#smartProjectComparison").find("#comp2SprinklerCost").text("");
   $("#smartProjectComparison").find("#comp2FireAlarmCost").text("");
   $("#smartProjectComparison").find("#comp2TotalCost").text("");
   
   $("#smartProjectComparison").find("#comp3GenConCost").text("");
   $("#smartProjectComparison").find("#comp3RefrigCost").text("");
   $("#smartProjectComparison").find("#comp3MechanicalCost").text("");
   $("#smartProjectComparison").find("#comp3ElectricalCost").text("");
   $("#smartProjectComparison").find("#comp3PlumbingCost").text("");
   $("#smartProjectComparison").find("#comp3GasCost").text("");
   $("#smartProjectComparison").find("#comp3SprinklerCost").text("");
   $("#smartProjectComparison").find("#comp3FireAlarmCost").text("");
   $("#smartProjectComparison").find("#comp3TotalCost").text("");
   
   $("#smartProjectComparison").find("#comp4GenConCost").text("");
   $("#smartProjectComparison").find("#comp4RefrigCost").text("");
   $("#smartProjectComparison").find("#comp4MechanicalCost").text("");
   $("#smartProjectComparison").find("#comp4ElectricalCost").text("");
   $("#smartProjectComparison").find("#comp4PlumbingCost").text("");
   $("#smartProjectComparison").find("#comp4GasCost").text("");
   $("#smartProjectComparison").find("#comp4SprinklerCost").text("");
   $("#smartProjectComparison").find("#comp4FireAlarmCost").text("");
   $("#smartProjectComparison").find("#comp4TotalCost").text("");
}

function fillCompDropdown(data)
{
	console.log("fill comp dropdown", data);
	getSpecProject(data);
}

function getSpecificMasterScope(id)
{
	console.log(id);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecMasterScope',
			'id': id
		
		}, complete: function (data) {
			console.log("MASTER scope: ", data.responseJSON);
			
			if(data.responseJSON.length > 0)
				getProjMasterScope(1, data.responseJSON);
			else
				clearCostCompScope();
			
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}


function getProjMasterScope(stopServerCalls, masterScope)
{
	console.log(masterScope);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecProjMasterScope',
			'id': projectID
		
		}, complete: function (data) {
			console.log("proj master scope: ", data.responseJSON);
			
			if(data.responseJSON.length > 0)
			{
				fillCostCompScope(masterScope, data.responseJSON);
			}
			
			if(!stopServerCalls)
				getUserData();
			
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function clearCostCompScope()
{
	$("#smartProjectComparison").find("#i1").text(checkNull(""));
	$("#smartProjectComparison").find("#i2").text(checkNull(""));
	$("#smartProjectComparison").find("#i3").text(checkNull(""));
	$("#smartProjectComparison").find("#i4").text(checkNull(""));
	$("#smartProjectComparison").find("#i5").text(checkNull(""));
	$("#smartProjectComparison").find("#i6").text(checkNull(""));
	$("#smartProjectComparison").find("#i7").text(checkNull(""));
	$("#smartProjectComparison").find("#i8").text(checkNull(""));
	$("#smartProjectComparison").find("#i9").text(checkNull(""));
	$("#smartProjectComparison").find("#i10").text(checkNull(""));
}

function checkNull(data)
{
	if(data == "")
		return "";
	else
		return "- " + data;
}

function fillCostCompScope(data, masterScope)
{
	data = data[0];
	masterScope = masterScope[0];
	console.log("fill comp scope", data, masterScope);
	
	if(data.quantity1 == "0")
		$("#smartProjectComparison").find("#i1").text(checkNull(data.item1));
	else
		$("#smartProjectComparison").find("#i1").text(checkNull(data.item1) + " (" + masterScope.quantity1 + ")");
		
	if(data.quantity2 == "0")
		$("#smartProjectComparison").find("#i2").text(checkNull(data.item2));
	else
		$("#smartProjectComparison").find("#i2").text(checkNull(data.item2) + " (" + masterScope.quantity2 + ")");
	
	if(data.quantity3 == "0")
		$("#smartProjectComparison").find("#i3").text(checkNull(data.item3));
	else
		$("#smartProjectComparison").find("#i3").text(checkNull(data.item3) + " (" + masterScope.quantity3 + ")");
	
	if(data.quantity4 == "0")
		$("#smartProjectComparison").find("#i4").text(checkNull(data.item4));
	else
		$("#smartProjectComparison").find("#i4").text(checkNull(data.item4) + " (" + masterScope.quantity4 + ")");
	
	if(data.quantity5 == "0")
		$("#smartProjectComparison").find("#i5").text(checkNull(data.item5));
	else
		$("#smartProjectComparison").find("#i5").text(checkNull(data.item5) + " (" + masterScope.quantity5 + ")");
	
	if(data.quantity6 == "0")
		$("#smartProjectComparison").find("#i6").text(checkNull(data.item6));
	else
		$("#smartProjectComparison").find("#i6").text(checkNull(data.item6) + " (" + masterScope.quantity6 + ")");
	
	if(data.quantity7 == "0")
		$("#smartProjectComparison").find("#i7").text(checkNull(data.item7));
	else
		$("#smartProjectComparison").find("#i7").text(checkNull(data.item7) + " (" + masterScope.quantity7 + ")");
	
	if(data.quantity8 == "0")
		$("#smartProjectComparison").find("#i8").text(checkNull(data.item8));
	else
		$("#smartProjectComparison").find("#i8").text(checkNull(data.item8) + " (" + masterScope.quantity8 + ")");

	if(data.quantity9 == "0")
		$("#smartProjectComparison").find("#i9").text(checkNull(data.item9));
	else
		$("#smartProjectComparison").find("#i9").text(checkNull(data.item9) + " (" + masterScope.quantity9 + ")");
	
	if(data.quantity10 == "0")
		$("#smartProjectComparison").find("#i10").text(checkNull(data.item10));
	else
		$("#smartProjectComparison").find("#i10").text(checkNull(data.item10) + " (" + masterScope.quantity10 + ")");
}

//////////////////////////////////////////////////////////////////////////////
// js for proj spec scope
//////////////////////////////////////////////////////////////////////////////

let SCOPE_ID;
let edit_PROJ_SCOPE;

function goToProjSpecScope() {
	console.log("go to proj spec scope");
	$('#projectMasterScope').removeClass("active");
	$('#projectSpecificScope').addClass("active");
	$('#projectMasterScope').hide();
	$('#projectSpecificScope').show();
}

function goToProjMasterScope() {
	console.log("go to proj master scope");
	$('#projectSpecificScope').removeClass("active");
	$('#projectMasterScope').addClass("active");
	$('#projectSpecificScope').hide();
	$('#projectMasterScope').show();
}

function goToNewProjScope(edit)
{
	console.log("go to new proj spec scope");
	$('#projectSpecificScope').removeClass("active");
	$('#newProjSpecScope').addClass("active");
	$('#projectSpecificScope').hide();
	$('#newProjSpecScope').show();
	
	console.log("EDIT = ", edit);
	if(edit == 0 && SCOPE_ID == undefined) {
		edit_PROJ_SCOPE = 'false';		
	}
	else {
		edit_PROJ_SCOPE = 'true';
	}
	console.log(edit_PROJ_SCOPE);
}

function goToProjectSpecScope()
{
	console.log("go to proj spec scope");
	$('#newProjSpecScope').removeClass("active");
	$('#projectSpecificScope').addClass("active");
	$('#newProjSpecScope').hide();
	$('#projectSpecificScope').show();
}


function saveProjSpecScope()
{
   console.log('save proj spec scope')
   
   var itemNum = $('#newProjSpecScope').find('#scopeItemNum').val();
   console.log(itemNum);
   var title = $('#newProjSpecScope').find('#scopeTitle').val();
   var description = $('#newProjSpecScope').find('#scopeDes').val();	
   var subNames = $('#newProjSpecScope').find('#scopeSubNames').val();
   var notes = $('#newProjSpecScope').find('#scopeNotes').val();
   
   var action = 'addProjSpecScope';
   if(edit_PROJ_SCOPE == 'true')
	   action = "editProjSpecScope";
	
   if(action == "editProjSpecScope" && (!projectID)) 
   {
	   console.log("Change Order ID: ", CHANGE_ORDER_ID, "Project ID: ", projectID);
	   alert("Server Error! (Edit Change Order)");
	   return;
   }
  
	$.ajax({
			type: 'POST',
			url: 'Project',
			data:
			{
				'domain': 'project',
				'projectID': projectID,
				'action': action,
				'itemNum': itemNum,
				'title': title,
				'description': description,
				'subNames': subNames,
				'notes': notes
				
			},
			success:function(data){
				alert('Saved Project Specific Scope');
				console.log(data);
				getProjSpecScopes(1);
				goToProjectSpecScope();
			},
			error: function(data)
			{
				alert('Saved Project Specific Scope');
				console.log(data);
				getProjSpecScopes(1);
				goToProjectSpecScope();
			}
		});
}

function clearProjSpecScopeTable(){
	$('#projectScopeTable > tbody').find('tr').remove();
}

function getProjSpecScopes(stopServerCalls) {
	console.log(projectID);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjSpecScopes',
			'id': projectID
		}, success: function (data) {
			console.log("scopes:", data);

			if(edit_PROJ_SCOPE == 'true') 
			{	
				fillProjSpecScopeForm(data);
			}		
			else
			{
				clearProjSpecScopeTable();
				fillProjSpecScopeTable(data);
				setProjSpecScopeTitle();
			}
			
			if(!stopServerCalls)
				getUserData();
			
		}, error: function (data) {
			alert('Server Error6!');
		}
	});
}



function toggleProjSpecScope (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editProjSpecScope').prop('disabled', false);
	$('#deleteProjSpecScope').prop('disabled', false);
	var selectedScope = $(source).attr('value');
	console.log(selectedScope);
	SCOPE_ID = selectedScope;
	editProjSpecScope(SCOPE_ID);
}

function editProjSpecScope(source) {
	console.log(source);
    getSpecProjScope(source);
}

function removeProjScope( )
{
	deleteProjScope(SCOPE_ID);
}

function deleteProjScope(source)
{
	console.log(source);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'deleteProjSpecScope',
			'id': source
		
		}, complete: function (data) {
			alert("Project Specific Scope deleted!");
			console.log("projspecscope: ", data.responseJSON);
			getProjSpecScopes(1)
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function getSpecProjScope(item)
{
	console.log("get scope", item);
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecProjScope',
			'id': item
		}, success: function (data) {
			console.log("scope:", data);

			fillProjSpecScopeForm(data);
			
		}, error: function (data) {
			alert('Server Error7!');
		}
	});
}

function fillProjSpecScopeForm(data)
{
	console.log(data[0].itemNum);
	
	$('#newProjSpecScope').find("#scopeItemNum").val(data[0].itemNum);
	$('#newProjSpecScope').find("#scopeTitle").val(data[0].title);
	$('#newProjSpecScope').find("#scopeDes").val(data[0].description);
	$('#newProjSpecScope').find("#scopeSubNames").val(data[0].subNames);
	$('#newProjSpecScope').find("#scopeNotes").val(data[0].notes);
}

function fillProjSpecScopeTable (data) {

	console.log("CALLED FILL proj spec scope" , data);
	
	
	data.sort(function(a, b){
		if(!a[7] || a[7] == null) return -1;
		if(!b[7]) return 1;
		
		if(a[7] < b[7]) return -1;
		else if(a[7] > b[7]) return 1;
		else return 0;
		
	});
	
	console.log( data);
		
	
	for (var i = 0; i < data.length; i++)
	{
		let row = data[i];
		console.log(row);
				
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", row[7]);
		tableRow.onclick = function() {toggleProjSpecScope(this)};
		tableRow.ondblclick = function () {goToNewProjScope(1)};
		
		var itemNum = document.createElement('td');
		console.log(row[7]);
		if(row[7])
			itemNum.appendChild(document.createTextNode(row[7]));
		else
			itemNum.appendChild(document.createTextNode("---"));
		
		
		var title = document.createElement('td');

		if(row[1])
			title.appendChild(document.createTextNode(row[1]));
		else 
			title.appendChild(document.createTextNode("---"));
		
		
		var description = document.createElement('td');
		description.appendChild(document.createTextNode(row[2]))
		
		
		var notes = document.createElement('td');
		if(row[4])
			notes.appendChild(document.createTextNode(row[4]));
		else
			notes.appendChild(document.createTextNode("---"));
		
		tableRow.appendChild(itemNum);
		tableRow.appendChild(title);
		tableRow.appendChild(description);
		tableRow.appendChild(notes);
		
		tableRow.ondblclick = function() {
			goToNewProjScope(1);
		};
		$('#projectManager').find("#projectScopeTable").append(tableRow);
	}
}

function setProjSpecScopeTitle()
{
	var span = document.getElementById('specificScopeProjectTitle');
	span.innerHTML = '' + PROJECT_DATA.projectItem.name + ' : Project Specific Scope';
}

////////////////////////////////////////////////////////////////////
// js for Project Master Scope 
/////////////////////////////////////////////////////////////////////

let masterScopeData;

function setMasterScopeTitle()
{
	var span = document.getElementById('masterScopeProjectTitle');
	span.innerHTML = '' + PROJECT_DATA.projectItem.name + ' : Master Scope';
}

function getSpecMasterScope(id)
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecMasterScope',
			'id': id
		
		}, complete: function (data) {
			console.log("master scope!!!: ", data.responseJSON);
			masterScopeData = data.responseJSON;
			clearProjMasterScope();
			setMasterScopeTitle();
			
			if(data.responseJSON.length > 0)
			{
				addCheckBoxes(data.responseJSON);
				fillProjMasterScope(data.responseJSON);
				addQuantityDropdowns(data.responseJSON);
			}
			else 
			{	
				removeCheckBoxes();	
				removeQuantityDropdowns();
			}
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});

}


function removeQuantityDropdowns()
{
	$("#projectMasterScope").find("#quantity1").hide();
	$("#projectMasterScope").find("#quantity2").hide();
	$("#projectMasterScope").find("#quantity3").hide();
	$("#projectMasterScope").find("#quantity4").hide();
	$("#projectMasterScope").find("#quantity5").hide();
	$("#projectMasterScope").find("#quantity6").hide();
	$("#projectMasterScope").find("#quantity7").hide();
	$("#projectMasterScope").find("#quantity8").hide();
	$("#projectMasterScope").find("#quantity9").hide();
	$("#projectMasterScope").find("#quantity10").hide();
	$("#projectMasterScope").find(".quan").hide();
}

function addQuantityDropdowns(data)
{
	data = data[0];
	console.log("fix quantity dropdowns", data);
	
	if(data.quantity1 == "1")
	{	$("#projectMasterScope").find("#quantity1").show();
	    $("#projectMasterScope").find("#quan1").show();
	}    
	else
	{	
		$("#projectMasterScope").find("#quantity1").hide();
		$("#projectMasterScope").find("#quan1").hide();
	}
	
	if(data.quantity2 == "1")
	{	
		$("#projectMasterScope").find("#quantity2").show();
		$("#projectMasterScope").find("#quan2").show();
	}
	else
	{	
		$("#projectMasterScope").find("#quantity2").hide();
		$("#projectMasterScope").find("#quan2").hide();
	}
	
	if(data.quantity3 == "1")
	{
		$("#projectMasterScope").find("#quantity3").show();
		$("#projectMasterScope").find("#quan3").show();
	}
	else
	{	
		$("#projectMasterScope").find("#quantity3").hide();
		$("#projectMasterScope").find("#quan3").hide();
	}
	
	if(data.quantity4 == "1")
	{	
		$("#projectMasterScope").find("#quantity4").show();
		$("#projectMasterScope").find("#quan4").show();
	}
	else 
	{
		$("#projectMasterScope").find("#quantity4").hide();
		$("#projectMasterScope").find("#quan4").hide();
	}
	
	if(data.quantity5 == "1")
	{	
		$("#projectMasterScope").find("#quantity5").show();
		$("#projectMasterScope").find("#quan5").show();
	}
	else
	{	
		$("#projectMasterScope").find("#quantity5").hide();
		$("#projectMasterScope").find("#quan5").hide();
	}
	
	if(data.quantity6 == "1")
	{
		$("#projectMasterScope").find("#quantity6").show();
		$("#projectMasterScope").find("#quan6").show();
	}
	else
	{	
		$("#projectMasterScope").find("#quantity6").hide();
		$("#projectMasterScope").find("#quan6").hide();
	}
	
	if(data.quantity7 == "1")
	{	
		$("#projectMasterScope").find("#quantity7").show();
		$("#projectMasterScope").find("#quan7").show();
	}
	else
	{	
		$("#projectMasterScope").find("#quantity7").hide();
		$("#projectMasterScope").find("#quan7").hide();
	}
	
	if(data.quantity8 == "1")
	{
		$("#projectMasterScope").find("#quantity8").show();
		$("#projectMasterScope").find("#quan8").show();
	}
	else
    {
		$("#projectMasterScope").find("#quantity8").hide();
		$("#projectMasterScope").find("#quan8").hide();
    }	
	
	if(data.quantity9 == "1")
	{
		$("#projectMasterScope").find("#quantity9").show();
		$("#projectMasterScope").find("#quan9").show();
	}
	else
	{
		$("#projectMasterScope").find("#quantity9").hide();
		$("#projectMasterScope").find("#quan9").hide();
	}	
	
	if(data.quantity10 == "1")
	{
		$("#projectMasterScope").find("#quantity10").show();
		$("#projectMasterScope").find("#quan10").show();
	}
	else 
	{
		$("#projectMasterScope").find("#quantity10").hide();
		$("#projectMasterScope").find("#quan10").hide();
	}	
}

function clearProjMasterScope()
{
	var item1 = document.getElementById('item1');
	item1.innerHTML = "";

	var item2 = document.getElementById('item2');
	item2.innerHTML = "";

	var item3 = document.getElementById('item3');
	item3.innerHTML = "";
	
	var item4 = document.getElementById('item4');
	item4.innerHTML = "";
	
	var item5 = document.getElementById('item5');
	item5.innerHTML = "";
	
	var item6 = document.getElementById('item6');
	item6.innerHTML = "";
	
	var item7 = document.getElementById('item7');
	item7.innerHTML = "";
	
	var item8 = document.getElementById('item8');
	item8.innerHTML = "";
	
	var item9 = document.getElementById('item9');
	item9.innerHTML = "";
	
	var item10 = document.getElementById('item10');
	item10.innerHTML = "";
}


function addCheckBoxes(data)
{
	data = data[0];
	console.log("fix check boxes", data);
	
	if(data.item1 != "")
		$("#projectMasterScope").find("#item1check").show();
	else
		$("#projectMasterScope").find("#item1check").hide();
	
	if(data.item2 != "")
		$("#projectMasterScope").find("#item2check").show();
	else
		$("#projectMasterScope").find("#item2check").hide();
	
	if(data.item3 != "")
		$("#projectMasterScope").find("#item3check").show();
	else
		$("#projectMasterScope").find("#item3check").hide();
	
	if(data.item4 != "")
		$("#projectMasterScope").find("#item4check").show();
	else 
		$("#projectMasterScope").find("#item4check").hide();
	
	if(data.item5 != "")
		$("#projectMasterScope").find("#item5check").show();
	else
		$("#projectMasterScope").find("#item5check").hide();
	
	if(data.item6 != "")
		$("#projectMasterScope").find("#item6check").show();
	else
		$("#projectMasterScope").find("#item6check").hide();
	
	if(data.item7 != "")
		$("#projectMasterScope").find("#item7check").show();
	else
		$("#projectMasterScope").find("#item7check").hide();
	
	if(data.item8 != "")
		$("#projectMasterScope").find("#item8check").show();
	else
		$("#projectMasterScope").find("#item8check").hide();
	
	if(data.item9 != "")
		$("#projectMasterScope").find("#item9check").show();
	else
		$("#projectMasterScope").find("#item9check").hide();
	
	if(data.item10 != "")
		$("#projectMasterScope").find("#item10check").show();
	else 
		$("#projectMasterScope").find("#item10check").hide();
}

function removeCheckBoxes()
{
	$("#projectMasterScope").find("#item1check").hide();
	$("#projectMasterScope").find("#item2check").hide();
	$("#projectMasterScope").find("#item3check").hide();
	$("#projectMasterScope").find("#item4check").hide();
	$("#projectMasterScope").find("#item5check").hide();
	$("#projectMasterScope").find("#item6check").hide();
	$("#projectMasterScope").find("#item7check").hide();
	$("#projectMasterScope").find("#item8check").hide();
	$("#projectMasterScope").find("#item9check").hide();
	$("#projectMasterScope").find("#item10check").hide();
}

function fillProjMasterScope(data)
{
	var item1 = document.getElementById('item1');
	item1.innerHTML = data[0].item1;

	var item2 = document.getElementById('item2');
	item2.innerHTML = data[0].item2;

	var item3 = document.getElementById('item3');
	item3.innerHTML = data[0].item3;
	
	var item4 = document.getElementById('item4');
	item4.innerHTML = data[0].item4;
	
	var item5 = document.getElementById('item5');
	item5.innerHTML = data[0].item5;
	
	var item6 = document.getElementById('item6');
	item6.innerHTML = data[0].item6;
	
	var item7 = document.getElementById('item7');
	item7.innerHTML = data[0].item7;
	
	var item8 = document.getElementById('item8');
	item8.innerHTML = data[0].item8;
	
	var item9 = document.getElementById('item9');
	item9.innerHTML = data[0].item9;
	
	var item10 = document.getElementById('item10');
	item10.innerHTML = data[0].item10;
		
}

function saveProjMasterScope()
{
   console.log("save master scope", masterScopeData);
   
    var i1 = $("#projectMasterScope").find("#item1check").prop('checked');
	var i2 = $("#projectMasterScope").find("#item2check").prop('checked');
	var i3 = $("#projectMasterScope").find("#item3check").prop('checked');
	var i4 = $("#projectMasterScope").find("#item4check").prop('checked');
	var i5 = $("#projectMasterScope").find("#item5check").prop('checked');
	var i6 = $("#projectMasterScope").find("#item6check").prop('checked');
	var i7 = $("#projectMasterScope").find("#item7check").prop('checked');
	var i8 = $("#projectMasterScope").find("#item8check").prop('checked');
	var i9 = $("#projectMasterScope").find("#item9check").prop('checked');
	var i10 = $("#projectMasterScope").find("#item10check").prop('checked');
	
	var q1 = $("#projectMasterScope").find("#quantity1").val();
	var q2 = $("#projectMasterScope").find("#quantity2").val();
	var q3 = $("#projectMasterScope").find("#quantity3").val();
	var q4 = $("#projectMasterScope").find("#quantity4").val();
	var q5 = $("#projectMasterScope").find("#quantity5").val();
	var q6 = $("#projectMasterScope").find("#quantity6").val();
	var q7 = $("#projectMasterScope").find("#quantity7").val();
	var q8 = $("#projectMasterScope").find("#quantity8").val();
	var q9 = $("#projectMasterScope").find("#quantity9").val();
	var q10 = $("#projectMasterScope").find("#quantity10").val();
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data:
		{
			'domain': 'project',
			'action': 'addProjMasterScope',
			'projectID': projectID,
			'proj': 0,
			'projItem': masterScopeData[0].projItem,
			'i1': i1,
			'i2': i2,
			'i3': i3,
			'i4': i4,
			'i5': i5,
			'i6': i6,
			'i7': i7,
			'i8': i8,
			'i9': i9,
			'i10': i10,
			'q1': q1,
			'q2': q2,
			'q3': q3,
			'q4': q4,
			'q5': q5,
			'q6': q6,
			'q7': q7,
			'q8': q8,
			'q9': q9,
			'q10': q10,
			
		},
		success:function(data){
			alert('Saved Project Master Scope');
			console.log(data);
		},
		error: function(data)
		{
			alert('Saved Project Master Scope');
			console.log(data);
		}
	});
}


function convertItems(data)
{
	if(data == "true")
		return true;
	else 
		return false;
}

function convertNA(data)
{
	if(data == "0")
		return "default"
	else
		return data;
}

function fillChecksAndDropdowns(data)
{
	data = data[0];
	console.log("fix checks and dropdowns", data.item1);
	
	$("#projectMasterScope").find("#item1check").prop('checked', convertItems(data.item1));
	$("#projectMasterScope").find("#item2check").prop('checked', convertItems(data.item2));
	$("#projectMasterScope").find("#item3check").prop('checked', convertItems(data.item3));
	$("#projectMasterScope").find("#item4check").prop('checked', convertItems(data.item4));
	$("#projectMasterScope").find("#item5check").prop('checked', convertItems(data.item5));
	$("#projectMasterScope").find("#item6check").prop('checked', convertItems(data.item6));
	$("#projectMasterScope").find("#item7check").prop('checked', convertItems(data.item7));
	$("#projectMasterScope").find("#item8check").prop('checked', convertItems(data.item8));
	$("#projectMasterScope").find("#item9check").prop('checked', convertItems(data.item9));
	$("#projectMasterScope").find("#item10check").prop('checked', convertItems(data.item10));
	
	$("#projectMasterScope").find("#quantity1").val(convertNA(data.quantity1));
	$("#projectMasterScope").find("#quantity2").val(convertNA(data.quantity2));
	$("#projectMasterScope").find("#quantity3").val(convertNA(data.quantity3));
	$("#projectMasterScope").find("#quantity4").val(convertNA(data.quantity4));
	$("#projectMasterScope").find("#quantity5").val(convertNA(data.quantity5));
	$("#projectMasterScope").find("#quantity6").val(convertNA(data.quantity6));
	$("#projectMasterScope").find("#quantity7").val(convertNA(data.quantity7));
	$("#projectMasterScope").find("#quantity8").val(convertNA(data.quantity8));
	$("#projectMasterScope").find("#quantity9").val(convertNA(data.quantity9));
	$("#projectMasterScope").find("#quantity10").val(convertNA(data.quantity10));
}

function clearChecksAndDropdowns()
{	
	$("#projectMasterScope").find("#item1check").prop('checked', false);
	$("#projectMasterScope").find("#item2check").prop('checked', false);
	$("#projectMasterScope").find("#item3check").prop('checked', false);
	$("#projectMasterScope").find("#item4check").prop('checked', false);
	$("#projectMasterScope").find("#item5check").prop('checked', false);
	$("#projectMasterScope").find("#item6check").prop('checked', false);
	$("#projectMasterScope").find("#item7check").prop('checked', false);
	$("#projectMasterScope").find("#item8check").prop('checked', false);
	$("#projectMasterScope").find("#item9check").prop('checked', false);
	$("#projectMasterScope").find("#item10check").prop('checked', false);
	
	$("#projectMasterScope").find("#quantity1").val("default");
	$("#projectMasterScope").find("#quantity2").val("default");
	$("#projectMasterScope").find("#quantity3").val("default");
	$("#projectMasterScope").find("#quantity4").val("default");
	$("#projectMasterScope").find("#quantity5").val("default");
	$("#projectMasterScope").find("#quantity6").val("default");
	$("#projectMasterScope").find("#quantity7").val("default");
	$("#projectMasterScope").find("#quantity8").val("default");
	$("#projectMasterScope").find("#quantity9").val("default");
	$("#projectMasterScope").find("#quantity10").val("default");
}

function getSpecProjMasterScope(stopServerCalls)
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecProjMasterScope',
			'id': projectID
		
		}, complete: function (data) {
			console.log("proj master scope: ", data.responseJSON);
			
			if(data.responseJSON.length > 0)
			{
				fillChecksAndDropdowns(data.responseJSON);
			}
			else
			{
				clearChecksAndDropdowns();
			}
			
			if(!stopServerCalls)
				getUserData();
			
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

////////////////////////////////////////////////////////////////////
// javascript for Scorecard tab
////////////////////////////////////////////////////////////////////
function editScorecard (source_id)
{
	document.getElementById("projectManager").style.display = 'none';
	currentDivLocation = "scorecardUpperDiv";
	setProjectHeader(PROJECT_DATA, 'scorecardUpperDiv');
	document.getElementById("scorecardData").style.display = 'inline';
	document.getElementById("scorecardUpperDiv").style.display = 'inline';
}

function returnToScorecardOverview()
{
	
	$('#findProject').hide();
	$('#scorecardUpperDiv').show();
	$('#failedRulesDiv').hide();
}

function getProject_SCORECARD(edit)
{
	if (projectID !== null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'get',
				'id': projectID
			}, success: function (data) {
				
				PROJECT_DATA = data;
				projectID = data.id;
				console.log("proj data", data);
				setProjectHeader(data, currentDivLocation);
				fillProjectDetails(data);
			
			}, error: function (data) {
				alert('Server Error8!');
			}
		});
	} 
	
}

function clearProjectDetailsTable(){
	$('#scoreInfoTable > tbody').find('tr').remove();
}


function fillProjectDetails(data)
{
	console.log("fill Proj details");
	clearProjectDetailsTable();
	
    var tr = document.createElement("tr");
    var warehouse = document.createElement("td");
    var MCSnumber = document.createElement("td");
    var item = document.createElement("td");
    var manager = document.createElement("td");
    var low = document.createElement("td");
    var high = document.createElement("td");
    var lastUpdated = document.createElement("td");
    
    warehouse.innerHTML = data.warehouse.city.name;
    MCSnumber.innerHTML = data.McsNumber;
    item.innerHTML = data.projectItem.name;
    manager.innerHTML = data.projectManagers.name;
    low.innerHTML = data.lowScore;
    high.innerHTML = data.highScore;
    lastUpdated.innerHTML = data.scoreLastUpdated;
    
    warehouse.style.textAlign = 'center'; 
    MCSnumber.style.textAlign = 'center'; 
    item.style.textAlign = 'center'; 
    manager.style.textAlign = 'center'; 
    low.style.textAlign = 'center';  
    high.style.textAlign = 'center'; 
    lastUpdated.style.textAlign = 'center'; 
    
    tr.appendChild(warehouse);
    tr.appendChild(MCSnumber);
    tr.appendChild(item);
    tr.appendChild(manager);
    tr.appendChild(low);
    tr.appendChild(high);
    tr.appendChild(lastUpdated);
   
    $('#scoreInfoTable').find('tbody').append(tr);
    
}

let RULES;
let FAILED_RULES;
let RULE_DATA;
let SCORE;

let LOW_COLOR = "rgb(255, 255, 0)";
let HIGH_COLOR = "rgb(255, 26, 26)";
let PASSED_COLOR = "rgb(0, 230, 0)";

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
				prepareScorecardUpdate(data);
				saveEvaluatedRules();
				
				
			}, error: function (data) {
				alert('Server Error9!');
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = "rules.html";
		}
	}
}

function saveEvaluatedRules()
{
	console.log("evalRules" , RULES);
	console.log(projectID, PROJECT_DATA);
	
}

function fillScorecard()
{
    var action = 'getRules';
    
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': action,
			'projectId': projectID
    
		}, complete: function (data) {
			
			SCORE = JSON.parse(data.responseText);
			console.log("getRules", SCORE);
			adjustScore(SCORE);
			 
		}
	});
	   
}

function adjustScore(data)
{
	console.log("adjustScore", PROJECT_DATA);
	 	
	console.log("add Passed", SCORE);
	prepareScorecardView(SCORE);
}

function prepareScorecardUpdate(data)
{
	var rules = data.applicableRules;
	RULES = data.applicableRules;
	console.log("PSU" , data);
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
	
		
	$('#scorecardUpperDiv').find('ul').find('li').each(function(index) {
		$(this).css("background-color" , PASSED_COLOR );
		$(this).click(function(event) {
			if($(this).css("background-color") == PASSED_COLOR)
			{
				displayScoresPassed(this.id.replace("Item", ""));
				setProjectHeader(PROJECT_DATA, "failedRulesDiv");
				setCurrentDivLocation("failedRulesDiv");
			}
			else
			{	
				displayScoresUpdate(this.id.replace("Item" , ""));
				setProjectHeader(PROJECT_DATA, "failedRulesDiv");
				setCurrentDivLocation("failedRulesDiv")
			}
		});
		
		var worst = getWorstScoreUpdate(data , rules , this.id.replace("Item" , ""));
		switch(worst)
		{
			case "LOW":
				$(this).css("background-color" , LOW_COLOR);
				break;
			case "HIGH":
				$(this).css("background-color" , HIGH_COLOR);
				break;	 
		}
		
		convertCurrentDivLocation("scorecardUpperDiv");
	});
}


function prepareScorecardView(data)
{
	var scores = data.applicableRules;
	SCORE = data.applicableRules;
	console.log("PSV" , data);
	for(var score in data)
	{
		if(score == "PROJECT" || score == "applicableRules")
			continue;
		
		for(var i = 0; i < SCORE.length; i++)
		{
			if(SCORE[i].id == data[score].RULE_ID) 
			{
				if(data[score].passed != undefined)
					SCORE[i].passed = data[score].passed;
				else if(data[score].taskResults || data[score].equipmentResult || data[score].changeOrderResults)
				{
					if(evaluateSetResults(data[score]) == true)
						SCORE[i].passed = "true";
					else
						SCORE[i].passed = "false";
				}

					
			}
		}	
	}
	
		
	$('#scorecardUpperDiv').find('ul').find('li').each(function(index) {
		$(this).css("background-color" , PASSED_COLOR );
		$(this).click(function(event) {
			if($(this).css("background-color") == PASSED_COLOR)
			{	
				displayScoresPassed(this.id.replace("Item", ""));
				setProjectHeader(PROJECT_DATA, "failedRulesDiv");
				setCurrentDivLocation("failedRulesDiv");
			}
			else
			{	
				displayScoresView(this.id.replace("Item" , ""));
				setProjectHeader(PROJECT_DATA, "failedRulesDiv");
				setCurrentDivLocation("failedRulesDiv");
			}
		});
		
		var worst = getWorstScoreView(data , scores , this.id.replace("Item" , ""));
		switch(worst)
		{
			case "LOW":
				$(this).css("background-color" , LOW_COLOR);
				break;
			case "HIGH":
				$(this).css("background-color" , HIGH_COLOR);
				break;	 
		}
	});
	
}

function fillScoreTablePassed(domain)
{
	console.log("fillPassedView" , domain);
	
	$('#failedRulesTable').find('tbody').find('tr').remove();
		
	var tr = document.createElement('tr');
	var action = document.createElement('td');
	
	action.innerHTML = "None. There are discrepancies to display.";
	
	$(tr).append(action);
	
	$(tr).css("background-color" , PASSED_COLOR);
	
	$('#failedRulesTable').find('tbody').append(tr);		
	
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

function displayScoresUpdate(domain)
{
	console.log("RULEZZ" , RULES);
	$('#scorecardUpperDiv').hide();
	$('#failedRulesDiv').show();
	$('#scorecardData').find('#failedRulesDiv').css("display", "inline");
	
	var header = domain;
	if(domain == "PermitsAndInspections")
		header = "Permits and Inspections";
	if(domain == "ChangeOrders")
		header = "Change Orders";
	if(domain == "GeneralInfo")
		header = "General Information";
	
	$('#failedRulesHeader').find('span').html(header);
	
	fillScoreTableUpdate(domain);
}

function displayScoresView(domain)
{
	console.log("Scores" , SCORE);
	$('#scorecardUpperDiv').hide();
	$('#failedRulesDiv').show();
	$('#scorecardData').find('#failedRulesDiv').css("display", "inline");
	
	var header = domain;
	if(domain == "PermitsAndInspections")
		header = "Permits and Inspections";
	if(domain == "ChangeOrders")
		header = "Change Orders";
	if(domain == "GeneralInfo")
		header = "General Information";
	
	$('#failedRulesHeader').find('span').html(header);
	
	fillScoreTableView(domain);
}

function displayScoresPassed(domain)
{
	console.log("Scores" , SCORE);
	$('#scorecardUpperDiv').hide();
	$('#failedRulesDiv').show();
	$('#scorecardData').find('#failedRulesDiv').css("display", "inline");
	
	var header = domain;
	if(domain == "PermitsAndInspections")
		header = "Permits and Inspections";
	if(domain == "ChangeOrders")
		header = "Change Orders";
	if(domain == "GeneralInfo")
		header = "General Information";
	
	$('#failedRulesHeader').find('span').html(header);
	
	fillScoreTablePassed(domain);
}

function fillScoreTableUpdate(domain)
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
		var action = document.createElement('td');
		
		action.innerHTML = RULES[i].failMessage;
		
		$(tr).append(action);
		
		if(RULES[i].severity == "HIGH")
			$(tr).css("background-color" , HIGH_COLOR);
		if(RULES[i].severity == "LOW")
			$(tr).css("background-color" , LOW_COLOR);
		
		$('#failedRulesTable').find('tbody').append(tr);		
	}
}

function fillScoreTableView(domain)
{
	console.log("SCORES" , SCORE , domain);
	if(SCORE == undefined)
		return;
	
	$('#failedRulesTable').find('tbody').find('tr').remove();
	
	for(var i = 0; i < SCORE.length; i++)
	{
		if(SCORE[i].domain != domain)
			continue;
		if(SCORE[i].passed == "true")
			continue;
		
		
		var tr = document.createElement('tr');
		var action = document.createElement('td');
		
		action.innerHTML = SCORE[i].failMessage;
		
		$(tr).append(action);
		
		if(SCORE[i].severity == "HIGH")
			$(tr).css("background-color" , HIGH_COLOR);
		if(SCORE[i].severity == "LOW")
			$(tr).css("background-color" , LOW_COLOR);
		
		$('#failedRulesTable').find('tbody').append(tr);		
	}
}


function getWorstScoreUpdate(data , rules , domain)
{
	console.log("GETTING WORST" , data, rules , domain);
	var worst;
	for(var i = 0; i < rules.length; i++)
	{

		if(rules[i].domain != domain)
			continue;
		
		if(data[rules[i].title].passed == undefined)
		{
			return getWorstSetUpdate(data , rules , domain);
		}	
		
		
		if(data[rules[i].title] && (data[rules[i].title].passed == "false" || data[rules[i].title].passed == undefined))
		{
			if(worst == undefined)
				worst = rules[i].severity;
			else if(worst == "LOW" && ( rules[i].severity == "HIGH"))
				worst = rules[i].severity;
			else if(worst == "HIGH" && rules[i].severity == "HIGH")
				return "HIGH";
		}
	}
	
	return worst;
}


function getWorstScoreView(data , scores , domain)
{
	console.log("GETTING WORST" , data, scores , domain);
	var worst;
	for(var i = 0; i < scores.length; i++)
	{

		if(scores[i].domain != domain)
			continue;
		
		if(data[scores[i].title].passed == undefined)
		{
			return getWorstSetView(data , scores , domain);
		}	
		
		
		if(data[scores[i].title] && (data[scores[i].title].passed == "false" || data[scores[i].title].passed == undefined))
		{
			if(worst == undefined)
				worst = scores[i].severity;
			else if(worst == "LOW" && (scores[i].severity == "HIGH"))
				worst = scores[i].severity;
			else if(worst == "HIGH" && scores[i].severity == "HIGH")
				return "HIGH";
		}
	}
	
	return worst;
}


function getWorstSetUpdate(data , rules , domain)
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
					else if(worst == "LOW" && (rules[i].severity == "HIGH"))
						worst = rules[i].severity;
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
					else if(worst == "LOW" && (rules[i].severity == "HIGH"))
						worst = rules[i].severity;
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
					else if(worst == "LOW" && (rules[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "HIGH" && rules[i].severity == "HIGH")
						return "HIGH";
				}
			}
		}
		
	}
	
	return worst;
	
}


function getWorstSetView(data , scores , domain)
{
	console.log("GET WORST " , data , scores , domain);
	//return "LOW";
	
	var worst;
	for(var i = 0; i < scores.length; i++)
	{
		if(scores[i].domain != domain)
			continue;
		
		if(scores[i].taskResults)
		{
			console.log("IN TASK");
			for(var task in data[scores[i].title].taskResults)
			{
				console.log("IN TASK" , task);
				if(data[scores[i].title].taskResults[task].passed == "false")
				{
					if(worst == undefined)
						worst = scores[i].severity;
					else if(worst == "LOW" && (scores[i].severity == "HIGH"))
						worst = scores[i].severity;
					else if(worst == "HIGH" && scores[i].severity == "HIGH")
						return"HIGH";
				}
			}
		}
		
		if(scores[i].changeOrderResults)
		{
			for(var changeOrder in data[scores[i].title].changeOrderResults)
			{
				if(data[scores[i].title].changeOrderResults[changeOrder].passed == "false")
				{
					if(worst == undefined)
						worst = scores[i].severity;
					else if(worst == "LOW" && (scores[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "HIGH" && scores[i].severity == "HIGH")
						return "HIGH";
				}
			}
		}
		
		if(scores[i].equipmentResults)
		{
			for(var equipment in data[scores[i].title].equipmentResults)
			{
				if(data[scores[i].title].equipmentResults[equipment].passed == "false")
				{
					if(worst == undefined)
						worst = scores[i].severity;
					else if(worst == "LOW" && (scores[i].severity == "HIGH"))
						worst = rules[i].severity;
					else if(worst == "HIGH" && scores[i].severity == "HIGH")
						return "HIGH";
				}
			}
		}
		
	}
	
	return worst;
	
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
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');

	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	$(placeHolder).append(listDetails6);
	$(placeHolder).append(listDetails7);
	
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

//$(document).ready(function() 
//{			
//	getMasterScopes();
//});	

function getMasterScopes()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getMasterScopes',
			'id': 0
		
		}, complete: function (data) {
			console.log("data", data.responseJSON);
			var dat = data.responseJSON;
			
			for(var i = 0; i < dat.length; i++)
			{
				var json = dat[i];
				console.log(json[0]);
			    getProjItem(json[0]);				
			}
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function fillNavScopeDropdowns(data)
{		
	console.log(data);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < data.length; i++)
	{
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = data[i].name;
		a.setAttribute("value", data[i].id);
		a.setAttribute("href", "masterScope.html?projItem=" + data[i].id);
		a.setAttribute("onmouseover", "style='background-color: rgb(42, 112, 224); color: white'");
		a.setAttribute("onmouseout", "style='background-color: none;'");
		li.appendChild(a);
		d.appendChild(li);
	}

	$('#dropdown').append(d);
	
}

function getProjItem(id)
{
	console.log("get proj item", id);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectItem',
			'id': id
		
		}, complete: function (data) {
			console.log("projItem: ", data.responseJSON);
			fillNavScopeDropdowns(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}


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
		RETRIEVED_PROJECTS[i].mediumScore = RETRIEVED_PROJECTS[i][9];
		if(RETRIEVED_PROJECTS[i][10]!=null)
			RETRIEVED_PROJECTS[i].scheduledStartDate = RETRIEVED_PROJECTS[i][10];
		else
			RETRIEVED_PROJECTS[i].scheduledStartDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][11]!=null)
			RETRIEVED_PROJECTS[i].scheduledTurnover = RETRIEVED_PROJECTS[i][11];
		else
			RETRIEVED_PROJECTS[i].scheduledTurnover = "Unavailable";
		
		
		
		if(RETRIEVED_PROJECTS[i][12]!=null)
			RETRIEVED_PROJECTS[i].budgetaryDueDate = RETRIEVED_PROJECTS[i][12];
		else
			RETRIEVED_PROJECTS[i].budgetaryDueDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][13]!=null)
			RETRIEVED_PROJECTS[i].budgetarySubmittedDate = RETRIEVED_PROJECTS[i][13];
		else
			RETRIEVED_PROJECTS[i].budgetarySubmittedDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][14]!=null)
			RETRIEVED_PROJECTS[i].proposalDueDate = RETRIEVED_PROJECTS[i][14];
		else
			RETRIEVED_PROJECTS[i].proposalDueDate = "Unavailable";

		if(RETRIEVED_PROJECTS[i][15]!=null)
			RETRIEVED_PROJECTS[i].proposalSubmittedDate = RETRIEVED_PROJECTS[i][15];
		else
			RETRIEVED_PROJECTS[i].proposalSubmittedDate = "Unavailable";	
		
		if(RETRIEVED_PROJECTS[i][16]!=null)
			RETRIEVED_PROJECTS[i].keyStatus = RETRIEVED_PROJECTS[i][16];
		else
			RETRIEVED_PROJECTS[i].keyStatus = "     ----------     ";		
		
		if(RETRIEVED_PROJECTS[i][17]!=null)
			RETRIEVED_PROJECTS[i].proposalScopeDate = RETRIEVED_PROJECTS[i][17];
		else
			RETRIEVED_PROJECTS[i].proposalScopeDate = "Unavailable";
		
		if(RETRIEVED_PROJECTS[i][18]!=null)
			RETRIEVED_PROJECTS[i].draftScheduleDate = RETRIEVED_PROJECTS[i][18];
		else
			RETRIEVED_PROJECTS[i].draftScheduleDate = "Unavailable";
		
		
		
		for(var q = 0; q < 9; q++){
			var num = 8 - q;
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
	refreshProjects();
	

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
	console.log("RETRIEVED PROJECTS ARE", RETRIEVED_PROJECTS);		
	for(var i = 0; i < RETRIEVED_PROJECTS.length; i++)
	{
		
		for(var q = 0; q < stagesOfInterest.length; q++)
		{
			if(stagesOfInterest[q].value == RETRIEVED_PROJECTS[i].stage.id)
			{
				DISPLAYABLE_PROJECTS.push(RETRIEVED_PROJECTS[i]);
				break;
			}
		}
	}	
	
	console.log("FINISHED UPDATING DISPLAYABLE PROJECTS");
	console.log(DISPLAYABLE_PROJECTS);
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
			PERSONS = JSON.parse(data.person);

			fillDropdowns_FIND_PROJECT(data);
			
			
			$('#paramID1').val('Warehouse');
			$('#paramVal1').empty();
			$('#paramVal1').append(warehouseOptions.cloneNode(true));
			
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
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	let listDetails8 = document.createElement('td');
	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	$(placeHolder).append(listDetails6);
	$(placeHolder).append(listDetails7);
	$(placeHolder).append(listDetails8);
	
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
				console.log(user);
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
				console.log(user);
				 if(user.permission.canAccessAdminPage == false) hideAdminContent();	 
				 if(user.firstName == "Sandy") {
					 $('.stage').each(function(i, obj) {
							if(obj.value == '2') obj.checked = true;
							else if(obj.value == '1') obj.checked = true;
							else obj.checked = false;
						});
				 }
				 

				matchUsernameToPerson(user.firstName);
								 
				var parent = document.getElementById('param2')
				var child1 = document.getElementById('paramID2');
				var child2 = document.getElementById('paramVal2');
				if(parent != null && child1 != null && child2 != null)
				{
					child1.remove(child2);
					parent.remove(child1);
				}
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
	
	if(! PERSONS)
		return '3';
	
	console.log("PEOPLE" , PERSONS , userFirstName);
	for(var i = 0; i < PERSONS.length; i++)
	{
		if(PERSONS[i].name.toLowerCase() == userFirstName.toLowerCase())
		{
			console.log(PERSONS[i].name, PERSONS[i].id);
			var param = document.getElementById("paramVal" + paramNum);
			param.value = PERSONS[i].id;
			removeParam(document.getElementById('paramID2'));
			return PERSONS[i].id;
		}
	}
	
	removeParam(document.getElementById('paramID2'));

	return '3';
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
	console.log(parameterFields[6]);
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
			if(json[i].name == "Bart" || json[i].name == "Lillian") continue;
		}
		if(field == "Project"){
			if(json[i].id == 8)
				continue;
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
	optionObject2.value = 'default';
	optionObject2.innerHTML = '---';

	$("#sortSpace").remove();
	let br = document.createElement('BR');
	br.id = "sortSpace";

	

	

	selectID.appendChild(optionObject);
	selectVal.appendChild(optionObject2);
	parameterHolder.appendChild(selectID);
	parameterHolder.appendChild(selectVal);
	parameterHolder.appendChild(removeTag);
	parameterHolder.appendChild(br);



	
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < parameterFields.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	$(selectID).append(d);
	
	var sort = document.getElementById("sortProjects");
	var param = document.getElementById("param-field");



	

	param.insertBefore(parameterHolder, sort);
	param.insertBefore(br, sort);
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


function sortProjectsBy(column)
{
  var value = column.value;
  console.log(value);
  filterProjects(value);
}

let FILT_COUNT = 0;

/**
 * This function filters through the projects based off of the given
 * search criteria and then displays the appropriate projects
 * INNER FUNCTION CALLS: updateDisplayableProjects(), clearAndAddSingleRow()
 */
function filterProjects (filter) {
	
	if(filter != undefined)
		console.log(filter);
	
	updateDisplayableProjects();

	let json = DISPLAYABLE_PROJECTS.slice(0);	
	let outputs = new Array();	
	let parameters = $('.paramHolder').children('select');
	
	
	let remaining = json.length;

	if(paramNum != 0){
	for (var i = 0; i < (paramNum * 2); i+= 2) {
		let id = $(parameters[i]).val();
		let val = $(parameters[i + 1]).val();
		if((id == undefined || id == "default") || (val == undefined || val == "default"))
		{
			break;
		}
		console.log("VAL = ", val , id);
		
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
					if(json[j] != null && json[j].McsNumber == 15257){console.log("Filter: " , id , json[j]);}
					json[j] = null;
					remaining = remaining - 1;
				}
			}
		}	
		
		if(filter == "mcsNumber")
		{
			json.sort(function(a,b){
				return parseInt(a.McsNumber) - parseInt(b.McsNumber);
			});
			
			console.log(json[0].McsNumber);
		}	
		
		$('#results > tbody').children('tr:not(.head)').remove();
		if (remaining == 0) {
			clearAndAddSingleRow('No Results Found!');
		}  
		else {
			for (var k = json.length-1; k >= 0; k--) {
				if(json[k] != null) {		
					if($('#dashboardViewValue').val() == 0){						
						fillProjectViewData(json[k]);
					}
					else if($('#dashboardViewValue').val() == 1){						
						fillProposalViewData(json[k]);
					}
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
					alert("Alert Akash that this is being reachable");					
					let projectListing = document.createElement('tr');
					let listDetails0 = document.createElement('td');
					let listDetails1 = document.createElement('td');
					let listDetails2 = document.createElement('td');
					let listDetails3 = document.createElement('td');
					let listDetails4 = document.createElement('td');
					let listDetails5 = document.createElement('td');
					let listDetails6 = document.createElement('td');
					let listDetails7 = document.createElement('td');
					let listDetails8 = document.createElement('td');
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}

					if(json[k].warehouse && json[k].warehouse.city && json[k].warehouse.city.name && json[k].warehouse.city.name.includes("APANA")) {
						listDetails0.innerHTML = json[k].warehouse.city.name + ', ' +
						json[k].warehouse.region;
					}
					else {
						listDetails0.innerHTML = json[k].warehouse.city.name + ' #' +
											json[k].warehouse.warehouseID;
					}
					listDetails1.innerHTML = json[k].McsNumber;
					listDetails2.innerHTML = json[k].projectItem.name;
					listDetails7.innerHTML = json[k].projectManagers.name;
					listDetails8.innerHTML = json[k].keyStatus;
					
					if(json[k].mediumScore == 0) listDetails3.setAttribute( 'class', 'circle_green' );
					else if(json[k].mediumScore == 1) listDetails3.setAttribute( 'class', 'circle_yellow' );
					else listDetails3.setAttribute( 'class', 'circle_red' );
					if(json[k].stage.name == "Active" || json[k].stage.name == "Closed" || json[k].stage.name == "Canceled" || json[k].stage.name == "On Hold"){
						listDetails5.innerHTML = json[k].scheduledStartDate;
						listDetails6.innerHTML = json[k].scheduledTurnover;
					}
					else if(json[k].stage.name == "Budgetary"){
						listDetails5.innerHTML = json[k].budgetaryDueDate;
						listDetails6.innerHTML = json[k].budgetarySubmittedDate;
					}
					else if(json[k].stage.name == "Proposal"){
						listDetails5.innerHTML = json[k].proposalDueDate;
						listDetails6.innerHTML = json[k].proposalSubmittedDate;
					}
					listDetails4.innerHTML = json[k].status['name'];
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					$(projectListing).append(listDetails3);	
					$(projectListing).append(listDetails4);	
					$(projectListing).append(listDetails5);
					$(projectListing).append(listDetails6);
					$(projectListing).append(listDetails7);
					$(projectListing).append(listDetails8);
					$('#results > tbody').append(projectListing);
				}
			}
		}
	}
}


function fillProjectViewData(json){
	let projectListing = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	let listDetails8 = document.createElement('td');
	
												
	projectListing.id = 'project' + json.id;
	projectListing.onclick = function() {
		navigateTo(projectListing);
	}

	if(json.warehouse && json.warehouse.city && json.warehouse.city.name && json.warehouse.city.name.includes("APANA")) {
		listDetails0.innerHTML = json.warehouse.city.name + ', ' +
		json.warehouse.region;
	}
	else {
		listDetails0.innerHTML = json.warehouse.city.name + ' #' +
							json.warehouse.warehouseID;
	}
	listDetails1.innerHTML = json.McsNumber;
	listDetails2.innerHTML = json.projectItem.name;
	listDetails7.innerHTML = json.projectManagers.name;	
	listDetails8.innerHTML = json.keyStatus;
	
	if((json.stage.name == "Canceled") || (json.stage.name == "On Hold")){
		listDetails3.setAttribute( 'class', 'circle_onholdcancel' );
	}
	else if(json.mediumScore == 0) listDetails3.setAttribute( 'class', 'circle_green' );
	else if(json.mediumScore == 1) listDetails3.setAttribute( 'class', 'circle_yellow' );
	 
	else listDetails3.setAttribute( 'class', 'circle_red' );
	if(json.stage.name == "Active" || json.stage.name == "Closed" || json.stage.name == "Canceled" || json.stage.name == "On Hold"){
		listDetails5.innerHTML = json.scheduledStartDate;
		listDetails6.innerHTML = json.scheduledTurnover;
	}
	else if(json.stage.name == "Budgetary"){
		listDetails5.innerHTML = json.budgetaryDueDate;
		listDetails6.innerHTML = json.budgetarySubmittedDate;
	}
	else if(json.stage.name == "Proposal"){
		listDetails5.innerHTML = json.proposalDueDate;
		listDetails6.innerHTML = json.proposalSubmittedDate;
	}
	
	listDetails4.innerHTML = json.status['name'];
	$(projectListing).append(listDetails0);
	$(projectListing).append(listDetails1);
	$(projectListing).append(listDetails2);
	$(projectListing).append(listDetails3);
	$(projectListing).append(listDetails4);
	$(projectListing).append(listDetails5);
	$(projectListing).append(listDetails6);
	$(projectListing).append(listDetails7);
	$(projectListing).append(listDetails8);
	
	$('#results > tbody').append(projectListing);
	
}

function fillProposalViewData(json){
	
	let projectListing = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	
												
	projectListing.id = 'project' + json.id;
	projectListing.onclick = function() {
		navigateTo(projectListing);
	}

	//if(json[k].warehouse.city.name == "APANA") 
	if(json.warehouse && json.warehouse.city && json.warehouse.city.name && json.warehouse.city.name.includes("APANA")) {
		listDetails0.innerHTML = json.warehouse.city.name + ', ' +
		json.warehouse.region;
	}
	else {
		listDetails0.innerHTML = json.warehouse.city.name + ' #' +
							json.warehouse.warehouseID;
	}
	listDetails1.innerHTML = json.McsNumber;
	listDetails2.innerHTML = json.projectItem.name;
	listDetails3.innerHTML = json.projectManagers.name;	
	listDetails4.innerHTML = json.proposalScopeDate;
	listDetails5.innerHTML = json.draftScheduleDate;
	

	 


	listDetails6.innerHTML = json.proposalDueDate;	
	listDetails7.innerHTML = json.keyStatus;
	
	$(projectListing).append(listDetails0);
	$(projectListing).append(listDetails1);
	$(projectListing).append(listDetails2);
	$(projectListing).append(listDetails3);
	$(projectListing).append(listDetails4);
	$(projectListing).append(listDetails5);
	$(projectListing).append(listDetails6);	
	$(projectListing).append(listDetails7);
	
	$('#results > tbody').append(projectListing);
}


/**
 * This function displays the proper div
 * INNER FUNCTION CALLS: none
 */
function navigateTo(source) {
	EDIT_INTENTION = true;
	console.log($(source).attr('id'));
	if(taskFinder) {
		window.location.href = TASK_CREATOR + '?id=' + 
			$(source).attr('id').replace('project', '');
	} else {
				
		document.getElementById("findProject").style.display = 'none';
		$(source).attr('id').replace('project', '');
		var proj_id = $(source).attr('id');
		proj_id = proj_id.replace('project','');
		console.log("PROJ MAN: ", proj_id, PROJECT_DATA);
		projectID = proj_id;			
		getProject_PROJECT_MANAGER(proj_id);
		$('#projectInformationTabLink').addClass('active');
		$('#projectInformation').addClass('active');
		$('#projectInformation').addClass('active');
		$('#closeout').removeClass('active');
		
		$('.autofill_NA').each(function(index){
			$(this).val('false');
		});

		
		currentDivLocation = "projectManager";
		document.getElementById("projectManager").style.display = 'inline';			
	}
}

//This enables the user to filter tasks based off status
$(document).on('change', '#taskSelector2', function () {
	clearTaskTable();
	fillTasksTable(tasks);
	console.log("Right here \n");
	console.log($('#taskSelector2').val());
});

//This enables the user to filter pending invoices based off status
$(document).on('change', '#pendingInvoiceSelector2', function () {	
	clearPendingInvoiceTable();
	fillPendInvsTable(pendInvs);
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
			console.log("proj tasks!!!!", data);
			let type = getParameterByName("from");
			
			tasks = data;
			if (data) {
				clearTaskTable();
				fillTasksTable(data);
			}
			if(!stopServerCalls) getUserData();

		}, error: function (data) {
			alert('Server Error!10');
		}
	});
}



/////////////////////////////////////////////////////////////////////////////////////////
////////     This begins the javascript that applies to the change order div     ////////
/////////////////////////////////////////////////////////////////////////////////////////

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
	if(projectID === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}

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

//temp holder
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
	$('#changeOrder').find("#submittedDate").val(changeOrderToEdit.submittedDate);
	$('#changeOrder').find("#approvedDate").val(changeOrderToEdit.approvedDate);
    formatRelativeTextAreas(changeOrderToEdit.notes , "notes", "changeOrder");
	$('#changeOrder').find("#notes").val(changeOrderToEdit.notes);
	$('#changeOrder').find('#title').val(changeOrderToEdit.title);
	$('#changeOrder').find('#invoiceNumber').val(changeOrderToEdit.invoiceNumber);
	$('#changeOrder').find('#customerCOPnum').val(changeOrderToEdit.customerCOPnum);
	
	$('#changeOrder').find('#mcsInvoiceStatus').val(changeOrderToEdit.mcsInvoiceStatus);
	$('#changeOrder').find('#subInvoiceStatus').val(changeOrderToEdit.subInvoiceStatus);
	
	$('#changeOrder').find('#subInvoiceNumber').val(changeOrderToEdit.subInvoiceNumber);
	
	$('#changeOrder').find('#peType').val(changeOrderToEdit.peType);
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
	if(num[0] == "("){
		num = num.slice(1,num.length);
	}
	while(num.indexOf(",") != -1) {
		num = num.replace(",","");
	}
	
	while(num.indexOf("$") != -1) {
		num = num.replace("$","");
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
	var neg
	if(num<0) neg = true;
	else neg = false;
	num = Math.abs(num);
	var str = num.toString();
	
	var price, cleanPrice;
	var dollars, cleanDollars;
	var dollarArray = new Array();
	var correctOrder = "";
	var cents, cleanCents;
    
	if(str.indexOf(".") != -1) 
	{
		price = str.split(".");
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
		
		cleanPrice = "$" + correctOrder + "." + cleanCents;
		if(neg){
			cleanPrice = "(-" + cleanPrice + ")";
		}
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
		
		cleanPrice = "$" + correctOrder;

		if(neg){
			cleanPrice = "(-" + cleanPrice + ")";
		}
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
	$('#changeOrder').find("#subInvoiceNumber").val("");
	
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
		if(changeorderStatus[i].name != "Review"){
			var option = document.createElement("option");
			option.innerHTML = changeorderStatus[i].name;
			option.setAttribute("value", changeorderStatus[i].id);
			d.appendChild(option);
		}		
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
 * The order given to Akash is Preparing, Review, Submitted, Approved, Rejected and Complete
 * INNER FUNCTION CALLS: NONE
 */
function sortChangeOrderStatus(json)
{
	console.log("JSONNNN == ", json);
	let tmp = json.slice(0);
		
	tmp[0] = json[0];
	tmp[1] = json[5];
	tmp[2] = json[1];
	tmp[3] = json[2];
	tmp[4] = json[3];
	tmp[5] = json[4];
   
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
	
	var mcsInvoiceStatus = $('#changeOrder').find("#mcsInvoiceStatus").val();
	var subInvoiceStatus = $('#changeOrder').find("#subInvoiceStatus").val();
	
	var invoiceNumber = $('#changeOrder').find("#invoiceNumber").val();
	var subInvoiceNumber = $('#changeOrder').find("#subInvoiceNumber").val();
	
	var customerCOPnum = $('#changeOrder').find("#customerCOPnum").val();
	
	var peType = $('#changeOrder').find("#peType").val();
	
	var dates = [proposalDate, submittedDate, approvedDate];
	
	
	
	/*FOR THE FINANCIAL INFO SECTION*/
	var laborInvoiced = Number(0);
	var laborToInvoice = Number(0);
	var laborPercentInvoiced = Number(0);
	
	var laborTotal = Number(0);
	
	//populates the laborTotal section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a laborTotal CO
		if(DATA.changeOrders[i].peType == "1" && DATA.changeOrders[i].cost != null){

			if(mcsCO == DATA.changeOrders[i].mcsCO){
				laborTotal+=Number(cost);
			}
			else{
				
			
			laborTotal += Number(DATA.changeOrders[i].cost);		
			}
			}
	}
	
	//financial stuff
	var materialInvoiced = Number(0);
	var materialToInvoice = Number(0);
	var materialPercentInvoiced = Number(0);

	var materialCosts = Number(0);
	
	//populates the materialCosts section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a materialCosts CO
		if(DATA.changeOrders[i].peType == "2" && DATA.changeOrders[i].cost != null){

			if(mcsCO == DATA.changeOrders[i].mcsCO){
				materialCosts+=Number(cost);
			}
			else{
			
			materialCosts += Number(DATA.changeOrders[i].cost);		
			}
			}
	}
	
	
	var projectInvoiced = Number(0);
	var projectToInvoice = Number(0);
	var projectPercentInvoiced = Number(0);

	var projectAmount = Number(0);
	
	//populates the projectAmount section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a projectAmount CO
		if(DATA.changeOrders[i].peType == "0" && DATA.changeOrders[i].cost != null){
			
			if(mcsCO == DATA.changeOrders[i].mcsCO){
				projectAmount+=Number(cost);
			}
			else{
				projectAmount += Number(DATA.changeOrders[i].cost);		
			
			}
			}
	}
	
	
	var aiaInvoiced = Number(0);
	var aiaToInvoice = Number(0);
	var aiaPercentInvoiced = Number(0);

	var aiaTotal = Number(0);
	
	//populates the aiaTotal section
	for(var i = 0; i < DATA.changeOrders.length; i++) {
		
		//checks if the CO is a aiaTotal CO
		if(DATA.changeOrders[i].peType == "3" && DATA.changeOrders[i].cost != null){

			if(mcsCO == DATA.changeOrders[i].mcsCO){
				aiaTotal+=Number(cost);
			}
			else{
				aiaTotal += Number(DATA.changeOrders[i].cost);		
			}
			}
	}	
	
	var totalProject = Number(0);
	var totalInvoiced = Number(0);
	var totalToInvoice = Number(0);
	var totalPercentInvoiced = Number(0);

	//calculates total cost of entire project
	var totalProject = Number(laborTotal) + Number(materialCosts) + Number(projectAmount) + Number(aiaTotal);

	//end financial stuff
	
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
				'mcsInvoiceStatus': mcsInvoiceStatus,
				'subInvoiceStatus': subInvoiceStatus,
				'peType': peType,
				'title':title,
				'invoiceNumber' : invoiceNumber,
				'subInvoiceNumber' : subInvoiceNumber,
				'customerCOPnum' : customerCOPnum ,
				
				'laborTotal': laborTotal,
				'laborInvoiced': laborInvoiced,
				'laborToInvoice': laborToInvoice,
				'laborPercentInvoiced': laborPercentInvoiced,
				
				'materialCosts': materialCosts,
				'materialInvoiced': materialInvoiced,
				'materialToInvoice': materialToInvoice,
				'materialPercentInvoiced': materialPercentInvoiced,
				
				'projectAmount': projectAmount,
				'projectInvoiced': projectInvoiced,
				'projectToInvoice': projectToInvoice,
				'projectPercentInvoiced': projectPercentInvoiced,
				
				'aiaTotal': aiaTotal,
				'aiaInvoiced': aiaInvoiced,
				'aiaToInvoice': aiaToInvoice,
				'aiaPercentInvoiced': aiaPercentInvoiced,
				
				'totalProject': totalProject,
				'totalInvoiced': totalInvoiced,
				'totalToInvoice': totalToInvoice,
				'totalPercentInvoiced': totalPercentInvoiced,
			},
			success:function(data){
				
				alert('Saved Pricing Element');
				
				//noMove makes it so the user doesn't get kicked out of General info when setting refrigeration or HVAC to "Yes"
				if(noMove == 0){
				
					
					goToProjectManager();
				}
				else{
					
					noMove = 0;
				}
				
					
				$('#changeOrder').find('#saveButton > button').prop('disabled', false);
				console.log(data);
				
				
			},
			error: function(data)
			{
				alert('Saved Saved Pricing Element');
				
				//noMove makes it so the user doesn't get kicked out of General info when setting refrigeration or HVAC to "Yes"
				if(noMove == 0){
					
					goToProjectManager();
				}
				else{
					
					noMove = 0;
				}				
				
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
	if(!confirm("Are you sure you want to permanently delete this pricing element?")) return;
	
	
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
			console.log("Response From Pricing Element Deletion", data);
			alert('Deleted Pricing Element');
			goToProjectManager();
		}
	});
	
	
}

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

	window.open("Report?" + 'id=' + projectID + "&type=Pricing Element Report");
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
		if($(this).attr('id') !== 'saveProjectLink' && $(this).attr('id') !== 'backToFailedRules' && $(this).attr('id') !== 'backToFailedRulesPermits' && $(this).attr('id') !== 'save-permits' && $(this).attr('id') !== 'backToFailedRulesCloseOut' && $(this).attr('id') !== 'save-closeout') {    //Why wasn't this if condition written before?
			$('.info-tab').removeClass('active');
			$('#' + $(this).attr('data-tab')).addClass('active');
			
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('#saveButton > button').prop('disabled', true);
		}

	});
	
 	$('#equipmentForm #estDeliveryDate').datepicker();   
 	$('#equipmentForm #deliveryDate').datepicker(); 
 	$('#equipmentForm #orderedDate').datepicker(); 
 	$('#equipmentForm #equipProposalDate').datepicker(); 

});


function getDropdownInfo_EQUIP()
{
	if(projectID_EQUIP === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
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

function getDropdownInfo_EQUIP_PROP()
{

	if(projectID_EQUIP === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
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
			fillDropdowns_EQUIP_PROP(data);
			getProject_EQUIP_PROP();
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
					PROJECT_DATA_EQUIP = data;
					fillTabs_EQUIP(PROJECT_DATA_EQUIP);
					
				}
			}
		});
	} else {
		alert('Something went wrong');
	}
}


function getProject_EQUIP_PROP()
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
					$('#equipmentFormProposals #poNumProposals').val('');
					PROJECT_DATA_EQUIP = data;
					fillTabs_EQUIP_PROP(PROJECT_DATA_EQUIP);
					
				}
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
		option.setAttribute("value", equipmentDeliveryStatus[i].id);

		d.appendChild(option);
	}
	$("#equipmentForm #deliveryStatusEquipment").append(d);
	
	
}

function fillDropdowns_EQUIP_PROP(json)
{
	$('#equipmentFormProposals').find('#supplierProposals').find('option').remove();

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
		option.setAttribute("value", equipmentVendor[i].id);
		d.appendChild(option);
	}
	$("#equipmentFormProposals #supplierProposals").append(d);
	
	$('#equipmentFormProposals').find('#deliveryStatusEquipmentProposals').find('option').remove();

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
		option.setAttribute("value", equipmentDeliveryStatus[i].id);

		d.appendChild(option);
	}
	$("#equipmentFormProposals #deliveryStatusEquipmentProposals").append(d);
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
	
	if(equipmentToEdit.eqSupplier)
		$('#equipmentForm #supplier').val(equipmentToEdit.eqSupplier.id);
	else
		$('#equipmentForm #supplier').val("default");
	
	$('#equipmentForm #estDeliveryDate').val(equipmentToEdit.estDeliveryDate);
	$('#equipmentForm #deliveryDate').val(equipmentToEdit.deliveryDate);
	$('#equipmentForm #orderedDate').val(equipmentToEdit.orderedDate);
	$('#equipmentForm #equipProposalDate').val(equipmentToEdit.equipProposalDate);
	$('#equipmentForm #notes').val(equipmentToEdit.notes);

	if(equipmentToEdit.eqStatus)
		$('#equipmentForm #deliveryStatusEquipment').val(equipmentToEdit.eqStatus.id);
	else
		$('#equipmentForm #deliveryStatusEquipment').val("default");
	$('#equipmentForm #providerName').val(equipmentToEdit.providerName);
	$('#equipmentForm #equipmentDescription').val(equipmentToEdit.description);
	$('#equipmentForm #unitPrice').val(equipmentToEdit.unitPrice);
	$('#equipmentForm #quantity').val(equipmentToEdit.quantity);
	$('#equipmentForm #totalPrice').val(equipmentToEdit.totalPrice);
}

function fillTabs_EQUIP_PROP(json)
{	
	console.log("EQUIP JSON: " , json);
	console.log("EQUIP SELECT: " , EQUIPMENT_ID_EQUIP);

	var equipmentToEdit;
	for(var i = 0; i < json.projEquipment.length; i++)
		if(json.projEquipment[i].id == EQUIPMENT_ID_EQUIP)
			equipmentToEdit = json.projEquipment[i];
	
	console.log(equipmentToEdit);
	$('#equipmentFormProposals #poNumProposals').val(equipmentToEdit.poNum);
	$('#equipmentFormProposals #equipmentNameProposals').val(equipmentToEdit.equipmentName);
	
	if(equipmentToEdit.eqSupplier)
		$('#equipmentFormProposals #supplierProposals').val(equipmentToEdit.eqSupplier.id);
	else
		$('#equipmentFormProposals #supplierProposals').val("default");
	
	$('#equipmentFormProposals #estDeliveryDateProposals').val(equipmentToEdit.estDeliveryDate);
	$('#equipmentFormProposals #deliveryDateProposals').val(equipmentToEdit.deliveryDate);
	$('#equipmentFormProposals #orderedDateProposals').val(equipmentToEdit.orderedDate);
	$('#equipmentFormProposals #equipProposalDateProposals').val(equipmentToEdit.equipProposalDate);
	$('#equipmentFormProposals #notesProposals').val(equipmentToEdit.notes);

	if(equipmentToEdit.eqStatus)
		$('#equipmentFormProposals #deliveryStatusEquipmentProposals').val(equipmentToEdit.eqStatus.id);
	else
		$('#equipmentFormProposals #deliveryStatusEquipmentProposals').val("default");
	$('#equipmentFormProposals #providerNameProposals').val(equipmentToEdit.providerName);
	$('#equipmentFormProposals #equipmentDescriptionProposals').val(equipmentToEdit.description);
	$('#equipmentFormProposals #unitPriceProposals').val(equipmentToEdit.unitPrice);
	$('#equipmentFormProposals #quantityProposals').val(equipmentToEdit.quantity);
	$('#equipmentFormProposals #totalPriceProposals').val(equipmentToEdit.totalPrice);
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
	var equipProposalDate = $('#equipmentForm #equipProposalDate').val();
	var notes = $('#equipmentForm #notes').val();
	var deliveryStatus = $('#equipmentForm #deliveryStatusEquipment').val();
	var unitPrice = $('#equipmentForm #unitPrice').val();
	var quantity = $('#equipmentForm #quantity').val();
	var totalPrice = $('#equipmentForm #totalPrice').val();
	
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
				'equipProposalDate' : equipProposalDate,
				'notes': notes,
				'deliveryStatus' : deliveryStatus,
				'unitPrice' : unitPrice ,
				'quantity': quantity,
				'totalPrice':totalPrice ,
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

function saveProject_EQUIP_PROP()
{
	var poNum = $('#equipmentFormProposals #poNumProposals').val();
	var equipmentName = $('#equipmentFormProposals #equipmentNameProposals').val();
	
	var equipmentDescription = $('#equipmentFormProposals #equipmentDescriptionProposals').val();
	var supplier = $('#equipmentFormProposals #supplierProposals').val();
	var deliveryDate = $('#equipmentFormProposals #deliveryDateProposals').val();
	var estDeliveryDate = $('#equipmentFormProposals #estDeliveryDateProposals').val();
	var orderedDate = $('#equipmentFormProposals #orderedDateProposals').val();
	var equipProposalDate = $('#equipmentFormProposals #equipProposalDateProposals').val();
	var notes = $('#equipmentFormProposals #notesProposals').val();
	var deliveryStatus = $('#equipmentFormProposals #deliveryStatusEquipmentProposals').val();
	var unitPrice = $('#equipmentFormProposals #unitPriceProposals').val();
	var quantity = $('#equipmentFormProposals #quantityProposals').val();
	var totalPrice = $('#equipmentFormProposals #totalPriceProposals').val();
	
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
				'equipProposalDate' : equipProposalDate,
				'notes': notes,
				'deliveryStatus' : deliveryStatus,
				'unitPrice' : unitPrice ,
				'quantity': quantity,
				'totalPrice':totalPrice ,
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

function clearEquipmentFormValuesProposals() {
	$('#equipmentFormProposals').find('.equipment-input').val('');
	$('#equipmentFormProposals').find('.equipment-select').val('default');
}


function deleteEquipment() {
	if(!selectedEquipment || !PROJECT_DATA) {
		alert("No equipment selected to delete!");
		return;
	}
	
	if(!confirm("Are you sure you want to permanently delete this piece of equipment?"))
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

///////////////////////////////////////////////////////////////////////
//////////////////////////Navigational ////////////////////////////////
///////////////////////////////////////////////////////////////////////

/**
 * This function makes the findProject div visible and hides all other divs
 * INNER FUNCTION CALLS: none
 * @returns
 */
function goToFindProject() {
	$('#editTask').prop('disabled', true);
	$('#editEquipment').prop('disabled', true);
	$('#editChangeOrder').prop('disabled', true);
	clearPermitsAndInspectionsOverview();
	updateFrontEnd();
	sortTable($('#sortProjectsValue').val());
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
	$('#editTask').prop('disabled', true);
	$('#editEquipment').prop('disabled', true);
	$('#editChangeOrder').prop('disabled', true);
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
		case "proposalsData":			
			getProject_PROJECT_MANAGER(projectID , 1);
			$('#proposalsData').find('.info-tab').removeClass('active');
			$('#proposalsData').find('.nav-tabs > li.active').removeClass('active');
			$('#proposalsData').find('#projectProposals').addClass('active');
			$('#proposalsData').find('#priceEstimateSummary').addClass('active');
			$('#projectManager').find('#projectProposalsTabLink').addClass('active');
			$('#projectManager').find('#projectProposals').addClass('active');
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
			$('#inspectionsTabLink').removeClass('active');
			$('#permitsTabLink').addClass('active');
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
		case "smartSystemData":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#smartSystemData').find('.info-tab').removeClass('active');
			$('#smartSystemData').find('#closeout').addClass('active');
			$('#smartSystemData').find('#scopeForm').addClass('active');
			$('#projectManager').find('#smartSystemTabLink').addClass('active');
			$('#projectManager').find('#smartSystem').addClass('active');
			break;	

		case "costEstimateData":
			getProject_PROJECT_MANAGER(projectID, 1);
			$('#costEstimateData').find('.info-tab').removeClass('active');
			$('#costEstimateData').find('.nav-tabs > li.active').removeClass('active');
			$('#costEstimateData').find('#costEstimate').addClass('active');
			$('#projectManager').find('#costEstimateTabLink').addClass('active');
			$('#projectManager').find('#costEstimate').addClass('active');
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
			
		case "equipmentDivProposals":			
			getProject_PROJECT_MANAGER(projectID, 1);			
			editProposals("equipment-item");
			break;
			
	}
	
	setCurrentDivLocation('projectManager');
}
function goToProjectManager1() {
	$('#editTask').prop('disabled', true);
	$('#editEquipment').prop('disabled', true);
	$('#editChangeOrder').prop('disabled', true);
	$(".editProject").hide();
	$("#projectManager").show();
	
	console.log("GTPM CURRENT LOCATION = ", currentDivLocation);
	switch(currentDivLocation){
		case "projectData":
			getProject_PROJECT_MANAGER1(projectID , 1);
			$('#projectData').find('.info-tab').removeClass('active');
			$('#projectData').find('.nav-tabs > li.active').removeClass('active');
			$('#projectData').find('#generalInformation').addClass('active');
			$('#projectData').find('#generalInformationTabLink').addClass('active');
			$('#projectManager').find('#projectInformationTabLink').addClass('active');
			$('#projectManager').find('#projectInformation').addClass('active');
			break;
		case "permitData":
			getProject_PROJECT_MANAGER1(projectID, 1);
			$('#permitData').find('.info-tab').removeClass('active');
			$('#permitData').find('.nav-tabs > li.active').removeClass('active');
			let activeTab = $('#projectManager').find('.nav-tabs > li.active').id;
			$('#permitData').find('#buildingPermit').addClass('active');
			$('#permitData').find('#buildingPermits').addClass('active');
			$('#projectManager').find('#permits').addClass('active');
			$('#projectManager').find('#'+activeTab).addClass('active');
			$('#inspectionsTabLink').removeClass('active');
			$('#permitsTabLink').addClass('active');
			break;
		case "closeoutData":
			getProject_PROJECT_MANAGER1(projectID, 1);
			$('#closeoutData').find('.info-tab').removeClass('active');
			$('#closeoutData').find('.nav-tabs > li.active').removeClass('active');
			$('#closeoutData').find('#closeout').addClass('active');
			$('#closeoutData').find('#closeoutDocuments').addClass('active');
			$('#projectManager').find('#closeoutTabLink').addClass('active');
			$('#projectManager').find('#closeout').addClass('active');
			break;
		case "smartSystemData":
			getProject_PROJECT_MANAGER1(projectID, 1);
			$('#smartSystemData').find('.info-tab').removeClass('active');
			$('#smartSystemData').find('#closeout').addClass('active');
			$('#smartSystemData').find('#scopeForm').addClass('active');
			$('#projectManager').find('#smartSystemTabLink').addClass('active');
			$('#projectManager').find('#smartSystem').addClass('active');
			break;	

		case "costEstimateData":
			getProject_PROJECT_MANAGER1(projectID, 1);
			$('#costEstimateData').find('.info-tab').removeClass('active');
			$('#costEstimateData').find('.nav-tabs > li.active').removeClass('active');
			$('#costEstimateData').find('#costEstimate').addClass('active');
			$('#projectManager').find('#costEstimateTabLink').addClass('active');
			$('#projectManager').find('#costEstimate').addClass('active');
			break;	
		case "changeOrder":
			getProject_PROJECT_MANAGER1(projectID, 1);
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
			getProject_PROJECT_MANAGER1(projectID, 1);
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
		case "costEstimateData":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Cost Estimate Editor <small id='projectHeader'>---</small></p>");
			break;	
		case "closeoutData":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Closeout Editor <small id='projectHeader'>---</small></p>");
			break;
		case "scorecardUpperDiv":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Scorecard <small id='projectHeader'>---</small></p>");
			break;
		case "failedRulesDiv":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Scorecard <small id='projectHeader'>---</small></p>");
			break;
		case "changeOrder":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Pricing Element <small id='projectHeader'>---</small></p>");
			break;
		case "equipmentDiv":
			$('#'+currentDivLocation).find("#pageLocation").html("<p>Equipment <small id='projectHeader'>---</small></p>");
			break;
		case "projectMasterScope":
			$('#'+currentDivLocation).find("#masterScopeProjectTitle").html("<p><small id='projectHeader'>---</small></p>")
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
		
	} else if(currentDivLocation == 'scorecardData'){
		
	}else {
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
	
	//new lines added by me
	//window.alert("Saurabh");

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
		getTheProjects();
		$('#findProject').show();
	}
}


//This is the function that sorts the table of projects based on some criteria 
function sortTable(n){
	if($('#dashboardViewValue').val() == "0"){
		var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("results");
		  switching = true;
		  
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
			if(n=="-1") break;
		    //start by saying: no switching is done:
		    switching = false;
		    rows = table.rows;
		    
		    /*Loop through all table rows (except the
		    first, which contains table headers):*/
		    for (i = 1; i < (rows.length - 1); i++) {
		      //start by saying there should be no switching:
		      shouldSwitch = false;
		      /*Get the two elements you want to compare,
		      one from current row and one from the next:*/
		      x = rows[i].getElementsByTagName("TD")[n];
		      y = rows[i + 1].getElementsByTagName("TD")[n];
		      //check if the two rows should switch place:
		      if(n == 1){
		    	  if (Number(x.innerHTML) < Number(y.innerHTML)) {
		  	        //if so, mark as a switch and break the loop:
		  	        shouldSwitch = true;
		  	        break;
		  	      }
		      }
		      else if(n == 5 || n == 6){
		    	  
		    	  x=x.innerHTML;
		    	  y=y.innerHTML;	    	  	    	 
		    	  if(x!="Unavailable"){
		    		  var t1 = x.split('/');
		    	  }
		    	  else var t1 = [9999,99,99];
		    	  
		    	  
		    	  if(y!="Unavailable"){
		    		  var t2 = y.split('/');
		    	  }
		    	  else var t2 = [9999,99,99];
		    	  
		    	  
		    	  var d1 = new Date(t1[2], t1[0]-1, t1[1]).getTime();
		    	  var d2 = new Date(t2[2], t2[0]-1, t2[1]).getTime(); 
		    	  
		    	  if ((d1) > (d2)) {
			  	        //if so, mark as a switch and break the loop:
			  	        shouldSwitch = true;
			  	        break;
		    	  		}
		      }		      		      		      		      
		      
		      else{
		    	  if ((x.innerHTML) > (y.innerHTML)) {
			  	        //if so, mark as a switch and break the loop:
			  	        shouldSwitch = true;
			  	        break;
		      }
		    
		    }
		    }
		    
		    
		    if (shouldSwitch) {
		      /*If a switch has been marked, make the switch
		      and mark that a switch has been done:*/
		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      switching = true;
		    }
		  }
	}
	
	else if($('#dashboardViewValue').val() == "1"){
		var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("results");
		  switching = true;
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
			if(n=="-1") break;
		    //start by saying: no switching is done:
		    switching = false;
		    rows = table.rows;
		    
		    /*Loop through all table rows (except the
		    first, which contains table headers):*/
		    for (i = 1; i < (rows.length - 1); i++) {
		      //start by saying there should be no switching:
		      shouldSwitch = false;
		      /*Get the two elements you want to compare,
		      one from current row and one from the next:*/
		      x = rows[i].getElementsByTagName("TD")[n];
		      y = rows[i + 1].getElementsByTagName("TD")[n];
		      //check if the two rows should switch place:
		      if(n == 1){
		    	  if (Number(x.innerHTML) < Number(y.innerHTML)) {
		  	        //if so, mark as a switch and break the loop:
		  	        shouldSwitch = true;
		  	        break;
		  	      }
		      }
		      else if(n == 4 || n == 5 || n == 6){
		    	  
		    	  x=x.innerHTML;
		    	  y=y.innerHTML;	    	  	    	 
		    	  if(x!="Unavailable"){
		    		  var t1 = x.split('/');
		    	  }
		    	  else var t1 = [9999,99,99];
		    	  
		    	  if(y!="Unavailable"){
		    		  var t2 = y.split('/');
		    	  }
		    	  else var t2 = [9999,99,99];
		    	  
		    	  var d1 = new Date(t1[2], t1[0]-1, t1[1]).getTime();
		    	  var d2 = new Date(t2[2], t2[0]-1, t2[1]).getTime(); 
		    	  
		    	  if ((d1) > (d2)) {
			  	        //if so, mark as a switch and break the loop:
			  	        shouldSwitch = true;
			  	        break;
		    	  		}
		      }
		      

		      else{
		    	  if ((x.innerHTML) > (y.innerHTML)) {
			  	        //if so, mark as a switch and break the loop:
			  	        shouldSwitch = true;
			  	        break;
		      }
		    
		    }
		    }
		    
		    
		    if (shouldSwitch) {
		      /*If a switch has been marked, make the switch
		      and mark that a switch has been done:*/
		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      switching = true;
		    }
		  }
	}

	
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//A.R.G SCORECARD//
function getScoreRules(project_id){
	$("#scoreCardDiv").show();
	$("#scoreCardTopDiv").show();
	$("#scoreCardFailedRulesDiv").hide();
	convertCurrentDivLocation ("scoreCardTopDiv");
	setProjectHeader(PROJECT_DATA, "scoreCardTopDiv");
	emptyingTables();
	if (project_id != null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getScoreRules',
				'projectId': project_id
			}, success: function (data) {
				
				console.log("DATA FROM GETSCORERULES IS " , data);
				let tableGeneral = document.getElementById('generalInfoFailedTable').getElementsByTagName('tbody')[0];
				let tableScheduling = document.getElementById('schedulingFailedTable').getElementsByTagName('tbody')[0];
				let tableEquipment = document.getElementById('equipmentFailedTable').getElementsByTagName('tbody')[0];
				let tableChangeOrders = document.getElementById('changeOrdersFailedTable').getElementsByTagName('tbody')[0];
				let tableTasks = document.getElementById('tasksFailedTable').getElementsByTagName('tbody')[0];
				let tableFinancial = document.getElementById('financialFailedTable').getElementsByTagName('tbody')[0];
				let tablePermits = document.getElementById('permitsFailedTable').getElementsByTagName('tbody')[0];
				let tableCloseOut = document.getElementById('closeOutFailedTable').getElementsByTagName('tbody')[0];
				
				let scoreGeneral,scoreScheduling,scorePermits, scoreEquipment, scoreChangeOrders, scoreTasks, scoreCloseOut, scoreFinancial ;
				
				//GREEN 
				scoreGeneral=scoreScheduling=scorePermits= scoreEquipment= scoreChangeOrders= scoreTasks= scoreCloseOut= scoreFinancial =["#59ba63", ""] ;
				
				generalIssues=schedulingIssues=permitsIssues = equipmentIssues=changeordersIssues= tasksIssues= closeoutIssues= financialIssues=0;
				for(var i =0; i<data.length; i++){
					
					if(data[i].ruleCategory == "GeneralInfo"){
						generalIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var text1 = document.createTextNode(generalIssues);
						var text2 = document.createTextNode(data[i].failMessage);
						td1.appendChild(text1);
						td2.appendChild(text2);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tableGeneral.appendChild(tr);
					      if(data[i].severity == 0){					   
					    	  td1.style.background = "#FFD800";
					    	  if(scoreGeneral[0]!="Red")
					    		  scoreGeneral = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreGeneral = ["Red", "HIGH"];
					      }					    
					      
					}					
					else if(data[i].ruleCategory == "Financial"){
						financialIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var text1 = document.createTextNode(financialIssues);
						 var text2 = document.createTextNode(data[i].failMessage);
						td1.appendChild(text1);
						td2.appendChild(text2);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tableFinancial.appendChild(tr);
						
						
						var currentRow = tr;
					    var createClickHandler = function(row) {
					        return function() {
					          var cell = row.getElementsByTagName("td")[1];
					          var id = cell.innerHTML;
					          fixingRules('financial',id);
					        };
					      };
					      currentRow.onclick = createClickHandler(currentRow);
					      
					      
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";					    	  
					    	  if(scoreFinancial[0]!="Red")
					    		  scoreFinancial = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreFinancial = ["Red", "HIGH"];
					      }
					     
					} 
					else if(data[i].ruleCategory == "Scheduling"){
						schedulingIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var text1 = document.createTextNode(schedulingIssues);
						 var text2 = document.createTextNode(data[i].failMessage);
						td1.appendChild(text1);
						td2.appendChild(text2);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tableScheduling.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scoreScheduling[0]!="Red")					    		  
					    		  scoreScheduling = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreScheduling = ["Red", "HIGH"];
					      }

					}  
					else if(data[i].ruleCategory == "Tasks"){
						tasksIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var td3 = document.createElement('td');					
						var text1 = document.createTextNode(tasksIssues);
						var text2 = document.createTextNode(data[i].failMessage.split("~")[0]);
						 var text3 = document.createTextNode(data[i].failMessage.split("~")[1]);
						td1.appendChild(text1);
						td2.appendChild(text2);
						td3.appendChild(text3);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
						tableTasks.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scoreTasks[0]!="Red")
					    		  scoreTasks = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreTasks = ["Red", "HIGH"];
					      }
					} 
					else if(data[i].ruleCategory == "ChangeOrders"){
						changeordersIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var td3 = document.createElement('td');	
						var text1 = document.createTextNode(changeordersIssues);
						var text2 = document.createTextNode(data[i].failMessage.split("~")[0]);
						var text3 = document.createTextNode(data[i].failMessage.split("~")[1]);
						td1.appendChild(text1);
						td2.appendChild(text2);
						td3.appendChild(text3);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);;
						tableChangeOrders.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scoreChangeOrders[0]!="Red")
					    		  scoreChangeOrders = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreChangeOrders = ["Red", "HIGH"];
					      }
					} 
					
					else if(data[i].ruleCategory == "Equipment"){
						equipmentIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var td3 = document.createElement('td');	
						var text1 = document.createTextNode(equipmentIssues);
						var text2 = document.createTextNode(data[i].failMessage.split("~")[0]);
						var text3 = document.createTextNode(data[i].failMessage.split("~")[1]);
						td1.appendChild(text1);
						td2.appendChild(text2);
						td3.appendChild(text3);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);;
						tableEquipment.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scoreEquipment[0]!="Red")
					    		  scoreEquipment = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreEquipment = ["Red", "HIGH"];
					      }
					} 
					else if(data[i].ruleCategory == "Permits"){
						permitsIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var text1 = document.createTextNode(permitsIssues);
						 var text2 = document.createTextNode(data[i].failMessage);
						td1.appendChild(text1);
						td2.appendChild(text2);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tablePermits.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scorePermits[0]!="Red")					    		  
					    		  scorePermits = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scorePermits = ["Red", "HIGH"];
					      }
					} 
					else if(data[i].ruleCategory == "CloseOut"){
						closeoutIssues++;
						var tr = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var text1 = document.createTextNode(closeoutIssues);
						 var text2 = document.createTextNode(data[i].failMessage);
						td1.appendChild(text1);
						td2.appendChild(text2);
						tr.appendChild(td1);
						tr.appendChild(td2);
						tableCloseOut.appendChild(tr);
					      if(data[i].severity == 0){
					    	  td1.style.background = "#FFD800";
					    	  if(scoreCloseOut[0]!="Red")					    		  
					    		  scoreCloseOut = ["#FFD800", "LOW"];
					      } 
					      else{
					    	  td1.style.background = "Red";
					    	  scoreCloseOut = ["Red", "HIGH"];
					      }

					} 
				}
				scoreBackground(scoreGeneral,scoreScheduling,scorePermits, scoreEquipment, scoreChangeOrders,scoreTasks, scoreCloseOut, scoreFinancial);
				issuesNumberSetter(generalIssues,schedulingIssues,permitsIssues, equipmentIssues, changeordersIssues, tasksIssues, closeoutIssues, financialIssues);
			}, error: function (data) {
				alert('Server Error!11');
			}
		});
	} else {
		$('#projectHeader').text('No Project Selected!');
		if (confirm('No Project Selected. Return to find project?')) {
			window.location.href = "rules.html";
		}
	}
}

function getFailedRules(table_id){  //A.R.G
	if($('#'+table_id + "> tbody > tr").length > 0){ //condition where if issues are 0, then user click will not work
		$("#scoreCardTopDiv").hide();
		$("#scoreCardFailedRulesDiv").show();
		hidingTables(table_id);
	}
}

function hidingTables(table_id){
	$("#failedRulesTable table").filter(
		    function() {		   
		        if(this.id != table_id){
		        	$(this).hide();
		        }
		        else $(this).show();
		    });
}


function emptyingTables(){
	$("#failedRulesTable table > tbody").filter(
		    function() {
		        $(this).empty();
		    });
}


function returnToScoreCardView()  //A.R.G
{
	$('#findProject').hide();
	$('#scoreCardTopDiv').show();
	$('#scoreCardFailedRulesDiv').hide();
}
function goToProjectManager2() {
	returnToScoreCardView();
	goToProjectManager();
}


/*TO-DO A.R.G
* 
* When the rule is clicked, take the user to location so that he can update the issue
* 
* */

function fixingRules(category,text){
	console.log(typeof(category));
	switch(category){
	case "general":
		$('#projectInformationTabLink').trigger('click');
		$('#general-info-item').trigger('click');
		$("#backToFailedRules").show();
		$("#backToFailedRules").html("General Rules");
		break;
		
	case "scheduling":
		$('#projectInformationTabLink').trigger('click');
		$('#scheduling-item').trigger('click');	
		$("#backToFailedRules").show();
		$("#backToFailedRules").html("Scheduling Rules");
		break;
		
	case "financial":
		if(text.includes("Please check the pending invoice (s)")){
			$('#projectInformationTabLink').trigger('click');
			$('#pendingInvoice-item').trigger('click');	
			$("#backToFailedRules").show();
			$("#backToFailedRules").html("Financial Rules");
			break;	
			
		}
		else{
			$('#projectInformationTabLink').trigger('click');
			$('#financial-item').trigger('click');	
			$("#backToFailedRules").show();
			$("#backToFailedRules").html("Financial Rules");
			break;			
		}

	
	case "tasks":
		$('#projectInformationTabLink').trigger('click');
		$('#tasks-item').trigger('click');
		$("#backToFailedRules").show();
		$("#backToFailedRules").html("Task Rules");
		break;
	
	case "changeorders":
		$('#changeOrdersTabLink').trigger('click');
		$('#choFailedRules').show();
		$("#backToFailedRules").html("ChangeOrder Rules");
		$("#choFailedRules").html("ChangeOrder Rules");
		break;
	
	case "equipment":
		$('#equipmentTabLink').trigger('click');
		$('#eqpFailedRules').show();
		$("#backToFailedRules").html("Equipment Rules");
		$("#eqpFailedRules").html("Equipment Rules");
		break;
	case "permits":
		$('#permits_1TabLink').trigger('click');
		$("#permFailedRules").show();
		$("#backToFailedRules").html("Permit Rules");
		$("#permFailedRules").html("Permit Rules");
 		break;
	case "closeout":
	$('#closeoutTabLink').trigger('click');
	$("#backToFailedRulesCloseOut").show();
	$("#backToFailedRules").html("CloseOut Rules");
	$("#backToFailedRulesCloseOut").html("CloseOut Rules");
		break;
	default:
		goToProjectManager2();
	}
	
}
	
function scoreBackground(scoreGeneral,scoreScheduling,scorePermits, scoreEquipment, scoreChangeOrders,scoreTasks, scoreCloseOut, scoreFinancial){
	document.getElementById('generalInfoScore').style.background=scoreGeneral[0];
	document.getElementById('schedulingScore').style.background=scoreScheduling[0];
	document.getElementById('permitsAndInspectionsScore').style.background=scorePermits[0];
	document.getElementById('equipmentScore').style.background=scoreEquipment[0];
	document.getElementById('changeOrdersScore').style.background=scoreChangeOrders[0];
	document.getElementById('tasksScore').style.background=scoreTasks[0];
	document.getElementById('closeoutScore').style.background=scoreCloseOut[0];
	document.getElementById('financialScore').style.background=scoreFinancial[0];

	document.getElementById('generalInfoScore').innerHTML=scoreGeneral[1];
	document.getElementById('schedulingScore').innerHTML=scoreScheduling[1];
	document.getElementById('permitsAndInspectionsScore').innerHTML=scorePermits[1];
	document.getElementById('equipmentScore').innerHTML=scoreEquipment[1];
	document.getElementById('changeOrdersScore').innerHTML=scoreChangeOrders[1];
	document.getElementById('tasksScore').innerHTML=scoreTasks[1];
	document.getElementById('closeoutScore').innerHTML=scoreCloseOut[1];
	document.getElementById('financialScore').innerHTML=scoreFinancial[1];
}
function issuesNumberSetter(generalIssues,schedulingIssues,permitsIssues, equipmentIssues, changeordersIssues, tasksIssues, closeoutIssues, financialIssues){
	document.getElementById('generalIssues').innerHTML=generalIssues;
	document.getElementById('schedulingIssues').innerHTML=schedulingIssues;
	document.getElementById('permitsIssues').innerHTML=permitsIssues;
	document.getElementById('equipmentIssues').innerHTML=equipmentIssues;
	document.getElementById('changeordersIssues').innerHTML=changeordersIssues;
	document.getElementById('tasksIssues').innerHTML=tasksIssues;
	document.getElementById('closeoutIssues').innerHTML=closeoutIssues;
	document.getElementById('financialIssues').innerHTML=financialIssues;
}

//////////////////////////////////////////////////////////////////////////////////////


function editSpecificPermitsAndInspections(permitCategory){
	if(permitCategory == 'mechanical'){
		editPermitsAndInspections();
		$('#technicalPermit').trigger('click');
	}
	else if(permitCategory == 'sprinkler'){
		editPermitsAndInspections();
		$('#safetyPermit').trigger('click');
	}
}

function savePermitInspectionNotes(){
	
	  var permitNotes2 = $('#permitNotes2').val();
	    var inspectionNotes2 = $('#inspectionNotes2').val();
	    console.log(permitNotes2);
	    console.log(inspectionNotes2);
	   
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
			data: 
			{
				'domain': 'project',
				'action': 'editPermitNotes',
				'projectID':PROJECT_DATA.id,	
				'permitsID':PERMIT_ID,
				'permitNotes2': permitNotes2,
				'inspectionNotes2': inspectionNotes2
			},
			success:function(data){
				console.log(data);

				alert('Save Complete!');

			},
 
			error: function(data)
			{
				console.log(data);
				
				alert('Save Complete!');			
			}
		});
}

function returnToFailedRules(){
	switch($('#backToFailedRules').html()){
	case "General Rules":
		goToProjectManager1();
		$('#scorecardTabLink').trigger('click');

		console.log("General issues count is ", generalIssues);
		
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('generalInfoFailedTable');

		$('#backToFailedRules').hide();
		break;

	case "Financial Rules":
		goToProjectManager1();
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('financialFailedTable');

		$('#backToFailedRules').hide();
		break;
		
	case "Scheduling Rules":
		goToProjectManager1();
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('schedulingFailedTable');

		$('#backToFailedRules').hide();
		break;
		
	case "Equipment Rules":
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('equipmentFailedTable');
				
		$('#eqpFailedRules').hide();
		break;

	case "ChangeOrder Rules":
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('changeOrdersFailedTable');

		$('#choFailedRules').hide();
		break;
		
	case "Task Rules":
		goToProjectManager1();
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('tasksFailedTable');
			
		$('#backToFailedRules').hide();
		break;
		
	case "Permit Rules":
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('permitsFailedTable');
			
				$('#backToFailedRulesPermits').hide();
		
		break;
		
	case "CloseOut Rules":
		goToProjectManager1();
		$('#scorecardTabLink').trigger('click');
	
				$("#scoreCardTopDiv").hide();
				$("#scoreCardFailedRulesDiv").show();
				hidingTables('closeOutFailedTable');
			
				$('#backToFailedRulesCloseOut').hide();
		
		break;
	}
	
}
function refreshProjects(){
	$.ajax({
		type: 'POST',
		url: 'Project',
		async:false,
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
			
		}
	});

	
}

function scrollSmoothToBottom (id) { //For Change Orders to go to the bottom
	var scrollingElement = (document.scrollingElement || document.body);
	   $(scrollingElement).animate({
	      scrollTop: document.body.scrollHeight
	   }, 500);
	}

function sendInvoiceAlert()
{
   	console.log("IN: sendInvoiceAlert()");
   	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendInvoiceAlert',
			'shouldInvoice' :document.getElementById('shouldInvoice').value
		}, complete: function (response) {
			console.log("RESPONSE FROM sendInvoiceAlert() = ", response);					
		}
	});
}

function projectTaskReport() {
	
	window.open("Report?" + 'id=' + projectID + "&type=Project Task Report "+"~"+$('#taskSelector2').val());
}


function submitTask () {
	let title = $('#taskCreationZone').find('#titleEntry').val();
	let description = $('#taskCreationZone').find('#descriptionEntry').val();
	let assignee;
	let subassignee;
	assignee = $('#taskCreationZone').find('#assigneeEntry').val();
	subassignee = $('#taskCreationZone').find('#subcontractorsDropdown').val();
	
	console.log("Assignee: ", assignee);
	let initiatedDate = $('#taskCreationZone').find('#initDate').val();
	let dueDate = $('#taskCreationZone').find('#dueDate').val();
	let severity = $('#taskCreationZone').find('#severity').val();
	let notes = $('#taskCreationZone').find('#notes').val();
	let type = "EMPLOYEE";
	let taskStatus = $('#taskCreationZone').find('#taskStatus').val();	
	if(taskStatus == "Open") taskStatus = 1;
	else if(taskStatus == "Completed") taskStatus = 2;
	else taskStatus = 3;
	
	console.log("PID", projectID);
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");
	
	if (typeof title === 'undefined' || title === '') return alert('Bad Title');
	if (typeof description === 'undefined' || description === '') return alert('Bad Description111');
	if (typeof assignee === 'undefined' || assignee === '') return alert('Bad Assignee');
	if (typeof subassignee === 'undefined' || subassignee === '') return alert('Bad Sub Assignee');
	if (typeof severity === 'undefined' || severity === '') return alert('Bad Severity');
	if (dueDate === 'undefined' || dueDate === '') return alert('Bad Due Date');
	
	let taskData = {
		'title': title,
		'action': 'createTask',
		'project': projectID,
		'description': description,
		'assignee': assignee,
		'subassignee': subassignee,
		'initiatedDate': initiatedDate,
		'dueDate': dueDate,
		'severity': severity,
		'notes': notes,
		'description': description,
		'type' : type ,
	};

	console.log("PROJECT == ", project);
	if(TASK_ACTION == "createTask"){		
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'title': title,
				'action': 'createTask',
				'project': projectID,
				'description': description,
				'assignee': assignee,
				'subassignee': subassignee,
				'initiatedDate': initiatedDate,
				'dueDate': dueDate,
				'severity': severity,
				'status' : taskStatus,
				'notes': notes,
				'type' : type,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'TASK_ADDED') {
					alert('Task Added Successfully');
					$(".editProject").hide();
					$("#projectManager").show();
					$('#taskCreationZone').hide();
					$('#taskDisplay').show();
					clearTaskTable();
					getTasks(1);
					$('#tasks-item').trigger('click');
					if(type == TASK_EMPLOYEE_ASSIGNEE) sendTaskAlert(taskData);
				}
			}
		});
	}
	
	else if(TASK_ACTION == "updateTask"){
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'title': title,
				'taskID': SELECTED_TASK_ID,
				'action': 'updateTask',
				'project': projectID,
				'description': description,
				'assignee': assignee,
				'subassignee': subassignee,
				'initiatedDate': initiatedDate,
				'dueDate': dueDate,
				'severity': severity,
				'status' : taskStatus,
				'notes': notes,
				'type' : type,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'UPDATED_TASK') {
					alert('Task Updated Successfully');
					$(".editProject").hide();
					$("#projectManager").show();
					$('#taskCreationZone').hide();
					$('#taskDisplay').show();
					clearTaskTable();
					getTasks(1);
					$('#tasks-item').trigger('click');

				}
			}
		});
	}
}

function sendTaskAlert(taskData)
{
	console.log("Task Data is ",taskData);
	console.log("IN: sendTaskAlert()");
   	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendTaskAlert',
			'projectItem': project.projectItem.name,
			'warehouseCity': project.warehouse.city.name,
			'warehouseID': project.warehouse.warehouseID,
			'warehouseState':project.warehouse.state,
			'assignee': taskData.assignee,
			'severity' : taskData.severity,
			'dueDate' : taskData.dueDate,
			'description': taskData.description,
			'type' : taskData.type,
			'subAssignee' : taskData.subassignee,
			'notes' : taskData.notes,
		}, complete: function (response) {
			console.log("RESPONSE FROM sendTaskAlert() = ", response);			
		}
	});
}

//////////////////////////////////////////////// THIS CONTAINS ALL THE PENDING INVOICE FUNCTIONS //////////////////////////////////////////////////////////
/**
 * AUTHOR : AKASH GURRAM
 * START OF PENDING INVOICES FUNCTIONS 
 */


/**
 * This function generates the Report for a project's Pending Invoices 
 */

function projectPendInvReport() {		
	window.open("Report?" + 'id=' + projectID + "&type=Project PendInv Report "+"~"+$('#pendingInvoiceSelector2').val());
}

/**
 * This function creates a new or updates an older pending invoice.
 *  
 */
function submitPendInv() {
	let invoiceNum = $('#pendingInvoiceCreationZone').find('#invoiceNumberPend').val();
	let invoiceAmt = $('#pendingInvoiceCreationZone').find('#invoiceAmtPend').val();
	let subNames = $('#pendingInvoiceCreationZone').find('#subNamesPend').val();
	let submittedDate = $('#pendingInvoiceCreationZone').find('#submittedDatePend').val();
	let description = $('#pendingInvoiceCreationZone').find('#briefDescriptionPend').val();

	let pendStatus = $('#pendingInvoiceCreationZone').find('#statusPend').val();		
	let dbCoNum = $('#pendingInvoiceCreationZone').find('#dbCoNumPend').val();
	let poNum = $('#pendingInvoiceCreationZone').find('#poNumPend').val();
	let notes = $('#pendingInvoiceCreationZone').find('#notesPend').val();
	let pendingInvoice_id = projectID;
	let pendingInvoice_city = PROJECT_DATA.warehouse.city.name;
	let pendingInvoice_item = PROJECT_DATA.projectItem.name;
	let pendingInvoice_manager = PROJECT_DATA.projectManagers.name;
	let pendingInvoice_state = state_dict[PROJECT_DATA.warehouse.state].state;	
	let pendingInvoice_stateabbr = state_dict[PROJECT_DATA.warehouse.state].abbr;
	
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");
	if (typeof invoiceNum === 'undefined' || invoiceNum === '') return alert('Invoice Number is Mandatory');
	if (typeof invoiceAmt === 'undefined' || invoiceAmt === '') return alert('Invoice Amount is Mandatory');
	if (typeof subNames === 'undefined' || subNames === '') return alert('Sub Name is Mandatory');
	if (typeof submittedDate === 'undefined' || submittedDate === '') return alert('Submitted Date is Mandatory');
	if (typeof description === 'undefined' || description === '') return alert('Description is Mandatory');
	if (typeof pendStatus === 'undefined' || pendStatus === '') return alert('Status is Mandatory');
	
	//Removes a $ prior to saving to prevent a display error
	invoiceAmt = invoiceAmt.replace('$', '');
	
	let pendInvData = {
		'action': 'createPendInv',
		'project': projectID,
		'invoiceNum': invoiceNum,
		'invoiceAmt': invoiceAmt,
		'subNames': subNames,
		'submittedDate': submittedDate,
		'description': description,
		'pendStatus': pendStatus,
		'dbCoNum': dbCoNum,
		'poNum': poNum,
		'notes': notes,
		'pendingInvoice_id' : pendingInvoice_id,
		'pendingInvoice_city' : pendingInvoice_city,
		'pendingInvoice_item' : pendingInvoice_item,
		'pendingInvoice_manager' : pendingInvoice_manager,
		'pendingInvoice_state' : pendingInvoice_state,
		'pendingInvoice_stateabbr' : pendingInvoice_stateabbr,		
	};

	console.log("PROJECT == ", project);	
	if(PENDINV_ACTION == "createPendInv"){		
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'action': 'createPendInv',
				'project': projectID,
				'invoiceNum': invoiceNum,
				'invoiceAmt': invoiceAmt,
				'subNames': subNames,
				'submittedDate': submittedDate,
				'description': description,
				'pendStatus': pendStatus,
				'dbCoNum': dbCoNum,
				'poNum': poNum,
				'notes': notes,
				'pendingInvoice_id' : pendingInvoice_id,				
				'pendingInvoice_city' : pendingInvoice_city,
				'pendingInvoice_item' : pendingInvoice_item,
				'pendingInvoice_manager' : pendingInvoice_manager,
				'pendingInvoice_state' : pendingInvoice_state,
				'pendingInvoice_stateabbr' : pendingInvoice_stateabbr,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'PENDINV_ADDED') {
					alert('Pending Invoice Added Successfully');
					//$(".editProject").hide();
					//$("#projectManager").show();
					//$('#pendingInvoiceCreationZone').hide();
					//$('#pendingInvoiceDisplay').show();
					
					//Makes the user return to the pending invoice screen rather than project manager screen
					document.getElementById('pendingInvoiceInformation').style.width = "100%";
					$('#pendingInvoiceCreationZone').hide();
					$('#pendingInvoiceDisplay').show();
					clearPendingInvoiceTable();
					getPendInvs(1);
					
					//$('#pendingInvoice-item').trigger('click');					
				}
			}
		});		
	}
	
	else if(PENDINV_ACTION == "updatePendInv"){
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				
				'action': 'updatePendInv',
				'pendInvID': SELECTED_PENDINV_ID,
				'project': projectID,
				'invoiceNum': invoiceNum,
				'invoiceAmt': invoiceAmt,
				'subNames': subNames,
				'submittedDate': submittedDate,
				'description': description,
				'pendStatus': pendStatus,
				'dbCoNum': dbCoNum,
				'poNum': poNum,
				'notes': notes,
				'pendingInvoice_id' : pendingInvoice_id,
				'pendingInvoice_city' : pendingInvoice_city,
				'pendingInvoice_item' : pendingInvoice_item,
				'pendingInvoice_manager' : pendingInvoice_manager,
				'pendingInvoice_state' : pendingInvoice_state,
				'pendingInvoice_stateabbr' : pendingInvoice_stateabbr,
																																																				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'UPDATED_PENDINV') {
					alert('Pending Invoice Updated Successfully');
					//$(".editProject").hide();
					//$("#projectManager").show();
					//$('#pendingInvoiceCreationZone').hide();
					//$('#pendingInvoiceDisplay').show();
					
					//Makes the user return to the pending invoice screen rather than project manager screen
					document.getElementById('pendingInvoiceInformation').style.width = "100%";
					$('#pendingInvoiceCreationZone').hide();
					$('#pendingInvoiceDisplay').show();
					clearPendingInvoiceTable();
					getPendInvs(1);
					//$('#pendingInvoice-item').trigger('click');
				}
			}
		});
	}	
}

/**
 * This function gets all the subcontractors from the data bases
 * Inner Function call : createDropdownPend() 
 */
function getSubcontractorsPend() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSubcontractors',
		}, complete: function (data) {			
			if (data.responseJSON) {
				createSubDropdownPend(data.responseJSON);
				//createSubDropdownInv(data.responseJSON);
			}

			else{console.log("NO RESPONSE JSON FROM getSubcontractors()");}
		}
	});
}

/**
 * This function based on the getSubcontractorsPend(), creates a dropdown for SubName in Pending Invoice
 */
function createSubDropdownPend(json) {
	let d = document.createDocumentFragment();
	
	json.sort(function(a,b){
		if(a.name < b.name) return -1;
		else if(a.name > b.name) return 1;
		return 0;
	});
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		option.innerHTML = json[i].name;
		option.setAttribute("value", json[i].name);
		option.setAttribute("id", json[i].name + "Option");
		d.appendChild(option);
	}
	$('#subNamesPend').append(d);
}

/**
 * This function fills the Pending Invoices Table based on the filer selected (Open, Complete, Open & Complete, Closed) 
 */
function fillPendInvsTable(pendInvs) {
	let selector = $('#pendingInvoiceSelector2').val();	
	clearPendingInvoiceTable();
	let count = 0;
	for (var i = 0; i < pendInvs.length; i++) {
		if((selector === 'open' && pendInvs[i].status != "Open") || 
				(selector === 'complete' && pendInvs[i].status != "Completed") ||
				(selector === 'open_complete' && pendInvs[i].status == "Closed") ||
				(selector === 'closed' && pendInvs[i].status != "Closed")) 
				continue; // do nothing
		var pendInv = pendInvs[i];
		console.log(pendInv);
		
		var pendInvListing = document.createElement('tr');
		pendInvListing.setAttribute("value", pendInv.id);
		pendInvListing.onclick = function() {
			togglePendInv(this);
		};
		
		pendInvListing.ondblclick = function(){
			editSelectedPendInv(this);
		};
		
		count++;
		
		pendInvListing.value = pendInvs[i].id;
		pendInvListing.id = "pendInv_" + pendInvs[i].id;
		
		
		let itemNum = document.createElement('td');
		let invoiceNum = document.createElement('td');
		let invoiceAmt = document.createElement('td');
		let subNames = document.createElement('td');		
		let submittedDate = document.createElement('td');
		let description = document.createElement('td');
		let status = document.createElement('td');
		let dbCoNum = document.createElement('td');
		let poNum = document.createElement('td');
		let notes = document.createElement('td');
		
		itemNum.innerHTML = i+1;
		invoiceNum.innerHTML = pendInvs[i].invoiceNumber;
		if(pendInvs[i].invoiceAmount)
			invoiceAmt.innerHTML = cleanNumericValueForDisplaying(pendInvs[i].invoiceAmount);
		else
			invoiceAmt.innerHTML = "---";		
		subNames.innerHTML = pendInvs[i].subNames;
		submittedDate.innerHTML = pendInvs[i].submittedDate;
		description.innerHTML = pendInvs[i].briefDescription;
		status.innerHTML = pendInvs[i].status;
		dbCoNum.innerHTML = pendInvs[i].dbCONum;
		poNum.innerHTML = pendInvs[i].poNum;
		notes.innerHTML = addingBreaktoHTML(pendInvs[i].notes);
				
		pendInvListing.appendChild(itemNum);
		pendInvListing.appendChild(invoiceNum);
		pendInvListing.appendChild(invoiceAmt);
		pendInvListing.appendChild(subNames);
		pendInvListing.appendChild(submittedDate);
		pendInvListing.appendChild(description);
		pendInvListing.appendChild(status);
		pendInvListing.appendChild(dbCoNum);
		pendInvListing.appendChild(poNum);
		pendInvListing.appendChild(notes);

		$('#pendingInvoiceTable > tbody').append(pendInvListing);
		
	}
	//This adds No Pending Invoices to Show to the table if there are none in that filter or category (Ex: Open, Complete)
	if (count === 0) {
		clearAndAddSingleRowPendInvs("No Pending Invoices to Show");		
	}	
	
}

/**
 * This function shows the Pending Invoice Form when Add Pending Invoice is clicked
 * It hides other divs.
 * It also sets the status of a new pending Invoice to Open 
 */
function createPendInv() {

	PENDINV_ACTION = "createPendInv";
	clearPendInvForm();	
	document.getElementById('pendingInvoiceInformation').style.width = "100%";
	$('#pendingInvoiceDisplay').hide();
	$('#pendingInvoiceCreationZone').show();
	$('#pendingInvoiceInformation').find('#pendingInvoiceCreationZone').find('#pendingInvoiceStatusSelectionRow').show();
	//adding the below line because when a new task is added, it is fetching the previous value.
	$('#pendingInvoiceInformation').find('#pendingInvoiceCreationZone').find('#pendingInvoiceStatusSelectionRow').find('#statusPend').val("Open");
	
}

/**
 * This function clears the Pending Invoice form to be empty when a add pending invoice is clicked. 
 */
function clearPendInvForm()
{
	$('#pendingInvoiceCreationZone').find('#invoiceNumberPend').val('');
	$('#pendingInvoiceCreationZone').find('#invoiceAmtPend').val('');
	$('#pendingInvoiceCreationZone').find('#subNamesPend').val('');
	$('#pendingInvoiceCreationZone').find('#submittedDatePend').val('');
	$('#pendingInvoiceCreationZone').find('#briefDescriptionPend').val('');
	$('#pendingInvoiceCreationZone').find('#statusPend').val('Open');
	$('#pendingInvoiceCreationZone').find('#dbCoNumPend').val('');
	$('#pendingInvoiceCreationZone').find('#poNumPend').val('');
	$('#pendingInvoiceCreationZone').find('#notesPend').val('');		
}

/**
 * This function displays the following messages when Back to Pending Invoices in clicked in the form 
 */
function viewPendInv() {
	
	let updateMessage = "These changes will not be saved, are you sure you want to leave the screen?";
	let createMessage = "This Pending Invoice will not be added, are you sure you want to leave this screen?";
	let displayedMessage;
	
	if(PENDINV_ACTION == "createPendInv")
		displayedMessage = createMessage;
	else 
		displayedMessage = updateMessage;
	
	if(confirm(displayedMessage))
	{
		document.getElementById('pendingInvoiceInformation').style.width = "100%";
		$('#pendingInvoiceCreationZone').hide();
		$('#pendingInvoiceDisplay').show();
	}

}

/**
 * This function enables the Edit Pending Invoice button when a Pending Invoice is single clicked in the table 
 */
function togglePendInv (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editPendingInvoice').prop('disabled', false);
	SELECTED_PENDINV_ID = $(source).attr('value');
	console.log("Pend Inv id = ", SELECTED_PENDINV_ID);
}

/**
 * This function opens the edit form of the pending invoice when double clicked. 
 */
function editSelectedPendInv()
{
	PENDINV_ACTION = "updatePendInv";
	displayPendInvWell();
	fillPendInvWell(SELECTED_PENDINV_ID);
}

/**
 * This function shows the form. 
 */
function displayPendInvWell() {
	console.log("PendInc ACTION: ", PENDINV_ACTION);
	
	$('#pendingInvoiceInformation').find('#pendingInvoiceDisplay').hide();
	$('#pendingInvoiceInformation').find('#pendingInvoiceCreationZone').show();
	$('#pendingInvoiceInformation').find('#pendingInvoiceCreationZone').find('#pendingInvoiceStatusSelectionRow').show();
	document.getElementById('pendingInvoiceInformation').style.width = "100%";
}

/**
 * This function fills the form using the old data. i.e., it is called in edit pending invoice so that older values are filled. 
 */
function fillPendInvWell(source) {
	let tmp_id = source;	
	let selected_pendInv;
	for(var i = 0; i < pendInvs.length; i++) {
		if(pendInvs[i].id == tmp_id) {
			selected_pendInv = pendInvs[i];
			
			SELECTED_PENDINV_ID = pendInvs[i].id;
		}	
	}
	
	if(!selected_pendInv) {
		console.log("IMPROPER PENDINV SELECTION");
		return;
	}	
	
	//Adds a $ to the invoice amount when it is loaded
	selected_pendInv.invoiceAmount = "$" + selected_pendInv.invoiceAmount; 
	
	$('#pendingInvoiceCreationZone').find('#invoiceNumberPend').val(selected_pendInv.invoiceNumber);
	$('#pendingInvoiceCreationZone').find('#invoiceAmtPend').val(selected_pendInv.invoiceAmount);
	$('#pendingInvoiceCreationZone').find('#subNamesPend').val(selected_pendInv.subNames);
	$('#pendingInvoiceCreationZone').find('#submittedDatePend').val(selected_pendInv.submittedDate);
	$('#pendingInvoiceCreationZone').find('#briefDescriptionPend').val(selected_pendInv.briefDescription);
	$('#pendingInvoiceCreationZone').find('#statusPend').val(selected_pendInv.status);
	$('#pendingInvoiceCreationZone').find('#dbCoNumPend').val(selected_pendInv.dbCONum);
	$('#pendingInvoiceCreationZone').find('#poNumPend').val(selected_pendInv.poNum);
	$('#pendingInvoiceCreationZone').find('#notesPend').val(selected_pendInv.notes);	
		
}

/**
 * This function adds the message No Pending Invoices to show 
 */
function clearAndAddSingleRowPendInvs(msg) {
	$('#pendingInvoiceTable > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	let listDetails9 = document.createElement('td');
	let listDetails8 = document.createElement('td');

	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	$(placeHolder).append(listDetails6);
	$(placeHolder).append(listDetails7);
	$(placeHolder).append(listDetails8);
	$(placeHolder).append(listDetails9);
	
	$('#pendingInvoiceTable > tbody').append(placeHolder);
}

function clearPendingInvoiceTable () {
	$('#pendingInvoiceDisplay').find('#pendingInvoiceTable').find('tr:not(.head)').remove();
}


/**
 * This function retrieves all of the pendingInvoices from the server
 * INNER FUNCTION CALLS: fillPendInvTable()
 */



function getPendInvs(stopServerCalls) {
	console.log(projectID);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectPendInvs',
			'id': projectID
		}, success: function (data) {
			console.log("proj pendingInvoices!!!!", data);
			let type = getParameterByName("from");

			pendInvs = data;
			if (data) {
				clearPendingInvoiceTable();
				fillPendInvsTable(data);
			}
			if(!stopServerCalls) getUserData();

		}, error: function (data) {
			alert('Server Error!10');
		}
	});
}

function addingBreaktoHTML(s){
	
	var n = s.split("\n")
	var n1 = "";
	for(var z = 0; z < n.length; z++){
		n1 = n1 + n[z] + "<br>";
	}
	return n1
}

/**
 * AUTHOR : AKASH GURRAM
 * END OF PENDING INVOICES FUNCTIONS 
 */
var state_dict = {
		"NEW_YORK" : {"state" : "New York", "abbr":"NY"},
		"ALABAMA" : {"state" : "Alabama", "abbr" : "AL" },
		"ALASKA" : {"state" : "Alaska", "abbr" : "AK" },
		"AMERICAN_SAMOA" : {"state" : "American Samoa", "abbr" : "AS" },
		"ARIZONA" : {"state" : "Arizona", "abbr" : "AZ" },
		"ARKANSAS" : {"state" : "Arkansas", "abbr" : "AR" },
		"CALIFORNIA" : {"state" : "California", "abbr" : "CA" },
		"COLORADO" : {"state" : "Colorado", "abbr" : "CO" },
		"CONNECTICUT" : {"state" : "Connecticut", "abbr" : "CT" },
		"DELAWARE" : {"state" : "Delaware", "abbr" : "DE" },
		"DISTRICT_OF_COLUMBIA" : {"state" : "WASHINGTON D.C.", "abbr" : "DC" },
		"FEDERATED_STATES_OF_MICRONESIA" : {"state" : "Federated States of Micronesia", "abbr" : "FM" },
		"FLORIDA" : {"state" : "Florida", "abbr" : "FL" },
		"GEORGIA" : {"state" : "Georgia", "abbr" : "GA" },
		"GUAM" : {"state" : "Guam", "abbr" : "GU" },
		"HAWAII" : {"state" : "Hawaii", "abbr" : "HI" },
		"IDAHO" : {"state" : "Idaho", "abbr" : "ID" },
		"ILLINOIS" : {"state" : "Illinois", "abbr" : "IL" },
		"INDIANA" : {"state" : "Indiana", "abbr" : "IN" },
		"IOWA" : {"state" : "Iowa", "abbr" : "IA" },
		"KANSAS" : {"state" : "Kansas", "abbr" : "KS" },
		"KENTUCKY" : {"state" : "Kentucky", "abbr" : "KY" },
		"LOUISIANA" : {"state" : "Louisiana", "abbr" : "LA" },
		"MAINE" : {"state" : "Maine", "abbr" : "ME" },
		"MARYLAND" : {"state" : "Maryland", "abbr" : "MD" },
		"MARSHALL_ISLANDS" : {"state" : "Marshall Islands", "abbr" : "MH" },
		"MASSACHUSETTS" : {"state" : "Massachusetts", "abbr" : "MA" },
		"MICHIGAN" : {"state" : "Michigan", "abbr" : "MI" },
		"MINNESOTA" : {"state" : "Minnesota", "abbr" : "MN" },
		"MISSISSIPPI" : {"state" : "Mississippi", "abbr" : "MS" },
		"MISSOURI" : {"state" : "Missouri", "abbr" : "MO" },
		"MONTANA" : {"state" : "Montana", "abbr" : "MT" },
		"NEBRASKA" : {"state" : "Nebraska", "abbr" : "NE" },
		"NEVADA" : {"state" : "Nevada", "abbr" : "NV" },
		"NEW_HAMPSHIRE" : {"state" : "New Hampshire", "abbr" : "NH" },
		"NEW_JERSEY" : {"state" : "New Jersey", "abbr" : "NJ" },
		"NEW_MEXICO" : {"state" : "New Mexico", "abbr" : "NM" },
		"NEW_YORK" : {"state" : "New York", "abbr" : "NY" },
		"NORTH_CAROLINA" : {"state" : "North Carolina", "abbr" : "NC" },
		"NORTH_DAKOTA" : {"state" : "North Dakota", "abbr" : "ND" },
		"NORTHERN_MARIANA_ISLANDS" : {"state" : "Northern Mariana Islands", "abbr" : "MP" },
		"OHIO" : {"state" : "Ohio", "abbr" : "OH" },
		"OKLAHOMA" : {"state" : "Oklahoma", "abbr" : "OK" },
		"OREGON" : {"state" : "Oregon", "abbr" : "OR" },
		"PALAU" : {"state" : "Palau", "abbr" : "PW" },
		"PENNSYLVANIA" : {"state" : "Pennsylvania", "abbr" : "PA" },
		"PUERTO_RICO" : {"state" : "Puerto Rico", "abbr" : "PR" },
		"RHODE_ISLAND" : {"state" : "Rhode Island", "abbr" : "RI" },
		"SOUTH_CAROLINA" : {"state" : "South Carolina", "abbr" : "SC" },
		"SOUTH_DAKOTA" : {"state" : "South Dakota", "abbr" : "SD" },
		"TENNESSEE" : {"state" : "Tennessee", "abbr" : "TN" },
		"TEXAS" : {"state" : "Texas", "abbr" : "TX" },
		"UTAH" : {"state" : "Utah", "abbr" : "UT" },
		"VERMONT" : {"state" : "Vermont", "abbr" : "VT" },
		"VIRGIN_ISLANDS" : {"state" : "Virgin Islands", "abbr" : "VI" },
		"VIRGINIA" : {"state" : "Virginia", "abbr" : "VA" },
		"WASHINGTON" : {"state" : "Washington", "abbr" : "WA" },
		"WEST_VIRGINIA" : {"state" : "West Virginia", "abbr" : "WV" },
		"WISCONSIN" : {"state" : "Wisconsin", "abbr" : "WI" },
		"WYOMING" : {"state" : "Wyoming", "abbr" : "WY" },
		"UNKNOWN" : {"state" : "Unknown", "abbr" : "" },
};

function changeStatus(){		
	//code to remove all options
	$('#status').empty();
	
	//code to add multiple options at the same time depending on the stage
	var projectStage = $('#stage').val();
	
	if(projectStage == "2"){//Active

		//if the current Permit autofill is TBD, then display message
		if($('#generalInformation').find('#autofill-Permits').val() == "0"){
				
			window.alert("Setting project to Active: Permits are still set to TBD");		
		}
		
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:12, text:'Awaiting Equipment'}));
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));
		$('#status ').append($('<option>', {value:29, text:'Scheduled'}));
		$('#status ').append($('<option>', {value:26, text:'Scheduling'}));	
	}
	else if(projectStage == "8"){//Budgetary)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:38, text:'Budgetary - Preparing'}));
		$('#status ').append($('<option>', {value:37, text:'Budgetary - Submitted'}));
	}
	else if(projectStage == "15"){//Canceled)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:34, text:'Lost'}));
	}
	else if(projectStage == "4"){//Closed)
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));
	}
	else if(projectStage == "9"){//On Hold)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:38, text:'Budgetary - Preparing'}));
		$('#status ').append($('<option>', {value:37, text:'Budgetary - Submitted'}));
		$('#status ').append($('<option>', {value:35, text:'Closeout'}));		
		$('#status ').append($('<option>', {value:1, text:'Proposal - Preparing'}));
		$('#status ').append($('<option>', {value:3, text:'Proposal - Submitted'}));
		$('#status ').append($('<option>', {value:29, text:'Scheduled'}));
		$('#status ').append($('<option>', {value:26, text:'Scheduling'}));	
	}
	else if(projectStage == "1"){//Proposal)
		$('#status ').append($('<option>', {value:4, text:'Awaiting Direction'}));
		$('#status ').append($('<option>', {value:11, text:'Awaiting Drawing'}));
		$('#status ').append($('<option>', {value:30, text:'Awaiting Permit'}));
		$('#status ').append($('<option>', {value:1, text:'Proposal - Preparing'}));
		$('#status ').append($('<option>', {value:3, text:'Proposal - Submitted'}));
	}
}

function totalEquipmentCost(){
	var unitPrice = $("#unitPrice").val();
	var quantity = $("#quantity").val();
	
	if(unitPrice && quantity){
		$("#totalPrice").val(unitPrice*quantity);
	}
	else{
		$("#totalPrice").val("");
	}
}

function totalEquipmentCostProposals(){
	var unitPrice = $("#unitPriceProposals").val();
	var quantity = $("#quantityProposals").val();
	
	if(unitPrice && quantity){
		$("#totalPriceProposals").val(unitPrice*quantity);
	}
	else{
		$("#totalPriceProposals").val("");
	}
}

// Invoicing section functions (Invoices)
// Author: Fardeen Yaqub

function clearPeInvoiceTable () {
	$('#peInvoiceDisplay').find('#peInvoiceTable').find('tr:not(.head)').remove();
}

/**
 * This function converts the peType values to a string
 * Author: Fardeen Yaqub
 */
function parsePETypeStatus (param) {
	switch (param) {
		case "0":
			return "Project";
		case "1":
			return "Labor";
		case "2":
			return "Materials";
		case "3":
			return "AIA";
		default:
			return "---";
	}
}

/**
 * This function fills the Invoices Table based on the filer selected (Open, Complete, Open & Complete, Closed) 
 * Author: Fardeen Yaqub
 */
function fillPeInvsTable(data) {
	
	clearPeInvoiceTable();
	console.log("CALLED FILL PE" , data);
	if(data) CHANGE_ORDERS = data.changeOrders;
	let changeOrders = CHANGE_ORDERS;
	
	//sorts PE's
	changeOrders.sort(function(a, b){
		if(!a.id) return -1;
		if(!b.id) return 1;
		
		if(a.id < b.id) return -1;
		else if(a.id > b.id) return 1;
		else return 0;
		
	});
	console.log("PE's = ", changeOrders);
		
	//Loops through Pricing Elements (Change orders) to pull required values
	for (var i = 0; i < changeOrders.length; i++) {
		let changeOrder = changeOrders[i];
		
		if($('#peInvoiceSelector2').val() == "preparing" && changeOrders[i].status != "1") continue;
		else if($('#peInvoiceSelector2').val() == "submitted" && changeOrders[i].status != "2") continue;
		else if($('#peInvoiceSelector2').val() == "approved" && changeOrders[i].status != "3") continue;
		else if($('#peInvoiceSelector2').val() == "rejected" && changeOrders[i].status != "4") continue;
		else if($('#peInvoiceSelector2').val() == "complete" && changeOrders[i].status != "5") continue;
		else if($('#peInvoiceSelector2').val() == "review" && changeOrders[i].status != "6") continue;
		
		var tableRow = document.createElement('tr');
		tableRow.setAttribute("value", changeOrder.id);
		
		var btn = document.createElement('button');
		
		btn.setAttribute('class', 'btn');
		btn.style.color="white";
		btn.style.background="#172A56";

		btn.innerHTML = 'Add Invoice';
		btn.onclick = function() {
			
			SELECTED_PE_ID = changeOrder;
			clearInvForm1();
			createInv1();
			//Adding this line here so that the background color of the row changes when Add Invoic is clicked.
			//Would've been much better if the button was created in a different way
			
			$(this).parent().css('background-color', "#CCCCCC");
			
		};

		//CO Number
		var coNumber = document.createElement('td');
		coNumber.className = 'coNumber';
		coNumber.width = "5%";
		coNumber.appendChild(document.createTextNode(changeOrder.mcsCO));
		
		//Title
		var title = document.createElement('td');
		title.width = "20%";
		if(changeOrder.title) title.appendChild(document.createTextNode(changeOrder.title));
		else  title.appendChild(document.createTextNode("---"));

		//PE Type
		var peType = document.createElement('td');
		peType.width = "10%";
		peType.appendChild(document.createTextNode(parsePETypeStatus(changeOrder.peType)));
		
		//Customer
		var customer = document.createElement('td');
		customer.width = "15%";
		customer.appendChild(document.createTextNode(convertChangeOrderType(changeOrder.type)));
		
		//Status
		var status = document.createElement('td');
		status.width = "9%";
		status.appendChild(document.createTextNode(parseChangeOrderStatus(changeOrder.status)));

		//Sell
		var sell = document.createElement('td');
		sell.width = "10%";
		if(changeOrder.sell)
			sell.appendChild(document.createTextNode(cleanNumericValueForDisplaying(changeOrder.sell)));
		else 
			sell.appendChild(document.createTextNode("---"));
		
		//Amount Invoiced
		var amountInvoiced = document.createElement('td');
		var invoiced = Number(0);
		amountInvoiced.width = "10%";
		
		//sums up invoices for the PE
		for(var j=0; j < invs.length; j++){
			
			if(changeOrder.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected" && invs[j].invoiceStatus != "Requested"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		amountInvoiced.appendChild(document.createTextNode(cleanNumericValueForDisplaying(invoiced)));

		//Amount To Invoice
		var amountToInvoice = document.createElement('td');
		amountToInvoice.width = "10%";
		
		if(changeOrder.sell){
			amountToInvoice.appendChild(document.createTextNode(cleanNumericValueForDisplaying(changeOrder.sell - invoiced)));		
		}
		else{
			amountToInvoice.appendChild(document.createTextNode("---"));
		}
		
		
		var invoicesPending = document.createElement('td');
		var pendingInvoices = Number(0);
		invoicesPending.width = "10%";
		invoicesPending.style.color = "red";
		
		//sums up invoices for the PE
		for(var j=0; j < invs.length; j++){
			
			if(changeOrder.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus == "Requested"){
				
				pendingInvoices = pendingInvoices + Number(invs[j].invoiceAmount);
			}
		}
		
		invoicesPending.appendChild(document.createTextNode(cleanNumericValueForDisplaying(pendingInvoices.toFixed(2))));
		
			
		tableRow.appendChild(coNumber);
		
		tableRow.appendChild(title);

		tableRow.appendChild(peType);
		
		tableRow.appendChild(customer);
		
		tableRow.appendChild(status);
		
		tableRow.appendChild(sell);
		
		
		//if the PE is not MCS (non-billable) or MCS(no-cost)
		if(changeOrder.type != 8 && changeOrder.type != 7 && parseChangeOrderStatus(changeOrder.status) != "Rejected"){
	
			tableRow.appendChild(amountInvoiced);
			tableRow.appendChild(amountToInvoice);
			tableRow.appendChild(invoicesPending);
			tableRow.appendChild(btn);
			
		}
				
		tableRow.ondblclick = function() {
			
			$('#invoiceInformation').find('#invoiceTitle').val(changeOrder.title);
			//if the PE is MCS not (non-billable) or MCS(no-cost)
			if(changeOrder.type != 8 && changeOrder.type != 7 && parseChangeOrderStatus(changeOrder.status) != "Rejected"){
				goToInvoices(changeOrder);
			}
		};
		
		//adds all PE rows to frontend
		$('#peInvoiceInformation').find("#peInvoiceTable").append(tableRow);
	}
	
}

let SELECTED_PE_ID;

//takes user to invoices
function goToInvoices(source)
{
	
	hideExtraInvoiceValues();
	
	//sets the selected PE to a global var
	SELECTED_PE_ID = source;
	displayInvDisplay();
	
}

function hideExtraInvoiceValues(){
	
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceStatusSelectionRow').show();

	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide1').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide2').hide();
	//$('#invoiceInformation').find('#invoiceCreationZone').find('#hide3').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide4').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide5').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide6').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide7').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide8').hide();
	$('#invoiceInformation').find('#invoiceCreationZone').find('#hide9').hide();
	//$('#invoiceInformation').find('#invoiceCreationZone').find('#hide10').hide();
	//$('#invoiceInformation').find('#invoiceCreationZone').find('#hide13').hide();
}

//displays invoices
function displayInvDisplay() {
		
	$('#peInvoiceInformation').hide();
	$('#invoiceInformation').show();
	$('#invoiceInformation').find('#invoiceCreationZone').hide();
	$('#financialSection').hide();
	
	document.getElementById('invoiceInformation').style.width = "100%";
	getInvs(1);
}

//returns user to Account's Receivable
function goToAccRec(){
	
	$('#peInvoiceInformation').show();
	$('#invoiceInformation').hide();
	$('#financialSection').show();
	updatePricingInfo();
	fillPeInvsTable(DATA);
	
}

function dataReadOnly(){
	alert("Data is read only and summarizes the financial information in the project");
}

function clearInvoiceTable () {
	$('#invoiceDisplay').find('#invoiceTable').find('tr:not(.head)').remove();
}

function showAmountBox1(){
	
	//user chooses to invoice balance
	if($('#peInvoiceInformation').find('#percentOrAmountRow1').find('#percentOrAmount1').val() == "2"){
				
		var invoiced = Number(0);
		var invoiceAmount = Number(0);
		
		$('#peInvoiceInformation').find('#invoicePercentHide1').hide();
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		invoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
		
		$('#peInvoiceInformation').find('#invoiceAmount1').val(cleanNumericValueForDisplaying(invoiceAmount));
	}
	
	else if($('#peInvoiceInformation').find('#percentOrAmountRow1').find('#percentOrAmount1').val() == "1"){
		$('#peInvoiceInformation').find('#invoiceAmount1').val('');
		$('#peInvoiceInformation').find('#invoicePercent1').val('');
		$('#peInvoiceInformation').find('#invoicePercentHide1').show();
	}
	
	else{
		$('#peInvoiceInformation').find('#invoiceAmountHide1').show();
		$('#peInvoiceInformation').find('#invoiceAmount1').val('');
		$('#peInvoiceInformation').find('#invoicePercentHide1').hide();
	}
}

function showAmountBox(){
	
	//user chooses to invoice balance
	if($('#invoiceInformation').find('#percentOrAmountRow').find('#percentOrAmount').val() == "2"){
				
		var invoiced = Number(0);
		var invoiceAmount = Number(0);
		
		$('#invoiceInformation').find('#invoicePercentHide').hide();
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		invoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
		
		$('#invoiceInformation').find('#invoiceAmount').val(cleanNumericValueForDisplaying(invoiceAmount));
	}
	
	else if($('#invoiceInformation').find('#percentOrAmountRow').find('#percentOrAmount').val() == "1"){
		$('#invoiceInformation').find('#invoiceAmount').val('');
		$('#invoiceInformation').find('#invoicePercent').val('');
		$('#invoiceInformation').find('#invoicePercentHide').show();
	}
	
	else{
		$('#invoiceInformation').find('#invoiceAmountHide').show();
		$('#invoiceInformation').find('#invoiceAmount').val('');
		$('#invoiceInformation').find('#invoicePercentHide').hide();
	}
}

function populateInvoiceAmt(percentValue){
	
	//+SELECTED_PE_ID.sell
	var invoicedAmount = (SELECTED_PE_ID.sell*percentValue)/100;
	invoicedAmount = invoicedAmount.toFixed(2);
	$('#invoiceInformation').find('#invoiceAmount').val(cleanNumericValueForDisplaying(invoicedAmount));
}

function populateInvoiceAmt1(percentValue1){
	
	//+SELECTED_PE_ID.sell
	var invoicedAmount1 = (SELECTED_PE_ID.sell*percentValue1)/100;
	invoicedAmount1 = invoicedAmount1.toFixed(2);
	$('#peInvoiceInformation').find('#invoiceAmount1').val(cleanNumericValueForDisplaying(invoicedAmount1));
}

//global var for invoices
let INVOICES_STORED;

//global var for invoices
let invs;

//gets list of invoices for project
function getInvs(stopServerCalls) {
	console.log(projectID);
		
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectInvs',
			'id': projectID
		}, success: function (data) {
			console.log("proj Invoices!!!!", data);
			let type = getParameterByName("from");

			invs = data;
			if (data) {
				fillPeInvsTable(DATA);
				clearInvoiceTable();

				fillInvsTable(data);
			}
			if(!stopServerCalls) getUserData();

		}, error: function (data) {
			alert('Server Error!10 INVOICES');
		}
	});
}

function createInv1() {

	INV_ACTION = "createInv";

	clearInvForm1();	
	displayInvWell1();
	
	fillInvsTable(invs);
	
	var newInvMax = CURR_INV_MAX + 1;
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceID1').val(invs.length+1);
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceStatusSelectionRow1').find('#invoiceStatus1').val("Requested");
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#associatedPE1').val(SELECTED_PE_ID.mcsCO);
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceType1').val(parsePETypeStatus(SELECTED_PE_ID.peType));
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceCustomer1').val(convertChangeOrderType(SELECTED_PE_ID.type));
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#submittedDateInv1').val(today);
	
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#peInvNum1').val(SELECTED_PE_ID.mcsCO + "-" + newInvMax);

	
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval11').val("2");
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval21').val("2");
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval31').val("2");
	
	var invoiced = Number(0);
	
	//sums all invoices for the selected PE
	for(var j=0; j < invs.length; j++){
		
		if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
			
			invoiced = invoiced + Number(invs[j].invoiceAmount);
		}
	}
	
	var balance = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	
	//$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceStatusSelectionRow1').show();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#percentOrAmountRow1').show();

	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide1').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide2').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide3').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide4').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide5').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide6').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide7').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide8').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#titleHide1').hide();
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#hide13').hide();
	
	$('#peInvoiceInformation').find('#invoicePercentHide1').hide();
	$('#peInvoiceInformation').find('#percentOrAmount1').val("0");
}

//clears invoice form
function clearInvForm1()
{
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceID1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#associatedPE1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceTitle1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceNumber1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceType1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceStatus1').val('Requested');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#submittedDateInv1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceAmount1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceCustomer1').val('');		
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invoiceApproval1').val('');	
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#notes1').val('');	
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#invTotal1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#currInvoiced1').val('');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval11').val('2');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval21').val('2');
	$('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval31').val('2');
}

function viewInv1(){
	
	let createMessage = "This Invoice will not be added, are you sure you want to leave this screen?";
	let displayedMessage;
	
	if(INV_ACTION == "createInv")
		displayedMessage = createMessage;
	
	if(confirm(displayedMessage))
	{
		document.getElementById('peInvoiceInformation').style.width = "100%";

		$('#invoiceCreationZone1').hide();
		$('#peInvoiceInformation').show();
	}
	$("#peInvoiceTable tr").css('background-color', "");
}

//displays invoice screen using a modal popup
//mirrors displayInvWell but requires its own styling for whatever reason
function displayInvWell1() {

	document.querySelector('.bg-modal1').style.display = "flex";
}

//creates an invoice
function createInv() {

	INV_ACTION = "createInv";
	clearInvForm();	
	displayInvWell();
	
	//alert(SELECTED_PE_ID.mcsCO + "-" + CURR_INV_MAX);

	//generates a new date
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	var newInvMax = CURR_INV_MAX + 1;
	
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceID').val(invs.length+1);
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceStatusSelectionRow').find('#invoiceStatus').val("Requested");
	$('#invoiceInformation').find('#invoiceCreationZone').find('#associatedPE').val(SELECTED_PE_ID.mcsCO);
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceType').val(parsePETypeStatus(SELECTED_PE_ID.peType));
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceCustomer').val(convertChangeOrderType(SELECTED_PE_ID.type));
	$('#invoiceInformation').find('#invoiceCreationZone').find('#submittedDateInv').val(today);
	$('#invoiceInformation').find('#invoiceCreationZone').find('#peInvNum').val(SELECTED_PE_ID.mcsCO + "-" + newInvMax);
	
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval1').val("2");
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval2').val("2");
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval3').val("2");
	
	var invoiced = Number(0);
	
	//sums all invoices for the selected PE
	for(var j=0; j < invs.length; j++){
		
		if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
			
			invoiced = invoiced + Number(invs[j].invoiceAmount);
		}
	}
	
	//hide status when creating an invoice
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceStatusSelectionRow').hide();
	
	//show percent or amount selection dropdown
	$('#invoiceInformation').find('#invoiceCreationZone').find('#percentOrAmountRow').show();
	
	var balance = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invTotal').val(cleanNumericValueForDisplaying(SELECTED_PE_ID.sell));
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceBalance').val(cleanNumericValueForDisplaying(balance));
	
	//Clears the submit/reject date field
	$('#invoiceInformation').find('#invoiceCreationZone').find('#submitRejectDate').val('');
	
	
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval1').val("2");
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval2').val("2");
	$('#invoiceInformation').find('#invoiceCreationZone').find('#approval3').val("2");
	
	$('#invoiceInformation').find('#invoicePercentHide').hide();
	$('#invoiceInformation').find('#percentOrAmount').val("0");
}

//Checks to see if a submit/reject date should be added
//A date is added when the status is changed to Rejected or Submitted. It then sets it to the day the status was changed
function submitRejectDateCheck(){

	//Status is set to "Rejected" or "Submitted"
	if(($('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceStatusSelectionRow').find('#invoiceStatus').val() == "Rejected" || 
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceStatusSelectionRow').find('#invoiceStatus').val() == "Submitted")){
			
		//Generates today's date
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		
		$('#invoiceInformation').find('#invoiceCreationZone').find('#submitRejectDate').val(today);

	}
	
	//Status is not Rejected or Submitted, make it blank
	else{
		$('#invoiceInformation').find('#invoiceCreationZone').find('#submitRejectDate').val('');
	}
}

//clears invoice form
function clearInvForm()
{
	$('#invoiceCreationZone').find('#invoiceID').val('');
	$('#invoiceCreationZone').find('#associatedPE').val('');
	$('#invoiceCreationZone').find('#invoiceTitle').val('');
	$('#invoiceCreationZone').find('#invoiceNumber').val('');
	$('#invoiceCreationZone').find('#invoiceType').val('');
	$('#invoiceCreationZone').find('#invoiceStatus').val('Requested');
	$('#invoiceCreationZone').find('#submittedDateInv').val('');
	$('#invoiceCreationZone').find('#invoiceAmount').val('');
	$('#invoiceCreationZone').find('#invoiceCustomer').val('');		
	$('#invoiceCreationZone').find('#invoiceApproval').val('');	
	$('#invoiceCreationZone').find('#notes').val('');	
	$('#invoiceCreationZone').find('#invTotal').val('');
	$('#invoiceCreationZone').find('#currInvoiced').val('');
	$('#invoiceCreationZone').find('#approval1').val('2');
	$('#invoiceCreationZone').find('#approval2').val('2');
	$('#invoiceCreationZone').find('#approval3').val('2');
}

//prompts user when they want to back out of invoice
function viewInv() {
	
	$("#invoiceTable tr").css('background-color', "");
	
	let updateMessage = "These changes will not be saved, are you sure you want to leave the screen?";
	let createMessage = "This Invoice will not be added, are you sure you want to leave this screen?";
	let displayedMessage;
	
	if(INV_ACTION == "createInv")
		displayedMessage = createMessage;
	else 
		displayedMessage = updateMessage;
	
	if(confirm(displayedMessage))
	{
		document.getElementById('invoiceInformation').style.width = "100%";
		$('#invoiceCreationZone').hide();
		$('#invoiceDisplay').show();
		$('#returnAccountsReceivable').show();
	}
	
	$('#invoiceCreationZone').find('#percentOrAmountRow').hide();
	
	$('#invoiceCreationZone').find('#invoiceStatusSelectionRow').show();
}

function toggleInv (source) {
	$(source).siblings().css('background-color', 'white');
	$(source).css('background-color', '#dddddd');
	$('#editInvoice').prop('disabled', false);
	editSelectedInv(source);
	
}

//allows user to edit invoice
function editSelectedInv(source)
{
	INV_ACTION = "updateInv";
	clearInvForm();
	displayInvWell();
	fillInvWell(source);
}

/**
 * This function shows the form. 
 */
function displayInvWell() {

	document.querySelector('.bg-modal').style.display = "flex";
}

/**
 * This function fills the form using the old data. i.e., it is called in edit invoice so that older values are filled. 
 */
function fillInvWell(source) {
	
	clearInvForm();
	let tmp_id = source;	
	let selected_Inv;
		
	for(var i = 0; i < invs.length; i++) {
		
		//compares all invoices to find the one selected
		if("Inv_"+invs[i].id == tmp_id.id) {
			
			selected_Inv = invs[i];
			INVOICES_STORED = invs[i].id;
		
			break;
		}	
	}
	
	if(!selected_Inv) {
		console.log("IMPROPER INV SELECTION");
		return;
	}	
		
	$('#invoiceCreationZone').find('#invoiceID').val(selected_Inv.invoiceID);
	$('#invoiceCreationZone').find('#associatedPE').val(selected_Inv.associatedPE);
	$('#invoiceCreationZone').find('#invoiceNumber').val(selected_Inv.invoiceNumber);
	$('#invoiceCreationZone').find('#invoiceTitle').val(selected_Inv.invoiceTitle);
	$('#invoiceCreationZone').find('#invoiceType').val(selected_Inv.invoiceType);
	$('#invoiceCreationZone').find('#submittedDateInv').val(selected_Inv.submittedDate);
	$('#invoiceCreationZone').find('#invoiceCustomer').val(selected_Inv.invoiceCustomer);
	$('#invoiceCreationZone').find('#invoiceStatus').val(selected_Inv.invoiceStatus);
	$('#invoiceCreationZone').find('#invoiceApproval').val(selected_Inv.invoiceApproval);	
	$('#invoiceCreationZone').find('#submitRejectDate').val(selected_Inv.submitRejectDate);
	$('#invoiceCreationZone').find('#notes').val(selected_Inv.notes);	
	$('#invoiceCreationZone').find('#peInvNum').val(selected_Inv.peInvNum);
	
	$('#invoiceCreationZone').find('#approval1').val(selected_Inv.approval1);	
	$('#invoiceCreationZone').find('#approval2').val(selected_Inv.approval2);	
	$('#invoiceCreationZone').find('#approval3').val(selected_Inv.approval3);	
			
	var invoiced = Number(0);
	
	//sums up all invoices for PE
	for(var j=0; j < invs.length; j++){
		
		if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
			
			invoiced = invoiced + Number(invs[j].invoiceAmount);
		}
	}
	
	var balance = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	
	//these values with dollar amounts are put at bottom as not to intefere with invoice calculation
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invoiceBalance').val(cleanNumericValueForDisplaying(balance));
	$('#invoiceCreationZone').find('#invoiceAmount').val(cleanNumericValueForDisplaying(selected_Inv.invoiceAmount));
	$('#invoiceInformation').find('#invoiceCreationZone').find('#invTotal').val(cleanNumericValueForDisplaying(SELECTED_PE_ID.sell));
	
	if(selected_Inv.invoiceStatus == "Review"){
		
		$('#invoiceCreationZone').find('#hide10').show();	
		$('#invoiceCreationZone').find('#hide11').show();	
		$('#invoiceCreationZone').find('#hide12').show();
	}
	
	else{
		
		$('#invoiceCreationZone').find('#hide10').hide();	
		$('#invoiceCreationZone').find('#hide11').hide();	
		$('#invoiceCreationZone').find('#hide12').hide();
	}

}

//This enables the user to filter invoices based off status
$(document).on('change', '#invoiceSelector2', function () {	
	clearInvoiceTable();
	fillInvsTable(invs);
});


var CURR_INV_MAX;

//fills invoice table 
function fillInvsTable(data) {
	
	let selector = $('#invoiceSelector2').val();	
	clearInvoiceTable();
	let invs = data;
	let count = 0;
	
	var invoiced = Number(0);
	
	//sums up all invoices for PE
	for(var j=0; j < invs.length; j++){
		
		if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected" && invs[j].invoiceStatus != "Requested"){
			
			invoiced = invoiced + Number(invs[j].invoiceAmount);
		}
	}
	
	var balance = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	
	//these values with dollar amounts are put at bottom as not to intefere with invoice calculation
	$('#invoiceInformation').find('#invoiceBalance1').val(cleanNumericValueForDisplaying(balance));
	$('#invoiceInformation').find('#amountInvoiced1').val(cleanNumericValueForDisplaying(invoiced));
	$('#invoiceInformation').find('#totalAmount1').val(cleanNumericValueForDisplaying(SELECTED_PE_ID.sell));
	
	
	var pendingInvoiced = Number(0);
	
	//sums up all requested invoices for PE
	for(var j=0; j < invs.length; j++){
		
		if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus == "Requested"){
			
			pendingInvoiced = pendingInvoiced + Number(invs[j].invoiceAmount);
			
		}
	}
	
	$('#invoiceInformation').find('#totalPending1').val(cleanNumericValueForDisplaying(pendingInvoiced.toFixed(2)));
	
	//shows invoices based on filter selection
	for (var i = 0; i < invs.length; i++) {
		if((selector == 'requested' && invs[i].invoiceStatus != "Requested") || 
				(selector == 'processing' && invs[i].invoiceStatus != "Processing") ||
				(selector == 'review' && invs[i].invoiceStatus == "Review") ||
				(selector == 'approved' && invs[i].invoiceStatus != "Approved") ||
				(selector == 'submitted' && invs[i].invoiceStatus != "Submitted") ||
				(selector == 'rejected' && invs[i].invoiceStatus != "Rejected") ||
				(SELECTED_PE_ID.mcsCO != invs[i].associatedPE)) 
				continue; // do nothing
				
		var inv = invs[i];
		
		var invListing = document.createElement('tr');
		invListing.setAttribute("value", inv);
		
		//allows invoice to be edited
		invListing.onclick = function() {
			alert(count);
			toggleInv(this);
		};
		
		invListing.ondblclick = function(){
			
			alert(count);
			editSelectedInv(this);
		};
				
		count++;
		CURR_INV_MAX = count;
		
		invListing.value = invs[i].id;
		invListing.id = "Inv_" + invs[i].id;
		
		let invoiceID = document.createElement('td');
		let associatedPE = document.createElement('td');
		let invoiceTitle = document.createElement('td');
		//let invoiceType = document.createElement('td');		
		let invoiceAmount = document.createElement('td');
		let submittedDate = document.createElement('td');
		let submitRejectDate = document.createElement('td');
		let invoiceCustomer = document.createElement('td');
		let invoiceApproval = document.createElement('td');
		let invoiceStatus = document.createElement('td');
	//	let invoiceNumber = document.createElement('td');
		let notes = document.createElement('td');	
		
		invoiceID.innerHTML = invs[i].associatedPE + '-' + (count);
		invoiceTitle.innerHTML = invs[i].invoiceTitle;
		invoiceNumber.innerHTML = invs[i].invoiceNumber;
		//invoiceType.innerHTML = invs[i].invoiceType;
		
		if(invs[i].invoiceAmount)
			invoiceAmount.innerHTML = '$' + invs[i].invoiceAmount;
		else
			invoiceAmount.innerHTML = "---";		
		
		submittedDate.innerHTML = invs[i].submittedDate;
		
		if(invs[i].submitRejectDate)
			submitRejectDate.innerHTML = invs[i].submitRejectDate;
		else
			submitRejectDate.innerHTML = "TBD";
		
		invoiceCustomer.innerHTML = invs[i].invoiceCustomer;
		
		invoiceStatus.innerHTML = invs[i].invoiceStatus;
		invoiceApproval.innerHTML = invs[i].invoiceApproval;
		
		associatedPE.innerHTML = invs[i].associatedPE;
		notes.innerHTML = invs[i].notes;
		
		//invListing.appendChild(associatedPE);
		invListing.appendChild(invoiceID);
		//invListing.appendChild(invoiceTitle);
		//invListing.appendChild(invoiceType);
		invListing.appendChild(invoiceAmount);
		invListing.appendChild(invoiceCustomer);
		invListing.appendChild(invoiceStatus);
		invListing.appendChild(submittedDate);
		invListing.appendChild(submitRejectDate);		
		//invListing.appendChild(invoiceApproval);		
	//	invListing.appendChild(invoiceNumber);
		invListing.appendChild(notes);

		$('#invoiceTable > tbody').append(invListing);
		
	}
	//This adds No Invoices to Show to the table if there are none in that filter or category (Ex: Open, Complete)
	if (count === 0) {
		clearAndAddSingleRowInvs("No Invoices to Show");
		
		CURR_INV_MAX = 0;
	}		
}

function clearAndAddSingleRowInvs(msg) {
	$('#invoiceTable > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');
	let listDetails6 = document.createElement('td');
	let listDetails7 = document.createElement('td');
	let listDetails9 = document.createElement('td');
	let listDetails8 = document.createElement('td');

	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	$(placeHolder).append(listDetails6);
	$(placeHolder).append(listDetails7);
	$(placeHolder).append(listDetails8);
	$(placeHolder).append(listDetails9);
	
	$('#invoiceTable > tbody').append(placeHolder);
}

//submits invoice with user creating or editing an invoice in the invoice menu
function submitInv() {
	let invoiceID = $('#invoiceCreationZone').find('#invoiceID').val();
	let associatedPE = $('#invoiceCreationZone').find('#associatedPE').val();
	let invoiceTitle = $('#invoiceCreationZone').find('#invoiceTitle').val();
	let invoiceNumber = $('#invoiceCreationZone').find('#invoiceNumber').val();
	let invoiceType = $('#invoiceCreationZone').find('#invoiceType').val();

	let invoice_id = projectID;
	
	let amountType = $('#invoiceCreationZone').find('#percentOrAmount').val();	

	let submittedDate = $('#invoiceCreationZone').find('#submittedDateInv').val();		
	let submitRejectDate = $('#invoiceCreationZone').find('#submitRejectDate').val();		
	let invoiceAmount = $('#invoiceCreationZone').find('#invoiceAmount').val();
	let invoiceCustomer = $('#invoiceCreationZone').find('#invoiceCustomer').val();
	let invoiceStatus = $('#invoiceCreationZone').find('#invoiceStatus').val();
	let invoiceApproval = $('#invoiceCreationZone').find('#invoiceApproval').val();
	let notes = $('#invoiceCreationZone').find('#notes').val();
	
	let peInvNum = $('#invoiceInformation').find('#invoiceCreationZone').find('#peInvNum').val();
	
	let approval1 = $('#invoiceCreationZone').find('#approval1').val();
	let approval2 = $('#invoiceCreationZone').find('#approval2').val();
	let approval3 = $('#invoiceCreationZone').find('#approval3').val();
	
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");

	//Removes a $ prior to saving to prevent a display error
	invoiceAmount = invoiceAmount.replace('$', '');
	invoiceAmount = invoiceAmount.replace('%', '');
	
	//user picks to invoice %
	
	//user picks to invoice the remaining balance
	if(amountType == "2" && INV_ACTION == "createInv"){
		
		var invoiced = Number(0);
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		invoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	}
	
	console.log("PROJECT == ", project);	
	if(INV_ACTION == "createInv"){		
		
		//stops user from invoicing a rejected PE
		if(SELECTED_PE_ID.status == 4){
			
			alert("Cannot invoice for a rejected PE");
			return;
		}
		
		//stops user from invoicing for MCS (non-billable)
		if(invoiceCustomer == 'MCS (non-billable)'){
			
			alert("Cannot invoice for MCS (non-billable)!");
			return;
		}
		
		var invoiced = Number(0);
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
				
				
		//validates invoice amount to make sure it isn't negative or too much
		if(invoiceAmount >( Number(SELECTED_PE_ID.sell) - Number(invoiced)) || invoiceAmount < 1){
			
			var allowedInvoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
			var allowedInvoicePercent = (allowedInvoiceAmount/Number(SELECTED_PE_ID.sell)) *100;
			
			alert("Invoice amount is invalid, please enter an amount less than or equal to: $"+ allowedInvoiceAmount.toFixed(2)+ " or enter a percent less than or equal to: "+ allowedInvoicePercent.toFixed(2)+"%");
			return;
		}
		
		//checks if submit/reject date should be added
		submitRejectDateCheck();	
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'action': 'createInvoice',
				'project': projectID,
				'invoiceID': invoiceID,
				'associatedPE': associatedPE,
				'invoiceTitle': invoiceTitle,
				'invoiceNumber': invoiceNumber,
				'invoiceType': invoiceType,
				'submittedDate': submittedDate,
				'submitRejectDate': submitRejectDate,
				'invoiceAmount': invoiceAmount,
				'invoiceCustomer': invoiceCustomer,
				'invoiceStatus': invoiceStatus,
				'invoiceApproval' : invoiceApproval,				
				'notes' : notes,
				'peInvNum': peInvNum,
				'approval1' : approval1,
				'approval2' : approval2,
				'approval3' : approval3,
				'invoice_id' : invoice_id,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'INVOICE_ADDED') {
					alert('Invoice Added Successfully');
					
					//Makes the user return to the invoice screen 
					document.getElementById('invoiceInformation').style.width = "100%";
					$('#invoiceCreationZone').hide();
					$('#invoiceDisplay').show();
					$('#returnAccountsReceivable').show();
					clearInvoiceTable();
					getInvs(1);
				}
			}
		});		
		
	}
	
	else if(INV_ACTION == "updateInv"){
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				
				'action': 'updateInvoice',
				'project': projectID,
				'currInvoice':INVOICES_STORED,
				'invoiceID': invoiceID,
				'associatedPE': associatedPE,
				'invoiceTitle': invoiceTitle,
				'invoiceNumber': invoiceNumber,
				'invoiceType': invoiceType,
				'submittedDate': submittedDate,
				'submitRejectDate':submitRejectDate,
				'invoiceAmount': invoiceAmount,
				'invoiceCustomer': invoiceCustomer,
				'invoiceStatus': invoiceStatus,
				'invoiceApproval' : invoiceApproval,				
				'notes' : notes,
				'peInvNum': peInvNum,
				'approval1' : approval1,
				'approval2' : approval2,
				'approval3' : approval3,
				'invoice_id' : invoice_id,
																																																				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'UPDATED_INVOICE') {
					alert('Invoice Updated Successfully');
				
					//Makes the user return to the invoice screen 
					document.getElementById('invoiceInformation').style.width = "100%";
					$('#invoiceCreationZone').hide();
					$('#invoiceDisplay').show();
					$('#returnAccountsReceivable').show();
					clearInvoiceTable();
					getInvs(1);
				}
			}
		});
	}	
}

//submits invoice from pe summary menu
function submitInv1(){
	
	let invoiceID = $('#invoiceCreationZone1').find('#invoiceID1').val();
	let associatedPE = $('#invoiceCreationZone1').find('#associatedPE1').val();
	let invoiceTitle = $('#invoiceCreationZone1').find('#invoiceTitle1').val();
	let invoiceNumber = $('#invoiceCreationZone1').find('#invoiceNumber1').val();
	let invoiceType = $('#invoiceCreationZone1').find('#invoiceType1').val();

	let invoice_id = projectID;
	
	let amountType = $('#invoiceCreationZone1').find('#percentOrAmount1').val();	
	
	let submittedDate = $('#invoiceCreationZone1').find('#submittedDateInv1').val();		
	let invoiceAmount = $('#invoiceCreationZone1').find('#invoiceAmount1').val();
	let invoiceCustomer = $('#invoiceCreationZone1').find('#invoiceCustomer1').val();
	let invoiceStatus = $('#invoiceCreationZone1').find('#invoiceStatus1').val();
	
	let invoiceApproval = $('#invoiceCreationZone1').find('#invoiceApproval1').val();
	let notes = $('#invoiceCreationZone1').find('#notes1').val();
	
	let peInvNum = $('#peInvoiceInformation').find('#invoiceCreationZone1').find('#peInvNum1').val();
	
	let approval1 = $('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval11').val();
	let approval2 = $('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval21').val();
	let approval3 = $('#peInvoiceInformation').find('#invoiceCreationZone1').find('#approval31').val();

	
	  
	if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");

	//Removes a $ prior to saving to prevent a display error
	invoiceAmount = invoiceAmount.replace('$', '');
	invoiceAmount = invoiceAmount.replace('%', '');
	
	//user picks to invoice %
/*	if(amountType == "1"){
		
		var invoiced = Number(0);
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		invoiceAmount = ((invoiceAmount/100)*SELECTED_PE_ID.sell - invoiced).toFixed(2);
	} */
	
	//user picks to invoice the remaining balance
	if(amountType == "2" && INV_ACTION == "createInv"){
		
		var invoiced = Number(0);
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
		
		invoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
	}

	console.log("PROJECT == ", project);	
	if(INV_ACTION == "createInv"){	
		
		//stops user from invoicing a rejected PE
		if(SELECTED_PE_ID.status == 4){
			
			alert("Cannot invoice for a rejected PE");
			return;
		}
		
		//stops user from invoicing for MCS (non-billable)
		if(invoiceCustomer == 'MCS (non-billable)'){
			
			alert("Cannot invoice for MCS (non-billable)!");
			return;
		}
		
		var invoiced = Number(0);
		
		//sums all invoices for the selected PE
		for(var j=0; j < invs.length; j++){
			
			if(SELECTED_PE_ID.mcsCO == invs[j].associatedPE && invs[j].invoiceStatus != "Rejected"){
				
				invoiced = invoiced + Number(invs[j].invoiceAmount);
			}
		}
				
		//validates invoice amount to make sure it isn't negative or too much
		if(invoiceAmount >( Number(SELECTED_PE_ID.sell) - Number(invoiced)) || invoiceAmount < 1){
			
			var allowedInvoiceAmount = Number(SELECTED_PE_ID.sell) - Number(invoiced);
			
			var allowedInvoicePercent = (allowedInvoiceAmount/Number(SELECTED_PE_ID.sell)) *100;
			
			
			alert("Invoice amount is invalid, please enter an amount less than or equal to: $"+ allowedInvoiceAmount.toFixed(2)+ " or enter a percent less than or equal to: "+ allowedInvoicePercent.toFixed(2)+"%");
			return;	
		}
		
		//checks if submit/reject date should be added
		submitRejectDateCheck();
		
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'action': 'createInvoice',
				'project': projectID,
				'invoiceID': invoiceID,
				'associatedPE': associatedPE,
				'invoiceTitle': invoiceTitle,
				'invoiceNumber': invoiceNumber,
				'invoiceType': invoiceType,
				'submittedDate': submittedDate,
				'invoiceAmount': invoiceAmount,
				'invoiceCustomer': invoiceCustomer,
				'invoiceStatus': invoiceStatus,
				'invoiceApproval' : invoiceApproval,				
				'notes' : notes,
				'peInvNum': peInvNum,
				'approval1' : approval1,
				'approval2' : approval2,
				'approval3' : approval3,
				'invoice_id' : invoice_id,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'INVOICE_ADDED') {
					alert('Invoice Added Successfully');
					
					$('#invoiceCreationZone1').hide();		
					
					clearPeInvoiceTable();
					getInvs(1);
					fillPeInvsTable(DATA);
					
					
				}
			}
		});		
		//add the information in the approvals part too
		$.ajax({
			type: 'POST',
			url: 'UpdateApprovals', 
			data: {
				'action': 'createApprovals',
				'project': projectID,
				'invoiceID': invoiceID,
				
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				if (response === 'INVOICE_ADDED') {
					alert('Approvals Added Successfully');
					
					//Makes the user return to the invoice screen 
					document.getElementById('invoiceInformation').style.width = "100%";
					$('#invoiceCreationZone').hide();
					$('#invoiceDisplay').show();
					$('#returnAccountsReceivable').show();
					clearInvoiceTable();
					getInvs(1);
				}
			}
		});		
		
	}
}