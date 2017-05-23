'use strict';

let user;
let task;
let tasks;
let selectedProjID;

$(document).ready(function () {
	$('#taskWell > span > .dueDate').datepicker();
});

function getUserData () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			console.log(data);
			if(data.responseJSON) {
				user = data.responseJSON;
				$('#formFor').html('Tasks for: ' + user.firstName);
				getTasks();
			} else {
				alert('Server Failure!');
			}
		}
	});
}

function getTasks() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getTasks',
		}, complete: function (data) {
			console.log(data);
			if (data.responseJSON) {
				tasks = data.responseJSON;
				createTaskTable(data.responseJSON);
				getUsers();
			}
		}
	});
}

function getUsers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUsers',
		}, complete: function (data) {
			console.log(data);
			if (data.responseJSON) {
				createDropdown(data.responseJSON);
			}
		}
		
	});
}

function createDropdown (json) {
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		
		// when users store both username and name, access the user's name and username fields
		option.innerHTML = json[i];
		option.setAttribute("value", json[i]);
		d.appendChild(option);
	}
	$('#taskWell > span > .assignedTo').append(d);
}

function createTaskTable () {
	console.log(tasks);
	var count = 0;
	for (var i = 0; i < tasks.length; i++) {
		console.log(tasks[i].assignee.name + ' ' + user.name);
		if (tasks[i].assignee.name === user.name) {
			count++;
			let taskListing = document.createElement('tr');
			taskListing.value = tasks[i].id;
			taskListing.onclick = function () { 
				expandTaskInfo(this); 
			}; 
			
			let projectDetails = document.createElement('td');
			let taskTitle = document.createElement('td');
			let taskDesc = document.createElement('td');
			let createdDate = document.createElement('td');
			let dueDate = document.createElement('td');
			let severity = document.createElement('td');
			let closeTask = document.createElement('td');
			
			let closeButton = document.createElement('button');
			closeButton.innerHTML = 'Close'
			closeButton.classname = 'btn';
			closeButton.value = tasks[i].id;
			closeButton.onclick = function () {
				closeTaskById(this);
			};
			
			projectDetails.innerHTML = tasks[i].project.warehouse.city.name + 
						' #' + tasks[i].project.warehouse.warehouseID +
						' - ' + tasks[i].project.projectItem.name;
			taskTitle.innerHTML = tasks[i].title;
			taskDesc.innerHTML = tasks[i].description;
			createdDate.innerHTML = tasks[i].assignedDate;
			dueDate.innerHTML = tasks[i].dueDate;
			severity.innerHTML = tasks[i].severity;
			severity.align = 'center';
			closeTask.appendChild(closeButton);
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
			$(taskListing).append(taskDesc);
			$(taskListing).append(createdDate);
			$(taskListing).append(dueDate);
			$(taskListing).append(severity);
			$(taskListing).append(closeTask);
			
			$('#results > tbody').append(taskListing);
		}
	}
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function clearAndAddSingleRow(msg) {
	$('#results > tbody').children('tr:not(.head)').remove();
	
	let placeHolder = document.createElement('tr');
	let listDetails0 = document.createElement('td');
	let listDetails1 = document.createElement('td');
	let listDetails2 = document.createElement('td');	
	let listDetails3 = document.createElement('td');
	let listDetails4 = document.createElement('td');
	let listDetails5 = document.createElement('td');

	
	listDetails0.innerHTML = msg;
	
	$(placeHolder).append(listDetails0);
	$(placeHolder).append(listDetails1);
	$(placeHolder).append(listDetails2);
	$(placeHolder).append(listDetails3);
	$(placeHolder).append(listDetails4);
	$(placeHolder).append(listDetails5);
	
	$('#results > tbody').append(placeHolder);
}

function collapseWell() {
	if(task.notes !== $('#taskWell > div > .notes').val() || 
		task.description !== $('#taskWell > div > .description').val() || 
		task.severity != $('#taskWell > span > .severity').val() || 
		task.dueDate !== $('#taskWell > span > .dueDate').val() || 
		task.assignee.firstName !== $('#taskWell > span > .assignedTo').val()) {
		if (!confirm("Collapsing Will Remove Task Changes! Continue?")) {
			return;
		}
	}
	$('#taskWell').slideUp();
}

function expandTaskInfo(param) {
	let taskID = $(param).val();
	console.log(taskID);
	for(var i = 0; i < tasks.length; i++) {
		if(tasks[i].id === taskID) {
			task = tasks[i];
			break;
		}
	}
	
	selectedProjID = task.project.id;
	
	$('#taskWell > .title').html(task.project.warehouse.city.name +
			' #' + task.project.warehouse.warehouseID + 
			' - ' + task.project.projectItem.name + ' Task: ' +task.title);
	$('#taskWell > div > .description').val(task.description);
	$('#taskWell > span > .severity').val(task.severity);
	$('#taskWell > .assignedDate').html('<b>Assigned Date:</b> ' + task.assignedDate);
	$('#taskWell > span > .dueDate').val(task.dueDate);						
	$('#taskWell > .assignedBy').html('<b>Assigned By:</b> ' + task.assigner.firstName);
	$('#taskWell > span > .assignedTo').val(task.assignee.firstName);
	$('#taskWell > div > .notes').val(task.notes);
	
	$('#taskWell').slideDown();
}

function navigateToSelectedProject () {
	window.location.href = PROJECTMANAGER + '?id=' + selectedProjID;
}

function saveTaskChanges () {
	if(typeof task === 'undefined')
		return alert("No Task Selected, try reloading!");
	
	console.log(task);
	let title = task.title;
	let description = $('#taskWell > div > .description').val();
	let severity = $('#taskWell > span > .severity').val();
	let assignedDate =task.assignedDate;
	let dueDate = $('#taskWell > span > .dueDate').val();
	let assignedBy = user.id;	// changes to whoever made the update
	let assignedTo = $('#taskWell > span > .assignedTo').val();
	let notes = $('#taskWell > div > .notes').val();
	let projectID = task.project.id;
	
	if (isValidInput([dueDate])) {
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'action': 'updateTask',
				'taskID': task.id,
				'title': title,
				'project': projectID,
				'description': description,
				'assignee': assignedTo,
				'initiatedDate': assignedDate,
				'dueDate': dueDate,
				'severity': severity,
				'notes': notes
			}, complete: function (data) {
				console.log(data);
				let response = $.trim(data.responseText);
				if (response === 'UPDATED_TASK') {
					alert('Task Updated Successfully');
					window.location.href='taskBrowser.html'
				}
			}
		});
	} else {
		alert("Date Formatter Incorrectly!");
	}

}

// TODO: Honestly, this function should probably be in global.js
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

function sortByPriority () {
	console.log('ok');
}





