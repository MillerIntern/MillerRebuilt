package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Inspections;

/**
 * @author Josh Mackin
 */
public class InspectionsFiller
{
	public synchronized static void fillInspections(Inspections inspection,  Map<String, String>params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		Date framingInspection = null;
		if(!params.get("framing").isEmpty())
			framingInspection = formatter.parse(params.get("framing"));
		inspection.setFraming(framingInspection);

		Date ceilingInspection = null;
		if(!params.get("ceiling").isEmpty())
			ceilingInspection = formatter.parse(params.get("ceiling"));
		inspection.setCeiling(ceilingInspection);

		Date mechLightSmoke = null;
		if(!params.get("mechanicalLightSmoke").isEmpty())
			mechLightSmoke = formatter.parse(params.get("mechanicalLightSmoke"));
		inspection.setMechanicalLightSmoke(mechLightSmoke);

		Date roughinMech = null;
		if(!params.get("roughin_mechanical").isEmpty())
			roughinMech = formatter.parse(params.get("roughin_mechanical"));
		inspection.setRoughin_Mechanical(roughinMech);

		Date roughinElectric = null;
		if(!params.get("roughin_electric").isEmpty())
			roughinElectric = formatter.parse(params.get("roughin_electric"));
		inspection.setRoughin_Electric(roughinElectric);

		Date roughinPlumbing = null;
		if(!params.get("roughin_plumbing").isEmpty())
			roughinPlumbing = formatter.parse(params.get("roughin_plumbing"));
		inspection.setRoughin_Plumbing(roughinPlumbing);

		Date health = null;
		if(!params.get("health").isEmpty())
			health = formatter.parse(params.get("health"));
		inspection.setHealth(health);

		Date fireMarshal = null;
		if(!params.get("fire_marshal").isEmpty())
			fireMarshal = formatter.parse(params.get("fire_marshal"));
		inspection.setFire_Marshal(fireMarshal);
	}
}
