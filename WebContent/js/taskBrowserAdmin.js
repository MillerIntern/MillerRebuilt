'use strict';

/*
 * This document is used to prepare the taskBrowser.html page for administrative privileges
 * All functions found in this document contribute to prepare the page's functionality and
 * appearance for an administrative user
 */
let managersOfInterest;





$(document).on('click', '#AllTasks', function(){
	console.log("checked == ", document.getElementById("AllTasks").checked);
	if(document.getElementById("AllTasks").checked == true){
		$('.taskManager > input').each(function(i, obj) {
		    obj.checked = true;
		});
	}
});

$(document).on('click', '.taskManager', function(){
	console.log("checked == ", document.getElementById("AllTasks").checked);
    if(document.getElementById("AllTasks").checked == true){
		this.checked = true;
	}
	
});

$(document).on('change', '#taskSelector', function () {
	console.log(user);
	clearTaskTable();
	createProperTaskTable();
});

function establishManagersOfInterest()
{
	managersOfInterest = [];
	$('.taskManager').each(function(i, obj) {
		console.log("Man of interest == ", obj.value, obj.checked)
		if(!obj.value) return;
	    if(obj.checked == true) managersOfInterest.push(obj.value);
	});
}

function createTaskTableByManager (tasks) {
	let selector = $('#taskSelector').val();
    tasksOfInterest = new Array();
	console.log(selector);
	console.log(tasks);
	console.log("managers of interest  == ",managersOfInterest);
	//console.log("Manager " + managersOfInterest[0]);
	var count = 0;
	var all = false;
	for(var k = 0; k < managersOfInterest.length; k++)
		if(managersOfInterest[k].toLowerCase() == "all") all = true;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'incomplete' && tasks[i].completed) || 
				(selector === 'complete' && !tasks[i].completed)) 
				continue; // do nothing
		if(all == true)
			{
			console.log("taks = " + tasks[i].assignee);
			tasksOfInterest.push(tasks[i]);
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
			closeButton.onclick = function () {
				let taskID = $(this).val();
				let elTask;
				for(var z = 0; z < tasks.length; z++){
					if(tasks[z].id == taskID) elTask = tasks[z];
				}
				console.log("assigner id = ", elTask.assigner.id);
				console.log("user id = ", user.id);

				if(elTask.assigner.id != user.id){
					if(confirm("You're about to close a task you did not assign!  Are you sure you want to?") == true){
					    closeTaskById(this);}
				} else closeTaskById(this);		
			};
			
			projectDetails.innerHTML = tasks[i].project.warehouse.city.name + 
						' #' + tasks[i].project.warehouse.warehouseID +
						' - ' + tasks[i].project.projectItem.name;
			taskTitle.innerHTML = tasks[i].title;
			taskAssignee.innerHTML = tasks[i].assignee.firstName;
			taskAssignee.id = "assigneeDisplay";
			console.log("iddddd = ", taskAssignee.id);
			taskAssignee.width = "10px";
			taskDesc.innerHTML = tasks[i].description;
			taskDesc.width = "200%";
			taskDesc.style ="white-space: normal";
			//taskDesc.style ="max-width: 750px";
			createdDate.innerHTML = tasks[i].assignedDate;
			dueDate.innerHTML = tasks[i].assignedDate;
			severity.innerHTML = tasks[i].severity;
			severity.align = 'center';
			severity.width = "30%";
			notes.innerHTML = tasks[i].notes;
			notes.width = "500%";
			notes.style ="white-space: normal";
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
		else if(!all){
	    console.log("tasks assignee = " + tasks[i].assignee.firstName);
	    for(var q = 0; q < managersOfInterest.length; q++)
	    {
	    	console.log("interesr in " + managersOfInterest[q]);
		if (tasks[i].assignee.firstName.toLowerCase() == managersOfInterest[q].toLowerCase()) {
			count++;
			tasksOfInterest.push(tasks[i]);
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
     } 
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function createManagerQueue(json)
{
    let d = document.createDocumentFragment();
	let row = document.createElement('tr');
	let name = document.createElement('td');
	let checkBox = document.createElement('td');
	let input = document.createElement('input');
	let breakPoint = document.createElement('br')
	row.setAttribute("value", 'all');
	name.innerHTML = "<h4> All </h4>";
	input.setAttribute("type","checkbox");
	input.value ='all';
	input.setAttribute("id", "AllTasks");
	input.setAttribute("class","taskManager");
	input.checked = false;
	d.appendChild(row);
	d.appendChild(name);
	d.appendChild(checkBox);
	d.appendChild(input);
	d.appendChild(breakPoint);

    json.sort(function(a,b){
    	if(a.name < b.name) return -1;
    	else if(a.name > b.name) return 1;
    	return 0;
    });
    
	for (var i = 0; i < json.length; i++) {
		console.log("creating manager drop down" + json[i]);
		// when users store both username and name, access the user's name and username fields
		let name = document.createElement('td');
		let checkBox = document.createElement('td');
		let managerInput = document.createElement('input');
		name.innerHTML = "<h4> &nbsp&nbsp&nbsp;"+json[i].name+ "</h4>";
		managerInput.setAttribute("type","checkbox");
		if(user.firstName.toLowerCase() == json[i].name.toLowerCase()) 
			managerInput.checked = true;
		else {managerInput.checked = false;}
		managerInput.setAttribute("value", json[i].name);
		managerInput.setAttribute("id", json[i].name+"Tasks");
		managerInput.setAttribute("class","taskManager");
		d.appendChild(name);
		d.appendChild(checkBox);
		d.appendChild(managerInput);
}

	
	
	$('.container > #projectManagerSelection').append(d);
	document.getElementById("assigneeSort").style.display = 'inline';
}

