var ITEM_TYPES = ["warehouse", "stage", "item", "class", "type", "region", "status", "person", "closeout"];
var DATE_TYPES = ["initiated", "costcoDueDate", "proposalSubmitted", "scheduledStartDate", "scheduledTurnover", "actualTurnover", "onGoing"];
var DATE_RELATIONS = ["<", "=", ">"];
var BOOL_RELATIONS = ["and", "or"];
var stages=["Active", "Budgetary", "Closed", "Proposal", "Inactive"];
var CLOSEOUT_PARAMS = ["Inspection", "Warranties", "Liens"];

const REPORT_TYPES = ["Weekly","Steve Meyer","South East Refrigeration","North East Refrigeration",
                      "J Dempsey", "Invoice", "Completed", "Construction", "Repair", "HVAC", "RX", "Closeout"];

const REPORT_URL = "Report";
const DATE_COMPARATORS = {"<":"Before", "=":"On",">":"After"};
const BOOL_COMPARATORS = {"and":"AND", "or":"OR"};

const FIELDS_TO_SHOW = {"mcsNum" : "MCS Number","stage": "Project Stage", "warehouse": "Warehouse", "item": "Project Item", 
			"scope": "Project Scope", "class": "Project Classification", "manager": "Project Manager", "supervisor": "Project Supervisor",
			"region": "Region", "status": "Project Status", "scheduledStartDate": "Scheduled Start Date", 
			"scheduledTurnover" : "Scheduled Turn Over", "actualTurnover" : "Actual Turn Over", "initiated": "Project Initiated Date", 
			"siteSurvey" : "Site Survey", "costcoDueDate" : "Costco Due Date", "proposalSubmitted" : "Proposal Submitted", "type" : "Type", 
			"asBuilts" : "As-Builts", "punchList":"Punch List", "alarmHvacForm":"Alarm Form", "salvageValue" : "Salvage Value", 
			"airGas" : "Air Gas", "permitsClosed" : "Permits Closed", "verisaeShutdownReport" : "Verisae/Shut Down Report", 
			"shouldInvoice":"Should Invoice %", "invoiced":"Invoice %", "projectNotes" : "Project and Financial Notes", 
			"cost" : "Project Cost", "zachNotes" : "Refrigeration Notes", "custNum" : "Customer Number", "permitApp" : "Permit Application", 
			"person": "Project Manager", "closeout": "Closeout"};

var REPORT_VALS = {"Weekly":"WEEKLY","Steve Meyer":"STEVE_MEYER","South East Refrigeration":"SE","North East Refrigeration":"NE",
					"J Dempsey":"J_DEMPSEY","Invoice":"INVOICED", "Completed":"COMPLETED", "Construction":"CONSTRUCTION", 
					"Repair":"REPAIR", "HVAC" : "HVAC", "RX":"RX", "Closeout": "CLOSEOUT"};

const PROPOSAL_STAGE = 1;
const ACTIVE_STAGE = 2;
const INACTIVE_STAGE=10;
const BUDGETARY_STAGE=8;
const CLOSED_STAGE=4;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DATABASE CONSTANTS: These are used to access values by database ID, if they are changed in the DB, they must also be changed here

//PROJECT_TYPES
const PROJECT_TYPE_C = 1;
const PROJECT_TYPE_CW = 5;
const PROJECT_TYPE_R = 6;
const PROJECT_TYPE_CR=7;
const PROJECT_TYPE_RM=3;
const PROJECT_TYPE_OH=2;
const PROJECT_TYPE_H=8;
const PROJECT_TYPE_RX = 9;
const PROJECT_TYPE_RS = 10;

//PROJECT_STATUSES
const PROJECT_STATUS_PREPARING_PROPOSAL = 1;
const PROJECT_STATUS_ON_HOLD = 2;
const PROJECT_STATUS_PROPOSAL_SUBMITTED = 3;
const PROJECT_STATUS_AWAITING_DIRECTION = 4;
const PROJECT_STATUS_BUDGETARY_SUBMITTED = 5;
const PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED = 6;
const PROJECT_STATUS_PROPOSAL_RESUBMITTED = 7;
const PROJECT_STATUS_REVISING_PROPOSAL = 8;
const PROJECT_STATUS_PREPARING_PROPOSAL_TEMP = 9;
const PROJECT_STATUS_BUDGET_SUBMITTED = 10;
const PROJECT_STATUS_AWAITING_DRAWINGS = 11;
const PROJECT_STATUS_SITE_SURVEY = 12;
const PROJECT_STATUS_REVISED_BUDGET_SUBMITTED = 13;
const PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS = 14;
const PROJECT_STATUS_CONFIRMING_SCOPE_SITE_SURVEY = 15;
const PROJECT_STATUS_AWAITING_REFRIGERATION_DRAWINGS = 17;
const PROJECT_STATUS_REVISING_PRICE = 18;
const PROJECT_STATUS_SCHEDULE_SITE_SURVEY = 19;
const PROJECT_STATUS_PERFORMING_SITE_SURVEY = 20;
const PROJECT_STATUS_BUDGETARY_RESUBMITTED = 21;
const PROJECT_STATUS_UPDATED_PROPOSAL = 22;
const PROJECT_STATUS_UPDATING_PROPOSAL = 23;
const PROJECT_STATUS_AWAITING_UPDATED_SCOPE = 24;
const PROJECT_STATUS_AWAITING_PERMIT_DRAWINGS = 25;
const PROJECT_STATUS_SCHEDULING = 26;
const PROJECT_STATUS_AWAITING_CONTRACT = 27;
const PROJECT_STATUS_COMPLETE = 28;
const PROJECT_STATUS_SCHEDULED = 29;
const PROJECT_STATUS_AWAITING_PERMIT = 30;
const PROJECT_STATUS_AWAITING_PO = 31;

//Project Classification
const PROJECT_CLASS_HVAC = 4;

const PROJECT_ITEM_PHARMACY = 153;
const PROJECT_ITEM_PHARMACY_SALES_COUNTER = 76;
const PROJECT_ITEM_PHARMACY_TRIPPLE_WINDOW = 154;
const PROJECT_ITEM_PHARMACY_LAMINATE_FLOOR = 209;
const PROJECT_ITEM_PHARMACY_FLOOR = 233;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Constants that are button passed arguments, must be consistent names sent from buttons

const PROPOSAL_WEEKLY = "WEEKLY_P";
const ACTIVE_WEEKLY = "WEEKLY_A";
const INACTIVE_WEEKLY = "WEEKLY_I";
const CLOSED_WEEKLY = "WEEKLY_C";
const BUDGETARY_WEEKLY = "WEEKLY_B";

