package projectObjects;

import javax.persistence.*;

@Entity
public class Trade extends ProjectObject{
	/**
	 * The name of the trade
	 */
	private String name;
	
	public Trade()
	{
		id = new Long(-1);
		name = "NULL";
	}
	
	public Trade(String name)
	{
		this.name = name;
	}

	/**
	 * This method gets the name of the trade
	 * @return
	 */
	public synchronized String getName() {
		return name;
	}
	
	/**
	 * This method returns the name of a trade
	 * @param name
	 */
	public synchronized void setName(String name) {
		this.name = name;
	}
}


