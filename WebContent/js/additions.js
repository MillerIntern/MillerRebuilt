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
			  console.log("USER = ", data.responseJSON);
		      if(data.responseJSON.permission.id != 1) {
		    	  alert("Sorry but it looks like you don't have access to this page!");
		    	  document.location.href = "homepage.html";
		      }
		      getStates();
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

function createVendor()
{
	var vendor = $('#vendor').val();
	
	if(vendor != '')
	{
		$.ajax(
		{
			type: 'POST',
			url: 'Admin',
			data:
			{
				'action': 'createVendor',
				'vendor': vendor,
			},
			success: function(data)
			{
				console.log(data);
				$('#vendor').val('');
				alert("Vendor Created Successfully!");
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