const PROPOSAL_STEVE_MEYER = "STEVE_MEYER_P";
const ACTIVE_STEVE_MEYER = "STEVE_MEYER_A";
const INACTIVE_STEVE_MEYER = "STEVE_MEYER_I";
const CLOSED_STEVE_MEYER = "STEVE_MEYER_C";
const BUDGETARY_STEVE_MEYER = "STEVE_MEYER_B";

const PROPOSAL_SE = "SE_P";
const ACTIVE_SE = "SE_A";
const INACTIVE_SE = "SE_I";
const CLOSED_SE = "SE_C";
const BUDGETARY_SE = "SE_B";

const PROPOSAL_NE = "NE_P";
const ACTIVE_NE = "NE_A";
const INACTIVE_NE = "NE_I";
const CLOSED_NE = "NE_C";
const BUDGETARY_NE = "NE_B";

const PROPOSAL_J_DEMPSEY = "J_DEMPSEY_P";
const ACTIVE_J_DEMPSEY = "J_DEMPSEY_A";
const INACTIVE_J_DEMPSEY = "J_DEMPSEY_I";
const CLOSED_J_DEMPSEY = "J_DEMPSEY_C";
const BUDGETARY_J_DEMPSEY = "J_DEMPSEY_B";

const PROPOSAL_INVOICE_REPORT ="INVOICED_P";
const ACTIVE_INVOICE_REPORT ="INVOICED_A";
const INACTIVE_INVOICE_REPORT ="INVOICED_I";
const CLOSED_INVOICE_REPORT ="INVOICED_C";
const BUDGETARY_INVOICE_REPORT ="INVOICED_B";

const PROPOSAL_CONSTRUCTION ="CONSTRUCTION_P";
const ACTIVE_CONSTRUCTION ="CONSTRUCTION_A";
const INACTIVE_CONSTRUCTION ="CONSTRUCTION_I";
const CLOSED_CONSTRUCTION ="CONSTRUCTION_C";
const BUDGETARY_CONSTRUCTION ="CONSTRUCTION_B";

const PROPOSAL_REPAIR ="REPAIR_P";
const ACTIVE_REPAIR ="REPAIR_A";
const INACTIVE_REPAIR ="REPAIR_I";
const CLOSED_REPAIR ="REPAIR_C";
const BUDGETARY_REPAIR ="REPAIR_B";

const PROPOSAL_HVAC ="HVAC_P";
const ACTIVE_HVAC ="HVAC_A";
const INACTIVE_HVAC ="HVAC_I";
const CLOSED_HVAC ="HVAC_C";
const BUDGETARY_HVAC ="HVAC_B";

const PROPOSAL_RX ="RX_P";
const ACTIVE_RX ="RX_A";
const INACTIVE_RX ="RX_I";
const CLOSED_RX ="RX_C";
const BUDGETARY_RX ="RX_B";

const ACTIVE_COMPLETE_REPORT ="COMPLETED_A";

const ACTIVE_CLOSEOUT = "CLOSEOUT_A";
const BUDGETARY_CLOSEOUT = "CLOSEOUT_B";
const CLOSED_CLOSEOUT = "CLOSEOUT_C";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fields to show the fields required for weekly reports
const PROPOSAL_WEEKLY_KEYS = new Array("stage", "warehouse", "item","scope","class","manager", "supervisor", 
					"region", "status","initiated","siteSurvey","costcoDueDate","proposalSubmitted","type","projectNotes");

const ACTIVE_WEEKLY_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","class","manager", "supervisor", "region", 
									"status","scheduledStartDate","scheduledTurnover","actualTurnover",
									"type",
									/*TODO: Get rid of this"asBuilts","punchList","alarmHvacForm","salvageValue","airGas",
									"permitsClosed","verisaeShutdownReport",*/ "invoiced", "shouldInvoice", "projectNotes");


const INACTIVE_WEEKLY_KEYS = new Array("stage", "item","scope","status");


const BUDGETARY_WEEKLY_KEYS = new Array("stage", "warehouse", "item","scope","manager", "supervisor", 
		"region", "status","initiated","siteSurvey","costcoDueDate","proposalSubmitted","type", "projectNotes");


const CLOSED_WEEKLY_KEYS = new Array("mcsNum", "stage", "warehouse", "item","scope","manager", "supervisor",
									"region", "status","initiated","type","costcoDueDate","proposalSubmitted",
									"scheduledStartDate", "scheduledTurnover", "asBuilts", "punchList", "alarmHvacForm",
									"permitsClosed","shouldInvoice","invoiced","projectNotes");

//Fields to show with Steve Meyer and J Dempsey reports
const PROPOSAL_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", "region", "status", "initiated","proposalSubmitted");
const ACTIVE_STEVE_MEYER_AND_J_DEMPSEY_KEYS = new Array("mcsNum","warehouse", "item","scope","class","manager", "supervisor", "region", "status", "scheduledStartDate","scheduledTurnover");

const INACTIVE_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", "region", "status", "initiated","proposalSubmitted");

const BUDGETARY_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", "region", "status", "initiated","proposalSubmitted");

const CLOSED_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", "region", "status", "initiated","proposalSubmitted");

//NE and SE report keys
const PROPOSAL_SE_AND_NE_KEYS = new Array("warehouse", "item","scope","manager","supervisor", "status", "permitApp", "initiated","costcoDueDate","proposalSubmitted", "zachNotes");
const ACTIVE_SE_AND_NE_KEYS = new Array("warehouse", "item","scope","manager","supervisor", "status", "permitApp", "scheduledStartDate","scheduledTurnover","asBuilts","alarmHvacForm", "zachNotes");

const INACTIVE_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", "status", "permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");

const BUDGETARY_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", "status", "permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");

const CLOSED_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", "status", "permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");


const PROPOSAL_STEVE_MEYER_KEYS = new Array("region", "item", "warehouse", "scope","class","manager", "supervisor", "status", "initiated","proposalSubmitted");


//Fields to show with Invoice report
const INVOICE_KEYS = new Array("mcsNum","warehouse", "item","class","scheduledStartDate", "initiated", "scheduledTurnover", "actualTurnover", "invoiced", "shouldInvoice", "projectNotes");

const ACTIVE_CONSTRUCTION_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","class","manager", "supervisor", "region", "status","scheduledStartDate","scheduledTurnover","actualTurnover",
							  "type","asBuilts","punchList","alarmHvacForm","salvageValue","airGas","permitsClosed","verisaeShutdownReport", "invoiced", "shouldInvoice", "projectNotes");

const ACTIVE_REPAIR_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","class","manager", "supervisor", "region", "status","scheduledStartDate","scheduledTurnover","actualTurnover",
							  "type","asBuilts","punchList","alarmHvacForm","salvageValue","airGas","permitsClosed","verisaeShutdownReport", "invoiced", "shouldInvoice", "projectNotes");


