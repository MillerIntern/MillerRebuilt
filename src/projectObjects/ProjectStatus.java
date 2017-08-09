package projectObjects;

import javax.persistence.Entity;

/**
 * This class represents the status
 * @author Alex Campbell
 *
 */
@Entity
public class ProjectStatus extends ProjectObject
{
	/**
	 * This is the name of the Project status
	 */
	String name;
	
	public ProjectStatus(String name)
	{
		this.name = name;
	}
	
	public ProjectStatus()
	{
		this.name = null;
	}

	/**
	 * This method gets the name of the project status
	 * @return the name
	 */
	public synchronized String getName() {
		return name;
	}

	/**
	 * This method sets the name of the project status
	 * @param name the new name
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
	
	public synchronized String toString()
	{
		
		System.out.println("Project Status: " + name);
		return null;
	}
}