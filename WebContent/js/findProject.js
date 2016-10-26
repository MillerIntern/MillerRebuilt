var parameterFields = ["Warehouse", "Classification", "Item",
                       "Manager", "Supervisor", "Type", "Status",
                       "Stage"];

var projects;
var filteredProjects;

var paramNum = 2;

var warehouseOptions;
var classOptions;
var itemOptions;
var managerOptions;
var supervisorOptions;
var typeOptions;
var statusOptions;
var stageOptions;

function getProjectEnums()
{
	document.body.style.cursor='wait';
	$(".project").html("Loading.");

	// Get stuff for parameters
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getAllProjects',
		},
		success: function(data)
		{
			$(".project").html("Loading..");
			projects = data;
			getDropdownFields();

		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
	});
}

function getDropdownFields()
{
	// Get projects to filter
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
			if(typeof data == 'string' && data.slice(0,-1) == 'VERIFICATION_FAILURE') {returnToLogin(); return;} 

			fillDropdowns(data);
			console.log("ready");
			$("#paramID1").val('Warehouse');
			$("#paramVal1").empty();
			$("#paramVal1").append(warehouseOptions.cloneNode(true));
			
			$("#paramID2").val('Stage');
			$("#paramVal2").empty();
			$("#paramVal2").append(stageOptions.cloneNode(true));
			$(".project").html("Loading...");
			
			checkInitFilter();			
			document.body.style.cursor='default';
		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
	});

}

function fillDropdowns(data)
{
	d = document.createDocumentFragment();
	
	for(var i = 0; i < parameterFields.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	$(".parameterID").append(d);
	
	console.log(data);
	generateDropdowns(data["warehouse"], parameterFields[0]);
	generateDropdowns(data["class"], parameterFields[1]);
	generateDropdowns(data["item"], parameterFields[2]);
	generateDropdowns(data["person"], parameterFields[3]);
	generateDropdowns(data["person"], parameterFields[4]);
	generateDropdowns(data["type"], parameterFields[5]);
	generateDropdowns(data["status"], parameterFields[6]);
	generateDropdowns(data["stage"], parameterFields[7]);
	

}

function checkInitFilter()
{
	if(getParameterByName('id') != '')
	{
		$.ajax({
			type: 'POST',
			url: 'Project',
			data:
			{
				'domain': 'project',
				'action': 'getManager',
			},
			success: function(data)
			{
				if(data != '')
				{
					$('#paramID1').val('Manager');
					$("#paramVal1").empty();
					$("#paramVal1").append(managerOptions.cloneNode(true));

					console.log(document.getElementById('paramVal1'));
					switch(data)
					{
						case "Bart":
							document.getElementById('paramVal1').value = '14';
							break;
						case "Alex":
							document.getElementById('paramVal1').value = '3';
							break;
						case "Andy":
							document.getElementById('paramVal1').value = '2';
							break;
						case "Craig":
							document.getElementById('paramVal1').value = '12';
							break;
						case "Daves":
							document.getElementById('paramVal1').value = '7';
							break;
						case "David":
							document.getElementById('paramVal1').value = '1';
							break;
						case "Jim": 
							document.getElementById('paramVal1').value = '8';
							break;
						case "Joe":
							document.getElementById('paramVal1').value = '5';
							break;
						case "Sai":
							document.getElementById('paramVal1').value = '10';
							break;
						case "Tony":
							document.getElementById('paramVal1').value = '4';
							break;
					}
				}
				filterProjects();
			}
		});
	}
	else
		filterProjects();

}


function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < json.length; i++)
	{
		var option = document.createElement("option");
		if(className == "Warehouse")
			option.innerHTML = json[i].city.name + ", " + json[i].state;
		else
			option.innerHTML = json[i].name;
			
		option.setAttribute("value", json[i].id);
		d.appendChild(option);
	}
	if(className == "Warehouse")
		warehouseOptions = d;
	else if(className == "Classification")
		classOptions = d;
	else if(className == "Item")
		itemOptions = d;
	else if(className == "Manager")
		managerOptions = d;
	else if(className == "Supervisor")
		supervisorOptions = d;
	else if (className == "Type")
		typeOptions = d;
	else if (className == "Status")
		statusOptions = d;
	else if(className == "Stage")
		stageOptions = d;
}

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

$(document).on('change', 'select.parameterValue', function()
{
	filterProjects();
});

$(document).on('change', 'select.parameterID',function()
{
	setVals($(this));
	filterProjects();
});

function setVals(param)
{
	var modParam = $(param).siblings("select");
	valOptions = $(param).val();
	
	if(valOptions == 'Warehouse')
	{
		modParam.empty();
		modParam.append(warehouseOptions.cloneNode(true));	
	}
	else if(valOptions == 'Classification')
	{
		modParam.empty();
		modParam.append(classOptions.cloneNode(true));
	}
	else if(valOptions == 'Item')
	{
		modParam.empty();
		modParam.append(itemOptions.cloneNode(true));
	}
	else if(valOptions == 'Manager')
	{
		modParam.empty();
		modParam.append(managerOptions.cloneNode(true));
	}
	else if(valOptions == 'Supervisor')	
	{
		modParam.empty();
		modParam.append(supervisorOptions.cloneNode(true));
	}
	else if(valOptions == 'Type')
	{
		modParam.empty();
		modParam.append(typeOptions.cloneNode(true));
	}
	else if(valOptions == 'Status')
	{
		modParam.empty();
		modParam.append(statusOptions.cloneNode(true));
	}
	else if(valOptions == 'Stage')
	{
		modParam.empty();
		modParam.append(stageOptions.cloneNode(true));
	}	
	
}

