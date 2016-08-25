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

	public String getPoNum() {
		return poNum;
	}

	public void setPoNum(String poNum) {
		this.poNum = poNum;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public Date getEstDeliveryDate() {
		return estDeliveryDate;
	}

	public void setEstDeliveryDate(Date estDeliveryDate) {
		this.estDeliveryDate = estDeliveryDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}
