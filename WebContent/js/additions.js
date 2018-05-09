let users;
let projectItems;
let equipmentSuppliers;
let subcontractors;
let cities;
let rules;
let ruleDomains;
let ruleResults;
let ruleSeverity;
let projectClasses;
let changeOrderFields;
let equipmentFields;
let closeoutFields;
let permitAndInspectionFields;
let schedulingFields;
let financialFields;
let taskFields;


let CURRENT_INTENT = {
		ADD : 1 ,
		EDIT : 2 ,
		REMOVE : 3,
		REMOVE_DUPLICATE : 4,
		INTENT : 1,
}


$(document).ready(function()
{
	$('ul.tabs li').click(function()
		    {
		        
				var tab_id = $(this).attr('data-tab');
		        if(tab_id == "saveButton")
		            return;

				$('ul.tabs li').removeClass('current');
				$('.tab-content').removeClass('current');

				$(this).addClass('current');
				$("#"+tab_id).addClass('current');
			});	
	
});

$(document).ready(function()
		{
	
			$('.removeButton').hide();
			$('.projectObjectDropdowns').hide();

			$('.makeChanges').click( function() {
				makeChanges();
			});
		
			attachEventHandlersToDuplicateSelects();
			
			CURRENT_INTENT.INTENT = 1;
			$('.addButton').css('color' , '#2860B8');
			$('.addButton').css('background-color' , 'white');
			
			$('.intentChangeIndicator').click(function()
				    {
				        console.log("THIS" , this);
				        
			        	$('.intentChangeIndicator').css('color' , 'white');
			        	$('.intentChangeIndicator').css('background-color' , '#2860B8');
			        	
			        	let currentButton = $(this).attr('class');
			        				        
			        	$('.intentChangeIndicator').each(function(index){
			        		
			        		//onsole.log($(this).attr('class') , currentButton);
			        		if($(this).attr('class') == currentButton) 
			        		{
			        			
			        			$(this).css('color' , '#2860B8');
			        			$(this).css('background-color' , 'white');
			        		}
			        			
			        	});
			        	
			        	
				        if($(this).hasClass('addButton')) intentSwitch(1);
				        if($(this).hasClass('editButton')) intentSwitch(2);
				        if($(this).hasClass('removeButton')) intentSwitch(3);
				        if($(this).hasClass('removeDuplicateButton')) intentSwitch(4);
				        

				        
					});	
			
		});

function preparePage() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			if(data.responseJSON) {
			 if(data.responseJSON.id == 20) $('#myContent').show();
			  console.log("USER = ", data.responseJSON);
		      if(data.responseJSON.permission.name != "admin") {
		    	  alert("Sorry but it looks like you don't have access to this page!");
		    	  document.location.href = "homepage.html";
		      }
		      getUsers();
			} else {
				console.log("GetUserData() RESPONSE = ",data);
				alert('Server Failure!');
				
			}
		}
	});
}

function getStates()
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
			var states = JSON.parse(data);
			getEquipmentSuppliers();
			fillStates(states);
		},
	});
}


function fillStates(json)
{
	var d = document.createDocumentFragment();

	for(var i = 0; i < json.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = json[i];
		d.appendChild(option);
	}
	
	$("#state").append(d);
	$('#state').chosen({width : '200px'});
	$('#region').chosen({width : '200px'});

}


