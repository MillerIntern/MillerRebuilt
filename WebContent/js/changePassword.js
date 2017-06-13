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
		if(passwordConfirmer() && validPassword()) changeUserPassword();
		else{alert('Invalid Password!')}
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
			'id'  : user.id,
			'newPassword' : confirmNewPassword
		}, complete: function (data) {
			console.log("data = ", data);
			if(data) {
			  alert('Password Changed :)');
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
/*
 * password must have at least 10 characters
 * password also must have either a number or capital letter
 * TODO MUST FIX REQUIREMENTS
 */
function validPassword() {
	var valid = false;
	if(newPassword.length < 8) return valid;
	for(var i=0; i<newPassword.length;i++){
		if(newPassword[i] == newPassword[i].toUpperCase()) {valid = true; break; }
	}
	if(valid == false) return valid;
	var q = 0;
	for(; q<newPassword.length;q++){
		if(isNaN(newPassword[q])) {valid = true; console.log("pass = ", newPassword[q]);break;}
	}
	if(q == newPassword.length) valid = false;
	console.log("valid = ",valid);
	return valid;
}
