package services;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import objects.HibernateUtil;
import projectObjects.CloseoutDetails;
import projectObjects.Inspections;
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectObject;


import java.util.Set;
/**
 * 
 * This class contains the methods that auto fill information
 * for a project.
 *
 */
public class AutoFillService {
	
	/**
	 * This method automatically fills a project's appropriate fields
	 * @param proj The project to be auto filled
	 * @param domain this represents what kind of auto filling will be done to the project
	 * @param value This value drives what the value of the auto fill will be
	 */
	public static void autoFillProject(Project proj , String domain , String value)
	{
		//System.out.println("autofill Called");
		System.out.println("domain is " + domain);

		if(proj == null || domain == null || value == null) {
			System.out.println("Error: Null Autofill");
			return;
		}
		
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		Date today = new Date();
		try {
			today = formatter.parse(formatter.format(today));			
		} catch(Exception e)
		{
			System.out.println("ERROR PARSING DATE");
			e.printStackTrace();
		}
		
		
		if(domain.equals("HVAC"))
		{
			autoFillHVAC(proj , value , today);
		}
		else if(domain.equals("Refrigeration"))
		{
			autoFillRefrigeration(proj , value , today);
		}
		else if(domain.equals("Permits")) 
		{
			autoFillPermits(proj , value , today);
			autoFillFinalInspections(proj , value , today);
		}
		else if(domain.equals("ProjectClass"))
		{
			autoFillCloseoutDocs(proj, value, today);
			autoFillCloseout(proj, value, today);
		}
		
			
	}
	
	public static void autoFillCloseoutDocs(Project proj, String _value, Date today)
	{
		String value = null;
		
		value = "4";
		
		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else 
			cd = proj.getCloseoutDetails();
		
		cd.setCostcoSignoffStatus(value);
		cd.setCostcoSignoff(today);
		
		cd.setPunchListStatus(value);
		cd.setPunchList(today);
		
		cd.setAsBuiltDrawingsStatus(value);
		cd.setAsBuilts(today);
		
		cd.setCloseOutPhotosStatus(value);
		cd.setCloseoutPhotosCL(today);
		
		proj.setCloseoutDetails(cd);
	}
	
	public static void autoFillCloseout(Project proj, String _value, Date today)
	{
		String value = null;
		
		if(_value.equals("2"))
			value = "6";
		else
			value = "3";
		
		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else 
			cd = proj.getCloseoutDetails();
		
		
		cd.setGasWarrantyStatus(value);
		cd.setGasWarrantyDate(today);
		
		cd.setHTIWarrantyStatus(value);
		cd.setHTIWarrantyDate(today);
		
		cd.setOtherWarrantyStatusA(value);
		cd.setOtherWarrantyDateA(today);
		
		cd.setOtherWarrantyStatusB(value);
		cd.setOtherWarrantyDateB(today);
		
		cd.setGasStatus(value);
		cd.setGasDate(today);
		
		cd.setHTIStatus(value);
		cd.setHTIDate(today);

		cd.setOtherFinalLeinsStatus(value);
		cd.setOtherFinalLeinsDate(today);
		
		cd.setOtherFinalLeinsBStatus(value);
		cd.setOtherFinalLeinsBDate(today);
		
		cd.setEquipmentSubmittalStatus(value);
		cd.setEquipmentSubCL(today);
		
		cd.setManualStatus(value);
		cd.setManualDate(today);
		
		if(_value.equals("2"))
			value = "4";
		else
			value = "3";
		
		cd.setMCSWarrantyStatus(value);
		cd.setMCSWarranty(today);
		
		cd.setGCWarrantyStatus(value);
		cd.setGCWarrantyDate(today);
		
		cd.setMechanicalWarrantyStatus(value);
		cd.setMechanicalWarrantyDate(today);
		
		cd.setElectricalWarrantyStatus(value);
		cd.setElectricalWarrantyDate(today);
		
		cd.setPlumbingWarrantyStatus(value);
		cd.setPlumbingWarrantyDate(today);
		
		cd.setSprinkleWarrantyStatus(value);
		cd.setSprinkleWarrantyDate(today);
		
		cd.setMCSStatus(value);
		cd.setMCSDate(today);
		
		cd.setGCStatus(value);
		cd.setGCDate(today);
		
		cd.setMechanicalStatus(value);
		cd.setMechanicalDate(today);
		
		cd.setElectricalStatus(value);
		cd.setElectricalDate(today);
		
		cd.setPlumbingStatus(value);
		cd.setPlumbingDate(today);
		
		cd.setSprinkleStatus(value);
		cd.setSprinkleDate(today);
		
		cd.setSubstantialCompletionStatus(value);
		cd.setSubstantialCompletionDate(today);
		
		cd.setPaymentOfDebtsAndClaimsStatus(value);
		cd.setPaymentOfDebtsAndClaimsDate(today);
		
		cd.setReleaseOfLiensStatus(value);
		cd.setReleaseOfLiensDate(today);
		
		if(_value.equals("2") || _value.equals("5"))
			value = "4";
		else
			value = "3";
		
		cd.setMulvannySignOffStatus(value);
		cd.setMulvannySignOffDate(today);
		
		proj.setCloseoutDetails(cd);
	}
	
