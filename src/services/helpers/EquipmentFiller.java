package services.helpers;

import java.text.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.EquipmentStatus;
import projectObjects.EquipmentVendor;
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
		if(params.get("deliveryDate") != null && !params.get("deliveryDate").isEmpty())
			deliveryDate = formatter.parse(params.get("deliveryDate"));
		eq.setDeliveryDate(deliveryDate);
		
		Date estDeliveryDate = null;
		if(params.get("deliveryDate") != null && !params.get("estDeliveryDate").isEmpty())
			estDeliveryDate = formatter.parse(params.get("estDeliveryDate"));
		eq.setEstDeliveryDate(estDeliveryDate);
		
		Date orderedDate = null;
		if(params.get("orderedDate") != null && !params.get("orderedDate").isEmpty())
			orderedDate = formatter.parse(params.get("orderedDate"));
		eq.setOrderedDate(orderedDate);
		
		Date equipProposalDate = null;
		if(params.get("equipProposalDate") != null && !params.get("equipProposalDate").isEmpty())
			equipProposalDate = formatter.parse(params.get("equipProposalDate"));
		eq.setequipProposalDate(equipProposalDate);
		
		eq.setPoNum(params.get("poNum"));
		eq.setEquipmentName(params.get("equipmentName"));
		//eq.setVendor(params.get("vendor"));
		eq.setNotes(params.get("notes"));
		//eq.setDeliveryStatus(params.get("deliveryStatus"));
		eq.setProviderName(params.get("providerName"));
		eq.setDescription(params.get("equipmentDescription"));
		
		eq.setEqSupplier(EquipmentVendor.matchEquipmentVendor(params.get("vendor")));
		eq.setEqStatus(EquipmentStatus.matchEquipmentStatus(params.get("deliveryStatus")));

		
				
	}
}
