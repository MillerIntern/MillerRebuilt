/*
 * This document provides all of the functionality for taskBrowser.html
 * 
 */
'use strict';

let user;
let users = new Array();
let projectManagers;
let task;
let tasks;
let tasksOfInterest = new Array();
let projectsOfInterest = new Array();
let selectedProjID;

$(document).ready(function () {
    if(window.location.href.indexOf("taskReport.html") != -1) return;
	$('#taskWell > span > .dueDate').datepicker({defaultDate: getToday()});
	getUserData();
});

$(document).on('change', '#projectSearch', function(){
	if(tasks == 'undefined') {
		alert("No tasks to search through");
		return;
	} else{
		let search = document.getElementById('projectSearch').value;
		console.log("TASKS OF INTEREST = ", tasksOfInterest);
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
		console.log("TASKS OF INTEREST = ", tasksOfInterest);
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
			  user = data.responseJSON;
			  console.log("USER = ", user);
			  if(user.permission.id != 1) hideAdminContent();	 
		      getUsers();		  

				
			} else {
				console.log("GetUserData() RESPONSE = ",data);
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
			console.log("RESPONSE FROM getTasks() = ",data);			
			if (data.responseJSON) {
				tasks = data.responseJSON;
				projectsOfInterest = tasks;
				console.log("TASK ARE = ", tasks);
				let taskID = getParameterByName('id');
				if(taskID){
					console.log("TASK ID = ", taskID);
					for(var i = 0; i < tasks.length; i++) {
						tasks[i].value = tasks[i].id;
						if(tasks[i].id == taskID) expandTaskInfo(tasks[i]);
					}
				}
				preparePageForUserStatus();
			}
			else { 
				console.log("ERROR RESPONE FROM getTasks() = ", data);
				alert("Something went wrong while retrieving tasks from the server!");
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
			console.log("RESPONSE JSON FOR getUsers() = ",data.responseJSON);
			if (data.responseJSON) {
				users = data.responseJSON;
				console.log("USERS = ",users);
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
			console.log("REPONSE JSON FROM getProjectManagers() = ",data.responseJSON);
			projectManagers = data.responseJSON;
			if (data.responseJSON) {
				createManagerQueue(data.responseJSON);
			}

			else{console.log("NO RESPONSE JSON FROM getProjectManagers()");}
		}
		
	});
}

function tasksByManager()
{
	$('#formFor').html('Tasks for: ');
	console.log("tasksByManager() INVOKED");
	getProjectManagers();
	
    
}

function preparePageForUserStatus(){
	if (user.permission.id === 1) {
		 document.getElementById("projectManagerSelection").style.display = 'inline';
		 console.log("preparePageForUserStatus() INVOKED");
		 createTaskTable();
		 tasksByManager();
		 //createTaskTableByManager(tasks);
		 

	 } else { 
	 	$('#formFor').html('Tasks for: ' + user.firstName);
	 	$(".advancedSortingOptions").hide();
	 	createTaskTable();
	 }	
}



function createDropdown (json) {
	let d = document.createDocumentFragment();

	json.sort(function(a,b){
		if(a.firstName < b.firstName) return -1;
		else if(a.firstName > b.firstName) return 1;
		return 0;
	})
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
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
	console.log("taskSelector EQUALS " , selector);
	console.log("TASKS WHILE CREATING TABLE == ", tasks);
	tasks.sort(function(a,b){
		if(a.assignee.name < b.assignee.name) return -1;
		if(a.assignee.name > b.assignee.name) return 1;
		else{
			if(user.permission.id != 1){ //SORTS BY PROJECT IF USER IS NOT ADMIN
				if(a.project.warehouse.city.name < b.project.warehouse.city.name) return -1;
				if(a.project.warehouse.city.name > b.project.warehouse.city.name) return 1;
				else{
					if(a.project.projectItem.name < b.project.projectItem.name) return -1;
					if(a.project.projectItem.name > b.project.projectItem.name) return 1;
					else{
						if(a.severity < b.severity) return -1;
						if(a.severity > b.severity) return 1;
						return 0;
					}
				}
			} else{ //SORTS BY SEVERITY IF USER IS ADMIN
				if(a.severity < b.severity) return -1;
				if(a.severity > b.severity) return 1;
				else{
					if(a.project.warehouse.city.name < b.project.warehouse.city.name) return -1;
					if(a.project.warehouse.city.name > b.project.warehouse.city.name) return 1;
					else{
						if(a.project.projectItem.name < b.project.projectItem.name) return -1;
						if(a.project.projectItem.name > b.project.projectItem.name) return 1;
						return 0;
					}
				}
			}
		}  
	});
	var count = 0;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'open' && tasks[i].status.id != 1) || 
				(selector === 'complete' && tasks[i].status.id != 2) ||
				(selector === 'open_complete' && tasks[i].status.id == 3) ||
				(selector === 'closed' && tasks[i].status.id != 3)) 
				continue; // do nothing
	
        if(tasks[i].assignee == null) continue; 
		if (tasks[i].assignee.name === user.name) {  
			count++;
			tasksOfInterest.push(tasks[i]); //Adds task to the user's currently selected tasks of interest
			let taskListing = document.createElement('tr');
			taskListing.id = tasks[i].id;
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
			let status = document.createElement('td');
			let notes = document.createElement('td');

			
			
			
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
			status.innerHTML = tasks[i].status.status;
			status.align = 'center';
			notes.innerHTML = tasks[i].notes;
			
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
			$(taskListing).append(taskAssignee);
			$(taskListing).append(taskDesc);
			$(taskListing).append(createdDate);
			$(taskListing).append(dueDate);
			$(taskListing).append(severity);
			$(taskListing).append(status);
			$(taskListing).append(notes);
		
			
			$('#taskTable > tbody').append(taskListing);
		}
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function createTaskTableFromFilter(){
	console.log("PROJECTS OF INTEREST == ", projectsOfInterest);
	var count = 0;
	for (var i = 0; i < projectsOfInterest.length; i++) {
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
			let status = document.createElement('td');
			let notes = document.createElement('td');
			
			
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
			status.innerHTML = projectsOfInterest[i].status.status;
			status.align = 'center';
			notes.innerHTML = projectsOfInterest[i].notes;
			
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
			$(taskListing).append(taskAssignee);
			$(taskListing).append(taskDesc);
			$(taskListing).append(createdDate);
			$(taskListing).append(dueDate);
			$(taskListing).append(severity);
			$(taskListing).append(status);
			$(taskListing).append(notes);
			
			
			$('#taskTable > tbody').append(taskListing);
		
	}
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
	
	
}

