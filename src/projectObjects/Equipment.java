package projectObjects;

import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;



/**
 * This is a class for handling the equipment within a project. Each piece of equipment has an ID number associated with it's type,
 * while one type of equipment may be used in multiple objects, each piece of equipment will be used uniquely for different projects.
 * This class also contains the vendor which dispenses the equipment as well as the delivery date for that equipment.
 * @author Brian Fitzpatrick
 */
@Entity
@Embeddable
public class Equipment extends ProjectObject {


	/**
	 * The id of the equipment. This is NOT the database ID of the equipment
	 */
	private long equipmentTypeIDs;
	
	/**
	 * This is equipment vendorID for the piece of equipment
	*/
	private long projectID;
	private long PO;
	private EquipmentVendor equipmentVendor;
	private Date estimatedDelivery;
	private Date deliveryDate;
	private String notes;
	private String equipName;
	//private Long eqpd;
	
	

	public Equipment(long equipSecID, Warehouse warehouse, long PO, EquipmentVendor equipVendor, ProjectItem component,
	Date estimatedDelivery, long projectID, String notes, String equipName, long eqpd, EquipmentStatus equipStatus)
	{
		this.projectID = projectID;
		this.PO = PO;


		this.equipmentVendor = equipVendor;
		this.estimatedDelivery = estimatedDelivery;
	
		//this.eqpd = eqpd;
		this.notes = notes;
		this.equipName = equipName;		
	}
	
	public Equipment()
	{
		this.projectID = -1;
		this.PO = -1;
		
		this.equipmentVendor = null;
		this.estimatedDelivery = null;
		/*if(projectID==0)
			this.eqpd = (long) 1;
		else
			this.eqpd = projectID;*/
		this.notes = null;
		this.equipName = null;


	}
	

	
	/**
	 * This method gets the IDs of the equipment (this is NOT the database id)
	 * @return the equipment id
	 */
	public synchronized long getEquipmentIDs(){
		return this.equipmentTypeIDs ;
	}
	
	
	/**
	 * This method sets the IDs of the set of equipment for a project (not the database id)
	 * @param equipID ID of the piece of equipment
	 */
	public synchronized void setEquipmentIDs(long equipIDs){
		this.equipmentTypeIDs = equipIDs;
	}
	
	
	/**
	 * This method sets the vendor IDs for a set of equipment
	 * @param vendorIDs the id's to be assigned
	 */

	/**
	 * Sets the super ID, required for usage
	 */
	public synchronized void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * This method sets the PO number for the equipment 
	 * @param Current PO for given project
	 */
	public synchronized void setPO(long num)
	{
		this.PO = num;
	}
	
	/**
	 * returns the current PO number
	 * @return PO number
	 */
	public synchronized long getPO()
	{
		return this.PO;
	}
	
	/**
	 * used for nothing so far. ID is not of the given project
	 * @param null
	 */
	public synchronized void setProjectID(long num)
	{
		this.projectID = num;
	}
	/**
	 * used for nothing so far. ID is not of the given project
	 * @return null
	 */
	public synchronized long getProjectID()
	{
		return this.projectID;
	}
	
	/**
	 * set the equipment vendor of the 
	 * @param  equipment vendor object
	 */
	public synchronized void setEquipmentVendor(EquipmentVendor ven)
	{
		this.equipmentVendor = ven;
		System.out.println(equipmentVendor);
	}
	
	/**
	 * Retrieves the equipment vendor
	 * @return equipment vendor
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized EquipmentVendor getEquipmentVendor()
	{
		return this.equipmentVendor;
	}
	
	/**
	 * Sets the Date for the estimated delivery date
	 * @param set date for estimated delivery
	 */
	public synchronized void setEstimatedDelivery(Date date)
	{
		this.estimatedDelivery = date;
	}
	/**
	 * Retrieve estimated delivery Date
	 * @return estimated deliverDate
	 */
	public synchronized Date getEstimatedDelivery()
	{
		return this.estimatedDelivery;
	}
	/**
	 * used for putting notes down for the project
	 * @param string note
	 */
	public synchronized void setNotes(String note)
	{
		this.notes = note;
	}
	
	/**
	 *retrieving Notes in regard to the equipment
	 * @return Notes 
	 */
	public synchronized String getNotes()
	{
		return this.notes;
	}
	
	/**
	 * set the equipment name
	 * @param string equipment name
	 */
	public synchronized void setEquipName(String name)
	{
		this.equipName = name;
	}
	
	/**
	 * returns the equipment name
	 * @return equipmentName 
	 */
	public synchronized String getEquipName()
	{
		return this.equipName;
	}
	
	/**
	 * sets the identifier which is the current ID of the project
	 * @param id of the current project
	 */
	/*public void setEqpd(long id)
	{
		this.eqpd = id;
	}
	
	/**
	 * retrieves the second id of the equipment which dictates which project the ID is coresponded to
	 * @return id of the current project and Equipment identifier
	 */
	/*public Long getEqpd()
	{
		return this.eqpd;
	}*/

	public synchronized Date getDeliveryDate() {
		return deliveryDate;
	}

	public synchronized void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
}
