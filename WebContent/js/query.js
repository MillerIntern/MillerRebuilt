var ITEM_TYPES = ["warehouse", "stage", "item", "class", "type", "region", "status", "person", "closeout"];
var DATE_TYPES = ["initiated", "costcoDueDate", "proposalSubmitted", "scheduledStartDate", "scheduledTurnover", "actualTurnover", "onGoing"];
var DATE_RELATIONS = ["<", "=", ">"];
var BOOL_RELATIONS = ["and", "or"];
//var stages=["Active", "Budgetary", "Closed", "Proposal", "Inactive"];
var stages=["Active", "Budgetary", "Closed", "Proposal", "Canceled", "Billing Closeout", "Closeout"];
var CLOSEOUT_PARAMS = ["Inspection", "Warranties", "Liens"];

const REPORT_TYPES = ["All","Steve Meyer","South East Refrigeration","North East Refrigeration",
                      "J Dempsey", "Invoice", "Completed", "Construction", "Repair", "HVAC", "RX", 
                      "Closeout", "Meeting", "Service", "On Hold", "Permit Report", 'Inspection Report',
                      'Equipment Report', 'Change Order Report', "NE GC & Refrigeration", "SE GC & Refrigeration",
                      "Task","David Hearing Center", "Adrienne"];

const REPORT_URL = "Report";
const DATE_COMPARATORS = {"<":"Before", "=":"On",">":"After"};
const BOOL_COMPARATORS = {"and":"AND", "or":"OR"};

const FIELDS_TO_SHOW = {"mcsNum" : "MCS Number","stage": "Project Stage", "warehouse": "Warehouse", "item": "Project Item", 
			"scope": "Project Scope", "class": "Project Classification", "manager": "Project Manager", "supervisor": "Project Supervisor",
			"region": "Region", "status": "Project Status","scheduledStartDate": "Scheduled Start Date", 
			"scheduledTurnover" : "Scheduled Turn Over", "actualTurnover" : "Actual Turn Over", "initiated": "Project Initiated Date", 
			"siteSurvey" : "Site Survey", "budgetarySubmitted" : "Budgetary Submitted" , "budgetaryDue" : "Budgetary Due" , "costcoDueDate" : "Costco Due Date", "proposalSubmitted" : "Proposal Submitted", "type" : "Type", 
			"asBuilts" : "As-Builts", "punchList":"Punch List", "alarmHvacForm":"Alarm Form", "salvageValue" : "Salvage Value", 
			"airGas" : "Air Gas", "permitsClosed" : "Permits Closed", "verisaeShutdownReport" : "Verisae/Shut Down Report", 
			"shouldInvoice":"Should Invoice %", "invoiced":"Invoice %", "projectNotes" : "Project and Financial Notes", 
			"cost" : "Project Cost", "zachNotes" : "Refrigeration Notes", "custNum" : "Customer Number", "permitApp" : "Permit Application", 
			"person": "Project Manager", "closeout": "Closeout", 'equipment': "Equipment Report", 'change_order': 'Change Order Report',
			"task_title":"Task Title", "task_assignee":"Task Assignee", "task_description":"Task Description", "task_created_date":"Task Created Date", "task_due_date":"Task Due Date",
			"task_priority":"Task Priority", "task_notes":"Task Notes" , "task_status":"Task Status", 'warehouse_and_id':'Warehouse ID', 'invoice_number':'Invoice Number',
			"project_item":"Project Item"};

var REPORT_VALS = {"All":"WEEKLY","Steve Meyer":"STEVE_MEYER","South East Refrigeration":"SE","North East Refrigeration":"NE",
					"J Dempsey":"J_DEMPSEY","Invoice":"INVOICED", "Completed":"COMPLETED", "Construction":"CONSTRUCTION", 
					"Repair":"REPAIR", "HVAC" : "HVAC", "RX":"RX", "Closeout": "CLOSEOUT", "Meeting": "MEETING", "Service" : "OTHER", 
					"On Hold": "ON-HOLD", "Permit Report": "PERMIT", 'Inspection Report': "INSPECTIONS", 'Equipment Report': 'EQUIPMENT', 
					'NE GC & Refrigeration': 'NE_GC_REFRIGERATION', 'SE GC & Refrigeration': 'SE_GC_REFRIGERATION', 'Change Order Report': 'CO_REPORT',
					'Task': 'TASK', 'David Hearing Center':'DAVID_HAC', "Adrienne":"ADRIENNE"};

const PROPOSAL_STAGE = 1;
const ACTIVE_STAGE = 2;
const INACTIVE_STAGE=10;
const BUDGETARY_STAGE=8;
const CLOSED_STAGE=4;
const ON_HOLD_STAGE = 9;
const CANCELED_STAGE = 15;
const BILLING_CLOSEOUT_STAGE = 16;
const CLOSEOUT_STAGE = 17;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DATABASE CONSTANTS: These are used to access values by database ID, if they are changed in the DB, they must also be changed here

//PROJECT_TYPES
const PROJECT_TYPE_C = 1;
const PROJECT_TYPE_R = 6;
const PROJECT_TYPE_CR=3;
const PROJECT_TYPE_OH=2;
const PROJECT_TYPE_H=8;
const PROJECT_TYPE_RX = 9;
const PROJECT_TYPE_RR = 11;
const PROJECT_TYPE_BE=4;

//PROJECT_STATUSES
const PROJECT_STATUS_PREPARING_PROPOSAL = 1;
const PROJECT_STATUS_ON_HOLD = 2;
const PROJECT_STATUS_PROPOSAL_SUBMITTED = 3;
const PROJECT_STATUS_AWAITING_DIRECTION = 4;
const PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED = 6;
const PROJECT_STATUS_PROPOSAL_RESUBMITTED = 7;
const PROJECT_STATUS_REVISING_PROPOSAL = 8;
const PROJECT_STATUS_AWAITING_DRAWINGS = 11; //WAS 11 //line 1174
const PROJECT_STATUS_SITE_SURVEY = 12;
const PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS = 14;
const PROJECT_STATUS_CONFIRMING_SCOPE_SITE_SURVEY = 15;
const PROJECT_STATUS_AWAITING_REFRIGERATION_DRAWINGS = 17;
const PROJECT_STATUS_REVISING_PRICE = 18;
const PROJECT_STATUS_SCHEDULE_SITE_SURVEY = 19;
const PROJECT_STATUS_PERFORMING_SITE_SURVEY = 20;
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
const PROJECT_STATUS_AWAITING_BID_DOCUMENTS = 33;
const PROJECT_STATUS_LOST = 34;
const PROJECT_STATUS_CLOSEOUT = 35;
const PROJECT_STATUS_CLOSED = 36;

