var PAGETYPE = "add"

$(document).ready(function()
{
 	$("#proposalDate").datepicker();   
 	$("#submittedDate").datepicker();   
 	$("#approvedDate").datepicker();  
 	
	PAGETYPE = getParameterByName("type");	
});

function getProjectEnums()
{
	console.log(getParameterByName("id"));
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
			$(".projectIdentifier").html(data.warehouse.city.name 
					+ ", " + data.warehouse.state + " --- " +  data.projectItem.name);
			getDropdownInfo();
			if(PAGETYPE == 'edit')
				fillTabs(data);

		}
	});
}

function getDropdownInfo()
{
	console.log("hey");
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getAllObjects',
			'id': PROJECT_ID,
			
		},
		success: function(data)
		{
			console.log(data);
			fillDropdowns(data);
		}
	});
}

function fillTabs(json)
{
	
}

function fillDropdowns(json)
{
	var changeorderStatus = JSON.parse(json["changeorderstatus"]);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < changeorderStatus.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = changeorderStatus[i].name;
		option.setAttribute("value", changeorderStatus[i].id);
		d.appendChild(option);
	}
	$("#status").append(d);
	
	var changeorderType = JSON.parse(json["changeordertype"]);
	d = document.createDocumentFragment();
	for(var i = 0; i < changeorderType.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = changeorderType[i].name;
		option.setAttribute("value", changeorderType[i].id);
		d.appendChild(option);
	}
	$("#customerCO").append(d);
}

function saveProject()
{
	console.log("saving project");
	
	var proposalDate = $("#proposalDate").val();
	var submittedDate = $("#submittedDate").val();
	var approvedDate = $("#approvedDate").val();
	
	var dates = [proposalDate, submittedDate, approvedDate];
	
	var action = "addChangeOrder";
	if(PAGETYPE == 'edit')
		action = "editChangeOrder";
	
	if(isValidInput(dates))
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
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






