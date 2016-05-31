
//globals
var numChangeOrders = 0;
var PAGETYPE = "add";
var changeOrders = [];
var PROJECT_ID = 0;
var PROJECT_DATA = null;
var stages=["Active", "Proposal", "Budgetary", "Closed", "Inactive"];
var INSPECTION_ID = 0;
var CLOSEOUT_ID = 0;
var SALVAGE_ID = 0;
var PERMITS_ID = 0;
var EQUIP_ID = 0;

var TABLE_ROW = 1;

var eqpid_array = [];



//functions starting at runtime
$(document).ready(function()
{
	$("#initiatedDate").datepicker();
	$("#surveyDate").datepicker();
	$("#costcoDate").datepicker();
	$("#proposalDate").datepicker();
	$("#asBuilts").datepicker();
	$("#punchList").datepicker();
	$("#verisae").datepicker();
	$("#closeoutBook").datepicker();
	$("#closeoutNotes").datepicker();
	$("#alarmHvac").datepicker();
	$("#startDate").datepicker();
	$("#scheduledTurnover").datepicker();
	$("#actualTurnover").datepicker();
	$("#airGas").datepicker();
	$("#salvageDate").datepicker();
	$("#permits").datepicker();
	$("#permitApp").datepicker();
	$("#framingDate").datepicker();
	$("#ceilingDate").datepicker();
	$("#roughmechDate").datepicker();
	$("#roughelecDate").datepicker();
	$("#roughplumbDate").datepicker();
	$("#mechlightsmokeDate").datepicker();
	$("#mechfinalDate").datepicker();
	$("#elecfinalDate").datepicker();
	$("#plumbfinalDate").datepicker();
	$("#firemarshalDate").datepicker();
	$("#healthDate").datepicker();
	$("#buildfinalDate").datepicker();


	$("#building_p").datepicker();
	$("#mechanical_p").datepicker();
	$("#electrical_p").datepicker();
	$("#plumbing_p").datepicker();
	$("#firesprinkler_p").datepicker();
	$("#firealarm_p").datepicker();
	$("#lowvoltage_p").datepicker();
	
	
	$("#estimatedDeliveryDate").datepicker();
	$("#vendorDate").datepicker();
	
	//closeout

	$("#subcontractorCL").datepicker();
	$("#buildingPermitCL").datepicker();
	$("#inspectionSOCL").datepicker();
	$("#certCompletionCL").datepicker();
	$("#mPunchListCL").datepicker();
	$("#closeoutPhotosCL").datepicker();
	$("#subConWarrantiesCL").datepicker();
	$("#MCSWarranty").datepicker();
	$("#equipmentSubCL").datepicker();
	$("#traneCL").datepicker();

	PAGETYPE = getParameterByName("type");
	
});

//WILL HANDLE WHEN CHANGE ORDERS/CONTRACT ITEMS ARE FULLY IMPLEMENTED

