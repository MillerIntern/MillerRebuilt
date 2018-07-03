package projectObjects;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * this class holds the information about equipment for a project. 
 * 
 * It is important to note that this is the preferred equipment object
 * over Equipment. I also created this class instead of just using 
 * Equipment because the previous developer had code absolutely 
 * everywhere for what is a simple task that he never got working
 * and it really is going to be a task in itself to remove
 * Equipment.java from the current codebase. /bash
 *  
 * @author jmackin
 *
 */
@Entity
public class NewEquipment extends ProjectObject
{
	private String poNum;
	private String equipmentName;
	private String vendor;
	private Date orderedDate;
	private Date deliveryDate;
	private Date estDeliveryDate;
	private String notes;
	private String deliveryStatus;
	private EquipmentVendor eqSupplier;
	private EquipmentStatus eqStatus;
	private String providerName;
	private String description;
	
	public NewEquipment(String poNum, String equipmentName,
						String vendor,
						Date deliveryDate, Date estDeliveryDate, Date orderedDate,
						String notes,  String deliveryStatus, String providerName, String description,
						EquipmentVendor eqSupplier , EquipmentStatus eqStatus)
	{
		this.poNum = poNum;
		this.equipmentName = equipmentName;
		this.vendor = vendor;
		this.deliveryDate = deliveryDate;
		this.estDeliveryDate = estDeliveryDate;
		this.orderedDate = orderedDate;
		this.notes = notes;
		this.deliveryStatus = deliveryStatus;
		this.providerName = providerName;
		this.description = description;
		this.eqSupplier = eqSupplier;
		this.eqStatus = eqStatus;
	}
	
	public NewEquipment()
	{
		this.poNum = null;
		this.equipmentName = null;
		this.vendor = null;
		this.deliveryDate = null;
		this.estDeliveryDate = null;
		this.orderedDate = null;
		this.notes = null;
		this.deliveryStatus = null;
		this.providerName = null;
		this.description = null;
		this.eqSupplier = null;
		this.eqStatus = null;
	}

	public synchronized String getPoNum() {
		return poNum;
	}

	public synchronized void setPoNum(String poNum) {
		this.poNum = poNum;
	}

	public synchronized String getEquipmentName() {
		return equipmentName;
	}

	public synchronized void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public synchronized String getVendor() {
		return vendor;
	}

	public synchronized void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public synchronized Date getDeliveryDate() {
		return deliveryDate;
	}

	public synchronized void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
	public synchronized Date getOrderedDate() {
		return orderedDate;
	}

	public synchronized void setOrderedDate(Date orderedDate) {
		this.orderedDate = orderedDate;
	}

	public synchronized Date getEstDeliveryDate() {
		return estDeliveryDate;
	}

	public synchronized void setEstDeliveryDate(Date estDeliveryDate) {
		this.estDeliveryDate = estDeliveryDate;
	}

	public synchronized String getNotes() {
		return notes;
	}

	public synchronized void setNotes(String notes) {
		this.notes = notes;
	}
	
	public synchronized String getDeliveryStatus() {
		return deliveryStatus;
	}
	
	public synchronized void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	
	public synchronized String getProviderName() {
		return providerName;
	}
	
	public synchronized void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public synchronized String getDescription() {
		return description;
	}
	
	public synchronized void setDescription(String description) {
		this.description = description;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized EquipmentVendor getEqSupplier() {
		return eqSupplier;
	}
	
	public synchronized void setEqSupplier(EquipmentVendor vendor) {
		this.eqSupplier = vendor;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized EquipmentStatus getEqStatus() {
		return eqStatus;
	}
	
	public synchronized void setEqStatus(EquipmentStatus eqStatus) {
		this.eqStatus = eqStatus;
	}
	

	
	public static Object getNewEquipmentFields(String name , NewEquipment eq)
	{
		if(name.equalsIgnoreCase("orderedDate"))
			return eq.getOrderedDate();
		else if(name.equalsIgnoreCase("deliveryDate"))
			return eq.getDeliveryDate();
		else if(name.equalsIgnoreCase("estDeliveryDate"))
			return eq.getEstDeliveryDate();
		else if(name.equalsIgnoreCase("deliveryStatus"))
			return eq.getDeliveryStatus();

		return null;
	}
	
	public static Map<String , String> getAllNewEquipmentFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		fields.put("orderedDate", "Date");
		fields.put("deliveryDate", "Date");
		fields.put("estDeliveryDate", "Date");
		fields.put("deliveryStatus", "String");
		fields.put("poNum" , "String");
		fields.put("eqSupplier" , "String");
		fields.put("description" , "String");
		fields.put("equipmentName" , "String");
		return fields;

	}
	
	
}
