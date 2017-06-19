/*
 * This document provides all of the functionality for taskBrowser.html
 * 
 */
'use strict';

let user;
let projectManagers;
let task;
let tasks;
let tasksOfInterest = new Array();
let projectsOfInterest = new Array();
let selectedProjID;

$(document).ready(function () {
    if(window.location.href.indexOf("taskReport.html") != -1) return;
	$('#taskWell > span > .dueDate').datepicker();
    getUserData();
});

$(document).on('change', '#projectSearch', function(){
	if(tasks == 'undefined') {
		alert("No tasks to search through");
		return;
	} else{
		let search = document.getElementById('projectSearch').value;
		console.log("tasks = ", tasksOfInterest);
		console.log("projects of interest = ", projectsOfInterest);
		projectsOfInterest = new Array();
		searchProjects(search);
		clearTaskTable();
		createTaskTableFromFilter(projectsOfInterest);
		
	}
	
});

$(document).on('change', '#descriptionSearch', function(){
	if(tasks == 'undefined') {
		alert("No tasks to search through");
		return;
	} else{
		let search = document.getElementById('descriptionSearch').value;
		console.log("tasks = ", tasksOfInterest);
		console.log("projects of interest = ", projectsOfInterest);
		projectsOfInterest = new Array();
		searchDescriptions(search);
		clearTaskTable();
		createTaskTableFromFilter(projectsOfInterest);
		
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
			if(data.responseJSON) {
			  console.log("data for user = ", data.responseJSON);
			  user = data.responseJSON;
			  console.log("data for USER = ", user);
		      getUsers();		  

				
			} else {
				console.log("user data = ",data);
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
	
    
}


function getTasks() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getTasks',
		}, complete: function (data) {
			console.log("got the tasks",data);			
			if (data.responseJSON) {
				tasks = data.responseJSON;
				projectsOfInterest = tasks;
				console.log("tasks ARE = ", tasks);
				preparePageForUserStatus();
			}
			else { 
				console.log("data = ", data);
				alert("Somethinh went wrong while retrieving tasks from the server!");
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
			console.log("response JSON = ",data.responseJSON);
			if (data.responseJSON) {
				createDropdown(data.responseJSON);
				getTasks();
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
			console.log("data in project managers = ",data);
			console.log("manager JSON = ", data.responseJSON);
			projectManagers = data.responseJSON;
			if (data.responseJSON) {
				createManagerQueue(data.responseJSON);
			}

			else{console.log("no response JSON");}
		}
		
	});
}

function preparePageForUserStatus(){
	if (user.permission.id === 1) {
		 document.getElementById("projectManagerSelection").style.display = 'inline';
		 console.log("into the selection");
		 createTaskTable();
		 tasksByManager();

	 } else { 
	 	$('#formFor').html('Tasks for: ' + user.firstName);
	 	$(".advancedSortingOptions").hide();
	 	createTaskTable();
	 }	
}



function createDropdown (json) {
	let d = document.createDocumentFragment();
	console.log("length = ",json.length);
	json.sort(function(a,b){
		if(a.firstName < b.firstName) return -1;
		else if(a.firstName > b.firstName) return 1;
		return 0;
	})
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		console.log("creating drop down");
		// when users store both username and name, access the user's name and username fields
		option.innerHTML = json[i].firstName;
		option.setAttribute("value", json[i].firstName);
		option.setAttribute("id", json[i].firstName + "Option");
		d.appendChild(option);
	}
	$('#taskWell > span > .assignedTo').append(d);
	
	
}