/**
//This function fills in the dropdown menus for the change order popup box
//Input: JSON array (data of change order enums), str (the type of enum)
//Output: none (fills the dropdown boxes)
function fillContractEnumsDropdown(data, type)
{
	var d = document.createDocumentFragment();
	var json = JSON.parse(data);
	for (var i = 0; i < json.length; i++)
	{
		var option = document.createElement("option");
		option.id = json[i].id
		option.innerHTML = json[i].name;
		d.appendChild(option);
	}
	$("#contractItem"+type).append(d);
}

//This function creates a contract item dialog popupbox
//Input: none
//Output: none (A popup box is created)
function createContractItemDialogBox()
{
	$(function() {
		$("#contractItemDialog").dialog({
			modal: true,
			resizable: false,
			width: 500,
            height: 300,
		});
	});
}

//Adds a contract item to the project (both in the model and view)
//Input: none
//Output: none (adds the contract item to the array of change orders, and the actual screen)
function addContractItem()
{
	numChangeOrders++;
	
	var type = $("#contractItemType");
	var date = $("#contractItemDate");
	var amount = $("#contractItemAmount");
	var status = $("#contractItemStatus");
	var typeID = $("#contractItemType option:selected").attr("id");
	var statusID = $("#contractItemStatus option:selected").attr("id");
	
	//Create HTML element representing change order
	var classNames = ["itemType", "itemDate", "itemAmount", "itemStatus"];
	var newElement = createContractItemElement([type.val(), date.val(), amount.val(), status.val()], classNames);
	$("#items").append(newElement);
	
	//Push new contract item in model
	var changeOrder = createChangeOrderItem(typeID, date.val(), amount.val(), statusID);
	changeOrders.push(changeOrder);
	
	//Update the view
	$("#contractItemDialog").dialog('close');
}

//This function creates a JSON object that mirrors the structure of the Java ChangeOrder object.
//Input: int (type id), str (submission date), int (amount), int (status id)
//Output: the JSON object
function createChangeOrderItem(typeID, subDate, amount, statusID)
{
	var changeOrder = new Object();
	changeOrder.type = new Object();
	changeOrder.status = new Object();
	changeOrder.type.id = typeID;
	changeOrder.submissionDate = subDate;
	changeOrder.amount = amount;
	changeOrder.status.id = statusID;
	
	return changeOrder;
}

//This function creates an HTML element representing a change order
//Input: array(values of the change order), array (the names of the values), int (id of the change order)
//Output: none (an HTML element is added to the change order box)
function createContractItemElement(values, classNames, id)
{
	var element = document.createElement("span");
	element.setAttribute("id", "item"+numChangeOrders);
	element.setAttribute("class", "contractItem");
	element.innerHTML=numChangeOrders+". ";
	
	for (var i = 0; i < values.length; i++)
	{
		var span = document.createElement("span");
		span.setAttribute("class", classNames[i]);
		span.innerHTML = values[i]+" ";
	
		element.appendChild(span);
	}
	
	//Add red x button for delete functionality
	/*
	var xImg = document.createElement("img");
	xImg.setAttribute("src","assets/x.png");
	xImg.setAttribute("height", "13");
	xImg.setAttribute("width", "13");
	$(xImg).click(function (){deleteChangeOrder(id);});
	xImg.style.cursor="pointer";
	element.appendChild(xImg);
	*/
/**	
	var newline = document.createElement("span");
	newline.innerHTML = "<br/>";
	element.appendChild(newline);
	
	return element;
}

function deleteChangeOrder(id)
{
	changeOrders.splice(id, 1);
	createContractItemElements();
}
*/





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
			'action': 'getAllObjects',
		},
		success: function(data)
		{
			fillDropdowns(data);
			//fillContractEnumsDropdown(data["changeOrderStatus"], "Status");
			//fillContractEnumsDropdown(data["changeOrderType"], "Type");
			fillInProjectData();
		}
	});
}