function createWarehouse()
{
	var city = $('#city').val();
	var state = $("#state").val();
	var region = $("#region").val();
	
	if(city != '' && state != '' && region != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createWarehouse',
				'city': city,
				'state': state,
				'region': region,
			},
			success: function(data)
			{
				console.log(data);
				$('#city').val('');
				$('#state').val('');
				$('#region').val('');
				alert("Warehouse Created Successfully!");
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
}

function createItem()
{
	var item = $('#projectItem').val();
	
	for(var i = 0; i < projectItems.length; i++) {
		if(projectItems[i].name == item) {
			alert("Project Item must not already exist in the database!");
			return;
		}
	}
	
	if(item != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createItem',
				'item': item,
			},
			success: function(data)
			{
				console.log(data);
				$('#projectItem').val('');
				alert("Project Item Created Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	
	$('.makeChanges').click(function() { 		
		makeChanges(); 	
	});
	
	$('.makeChanges').removeAttr('disabled'); 
}

function editItem()
{
	var item = $('#projectItem').val();
	var itemId = $('#projectItemDropdown').val();
	
	if(item != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'editItem',
				'itemName': item,
				'itemId' : itemId,
			},
			success: function(data)
			{
				console.log(data);
				$('#projectItem').val('');
				alert("Project Item Edited Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() {
			makeChanges();
		});
	$('.makeChanges').removeAttr('disabled');
}

function removeItem()
{
	var itemId = $('#projectItemDropdown').val();
	
	if(itemId != '' || !itemId)
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'removeItem',
				'itemId' : itemId,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Project Item Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("Project Item Deleted Successfully!");
					location.reload(true);
				}
				$('#projectItem').val('');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled');
}

function swapDuplicateItem()
{
	var newItemId = $('#projectItemDropdown').val();
	var oldItemId = $('#duplicateProjectItemDropdown').val();
	
	if(newItemId == oldItemId){
		alert("Item to remove must be different from the item you want to replace it with!");
		$('.makeChanges').removeAttr('disabled');
		$('.makeChanges').click(function() { 		makeChanges(); 	});
		return;
	}
	
	if((newItemId != '' || !newItemId) || (oldItemId != '' || !oldItemId || oldItemId == "default"))
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'swapAndRemove',
				'table' : "Project" ,
				'column' : "projectItem_id" ,
				'tableToRemoveFrom' : 'ProjectItem',
				'newObjectId' : newItemId,
				'oldObjectId' : oldItemId ,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Project Item Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("Project Item Deleted Successfully!");
					location.reload(true);
				}
				$('#projectItem').val('');
				$('#duplicateProjectItemDropdown').val('default');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function createEquipmentSupplier()
{
	var supplier = $('#supplier').val();
	
	if(!supplier) {
		alert("Suppliers must have a name!");
		return;
	}
	
	for(var i = 0; i < equipmentSuppliers.length; i++) {
		if(equipmentSuppliers[i].name.toUpperCase() == supplier.toUpperCase()) {
			alert("Supplier name must not already exist in the database!");
			return;
		}
	}
	
	if(supplier != '')
	{
		$.ajax(
		{
			type: 'POST',
			url: 'Admin',
			data:
			{
				'action': 'createSupplier',
				'supplier': supplier,
			},
			success: function(data)
			{
				console.log(data);
				$('#supplier').val('');
				alert("Supplier Created Successfully!");
				location.reload(true);
			}
		});
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function editEquipmentSupplier()
{
	var supplier = $('#supplier').val();
	var supplierId = $('#supplierDropdown').val();
	
	if(item != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'editEquipmentSupplier',
				'supplierName': supplier,
				'supplierId' : supplierId,
			},
			success: function(data)
			{
				console.log(data);
				$('#supplier').val('');
				alert("Equipment Supplier Edited Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function removeEquipmentSupplier()
{
	var equipmentId = $('#supplierDropdown').val();
	
	if(equipmentId != '' || !equipmentId)
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'removeEquipmentSupplier',
				'equipmentId' : equipmentId,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Equipment Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("EquipmentDeleted Successfully!");
					location.reload(true);
				}
				$('#supplier').val('');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function swapDuplicateEquipmentSupplier()
{
	var newEqId = $('#supplierDropdown').val();
	var oldEqId = $('#duplicateEquipmentSupplierDropdown').val();
	
	if(newEqId == oldEqId){
		alert("Equipment Supplier to remove must be different from the Equipment Supplier you want to replace it with!");
		$('.makeChanges').removeAttr('disabled');
		$('.makeChanges').click(function() { 		makeChanges(); 	});
		return;
	}
	
	if((newEqId != '' || !newEqId) || (oldEqId != '' || !oldEqId || oldEqId == "default"))
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'swapAndRemove',
				'table' : "NewEquipment" ,
				'column' : "eqSupplier_id" ,
				'tableToRemoveFrom' : 'EquipmentVendor',
				'newObjectId' : newEqId,
				'oldObjectId' : oldEqId ,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Equipment Supplier Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("Equipment Supplier Successfully Replaced!");
					location.reload(true);
				}
				$('#supplier').val('');
				$('#duplicateEquipmentSupplierDropdown').val('default');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function createSubcontractor()
{
	var subcontractor = $('#subcontractorName').val();
	var subcontractorEmail = $('#subcontractorEmail').val();

	if(!subcontractor) {
		alert("Subcontractors must have a name!");
		return;
	}
	
	if(!subcontractorEmail) {
		alert("Subcontractors must have an email!");
		return;
	}
	
	for(var i = 0; i < subcontractors.length; i++) {
		if(subcontractors[i].name.toUpperCase() == subcontractor.toUpperCase()) {
			alert("Subcontractor name must not already exist in the database!");
			return;
		}
	}
	
	if(subcontractor != '')
	{
		$.ajax(
		{
			type: 'POST',
			url: 'Admin',
			data:
			{
				'action': 'createSubcontractor',
				'name': subcontractor,
				'email' : subcontractorEmail ,
			},
			success: function(data)
			{
				console.log(data);
				$('#subcontractorName').val('');
				$('#subcontractorEmail').val('');
				alert("Subcontractor Created Successfully!");
				location.reload(true);
			}
		});
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function editSubcontractor()
{
	var name = $('#subcontractorName').val();
	var email = $('#subcontractorEmail').val();
	
	var subcontractorId = $('#subcontractorDropdown').val();
	
	if(name != '' && email != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'editSubcontractor',
				'name': name,
				'email' : email , 
				'subcontractorId' : subcontractorId,
			},
			success: function(data)
			{
				console.log(data);
				$('#subcontractorName').val('');
				$('#subcontractorEmail').val('');

				alert("Subcontractor Edited Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function removeSubcontractor()
{
	var equipmentId = $('#supplierDropdown').val();
	
	if(equipmentId != '' || !equipmentId)
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'removeEquipmentSupplier',
				'equipmentId' : equipmentId,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Equipment Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("EquipmentDeleted Successfully!");
					location.reload(true);
				}
				$('#supplier').val('');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function swapDuplicateSubcontractor()
{
	var newSubId = $('#subcontractorDropdown').val();
	var oldSubId = $('#duplicateSubcontractorDropdown').val();
	
	if(newSubId == oldSubId){
		alert("Subcontractor to remove must be different from the Subcontractor you want to replace it with!");
		$('.makeChanges').removeAttr('disabled');
		$('.makeChanges').click(function() { 		makeChanges(); 	});
		return;
	}
	
	if((newSubId != '' || !newSubId) || (oldSubId != '' || !oldSubId || oldSubId == "default"))
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'swapAndRemove',
				'table' : "Task" ,
				'column' : "subAssignee_id" ,
				'tableToRemoveFrom' : 'Subcontractor',
				'newObjectId' : newSubId,
				'oldObjectId' : oldSubId ,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("Subcontractor Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("Subcontractor Successfully Replaced!");
					location.reload(true);
				}
				//$('#subcontractorDropdown').val('');
				//$('#duplicateSubcontractorDropdown').val('default');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	$('.makeChanges').click(function() {
		makeChanges();
	});
	$('.makeChanges').removeAttr('disabled'); 
}

function createCity()
{
	var city = $('#cityName').val();
	
	console.log("CITY NAME = " , city);
	
	for(var i = 0; i < cities.length; i++) {
		if(cities[i].name == city) {
			alert("Project Item must not already exist in the database!");
			return;
		}
	}
	
	if(city != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createCity',
				'cityName': city,
			},
			success: function(data)
			{
				console.log(data);
				$('#cityName').val('');
				alert("City Created Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	
	$('.makeChanges').click(function() { 		
		makeChanges(); 	
	});
	
	$('.makeChanges').removeAttr('disabled'); 
}

function editCity()
{
	var city = $('#cityName').val();
	var cityId = $('#cityDropdown').val();
	
	if(city != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'editCity',
				'cityName': city,
				'cityId' : cityId,
			},
			success: function(data)
			{
				console.log(data);
				$('#cityName').val('');
				alert("City Edited Successfully!");
				location.reload(true);
			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
		$('.makeChanges').click(function() {
			makeChanges();
		});
	$('.makeChanges').removeAttr('disabled');
}

function removeCity()
{
	var cityId = $('#projectItemDropdown').val();
	
	if(cityId != '' || !cityId)
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'removeCity',
				'itemId' : cityId,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("City Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("City Deleted Successfully!");
					location.reload(true);
				}
				$('#cityName').val('');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	$('.makeChanges').click(function() { 		
		makeChanges(); 	
	});
	
	$('.makeChanges').removeAttr('disabled');
}

function swapDuplicateCity()
{
	var newCityId = $('#cityDropdown').val();
	var oldCityId = $('#duplicateCityDropdown').val();
	
	if(newCityId == oldCityId){
		alert("City to remove must be different from the item you want to replace it with!");
		$('.makeChanges').removeAttr('disabled');
		$('.makeChanges').click(function() { 		makeChanges(); 	});
		return;
	}
	
	if((newCityId != '' || !newCityId  || newCityId == "default") || (oldCityId != '' || !oldCityId || oldCityId == "default"))
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'swapAndRemove',
				'table' : "Warehouse" ,
				'column' : "city_id" ,
				'tableToRemoveFrom' : 'City',
				'newObjectId' : newCityId,
				'oldObjectId' : oldCityId ,
			},
			success: function(data)
			{
				console.log(data);
				if(data == "IN_USE")
				{
					alert("City Still In Use By Another Project! NOT DELETED");
				}
				else
				{
					alert("City Deleted Successfully!");
					location.reload(true);
				}
				$('#cityName').val('');
				$('#duplicateCityDropdown').val('default');


			}
		});
	else
	{
		alert("Please fill out all of the information!");
	}
	
	$('.makeChanges').click(function() { 		makeChanges(); 	});
	$('.makeChanges').removeAttr('disabled'); 
}

function addPerson()
{
	var personName = $('#personName').val();
	
	if(personName != '')
	{
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'addPerson', 
				'username': personName, 
			},
			success: function(data)
			{
				console.log(data);
				$('#personName').val('');
				alert("Person Added Successfully!");
			}
		});
	}
}

function addUser()
{
	let logInName = $('#userTab').find('#logInName').val();
	if(logInName) logInName = logInName.toLowerCase();
	let firstName = $('#userTab').find('#firstName').val();
	let email = $('#userTab').find('#email').val();
	let password = $('#userTab').find('#password').val();
	let confirmPassword = $('#userTab').find("#passwordConfirmation").val();
	let permission = $('#userTab').find('#permission').val();
	let status = $('#userTab').find('#status').val();
	
	if(password != confirmPassword)
	{
		alert("Password does not match!");
		return;
	}
	
	let validData = true;
	
	if(!logInName) validData = false;
	if(!firstName) validData = false;
	if(!email) validData = false;
	if(!password) validData = false;
	if(!permission) validData = false;
	if(!status) validData = false;

	if(validData == false)
	{
	     alert("Each input field needs a value!");
	     return;
	}
	
	for(var i = 0; i < users.length; i++){
		if(users[i].name == logInName)
		{
			alert("All user's must have a unique log in name!");
			return;
		}
	}

		{
			$.ajax({
				type: 'POST',
				url: 'Admin', 
				data: 
				{
					'action': 'addUser', 
					'logInName': logInName,
					'firstName': firstName,
					'email' : email,
					'password' : password,
					'permission' : permission,
					'status' : status
				},
				success: function(data)
				{
					console.log(data);
					$('.userInput').val('');
					alert("User Added Successfully!");
				}
			});
		}
	
	
	
	
	
}

function addRule()
{
	let domain = $('#ruleTab').find('#ruleDomainDropdown').val();
	let title = $('#ruleTab').find('#ruleTitle').val();
	let field1 = $('#ruleTab').find('#ruleField1').val();
	let field2 = $('#ruleTab').find('#ruleField2').val();
	let goal = $('#ruleTab').find("#ruleGoalDropdown").val();
	let severity = $('#ruleTab').find('#ruleSeverityDropdown').val();
	let projectClass = $('#ruleTab').find('#ruleProjectClassDropdown').val();
	let passMessage = $('#ruleTab').find('#passMessage').val();
	let failMessage = $('#ruleTab').find('#failMessage').val();
	
	
	let validData = true;
	
	if(domain == undefined || domain == "default") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Must select a category!");
		return;
	}
	
	if(field1 == undefined || field1 == "default") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Field 1 must have a value!");
		return;
	}
	
	if(! title) {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Each rule must have a title!");
		return;
	};
	
	if(goal == undefined || goal == "default") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Each rule must have a goal!");
		return;
	}
	
	if(severity == undefined || severity == "default") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Each rule must have a severity!");
		return;
	}
	
	if(projectClass == undefined || projectClass == "default") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Please select a project class to apply this rule to!");
		return;
	}
	
	if(passMessage == "") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Each rule must have a pass message!");
		return;
	}
	
	if(failMessage == "") {
		$('.makeChanges').attr('disabled' , 'false');
		alert("Each rule must have a fail message!");
		return;
	}
	if(field2 == "default" || field2 == "none")
		field2 = undefined;
	
	

		
			$.ajax({
				type: 'POST',
				url: 'Admin', 
				data: 
				{
					'action': 'addRule', 
					'domain': domain,
					'title': title,
					'field1' : field1,
					'field2' : field2,
					'goal' : goal,
					'severity' : severity ,
					'projectClass' : projectClass,
					'passMessage' : passMessage,
					'failMessage' : failMessage
				},
				success: function(data)
				{
					console.log(data);
					alert("Rule Added Successfully!");
					location.reload(true);
				}
			});
}

/**
 * This function gets all Miller users from the database
 */
function getUsers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUsers',
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getUsers() = ",data.responseJSON);
			if (data.responseJSON) {
				users = data.responseJSON;
				console.log("USERS = ",users);
			}
			getStates();
		}
		
	});	
}

