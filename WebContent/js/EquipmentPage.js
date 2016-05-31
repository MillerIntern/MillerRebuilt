//globals

var PROJECT_ID = 0;
var PROJECT_DATA = null;

var EQUIP_ID = 0;
var TABLE_ROW = 1;
var eqpid_array = [];

//All Equipment Information
var vendor_eqArray = [];
var project_eqArray = [];
var po_eqArray = [];
var enteredBy_eqArray = [];
var estimatedDeliveryDate_eqArray= [];
var component_eqArray = [];
var severity_eqArray = [];
var vendorDate_eqArray = [];
var notes_eqArray = [];
var equipNameArray = [];
var equip_ids = [];

//Project Information
var warehouse_ids = [];
var component_ids = [];
var equipment_vendorids = [];

var new_equip = [];


//functions starting at runtime
$(document).ready(function()
{
	$("#estimatedDeliveryDate").datepicker();
	$("#vendorDate").datepicker();
	PAGETYPE = getParameterByName("type");
});



//This function retrieves all of the enumerated data (warehouses, statuses, etc) from the database
//Input: none
//Output: none (calls functions to fill in all of the dropdown functions)
function getProjectEnums()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: "json",
		data: 
		{
			'domain': 'project',
			'action': 'getAllEquipmentObjects',
		},
		success: function(data)
		{
			fillDropdowns(data);
			fillInProjectData();
		}
	});
}

//This function fills multiple dropdowns with data
//Input: JSON array of arrays.
//Output: none (fills dropdowns with data)
function fillDropdowns(data)
{
	console.log("here");
	var itemTypes = ["warehouse", "vendor", "projecteq", "component",
	                 "enteredBy"];

	generateDropdowns(data["equipmentvendor"], itemTypes[1]);
	generateDropdowns(data["warehouse"], itemTypes[2]);
	generateDropdowns(data["item"], itemTypes[3]);
	generateDropdowns(data["person"], itemTypes[4]);
	console.log("here");
	generateEquipment(data["equipment"]);
	generateArray(data["warehouse"],itemTypes[0] );
	generateArray(data["item"],"item" );
	generateArray(data["equipmentvendor"], "equipmentVendor");


}


//This function puts data into a specific dropdown menu
//Input: string representation of JSON array
//Output: none (fills specific dropdown menu with data)
function generateDropdowns(str, className)
{
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	var sent=true;

	if (className == "warehouse" || className=="projecteq")
		{
		json = sortByName(json, className);
	
		}
	for (var i = 0; i < json.length; i++)
	{
		sent=true;
		var option = document.createElement("option");
		if (className=="stage")
		{
			if(hasStage(stages, json[i].name))
			{
				option.innerHTML=json[i].name;
			}
			else
				sent=false;
		}
		else if(className=="warehouse" || className=="projecteq")
		{
			option.innerHTML = json[i].city.name+", "+json[i].state+" -- #"+json[i].warehouseID;
		}
		else
		{
			option.innerHTML=json[i].name;
			
		}

		if(sent)
		{
			option.setAttribute("value", json[i].id);		
			d.appendChild(option);
		}

	}
	
	$("#"+className).append(d);
}


//This function retrieves project information from a project, and prepares it to be edited.
//Input: none
//Output: none
function fillInProjectData()
{
	console.log(getParameterByName("id"));
	if (PAGETYPE == 'edit')
	{
		PROJECT_ID = getParameterByName("id");
		$.ajax({
			type: 'POST',
			url: 'Project', 
			data: 
			{
				'domain': 'project',
				'action': 'get',
				'id': PROJECT_ID
				
			},
			success: function(data)
			{
				PROJECT_DATA = (data);
				console.log(PROJECT_DATA);
				fillForm(data);
			}
		});
	}
}


function sortByName(object, className)
{
	object.sort(
	function(a, b)
	{
		if(className=="warehouse" || className=="projecteq")
			return a.city.name > b.city.name;
		else
			return a.name > b.name;
			}
	);
	return object;
}

function sortByID(object)
{
	object.sort(
			function(a,b)
			{
				return a.id>b.id;
			}
			);
			return object;


}

function generateArray(str, className)
{
	
	var json = JSON.parse(str);
		//json = sortByName(json,className);
		json = sortByID(json);
	
	for (var i = 0; i < json.length; i++)
	{
	
		if (className=="equipmentVendor")
		{
			equipment_vendorids[i] = [];
			
			equipment_vendorids[i][0] = json[i].name;
			equipment_vendorids[i][1] = json[i].id;
			
			
		}
		else if(className=="warehouse")
		{
			warehouse_ids[i] = new Array(4);
			warehouse_ids[i][0] = json[i].city.name;
			warehouse_ids[i][1] = json[i].state;
			warehouse_ids[i][2] = json[i].id;
			warehouse_ids[i][3] = json[i].city.id;
			warehouse_ids[i][4] = json[i].warehouseID;
		
		}
		else if(className == "item")
		{
			component_ids[i] = new Array(1);
			component_ids[i][0] = json[i].name;
			component_ids[i][1] = json[i].id;
			

		}
			
	}

}



