
var PAGETYPE = "add";
var PROJECT_ID;
var CHANGE_ORDER_ID;

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
				CHANGE_ORDER_ID = getParameterByName("changeOrderID");
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
		option.setAttribute("value", equipmentVendor[i].id);
		d.appendChild(option);
	}
	$("#vendor").append(d);
}

function saveProject()
{
	var poNum = $('#poNum').val();
	var equipmentName = $('#equipmentName').val();
	var vendor = $('#vendor').val();
	var component = $('#component').val();
	var deliveryDate = $('#deliveryDate').val();
	var estDeliveryDate = $('#estDeliveryDate').val();
	
	var dates = [deliveryDate, estDeliveryDate];
	
	if(isValidInput(dates))
	{
		console.log('lets doet');
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