const CO_STATUS_PREPARING = 1;
const CO_STATUS_SUBMITTED = 2;
const CO_STATUS_APPROVED = 3;
const CO_STATUS_REJECTED = 4;
const CO_STATUS_COMPLETE = 5;
const CO_STATUS_REVIEW = 6;

//Project Classification
const PROJECT_CLASS_HVAC = 4;

const PROJECT_ITEM_PHARMACY = 153;
const PROJECT_ITEM_PHARMACY_SALES_COUNTER = 76;
const PROJECT_ITEM_PHARMACY_TRIPPLE_WINDOW = 154;
const PROJECT_ITEM_PHARMACY_LAMINATE_FLOOR = 209;
const PROJECT_ITEM_PHARMACY_FLOOR = 233;

const PROJECT_ITEM_HEARING_CENTER_AND_VAULT = 39;
const PROJECT_ITEM_HEARING_CENTER = 48;
const PROJECT_ITEM_HEARING_CENTER_AND_DEMO_ROOM = 49;
const PROJECT_ITEM_HEARING_CENTER_EXPANDED = 174;
const PROJECT_ITEM_HEARING_CENTER_AND_PHOTO = 315;
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Constants that are button passed arguments, must be consistent names sent from buttons

const PROPOSAL_WEEKLY = "WEEKLY_P";
const ACTIVE_WEEKLY = "WEEKLY_A";
const INACTIVE_WEEKLY = "WEEKLY_I";
const CLOSED_WEEKLY = "WEEKLY_C";
const BUDGETARY_WEEKLY = "WEEKLY_B";
const BILLING_CLOSEOUT_WEEKLY = "WEEKLY_BC";
const CLOSEOUT_WEEKLY = "WEEKLY_CO";

const ACTIVE_MEETING = "MEETING_A";
const OTHER_ACTIVE = "OTHER_A";
const PROPOSAL_MEETING = "MEETING_P";
const PROPOSAL_OTHER = "OTHER_P";
const BUDGETARY_MEETING = "MEETING_B";
const BUDGETARY_OTHER = "OTHER_B";
const ACTIVE_ON_HOLD = "ON-HOLD_A";
const PROPOSAL_ON_HOLD = 'ON-HOLD_P';
const BUDGETARY_ON_HOLD = 'ON-HOLD_B';
const BILLING_CLOSEOUT_MEETING = "MEETING_BC";
const CLOSEOUT_MEETING = "MEETING_CO";

const PROPOSAL_STEVE_MEYER = "STEVE_MEYER_P";
const ACTIVE_STEVE_MEYER = "STEVE_MEYER_A";
const INACTIVE_STEVE_MEYER = "STEVE_MEYER_I";
const CLOSED_STEVE_MEYER = "STEVE_MEYER_C";
const BUDGETARY_STEVE_MEYER = "STEVE_MEYER_B";
const BILLING_CLOSEOUT_STEVE_MEYER = "STEVE_MEYER_BC";
const CLOSEOUT_STEVE_MEYER = "STEVE_MEYER_CO";

const PROPOSAL_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_P";
const ACTIVE_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_A";
const INACTIVE_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_I";
const CLOSED_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_C";
const BUDGETARY_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_B";
const BILLING_CLOSEOUT_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_BC";
const CLOSEOUT_NE_GC_REFRIGERATION = "NE_GC_REFRIGERATION_CO";

const PROPOSAL_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_P";
const ACTIVE_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_A";
const INACTIVE_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_I";
const CLOSED_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_C";
const BUDGETARY_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_B";
const BILLING_CLOSEOUT_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_BC";
const CLOSEOUT_SE_GC_REFRIGERATION = "SE_GC_REFRIGERATION_CO";

const PROPOSAL_SE = "SE_P";
const ACTIVE_SE = "SE_A";
const INACTIVE_SE = "SE_I";
const CLOSED_SE = "SE_C";
const BUDGETARY_SE = "SE_B";
const BILLING_CLOSEOUT_SE = "SE_BC";
const CLOSEOUT_SE = "SE_CO";

const PROPOSAL_NE = "NE_P";
const ACTIVE_NE = "NE_A";
const INACTIVE_NE = "NE_I";
const CLOSED_NE = "NE_C";
const BUDGETARY_NE = "NE_B";
const BILLING_CLOSEOUT_NE = "NE_BC";
const CLOSEOUT_NE = "NE_CO";

const PROPOSAL_J_DEMPSEY = "J_DEMPSEY_P";
const ACTIVE_J_DEMPSEY = "J_DEMPSEY_A";
const INACTIVE_J_DEMPSEY = "J_DEMPSEY_I";
const CLOSED_J_DEMPSEY = "J_DEMPSEY_C";
const BUDGETARY_J_DEMPSEY = "J_DEMPSEY_B";
const BILLING_CLOSEOUT_J_DEMPSEY = "J_DEMPSEY_BC";
const CLOSEOUT_J_DEMPSEY = "J_DEMPSEY_CO";

const PROPOSAL_INVOICE_REPORT ="INVOICED_P";
const ACTIVE_INVOICE_REPORT ="INVOICED_A";
const INACTIVE_INVOICE_REPORT ="INVOICED_I";
const CLOSED_INVOICE_REPORT ="INVOICED_C";
const BUDGETARY_INVOICE_REPORT ="INVOICED_B";
const BILLING_CLOSEOUT_INVOICE_REPORT = "INVOICE_REPORT_BC";
const CLOSEOUT_INVOICE_REPORT = "INVOICE_REPORT_CO";

const PROPOSAL_CONSTRUCTION ="CONSTRUCTION_P";
const ACTIVE_CONSTRUCTION ="CONSTRUCTION_A";
const INACTIVE_CONSTRUCTION ="CONSTRUCTION_I";
const CLOSED_CONSTRUCTION ="CONSTRUCTION_C";
const BUDGETARY_CONSTRUCTION ="CONSTRUCTION_B";
const BILLING_CLOSEOUT_CONSTRUCTION = "CONSTRUCTION_BC";
const CLOSEOUT_CONSTRUCTION = "CONSTRUCTION_CO";

const PROPOSAL_REPAIR ="REPAIR_P";
const ACTIVE_REPAIR ="REPAIR_A";
const INACTIVE_REPAIR ="REPAIR_I";
const CLOSED_REPAIR ="REPAIR_C";
const BUDGETARY_REPAIR ="REPAIR_B";
const BILLING_CLOSEOUT_REPAIR = "REPAIR_BC";
const CLOSEOUT_REPAIR = "REPAIR_CO";

