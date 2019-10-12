/* This document provides all of the functionality for taskBrowser.html
 * 
 */
'use strict';

let user;
let users = new Array();
let projectManagers;
let subcontractors;
let task;
let tasks;
let tasks1;
let tasksOfInterest = new Array();
let projectsOfInterest = new Array();
let selectedProjID;
let taskAssigneeType = "EMPLOYEE";
let TASK_EMPLOYEE_ASSIGNEE = "EMPLOYEE";
let TASK_SUB_ASSIGNEE = "SUBCONTRACTOR";


////////////////////////////////////////////////////////////////////////
let TASK_OBJECT1 = {
		WAREHOUSES1 : new Array(), 
		_WAREHOUSES1 : new Array ,
		ITEMS1 : new Array() ,
		_ITEMS1 : new Array() ,
		PROJ_IDS1 : new Array() ,
		PERSONS1 : new Array() ,
		_PERSONS1 : new Array() ,
		SUBS1 : new Array() ,
		_SUBS1 : new Array() ,
		TASKS1 : undefined ,
		USERS1 : new Array() ,
		_USERS1 : new Array() ,
}

let UNIQUE_IDS1 = new Array();
let PROJECT_FIELDS1;

let beginTime1;
let endTime1;
////////////////////////////////////////////////////////////////////////



$(document).ready(function () {
    if(window.location.href.indexOf("taskReport.html") != -1) return;
	$('#taskWell > span > .dueDate').datepicker({defaultDate: getToday()});
	getTheTasks();
//	getMasterScopes();
	//getUserData(); //Gets the User from the database on page load
});

/*
 * This event handler is triggered when someone enters a search into
 * either the project or description search bar and then 
 */
$(document).on('keydown', '.taskSearcher', function(){
	console.log('THIS DESC= ', this);
	if(tasks == 'undefined') {
		alert("No tasks to search through");
		return;
	} else{
		let searchQuery;
		console.log("TASKS OF INTEREST = ", tasksOfInterest);
		projectsOfInterest = new Array();
		
		if(this.id == "projectSearch")
		{
			searchQuery = $('#projectSearch').val();
			searchProjects(searchQuery);	
		} 
		else  //If it doesnt equal projectSearch it equals descriptionSearch
		{
			searchQuery = $('#descriptionSearch').val();
			searchDescriptions(searchQuery);
		}		
		clearTaskTable();
		createTaskTableFromFilter(projectsOfInterest);		
	}
	
});

$(document).ready(function(){
	$('#updateTask').click(function(){
		var filter = $('#taskSelector').val();
		console.log(filter);
		saveTaskChanges(filter);
	});
});
	

function getMasterScopes()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getMasterScopes',
			'id': 0
		
		}, complete: function (data) {
			console.log("data", data.responseJSON);
			var dat = data.responseJSON;
			for(var i = 0; i < dat.length; i++)
			{
				var json = dat[i];
				console.log(json[0]);
			    getProjItem(json[0]);				
			}
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function fillNavScopeDropdowns(data)
{		
	console.log(data);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < data.length; i++)
	{
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = data[i].name;
		a.setAttribute("value", data[i].id);
		a.setAttribute("href", "masterScope.html?projItem=" + data[i].id);
		a.setAttribute("onmouseover", "style='background-color: rgb(42, 112, 224); color: white'");
		a.setAttribute("onmouseout", "style='background-color: none;'");
		li.appendChild(a);
		d.appendChild(li);
	}

	$('#dropdown').append(d);
	
}

function getProjItem(id)
{
	console.log("get proj item", id);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectItem',
			'id': id
		
		}, complete: function (data) {
			console.log("projItem: ", data.responseJSON);
			fillNavScopeDropdowns(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

/**
 * This function gets the current user from the database
 * INNER FUNCTION CALLS: getUsers()
 */
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
			  console.log("USER = ", data.responseJSON);
			  if(data.responseJSON.permission.canAccessAdminPage == false) hideAdminContent();	
		      getUsers();		 
				
			} else {
				console.log("GetUserData() RESPONSE = ",data);
				alert('Server Failure!');
				
			}
		}
	}); 
}

/**
 * This function gets all Miller users from the database
 * INNER FUNCTION CALLS: createDropdown(), getTasks()
 */
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
				preparePageForUserStatus();
			}
		}
		
	});	
}

/**
 * This function gets all tasks from the database
 * It also handles if the user navigated to the page from
 * a certain project in projects.html
 * 
 * INNER FUNCTION CALLS: getParameterByName(), expandTaskInfo(), 
 * 						preparePageForUserStatus()
 */
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



/**
 * This function gets all projectManagers from the database
 * 
 * INNER FUNCTION CALLS: createManagerQueue() 
 */
function getProjectManagers () {
	/*
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
				//createManagerQueue(data.responseJSON);
				getSubcontractors();
			}

			else{console.log("NO RESPONSE JSON FROM getProjectManagers()");}
		}
		
	});
	*/
	projectManagers = TASK_OBJECT.PERSONS;
	console.log(projectManagers);
	getSubcontractors();
	
}

