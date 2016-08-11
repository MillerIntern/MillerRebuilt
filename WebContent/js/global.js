//This function assigns an array of attributes to an element
//Input: the HTML element, array (a mapping of strings and values)
//Output: none (the element's attributes are assigned)
function setAttributes(el, attrs) {
	  for(var key in attrs) {
	    el.setAttribute(key, attrs[key]);
	  }
}

//This function gets parameters from the URL
//Input: the parameter name
//Output: the value of the parameter
function getParameterByName(name) 
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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


//This function retrieves all of the user data from the server
//Input: none
//Output: none 
$(document).ready(function() {
function getTriggers()
{	
	$.ajax({
		type: 'POST',
		url: 'Trigger', 
		data: 
		{
			'action': 'getTriggers',
		},
		success: function(data)
		{	
			fillInNotificationPanes(data);
		}
	});
}});

//Input: JSON array (contains triggers)
//Output: none (puts HTML elements in the document)
//Purpose: This function fills each HTML trigger pane with the appropriate trigger notifications
function fillInNotificationPanes(triggers)
{
	var infoCount = 0;
	var warningCount = 0;
	var severeCount = 0;
	for (var i = 0; i < triggers.length; i++)
	{
		//Get all projects that fall under the trigger
		var trigger = triggers[i];
		var projects = trigger.projects;
		
		for (var j = 0; j < projects.length; j++)
		{
			if (trigger.severity == 0)
				{
					infoCount++;
				}
			else if (trigger.severity == 1)
				{
					warningCount++;
				}
			else
				{
					severeCount++;
				}
		}
	}
	$("#notificationBoxGreen").append("(" +infoCount+ ")");
	$("#notificationBoxYellow").append("(" +warningCount+ ")");
	$("#notificationBoxRed").append("(" + severeCount+ ")");
}

function goBack()
{
	document.location.href = "projectBrowser.html?type=edit&id="+getParameterByName("id");
}

function goHome()
{
	document.location.href = 'homepage.html';
}

function returnToLogin()
{
	$('.title').text('Login Session Expired!');
	if(confirm("Login Session has expired. Would you like to relogin?"))
		window.location.href = "index.html";
}
