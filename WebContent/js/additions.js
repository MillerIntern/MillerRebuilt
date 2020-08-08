let users;
let projectItems;
let equipmentSuppliers;
let subcontractors;
let cities;


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

$(document).ready(function(){$('textarea').keydown(function(){
	autoSizeTextAreas(this);
})});

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


//$(document).ready(function()
//{
//   getMasterScopes();
//});

$(document).ready(function(){
	prepareCustomerModal();
	prepareLocationModal();
});

function prepareCustomerModal(){
	//Get DOM Elements
	const Customermodal = document.querySelector('#customer-modal');
	const CustomerModalBtn = document.querySelector('#editCustomerModalButton');
	const CustomerCloseBtn = document.querySelector('#closeEditCustomerModal');

	// Events
	CustomerModalBtn.addEventListener('click', openModal);
	CustomerCloseBtn.addEventListener('click', closeModal);
	window.addEventListener('click', outsideClick);

	// Open
	function openModal() {
		Customermodal.style.display = 'block';
	}

	// Close
	function closeModal() {
		Customermodal.style.display = 'none';
	}

	// Close If Outside Click
	function outsideClick(e) {
	  if (e.target == Customermodal) {
		  Customermodal.style.display = 'none';
	  }
	}
}

function prepareLocationModal(){
	//Get DOM Elements
	const Locationmodal = document.querySelector('#location-modal');
	const LocationModalBtn = document.querySelector('#editLocationModalButton');
	const LocationCloseBtn = document.querySelector('#closeEditLocationModal');

	// Events
	LocationModalBtn.addEventListener('click', openModal);
	LocationCloseBtn.addEventListener('click', closeModal);
	window.addEventListener('click', outsideClick);

	// Open
	function openModal() {
		Locationmodal.style.display = 'block';
	}

	// Close
	function closeModal() {
		Locationmodal.style.display = 'none';
	}

	// Close If Outside Click
	function outsideClick(e) {
	  if (e.target == Locationmodal) {
		  Locationmodal.style.display = 'none';
	  }
	}
}

function getMasterScopes()
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getMasterScopes',
			'id': 0
		
		}, complete: function (data) {
			console.log("data", data.responseJSON);
			var dat = data.responseJSON;
			for(var i = 0; i < dat.length; i++)
			{
				var json = dat[i];
				console.log(json[0]);
			    getProjItem(json[0]);				
			}
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

function fillNavScopeDropdowns(data)
{		
	console.log(data);
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < data.length; i++)
	{
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = data[i].name;
		a.setAttribute("value", data[i].id);
		a.setAttribute("href", "masterScope.html?projItem=" + data[i].id);
		a.setAttribute("onmouseover", "style='background-color: rgb(42, 112, 224); color: white'");
		a.setAttribute("onmouseout", "style='background-color: none;'");
		li.appendChild(a);
		d.appendChild(li);
	}

	$('#dropdown').append(d);
	
}

function getProjItem(id)
{
	console.log("get proj item", id);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectItem',
			'id': id
		
		}, complete: function (data) {
			console.log("projItem: ", data.responseJSON);
			fillNavScopeDropdowns(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}

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
		      if(!(data.responseJSON.permission.name == "admin" || data.responseJSON.permission.name == "superadmin")) {
		    	  alert("Sorry but it looks like you don't have access to this page!");
		    	  document.location.href = "homepage.html";
		      }
		      getUsers();
		      getCustomers();
		      getWarehouses();
			} else {
				console.log("GetUserData() RESPONSE = ",data);
				alert('Server Failure!');
				
			}
		}
	});
}

function getCustomers() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getCustomers',
		}, complete: function (data) {			
			if (data.responseJSON) {
				customers = data.responseJSON;
				console.log("CUSTOMERS = ",customers);
				fillCustomerDropdown(customers);
				fillLocationCustomerDropdown(customers);
				fillEditCustomerDropdown(customers);
			}
		}
		
	});	
}


function fillCustomerDropdown(customers){
	console.log("filling customer dropdown");
	$('#customerDropdown').find('option').remove();
	
	customers.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	
	for(var i = 0; i < customers.length; i++) 
	{
		console.log("Adding the option: ", customers[i].name);
		let option = document.createElement('option');
		option.text = customers[i].name;
		option.value = customers[i].id;
		$('#customerDropdown').append(option);
		
//		option = document.createElement('option');
//		option.text = customers[i].name;
//		option.value = customers[i].id;
	}
//	$('#customerDropdown').selectmenu().selectmenu('refresh', true);
	$('#customerDropdown').chosen({width : '200px'});

}

