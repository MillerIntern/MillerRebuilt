'use strict';
const HOMEPAGE = "homepage.html";
const FINDPROJECT = "findProject.html";
const PROJECTS = "projects.html";
const PROJECTINFO = 'projectData.html';
const PROJECTMANAGER = 'projectManager.html';
const PROJECT_PERMITS_AND_INSPECTIONS = 'permitData.html';
const PROJECT_CLOSEOUT = 'closeoutData.html';
const PROJECT_CHANGE_ORDER = 'changeOrderData.html';
const CHANGE_ORDER_PRINT = 'projectDataPrint.html?type=changeOrders&';
const PROJECT_EQUIPMENT = 'equipmentData.html';
const EQUIPMENT_PRINT = 'projectDataPrint.html?type=equipment&';
const TASK_CREATOR = 'taskForm.html';

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}



//This function assigns an array of attributes to an element
//Input: the HTML element, array (a mapping of strings and values)
//Output: none (the element's attributes are assigned)
/*function setAttributes(el, attrs) {
	  for(var key in attrs) {
	    el.setAttribute(key, attrs[key]);
	  }
}*/

//This function gets parameters from the URL
//Input: the parameter name
//Output: the value of the parameter
function getParameterByName(name) 
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//This function determines is a string is a valid date string
//Input: str
//Output: true if the string is formatted as a valid
function isDate(str)
{
	var date = String(str).split("/");
	if (date.length != 3)
		return false;

	var month = date[0], day = date[1], year = date[2];
	var monthString = month.toString();
	var dayString = day.toString();
	var yearString = year.toString();
	
	if(monthString.length != 1 && monthString.length != 2) return false;
	if(dayString.length != 1 && dayString.length != 2) return false;
	if(yearString.length != 4 && yearString.length != 2) return false;
	
	for(var i = 0; i < monthString.length; i++){
		if(isNaN(monthString[i])) return false;
	}
	for(var i = 0; i < dayString.length; i++){
		if(isNaN(dayString[i])) return false;
	}
	for(var i = 0; i < yearString.length; i++){
		if(isNaN(yearString[i])) return false;
	}
	
	if(month < 1 || month > 12) return false;
	if(day < 1 || day > 31) return false;
	var currentYear = getYear();
	var currentYearString = currentYear.toString();
	var twoDigitYear = currentYearString[2] + currentYearString[3];
	/**
	if(yearString.length == 2){
		if(year < twoDigitYear) return false;
	}
	else {
		if(year < currentYear) return false;
	}
	*/
	
	
	return true;
}

function dateCleaner(date_arg) {

	var date = date_arg.toString().split("/");
	var day = date[0].toString(), month = date[1].toString(), year = date[2].toString();
	if(day.length == 1) day = "0"+day;
	if(month.length == 1) month = "0"+month;

	if(year.length == 2) year = "20"+year;
	date_arg = day+"/"+month+"/"+year;

	return date_arg;
}

function goHome (){
	window.location.href = HOMEPAGE;
}

function returnToFindProject () {
	window.location.href = FINDPROJECT;
}

function logout() {
	//$('#logout').width(100);
	//$('#logout').css('display', 'block');
	//$('#logout').center();
}

function returnToLogin()
{
	if(confirm("Login Session has expired. Would you like to relogin?"))
		window.location.href = "index.html";
}

function setProjectHeader (projectData, currentDivLocation, previousDivLocation) {
	let city = projectData.warehouse.city.name;
	let state = projectData.warehouse.state;
	
	state = state.replace('_', ' ');
	state = toTitleCase(state);
	
	let item = projectData.projectItem.name;
	
	if(!currentDivLocation) $(document).find("#projectHeader").text(city + " #" + projectData.warehouse.warehouseID  + " - " +  item);
	else {
		convertCurrentDivLocation(currentDivLocation);
		$('#'+currentDivLocation).find("#projectHeader").text(city + " #" + projectData.warehouse.warehouseID  + " - " +  item);
	}

}



function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getToday() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1; // 0 is jan
	var year = today.getFullYear();
	
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	
	today = month + '/' + day + '/' + year;
	return today;
}

function getYear() {
	var today = new Date();
	var year = today.getFullYear();
	return year;
}

function comingSoon(source) {
	if($(source).is('button'))
		$(source).html('Coming Soon!');
}

/* *
 * Expected input, button with value attribute equal to task to close
 */
function closeTaskById (source) {
	let taskID = $(source).val();
	console.log('taskID: ' + $(source).val());
	
	if(typeof taskID === 'undefined') return alert('Invalid Task ID. Try to reload!');
	
	$.ajax({
		type: 'POST', 
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'closeTask',
			'taskID': taskID
		}, complete: function (data) {
			console.log(data);
			if ($.trim(data.responseText) === 'TASK_CLOSED') {
				alert('Task Closed!');
				console.log($(source).parent('tr'));
				$(source).parent().parent('tr').remove();
				if($('#taskWell')) {
					$('#taskWell').slideUp();
				}
			}
		}
	});
}


