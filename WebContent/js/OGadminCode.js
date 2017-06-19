$(document).on('change', '#AllTasks', function(){
	if(document.getElementById("AllTasks").value == 'off'){
		//document.getElementById("AllTasks").value = 'on';
		$('.taskManager > input').each(function(i, obj) {
		    obj.value = 'on';
		    obj.checked = true;
		});
	}
    else if(document.getElementById("AllTasks").value == 'on') {
    	document.getElementById("AllTasks").value = 'off';
    }
	
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
$(document).on('change', '#DaveTasks', function(){
	if(document.getElementById("DaveTasks").value == 'off') document.getElementById("DaveTasks").value = 'on';
	else if(document.getElementById("DaveTasks").value == 'on') document.getElementById("DaveTasks").value = 'off';
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
	input.setAttribute("value",'off');
	input.setAttribute("id", "AllTasks");
	input.setAttribute("class","taskManager");
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
		let input = document.createElement('input');
		name.innerHTML = "<h4> &nbsp&nbsp&nbsp;"+json[i].name+ "</h4>";
		input.setAttribute("type","checkbox");
		if(user.firstName.toLowerCase() == json[i].name.toLowerCase()){
			input.setAttribute("value",'on');
			input.setAttribute("checked","true");
		}
		else input.setAttribute("value",'off');
		input.setAttribute("id", json[i].name+"Tasks");
		input.setAttribute("class","taskManager");
		d.appendChild(name);
		d.appendChild(checkBox);
		d.appendChild(input);
}
	
	function createTaskTableByManager (tasks) {
		let selector = $('#taskSelector').val();
	    tasksOfInterest = new Array();
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
	
	