function fillLocationCustomerDropdown(customers){
	$('#locationCustomerDropdown').find('option').remove();
	
	customers.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	
	for(var i = 0; i < customers.length; i++) 
	{
		let option = document.createElement('option');
		option.text = customers[i].name;
		option.value = customers[i].id;
		$('#locationCustomerDropdown').append(option);
		
		option = document.createElement('option');
		option.text = customers[i].name;
		option.value = customers[i].id;
	}
	
	$('#locationCustomerDropdown').chosen({width : '200px'});

}
function fillEditCustomerDropdown(customers){
	$('#editCustomerDropdown').find('option').remove();
	
	customers.sort(function(a,b){
		if(!a.name) return -1;
		if(!b.name) return 1;
		
		if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	
	for(var i = 0; i < customers.length; i++) 
	{
		let option = document.createElement('option');
		option.text = customers[i].name;
		option.value = customers[i].id;
		$('#editCustomerDropdown').append(option);
		
		option = document.createElement('option');
		option.text = customers[i].name;
		option.value = customers[i].id;
	}
	
	$('#editCustomerDropdown').chosen({width : '200px'});

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

function createCustomer(){
	var customerName = $('#customerName').val();
	if(customerName != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createCustomer',
				'customerName': customerName,
			},
			success: function(data)
			{
				console.log(data);
				$('#customerName').val('');
				alert("Customer Added Successfully!");
				location.reload();
			}
		});
	else{
		alert("Please provide a Customer Name");
	}
}
function createWarehouse()
{
	var city = $('#city').val();
	var state = $("#state").val();
	var region = $("#region").val();
	var customer = $("#locationCustomerDropdown option:selected").text();
	var warehouseID = $('#warehouseId').val();
	
	if(city != '' && state != '' && region != '' && warehouseID != '')
		$.ajax({
			type: 'POST',
			url: 'Admin', 
			data: 
			{
				'action': 'createWarehouse',
				'city': city,
				'state': state,
				'region': region,
				'warehouseID' : warehouseID,
				'customer' : customer,
			},
			success: function(data)
			{
				console.log(data);
				$('#city').val('');
				$('#state').val('');
				$('#region').val('');
				$('#warehouseId').val('');
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
	var personName = $('#userDropDown').val();
	
	
	if(personName != 'default')
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
				$('#userDropDown').val('default');
				alert("Person Added Successfully!");
			}
		});
	}
}
// This function is getting the currently logged in user data and returning it
function getUserData() {
	var result ="";
	$.ajax({
		type: 'POST',
		url: 'Project',
		async: false,
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			console.log(data);
			if(data.responseJSON) {
			  result = data.responseJSON;	
			  
			} else {
				alert('Server Failure!');
				
			}
		}
	});
	return result;
}
function addUser()
{	
	// We are getting the details of the currently logged in user to check Super-Admin status
	var user = getUserData();
	if(user.permission.name != "superadmin"){
		alert("Only Super-Admin can add a user");
		return;
	}
	
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
			var managers = getProjectManagers();
			console.log("managers are ", managers);
		    createUserDropDown(users,managers);
		}
		
	});	
}
function createUserDropDown(userData, projectManagers){
	var countFlag = 0;
	console.log("userData is ",userData);
	console.log("projectManagers are ",projectManagers);
	for(var i=0; i<userData.length; i++){
		for(var j=0; j<projectManagers.length;j++){
			if(userData[i].firstName == projectManagers[j].name){
				countFlag++;
				break;
			}

		}

		if(countFlag == 0){
			var select = document.getElementById("userDropDown");
			var option = document.createElement("option");
			option.value = userData[i].firstName;
			option.innerHTML = userData[i].firstName;
			select.appendChild(option);
		}
		countFlag = 0;
	}
}

function getProjectManagers () {
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		async: false,
		data: {
			'domain': 'project',
			'action': 'getProjectManagers',
		}, complete: function (data) {
			console.log("REPONSE JSON FROM getProjectManagers() = ",data.responseJSON);
			projectManagers = data.responseJSON;
		}
		
	});
	
	return projectManagers;
}

function removeRule()
{
	let ruleId = $('#ruleDropdown').val();
	
	
	$.ajax({
		type: 'POST',
		url: 'Admin', 
		data: 
		{
			'action': 'deleteRule', 
			'ruleId' : ruleId ,
		},
		success: function(data)
		{
			console.log(data);
			
			alert("Rule Deleted Successfully!");
			location.reload(true);
		}
	});	
}

