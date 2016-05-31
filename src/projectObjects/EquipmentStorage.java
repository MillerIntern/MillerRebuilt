package projectObjects;

import javax.persistence.Entity;



/**
 * This is a class for handling the equipment within a project. Each piece of equipment has an ID number associated with it's type,
 * while one type of equipment may be used in multiple objects, each piece of equipment will be used uniquely for different projects.
 * This class also contains the vendor which dispenses the equipment as well as the delivery date for that equipment.
 * @author Brian Fitzpatrick
 */
@Entity
public class EquipmentStorage extends ProjectObject {


	/**
	 * The id of the equipment. This is NOT the database ID of the equipment
	 */
	private String jsonEquipment;
	
	/**
	 * The id of the project related to the equipment set
	 */
	private long projectid;
	
	public EquipmentStorage(String equipment, long pid)
	{
		this.projectid = pid;
		this.jsonEquipment = equipment;
	}
	
	public EquipmentStorage()
	{
		this.jsonEquipment = null;
		this.projectid = 0;
	}
	
	/*
	 * ACCESSORS
	 */
	
	/**
	 * This method gets all the equipment from a json String
	 * @return json string
	 */
	
	public String getJsonEquipment() {
		return jsonEquipment;
	}
	
	/**
	 * This method gets the project id number
	 * @return the project id
	 */
	public long getProjectid(){
		return projectid;
	}
	
	/*
	 * MUTATORS
	 */
	
	/**
	 * Sets all the equipment to a json String
	 * @param equipID ID of the piece of equipment
	 */
	public void setJsonEquipment(String equipIDs){
		this.jsonEquipment = equipIDs;
	}
		
	/**
	 * Sets the id for the equipment set
	 * @param pid the number for the equipment set to relate to the project
	 */
	public void setProjectid(long pid){
		this.projectid = pid;
	}
	
	/**
	 * Sets the super ID, required for usage
	 */
	public void setId(Long id) {
		this.id = id;
	}

}