const PROPOSAL_HVAC ="HVAC_P";
const ACTIVE_HVAC ="HVAC_A";
const INACTIVE_HVAC ="HVAC_I";
const CLOSED_HVAC ="HVAC_C";
const BUDGETARY_HVAC ="HVAC_B";
const BILLING_CLOSEOUT_HVAC = "HVAC_BC";
const CLOSEOUT_HVAC = "HVAC_CO";

const PROPOSAL_RX ="RX_P";
const ACTIVE_RX ="RX_A";
const INACTIVE_RX ="RX_I";
const CLOSED_RX ="RX_C";
const BUDGETARY_RX ="RX_B";
const BILLING_CLOSEOUT_RX = "RX_BC";
const CLOSEOUT_RX = "RX_CO";

const ACTIVE_COMPLETE_REPORT ="COMPLETED_A";

const ACTIVE_CLOSEOUT = "CLOSEOUT_A";
const BUDGETARY_CLOSEOUT = "CLOSEOUT_B";
const CLOSED_CLOSEOUT = "CLOSEOUT_C";
const BILLING_CLOSEOUT_CLOSEOUT = "CLOSEOUT_BC";
const CLOSEOUT_CLOSEOUT = "CLOSEOUT_CO";

const PERMIT_ACTIVE = 'PERMIT_A';
const PERMIT_PROPOSAL = 'PERMIT_P';
const PERMIT_BUDGETARY = 'PERMIT_B';
const PERMIT_CLOSED = 'PERMIT_C';
const PERMIT_BILLING_CLOSEOUT = "PERMIT_BC";
const PERMIT_CLOSEOUT = "PERMIT_CO";

const INSPECTION_ACTIVE = 'INSPECTIONS_A';
const INSPECTION_PROPOSAL = 'INSPECTIONS_P';
const INSPECTION_BUDGETARY = 'INSPECTIONS_B';
const INSPECTION_CLOSED = 'INSPECTIONS_C';
const INSPECTION_BILLING_CLOSEOUT = "INSPECTION_BC";
const INSPECTION_CLOSEOUT = "INSPECTION_CO";

const EQUIPMENT_ACTIVE = 'EQUIPMENT_A';
const EQUIPMENT_PROPOSAL = 'EQUIPMENT_P';
const EQUIPMENT_BUDGETARY = 'EQUIPMENT_B';
const EQUIPMENT_CLOSED = 'EQUIPMENT_C';
const EQUIPMENT_BILLING_CLOSEOUT = "EQUIPMENT_BC";
const EQUIPMENT_CLOSEOUT = "EQUIPMENT_CO";

const CO_ACTIVE = 'CO_REPORT_A';
const CO_PROPOSAL = 'CO_REPORT_P';
const CO_BUDGETARY = 'CO_REPORT_B';
const CO_CLOSED = 'CO_REPORT_C';
const CO_BILLING_CLOSEOUT = "CO_REPORT_BC";
const CO_CLOSEOUT = "CO_REPORT_CO";

const CO_REVIEW = 'CO_REPORT_REVIEW';
const CO_PREPARING = 'CO_REPORT_PREPARING';
const CO_SUBMITTED = 'CO_REPORT_SUBMITTED';
const CO_APPROVED = 'CO_REPORT_APPROVED';
const CO_REJECTED = 'CO_REPORT_REJECTED';
const CO_COMPLETE = 'CO_REPORT_COMPLETE';

const CO_STATUSES = 'CO_STATUSES';


const TASK = 'TASK';

//Personal Reports
const DAVID_HAC_ACTIVE = 'DAVID_HAC_A';
const ADRIENNE = 'ADRIENNE';




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fields to show the fields required for weekly reports
const PROPOSAL_WEEKLY_KEYS = new Array("stage", "warehouse", "item","scope","class","manager", "supervisor", 
					"region", "status","initiated","siteSurvey","costcoDueDate","proposalSubmitted","type","projectNotes");

const ACTIVE_WEEKLY_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","class","manager", "supervisor", "region", 
									"status","scheduledStartDate","scheduledTurnover","actualTurnover",
									"type", "invoiced", "shouldInvoice", "projectNotes");


const INACTIVE_WEEKLY_KEYS = new Array("stage", "item","scope","status");


const BUDGETARY_WEEKLY_KEYS = new Array("stage", "warehouse", "item","scope","manager", "supervisor", 
		"region", "status","initiated","siteSurvey","budgetaryDue","budgetarySubmitted","type", "projectNotes");


const CLOSED_WEEKLY_KEYS = new Array("mcsNum", "stage", "warehouse", "item","scope","manager", "supervisor",
									"region", "status","initiated","type","costcoDueDate","proposalSubmitted",
									"scheduledStartDate", "scheduledTurnover", "asBuilts", "punchList", "alarmHvacForm",
									"permitsClosed","shouldInvoice","invoiced","projectNotes");

const BILLING_CLOSEOUT_WEEKLY_KEYS = new Array("stage", "item","scope","status");

const CLOSEOUT_WEEKLY_KEYS = new Array("stage", "item","scope","status");

//Fields to show with Steve Meyer and J Dempsey reports
const PROPOSAL_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", 
												"region", "status", "initiated","proposalSubmitted");
const ACTIVE_STEVE_MEYER_AND_J_DEMPSEY_KEYS = new Array("mcsNum","warehouse", "item","scope","class",
				"manager", "supervisor", "region", "status", "scheduledStartDate","scheduledTurnover");

const BILLING_CLOSEOUT_STEVE_MEYER_AND_J_DEMPSEY_KEYS = new Array("mcsNum","warehouse", "item","scope","class",
		"manager", "supervisor", "region", "status", "scheduledStartDate","scheduledTurnover");

const CLOSEOUT_STEVE_MEYER_AND_J_DEMPSEY_KEYS = new Array("mcsNum","warehouse", "item","scope","class",
		"manager", "supervisor", "region", "status", "scheduledStartDate","scheduledTurnover");

//Fields to show with Steve Meyer and J Dempsey reports
const GC_AND_REFRIGERATION_PROPOSAL_KEYS = new Array("warehouse", "item","scope","class",
												"region", "status", "initiated","proposalSubmitted");

const GC_AND_REFRIGERATION_ACTIVE_KEYS = new Array("mcsNum","warehouse", "item","scope","class",
									"region", "status", "scheduledStartDate","scheduledTurnover");

const INACTIVE_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor",
												"region", "status", "initiated","proposalSubmitted");

