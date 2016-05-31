function logout()
{
	
	$.ajax({
		type: 'POST',
		url: 'Logout' 
	});
	window.location = '/MillerSite/index.html';
}

function goBack()
{	
	window.history.back();
}