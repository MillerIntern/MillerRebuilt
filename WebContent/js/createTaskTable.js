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
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}


function addTaskToTable(_task)
{
	if(_task) return;
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
	severity.align = 'center';
	status.innerHTML = _task.status.status;
	status.align = 'center';
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
}

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
	    
		if ((tasks[i].assignee != undefined && tasks[i].assignee.firstName.toLowerCase() == managersOfInterest[q].toLowerCase()) ||
				(tasks[i].subAssignee != undefined && tasks[i].subAssignee.name.toLowerCase() == managersOfInterest[q].toLowerCase())) {
			count++;
			tasksOfInterest.push(tasks[i]);
			addTaskToTable(tasks[i]);
		}
	  }
     } 
	}
	projectsOfInterest = tasksOfInterest;
	if (count === 0) {
		clearAndAddSingleRow('No Tasks to Display!');
	}
}