'use strict';
let user;
let newPassword;
let confirmNewPassword;


$(document).on('change', '#inputNewPassword',function(){
	console.log("new password inputed");
	newPassword = document.getElementById("inputNewPassword").value;
});

$(document).on('change', '#confirmNewPassword',function(){
	console.log("confirm password inputed");
	confirmNewPassword = document.getElementById("confirmNewPassword").value;
	console.log("password = ",confirmNewPassword);
});

$(document).on('click', '#changePasswordButton',function(){
	console.log("clicked the button!");
	if(document.getElementById('newPasswordDropdown').style.display == 'inline'){
		if(passwordConfirmer()) changeUserPassword();
	}
	else{login()}
});


$(document).ready(function () {
	$('.form-signin').fadeIn('slow');
	
	$('.form-signin').submit(function (event) {
		event.preventDefault();
		login();
	});
	
		$('#inputUsername, #inputPassword').focus(function () {
			$('#invalidLogin').slideUp();
			$('#invalidLogin').fadeOut('slow');
		});
});

//This code block allows the user to login when the enter button is pressed
let ENTER = 13;

$(function() {
    $("body").keypress(function (e) {
        if ((e.which && e.which == ENTER) || (e.keyCode && e.keyCode == ENTER)) {
            login();
        }
    });
});

function login () {
	console.log('login');
	
	let username = $('#inputUsername').val();
	let password = $('#inputPassword').val();
	if(username != user.name) {alert("incorrect username!");return;}
	
	$.ajax({
		type: 'POST', 
		url: 'Login', 
		data: {
			'username': username,
			'password': password 
		}, success: function (data) {
			data = $.trim(data);
			if(data === 'false') {
				$('#invalidLogin').slideDown();
			} else {
				document.getElementById('newPasswordDropdown').style.display = 'inline';
			}
			
		}, error: function(data) {
			$('#errorText').text('Server is down!');
			$('#invalidLogin').slideDown();
		}
	});
}

/*
 * TODO: CHANGE THE NEW PASSWORD TO WHAT THE USER ACTUALLY INPUTTED
 */
function changeUserPassword () {
	console.log("OG user = ", user);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'changePassword',
			'id'  : user.id ,
			'newPassword' : confirmNewPassword
		}, complete: function (data) {
			console.log(data);
			if(data) {
			  alert('Password Changed');
			  location.href = 'homepage.html';
			} else {
				alert('Server Failed!');
				
			}
		}
	});
}
function getUserData () {
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			console.log(data);
			if(data.responseJSON) {
			  user = data.responseJSON;	
			  
			} else {
				alert('Server Failure!');
				
			}
		}
	});
}


function passwordConfirmer() {
	return(newPassword == confirmNewPassword);
}