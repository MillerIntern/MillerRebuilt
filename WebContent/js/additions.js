let users;
let equipmentSuppliers;
let subcontractors;


$(document).ready(function()
{
	$('ul.tabs li').click(function()
		    {
		        
				var tab_id = $(this).attr('data-tab');
		        if(tab_id == "saveButton")
		            return;

				$('ul.tabs li').removeClass('current');
				$('.tab-content').removeClass('current');

				$(this).addClass('current');
				$("#"+tab_id).addClass('current');
			});			
});

function preparePage() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			if(data.responseJSON) {
			 if(data.responseJSON.id == 20) $('#myContent').show();
			  console.log("USER = ", data.responseJSON);
		      if(data.responseJSON.permission.id != 1) {
		    	  alert("Sorry but it looks like you don't have access to this page!");
		    	  document.location.href = "homepage.html";
		      }
		      getUsers();
			} else {
				console.log("GetUserData() RESPONSE = ",data);
				alert('Server Failure!');
				
			}
		}
	});
}

function getStates()
{
	$.ajax({
		type: 'POST',
		url: 'Admin',
		data:
		{
			'action': 'getStates',
		},
		success: function(data)
		{
			var states = JSON.parse(data);
			getEquipmentSuppliers();
			fillStates(states);
		},
	});
}

function fillStates(json)
{
	var d = document.createDocumentFragment();

	for(var i = 0; i < json.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = json[i];
		d.appendChild(option);
	}
	
	$("#state").append(d);
}

function createWarehouse()
{
	var city = $('#city').val();
	var state = $("#state").val();
	var region = $("#region").val();
	
	if(city != '' && state != '' && region != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createWarehouse',
				'city': city,
				'state': state,
				'region': region,
			},
			success: function(data)
			{
				console.log(data);
				$('#city').val('');
				$('#state').val('');
				$('#region').val('');
				alert("Warehouse Created Successfully!");
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
}

function createItem()
{
	var item = $('#projectItem').val();
	
	if(item != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createItem',
				'item': item,
			},
			success: function(data)
			{
				console.log(data);
				$('#projectItem').val('');
				alert("Project Item Created Successfully!");
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
}

function createSupplier()
{
	var supplier = $('#supplier').val();
	
	for(var i = 0; i < equipmentSuppliers.length; i++) {
		if(equipmentSupplies[i].toUpperCase() == supplier.toUpperCase()) {
			alert("Supplier name must not already exist in the database!");
			return;
		}
	}
	
	if(supplier != '')
	{
		$.ajax(
		{
			type: 'POST',
			url: 'Admin',
			data:
			{
				'action': 'createSupplier',
				'supplier': supplier,
			},
			success: function(data)
			{
				console.log(data);
				$('#supplier').val('');
				alert("Supplier Created Successfully!");
			}
		});
	}
}

function createSubcontractor()
{
	var subcontractor = $('#subcontractorName').val();
	var subcontractorEmail = $('#subcontractorEmail').val();

	if(!subcontractor) {
		alert("Subcontractors must have a name!");
		return;
	}
	
	if(!subcontractorEmail) {
		alert("Subcontractors must have an email!");
		return;
	}
	
	for(var i = 0; i < subcontractors.length; i++) {
		if(subcontractors[i].name.toUpperCase() == subcontractor.toUpperCase()) {
			alert("Subcontractor name must not already exist in the database!");
			return;
		}
	}
	
	if(supplier != '')
	{
		$.ajax(
		{
			type: 'POST',
			url: 'Admin',
			data:
			{
				'action': 'createSubcontractor',
				'name': subcontractor,
				'email' : subcontractorEmail ,
			},
			success: function(data)
			{
				console.log(data);
				$('#subcontractorName').val('');
				$('#subcontractorEmail').val('');
				alert("Subcontractor Created Successfully!");
			}
		});
	}
}

function addPerson()
{
	var personName = $('#personName').val();
	
	if(personName != '')
	{
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'addPerson', 
				'username': personName, 
			},
			success: function(data)
			{
				console.log(data);
				$('#personName').val('');
				alert("Person Added Successfully!");
			}
		});
	}
}

function addUser()
{
	let logInName = $('#userTab').find('#logInName').val();
	if(logInName) logInName = logInName.toLowerCase();
	let firstName = $('#userTab').find('#firstName').val();
	let email = $('#userTab').find('#email').val();
	let password = $('#userTab').find('#password').val();
	let confirmPassword = $('#userTab').find("#passwordConfirmation").val();
	let permission = $('#userTab').find('#permission').val();
	let status = $('#userTab').find('#status').val();
	
	if(password != confirmPassword)
	{
		alert("Password does not match!");
		return;
	}
	
	let validData = true;
	
	if(!logInName) validData = false;
	if(!firstName) validData = false;
	if(!email) validData = false;
	if(!password) validData = false;
	if(!permission) validData = false;
	if(!status) validData = false;

	if(validData == false)
	{
	     alert("Each input field needs a value!");
	     return;
	}
	
	for(var i = 0; i < users.length; i++){
		if(users[i].name == logInName)
		{
			alert("All user's must have a unique log in name!");
			return;
		}
	}

		{
			$.ajax({
				type: 'POST',
				url: 'Admin', 
				data: 
				{
					'action': 'addUser', 
					'logInName': logInName,
					'firstName': firstName,
					'email' : email,
					'password' : password,
					'permission' : permission,
					'status' : status
				},
				success: function(data)
				{
					console.log(data);
					$('.userInput').val('');
					alert("User Added Successfully!");
				}
			});
		}
	
	
	
	
	
}

/**
 * This function gets all Miller users from the database
 */
function getUsers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUsers',
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getUsers() = ",data.responseJSON);
			if (data.responseJSON) {
				users = data.responseJSON;
				console.log("USERS = ",users);
			}
			getStates();
		}
		
	});	
}

/**
 * This function gets all Miller users from the database
 */
function getEquipmentSuppliers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getEquipmentSuppliers',
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getEquipmentSuppliers() = ",data.responseJSON);
			if (data.responseJSON) {
				equipmentSuppliers = data.responseJSON;
				console.log("EQUIPMENT PROVIDER NAMES = ",equipmentSuppliers);
			}
			getSubcontractors();
		}
		
	});	
}

/**
 * This function gets all Miller users from the database
 */
function getSubcontractors() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSubcontractors',
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getSubcontractors() = ",data.responseJSON);
			if (data.responseJSON) {
				subcontractors = data.responseJSON;
				console.log("SUBCONTRACTOR NAMES = ", subcontractors);
			}
		}
		
	});	
}
function deleteProjectObject() {
	if(!confirm("Are you sure you want to permanently delete this data from the database?")) return;
	let id = document.getElementById("objectId").value;
	let domain = document.getElementById("objectDomain").value;
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': domain,
			'action': 'deleteProjectObject',
			'id': id
		}, complete: function (data) {
			console.log("REPONSE DATA FROM deleteItem() = ",data);

		}
		
	});
}


function sendText()
{
	let phoneNumber = $('#phoneNumber').val();
	let message = $('#message').val();
	let phoneCarrier = $('#phoneCarrier').val();
	console.log("Num: ", phoneNumber, "\nMessage: ", message, "\nCarrier: ", phoneCarrier);
   	console.log("IN: sendTaskAlert()");
   	if(!confirm("HOLD UP")) return;
   	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendText',
			'phoneNumber' : phoneNumber,
			'message' : message,
			'phoneCarrier' : phoneCarrier
		}, complete: function (response) {
			console.log("RESPONSE FROM sendText() = ", response);			
		}
	});
}