/**
 * This function gets all Miller users from the database
 */
function getEquipmentSuppliers () {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecificObjects',		
			'equipmentvendor': true,
			'item' : true,
			'cities' : true,
			'subcontractors' : true ,
			'ruleDomains' : true ,
			'ruleResults' : true ,
			'ruleSeverity' : true ,
			'projectRules' : true , 
			'class' : true , 
			'changeOrderFields' : true ,
			'equipmentFields' : true ,
			'closeoutFields' : true ,
			'permitAndInspectionFields' : true ,
			'schedulingFields' : true ,
			'financialFields' : true ,
			'taskFields' : true 
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getEquipmentSuppliers() = ",data.responseJSON);
			if (data.responseJSON.equipmentvendor) {
				equipmentSuppliers = JSON.parse(data.responseJSON.equipmentvendor);
				fillEquipmentSupplierDropdown();
				console.log("EQUIPMENT SUPPLIERS NAMES = ",equipmentSuppliers);
			}
			if (data.responseJSON.item) {
				projectItems = JSON.parse(data.responseJSON.item);
				fillProjectItemsDropdown();
				console.log("Project Item NAMES = ",projectItems);
			}
			if (data.responseJSON.cities) {
				cities = JSON.parse(data.responseJSON.cities);
				fillCityDropdown();
				console.log("City NAMES = ", cities);
			}
			if (data.responseJSON.subcontractors) {
				subcontractors = JSON.parse(data.responseJSON.subcontractors);
				fillSubcontractorDropdown();
				console.log("Sub NAMES = ",subcontractors);
			}
			//
			if (data.responseJSON.ruleResults) {
				ruleResults = JSON.parse(data.responseJSON.ruleResults);
				fillRuleResultsDropdown();
				console.log("RULE RESULTS = ",ruleResults);
			}
			if (data.responseJSON.ruleDomains) {
				ruleDomains = JSON.parse(data.responseJSON.ruleDomains);
				fillRuleDomainsDropdown();
				console.log("RULE DOMAINS = ",ruleDomains);
			}
			if (data.responseJSON.ruleSeverity) {
				ruleSeverity = JSON.parse(data.responseJSON.ruleSeverity);
				fillRuleSeverityDropdown();
				console.log("RULE SEVERITY = ", ruleSeverity);
			}
			if (data.responseJSON.projectRules) {
				projectRules = JSON.parse(data.responseJSON.projectRules);
				fillProjectRulesDropdown();
				console.log("PROJECT RULES = ", projectRules);
			}
			if (data.responseJSON["class"]) {
				projectClasses = JSON.parse(data.responseJSON["class"]);
				fillProjectClassesDropdown();
			}
			if (data.responseJSON.changeOrderFields) {
				changeOrderFields = JSON.parse(data.responseJSON.changeOrderFields);
			}
			//
			if (data.responseJSON.equipmentFields) {
				equipmentFields = JSON.parse(data.responseJSON.equipmentFields);
			}
			if (data.responseJSON.financialFields) {
				financialFields = JSON.parse(data.responseJSON.financialFields);
			}
			if (data.responseJSON.schedulingFields) {
				schedulingFields = JSON.parse(data.responseJSON.schedulingFields);
			}
			if (data.responseJSON.taskFields) {
				taskFields = JSON.parse(data.responseJSON.taskFields);
			}
			if (data.responseJSON.closeoutFields) {
				closeoutFields = JSON.parse(data.responseJSON.closeoutFields);
			}
			if (data.responseJSON.permitAndInspectionFields) {
				permitAndInspectionFields = JSON.parse(data.responseJSON.permitAndInspectionFields);
			}
			
		}
		
	});	
}

