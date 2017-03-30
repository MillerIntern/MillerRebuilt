
var PAGETYPE = "add";
var PROJECT_ID;
var EQUIPMENT_ID;

var PROJECT_DATA;

$(document).ready(function()
{
	$('.nav-tabs > li').click(function () {
		$('.info-tab').removeClass('active');
		$('#' + $(this).attr('data-tab')).addClass('active');
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#saveButton > button').prop('disabled', true);

	});
	
 	$("#estDeliveryDate").datepicker();   
 	$("#deliveryDate").datepicker();   
});

function getDropdownInfo()
{
	PAGETYPE = getParameterByName("type");	
	PROJECT_ID = getParameterByName("id");
	if(PROJECT_ID === null) {
		alert('Invalid URL. Try returning to this page again.');
		return;
	}
	
	//if(PROJECT_ID !== null) {}
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',		
			'equipmentvendor': true,
		},
		success: function(data)
		{
			fillDropdowns(data);
			getProject();
		}
	});
}

function getProject()
{
	console.log(getParameterByName("id"));
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
				
				if(PAGETYPE == 'edit')
				{
					EQUIPMENT_ID = getParameterByName("equipmentID");
					PROJECT_DATA = data;
					fillTabs(PROJECT_DATA);
	
				}
	
			}
		});
	} else {
		alert('Something went wrong');
	}
}


function fillDropdowns(json)
{
	console.log(json);
	var equipmentVendor = JSON.parse(json["equipmentvendor"]);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < equipmentVendor.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = equipmentVendor[i].name;
		option.setAttribute("value", equipmentVendor[i].name);
		d.appendChild(option);
	}
	$("#vendor").append(d);
}

function fillTabs(json)
{	
	var equipmentToEdit;
	for(var i = 0; i < json.projEquipment.length; i++)
		if(json.projEquipment[i].id == EQUIPMENT_ID)
			equipmentToEdit = json.projEquipment[i];
	
	console.log(equipmentToEdit);
	$('#poNum').val(equipmentToEdit.poNum);
	$('#equipmentName').val(equipmentToEdit.equipmentName);
	$('#vendor').val(equipmentToEdit.vendor);
	$('#estDeliveryDate').val(equipmentToEdit.estDeliveryDate);
	$('#deliveryDate').val(equipmentToEdit.deliveryDate);
	$('#notes').val(equipmentToEdit.notes);
}

function saveProject()
{
	var poNum = $('#poNum').val();
	var equipmentName = $('#equipmentName').val();
	var vendor = $('#vendor').val();
	var deliveryDate = $('#deliveryDate').val();
	var estDeliveryDate = $('#estDeliveryDate').val();
	var notes = $('#notes').val();
	
	var dates = [deliveryDate, estDeliveryDate];
	var action = 'addEquipment';
	if(PAGETYPE == 'edit')
		action = 'editEquipment';
	
	// TODO: Required Fields?
	if(isValidInput(dates))
	{
		$.ajax({
			type: 'POST',
			url: 'Project',
			data:
			{
				'domain': 'project',
				'projectID': PROJECT_ID,
				'equipmentID': EQUIPMENT_ID,
				'action': action,
				'poNum': poNum,
				'equipmentName': equipmentName,
				'vendor': vendor,
				'deliveryDate': deliveryDate,
				'estDeliveryDate': estDeliveryDate,
				'notes': notes,
			},
			success:function(data){
				alert('Saved Equipment');
				$('#saveButton > button').prop('disabled', false);
				console.log(data);
			},
			error: function()
			{
				alert('Saved Equipment');
				$('#saveButton > button').prop('disabled', false);
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