function getSubcontractors() {
	/*
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSubcontractors',
		}, complete: function (data) {
			console.log("REPONSE JSON FROM getSubcontractors() = ",data.responseJSON);
			subcontractors = data.responseJSON;
			if (data.responseJSON) {
				if(user.permission.canAccessAdminPage === true) createManagerQueue();
				createSubDropdown(data.responseJSON);
			}

			else{console.log("NO RESPONSE JSON FROM getSubcontractors()");}
		}
		
	});
	*/
	subcontractors = TASK_OBJECT.SUBS;
	
		if(user.permission.canAccessAdminPage === true) createManagerQueue();
		createSubDropdown(TASK_OBJECT.SUBS);
}

function createSubDropdown (json) {
	let d = document.createDocumentFragment();
	
	json.sort(function(a,b){
		if(a.name < b.name) return -1;
		else if(a.name > b.name) return 1;
		return 0;
	});
	
	for (var i = 0; i < json.length; i++) {
		let option = document.createElement('option');
		// when users store both username and name, access the user's name and username fields
		option.innerHTML = json[i].name;
		option.setAttribute("value", json[i].name);
		option.setAttribute("id", json[i].name + "Option");
		d.appendChild(option);
	}
	$('#subcontractorsDropdown').append(d);
}


/**
 * This function prepares the page for if the user
 * has admin privileges or if they have the usual privileges
 * 
 * INNER FUNCTION CALLS: createTaskTable(), tasksByManager() 
 */
function preparePageForUserStatus(){
	$('#taskSelector').chosen({ width: "210px" });
	$('#sortSelector').chosen({ width: "210px" });
	$('#sortOrder').chosen({ width: "210px" });

	if(user.permission.canAccessAdminPage === true) 
	{
		 $("#projectManagerDropdown").show();
		 console.log("preparePageForUserStatus() INVOKED");
	} 
	else 
	{ 
	 	$('#formFor').html('Tasks for: ' + user.firstName);
	 	$("#projectManagerDropdown").hide()
	 	$(".advancedSortingOptions").hide();
	 	console.log(user.firstName);
	}	
	
	createTaskTable();
	tasksByManager();
}

/**
 * This function probably really isn't needed but I like it
 * because it points you in the direction that the page is going
 * All it does is set the header of the page
 * 
 * INNER FUNCTION CALLS: getProjectManagers()
 */
function tasksByManager()
{
	$('#formFor').html('Tasks for: ');
	console.log("tasksByManager() INVOKED");
	getProjectManagers();   
}

/**
 * This fills the task feature drop downs
 * 
 * INNER FUNCTION CALLS: NONE
 */
function createDropdown (json) {
	let d = document.createDocumentFragment();

	json.sort(function(a,b){
		if(a.firstName < b.firstName) return -1;
		else if(a.firstName > b.firstName) return 1;
		return 0;
	})
	for (var i = 0; i < json.length; i++) {
		if(json[i].firstName == "Bart") continue;
		let option = document.createElement('option');
		// when users store both username and name, access the user's name and username fields
		option.innerHTML = json[i].firstName;
		option.setAttribute("value", json[i].firstName);
		option.setAttribute("id", json[i].firstName + "Option");
		d.appendChild(option);
	}
	$('#taskWell > span > .assignedTo').append(d);
	
	
}


/**
 * This function creates the task table.  It initially sorts
 * the tasks as well.  It then displays all of the applicable tasks
 * in the table
 * 
 * INNER FUNCTION CALLS: clearAndAddSingleRow()
 */
