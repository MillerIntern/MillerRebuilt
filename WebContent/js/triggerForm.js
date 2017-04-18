'use strict';

let objects = ['Project', 'Closeout']; // perhaps this will be used to specifiy which criteria to restrict on. (right now is Project.class)
let types = ['Date', 'Value'];
let typeDropdownItems;

// We could ask the server for these values but having them here means that there is less waiting time
// Serverside checks will make sure that the submitted values match expected. 
let dates = [{'name': 'Actual Turnover', 'field': 'actualTurnover'}];
let values = [{'name': 'Cost', 'field': 'cost'}];

let dateDropdownItems;

function submitTestTrigger () {
	$.ajax({
		type: 'POST',
		url: 'Trigger', 
		dataType: "json",
		data: 
		{
			'domain': 'trigger',
			'action': 'submitTrigger',
		},
		complete: function(data)
		{
			console.log(data);
		}
	});
}

function generateDropdowns () {
	typeDropdownItems = document.createDocumentFragment();
	for(var i = 0; i < types.length; i++) {
		let option = document.createElement('option');
		option.innerHTML = types[i];
		option.setAttribute('value', types[i]);
		typeDropdownItems.appendChild(option);
	}
	
	dateDropdownItems = document.createDocumentFragment();
	for (var i = 0; i < dates.length; i++) {
		let option = document.createElement('option');
		option.innerHTML = dates[i].name;
		option.setAttribute('value', dates[i].field);
		dateDropdownItems.appendChild(option);
	}
	
	$('.paramType').append(typeDropdownItems.cloneNode(true));
	$('.paramTypeValue').append(dateDropdownItems.cloneNode(true));
}

$(document).on('change', 'select.paramType', function () {
	console.log('hey');
});