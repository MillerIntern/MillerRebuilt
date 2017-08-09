package projectObjects;

import javax.persistence.Entity;

@Entity
public class Status extends ProjectObject
{
	String name;
	
	public Status()
	{
		name = "";
	}
	
	public Status(String name)
	{
		this.name = name;
	}
	
	public synchronized void setName(String s)
	{
		this.name = s;
	}
	
	public synchronized String getName()
	{
		return name;
	}
}
