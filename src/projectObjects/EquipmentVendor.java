package projectObjects;

import javax.persistence.Entity;

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
	public String getName() {
		return name;
	}

	/**
	 * This method sets the name of the vendor.
	 * @param name the new name of the vendor
	 */
	public void setName(String name) {
		this.name = name;
	}


}
