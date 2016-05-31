


//Globals

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
var search_arr = [];
var status_arr = [];

//Project Information
var warehouse_ids = [];
var component_ids = [];
var equipment_vendorids = [];


var new_equip = [];

//This function retrieves json string and creates arrays to store the seperate parsed data for later comparison with equipment data
//Input: string representation of JSON array
//Output: none (fills arrays with data)
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


//This function retrieves json string and creates arrays to store the seperate parsed equipment data
//Input: string representation of JSON array
//Output: none (fills arrays with data)
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
    	
    	if(json[k].equipStatus!=null)
    		{
    		status_arr[k] = json[k].equipStatus.id ;
    		
    		}
    	else
    		{
    		status_arr[k] = "";
  		}
    	
    	
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

//This function populates a table with current equipment data pertinent to the project
//Input: none
//Output: none (populates a table with data)
function createEquipmentWindow()
{
	var q = 0
	var i =  TABLE_ROW-1 ;
	PROJECT_ID = getParameterByName("id");
    var table = document.getElementById("myTable");
    var arr = [];
    
	for(var k = 0; k<vendor_eqArray.length+1;k++)
		{
		
		if(eqpid_array[k]== PROJECT_ID &&  TABLE_ROW ==1)
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
		    
		  
		    cell0.innerHTML = k;
		    cell.innerHTML =  equip_ids[k] ;
		    cell1.innerHTML = project_eqArray[k][0] + "," + project_eqArray[k][1] +" -- #" + project_eqArray[k][3] ;
		    cell2.innerHTML = po_eqArray[k];
		    cell3.innerHTML = equipNameArray[k];
		    cell4.innerHTML = vendor_eqArray[k][0]  ;
		    cell5.innerHTML = component_eqArray[k][0];
		    cell6.innerHTML = estimatedDeliveryDate_eqArray[k]; 
		    search_arr[q] = k;
		    i++
		    q++
		    
			}
		
		}  
	searchBar(search_arr);
	 TABLE_ROW = i;
}

//This function retrieves the creation or edit of new data and repopulates the table by first deleting previous table and creating new one over it.
//Input: none
//Output: none (repopulates equipment table)
function editEquipmentWindow()
{
	var q = 0;
	var a =0;
	var arr = [];
	if(getParameterByName("id")!=null)
		PROJECT_ID = getParameterByName("id");
	
	var table = document.getElementById("myTable");
	
	if(TABLE_ROW>=1)
		{
		
		for(var i=0; i<TABLE_ROW; i++ )
			{
			table.deleteRow(1);
			}
		}
	
	
	for(var k = 0; k<vendor_eqArray.length+1;k++)
	{
	
	if(eqpid_array[k]== PROJECT_ID)
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
	    if(search_arr[q]!=k)
	    	{
	    	arr[a] = k;
	    	search_arr[q]= k;
	    	a++;
	    	}
	    q++	
	    
		}
	}
	if(arr[0]!="")
		searchBar(arr);
	TABLE_ROW = q;
}

//This function retrieves data from the current selected equipment
//Input: none
//Output: none (fills form with selected equipment data)
function editSelected()
{
		var searchEqp = $("#searchEqp").val();
		$("#defect").val(equip_ids[searchEqp]);
		console.log($("#equipStatus").val(status_arr[searchEqp]));
		$("#equipStatus").val(status_arr[searchEqp]);
		$("#vendor").val(vendor_eqArray[searchEqp][1]);
		$("#projecteq").val(project_eqArray[searchEqp][2]);
		$("#component").val(component_eqArray[searchEqp][1]);
		$("#po").val(po_eqArray[searchEqp]);
		$("#estimatedDeliveryDate").val(estimatedDeliveryDate_eqArray[searchEqp])
		$("#vendorDate").val(vendorDate_eqArray[searchEqp]);
		$("#noteseq").val(notes_eqArray[searchEqp]);
		$("#equipName").val(equipNameArray[searchEqp]);
}

//This function clears all data in the equipment Form
//Input: none
//Output: none (clears data in the form)
function clearEquipment()
{
	$("#defect").val("");
	$("#equipStatus").val(0)
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

//This function retrieves all data from the Equipment Form and places them into the equipment data Arrays
//Input: none
//Output: none (fills arrays with data)
function applyEquipment(b)
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
	
	var status_eq = $("#equipStatus").val();
	console.log(status_eq);
	
	
	//edits
	if( $("#searchEqp").val()!="")
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
			status_arr[k] = status_eq;
			project_eqArray[k][2] = project_eq;
			component_eqArray[k][1] = component_eq;
			
	
			po_eqArray[k] = po_eq;
			vendorDate_eqArray[k] = vendorDate_eq;
			estimatedDeliveryDate_eqArray[k] = estimatedDeliveryDate_eq;
			notes_eqArray[k] = notes_eq;
			equipNameArray[k] = equipName;
			equip_ids[k] = equip_ids[k-1]+1;
			
			
			// checks the given data with existing in order to label correctly
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
						if( component_eqArray[k][1] == component_ids[i][1])
							component_eqArray[k][0] = component_ids[i][0];
					}
				
				if(i<equipment_vendorids.length)
					{
						if( vendor_eqArray[k][1] == equipment_vendorids[i][1])
							vendor_eqArray[k][0] = equipment_vendorids[i][0];
					}
				
				}
			
			//only execute if all required fields are filled out
			if(vendor_eq != "" && project_eq!="" && component_eq!="" && status_eq!="")
				editEquipmentWindow();
}

function searchBar(arr)
{
	var sel =document.getElementById('searchEqp');
	for(var i =0; i<arr.length;i++)
		{
	    var opt = document.createElement('option');
	    opt.innerHTML = arr[i];
	    opt.value = arr[i];
	    sel.appendChild(opt);
		}

}