function createTaskTable () {
	tasksOfInterest = new Array();
	let selector = $('#taskSelector').val();
	console.log("taskSelector EQUALS " , selector);
	console.log("TASKS WHILE CREATING TABLE == ", tasks);
	tasks.sort(function(a,b){
		if(a.assignee && b.assignee) {
			if(a.assignee.name < b.assignee.name) return -1;
			if(a.assignee.name > b.assignee.name) return 1;
		} 
		else if(a.assignee && b.subAssignee) {
			if(a.assignee.name < b.subAssignee.name.toLowerCase()) return -1;
			if(a.assignee.name > b.subAssignee.name.toLowerCase()) return 1;
		}
		else if(a.subAssignee && b.assignee) {
			if(a.subAssignee.name.toLowerCase() < b.assignee.name) return -1;
			if(a.subAssignee.name.toLowerCase() > b.assignee.name) return 1;
		}
		else if(a.subAssignee && b.subAssignee) {
			if(a.subAssignee.name.toLowerCase() < b.subAssignee.name.toLowerCase()) return -1;
			if(a.subAssignee.name.toLowerCase() > b.subAssignee.name.toLowerCase()) return 1;
		}
		else{
			if(user.permission.canAccessAdminPage == false){ //SORTS BY PROJECT IF USER IS NOT ADMIN
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
	console.log("task length", tasks.length);
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
			addTaskToTable(tasks[i]);
		}
	//	console.log(tasks[i]);
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

/**
 * This function creates the task table with from a
 * certain filter
 * 
 * INNER FUNCTION CALLS: clearAndAddSingleRow()
 */
function createTaskTableFromFilter(){
	console.log("PROJECTS OF INTEREST == ", projectsOfInterest);
	var count = 0;
	for (var i = 0; i < projectsOfInterest.length; i++) {
			count++;
			addTaskToTable(projectsOfInterest[i]);
	}
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
	
	
}

/**
 * This function creates the task table with from a
 * certain filter
 * 
 * INNER FUNCTION CALLS: clearAndAddSingleRow()
 */
function createTaskTableFromFilter(){
	console.log("PROJECTS OF INTEREST == ", projectsOfInterest);
	var count = 0;
	for (var i = 0; i < projectsOfInterest.length; i++) {
			count++;
			let taskListing = document.createElement('tr');
			console.log("PROJ IDDDDDD = ", projectsOfInterest[i].id);
			taskListing.id = projectsOfInterest[i].id;
			taskListing.value = projectsOfInterest[i].id;
			taskListing.onclick = function () { 
				expandTaskInfo(this); 
			}; 
			
			let projectDetails = document.createElement('td');
			let taskTitle = document.createElement('td');
			let taskMCS = document.createElement('td');
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
			taskMCS.innerHTML = projectsOfInterest[i].assignee.firstName;
			taskAssignee.innerHTML = projectsOfInterest[i].subAssignee.name;

			taskDesc.innerHTML = projectsOfInterest[i].description;
			createdDate.innerHTML = projectsOfInterest[i].assignedDate;
			dueDate.innerHTML = projectsOfInterest[i].dueDate;
			severity.innerHTML = projectsOfInterest[i].severity;
			status.innerHTML = projectsOfInterest[i].status.status;
			notes.innerHTML = projectsOfInterest[i].notes;
			
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
			$(taskListing).append(taskMCS);
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


/**
 * This function decides if the task table should be
 * created with regards to the manager queue or not
 * 
 * INNER FUNCTION CALLS: clearTaskTable() 
 *                createTaskTable() OR [ establishManagersOfInterest() and createTaskTableByManager() ]
 */
function createProperTaskTable()
{
	$('#projectSearch').val("");
	$('#descriptionSearch').val("");
	clearTaskTable();
	if(user.permission.canAccessAdminPage == false){
		createTaskTable();
	} else {
		establishManagersOfInterest();
		createTaskTableByManager(tasks);
	}
}

function createProperTaskTable1()
{
	$('#projectSearch').val("");
	$('#descriptionSearch').val("");
	clearTaskTable();
	if(user.permission.canAccessAdminPage == false){
		createTaskTable();
	} else {
		establishManagersOfInterest();
		console.log("Logged complete tasks ",tasks);
		refreshTasks();
//		tasks = tasks1;
//		
//		console.log("No, I came First");
//		console.log("Logged New complete tasks ",tasks);
//		createTaskTableByManager(tasks);
	}
}

/**
 * This function clears the task table and 
 * adds one row with a message
 * 
 * INNER FUNCTION CALLS: NONE
 */
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

/**
 * This function collapse the well that
 * displays the task info
 * 
 * INNER FUNCTION CALLS: NONE
 */
function collapseWell() {
	if(task.notes !== $('#taskWell > div > .notes').val() || 
		task.description !== $('#taskWell > div > .description').val() || 
		task.severity != $('#taskWell > span > .severity').val() || 
		task.dueDate !== $('#taskWell > span > .dueDate').val() || 
	
		((task.assignee && task.assignee.firstName !== $('#taskWell > span > .assignedTo').val()) ||
		(task.subAssignee && task.subAssignee.name !== $('#taskWell > span > .assignedTo').val()))) {
		if (!confirm("Collapsing Will Remove Task Changes! Continue?")) {
			return;
		}
	}
	
	$('#taskWell').slideUp();
	
	window.scroll(0,findPos(document.getElementById(task.id))); //This scrolls back to the task
																//that was being displayed in the
																//task well
	
}

function findPos(obj) {
	if(!obj) return 0;
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

/**
 * This function expands the task info to display
 * in the task well
 * 
 * INNER FUNCTION CALLS: NONE
 */
function expandTaskInfo(param) {
	console.log("this == ", param);
	if(!getParameterByName('id')) 
	{
		let taskID = $(param).val();
		console.log(taskID);
		
		for(var i = 0; i < tasks.length; i++) {
			if(tasks[i].id === taskID) {
				task = tasks[i];
				break;
			}
		}
		
	} 
	else 
	{
		if(!task) task = param;
		else
		{
			let taskID = $(param).val();
			console.log(taskID);
			
			for(var i = 0; i < tasks.length; i++) {
				if(tasks[i].id === taskID) {
					task = tasks[i];
					break;
				}
			}
		}
	}
	

	console.log("expandTaskInfo() TASK === " , task);
	selectedProjID = task.project.id;
	
	$('#taskWell > .title').html(task.project.warehouse.city.name +
			' #' + task.project.warehouse.warehouseID + 
			' - ' + task.project.projectItem.name);
	$('#taskWell > #title').val(task.title);
	$('#taskWell > div > .description').val(task.description);
	$('#taskWell > span > .severity').val(task.severity);
	$('#taskWell > .assignedDate').html('<b>Assigned Date:</b> ' + task.assignedDate);
	
	var date;
	if(task.dueDate){
	 date = task.dueDate.split("/");
	
	var year = date[2];
	var yearString = year.toString();
	if(yearString[0] != '2') date[2] = yearString[2] + yearString[3];
	console.log("YEAR = ", date[2]);
	var dueDate = date[0] +"/"+date[1]+"/"+date[2];
	} else dueDate = task.dueDate;
	$('#taskWell > span > .dueDate').val(dueDate);							
	if(task.assigner) $('#taskWell > .assignedBy').html('<b>Assigned By:</b> ' + task.assigner.firstName);
	$('#taskWell > span > .assignedTo').val(task.assignee.firstName);
	
	$('#taskWell > span > #subcontractorsDropdown').val(task.subAssignee.name);
	taskAssigneeType = TASK_EMPLOYEE_ASSIGNEE;

	
//	if(task.assignee) $('#taskWell > span > .assignedTo').val(task.assignee.firstName);
//	if(task.subassignee) $('#taskWell > span > #subcontractorsDropdown').val(task.subAssignee.name);
		

	$('#taskWell > span > .taskStatus').val(task.status.status);
	$('#taskWell > div > .notes').val(task.notes);
	
	$('#taskWell').slideDown();
	
	 $('html, body').animate({
         scrollTop: $('#taskWell').offset().top + 'px'
     }, 'fast');
	
}

/**
 * This function takes the user to projects.html
 * where the project that was attached to the task 
 * will be displayed
 * 
 * INNER FUNCTION CALLS: NONE
 */
function navigateToSelectedProject () {
	window.location.href = 'projects.html?id=' + selectedProjID + "&from=taskBrowser";
}


/**
 * This function saves the task changes to the database as well as updating 
 * all of the front end task info
 * 
 * INNER FUNCTION CALLS: isValidInput(), clearTaskTable(), createProperTaskTable()
 *                
 */
function saveTaskChanges (taskFilter) {
	if(!$('#taskWell > #title').val() || $('#taskWell > #title').val() == ""){ alert("Tasks must have a title"); return;}
	if(!$('#taskWell > div > .description').val() || $('#taskWell > div > .description').val() == "") { alert("Tasks must have a description"); return;}
	if(typeof task === 'undefined')
		return alert("No Task Selected, try reloading!");
	
	
	
	console.log("UPDATING TASK == ", task, "USERS = ", users);
	let title = $('#taskWell > #title').val();
	let description = $('#taskWell > div > .description').val();
	let severity = $('#taskWell > span > .severity').val();
	let assignedDate =task.assignedDate;
	let dueDate = $('#taskWell > span > .dueDate').val();
	
	console.log("DUE DATE == " , dueDate);
	if(dueDate) {
		let date = dueDate.split("/");
		let yearString = date[2].toString();
		if(yearString.length == 2) date[2] = "20"+date[2];
		let dateString = date[0]+"/"+date[1]+"/"+date[2];
		dueDate = dateString;
	}
	
	let assignedBy = user.id;	// changes to whoever made the update
	let assignedTo , assignedToObject, MCS;

	MCS = $('#employeeDropdown').val();
	assignedTo = $('#subcontractorsDropdown').val();
	
	for(var i = 0; i < subcontractors.length; i++){
		  if(subcontractors[i].name.toLowerCase() == assignedTo.toLowerCase())
			  assignedToObject = subcontractors[i];
	  }

	let taskStatus = $('#taskWell > span > .taskStatus').val();
	
	if(taskStatus == "Open") taskStatus = 1;
	else if(taskStatus == "Completed") taskStatus = 2;
	else taskStatus = 3;
	
	let notes = $('#taskWell > div > .notes').val();
	let projectID = task.project.id;
	console.log("project id is defined");
	
	for(var i = 0; i < users.length; i++){
		if(users[i].firstName == MCS){ MCS = users[i]; break;}
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
		  
		//  let taskAssignee;
		  let taskMCS;
		  let taskAssignee;
		  
		
			  for(var i = 0; i < users.length; i++){
				  if(users[i].firstName.toLowerCase() == MCS.firstName.toLowerCase())
					  taskMCS = users[i];
			  }
				  
			  tasks[i].assignee = taskMCS;
			  //tasks[i].subAssignee = undefined;
		 
		  
			  for(var i = 0; i < subcontractors.length; i++){
				  console.log("assigned to is ", assignedTo);
				  if(subcontractors[i].name.toLowerCase() == assignedTo.toLowerCase())
					  taskAssignee = subcontractors[i];
			  }
			  tasks[i].subAssignee = taskAssignee;
			  //tasks[i].assignee = undefined;
		  
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
			  
				  projectsOfInterest[i].assignee = MCS;
				  //projectsOfInterest[i].subAssignee = undefined;
			  
			  
				  projectsOfInterest[i].subAssignee = assignedToObject;
				//  projectsOfInterest[i].assignee = undefined;
			  
			  
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
			  
				 tasksOfInterest[i].assignee = MCS;
				// tasksOfInterest[i].subAssignee = undefined;
			  
			  
				  tasksOfInterest[i].subAssignee = assignedToObject;
				  //tasksOfInterest[i].assignee = undefined;
			  
			 tasksOfInterest[i].status.id = taskStatus;
			 if(tasksOfInterest[i].status.id == 1) tasksOfInterest[i].status.status = 'Open';
			 else if(tasksOfInterest[i].status.id == 2) tasksOfInterest[i].status.status = 'Completed';
			 else  tasksOfInterest[i].status.status = 'Closed';
			 tasksOfInterest[i].notes = notes;
			break;}
		}
	
	let assigneeName;
	let subAssigneeName;
	
		assigneeName = MCS.firstName;
	
		subAssigneeName = assignedToObject.name;
	
	console.log("ASSIGNEE NAME = " , assigneeName , "TYPE = " , taskAssigneeType );
	
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
				'assignee': assigneeName,
				'subassignee': subAssigneeName,
				'initiatedDate': assignedDate,
				'dueDate': dueDate,
				'severity': severity,
				'status': taskStatus,
				'notes': notes,
				'type' : taskAssigneeType
			}, complete: function (data) {
				console.log("DATA AFTER TASK SAVE == ", data);
				let response = $.trim(data.responseText);
				if (response === 'UPDATED_TASK') {
					alert('Task Updated Successfully');
					$('#taskWell').slideUp();
					clearTaskTable();
					createProperTaskTable1();
					//location.reload(true);
				}
			}
		});
	} 
	
	$('#taskSelector').value = taskFilter;

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

/**
 * This function searches through the tasks based off of the project info
 * 
 * INNER FUNCTION CALLS: NONE
 */
function searchProjects(searchQuery){
	for(var i=0; i<tasksOfInterest.length; i++){
		let contentToSearchThrough = tasksOfInterest[i].project.warehouse.city.name + 
		' #' + tasksOfInterest[i].project.warehouse.warehouseID +
		' - ' + tasksOfInterest[i].project.projectItem.name;
		if(contentToSearchThrough.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1) projectsOfInterest.push(tasksOfInterest[i]);
	}

}

/**
 * This function searches through the tasks based off of the
 * task description info
 * 
 * INNER FUNCTION CALLS: NONE
 */
function searchDescriptions(searchQuery){
	for(var i=0; i<tasksOfInterest.length; i++){
		let contentToSearchThrough = tasksOfInterest[i].description;
		if(contentToSearchThrough.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1) projectsOfInterest.push(tasksOfInterest[i]);
	}
}


/**
 * This function clears the task table
 * 
 * INNER FUNCTION CALLS: NONE
 */
function clearTaskTable () {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
}


/**
 * This function is invoked when the user wants to print
 * the tasks on the screen and checks if there are any tasks
 * to display
 * 
 * INNER FUNCTION CALLS: printTasks()
 */
function printButton(){
	
	if(!projectsOfInterest || projectsOfInterest.length == 0) {
		alert("No tasks to print!");
		return;
		}
	
	printTasks(projectsOfInterest);
	console.log("PROJ OF INTTT = ", projectsOfInterest);
	
	let taskIDs = new Array();
	let reportURL =  "Report?type=TaskReport&id1=";
	for(var i = 0; i < projectsOfInterest.length; i++) {
		taskIDs.push(projectsOfInterest[i].id);
//		if(i != projectsOfInterest.length - 1) reportURL += projectsOfInterest[i].id + "&id" + (i+2) + "=";
//		else reportURL += projectsOfInterest[i].id;
	}
	
//	alert(reportURL);
	console.log("REPORT URL = ", reportURL);
	
//	window.location.href = reportURL;
	

}

/**
 * This function displays a printable table on the screen
 * that includes all of the tasks currently displayed
 * 
 * INNER FUNCTION CALLS: window.print()
 */
function printTasks(projectsOfInterest) {
	console.log("Managers of interest", managersOfInterest);
	console.log("PROJECTS OF INTEREST  ==== ", projectsOfInterest);
	document.body.innerHTML="";
    document.body.style.backgroundColor = "white";
	
    var div = document.createElement("div");
	div.id = "insertTable";
	var title = document.createElement("h3");
	title.id = "taskReportTitle";
	if(managersOfInterest == undefined){
		title.innerHTML = "Task Report: "+user.firstName;
	}
	else if(managersOfInterest.length == 1){
		title.innerHTML = "Task Report: "+managersOfInterest[0];
	}
	else {
		title.innerHTML = "Task Report";
	}
	
	title.align = 'center';
	var br = document.createElement("br");
	var table = document.createElement("table");
	table.id = "table";
    table.className = "taskReport";
    
    var backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.innerHTML = "Go Back";
    backButton.onclick = function() {
    	window.location.href = "taskBrowser.html";
    };
    
    var printButton = document.createElement("button");
	printButton.id = "printTaskReport";
	printButton.innerHTML = "Print";
	printButton.align = "center";
	printButton.onclick = function() {
		$("#printTaskReport");
		$("#backButton");
		window.print();
	};
	
    document.body.appendChild(backButton);
	document.body.appendChild(printButton);
    
	var head = document.createElement("tbody");
	head.id = "tableHeader";
	var headRow = document.createElement("tr");
	headRow.id = "head";
	var indexHead = document.createElement("th");
	indexHead.innerHTML = "Index";
	indexHead.style = 'text-align: center; width:4%; font-weight:bold; border-top:none; border-left:none; border-right:none';
    var warehouseHead = document.createElement("th");
    warehouseHead.innerHTML = "Warehouse";
    warehouseHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var projectHead = document.createElement("th");
	projectHead.innerHTML = "Project";
	projectHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var taskHead = document.createElement("th");
	taskHead.innerHTML = "Title";
	taskHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var MCSHead = document.createElement("th");
	MCSHead.innerHTML = "MCS";
	MCSHead.style = 'text-align: center; width:6%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var assigneeHead = document.createElement("th");
	assigneeHead.innerHTML = "Assignee";
	assigneeHead.style = 'text-align: center; width:6%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var descriptionHead = document.createElement("th");
	descriptionHead.innerHTML = "Description";
	descriptionHead.style = 'text-align: center; width:15%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var createdHead = document.createElement("th");
	createdHead.innerHTML = "Created";
	createdHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var dueHead = document.createElement("th");
	dueHead.innerHTML = "Due";
	dueHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var statusHead = document.createElement("th");
	statusHead.innerHTML = "Status";
	statusHead.style = 'text-align: center; width:7%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var priorityHead = document.createElement("th");
	priorityHead.innerHTML = "Priority";
	priorityHead.style = 'text-align: center; width:1%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	var notesHead = document.createElement("th");
	notesHead.innerHTML = "Notes";
	notesHead.style = 'text-align: center; width: 26%; font-weight:bold; border-top:none; border-left:none; border-right:none';
	document.body.appendChild(div);

	document.getElementById("insertTable").appendChild(title);
	document.getElementById("insertTable").appendChild(br);
	document.getElementById("insertTable").appendChild(table);
	document.getElementById("table").setAttribute("border-spacing", "3px");
	document.getElementById("table").setAttribute("border-collapse", "separate");
	document.getElementById("table").appendChild(head);
	document.getElementById("tableHeader").appendChild(headRow);
	document.getElementById("head").appendChild(indexHead);
	document.getElementById("head").appendChild(warehouseHead);
	document.getElementById("head").appendChild(projectHead);
	document.getElementById("head").appendChild(taskHead);
	document.getElementById("head").appendChild(MCSHead);
	document.getElementById("head").appendChild(assigneeHead);
	document.getElementById("head").appendChild(descriptionHead);
	document.getElementById("head").appendChild(createdHead);
	document.getElementById("head").appendChild(dueHead);
	document.getElementById("head").appendChild(statusHead);
	document.getElementById("head").appendChild(priorityHead);
	document.getElementById("head").appendChild(notesHead);
	
	var count = 0;
	for(var i = 0;i<projectsOfInterest.length; i++)
	{
		console.log(projectsOfInterest[i]);
	
		count++;
		var row = table.insertRow();
		var index = row.insertCell();
	//	index.align = "center";
		var warehouse = row.insertCell();
	//	warehouse.align = "center";
		var project = row.insertCell();
	//	project.align = "center";
		var task = row.insertCell();
	//	task.align = 'center';
		var MCS = row.insertCell();
		//	task.align = 'center';
			
		var assignee = row.insertCell();
	//	assignee.align = 'center';
		var description = row.insertCell();
	//	description.align = 'center';
		var created = row.insertCell();
	//	created.align = 'center';
		var due = row.insertCell();
	//	due.align = 'center';
		var status = row.insertCell();
	//	status.align = 'center';
		var priority = row.insertCell();
	//	priority.align = 'center';
		var notes = row.insertCell();
    //    notes.align = 'center';
        
		index.innerHTML = (count);
		warehouse.innerHTML = projectsOfInterest[i].project.warehouse.city.name + ' #' + projectsOfInterest[i].project.warehouse.warehouseID;
		project.innerHTML = projectsOfInterest[i].project.projectItem.name;
		task.innerHTML =  projectsOfInterest[i].title;
		MCS.innerHTML = projectsOfInterest[i].assignee.firstName;
		assignee.innerHTML = projectsOfInterest[i].subAssignee.name;
		description.innerHTML = projectsOfInterest[i].description;
		created.innerHTML = projectsOfInterest[i].assignedDate;
		due.innerHTML = projectsOfInterest[i].dueDate;
		status.innerHTML = projectsOfInterest[i].status.status;
		priority.innerHTML = projectsOfInterest[i].severity;
		notes.innerHTML = projectsOfInterest[i].notes;
		
		row.appendChild(index);
		row.appendChild(warehouse);
		row.appendChild(project);
		row.appendChild(task);
		row.appendChild(MCS);
		row.appendChild(assignee);
		row.appendChild(description);
		row.appendChild(created);
		row.appendChild(due);
		row.appendChild(status);
		row.appendChild(priority);
		row.appendChild(notes);
		head.appendChild(row)
		table.appendChild(head);
	}
	
//	window.print();
	
}

function addTaskToTable(_task)
{
	

	if(!_task) return;
	
	let taskListing = document.createElement('tr');
	
	taskListing.id = _task.id;
	taskListing.value = _task.id;
	taskListing.onclick = function () { 
		expandTaskInfo(this); 
	}; 
	
	let projectDetails = document.createElement('td');
	let taskTitle = document.createElement('td');
	let taskMCS = document.createElement('td');
	let taskAssignee = document.createElement('td');
	let taskDesc = document.createElement('td');
	let createdDate = document.createElement('td');
	let dueDate = document.createElement('td');
	let severity = document.createElement('td');
	let status = document.createElement('td');
	let notes = document.createElement('td');

	
	if(!_task.project.projectItem)
		console.log("NULL TASK " , _task);
	
	console.log("task is " , _task);
	
	projectDetails.innerHTML = _task.project.warehouse.city.name + 
				' #' + _task.project.warehouse.warehouseID +
				' - ' + _task.project.projectItem.name;
	taskTitle.innerHTML = _task.title;
	taskMCS.innerHTML = _task.assignee.firstName;
	taskAssignee.innerHTML = _task.subAssignee.name;
	
	taskDesc.innerHTML = _task.description;
	createdDate.innerHTML = _task.assignedDate;
	dueDate.innerHTML = _task.dueDate;
	severity.innerHTML = _task.severity;
	status.innerHTML = _task.status.status;
	notes.innerHTML = _task.notes;
	
	
	$(taskListing).append(projectDetails);
	$(taskListing).append(taskTitle);
	$(taskListing).append(taskMCS);
	$(taskListing).append(taskAssignee);
	$(taskListing).append(taskDesc);
	$(taskListing).append(createdDate);
	$(taskListing).append(dueDate);
	$(taskListing).append(severity);
	$(taskListing).append(status);
	$(taskListing).append(notes);

	
	$('#taskTable > tbody').append(taskListing);	
	console.log("APPENDED");
}



function dateFillFunction(x){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	var firstName = ' ('+ user.firstName + ') -  ';
	var cursorPosition = today.length + firstName.length-1;
	x.value = today + firstName + x.value;
	$(x).prop('selectionEnd', cursorPosition);

	
}

function refreshTasks(){

	getTheTasks1();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

function enterTaskActivity1()
{
	
		endTime1 = new Date().getTime();
		let took1 = endTime1 - beginTime1;
		console.log("TOOK: " , took1);
		tasks1 = TASK_OBJECT1.TASKS1;
		console.log("I came First");
		projectsOfInterest = tasks1;
		console.log("TASK 1 ARE ", tasks1);
		console.log("TASK ARE = ", tasks1 , TASK_OBJECT1);
		let taskID = getParameterByName('id');
		if(taskID){
			console.log("TASK ID = ", taskID);
			for(var i = 0; i < tasks1.length; i++) {
				tasks1[i].value = tasks1[i].id;
				if(tasks1[i].id == taskID) expandTaskInfo(tasks1[i]);
			}
		}
		//getUserData1();
}

function getTheTasks1() {
	beginTime1 = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: 'Project',
		async:false,
		data: {
			'domain': 'project',
			'action': 'getTheTasks',
		}, complete: function (data) {
			TASK_OBJECT1.TASKS1 = data.responseJSON;
			
			defineTaskFields1();
			getEnums1();
			
		}
	});
	
}

function getSpecificPartsOfProject1()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		async:false,
		data: {
			'domain': 'project',
			'action': 'getSpecificFieldIdsOfProject',
			'warehouse' : true,
			'item' : true
		}, complete: function (data) {
			PROJECT_FIELDS1 = data.responseJSON;
			
			matchProjects1();
			cleanTaskObject1();		
			matchTasks1();
			enterTaskActivity1();
			tasks = tasks1;
			
			console.log("No, I came First");
			console.log("Logged New complete tasks ",tasks);
			createTaskTableByManager(tasks);

		}
	});
}