function fillRuleResultsDropdown()
{
	if(ruleResults == undefined)
		return;
	
	for(var result in ruleResults)
	{
		if(ruleResults[result].visible == "false")
			continue;
		
		var option = document.createElement('option');
		option.value = ruleResults[result].id;
		option.innerHTML = ruleResults[result].meaning;
		
		$('#ruleGoalDropdown').append(option);
	}
	
	$('#ruleGoalDropdown').chosen({width : "500px"});
	$('#ruleField1').chosen({width : "500px"});
	$('#ruleField2').chosen({width : "500px"});
	
}

function fillRuleDomainsDropdown()
{
	if(ruleDomains == undefined)
		return;
	
	for(var ruleDomain in ruleDomains)
	{
		var option = document.createElement('option');
		option.value = ruleDomains[ruleDomain].domain;
		option.innerHTML = ruleDomains[ruleDomain].domain;
		
		$('#ruleDomainDropdown').append(option);
		
	}
	
	$('#ruleDomainDropdown').chosen({width : "200px"});
	$('#ruleDomainDropdown').change(filterFieldsByDomain);
	$('#ruleDomainDropdown').change(filterGoalsByDomain);	
	$('#ruleField1').change(filterSecondField);
}

function filterSecondField()
{
	var val = $('#ruleField1').val();
	
	console.log("VAL " , val);
	
	var type = getFieldType(val);
	
	$('#ruleField2').find('option').each(function(index){
		if(this.type != type && this.type != undefined) {
			$(this).hide();
		}
		else {
			$(this).show();
			console.log("NOT EQUAL");
		}
	});
	
	$('#ruleField2').trigger('chosen:updated');
	
}