function generateEquipment(str)
{
	var json = JSON.parse(str);
	//project_eqArray(json.length);

	for (var k = 0; k < json.length; k++)
	{
		vendor_eqArray[k] = new Array(1);
		project_eqArray[k] = new Array(5);
		component_eqArray[k] = new Array(1);
		
  	if(json[k].equipmentVendor!=null)
  		{
  		vendor_eqArray[k][0] = json[k].equipmentVendor.name ;//[r][c]
  		vendor_eqArray[k][1] = json[k].equipmentVendor.id ;

  		}
  	else
  		vendor_eqArray[k] = "";
  		
  	if(json[k].warehouse!=null)
			{
  		project_eqArray[k][0] = json[k].warehouse.city.name;
  		project_eqArray[k][1] = json[k].warehouse.state;
  		project_eqArray[k][2] = json[k].warehouse.id;
  		project_eqArray[k][3] = json[k].warehouse.warehouseID;
  		project_eqArray[k][4] = json[k].warehouse.city.id;

			}
  	else
  		project_eqArray[k][0] = "";
  	
  	if(json[k].component!=null)
  		{
  		component_eqArray[k][0] = json[k].component.name;
  		component_eqArray[k][1] = json[k].component.id ;
  		}
  	else
  		component_eqArray[k][0] = "";
  	
  	if(json[k].PO!=null)
  		po_eqArray[k] = json[k].PO;
  	else
  		po_eqArray[k] = "";
  	
  	if(json[k].vendorDate!=null)
  		vendorDate_eqArray[k] = json[k].vendorDate;
  	else
  		vendorDate_eqArray[k] = "";
  	
  	if(json[k].notes!=null)
  		notes_eqArray[k] = json[k].notes;
  	else 
  		notes_eqArray[k] = "";
  	
  	if(json[k].estimatedDeliveryDate!=null)
  		estimatedDeliveryDate_eqArray[k] = json[k].estimatedDeliveryDate;
  	else
  		estimatedDeliveryDate_eqArray[k] = "";
  		
  	
  	if(json[k].equipName!=null)
  		equipNameArray[k] = json[k].equipName;
  	else
  		equipNameArray[k] = "";

  	
  		equip_ids[k] = json[k].id;
  		eqpid_array[k] = json[k].eqpd;
  	
  		
	}
		//only if a prexisting ID for the project exists
		//if(getParameterByName("id")!=0 && getParameterByName("id")!=null)
		//if(PROJECT_ID!=0)
			createEquipmentWindow();

	}


function createEquipmentWindow()
{
	
	var i =  TABLE_ROW-1 ;
	PROJECT_ID = getParameterByName("id");
  var table = document.getElementById("myTable");

  
	for(var k = 0; k<vendor_eqArray.length;k++)
		{
		
		if( TABLE_ROW ==1)
			{
		    var row = table.insertRow(1);
		    var cell0 = row.insertCell(0);
			var cell = row.insertCell(1);
		    var cell1 = row.insertCell(2);
		    var cell2 = row.insertCell(3);
		    var cell3 = row.insertCell(4);
		    var cell4 = row.insertCell(5);
		    var cell5 = row.insertCell(6);
		    var cell6 = row.insertCell(7);
		    
		    console.log(equip_ids[k]);
		    cell0.innerHTML = k;
		    cell.innerHTML =  equip_ids[k] ;
		    cell1.innerHTML = project_eqArray[k][0] + "," + project_eqArray[k][1] +" -- #" + project_eqArray[k][3] ;
		    cell2.innerHTML = po_eqArray[k];
		    cell3.innerHTML = equipNameArray[k];
		    cell4.innerHTML = vendor_eqArray[k][0]  ;
		    cell5.innerHTML = component_eqArray[k][0];
		    cell6.innerHTML = estimatedDeliveryDate_eqArray[k];    
		    i++
			}
		}  
	 TABLE_ROW = i;
}