const BUDGETARY_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", 
													"region", "status", "initiated","proposalSubmitted");

const CLOSED_J_DEMPSEY_KEYS = new Array("warehouse", "item","scope","class","manager", "supervisor", "region", 
																	"status", "initiated","proposalSubmitted");

//NE and SE report keys
const PROPOSAL_SE_AND_NE_KEYS = new Array("warehouse_and_id", "item","scope","manager","supervisor", 
							"status", "permitApp", "initiated","costcoDueDate","proposalSubmitted", "zachNotes");
const ACTIVE_SE_AND_NE_KEYS = new Array("warehouse_and_id", "item","scope","manager","supervisor", 
							"status", "permitApp", "scheduledStartDate","scheduledTurnover","asBuilts","alarmHvacForm", "zachNotes");

const INACTIVE_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", 
							"status", "permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");

const BUDGETARY_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", 
							"status", "permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");

const CLOSED_SE_AND_NE_KEYS = new Array("warehouse", "item","scope", "region", "status", 
									"permitApp", "initiated","proposalSubmitted","asBuilts","salvageValue","alarmHvacForm", "zachNotes");


const PROPOSAL_STEVE_MEYER_KEYS = new Array("region", "item", "warehouse", "scope",
									"class","manager", "supervisor", "status", "initiated","proposalSubmitted");


//Fields to show with Invoice report
const INVOICE_KEYS = new Array("mcsNum","warehouse", "item","class","scheduledStartDate",
									"initiated", "scheduledTurnover", "actualTurnover", "invoiced", "shouldInvoice", "projectNotes");

const ACTIVE_CONSTRUCTION_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope",
								"class","manager", "supervisor", "region", "status","scheduledStartDate","scheduledTurnover","actualTurnover",
							  "type","asBuilts","punchList","alarmHvacForm","salvageValue","airGas","permitsClosed",
							  "verisaeShutdownReport", "invoiced", "shouldInvoice", "projectNotes");

const ACTIVE_REPAIR_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","class","manager", "supervisor", 
									"region", "status","scheduledStartDate","scheduledTurnover","actualTurnover",
									"type","asBuilts","punchList","alarmHvacForm","salvageValue","airGas","permitsClosed",
									"verisaeShutdownReport", "invoiced", "shouldInvoice", "projectNotes");


//Fields to show with HVAC report
const PROPOSAL_HVAC_KEYS = new Array("warehouse", "item","scope","region","status","initiated", 
									"siteSurvey", "costcoDueDate", "proposalSubmitted", "projectNotes");

const ACTIVE_HVAC_KEYS = new Array("warehouse", "item","scope","region","status", "scheduledStartDate", "projectNotes");


//Fields to show with Active/Complete report
const ACTIVE_COMPLETE_KEYS = new Array("mcsNum","warehouse", "item", "scope","region", "scheduledStartDate",
										"scheduledTurnover", "asBuilts", "punchList", "alarmHvacForm","permitsClosed",
										"shouldInvoice","invoiced","projectNotes");

// Fields available for the closeout report. Don't ever actually make this report. It doesn't look good.
const CLOSEOUT_KEYS_ALL = new Array("warehouse", "item", "status", "mechanicalFinal", "electricalFinal", "plumbingFinal", 
								"sprinkleFinal", "buildingFinal", "tmpCertificate", "certififcateFinal", "equipmentSubmittal", 
								"manuals", "punchList", "asBuiltDrawings", "closeoutPhotos", "hvacStartup", "alarmHvacForm", 
								"verisaeShutdownReport","mcsWarranty", "gcWarranty", "mechanicalWarranty", "electricalWarranty",
								"plumbingWarranty", "sprinklerWarranty", "roofingWarranty", "htiWarranty", "otherWarrantyA", 
								"otherWarrantyB", "mcsLiens", "gcLiens", "mechLiens", "elecLiens", "plumbLiens", 
								"sprinkleLiens", "roofingLiens", "htiLiens", "otherLiens", "numOfChanges", "numOfChangesCompleted");

const CLOSEOUT_KEYS_SIMPLE = new Array("warehouse", "mcsNum", "item", "equipmentSubmittal", "manuals", "punchList",
										"asBuiltDrawings", "closeoutPhotos", "hvacStartup", "alarmHvacForm", "verisaeShutdownReport", 
										"certificateOfSubstantialCompletion", "releaseOfLiens", 
										"mulvannyG2SignOff",
										"inspectionsRequired", "warrantiesRequired", 
										"liensRequired", "numOfChanges", "mg2Completion", 
										"closeoutDocumentNotes");

const CLOSEOUT_KEYS_INSPECTIONS = new Array("warehouse", "item", "status", "inspectionsRequired", "mechanicalFinal",
											"electricalFinal", "plumbingFinal", "sprinkleFinal", "buildingFinal", "tmpCertificate", 
											"certififcateFinal", "finalInspectionNotes");


const CLOSEOUT_KEYS_WARRANTIES = new Array("warehouse", "item", "status", "warrantiesRequired","mcsWarranty", 
										"gcWarranty", "mechanicalWarranty", "electricalWarranty", "plumbingWarranty", "sprinklerWarranty", 
										"roofingWarranty", "htiWarranty", "otherWarrantyA", "otherWarrantyB", "warrantyNotes");

const CLOSEOUT_KEYS_LIENS = new Array("warehouse", "item", "status","liensRequired", "mcsLiens", "gcLiens", 
										"mechLiens", "elecLiens", "plumbLiens", 
										"sprinkleLiens", "roofingLiens", "htiLiens", "otherLiens", "finalLiensNotes");

const PERMIT_KEYS = new Array('warehouse', 'item', 'status', 'buildingPermit', 'mechanicalPermit', 'electricalPermit', 
							'plumbingPermit', 'roofingPermit', 'sprinklerPermit', 'fireAlarmPermit', 'lowVoltagePermit', 'permitNotes');

const INSPECTION_KEYS = new Array('warehouse', 'item', 'status', 'buildingInspection', 'mechanicalInspection', 'electricalInspection',
									'plumbingInspection', 'roofingInspection', 'sprinklerInspection', 'fireAlarmInspection', 
									'lowVoltageInspection', 'inspectionNotes');

const EQUIPMENT_KEYS = new Array('equipmentName'); /* The system handles creating all of the keys but we only pass in one*/

const CO_KEYS = new Array('changeOrder');

const BART_KEYS = new Array('warehouse', 'item', 'status', 'buildingPermit', 'buildingNotes', 'roofingNotes');

