let PROJECT_OBJECT = {
		'PROJECTS' : undefined ,
		'ITEMS' : undefined ,
		'PERSONS' : undefined ,
		'TYPES' : undefined ,
		'STAGES' : undefined ,
		'STATUSES' : undefined ,
		'WAREHOUSES' : undefined ,
		'CLASSES' : undefined
}

let TIME_START;
let TIME_FINISH;

  function getTheProjects() {
	  let date = new Date();
	  TIME_START = date.getTime();
	  
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'action': 'GET_ALL_PROJECTS',
		}, complete: function (response) {
			console.log("RESPONSE FROM getTheProjects() = ",response);			
			if (response.responseJSON) {
				PROJECT_OBJECT.PROJECTS = JSON.parse(response.responseJSON);
				console.log(PROJECT_OBJECT.PROJECTS);

				getTheProjectEnums();
			}
			else { 
				console.log("ERROR RESPONE FROM getTheProjects() = ", response);
			}
			
		}
	});
  }
  
  function getTheProjectEnums() {
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificObjects',
			'warehouse': true,
			'class': true,
			'item': true,
			'person': true,
			'type': true,
			'status': true,
			'stage' : true ,
		}, success: function(data) {
			//console.log("RETRIEVED DATA" , data);
			PROJECT_OBJECT.ITEMS = JSON.parse(data.item);
			PROJECT_OBJECT.PERSONS = JSON.parse(data.person);
			PROJECT_OBJECT.TYPES = JSON.parse(data.type);
			PROJECT_OBJECT.STAGES = JSON.parse(data.stage);
			PROJECT_OBJECT.STATUSES = JSON.parse(data.status);
			PROJECT_OBJECT.WAREHOUSES = JSON.parse(data.warehouse);
			PROJECT_OBJECT.CLASSES = JSON.parse(data["class"])
			
			console.log("PROJECT_OBJECT " , PROJECT_OBJECT);
			
			beginProjectMatching();

			
		}, error: function(data) {
			console.log(data);
			alert('Something has gone horribly wrong!');
		}
	});
	

  }
  
  function beginProjectMatching() {
	  assignProjectItems();
	  assignProjectStages();
	  assignProjectStatuses();
	  assignProjectTypes();
	  assignProjectWarehouses();
	  assignProjectManagers();
	  assignProjectClasses();
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		for(var q = 0; q < 9; q++){
			var num = 8 - q;
			PROJECT_OBJECT.PROJECTS[i].splice(num, 1);
		}
	  }
	  
	  let date = new Date();

	  TIME_FINISHED = date.getTime();
	  
	  let timeTook = TIME_FINISHED - TIME_START;
	  
	  console.log("Took " + timeTook + "ms");	  
	  console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectItems() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.ITEMS.length; j++) {
			 
			  PROJECT_OBJECT.PROJECTS[i].id = PROJECT_OBJECT.PROJECTS[i][0];
			  PROJECT_OBJECT.PROJECTS[i].McsNumber = PROJECT_OBJECT.PROJECTS[i][1];
			  
			  if(PROJECT_OBJECT.PROJECTS[i][2] == PROJECT_OBJECT.ITEMS[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectItem = PROJECT_OBJECT.ITEMS[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectStages() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.STAGES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][4] == PROJECT_OBJECT.STAGES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].stage = PROJECT_OBJECT.STAGES[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectStatuses() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.STATUSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][5] == PROJECT_OBJECT.STATUSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].status = PROJECT_OBJECT.STATUSES[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectTypes() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.TYPES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][3] == PROJECT_OBJECT.TYPES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectType = PROJECT_OBJECT.TYPES[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectWarehouses() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.WAREHOUSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][6] == PROJECT_OBJECT.WAREHOUSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].warehouse = PROJECT_OBJECT.WAREHOUSES[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectManagers() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.PERSONS.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][7] == PROJECT_OBJECT.PERSONS[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectManagers = PROJECT_OBJECT.PERSONS[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectClasses() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.CLASSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i][8] == PROJECT_OBJECT.CLASSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectClass = PROJECT_OBJECT.CLASSES[j];
		  }
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