function cleanTaskObject1()
{
	for(var i = 0; i < TASK_OBJECT1.TASKS1.length ; i++)
	{
		for(var k = 12; k > -1; k--)
			TASK_OBJECT1.TASKS1[i].splice(k , 1);
	}
}

function matchProjects1()
{
	for(var i = 0; i < PROJECT_FIELDS1.length; i++)
	{
		PROJECT_FIELDS1[i].projectItem = TASK_OBJECT1._ITEMS1["_" + PROJECT_FIELDS1[i][1]];
		PROJECT_FIELDS1[i].warehouse = TASK_OBJECT1._WAREHOUSES1["_" + PROJECT_FIELDS1[i][2]];
		
			for(var k = 0; k < TASK_OBJECT1.TASKS1.length; k++)
			{
				if(TASK_OBJECT1.TASKS1[k].project == PROJECT_FIELDS1[i][0]) 
				{
					TASK_OBJECT1.TASKS1[k].project = {id : undefined , projectItem : undefined , warehouse : undefined};
					TASK_OBJECT1.TASKS1[k].project.id = PROJECT_FIELDS1[i][0];
					TASK_OBJECT1.TASKS1[k].project.projectItem = PROJECT_FIELDS1[i].projectItem;
					TASK_OBJECT1.TASKS1[k].project.warehouse = PROJECT_FIELDS1[i].warehouse;
				}
					
			}
	}
			
	

}

