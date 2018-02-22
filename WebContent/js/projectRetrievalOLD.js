function assignProjectItems() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.ITEMS.length; j++) {	 
			  
			  if(PROJECT_OBJECT.PROJECTS[i].projectItem == PROJECT_OBJECT.ITEMS[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectItem = PROJECT_OBJECT.ITEMS[j];
		  }
	  }
	  */
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
		 PROJECT_OBJECT.PROJECTS[i].projectItem = PROJECT_OBJECT.ITEMS["_" + PROJECT_OBJECT.PROJECTS[i].projectItem];		  
	  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectStages() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.STAGES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].stage == PROJECT_OBJECT.STAGES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].stage = PROJECT_OBJECT.STAGES[j];
		  }
	  }
	  */
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].stage = PROJECT_OBJECT.STAGES["_" + PROJECT_OBJECT.PROJECTS[i].stage];		  
		  }
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectStatuses() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.STATUSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].status == PROJECT_OBJECT.STATUSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].status = PROJECT_OBJECT.STATUSES[j];
		  }
	  }
	  */
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].status = PROJECT_OBJECT.STATUSES["_" + PROJECT_OBJECT.PROJECTS[i].status];		  
		  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectTypes() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.TYPES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].projectType == PROJECT_OBJECT.TYPES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectType = PROJECT_OBJECT.TYPES[j];
		  }
	  }
	  */
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].projectType = PROJECT_OBJECT.TYPES["_" + PROJECT_OBJECT.PROJECTS[i].projectType];		  
		  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectWarehouses() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.WAREHOUSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].warehouse == PROJECT_OBJECT.WAREHOUSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].warehouse = PROJECT_OBJECT.WAREHOUSES[j];
		  }
	  }
	  */
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].warehouse = PROJECT_OBJECT.WAREHOUSES["_" + PROJECT_OBJECT.PROJECTS[i].warehouse];		  
		  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectManagers() {
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.PERSONS.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].projectManagers == PROJECT_OBJECT.PERSONS[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectManagers = PROJECT_OBJECT.PERSONS[j];
		  }
	  }
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].projectManagers = PROJECT_OBJECT.PERSONS["_" + PROJECT_OBJECT.PROJECTS[i].projectManagers];		  
		  }
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
  
  function assignProjectClasses() {
	  
	  /*
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {
		  for(var j = 0; j < PROJECT_OBJECT.CLASSES.length; j++) {
			  if(PROJECT_OBJECT.PROJECTS[i].projectClass == PROJECT_OBJECT.CLASSES[j].id)
				  PROJECT_OBJECT.PROJECTS[i].projectClass = PROJECT_OBJECT.CLASSES[j];
		  }
	  }
	  */
	  
	  for(var i = 0; i < PROJECT_OBJECT.PROJECTS.length; i++) {	 
			 PROJECT_OBJECT.PROJECTS[i].projectClass = PROJECT_OBJECT.CLASSES["_" + PROJECT_OBJECT.PROJECTS[i].projectClass];		  
		  }
	  
	  //console.log("PROJECT_OBJECT_MATCH " , PROJECT_OBJECT);
  }
