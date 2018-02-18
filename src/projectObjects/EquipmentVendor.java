package projectObjects;

import java.util.List;

import javax.persistence.Entity;

import services.ProjectObjectService;

/**
 * This class is used to store the different equipment vendors to be used with 
 * @author Brian Fitzpatrick
 *
 */
@Entity
public class EquipmentVendor extends ProjectObject {


	/**
	 * The name of the which can be used to look up the vendor
	 */
	private String name;

	/**
	 * This is the PO number for Vendor (STRING IS JSON)
	 */

	public EquipmentVendor()
	{
		id = new Long(-1);
		this.name = "";
	
	}

	public EquipmentVendor(String ven)
	{
		id = new Long(-1);
		this.name = ven;
		
	}

	/**
	 * This method gets the name of the vendor
	 * @return the vendor's name
	 */
	public synchronized String getName() {
		return name;
	}

	/**
	 * This method sets the name of the vendor.
	 * @param name the new name of the vendor
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
	
	public static EquipmentVendor matchEquipmentVendor(String field) {
		if(field == null) return null;
		
		List<Object> vendors = ProjectObjectService.getAll("EquipmentVendor");
		
		for(Object vendor : vendors) {
			EquipmentVendor ven = (EquipmentVendor) vendor;
			if(field.equalsIgnoreCase(ven.getName()) || field.equals(ven.getId().toString()))
				return ven;
		}
		
		return null;
		
	}


}
