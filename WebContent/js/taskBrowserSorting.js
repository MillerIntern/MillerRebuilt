/*
 * This document provides all of the sorting functionality for taskBrowser.html
 * It allows administrators to sort by multiple keys [priority, due date, assignee]
 * NON-admin users are able to sort by one key at a time [priority or due date]
 */

'use strict';

var advancedSort = false;

$(document).on('change', '.sortSelection', function () {	
	console.log("in itttttt");
	console.log(document.getElementById("sortSelector").value);
	basicUserSort();
});

$(document).on('click', '#advancedSort', function (){
	console.log("clickig");
	if(document.getElementById('advancedSort').value == 'off') {
		$('.advancedSortingSelector').toggle('push-out animated');
		//document.getElementById('advancedSort').value = 'on';
	}
	else if(document.getElementById('advancedSort').value == 'on') {
		$('.advancedSortingSelector').toggle('push-in animated fadeOutLeft');
		document.getElementById('advancedSort').value = 'off';
	}
});

$(document).on('click', '#secondaryKey', function (){
	if(document.getElementById('primaryKey').value == 'none') alert("need a primary key");
});

$(document).on('click', '#tertiaryKey', function (){
	if(document.getElementById('primaryKey').value == 'none') {alert("need a primary key"); return;}
	else if(document.getElementById('secondaryKey').value == 'none') alert("need a secondary key");
});

$(document).on('click', '.sortKey', function (){
	if(document.getElementById('primaryKey').value=='none') 
		document.getElementById('primaryKey').style.background = 'rgb(255,0,0)';
	if(document.getElementById('secondaryKey').value=='none') 
		document.getElementById('secondaryKey').style.background = 'rgb(255,0,0)';
	if(document.getElementById('tertiaryKey').value=='none') 
		document.getElementById('tertiaryKey').style.background = 'rgb(255,0,0)';
});

$(document).on('change', '.sortKey', function (){
	if(document.getElementById('primaryKey').value!='none') 
		document.getElementById('primaryKey').style.background = 'rgb(0,255,0)';
	if(document.getElementById('secondaryKey').value!='none') 
		document.getElementById('secondaryKey').style.background = 'rgb(0,255,0)';
	if(document.getElementById('tertiaryKey').value!='none') 
		document.getElementById('tertiaryKey').style.background = 'rgb(0,255,0)';
	if(document.getElementById('tertiaryKey').value == document.getElementById('secondaryKey').value
	   || document.getElementById('tertiaryKey').value == document.getElementById('primaryKey').value)
		document.getElementById('tertiaryKey').style.background = 'rgb(255,0,0)';
	if(document.getElementById('secondaryKey').value == document.getElementById('primaryKey').value)
		document.getElementById('secondaryKey').style.background = 'rgb(255,0,0)';
	if(document.getElementById('primaryKey').value != 'none'
		&& document.getElementById('secondaryKey').value != 'none'
		&& document.getElementById('tertiaryKey').value	!= 'none')
		document.getElementById("advancedSortButton").setAttribute('class','btn btn-success advancedSortingOptions advancedSortingSelector');

});




function basicUserSort() 
{
	if(document.getElementById("sortSelector").value == 'none') return;
	if(document.getElementById("sortSelector").value == 'priority' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByPriorityAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByPriorityDescending();
		}
	}
	if(document.getElementById("sortSelector").value == 'date' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByDateAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByDateDescending();
		}
		console.log("Right hizzzzer");
	}
	if(document.getElementById("sortSelector").value == 'assignee' ){
		if(document.getElementById("sortOrder").value == 'ascending'){
			sortByAssigneeAscending();
		}
		if(document.getElementById("sortOrder").value == 'descending'){
			sortByAssigneeDescending();
		}
		console.log("sorting by assignee");
	}
}

function sortByAssigneeAscending()
{
	projectsOfInterest.sort(function(a,b){
	if(a.assignee.firstName < b.assignee.firstName) return -1;
	if(a.assignee.firstName > b.assignee.firstName) return 1;
	return 0;
	})
	displaySortingResults();
}

function sortByAssigneeDescending()
{
	projectsOfInterest.sort(function(a,b){
	if(a.assignee.firstName < b.assignee.firstName) return 1;
	if(a.assignee.firstName > b.assignee.firstName) return -1;
	return 0;
	})
	displaySortingResults();
}

function sortByDateAscending() 
{
	console.log(tasks); 
	projectsOfInterest.sort(function(a,b){
	 console.log("A = ", a, " b = ",b);
      var dateA, dateB;
      dateA = a.dueDate.split("/");
      dateB = b.dueDate.split("/");
      if(dateA[2] < dateB[2]) return -1;
      if(dateA[2] > dateB[2]) return 1;
      if(dateA[0] < dateB[0]) return -1;
      if(dateA[0] > dateB[0]) return 1;
      if(dateA[1] < dateB[1]) return -1;
      if(dateA[1] > dateB[1]) return 1;
      return 0;
    })
    console.log("post sort");
    console.log(tasks); 	
    displaySortingResults();    		
    }

function sortByDateDescending() {
	console.log(tasks); 
	projectsOfInterest.sort(function(a,b){
      var dateA, dateB;
      dateA = a.dueDate.split("/");
      dateB = b.dueDate.split("/");
      if(dateA[2] < dateB[2]) return 1;
      if(dateA[2] > dateB[2]) return -1;
      if(dateA[0] < dateB[0]) return 1;
      if(dateA[0] > dateB[0]) return -1;
      if(dateA[1] < dateB[1]) return 1;
      if(dateA[1] > dateB[1]) return -1;
      return 0;
    })
    console.log("post sort");
    console.log(tasks); 	
    displaySortingResults();    		
 }
    

