'use strict';

let user;
let task;
let tasks;
let selectedProjID;

$(document).ready(function () {
	$('#taskWell > span > .dueDate').datepicker();
});

$(document).on('change', '#taskSelector', function () {
	clearTaskTable();
	$('#notes').show();
	createTaskTable(tasks);
});

$(document).on('change', '#sortSelector', function () {
	
	console.log("in itttttt");
	console.log(document.getElementById("sortSelector").value);
	if(document.getElementById("sortSelector").value == 'priority' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByPriorityAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByPriorityDescending();
		}
	}
	if(document.getElementById("sortSelector").value == 'date' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByDateAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByDateDescending();
		}
		console.log("Right hizzzzer");
	}
	
   // clearTaskTable();
	//createTaskTable(tasks);
	
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
				
				if (user.permission.id === 1) {
					// show the admin dropdown
				}
				
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
	let selector = $('#taskSelector').val();
	console.log(selector);
	console.log(tasks);
	var count = 0;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'incomplete' && tasks[i].completed) || 
				(selector === 'complete' && !tasks[i].completed)) 
				continue; // do nothing
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
			
			$('#taskTable > tbody').append(taskListing);
		}
	}
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function clearAndAddSingleRow(msg) {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
	
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
	
	$('#taskTable > tbody').append(placeHolder);
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
	console.log("project id is defined");
	
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

function sortByDateAscending() {
	console.log(tasks); 
    tasks.sort(function(a,b){
      var dateA, dateB;
      dateA = a.dueDate.split("/");
      dateB = b.dueDate.split("/");
      if(dateA[2] < dateB[2]) return -1;
      if(dateA[2] > dateB[2]) return 1;
      if(dateA[0] < dateB[0]) return -1;
      if(dateA[0] > dateB[0]) return 1;
      if(dateA[1] < dateB[1]) return -1;
      if(dateA[1] > dateB[1]) return 1;
      return 0;
    })
    console.log("post sort");
    console.log(tasks); 	
    clearTaskTable();
	$('#notes').show();
	createTaskTable(tasks);
    		
    }

function sortByDateDescending() {
	console.log(tasks); 
    tasks.sort(function(a,b){
      var dateA, dateB;
      dateA = a.dueDate.split("/");
      dateB = b.dueDate.split("/");
      if(dateA[2] < dateB[2]) return 1;
      if(dateA[2] > dateB[2]) return -1;
      if(dateA[0] < dateB[0]) return 1;
      if(dateA[0] > dateB[0]) return -1;
      if(dateA[1] < dateB[1]) return 1;
      if(dateA[1] > dateB[1]) return -1;
      return 0;
    })
    console.log("post sort");
    console.log(tasks); 	
    clearTaskTable();
	$('#notes').show();
	createTaskTable(tasks);
    		
    }
    
function sortByPriority () {
	if (ascendingPriority) {
		sortByPriorityAscending();
	} else {
		sortByPriorityDescending();
	}
}


	/**
	 * tasks.sort(function(a,b){
		  if (a.severity < b.severity) return -1;
		  if (a.severity > b.severity) return 1; return 0;
		});
		
		*/

function sortByPriorityAscending() {
	console.log(tasks);  
		tasks.sort(function(a,b){
		  if (a.severity < b.severity) return -1;
		  if (a.severity > b.severity) return 1; return 0;
		});
		
		clearTaskTable();
		$('#notes').show();
		createTaskTable(tasks);
}

function sortByPriorityDescending() {
	console.log(tasks);  
		tasks.sort(function(a,b){
		  if (a.severity < b.severity) return 1;
		  if (a.severity > b.severity) return -1; return 0;
		});
		
		clearTaskTable();
		$('#notes').show();
		createTaskTable(tasks);
}

function clearTaskTable () {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
}