function createProperTaskTable()
{
	clearTaskTable();
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
	console.log("this == ", param);
	if(!getParameterByName('id')) {
		let taskID = $(param).val();
		console.log(taskID);
		
		for(var i = 0; i < tasks.length; i++) {
			if(tasks[i].id === taskID) {
				task = tasks[i];
				break;
			}
		}
	} else task = param;
	console.log("expandTaskInfo() TASK === " , task);
	selectedProjID = task.project.id;
	
	$('#taskWell > .title').html(task.project.warehouse.city.name +
			' #' + task.project.warehouse.warehouseID + 
			' - ' + task.project.projectItem.name);
	$('#taskWell > #title').val(task.title);
	$('#taskWell > div > .description').val(task.description);
	$('#taskWell > span > .severity').val(task.severity);
	$('#taskWell > .assignedDate').html('<b>Assigned Date:</b> ' + task.assignedDate);
	var date = task.dueDate.split("/");
	var year = date[2];
	var yearString = year.toString();
	if(yearString[0] != '2') date[2] = yearString[2] + yearString[3];
	console.log("YEAR = ", date[2]);
	var dueDate = date[0] +"/"+date[1]+"/"+date[2];
	$('#taskWell > span > .dueDate').val(dueDate);							
	$('#taskWell > .assignedBy').html('<b>Assigned By:</b> ' + task.assigner.firstName);
	$('#taskWell > span > .assignedTo').val(task.assignee.firstName);
	$('#taskWell > span > .taskStatus').val(task.status.status);
	$('#taskWell > div > .notes').val(task.notes);
	
	$('#taskWell').slideDown();
	
}

function navigateToSelectedProject () {
	window.location.href = 'projects.html?id=' + selectedProjID;
}

