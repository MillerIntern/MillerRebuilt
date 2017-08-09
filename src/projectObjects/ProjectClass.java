package projectObjects;

import javax.persistence.Entity;

/**
 * This class represents the standardization of project "classes". These classes signify
 * the type/quantity of paperwork that is required for a specific project. Examples include
 * "Green Ink", which requires architectural drawings, and "Turnkey", which requires minimal
 * setup and documentation.
 * @author Alex Campbell
 *
 */
@Entity
public class ProjectClass extends ProjectObject
{
	/**
	 * The name of the project class
	 */
	String name;
	
	public ProjectClass(String name)
	{
		this.name = name;
	}
	
	public ProjectClass()
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