	public static void autoFillHVAC(Project proj , String _value , Date today)
	{		
		String value = null;
		
		if(_value.equals("1"))
			value = "4";
		else if(_value.equals("0"))
			value = "3";
		else
			value = "6";
		
		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else
			cd = proj.getCloseoutDetails();
		
		cd.setHVACstartupFormDate(today);
		cd.setHVACstartupFormStatus(value);
		
		cd.setVerisaeShutdownReport(today);
		cd.setVerisaeReportStatus(value);
		
		proj.setCloseoutDetails(cd);
	}
	
	public static void autoFillRefrigeration(Project proj , String _value , Date today)
	{
		String value = null;
		double salVal = 0;
		
		if(_value.equals("1")) {
			value = "4";
			salVal = 0;
		}
		else if(_value.equals("0")) {
			value = "3";
			salVal = -1;
		}	
		else {
			value = "6";
			salVal = -2;
		}
	
		
		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else
			cd = proj.getCloseoutDetails();
		
		cd.setAlarmHvacForm(today);
		cd.setAlarmFormStatus(value);
		
		projectObjects.SalvageValue salvageValue = new projectObjects.SalvageValue(today, salVal);
		cd.setSalvageValue(salvageValue);
		
		proj.setCloseoutDetails(cd);
		
	}
	
	public static void autoFillFinalInspections(Project proj, String _value, Date today)
	{
		String value = null;
		
		if(_value.equals("0"))
			value = "6";
		else if(_value.equals("1"))
			value = "6";
		else if(_value.equals("2"))
			value = "3";
		else
			value = "6";

		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else
			cd = proj.getCloseoutDetails();
		
		cd.setBuildingFinalStatus(value);
		cd.setBuildingPermitCL(today);
		
		cd.setCeilingFinalStatus(value);
		cd.setCeilingFinalDate(today);
		
		cd.setMechFinalStatus(value);
		cd.setMechFinalDate(today);
		
		cd.setElecFinalStatus(value);
		cd.setElecFinalDate(today);
		
		cd.setPlumbingFinalStatus(value);
		cd.setPlumbingFinalDate(today);
		
		cd.setGasFinalStatus(value);
		cd.setGasFinalDate(today);
		
		cd.setSprinkleFinalStatus(value);
		cd.setSprinkleFinalDate(today);
		
		cd.setFireAlarmFinalStatus(value);
		cd.setFireAlarmFinalDate(today);

		cd.setLowVolFinalStatus(value);
		cd.setLowVolFinalDate(today);
		
		cd.setTmpCertificateStatus(value);
		cd.setTmpCertificateDate(today);
		
		cd.setCertificateStatus(value);
		cd.setCertificateDate(today);
		
		proj.setCloseoutDetails(cd);
		
	}
	
