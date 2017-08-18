package projectObjects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity

public class Permission extends ProjectObject
{
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	String name;
	boolean canAccessAdminPage;
	boolean canQueryProjects;
	boolean canListProjects;
	boolean canAddProjects;
		
	public Permission(String name, boolean query, boolean list, boolean admin, boolean projects)
	{
		this.name = name;
		this.canAccessAdminPage = admin;
		this.canQueryProjects = query;
		this.canListProjects = list;
		this.canAddProjects = projects;
	}
	
	public Permission()
	{
		this.name = "NULL_PERMISSION";
		this.canAccessAdminPage = false;
		this.canQueryProjects = false;
		this.canAddProjects = false;
		this.canListProjects = false;
	}
	
	public synchronized String getName()
	{
		return name;
	}
	
	public synchronized void setName(String name)
	{
		this.name = name;
	}

	public synchronized void setCanQueryProjects(boolean canQueryProjects) {
		this.canQueryProjects = canQueryProjects;
	}

	public synchronized boolean isCanAccessAdminPage() {
		return canAccessAdminPage;
	}

	public synchronized void setCanAccessAdminPage(boolean canAccessAdminPage) {
		this.canAccessAdminPage = canAccessAdminPage;
	}

	public synchronized boolean isCanQueryProjects() {
		return canQueryProjects;
	}

	public synchronized boolean isCanListProjects() {
		return canListProjects;
	}

	public synchronized boolean isCanAddProjects() {
		return canAddProjects;
	}

	public synchronized void setCanListProjects(boolean canListProjects) {
		this.canListProjects = canListProjects;
	}

	public synchronized boolean canAddProjects() {
		return canAddProjects;
	}

	public synchronized void setCanAddProjects(boolean canAddProjects) {
		this.canAddProjects = canAddProjects;
	}
	
}
