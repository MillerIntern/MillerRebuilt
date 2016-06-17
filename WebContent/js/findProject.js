var parameterFields = ["Warehouse", "Classification", "Item",
                       "Manager", "Supervisor", "Type", "Status",
                       "Stage"];

var projects;
var filteredProjects;

var paramNum = 1;

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
	// Get stuff for parameters
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
			getProjects();
			fillDropdowns(data);

		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
	});
}

function getProjects()
{
	// Get projects to filter
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
			projects = data;
			console.log(projects);
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
	
	generateDropdowns(data["warehouse"], parameterFields[0]);
	generateDropdowns(data["class"], parameterFields[1]);
	generateDropdowns(data["item"], parameterFields[2]);
	generateDropdowns(data["person"], parameterFields[3]);
	generateDropdowns(data["person"], parameterFields[4]);
	generateDropdowns(data["type"], parameterFields[5]);
	generateDropdowns(data["status"], parameterFields[6]);
	generateDropdowns(data["stage"], parameterFields[7]);

}

function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	
	if(className == "Warehouse")
	{
		json = sortByName(json, className);
	}
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
	console.log("firing values");
	filterProjects();
});

$(document).on('change', 'select.parameterID',function(){
	setVals($(this));
});

function setVals(param)
{
	console.log("firing");
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
	selectObject2.className = "parameterID";
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
	$("#paramID"+paramNum).append(d);
}

function filterProjects()
{
	var json = JSON.parse(projects["projects"]);

	console.log(json.length);
	for(var i = 0; i < paramNum; i++)
	{
		var id = $("#paramID"+(i + 1)).val();
		var val = $("#paramVal"+(i + 1)).val();
		console.log(id + " " + val);

		for(var j = 0; j < json.length; j++)
		{
			if(id == 'Warehouse')
			{
				if(json[i].warehouse.warehouseID != val)
					console.log("entry to delete");
			}
		}
	}
}

function addProjects()
{
	if(filteredProjects.length > 60)
	{
		
		return;
	}
}

function removeParam(param)
{
	console.log(param);
}




