package projectObjects;

import java.util.List;

import javax.persistence.Entity;

import services.ProjectObjectService;

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
		//id = new Long(-1);
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
	
	public synchronized static Customer mapWarehouseToCustomer(String customerName) {
//		System.out.println("Coming to Map Warehouse");
//		System.out.println(customerName);
		if (customerName == null) return null;
		List<Object> customers = ProjectObjectService.getAll("Customer");
		
		for (int i = 0; i < customers.size(); i++) {
			Customer c = (Customer)customers.get(i);
			// This catches both when the first names from the task form
			// and also the session saved username name
			if (customerName.equalsIgnoreCase(c.getName())) {
				return c;
			}
		}
		return null;
	}
}
