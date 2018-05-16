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

		Date roofingPermit = null;
		if(!params.get("roofingPermit").isEmpty())
			roofingPermit = formatter.parse(params.get("roofingPermit"));
		permits.setRoofing(roofingPermit);
		Date roofingInspection = null;
		if(!params.get("roofingInspectionLastUpdated").isEmpty())
			roofingInspection = formatter.parse(params.get("roofingInspectionLastUpdated"));
		permits.setRoofingInspectionLastUpdated(roofingInspection);
		permits.setRoofingInspectionStatus(params.get("roofingInspectionStatus"));
		permits.setRoofingInspectionRequired(params.get("roofingInspectionReq"));
		permits.setRoofingPermitStatus(params.get("roofingPermitStatus"));
		permits.setRoofingPermitRequired(params.get("roofingPermitReq"));

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
		permits.setOtherBInspectionStatus(params.get("otherBInspectionStatus"));
		permits.setOtherBPermitStatus(params.get("otherBPermitStatus"));

		permits.setPermitNotes(params.get("permitNotes"));
		permits.setInspectionNotes(params.get("inspectionNotes"));

	}
}