	public static void autoFillPermits(Project proj , String _value , Date today)
	{
		String permitStatus = null;
		String inspectionStatus = null;
		String permitReq = null;
		String inspectionReq = null;
		
		Permits permits;
		if(proj.getPermits() == null)
			permits = new Permits();
		else
			permits = proj.getPermits();
		
		if(_value.equals("0")) {
			permitStatus = "TBD";
			inspectionStatus = "TBD";
			permitReq = "0";
			inspectionReq = "0";
		}
		else if(_value.equals("1")) {
			permitStatus = "Preparing";
			inspectionStatus = "TBD";
			permitReq = "1";
			inspectionReq = "1";
		}		
		else if(_value.equals("2")) {
			permitStatus = "N/A";
			inspectionStatus = "N/A";
			permitReq = "2";
			inspectionReq = "2";
		}
		else
		{
			permitStatus = "TBD";
			inspectionStatus = "TBD";
			permitReq = "0";
			inspectionReq = "0";
		}	
		
		permits.setBuilding(today);
		permits.setBuildingPermitRequired(permitReq);
		permits.setBuildingPermitStatus(permitStatus);
		permits.setBuildingInspectionLastUpdated(today);
		permits.setBuildingInspectionRequired(inspectionReq);
		permits.setBuildingInspectionStatus(inspectionStatus);
		
		permits.setCeiling(today);
		permits.setCeilingPermitRequired(permitReq);
		permits.setCeilingPermitStatus(permitStatus);
		permits.setCeilingInspectionLastUpdated(today);
		permits.setCeilingInspectionRequired(inspectionReq);
		permits.setCeilingInspectionStatus(inspectionStatus);
		
		permits.setMechanical(today);
		permits.setMechanicalPermitRequired(permitReq);
		permits.setMechanicalPermitStatus(permitStatus);
		permits.setMechanicalInspectionLastUpdated(today);
		permits.setMechanicalInspectionRequired(inspectionReq);
		permits.setMechanicalInspectionStatus(inspectionStatus);
		
		permits.setElectrical(today);
		permits.setElectricalPermitRequired(permitReq);
		permits.setElectricalPermitStatus(permitStatus);
		permits.setElectricalInspectionLastUpdated(today);
		permits.setElectricalInspectionRequired(inspectionReq);
		permits.setElectricalInspectionStatus(inspectionStatus);
		
		permits.setPlumbing(today);
		permits.setPlumbingPermitRequired(permitReq);
		permits.setPlumbingPermitStatus(permitStatus);
		permits.setPlumbingInspectionLastUpdated(today);
		permits.setPlumbingInspectionRequired(inspectionReq);
		permits.setPlumbingInspectionStatus(inspectionStatus);
		
		permits.setGas(today);
		permits.setGasPermitRequired(permitReq);
		permits.setGasPermitStatus(permitStatus);
		permits.setGasInspectionLastUpdated(today);
		permits.setGasInspectionRequired(inspectionReq);
		permits.setGasInspectionStatus(inspectionStatus);
		
		permits.setFire_sprinkler(today);
		permits.setSprinklerPermitRequired(permitReq);
		permits.setSprinklerPermitStatus(permitStatus);
		permits.setSprinklerInspectionLastUpdated(today);
		permits.setSprinklerInspectionRequired(inspectionReq);
		permits.setSprinklerInspectionStatus(inspectionStatus);
		
		permits.setFire_alarm(today);
		permits.setFireAlarmPermitRequired(permitReq);
		permits.setFireAlarmPermitStatus(permitStatus);
		permits.setFireAlarmInspectionLastUpdated(today);
		permits.setFireAlarmInspectionRequired(inspectionReq);
		permits.setFireAlarmInspectionStatus(inspectionStatus);
		
		permits.setLow_voltage(today);
		permits.setVoltagePermitRequired(permitReq);
		permits.setVoltagePermitStatus(permitStatus);
		permits.setVoltageInspectionLastUpdated(today);
		permits.setVoltageInspectionRequired(inspectionReq);
		permits.setVoltageInspectionStatus(inspectionStatus);
		
		proj.setPermits(permits);
		
	}

}