function getFieldType(val)
{
	var dropVal = $('#ruleDomainDropdown').val();
	
	console.log("DROP = " , dropVal);
	switch(dropVal)
	{
		case "Permits/Inspections":
			return permitAndInspectionFields[val];
		case "Change Orders":
			return changeOrderFields[val];
		case "Equipment":
			return equipmentFields[val];
		case "Financial":
			return financialFields[val];
		case "Scheduling":
			return schedulingFields[val];
		case "Closeout":
			return closeoutFields[val];
		case "Tasks":
			return taskFields[val];
	}
}

function filterGoalsByDomain()
{
	var domain = $('#ruleDomainDropdown').val();
	console.log("DOM" , domain , ruleDomains[domain]);

	$('#ruleGoalDropdown').find('option').each(function(index){
		$(this).show();
		switch(domain)
		{
			case "Tasks":
				if(! this.value.includes("TASK"))
					$(this).hide();
				break;
			case "Closeout":
				if(! this.value.includes("CLOSEOUT"))
					$(this).hide();
				break;	
			case "Scheduling":
				if(! this.value.includes("DD_") && ! this.value.includes("D_"))
					$(this).hide();
				break;
			case "Financial":
				if(! this.value.includes("NN_") && ! this.value.includes("N_"))
					$(this).hide();
				break;
		}
		
	});
	
	$('#ruleGoalDropdown').trigger('chosen:updated');
}