//Fields to show with HVAC report
const PROPOSAL_HVAC_KEYS = new Array("warehouse", "item","scope","region","status","initiated", "siteSurvey", "costcoDueDate", "proposalSubmitted", "projectNotes");

const ACTIVE_HVAC_KEYS = new Array("warehouse", "item","scope","region","status", "scheduledStartDate", "projectNotes");


//Fields to show with Active/Complete report
const ACTIVE_COMPLETE_KEYS = new Array("mcsNum","warehouse", "item", "scope","region", "scheduledStartDate", "scheduledTurnover", "asBuilts", "punchList", "alarmHvacForm","permitsClosed","shouldInvoice","invoiced","projectNotes");

// Fields to show for the closeout report, don't ever actually make this report. It doesn't look good.
const CLOSEOUT_KEYS_ALL = new Array("warehouse", "item", "status", "mechanicalFinal", "electricalFinal", "plumbingFinal", 
								"sprinkleFinal", "buildingFinal", "tmpCertificate", "certififcateFinal", "equipmentSubmittal", 
								"manuals", "punchList", "asBuiltDrawings", "closeoutPhotos", "hvacStartup", "alarmHvacForm", 
								"verisaeShutdownReport","mcsWarranty", "gcWarranty", "mechanicalWarranty", "electricalWarranty",
								"plumbingWarranty", "sprinklerWarranty", "roofingWarranty", "htiWarranty", "otherWarrantyA", 
								"otherWarrantyB", "mcsLiens", "gcLiens", "mechLiens", "elecLiens", "plumbLiens", 
								"sprinkleLiens", "roofingLiens", "htiLiens", "otherLiens", "numOfChanges", "numOfChangesCompleted");

const CLOSEOUT_KEYS_SIMPLE = new Array("warehouse", "item", "status", "equipmentSubmittal", "manuals", "punchList",
										"asBuiltDrawings", "closeoutPhotos", "hvacStartup", "alarmHvacForm", "verisaeShutdownReport", 
										"closeoutDocumentNotes", 
										"inspectionsRequired", "inspectionsCompleted", "warrantiesRequired", "warrantiesCompleted", 
										"liensRequired", "liensCompleted", "numOfChanges", "numOfChangesCompleted", "mg2Completion");

const CLOSEOUT_KEYS_INSPECTIONS = new Array("warehouse", "item", "status", "inspectionsRequired", "inspectionsCompleted", "mechanicalFinal",
											"electricalFinal", "plumbingFinal", "sprinkleFinal", "buildingFinal", "tmpCertificate", 
											"certififcateFinal", "finalInspectionNotes");

// TODO: We don't use the document keys, delete if you see this (the general CLOSEOUT_KEYS_SIMPLE already has all of the stuffs)
const CLOSEOUT_KEYS_DOCUMENTS = new Array("warehouse", "item", "status", "equipmentSubmittal", "manuals", "punchList", 
										"asBuiltDrawings", "closeoutPhotos", "hvacStartup", "alarmHvacForm", "verisaeShutdownReport", 
										"mg2Completion", "numOfChanges", "numOfChangesCompleted");

const CLOSEOUT_KEYS_WARRANTIES = new Array("warehouse", "item", "status", "warrantiesRequired", "warrantiesCompleted","mcsWarranty", 
										"gcWarranty", "mechanicalWarranty", "electricalWarranty", "plumbingWarranty", "sprinklerWarranty", 
										"roofingWarranty", "htiWarranty", "otherWarrantyA", "otherWarrantyB", "warrantyNotes");

const CLOSEOUT_KEYS_LIENS = new Array("warehouse", "item", "status","liensRequired", "liensCompleted", "mcsLiens", "gcLiens", "mechLiens", "elecLiens", "plumbLiens", 
										"sprinkleLiens", "roofingLiens", "htiLiens", "otherLiens", "finalLiensNotes");

//Fields that will hold the options to populate the drop downs quickly avoids making a server call every time
var warehouseOptions;
var stageOptions;
var itemOptions;
var classOptions;
var typeOptions;
var regionOptions;
var statusOptions;
var managerOptions;
var closeoutOptions;

//Keeps track of what values go with which parameter
var paramNum = 0;

$(document).on('change', 'select.params',function(){
	setVals($(this));
});

$(document).ready(function() 
{
	getProjectEnums();
	populateParameters();
	populateReportTypePicker();
	$(".remove").click(function(){
		$(this).parent().remove();
	});
});	

//Sets the values of a drop down whenever the parameter type is changed
function setVals(thisParam)
{
	var modParam = $(thisParam).parent().find("select.drop.value");
	valOptions = $(thisParam).val();

    if(valOptions == 'warehouse')
	{
		modParam.empty();
		modParam.append(warehouseOptions.cloneNode(true));
	}
	if(valOptions == 'stage')
	{
		modParam.empty();
		modParam.append(stageOptions.cloneNode(true));
	}
	if(valOptions == 'item')
	{
		modParam.empty();
		modParam.append(itemOptions.cloneNode(true));
	}
	if(valOptions == 'class')
	{
		modParam.empty();
		modParam.append(classOptions.cloneNode(true));
	}
	if(valOptions == 'type')
	{
		modParam.empty();
		modParam.append(typeOptions.cloneNode(true));
	}
	if(valOptions == 'region')
	{
		modParam.empty();
		modParam.append(regionOptions.cloneNode(true));
	}
	if(valOptions == 'status')
	{
		modParam.empty();
		modParam.append(statusOptions.cloneNode(true));
	}
    if(valOptions == 'person')
    {
		modParam.empty();
		modParam.append(managerOptions.cloneNode(true));      
    }
    if(valOptions == 'closeout')
    {
    	modParam.empty();
    	modParam.append(closeoutOptions.cloneNode(true));
    }
    
}
	
//Retrives the project enums, called on document ready
function getProjectEnums()
{
	$.ajax({
		type: 'POST',
		url: 'Project', 
		dataType: 'json',
		data: 
		{
			'domain': 'project',
			'action': 'getQueryEnums',
		},
		success: function(data)
		{
			fillDropdown(data);
		}
	});
}

//passes data from ajax call from projectEnums to generate values for drop downs
function fillDropdown(data)
{

	for (var i = 0; i < ITEM_TYPES.length; i++)
	{
		generateDropdown(data[ITEM_TYPES[i]], ITEM_TYPES[i]);
	}
	generateCloseoutDropdown();

}

