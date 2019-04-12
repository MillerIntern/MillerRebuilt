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

	
	private Long item;
	private Long project_id;
	private String title;
	private String description;
	private String subNames;
	private String notes;
	
	public ProjectSpecScope(Long itemNum, Long proj, String title, String description, String subNames, String notes)
	{
	  this.item = itemNum;
	  this.project_id = proj;
	  this.title = title;
	  this.description = description;
	  this.subNames = subNames;
	  this.notes = notes;
	}
	
	public ProjectSpecScope()
	{
	  this.item = null;
	  this.title = null;
	  this.project_id = null;
	  this.description = null;
	  this.subNames = null;
	  this.notes = null;
	}
	
	public synchronized Long getItemNum()
	{
		return this.item;
	}
	
	public synchronized void setItemNum(Long num)
	{
		this.item = num;	
	}
	
	public synchronized Long getProject()
	{
		return this.project_id;
	}
	
	public synchronized void setProject(Long project)
	{
		this.project_id = project;
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
	
	
}
