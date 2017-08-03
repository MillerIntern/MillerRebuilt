'use strict';

/*
Associated Task HTML Block

<table class='table table-hover' id='taskTable'>
	<tr class='head'>
		<th>Task</th>
		<th>Description</th>
		<th>Assigned</th>
		<th>Due</th>
		<th>Priority</th>
		<th style='width: 200px;'>Notes</th>
		<th></th>
	</tr>
</table>

 */


let projectID;
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

function getProject() {
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

				fillTabs(data);
				
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

function fillTabs (data) {
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
	$('#changeOrderTable').find('tr').remove();
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