function addParameter()
{
	paramNum++;
	var parameterHolder = document.createElement("div");
	parameterHolder.className = "paramHolder";
	
	var selectObject = document.createElement("select");
	selectObject.className = "parameterID";
	selectObject.id =  ("paramID"+paramNum);
	
	var optionObject = document.createElement("option");
	optionObject.value = 'none';
	optionObject.innerHTML = '-- Please select an option --';
	
	var removeTag = document.createElement("p");
	removeTag.className = 'remove';
	removeTag.onclick = function() {removeParam(this)};
	removeTag.innerHTML = 'X';
	
	var selectObject2 = document.createElement("select");
	selectObject2.className = "parameterValue";
	selectObject2.id = ("paramVal" + paramNum);
	
	var optionObject2 = document.createElement("option");
	optionObject2.innerHTML = '---';
	
	var lineBreak = document.createElement("br");
	
	selectObject.appendChild(optionObject);
	selectObject2.appendChild(optionObject2);
	parameterHolder.appendChild(selectObject);
	parameterHolder.appendChild(selectObject2);
	parameterHolder.appendChild(removeTag);
	parameterHolder.appendChild(lineBreak);

	$("#paramField").append(parameterHolder);
	populateParameters();
}

function populateParameters()
{
	d = document.createDocumentFragment();
	for(var i = 0; i < parameterFields.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	var ids = $('.paramHolder').children('.parameterID');
	$(ids[ids.length - 1]).append(d);
}

function filterProjects()
{
	console.log("filtering");
	var json = JSON.parse(projects["projects"]);

	var parameters = $('.paramHolder').children('select');
	console.log(parameters);
	
	var remaining = json.length;
	for(var i = 0; i < (paramNum * 2); i+= 2)
	{
		var id = $(parameters[i]).val();
		var val = $(parameters[i + 1]).val();
		console.log("Filter on: "+ id + " " + val);
		
		for(var j = 0; j < json.length; j++)
		{
			if(id == 'Warehouse')
			{

				if(json[j] != null && json[j].warehouse.id != val)
				{
					json[j] = null;
					remaining = remaining - 1;
				}
			}
			else if(id == 'Classification')
			{
				if(json[j] != null && json[j].projectClass.id != val)
				{
					json[j] = null;
					remaining = remaining - 1;
				}
			}
			else if(id == 'Item')
			{
				if(json[j] != null && json[j].projectItem.id != val) 
				{
					json[j] = null;
					remaining = remaining - 1;
				}
			}
			else if(id == 'Manager')
			{
				if(json[j] != null && json[j].projectManagers.id != val)
				{
					json[j] = null;
					remaining = remaining -1;
				}
			}
			else if(id == 'Supervisor')
			{
				if(json[j] != null && json[j].supervisors[0].id != val)
				{
					json[j] = null;
					remaining = remaining -1;
				}
			}
			else if(id == 'Type')
			{
				if(json[j] != null && json[j].projectType.id != val)
				{
					json[j] = null;
					remaining = remaining -1;
				}
			}
			else if(id == 'Status')
			{
				if(json[j] != null && json[j].status.id != val)
				{
					json[j] = null;
					remaining = remaining -1;
				}
			}
			else if(id == 'Stage')
			{
				if(json[j] != null && json[j].stage.id != val)
				{
					json[j] = null;
					remaining = remaining -1;
				}
			}
			
			
		}
	}
	console.log("Entries remaining: " +  remaining);
	
	$("#projectHolder").children().remove();
	if(remaining == 0)
	{
		var projectListing = document.createElement("li");
		projectListing.className = "project";
		projectListing.innerHTML = ("No results :(")
		
		$("#projectHolder").append(projectListing);
	}
	else if(remaining > 50)
	{
		var projectListing = document.createElement("li");
		projectListing.className = "project";
		projectListing.innerHTML = ("Too many results. Please refine your search.")
		
		$("#projectHolder").append(projectListing);
	}
	else 
	{
		for(var i = 0; i < json.length; i++)
		{
			if(json[i] != null)
			{
				var projectListing = document.createElement("li");
				projectListing.className = "project";
				projectListing.id = (json[i].id);
				projectListing.innerHTML = (json[i].warehouse.city.name 
						+ ", " + json[i].warehouse.state + " --- " +  json[i].projectItem.name); //+ " --- " + json[i].status.name);
				projectListing.onclick = function() {manageThisProject(this)};
				
				$("#projectHolder").append(projectListing);
			}
		}
	}
}

function removeParam(param)
{
	console.log(param);
	
	
	
	param.parentNode.remove();
	paramNum--;
	
	filterProjects();
}

function manageThisProject(listing)
{
	console.log(listing);
	window.location.href = ('projectManager.html?type=navigateTo&id='+listing.id);
}




