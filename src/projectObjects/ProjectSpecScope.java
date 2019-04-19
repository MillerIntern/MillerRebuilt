package projectObjects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
//@Table (name = "projectspecscope")
public class ProjectSpecScope {

//	public interface table {
//		String name();
//	}

	
	@Id
	@GeneratedValue
	
	
	private int item;
	private String title;
	private String description;
	private String subNames;
	private String notes;
	private Long proj;
	
	public ProjectSpecScope(int itemNum, String title, String description, String subNames, String notes, Long proj)
	{
	  this.item = itemNum;
	  this.title = title;
	  this.description = description;
	  this.subNames = subNames;
	  this.notes = notes;
	  this.proj = proj;
	}
	
	public ProjectSpecScope()
	{
	  this.item = 0;
	  this.title = null;
	  this.description = null;
	  this.subNames = null;
	  this.notes = null;
	  this.proj = null;
	}
	
	public synchronized int getItem()
	{
		return this.item;
	}
	
	public synchronized void setItem(int num)
	{
		this.item = num;	
	}
	
	
	public synchronized String getTitle()
	{
		return this.title;
	}
	
	public synchronized void setTitle(String title)
	{
		this.title = title;	
	}
	public synchronized String getDescription()
	{
		return this.description;
	}
	
	public synchronized void setDescription(String des)
	{
		this.description = des;	
	}
	
	public synchronized String getSubNames()
	{
		return this.subNames;
	}
	
	public synchronized void setSubNames(String subs)
	{
		this.subNames = subs;	
	}
	public synchronized String getNotes()
	{
		return this.notes;
	}
	
	public synchronized void setNotes(String notes)
	{
		this.notes = notes;	
	}

	public synchronized Long getProj()
	{
		return proj;
	}
	
	public synchronized void setProj(Long project)
	{
		this.proj = project;
	}
}