//stores the drop down values retrieved from server locally for later use so they may be retrieved swiftly
function generateDropdown(str, className)
{
	if(className == "closeout")
		return;
	
	var json = JSON.parse(str);
	var d = document.createDocumentFragment();
	var sent=true;
	    
	for (var i = 0; i < json.length; i++)
	{
		sent=true;
		
		var option = document.createElement("option");
		if (className == "warehouse")
		{
			option.innerHTML = json[i].city.name+", "+json[i].state+" -- #"+json[i].warehouseID;
			option.setAttribute("value", json[i].id);
		}
		else if (className == "region")
		{
			option.innerHTML = json[i];
			option.setAttribute("value", json[i]);
		}
		else if(className=="stage")
		{
			if(hasStage(stages, json[i].name))
			{
				option.innerHTML=json[i].name;
				option.setAttribute("value", json[i].id);
			}
			else
				sent=false;
		}
		else
		{
			option.innerHTML = json[i].name;
			option.setAttribute("value", json[i].id);
		}
	
		if(sent)
			d.appendChild(option);
	}
		
		if(className == 'warehouse')
		{
			d.child
			warehouseOptions = d;
		}
		if(className == 'stage')
		{
			stageOptions = d;
		}
		if(className == 'item')
		{
			itemOptions = d;
		}
		if(className == 'class')
		{
			classOptions = d;
		}
		if(className == 'type')
		{
			typeOptions = d;
		}
		if(className == 'region')
		{
			regionOptions = d;
		}
		if(className == 'status')
		{
			statusOptions = d;
		}
        if(className == 'person')
        {
            managerOptions = d;
        }
	
}

function generateCloseoutDropdown()
{

	var d = document.createDocumentFragment();
	for(var i = 0; i < CLOSEOUT_PARAMS.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML=CLOSEOUT_PARAMS[i];
		option.setAttribute("value", CLOSEOUT_PARAMS[i]);
		d.appendChild(option);
	}
	closeoutOptions = d;
}


//add a parameter cell to the paramTable
function addParamCell()
{
	//create param cell
	var paraCell = document.createElement("div");
	paraCell.className = 'paramCell';
	
	//create parameter selection drop down
	var selObj = document.createElement("select");
	selObj.className = 'drop params';
	selObj.id = ('param'+paramNum);
	
	//create default option for the parameter drop down
	var optObj = document.createElement("option");
	optObj.value = 'none';
	optObj.innerHTML = 'Select Parameter';
	
	//create the remove tag for the param cell
	var removeTag = document.createElement("div");
	removeTag.className = 'remove';
	removeTag.onclick = function() {removeParam(this)};
	removeTag.innerHTML = 'X';
	
	//create a break tag
	var br = document.createElement("br");
	
	//create value selection drop down
	var selObj2 = document.createElement("select");
	selObj2.className = 'drop value';
	selObj2.id = ('val'+paramNum);
	
	//create default option for selection drop down
	var optObj2 = document.createElement("option");

	//append all objects to paramcell and append it to DOM
	selObj.appendChild(optObj);
	selObj2.appendChild(optObj2);
	paraCell.appendChild(selObj);
	paraCell.appendChild(removeTag);
	paraCell.appendChild(br);
	paraCell.appendChild(selObj2);
	$(".paramTable").append(paraCell);
	populateParameters();
}

//populate the parameters of the most recently created paramCell
function populateParameters()
{
	var option ='';
	for(var i = 0; i < ITEM_TYPES.length; i++)
		option += '<option value="'+ ITEM_TYPES[i] + '">' + FIELDS_TO_SHOW[ITEM_TYPES[i]] + '</option>';
	$('#param'+paramNum).append(option);
	//populateBoolComparators();
	paramNum++;
}

//populate the parameters of the reportTypePicker
function populateReportTypePicker()
{
	var option ='';
	for(var i = 0; i < REPORT_TYPES.length; i++)
		option += '<option value="'+ REPORT_VALS[REPORT_TYPES[i]] + '">' + REPORT_TYPES[i] + '</option>';
	$('.reportTypePicker').append(option);
}

//removes a paramCell from the paramTable
function removeParam(elem)
{
	elem.parentNode.remove();
	paramNum--;
}

//adds a date paramCell at the end of the 
function addDateParamCell()
{
	$(".paramTable").append("<div class=paramDateCell>" +
			"<select class='drop params' id ='param" + paramNum + "'><option value='none'>Select Date Type</option></select><div class='remove' onclick='removeParam(this)'>X</div></br>" +	    	
			"<select class='drop values' id ='val" + paramNum +"'><option value='none'>Select Comparison</option></select></br>" +
			"<input type='text' id='dateBox"+ paramNum + "'/>");
			"<select class='drop boolVal' id='bool" + paramNum +"'></select></div>" +
	$('#dateBox'+paramNum).datepicker();
	populateDateParameters();
}

function populateDateParameters()
{
	var option ='';
	for(var i = 0; i < DATE_TYPES.length; i++)
	{
	if(DATE_TYPES[i] == "onGoing")
		{
		}
		//option += '<option value="'+ DATE_TYPES[i] + '">On Going(Not yet working)</option>';
	else
		option += '<option value="'+ DATE_TYPES[i] + '">' + FIELDS_TO_SHOW[DATE_TYPES[i]] + '</option>';
	}
	$('#param'+paramNum).append(option);
	populateDateComparators();
}

function populateDateComparators()
{
	var option ='';
	for(var i = 0; i < DATE_RELATIONS.length; i++)
		option += '<option value="'+ DATE_RELATIONS[i] + '">' + DATE_COMPARATORS[DATE_RELATIONS[i]] + '</option>';
	$('#val'+paramNum).append(option);
	//populateBoolComparators();
	paramNum++;
}

function populateBoolComparators()
{
	var option ='';
	for(var i = 0; i < BOOL_RELATIONS.length; i++)
		option += '<option value="'+ BOOL_RELATIONS[i] + '">' + BOOL_COMPARATORS[BOOL_RELATIONS[i]] + '</option>';
	$('#bool'+paramNum).append(option);
	paramNum++;
}


function createModalFieldSelector()
{
	//Create html element
	var form = document.createElement("p");
	form.id = "fieldPicker";
	form.style.display = "none";
	form.title = "Please Select Fields";
	var desc = document.createElement("p");
	desc.innerHTML = "Please select the fields to show up on the report";
	form.appendChild(desc);
	
	//Create check All button
	var button1 = document.createElement("input");
	button1.type = "button";
	button1.value = "Check All";
	button1.onclick = function(){checkAll();};
	form.appendChild(button1);
	
	//Create un-check All button
	var button2 = document.createElement("input");
	button2.type = "button";
	button2.value = "Uncheck All";
	button2.onclick = function(){uncheckAll();};
	form.appendChild(button2);
	
	//generates the check boxes defaulted to checked
	$.each(FIELDS_TO_SHOW, function(key, value)
	{
		var span = document.createElement("p");
		
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = key;
		checkbox.checked = true;
		var desc = document.createElement("span");
		desc.innerHTML = " "+value;
		span.appendChild(checkbox);
		span.appendChild(desc);
		form.appendChild(span);
	});

	//Create Search button
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Search";
	button.onclick = function(){submitQuery();};
	form.appendChild(button);
	
	
	$("#content").append(form);
	
	//Create the popup window
	$(function() {
		$("#fieldPicker").dialog({
			modal: true,
			resizable: false,
			width: 500,
            height: 410,
		});
	});
}

