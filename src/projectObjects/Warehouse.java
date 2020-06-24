package projectObjects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * This class encapsulates all of the information about a Warehouse. Every construction project is
 * associated with a warehouse, and a single warehouse can be associated with multiple projects. A warehouse
 * signifies the work site that the project is concerned with.
 * @author Alex Campbell
 *
 */
@Entity
public class Warehouse extends ProjectObject 
{
	/**
	 * The id of the warehouse. This is NOT the database ID of the warehouse
	 */
	private int warehouseID;
	
	/**
	 * This is the state that the warehouse is in.
	 */
	private State state;
	
	/**
	 * This is the city that the warehouse is in.
	 */
	private City city;
	
	/**
	 * This is the region that the warehouse is in.
	 */
	private Region region;
	
	/**
	 * This is the customer to which the warehouse belongs to.
	 */
	private Customer customer;
	
	public Warehouse(int id, City city, State state, Region r, Customer customer)
	{
		this.city = city;
		this.state = state;
		warehouseID = id;
		this.region = r;
		this.customer = customer;
	}
	
	public Warehouse()
	{
		city = null;
		state = null;
		warehouseID = 0;
		region = null;
		customer = null;
	}
	
	/**
	 * This method gets the ID of the warehouse (this is NOT the database id)
	 * @return the warehouse id
	 */
	public synchronized int getWarehouseID() {
		return warehouseID;
	}

	/**
	 * This method sets the warehouse id
	 * @param warehouseID the new id
	 */
	public synchronized void setWarehouseID(int warehouseID) {
		this.warehouseID = warehouseID;
	}

	/**
	 * This method gets the state that the warehouse is in.
	 * @return the state
	 */
	@Enumerated(EnumType.STRING)
	public synchronized State getState() {
		return state;
	}

	/**
	 * This method gets the region that the warehouse is in.s
	 * @return the region
	 */
	@Enumerated(EnumType.STRING)
	public synchronized Region getRegion() {
		return region;
	}

	/**
	 * This method sets the region that the warehouse is in.
	 * @param region the new region
	 */
	public synchronized void setRegion(Region region) {
		this.region = region;
	}

	/**
	 * This method sets the state that the warehouse is in.
	 * @param state the new state
	 */
	public synchronized void setState(State state) {
		this.state = state;
	}

	/**
	 * This method gets the city that the warehouse is in.
	 * @return the city
	 */
	@OneToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized City getCity() {
		return city;
	}

	/**
	 * This method sets the city that the warehouse is in
	 * @param city the new city
	 */
	public synchronized void setCity(City city) {
		this.city = city;
	}
	
	
	/**
	 * This method gets the customer that the warehouse belongs to.
	 * @return the customer
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)	
	public synchronized Customer getCustomer() {
		return customer;
	}

	/**
	 * This method sets the Customer that the warehouse belongs to
	 * @param customer the new customer
	 */
	public synchronized void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	/**
	 * This method returns a string representation of the warehouse
	 * @return a string containing relevant information about the warehouse.
	 */
	public synchronized String toString()
	{
		return this.getCity().getName()+", "+this.getState();
	}
}
