
$(document).ready(function()
{
   getUserInfo();	
   getProjectItems();
});


function getUserInfo(){
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
			 if(user.permission.id != 1)
				 hideAdminContent();	
			}
		});
}

function getProjectItems()
{

	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',
			'item': true,
		},
		success: function(data)
		{
			console.log(data);
			fillDropdowns(data);

		}
	});
}


function fillDropdowns(data)
{
	console.log(data);
	var projItems = JSON.parse(data["item"]);
	console.log(projItems);
	
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < projItems.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = projItems[i].name;
		option.setAttribute("value", projItems[i].id);
		d.appendChild(option);
	}

	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Select a Project Item---";

	
	$('#newMasterScopeForm').find('#projectItem').find('option').remove();
	$('#newMasterScopeForm').find('#projectItem').append(defaultOption);
	$('#newMasterScopeForm').find('#projectItem').append(d);
	
}


function saveMasterScope()
{
	
}