//WARNING:
//	If you are to add future fields to the database
//  and their database fields do not match their names, they
//  must be modified here or you will get errors when trying
//  to create criteria with hibernate

//submits a query for projects based on the parameters selected
function submitQuery()
{	
	var selectedFields = JSON.stringify(getAllSelectedFields());
	var warehouseIDs = new Array();
	var stage = new Array();
	var pClass = new Array();
	var item = new Array();
	var pType = new Array();
	var region = new Array();
	var status = new Array();
	var initiated = new Array();
	var initiatedRelation = new Array();
	var costco = new Array();
	var costcoRelation = new Array();
	var submitted = new Array();
	var submittedRelation = new Array();
	var schStartDate = new Array();
	var schStartDateRelation = new Array();
	var schTurnoverDate = new Array();
	var schTurnoverDateRelation = new Array();
	var actTurnoverDate = new Array();
	var actTurnoverDateRelation = new Array();
	var onGoing = new Array();
	var onGoingRelation = new Array();
	var title = $('#reportTitle').val();
    
    for(var i = 0; i < paramNum;i++)
    {
    	var paramType = $('#param'+i).val();
    	if($('#param'+i).parent().attr('class') == 'paramDateCell')
    	{
		switch(paramType){
			case 'initiated':
    				var valType = $('#val'+i).val();
    				initiatedRelation.push(valType);			
    				var date = $('#dateBox'+i).val();
    				initiated.push(date);
    				break;

    			case 'costcoDueDate':
    				var valType = $('#val'+i).val();
    				costcoRelation.push(valType);
    				var date = $('#dateBox'+i).val();
				costco.push(date);
    				break;

    			case 'proposalSubmitted':
    				var valType = $('#val'+i).val();
    				submittedRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				submitted.push(date);
    				break;

    			case 'scheduledStartDate':
    				var valType = $('#val'+i).val();
    				schStartDateRelation.push(valType);			
    				var date = $('#dateBox'+i).val();
    				schStartDate.push(date);
    				break;

    			case 'scheduledTurnover':
    				var valType = $('#val'+i).val();
    				schTurnoverDateRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				schTurnoverDate.push(date);
    				break;

    			case 'actualTurnover':
    				var valType = $('#val'+i).val();
    				actTurnoverDateRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				actTurnoverDate.push(date);
    				break;

    			case 'onGoing':
				var valType = $('#val'+i).val();
				onGoingRelation.push(valType);
				var date = $('#dateBox'+i).val();
				onGoing.push(date);
				break;

    		/*if(paramType == 'initiated')
    			{
    				var valType = $('#val'+i).val();
    				initiatedRelation.push(valType);			
    				var date = $('#dateBox'+i).val();
    				initiated.push(date);
    			}
    		if(paramType == 'costcoDueDate')
    			{
    				var valType = $('#val'+i).val();
    				costcoRelation.push(valType);
    				var date = $('#dateBox'+i).val();
					costco.push(date);
    			}
    		if(paramType == 'proposalSubmitted')
    			{
    				var valType = $('#val'+i).val();
    				submittedRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				submitted.push(date);
    			}
    		if(paramType == 'scheduledStartDate')
    			{
    				var valType = $('#val'+i).val();
    				schStartDateRelation.push(valType);			
    				var date = $('#dateBox'+i).val();
    				schStartDate.push(date);
    			}
    		if(paramType == 'scheduledTurnover')
    			{
    				var valType = $('#val'+i).val();
    				schTurnoverDateRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				schTurnoverDate.push(date);
    			}
    		if(paramType == 'actualTurnover')
    			{
    				var valType = $('#val'+i).val();
    				actTurnoverDateRelation.push(valType);
    				var date = $('#dateBox'+i).val();
    				actTurnoverDate.push(date);
    			}
    		if(paramType == 'onGoing')
			{
				var valType = $('#val'+i).val();
				onGoingRelation.push(valType);
				var date = $('#dateBox'+i).val();
				onGoing.push(date);
			}*/
		}   
    	}
    	else
    	{
		switch(paramType){

			case 'region':
    				var valType = $('#val'+i).val();
    				region.push(valType);
    				break;

    			case 'warehouse':
    				var valType = $('#val'+i).val();
    				warehouseIDs.push(valType);
				break;

    			case 'class':
    				var valType = $('#val'+i).val();
				pClass.push(valType);
    				break;

    			case 'item':
    				var valType = $('#val'+i).val();
    				item.push(valType);
    				break;

    			case 'type':
    				var valType = $('#val'+i).val();
    				pType.push(valType);
    				break;

    			case 'status':
				var valType = $('#val'+i).val();
				status.push(valType);
				break;

    			case 'stage':
    				var valType = $('#val'+i).val();
    				stage.push(valType);
				break;
		}
    	}
    }
	//default title
	if(title == null || title == '')
		{
		title = ("Miller Construction Services Report");
		}
	
        var data = {
        		'domain': 'project',
    			'action': 'query',
    			'warehouse.id': JSON.stringify(warehouseIDs),
    			'stage.id':JSON.stringify(stage),
    			'projectClass.id':JSON.stringify(pClass),
    			'projectItem.id': JSON.stringify(item),
    			'projectType.id': JSON.stringify(pType),
    			'region.region':JSON.stringify(region),
    			'status.id':JSON.stringify(status),
    			'projectInitiatedDate':JSON.stringify(initiated),
    			'projectInitiatedDateRelation':JSON.stringify(initiatedRelation),
    			'costcoDueDate':JSON.stringify(costco),
    			'costcoDueDateRelation':JSON.stringify(costcoRelation),
    			'scheduledStartDate':JSON.stringify(schStartDate),
    			'scheduledStartDateRelation':JSON.stringify(schStartDateRelation),
    			'scheduledTurnover':JSON.stringify(schTurnoverDate),
    			'scheduledTurnoverRelation':JSON.stringify(schTurnoverDateRelation),
    			'actualTurnover':JSON.stringify(actTurnoverDate),
    			'actualTurnoverRelation':JSON.stringify(actTurnoverDateRelation),
    			'onGoing':JSON.stringify(onGoing),
    			'onGoingRelation':JSON.stringify(onGoingRelation),
    			'title':title,
        };
   
    data['shownFields'] = selectedFields;	
    var params = $.param(data);
    document.location.href = REPORT_URL+"?"+params;
}