function matchTasks1()
{
	for(var i = 0; i < TASK_OBJECT1.TASKS1.length; i++)
	{
		var sub = TASK_OBJECT1.TASKS1[i].subAssignee;
		var user = TASK_OBJECT1.TASKS1[i].assignee;
		
		TASK_OBJECT1.TASKS1[i].subAssignee = TASK_OBJECT1._SUBS1["_" + TASK_OBJECT1.TASKS1[i].subAssignee];
		TASK_OBJECT1.TASKS1[i].assignee = TASK_OBJECT1._USERS1["_" + TASK_OBJECT1.TASKS1[i].assignee];
		
		if(TASK_OBJECT1.TASKS1[i].subAssignee == undefined && TASK_OBJECT1.TASKS1[i].assignee == undefined)
			console.log("SUB = " , sub , "USERS = " , user);

		
		//console.log(" i = " , i , TASK_OBJECT.TASKS[i] , TASK_OBJECT.SUBS["_" + TASK_OBJECT.TASKS[i].subAssignee] , TASK_OBJECT.PERSONS["_" + TASK_OBJECT.TASKS[i].assignee])
	}

}

function defineTaskFields1() {
	for(var i = 0; i < TASK_OBJECT1.TASKS1.length; i++) {
		//console.log(TASK_OBJECT.TASKS[i]);
		TASK_OBJECT1.TASKS1[i].id = TASK_OBJECT1.TASKS1[i][0];
		TASK_OBJECT1.TASKS1[i].project = TASK_OBJECT1.TASKS1[i][1];
		TASK_OBJECT1.TASKS1[i].assignedDate = TASK_OBJECT1.TASKS1[i][2];
		TASK_OBJECT1.TASKS1[i].assignee = TASK_OBJECT1.TASKS1[i][3];
		TASK_OBJECT1.TASKS1[i].subAssignee = TASK_OBJECT1.TASKS1[i][4];
		TASK_OBJECT1.TASKS1[i].dueDate = TASK_OBJECT1.TASKS1[i][5];
		TASK_OBJECT1.TASKS1[i].completed = TASK_OBJECT1.TASKS1[i][6];
		TASK_OBJECT1.TASKS1[i].description = TASK_OBJECT1.TASKS1[i][7];
		TASK_OBJECT1.TASKS1[i].notes = TASK_OBJECT1.TASKS1[i][8];
		TASK_OBJECT1.TASKS1[i].status = TASK_OBJECT1.TASKS1[i][9];
		TASK_OBJECT1.TASKS1[i].title = TASK_OBJECT1.TASKS1[i][10];
		TASK_OBJECT1.TASKS1[i].type = TASK_OBJECT1.TASKS1[i][11];
		TASK_OBJECT1.TASKS1[i].severity = TASK_OBJECT1.TASKS1[i][12];
	}

}

