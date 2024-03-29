package Servlets.helpers;

import java.text.DateFormat;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import comparators.ChangeOrderNumberComparator;
import comparators.ProjectItemComparator;
import comparators.ProjectRegionComparator;
import comparators.WarehouseComparator;
import projectObjects.NewEquipment;
import projectObjects.PendingInvoice;
import projectObjects.Person;
import projectObjects.Project;
import projectObjects.Task;
import services.ProjectObjectService;
import projectObjects.ChangeOrder;
import projectObjects.ChangeOrderType;
import projectObjects.Equipment;
import projectObjects.User;

/**
 * Helper Classes will be statically called to do perform actions.
 * Usually these actions have large amounts of code and would
 * make other, more vital, classes harder to read. 
 * 
 * This class helps creating Reports by getting data from projects and 
 *  helping to generate the table headers for a report.  
 * 
 * @author jmackin
 *
 */
public class ReportHelper 
{
	// constant statuses
	private static final String NA = "3";
	private static final String INCOMPLETE = "2";
	private static final String COMPLETE = "1";
	private static final String REQUIRED = "4";
	private static final String TBD = "6";
	// ADD REQUIRED AND TBD HERE
	
	/**
	 * Creates table headers based on the values passed in from the report
	 * For an example, report.js might send values [mcsNum, warehouse, stage]. This method will then be called
	 * three times each time appending a new header with the resulting table having headers -- MCS Number | Warehouse | Stage
	 * @param sb - the string builder that contains the html page to be written out to
	 * @param value - the value of the current header
	 */
	public synchronized static void appendReportProjectHeader(StringBuilder sb, String value)
	{
		if(value.equals("mcsNum"))
		{
			sb.append("<th>");
			sb.append("MCS Number");
		}
		else if(value.equals("warehouse_and_id"))
		{
			sb.append("<th>");
			sb.append("Warehouse");
		}
		else if (value.equals("warehouse"))
		{
			sb.append("<th>");
			sb.append("Warehouse");
		}
		else if (value.equals("stage"))
		{
			sb.append("<th>");
			sb.append("Stage");
		}
		else if (value.equals("item"))
		{
			sb.append("<th>");
			sb.append("Item");
		}
		else if (value.equals("supervisor"))
		{
			sb.append("<th>");
			sb.append("Supervisor");
		}
		else if (value.equals("manager"))
		{
			sb.append("<th>");
			sb.append("Manager");
		}
		else if (value.equals("region"))
		{
			sb.append("<th>");
			sb.append("Region");
		}
		else if (value.equals("class"))
		{
			sb.append("<th>");
			sb.append("Classification");
		}
		else if (value.equals("scope"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Scope");
		}
		else if (value.equals("initiated"))
		{
			sb.append("<th>");
			sb.append("Initiated Date");
		}
		else if (value.equals("status"))
		{
			sb.append("<th>");
			sb.append("Status");
		}
		else if (value.equals("scheduledStartDate"))
		{
			sb.append("<th>");
			sb.append("Scheduled Start Date");
		}
		else if (value.equals("shouldInvoice"))
		{	
			sb.append("<th>");
			sb.append("Should Invoice %");
		}
		
		//Labor
		else if (value.equals("laborTotal"))
		{	
			sb.append("<th>");
			sb.append("Labor Total");
		}
		else if (value.equals("laborInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Labor Invoiced");
		}
		else if (value.equals("laborToInvoice"))
		{	
			sb.append("<th>");
			sb.append("Labor to Invoice ");
		}
		else if (value.equals("laborPercentInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Labor Percent Invoiced %");
		}

		//materials
		else if (value.equals("materialCosts"))
		{	
			sb.append("<th>");
			sb.append("Material Costs");
		}
		else if (value.equals("materialInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Material Invoiced");
		}
		else if (value.equals("materialToInvoice"))
		{	
			sb.append("<th>");
			sb.append("Material to Invoice");
		}
		else if (value.equals("materialPercentInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Material Percent Invoiced %");
		}

		//project
		else if (value.equals("projectAmount"))
		{	
			sb.append("<th>");
			sb.append("Project Amount");
		}
		else if (value.equals("projectInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Project Invoiced");
		}
		else if (value.equals("projectToInvoice"))
		{	
			sb.append("<th>");
			sb.append("Project to Invoice");
		}
		else if (value.equals("projectPercentInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Project Percent Invoiced %");
		}
		
		//AIA
		else if (value.equals("aiaTotal"))
		{	
			sb.append("<th>");
			sb.append("AIA total");
		}
		else if (value.equals("aiaInvoiced"))
		{	
			sb.append("<th>");
			sb.append("AIA Invoiced");
		}
		else if (value.equals("aiaToInvoice"))
		{	
			sb.append("<th>");
			sb.append("AIA to Invoice");
		}
		else if (value.equals("aiaPercentInvoiced"))
		{	
			sb.append("<th>");
			sb.append("AIA Percent Invoiced %");
		}

		//total
		else if (value.equals("totalProject"))
		{	
			sb.append("<th>");
			sb.append("Total Project");
		}
		else if (value.equals("totalInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Total invoiced");
		}
		else if (value.equals("totalToInvoice"))
		{	
			sb.append("<th>");
			sb.append("Total to Invoice");
		}
		else if (value.equals("totalPercentInvoiced"))
		{	
			sb.append("<th>");
			sb.append("Total Percent Invoiced %");
		}
		
		
		else if (value.equals("invoiced"))
		{	
			sb.append("<th>");
			sb.append("Invoiced %");
		}
		else if (value.equals("alarmHvacForm"))
		{	
			sb.append("<th>");
			sb.append("Alarm Form");
		}
		else if (value.equals("punchList"))
		{	
			sb.append("<th>");
			sb.append("Punch List");
		}
		else if (value.equals("scheduledTurnover"))
		{	
			sb.append("<th>");
			sb.append("Scheduled Turn Over");
		}
		else if (value.equals("actualTurnover"))
		{	
			sb.append("<th>");
			sb.append("Actual Turn Over");
		}
		else if (value.equals("initiated"))
		{	
			sb.append("<th>");
			sb.append("Project initiated date");
		}
		else if (value.equals("siteSurvey"))
		{	
			sb.append("<th>");
			sb.append("Site Survey");
		}
		else if (value.equals("costcoDueDate"))
		{	
			sb.append("<th>");
			sb.append("Proposal Due");
		}
		else if (value.equals("proposalSubmitted"))
		{	
			sb.append("<th>");
			sb.append("Proposal Submitted");
		}
		else if (value.equals("type"))
		{	
			sb.append("<th>");
			sb.append("Type");
		}
		else if (value.equals("asBuilts"))
		{	
			sb.append("<th>");
			sb.append("As-Builts");
		}
		else if (value.equals("salvageValue"))
		{
			sb.append("<th>");
			sb.append("Salvage Value");
		}
		else if (value.equals("airGas"))
		{	
			sb.append("<th>");
			sb.append("Air Gas");
		}
		else if (value.equals("permitsClosed"))
		{	
			sb.append("<th>");
			sb.append("Permits Closed");
		}
		else if (value.equals("verisaeShutdownReport"))
		{	
			sb.append("<th>");
			sb.append("Verisae Report");
		}
		else if (value.equals("projectNotes"))
		{	
			sb.append("<th class = 'longText'>");
			sb.append("Notes");
		
		}
		else if (value.equals("customerNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Customer Notes");
		}
		else if(value.equals("custNum"))
		{
			sb.append("<th class>");
			sb.append("Customer Number");
		}
		else if(value.equals("zUpdates")) {
			
			sb.append("<th class>");
			sb.append("Customer Notes");
			
		}
		else if(value.equals("cost"))
		{
			sb.append("<th>");
			sb.append("Project Cost");
		}
		else if(value.equals("zachNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Customer Notes");				
		}
		else if(value.equals("permitApp"))
		{
			sb.append("<th>");
			sb.append("Permit Application");
		}
		else if(value.equals("mechanicalFinal"))
		{
			sb.append("<th>");
			sb.append("Mechanical Final Inspection");
		}
		else if(value.equals("electricalFinal"))
		{
			sb.append("<th>");
			sb.append("Electrical Final Inspection");
		}
		else if(value.equals("plumbingFinal"))
		{
			sb.append("<th>");
			sb.append("Plumbing Final Inspection");
		}
		else if(value.equals("sprinkleFinal"))
		{
			sb.append("<th>");
			sb.append("Sprinkler Final Inspection");
		}
		else if(value.equals("buildingFinal"))
		{
			sb.append("<th>");
			sb.append("Building Final Inspection");
		}
		else if(value.equals("tmpCertificate"))
		{
			sb.append("<th>");
			sb.append("Temp Certificate of Occupancy");
		}
		else if(value.equals("certififcateFinal"))
		{
			sb.append("<th>");
			sb.append("Final Certificate of Occupancy");
		}
		else if(value.equals("equipmentSubmittal"))
		{
			sb.append("<th>");
			sb.append("Equipment Submittal");
		}
		else if(value.equals("manuals"))
		{
			sb.append("<th>");
			sb.append("Operation & Maintenance Manuals");
		}
		else if(value.equals("punchList"))
		{
			sb.append("<th>");
			sb.append("Punch List");
		}
		else if(value.equals("asBuiltDrawings"))
		{
			sb.append("<th>");
			sb.append("As-Built Drawings");
		}
		else if(value.equals("closeoutPhotos"))
		{
			sb.append("<th>");
			sb.append("Closeout Photos");
		}
		else if(value.equals("hvacStartup"))
		{
			sb.append("<th>");
			sb.append("HVAC Startup");
		}
		else if(value.equals("mcsWarranty"))
		{
			sb.append("<th>");
			sb.append("MCS Warranty");
		}
		else if(value.equals("gcWarranty"))
		{
			sb.append("<th>");
			sb.append("GC Warranty");
		}
		else if(value.equals("mechanicalWarranty"))
		{
			sb.append("<th>");
			sb.append("Mechanical Warranty");
		}
		else if(value.equals("electricalWarranty"))
		{
			sb.append("<th>");
			sb.append("Electrical Warranty");
		}
		else if(value.equals("plumbingWarranty"))
		{
			sb.append("<th>");
			sb.append("Plumbing Warranty");
		}
		else if(value.equals("sprinklerWarranty"))
		{
			sb.append("<th>");
			sb.append("Sprinkler Warranty");
		}
		else if(value.equals("roofingWarranty"))
		{
			sb.append("<th>");
			sb.append("Roofing Warranty");
		}
		else if(value.equals("htiWarranty"))
		{
			sb.append("<th>");
			sb.append("HTI Warranty");
		}
		else if(value.equals("otherWarrantyA"))
		{
			sb.append("<th>");
			sb.append("Other Warranty");
		}
		else if(value.equals("otherWarrantyB"))
		{
			sb.append("<th>");
			sb.append("Other Warranty");
		}
		else if(value.equals("mcsLiens"))
		{
			sb.append("<th>");
			sb.append("MCS Liens");
		}
		else if(value.equals("gcLiens"))
		{
			sb.append("<th>");
			sb.append("GC Liens");
		}
		else if(value.equals("mechLiens"))
		{
			sb.append("<th>");
			sb.append("Mechanical Liens");
		}
		else if(value.equals("elecLiens"))
		{
			sb.append("<th>");
			sb.append("Electrical Liens");
		}
		else if(value.equals("plumbLiens"))
		{
			sb.append("<th>");
			sb.append("Plumbing Liens");
		}
		else if(value.equals("sprinkleLiens"))
		{
			sb.append("<th>");
			sb.append("Sprinkler Liens");
		}
		else if(value.equals("roofingLiens"))
		{
			sb.append("<th>");
			sb.append("Roofing Liens");
		}
		else if(value.equals("htiLiens"))
		{
			sb.append("<th>");
			sb.append("HTI Liens");
		}
		else if(value.equals("otherLiens"))
		{
			sb.append("<th>");
			sb.append("Other Liens");
		}
		else if(value.equals("numOfChanges"))
		{
			sb.append("<th>");
			sb.append("Number of Change Orders");
		}
		else if(value.equals("inspectionsRequired"))
		{
			sb.append("<th>");
			sb.append("Number of Inspections Required");
		}
		else if(value.equals("warrantiesRequired"))
		{
			sb.append("<th>");
			sb.append("Number of Warranties Required");
		}
		else if(value.equals("liensRequired"))
		{
			sb.append("<th>");
			sb.append("Number of Liens Required");
		}
		else if(value.equals("mg2Completion"))
		{
			sb.append("<th>");
			sb.append("MG2 Substantial Completion (G704)");
		}
		else if(value.equals("closeoutDocumentNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Closeout Document Notes");
		}
		else if(value.equals("warrantyNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Warranty Notes");
		}
		else if(value.equals("finalInspectionNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Final Inspection Notes");
		}
		else if(value.equals("finalLiensNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Final Liens Notes");
		}
		else if(value.equals("buildingPermit"))
		{
			sb.append("<th>");
			sb.append("Building Permit");
		}
		else if(value.equals("mechanicalPermit"))
		{
			sb.append("<th>");
			sb.append("Mechanical Permit");
		}
		else if(value.equals("electricalPermit"))
		{
			sb.append("<th>");
			sb.append("Electrical Permit");
		}
		else if(value.equals("plumbingPermit"))
		{
			sb.append("<th>");
			sb.append("Plumbing Permit");
		}
		else if(value.equals("roofingPermit"))
		{
			sb.append("<th>");
			sb.append("Roofing Permit");
		}
		else if(value.equals("sprinklerPermit"))
		{
			sb.append("<th>");
			sb.append("Sprinkler Permit");
		}
		else if(value.equals("fireAlarmPermit"))
		{
			sb.append("<th>");
			sb.append("Fire Alarm Permit");
		}
		else if(value.equals("lowVoltagePermit"))
		{
			sb.append("<th>");
			sb.append("Low Voltage Permit");
		}
		else if(value.equals("tempCertOccupancyPermit"))
		{
			sb.append("<th>");
			sb.append("Temp Certificate of Occupation Permit");
		}
		else if(value.equals("certOccupancyPermit"))
		{
			sb.append("<th>");
			sb.append("Certificate of Occupation Permit");
		}
		else if(value.equals("buildingInspection"))
		{
			sb.append("<th>");
			sb.append("Building Inspection");
		}
		else if(value.equals("mechanicalInspection"))
		{
			sb.append("<th>");
			sb.append("Mechanical Inspection");
		}
		else if(value.equals("electricalInspection"))
		{
			sb.append("<th>");
			sb.append("Electrical Inspection");
		}
		else if(value.equals("plumbingInspection"))
		{
			sb.append("<th>");
			sb.append("Plumbing Inspection");
		}
		else if(value.equals("roofingInspection"))
		{
			sb.append("<th>");
			sb.append("Roofing Inspection");
		}
		else if(value.equals("sprinklerInspection"))
		{
			sb.append("<th>");
			sb.append("Sprinkler Inspection");
		}
		else if(value.equals("fireAlarmInspection"))
		{
			sb.append("<th>");
			sb.append("Fire Alarm Inspection");
		}
		else if(value.equals("lowVoltageInspection"))
		{
			sb.append("<th>");
			sb.append("Low Voltage Inspection");
		}
		else if(value.equals("tempCertOccupancyInspection"))
		{
			sb.append("<th>");
			sb.append("Temp Certificate of Occupation Inspection");
		}
		else if(value.equals("certOccupancyInspection"))
		{
			sb.append("<th>");
			sb.append("Certificate of Occupation Inspection");
		}
		else if(value.equals("certificateOfSubstantialCompletion"))
		{
			sb.append("<th>");
			sb.append("Certificate of Substantial Completion");
		}
		else if (value.equals("paymentOfDebtsAndClaims")) {
			sb.append("<th>");
			sb.append("Payment of Debts and Claims");
		} else if (value.equals("releaseOfLiens")) {
			sb.append("<th>");
			sb.append("Release of Liens");
		} else if (value.equals("mulvannyG2SignOff")) {
			sb.append("<th>");
			sb.append("MG2 Sign Off");
		} else if (value.equals("equipmentName")) {
			sb.append("<th>Warehouse</th><th>Item</th><th>Status</th><th>Equipment Name</th>" +
					  "<th>Vendor</th><th>Estimated Delivery Date</th>" +
					  "<th>Actual Delivery Date</th><th class='longText'>Notes");
		} else if (value.equals("changeOrder") || value.contains("changeOrder_")) {
			sb.append("<th>Warehouse</th><th>Project</><th>Manager</th><th>MCS CO#</th><th>Title</th>" + 
					  "<th class='longText'>Brief Description</th><th>Status</th><th>Sub Names(s)</th>" + 
					  "<th>Subs Submitted Date</th><th>Customer</th><th>Submitted Date</th><th>Approved Date</th>" + 
					  "<th>Cost</th><th>Sell</th><th>Invoice #</th><th>Customer COP#</th><th class='longText'>Notes");
		} else if (value.equals("changeOrderSolo")) {
			sb.append("<th>MCS CO#</th><th>Warehouse</th><th>Project</><th>Manager</th><th>Title</th>" + 
					  "<th class='longText'>Brief Description</th><th>Status</th><th>Invoice Status</th><th>Sub Names(s)</th>" + 
					  "<th>Subs Submitted Date</th><th>Customer</th><th>Submitted Date</th><th>Approved Date</th>" + 
					  "<th>Cost</th><th>Sell</th><th>Invoice #</th><th>Customer COP#</th><th class='longText'>Notes");
		}  else if (value.equals("equipmentSolo")) {
			sb.append("<th>Name</th><th class='longText'>Description</th><th>Supplier</><th>Delivery Status</th><th>Ordered Date</th>" + 
					  "<th >Scheduled Date</th><th>Actual Date</th><th class='longText'>Notes</th>");
		}
		else if(value.equals("projectTaskSolo")) {
			sb.append("<th>Name</th><th class='longText'>Description</th><th>MCS</><th>Assignee</th><th>Assigned Date</th>" + 
					  "<th >Due Date</th><th>Priority</th><th>Status</th><th class='longText'>Notes</th>");
		}
		else if(value.equals("projectPendInvSolo")) {
			sb.append("<th>Invoice#</th><th>Invoice Amount</th><th>Sub Name(s)</th><th>Submitted Date</th><th class='longText'>Description</th>" + 
					  "<th>Status</th><th>DB CO#</th><th>PO#</th><th class='longText'>Notes</th>");
		}
		else if(value.equals("allPendInv")) {
			sb.append("<th>Warehouse</th><th>Project</th><th>Manager</th><th>Invoice#</th><th>Invoice Amount</th><th>Sub Name(s)</th><th>Submitted Date</th><th class='longText'>Description</th>" + 
					  "<th>Status</th><th>DB CO#</th><th>PO#</th><th class='longText'>Notes</th>");
		}
		else if(value.equals("permitNotes")) {
			sb.append("<th>");
			sb.append("Permit Notes");
		} else if(value.equals("inspectionNotes")) {
			sb.append("<th>");
			sb.append("Inspection Notes");
		} else if(value.equals("task_title")) {
			sb.append("<th>");
			sb.append("Title");
		} else if(value.equals("project_item")) {
			sb.append("<th>");
			sb.append("Project");						
	    }else if(value.equals("task_assignee")) {
			sb.append("<th>");
			sb.append("MCS");
		}else if(value.equals("task_subassignee")) {
			sb.append("<th>");
			sb.append("Assignee");
		}else if(value.equals("task_description")) {
			sb.append("<th>");
			sb.append("Description");
		} else if(value.equals("task_created_date")) {
			sb.append("<th>");
			sb.append("Created");
		} else if(value.equals("task_due_date")) {
			sb.append("<th>");
			sb.append("Due");
		} else if(value.equals("task_priority")) {
			sb.append("<th>");
			sb.append("Priority");
		} else if(value.equals("task_notes")) {
			sb.append("<th>");
			sb.append("Notes");
		} else if(value.equals("task_status")) {
			sb.append("<th>");
			sb.append("Status");
		} else if(value.equals("task_item")) {
			sb.append("<th>");
			sb.append("Project");
		} else if(value.equals("budgetaryDue")) {
			sb.append("<th>");
			sb.append("Budgetary Due");
		} else if(value.equals("budgetarySubmitted")) {
			sb.append("<th>");
			sb.append("Budgetary Submitted");
		}
	}
	
	/**
	 * Gets the report value given a project and a key. 
	 * This method checks every possible value for projects against the passed in value-key 
	 * and retrieves and formats that value for display on the table
	 * @param value - the key of the value to be found
	 * @param p - the project containing the values
	 * @return - a string containing the value
	 */
	public synchronized static String getReportVal(String value, Project p)
	{
		DateFormat dForm = new SimpleDateFormat("MM/dd/yyyy");
		
		if(value.equals("mcsNum"))
		{
			String mcsNumber = "tbd";
			if (p.getMcsNumber() != -1)
				mcsNumber = String.valueOf(p.getMcsNumber());
			
			return String.valueOf(mcsNumber);					
		}
		else if (value.equals("warehouse") && p.getWarehouse() != null)
		{
			if(p.getWarehouse().getCity().getName().contains("APANA")) 
			{
				return (p.getWarehouse().getCity().getName());
			}
			
			return (p.getWarehouse().getCity().getName() + ", " + p.getWarehouse().getState().getAbbreviation());
		}
		else if(value.equals("warehouse_and_id") && p.getWarehouse() != null)
		{
			return (p.getWarehouse().getCity().getName() + ", " + p.getWarehouse().getState().getAbbreviation()
				      +"\n#"+ p.getWarehouse().getWarehouseID());
		}
		else if (value.equals("stage") && p.getStage() != null)
			return p.getStage().getName();
		else if (value.equals("item") && p.getProjectItem() != null)
			return p.getProjectItem().getName();
		
		else if (value.equals("supervisor") )
			return getFirstFromSet(p.getSupervisors()).getName();
		else if (value.equals("manager"))
			return p.getProjectManagers().getName();
			//return getFirstFromSet(p.getProjectManagers()).getName();
		else if (value.equals("region") && p.getWarehouse() != null && p.getWarehouse().getRegion() != null)
			return p.getWarehouse().getRegion().getRegionName();
		else if (value.equals("class") && p.getProjectClass() != null)
			return p.getProjectClass().getName();
		else if (value.equals("scope"))
			return p.getScope();
		
		else if (value.equals("initiated") && p.getProjectInitiatedDate() != null)
			return dForm.format(p.getProjectInitiatedDate()).toString();
		
		else if (value.equals("status") && p.getStatus() != null)
			return p.getStatus().getName();
		
		else if (value.equals("scheduledStartDate") && p.getScheduledStartDate() != null)
			return dForm.format(p.getScheduledStartDate()).toString();
		else if (value.equals("shouldInvoice"))
			return String.valueOf(p.getShouldInvoice());
		else if (value.equals("invoiced"))
			return String.valueOf(p.getInvoiced());

		else if (value.equals("scheduledTurnover") && p.getScheduledTurnover() != null)
			return dForm.format(p.getScheduledTurnover()).toString();
		else if (value.equals("actualTurnover") && p.getActualTurnover() != null)
			return dForm.format(p.getActualTurnover()).toString();
		else if (value.equals("actualTurnover") && p.getActualTurnover() != null)
			return dForm.format(p.getActualTurnover()).toString();
		else if (value.equals("initiated") && p.getProjectInitiatedDate() != null)
			return dForm.format(p.getProjectInitiatedDate()).toString();
		else if (value.equals("siteSurvey") && p.getSiteSurvey() != null)
			return dForm.format(p.getSiteSurvey()).toString();
		
		else if (value.equals("costcoDueDate") && p.getProposalDue() != null)
			return dForm.format(p.getProposalDue()).toString();
		
		else if (value.equals("proposalSubmitted") && p.getProposalSubmitted() != null)
			return dForm.format(p.getProposalSubmitted()).toString();
		
		else if (value.equals("budgetaryDue") && p.getBudgetaryDue() != null)
			return dForm.format(p.getBudgetaryDue()).toString();
		
		else if (value.equals("budgetarySubmitted") && p.getBudgetarySubmitted() != null)
			return dForm.format(p.getBudgetarySubmitted()).toString();
		
		else if (value.equals("type") && p.getProjectType() != null)
			return p.getProjectType().getName();
		
		else if (value.equals("asBuilts") && p.getCloseoutDetails().getAsBuilts() != null) {
			//BELOW CODE ADDS THE ASBUILT DRAWING STATUS. UNCOMMENT BEFORE DEPLOYMENT
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getAsBuiltDrawingsStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getAsBuiltDrawingsStatus()));
			/*
			 * Removing the DATE from the Report as per Andy's Request.
			 * Uncomment this whenever required.
			if(p.getCloseoutDetails().getAsBuilts() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getAsBuilts()));
			*/
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if (value.equals("salvageValue") && p.getCloseoutDetails().getSalvageValue() != null)
			return "$"+ p.getCloseoutDetails().getSalvageValue().getValue() + " " + dForm.format(p.getCloseoutDetails().getSalvageValue().getDate());
		
		else if (value.equals("airGas") && p.getCloseoutDetails().getAirGas() != null)
			return dForm.format(p.getCloseoutDetails().getAirGas());
		
		else if (value.equals("permitsClosed") && p.getCloseoutDetails().getPermitsClosed() != null)
			return dForm.format(p.getCloseoutDetails().getPermitsClosed());
		
		else if (value.equals("projectNotes"))
			return String.valueOf(p.getProjectNotes());
		
		else if (value.equals("customerNotes"))
			return String.valueOf(p.getCustomerNotes());
		
		else if (value.equals("custNum") && p.getCustomerNumber() != null)
			return String.valueOf(p.getCustomerNumber());
		else if (value.equals("cost") && p.getCost() != null)
			return String.valueOf(p.getCost());
		else if (value.equals("zachNotes") && p.getZachUpdates() != null)
			return String.valueOf(p.getZachUpdates());
		else if(value.equals("mechanicalFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMechFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMechFinalStatus()));
			if(p.getCloseoutDetails().getMechFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMechFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("electricalFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getElecFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getElecFinalStatus()));
			if(p.getCloseoutDetails().getElecFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getElecFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("plumbingFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPlumbingFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPlumbingFinalStatus()));
			if(p.getCloseoutDetails().getPlumbingFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPlumbingFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("gasFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getGasFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getGasFinalStatus()));
			if(p.getCloseoutDetails().getGasFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getGasFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("sprinkleFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getSprinkleFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getSprinkleFinalStatus()));
			if(p.getCloseoutDetails().getSprinkleFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSprinkleFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("fireAlarmFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getFireAlarmFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getFireAlarmFinalStatus()));
			if(p.getCloseoutDetails().getFireAlarmFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getFireAlarmFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("lowVolFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getLowVolFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getLowVolFinalStatus()));
			if(p.getCloseoutDetails().getLowVolFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getLowVolFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("buildingFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getBuildingFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getBuildingFinalStatus()));
			if(p.getCloseoutDetails().getBuildingPermitCL() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getBuildingPermitCL()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("ceilingFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getCeilingFinalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getCeilingFinalStatus()));
			if(p.getCloseoutDetails().getCeilingFinalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getCeilingFinalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("tmpCertificate"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getTmpCertificateStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getTmpCertificateStatus()));
			if(p.getCloseoutDetails().getTmpCertificateDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getTmpCertificateDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("certififcateFinal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getCertificateStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getCertificateStatus()));
			if(p.getCloseoutDetails().getCertificateDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getCertificateDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("equipmentSubmittal"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getEquipmentSubmittalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getEquipmentSubmittalStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getEquipmentSubCL() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getEquipmentSubCL()));
			*/ 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("manuals"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getManualStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getManualStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getManualDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getManualDate()));
			*/
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("punchList"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPunchListStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPunchListStatus()));
			/*
			 * Removing Date for punchList
			if(p.getCloseoutDetails().getPunchList() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPunchList()));
			*/
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("asBuiltDrawings"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getAsBuiltDrawingsStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getAsBuiltDrawingsStatus()));
			/*
			 * Removing Date for As-Built
			if(p.getCloseoutDetails().getAsBuilts() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getAsBuilts()));
			 */
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		/*
		 * Duplicate
		else if(value.equals("closeoutPhotos"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getCloseOutPhotosStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getCloseOutPhotosStatus()));
			if(p.getCloseoutDetails().getCloseoutPhotosCL() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getCloseoutPhotosCL()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		*/
		else if(value.equals("closeoutPhotos"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getCloseOutPhotosStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getCloseOutPhotosStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getCloseoutPhotosCL() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getCloseoutPhotosCL()));
			 */
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("hvacStartup"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getHVACstartupFormStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getHVACstartupFormStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getHVACstartupFormDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getHVACstartupFormDate()));
			 */
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("alarmHvacForm"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getAlarmFormStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getAlarmFormStatus()));
			
			/*
			 * The below lines are adding date to the report.
			 * Removing the DATE from the Report as per Andy's Request.
			 * Uncomment this whenever required.
			
			if(p.getCloseoutDetails().getAlarmHvacForm() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getAlarmHvacForm()));
			 */
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("verisaeShutdownReport"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getVerisaeReportStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getVerisaeReportStatus()));
			
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getVerisaeShutdownReport() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getVerisaeShutdownReport()));
			 */
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("mcsWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMCSWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMCSWarrantyStatus()));
			if(p.getCloseoutDetails().getMCSWarranty() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMCSWarranty()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("gcWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getGCWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getGCWarrantyStatus()));
			if(p.getCloseoutDetails().getGCWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getGCWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("mechanicalWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMechanicalWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMechanicalWarrantyStatus()));
			if(p.getCloseoutDetails().getMechanicalWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMechanicalWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("electricalWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getElectricalWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getElectricalWarrantyStatus()));
			if(p.getCloseoutDetails().getElectricalWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getElectricalWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("plumbingWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPlumbingWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPlumbingWarrantyStatus()));
			if(p.getCloseoutDetails().getPlumbingWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPlumbingWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("gasWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getGasWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getGasWarrantyStatus()));
			if(p.getCloseoutDetails().getGasWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getGasWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("sprinklerWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getSprinkleWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getSprinkleWarrantyStatus()));
			if(p.getCloseoutDetails().getSprinkleWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSprinkleWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---"); //changed line 882
			return sb.toString();
		}
		else if(value.equals("htiWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getHTIWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getHTIWarrantyStatus()));
			if(p.getCloseoutDetails().getHTIWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getHTIWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("otherWarrantyA"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getOtherWarrantyStatusA() != null)
				sb.append(convert(p.getCloseoutDetails().getOtherWarrantyStatusA()));
			if(p.getCloseoutDetails().getOtherWarrantyDateA() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getOtherWarrantyDateA()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("otherWarrantyB"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getOtherWarrantyStatusB() != null)
				sb.append(convert(p.getCloseoutDetails().getOtherWarrantyStatusB()));
			if(p.getCloseoutDetails().getOtherWarrantyDateB() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getOtherWarrantyDateB()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("mcsLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMCSStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMCSStatus()));
			if(p.getCloseoutDetails().getMCSDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMCSDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("gcLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getGCStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getGCStatus()));
			if(p.getCloseoutDetails().getGCDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getGCDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("mechLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMechanicalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMechanicalStatus()));
			if(p.getCloseoutDetails().getMechanicalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMechanicalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("elecLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getElectricalStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getElectricalStatus()));
			if(p.getCloseoutDetails().getElectricalDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getElectricalDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("plumbLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPlumbingStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPlumbingStatus()));
			if(p.getCloseoutDetails().getPlumbingDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPlumbingDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("gasLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getGasStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getGasStatus()));
			if(p.getCloseoutDetails().getGasDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getGasDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("sprinkleLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getSprinkleStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getSprinkleStatus()));
			if(p.getCloseoutDetails().getSprinkleDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSprinkleDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("htiLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getHTIStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getHTIStatus()));
			if(p.getCloseoutDetails().getHTIDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getHTIDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("otherLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getOtherFinalLeinsStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getOtherFinalLeinsStatus()));
			if(p.getCloseoutDetails().getOtherFinalLeinsDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getOtherFinalLeinsDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("otherBLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getOtherFinalLeinsBStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getOtherFinalLeinsBStatus()));
			if(p.getCloseoutDetails().getOtherFinalLeinsBDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getOtherFinalLeinsBDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("mg2Completion"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMg2CompletionStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMg2CompletionStatus()));
			if(p.getCloseoutDetails().getMg2CompletionDate() != null)
					sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMg2CompletionDate()));
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("certificateOfSubstantialCompletion"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getSubstantialCompletionStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getSubstantialCompletionStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getSubstantialCompletionDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSubstantialCompletionDate()));
			*/
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("paymentOfDebtsAndClaims"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPaymentOfDebtsAndClaimsStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPaymentOfDebtsAndClaimsStatus()));
			if(p.getCloseoutDetails().getPaymentOfDebtsAndClaimsDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPaymentOfDebtsAndClaimsDate()));
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("releaseOfLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getReleaseOfLiensStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getReleaseOfLiensStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getReleaseOfLiensDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getReleaseOfLiensDate()));
			*/
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();	
		}
		else if(value.equals("mulvannyG2SignOff"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMulvannySignOffStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMulvannySignOffStatus()));
			/*
			 * Removing Date
			if(p.getCloseoutDetails().getMulvannySignOffDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMulvannySignOffDate()));
			*/
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("inspectionsRequired"))
		{
			int required = 7;
			int complete = 0;
			if(p.getCloseoutDetails().getMechFinalStatus() != null)
			{
				if(p.getCloseoutDetails().getMechFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getMechFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getElecFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getElecFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getElecFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getPlumbingFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getPlumbingFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getPlumbingFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getGasFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getGasFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getGasFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getSprinkleFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getFireAlarmFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getFireAlarmFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getFireAlarmFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getLowVolFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getLowVolFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getLowVolFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getBuildingFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getBuildingFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getBuildingFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getCeilingFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getCeilingFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getCeilingFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getTmpCertificateStatus() != null)
			{
				if(p.getCloseoutDetails().getTmpCertificateStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getTmpCertificateStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getCertificateStatus() != null)	
			{
				if(p.getCloseoutDetails().getCertificateStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getCertificateStatus().equals(COMPLETE))
					complete++;
			}
			return complete + " / " + required;
		}	
		else if(value.equals("warrantiesRequired"))
		{
			int required = 10;
			int complete = 0;
			if(p.getCloseoutDetails().getMCSWarrantyStatus() != null)
			{
				if(p.getCloseoutDetails().getMCSWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getMCSWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getGCWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getGCWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getGCWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getMechanicalWarrantyStatus() != null)
			{
				if(p.getCloseoutDetails().getMechanicalWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getMechanicalWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getElectricalWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getElectricalWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getElectricalWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getPlumbingWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getPlumbingWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getPlumbingWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getGasWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getGasWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getGasWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getSprinkleWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getHTIWarrantyStatus() != null)
			{
				if(p.getCloseoutDetails().getHTIWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getHTIWarrantyStatus().equals(COMPLETE))
					complete++;

			}
			if(p.getCloseoutDetails().getOtherWarrantyStatusA() != null)	
			{
				if(p.getCloseoutDetails().getOtherWarrantyStatusA().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getOtherWarrantyStatusA().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getOtherWarrantyStatusB() != null)	
			{
				if(p.getCloseoutDetails().getOtherWarrantyStatusB().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getOtherWarrantyStatusB().equals(COMPLETE))
					complete++;
			}
			return complete + " / " + required;
		}

		else if(value.equals("liensRequired"))
		{
			int required = 9;
			int complete = 0;
			if(p.getCloseoutDetails().getMCSStatus() != null)
			{
				if(p.getCloseoutDetails().getMCSStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getMCSStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getGCStatus() != null)
			{
				if(p.getCloseoutDetails().getGCStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getGCStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getMechanicalStatus() != null)
			{
				if(p.getCloseoutDetails().getMechanicalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getMechanicalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getElectricalStatus() != null)
			{
				if(p.getCloseoutDetails().getElectricalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getElectricalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getPlumbingStatus() != null)	
			{
				if(p.getCloseoutDetails().getPlumbingStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getPlumbingStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getGasStatus() != null)	
			{
				if(p.getCloseoutDetails().getGasStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getGasStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getSprinkleStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getHTIStatus() != null)	
			{
				if(p.getCloseoutDetails().getHTIStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getHTIStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getOtherFinalLeinsStatus() != null)	
			{
				if(p.getCloseoutDetails().getOtherFinalLeinsStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getOtherFinalLeinsStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getOtherFinalLeinsBStatus() != null)	
			{
				if(p.getCloseoutDetails().getOtherFinalLeinsBStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getOtherFinalLeinsBStatus().equals(COMPLETE))
					complete++;
			}
			return complete + " / " + required;
		}
		
		else if(value.equals("numOfChanges"))
			return  String.valueOf(p.getCloseoutDetails().getNumOfChangeOrdersCompleted()) + 
					" / " + String.valueOf(p.getCloseoutDetails().getNumOfChangeOrders());
		else if(value.equals("finalLiensNotes") && p.getCloseoutDetails().getFinalLiensNotes() != null)
			return p.getCloseoutDetails().getFinalLiensNotes();
		else if(value.equals("finalInspectionNotes") && p.getCloseoutDetails().getFinalInspectionNotes() != null)
			return p.getCloseoutDetails().getFinalInspectionNotes();
		else if(value.equals("warrantyNotes") && p.getCloseoutDetails().getWarrantyNotes() != null)
			return p.getCloseoutDetails().getWarrantyNotes();
		else if(value.equals("closeoutDocumentNotes") && p.getCloseoutDetails().getCloseoutDocumentsNotes() != null)
			return p.getCloseoutDetails().getCloseoutDocumentsNotes();
		
		else if(value.equals("buildingPermit") && p.getPermits() != null && p.getPermits().getBuildingPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getBuildingPermitStatus()); 
			
			if(p.getPermits().getBuilding() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getBuilding());
			}
			
			return retVal;
		}
		else if(value.equals("mechanicalPermit") && p.getPermits() != null && p.getPermits().getMechanicalPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getMechanicalPermitStatus()); 
			if(p.getPermits().getMechanicalPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getMechanicalPermitDate());
			}
			return retVal;
		}
		else if(value.equals("electricalPermit") && p.getPermits() != null && p.getPermits().getElectricalPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getElectricalPermitStatus());
			
			if(p.getPermits().getElectrical() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getElectrical());
			}
			  
			return retVal;
		}
		else if(value.equals("plumbingPermit") && p.getPermits() != null && p.getPermits().getPlumbingPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getPlumbingPermitStatus()); 
			if(p.getPermits().getPlumbingPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getPlumbingPermitDate());
			}
			return retVal;
		}
		else if(value.equals("ceilingPermit") && p.getPermits() != null && p.getPermits().getCeilingPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getCeilingPermitStatus()); 
			if(p.getPermits().getFireAlarmPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getFireAlarmPermitDate());
			}
			return retVal;
		}
		else if(value.equals("gasPermit") && p.getPermits() != null && p.getPermits().getGasPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getGasPermitStatus()); 
			if(p.getPermits().getFireAlarmPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getFireAlarmPermitDate());
			}
			return retVal;
		}
		else if(value.equals("sprinklerPermit") && p.getPermits() != null && p.getPermits().getSprinklerPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getSprinklerPermitStatus()); 
			if(p.getPermits().getFireSprinklerDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal  + " " + dForm.format(p.getPermits().getFireSprinklerDate());
			}
			return retVal;
		}
		else if(value.equals("fireAlarmPermit") && p.getPermits() != null && p.getPermits().getFireAlarmPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getFireAlarmPermitStatus()); 
			if(p.getPermits().getFireAlarmPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getFireAlarmPermitDate());
			} 
			
			return retVal;
		}
		else if(value.equals("lowVoltagePermit") && p.getPermits() != null && p.getPermits().getVoltagePermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getVoltagePermitStatus()); 
			if(p.getPermits().getLowVoltagePermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getLowVoltagePermitDate());
			}
			return retVal;
		} 
		
		else if(value.equals("tempCertOccupancyPermit") && p.getPermits() != null && p.getPermits().getTempCertOccupancyPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getTempCertOccupancyPermitStatus()); 
			if(p.getPermits().getTempCertOccupancyPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getTempCertOccupancyPermitDate());
			}
			return retVal;
		}
		else if(value.equals("certOccupancyPermit") && p.getPermits() != null && p.getPermits().getCertOccupancyPermitStatus() != null)
		{
			String retVal = convertStatusNumber(p.getPermits().getCertOccupancyPermitStatus()); 
			if(p.getPermits().getCertOccupancyPermitDate() != null){
				if(!retVal.equals("N/A") && !retVal.equals("tbd"))
					retVal = retVal + " " + dForm.format(p.getPermits().getCertOccupancyPermitDate());
			}
			return retVal;
		}
		else if(value.equals("permitNotes") && p.getPermits() != null && p.getPermits().getPermitNotes() != null) {
			return p.getPermits().getPermitNotes();
		} else if(value.equals("inspectionNotes") && p.getPermits() != null && p.getPermits().getInspectionNotes() != null) {
			return p.getPermits().getInspectionNotes();
		}
		else if(value.equals("buildingInspection") && p.getPermits() != null && p.getPermits().getBuildingInspectionStatus() != null)
		{
			return p.getPermits().getBuildingInspectionStatus();
		}
		else if(value.equals("mechanicalInspection") && p.getPermits() != null && p.getPermits().getMechanicalInspectionStatus() != null)
		{
			return p.getPermits().getMechanicalInspectionStatus();
		}
		else if(value.equals("electricalInspection") && p.getPermits() != null && p.getPermits().getElectricalInspectionStatus() != null)
		{
			return p.getPermits().getElectricalInspectionStatus();
		}
		else if(value.equals("plumbingInspection") && p.getPermits() != null && p.getPermits().getPlumbingInspectionStatus() != null)
		{
			return p.getPermits().getPlumbingInspectionStatus();
		}
		else if(value.equals("gasInspection") && p.getPermits() != null && p.getPermits().getGasInspectionStatus() != null)
		{
			return p.getPermits().getGasInspectionStatus();
		}
		else if(value.equals("ceilingInspection") && p.getPermits() != null && p.getPermits().getCeilingInspectionStatus() != null)
		{
			return p.getPermits().getCeilingInspectionStatus();
		}
		else if(value.equals("sprinklerInspection") && p.getPermits() != null && p.getPermits().getSprinklerInspectionStatus() != null)
		{
			return p.getPermits().getSprinklerInspectionStatus();
		}
		else if(value.equals("fireAlarmInspection") && p.getPermits() != null && p.getPermits().getFireAlarmInspectionStatus() != null)
		{
			return p.getPermits().getFireAlarmInspectionStatus();
		}
		else if(value.equals("lowVoltageInspection") && p.getPermits() != null && p.getPermits().getVoltageInspectionStatus() != null)
		{
			return p.getPermits().getVoltageInspectionStatus();
		}
		else if(value.equals("tempCertOccupancyInspection") && p.getPermits() != null && p.getPermits().getTempCertOccupancyInspectionStatus() != null)
		{
			return p.getPermits().getTempCertOccupancyInspectionStatus();
		}
		else if(value.equals("certOccupancyInspection") && p.getPermits() != null && p.getPermits().getCertOccupancyInspectionStatus() != null)
		{
			return p.getPermits().getCertOccupancyInspectionStatus();
		}
		else if(value.equals("equipmentName") && p.getProjEquipment() != null) 
		{
			int amountOfEquipment = p.getProjEquipment().size();
			if(amountOfEquipment == 0) return "";
			
			StringBuilder equipmentBuilder = new StringBuilder();
			Iterator<NewEquipment> iter = p.getProjEquipment().iterator();

			while(iter.hasNext())
			{
				NewEquipment tmp = iter.next();
				equipmentBuilder.append("<tr><td></td><td>" + p.getWarehouse().getCity().getName() + ", " + 
													  p.getWarehouse().getState().getAbbreviation());
				equipmentBuilder.append("</td><td>" + p.getProjectItem().getName());
				equipmentBuilder.append("</td><td>" + p.getStatus().getName() + "</td><td>");
				
				equipmentBuilder.append(nullOrFull(tmp.getEquipmentName()) + "</td><td>" + 
										nullOrFull(tmp.getVendor()) + "</td><td>" + 
										tryDateFormat(dForm, tmp.getEstDeliveryDate()) + "</td><td>" + 
										tryDateFormat(dForm, tmp.getDeliveryDate()) + "</td><td>" +
										nullOrFull(tmp.getNotes()) + "</td>");
				equipmentBuilder.append("</tr>");
			}

			return equipmentBuilder.toString();
		} else if ((value.equals("changeOrder") && p.getChangeOrders() != null) ||
				(value.contains("changeOrder_") && p.getChangeOrders() != null)) {
			int amountOfChangeOrders = p.getChangeOrders().size();
			if (amountOfChangeOrders == 0) return "";
			
			List<String> statuses = null;
			if(value.contains("changeOrder_")) {
				value = value.replace("changeOrder_", "");
				statuses = new ArrayList<String>(Arrays.asList(value.split(",")));
			}
			
			
		
			
			StringBuilder changeOrders = new StringBuilder();
			
			Iterator<ChangeOrder> iter2 = p.getChangeOrders().iterator();
			List<ChangeOrder> list = new ArrayList<ChangeOrder>();
			while (iter2.hasNext()) {
			    list.add(iter2.next());
			}
			sortChangeOrders(list);

			Iterator<ChangeOrder> iter = list.iterator();
			
			while(iter.hasNext()) {
				ChangeOrder tmp = iter.next();
				if(statuses != null) {
					boolean found = false;
					for(String str: statuses) {
						if(str.equals(nullOrFull(tmp.getStatus()))) 
						{
							found = true;
							break;
						}
					}
					if(found == false) continue;
				}
				changeOrders.append("<tr><td class='tableIndex'></th><td>" + p.getWarehouse().getCity().getName() + 
									", " + p.getWarehouse().getState().getAbbreviation() + "</td>");
				changeOrders.append("<td>" + p.getProjectItem().getName() + "</td>");
				changeOrders.append("<td align = 'center'>" + p.getProjectManagers().getName() + "</td>");				
				changeOrders.append("<td align = 'center'>" + nullOrFull(tmp.getMcsCO()) + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getTitle()) + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getBriefDescription()) + "</td>");
				changeOrders.append("<td>" + convertChangeOrderStatus(tmp.getStatus()) + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getSubNames()) + "</td>");			
				changeOrders.append("<td>" + tryDateFormat(dForm, tmp.getProposalDate()) + "</td>");
				changeOrders.append("<td>" + convertChangeOrderType(tmp.getType())  + "</td>");
				changeOrders.append("<td>" + tryDateFormat(dForm, tmp.getSubmittedDate()) + "</td>");
				changeOrders.append("<td>" + tryDateFormat(dForm,tmp.getApprovedDate()) + "</td>");
				changeOrders.append("<td>$" + doubleToDisplayableString(tmp.getCost()) + "</td>");
				changeOrders.append("<td>$" + doubleToDisplayableString(tmp.getSell()) + "</td>");	
				changeOrders.append("<td align = 'center'>" + nullOrFull(tmp.getInvoiceNumber()) + "</td>");
				changeOrders.append("<td align = 'center'>" + nullOrFull(tmp.getSubmittedTo()) + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getNotes()) + "</td>");
			}
			return changeOrders.toString();
		}
		else if (value.equals("changeOrderSolo") && p.getChangeOrders() != null) {
			int amountOfChangeOrders = p.getChangeOrders().size();
			if (amountOfChangeOrders == 0) return "";
			
			StringBuilder changeOrders = new StringBuilder();
			
			Iterator<ChangeOrder> iter2 = p.getChangeOrders().iterator();
			List<ChangeOrder> list = new ArrayList<ChangeOrder>();
			while (iter2.hasNext()) {
			    list.add(iter2.next());
			}
			sortChangeOrders(list);

			Iterator<ChangeOrder> iter = list.iterator();
			
			while(iter.hasNext()) {
				ChangeOrder tmp = iter.next();
				String MCS_INVOICE_STATUS = tmp.getMcsInvoiceStatus();
				String SUB_INVOICE_STATUS = tmp.getSubInvoiceStatus();
				String AND_INVOICE_STATUS = "";

				if(MCS_INVOICE_STATUS == null || SUB_INVOICE_STATUS == null){
					AND_INVOICE_STATUS = "   ";
				}
				else if(MCS_INVOICE_STATUS.equals("1") && SUB_INVOICE_STATUS.equals("1")){			
					AND_INVOICE_STATUS = "Yes";
				}
				else if(MCS_INVOICE_STATUS.equals("0") || SUB_INVOICE_STATUS.equals("0")){			
					AND_INVOICE_STATUS = "No";
				}
				else if(MCS_INVOICE_STATUS.equals("2") && SUB_INVOICE_STATUS.equals("2")){			
					AND_INVOICE_STATUS = "N/A";
				}

				else if(MCS_INVOICE_STATUS.equals("2") && SUB_INVOICE_STATUS.equals("1")){			
					AND_INVOICE_STATUS = "Yes";
				}
				else if(MCS_INVOICE_STATUS.equals("1") && SUB_INVOICE_STATUS.equals("2")){			
					AND_INVOICE_STATUS = "Yes";
				}

				changeOrders.append("<tr><td class='tableIndex' style = 'display:none'></td><td align = 'center'>" + nullOrFull(tmp.getMcsCO()) + "</td>");
				changeOrders.append("<td>" + p.getWarehouse().getCity().getName() + 
									", " + p.getWarehouse().getState().getAbbreviation() + "</td>");
				changeOrders.append("<td>" + p.getProjectItem().getName() + "</td>");
				changeOrders.append("<td align = 'center'>" + p.getProjectManagers().getName() + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getTitle()) + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getBriefDescription()) + "</td>");
				changeOrders.append("<td>" + convertChangeOrderStatus(tmp.getStatus()) + "</td>");
				changeOrders.append("<td>" + AND_INVOICE_STATUS + "</td>");
				changeOrders.append("<td>" + nullOrFull(tmp.getSubNames()) + "</td>");			
				changeOrders.append("<td>" + tryDateFormat(dForm, tmp.getProposalDate()) + "</td>");
				changeOrders.append("<td>" + convertChangeOrderType(tmp.getType()) + "</td>");
				changeOrders.append("<td>" + tryDateFormat(dForm, tmp.getSubmittedDate()) + "</td>");
				changeOrders.append("<td>" + tryDateFormat(dForm,tmp.getApprovedDate()) + "</td>");
				changeOrders.append("<td>$" + doubleToDisplayableString(tmp.getCost()) + "</td>");
				changeOrders.append("<td>$" + doubleToDisplayableString(tmp.getSell()) + "</td>");
				changeOrders.append("<td align = 'center'>" + nullOrFull(tmp.getInvoiceNumber()) + "</td>");
				changeOrders.append("<td align = 'center'>" + nullOrFull(tmp.getSubmittedTo()) + "</td>");
				changeOrders.append("<td>" + addingBR(nullOrFull(tmp.getNotes())) + "</td>");
			}
			return changeOrders.toString();
		}
		else if (value.equals("equipmentSolo") && p.getEquipment() != null) {
			
			//System.out.println("IT is coming here 2");

			int amountOfEquipments = p.getProjEquipment().size();
			//System.out.println("AMT EQP IS");
			System.out.println(amountOfEquipments);
			if (amountOfEquipments == 0) return "";
				
			StringBuilder equipments = new StringBuilder();
			Iterator<NewEquipment> iter2 = p.getProjEquipment().iterator();
			List<NewEquipment> list = new ArrayList<NewEquipment>();
			while (iter2.hasNext()) {
			    list.add(iter2.next());
			}
			//sortChangeOrders(list);
			
			List<NewEquipment> sortedList = list.stream()
					  .sorted(Comparator.comparing(NewEquipment::getEquipmentName))
					  .collect(Collectors.toList());
			
			list = sortedList;
			
			Iterator<NewEquipment> iter = list.iterator();
			
			while(iter.hasNext()) {
				NewEquipment tmp = iter.next();
								
				equipments.append("<tr><td class='tableIndex'></th><td align = 'center'>" + nullOrFull(tmp.getEquipmentName()) + "</td>");
				equipments.append("<td>" + nullOrFull(tmp.getDescription()) + "</td>");
				//Handling the java.lang.NullPointerException		
				if(tmp.getEqSupplier() != null) {
					equipments.append("<td>" + nullOrFull(tmp.getEqSupplier().getName()) + "</td>");
				}
				else {
					equipments.append("<td>" + nullOrFull(tmp.getEqSupplier()) + "</td>");
				}

				//Handling the java.lang.NullPointerException
				if(tmp.getEqStatus() != null) {
					equipments.append("<td>" + nullOrFull(tmp.getEqStatus().getName()) + "</td>");
				}			
				else {
					equipments.append("<td>" + nullOrFull(tmp.getEqStatus()) + "</td>");
				}
				equipments.append("<td>" + tryDateFormat(dForm,tmp.getOrderedDate()) + "</td>");			
				equipments.append("<td>" + tryDateFormat(dForm,tmp.getEstDeliveryDate()) + "</td>");
				equipments.append("<td>" + tryDateFormat(dForm,tmp.getDeliveryDate()) + "</td>");
				equipments.append("<td>" + addingBR(nullOrFull(tmp.getNotes())) + "</td>");			
			}			
			return equipments.toString();
		
			
		}
		else if (value.contains("projectTaskSolo") && ProjectObjectService.getAllTasks(p.getId()) != null) {
			
			//System.out.println("IT is coming here 2");
			String projStatus = value.split("~")[1];			
			int amountOfTasks = ProjectObjectService.getAllTasks(p.getId()).size();			
			System.out.println(amountOfTasks);
			if (amountOfTasks == 0) return "";
				
			StringBuilder projTasks = new StringBuilder();
			Iterator<Task> iter2 = ProjectObjectService.getAllTasks(p.getId()).iterator();
			List<Task> list = new ArrayList<Task>();
			while (iter2.hasNext()) {
				Task tmp1 = iter2.next();
				
				if(projStatus.equals("all")) {				
					list.add(tmp1);								
				}
				
				else if(projStatus.equals("open_complete")) {
					if(tmp1.getTaskStatus().getStatus().equals("Open") || tmp1.getTaskStatus().getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("open")) {
					if(tmp1.getTaskStatus().getStatus().equals("Open")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("complete")) {
					if(tmp1.getTaskStatus().getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				else if(projStatus.equals("closed")) {
					if(tmp1.getTaskStatus().getStatus().equals("Closed")) {
						list.add(tmp1);	
					}					
				}
			    //list.add(iter2.next());
			}			
			//sortChangeOrders(list);
			
			List<Task> sortedList = list.stream()
					  .sorted(Comparator.comparing(Task::getTitle))
					  .collect(Collectors.toList());
			
			list = sortedList;
			
			Iterator<Task> iter = list.iterator();
			
			while(iter.hasNext()) {				
				Task tmp = iter.next();
				System.out.println(tmp.getTaskStatus().getStatus());
				projTasks.append("<tr><td class='tableIndex'></th><td align = 'center'>" + nullOrFull(tmp.getTitle()) + "</td>");
				projTasks.append("<td>" + nullOrFull(tmp.getDescription()) + "</td>");	
				if(tmp.getAssignee() != null) {
					projTasks.append("<td>" + nullOrFull(tmp.getAssignee().getFirstName()) + "</td>");
				}
				else {
					projTasks.append("<td>" + nullOrFull(tmp.getAssignee()) + "</td>");
				}
//				projTasks.append("<td>" + nullOrFull(tmp.getAssignee().getFirstName()) + "</td>");
				if(tmp.getSubAssignee() != null) {
					projTasks.append("<td>" + nullOrFull(tmp.getSubAssignee().getName()) + "</td>");
				}
				else {
					projTasks.append("<td>" + nullOrFull(tmp.getSubAssignee()) + "</td>");
				}
//				projTasks.append("<td>" + nullOrFull(tmp.getSubAssignee().getName()) + "</td>");				
				projTasks.append("<td>" + tryDateFormat(dForm,tmp.getAssignedDate()) + "</td>");			
				projTasks.append("<td>" + tryDateFormat(dForm,tmp.getDueDate()) + "</td>");
				projTasks.append("<td>" + nullOrFull(tmp.getSeverity()) + "</td>");
				if(tmp.getTaskStatus() != null) {
					projTasks.append("<td>" + nullOrFull(tmp.getTaskStatus().getStatus()) + "</td>");
				}
				else {
					projTasks.append("<td>" + nullOrFull(tmp.getTaskStatus()) + "</td>");
				}
//				projTasks.append("<td>" + nullOrFull(tmp.getTaskStatus().getStatus()) + "</td>");
				projTasks.append("<td>" + addingBR(nullOrFull(tmp.getNotes())) + "</td>");			
			}		
			
			return projTasks.toString();
		
			
		}
		
		else if (value.contains("projectPendInvSolo") && ProjectObjectService.getAllPendInvs(p.getId()) != null) {
						
			String projStatus = value.split("~")[1];			
			int amountOfPendInvs = ProjectObjectService.getAllPendInvs(p.getId()).size();						
			if (amountOfPendInvs == 0) return "";
				
			StringBuilder projPendInvs = new StringBuilder();
			Iterator<PendingInvoice> iter2 = ProjectObjectService.getAllPendInvs(p.getId()).iterator();
			List<PendingInvoice> list = new ArrayList<PendingInvoice>();
			while (iter2.hasNext()) {
				PendingInvoice tmp1 = iter2.next();
				
				if(projStatus.equals("all")) {				
					list.add(tmp1);								
				}
				
				else if(projStatus.equals("open_complete")) {
					if(tmp1.getStatus().equals("Open") || tmp1.getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("open")) {
					if(tmp1.getStatus().equals("Open")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("complete")) {
					if(tmp1.getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				else if(projStatus.equals("closed")) {
					if(tmp1.getStatus().equals("Closed")) {
						list.add(tmp1);	
					}					
				}
			    //list.add(iter2.next());
			}			
			//sortChangeOrders(list);
			
			List<PendingInvoice> sortedList = list.stream()
					  .sorted(Comparator.comparing(PendingInvoice::getInvoiceNumber))
					  .collect(Collectors.toList());
			
			list = sortedList;
			
			Iterator<PendingInvoice> iter = list.iterator();
			
			while(iter.hasNext()) {				
				PendingInvoice tmp = iter.next();
				System.out.println(tmp.getStatus());
				projPendInvs.append("<tr><td class='tableIndex'></th><td align = 'center'>" + nullOrFull(tmp.getInvoiceNumber()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getInvoiceAmount()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getSubNames()) + "</td>");				
				projPendInvs.append("<td>" + tryDateFormat(dForm,tmp.getSubmittedDate()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getBriefDescription()) + "</td>");	
				projPendInvs.append("<td>" + nullOrFull(tmp.getStatus()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getDbCONum()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getPoNum()) + "</td>");
				projPendInvs.append("<td>" + addingBR(nullOrFull(tmp.getNotes())) + "</td>");
														
			}		
			
			return projPendInvs.toString();
		
			
		}
		
		
		else if (value.contains("allPendInv") && ProjectObjectService.getAllPendInvs() != null) {
			
			String projStatus = value.split("~")[1];			
			int amountOfPendInvs = ProjectObjectService.getAllPendInvs().size();						
			if (amountOfPendInvs == 0) return "";
				
			StringBuilder projPendInvs = new StringBuilder();
			Iterator<PendingInvoice> iter2 = ProjectObjectService.getAllPendInvs().iterator();
			List<PendingInvoice> list = new ArrayList<PendingInvoice>();
			while (iter2.hasNext()) {
				PendingInvoice tmp1 = iter2.next();
				
				if(projStatus.equals("all")) {				
					list.add(tmp1);								
				}
				
				else if(projStatus.equals("open_complete")) {
					if(tmp1.getStatus().equals("Open") || tmp1.getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("open")) {
					if(tmp1.getStatus().equals("Open")) {
						list.add(tmp1);	
					}					
				}
				
				else if(projStatus.equals("complete")) {
					if(tmp1.getStatus().equals("Completed")) {
						list.add(tmp1);	
					}					
				}
				else if(projStatus.equals("closed")) {
					if(tmp1.getStatus().equals("Closed")) {
						list.add(tmp1);	
					}					
				}
			    //list.add(iter2.next());
			}			
			//sortChangeOrders(list);
			
			List<PendingInvoice> sortedList = list.stream()
					  .sorted(Comparator.comparing(PendingInvoice::getInvoiceNumber))
					  .collect(Collectors.toList());
			
			list = sortedList;
			
			Iterator<PendingInvoice> iter = list.iterator();			
			while(iter.hasNext()) {				
				PendingInvoice tmp = iter.next();				
				
					
				// IN THE FUTURE IF WE NEED ANYTHING ELSE FROM THE PROJECT DETAILS
//				Project currentProject = null;
//				try {
//					currentProject = (Project)ProjectObjectService.get(Long.parseLong(tmp.getPendingInvoice_id()),  "Project");
//				} catch (ClassNotFoundException e) {
//					e.printStackTrace();
//				}
			
											
				projPendInvs.append("<tr><td class='tableIndex'></th><td align = 'center'>" + nullOrFull(tmp.getPendingInvoice_city()) + ", "
				+nullOrFull(tmp.getPendingInvoice_stateabbr())+ "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getPendingInvoice_item()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getPendingInvoice_manager()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getInvoiceNumber()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getInvoiceAmount()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getSubNames()) + "</td>");				
				projPendInvs.append("<td>" + tryDateFormat(dForm,tmp.getSubmittedDate()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getBriefDescription()) + "</td>");	
				projPendInvs.append("<td>" + nullOrFull(tmp.getStatus()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getDbCONum()) + "</td>");
				projPendInvs.append("<td>" + nullOrFull(tmp.getPoNum()) + "</td>");
				projPendInvs.append("<td>" + addingBR(nullOrFull(tmp.getNotes())) + "</td>");

														
			}		
			
			return projPendInvs.toString();
		
			
		}
		
		else
			return "---";	// If nothing else just fill the field with nothing
	}
	
	/**
	 * Gets the report value given a task and a key. 
	 * This method checks every possible value for tasks against the passed in value-key 
	 * and retrieves and formats that value for display on the table
	 * @param value - the key of the value to be found
	 * @param t - the task containing the values
	 * @return - a string containing the value
	 */
	public synchronized static String getReportVal(String value, Task t){		
		DateFormat dForm = new SimpleDateFormat("MM/dd/yyyy");
		String returnVal = "";
		if(value.equals("warehouse")){
		     returnVal = t.getProject().getWarehouse().getCity().getName() + " #" + t.getProject().getWarehouse().getWarehouseID();
		} 
		else if(value.equals("task_item")){
			if(t.getProject().getProjectItem() == null || t.getProject().getProjectItem().getName() == null)
				returnVal = "---";
			else returnVal = t.getProject().getProjectItem().getName();
		}
		else if(value.equals("task_title")){
			returnVal = t.getTitle();
		}
		else if(value.equals("task_assignee")) { 
			//System.out.println(t.getType());
			if(!t.getAssignee().getFirstName().equals(null))
				returnVal = t.getAssignee().getFirstName();
			else
				returnVal = "---";
		}
		else if(value.equals("task_subassignee")) { 
			//System.out.println(t.getType());
			if(!t.getSubAssignee().getName().equals(null))
				returnVal = t.getSubAssignee().getName();
			else
				returnVal = "---";
		}
		else if(value.equals("task_assignee_num")) {
			//System.out.println("assignee num");
			String us;
			List<Object> pm = ProjectObjectService.getAll("Person");
			
			String per;	
				us = t.getAssignee().getFirstName();
				//System.out.println("user = "+ us);
				per = convertUserToPerson(us,pm);
				//System.out.println("person = " + per);
				returnVal = per;
		}
		else if(value.equals("task_description")) {
			returnVal = t.getDescription();
		}
		else if(value.equals("task_created_date")) {
			if(t.getAssignedDate() != null) returnVal = dForm.format(t.getAssignedDate()).toString();
			else returnVal = "---";
		}
		else if(value.equals("task_due_date")) {
			if(t.getDueDate() != null) returnVal = dForm.format(t.getDueDate()).toString();
			else returnVal = "---";
		}
		else if(value.equals("task_priority")) {
			returnVal = Integer.toString(t.getSeverity());
		}
		else if(value.equals("task_notes")) {
			returnVal = t.getNotes();
		}
		else if(value.equals("task_status")){
			returnVal = t.getTaskStatus().getStatus();
		}
		else if(value.equals("project_item"))
		{
			returnVal = t.getProject().getProjectItem().getName();
		}
		else
		{
			returnVal = "---";
		}
		
		//System.out.println(returnVal);
		return returnVal;
		
	}
	//A.R.G -->This function was initially checking the person manually. Changed it.
	private static String convertUserToPerson(String user, List<Object> pm)
	{
		for(int i=0 ; i< pm.size();i++) {
			Person personpm = (Person) pm.get(i);
			if(personpm.getName().toLowerCase().equals(user.toLowerCase())){
				return personpm.getId().toString();	
			}
		}
		return "";
	}
	
	private static String convertStatusNumber(String retVal) {
		
		if(retVal == null || retVal.equals("0")) return "tbd";
		else if (retVal.equals("1") || retVal.equalsIgnoreCase("preparing"))	return "Preparing";
		else if (retVal.equals("2") || retVal.equalsIgnoreCase("submitted"))	return "Submitted";
		else if (retVal.equals("3") || retVal.equalsIgnoreCase("approved"))	return "Approved";
		else if (retVal.equals("4") || retVal.equalsIgnoreCase("issued"))	return "Issued";
		else if(retVal.equals("5") || retVal.equalsIgnoreCase("closed"))      return "Closed";
		else if(retVal.equals("6") || retVal.equalsIgnoreCase("n/a"))     return "N/A";
		else return "tbd";
		
	
	}

	private static Object nullOrFull(Object value)
	{
		if(value == null || value.toString().equals(""))
			return "---";
		else return value;
	}
	
	private static Object addingBR(Object value)
	{
		String[] arrOfStr = ((String) value).split("\n");
		String n1 = "";
		for (String a: arrOfStr) {
			n1 = n1 + a + "<br>";
		}
            
		return n1;
	}
	
	private static String tryDateFormat(DateFormat dForm, Date value) {
		if(value == null) return "---";
		
		return dForm.format(value);
	}
	
	


	/**
	 * Gets the first person from a set. Though this should eventually 
	 * be removed because only a single manager and supervisor will be assigned
	 * to each project.
	 * @param set - set of people
	 * @return - the first one in the set
	 */
	private static Person getFirstFromSet(Set<Person> set)
	{
		Iterator<Person> i = set.iterator();
		if (i.hasNext())
			return i.next();
		else
			return new Person("---");
	}
	
	/**
	 * converts closeoutstatus values. The statuses are stored in the database as 
	 * strings from the initial form and are 1,2,3 or nothing. 
	 * @param i - the databse held string for a given closeoutstatus
	 * @return [COMPLETE: "Complete", INCOMPLETE: "Incomplete", NA: "N/A"] else ""
	 */
	private static String convert(String i)
	{
		if(i.equals(COMPLETE))
			return "Complete";
		else if(i.equals(INCOMPLETE))
			return "Incomplete";
		else if(i.equals(NA))
			return "N/A";
		else if(i.equals(REQUIRED))
			return "Required";
		else if(i.equals(TBD))
			return "TBD";
		
		// Add conditions where i equals REQUIRED AND TBD

		
		return "";
	}
	
	private static String convertChangeOrderType(String i) {
		if(i == null) return "---";
		
		List<Object> types = ProjectObjectService.getAll("ChangeOrderType");

		projectObjects.ChangeOrderType tmp;
		
		for(Object type: types)
		{
			try 
			{
				tmp = (projectObjects.ChangeOrderType) type;
			}
			catch(Exception e) {
				e.printStackTrace();
				continue;
			}
			
			if(i.equals(tmp.getId().toString()))
				return tmp.getName();
		}
		
		return "---";
	}
	
	private static String convertChangeOrderStatus(String i) {
		
		if(i == null) return "---";
		
		List<Object> statuses = ProjectObjectService.getAll("ChangeOrderStatus");

		projectObjects.ChangeOrderStatus tmp;
		
		for(Object status: statuses)
		{
			try 
			{
				tmp = (projectObjects.ChangeOrderStatus) status;
			}
			catch(Exception e) {
				e.printStackTrace();
				continue;
			}
			
			if(i.equals(tmp.getId().toString()))
				return tmp.getName();
		}
		
		return "---";
		/*
		if (i == null) return "---";
		
		if(i.equals("1"))
			return "Preparing";
		else if(i.equals("2"))
			return "Submitted";
		else if(i.equals("3"))
			return "Approved";
		else if(i.equals("4"))
			return "Rejected";
		else if(i.equals("5"))
			return "Complete";
		else if(i.equals("6"))
			return "Review";
		
		
		
		return "---";
		*/
	}
	
	public synchronized static void sortChangeOrders(List<ChangeOrder> changeOrders)
	{
		Collections.sort(changeOrders, new ChangeOrderNumberComparator());
	}
	
	
	public synchronized static String doubleToDisplayableString(double cost)
	{
		String str = Double.toString(cost);
		char[] number = str.toCharArray();
		char[] newNumber;
		ArrayList<Character> numberWithCommas = new ArrayList<Character>();
		
		
		String cleanNumber = null;
		
		for(int i = 0; i < number.length; i++){
			if(i == 0 && number[i] !='0') break;
			else if(i == 1 && number[i] != '.') break;
			else if(i == 2 && number[i] != '0') break;
			
			if(i == 2 && number.length == 3) return "0";
		}
		
		int decimalCount = 0;
		int decimalIndex = 0;
		
		for(int i = 0; i < number.length; i++) {
			if(decimalCount != 0) {
				decimalCount++;
			}
			if(number[i] == '.') {
				decimalCount = 1;
				decimalIndex = i;
			}
		}
		
		if(decimalCount == 2) 
		{
		  newNumber = new char[number.length + 1];
		  for(int i = 0; i < newNumber.length; i++) {
			  if(i == newNumber.length - 1) newNumber[i] = '0';
			  else newNumber[i] = number[i];
		  }
		  
		}
		else newNumber = number;
		
		for(int i = newNumber.length - 1; i >= decimalIndex; i--) { //CHECK IT
			numberWithCommas.add(newNumber[i]);
		}
		
		int commaCount = 0;
		for(int i = decimalIndex - 1; i > -1; i--) {
			commaCount++;
			numberWithCommas.add(newNumber[i]);
			if(commaCount % 3 == 0 && i != 0) numberWithCommas.add(',');
		}
		
		char[] cleanArray = new char[numberWithCommas.size()];		
		int q = cleanArray.length - 1;
		for(Character ch: numberWithCommas){
			cleanArray[q] = ch;
			q--;
		}
		cleanNumber = new String(cleanArray);
		
		return cleanNumber;
		
	}
}