function checkAll()
{
	var checkboxes = $("#fieldPicker :checkbox");
	for (var i = 0; i < checkboxes.length; i++)
	{
			checkboxes[i].checked = true;
	}
}

function reportCreator(elem)
{
	switch(elem.value){
		case 'Active':
			generateReport($('.reportTypePicker :selected').val()+'_A');
			break;

		case 'Proposals':
			generateReport($('.reportTypePicker :selected').val()+'_P');
			break;

		case 'Inactive':
			generateReport($('.reportTypePicker :selected').val()+'_I');
			break;

		case 'Budgetary':
			generateReport($('.reportTypePicker :selected').val()+'_B');
			break;

		case 'Closed':
			generateReport($('.reportTypePicker :selected').val()+'_C');
			break;
	}
	/*if(elem.value == 'Active')
		generateReport($('.reportTypePicker :selected').val()+'_A');
	else if(elem.value == 'Proposals')
		generateReport($('.reportTypePicker :selected').val()+'_P');
	else if(elem.value == 'Inactive')
		generateReport($('.reportTypePicker :selected').val()+'_I');
	else if(elem.value == 'Budgetary')
		generateReport($('.reportTypePicker :selected').val()+'_B');
	else if(elem.value == 'Closed')
		generateReport($('.reportTypePicker :selected').val()+'_C');*/	
}