const TASK_KEYS = new Array('warehouse', 'project_item', 'task_title','task_assignee','task_subassignee','task_description','task_created_date',
		                  'task_due_date', 'task_status', 'task_priority','task_notes');

const DAVID_HAC_KEYS = new Array('warehouse','item', 'scope','region','status',
		                         'scheduledStartDate','scheduledTurnover', 'buildingPermit', 'zachNotes');

const ADRIENNE_KEYS = new Array("mcsNum","stage", "warehouse", "item","scope","manager", "supervisor", "region", 
		"status","scheduledStartDate", "projectNotes");
  /* Actual keys would look like: warehouse, item, status, equipmentName, vendor, estDeliveryDate, actualDeliveryDate, notes*/

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
var assigneeNum = 0
var paramNum = 0;
let changeOrderStatuses = {
		"6" : false,
		"1" : false,
		"2" : false,
		"3" : false,
		"4" : false,
		"5" : false,
		"All" : false
};

let taskStatuses = {
		"1" : false,
		"2" : false,
		"3" : false,
		"All" : false
};



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
	getUserInfo();
	getMasterScopes();
});	

$(document).on('change', '.reportTypePicker',function(){
	console.log("value  == ", this.value);
	if(this.value == ADRIENNE) generateReport(ADRIENNE);
	else if(this.value == TASK) 
	{
		$('.taskStatusGroup').show(); 
		$('#taskStatusButton').show();
		
		$('.changeOrderStatusGroup').hide(); 
		$('#changeOrderButton').hide();
		
		$('.stageGroup').hide();
		
		$('.notCO').hide(); 
	}
	else if(this.value == "CO_REPORT") 
	{
		$('.changeOrderStatusGroup').show(); 
		$('#changeOrderButton').show();
		
		$('.taskStatusGroup').hide(); 
		$('#taskStatusButton').hide();
		
		$('.stageGroup').show();

		
		$('.notCO').hide(); 
	}
	else 
	{
		$('.changeOrderStatusGroup').hide(); 
		$('#changeOrderButton').hide();
		
		$('.taskStatusGroup').hide(); 
		$('#taskStatusButton').hide();
		
		$('.stageGroup').show();

		
		$('.notCO').show(); 
	}
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
			 if(user.permission.canAccessAdminPage == false)
				 hideAdminContent();	
			}
		});
}

function toggleChangeOrderStatus(status)
{
	
	if(status == "All")
	{
		let allStatus = $('.changeOrderStatusGroup').find('[value="All"]')[0].checked;
		console.log("ALL STATUS == ", allStatus);
		$('.changeOrderStatusGroup > input').each(function(i, obj) {
			if(allStatus == true) {obj.checked = true; changeOrderStatuses[obj.value] = true}
			else {obj.checked = false; changeOrderStatuses[obj.value] = false}
		});
	}
	else
	{
		let inputElement = $('.changeOrderStatusGroup').find('[value='+status+']')[0];
		if(inputElement.checked == true) changeOrderStatuses[inputElement.value] = true;
		else changeOrderStatuses[inputElement.value] = false;	
	}
	
	
}


$(document).on('change', '#assignee' + assigneeNum, function(){
	   console.log(this.value);	
	   console.log(this.childNodes);
	})

function addAssignee()
{
	var data = managerOptions;
//	console.log(data);
		
	var div = document.getElementById("assignees");
	var cell = document.createElement("div");
	cell.className = 'assigneeCell';
	
	var title = document.createElement("p");
	title.innerHTML = "Assignee: ";
	
	var select = document.createElement("select");
	select.id = ('assignee' + assigneeNum);

	
	var def = document.createElement("option");
	def.value = 'default';
	def.className = 'default';
	def.innerHTML = "Select an Assignee";
	select.appendChild(def);
	
	var all = document.createElement("option");
	all.value = 'all';
	all.innerHTML = 'All';
	select.appendChild(all)
	
	var person = data.childNodes;
    
    for(var i = 0; i < person.length; i++)
    {
    	if(person[i] == "Bart")
    		continue;
    	select.appendChild(person[i].cloneNode(true));
    }
    
//    var spaceTag = document.createElement("span");
//	spaceTag.className = "tab";
	
	//create the remove tag for the param cell
	var removeTag = document.createElement("span");
	removeTag.className = 'glyphicon glyphicon-remove';
	removeTag.onclick = function() {removeAssignee(this)};
    
	div.appendChild(cell)
    cell.appendChild(title);
    title.appendChild(select);
//    title.appendChild(spaceTag);
    title.appendChild(removeTag);
    
    assigneeNum++;
}

function removeAssignee(elem)
{
	elem.parentNode.remove();
	assigneeNum--;
}

