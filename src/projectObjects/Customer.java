package projectObjects;

import javax.persistence.Entity;

/**
 * This class represents a Customer
 * @author Akash Gurram
 */
@Entity
public class Customer extends ProjectObject
{
	/**
	 * The name of the Customer
	 */
	private String name;
	
	public Customer()
	{
		id = new Long(-1);
		name = "NULL";
	}
	
	public Customer(String name)
	{
		this.name = name;
	}

	/**
	 * This method gets the name of the Customer
	 * @return
	 */
	public synchronized String getName() {
		return name;
	}
	
	/**
	 * This method returns the name of a Customer
	 * @param name
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
}
