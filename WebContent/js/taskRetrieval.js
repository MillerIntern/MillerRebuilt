let TASK_OBJECT = {
		WAREHOUSES : new Array(), 
		_WAREHOUSES : new Array ,
		ITEMS : new Array() ,
		_ITEMS : new Array() ,
		PROJ_IDS : new Array() ,
		PERSONS : new Array() ,
		_PERSONS : new Array() ,
		SUBS : new Array() ,
		_SUBS : new Array() ,
		TASKS : undefined ,
		USERS : new Array() ,
		_USERS : new Array() ,
}

let UNIQUE_IDS = new Array();
let PROJECT_FIELDS;

let beginTime;
let endTime;



function enterTaskActivity()
{
	
		endTime = new Date().getTime();
		let took = endTime - beginTime;
		console.log("TOOK: " , took);
		tasks = TASK_OBJECT.TASKS;
		projectsOfInterest = tasks;
		console.log("TASK ARE = ", tasks , TASK_OBJECT);
		let taskID = getParameterByName('id');
		if(taskID){
			console.log("TASK ID = ", taskID);
			for(var i = 0; i < tasks.length; i++) {
				tasks[i].value = tasks[i].id;
				if(tasks[i].id == taskID) expandTaskInfo(tasks[i]);
			}
		}
		getUserData();
}

function getTheTasks() {
	beginTime = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getTheTasks',
		}, complete: function (data) {
			TASK_OBJECT.TASKS = data.responseJSON;
			
			defineTaskFields();
			getEnums();
			
		}
	});
	
}

function getSpecificPartsOfProject()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificFieldIdsOfProject',
			'warehouse' : true,
			'item' : true
		}, complete: function (data) {
			PROJECT_FIELDS = data.responseJSON;
			
			matchProjects();
			cleanTaskObject();		
			matchTasks();
			enterTaskActivity();

		}
	});
}

function cleanTaskObject()
{
	for(var i = 0; i < TASK_OBJECT.TASKS.length ; i++)
	{
		for(var k = 12; k > -1; k--)
			TASK_OBJECT.TASKS[i].splice(k , 1);
	}
}

function matchProjects()
{
	for(var i = 0; i < PROJECT_FIELDS.length; i++)
	{
		PROJECT_FIELDS[i].projectItem = TASK_OBJECT._ITEMS["_" + PROJECT_FIELDS[i][1]];
		PROJECT_FIELDS[i].warehouse = TASK_OBJECT._WAREHOUSES["_" + PROJECT_FIELDS[i][2]];
		
			for(var k = 0; k < TASK_OBJECT.TASKS.length; k++)
			{
				if(TASK_OBJECT.TASKS[k].project == PROJECT_FIELDS[i][0]) 
				{
					TASK_OBJECT.TASKS[k].project = {id : undefined , projectItem : undefined , warehouse : undefined};
					TASK_OBJECT.TASKS[k].project.id = PROJECT_FIELDS[i][0];
					TASK_OBJECT.TASKS[k].project.projectItem = PROJECT_FIELDS[i].projectItem;
					TASK_OBJECT.TASKS[k].project.warehouse = PROJECT_FIELDS[i].warehouse;
				}
					
			}
	}
			
	

}

function matchTasks()
{
	for(var i = 0; i < TASK_OBJECT.TASKS.length; i++)
	{
		var sub = TASK_OBJECT.TASKS[i].subAssignee;
		var user = TASK_OBJECT.TASKS[i].assignee;
		
		TASK_OBJECT.TASKS[i].subAssignee = TASK_OBJECT._SUBS["_" + TASK_OBJECT.TASKS[i].subAssignee];
		TASK_OBJECT.TASKS[i].assignee = TASK_OBJECT._USERS["_" + TASK_OBJECT.TASKS[i].assignee];
		
		if(TASK_OBJECT.TASKS[i].subAssignee == undefined && TASK_OBJECT.TASKS[i].assignee == undefined)
			console.log("SUB = " , sub , "USERS = " , user);

		
		//console.log(" i = " , i , TASK_OBJECT.TASKS[i] , TASK_OBJECT.SUBS["_" + TASK_OBJECT.TASKS[i].subAssignee] , TASK_OBJECT.PERSONS["_" + TASK_OBJECT.TASKS[i].assignee])
	}

}

