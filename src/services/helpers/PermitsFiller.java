package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Permits;

/**
 * @author Josh Mackin
 */
public class PermitsFiller
{
	public synchronized static void fillPermits(Permits permits,  Map<String, String>params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");


		System.out.println(params);
		Date buildingPermit = null;
		if(!params.get("building_p").isEmpty())
			buildingPermit = formatter.parse(params.get("building_p"));
		permits.setBuildingPermitDate(buildingPermit);
		Date buildingInspection = null;
		if(!params.get("buildingInspectionLastUpdated").isEmpty())
			buildingInspection = formatter.parse(params.get("buildingInspectionLastUpdated"));
		permits.setBuildingInspectionLastUpdated(buildingInspection);
		permits.setBuildingInspectionStatus(params.get("buildingInspectionStatus"));
		permits.setBuildingInspectionRequired(params.get("buildingInspectionReq"));
		permits.setBuildingPermitStatus(params.get("buildingPermitStatus"));
		permits.setBuildingPermitRequired(params.get("buildingPermitReq"));
		
		Date mechanicalPermit = null;
		if(!params.get("mechanical_p").isEmpty())
			mechanicalPermit = formatter.parse(params.get("mechanical_p"));
		permits.setMechanicalPermitDate(mechanicalPermit);
		Date mechanicalInspection = null;
		if(!params.get("mechanicalInspectionLastUpdated").isEmpty())
			mechanicalInspection = formatter.parse(params.get("mechanicalInspectionLastUpdated"));
		permits.setMechanicalInspectionLastUpdated(mechanicalInspection);
		permits.setMechanicalInspectionStatus(params.get("mechanicalInspectionStatus"));
		permits.setMechanicalInspectionRequired(params.get("mechanicalInspectionReq"));
		permits.setMechanicalPermitStatus(params.get("mechanicalPermitStatus"));
		permits.setMechanicalPermitRequired(params.get("mechanicalPermitReq"));

		Date electricalPermit = null;
		if(!params.get("electrical_p").isEmpty())
			electricalPermit = formatter.parse(params.get("electrical_p"));
		permits.setElectricalPermitDate(electricalPermit);
		Date electricalInspection = null;
		if(!params.get("electricalInspectionLastUpdated").isEmpty())
			electricalInspection = formatter.parse(params.get("electricalInspectionLastUpdated"));
		permits.setElectricalInspectionLastUpdated(electricalInspection);
		permits.setElectricalInspectionStatus(params.get("electricalInspectionStatus"));
		permits.setElectricalInspectionRequired(params.get("electricalInspectionReq"));
		permits.setElectricalPermitStatus(params.get("electricalPermitStatus"));
		permits.setElectricalPermitRequired(params.get("electricalPermitReq"));

		Date plumbingPermit = null;
		if(!params.get("plumbing_p").isEmpty())
			plumbingPermit = formatter.parse(params.get("plumbing_p"));
		permits.setPlumbingPermitDate(plumbingPermit);
		Date plumbingInspection = null;
		if(!params.get("plumbingInspectionLastUpdated").isEmpty())
			plumbingInspection = formatter.parse(params.get("plumbingInspectionLastUpdated"));
		permits.setPlumbingInspectionLastUpdated(plumbingInspection);
		permits.setPlumbingInspectionStatus(params.get("plumbingInspectionStatus"));
		permits.setPlumbingInspectionRequired(params.get("plumbingInspectionReq"));
		permits.setPlumbingPermitStatus(params.get("plumbingPermitStatus"));
		permits.setPlumbingPermitRequired(params.get("plumbingPermitReq"));

		Date fireSprinklePermit = null;
		if(!params.get("fireSprinkler_p").isEmpty())
			fireSprinklePermit = formatter.parse(params.get("fireSprinkler_p"));
		permits.setFireSprinklerDate(fireSprinklePermit);
		Date fireSprinkleInspection = null;
		if(!params.get("sprinklerInspectionLastUpdated").isEmpty())
			fireSprinkleInspection = formatter.parse(params.get("sprinklerInspectionLastUpdated"));
		permits.setSprinklerInspectionLastUpdated(fireSprinkleInspection);
		permits.setSprinklerInspectionStatus(params.get("sprinklerInspectionStatus"));
		permits.setSprinklerInspectionRequired(params.get("sprinklerInspectionReq"));
		permits.setSprinklerPermitStatus(params.get("sprinklerPermitStatus"));
		permits.setSprinklerPermitRequired(params.get("sprinklerPermitReq"));
		
		Date fireAlarmPermit = null;
		if(!params.get("fireAlarm_p").isEmpty())
			fireAlarmPermit = formatter.parse(params.get("fireAlarm_p"));
		permits.setFireAlarmPermitDate(fireAlarmPermit);
		Date fireAlarmInspection = null;
		if(!params.get("fireAlarmInspectionLastUpdated").isEmpty())
			fireAlarmInspection = formatter.parse(params.get("fireAlarmInspectionLastUpdated"));
		permits.setFireAlarmInspectionLastUpdated(fireAlarmInspection);
		permits.setFireAlarmInspectionStatus(params.get("fireAlarmInspectionStatus"));
		permits.setFireAlarmInspectionRequired(params.get("fireAlarmInspectionReq"));
		permits.setFireAlarmPermitStatus(params.get("fireAlarmPermitStatus"));
		permits.setFireAlarmPermitRequired(params.get("fireAlarmPermitReq"));
		
		Date lowVoltagePermit = null;
		if(!params.get("lowVoltage_p").isEmpty())
			lowVoltagePermit = formatter.parse(params.get("lowVoltage_p"));
		permits.setLowVoltagePermitDate(lowVoltagePermit);
		Date voltageInspection = null;
		if(!params.get("voltageInspectionLastUpdated").isEmpty())
			voltageInspection = formatter.parse(params.get("voltageInspectionLastUpdated"));
		permits.setVoltageInspectionLastUpdated(voltageInspection);
		permits.setVoltageInspectionStatus(params.get("voltageInspectionStatus"));
		permits.setVoltageInspectionRequired(params.get("voltageInspectionReq"));
		permits.setVoltagePermitStatus(params.get("voltagePermitStatus"));
		permits.setVoltagePermitRequired(params.get("voltagePermitReq"));

		
		//Temp certification of occupancy
		Date tempCertOccupancyPermit = null;
		if(!params.get("tempCertOccupancy_p").isEmpty())
			tempCertOccupancyPermit = formatter.parse(params.get("tempCertOccupancy_p"));
		permits.setTempCertOccupancyPermitDate(tempCertOccupancyPermit);
		Date tempCertOccupancy = null;
		if(!params.get("tempCertOccupancyInspectionLastUpdated").isEmpty())
			tempCertOccupancy = formatter.parse(params.get("tempCertOccupancyInspectionLastUpdated"));
		permits.setTempCertOccupancyInspectionLastUpdated(tempCertOccupancy);
		permits.setTempCertOccupancyInspectionStatus(params.get("tempCertOccupancyInspectionStatus"));
		permits.setTempCertOccupancyInspectionRequired(params.get("tempCertOccupancyInspectionReq"));
		permits.setTempCertOccupancyPermitStatus(params.get("tempCertOccupancyPermitStatus"));
		permits.setTempCertOccupancyPermitRequired(params.get("tempCertOccupancyPermitReq"));
		
		
		//Temp certification of occupancy
				Date certOccupancyPermit = null;
				if(!params.get("certOccupancy_p").isEmpty())
					certOccupancyPermit = formatter.parse(params.get("certOccupancy_p"));
				permits.setCertOccupancyPermitDate(certOccupancyPermit);
				Date certOccupancy = null;
				if(!params.get("certOccupancyInspectionLastUpdated").isEmpty())
					certOccupancy = formatter.parse(params.get("certOccupancyInspectionLastUpdated"));
				permits.setCertOccupancyInspectionLastUpdated(certOccupancy);
				permits.setCertOccupancyInspectionStatus(params.get("certOccupancyInspectionStatus"));
				permits.setCertOccupancyInspectionRequired(params.get("certOccupancyInspectionReq"));
				permits.setCertOccupancyPermitStatus(params.get("certOccupancyPermitStatus"));
				permits.setCertOccupancyPermitRequired(params.get("certOccupancyPermitReq"));
				
				
				
				Date buildPermExpire = null;
				if(!params.get("buildPermExpireDate").isEmpty())
					buildPermExpire = formatter.parse(params.get("buildPermExpireDate"));
				permits.setBuildPermExpireDate(buildPermExpire);
				
				
				
		
		Date ceilingPermit = null;
		if(!params.get("ceilingPermit").isEmpty())
			ceilingPermit = formatter.parse(params.get("ceilingPermit"));
		permits.setCeiling(ceilingPermit);
		Date ceilingInspection = null;
		if(!params.get("ceilingInspectionLastUpdated").isEmpty())
			ceilingInspection = formatter.parse(params.get("ceilingInspectionLastUpdated"));
		permits.setCeilingInspectionLastUpdated(ceilingInspection);
		permits.setCeilingInspectionStatus(params.get("ceilingInspectionStatus"));
		permits.setCeilingInspectionRequired(params.get("ceilingInspectionReq"));
		permits.setCeilingPermitStatus(params.get("ceilingPermitStatus"));
		permits.setCeilingPermitRequired(params.get("ceilingPermitReq"));
		
		Date gasPermit = null;
		if(!params.get("gasPermit").isEmpty())
			gasPermit = formatter.parse(params.get("gasPermit"));
		permits.setGas(gasPermit);
		Date gasInspection = null;
		if(!params.get("gasInspectionLastUpdated").isEmpty())
			gasInspection = formatter.parse(params.get("gasInspectionLastUpdated"));
		permits.setGasInspectionLastUpdated(gasInspection);
		permits.setGasInspectionStatus(params.get("gasInspectionStatus"));
		permits.setGasInspectionRequired(params.get("gasInspectionReq"));
		permits.setGasPermitStatus(params.get("gasPermitStatus"));
		permits.setGasPermitRequired(params.get("gasPermitReq"));

		Date aPermit = null;
		if(!params.get("otherPermitA").isEmpty())
			aPermit = formatter.parse(params.get("otherPermitA"));
		permits.setOtherAPermit(aPermit);
		Date aInspection = null;
		if(!params.get("otherAInspectionLastUpdated").isEmpty())
			aInspection = formatter.parse(params.get("otherAInspectionLastUpdated"));
		permits.setOtherAInspectionLastUpdated(aInspection);
		permits.setOtherAInspectionStatus(params.get("otherAInspectionStatus"));
		permits.setOtherAPermitStatus(params.get("otherAPermitStatus"));

		Date bPermit = null;
		if(!params.get("otherBPermit").isEmpty())
			bPermit = formatter.parse(params.get("otherBPermit"));
		permits.setOtherBPermit(bPermit);
		Date bInspection = null;
		if(!params.get("otherBInspectionLastUpdated").isEmpty())
			bInspection = formatter.parse(params.get("otherBInspectionLastUpdated"));
		permits.setOtherBInspectionLastUpdated(bInspection);
		permits.setOtherBPermitStatus(params.get("otherBPermitStatus"));
		permits.setOtherBInspectionStatus(params.get("otherBInspectionStatus"));
		
		permits.setPermitNotes(params.get("permitNotes"));
		permits.setInspectionNotes(params.get("inspectionNotes"));

	}
	public synchronized static void fillPermitNotes(Permits permits,  Map<String, String>params) throws ParseException
	{
		permits.setPermitNotes(params.get("permitNotes2"));
		permits.setInspectionNotes(params.get("inspectionNotes2"));
		
	}
}
