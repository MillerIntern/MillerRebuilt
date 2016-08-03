
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
			'action': 'getAllObjects',
		},
		success: function(data)
		{
			console.log(data);
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
	                 "enteredBy", "equipStatus", "closeoutstatus"];

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
	generateDropdowns(data["closeoutstatus"], itemTypes[13]);
	
	
	//retrieves and manipulates all of the equipment data
	/*generateEquipment(data["equipment"]);
	
	//creates seperate arrays for main data
	generateArray(data["warehouse"],itemTypes[0] );
	generateArray(data["item"],"item" );
	generateArray(data["equipmentvendor"], "equipmentVendor");*/
	
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
		if(className == "closeoutstatus")
		{
			option.innerHTML=json[i].name;
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

	if(className == "closeoutstatus")
	{				
		for(var i = 0; i < closeoutstatus_dropdowns.length; i++)
		{
			var copy = d.cloneNode(true);
			$("#" +closeoutstatus_dropdowns[i]).append(copy);	
		}
	}
	else
		$("#"+className).append(d);
}

//This function adds a project to the database
//Input: none
//Output: none
function addProject()
{
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
	var notes = $("#notes").val();
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
	var fireMarshal=$("#firemarshalDate").val();
	var health=$("#healthDate").val();
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
	
	var buildingPermitCL = $("#buildingPermitCL").val();
	var inspectionSOCL = $("#inspectionSOCL").val();
	var certCompletionCL = $("#certCompletionCL").val();
	var mPunchListCL = $("#mPunchListCL").val();
	var closeoutPhotosCL = $("#closeoutPhotosCL").val();
	var subConWarrantiesCL = $("#subConWarrantiesCL").val();
	var MCSWarranty = $("#MCSWarranty").val();
	var equipmentSubCL = $("#equipmentSubCL").val();
	var traneCL = $("#traneCL").val();
    
    
    // NEW Closeout CONTENT
	
	var mg2CompletionStatus = $("#mg2CompletionStatus").val();
	var mg2CompletionDate = $("#mg2CompletionDate").val();
	
	var numOfChangeOrders = $("#numOfChangeOrders").val();
	var numOfChangeOrdersCompleted = $("#numOfChangeOrdersCompleted").val();
    
        // LIENS
    var MCSStatus = $("#MCSStatus").val(); 
    var MCSDate = $("#MCSDate").val(); 
    
    var GCStatus = $("#GCStatus").val();
    var GCDate = $("#GCDate").val();
    
    var mechanicalStatus = $("#mechanicalStatus").val();
    var mechanicalDate = $("#mechanicalDate").val();
    
    var electricalStatus = $("#electricalStatus").val();
    var electricalDate = $("#electricalDate").val();
    
    var plumbingStatus = $("#plumbingStatus").val();
    var plumbingDate = $("#plumbingDate").val();
    
    var sprinkleStatus = $("#sprinkleStatus").val();
    var sprinkleDate = $("#sprinkleDate").val();
    
    var roofingStatus = $("#roofingStatus").val();
    var roofingDate = $("#roofingDate").val();
    
    var HTIStatus = $("#HTIStatus").val();
    var HTIDate = $("#HTIDate").val();
    
    var otherFinalLeinsStatus = $("#otherFinalLiensStatus").val();
    var otherFinalLeinsDate = $("#otherFinalLiensDate").val();
    
    var finalLiensNotes = $("#finalLiensNotes").val();
        
    	// INSPECTIONS
    
    var tmpCertificateStatus = $("#tmpCertificateStatus").val();
    var tmpCertificateDate = $("#tmpCertificateDate").val();
    
    var mechFinalStatus = $("#mechFinalStatus").val();
    var mechFinalDate = $("#mechFinalDate").val();
    
    var elecFinalDate = $("#elecFinalDate").val();
    var elecFinalStatus = $("#elecFinalStatus").val();
    
    var plumbingFinalDate = $("#plumbingFinalDate").val();
    var plumbingFinalStatus = $("#plumbingFinalStatus").val();
    
    var sprinkleFinalStatus = $("#sprinkleFinalStatus").val();
    var sprinkleFinalDate = $("#sprinkleFinalDate").val();
    
    var certificateStatus = $("#certificateStatus").val();
    var certificateDate = $("#certificateDate").val();
    
    // buildingPermitCL = buildingFinalDate;
    var buildingFinalStatus = $("#buildFinalStatus").val();
    
    var finalInspectionNotes = $("#finalInspectionNotes").val();
       
    	// WARRANTIES
    
    var MCSWarrantyStatus = $("#MCSWarrantyStatus").val();
    // MCSWarranty = MCSWarrantyDate
    
    var GCWarrantyStatus = $("#GCWarrantyStatus").val();
    var GCWarrantyDate = $("#GCWarrantyDate").val();
    
    var mechanicalWarrantyStatus = $("#mechanicalWarrantyStatus").val();
    var mechanicalWarrantyDate = $("#mechanicalWarrantyDate").val();
    
    var electricalWarrantyStatus = $("#electricalWarrantyStatus").val();
    var electricalWarrantyDate = $("#electricalWarrantyDate").val();
    
    var plumbingWarrantyStatus = $("#plumbingWarrantyStatus").val();
    var plumbingWarrantyDate = $("#plumbingWarrantyDate").val();
    
    var sprinkleWarrantyStatus = $("#sprinkleWarrantyStatus").val();
    var sprinkleWarrantyDate = $("#sprinkleWarrantyDate").val();
    
    var roofingWarrantyStatus = $("#roofingWarrantyStatus").val();
    var roofingWarrantyDate = $("#roofingWarrantyDate").val();
    
    var HTIWarrantyStatus = $("#HTIWarrantyStatus").val();
    var HTIWarrantyDate = $("#HTIWarrantyDate").val();
    
    var otherWarrantyStatusA = $("#otherWarrantyStatusA").val();
    var otherWarrantyDateA = $("#otherWarrantyDateA").val();
    
    var otherWarrantyStatusB = $("#otherWarrantyStatusB").val();
    var otherWarrantyDateB = $("#otherWarrantyDateB").val();
    
    var warrantyNotes = $("#warrantyNotes").val();
    
        // CLOSEOUT DOCUMENTS
    var equipmentSubmittalStatus = $("#equipmentSubmittalStatus").val();
    // equipmentSubCL = equipmentSubmittalDate
    
    var manualStatus = $("#manualStatus").val();
    var manualDate = $("#manualDate").val();
    
    var punchListStatus = $("#punchListStatus").val();
    //punchList = punchListDate
    
    var asBuiltDrawingsStatus = $("#asBuiltDrawingsStatus").val();
    // asBuilts = asBuiltDrawingsDate
    
    var closeOutPhotosStatus = $("#closeOutPhotosStatus").val();
    //closeoutPhotosCL = closeOutPhotosDate
    
    var HVACstartupFormStatus = $("#HVACstartupFormStatus").val();
    var HVACstartupFormDate = $("#HVACstartupFormDate").val();
    
    var alarmFormStatus = $("#alarmFormStatus").val();
    // alarmHVAC = alarmFormDate
    
    var verisaeReportStatus = $("#verisaeReportStatus").val();
    // verisae = verisaeReportDate

    var closeoutDocumentsNotes = $("#closeoutDocumentsNotes").val();
   
    /* Fill in dumb data if */
    if(PROJECT_DATA == null)
    {
    	PROJECT_DATA = 
    	{
			"permits" :
			{
				'building': null, 
				'buildingPermitStatus': 0,
				'buildingInspectionStatus': 0,
				'buildingInspectionLastUpdated': null,
				'buildingNotes': "",
				
				'mechanical' : null,
				'mechanicalPermitStatus': 0,
				'mechanicalInspectionStatus': 0,
				'mechanicalInspectionLastUpdated': null,
				'mechanicalNotes': "",
				
				'electrical': null,
				'electricalPermitStatus': 0,
				'electricalInspectionStatus': 0,
				'electricalInspectionLastUpdated': null,
				'electricalNotes': "",
				
				'plumbing': null,
				'plumbingPermitStatus': 0,
				'plumbingInspectionStatus': 0,
				'plumbingInspectionLastUpdated': null,
				'plumbingNotes': "",
				
				'fire_sprinkler': null,
				'sprinklerPermitStatus': 0,
				'sprinklerInspectionStatus': 0,
				'sprinklerInspectionLastUpdated': null,
				'sprinklerNotes': "",
				
				'fire_alarm': null, 
				'fireAlarmPermitStatus': 0,
				'fireAlarmInspectionStatus': 0,
				'fireAlarmInspectionLastUpdated': null,
				'fireAlarmNotes': "",
				
				'low_voltage': null,
				'voltagePermitStatus': 0,
				'voltageInspectionStatus': 0,
				'voltageInspectionLastUpdated': null,
				'voltageNotes': "",
				
				'roofing': null,
				'roofingPermitStatus': 0,
				'roofingInspectionStatus': 0,
				'roofingInspectionLastUpdated': null,
				'roofingNotes': "",
				
				'otherAPermit': null,
				'otherAPermitStatus': 0,
				'otherAInspectionStatus': 0,
				'otherAInspectionLastUpdated': null,
				'otherANotes': "",
				
				'otherBPermit': null,
				'otherBPermitStatus': 0,
				'otherBInspectionStatus': 0,
				'otherBInspectionLastUpdated': null,
				'otherBNotes': "",
			},
    	}
    }
    else
    {
    	if(PROJECT_DATA.permits.building == undefined)
    		PROJECT_DATA.permits.building = null;
    	if(PROJECT_DATA.permits.buildingInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.buildingInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.mechanical == undefined)
    		PROJECT_DATA.permits.mechanical = null;
    	if(PROJECT_DATA.permits.mechanicalInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.mechanicalInspectionLastUpdated = null;

    	if(PROJECT_DATA.permits.electrical == undefined)
    		PROJECT_DATA.permits.electrical = null;
    	if(PROJECT_DATA.permits.electricalInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.electricalInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.plumbing == undefined)
    		PROJECT_DATA.permits.plumbing = null;
    	if(PROJECT_DATA.permits.plumbingInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.plumbingInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.fire_sprinkler == undefined)
    		PROJECT_DATA.permits.fire_sprinkler = null;
    	if(PROJECT_DATA.permits.sprinklerInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.sprinklerInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.fire_alarm == undefined)
    		PROJECT_DATA.permits.fire_alarm = null;
    	if(PROJECT_DATA.permits.fireAlarmInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.fireAlarmInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.low_voltage == undefined)
    		PROJECT_DATA.permits.low_voltage = null;
    	if(PROJECT_DATA.permits.voltageInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.voltageInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.roofing == undefined)
    		PROJECT_DATA.permits.roofing = null;
    	if(PROJECT_DATA.permits.roofingInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.roofingInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.otherAPermit == undefined)
    		PROJECT_DATA.permits.otherAPermit = null;
    	if(PROJECT_DATA.permits.otherAInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.otherAInspectionLastUpdated = null;
    	
    	if(PROJECT_DATA.permits.otherBPermit == undefined)
    		PROJECT_DATA.permits.otherBPermit = null;
    	if(PROJECT_DATA.permits.otherBInspectionLastUpdated == undefined)
    		PROJECT_DATA.permits.otherBInspectionLastUpdated = null;
    }
    console.log(PROJECT_DATA);
    ////////////// END NEW CONTENT

    // Probably going to get rid of this
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
				roughMech, roughElec, roughPlumb, mechLightSmoke,
				 fireMarshal, health, //27
				
				//Permit
				building_p, mechanical_p, electrical_p, plumbing_p,fireSprinkler_p,
				fireAlarm_p, lowVoltage_p,//34
				
				// closeoutList
				buildingPermitCL,inspectionSOCL,
				certCompletionCL,mPunchListCL, closeoutPhotosCL,
				subConWarrantiesCL, MCSWarranty,//41
				equipmentSubCL,
				traneCL,
				
				// new closeout info
				mg2CompletionDate,
				
				MCSDate, GCDate, mechanicalDate, electricalDate, plumbingDate, 
				sprinkleDate, roofingDate, HTIDate, otherFinalLeinsDate,
				
				sprinkleFinalDate, certificateDate, mechFinalDate, elecFinalDate, plumbingFinalDate, tmpCertificateDate,
				
				GCWarrantyDate, mechanicalWarrantyDate, electricalWarrantyDate, sprinkleWarrantyDate, 
				roofingWarrantyDate, HTIWarrantyDate, otherWarrantyDateA, otherWarrantyDateB,
				
				manualDate, HVACstartupFormDate,                 
				];
				
	var numbers = [salvageAmount, shouldInvoice, actualInvoice, cost, customerNumber, numOfChangeOrders, numOfChangeOrdersCompleted];
	
	var noteFields = [notes, scope, zachNotes,
	                  
		                // Close out info
	                  	closeoutDocumentsNotes, finalInspectionNotes, finalLiensNotes, warrantyNotes, 
	                  ];

	
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
				'roughin_mechanical' : roughMech, 
				'roughin_electric' : roughElec, 
				'roughin_plumbing' : roughPlumb, 
				'mechanicalLightSmoke' : mechLightSmoke,
				'fire_marshal' : fireMarshal, 
				'health' : health, 
				
				//Permit Data
				'permitsID': PROJECT_DATA.permits.id,
				'building_p':PROJECT_DATA.permits.building, 
				'buildingPermitStatus': PROJECT_DATA.permits.buildingPermitStatus,
				'buildingInspectionStatus': PROJECT_DATA.permits.buildingInspectionStatus,
				'buildingInspectionLastUpdated': PROJECT_DATA.permits.buildingInspectionLastUpdated,
				'buildingNotes': PROJECT_DATA.permits.buildingNotes,
				
				'mechanical_p' :PROJECT_DATA.permits.mechanical,
				'mechanicalPermitStatus': PROJECT_DATA.permits.mechanicalPermitStatus,
				'mechanicalInspectionStatus': PROJECT_DATA.permits.mechanicalInspectionStatus,
				'mechanicalInspectionLastUpdated': PROJECT_DATA.permits.mechanicalInspectionLastUpdated,
				'mechanicalNotes': PROJECT_DATA.permits.mechanicalNotes,
				
				'electrical_p':PROJECT_DATA.permits.electrical,
				'electricalPermitStatus': PROJECT_DATA.permits.electricalPermitStatus,
				'electricalInspectionStatus': PROJECT_DATA.permits.electricalInspectionStatus,
				'electricalInspectionLastUpdated': PROJECT_DATA.permits.electricalInspectionLastUpdated,
				'electricalNotes': PROJECT_DATA.permits.electricalNotes,
				
				'plumbing_p':PROJECT_DATA.permits.plumbing,
				'plumbingPermitStatus': PROJECT_DATA.permits.plumbingPermitStatus,
				'plumbingInspectionStatus': PROJECT_DATA.permits.plumbingInspectionStatus,
				'plumbingInspectionLastUpdated': PROJECT_DATA.permits.plumbingInspectionLastUpdated,
				'plumbingNotes': PROJECT_DATA.permits.plumbingNotes,
				
				'fireSprinkler_p': PROJECT_DATA.permits.fire_sprinkler,
				'sprinklerPermitStatus': PROJECT_DATA.permits.sprinklerPermitStatus,
				'sprinklerInspectionStatus': PROJECT_DATA.permits.sprinklerInspectionStatus,
				'sprinklerInspectionLastUpdated': PROJECT_DATA.permits.sprinklerInspectionLastUpdated,
				'sprinklerNotes': PROJECT_DATA.permits.sprinklerNotes,
				
				'fireAlarm_p': PROJECT_DATA.permits.fire_alarm, 
				'fireAlarmPermitStatus': PROJECT_DATA.permits.fireAlarmPermitStatus,
				'fireAlarmInspectionStatus': PROJECT_DATA.permits.fireAlarmInspectionStatus,
				'fireAlarmInspectionLastUpdated': PROJECT_DATA.permits.fireAlarmInspectionLastUpdated,
				'fireAlarmNotes': PROJECT_DATA.permits.fireAlarmNotes,
				
				'lowVoltage_p': PROJECT_DATA.permits.low_voltage,
				'voltagePermitStatus': PROJECT_DATA.permits.voltagePermitStatus,
				'voltageInspectionStatus': PROJECT_DATA.permits.voltageInspectionStatus,
				'voltageInspectionLastUpdated': PROJECT_DATA.permits.voltageInspectionLastUpdated,
				'voltageNotes': PROJECT_DATA.permits.voltageNotes,
				
				'roofingPermit': PROJECT_DATA.permits.roofing,
				'roofingPermitStatus': PROJECT_DATA.permits.roofingPermitStatus,
				'roofingInspectionStatus': PROJECT_DATA.permits.roofingInspectionStatus,
				'roofingInspectionLastUpdated': PROJECT_DATA.permits.roofingInspectionLastUpdated,
				'roofingNotes': PROJECT_DATA.permits.roofingNotes,
				
				'otherPermitA': PROJECT_DATA.permits.otherAPermit,
				'otherAPermitStatus': PROJECT_DATA.permits.otherAPermitStatus,
				'otherAInspectionStatus': PROJECT_DATA.permits.otherAInspectionStatus,
				'otherAInspectionLastUpdated': PROJECT_DATA.permits.otherAInspectionLastUpdated,
				'otherANotes': PROJECT_DATA.permits.otherANotes,
				
				'otherBPermit': PROJECT_DATA.permits.otherBPermit,
				'otherBPermitStatus': PROJECT_DATA.permits.otherBPermitStatus,
				'otherBInspectionStatus': PROJECT_DATA.permits.otherBInspectionStatus,
				'otherBInspectionLastUpdated': PROJECT_DATA.permits.otherBInspectionLastUpdated,
				'otherBNotes': PROJECT_DATA.permits.otherBNotes,
				
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
				
				// new closeout info
				'mg2CompletionStatus': mg2CompletionStatus,
				'mg2CompletionDate': mg2CompletionDate,
				
				'numOfChangeOrders': numOfChangeOrders,
				'numOfChangeOrdersCompleted': numOfChangeOrdersCompleted,
				
				'MCSStatus': MCSStatus,
				'MCSDate': MCSDate,
				
				'GCStatus': GCStatus,
				'GCDate': GCDate,
				
				'mechanicalStatus': mechanicalStatus,
				'mechanicalDate': mechanicalDate,
				
				'electricalStatus': electricalStatus,
				'electricalDate': electricalDate,
				
				'plumbingStatus': plumbingStatus,
				'plumbingDate': plumbingDate,
				
				'sprinkleStatus': sprinkleStatus,
				'sprinkleDate': sprinkleDate,
				
				'roofingStatus': roofingStatus,
				'roofingDate': roofingDate,
				
				'HTIStatus': HTIStatus,
				'HTIDate': HTIDate,
				
				'finalLiensNotes': finalLiensNotes,
				
				'otherFinalLeinsStatus': otherFinalLeinsStatus,
				'otherFinalLeinsDate': otherFinalLeinsDate,
				
				'mechFinalStatus': mechFinalStatus,
				'mechFinalDate': mechFinalDate,
				
				'elecFinalStatus': elecFinalStatus,
				'elecFinalDate': elecFinalDate,
				
				'plumbingFinalStatus': plumbingFinalStatus,
				'plumbingFinalDate': plumbingFinalDate,
				
				'sprinkleFinalStatus': sprinkleFinalStatus,
				'sprinkleFinalDate': sprinkleFinalDate,
				
				'buildingFinalStatus': buildingFinalStatus,	
				
				'tmpCertificateStatus': tmpCertificateStatus,
				'tmpCertificateDate': tmpCertificateDate,
				
				'certificateStatus': certificateStatus,
				'certificateDate': certificateDate,
				
				'finalInspectionNotes': finalInspectionNotes,
			
				'MCSWarrantyStatus': MCSWarrantyStatus,
				
				'GCWarrantyStatus': GCWarrantyStatus,
				'GCWarrantyDate': GCWarrantyDate,
				
				'mechanicalWarrantyStatus': mechanicalWarrantyStatus,
				'mechanicalWarrantyDate': mechanicalWarrantyDate,
				
				'electricalWarrantyStatus': electricalWarrantyStatus,
				'electricalWarrantyDate': electricalWarrantyDate,
				
				'plumbingWarrantyStatus': plumbingWarrantyStatus,
				'plumbingWarrantyDate': plumbingWarrantyDate,
				
				'sprinkleWarrantyStatus': sprinkleWarrantyStatus,
				'sprinkleWarrantyDate': sprinkleWarrantyDate,
				
				'roofingWarrantyStatus': roofingWarrantyStatus,
				'roofingWarrantyDate': roofingWarrantyDate,
				
				'HTIWarrantyStatus': HTIWarrantyStatus,
				'HTIWarrantyDate': HTIWarrantyDate,
				
				'otherWarrantyStatusA': otherWarrantyStatusA,
				'otherWarrantyDateA': otherWarrantyDateA,
				
				'otherWarrantyStatusB': otherWarrantyStatusB,
				'otherWarrantyDateB': otherWarrantyDateB,
				
				'warrantyNotes': warrantyNotes,
								
				'equipmentSubmittalStatus': equipmentSubmittalStatus,
				
				'manualStatus': manualStatus,
				'manualDate': manualDate,
				
				'punchListStatus': punchListStatus,
				
				'asBuiltDrawingsStatus': asBuiltDrawingsStatus,
				
				'closeOutPhotosStatus': closeOutPhotosStatus,
				
				'HVACstartupFormStatus': HVACstartupFormStatus,
				'HVACstartupFormDate': HVACstartupFormDate,
				
				'alarmFormStatus': alarmFormStatus,
				
				'verisaeReportStatus': verisaeReportStatus,
				
				'closeoutDocumentsNotes': closeoutDocumentsNotes,
			},
			success:function(data){
				console.log(data);
				PROJECT_ID = data.id;
				createConfirmWindow();
			},
			/*commented out because of error. Error dictates that their is a parse error and unexpected end of input. 
			 * Code works perfectly with error statement 
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
			"Go to Project Manager": function() {
				console.log("in order to make it so duplicates aren't made, make this navigate you to the ?edit:id=X page or whatever");
				window.location.href="projectManager.html?type=navigateTo&id=" + PROJECT_ID;
			},
			"Go to Home Page": function() {
				window.location.href="homepage.html";
			},
			"Find another project": function() {
				window.location.href="findProject.html";
			}
		}
	});	
}

//This function validates the nunmerous fields of this page, separated by categories
//Input: array of str, array of str, array of ints, str, str, int
//output: true if all of the fields are valid. False otherwise
// TODO: Numbers, notes, 
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
			console.log("----------");

			console.log(date);
			console.log("----------");
			console.log(i);

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
	console.log(data);
	var json = (data);
    $("#warehouse").val(json.warehouse.id);
	$("#class").val(json.projectClass.id);
	$("#project").val(json.projectItem.id);
	$("#manager").val(json.projectManagers.id);
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

		$("#numOfChangeOrders").val(json.closeoutDetails.numOfChangeOrders);
		$("#numOfChangeOrdersCompleted").val(json.closeoutDetails.numOfChangeOrdersCompleted);
		
		$("#tmpCertificateStatus").val(json.closeoutDetails.tmpCertificateStatus);
		$("#tmpCertificateDate").val(json.closeoutDetails.tmpCertificateDate);
		
		$("#mechFinalStatus").val(json.closeoutDetails.mechFinalStatus);
		$("#mechFinalDate").val(json.closeoutDetails.mechFinalDate);
		
		$("#elecFinalNotes").val(json.closeoutDetails.elecFinalNotes);
		$("#elecFinalDate").val(json.closeoutDetails.elecFinalDate);
		$("#elecFinalStatus").val(json.closeoutDetails.elecFinalStatus);
		
		$("#plumbingFinalStatus").val(json.closeoutDetails.plumbingFinalStatus);
		$("#plumbingFinalDate").val(json.closeoutDetails.plumbingFinalDate);
		
		$("#sprinkleFinalStatus").val(json.closeoutDetails.sprinkleFinalStatus);
		$("#sprinkleFinalDate").val(json.closeoutDetails.sprinkleFinalDate);
		
		$("#certificateStatus").val(json.closeoutDetails.certificateStatus);
		$("#certificateDate").val(json.closeoutDetails.certificateDate);
		
		$("#buildFinalStatus").val(json.closeoutDetails.buildingFinalStatus);
		
		$("#equipmentSubmittalStatus").val(json.closeoutDetails.equipmentSubmittalStatus);
		
		$("#manualStatus").val(json.closeoutDetails.manualStatus);
		$("#manualDate").val(json.closeoutDetails.manualDate);
		
		$("#punchListStatus").val(json.closeoutDetails.punchListStatus);
		
		$("#asBuiltDrawingsStatus").val(json.closeoutDetails.asBuiltDrawingsStatus);
		
		$("#closeOutPhotosStatus").val(json.closeoutDetails.closeOutPhotosStatus);
		
		$("#HVACstartupFormStatus").val(json.closeoutDetails.HVACstartupFormStatus);
		$("#HVACstartupFormDate").val(json.closeoutDetails.HVACstartupFormDate);
		
		$("#alarmFormStatus").val(json.closeoutDetails.alarmFormStatus);
		
		$("#verisaeReportStatus").val(json.closeoutDetails.verisaeReportStatus);
		
		$("#MCSWarrantyStatus").val(json.closeoutDetails.MCSWarrantyStatus);
		
		$("#GCWarrantyStatus").val(json.closeoutDetails.GCWarrantyStatus);
		$("#GCWarrantyDate").val(json.closeoutDetails.GCWarrantyDate);
		
		$("#mechanicalWarrantyStatus").val(json.closeoutDetails.mechanicalWarrantyStatus);
		$("#mechanicalWarrantyDate").val(json.closeoutDetails.mechanicalWarrantyDate);
		
		$("#electricalWarrantyStatus").val(json.closeoutDetails.electricalWarrantyStatus);
		$("#electricalWarrantyDate").val(json.closeoutDetails.electricalWarrantyDate);
		
		$("#plumbingWarrantyStatus").val(json.closeoutDetails.plumbingWarrantyStatus);
		$("#plumbingWarrantyDate").val(json.closeoutDetails.plumbingWarrantyDate);
		
		$("#sprinkleWarrantyStatus").val(json.closeoutDetails.sprinkleWarrantyStatus);
		$("#sprinkleWarrantyDate").val(json.closeoutDetails.sprinkleWarrantyDate);
		
		$("#roofingWarrantyStatus").val(json.closeoutDetails.roofingWarrantyStatus);
		$("#roofingWarrantyDate").val(json.closeoutDetails.roofingWarrantyDate);
		
		$("#HTIWarrantyStatus").val(json.closeoutDetails.HTIWarrantyStatus);
		$("#HTIWarrantyDate").val(json.closeoutDetails.HTIWarrantyDate);
		
		$("#otherWarrantyStatusA").val(json.closeoutDetails.otherWarrantyStatusA);
		$("#otherWarrantyDateA").val(json.closeoutDetails.otherWarrantyDateA);
		
		$("#otherWarrantyStatusB").val(json.closeoutDetails.otherWarrantyStatusB);
		$("#otherWarrantyDateB").val(json.closeoutDetails.otherWarrantyDateB);
		
		$("#MCSStatus").val(json.closeoutDetails.MCSStatus);
		$("#MCSDate").val(json.closeoutDetails.MCSDate);
		
		$("#GCStatus").val(json.closeoutDetails.GCStatus);
		$("#GCDate").val(json.closeoutDetails.GCDate);
		
		$("#mechanicalStatus").val(json.closeoutDetails.mechanicalStatus);
		$("#mechanicalDate").val(json.closeoutDetails.mechanicalDate);
		
		$("#electricalStatus").val(json.closeoutDetails.electricalStatus);
		$("#electricalDate").val(json.closeoutDetails.electricalDate);
		
		$("#plumbingStatus").val(json.closeoutDetails.plumbingStatus);
		$("#plumbingDate").val(json.closeoutDetails.plumbingDate);
		
		$("#sprinkleStatus").val(json.closeoutDetails.sprinkleStatus);
		$("#sprinkleDate").val(json.closeoutDetails.sprinkleDate);
		
		$("#roofingStatus").val(json.closeoutDetails.roofingStatus);
		$("#roofingDate").val(json.closeoutDetails.roofingDate);
		
		$("#HTIStatus").val(json.closeoutDetails.HTIStatus);
		$("#HTIDate").val(json.closeoutDetails.HTIDate);
		
		$("#otherFinalLiensStatus").val(json.closeoutDetails.otherFinalLeinsStatus);
		$("#otherFinalLiensDate").val(json.closeoutDetails.otherFinalLeinsDate);
		
		$("#mg2CompletionDate").val(json.closeoutDetails.mg2CompletionDate);
		$("#mg2CompletionStatus").val(json.closeoutDetails.mg2CompletionStatus);
		
		$("#finalInspectionNotes").val(json.closeoutDetails.finalInspectionNotes);
		$("#finalLiensNotes").val(json.closeoutDetails.finalLiensNotes);
		$("#closeoutDocumentsNotes").val(json.closeoutDetails.closeoutDocumentsNotes);
		$("#warrantyNotes").val(json.closeoutDetails.warrantyNotes);
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

/**
 * Statuses from the new closeout come in as values from 1-3 or "default"
 * This function converts the 1-3 value to its dropdown correlation
 * @param status
 */
function convertStatusInt(status)
{
	if(status == "1")
		return "Complete";
	else if(status == "2") 
		return "Incomplete";
	else if(status == "3")
		return "N/A";
	
	return status;
}

// closeout dropdowns - at the bottom cause it's huge
var closeoutstatus_dropdowns = [
                "mg2CompletionStatus",                
                
				"copSubmittedStatus", "copApprovedStatus", "copCompletedStatus", "changeOrderSubmittedStatus",
				"changeOrderApprovedStatus","revisionsSubmittedStatus", "revisionsApprovedStatus",
				
				"MCSStatus", "GCStatus", "mechanicalStatus", "electricalStatus", "plumbingStatus", 
				"sprinkleStatus", "roofingStatus", "HTIStatus", "otherFinalLiensStatus",
				
				"sprinkleFinalStatus", "certificateStatus", "tmpCertificateStatus", "mechFinalStatus", "elecFinalStatus",
				"plumbingFinalStatus", "buildFinalStatus",
				
				"MCSWarrantyStatus", "GCWarrantyStatus", "mechanicalWarrantyStatus", "electricalWarrantyStatus", "sprinkleWarrantyStatus", 
				"plumbingWarrantyStatus", "roofingWarrantyStatus", "HTIWarrantyStatus", "otherWarrantyStatusA", "otherWarrantyStatusB",
				
				"equipmentSubmittalStatus", "manualStatus","punchListStatus", "asBuiltDrawingsStatus", 
                "closeOutPhotosStatus", "HVACstartupFormStatus", "alarmFormStatus", "verisaeReportStatus",
                 
                                                     
                                ];

