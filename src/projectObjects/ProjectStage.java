package projectObjects;

import javax.persistence.Entity;

/**
 * This class indicates the stage that a particular Project is in.
 * Examples include "Proposal", "Active", and "In Closeout"
 * @author Alex Campbell
 */
@Entity
public class ProjectStage extends ProjectObject 
{
	/**
	 * The name of the project stage
	 */
	String name;
	
	public ProjectStage(String name)
	{
		this.name = name;
	}
	
	public ProjectStage()
	{
		this.name = null;
	}

	/**
	 * This method gets the name of the project stage
	 * @return the name
	 */
	public synchronized String getName() {
		return name;
	}

	/**
	 * This method sets the name of the project stage
	 * @param name the new name of the project.
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
	
	
}
