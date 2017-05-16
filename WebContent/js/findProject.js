'use strict';

let ready = false;

let projects;

let parameterFields = ["Warehouse", "Classification", "Item",
                       "Manager", "Supervisor", "Type", "Status",
                       "Stage"];

let paramNum = 2;

let warehouseOptions;
let classOptions;
let itemOptions;
let managerOptions;
let supervisorOptions;
let typeOptions;
let statusOptions;
let stageOptions;

let taskFinder;

function getAllProjects() {
	
	clearAndAddSingleRow("Retrieving Projects...");
	if (getParameterByName('type') === 'findTaskProject') {
		$('#param-field').before('<h3>Select a Project to Create Task for:</h3>');
		taskFinder = true;
	} else taskFinder = false;
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getAllProjects'
		}, success: function (data) {
			projects = data;
			getSearchCriteria();
		}
	});
}

function getSearchCriteria() {
	
	clearAndAddSingleRow("Retrieving Search Criteria...");
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificObjects',
			'warehouse': true,
			'class': true,
			'item': true,
			'person': true,
			'type': true,
			'status': true,
			'stage': true
		}, success: function(data) {
			
			fillDropdowns(data);
			
			$('#paramID1').val('Warehouse');
			$('#paramVal1').empty();
			$('#paramVal1').append(warehouseOptions.cloneNode(true));
			
			$('#paramID2').val('Stage');
			$('#paramVal2').empty();
			$('#paramVal2').append(stageOptions.cloneNode(true));
			
			checkInitFilter();
			
		}, error: function(data) {
			console.log(data);
			alert('Something has gone horribly wrong!');
		}
	});
}

function clearAndAddSingleRow(msg) {
	
	$('#results > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	
	$('#results > tbody').append(placeHolder);
}

function checkInitFilter () {
	if(getParameterByName('id') === 'user') {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getManager'
			}, success: function (data) {
				if(data !== '') {
					$('#paramID1').val('Manager');
					$('#paramVal1').empty();
					$('#paramVal1').append(managerOptions.cloneNode(true));
					
					switch(data) {
						case 'Bart': 
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
				filterProjects();
				}
			}
		});
		filterProjects();
	} else if (getParameterByName('id') == 'activePermit') {
		$('#paramID1').val('Status');
		$("#paramVal1").empty();
		$("#paramVal1").append(statusOptions.cloneNode(true));

		document.getElementById('paramVal1').value = '30';
		filterProjects();
	} else {
		filterProjects();
	}
}

function fillDropdowns(data) {
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < parameterFields.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	
	$('.parameterID').append(d);
	
	warehouseOptions = generateDropdowns(data['warehouse'], parameterFields[0]);
	classOptions = generateDropdowns(data['class'], parameterFields[1]);
	itemOptions = generateDropdowns(data['item'], parameterFields[2]);
	managerOptions = generateDropdowns(data['person'], parameterFields[3]);
	supervisorOptions = generateDropdowns(data['person'], parameterFields[4]);
	typeOptions = generateDropdowns(data['type'], parameterFields[5]);
	statusOptions = generateDropdowns(data['status'], parameterFields[6]);
	stageOptions = generateDropdowns(data['stage'], parameterFields[7]);
}

function generateDropdowns(jsonData, field) {
	let json = JSON.parse(jsonData);
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		if (field == 'Warehouse') {
			option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
		} else {
			option.innerHTML = json[i].name;
		}
		
		option.setAttribute('value', json[i].id);
		d.appendChild(option);
	}
	return d;
}

$(document).on('change', 'select.parameterValue', function () {
	filterProjects();
});

$(document).on('change', 'select.parameterID', function () {
	setVals($(this));
	filterProjects();
});

function setVals (param) {
	let modParam = $(param).siblings('select');
	let valOptions = $(param).val();
	
	switch(valOptions)
	{
	
	case 'Warehouse':
		modParam.empty();
		modParam.append(warehouseOptions.cloneNode(true));	
		break;
	case 'Classification':
		modParam.empty();
		modParam.append(classOptions.cloneNode(true));
		break;
	case 'Item':
		modParam.empty();
		modParam.append(itemOptions.cloneNode(true));
		break;
	case 'Manager':
		modParam.empty();
		modParam.append(managerOptions.cloneNode(true));
		break;
	case 'Supervisor':
		modParam.empty();
		modParam.append(supervisorOptions.cloneNode(true));
		break;
	case 'Type':
		modParam.empty();
		modParam.append(typeOptions.cloneNode(true));
		break;
	case 'Status':
		modParam.empty();
		modParam.append(statusOptions.cloneNode(true));
		break;
	case 'Stage':
		modParam.empty();
		modParam.append(stageOptions.cloneNode(true));
		break;
	}
}