function defineTaskFields() {
	for(var i = 0; i < TASK_OBJECT.TASKS.length; i++) {
		//console.log(TASK_OBJECT.TASKS[i]);
		TASK_OBJECT.TASKS[i].id = TASK_OBJECT.TASKS[i][0];
		TASK_OBJECT.TASKS[i].project = TASK_OBJECT.TASKS[i][1];
		TASK_OBJECT.TASKS[i].assignedDate = TASK_OBJECT.TASKS[i][2];
		TASK_OBJECT.TASKS[i].assignee = TASK_OBJECT.TASKS[i][3];
		TASK_OBJECT.TASKS[i].subAssignee = TASK_OBJECT.TASKS[i][4];
		TASK_OBJECT.TASKS[i].dueDate = TASK_OBJECT.TASKS[i][5];
		TASK_OBJECT.TASKS[i].completed = TASK_OBJECT.TASKS[i][6];
		TASK_OBJECT.TASKS[i].description = TASK_OBJECT.TASKS[i][7];
		TASK_OBJECT.TASKS[i].notes = TASK_OBJECT.TASKS[i][8];
		TASK_OBJECT.TASKS[i].status = TASK_OBJECT.TASKS[i][9];
		TASK_OBJECT.TASKS[i].title = TASK_OBJECT.TASKS[i][10];
		TASK_OBJECT.TASKS[i].type = TASK_OBJECT.TASKS[i][11];
		TASK_OBJECT.TASKS[i].severity = TASK_OBJECT.TASKS[i][12];
	}

}

function getEnums()
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
			TASK_OBJECT.ITEMS = JSON.parse(data.item);
			TASK_OBJECT.PERSONS = JSON.parse(data.person);
			TASK_OBJECT.USERS = JSON.parse(data.users);
			TASK_OBJECT.SUBS = JSON.parse(data.subcontractors);
			TASK_OBJECT.WAREHOUSES = JSON.parse(data.warehouse);
			createMaps();
			getUniqueProjectIds();
			getSpecificPartsOfProject();
		}
	});
	

}

function createMaps()
{
	for(var i = 0; i < TASK_OBJECT.ITEMS.length; i++)
	  {
		 TASK_OBJECT._ITEMS["_" + TASK_OBJECT.ITEMS[i].id] = TASK_OBJECT.ITEMS[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT.PERSONS.length; i++)
	  {
		 TASK_OBJECT._PERSONS["_" + TASK_OBJECT.PERSONS[i].id] = TASK_OBJECT.PERSONS[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT.USERS.length; i++)
	  {
		 TASK_OBJECT._USERS["_" + TASK_OBJECT.USERS[i].id] = TASK_OBJECT.USERS[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT.SUBS.length; i++)
	  {
		 TASK_OBJECT._SUBS["_" + TASK_OBJECT.SUBS[i].id] = TASK_OBJECT.SUBS[i];
	  }
	
	for(var i = 0; i < TASK_OBJECT.WAREHOUSES.length; i++)
	  {
		 TASK_OBJECT._WAREHOUSES["_" + TASK_OBJECT.WAREHOUSES[i].id] = TASK_OBJECT.WAREHOUSES[i];
	  }
	

}

function getUniqueProjectIds()
{	
	for(var i = 0; i < TASK_OBJECT.TASKS.length; i++){
		if(UNIQUE_IDS["_" + TASK_OBJECT.TASKS[i].project] == undefined) {
			UNIQUE_IDS["_" + TASK_OBJECT.TASKS[i].project] = true;
			TASK_OBJECT.PROJ_IDS.push(TASK_OBJECT.TASKS[i].project);
		}
	}
	
}