function filterFieldsByDomain()
{
	var dropVal = $('#ruleDomainDropdown').val();
	
	$('#secondFieldRow').show();
	console.log("DROP = " , dropVal);
	switch(dropVal)
	{
		case "Permits/Inspections":
			fillField1(permitAndInspectionFields);
			fillField2(permitAndInspectionFields);
			break;
		case "Change Orders":
			fillField1(changeOrderFields);
			fillField2(changeOrderFields);
			break;
		case "Equipment":
			fillField1(equipmentFields);
			fillField2(equipmentFields);
			break;
		case "Financial":
			fillField1(financialFields);
			fillField2(financialFields);
			break;
		case "Scheduling":
			fillField1(schedulingFields);
			fillField2(schedulingFields);
			break;
		case "Closeout":
			fillField1(closeoutFields);
			fillField2(closeoutFields);
			$('#secondFieldRow').hide();
			break;
		case "Tasks":
			fillField1(taskFields);
			fillField2(taskFields);
			$('#secondFieldRow').hide();
			break;
	}
}

function fillField1(options)
{
	$('#ruleField1').find('option').remove();
	
	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Select a field---";
	defaultOption.disabled = true;
	defaultOption.selected = true;

	
	$('#ruleField1').append(defaultOption);
	
	if(options == undefined)
		return;
	
	for(var opt in options)
	{
		if(opt == undefined || options[opt] == undefined)
			continue;
		
		var option = document.createElement('option');
		option.type = options[opt];
		option.value = opt;
		option.innerHTML = humanize(opt);
		$('#ruleField1').append(option);
	}
	
	$('#ruleField1').trigger("chosen:updated");
}

function fillField2(options)
{
	$('#ruleField2').find('option').remove();
	
	if(options == undefined)
		return;
	
	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Select a field---";
	defaultOption.disabled = true;
	defaultOption.selected = true;
	
	$('#ruleField2').append(defaultOption);
	
	var optionN = document.createElement('option');
	optionN.value = "None";
	optionN.innerHTML = "None";
	
	$('#ruleField2').append(optionN);
	
	for(var opt in options)
	{
		if(opt == undefined || options[opt] == undefined)
			continue;
		var option = document.createElement('option');
		option.type = options[opt];
		option.value = opt;
		option.innerHTML = humanize(opt);
		$('#ruleField2').append(option);
	}
	
	$('#ruleField2').trigger("chosen:updated");
}

function humanize(str)
{
	if(str == undefined)
		return;
	
	var result = "";
	
	result += str[0].toUpperCase();
	
	for(var i = 0; i < str.length; i++)
	{
		if(i == 0)
			continue;
		
		if(str.charAt(i) == "_")
			continue;
		
		if(str.charAt(i) == str.charAt(i).toUpperCase())
		{
			if(str.charAt(i + 1) != undefined && str.charAt(i + 1).toUpperCase() == str.charAt(i + 1))	
				result += str.charAt(i);
			else 
				result += " " + str.charAt(i);
		}
		else
			result += str.charAt(i);
	}
	
	return result;
}

function fillRuleSeverityDropdown()
{
	if(ruleSeverity == undefined)
		return;
	
	for(var severity in ruleSeverity)
	{
		var option = document.createElement('option');
		option.value = ruleSeverity[severity].severity;
		option.innerHTML = ruleSeverity[severity].severityName;
		
		$('#ruleSeverityDropdown').append(option);
	}
	
	$('#ruleSeverityDropdown').chosen({width : "200px"});
}

function fillProjectRulesDropdown()
{
	if(rules == undefined)
		return;
	
	for(var i = 0; i < rules.length; i++)
	{
		var option = document.createElement('option');
		option.value = rules[i].id;
		option.innerHTML = rules[i].title;
		
		$('#removeRuleDropdown').append(option);
	}
	
	$('#removeRuleDropdown').chosen({width : "200px"});
}

function fillProjectClassesDropdown()
{
	if(projectClasses == undefined)
		return;
	
	for(var i = 0; i < projectClasses.length; i++)
	{
		var option = document.createElement('option');
		option.value = projectClasses[i].id;
		option.innerHTML = projectClasses[i].name;
		
		$('#ruleProjectClassDropdown').append(option);
	}
	
	$('#ruleProjectClassDropdown').chosen({width : "200px"});
}
/**
 * This function gets all Miller users from the database
 */
function getSubcontractors() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSubcontractors',
		}, complete: function (data) {
			console.log("RESPONSE JSON FOR getSubcontractors() = ",data.responseJSON);
			if (data.responseJSON) {
				subcontractors = data.responseJSON;
				fillSubcontractorDropdown();
				console.log("SUBCONTRACTOR NAMES = ", subcontractors);
			}
		}
		
	});	
}
function deleteProjectObject() {
	if(!confirm("Are you sure you want to permanently delete this data from the database?")) return;
	let id = document.getElementById("objectId").value;
	let domain = document.getElementById("objectDomain").value;
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': domain,
			'action': 'deleteProjectObject',
			'id': id
		}, complete: function (data) {
			console.log("REPONSE DATA FROM deleteItem() = ",data);

		}
		
	});
}

function fillProjectItemsDropdown()
{
	$('#projectItemDropdown').find('option').remove();
	$('#duplicateProjectItemDropdown').find('option').remove();
	
	projectItems.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	for(var i = 0; i < projectItems.length; i++) 
	{
		let option = document.createElement('option');
		option.text = projectItems[i].name;
		option.value = projectItems[i].id;
		$('#projectItemDropdown').append(option);
		
		option = document.createElement('option');
		option.text = projectItems[i].name;
		option.value = projectItems[i].id;
		$('#duplicateProjectItemDropdown').append(option);
	}
	
	$('#projectItemDropdown').chosen({width : '200px'});
	$('#duplicateProjectItemDropdown').chosen({width : '200px'});

}

