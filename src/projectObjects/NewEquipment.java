package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class NewEquipment extends ProjectObject
{
	private String poNum;
	private String equipmentName;
	private String vendor;
	private String component;
	private Date deliveryDate;
	private Date estDeliveryDate;
	
	public NewEquipment(String poNum, String equipmentName,
						String vendor, String component,
						Date deliveryDate, Date estDeliveryDate)
	{
		this.poNum = poNum;
		this.equipmentName = equipmentName;
		this.vendor = vendor;
		this.component = component;
		this.deliveryDate = deliveryDate;
		this.estDeliveryDate = estDeliveryDate;
	}
	
	public NewEquipment()
	{
		this.poNum = null;
		this.equipmentName = null;
		this.vendor = null;
		this.component = null;
		this.deliveryDate = null;
		this.estDeliveryDate = null;
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

	public String getComponent() {
		return component;
	}

	public void setComponent(String component) {
		this.component = component;
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
}
