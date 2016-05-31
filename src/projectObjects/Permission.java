package projectObjects;

import javax.persistence.Entity;

@Entity
public class Permission extends ProjectObject
{
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
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}

	public void setCanQueryProjects(boolean canQueryProjects) {
		this.canQueryProjects = canQueryProjects;
	}

	public boolean isCanAccessAdminPage() {
		return canAccessAdminPage;
	}

	public void setCanAccessAdminPage(boolean canAccessAdminPage) {
		this.canAccessAdminPage = canAccessAdminPage;
	}

	public boolean isCanQueryProjects() {
		return canQueryProjects;
	}

	public boolean isCanListProjects() {
		return canListProjects;
	}

	public boolean isCanAddProjects() {
		return canAddProjects;
	}

	public void setCanListProjects(boolean canListProjects) {
		this.canListProjects = canListProjects;
	}

	public boolean canAddProjects() {
		return canAddProjects;
	}

	public void setCanAddProjects(boolean canAddProjects) {
		this.canAddProjects = canAddProjects;
	}
	
}
