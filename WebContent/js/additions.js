let users;
let projectItems;
let equipmentSuppliers;
let subcontractors;

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
		      if(data.responseJSON.permission.id != 1) {
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
			'item' : true
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
			getSubcontractors();
		}
		
	});	
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
	
	$('.duplicateRemoval').hide();

	switch(intent)
	{
		case CURRENT_INTENT.ADD:
			CURRENT_INTENT.INTENT = CURRENT_INTENT.ADD;
			clearEditingFields();
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
	$('.projectObjectDropdown').each(function (index){
		console.log("HERE WE ISZZZ" , this);

		$(this).change(function(){
			//TO DO NOT COMPLETE
			$('.tab-content.current').find('.duplicateRemovalDropdown').find('option').show();
			$('.tab-content.current').find('.duplicateRemovalDropdown').trigger('chosen : updated');
			let selectedId = $('.tab-content.current').find('.projectObjectDropdown').val();
			let found = $('.tab-content.current').find('.duplicateRemovalDropdown').find("[value = '" + selectedId + "']").hide();
			console.log("HERE WE IS" , this , selectedId , found);

			$('.tab-content.current').find('.duplicateRemovalDropdown').trigger('chosen : updated');
		});
	});

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
	}
	
}



function makeChanges()
{
	
	$('.makeChanges').addClass('disabled');
	
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