function toggleTaskStatus(status)
{
	
	if(status == "All")
	{
		let allStatus = $('.taskStatusGroup').find('[value="All"]')[0].checked;
		console.log("ALL STATUS == ", allStatus);
		$('.taskStatusGroup > input').each(function(i, obj) {
			if(allStatus == true) {obj.checked = true; taskStatuses[obj.value] = true}
			else {obj.checked = false; taskStatuses[obj.value] = false}
		});
	}
	else
	{
		let inputElement = $('.taskStatusGroup').find('[value='+status+']')[0];
		if(inputElement.checked == true) taskStatuses[inputElement.value] = true;
		else taskStatuses[inputElement.value] = false;	
	}
	
	
}
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
	if(className == "meeting")
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
			if(json[i].state && (json[i].state == "UNKNOWN" || json[i].state == "Unknown")) 
			{
				option.innerHTML = json[i].city.name + ", " + json[i].region;
			}
			else
			{
				option.innerHTML = json[i].city.name + ", " + toTitleCase(json[i].state.replace('_', ' '));
			}
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
		else if(className == "person")
		{
			//console.log(json[i]);
			if(json[i].name == "Bart") // || json[i].name == "bua2")
				continue;
			else
			{
				option.innerHTML = json[i].name;
				option.setAttribute("value", json[i].id);
			}
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
	
	var spaceTag = document.createElement("span");
	spaceTag.className = "tab";
	
	//create the remove tag for the param cell
	var removeTag = document.createElement("span");
	removeTag.className = 'glyphicon glyphicon-remove';
	removeTag.onclick = function() {removeParam(this)};
	//removeTag.innerHTML = '&nbsp;&nbsp;&nbsp;X';
	
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
	paraCell.appendChild(spaceTag);
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
	{	
		console.log(ITEM_TYPES[i] + " : " + FIELDS_TO_SHOW[ITEM_TYPES[i]]);
		option += '<option value="'+ ITEM_TYPES[i] + '">' + FIELDS_TO_SHOW[ITEM_TYPES[i]] + '</option>';
	}
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
			"<select class='drop params' id ='param" + paramNum + "'><option value='none'>Select Date Type</option></select><span class='tab'></span><span class='remove glyphicon glyphicon-remove' onclick='removeParam(this)'></span></br>" +	    	
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
		if(value.indexOf("Task") !== -1) return;
		if(value == "Project Manager" && key == "person") return;
		if(value == "Closeout") return;
		if(value == "Equipment Report") return;
		if(value == "Change Order Report") return;
		if(value == "Invoice Number") return;
		
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
	var manager = new Array();
	var title = $('#reportTitle').val();
	
	console.log("Param  Num: ", paramNum);
	
		
	
    
    for(var i = 0; i < paramNum;i++)
    {
    	
    	var paramType = $('#param'+i).val();
    	console.log("Param Num: ", i);
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
    	console.log("PARAM TYPE = ", paramType);
		switch(paramType){
			
			case 'region':
    				var valType = $('#val'+i).val();
    				region.push(valType);
    				break;

    			case 'warehouse':
    				var valType = $('#val'+i).val();
    				console.log("Warehouse Val: ", valType);
    				warehouseIDs.push(valType);
				break;

    			case 'class':
    				var valType = $('#val'+i).val();
				pClass.push(valType);
    				break;

    			case 'item':
    				var valType = $('#val'+i).val();
    				console.log("Item Val: ", valType);
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
    				console.log("Stage Val: ", valType);
    				stage.push(valType);
				break;
				
    			case 'person':
    				var valType = $('#val'+i).val();
                    manager.push(valType);
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
    			'type' : 'freeQuery',
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
    			'projectManagers.id':JSON.stringify(manager),
    			'title':title,
        };
   
    data['shownFields'] = selectedFields;	
    console.log("selected fields equals to....  ", selectedFields);
    var params = $.param(data);
    
    if(confirm("WAIT"))
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
	console.log("elem = ", elem.value);
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
		case 'Closeout':
			generateReport($('.reportTypePicker :selected').val()+'_CO');
			break;
		case 'Billing Closeout':
			generateReport($('.reportTypePicker :selected').val()+'_BC');
			break;
		case TASK:
			generateTaskReport($('.reportTypePicker :selected').val());
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

function generateTaskReport(reportType){
    
	console.log("report type == ", reportType);
	var genType = getAllSpecifiedFields(reportType);
	var selectedFields = JSON.stringify(genType);
	console.log(selectedFields);
	var title = undefined;
	var managers = new Array();
	var div = document.getElementById("assignees");
	var assignees = div.childNodes;
	console.log(assignees.length);
	

	switch(reportType){
		case TASK:
			title = 'Tasks for All Projects';
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
	
	
	let taskStatusString = '';
	
	if(taskStatuses["1"] == true)
		taskStatusString += "1";
	if(taskStatuses["2"] == true)
		taskStatusString += "2";
	if(taskStatuses["3"] == true)
		taskStatusString += "3";
	
	if(taskStatusString == '') {
		alert("Must select at least one status in order to generate a task report");
		return;
	}
	console.log(taskStatusString);

	
	let assigneeString = '';
	var assignee;
	
	for(var i = 0; i < assigneeNum; i++)
	{
	  assignee = ( $('#assignee' + i).val());
	  console.log(assignee);
	  
	  if(assignee == "default")
	  {
		  alert("Please select an assignee or remove the default assignee field using the X");
		  return;
	  }	  
	  
	  if(assignee == "all")
		  assigneeString = 'all';
	  else
		  assigneeString += (assignee + " ");
	  
	}
	
	if(assigneeString == '' || assigneeString == null)
	{
		assigneeString = 'all';
	}	
	
	if(assigneeString != 'all')
		title = "Tasks for Specific Assignees";
		
	
	// 'mcsNum','task_title','task_assignee','task_description','task_created_date',
	// 'task_due_date','task_priority','task_notes'
	var data = {
			'domain': 'task',
			'action': 'query', 
			'task_title': title,
			'task_assignee': assigneeString,
			'task_statuses' : taskStatusString
	};
	
	console.log(data);
	data['shownFields'] = selectedFields;
	console.log("selected fields == ", selectedFields);
	var params = $.param(data);
	console.log("data is ", data);
	console.log("params are ", params);
	console.log(REPORT_URL+"?"+params);
	
	taskStatuses["1"] = false;
	taskStatuses["2"] = false;
	taskStatuses["3"] = false;
	
	$('.taskStatusGroup').find('input').each(function(){
	    this.checked = false;;
	})
	
//    $('#assignees').find('select').each(function(){
//    	this.value = "default";
//    })
//	

	document.location.href = REPORT_URL+"?"+params;

}

	


function generateReport(reportType)
{
	console.log(reportType);
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
    var closeoutStatus = new Array();
	var title = undefined;
	var type = undefined;
	
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
			title = "All Proposals";
			break;
			
		case PROPOSAL_MEETING:
			stage.push(PROPOSAL_STAGE);
			title = "Meeting Proposals";
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			break;
	
		case PROPOSAL_OTHER:
			stage.push(PROPOSAL_STAGE);
			title = "Refrigeration and Construction Service Proposals";
			pType.push(PROJECT_TYPE_CR);
			pType.push(PROJECT_TYPE_RR);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			break;
		
		case PROPOSAL_ON_HOLD:
			stage.push(PROPOSAL_STAGE);
			title = "On Hold Proposals";
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			break;
		case ACTIVE_WEEKLY:
			stage.push(ACTIVE_STAGE);
			title = "Active Projects";
			break;
			
		case ACTIVE_MEETING:
			title = "Meeting Active Projects";
			stage.push(ACTIVE_STAGE);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			status.push(PROJECT_STATUS_CLOSEOUT);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_CONTRACT);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			break;

		case OTHER_ACTIVE:
			title = "Refrigeration and Construction Service Active Projects";
			stage.push(ACTIVE_STAGE);
			pType.push(PROJECT_TYPE_CR);
			pType.push(PROJECT_TYPE_RR);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_CONTRACT);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			break;
		case ACTIVE_ON_HOLD:
			stage.push(ACTIVE_STAGE);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			title = "On Hold Active Projects";
			break;
			
		case BUDGETARY_WEEKLY:
			stage.push(BUDGETARY_STAGE);
			title="All Budgetary Projects";
			break;

		case BUDGETARY_MEETING:
			stage.push(BUDGETARY_STAGE);
			title="Meeting Budgetary Projects";
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			break;
			
		case BUDGETARY_OTHER:
			stage.push(BUDGETARY_STAGE);
			title="Budgetary Projects";
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			break;
		case BUDGETARY_ON_HOLD:
			stage.push(BUDGETARY_STAGE);
			title="On Hold Budgetary Projects";
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			break;
		case INACTIVE_WEEKLY:
			stage.push(INACTIVE_STAGE);
			title="Weekly Inactive Projects";
			break;

		case CLOSED_WEEKLY:
			stage.push(CLOSED_STAGE);
			title="Weekly Closed Projects";
			break;
	
		case BILLING_CLOSEOUT_STEVE_MEYER:
		case CLOSEOUT_STEVE_MEYER:
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
			status.push(PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			//status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
			break;
		
		case PROPOSAL_SE_GC_REFRIGERATION:
			stage.push(PROPOSAL_STAGE);
	 		title = "SE GC & Refrigeration Project Proposals";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			region.push("SE");

			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			//status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
			break;
			
		case PROPOSAL_NE_GC_REFRIGERATION:
			stage.push(PROPOSAL_STAGE);
	 		title = "NE GC & Refrigeration Project Proposals";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			region.push("NE");

			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_REVISED_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			//status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
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
		
		case ACTIVE_SE_GC_REFRIGERATION:
			stage.push(ACTIVE_STAGE);
			title = "SE GC & Refrigeration Active Projects";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
			region.push("SE");
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_CONTRACT);
			status.push(PROJECT_STATUS_AWAITING_PO);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			break;
		
		case ACTIVE_NE_GC_REFRIGERATION:
			stage.push(ACTIVE_STAGE);
			title = "NE GC & Refrigeration Active Projects";
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_RX);
			pType.push(PROJECT_TYPE_H);
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
			break;
	
		case ACTIVE_SE:
			stage.push(ACTIVE_STAGE);
			title = "Active SE Refrigeration Projects";
			region.push("PR");
			region.push("SE");
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			//status.push(PROJECT_STATUS_ON_HOLD);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_PO);
			//This status is to compensate for untransitioned projects
			//from the old On-Hold label to the new On Hold label
			status.push(16);
			pType.push(PROJECT_TYPE_R);
			pType.push(PROJECT_TYPE_CR);

			break;
	
		case PROPOSAL_NE:
			stage.push(PROPOSAL_STAGE);
			title = "NE Refrigeration Proposals";
			region.push("NE");
			pType.push(PROJECT_TYPE_R);

			break;
	
		case ACTIVE_NE:
			stage.push(ACTIVE_STAGE);
			title = "Active NE Refrigeration Projects";
			region.push("NE");
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			//status.push(PROJECT_STATUS_ON_HOLD);
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
			//status.push(PROJECT_STATUS_SITE_SURVEY);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_ENGINEERING_REPORTS);
			status.push(PROJECT_STATUS_PROPOSAL_RESUBMITTED);
			status.push(PROJECT_STATUS_UPDATING_PROPOSAL);
			status.push(PROJECT_STATUS_UPDATED_PROPOSAL);
			status.push(PROJECT_STATUS_PERFORMING_SITE_SURVEY);
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
			status.push(PROJECT_STATUS_CLOSEOUT);
			title = "Completed Actives Report";
			break;	

		case ACTIVE_CONSTRUCTION:
			stage.push(ACTIVE_STAGE);
			title = "Active Construction Projects";
			pType.push(PROJECT_TYPE_H);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_RX);
			break;
			
		case PROPOSAL_CONSTRUCTION:
			stage.push(PROPOSAL_STAGE);
			title = "Proposal Construction Projects";
			pType.push(PROJECT_TYPE_H);
			pType.push(PROJECT_TYPE_C);
			pType.push(PROJECT_TYPE_RX);
			break;

		case ACTIVE_HVAC:
			stage.push(ACTIVE_STAGE);
			title="Active HVAC Report";
			pType.push(PROJECT_TYPE_H);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			//status.push(PROJECT_STATUS_ON_HOLD);
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
			
			status.push(PROJECT_STATUS_CLOSEOUT);
			break;

		case BUDGETARY_CLOSEOUT:
			stage.push(BUDGETARY_STAGE);
			if(title == undefined)
				title="Closeout Summary for Budgetary Projects";
			
			status.push(PROJECT_STATUS_CLOSEOUT);
			break;
		case CLOSED_CLOSEOUT:
			stage.push(CLOSED_STAGE);
			if(title == undefined)
				title="Closeout Summary for Closed Projects";
			
			status.push(PROJECT_STATUS_CLOSEOUT);
			break;	
		case PERMIT_ACTIVE:

			status.push(PROJECT_STATUS_SCHEDULING); 
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			stage.push(ACTIVE_STAGE);
			//status.push(PROJECT_STATUS_AWAITING_PERMIT);

			title = "Permits for Active Projects";

			break;
		case PERMIT_PROPOSAL:
			stage.push(PROPOSAL_STAGE);
			//status.push(PROJECT_STATUS_AWAITING_PERMIT);
			/*
			 * TODO: Change this up to be what the meeting report is, and have the BART report (Awaiting Permit) be something else.
			 */
			title = "Permits for Proposals";
			break;
		case PERMIT_BUDGETARY:
			stage.push(BUDGETARY_STAGE);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			title = "Permits for Budgetary Projects";
			break;
		case PERMIT_CLOSED:
			stage.push(CLOSED_STAGE);
			title = "Permits for Closed Projects";
			break;
		case INSPECTION_ACTIVE:
			stage.push(ACTIVE_STAGE);
			title = "Inspections for Active Projects";
			break;
		case INSPECTION_PROPOSAL:
			stage.push(PROPOSAL_STAGE);
			title = "Inspections for Proposals";
			break;
		case INSPECTION_BUDGETARY:
			stage.push(BUDGETARY_STAGE);
			title = "Inspections for Budgetary Projects";
			break;
		case INSPECTION_CLOSED:
			stage.push(CLOSED_STAGE);
			title = "Inspections for Closed Projects";
			break;
	
		case EQUIPMENT_ACTIVE:
			stage.push(ACTIVE_STAGE);
			title = 'Equipment for Active Projects';
			break;
		case EQUIPMENT_PROPOSAL:
			stage.push(PROPOSAL_STAGE);
			title = "Equipment for Proposals";
			break;
		case EQUIPMENT_BUDGETARY:
			stage.push(BUDGETARY_STAGE);
			title = "Equipment for Budgetary Projects";
			break;
		case EQUIPMENT_CLOSED:
			stage.push(CLOSED_STAGE);
			title = "Equipment for Closed Projects";
			break;
		case CO_ACTIVE:
			stage.push(ACTIVE_STAGE);
			title = 'Change Orders for Active Projects';
			break;
		case CO_PROPOSAL:
			stage.push(PROPOSAL_STAGE);
			title = 'Change Orders for Project Proposals';
			break;
		case CO_BUDGETARY:
			stage.push(BUDGETARY_STAGE);
			title = 'Change Orders for Budgetary Projects';
			break;
		case CO_CLOSED:
			stage.push(CLOSED_STAGE);
			title = 'Change Orders for Closed Projects';
			break;
		case CO_BILLING_CLOSEOUT:
			stage.push(BILLING_CLOSEOUT_STAGE);
			title = 'Change Orders for Billing Closeout Projects';
			break;
		case CO_CLOSEOUT:
			stage.push(CLOSEOUT_STAGE);
			title = 'Change Orders for Closeout Projects';
			break;
		case CO_STATUSES:
			status = new Array();
			
			$(".changeOrderStatusGroup > input").each(function(i, obj){
				if(obj.checked == true && obj.value != "All") status.push(obj.value);
			});

			title = 'Change Orders';
			type = 'ChangeOrderStatuses';
			break;
			
		case TASK:
			title = 'Tasks for All Projects';
			//stage.push(ACTIVE_STAGE);
			break;
			
		case DAVID_HAC_ACTIVE:
			title = "Hearing Center Report";
			stage.push(ACTIVE_STAGE);
			stage.push(PROPOSAL_STAGE);
			//status.push(PROJECT_STATUS_ON_HOLD);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_AWAITING_DIRECTION);
			status.push(PROJECT_STATUS_AWAITING_DRAWINGS);
			status.push(PROJECT_STATUS_SCHEDULING);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_AWAITING_PERMIT);
			//status.push(PROJECT_STATUS_CLOSEOUT);
			item.push(PROJECT_ITEM_HEARING_CENTER);
			item.push(PROJECT_ITEM_HEARING_CENTER_AND_DEMO_ROOM);
			item.push(PROJECT_ITEM_HEARING_CENTER_EXPANDED);
			item.push(PROJECT_ITEM_HEARING_CENTER_AND_PHOTO);
			break;
		case ADRIENNE:
			title = "Adrienne's Report";
			stage.push(ACTIVE_STAGE);
			stage.push(PROPOSAL_STAGE);
			status.push(PROJECT_STATUS_PREPARING_PROPOSAL);
			status.push(PROJECT_STATUS_PROPOSAL_SUBMITTED);
			status.push(PROJECT_STATUS_SCHEDULED);
			status.push(PROJECT_STATUS_SCHEDULING);
			
			manager.push(17);
			break;
		case BILLING_CLOSEOUT_WEEKLY:
			title = "Billing Closeout";
			stage.push(BILLING_CLOSEOUT_STAGE);
		    break;
		case CLOSEOUT_WEEKLY:
			title = "Closeout";
			stage.push(CLOSEOUT_STAGE);
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
    			'type': type,
    			'closeoutStatus' : JSON.stringify(closeoutStatus)
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
		case PROPOSAL_OTHER:
		case PROPOSAL_MEETING:
		case PROPOSAL_WEEKLY:
		case PROPOSAL_ON_HOLD:
			genType=PROPOSAL_WEEKLY_KEYS;
			break;
		case OTHER_ACTIVE:
		case ACTIVE_MEETING: 
		case ACTIVE_WEEKLY:
		case ACTIVE_ON_HOLD:
			genType=ACTIVE_WEEKLY_KEYS;
			break;
		case BUDGETARY_MEETING:
		case BUDGETARY_OTHER:
		case BUDGETARY_WEEKLY:
		case BUDGETARY_ON_HOLD:
			genType=BUDGETARY_WEEKLY_KEYS;
			break;
		case INACTIVE_WEEKLY:
			genType=INACTIVE_WEEKLY_KEYS;
			break;
		case CLOSED_WEEKLY:
			genType=CLOSED_WEEKLY_KEYS;
			break;
		case BILLING_CLOSEOUT_WEEKLY:
			genType = BILLING_CLOSEOUT_WEEKLY_KEYS;
			break;
		case CLOSEOUT_WEEKLY:
			genType = CLOSEOUT_WEEKLY_KEYS;
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
		case ACTIVE_NE_GC_REFRIGERATION:
		case ACTIVE_SE_GC_REFRIGERATION:
			genType = GC_AND_REFRIGERATION_ACTIVE_KEYS;
			break;
		case PROPOSAL_NE_GC_REFRIGERATION:
		case PROPOSAL_SE_GC_REFRIGERATION:
			genType = GC_AND_REFRIGERATION_PROPOSAL_KEYS;
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
		case BILLING_CLOSEOUT_CLOSEOUT:
		case CLOSEOUT_CLOSEOUT:
			genType=CLOSEOUT_KEYS_SIMPLE;
			break;
		case PERMIT_ACTIVE:
		case PERMIT_PROPOSAL:
		case PERMIT_BUDGETARY:
		case PERMIT_CLOSED:
		case PERMIT_BILLING_CLOSEOUT:
		case PERMIT_CLOSEOUT:
			genType = PERMIT_KEYS;
			break;
		case INSPECTION_ACTIVE:
		case INSPECTION_PROPOSAL:
		case INSPECTION_BUDGETARY:
		case INSPECTION_CLOSED:
		case INSPECTION_CLOSEOUT:
		case INSPECTION_BILLING_CLOSEOUT:
			genType = INSPECTION_KEYS;
			break;
		case EQUIPMENT_ACTIVE:
		case EQUIPMENT_PROPOSAL:
		case EQUIPMENT_BUDGETARY:
		case EQUIPMENT_CLOSED:
		case EQUIPMENT_CLOSEOUT:
		case EQUIPMENT_BILLING_CLOSEOUT:
			genType = EQUIPMENT_KEYS;
			break;
		case CO_ACTIVE:
		case CO_PROPOSAL:
		case CO_BUDGETARY:
		case CO_CLOSED:
		case CO_CLOSEOUT:
		case CO_BILLING_CLOSEOUT:
			genType = CO_KEYS;
			break;
		case TASK:
			genType = TASK_KEYS;
			break;
		case DAVID_HAC_ACTIVE:
			genType = DAVID_HAC_KEYS;
			break;
		case ADRIENNE:
			genType = ADRIENNE_KEYS;
			break;
		case BILLING_CLOSEOUT_STEVE_MEYER:
			genType = ACTIVE_STEVE_MEYER_AND_J_DEMPSEY_KEYS;
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
