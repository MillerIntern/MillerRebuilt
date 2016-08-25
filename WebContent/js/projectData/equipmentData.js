
var PAGETYPE = "add";
var PROJECT_ID;
var EQUIPMENT_ID;

var PROJECT_DATA;

$(document).ready(function()
		{
		 	$("#estDeliveryDate").datepicker();   
		 	$("#deliveryDate").datepicker();   
		 	
			PAGETYPE = getParameterByName("type");	
			PROJECT_ID = getParameterByName("id");
		});


function getProjectEnums()
{
	console.log(getParameterByName("id"));
		
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
			$(".projectIdentifier").html(data.warehouse.city.name 
					+ ", " + data.warehouse.state + " --- " +  data.projectItem.name);
			getDropdownInfo();
			if(PAGETYPE == 'edit')
			{
				EQUIPMENT_ID = getParameterByName("equipmentID");
				PROJECT_DATA = data;
			}

		}
	});
}

function getDropdownInfo()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getAllObjects',			
		},
		success: function(data)
		{
			fillDropdowns(data);
			if(PAGETYPE == 'edit')
				fillTabs(PROJECT_DATA);
		}
	});
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
				
				createConfirmWindow();
				console.log(data);
			},
			error: function()
			{
				createConfirmWindow();
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
			"Return to project manager": function() {
				console.log("in order to make it so duplicates aren't made, make this navigate you to the ?edit:id=X page or whatever");
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