function saveTaskChanges () {
	if(!$('#taskWell > #title').val() || $('#taskWell > #title').val() == ""){ alert("Tasks much have a title"); return;}
	if(!$('#taskWell > div > .description').val() || $('#taskWell > div > .description').val() == "") { alert("Tasks much have a description"); return;}
	if(typeof task === 'undefined')
		return alert("No Task Selected, try reloading!");
	
	
	
	console.log("UPDATING TASK == ", task, "USERS = ", users);
	let title = $('#taskWell > #title').val();
	let description = $('#taskWell > div > .description').val();
	let severity = $('#taskWell > span > .severity').val();
	let assignedDate =task.assignedDate;
	let dueDate = $('#taskWell > span > .dueDate').val();
	
	console.log("DUE DATE == " , dueDate);
	let date = dueDate.split("/");
	let yearString = date[2].toString();
	if(yearString.length == 2) date[2] = "20"+date[2];
	let dateString = date[0]+"/"+date[1]+"/"+date[2];
	dueDate = dateString;
	
	let assignedBy = user.id;	// changes to whoever made the update
	let assignedTo = $('#taskWell > span > .assignedTo').val();
	let taskStatus = $('#taskWell > span > .taskStatus').val();
	
	if(taskStatus == "Open") taskStatus = 1;
	else if(taskStatus == "Completed") taskStatus = 2;
	else taskStatus = 3;
	
	let notes = $('#taskWell > div > .notes').val();
	let projectID = task.project.id;
	console.log("project id is defined");
	
	for(var i = 0; i < users.length; i++){
		if(users[i].firstName == assignedTo){ assignedTo = users[i]; break;}
	}
	
	//$('#taskWell > span > .assignedTo').val(assignedTo);
	var i = 0;
	for(; i < tasks.length; i++){
		if(tasks[i].id == task.id)
		{ 
		  tasks[i].title = title;
		  tasks[i].description = description;
		  tasks[i].severity = severity;
		  tasks[i].dueDate = dueDate;
		  tasks[i].assignee = assignedTo;
		  tasks[i].status.id = taskStatus;
		  if(tasks[i].status.id == 1) tasks[i].status.status = 'Open';
		  else if(tasks[i].status.id == 2) tasks[i].status.status = 'Completed';
		  else  tasks[i].status.status = 'Closed';
		  tasks[i].notes = notes;
		break;}
		
	}
	for(i=0; i < projectsOfInterest.length; i++){
		if(projectsOfInterest[i].id == task.id){ 
			  projectsOfInterest[i].title = title;
			  projectsOfInterest[i].description = description;
			  projectsOfInterest[i].severity = severity;
			  projectsOfInterest[i].dueDate = dueDate;
			  projectsOfInterest[i].assignee = assignedTo;
			  projectsOfInterest[i].status.id = taskStatus;
			  if(projectsOfInterest[i].status.id == 1) projectsOfInterest[i].status.status = 'Open';
			  else if(projectsOfInterest[i].status.id == 2) projectsOfInterest[i].status.status = 'Completed';
			  else  projectsOfInterest[i].status.status = 'Closed';
			  projectsOfInterest[i].notes = notes;
			
			break;}
		}
	
	for(i=0; i < tasksOfInterest.length; i++){
		if(tasksOfInterest[i].id == task.id){
			 tasksOfInterest[i].title = title;
			 tasksOfInterest[i].description = description;
			 tasksOfInterest[i].severity = severity;
			 tasksOfInterest[i].dueDate = dueDate;
			 tasksOfInterest[i].assignee = assignedTo;
			 tasksOfInterest[i].status.id = taskStatus;
			 if(tasksOfInterest[i].status.id == 1) tasksOfInterest[i].status.status = 'Open';
			 else if(tasksOfInterest[i].status.id == 2) tasksOfInterest[i].status.status = 'Completed';
			 else  tasksOfInterest[i].status.status = 'Closed';
			 tasksOfInterest[i].notes = notes;
			break;}
		}
	
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
				'assignee': assignedTo.firstName,
				'initiatedDate': assignedDate,
				'dueDate': dueDate,
				'severity': severity,
				'status': taskStatus,
				'notes': notes
			}, complete: function (data) {
				console.log("DATA AFTER TASK SAVE == ", data);
				let response = $.trim(data.responseText);
				if (response === 'UPDATED_TASK') {
					alert('Task Updated Successfully');
					$('#taskWell').slideUp();
					clearTaskTable();
					createProperTaskTable();
				}
			}
		});
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

			alert("DATE ERROR:\n\nDates must be in the following format: mm/dd/yyyy");
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
	printTasks(projectsOfInterest);
	
 
}

function printTasks(projectsOfInterest) {
	console.log("PROJECTS OF INTEREST  ==== ", projectsOfInterest);
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



function sendTaskAlert(data)
{
   	console.log("IN: new sendMail()");
   	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendTaskAlert',
		}, complete: function (response) {
			console.log("RESPONSE FROM sendMail() = ",response);			
			if (response.responseJSON) {
				console.log(response);
			}
			else { 
				console.log("ERROR RESPONE FROM sendTaskAlert() = ", response);
			}
			
		}
	});
}




