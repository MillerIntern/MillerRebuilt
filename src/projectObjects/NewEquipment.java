package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

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
	private Date deliveryDate;
	private Date estDeliveryDate;
	private String notes;
	
	public NewEquipment(String poNum, String equipmentName,
						String vendor,
						Date deliveryDate, Date estDeliveryDate,
						String notes)
	{
		this.poNum = poNum;
		this.equipmentName = equipmentName;
		this.vendor = vendor;
		this.deliveryDate = deliveryDate;
		this.estDeliveryDate = estDeliveryDate;
		this.notes = notes;
	}
	
	public NewEquipment()
	{
		this.poNum = null;
		this.equipmentName = null;
		this.vendor = null;
		this.deliveryDate = null;
		this.estDeliveryDate = null;
		this.notes = null;
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
}
