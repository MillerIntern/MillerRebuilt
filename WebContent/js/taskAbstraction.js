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
			if (data)
				fillTasksTable(data);
		}, error: function (data) {
			alert('Server Error!');
		}
	});
}

function fillTasksTable(json) {
	let count = 0;
	for (var i = 0; i < json.length; i++) {
		count++;
		let taskListing = document.createElement('tr');
		taskListing.value = json[i].id;
		
		let taskTitle = document.createElement('td');
		let taskDesc = document.createElement('td');
		let assignedTo = document.createElement('td');
		let dueDate = document.createElement('td');
		let severity = document.createElement('td');
		let notes = document.createElement('td');
		let closeTask = document.createElement('td');
		
		let closeButton = document.createElement('button');
		closeButton.innerHTML = 'Close'
		closeButton.classname = 'btn';
		closeButton.value = json[i].id;
		closeButton.onclick = function () {
			closeTaskById(this);
		};
		
		taskTitle.innerHTML = json[i].title;
		taskDesc.innerHTML = json[i].description;
		assignedTo.innerHTML = json[i].assignee.firstName;
		dueDate.innerHTML = json[i].dueDate;
		severity.innerHTML = json[i].severity;
		severity.align = 'center';
		notes.innerHTML = json[i].notes;
		closeTask.appendChild(closeButton);
		
		$(taskListing).append(taskTitle);
		$(taskListing).append(taskDesc);
		$(taskListing).append(assignedTo);
		$(taskListing).append(dueDate);
		$(taskListing).append(severity);
		$(taskListing).append(notes);
		$(taskListing).append(closeTask);
		
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