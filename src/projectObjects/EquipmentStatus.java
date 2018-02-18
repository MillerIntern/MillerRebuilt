package projectObjects;

import java.util.List;

import javax.persistence.Entity;

import services.ProjectObjectService;


@Entity
public class EquipmentStatus extends ProjectObject {


	/**
	 * The name of the which can be used to look up the vendor
	 */
	private String name;

	/**
	 * This is the PO number for Vendor (STRING IS JSON)
	 */

	public EquipmentStatus()
	{
		id = new Long(-1);
		this.name = "";
	
	}

	public EquipmentStatus(String ven)
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

	public static EquipmentStatus matchEquipmentVendor(String field) {
		if(field == null) return null;
		
		List<Object> statuses = ProjectObjectService.getAll("EquipmentStatus");
		
		for(Object status : statuses) {
			EquipmentStatus stat = (EquipmentStatus) status;
			if(field.equalsIgnoreCase(stat.getName())  || field.equals(stat.getId().toString()))
				return stat;
		}
		
		return null;
		
	}

}
