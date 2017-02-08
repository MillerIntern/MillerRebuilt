package Servlets.helpers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.Set;

import projectObjects.NewEquipment;
import projectObjects.Person;
import projectObjects.Project;

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
	
	/**
	 * Creates table headers based on the values passed in from the report
	 * For an example, report.js might send values [mcsNum, warehouse, stage]. This method will then be called
	 * three times each time appending a new header with the resulting table having headers -- MCS Number | Warehouse | Stage
	 * @param sb - the string builder that contains the html page to be written out to
	 * @param value - the value of the current header
	 */
	public static void appendReportProjectHeader(StringBuilder sb, String value)
	{
		if(value.equals("mcsNum"))
		{
			sb.append("<th>");
			sb.append("MCS Number");
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
			sb.append("Costco Due Date");
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
		else if(value.equals("custNum"))
		{
			sb.append("<th class>");
			sb.append("Customer Number");
		}
		else if(value.equals("cost"))
		{
			sb.append("<th>");
			sb.append("Project Cost");
		}
		else if(value.equals("zachNotes"))
		{
			sb.append("<th class = 'longText'>");
			sb.append("Refrigeration Notes");				
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
			sb.append("MG2 Completion (G704)");
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
		else if(value.equals("certificateOfSubstantialCompletion"))
		{
			sb.append("<th>");
			sb.append("Certificate of Substantial Completion");
		}
		else if(value.equals("paymentOfDebtsAndClaims"))
		{
			sb.append("<th>");
			sb.append("Payment of Debts and Claims");
		}
		else if(value.equals("releaseOfLiens"))
		{
			sb.append("<th>");
			sb.append("Release of Liens");
		}
		else if(value.equals("mulvannyG2SignOff"))
		{
			sb.append("<th>");
			sb.append("Mulvanny G2 Sign Off");
		}
		else if(value.equals("equipmentName"))
		{
			sb.append("<th>Warehouse</th><th>Item</th><th>Project Status</th><th>Equipment Name</th>" +
					  "<th>Vendor</th><th>Estimated Delivery Date</th>" +
					  "<th>Actual Delivery Date</th><th class='longText'>Notes");
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
	public static String getReportVal(String value, Project p)
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
			return (p.getWarehouse().getCity().getName() + ", " + p.getWarehouse().getState().getAbbreviation());
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
		
		else if (value.equals("costcoDueDate") && p.getCostcoDueDate() != null)
			return dForm.format(p.getCostcoDueDate()).toString();
		
		else if (value.equals("proposalSubmitted") && p.getProposalSubmitted() != null)
			return dForm.format(p.getProposalSubmitted()).toString();
		
		else if (value.equals("type") && p.getProjectType() != null)
			return p.getProjectType().getName();
		
		else if (value.equals("asBuilts") && p.getCloseoutDetails().getAsBuilts() != null)
			return dForm.format(p.getCloseoutDetails().getAsBuilts());
		
		else if (value.equals("salvageValue") && p.getCloseoutDetails().getSalvageValue() != null)
			return "$"+ p.getCloseoutDetails().getSalvageValue().getValue() + " " + dForm.format(p.getCloseoutDetails().getSalvageValue().getDate());
		
		else if (value.equals("airGas") && p.getCloseoutDetails().getAirGas() != null)
			return dForm.format(p.getCloseoutDetails().getAirGas());
		
		else if (value.equals("permitsClosed") && p.getCloseoutDetails().getPermitsClosed() != null)
			return dForm.format(p.getCloseoutDetails().getPermitsClosed());
		
		else if (value.equals("projectNotes"))
			return String.valueOf(p.getProjectNotes());
		
		else if (value.equals("custNum") && p.getCustomerNumber() != null)
			return String.valueOf(p.getCustomerNumber());
		else if (value.equals("cost") && p.getCost() != null)
			return String.valueOf(p.getCost());
		else if (value.equals("zachNotes") && p.getZachUpdates() != null)
			return String.valueOf(p.getZachUpdates());
		else if (value.equals("permitApp") && p.getPermitApplication() != null)
			return dForm.format(p.getPermitApplication()).toString();
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
			if(p.getCloseoutDetails().getEquipmentSubCL() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getEquipmentSubCL()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("manuals"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getManualStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getManualStatus()));
			if(p.getCloseoutDetails().getManualDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getManualDate()));
			
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("punchList"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getPunchListStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getPunchListStatus()));
			if(p.getCloseoutDetails().getPunchList() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getPunchList()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("asBuiltDrawings"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getAsBuiltDrawingsStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getAsBuiltDrawingsStatus()));
			if(p.getCloseoutDetails().getAsBuilts() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getAsBuilts()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
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
		else if(value.equals("hvacStartup"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getHVACstartupFormStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getHVACstartupFormStatus()));
			if(p.getCloseoutDetails().getHVACstartupFormDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getHVACstartupFormDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("alarmHvacForm"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getAlarmFormStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getAlarmFormStatus()));
			if(p.getCloseoutDetails().getAlarmHvacForm() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getAlarmHvacForm()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("verisaeShutdownReport"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getVerisaeReportStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getVerisaeReportStatus()));
			if(p.getCloseoutDetails().getVerisaeShutdownReport() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getVerisaeShutdownReport()));
			 
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
		else if(value.equals("sprinklerWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getSprinkleWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getSprinkleWarrantyStatus()));
			if(p.getCloseoutDetails().getSprinkleWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSprinkleWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();
		}
		else if(value.equals("roofingWarranty"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getRoofingWarrantyStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getRoofingWarrantyStatus()));
			if(p.getCloseoutDetails().getRoofingWarrantyDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getRoofingWarrantyDate()));
			 
			if(sb.toString().equals(""))
				sb.append("---");
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
		else if(value.equals("roofingLiens"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getRoofingStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getRoofingStatus()));
			if(p.getCloseoutDetails().getRoofingDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getRoofingDate()));
			 
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
			if(p.getCloseoutDetails().getSubstantialCompletionDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getSubstantialCompletionDate()));
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
			if(p.getCloseoutDetails().getReleaseOfLiensDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getReleaseOfLiensDate()));
			if(sb.toString().equals(""))
				sb.append("---");
			return sb.toString();	
		}
		else if(value.equals("mulvannyG2SignOff"))
		{
			StringBuilder sb = new StringBuilder();
			if(p.getCloseoutDetails().getMulvannySignOffStatus() != null)
				sb.append(convert(p.getCloseoutDetails().getMulvannySignOffStatus()));
			if(p.getCloseoutDetails().getMulvannySignOffDate() != null)
				sb.append("<br>" + dForm.format(p.getCloseoutDetails().getMulvannySignOffDate()));
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
			if(p.getCloseoutDetails().getSprinkleFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleFinalStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getBuildingFinalStatus() != null)	
			{
				if(p.getCloseoutDetails().getBuildingFinalStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getBuildingFinalStatus().equals(COMPLETE))
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
			if(p.getCloseoutDetails().getSprinkleWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleWarrantyStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getRoofingWarrantyStatus() != null)	
			{
				if(p.getCloseoutDetails().getRoofingWarrantyStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getRoofingWarrantyStatus().equals(COMPLETE))
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
			if(p.getCloseoutDetails().getSprinkleStatus() != null)	
			{
				if(p.getCloseoutDetails().getSprinkleStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getSprinkleStatus().equals(COMPLETE))
					complete++;
			}
			if(p.getCloseoutDetails().getRoofingStatus() != null)
			{
				if(p.getCloseoutDetails().getRoofingStatus().equals(NA))
					required--;
				else if(p.getCloseoutDetails().getRoofingStatus().equals(COMPLETE))
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
			return convertPermitStatus(p.getPermits().getBuildingPermitStatus());
		}
		else if(value.equals("mechanicalPermit") && p.getPermits() != null && p.getPermits().getMechanicalPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getMechanicalPermitStatus());
		}
		else if(value.equals("electricalPermit") && p.getPermits() != null && p.getPermits().getElectricalPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getElectricalPermitStatus());
		}
		else if(value.equals("plumbingPermit") && p.getPermits() != null && p.getPermits().getPlumbingPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getPlumbingPermitStatus());
		}
		else if(value.equals("roofingPermit") && p.getPermits() != null && p.getPermits().getRoofingPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getRoofingPermitStatus());
		}
		else if(value.equals("sprinklerPermit") && p.getPermits() != null && p.getPermits().getSprinklerPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getSprinklerPermitStatus());
		}
		else if(value.equals("fireAlarmPermit") && p.getPermits() != null && p.getPermits().getFireAlarmPermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getFireAlarmPermitStatus());
		}
		else if(value.equals("lowVoltagePermit") && p.getPermits() != null && p.getPermits().getVoltagePermitStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getVoltagePermitStatus());
		}

		else if(value.equals("buildingInspection") && p.getPermits() != null && p.getPermits().getBuildingInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getBuildingInspectionStatus());
		}
		else if(value.equals("mechanicalInspection") && p.getPermits() != null && p.getPermits().getMechanicalInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getMechanicalInspectionStatus());
		}
		else if(value.equals("electricalInspection") && p.getPermits() != null && p.getPermits().getElectricalInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getElectricalInspectionStatus());
		}
		else if(value.equals("plumbingInspection") && p.getPermits() != null && p.getPermits().getPlumbingInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getPlumbingInspectionStatus());
		}
		else if(value.equals("roofingInspection") && p.getPermits() != null && p.getPermits().getRoofingInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getRoofingInspectionStatus());
		}
		else if(value.equals("sprinklerInspection") && p.getPermits() != null && p.getPermits().getSprinklerInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getSprinklerInspectionStatus());
		}
		else if(value.equals("fireAlarmInspection") && p.getPermits() != null && p.getPermits().getFireAlarmInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getFireAlarmInspectionStatus());
		}
		else if(value.equals("lowVoltageInspection") && p.getPermits() != null && p.getPermits().getVoltageInspectionStatus() != null)
		{
			return convertPermitStatus(p.getPermits().getVoltageInspectionStatus());
		}
		/*
		 * TODO: permit/inspection notes for bart report;
		 */
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
										nullOrFull(tmp.getEstDeliveryDate()) + "</td><td>" + 
										nullOrFull(tmp.getDeliveryDate()) + "</td><td>" +
										nullOrFull(tmp.getNotes()) + "</td>");
				equipmentBuilder.append("</tr>");
			}

			return equipmentBuilder.toString();
		}

		else
			return "---";	// If nothing else just fill the field with nothing
	}
	
	public static Object nullOrFull(Object value)
	{
		if(value == null || value.toString().equals(""))
			return "---";
		else return value;
	}
	
	
	/**
	 * @param buildingPermitStatus
	 * @return
	 */
	private static String convertPermitStatus(String buildingPermitStatus) 
	{
		if(buildingPermitStatus.equals(COMPLETE)) return "Preparing";
		if(buildingPermitStatus.equals(INCOMPLETE)) return "Submitted";
		if(buildingPermitStatus.equals(NA)) return "Issued";
		if(buildingPermitStatus.equals("4")) return "Closed";
		return "---";
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

		
		return "";
	}
}