function addRule(action)
{
	let domain = $('#ruleTab').find('#ruleDomainDropdown').val();
	let title = $('#ruleTab').find('#ruleTitle').val();
	let field1 = $('#ruleTab').find('#ruleField1').val();
	let field2 = $('#ruleTab').find('#ruleField2').val();
	let severity = $('#ruleTab').find('#ruleSeverityDropdown').val();
	let projectClass = $('#ruleTab').find('#ruleProjectClassDropdown').val();
	let passMessage = $('#ruleTab').find('#passMessage').val();
	let failMessage = $('#ruleTab').find('#failMessage').val();
	
	
	let validData = true;
	
	if(domain == undefined || domain == "default") {
		$('.makeChanges').removeAttr('disabled');
		alert("Must select a category!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(field1 == undefined || field1 == "default") {
		$('.makeChanges').removeAttr('disabled');
		alert("Field 1 must have a value!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(! title) {
		$('.makeChanges').removeAttr('disabled');
		alert("Each rule must have a title!");
		$('.makeChanges').click(makeChanges);
		return;
	};
	
	if(severity == undefined || severity == "default") {
		$('.makeChanges').removeAttr('disabled');
		alert("Each rule must have a severity!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(projectClass == undefined || projectClass == "default") {
		$('.makeChanges').removeAttr('disabled');
		alert("Please select a project class to apply this rule to!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(passMessage == "") {
		$('.makeChanges').removeAttr('disabled');
		alert("Each rule must have a pass message!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(failMessage == "") {
		$('.makeChanges').removeAttr('disabled');
		alert("Each rule must have a fail message!");
		$('.makeChanges').click(makeChanges);
		return;
	}
	
	if(field2 == "default" || field2 == "None" || field2 == undefined)
		field2 = "None";
	
	
	let intent = "addRule";
	let ruleId;
	if(action == "edit") 
	{
		ruleId = $('#ruleDropdown').val();
		intent = "editRule";
		console.log("RID " , ruleId);
	}

		
			$.ajax({
				type: 'POST',
				url: 'Admin', 
				data: 
				{
					'action': intent, 
					'ruleId' : ruleId,
					'domain': domain,
					'title': title,
					'field1' : field1,
					'field2' : field2,
					'severity' : severity ,
					'projectClass' : projectClass,
					'passMessage' : passMessage,
					'failMessage' : failMessage
				},
				success: function(data)
				{
					console.log(data);
					if(intent == "editRule")
						alert("Rule Edited Successfully!");
					else
						alert("Rule Added Successfully!");
					location.reload(true);
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
			'ruleSeverity' : true ,
			'projectRules' : true , 
			'class' : true , 
			'generalInfoFields': true,
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
			if (data.responseJSON.generalInfoFields) {
				generalInfoFields = JSON.parse(data.responseJSON.generalInfoFields);
			}
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
				console.log(taskFields);
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


function fillRuleDomainsDropdown()
{
	if(ruleDomains == undefined)
		return;
	
//	$('#ruleDomainDropdown').find('option').remove();
	
	
	for(var ruleDomain in ruleDomains)
	{
		var option = document.createElement('option');
		option.value = ruleDomains[ruleDomain].domain;
		option.innerHTML = ruleDomains[ruleDomain].domain;
		
		$('#ruleDomainDropdown').append(option);
		
	}
	
	$('#ruleDomainDropdown').chosen({width : "200px"});
	$('#ruleDomainDropdown').change(filterFieldsByDomain);
	$('#ruleField1').chosen({width : '200px'});
	$('#ruleField2').chosen({width : '200px'});
	$('#ruleField1').change(filterSecondField);
}

function filterSecondField()
{
	var val = $('#ruleField1').val();
	var dropVal = $('#ruleDomainDropdown').val();
	
	console.log("VAL " , val);
	console.log(dropVal);
	
	var type = getFieldType(val);
	
	if(dropVal != "Tasks")
	{	
		$('#ruleField2').find('option').each(function(index){
			if(this.type != type && this.type != undefined) {
				$(this).hide();
			}
			else {
				$(this).show();
				console.log("NOT EQUAL");
			}
		});
	}
	
	$('#ruleField2').trigger('chosen:updated');
	
}

function getFieldType(val)
{
	var dropVal = $('#ruleDomainDropdown').val();
	
	console.log("DROP = " , dropVal);
	switch(dropVal)
	{
		case "General Information":
			return generalInfoFields[val];
		case "Permits and Inspections":
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

function filterFieldsByDomain()
{
	var dropVal = $('#ruleDomainDropdown').val();
	
	if(CURRENT_INTENT.INTENT == CURRENT_INTENT.REMOVE_DUPLICATE)
		return;
	
	$('#secondFieldRow').show();
	console.log("DROP = " , dropVal);
	switch(dropVal)
	{
		case "General Information":
			fillField1(generalInfoFields);
			fillField2(generalInfoFields);
			break;
		case "Permits and Inspections":
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
			break;
		case "Tasks":
			fillField1(taskFields);
			fillField2(taskFields);
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
	
	console.log( str );
	
	// Scheduling
	if( str == "projectInitiatedDate")
		result = "Initiation Date";
	else if( str == "siteSurvey")
		result = "Site Survey Date";
	else if( str == "proposalSubmitted")
		result = "Proposal Submitted Date";
	else if( str == "budgetarySubmitted")
		result = "Budgetary Submitted Date";
	else if( str == "actualTurnover")
		result = "Actual Turnover";
	else if( str == "proposalDue")
		result = "Proposal Due Date";
	else if( str == "scheduledStartDate")
		result = "Scheduled Start Date";
	else if( str == "budgetaryDue")
		result = "Budgetary Due Date";
	else if( str == "scheduledTurnover")
		result = "Scheduled Turnover"; 
	// Tasks
	else if( str == "assignedDate")
		result = "Assigned Date";
	else if( str == "dueDate")
		result = "Due Date";
	else if( str == "status")
		result = "Status";	
	// Financial
	else if( str == "actualInvoice")
		result = "Actual Invoice";
	else if( str == "shouldInvoice")
		result = "Should Invoice";
	else if( str == "cost")
		result = "Cost";
	else if( str == "customerNumber")
		result = "Customer Number"; 
	// General Information
	else if( str == "McsNumber")
		result = "MCS Project #";
	else if( str == "warehouse")
		result = "Warehouse";
	else if( str == "projectManagers")
		result = "Manager";
	else if( str == "projectItem")
		result = "Item";
	else if( str == "supervisors")
		result = "Supervisor";
	else if( str == "stage")
		result = "Stage";
	else if( str == "projectType")
		result = "Type";
	else if( str == "projectClass")
		result = "Project";
	else if( str == "autofillPermits")
		result = "Permits";
	else if( str == "autofillHVAC")
		result = "HVAC";
	else if( str == "autofillRefrigeration")
		result = "Refrigeration";
	else if( str == "scope" )
		result = "Scope";
	// Equipment
	else if( str == "estDeliveryDate")
		result = "Estimated Delivery Date";
	else if( str == "description")
		result = "Description";
	else if( str == "orderedDate")
		result = "Ordered Date";
	else if( str == "poNum")
		result = "PO #";
	else if( str == "equipmentName")
		result = "Equipment Name";
	else if( str == "deliveryDate")
		result = "Actual Delivery Date";
	else if( str == "eqSupplier")
		result = "Supplier";
	else if( str == "deliveryStatus")
		result = "Delivery Status"; 
	// Change Order
	else if( str == "customerCOPnum")
		result = "Customer COP #";
	else if( str == "sell")
		result = "Sell";
	else if( str == "mcsCO")
		result = "MCS CO #";
	else if( str == "subCO")
		result = "Sub CO #";
	else if( str == "title")
		result = "Title";
	else if( str == "approvedDate")
		result = "Approved Date";
	else if( str =="submittedDate")
		result = "Submit Date";
	else if( str == "proposalDate")
		result = "Subs Submitted Date";
	else if( str == "invoiceNumber")
		result = "Invoice #";
	else if( str == "subNames")
		result = "Sub Names";
	else if( str == "briefDescription")
		result = "Description";
	else if( str == "type")
		result = "Customer";	
	// Permits and Inspections
	else if( str == "mechanicalPermitRequired")
		result = "Mechanical Permit Required";
	else if( str == "mechanicalPermitStatus")
		result = "Mechanical Permit Status";
	else if( str == "mechanicalPermitLastUpdated")
		result = "Mechanical Permit Last Updated";
	else if( str == "mechanicalInspectionRequired")
		result = "Mechanical Inspection Required";
	else if( str == "mechanicalInspectionStatus")
		result = "Mechanical Inspection Status";
	else if( str == "mechanicalInspectionLastUpdated")
		result = "Mechanical Inspection Last Updated";
	else if( str == "buildingPermitRequired")
		result = "Building Permit Required";
	else if( str == "buildingPermitStatus")
		result = "Building Permit Status";
	else if( str == "buildingPermitLastUpdated")
		result = "Building Permit Last Updated";
	else if( str == "buildingInspectionRequired")
		result = "Building Inspection Required";
	else if( str == "buildingInspectionStatus")
		result = "Building Inspection Status";
	else if( str == "buildingInspectionLastUpdated")
		result = "Building Inspection Last Updated";
	else if( str == "ceilingPermitRequired")
		result = "Ceiling Permit Required";
	else if( str == "ceilingPermitStatus")
		result = "Ceiling Permit Status";
	else if( str == "ceilingPermitLastUpdated")
		result = "Ceiling Permit Last Updated";
	else if( str == "ceilingInspectionRequired")
		result = "Ceiling Inspection Required";
	else if( str == "ceilingInspectionStatus")
		result = "Ceiling Inspection Status";
	else if( str == "ceilingInspectionLastUpdated")
		result = "Ceiling Inspection Last Updated";
	else if( str == "electricalPermitRequired")
		result = "Electrical Permit Required";
	else if( str == "electricalPermitStatus")
		result = "Electrical Permit Status";
	else if( str == "electricalPermitLastUpdated")
		result = "Electrical Permit Last Updated";
	else if( str == "electricalInspectionRequired")
		result = "Electrical Inspection Required";
	else if( str == "electricalInspectionStatus")
		result = "Electrical Inspection Status";
	else if( str == "electricalInspectionLastUpdated")
		result = "Electrical Inspection Last Updated";
	else if( str == "plumbingPermitRequired")
		result = "Plumbing Permit Required";
	else if( str == "plumbingPermitStatus")
		result = "Plumbing Permit Status";	
	else if( str == "plumbingPermitLastUpdated")
		result = "Plumbing Permit Last Updated";
	else if( str == "plumbingInspectionRequired")
		result = "Plumbing Inspection Required";
	else if( str == "plumbingInspectionStatus")
		result = "Plumbing Inspection Status";
	else if( str == "plumbingInspectionLastUpdated")
		result = "Plumbing Inspection Last Updated";
	else if( str == "gasPermitRequired")
		result = "Gas Permit Required";
	else if( str == "gasPermitStatus")
		result = "Gas Permit Status";	
	else if( str == "gasPermitLastUpdated")
		result = "Gas Permit Last Updated";
	else if( str == "gasInspectionRequired")
		result = "Gas Inspection Required";
	else if( str == "gasInspectionStatus")
		result = "Gas Inspection Status";
	else if( str == "gasInspectionLastUpdated")
		result = "Gas Inspection Last Updated";
	else if( str == "sprinklerPermitRequired")
		result = "Sprinkler Permit Required";
	else if( str == "sprinklerPermitStatus")
		result = "Sprinkler Permit Status";	
	else if( str == "fire_sprinklerPermitLastUpdated")
		result = "Sprinkler Permit Last Updated";
	else if( str == "sprinklerInspectionRequired")
		result = "Sprinkler Inspection Required";
	else if( str == "sprinklerInspectionStatus")
		result = "Sprinkler Inspection Status";
	else if( str == "sprinklerInspectionLastUpdated")
		result = "Sprinkler Inspection Last Updated";
	else if( str == "fireAlarmPermitRequired")
		result = "Fire Alarm Permit Required";
	else if( str == "fireAlarmPermitStatus")
		result = "Fire Alarm Permit Status";	
	else if( str == "fire_alarmPermitLastUpdated")
		result = "Fire Alarm Permit Last Updated";
	else if( str == "fireAlarmInspectionRequired")
		result = "Fire Alarm Inspection Required";
	else if( str == "fireAlarmInspectionStatus")
		result = "Fire Alarm Inspection Status";
	else if( str == "fireAlarmInspectionLastUpdated")
		result = "Fire Alarm Inspection Last Updated";
	else if( str == "voltagePermitRequired")
		result = "Low Voltage Permit Required";
	else if( str == "voltagePermitStatus")
		result = "Low Voltage Permit Status";
	else if( str == "low_voltagePermitLastUpdated")
		result = "Low Voltage Permit Last Updated";
	else if( str == "voltageInspectionRequired")
		result = "Low Voltage Inspection Required";
	else if( str == "voltageInspectionStatus")
		result = "Low Voltage Inspection Status";
	else if( str == "voltageInspectionLastUpdated")
		result = "Low Voltage Inspection Last Updated";
	else if( str == "otherAPermitRequired")
		result = "Other Permit Required A";
	else if( str == "otherAPermitStatus")
		result = "Other Permit Status A";
	else if( str == "otherAPermitLastUpdated")
		result = "Other Permit Last Updated A";
	else if( str == "otherAInspectionRequired")
		result = "Other Inspection Required A";
	else if( str == "otherAInspectionStatus")
		result = "Other Inspection Status A";
	else if( str == "otherAInspectionLastUpdated")
		result = "Other Inspection Last Updated A";
	else if( str == "otherBPermitRequired")
		result = "Other Permit Required B";
	else if( str == "otherBPermitStatus")
		result = "Other Permit Status B";
	else if( str == "otherBPermitLastUpdated")
		result = "Other Permit Last Updated B";
	else if( str == "otherBInspectionRequired")
		result = "Other Inspection Required B";
	else if( str == "otherBInspectionStatus")
		result = "Other Inspection Status B";
	else if( str == "otherBInspectionLastUpdated")
		result = "Other Inspection Last Updated B";
	// Closeout
	else if( str == "salvageValue")
		result = "Salvage Value";
	else if( str == "buildingFinalStatus")
		result = "Building Final Inspection Status";
	else if( str == "ceilingFinalStatus")
		result = "Ceiling Final Inspection Status";
	else if( str == "mechFinalStatus")
		result = "Mechanical Final Inspection Status";
	else if( str == "elecFinalStatus")
		result = "Electrical Final Inspection Status";
	else if( str == "plumbingFinalStatus")
		result = "Plumbing Final Inspection Status";
	else if( str == "gasFinalStatus")
		result = "Gas Final Inspection Status";
	else if( str == "sprinkleFinalStatus")
		result = "Sprinkler Final Inspection Status";
	else if( str == "fireAlarmFinalStatus")
		result = "Fire Alarm Final Inspection Status";
	else if( str == "lowVolFinalStatus")
		result = "Low Voltage Final Inspection Status";
	else if( str == "tmpCertificateStatus")
		result = "Temp Certificate of Occupancy Status";
	else if( str == "certificateStatus")
		result = "Certificate of Occupancy Status";
	else if( str == "buidlingFinalDate")
		result = "Building Final Inspection Last Updated";
	else if( str == "ceilingFinalDate")
		result = "Ceiling Final Inspection Last Updated";
	else if( str == "mechFinalDate")
		result = "Mechanical Final Inspection Last Updated";
	else if( str == "elecFinalDate")
		result = "Electrical Final Inspection Last Updated";
	else if( str == "plumbingFinalDate")
		result = "Plumbing Final Inspection Last Updated";
	else if( str == "gasFinalDate")
		result = "Gas Final Inspection Last Updated";
	else if( str == "sprinkleFinalDate")
		result = "Sprinkler Final Inspection Last Updated";
	else if( str == "fireAlarmFinalDate")
		result = "Fire Alarm Final Inspection Last Updated";
	else if( str == "lowVolFinalDate")
		result = "Low Voltage Final Inspection Last Updated";
	else if( str == "tmpCertificateDate")
		result = "Temp Certificate of Occupancy Last Updated";
	else if( str == "certificateDate")
		result = "Certificate of Occupancy Last Updated";
	
	else if( str == "MCSWarrantyStatus")
		result = "MCS Warranty Status";
	else if( str == "GCWarrantyStatus")
		result = "GC WarrantyStatus";
	else if( str == "mechanicalWarrantyStatus")
		result = "Mechanical Warranty Status";
	else if( str == "electricalWarrantyStatus")
		result = "Electrical Warranty Status";
	else if( str == "plumbingWarrantyStatus")
		result = "Plumbing Warranty Status";
	else if( str == "gasWarrantyStatus")
		result = "Gas Warranty Status";
	else if( str == "sprinkleWarrantyStatus")
		result = "Sprinkler Warranty Status";
	else if( str == "HTIWarrantyStatus")
		result = "HTI Warranty Status";
	else if( str == "otherWarrantyStatusA")
		result = "Other Warranty Status A";
	else if( str == "otherWarrantyStatusB")
		result = "Other Warranty Status B";
	else if( str == "MCSWarrantyDate")
		result = "MCS Warranty Last Updated";
	else if( str == "GCWarrantyDate")
		result = "GC Warranty Last Updated";
	else if( str == "mechanicalWarrantyDate")
		result = "Mechanical Warranty Last Updated";
	else if( str == "electricalWarrantyDate")
		result = "Electrical Warranty Last Updated";
	else if( str == "plumbingWarrantyDate")
		result = "Plumbing Warranty Last Updated";
	else if( str == "gasWarrantyDate")
		result = "Gas Warranty Last Updated";
	else if( str == "sprinkleWarrantyDate")
		result = "Sprinkler Warranty Last Updated";
	else if( str == "HTIWarrantyDate")
		result = "HTI Warranty Last Updated";
	else if( str == "otherWarrantyDateA")
		result = "Other Warranty Last Updated A";
	else if( str == "otherWarrantyDateB")
		result = "Other Warranty Last Updated B";
		
	
	else if( str == "MCSStatus")
		result = "MCS Lien Status";
	else if( str == "GCStatus")
		result = "GC Lien Status";
	else if( str == "mechanicalStatus")
		result = "Mechanical Lien Status";
	else if( str == "electricalStatus")
		result = "Electrical Lien Status";
	else if( str == "plumbingStatus")
		result = "Plumbing Lien Status";
	else if( str == "gasStatus")
		result = "Gas Lien Status";
	else if( str == "sprinkleStatus")
		result = "Sprinkler Lien Status";
	else if( str == "HTIStatus")
		result = "HTI Lien Status";
	else if( str == "otherFinalLeinsStatus")
		result = "Other Lien Status A";
	else if( str == "otherFinalLeinsBStatus")
		result = "Other Lien Status B";
	else if( str == "MCSDate")
		result = "MCS Lien Last Updated";
	else if( str == "GCDate")
		result = "GC Lien Last Updated";
	else if( str == "mechanicalDate")
		result = "Mechanical Lien Last Updated";
	else if( str == "electricalDate")
		result = "Electrical Lien Last Updated";
	else if( str == "plumbingDate")
		result = "Plumbing Lien Last Updated";
	else if( str == "gasDate")
		result = "Gas Lien Last Updated";
	else if( str == "sprinkleDate")
		result = "Sprinkler Lien Last Updated";
	else if( str == "HTIDate")
		result = "HTI Lien Last Updated";
	else if( str == "otherFinalLeinsDate")
		result = "Other Lien Last Updated A";
	else if( str == "otherFinalLeinsBDate")
		result = "Other Lien Last Updated B";
	
	else if( str == "punchListStatus")
		result = "Punch List Status";
	else if( str == "punchList")
		result = "Punch List Last Updated";
	else if( str == "closeOutPhotosStatus")
		result = "Closeout Photos Status";
	else if( str == "closeoutPhotosCL")
		result = "Closeout Photos Last Updated";
	else if( str == "asBuiltDrawingsStatus")
		result = "As-Built Drawings Status";
	else if( str == "asBuilts")
		result = "As-Built Drawings Last Updated";
	else if( str == "alarmFormStatus")
		result = "Alarm Form Status";
	else if( str == "alarmHvacForm")
		result = "Alarm Form Last Updated";
	else if( str == "HVACstartupFormDate")
		result = "HVAC Startup Form Last Updated";
	else if( str == "HVACstartupFormStatus")
		result = "HVAC Startup Form Status";
	else if( str == "verisaeReportStatus")
		result = "Verisae Report Status";
	else if( str == "verisaeShutdownReport")
		result = "Verisae Report Last Updated";
	else if( str == "numOfMCSChangeOrdersCompleted")
		result = "Number of MCS Change Orders Completed";
	else if( str == "numOfMCSChangeOrders")
		result = "Number of MCS Change Orders";
	else if( str == "releaseOfLiensStatus")
		result = "Contractor's Lien Release Status";
	else if( str == "releaseOfLiensDate")
		result = "Contractor's Lien Release Last Updated";
	else if( str == "paymentOfDebtsAndClaimsDate")
		result = "Affidavit of Payment of Debts and Claims Last Updated";
	else if( str == "paymentOfDebtsAndClaimsStatus")
		result = "Affidavit of Payment of Debts and Claims Status";
	else if( str == "mulvannySignOffDate")
		result = "MG2 Project Sign-off Last Updated";
	else if( str == "mulvannySignOffStatus" )
		result = "MG2 Project Sign-off Status";
	else if( str == "substantialCompletionDate")
		result = "Certificate of Substantial Completion Last Updated";
	else if( str == "substantialCompletionStatus")
		result = "Certificate of Substantial Completion Status";
	else if( str == "equipmentSubCL")
		result = "Equipment Submittal Last Updated";
	else if( str == "equipmentSubmittalStatus")
		result = "Equipment Submittal Status";
	else if( str == "manualStatus")
		result = "Operations and Maintenance Manuals Status";
	else if( str == "manualDate")
		result = "Operations and Maintenance Manuals Last Updated";
	else if( str == "numOfChangeOrders")
		result = "Number of MG2 Change Orders";
	else if( str == "numOfChangeOrdersCompleted")
		result = "Number of MG2 Change Orders Completed";
	
	console.log( result );
	
	return result;
}

function fillRuleSeverityDropdown()
{
	if(ruleSeverity == undefined)
		return;
	
	
	
	for(var severity in ruleSeverity)
	{
		if(ruleSeverity[severity].severityName == "Medium")
			continue;
		
		var option = document.createElement('option');
		option.value = ruleSeverity[severity].severity;
		option.innerHTML = ruleSeverity[severity].severityName;
		
		$('#ruleSeverityDropdown').append(option);
	}
	
	$('#ruleSeverityDropdown').chosen({width : "200px"});
}

function fillProjectRulesDropdown()
{
	if(projectRules == undefined)
		return;
	
	$('#ruleDropdown').find('option').remove();
	
	for(var i = 0; i < projectRules.length; i++)
	{
		var option = document.createElement('option');
		option.value = projectRules[i].id;
		option.innerHTML = projectRules[i].title;
		
		$('#ruleDropdown').append(option);
	}
	
	$('#ruleDropdown').chosen({width : "200px"});
}


function fillProjectClassesDropdown()
{
	if(projectClasses == undefined)
		return;
	
	for(var i = 0; i < projectClasses.length; i++)
	{
		if(projectClasses[i].id == 8)
			continue;
		
		var option = document.createElement('option');
		option.value = projectClasses[i].id;
		option.innerHTML = projectClasses[i].name;
		
		$('#ruleProjectClassDropdown').append(option);
	}
	
	$('#ruleProjectClassDropdown').chosen({width : "200px"});
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
	$('#warehouseDropdown').find('option').remove();
	
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
		$('#warehouseDropdown').append(option);
		
		option = document.createElement('option');
		option.text = cities[i].name;
		option.value = cities[i].id;
		$('#duplicateCityDropdown').append(option);
	}
	
	$('#cityDropdown').chosen({width : '200px'});
	$('#warehouseDropdown').chosen({width : '200px'});
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
			hideSecondField();
			removeDefaultAfterEdit();

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
			//$('.editingRow').hide();

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
	
	$('select').trigger('chosen:updated');
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
	showSecondFieldForEdit();
	console.log("FILLED TAB FOR EDIT , " , projectObject , tabId);
	
	if(tabId && tabId != "ruleTab") 
	{
		$('#' + tabId).find('.editingField.name').val(projectObject.name);
		$('#' + tabId).find('.editingField.email').val(projectObject.email);
	}
	else if(projectObject.title && projectObject.domain) //Rules tab
	{
		$('#ruleTitle').val(projectObject.title);
		
		if(projectObject.domain == "ChangeOrders")
			$('#ruleDomainDropdown').val("Change Orders");
		else if(projectObject.domain == "PermitsAndInspections")
			$('#ruleDomainDropdown').val("Permits and Inspections");
		else if(projectObject.domain == "GeneralInfo")
			$('#ruleDomainDropdown').val("General Information");
		else
			$('#ruleDomainDropdown').val(projectObject.domain);
			
		
		$('#ruleDomainDropdown').trigger('change');
		
		
		$('#ruleField1').val(projectObject.field1);
		
		if(projectObject.field2 == null || projectObject.field2 == undefined)
		{
			$('#ruleField2').val("None");
			$('#ruleField2').innerHTML("None");
		}
		else
			$('#ruleField2').val(projectObject.field2);
		
		
		if(projectObject.severity == "LOW")
			$('#ruleSeverityDropdown').val(1);
		else if(projectObject.severity == "MEDIUM")
			$('#ruleSeverityDropdown').val(2);
		else if(projectObject.severity == "HIGH")
			$('#ruleSeverityDropdown').val(3);
		
		
		if(projectObject.projectClass)
			$('#ruleProjectClassDropdown').val(projectObject.projectClass.id);
		else
			$('#ruleProjectClassDropdown').val("none");
		
		$('#ruleGoalDropdown').val(projectObject.goal);
		
		$('#passMessage').val(projectObject.passMessage);
		$('#failMessage').val(projectObject.failMessage);
		
		$('#ruleTab').find('select').trigger('chosen:updated');

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
		case "ruleTab":
			if(projectRules) 
			{
				for(var i = 0; i < projectRules.length; i++) {
					if(projectRules[i].id == selectedId)
						return projectRules[i];
				}
			}
			break;
	}
	
}


function makeChanges()
{
	console.log("in makeChanges()");
//	$('.makeChanges').attr('disabled' , 'true');
//	$('.makeChanges').off('click');
	
	let currentTabId = $('.tab-content.current').attr('id');
			
	switch(currentTabId)
	{
		case "item":
			handleChanges(createItem , editItem , removeItem , swapDuplicateItem);
			break;
		case "subcontractor":
			handleChanges(createSubcontractor , editSubcontractor , removeSubcontractor , swapDuplicateSubcontractor);
			break;
		case "equipmentSupplier":
			handleChanges(createEquipmentSupplier , editEquipmentSupplier , removeEquipmentSupplier , swapDuplicateEquipmentSupplier);
			break;
		case "cityTab":
			handleChanges(createCity , editCity , removeCity , swapDuplicateCity);
			break;
		case "ruleTab":
			handleChanges(addRule , addRule , removeRule , removeRule);
			break;
	}
	
}

function handleChanges(create , edit , remove , removeDuplicate)
{
	switch(CURRENT_INTENT.INTENT)
	{
		case CURRENT_INTENT.ADD:
			create();
			break;
		case CURRENT_INTENT.EDIT:
			edit("edit");
			break;
		case CURRENT_INTENT.REMOVE:
			remove();
			break;
		case CURRENT_INTENT.REMOVE_DUPLICATE:
			removeDuplicate();
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

function showSecondField()
{
  $(".showSecondField").css("display", "none");
  $("#secondFieldTitle").css("display", "");
  $("#secondFieldSelect").css("display", "");
  $("#hideSecondField").css("display", "");
}

function showSecondFieldForEdit()
{
  $(".showSecondField").css("display", "none");
  $("#secondFieldTitle").css("display", "");
  $("#secondFieldSelect").css("display", "");
  $("#hideSecondField").css("display", "none");
}

function hideSecondField()
{
  $(".showSecondField").css("display", "");
  $("#secondFieldTitle").css("display", "none");
  $("#secondFieldSelect").css("display", "none");
  $("#hideSecondField").css("display", "none");
}

function removeDefaultAfterEdit()
{
	$(".chosen-single").removeClass('chosen-default');
}


function permissionCheckForScoreCard(){
	let user;
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, success: function (data) {
			user = data;
			if(user.permission.name == "superadmin")
			{
				if(confirm('Make Sure that Nobody is using the Database. Are you sure you want to update?') == true)
					getColorForAllProjects();
			}
			else
			{
				alert("You don't have the permission to Update scorecard");
			}
		}
	});
}

function getColorForAllProjects(){
	
	t0 = new Date().getTime();
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getAllProjectsIds'
		}, success: function (data) {
			projects = data;
			
			//var projectsIds = newArray;	
			
			RETRIEVED_PROJECTS = JSON.parse(projects['projects']);
			console.log(RETRIEVED_PROJECTS); //An array of arrays
			t1 = new Date().getTime();
			console.log('took: ' + (t1 - t0) + 'ms');
			//console.log("Newly retrieved projects are", RETRIEVED_PROJECTS);
			RETRIEVED_PROJECTS = JSON.stringify(RETRIEVED_PROJECTS);
			evaluateColorBasedOnRules(RETRIEVED_PROJECTS);
		}
	});
}

function evaluateColorBasedOnRules(projects){
	t0 = new Date().getTime();
	console.log("projects length is ",projects.length);
	gettingTheFinalColors(projects)
	
	t1 = new Date().getTime();
	console.log('took: ' + (t1 - t0) + 'ms');
	
}

function gettingTheFinalColors(project){
	//listOfProjectColors.push([project,"Red"]);
	t0 = new Date().getTime();
	if (project != null) {
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'getScoreColor',
				 project: project
			}, success: function (data) {	
				console.log("output from getScoreColor is ", data);
				t1 = new Date().getTime();
				console.log('took: ' + (t1 - t0) + 'ms');
			}
		});	
	}
	//console.log(listOfProjectColors);
	
}

function getWarehouses(){		
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getAllWarehouses'
		}, success: function (data) {
			warehouses = data;		
			console.log("WH",warehouses);
			fillEditLocationDropdown(warehouses);

		}
	});
}

function fillEditLocationDropdown(warehouses){
	$('#editLocationDropdown').find('option').remove();
	
	warehouses.sort(function(a,b){
		if(!a.city.name) return -1;
		if(!b.city.name) return 1;
		
		if(a.city.name.toLowerCase() < b.city.name.toLowerCase()) return -1;
		if(a.city.name.toLowerCase() > b.city.name.toLowerCase()) return 1;
		
		return 0;
	});
	
	
	for(var i = 0; i < warehouses.length; i++) 
	{
		let option = document.createElement('option');
		option.text = warehouses[i].city.name;
		option.value = warehouses[i].city.id;
		option.setAttribute('warehouseId', warehouses[i].id);
		$('#editLocationDropdown').append(option);
		
		option = document.createElement('option');
		option.text = warehouses[i].city.name;
		option.value = warehouses[i].city.id;
		option.setAttribute('warehouseId', warehouses[i].id);
	}
	
	$('#editLocationDropdown').chosen({width : '200px'});
}


function editCustomer(){
	var oldCustomerId = document.getElementById("editCustomerDropdown").value;
	var newCustomerName = document.getElementById("editCustomerName").value;
	if(newCustomerName != ''){
		$.ajax({
			type: 'POST',
			url: 'Project',
			data: {
				'domain': 'project',
				'action': 'editCustomer',
				'oldCustomerId' : oldCustomerId,
				'newCustomerName' : newCustomerName
			}, complete: function (response) {
				alert("Customer Updated Succesfully");
				
				//Write the code to update the list then and there rather than refreshing
//				getCustomers();
				location.reload();											
//				$("li[data-tab = 'warehouse']").trigger('click');
				
				
				console.log("RESPONSE FROM editCustomer() = ", response);			
			}
		});
	}
	else{
		alert("Please provide a valid Customer Name");
	}
}


function editLocation(){
	
	var oldLocationValue = document.getElementById("editLocationDropdown");
	var oldLocationSelected = oldLocationValue.options[oldLocationValue.selectedIndex];
	
	var oldLocationCityId = document.getElementById("editLocationDropdown").value;
	var oldLocationWarehouseId = oldLocationSelected.getAttribute('warehouseId');	
	
	/*
	 * I am able to fetch the warehouse id and the city id.
	 * To do:
	 * After the design and architecture is finalized, try to include
	 * 1. onchange option, autofill other values
	 * */
//	alert(oldLocationCityId);
//	alert(oldLocationWarehouseId);
}
