let PROJECT_OBJECT = {
		PROJECTS : undefined ,
		ITEMS : undefined ,
		PERSONS : undefined ,
		TYPES : undefined ,
		STAGES : undefined ,
		STATUSES : undefined ,
		WAREHOUSES : undefined ,
		CLASSES : undefined
}

let TIME_START;
let TIME_FINISH;

 function getTheProjects() {
	 
		if(getParameterByName("from")) $('.projectNavigator-projectFinder').hide();
		clearAndAddSingleRow("Retrieving Projects...");
		if (getParameterByName('type') === 'findTaskProject') {
			$('#param-field').before('<h3>Select a Project to Create Task for:</h3>');
			taskFinder = true;
		} else taskFinder = false;
		
	  let date = new Date();
	  TIME_START = date.getTime();
	  
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'action': 'GET_ALL_PROJECTS',
		}, complete: function (response) {

			console.log("RESPONSE FROM getTheProjects() = ", response);	
			if (response.responseJSON) {
				
				PROJECT_OBJECT.PROJECTS = new Array();
				for(var i = 0; i < response.responseJSON.length; i++) {
					PROJECT_OBJECT.PROJECTS[i] = new Array();
					
					PROJECT_OBJECT.PROJECTS[i].id = response.responseJSON[i][0];
					PROJECT_OBJECT.PROJECTS[i].McsNumber = response.responseJSON[i][1];
					PROJECT_OBJECT.PROJECTS[i].projectItem = response.responseJSON[i][2];
					PROJECT_OBJECT.PROJECTS[i].projectType = response.responseJSON[i][3];
					PROJECT_OBJECT.PROJECTS[i].stage = response.responseJSON[i][4];
					PROJECT_OBJECT.PROJECTS[i].status = response.responseJSON[i][5];
					PROJECT_OBJECT.PROJECTS[i].warehouse = response.responseJSON[i][6];
					PROJECT_OBJECT.PROJECTS[i].projectManagers = response.responseJSON[i][7];
					PROJECT_OBJECT.PROJECTS[i].projectClass = response.responseJSON[i][8];
					PROJECT_OBJECT.PROJECTS[i].mediumScore = response.responseJSON[i][9];
				}
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
			PROJECT_OBJECT.CLASSES = JSON.parse(data["class"]);
				
			createMaps();
						
			beginProjectMatching();
			
			
			
			//projects = data;
			//RETRIEVED_PROJECTS = JSON.parse(projects['projects']);
			
			
			RETRIEVED_PROJECTS = PROJECT_OBJECT.PROJECTS;
			
			if(RETRIEVED_PROJECTS) console.log("getAllProjects() - PROJECTS HAVE BEEN RETRIEVED");
			$('.projectNavigator-projectFinder').show();
			console.log("PROJECTS ARE : ", RETRIEVED_PROJECTS);
			getSearchCriteria();
			
		}, error: function(data) {
			console.log(data);
			alert('Something has gone horribly wrong!');
		}
	});
	

  }
  
  function createMaps()
  {
	  for(var i = 0; i < PROJECT_OBJECT.ITEMS.length; i++)
	  {
		 PROJECT_OBJECT.ITEMS["_" + PROJECT_OBJECT.ITEMS[i].id] = PROJECT_OBJECT.ITEMS[i];
	  }
	  
	  for(var i = 0; i < PROJECT_OBJECT.PERSONS.length; i++)
	  {
		 PROJECT_OBJECT.PERSONS["_" + PROJECT_OBJECT.PERSONS[i].id] = PROJECT_OBJECT.PERSONS[i];
	  }
	  for(var i = 0; i < PROJECT_OBJECT.TYPES.length; i++)
	  {
		 PROJECT_OBJECT.TYPES["_" + PROJECT_OBJECT.TYPES[i].id] = PROJECT_OBJECT.TYPES[i];
	  }
	  for(var i = 0; i < PROJECT_OBJECT.STAGES.length; i++)
	  {
		 PROJECT_OBJECT.STAGES["_" + PROJECT_OBJECT.STAGES[i].id] = PROJECT_OBJECT.STAGES[i];
	  }
	  for(var i = 0; i < PROJECT_OBJECT.STATUSES.length; i++)
	  {		 
		 PROJECT_OBJECT.STATUSES["_" + PROJECT_OBJECT.STATUSES[i].id] = PROJECT_OBJECT.STATUSES[i];
	  }
	  for(var i = 0; i < PROJECT_OBJECT.WAREHOUSES.length; i++)
	  {
		 PROJECT_OBJECT.WAREHOUSES["_" + PROJECT_OBJECT.WAREHOUSES[i].id] = PROJECT_OBJECT.WAREHOUSES[i];
	  }
	  for(var i = 0; i < PROJECT_OBJECT.CLASSES.length; i++)
	  {
		 PROJECT_OBJECT.CLASSES["_" + PROJECT_OBJECT.CLASSES[i].id] = PROJECT_OBJECT.CLASSES[i];
	  }
	 
  }
  
  function beginProjectMatching() {
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) 
	  {
		  PROJECT_OBJECT.PROJECTS[i].projectItem = PROJECT_OBJECT.ITEMS["_" + PROJECT_OBJECT.PROJECTS[i].projectItem];		  
		  PROJECT_OBJECT.PROJECTS[i].stage = PROJECT_OBJECT.STAGES["_" + PROJECT_OBJECT.PROJECTS[i].stage];
		  PROJECT_OBJECT.PROJECTS[i].status = PROJECT_OBJECT.STATUSES["_" + PROJECT_OBJECT.PROJECTS[i].status];
	      PROJECT_OBJECT.PROJECTS[i].projectType = PROJECT_OBJECT.TYPES["_" + PROJECT_OBJECT.PROJECTS[i].projectType];		  
	      PROJECT_OBJECT.PROJECTS[i].warehouse = PROJECT_OBJECT.WAREHOUSES["_" + PROJECT_OBJECT.PROJECTS[i].warehouse];
	      PROJECT_OBJECT.PROJECTS[i].projectManagers = PROJECT_OBJECT.PERSONS["_" + PROJECT_OBJECT.PROJECTS[i].projectManagers];
	      PROJECT_OBJECT.PROJECTS[i].projectClass = PROJECT_OBJECT.CLASSES["_" + PROJECT_OBJECT.PROJECTS[i].projectClass];
	  }
	 
	  let date = new Date();

	  TIME_FINISHED = date.getTime();
	  
	  let timeTook = TIME_FINISHED - TIME_START;
	  
	  console.log("Took " + timeTook + "ms");	  
	  console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
	  
  }
  
  