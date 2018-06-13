let AUTO_FILL_OBJECT = {
		PERMITS : false ,
		INSPECTIONS : false ,
		FINAL_INSPECTIONS : false,
		HVAC : false ,
		REFRIGERATION : false ,
		AIA : false
};

//var closeoutDocs = document.getElementById("closeoutDocuments").addEventListener("focus", autofillCloseoutDocs); 

//
//$(document).ready(function(){$('generalInformationTable').change(function(){
//	
//	autofillCloseoutDocs();
//
//})});

$(document).ready(function(){$('#autofill-HVAC').change(function(){
	if($(this).val() == "default") return;
	
	AUTO_FILL_OBJECT.HVAC = true;
	autofillHVAC();
})});

$(document).ready(function(){$('#autofill-Refrigeration').change(function(){
	if($(this).val() == "default") return;
	
	AUTO_FILL_OBJECT.REFRIGERATION = true;
	autofillRefrigeration();
})});

$(document).ready(function(){$('#autofill-Permits').change(function(){
	if($(this).val() == "default") return;
	
	AUTO_FILL_OBJECT.PERMITS = true;
	AUTO_FILL_OBJECT.INSPECTIONS = true;
	AUTO_FILL_OBJECT.FINAL_INSPECTIONS = true;

	autofillPermits();
	autofillInspections();
	autofillFinalInspections();
})});

$(document).ready(function(){$('#class').change(function(){
	if($(this).val() == "default") return;
	
	AUTO_FILL_OBJECT.AIA = true;
	
	autofillCloseoutDocs();
	autofillCloseout();
})});



let TODAYS_DATE = getTodaysDate();

