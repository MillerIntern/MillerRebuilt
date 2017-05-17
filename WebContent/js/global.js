'use strict';
const HOMEPAGE = "homepage.html";
const FINDPROJECT = "findProject.html";
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
	var t = String(str).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
	if(t===null)
		return false;
	var m=+t[1], d=+t[2], y=+t[3];
	//below should be more accurate algorithm
	if(m>=1 && m<=12 && d>=1 && d<=31)
		return true; 
	else
		return false;
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

function setProjectHeader (projectData) {
	let city = projectData.warehouse.city.name;
	let state = projectData.warehouse.state;
	
	state = state.replace('_', ' ');
	state = toTitleCase(state);
	
	let item = projectData.projectItem.name;
	$("#projectHeader").text(city + " #" + projectData.warehouse.warehouseID  + " - " +  item);
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