function sortByPriorityAscending() {
	console.log(tasks);  
	console.log("user = ");
	console.log(user);
	projectsOfInterest.sort(function(a,b){
		  if (a.severity < b.severity) return -1;
		  if (a.severity > b.severity) return 1;
		  return 0;
		});
   displaySortingResults();
}


function sortByPriorityDescending() {
	console.log(tasks);  
	projectsOfInterest.sort(function(a,b){
		  if (a.severity < b.severity) return 1;
		  if (a.severity > b.severity) return -1;
		  return 0;
		});
	displaySortingResults();
}

function sortElementByPriority(a,b){
	  if(!a.severity || !b.severity) return;
	  if (a.severity < b.severity) return -1;
	  if (a.severity > b.severity) return 1;
	  if(document.getElementById("tertiaryKey").value == 'priority') return 0;
	  else if(document.getElementById('primaryKey').value == 'priority'
		  && document.getElementById('secondaryKey').value == 'date') return sortElementByDate(a,b);
	  else if(document.getElementById('primaryKey').value == 'priority'
		  && document.getElementById('secondaryKey').value == 'assignee') return sortElementByAssignee(a,b);
	  else if(document.getElementById('secondaryKey').value == 'priority'
		  && document.getElementById('tertiaryKey').value == 'date') return sortElementByDate(a,b);
	  else if(document.getElementById('secondaryKey').value == 'priority'
		  && document.getElementById('tertiaryKey').value == 'assignee') return sortElementByAssignee(a,b);
	}

function sortElementByDate(a,b){
    var dateA, dateB;
    if(!a.dueDate || !b.dueDate) return;
    dateA = a.dueDate.split("/");
    dateB = b.dueDate.split("/");
    if(dateA[2] < dateB[2]) return -1;
    if(dateA[2] > dateB[2]) return 1;
    if(dateA[0] < dateB[0]) return -1;
    if(dateA[0] > dateB[0]) return 1;
    if(dateA[1] < dateB[1]) return -1;
    if(dateA[1] > dateB[1]) return 1;
    if(document.getElementById("tertiaryKey").value == 'date') return 0;
  else if(document.getElementById('primaryKey').value == 'date'
	  && document.getElementById('secondaryKey').value == 'priority') return sortElementByPriority(a,b);
  else if(document.getElementById('primaryKey').value == 'date'
	  && document.getElementById('secondaryKey').value == 'assignee') return sortElementByAssignee(a,b);
  else if(document.getElementById('secondaryKey').value == 'date'
	  && document.getElementById('tertiaryKey').value == 'priority') return sortElementByPriority(a,b);
  else if(document.getElementById('secondaryKey').value == 'date'
	  && document.getElementById('tertiaryKey').value == 'assignee') return sortElementByAssignee(a,b);
  }

function sortElementByAssignee(a,b){
	if(a.assignee.firstName < b.assignee.firstName) return -1;
	if(a.assignee.firstName > b.assignee.firstName) return 1;
	if(document.getElementById("tertiaryKey").value == 'assignee') return 0;
	  else if(document.getElementById('primaryKey').value == 'assignee'
		  && document.getElementById('secondaryKey').value == 'priority') return sortElementByPriority(a,b);
	  else if(document.getElementById('primaryKey').value == 'assignee'
		  && document.getElementById('secondaryKey').value == 'date') return sortElementByDate(a,b);
	  else if(document.getElementById('secondaryKey').value == 'assignee'
		  && document.getElementById('tertiaryKey').value == 'priority') return sortElementByPriority(a,b);
	  else if(document.getElementById('secondaryKey').value == 'assignee'
		  && document.getElementById('tertiaryKey').value == 'date') return sortElementByDate(a,b);
}
	


function advancedSorting(){
	console.log("advanced Sorting!");
	advancedSort = true;
	if(document.getElementById('primaryKey').value == 'priority'){
		projectsOfInterest.sort(function compare(a,b){return sortElementByPriority(a,b)});	
		console.log("priority is primary");
	} else if(document.getElementById('primaryKey').value == 'date'){
		projectsOfInterest.sort(function compare(a,b){return sortElementByDate(a,b)});
		console.log("date is primary");
	} else if(document.getElementById('primaryKey').value == 'assignee'){
		projectsOfInterest.sort(function compare(a,b){return sortElementByAssignee(a,b)});	
		console.log("assignee is primary");
	} else if(document.getElementById('primaryKey').value == 'none'){console.log("advanced sorting error!");}
	
	displaySortingResults();
}

function advancedSortValidation(){
	
	console.log("advanced validation!!");
	if(document.getElementById('primaryKey').value == 'none') {alert("Must have a primary key before sorting"); return;}
	else if(document.getElementById('secondaryKey').value == 'none') {alert("Must have a secondary key before sorting"); return;}
	else if(document.getElementById('tertiaryKey').value == 'none') {alert("Must have a tertiary key before sorting"); return;}
	else if(document.getElementById('primaryKey').value == document.getElementById('secondaryKey').value
            || document.getElementById('secondaryKey').value == document.getElementById('tertiaryKey').value
            || document.getElementById('primaryKey').value == document.getElementById('tertiaryKey').value) {
		alert("Keys cannot have equal values");
	    return;
     }
	advancedSorting();
}





function displaySortingResults(){
	clearTaskTable();
    if(user.permission.id != 1) createTaskTableFromFilter();
    else if(user.permission.id == 1) {console.log("post sortttt"); createTaskTableFromFilter();}
    
    else{
    	console.log("Unprepared for this ELSE condition");
    }
}