function fillEquipmentSupplierDropdown()
{
	$('#supplierDropdown').find('option').remove();
	$('#duplicateEquipmentSupplierDropdown').find('option').remove();
	
	//let supplierDropdown = document.getElementById('supplier')
	
	equipmentSuppliers.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	for(var i = 0; i < equipmentSuppliers.length; i++) 
	{
		let option = document.createElement('option');
		option.text = equipmentSuppliers[i].name;
		option.value = equipmentSuppliers[i].id;
		$('#supplierDropdown').append(option);
		
		option = document.createElement('option');
		option.text = equipmentSuppliers[i].name;
		option.value = equipmentSuppliers[i].id;
		$('#duplicateEquipmentSupplierDropdown').append(option);
	}
	
	$('#supplierDropdown').chosen({width : '200px'});
	$('#duplicateEquipmentSupplierDropdown').chosen({width : '200px'});

}

function fillSubcontractorDropdown()
{
	$('#subcontractorDropdown').find('option').remove();
	
	subcontractors.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	for(var i = 0; i < subcontractors.length; i++) 
	{
		let option = document.createElement('option');
		option.text = subcontractors[i].name;
		option.value = subcontractors[i].id;
		$('#subcontractorDropdown').append(option);
		
		option = document.createElement('option');
		option.text = subcontractors[i].name;
		option.value = subcontractors[i].id;
		$('#duplicateSubcontractorDropdown').append(option);
	}
	
	$('#subcontractorDropdown').chosen({width : '200px'});
	$('#duplicateSubcontractorDropdown').chosen({width : '200px'});


}

function fillCityDropdown(json)
{
	console.log("FILLING CITIES" , cities);
	$('#cityDropdown').find('option').remove();
	
	cities.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	for(var i = 0; i < cities.length; i++) 
	{
		let option = document.createElement('option');
		option.text = cities[i].name;
		option.value = cities[i].id;
		$('#cityDropdown').append(option);
		
		option = document.createElement('option');
		option.text = cities[i].name;
		option.value = cities[i].id;
		$('#duplicateCityDropdown').append(option);
	}
	
	$('#cityDropdown').chosen({width : '200px'});
	$('#duplicateCityDropdown').chosen({width : '200px'});


}



/////////////////////////////////////////////

/**
 * This function handles what happens when someone clicks on 
 * any of the Add, Edit, or Remove buttons.
 * 
 * It will display the proper content for which ever tab is selected and also
 * display the proper content for whatever intent the user now has
 */
function intentSwitch(intent)
{
	console.log("INTENT SWITCH" , intent);
	
	$('.removeButton').hide();

	$('.duplicateRemoval').hide();
	
	$('.projectObjectDropdowns').show();

	switch(intent)
	{
		case CURRENT_INTENT.ADD:
			CURRENT_INTENT.INTENT = CURRENT_INTENT.ADD;
			clearEditingFields();
			$('.projectObjectDropdowns').hide();
			$('.projectObjectDropdown').off('change');
			$('.editingRow').show();

			break;
		case CURRENT_INTENT.EDIT:
			CURRENT_INTENT.INTENT = CURRENT_INTENT.EDIT;
			$('.editingRow').show();
			$('.projectObjectDropdown').change(function() {
				console.log("SELECTED" , $(this).find(':selected').val());
				
				let projectObjectId = $(this).find(':selected').val();
				
				console.log("PO ID = " , projectObjectId);
				
				let projectObject = matchProjectObject(projectObjectId);
				
				console.log("PO POST MATCH ID = " , projectObject);
		
				fillTabForEdit(projectObject);
			});
			fillEditingFields();
		    break;
		case CURRENT_INTENT.REMOVE:
			CURRENT_INTENT.INTENT = CURRENT_INTENT.REMOVE;
			clearEditingFields();
			$('.projectObjectDropdown').off('change');
			$('.editingRow').hide();

			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			CURRENT_INTENT.INTENT = CURRENT_INTENT.REMOVE_DUPLICATE;
			clearEditingFields();
			$('.editingRow').hide();
			$('.duplicateRemoval').show();			

			break;
	}
	
}

function attachEventHandlersToDuplicateSelects()
{
	/*
	$('.projectObjectDropdown').each(function (index){

		$(this).change(function(){
			//TO DO NOT COMPLETE
			$('.tab-content.current').find('.duplicateRemovalDropdown').find('option').show();
			$('.tab-content.current').find('.duplicateRemovalDropdown').trigger('chosen : updated');
			let selectedId = $('.tab-content.current').find('.projectObjectDropdown').val();
			let found = $('.tab-content.current').find('.duplicateRemovalDropdown').find("[value = '" + selectedId + "']").remove();

			$('.tab-content.current').find('.duplicateRemovalDropdown').trigger('chosen : updated');
		});
	});
	*/

}