function getEnums1()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificObjects',
			'warehouse': true,
			'item': true,
			'person': true,
			'users' : true,
			'subcontractors': true,
		}, success: function(data) {
			TASK_OBJECT1.ITEMS1 = JSON.parse(data.item);
			TASK_OBJECT1.PERSONS1 = JSON.parse(data.person);
			TASK_OBJECT1.USERS1 = JSON.parse(data.users);
			TASK_OBJECT1.SUBS1 = JSON.parse(data.subcontractors);
			TASK_OBJECT1.WAREHOUSES1 = JSON.parse(data.warehouse);
			createMaps1();
			getUniqueProjectIds1();
			getSpecificPartsOfProject1();
		}
	});
	

}

function createMaps1()
{
	for(var i = 0; i < TASK_OBJECT1.ITEMS1.length; i++)
	  {
		 TASK_OBJECT1._ITEMS1["_" + TASK_OBJECT1.ITEMS1[i].id] = TASK_OBJECT1.ITEMS1[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT1.PERSONS1.length; i++)
	  {
		 TASK_OBJECT1._PERSONS1["_" + TASK_OBJECT1.PERSONS1[i].id] = TASK_OBJECT1.PERSONS1[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT1.USERS1.length; i++)
	  {
		 TASK_OBJECT1._USERS1["_" + TASK_OBJECT1.USERS1[i].id] = TASK_OBJECT1.USERS1[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT1.SUBS1.length; i++)
	  {
		 TASK_OBJECT1._SUBS1["_" + TASK_OBJECT1.SUBS1[i].id] = TASK_OBJECT1.SUBS1[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT1.WAREHOUSES1.length; i++)
	  {
		 TASK_OBJECT1._WAREHOUSES1["_" + TASK_OBJECT1.WAREHOUSES1[i].id] = TASK_OBJECT1.WAREHOUSES1[i];
	  }
	

}

function getUniqueProjectIds1()
{	
	for(var i = 0; i < TASK_OBJECT1.TASKS1.length; i++){
		if(UNIQUE_IDS1["_" + TASK_OBJECT1.TASKS1[i].project] == undefined) {
			UNIQUE_IDS1["_" + TASK_OBJECT1.TASKS1[i].project] = true;
			TASK_OBJECT1.PROJ_IDS1.push(TASK_OBJECT1.TASKS1[i].project);
		}
	}
	
}


