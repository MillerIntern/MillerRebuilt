'use strict';

let types = ['Date', 'Value'];

// We could ask the server for these values but having them here means that there is less waiting time
// Serverside checks will make sure that the submitted values match expected. 
let objects = [{'name': 'Project Information', 'field': 'Project'}, {'name': 'Closeout Information', 'field': 'CloseoutDetails'}];
let dates = [{'name': 'Actual Turnover', 'field': 'actualTurnover', 'object': 'Project'},
             {'name': 'Scheduled Turnover', 'field': 'scheduledTurnover', 'object': 'Project'}];
let values = [{'name': 'Cost', 'field': 'cost', 'object': 'Project'},
              {'name': 'MCS Number', 'field': 'mcsNumber', 'object': 'Project'}];


let typeDropdownItems;
let objectDropdownItems;

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
	
	objectDropdownItems = document.createDocumentFragment();
	for (var i = 0; i < objects.length; i++) {
		let option = document.createElement('option');
		option.innerHTML = objects[i].name;
		option.setAttribute('value', objects[i].field);
		objectDropdownItems.appendChild(option);
	}
	
	$('.objectType').append(objectDropdownItems.cloneNode(true));
	$('.paramType').append(typeDropdownItems.cloneNode(true));
	setTriggerField();
	//$('.paramTypeValue').append(dateDropdownItems.cloneNode(true));
}

function setTriggerField() {	
	let paramFields = $('.param-field.empty');
	$('.param-field.empty').each(function (field) {
		let tableRows = $(this).children('table').children('tbody').children();

		// Object key in order to 
		let objectKey = $(tableRows).children('.objectEntry').children('select.objectType').val();
		let typeKey = $(tableRows).children('.typeEntry').children('select.paramType').val();
		let fieldSelect = $(tableRows).children('.fieldEntry').children('select.paramTypeValue');
		let valueEntry = $(tableRows).children('.dataValueEntry');
		
		let dataDropdownItems = document.createDocumentFragment();
		if (typeKey === 'Date') {
			console.log('type is a DATE');
			for (var i = 0; i < dates.length; i++) {
				if(dates[i].object === objectKey) {
					let option = document.createElement('option');
					option.innerHTML = dates[i].name;
					option.setAttribute('value', dates[i].field);
					dataDropdownItems.appendChild(option);
				}
			}
		} else if (typeKey === 'Value') {
			console.log('type is a VALUE');
			for (var i = 0; i < values.length; i++) {
				if(values[i].object === objectKey) {
					let option = document.createElement('option');
					option.innerHTML = values[i].name;
					option.setAttribute('value', values[i].field);
					dataDropdownItems.appendChild(option);
				}
			}
			// TODO: Add input to valueEntry HTML object. 
			
		}
		
		$(fieldSelect).find('option').remove();
		$(fieldSelect).append(dataDropdownItems);
		$(this).removeClass('empty');
	});
}

$(document).on('change', 'select.paramType', function () {
	// this line is pretty good
	$(this).parent().parent().parent().parent().parent().addClass('empty');
	console.log('type change: update trigger field');
	setTriggerField();
});

$(document).on('change', 'select.objectType', function() {
	$(this).parent().parent().parent().parent().parent().addClass('empty');
	console.log('object change: update trigger field');
	setTriggerField();
});