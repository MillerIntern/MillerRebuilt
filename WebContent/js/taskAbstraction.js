'use strict';

let tasks;



$(document).on('change', '#taskSelector2', function () {
	clearTaskTable();
	fillTasksTable(tasks);
	console.log("Right here \n");
});





function getTasks() {
	console.log(projectID);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectTasks',
			'id': projectID
		}, success: function (data) {
			console.log(data);
			if (data) {
				tasks = data;
				fillTasksTable(tasks);
			}
		}, error: function (data) {
			alert('Server Error!');
		}
	});
}

function fillTasksTable(json) {
	let selector = $('#taskSelector2').val();
	console.log(selector);
	
	let count = 0;
	for (var i = 0; i < json.length; i++) {
		if((selector === 'open' && tasks[i].status.id != 1) || 
				(selector === 'complete' && tasks[i].status.id != 2) ||
				(selector === 'closed' && tasks[i].status.id != 3)) 
				continue; // do nothing

		count++;
		let taskListing = document.createElement('tr');
		taskListing.value = json[i].id;
		
		let taskTitle = document.createElement('td');
		let taskDesc = document.createElement('td');
		let assignedTo = document.createElement('td');
		let dueDate = document.createElement('td');
		let severity = document.createElement('td');
		let status = document.createElement('td');
		let notes = document.createElement('td');

		
		
		
		taskTitle.innerHTML = json[i].title;
		taskDesc.innerHTML = json[i].description;
		assignedTo.innerHTML = json[i].assignee.firstName;
		dueDate.innerHTML = json[i].dueDate;
		severity.innerHTML = json[i].severity;
		severity.align = 'center';
		status.innerHTML = json[i].status.status;
		notes.innerHTML = json[i].notes;
		
		
		$(taskListing).append(taskTitle);
		$(taskListing).append(taskDesc);
		$(taskListing).append(assignedTo);
		$(taskListing).append(dueDate);
		$(taskListing).append(severity);
		$(taskListing).append(status);
		$(taskListing).append(notes);
		
		
		$('#taskTable > tbody').append(taskListing);
	}

	if (count === 0) {
		clearAndAddSingleRow("No Tasks to Show");
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

function clearTaskTable () {
	$('#taskTable > tbody').children('tr:not(.head)').remove();
}
