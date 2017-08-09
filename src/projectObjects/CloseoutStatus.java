package projectObjects;

import javax.persistence.Entity;

/**
 * The status component of the new closeout form. 
 * @author Josh Mackin
 */

@Entity
public class CloseoutStatus extends ProjectObject
{
	/**
	 * The name of the closeoutstatus
	 */
	String name;
	
	public CloseoutStatus(String name)
	{
		this.name = name;
	}
	
	public CloseoutStatus()
	{
		this.name = null;
	}

	/**
	 * This method gets the name of the closeoutstatus 
	 * @return the name
	 */
	public synchronized String getName() {
		return name;
	}

	/**
	 * This method sets the name of the closeoutstatus 
	 * @param name the new name of the project.
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
}
