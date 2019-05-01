let scopeID;
let id;

$(document).ready(function()
{
   getMasterScopes();
   scopeID = location.search.substring(10);
   console.log(scopeID);
   getSpecMasterScope(scopeID);
   getSpecProjItem(scopeID);
});

function getSpecMasterScope(id)
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getSpecMasterScope',
			'id': id
		
		}, complete: function (data) {
			console.log("master scope: ", data.responseJSON);
			fillMasterScope(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});

}


function getSpecProjItem(id)
{
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getProjectItem',
			'id': id
		
		}, complete: function (data) {
			console.log("proj Item: ", data.responseJSON);
			setTitle(data.responseJSON);
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});

}


function setTitle(data)
{
	var span = document.getElementById('itemMasterScope');
	span.innerHTML = data[0].name + ' : Master Scope';
}


function fillMasterScope(data)
{
	var item1 = document.getElementById('item1');
	item1.innerHTML = data[0].item1;
	
	var item2 = document.getElementById('item2');
	item2.innerHTML = data[0].item2;
	
	var item3 = document.getElementById('item3');
	item3.innerHTML = data[0].item3;
	
	var item4 = document.getElementById('item4');
	item4.innerHTML = data[0].item4;
	
	var item5 = document.getElementById('item5');
	item5.innerHTML = data[0].item5;
	
	var item6 = document.getElementById('item6');
	item6.innerHTML = data[0].item6;
	
	var item7 = document.getElementById('item7');
	item7.innerHTML = data[0].item7;
	
	var item8 = document.getElementById('item8');
	item8.innerHTML = data[0].item8;
	
	var item9 = document.getElementById('item9');
	item9.innerHTML = data[0].item9;
	
	var item10 = document.getElementById('item10');
	item10.innerHTML = data[0].item10;
	

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


function deleteMasterScope()
{
	console.log(scopeID);
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'deleteMasterScope',
			'id': scopeID
		
		}, complete: function (data) {
			alert("Master Scope deleted");
			console.log("projItem: ", data.responseJSON);
			window.location.href = "newMasterScope.html";
		}, error: function (data) {
			alert("error!");
			console.log("data", data);
		}
	
	});
}