let user;	

function getUserData () {
		
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getUserInfo'
			}, complete: function (data) {
				if(data.responseJSON) {
				  console.log("data for user = ", data.responseJSON);
				  user = data.responseJSON;
				  if(user.permission.id != 1) hideAdminContent();	 
				  console.log("data for USER = ", user);
			      getUsers();		  

					
				} else {
					console.log("user data = ",data);
					alert('Server Failure!');
					
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
				console.log(data);
				if (data.responseJSON) {
					createDropdown(data.responseJSON);
				}
				/////////////////////
				let id = getParameterByName("id");
				let from = getParameterByName("from");
				let type = getParameterByName("type");

				if(id){ 
				//	projectID = id;
					edit = true;
					console.log("PROJECT ID = ", id);
					currentDivLocation = "projectManager";
					$('#projectManager').show();
					$('.projectNavigator').hide();
					$('.projectNavigator-projectManager').show();
					
					PAGE_ENTRY = "fromTask";
					if(from) {
						PAGE_ENTRY = from;
						if(!RETRIEVED_PROJECTS) getTheProjects();
						else $('.projectNavigator-projectFinder').show();

					}
				}
				//////////////////////
			}
			
		});
	}
	
	function createDropdown (json) {
		$('#assigneeEntry').find('option').remove();

		let d = document.createDocumentFragment();
				
		json.sort(function(a,b){
			if(a.firstName < b.firstName) return -1;
			else if(a.firstName > b.firstName) return 1;
			return 0;
		});
		var assigneeVal;
		for (var i = 0; i < json.length; i++) {
			let option = document.createElement('option');
			if(user.firstName == json[i].firstName) assigneeVal = json[i].firstName;
			// when users store both username and name, access the user's name and username fields
			option.innerHTML = json[i].firstName;
			option.setAttribute("value", json[i].firstName);
			d.appendChild(option);
		}
		$('#assigneeEntry').append(d);
		$('#assigneeEntry').val(assigneeVal);
	}
	
	function submitTask () {
		console.log("Task Action = " , TASK_ACTION);
		
		let title = $('#taskCreationZone').find('#titleEntry').val();
		let description = $('#taskCreationZone').find('#descriptionEntry').val();

		let initiatedDate = $('#taskCreationZone').find('#initDate').val();
		let dueDate = $('#taskCreationZone').find('#dueDate').val();
		let severity = $('#taskCreationZone').find('#severity').val();
		let notes = $('#taskCreationZone').find('#notes').val();
		let type = document.getElementById('toggleTaskAssignee').value;
		
		let taskStatus = $('#taskCreationZone').find('#taskStatus').val();
		if(taskStatus == "Open") taskStatus = 1;
		else if(taskStatus == "Completed") taskStatus = 2;
		else taskStatus = 3;
		
		console.log("BUTTON: " , document.getElementById('toggleTaskAssignee'));
		console.log("TYPE: ", type);
		
		let assignee;
		if(type == "EMPLOYEE")
			assignee = $('#taskCreationZone').find('#assigneeEntry').val();
		else
			assignee = $('#taskCreationZone').find('#subcontractorsDropdown').val();

		console.log("ASSIGNEE: " , assignee);
		
		//let projectID = getParameterByName('id');
		console.log(projectID);
		if (typeof projectID === 'undefined') return alert("Project ID Failed. Find Another Project");
		
		if (typeof title === 'undefined' || title === '') return alert('Bad Title');
		if (typeof description === 'undefined' || description === '') return alert('Bad Description');
		if (typeof assignee === 'undefined' || assignee === '') return alert('Bad Assignee');
		if (typeof severity === 'undefined' || severity === '') return alert('Bad Severity');
		if (!isValidInput([dueDate, initiatedDate])) return alert('Bad Dates');
		
		console.log("TASK STATUS " , taskStatus);
		
		let taskData = {
			'title': title,
			'action': TASK_ACTION,
			'project': projectID,
			'description': description,
			'assignee': assignee,
			'initiatedDate': initiatedDate,
			'dueDate': dueDate,
			'severity': severity,
			'notes': notes,
			'description': description,
			'type' : type ,
		};
	
		console.log("PROJECT == ", project);
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: {
				'title': title,
				'action': TASK_ACTION,
				'taskID' : SELECTED_TASK_ID,
				'project': projectID,
				'description': description,
				'assignee': assignee,
				'initiatedDate': initiatedDate,
				'dueDate': dueDate,
				'status' : taskStatus,
				'severity': severity,
				'notes': notes,
				'type' : type,
			}, complete: function (serverResponse) {
				console.log(serverResponse);
				let response = $.trim(serverResponse.responseText);
				
				let taskAddedMessage = "Task Added Successfully";
				let taskUpdatedMessage = "Task Updated Successfully";
				let taskErrorMessage = "ERROR UPDATING OR ADDING TASK";
				let alertMessage;
				
				if(response == "TASK_ADDED")
					alertMessage = taskAddedMessage;
				else if(response == "UPDATED_TASK")
					alertMessage = taskUpdatedMessage;
				else
					alertMessage = taskErrorMessage;
				
				if (alertMessage == taskErrorMessage) 				
					alert(taskErrorMessage);
				else 
				{
					alert(alertMessage);
					$(".editProject").hide();
					$("#projectManager").show();
					$('#taskCreationZone').hide();
					$('#taskDisplay').show();
					clearTaskTable();
					getTasks(1);
					
					if(alertMessage == taskAddedMessage && type == "EMPLOYEE")
						sendTaskAlert(taskData);	
				}
			}
		});
		
	}
	
	function sendTaskAlert(taskData)
	{
	   	console.log("IN: sendTaskAlert()");
	   	console.log(PROJECT_DATA);
	   	$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'sendTaskAlert',
				'projectItem': PROJECT_DATA.projectItem.name,
				'warehouseCity': PROJECT_DATA.warehouse.city.name,
				'warehouseID': PROJECT_DATA.warehouse.warehouseID,
				'warehouseState':PROJECT_DATA.warehouse.state,
				'assignee': taskData.assignee,
				'severity' : taskData.severity,
				'dueDate' : taskData.dueDate,
				'description': taskData.description,
				'type' : taskData.type ,
			}, complete: function (response) {
				console.log("RESPONSE FROM sendTaskAlert() = ", response);		
				clearTaskForm();
				getTasks();
			}
		});
	}
	
	function clearTaskForm()
	{
		$('#taskCreationZone').find('#titleEntry').val('');
		$('#taskCreationZone').find('#descriptionEntry').val('');
		$('#taskCreationZone').find('#initDate').val('');
		$('#taskCreationZone').find('#dueDate').val('');
		$('#taskCreationZone').find('#severityEntry').val('1');
		$('#taskCreationZone').find('#notes').val('');
		
		taskAssigneeType = TASK_EMPLOYEE_ASSIGNEE;
		$('#taskCreationZone').find('#employeeAssigneeTableElement').show();
		$('#taskCreationZone').find('#subcontractorAssigneeTableElement').hide();
		document.getElementById('toggleTaskAssignee').innerHTML = "Assign to Subcontractor";
		document.getElementById('toggleTaskAssignee').value = TASK_EMPLOYEE_ASSIGNEE;
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

				alert("Dates must be in this format: mm/dd/yyyy");
				return false
			}
		}
		return true;
	}