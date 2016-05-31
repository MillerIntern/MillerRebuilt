package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class CloseoutInfo extends ProjectObject{
	
	private Date date;
	private String info;
	
	public CloseoutInfo(Date d, String i)
	{
		date = d;
		info = i;
	}
	
	public CloseoutInfo()
	{
		date = null;
		info = null;
	}
	
	public Date getDate()
	{
		return this.date;
	}
	
	public String getInfo()
	{
		return this.info;
	}
	
	public void setDate(Date d)
	{
		this.date = d;
	}
	
	public void setInfo(String i)
	{
		this.info = i;
	}
}
