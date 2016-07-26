package projectObjects;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class PermitStage extends ProjectObject
{
	/**
	 * The name of the change order status
	 */
	String name;
	
	public PermitStage(String name)
	{
		this.name = name;
	}
	
	public PermitStage()
	{
		this.id = null;
		this.name = null;
	}
	
	/**
	 * This method returns the name of the change order status
	 * @return
	 */
	public String getName(){
		return name;
	}

	/**
	 * This method returns the name of the change order status
	 * @param name
	 */
	public void setName(String name){
		this.name = name;
	}
}