function generateReport(reportType)
{
	var genType = getAllSpecifiedFields(reportType);
	var selectedFields = JSON.stringify(genType);
	var warehouseIDs = new Array();
	var pClass = new Array();
	var item = new Array();
	var region = new Array();
	var status = new Array();
	var initiated = new Array();
	var initiatedRelation = new Array();
	var costco = new Array();
	var costcoRelation = new Array();
	var submitted = new Array();
	var submittedRelation = new Array();
	var schStartDate = new Array();
	var schStartDateRelation = new Array();
	var schTurnoverDate = new Array();
	var schTurnoverDateRelation = new Array();
	var actTurnoverDate = new Array();
	var actTurnoverDateRelation = new Array();
	var onGoing = new Array();
	var onGoingRelation = new Array();
	var pType = new Array();
	var stage = new Array();
    var manager = new Array();
	var title = undefined;
	
    console.log(paramNum);
	 for(var i = 0; i < paramNum;i++)
	    {
	    	var paramType = $('#param'+i).val();
	    	if($('#param'+i).parent().attr('class') == 'paramDateCell')
	    	{
			switch(paramType){
				case 'initiated':
	    				var valType = $('#val'+i).val();
	    				initiatedRelation.push(valType);			
	    				var date = $('#dateBox'+i).val();
	    				initiated.push(date);
	    				break;

	    			case 'costcoDueDate':
	    				var valType = $('#val'+i).val();
	    				costcoRelation.push(valType);
	    				var date = $('#dateBox'+i).val();
	    				costco.push(date);
	    				break;

	    			case 'proposalSubmitted':
	    				var valType = $('#val'+i).val();
	    				submittedRelation.push(valType);
	    				var date = $('#dateBox'+i).val();
	    				submitted.push(date);
	    				break;

	    			case 'scheduledStartDate':
    					var valType = $('#val'+i).val();
    					schStartDateRelation.push(valType);			
    					var date = $('#dateBox'+i).val();
    					schStartDate.push(date);
    					break;

    				case 'scheduledTurnover':
    					var valType = $('#val'+i).val();
    					schTurnoverDateRelation.push(valType);
    					var date = $('#dateBox'+i).val();
    					schTurnoverDate.push(date);
    					break;

    				case 'actualTurnover':
    					var valType = $('#val'+i).val();
    					actTurnoverDateRelation.push(valType);
    					var date = $('#dateBox'+i).val();
    					actTurnoverDate.push(date);
    					break;  

    				case 'onGoing':
					var valType = $('#val'+i).val();
					onGoingRelation.push(valType);
					var date = $('#dateBox'+i).val();
					onGoing.push(date);
					break;

			}
	    
	    	}
	    	else
	    	{

			switch(paramType){
				case 'region':
	    				var valType = $('#val'+i).val();
	    				region.push(valType);
	    				break;

	    			case 'warehouse':
	    				var valType = $('#val'+i).val();
	    				warehouseIDs.push(valType);
					break;

	    			case 'class':
	    				var valType = $('#val'+i).val();
					pClass.push(valType);
	    				break;

	    			case 'item':
	    				var valType = $('#val'+i).val();
	    				item.push(valType);
	    				break;

	    			case 'type':
	    				var valType = $('#val'+i).val();
	    				pType.push(valType);
	    				break;

	    			case 'status':
					var valType = $('#val'+i).val();
					status.push(valType);
					break;

	    			case 'stage':
	    				var valType = $('#val'+i).val();
	    				stage.push(valType);
					break;
                    
                    case 'person':
	    				var valType = $('#val'+i).val();
                        manager.push(valType);
	    				console.log(valType);

                        
                    case 'closeout':
	    				var valType = $('#val'+i).val();
	    				if(valType == "Inspection")
	    				{
	    					selectedFields = JSON.stringify(CLOSEOUT_KEYS_INSPECTIONS);
	    					switch(reportType)
	    					{
	    						case ACTIVE_CLOSEOUT:
		    	    				title = "Inspection Closeouts for Active Projects";
		    						break;
	    						
	    						case BUDGETARY_CLOSEOUT:
			    	    			title = "Inspection Closeouts for Budgetary Projects";
		    						break;
	    							
	    						case CLOSED_CLOSEOUT:
				    	    		title = "Inspection Closeouts for Closed Projects";
		    						break;
	    					}
	    				}
	    				if(valType == "Warranties")
	    				{
	    					selectedFields = JSON.stringify(CLOSEOUT_KEYS_WARRANTIES);
	    					switch(reportType)
	    					{
	    						case ACTIVE_CLOSEOUT:
		    	    				title = "Warranty Closeouts for Active Projects";
		    	    				break;
	    						
	    						case BUDGETARY_CLOSEOUT:
	    							title = "Warranty Closeout for Budgetary Projects";
	    						break;
	    							
	    						case CLOSED_CLOSEOUT:
			    	    		title = "Warranty Closeout For Closed Projects";
	    						break;
	    					}	    				
	    				}
	    				if(valType == "Liens")
	    				{
	    					selectedFields = JSON.stringify(CLOSEOUT_KEYS_LIENS);
	    					switch(reportType)
	    					{
	    						case ACTIVE_CLOSEOUT:
	    	    				title = "Liens Closeout Form for Active Projects";
	    						break;
	    						
	    						case BUDGETARY_CLOSEOUT:
		    	    			title = "Liens Closeout Form for Budgetary Projects";
	    						break;
	    							
	    						case CLOSED_CLOSEOUT:
			    	    		title = "Liens Closeout Form for Closed Projects";
	    						break;
	    					}
	    				}
			}

	    	}
	    }

	switch(reportType){
		case PROPOSAL_WEEKLY:
			stage.push(PROPOSAL_STAGE);
			title = "Weekly Proposals";
			break;
	
		case ACTIVE_WEEKLY:
			stage.push(ACTIVE_STAGE);
			title = "Weekly Active Projects";
			break;

		case BUDGETARY_WEEKLY:
			stage.push(BUDGETARY_STAGE);
			title="Weekly Budgetary Projects";
			break;

		case INACTIVE_WEEKLY:
			stage.push(INACTIVE_STAGE);
			title="Weekly Inactive Projects";
			break;

		case CLOSED_WEEKLY:
			stage.push(CLOSED_STAGE);
			title="Weekly Closed Projects";
			break;
	
		case PROPOSAL_STEVE_MEYER:
			stage.push(PROPOSAL_STAGE);
	 		title = "NE, SE, and PR Proposals";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			region.push("SE");
			region.push("PR");
			region.push("NE");
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL_TEMP);
			status.push(PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
			status.push(PROJECT_STATUS_BUDGETARY_SUBMITTED);
			break;
	
		case ACTIVE_STEVE_MEYER:
			stage.push(ACTIVE_STAGE);
			title = "NE, SE, and PR Active Projects";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			region.push("SE");
			region.push("PR");
			region.push("NE");
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_CONTRACT);
			status.push(PROJECT_STATUS_AWAITING_PO);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			break;
			
		case PROPOSAL_SE:
			stage.push(PROPOSAL_STAGE);
			title = "SE Refrigeration Proposals";
			region.push("PR");
			region.push("SE");
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_CR);
			pType.push(PROJECT_TYPE_CW);
			pType.push(PROJECT_TYPE_RS);
			break;
	
		case ACTIVE_SE:
			stage.push(ACTIVE_STAGE);
			title = "Active SE Refrigeration Projects";
			region.push("PR");
			region.push("SE");
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			status.push(PROJECT_STATUS_ON_HOLD);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_PO);
			//This status is to compensate for untransitioned projects
			//from the old On-Hold label to the new On Hold label
			status.push(16);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_CR);
			pType.push(PROJECT_TYPE_CW);

			break;
	
		case PROPOSAL_NE:
			stage.push(PROPOSAL_STAGE);
			title = "NE Refrigeration Proposals";
			region.push("NE");
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RS);

			break;
	
		case ACTIVE_NE:
			stage.push(ACTIVE_STAGE);
			title = "Active NE Refrigeration Projects";
			region.push("NE");
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			status.push(PROJECT_STATUS_ON_HOLD);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_PO);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			//This status is to compensate for untransitioned projects
			//from the old On-Hold label to the new On Hold label
			status.push(16);
			pType.push(PROJECT_TYPE_R);
			break;
	
		case PROPOSAL_J_DEMPSEY:
			stage.push(PROPOSAL_STAGE);
			title =	"SE and PR Proposals";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			region.push("SE");
			region.push("PR");
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL_TEMP);
			status.push(PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
			status.push(PROJECT_STATUS_BUDGETARY_SUBMITTED);
			break;
	
		case ACTIVE_J_DEMPSEY:
			stage.push(ACTIVE_STAGE);
			title = "SE and PR Active Projects";
			region.push("SE");
			region.push("PR");
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_CONTRACT);
			status.push(PROJECT_STATUS_AWAITING_PO);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_CW);
			pType.push(PROJECT_TYPE_R);
			break;
	
		case PROPOSAL_INVOICE_REPORT:
			stage.push(PROPOSAL_STAGE);
			title = "Invoice Report";
			break;

		case ACTIVE_INVOICE_REPORT:
			stage.push(ACTIVE_STAGE);
			title = "Invoice Report";
			break;
	
		case ACTIVE_COMPLETE_REPORT:
			stage.push(ACTIVE_STAGE);
			status.push(PROJECT_STATUS_COMPLETE);
			title = "Completed Actives Report";
			break;	

		case ACTIVE_CONSTRUCTION:
			stage.push(ACTIVE_STAGE);
			title = "Active Construction Projects";
			pType.push(PROJECT_TYPE_H);
			pType.push(PROJECT_TYPE_CW);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_RX);
			break;
			
		case PROPOSAL_CONSTRUCTION:
			stage.push(PROPOSAL_STAGE);
			title = "Proposal Construction Projects";
			pType.push(PROJECT_TYPE_H);
			pType.push(PROJECT_TYPE_CW);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_RX);
			break;

		case ACTIVE_HVAC:
			stage.push(ACTIVE_STAGE);
			title="Active HVAC Report";
			pType.push(PROJECT_TYPE_H);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			status.push(PROJECT_STATUS_ON_HOLD);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_AWAITING_PO);
			break;

		case PROPOSAL_HVAC:
			stage.push(PROPOSAL_STAGE);
			title="Proposal HVAC Report";
			pType.push(PROJECT_TYPE_H);
			break;

		case ACTIVE_REPAIR:
			stage.push(ACTIVE_STAGE);
			title = "Active Repair Projects";
			pType.push(PROJECT_TYPE_RM);
			pType.push(PROJECT_TYPE_OH);
			break;
			
		case PROPOSAL_RX:
			stage.push(PROPOSAL_STAGE);	
			title = "Proposal Rx Projects";
			//pType.push(PROJECT_TYPE_RX);
			 item.push(PROJECT_ITEM_PHARMACY);
			 item.push(PROJECT_ITEM_PHARMACY_SALES_COUNTER);
			 item.push(PROJECT_ITEM_PHARMACY_TRIPPLE_WINDOW);
			 item.push(PROJECT_ITEM_PHARMACY_LAMINATE_FLOOR);
			 item.push(PROJECT_ITEM_PHARMACY_FLOOR);
			break;
			
		case ACTIVE_RX :
			stage.push(ACTIVE_STAGE);
			title = "Active Rx Projects";
			 item.push(PROJECT_ITEM_PHARMACY);
			 item.push(PROJECT_ITEM_PHARMACY_SALES_COUNTER);
			 item.push(PROJECT_ITEM_PHARMACY_TRIPPLE_WINDOW);
			 item.push(PROJECT_ITEM_PHARMACY_LAMINATE_FLOOR);
			 item.push(PROJECT_ITEM_PHARMACY_FLOOR);
			//pType.push(PROJECT_TYPE_RX);
			break;
		case INACTIVE_RX :
			stage.push(INACTIVE_STAGE);
			title = "Inactive RX Projects";
			//pType.push(PROJECT_TYPE_RX);
			item.push(PROJECT_ITEM_PHARMACY);
			item.push(PROJECT_ITEM_PHARMACY_SALES_COUNTER);
			item.push(PROJECT_ITEM_PHARMACY_TRIPPLE_WINDOW);
			item.push(PROJECT_ITEM_PHARMACY_LAMINATE_FLOOR);
			item.push(PROJECT_ITEM_PHARMACY_FLOOR);
			
			break;
				
		case ACTIVE_CLOSEOUT:
			stage.push(ACTIVE_STAGE);
			if(title == undefined)
				title = "Closeout Summary for Active Projects";
			break;

		case BUDGETARY_CLOSEOUT:
			stage.push(BUDGETARY_STAGE);
			if(title == undefined)
				title="Closeout Summary for Budgetary Projects";
			break;
		case CLOSED_CLOSEOUT:
			stage.push(CLOSED_STAGE);
			if(title == undefined)
				title="Closeout Summary for Closed Projects";
			break;	
		
	
		default:
			alert("Invalid report type");
			return false;
			break;
	}
	

	if($('#reportTitle').val() != null && $('#reportTitle').val() != '')
	{
		title = $('#reportTitle').val();
	}
	var data = {
        		'domain': 'project',
    			'action': 'query',
    			'warehouse.id': JSON.stringify(warehouseIDs),
    			'stage.id':JSON.stringify(stage),
    			'projectClass.id':JSON.stringify(pClass),
    			'projectItem.id': JSON.stringify(item),
    			'projectType.id': JSON.stringify(pType),
    			'region.region':JSON.stringify(region),
    			'status.id':JSON.stringify(status),
    			'projectInitiatedDate':JSON.stringify(initiated),
    			'projectInitiatedDateRelation':JSON.stringify(initiatedRelation),
    			'costcoDueDate':JSON.stringify(costco),
    			'costcoDueDateRelation':JSON.stringify(costcoRelation),
    			'proposalSubmitted':JSON.stringify(submitted),
    			'proposalSubmittedRelation':JSON.stringify(submittedRelation),
    			'scheduledStartDate':JSON.stringify(schStartDate),
    			'scheduledStartDateRelation':JSON.stringify(schStartDateRelation),
    			'scheduledTurnover':JSON.stringify(schTurnoverDate),
    			'scheduledTurnoverRelation':JSON.stringify(schTurnoverDateRelation),
    			'actualTurnover':JSON.stringify(actTurnoverDate),
    			'actualTurnoverRelation':JSON.stringify(actTurnoverDateRelation),
    			'onGoing':JSON.stringify(onGoing),
    			'onGoingRelation':JSON.stringify(onGoingRelation),
                'projectManagers.id':JSON.stringify(manager),
    			'title':title,
        };
        
        console.log(data);
        data['shownFields'] = selectedFields;
        var params = $.param(data);
        console.log(REPORT_URL+"?"+params)
        document.location.href = REPORT_URL+"?"+params;
}

