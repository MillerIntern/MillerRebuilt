var EDIT_PAGE_URL = "projectData.html?type=edit";
var stages=["Active", "Closed", "Budgetary", "Proposal", "Inactive"];

//This function returns all of the data elements needed to make a project query
//Input: none
//Output: none
function getProjectEnums()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		data: 
		{
			'domain': 'project',
			'action': 'getEditQueryObjects',
		},
		success: function(data)
		{
			fillDropdowns(data);
		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
	});
}

//This function fills all of the dropdowns
//Input: JSON array of data elements
//Output: none (the dropdown elements will be filled with option elements
function fillDropdowns(data)
{
	var itemTypes = ["warehouse", "stage", "class", "item", "id"];

	generateDropdowns(data["warehouse"], itemTypes[0]);
	generateDropdowns(data["stage"], itemTypes[1]);
	generateDropdowns(data["class"], itemTypes[2]);
	generateDropdowns(data["item"], itemTypes[3]);
}

//This function creates the dropdown HTML elements
//Input: the string representing a json array of data, a string detailing the type of data
//Output: none (creates an HTML dropdown element
function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	var sent=true;
	
	for (var i = 0; i < json.length; i++)
	{
		sent=true;
		var option = document.createElement("option");
		if (className == "warehouse")
		{
			option.innerHTML = json[i].city.name+", "+json[i].state+" -- #"+json[i].warehouseID;
			option.setAttribute("value", json[i].id);
		}
		else if (className == "id")
		{
			option.innerHTML = json[i].McsNumber;
			option.setAttribute("value", json[i].McsNumber);
		}
		else
		{
			if(hasStage(stages, json[i].name))
			{
				option.innerHTML = json[i].name;
				option.setAttribute("value", json[i].id);
			}
			else
			{
				sent=false;
			}
		}
		
		if(sent)
			d.appendChild(option);
	}
	
	$("#"+className).append(d);
}

//This function performs a search for projects that match the values selected in the dropdown menus
//Input: none
//Output: none (matching projects will appear in a popup window).
function search()
{
	var warehouse = $("#warehouse").val();
	var stage = $("#stage").val();
	var pClass = $("#class").val();
	var item = $("#item").val();
	var id = $("#id").val();
	
	if (warehouse != "default" && stage != "default")
	{
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'getProjectToEdit',
				'warehouse':warehouse,
				'stage':stage,
				'class':pClass,
				'item': item,
				'id': id
			},
			success: function(data)
			{
				var json = data;
				if (json.length == 0)
				{
					alert("No projects matched your search. Please try again.");
				}
				else
					generateProjectPicker(data);
			}
		});
	}
	else
		alert("You must select values in the required sections");
}

//This function creates a popup window allowing a user to pick a project to edit
//Input: none
//Output: none (creates a popup window)
function createModalProjectPicker()
{
	$(function() {
		$("#projectPicker").dialog({
			modal: true,
			resizable: false,
			width: 500,
            height: 300,
		});
	});
}

//This function fills in the options to select in the project popup window
//Input: JSON array of projects
//Output: none (populates the project picker popup window)
function generateProjectPicker(data)
{
	var json = data;
	
	$("#projectPicker").html("");
	
	var menu = document.createElement("ul");
	menu.setAttribute("id", "projectMenu");
	var title = document.createElement("h2");
	title.innerHTML = "Please choose a project:";
	menu.appendChild(title);
	
	for (var i = 0; i < json.length; i++)
	{
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute("href", EDIT_PAGE_URL+"&id="+json[i].id);
	    a.innerHTML = json[i].warehouse.city.name+", "+json[i].warehouse.state+" -- #"+json[i].warehouse.warehouseID +
	    	" -- "+json[i].projectItem.name;
	    li.appendChild(a);
	    menu.appendChild(li);
	}
	
	$("#projectPicker").append(menu);
	$("#projectMenu").menu();
	createModalProjectPicker();
}

function hasStage(stageList, stage)
{
	for(var i=0; i<stageList.length; i++)
	{
		if(stageList[i]==stage)
			return true;
	}
	
	return false;
}