function autofillHVAC()
{
	console.log("Autofill HVAC");
	let required = $('#autofill-HVAC').val();
	//if(required == "default") return;
	
	let REQUIRED = 4; //Correspond to id in database for closeoutstatus (Required)
	let NA = 3; //Correspond to id in database for closeoutstatus (N/A)
	let TBD = 6;
	
	let value;
	if(required == 0)
		value = NA;
	else if(required == 1)
		value = REQUIRED;
	else
		value = TBD;
	
	$('.autofill-HVAC').each(function(index){
		$(this).val(value);
	});
	
	$('.autofill-HVAC-date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
	
	
}

function autofillRefrigeration()
{
	console.log("Autofill Ref");
	
	let required = $('#autofill-Refrigeration').val();
	//if(required == "default") return;
	
	let REQUIRED = 4; //Correspond to id in database for closeoutstatus (Required)
	let NA = 3; //Correspond to id in database for closeoutstatus (N/A)
	let TBD = 6;
	
	let value;
	if(required == 0)
		value = NA;
	else if(required == 1)
		value = REQUIRED;
	else if(required == "default")
		value = TBD;
	
	
	$('.autofill-Refrigeration').each(function(index){
		$(this).val(value);
	});
	
	$('.autofill-Refrigeration-date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
	
	let html;
	if(required == 1) {
		value = 0;
		html = 0;
	}
	else if(required == 0) {
		value = -1;
		html = "N/A";
	}
	else {
		value = -2;
		html = "TBD";
	}
	
	$('.autofill-Refrigeration-num').each(function(index){
    	$(this).val(html);
		$(this).html(html);
	});
		
}

function autofillCloseoutDocs()
{
	console.log("Autofill Closeout Docs");
	
	let required = $('#class').val();
	
	let REQUIRED = 4; 
	let NA = 3; 
	let TBD = 6;
	
    let value; 
    if(required == 2)
		value = REQUIRED;
    else 
    	value = NA;
      
    $('.autofill-CloseoutDocs').each(function(index){
		$(this).val(value);
	});
   
    $('.autofill-CloseoutDocs-Date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
}

function autofillCloseout()
{
	console.log("Autofill Closeout");
	
	let required = $('#class').val();
	
	let REQUIRED = 4; 
	let NA = 3; 
	let TBD = 6;
	
    let value; 
    if(required == 2)
		value = TBD;
    else 
    	value = TBD;
      
    $('.autofill-Closeout').each(function(index){
		$(this).val(value);
	});
   
    $('.autofill-Closeout-Date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
}

function autofillPermits()
{
	console.log("Autofill Permits");

	let required = $('#autofill-Permits').val();
    
	
	let PREPARING = "Preparing"; //Correspond to id in database for closeoutstatus (Required)
	let NA = "N/A"; //Correspond to id in database for closeoutstatus (N/A)
	let TBD_STATUS = "TBD";
	
	let YES = 0;
	let NO = 1;
	let TBD = 2;
		
	let permitStatusRequirementValue;
	let permitStatusValue;
	let permitTableReq;
	
	if(required == YES) 
	{
		permitStatusValue = PREPARING;
		permitStatusRequirementValue = YES;
		permitTableReq = "Yes";
	} 
	else if(required == NO) 
	{
		permitStatusValue = NA;
		permitStatusRequirementValue = NO;
		permitTableReq = "No";
	} 
	else 
	{
		permitStatusValue = TBD_STATUS;
		permitStatusRequirementValue = TBD;
		permitTableReq = "TBD";
	}
	
	/*
	$('.autofill-Permit-Requirement').each(function(index){
		$(this).val(permitStatusRequirementValue);
	});
	*/
	
	$('.permitReq').each(function(index){
		$(this).html(permitTableReq);
	});
	
	$('.autofill-Permit-Status').each(function(index){
		$(this).val(permitStatusValue);
	});
	
	$('.autofill-Permit-date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
	
}

function autofillInspections()
{
	console.log("Autofill Inspections");

	let required = $('#autofill-Permits').val();
	
	let PREPARING = "Preparing"; //Correspond to id in database for closeoutstatus (Required)
	let NA = "N/A"; //Correspond to id in database for closeoutstatus (N/A)
	let TBD_STATUS = "TBD";
	
	let YES = 0;
	let NO = 1;
	let TBD = 2;
		
	let inspectionStatusRequirementValue;
	let inspectionStatusValue;
	let inspectionTableReq;
	
	if(required == YES) 
	{
		inspectionStatusValue = PREPARING;
		inspectionStatusRequirementValue = YES;
		inspectionTableReq = "Yes";
	} 
	else if(required == NO) 
	{
		inspectionStatusValue = NA;
		inspectionStatusRequirementValue = NO;
		inspectionTableReq = "No";
	} 
	else
    {
	    inspectionStatusValue = TBD_STATUS;
	    inspectionRequirementValue = TBD;
	    inspectionTableReq = "TBD";
    }
	
	/*
	$('.autofill-Inspection-Requirement').each(function(index){
		$(this).val(inspectionStatusRequirementValue);
	});
	*/
	
	$('.inspectionReq').each(function(index){
		$(this).html(inspectionTableReq);
	});
	
	$('.autofill-Inspection-Status').each(function(index){
		$(this).val(inspectionStatusValue);
	});
	
	$('.autofill-Inspection-date').each(function(index){
		console.log("THIS" , $(this).val() , TODAYS_DATE);
		$(this).val(TODAYS_DATE);
	});
	
}

function autofillFinalInspections()
{
	console.log("Autofill Final Inspections");
	
	let required = $('#autofill-Permits').val();
	
	let NA = 3; 
	let TBD = 6;
	
	let YES = 1;
	let NO = 2;
	let TBD = 0;
	
	let value;
	
	if(required == YES) 
		value = TBD;
	else if(required == NO) 
		value = NA;
	else if(required == TBD)
		value = TBD;
	else 
		value = TBD;
	
	$('.autofill-Final-Insp').each(function(index){
		$(this).val(value);
	});
   
    $('.autofill-Final-Insp-Date').each(function(index){
		$(this).val(TODAYS_DATE);
	});
	
}