//This method un-checks all available check boxes in a given form
//Input: none
//Output: none
function uncheckAll()
{
	var checkboxes = $("#fieldPicker :checkbox");
	for (var i = 0; i < checkboxes.length; i++)
	{
			checkboxes[i].checked = false;
	}

}

//This function puts the names of all of the fields that will show up
//in the project support
function getAllSelectedFields()
{
	var checked = new Array();
	var checkboxes = $("#fieldPicker :checkbox");
	for (var i = 0; i < checkboxes.length; i++)
	{
		if($(checkboxes[i]).is(":checked"))
			checked.push(checkboxes[i].id);
	}
	return checked;
}

//This function gets fields based on the type of report that is selected
function getAllSpecifiedFields(reportType)
{
	var genType = new Array();

	switch(reportType)
	{
		case PROPOSAL_WEEKLY:
			genType=PROPOSAL_WEEKLY_KEYS;
			break;
		case ACTIVE_WEEKLY:
			genType=ACTIVE_WEEKLY_KEYS;
			break;
		case BUDGETARY_WEEKLY:
			genType=BUDGETARY_WEEKLY_KEYS;
			break;
		case INACTIVE_WEEKLY:
			genType=INACTIVE_WEEKLY_KEYS;
			break;
		case CLOSED_WEEKLY:
			genType=CLOSED_WEEKLY_KEYS;
			break;
		case PROPOSAL_J_DEMPSEY:
			genType=PROPOSAL_J_DEMPSEY_KEYS;
			break;
		case ACTIVE_SE:
		case ACTIVE_NE:
			genType=ACTIVE_SE_AND_NE_KEYS;
			break;
		case PROPOSAL_SE:
		case PROPOSAL_NE:
			genType=PROPOSAL_SE_AND_NE_KEYS;
			break;
		case ACTIVE_STEVE_MEYER:
		case ACTIVE_J_DEMPSEY:
			genType=ACTIVE_STEVE_MEYER_AND_J_DEMPSEY_KEYS;
			break;
		case PROPOSAL_STEVE_MEYER:
			genType=PROPOSAL_STEVE_MEYER_KEYS;
			break;
		case PROPOSAL_INVOICE_REPORT:
			genType=INVOICE_KEYS;
			break;
		case ACTIVE_INVOICE_REPORT:
			genType=INVOICE_KEYS;
			break;
		case ACTIVE_CONSTRUCTION:
			genType=ACTIVE_CONSTRUCTION_KEYS;
			break;
		case PROPOSAL_CONSTRUCTION:
			genType = ACTIVE_CONSTRUCTION_KEYS;
		case ACTIVE_REPAIR:
			genType=ACTIVE_REPAIR_KEYS;
			break;
		case ACTIVE_HVAC:
			genType=ACTIVE_WEEKLY_KEYS;
			break;
		case PROPOSAL_HVAC:
			genType=PROPOSAL_WEEKLY_KEYS;
			break;
		case ACTIVE_COMPLETE_REPORT:
			genType=ACTIVE_COMPLETE_KEYS
			break;
			
		case PROPOSAL_RX:
			genType=PROPOSAL_WEEKLY_KEYS;
			break;
			
		case ACTIVE_RX :
			genType=ACTIVE_WEEKLY_KEYS;
			break;
			
		case INACTIVE_RX :
			genType=INACTIVE_WEEKLY_KEYS;
			break;
			
		case CLOSED_RX:
			genType=CLOSED_WEEKLY_KEYS;
			break;
			
		case BUDGETARY_RX:
			genType=BUDGETARY_WEEKLY_KEYS;
			break;
			
		case ACTIVE_CLOSEOUT:
		case BUDGETARY_CLOSEOUT:
		case CLOSED_CLOSEOUT:
			genType=CLOSEOUT_KEYS_SIMPLE;
			break;
	
	}
	return genType;
};

function hasStage(stageList, stage)
{
	for(var i=0; i<stageList.length; i++)
	{
		if(stageList[i]==stage)
			return true;
	}

	return false;
}