function addParameter() {
	paramNum++;
	
	let parameterHolder = document.createElement('div');
	parameterHolder.className = 'paramHolder';
	
	let selectID = document.createElement('select');
	selectID.className = 'parameterID';
	selectID.id = ('paramID' + paramNum);
	$(selectID).css('margin-right', '4px');
	
	let optionObject = document.createElement('option');
	optionObject.value = 'none';
	optionObject.innerHTML = '-- Please select an option --';
	
	let removeTag = document.createElement('span');
	removeTag.onclick = function() {removeParam(this)};
	removeTag.innerHTML = '&times;';
	
	let selectVal = document.createElement('select');
	selectVal.className = 'parameterValue';
	selectVal.id = ('paramVal' + paramNum);
	$(selectVal).css('margin-right', '4px');
	
	let optionObject2 = document.createElement('option');
	optionObject2.innerHTML = '---';
	
	selectID.appendChild(optionObject);
	selectVal.appendChild(optionObject2);
	parameterHolder.appendChild(selectID);
	parameterHolder.appendChild(selectVal);
	parameterHolder.appendChild(removeTag);
	
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < parameterFields.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = parameterFields[i];
		option.setAttribute("value", parameterFields[i]);
		d.appendChild(option);
	}
	$(selectID).append(d);
	
	$('#param-field').append(parameterHolder);
}

function removeParam(param) {
	param.parentNode.remove();
	paramNum--;
	filterProjects();
}

function filterProjects () {
	let json = JSON.parse(projects['projects']);
	
	let parameters = $('.paramHolder').children('select');
	
	let remaining = json.length;
	for (var i = 0; i < (paramNum * 2); i+= 2) {
		let id = $(parameters[i]).val();
		let val = $(parameters[i + 1]).val();
		
		for (var j = 0; j < json.length; j++) {
			if(id === 'Warehouse') { 
				if(json[j] != null && json[j].warehouse.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Classification') {
				if (json[j] != null && json[j].projectClass.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Item') {
				if (json[j] != null && json[j].projectItem.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Manager') {
				if (json[j] != null && json[j].projectManagers.id != val) {
					json[j] = null;
					remaining = remaining -1;
				}
			} else if (id == 'Supervisor') {
				if (json[j] != null && json[j].supervisors[0].id != val) {
					json[j] = null
					remaining = remaining - 1;
				}
			} else if (id === 'Type') {
				if (json[j] != null && json[j].projectType.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if (id === 'Status') {
				if(json[j] != null && json[j].status.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			} else if(id === 'Stage') {
				if(json[j] != null && json[j].stage.id != val) {
					json[j] = null;
					remaining = remaining - 1;
				}
			}
		}

		$('#results > tbody').children('tr:not(.head)').remove();
		if (remaining == 0) {
			clearAndAddSingleRow('No Results Found!');
		} else if (remaining > 50) {
			clearAndAddSingleRow('Too many results. Refine your search.');
		} else {
			for (var k = 0; k < json.length; k++) {
				if(json[k] != null) {
					let projectListing = document.createElement('tr');
					let listDetails0 = document.createElement('td');
					let listDetails1 = document.createElement('td');
					let listDetails2 = document.createElement('td');
					
					projectListing.id = 'project' + json[k].id;
					projectListing.onclick = function() {
						navigateTo(projectListing);
					}
					
					listDetails0.innerHTML = json[k].warehouse.city.name + ', ' +
											toTitleCase(json[k].warehouse.state.replace('_', ' '));
					listDetails1.innerHTML = json[k].projectItem.name;
					listDetails2.innerHTML = json[k].projectManagers.name;
					
					$(projectListing).append(listDetails0);
					$(projectListing).append(listDetails1);
					$(projectListing).append(listDetails2);
					
					$('#results > tbody').append(projectListing);
				}
			}
		}		
	}
}

function navigateTo(source) {
	console.log($(source).attr('id'));
	if(taskFinder) {
		window.location.href = TASK_CREATOR + '?id=' + 
			$(source).attr('id').replace('project', '');
	} else {
		window.location.href = PROJECTMANAGER + '?id=' + 
			$(source).attr('id').replace('project', '');
	}

}