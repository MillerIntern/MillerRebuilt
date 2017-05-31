'use strict';
//This document is used to queue all managers of interest that you would like to see tasks for
let managersOfInterest;
$(document).on('click', '#submitButton', function(){
	console.log("You hit the submit button!")
})

$(document).on('change', '#AllTasks', function(){
	if(document.getElementById("AllTasks").value == 'off') document.getElementById("AllTasks").value = 'on';
    else if(document.getElementById("AllTasks").value == 'on') document.getElementById("AllTasks").value = 'off';
})
$(document).on('change', '#JoeTasks', function(){
	if(document.getElementById("JoeTasks").value == 'off') document.getElementById("JoeTasks").value = 'on';
	else if(document.getElementById("JoeTasks").value == 'on') document.getElementById("JoeTasks").value = 'off';
})
$(document).on('change', '#BartTasks', function(){
	if(document.getElementById("BartTasks").value == 'off') document.getElementById("BartTasks").value = 'on';
	else if(document.getElementById("BartTasks").value == 'on') document.getElementById("BartTasks").value = 'off';
})
$(document).on('change', '#DavidTasks', function(){
	if(document.getElementById("DavidTasks").value == 'off') document.getElementById("DavidTasks").value = 'on';
	else if(document.getElementById("DavidTasks").value == 'on') document.getElementById("DavidTasks").value = 'off';
})
$(document).on('change', '#DavesTasks', function(){
	if(document.getElementById("DavesTasks").value == 'off') document.getElementById("DavesTasks").value = 'on';
	else if(document.getElementById("DavesTasks").value == 'on') document.getElementById("DavesTasks").value = 'off';
})
$(document).on('change', '#AlexTasks', function(){
	if(document.getElementById("AlexTasks").value == 'off') document.getElementById("AlexTasks").value = 'on';
	else if(document.getElementById("AlexTasks").value == 'on') document.getElementById("AlexTasks").value = 'off';
})
$(document).on('change', '#ScottTasks', function(){
	if(document.getElementById("ScottTasks").value == 'off') document.getElementById("ScottTasks").value = 'on';
	else if(document.getElementById("ScottTasks").value == 'on') document.getElementById("ScottTasks").value = 'off';
})
$(document).on('change', '#CraigTasks', function(){
	if(document.getElementById("CraigTasks").value == 'off') document.getElementById("CraigTasks").value = 'on';
	else if(document.getElementById("CraigTasks").value == 'on') document.getElementById("CraigTasks").value = 'off';
})
$(document).on('change', '#AdrienneTasks', function(){
	if(document.getElementById("AdrienneTasks").value == 'off') document.getElementById("AdrienneTasks").value = 'on';
	else if(document.getElementById("AdrienneTasks").value == 'on') document.getElementById("AdrienneTasks").value = 'off';
})
$(document).on('click', '#AndyTasks', function(){
	
	if(document.getElementById("AndyTasks").value == 'off') document.getElementById("AndyTasks").value = 'on';
	else if(document.getElementById("AndyTasks").value == 'on') document.getElementById("AndyTasks").value = 'off';
})


$(document).on('change', '#taskSelector', function () {
	console.log(user);
	if(user.permission.id != 1){
	  clearTaskTable();
	  createTaskTable(tasks);
	}
	else{
		clearTaskTable();
		establishManagersOfInterest();
		
		
		console.log("inetest" + managersOfInterest);
		createTaskTableByManager(tasks, managersOfInterest);
	}
	
});

function establishManagersOfInterest()
{
	managersOfInterest = [];
	$('.taskManager').each(function(i, obj) {
		console.log(obj);
		var userName = "" +obj.id+"";
		userName = userName.replace("Tasks","");
		console.log("user = " + userName);
	    if(obj.value == 'on') managersOfInterest.push(userName);
	});
}

function createTaskTableByManager (tasks, managersOfInterest) {
	let selector = $('#taskSelector').val();
	console.log(selector);
	console.log(tasks);
	console.log(managersOfInterest);
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
			taskDesc.innerHTML = tasks[i].description;
			createdDate.innerHTML = tasks[i].assignedDate;
			dueDate.innerHTML = tasks[i].dueDate;
			severity.innerHTML = tasks[i].severity;
			severity.align = 'center';
			notes.innerHTML = tasks[i].notes;
			closeTask.appendChild(closeButton);
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
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
			taskDesc.innerHTML = tasks[i].description;
			createdDate.innerHTML = tasks[i].assignedDate;
			dueDate.innerHTML = tasks[i].dueDate;
			severity.innerHTML = tasks[i].severity;
			severity.align = 'center';
			notes.innerHTML = tasks[i].notes;
			closeTask.appendChild(closeButton);
			
			$(taskListing).append(projectDetails);
			$(taskListing).append(taskTitle);
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
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

