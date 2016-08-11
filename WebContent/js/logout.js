function logout()
{
	
	$.ajax({
		type: 'POST',
		url: 'Logout' 
	});
	window.location.href = 'index.html';
}

function goBack()
{	
	window.history.back();
}