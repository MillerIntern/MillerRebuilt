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
	private Warehouse warehouse;
	private long PO;
	private EquipmentVendor equipmentVendor;
	private ProjectItem component;
	private Date estimatedDelivery;
	private String notes;
	private String equipName;
	private Long eqpd;
	private EquipmentStatus equipStatus;
	
	

	public Equipment(long equipSecID, Warehouse warehouse, long PO, EquipmentVendor equipVendor, ProjectItem component,
	Date estimatedDelivery, long projectID, String notes, String equipName, long eqpd, EquipmentStatus equipStatus)
	{
		this.projectID = projectID;
		this.warehouse = warehouse ;
		this.PO = PO;


		this.equipmentVendor = equipVendor;
		this.component = component;
		this.estimatedDelivery = estimatedDelivery;
	
		this.eqpd = eqpd;
		this.notes = notes;
		this.equipName = equipName;

		this.equipStatus = equipStatus;
		
	}
	
	public Equipment()
	{
		this.projectID = -1;
		this.warehouse = null ;
		this.PO = -1;
		
		this.equipmentVendor = null;
		this.component = null;
		this.estimatedDelivery = null;
		if(projectID==0)
			this.eqpd = (long) 1;
		else
			this.eqpd = projectID;
		this.notes = null;
		this.equipName = null;

		this.equipStatus = null;

	}
	

	
	/**
	 * This method gets the IDs of the equipment (this is NOT the database id)
	 * @return the equipment id
	 */
	public long getEquipmentIDs(){
		return this.equipmentTypeIDs ;
	}
	
	
	/**
	 * This method sets the IDs of the set of equipment for a project (not the database id)
	 * @param equipID ID of the piece of equipment
	 */
	public void setEquipmentIDs(long equipIDs){
		this.equipmentTypeIDs = equipIDs;
	}
	
	
	/**
	 * This method sets the vendor IDs for a set of equipment
	 * @param vendorIDs the id's to be assigned
	 */

	/**
	 * Sets the super ID, required for usage
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	
	/**
	 * This method gets the project Item
	 * @return the project Item
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectItem getProjectItem() {
		return this.component;
	}

	/**
	 * This method sets the project item for the equipment
	 * @param Current ProjectItem for the given equipment
	 */
	public void setProjectItem(ProjectItem pitem) {
		this.component = pitem;
	}
	

	/**
	 * This method sets the PO number for the equipment 
	 * @param Current PO for given project
	 */
	public void setPO(long num)
	{
		this.PO = num;
	}
	
	/**
	 * returns the current PO number
	 * @return PO number
	 */
	public long getPO()
	{
		return this.PO;
	}
	
	/**
	 * used for nothing so far. ID is not of the given project
	 * @param null
	 */
	public void setProjectID(long num)
	{
		this.projectID = num;
	}
	/**
	 * used for nothing so far. ID is not of the given project
	 * @return null
	 */
	public long getProjectID()
	{
		return this.projectID;
	}
	
	/**
	 * Returns warehouse object 
	 * @return warehouse
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public Warehouse getWarehouse() {
		return warehouse;
	}

	/**
	 * sets the current warehouse
	 * @param warehouse object
	 */
	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}
	
	/**
	 * set the equipment vendor of the 
	 * @param  equipment vendor object
	 */
	public void setEquipmentVendor(EquipmentVendor ven)
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
	public EquipmentVendor getEquipmentVendor()
	{
		return this.equipmentVendor;
	}
	
	/**
	 * Sets the Date for the estimated delivery date
	 * @param set date for estimated delivery
	 */
	public void setEstimatedDelivery(Date date)
	{
		this.estimatedDelivery = date;
	}
	/**
	 * Retrieve estimated delivery Date
	 * @return estimated deliverDate
	 */
	public Date getEstimatedDelivery()
	{
		return this.estimatedDelivery;
	}
	/**
	 * used for putting notes down for the project
	 * @param string note
	 */
	public void setNotes(String note)
	{
		this.notes = note;
	}
	
	/**
	 *retrieving Notes in regard to the equipment
	 * @return Notes 
	 */
	public String getNotes()
	{
		return this.notes;
	}
	
	/**
	 * set the equipment name
	 * @param string equipment name
	 */
	public void setEquipName(String name)
	{
		this.equipName = name;
	}
	
	/**
	 * returns the equipment name
	 * @return equipmentName 
	 */
	public String getEquipName()
	{
		return this.equipName;
	}
	
	/**
	 * sets the identifier which is the current ID of the project
	 * @param id of the current project
	 */
	public void setEqpd(long id)
	{
		this.eqpd = id;
	}
	
	/**
	 * retrieves the second id of the equipment which dictates which project the ID is coresponded to
	 * @return id of the current project and Equipment identifier
	 */
	public Long getEqpd()
	{
		return this.eqpd;
	}

	/**
	 * set status of equipment
	 * @param id of status
	 */
	public void setEquipStatus(EquipmentStatus id)
	{
		this.equipStatus = id; 
	}
	/**
	 * retrieves the current equipment status
	 * @return equipment status object 
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public EquipmentStatus getEquipStatus()
	{
		return this.equipStatus;
	}
	
}
