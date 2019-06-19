'use strict';

/*
 * This document is used to prepare the taskBrowser.html page for administrative privileges
 * All functions found in this document contribute to prepare the page's functionality and
 * appearance for an administrative user
 */
let managersOfInterest;


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
		    addTaskToTable(tasks[i]);
			
			}
		else if(!all){
	    //console.log("tasks assignee = " + tasks[i].assignee.firstName);
	    for(var q = 0; q < managersOfInterest.length; q++)
	    {
	    	//console.log("interesr in " + managersOfInterest[q]);
	    
		if ((tasks[i].assignee != undefined && tasks[i].assignee.firstName.toLowerCase() == managersOfInterest[q].toLowerCase()) &&
				(tasks[i].subAssignee != undefined && tasks[i].subAssignee.name.toLowerCase() == managersOfInterest[q].toLowerCase())) {
			count++;
			tasksOfInterest.push(tasks[i]);
			addTaskToTable(tasks[i]);
		}
		console.log(tasks[i]);
	  }
	    
     } 
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}


function createManagerQueue()
{
	let managerDropdown;
	
	managerDropdown = document.getElementById("projectManagerDropdown");
	console.log("managerDrop is  ",managerDropdown);
	$("#projectManagerDropdown").empty();
	console.log("managerDrop isaaa  ",$("#projectManagerDropdown"));
	let managerAllOption ;
	let managerNoneOption;
	let json;
	let managerOption;
	
	if($('#categoryDetails').val() == 'managers'){
		json = projectManagers ;		
	}
	
	else{
		
		json = subcontractors;	
	}
		
		
		console.log("the value is ",$('#categoryDetails').val());
		managerAllOption = document.createElement('option');
		managerAllOption.text = "All";
		managerAllOption.value = "All";	
		managerAllOption.id =  "AllTasks";
		managerAllOption.className = "taskManager";
		managerDropdown.add(managerAllOption);
		
		managerNoneOption = document.createElement('option');
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

			managerOption = document.createElement('option');
			managerOption.text = json[i].name;
			managerOption.value = json[i].name;
			if(user.firstName.toLowerCase() == json[i].name.toLowerCase()) 
				managerOption.selected = true;
			
			managerOption.id =  json[i].name+"Tasks";
			managerOption.className = "taskManager";
			managerDropdown.add(managerOption);
		}
		
	
		$('#projectManagerDropdown').trigger('chosen:updated');
		
	    $('.chosenElement').chosen({ width: "400px" });
	    $('.chosenElement').on('change' , function(evt , params) {
	    	
	    	if(params.selected) {
	    		if(params.selected == "All") 
	    			selectAllManagersDropdown();
	    		if(params.selected == "None")
	    			deselectAllManagersDropdown();
	    	}    	
	    });

		
	
	
	
    
    
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


