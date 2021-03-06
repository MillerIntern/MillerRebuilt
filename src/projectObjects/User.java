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
	private String email;
	private Status status;
	private Permission permission;
	
	public User(String name, String pass, Status status, Permission permission, String firstName, String email)
	{
		this.name = name;
		this.password = pass;
		this.status = status;
		this.permission = permission;
		this.firstName = firstName;
		this.email = email;
	}
	
	public User()
	{
		this.name = "";
		this.password = "";
		this.status = null;
		this.permission = null;
		this.firstName = null;
		this.email = null;
	}

	public synchronized String getName() {
		return name;
	}

	public synchronized void setName(String name) {
		this.name = name;
	}

	public synchronized String getPassword() {
		return password;
	}

	public synchronized void setPassword(String password) {
		this.password = password;
	}


	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Status getStatus() {
		return status;
	}

	public synchronized void setStatus(Status status) {
		this.status = status;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Permission getPermission() {
		return permission;
	}

	public synchronized void setPermission(Permission permission) {
		this.permission = permission;
	}

	public synchronized String getFirstName() {
		return firstName;
	}

	public synchronized void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public synchronized String getEmail() {
		return email;
	}
	
	public synchronized void setEmail(String email) {
		this.email = email;
	}
	
	public synchronized String toString(){
		return "name = " + this.name + " firstName = " + this.firstName;
        
	}
	
	// This method compares the firstnames that are sent to the task form against
	// the firstnames in the database. Also compares the session stored username against 
	// users' usernames in the database. 
	// TODO: This method makes patchwork of first names which should be in the database
	public synchronized static User mapNameToUser(String name) {
		
		if (name == null) return null;
		//name = name.replaceAll("\\s+","");
		name = name.trim(); //Instead of removing all the white spaces, I'm using trim() to remove only the leading and trailing white spaces 
		//which makes more sense, well atleast for me -A.G
		List<Object> users = ProjectObjectService.getAll("User");
		
		for (int i = 0; i < users.size(); i++) {
			User u = (User)users.get(i);
			// This catches both when the first names from the task form
			// and also the session saved username name
			if (name.equalsIgnoreCase(u.getFirstName()) || name.equalsIgnoreCase(u.getName())) {
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
			} else if(name.equals("Andrew") && u.getName().equals("andrew")) {
				return u;
			} else if(name.equals("Lillian") && u.getName().equals("lillian")) {
				return u;
			}else if(name.equals("Bua") && u.getName().equals("bua")) {
				return u;
			}
		}
		
		return null;
	}
}
