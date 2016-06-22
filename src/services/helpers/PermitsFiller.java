package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Permits;

public class PermitsFiller 
{
	public static void fillPermits(Permits permits,  Map<String, String>params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		Date buildingPermit = null;
		if(!params.get("building_p").isEmpty())
			buildingPermit = formatter.parse(params.get("building_p"));
		permits.setBuildingPermitDate(buildingPermit);	
		
		Date mechanicalPermit = null;
		if(!params.get("mechanical_p").isEmpty())
			mechanicalPermit = formatter.parse(params.get("mechanical_p"));
		permits.setMechanicalPermitDate(mechanicalPermit);
		
		Date electricalPermit = null;
		if(!params.get("electrical_p").isEmpty())
			electricalPermit = formatter.parse(params.get("electrical_p"));
		permits.setElectricalPermitDate(electricalPermit);
		
		Date plumbingPermit = null;
		if(!params.get("plumbing_p").isEmpty())
			plumbingPermit = formatter.parse(params.get("plumbing_p"));
		permits.setPlumbingPermitDate(plumbingPermit);
		
		Date fireSprinklePermit = null;
		if(!params.get("fireSprinkler_p").isEmpty())
			fireSprinklePermit = formatter.parse(params.get("fireSprinkler_p"));
		permits.setFireSprinklerDate(fireSprinklePermit);
		
		Date fireAlarmPermit = null;
		if(!params.get("fireAlarm_p").isEmpty())
			fireAlarmPermit = formatter.parse(params.get("fireAlarm_p"));
		permits.setFireAlarmPermitDate(fireAlarmPermit);
		
		Date lowVoltagePermit = null;
		if(!params.get("lowVoltage_p").isEmpty())
			lowVoltagePermit = formatter.parse(params.get("lowVoltage_p"));
		permits.setLowVoltagePermitDate(lowVoltagePermit);
	}
}
