package projectObjects;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import services.ProjectObjectService;

@Entity
public class User extends ProjectObject
{
	private String name;
	private String password;
	private String firstName;
	private Status status;
	private Permission permission;
	
	public User(String name, String pass, Status status, Permission permission, String firstName)
	{
		this.name = name;
		this.password = pass;
		this.status = status;
		this.permission = permission;
		this.firstName = firstName;
	}
	
	public User()
	{
		this.name = "";
		this.password = "";
		this.status = null;
		this.permission = null;
		this.firstName = null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Permission getPermission() {
		return permission;
	}

	public void setPermission(Permission permission) {
		this.permission = permission;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	// This method compares the firstnames that are sent to the task form against
	// the firstnames in the database. Also compares the session stored username against 
	// users' usernames in the database. 
	// TODO: This method makes patchwork of first names which should be in the database
	public static User mapNameToUser(String name) {
		if (name == null) return null;
		List<Object> users = ProjectObjectService.getAll("User");
		
		for (int i = 0; i < users.size(); i++) {
			User u = (User)users.get(i);
			// This catches both when the first names from the task form
			// and also the session saved username name
			if (name.equals(u.getFirstName()) || name.equals(u.getName())) {
				return u;
			
			// prune all else if once names are in database
			} else if (name.equals("Andy") && u.getName().equals("andy")) {
				return u;
			} else if (name.equals("Joe") && u.getName().equals("joe")) { 
				return u;
			} else if (name.equals("Bart") && u.getName().equals("bart")) {
				return u;
			} else if (name.equals("David") && u.getName().equals("dwgregory1")) {
				return u;
			} else if (name.equals("Dave") && u.getName().equals("dschoener")) {
				return u;
			} else if (name.equals("Sandy") && u.getName().equals("sandy")) {
				return u;
			}
		}
		
		return null;
	}
}
