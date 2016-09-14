var PAGETYPE = "add";
var PROJECT_ID;
var CHANGE_ORDER_ID;

var PROJECT_DATA;

$(document).ready(function()
{
 	$("#proposalDate").datepicker();   
 	$("#submittedDate").datepicker();   
 	$("#approvedDate").datepicker();  
 	
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

function fillTabs(json)
{
	console.log(CHANGE_ORDER_ID);
	var changeOrderToEdit;
	for(var i = 0; i < json.changeOrders.length; i++)
	{
		if(json.changeOrders[i].id == CHANGE_ORDER_ID)
			changeOrderToEdit = json.changeOrders[i];
	}
	console.log(changeOrderToEdit);
	$("#customerCO").val(changeOrderToEdit.type);
	$("#mcsCO").val(changeOrderToEdit.mcsCO);
	$("#subCO").val(changeOrderToEdit.subCO);
	$("#proposalDate").val(changeOrderToEdit.proposalDate);
	$("#briefDescription").val(changeOrderToEdit.briefDescription);
	$("#subNames").val(changeOrderToEdit.subNames);
	$("#cost").val(changeOrderToEdit.cost);
	$("#sell").val(changeOrderToEdit.sell);
	$("#status").val(changeOrderToEdit.status);
	$("#submittedTo").val(changeOrderToEdit.submittedTo);
	$("#submittedDate").val(changeOrderToEdit.submittedDate);
	$("#approvedDate").val(changeOrderToEdit.approvedDate);
	$("#notes").val(changeOrderToEdit.notes);
}

function convert(param)
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

function fillDropdowns(json)
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
	
	var customerCO = $("#customerCO").val();
	var mcsCO = $("#mcsCO").val();
	var subCO = $("#subCO").val();
	var subNames = $("#subNames").val();
	var status = $("#status").val();
	var submittedTo = $("#submittedTo").val();
	
	var briefDescription = $("#briefDescription").val();
	var notes = $("#notes").val();
	
	var cost = $("#cost").val();
	var sell = $("#sell").val();
	
	var dates = [proposalDate, submittedDate, approvedDate];
	var required = [customerCO, briefDescription, cost, sell, status, submittedTo, submittedDate];
	
	var action = "addChangeOrder";
	if(PAGETYPE == 'edit')
		action = "editChangeOrder";
	
	if(isValidInput(required, dates))
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				
				'projectID': PROJECT_ID,
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
				
				createConfirmWindow();
				console.log(data);
			},
			error: function()
			{
				createConfirmWindow();
			}
		});
}

function isValidInput(required, dates)
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






