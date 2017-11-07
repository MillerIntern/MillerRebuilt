

let states;
let cities;
let trades;
let subcontractors;

function preparePage()
{
	getAllStates();
	return;
}

function getAllStates()
{
	$.ajax({
		type: 'POST',
		url: 'Admin',
		data:
		{
			'action': 'getStates',
		},
		success: function(data)
		{
			states = JSON.parse(data);
			console.log("STATES = ", states)
			getAllCities();
		},
	});
}

function getAllCities()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data:
		{
			'action': 'getAllCities',
		},
		success: function(data)
		{
			cities = data;
			console.log("CITIES = ", cities)
			getAllTrades();
			
		},
	});
}

function getAllTrades()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data:
		{
			'action': 'getAllTrades',
		},
		success: function(data)
		{
			trades = data;
			console.log("TRADES = ", trades)
			getAllSubcontractors();
			
		},
	});
}

function getAllSubcontractors()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data:
		{
			'action': 'getAllSubcontractors',
		},
		success: function(data)
		{
			console.log(data);
			subcontractors = data;
			//console.log("CITIES = ", cities)
			
			
		},
	});
	
}

function createNewSubcontractor()
{

	    let region = $('#region').val();
	    let trades = $('#trades').val();
	    let name = $('#name').val();
	    let contacts = $('#contacts').val();
	    let phone = $('#phone').val();
	    let mobile = $('#mobile').val();
	    let email = $('#email').val();
	    let workRegion = $('#workRegion').val();
	    let address = $('#address').val();
	    let state = $('#state').val();
	    let zip = $('#zip').val();
	    let notes = $('#notes').val();
	    let rank = $('#rank').val();
	    let cityID = $('#cityID').val();

	    $.ajax({
			type: 'POST',
			url: 'Project',
			data:
			{
				'action': 'createSubcontractor',
				'region': region,
				'trades': trades,
				'name'  : name,
				'contacts' : contacts,
				'phone' : phone,
				'mobile' : mobile,
				'email' : email,
				'workRegion' : workRegion,
				'address' : address,
				'state' : state,
				'zip' : zip,
				'notes' : notes,
				'rank' : rank,
				'cityID' : cityID
			},
			success: function(data)
			{
				console.log(data);

				
				
			},
		});









}
