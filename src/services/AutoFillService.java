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
		System.out.println("autofill Called");

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
		
		
		if(domain.equals("HVAC")) {
			autoFillHVAC(proj , value , today);
		} else if(domain.equals("Refrigeration")) {
			autoFillRefrigeration(proj , value , today);
			
		} else if(domain.equals("Permits")) {
			autoFillPermits(proj , value , today);
		}
		
			
	}
	
//	public static void autoFillCloseoutDocs(Project proj, Date today)
//	{
//		String value = "4";
//		
//		CloseoutDetails cd;
//		if(proj.getCloseoutDetails() == null)
//			cd = new CloseoutDetails();
//		else 
//			cd = proj.getCloseoutDetails();
//		
//		cd.setPunchListStatus(value);
//		cd.setPunchList(today);
//		
//		cd.setAsBuiltDrawingsStatus(value);
//		cd.setAsBuilts(today);
//		
//		cd.setCloseOutPhotosStatus(value);
//		cd.setCloseoutPhotosCL(today);
//		
//		proj.setCloseoutDetails(cd);
//	}
	
	public static void autoFillHVAC(Project proj , String _value , Date today)
	{		
		String value = null;
		
		if(_value.equals("1"))
			value = "4";
		else
			value = "3";
		
		CloseoutDetails cd;
		if(proj.getCloseoutDetails() == null)
			cd = new CloseoutDetails();
		else
			cd = proj.getCloseoutDetails();
		
		cd.setHVACstartupFormDate(today);
		cd.setHVACstartupFormStatus(value);
		
		cd.setVerisaeShutdownReport(today);
		cd.setVerisaeReportStatus(value);
		
		value = "4";
		
		cd.setPunchListStatus(value);
		cd.setPunchList(today);
		
		cd.setAsBuiltDrawingsStatus(value);
		cd.setAsBuilts(today);
		
		cd.setCloseOutPhotosStatus(value);
		cd.setCloseoutPhotosCL(today);
		
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
		else {
			value = "3";
			salVal = -1;
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
		
		value = "4";
		
		cd.setPunchListStatus(value);
		cd.setPunchList(today);
		
		cd.setAsBuiltDrawingsStatus(value);
		cd.setAsBuilts(today);
		
		cd.setCloseOutPhotosStatus(value);
		cd.setCloseoutPhotosCL(today);
		
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
			permitStatus = "TBD";
			inspectionStatus = "TBD";
			permitReq = "0";
			inspectionReq = "0";
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
		
		permits.setRoofing(today);
		permits.setRoofingPermitRequired(permitReq);
		permits.setRoofingPermitStatus(permitStatus);
		permits.setRoofingInspectionLastUpdated(today);
		permits.setRoofingInspectionRequired(inspectionReq);
		permits.setRoofingInspectionStatus(inspectionStatus);
		
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
