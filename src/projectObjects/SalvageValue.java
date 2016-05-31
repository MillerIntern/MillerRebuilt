package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

/**
 * This class encapsulates the data pertaining to a project's "salvage value". 
 * @author Alex Campbell
 *
 */
@Entity
public class SalvageValue extends ProjectObject 
{
	/**
	 * The date of the salvage value
	 */
	private Date date;
	
	/**
	 * The value of the salvage value
	 */
	private double value;
	
	public SalvageValue(Date date, double value)
	{
		this.date = date;
		this.value = value;
	}
	
	public SalvageValue()
	{
		this.date = null;
		this.value = 0;
	}

	/**
	 * This method gets the date of the salvage value object
	 * @return the date
	 */
	public Date getDate() {
		return date;
	}

	/**
	 * Thid method sets the date of the salvage value
	 * @param date the new date
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	/**
	 * This method gets the value (in dollars) of the salvage value
	 * @return the value
	 */
	public double getValue() {
		return value;
	}

	/**
	 * This method sets the value of the salvage value
	 * @param salvage the new value
	 */
	public void setValue(Double salvage) {
		this.value = salvage;
	}
	
	public String toString()
	{
		 System.out.println("Salvage Date: " + date + " SalvageValue: " + value);
		 return null;
		
	}
	
	
	}