//This function fills multiple dropdowns with data aswell as fills the equipment data
//Input: JSON array of arrays.
//Output: none (fills dropdowns with data)
function fillDropdowns(data)
{
	var itemTypes = ["warehouse", "class", "project", "manager", "supervisor", "status", "stage", "pType", "vendor", "projecteq", "component",
	                 "enteredBy", "equipStatus"];

	generateDropdowns(data["warehouse"], itemTypes[0]);
	generateDropdowns(data["class"], itemTypes[1]);
	generateDropdowns(data["item"], itemTypes[2]);
	generateDropdowns(data["person"], itemTypes[3]);
	generateDropdowns(data["person"], itemTypes[4]);
	generateDropdowns(data["status"], itemTypes[5]);
	generateDropdowns(data["stage"], itemTypes[6]);
	generateDropdowns(data["type"], itemTypes[7]);
	generateDropdowns(data["equipmentvendor"], itemTypes[8]);
	generateDropdowns(data["warehouse"], itemTypes[9]);
	generateDropdowns(data["item"], itemTypes[10]);
	generateDropdowns(data["person"], itemTypes[11]);
	generateDropdowns(data["equipmentstatus"], itemTypes[12]);
	
	//retrieves and manipulates all of the equipment data
	generateEquipment(data["equipment"]);
	
	//creates seperate arrays for main data
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






//This function adds a project to the database
//Input: none
//Output: none
function addProject()
{
    console.log("hello!");
	var warehouse = $("#warehouse").val();
	var projectClass = $("#class").val();
	var project = $("#project").val();
	var manager = $("#manager").val();
	var supervisor = $("#supervisor").val();
	var status = $("#status").val();
	var pType = $("#pType").val();
	var scope = $("#scope").val();
	var initiated = $("#initiatedDate").val();
	var survey = $("#surveyDate").val();
	var costco = $("#costcoDate").val();
	var proposalDate = $("#proposalDate").val();
	var shouldInvoice = $("#shouldInvoice").val();;
	var actualInvoice = $("#actualInvoice").val();;
	var notes = $("#notes").val();;
	var startDate = $("#startDate").val();;
	var scheduledTurnover = $("#scheduledTurnover").val();;
	var actualTurnover = $("#actualTurnover").val();;


	var stage = $("#stage").val();
	var mcsNumber = $("#mcsNumber").val();
	var zachNotes = $("#zUpdates").val();
	var cost = $("#projectCost").val();
	var customerNumber = $("#custNum").val();
	var permitApp = $("#permitApp").val();
	
	//inspections variables
	var framing=$("#framingDate").val();
	var ceiling=$("#ceilingDate").val();
	var roughMech=$("#roughmechDate").val();
	var roughElec=$("#roughelecDate").val();
	var roughPlumb=$("#roughplumbDate").val();
	var mechLightSmoke=$("#mechlightsmokeDate").val();
	var mechFinal=$("#mechfinalDate").val();
	var elecFinal=$("#elecfinalDate").val();
	var plumbFinal=$("#plumbfinalDate").val();
	var fireMarshal=$("#firemarshalDate").val();
	var health=$("#healthDate").val();
	var buildFinal=$("#buildfinalDate").val();
	var inspectionID=$("#inspections").val();
	
	//Permit variables
	var building_p=$("#building_p").val();
	var mechanical_p=$("#mechanical_p").val();
	var electrical_p=$("#electrical_p").val();
	var plumbing_p=$("#plumbing_p").val();
	var fireSprinkler_p=$("#firesprinkler_p").val();
	var fireAlarm_p=$("#firealarm_p").val();
	var lowVoltage_p=$("#lowvoltage_p").val();
	
	//closeout
	
	var punchList = $("#punchList").val();
	var alarmHvac = $("#alarmHvac").val();
	var verisae = $("#verisae").val();
	var closeoutBook = $("#closeoutBook").val();
	var closeoutNotes = $("#closeoutNotes").val();
	var asBuilts = $("#asBuilts").val();
	var permits = $("#permits").val();
	var salvageDate = $("#salvageDate").val();
	var salvageAmount = $("#salvageAmount").val();
	var airGas = $("#airGas").val();;
	
	//var frontPage = $("#frontPage").val();

	var buildingPermitCL = $("#buildingPermitCL").val();
	console.log(buildingPermitCL);
	var inspectionSOCL = $("#inspectionSOCL").val();
	var certCompletionCL = $("#certCompletionCL").val();
	var mPunchListCL = $("#mPunchListCL").val();
	var closeoutPhotosCL = $("#closeoutPhotosCL").val();
	var subConWarrantiesCL = $("#subConWarrantiesCL").val();
	var MCSWarranty = $("#MCSWarranty").val();
	var equipmentSubCL = $("#equipmentSubCL").val();
	var traneCL = $("#traneCL").val();

	var k = 0;
	for(var i= 0;i<vendor_eqArray.length;i++)
		{
			if(eqpid_array[i]== PROJECT_ID)
				{
				new_equip[k] = i; 
				k++;
				console.log(k);
				}
		}
	
	
	
	var requiredFields = [warehouse, projectClass, project, manager, supervisor, status, stage, mcsNumber, pType];

	
	//dates added to the array of dates
	var dates = [initiated, survey, costco, proposalDate, asBuilts, punchList, alarmHvac,
	            verisae, closeoutNotes, startDate, scheduledTurnover, actualTurnover, airGas, 
	            permitApp,permits, salvageDate, //15
	            
				//Inspections
				framing, ceiling, 
				roughMech, roughElec, roughPlumb, mechLightSmoke, mechFinal, elecFinal,
				plumbFinal, fireMarshal, health, buildFinal, //27
				
				//Permit
				building_p, mechanical_p, electrical_p, plumbing_p,fireSprinkler_p,
				fireAlarm_p, lowVoltage_p,//34
				
				// closeoutList
				buildingPermitCL,inspectionSOCL,
				certCompletionCL,mPunchListCL, closeoutPhotosCL,
				subConWarrantiesCL, MCSWarranty,//41
				equipmentSubCL,
				traneCL,
				];
				
	var numbers = [salvageAmount, shouldInvoice, actualInvoice, cost, customerNumber];
	var noteFields = [notes, scope, zachNotes];

	
	//Only upload the data if the fields are valid 
	if (isValidInput(requiredFields, dates, numbers, noteFields, salvageDate, salvageAmount ))
	{
		var action = "add";
		var projectID;
		var changeOrderIDs;
		var closeoutID;
		var iID;
		if (PAGETYPE == "edit")
		{
			action = "edit";
			projectID = PROJECT_DATA.id;
		}
		$.ajax({
			type: 'POST',
			url: 'Project', 
			dataType: 'json',
			data: 
			{
				'domain': 'project',
				'action': action,
				'mcsNumber': mcsNumber,
				'warehouse': warehouse,
				'class':projectClass,
				'projectItem': project,
				'manager':manager,
				'supervisor':supervisor,
				'status': status,
				'stage':stage,
				'pType':pType,
				'scope': scope,
				'initiated': initiated,
				'survey':survey,
				'costco':costco,
				'proposal':proposalDate,
				'asBuilts':asBuilts,
				'punchList':punchList,
				'alarmHvac':alarmHvac,
				'verisae':verisae,
				'shouldInvoice':shouldInvoice,
				'actualInvoice':actualInvoice,
				'startDate':startDate,
				'scheduledTurnover':scheduledTurnover,
				'actualTurnover':actualTurnover,
				'airGas':airGas,
				'permits':permits,
				'notes':notes,
				'salvageDate':salvageDate,
				'salvageAmount':salvageAmount,
				'coItems': JSON.stringify(changeOrders),
				'projectID':projectID,
				'inspectionID' : INSPECTION_ID,
				'zachUpdates': zachNotes,
				'cost':cost,
				'customerNumber':customerNumber,
				'permitApp': permitApp,
				'closeoutBook' : closeoutBook,
				'closeoutNotes' : closeoutNotes,
				'closeoutID' : CLOSEOUT_ID,
				'salvageID' : SALVAGE_ID,
				'equipID' : EQUIP_ID,
				
				//inspections Data
				'inspections': inspectionID,
				'framing' : framing, 
				'ceiling' : ceiling, 
				'roughMech' : roughMech, 
				'roughElec' : roughElec, 
				'roughPlumb' : roughPlumb, 
				'mechLightSmoke' : mechLightSmoke,
				'mechFinal' : mechFinal, 
				'elecFinal' : elecFinal,
				'plumbFinal' : plumbFinal,
				'fireMarshal' : fireMarshal, 
				'health' : health, 
				'buildFinal' : buildFinal,
				
				//Permit Data
				'permitsID':PERMITS_ID,
				'building_p':building_p, 
				'mechanical_p' :mechanical_p, 
				'electrical_p':electrical_p, 
				'plumbing_p':plumbing_p,
				'fireSprinkler_p':fireSprinkler_p,
				'fireAlarm_p':fireAlarm_p, 
				'lowVoltage_p':lowVoltage_p,
				
				//Equipment Data
				'vendor_eq': JSON.stringify(vendor_eqArray),
				'project_eq' : JSON.stringify(project_eqArray),
				'po_eq' : JSON.stringify(po_eqArray),
				'estimatedDeliveryDate_eq' : JSON.stringify(estimatedDeliveryDate_eqArray),
				'component_eq' : JSON.stringify(component_eqArray),
				'vendorDate_eq' : JSON.stringify(vendorDate_eqArray),
				'notes_eq' : JSON.stringify(notes_eqArray),
				'equipName' : JSON.stringify(equipNameArray),
				'equipIDS' : JSON.stringify(equip_ids),
				'newEquip' : JSON.stringify(new_equip),
				'status_eq' : JSON.stringify(status_arr),
				
				//Rest of closeout information

				//'frontPage' : frontPage,
				'buildingPermitCL':buildingPermitCL,
				'inspectionSOCL': inspectionSOCL,
				'certCompletionCL':certCompletionCL,
				'mPunchListCL':mPunchListCL,
				'closeoutPhotosCL': closeoutPhotosCL,
				'subConWarrantiesCL': subConWarrantiesCL,
				'MCSWarranty': MCSWarranty,
				'equipmentSubCL': equipmentSubCL, 
				'traneCL': traneCL,
				
			},
			success:function(data){
				
				createConfirmWindow();
				console.log(data);
			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. Code works perfectly with error statement 
			  Need to figure out how to fix this error to work 100 percent correctly*/
			
			 //error: function(XMLHttpRequest, textStatus, errorThrown) { 
			error: function()
			{
			       //alert("Status: " + textStatus); 
				   //alert("Error: " + errorThrown);
			       createConfirmWindow();
			//error:function(xhr){
				//alert(xhr.responceText);
				//console.log(xhr.responseText);
							
			}
		});
		
	}
}

//This function creates a popwindow once the user has successfully added the project.
//Input: none
//Output: none (creates a popup window)
function createConfirmWindow()
{
	//alert("in create confirm window");
	$("#saveConfirm").dialog({
		resizable: false,
		height: 300,
		width: 450,
		modal: true,
		buttons: {
			"Continue Working": function() {
				$(this).dialog("close");
			},
			"Go to Home Page": function() {
				window.location.href="homepage.html";
			},
			"Edit another project": function() {
				window.location.href="editSelect.html";
			}
		}
	});	
}

//This function validates the nunmerous fields of this page, separated by categories
//Input: array of str, array of str, array of ints, str, str, int
//output: true if all of the fields are valid. False otherwise
function isValidInput(requiredFields, dates, numbers, notes, salvageDate, salvageValue)
{
	//Check required Fields 
	
	for (var i = 0; i < requiredFields.length; i++)
	{
		var field = requiredFields[i];
		if (field == "default")
		{
			alert("You cannot leave any of the values in the 'Required Information' blank!");
			return false;
		}
	}
	
	//Check if both or none of the salvage fields are filled in
	if (salvageDate != "" && salvageValue == ""
		|| salvageValue != "" && salvageDate == "")
	{
		alert("Salvage Amount and Salvage Date cannot be left blank");
	}

	
	//Check if all of the dates are in the correct format
	for (var i = 0; i < dates.length; i++)
	{
		var date = dates[i];
		if (date != "" && !isDate(date))
		{
			console.log(i);
			console.log(dates[i]);
			console.log(dates[i-1]);
			alert("Dates must be in this format: mm/dd/yyyy");
			return false
		}
	}
	return true;
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

//This function fills out the page with project data. This is so the user can edit the project information
//Input: JSON object representing a project
//Output: none (fills out data on the page)
function fillForm(data)
{
	
	var json = (data);
    $("#warehouse").val(json.warehouse.id);
	$("#class").val(json.projectClass.id);
	$("#project").val(json.projectItem.id);
	$("#manager").val(json.projectManagers[0].id);
	$("#supervisor").val(json.supervisors[0].id);
	$("#status").val(json.status.id);
	$("#scope").val(json.scope);
	$("#stage").val(json.stage.id);
	$("#pType").val(json.projectType.id);
	$("#initiatedDate").val(json.projectInitiatedDate);;
	$("#surveyDate").val(json.siteSurvey);
	$("#costcoDate").val(json.costcoDueDate);
	$("#proposalDate").val(json.proposalSubmitted);
	$("#shouldInvoice").val(json.shouldInvoice);
	$("#actualInvoice").val(json.invoiced);
	$("#notes").val(json.projectNotes);
	$("#startDate").val(json.scheduledStartDate);
	$("#scheduledTurnover").val(json.scheduledTurnover);
	$("#actualTurnover").val(json.actualTurnover);
	$("#stage").val(json.stage.id);
	$("#mcsNumber").val(json.McsNumber);
	$("#permitApp").val(json.permitApp);
	$("#zUpdates").val(json.zachUpdates);
	$("#projectCost").val(json.cost);
	$("#custNum").val(json.customerNumber);
	
	CLOSEOUT_ID = json.closeoutDetails.id;
	if(json.closeoutDetails.salvageValue!=null)
		SALVAGE_ID = json.closeoutDetails.salvageValue.id;

	if(json.equipment!=null)
		EQUIP_ID = json.equipment.id;
	
	 
	

//INSPECTINOS
	
	if(json.inspections!=null)
	{
		$("#inspections").val(json.inspections.ticketNumber);
		INSPECTION_ID = json.inspections.id;
	
		$("#framingDate").val(json.inspections.framing);
		$("#ceilingDate").val(json.inspections.ceiling);
        $("#roughmechDate").val(json.inspections.roughin_mechanical);
        $("#roughelecDate").val(json.inspections.roughin_electric);
        $("#roughplumbDate").val(json.inspections.roughin_plumbing);
        $("#mechlightsmokeDate").val(json.inspections.mechanicalLightSmoke);
        $("#mechfinalDate").val(json.inspections.mechanical_final);
        $("#elecfinalDate").val(json.inspections.electrical_final);
        $("#plumbfinalDate").val(json.inspections.plumbing_final);
        $("#firemarshalDate").val(json.inspections.fire_marshal);
        $("#healthDate").val(json.inspections.health);
        $("#buildfinalDate").val(json.inspections.building_final);
        
	}
        
 //PERMIT
	if(json.permits!=null)
		{
		PERMITS_ID = json.permits.id;
        $("#building_p").val(json.permits.building);
        $("#mechanical_p").val(json.permits.mechanical);
    	$("#electrical_p").val(json.permits.electrical);
    	$("#plumbing_p").val(json.permits.plumbing);
    	$("#firesprinkler_p").val(json.permits.fire_sprinkler);
    	$("#firealarm_p").val(json.permits.fire_alarm);
    	$("#lowvoltage_p").val(json.permits.low_voltage);
		}

	
        //CloseOUT DETAILS
	if (json.closeoutDetails != null)
	{
		if (json.closeoutDetails.salvageValue != undefined)
		{
			$("#salvageDate").val(json.closeoutDetails.salvageValue.date);
			$("#salvageAmount").val(json.closeoutDetails.salvageValue.value);
		}

		$("#airGas").val(json.closeoutDetails.airGas);
		$("#permits").val(json.closeoutDetails.permitsClosed);
		$("#asBuilts").val(json.closeoutDetails.asBuilts);
		$("#punchList").val(json.closeoutDetails.punchList);
		$("#alarmHvac").val(json.closeoutDetails.alarmHvacForm);
		$("#verisae").val(json.closeoutDetails.verisaeShutdownReport);
		$("#closeoutBook").val(json.closeoutDetails.closeoutBook);
		$("#closeoutNotes").val(json.closeoutDetails.closeoutNotes);
		
		

		$("#buildingPermitCL").val(json.closeoutDetails.buildingPermitCL);
		$("#inspectionSOCL").val(json.closeoutDetails.inspectionSOCL);
		$("#certCompletionCL").val(json.closeoutDetails.certCompletionCL);
		$("#punchListCL").val(json.closeoutDetails.punchListCL);
		$("#mPunchListCL").val(json.closeoutDetails.mPunchListCL);
		$("#closeoutPhotosCL").val(json.closeoutDetails.closeoutPhotosCL);
		$("#subConWarrantiesCL").val(json.closeoutDetails.subConWarrantiesCL);
		$("#MCSWarranty").val(json.closeoutDetails.mCSWarranty);
		$("#equipmentSubCL").val(json.closeoutDetails.equipmentSubCL);
		$("#traneCL").val(json.closeoutDetails.traneCL);

	}
	//fillInChangeOrders(json);
}

//This function will update the model and the view of the change order elements
//Input: json array of change orders
//Output: none (changes model and view of change orders)
function fillInChangeOrders(json)
{
	var orders = json.changeOrders;
	var d = document.createDocumentFragment();
	for (var i = 0; i < orders.length; i++)
	{
		numChangeOrders++;
		var changeOrder = orders[i];
		changeOrders.push(changeOrder);
		var classNames = ["itemType", "itemDate", "itemAmount", "itemStatus"];
		var values = [changeOrder.type.name, changeOrder.submissionDate, changeOrder.amount, changeOrder.status.name];
		var newElement = createContractItemElement(values, classNames, i);
		$("#items").append(newElement);
	}
	$("body").append(d);
}

//This function updates the view with all of a project's contract items
//Input: none
//Output: none (puts contract items on screen)
function createContractItemElements()
{
	//Clear contract items on screen
	$("#items").html("");
	
	for (var i = 0; i < changeOrders.length; i++)
	{
		var changeOrder = changeOrders[i];
		var classNames = ["itemType", "itemDate", "itemAmount", "itemStatus"];
		var values = [changeOrder.type.name, changeOrder.submissionDate, changeOrder.amount, changeOrder.status.name];
		var newElement = createContractItemElement(values, classNames, i);
		$("#items").append(newElement);
	}
}

//THis function sorts the warehouses by their name
//Input: JSON array of warehouses
//Output: sorted JSON array/
/*function sortByName(warehouses)
{
	warehouses.sort(
	function(a, b)
	{
			return a.city.name > b.city.name;
			}
	);
	return warehouses;
}
*/
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

function hasStage(stageList, stage)
{
	for(var i=0; i<stageList.length; i++)
	{
		if(stageList[i]==stage)
			return true;
		
	}

	return false;
}
