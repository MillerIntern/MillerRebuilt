package projectObjects;

import javax.persistence.Entity;


/**
 * This class is used to hold the name of equipment types for different equip
 * @author Brian Fitzpatrick
 *
 */
@Entity
public class EquipmentType extends ProjectObject {
	
	/**
	 * name for the piece of equipment
	 */
	private String equipName;
	
	public EquipmentType(String name)
	{
		this.equipName = name;
	}
	
	public EquipmentType()
	{
		id = new Long(-1);
		equipName = "NULL";
	}
	
	/**
	 * This method gets the name of the equipment
	 * @return the equipment name
	 */
	public String getEquipmentName()
	{
		return equipName;
	}
	
	/**
	 * This method sets the equipments name to the specified string
	 * @param name the string to be set as the name
	 */
	public void setEquipmentName(String name)
	{
		this.equipName = name;
	}

}
