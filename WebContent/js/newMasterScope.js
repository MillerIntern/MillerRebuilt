
$(document).ready(function()
{
   getUserInfo();	
   getProjectItems();
   getMasterScopes();
});


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

function getUserInfo(){
	let user;
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, success: function (data) {
			user = data;
			console.log(user);
			 if(user.permission.id != 1)
				 hideAdminContent();	
			}
		});
}

function getProjectItems()
{

	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getSpecificObjects',
			'item': true,
		},
		success: function(data)
		{
			console.log(data);
			fillDropdowns(data);

		}
	});
}


function fillDropdowns(data)
{
	console.log(data);
	var projItems = JSON.parse(data["item"]);
	console.log(projItems);
	
	var d = document.createDocumentFragment();
	
	for(var i = 0; i < projItems.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = projItems[i].name;
		option.setAttribute("value", projItems[i].id);
		d.appendChild(option);
	}

	var defaultOption = document.createElement('option');
	defaultOption.value = "default";
	defaultOption.innerHTML = "---Select a Project Item---";

	
	$('#newMasterScopeForm').find('#projectItem').find('option').remove();
	$('#newMasterScopeForm').find('#projectItem').append(defaultOption);
	$('#newMasterScopeForm').find('#projectItem').append(d);
	
}


function saveMasterScope()
{
    var projectItem = $('#newMasterScopeForm').find('#projectItem').val();
    console.log(projectItem);
    
    var item1 = $('#newMasterScopeForm').find('#scopeItem1').val();
    var item2 = $('#newMasterScopeForm').find('#scopeItem2').val();
    var item3 = $('#newMasterScopeForm').find('#scopeItem3').val();
    var item4 = $('#newMasterScopeForm').find('#scopeItem4').val();
    var item5 = $('#newMasterScopeForm').find('#scopeItem5').val();
    var item6 = $('#newMasterScopeForm').find('#scopeItem6').val();
    var item7 = $('#newMasterScopeForm').find('#scopeItem7').val();
    var item8 = $('#newMasterScopeForm').find('#scopeItem8').val();
    var item9 = $('#newMasterScopeForm').find('#scopeItem9').val();
    var item10 = $('#newMasterScopeForm').find('#scopeItem10').val();
    
    var quantity1 = $('#newMasterScopeForm').find('#quantity1').val();
    var quantity2 = $('#newMasterScopeForm').find('#quantity2').val();
    var quantity3 = $('#newMasterScopeForm').find('#quantity3').val();
    var quantity4 = $('#newMasterScopeForm').find('#quantity4').val();
    var quantity5 = $('#newMasterScopeForm').find('#quantity5').val();
    var quantity6 = $('#newMasterScopeForm').find('#quantity6').val();
    var quantity7 = $('#newMasterScopeForm').find('#quantity7').val();
    var quantity8 = $('#newMasterScopeForm').find('#quantity8').val();
    var quantity9 = $('#newMasterScopeForm').find('#quantity9').val();
    var quantity10 = $('#newMasterScopeForm').find('#quantity10').val();
    
//    if(item1 != undefined && quantity1 == "default")
//    {
//    	alert("Select a value for Quantity Required for scope item 1");
//    }
//    
//    if(item1 == undefined && quantity1 != "default")
//    {
//    	alert("Give scope item 1 a value");
//    }
//    
//    if(item2 != undefined && quantity2 == "default")
//    {
//    	alert("Select a value for Quantity Required for scope item 2");
//    }
//    
//    if(item2 == undefined && quantity2 != "default")
//    {
//    	alert("Give scope item 2 a value");
//    }
    
    $.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'addMasterScope',
			'projectItem': projectItem,
			'item': 0,
			'item1': item1,
			'item2': item2,
			'item3': item3,
			'item4': item4,
			'item5': item5,
			'item6': item6,
			'item7': item7,
			'item8': item8,
			'item9': item9,
			'item10': item10,
			'quantity1': quantity1,
			'quantity2': quantity2,
			'quantity3': quantity3,
			'quantity4': quantity4,
			'quantity5': quantity5,
			'quantity6': quantity6,
			'quantity7': quantity7,
			'quantity8': quantity8,
			'quantity9': quantity9,
			'quantity10': quantity10,
		
		}, complete: function (data) {
			console.log(data);
			alert('Save Complete!');
		}, error: function (data) {
			alert("error!");
		}
		
	});
}