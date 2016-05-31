//This code block allows the user to login when the enter button is pressed
var ENTER = 13;

$(function() {
    $("body").keypress(function (e) {
        if ((e.which && e.which == ENTER) || (e.keyCode && e.keyCode == ENTER)) {
            login();
        }
    });
});

function login()
{
	var username = $("#username").val();
	var password = $("#password").val();
	
	$.ajax({
		type: 'POST',
		url: 'Login', 
		data: 
		{
			'username': username,
			'password': password
		},
		success: function(data)
		{
			data = $.trim(data);
			if (data == "false")
			{
				$("#notification").html("The information entered is not correct. Please try again.");
			}
			else
			{
				$("#notification").html("");
				document.location.href = "homepage.html";
			}
		}	
	});
}