function createTaskTable () {
	tasksOfInterest = new Array();
	let selector = $('#taskSelector').val();
	console.log(selector);
	console.log("tasks == ", tasks);
	var count = 0;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'incomplete' && tasks[i].completed) || 
				(selector === 'complete' && !tasks[i].completed)) 
				continue; // do nothing
        if(tasks[i].assignee == null) continue; 
		if (tasks[i].assignee.name === user.name) {  
			count++;
			tasksOfInterest.push(tasks[i]); //Adds task to the user's currently selected tasks of interest
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
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function createTaskTableFromFilter(){
	console.log("projects of interest == ", projectsOfInterest);
	var count = 0;
	for (var i = 0; i < projectsOfInterest.length; i++) {
		console.log(projectsOfInterest[i].assignee.name + ' ' + user.name);
			count++;
			let taskListing = document.createElement('tr');
			taskListing.value = projectsOfInterest[i].id;
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
			closeButton.value = projectsOfInterest[i].id;
			console.log("the tasks areeee",tasks);
			closeButton.onclick = function () {
				closeTaskById(this);
			};
			
			projectDetails.innerHTML = projectsOfInterest[i].project.warehouse.city.name + 
						' #' + projectsOfInterest[i].project.warehouse.warehouseID +
						' - ' + projectsOfInterest[i].project.projectItem.name;
			taskTitle.innerHTML = projectsOfInterest[i].title;
			taskAssignee.innerHTML = projectsOfInterest[i].assignee.firstName;
			taskDesc.innerHTML = projectsOfInterest[i].description;
			createdDate.innerHTML = projectsOfInterest[i].assignedDate;
			dueDate.innerHTML = projectsOfInterest[i].dueDate;
			severity.innerHTML = projectsOfInterest[i].severity;
			severity.align = 'center';
			notes.innerHTML = projectsOfInterest[i].notes;
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

function searchProjects(searchQuery){
	for(var i=0; i<tasksOfInterest.length; i++){
		let contentToSearchThrough = tasksOfInterest[i].project.warehouse.city.name + 
		' #' + tasksOfInterest[i].project.warehouse.warehouseID +
		' - ' + tasksOfInterest[i].project.projectItem.name;
		if(contentToSearchThrough.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1) projectsOfInterest.push(tasksOfInterest[i]);
	}
}

function searchDescriptions(searchQuery){
	for(var i=0; i<tasksOfInterest.length; i++){
		let contentToSearchThrough = tasksOfInterest[i].description;
		if(contentToSearchThrough.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1) projectsOfInterest.push(tasksOfInterest[i]);
	}
}



function clearTaskTable () {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
}

function printButton(){
	
	if(!projectsOfInterest) {
		alert("No tasks to print!");
		return;
		}
	console.log("MOVING");
	printTasks(projectsOfInterest);
	
 
}

function printTasks(projectsOfInterest) {
	console.log("Projects  ==== ", projectsOfInterest);
	document.body.innerHTML="";
    document.body.style.backgroundColor = "white";
	var div = document.createElement("div");
	div.id = "insertTable";
	var title = document.createElement("h1");
	title.innerHTML = "Task Report";
	title.align = 'center';
	var table = document.createElement("Table");
	table.id = "table"
    table.class = "table";
	table.border ="1px solid black";
	
	
	var indexCol = document.createElement("col");
	indexCol.style = "width: 5%";
	var projCol = document.createElement("col");
	projCol.style ="width: 15%";
	var taskCol = document.createElement("col");
	taskCol.style ="width: 11%";
	var assigneeCol = document.createElement("col");
	assigneeCol.style ="width: 10%";
	var descriptionCol = document.createElement("col");
	descriptionCol.style ="width: 25%";
	var createdCol = document.createElement("col");
	createdCol.style ="width: 11%";
	var dueCol = document.createElement("col");
	dueCol.style ="width: 11%";
	var priorityCol = document.createElement("col");
	priorityCol.style ="width: 7%";
	var notesCol = document.createElement("col");
	notesCol.style ="width: 25%";
	table.appendChild(indexCol);
    table.appendChild(projCol);
    table.appendChild(taskCol);
    table.appendChild(assigneeCol);
    table.appendChild(descriptionCol);
    table.appendChild(createdCol);
    table.appendChild(dueCol);
    table.appendChild(priorityCol);
    table.appendChild(notesCol);
	
	var head = table.createTHead();
	head.id = "tableHeader";
	var headRow = table.insertRow();
	headRow.id = "head";
	var indexHead = document.createElement("th");
	indexHead.innerHTML = "Index";
	indexHead.align = 'center';
	var projectHead = document.createElement("th");
	projectHead.innerHTML = "Project";
	projectHead.align = 'center';
	var taskHead = document.createElement("th");
	taskHead.innerHTML = "Task";
	taskHead.align = 'center';
	var assigneeHead = document.createElement("th");
	assigneeHead.innerHTML = "Assignee";
	assigneeHead.align = 'center';
	var descriptionHead = document.createElement("th");
	descriptionHead.innerHTML = "Description";
	descriptionHead.align = 'center';
	var createdHead = document.createElement("th");
	createdHead.innerHTML = "Created";
	createdHead.align = 'center';
	var dueHead = document.createElement("th");
	dueHead.innerHTML = "Due";
	dueHead.align = 'center';
	var priorityHead = document.createElement("th");
	priorityHead.innerHTML = "Priority";
	priorityHead.align = 'center';
	var notesHead = document.createElement("th");
	notesHead.innerHTML = "Notes";
	notesHead.align = 'center';
	document.body.appendChild(div);
	document.getElementById("insertTable").appendChild(title);
	document.getElementById("insertTable").appendChild(table);
	document.getElementById("table").setAttribute("border-spacing", "8px");
	document.getElementById("table").setAttribute("border-collapse", "separate");
	document.getElementById("table").appendChild(head);
	document.getElementById("tableHeader").appendChild(headRow);
	document.getElementById("head").appendChild(indexHead);
	document.getElementById("head").appendChild(projectHead);
	document.getElementById("head").appendChild(taskHead);
	document.getElementById("head").appendChild(assigneeHead);
	document.getElementById("head").appendChild(descriptionHead);
	document.getElementById("head").appendChild(createdHead);
	document.getElementById("head").appendChild(dueHead);
	document.getElementById("head").appendChild(priorityHead);
	document.getElementById("head").appendChild(notesHead);
	console.log("projects of interest length = ",projectsOfInterest.length);
	var count = 0;
	for(var i = 0;i<projectsOfInterest.length; i++){
		count++;
		var row = table.insertRow();
		var index = row.insertCell();
		index.align = "center";
		var project = row.insertCell();
		project.align = "center";
		var task = row.insertCell();
		task.align = 'center';
		var assignee = row.insertCell();
		assignee.align = 'center';
		var description = row.insertCell();
		description.align = 'center';
		var created = row.insertCell();
		created.align = 'center';
		var due = row.insertCell();
		due.align = 'center';
		var priority = row.insertCell();
		priority.align = 'center';
		var notes = row.insertCell();

		index.innerHTML = (count);
		project.innerHTML = projectsOfInterest[i].project.warehouse.city.name + 
		' #' + projectsOfInterest[i].project.warehouse.warehouseID +
		' - ' + projectsOfInterest[i].project.projectItem.name;
		task.innerHTML =  projectsOfInterest[i].title;
		assignee.innerHTML = projectsOfInterest[i].assignee.firstName;
		description.innerHTML = projectsOfInterest[i].description;
		created.innerHTML = projectsOfInterest[i].assignedDate;
		due.innerHTML = projectsOfInterest[i].dueDate;
		priority.innerHTML = projectsOfInterest[i].severity;
		priority.align = 'center';
		notes.innerHTML = projectsOfInterest[i].notes;
		
		row.appendChild(index);
		row.appendChild(project);
		row.appendChild(task);
		row.appendChild(assignee);
		row.appendChild(description);
		row.appendChild(created);
		row.appendChild(due);
		row.appendChild(priority);
		row.appendChild(notes);
		table.appendChild(row);
	}
	
	
	window.print();
	
}




