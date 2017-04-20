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

function submitTrigger () {
	let triggerParams = [];
	$('.param-field').each(function (field) {
		let tableRows = $(this).children('table').children('tbody').children();

		// Object key in order to 
		let objectVal = $(tableRows).children('.objectEntry').children('select.objectType').val();
		let typeVal = $(tableRows).children('.typeEntry').children('select.paramType').val();
		let fieldVal = $(tableRows).children('.fieldEntry').children('select.paramTypeValue').val();
		let valueEntry = $(tableRows).children('.dataValueEntry');
		let description = $(tableRows).children('.descriptionEntry').children('input.description').val();
		let severity = $(tableRows).children('.severityEntry').children('select.severity').val();
		
		console.log(objectVal);
		console.log(typeVal);
		console.log(fieldVal);
		console.log(description);
		console.log(severity);
		
		// None of these should be hit ever
		if(typeof objectVal === 'undefined' || objectVal === '') return alert('Check "For" Dropdowns!');
		if(typeof typeVal === 'undefined' || typeVal === '') return alert('Check "Type" Dropdowns!');
		if(typeof fieldVal === 'undefined' || fieldVal ==='') return alert('Check "Field" Dropdowns!');
		if(typeof severity === 'undefined' || severity === '') return alert('Check "Severity" Dropdowns!');
		
		// Description should have contents
		if(typeof description === 'undefined' || description === '') return alert('Descriptions Must be filled out!');
		
		if (typeVal === 'Date') {
			console.log('retrieving DATE from check value');
			let lowDate = $(valueEntry).children('.lowDate').val();
			let highDate = $(valueEntry).children('.highDate').val();
			
			if (lowDate === '' || highDate === '') {
				return alert('Both Date entry fields must have information!');
			} else {
				console.log(lowDate + ' low - ' + highDate + ' high');
				let param = {'object': objectVal, 'type': typeVal, 'field': fieldVal, 'severity': severity, 'description': description,
						'highDate': highDate, 'lowDate': lowDate};
				triggerParams = param; // TODO: Change to triggerParams.push(param);
			}
		} else if (typeVal === 'Value') {
			console.log('retrieving VALUE from check value');
			let comparisonType = $(valueEntry).children('.compareType').val();
			let compareValue = $(valueEntry).children('.compareVal').val();
			
			if(compareValue === '') {
				return alert('You must fill out a comparison value!');
			} else {
				console.log(comparisonType + ' type - ' + compareValue + ' value');
				let param = {'object': objectVal, 'type': typeVal, 'field': fieldVal, 'severity': severity, 'description': description,
							'comparisonType': comparisonType, 'compareValue': compareValue};
				triggerParams = param; // TODO: Change to triggerParams.push(param);
			}
		} else {
			return alert('Check Your Trigger Types!');
		}

	});
	
	$.ajax({
		type: 'POST',
		url: 'Trigger', 
		dataType: "json",
		data: 
		{
			'domain': 'trigger',
			'action': 'submitTrigger',
			'parameters': JSON.stringify(triggerParams)
		},
		complete: function(data)
		{
			console.log(data);
		}
	});
}


function generateDropdowns () {
	
	$("input[placeholder]").each(function () {
        $(this).attr('size', $(this).attr('placeholder').length);
    });
	
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
	setTriggerFieldAndValue();
}

function setTriggerFieldAndValue() {	
	$('.param-field.empty').each(function (field) {
		let tableRows = $(this).children('table').children('tbody').children();

		// Object key in order to 
		let objectKey = $(tableRows).children('.objectEntry').children('select.objectType').val();
		let typeKey = $(tableRows).children('.typeEntry').children('select.paramType').val();
		let fieldSelect = $(tableRows).children('.fieldEntry').children('select.paramTypeValue');
		let valueEntry = $(tableRows).children('.dataValueEntry');
		$(valueEntry).empty();
		
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
			$(valueEntry).append(DATE_HTML_BLOCK);
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
			$(valueEntry).append(VALUE_HTML_BLOCK);
			
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
	setTriggerFieldAndValue();
});

$(document).on('change', 'select.objectType', function() {
	$(this).parent().parent().parent().parent().parent().addClass('empty');
	console.log('object change: update trigger field');
	setTriggerFieldAndValue();
});


const SLIGHT_MARGIN = 'style="margin-right: 4px"';
const DATE_HTML_BLOCK = "<label class='fieldVal' " + SLIGHT_MARGIN + ">Date between</label>" +
		        		"<input placeholder='Low Date Value' class='lowDate' type='number' " + SLIGHT_MARGIN + "/>" +
		        		"<label " + SLIGHT_MARGIN + ">and</label>" +
		        		"<input placeholder='High Date Value' class='highDate' type='number' " + SLIGHT_MARGIN + "/>" +
		        		"<label " + SLIGHT_MARGIN + ">days from current date.</label>" +
						"<div>Ex: <b>Scheduled Startdate</b> between <b>0</b> and <b>5</b> days from the current date would</div>" +
						"<div> check for Scheduled Startdates that are within the next 5 days.</div>";
const VALUE_HTML_BLOCK = "<label class='fieldVal' " + SLIGHT_MARGIN + ">Field is:</label>" +
						"<select class='compareType' " + SLIGHT_MARGIN + ">" + 
						"<option value='less'>Less Than</option>" +
						"<option value='equal'>Equals</option>" + 
						"<option value='more'>More Than</option>" + 
						"</select>" +
						"<input class='compareVal' type='number' " + SLIGHT_MARGIN + "/>";