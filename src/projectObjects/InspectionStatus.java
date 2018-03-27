package projectObjects;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class InspectionStatus extends ProjectObject
{
	/**
	 * The name of the change order status
	 */
	String name;
	
	public InspectionStatus(String name)
	{
		this.name = name;
	}
	
	public InspectionStatus()
	{
		this.id = null;
		this.name = null;
	}
	
	/**
	 * This method returns the name of the change order status
	 * @return
	 */
	public synchronized String getName(){
		return name;
	}

	/**
	 * This method returns the name of the change order status
	 * @param name
	 */
	public synchronized void setName(String name){
		this.name = name;
	}
}

