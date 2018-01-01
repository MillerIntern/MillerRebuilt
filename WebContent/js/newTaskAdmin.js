'use strict';

/*
 * This document is used to prepare the taskBrowser.html page for administrative privileges
 * All functions found in this document contribute to prepare the page's functionality and
 * appearance for an administrative user
 */
let managersOfInterest;


$(document).on('click', '#AllTasks', function(){
	if(document.getElementById("AllTasks").checked == true){
		$('.taskManager > input').each(function(i, obj) {
			if(obj.id == "NoTasks") obj.checked = false;
			else {obj.checked = true;}
		});
	}
});

$(document).on('click', '#NoTasks', function(){
	if(document.getElementById("NoTasks").checked == true){
		$('.taskManager > input').each(function(i, obj) {
			if(obj.id == "NoTasks") obj.checked = true;
			else {obj.checked = false;}
		});
	}
});

$(document).on('click', '.taskManager', function(){
    if(this.id != "NoTasks"){
    	if(this.checked == true) document.getElementById('NoTasks').checked = false;
    }
    if(this.id != "AllTasks"){
    	if(this.checked == false && document.getElementById('AllTasks').checked == true) {
    		document.getElementById('AllTasks').checked = false;
    	}
    }
});


function displayTasks() {
	createProperTaskTable();
}


function establishManagersOfInterest()
{
	managersOfInterest = [];
	$('.taskManager').each(function(i, obj) {
		if(!obj.value) return;
	    if(obj.selected == true) managersOfInterest.push(obj.value);
	});
}

function createTaskTableByManager (tasks) {
	let selector = $('#taskSelector').val();
    tasksOfInterest = new Array();
	console.log("SELECTOR ==== " ,selector);
	console.log("MANAGERS OF INTEREST  == ",managersOfInterest);
	tasks.sort(function(a,b){
		if(a.assignee.name < b.assignee.name) return -1;
		if(a.assignee.name > b.assignee.name) return 1;
		else{
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
	});
	var count = 0;
	var all = false;
	for(var k = 0; k < managersOfInterest.length; k++)
		if(managersOfInterest[k].toLowerCase() == "all") all = true;
	for (var i = 0; i < tasks.length; i++) {
		if((selector === 'open' && tasks[i].status.id != 1) || 
				(selector === 'complete' && tasks[i].status.id != 2) ||
				(selector === 'open_complete' && tasks[i].status.id == 3) ||
				(selector === 'closed' && tasks[i].status.id != 3)) 
				continue; // do nothing
		if(all == true)
			{
			//console.log("taks = " + tasks[i].assignee);
			tasksOfInterest.push(tasks[i]);
			count++;
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
			taskAssignee.id = "assigneeDisplay";
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
			status.innerHTML = tasks[i].status.status;
			status.align = 'center';
			notes.innerHTML = tasks[i].notes;
			notes.width = "500%";
			notes.style ="white-space: normal";
			
			
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
		else if(!all){
	    //console.log("tasks assignee = " + tasks[i].assignee.firstName);
	    for(var q = 0; q < managersOfInterest.length; q++)
	    {
	    	//console.log("interesr in " + managersOfInterest[q]);
		if (tasks[i].assignee.firstName.toLowerCase() == managersOfInterest[q].toLowerCase()) {
			count++;
			tasksOfInterest.push(tasks[i]);
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
     } 
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}

function createManagerQueue(json)
{
	
	let managerDropdown = document.getElementById("projectManagerDropdown");
	
	let managerAllOption = document.createElement('option');
	managerAllOption.text = "All";
	managerAllOption.value = "All";	
	managerAllOption.id =  "AllTasks";
	managerAllOption.className = "taskManager";
	managerDropdown.add(managerAllOption);
	
	let managerNoneOption = document.createElement('option');
	managerNoneOption.text = "None";
	managerNoneOption.value = "None";	
	managerNoneOption.id =  "NoneTasks";
	managerNoneOption.className = "taskManager";
	managerDropdown.add(managerNoneOption);
		
    json.sort(function(a,b){
    	if(a.name < b.name) return -1;
    	else if(a.name > b.name) return 1;
    	return 0;
    });
    
	for (var i = 0; i < json.length; i++) {
		// when users store both username and name, access the user's name and username fields
		if(json[i].name == "Bart" || json[i].name == "bart") continue;

		let managerOption = document.createElement('option');
		managerOption.text = json[i].name;
		managerOption.value = json[i].name;
		if(user.firstName.toLowerCase() == json[i].name.toLowerCase()) 
			managerOption.selected = true;
		
		managerOption.id =  json[i].name+"Tasks";
		managerOption.className = "taskManager";
		managerDropdown.add(managerOption);
	}
	
    $('.chosenElement').chosen({ width: "400px" });
    $('.chosenElement').on('change' , function(evt , params) {
    	
    	if(params.selected) {
    		if(params.selected == "All") 
    			selectAllManagersDropdown();
    		if(params.selected == "None")
    			deselectAllManagersDropdown();
    	}    	
    });

    console.log("OPTIONS: " , $('#projectManagerDropdown > option'));
    
    
	document.getElementById("assigneeSort").style.display = 'inline';
}

function deselectAllManagersDropdown() {
	let managerDropdown = document.getElementById("projectManagerDropdown");
	
	for(var i = 0; i < managerDropdown.options.length; i++) {
		managerDropdown.options[i].selected = false;
	}
	
	$('#projectManagerDropdown').trigger('chosen:updated');

	
}

function selectAllManagersDropdown() {
	let managerDropdown = document.getElementById("projectManagerDropdown");
	
	for(var i = 0; i < managerDropdown.options.length; i++) {		
		if(managerDropdown.options[i].value == "None") {
			continue;
		}
		else if(managerDropdown.options[i].value == "All") {
			managerDropdown.options[i].selected = false;
		}
		else {
			managerDropdown.options[i].selected = true;
		}
	}
	
	$('#projectManagerDropdown').trigger('chosen:updated');
	
}