function editEquipmentWindow()
{
	var q = 0;
	
	if(getParameterByName("id")!=null)
		PROJECT_ID = getParameterByName("id");
	
	
	if(TABLE_ROW>1)
		{
		var table = document.getElementById("myTable");
		
		for(var i=0; i<TABLE_ROW; i++ )
			{
			table.deleteRow(1);
			}
		
		}
	
	var table = document.getElementById("myTable");
	for(var k = 0; k<vendor_eqArray.length+1;k++)
	{
	    var row = table.insertRow(1);
	    
	    var cell0 = row.insertCell(0);
		var cell = row.insertCell(1);
	    var cell1 = row.insertCell(2);
	    var cell2 = row.insertCell(3);
	    var cell3 = row.insertCell(4);
	    var cell4 = row.insertCell(5);
	    var cell5 = row.insertCell(6);
	    var cell6 = row.insertCell(7);
	    
	    //document.body.appendChild(radio);
	    cell0.innerHTML = k;
	    cell.innerHTML =  equip_ids[k] ;
	    cell1.innerHTML = project_eqArray[k][0] + "," + project_eqArray[k][1] +" -- #" + project_eqArray[k][3] ;
	    cell2.innerHTML = po_eqArray[k];
	    cell3.innerHTML = equipNameArray[k];
	    cell4.innerHTML = vendor_eqArray[k][0]  ;
	    cell5.innerHTML = component_eqArray[k][0];
	    cell6.innerHTML = estimatedDeliveryDate_eqArray[k];    
	    
	    q++
		
	}

	
	TABLE_ROW = q;
}

function editSelected()
{
		var searchEqp = $("#searchEqp").val();
		
		$("#vendor").val(vendor_eqArray[searchEqp][1]);
		$("#projecteq").val(project_eqArray[searchEqp][2]);
		$("#component").val(component_eqArray[searchEqp][1]);
		$("#po").val(po_eqArray[searchEqp]);
		//$("#enteredBy").val(json.equipment.enteredBy);
		$("#estimatedDeliveryDate").val(estimatedDeliveryDate_eqArray[searchEqp])
		//$("#severity").val(json.equipment.severity);
		$("#vendorDate").val(vendorDate_eqArray[searchEqp]);
		$("#noteseq").val(notes_eqArray[searchEqp]);
		$("#equipName").val(equipNameArray[searchEqp]);
}


function clearEquipment()
{
	$("#vendor").val(0);
	$("#projecteq").val(0);
	$("#component").val(0);
	$("#po").val("");
	$("#estimatedDeliveryDate").val("")
	$("#vendorDate").val("");
	$("#noteseq").val("");
	$("#equipName").val("");	
	$("#searchEqp").val("");
}


function applyEquipment()
{
	var k ;
	var vendor_eq=$("#vendor").val();
	var project_eq=$("#projecteq").val();
	var po_eq=$("#po").val();
	var enteredBy_eq=$("#enteredBy").val();
	var estimatedDeliveryDate_eq=$("#estimatedDeliveryDate").val();
	var component_eq=$("#component").val();
	var vendorDate_eq=$("#vendorDate").val();
	var notes_eq=$("#noteseq").val();
	var equipName = $("#equipName").val();	
	
	
	//edits
	if( $("#searchEqp").val()!="" )
		{	
			k = $("#searchEqp").val();
			eqpid_array[k] = PROJECT_ID;
			console.log(k);
		}
	//New
	else
		{
		k = eqpid_array.length;
		vendor_eqArray[k] = new Array(1);
		project_eqArray[k] = new Array(5);
		component_eqArray[k] = new Array(1);
		eqpid_array[k] = PROJECT_ID;
	
		}
	
	
			vendor_eqArray[k][1] = vendor_eq;
			
			project_eqArray[k][2] = project_eq;
			
			component_eqArray[k][1] = component_eq;
			
		
			
			po_eqArray[k] = po_eq;
			vendorDate_eqArray[k] = vendorDate_eq;
			estimatedDeliveryDate_eqArray[k] = estimatedDeliveryDate_eq;
			notes_eqArray[k] = notes_eq;
			equipNameArray[k] = equipName;
			equip_ids[k] = equip_ids[k-1]+1;
			
			
			
			for(var i = 0; i<500;i++)
				{
				
				if(i<warehouse_ids.length)
					{
						if(project_eqArray[k][2] == warehouse_ids[i][2])
							{
		
							project_eqArray[k][0] = warehouse_ids[i][0];
							project_eqArray[k][1] = warehouse_ids[i][1];
							project_eqArray[k][3] = warehouse_ids[i][3];
							project_eqArray[k][4] = warehouse_ids[i][4];
							}
					}
				
				if(i<component_ids.length)
					{
					
					if( component_eqArray[k][1] == component_ids[i][1]   )
						{
						component_eqArray[k][0] = component_ids[i][0];
						}
					}
				
				if(i<equipment_vendorids.length)
					{
					if( vendor_eqArray[k][1] == equipment_vendorids[i][1])
					{
						vendor_eqArray[k][0] = equipment_vendorids[i][0];
						console.log("in vendor");
					}
					}
				
				}
		

			
			if(vendor_eq != "" && project_eq!="" && component_eq!="")
				editEquipmentWindow();
			 

}



