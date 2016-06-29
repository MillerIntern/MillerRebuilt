package projectObjects;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class ChangeOrderType extends ProjectObject
{
	/**
	 * The name of the ChangeOrderCustomerType
	 */
	String name;
	String code;
	
	public ChangeOrderType(String name, String code)
	{
		this.name = name;
		this.code = code;
	}
	
	public ChangeOrderType()
	{
		this.name = null;
		this.code = null;
	}

	/**
	 * This method gets the name of the ChangeOrderCustomerType 
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * This method sets the name of the ChangeOrderCustomerType 
	 * @param name the new name of the project.
	 */
	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
