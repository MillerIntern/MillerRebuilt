'use strict';

let user;
let task;
let tasks;
let sorts;
let selectedProjID;


$(document).ready(function () {
	$('#taskWell > span > .dueDate').datepicker();
});



$(document).on('change', '.sortSelection', function () {	
	console.log("in itttttt");
	console.log(document.getElementById("sortSelector").value);
	basicUserSort();
});

$(document).on('click', '#advancedSort', function (){
	console.log("clickig");
	$('.advancedSortingOptions').show();
});

$(document).on('click', '#secondaryKey', function (){
	if(document.getElementById('primaryKey').value == 'none') alert("need a primary key");
});

$(document).on('click', '#tertiaryKey', function (){
	if(document.getElementById('primaryKey').value == 'none') {alert("need a primary key"); return;}
	else if(document.getElementById('secondaryKey').value == 'none') alert("need a secondary key");
});

$(document).on('click', '#advancedSortButton', function(){
	if(document.getElementById('primaryKey').value == 'none') {alert("need a primary key before sorting"); return;}
	else if(document.getElementById('primaryKey').value == document.getElementById('secondaryKey').value
            || document.getElementById('secondaryKey').value == document.getElementById('tertiaryKey').value
            || document.getElementById('primaryKey').value == document.getElementById('tertiaryKey').value) {
		alert("Keys cannot have same value");
	    return;
	}
	
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
					document.getElementById("projectManagerSelection").style.display = 'inline';
					
					tasksByManager();
			    
				} else { 
					$('#formFor').html('Tasks for: ' + user.firstName);
					$(".advancedSortingOptions").hide();
				}
				getTasks();

				
			} else {
				alert('Server Failure!');
				
			}
		}
	});
}

function tasksByManager()
{
	$('#formFor').html('Tasks for: ');
	console.log("getting users");
	getProjectManagers();
	
	//getTasksByManager();
    
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
				clearTaskTable();
				createProperTaskTable();
				console.log("users = ", user);
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

function getProjectManagers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectManagers',
		}, complete: function (data) {
			console.log("Gettting project managersssss");
			console.log(data);
			if (data.responseJSON) {
				createManagerQueue(data.responseJSON);
			}
		}
		
	});
}



function createDropdown (json) {
	let d = document.createDocumentFragment();
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		console.log("creating drop down");
		// when users store both username and name, access the user's name and username fields
		option.innerHTML = json[i];
		option.setAttribute("value", json[i]);
		option.setAttribute("id", json[i] + "Option");
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
			let taskAssignee = document.createElement('td');
			let taskDesc = document.createElement('td');
			let createdDate = document.createElement('td');
			let dueDate = document.createElement('td');
			let severity = document.createElement('td');
			let notes = document.createElement('td');
			let closeTask = document.createElement('td');
			
			let closeButton = document.createElement('button');
			closeButton.innerHTML = 'Close'
			closeButton.classname = 'btn';
			closeButton.value = tasks[i].id;
			console.log("the tasks areeee",tasks);
			closeButton.onclick = function () {
				closeTaskById(this);
			};
			
			projectDetails.innerHTML = tasks[i].project.warehouse.city.name + 
						' #' + tasks[i].project.warehouse.warehouseID +
						' - ' + tasks[i].project.projectItem.name;
			taskTitle.innerHTML = tasks[i].title;
			taskAssignee.innerHTML = tasks[i].assignee.firstName;
			taskDesc.innerHTML = tasks[i].description;
			createdDate.innerHTML = tasks[i].assignedDate;
			dueDate.innerHTML = tasks[i].dueDate;
			severity.innerHTML = tasks[i].severity;
			severity.align = 'center';
			notes.innerHTML = tasks[i].notes;
			closeTask.appendChild(closeButton);
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
			$(taskListing).append(taskAssignee);
			$(taskListing).append(taskDesc);
			$(taskListing).append(createdDate);
			$(taskListing).append(dueDate);
			$(taskListing).append(severity);
			$(taskListing).append(notes);
			$(taskListing).append(closeTask);
			
			$('#taskTable > tbody').append(taskListing);
		}
	}
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function createProperTaskTable()
{
	if(user.permission.id != 1){
		createTaskTable();
	} else {
		establishManagersOfInterest();
		createTaskTableByManager(tasks);
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

function basicUserSort() 
{
	if(document.getElementById("sortSelector").value == 'none') return;
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
	if(document.getElementById("sortSelector").value == 'assignee' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByAssigneeAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByAssigneeDescending();
		}
		console.log("sorting by assignee");
	}
}

function sortByAssigneeAscending()
{
	tasks.sort(function(a,b){
	if(a.assignee.firstName < b.assignee.firstName) return -1;
	if(a.assignee.firstName > b.assignee.firstName) return 1;
	return 0;
	})
	clearTaskTable();
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    else{
    	console.log("Unprepared for this ELSE condition");
    }
	
}

function sortByAssigneeDescending()
{
	tasks.sort(function(a,b){
	if(a.assignee.firstName < b.assignee.firstName) return 1;
	if(a.assignee.firstName > b.assignee.firstName) return -1;
	return 0;
	})
	clearTaskTable();
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    else{
    	console.log("Unprepared for this ELSE condition");
    }
}

function sortByDateAscending() 
{
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
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    
    else{
    	console.log("Unprepared for this ELSE condition");
    }
    		
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
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    else{
    	console.log("Unprepared for this ELSE condition");
    }
    		
 }
    

function sortByPriorityAscending() {
	console.log(tasks);  
	console.log("user = ");
	console.log(user);
		tasks.sort(function(a,b){
		  if (a.severity < b.severity) return -1;
		  if (a.severity > b.severity) return 1;
		  return 0;
		});
	clearTaskTable();
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    
    else{
    	console.log("Unprepared for this ELSE condition");
    }
}

function sortByPriorityDescending() {
	console.log(tasks);  
		tasks.sort(function(a,b){
		  if (a.severity < b.severity) return 1;
		  if (a.severity > b.severity) return -1;
		  return 0;
		});
	clearTaskTable();
    if(user.permission.id != 1) createTaskTable(tasks);
    else if(user.permission.id == 1) createTaskTableByManager(tasks);
    else{
    	console.log("Unprepared for this ELSE condition");
    }
}

function advancedSortValidation(){
	console.log("advanced validation!!");
}

function clearTaskTable () {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
}




