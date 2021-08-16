package projectObjects;

import javax.persistence.Entity;

/**
 * This class represents the standardization of the CustomerApproval table
 * @author Fardeen Yaqub
 *
 */
@Entity
public class CustomerApproval extends ProjectObject
{
	/**
	 * The name of the project class
	 */
	String name;
	
	public CustomerApproval(String name)
	{
		this.name = name;
	}
	
	public CustomerApproval()
	{
		this.name = null;
	}

	/**
	 * This method gets the name of the project class
	 * @return the name of the project class
	 */
	public synchronized String getName() {
		return name;
	}

	/**
	 * This method sets the name of the project class
	 * @param name the new name
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
	
	
}