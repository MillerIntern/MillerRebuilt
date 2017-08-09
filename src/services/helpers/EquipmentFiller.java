package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.NewEquipment;

/**
 * @author jmackin
 *
 */
public class EquipmentFiller 
{
	/**
	 * @param eq
	 * @param params
	 */
	public synchronized static void fillNewEquipment(NewEquipment eq, Map<String, String> params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		Date deliveryDate = null;
		if(!params.get("deliveryDate").isEmpty())
			deliveryDate = formatter.parse(params.get("deliveryDate"));
		eq.setDeliveryDate(deliveryDate);
		
		Date estDeliveryDate = null;
		if(!params.get("estDeliveryDate").isEmpty())
			estDeliveryDate = formatter.parse(params.get("estDeliveryDate"));
		eq.setEstDeliveryDate(estDeliveryDate);
		
		eq.setPoNum(params.get("poNum"));
		eq.setEquipmentName(params.get("equipmentName"));
		eq.setVendor(params.get("vendor"));
		eq.setNotes(params.get("notes"));
	}
}