function clearEditingFields()
{
	$('.editingField').each(function(index){
		$(this).val('');
	});
}

function fillEditingFields()
{
	$('.tab-content.editable').each(function(index) {
		console.log("IN EDITING FIELDS");
		let projectObjectId = $(this).find('.projectObjectDropdown').find(':selected').val();
		
		console.log("PO ID = " , projectObjectId);
		
		let tabId = $(this).attr('id');
		
		let projectObject = matchProjectObject(projectObjectId , tabId);
		
		console.log("PO POST MATCH ID = " , projectObject);

		fillTabForEdit(projectObject , $(this).attr('id'));	
	});
}

function fillTabForEdit(projectObject , tabId) 
{
	
	console.log("FILLED TAB FOR EDIT , " , projectObject , tabId);
	if(tabId) 
	{
		$('#' + tabId).find('.editingField.name').val(projectObject.name);
		$('#' + tabId).find('.editingField.email').val(projectObject.email);
	}
	else
	{
		$('.tab-content.current').find('.editingField.name').val(projectObject.name);
		$('.tab-content.current').find('.editingField.email').val(projectObject.email);
	}


}


function matchProjectObject(selectedId , _tabId)
{
	let tabId = $('.tab-content.current').attr('id');

	if(_tabId) 
		tabId = _tabId;
	
	let tabs = $('.tab-content');
	
	console.log("CT ID = " , tabId , selectedId);
	
	//console.log("CURRENT TAB DI" , currentTabId , "TABS " , tabIds);
	
	
	switch(tabId)
	{
		case "item":
			if(projectItems) 
			{
				for(var i = 0; i < projectItems.length; i++) {
					if(projectItems[i].id == selectedId) {
						return projectItems[i];
					}
				}
			}
			break;
		case "subcontractor":
			if(subcontractors) 
			{
				for(var i = 0; i < subcontractors.length; i++) {
					if(subcontractors[i].id == selectedId)
						return subcontractors[i];
				}
			}
			break;
		case "equipmentSupplier":
			if(equipmentSuppliers) 
			{
				console.log("ABOUT TO SEARH");
				for(var i = 0; i < equipmentSuppliers.length; i++) {
					if(equipmentSuppliers[i].id == selectedId)
						return equipmentSuppliers[i];
				}
			}
			break;
		case "cityTab":
			if(cities) 
			{
				console.log("ABOUT TO SEARH");
				for(var i = 0; i < cities.length; i++) {
					if(cities[i].id == selectedId)
						return cities[i];
				}
			}
			break;
	}
	
}



function makeChanges()
{
	
	$('.makeChanges').attr('disabled' , 'true');
	$('.makeChanges').off('click');
	
	let currentTabId = $('.tab-content.current').attr('id');
			
	switch(currentTabId)
	{
		case "item":
			handleProjectItemChanges();
			break;
		case "subcontractor":
			handleSubcontractorChanges();
			break;
		case "equipmentSupplier":
			handleEquipmentSupplierChanges();
			break;
		case "cityTab":
			handleCityChanges();
			break;
		case "ruleTab":
			handleRuleChanges();
			break;
	}
	
}

function handleRuleChanges()
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			addRule();
			break;
		case CURRENT_INTENT.EDIT:
			addRule();
			break;
		case CURRENT_INTENT.REMOVE:
			addRule();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			addRule();
			break;
	}
}

function handleProjectItemChanges()
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			createItem();
			break;
		case CURRENT_INTENT.EDIT:
			editItem();
			break;
		case CURRENT_INTENT.REMOVE:
			removeItem();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			swapDuplicateItem();
			break;
	}
}

function handleEquipmentSupplierChanges()
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			createEquipmentSupplier();
			break;
		case CURRENT_INTENT.EDIT:
			editEquipmentSupplier();
			break;
		case CURRENT_INTENT.REMOVE:
			removeEquipmentSupplier();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			swapDuplicateEquipmentSupplier();
			break;
	}
}

function handleSubcontractorChanges()
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			createSubcontractor();
			break;
		case CURRENT_INTENT.EDIT:
			editSubcontractor();
			break;
		case CURRENT_INTENT.REMOVE:
			removeSubcontractor();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			swapDuplicateSubcontractor();
			break;
	}
}

function handleCityChanges()
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			createCity();
			break;
		case CURRENT_INTENT.EDIT:
			editCity();
			break;
		case CURRENT_INTENT.REMOVE:
			removeCity();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			swapDuplicateCity();
			break;
	}
}


function sendText()
{
	let phoneNumber = $('#phoneNumber').val();
	let message = $('#message').val();
	let phoneCarrier = $('#phoneCarrier').val();
	console.log("Num: ", phoneNumber, "\nMessage: ", message, "\nCarrier: ", phoneCarrier);
   	console.log("IN: sendTaskAlert()");
   	if(!confirm("HOLD UP")) return;
   	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendText',
			'phoneNumber' : phoneNumber,
			'message' : message,
			'phoneCarrier' : phoneCarrier
		}, complete: function (response) {
			console.log("RESPONSE FROM sendText() = ", response);			
		}
	});
}


