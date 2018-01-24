package projectObjects;

import javax.persistence.Entity;

import projectObjects.ProjectObject;

/**
 * This class represents the status of a change order. This has its own class because
 * even though the names of these statuses may change over time, the names must be standardized
 * Across all projects. For example, instead of change orders having statuses of "Active", "active",
 * or "active ordert", they must all match some predefined status name. That name will be defined here, in
 * one place, in order to achieve this standardization.
 * @author Alex Campbell
 *
 */
@Entity
public class ChangeOrderStatus extends ProjectObject
{
	/**
	 * The name of the change order status
	 */
	String name;
	
	public ChangeOrderStatus(String name)
	{
		this.name = name;
	}
	
	public ChangeOrderStatus()
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
