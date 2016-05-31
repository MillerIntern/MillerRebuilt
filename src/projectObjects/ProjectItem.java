package projectObjects;

import javax.persistence.Entity;

/**
 * This class represents the item that a Project is associated with.
 * Examples include ovens, pizza hoods, cake islands, Air Conditioning, etc.
 * Every Project must have a ProjectItem associated with it.
 * @author Alex Campbell
 *
 */
@Entity
public class ProjectItem extends ProjectObject 
{
	/**
	 * The name of the Project Item
	 */
	private String name;
	
	public ProjectItem(String name)
	{
		this.name = name;
	}
	
	
	public ProjectItem()
	{
		this.name = "";
	}

	/**
	 * This method gets the name of the ProjectItem
	 * @return the project item's name
	 */
	public String getName() {
		return name;
	}

	/**
	 * This method sets the name of the project item
	 * @param name the new name of the project item.
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	
}
