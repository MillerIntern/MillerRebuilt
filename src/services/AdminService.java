package services;

import java.util.HashMap;
import java.util.List;

import objects.HashGen;
import projectObjects.Permission;
import projectObjects.ProjectItem;
import projectObjects.Status;
import projectObjects.User;

import com.google.gson.Gson;

/**
 * This class is responsible for adding, editing, and deleting administrative data in the database
 * @author Alex Campbell
 *
 */
public class AdminService 
{
	/**
	 * This class adds a permission to the database
	 * @param name the name of the permission
	 * @param query indicates if the user can query
	 * @param list indicates if the user can look at the projects
	 * @param admin indicates if the user can use administrative features
	 * @param projects indicates if the user can add/edit projects
	 */
	public synchronized static void addPermission(String name, boolean query, boolean list, boolean admin, boolean projects, boolean delprojects)
	{
		Permission perm = new Permission(name, query, list, admin, projects, delprojects);
        ProjectObjectService.addObject("Permission", perm);
	}
	
	/**
	 * This method gets all of the permissions in the database as a json string
	 * @return a string representing a JSON array
	 */
	public synchronized static String getAllPermissionsAsJson()
	{
		List<Object> list = ProjectObjectService.getAll("Permission");

        return new Gson().toJson(list);
	}
	
	/**
	 * This method replaces a permission in the database with a new one
	 * @param id the id of the permission to be edited
	 * @param name the name of the permission
	 * @param query indicates if the user can query
	 * @param list indicates if the user can look at the projects
	 * @param admin indicates if the user can use administrative features
	 * @param projects indicates if the user can add/edit projects
	 */
	public synchronized static void editPermission(Long id, String name, boolean query, boolean list, boolean admin, boolean projects, boolean delprojects)
	{
		Permission p = new Permission(name, query, list, admin, projects, delprojects);
		try 
		{
			ProjectObjectService.editObject("Permission", id, p,0);
		} catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
	}

	/**
	 * THis method deleted a permission from the database
	 * @param id the id of the permission to be deleted
	 */
	public synchronized static String deletePermission(Long id)
	{
		String s = "0";
		try {
			s = ProjectObjectService.delete(id, "Permission");
		} catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		
		return s;
	}
	
	/**
	 * This method adds a user to the database.
	 * @param name the name of the user
	 * @param password the password of the user
	 * @param statusID the id of the status
	 * @param permissionID the id of the permission
	 * @return -1 if the operation failed
	 */
	public synchronized static int addUser(String name, String password, Long statusID, Long permissionID)
	{
		HashGen hG = new HashGen();
		System.out.println(name);
		int status = -1;
		Status s = null;
		Permission p = null;
		try 
		{
			s = (Status) ProjectObjectService.get(statusID, "Status");
			p = (Permission) ProjectObjectService.get(permissionID, "Permission");
		}
		catch(Exception e) {e.printStackTrace();}
		
		//Check if the username already exists
		String [] columns = {"name"};
		String [] values = {name};
		User u = null;
		try 
		{
			u = (User) QueryService.getObjectByValues(values, columns, "User");
		} catch (ClassNotFoundException e) {}
		
		//If not, add user.
		String hashPass = null;
		try{
			hashPass = hG.getHash(password);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		if (u == null)
		{
			User newUser = new User(name, hashPass, s, p, "No Name", "No Email");
			ProjectObjectService.addObject("User", newUser);
			status = 1;
		}
		else
		{
			System.out.println(u.getName()+" "+name);
		}
		
		return status;
	}
	
	/**
	 * This method gets all the users from the database as a string representing
	 * an array of JSON objects
	 * @return string representing an array of JSON objects
	 */
	public synchronized static String getAllUsers()
	{
		return ProjectObjectService.getAllAsJsonString("User");
	}
	
	/**
	 * This method edits a user in the database by replacing a user in the database with a new one.
	 * @param userID the user to be edited
	 * @param name the name of the user
	 * @param password the password of the user
	 * @param statusID the status of the user
	 * @param permissionID the id of the permission of the user
	 */
	public synchronized static void editUser(Long userID, String name, String password, Long statusID, Long permissionID)
	{
		Status s;
		try 
		{
			s = (Status) ProjectObjectService.get(statusID, "Status");

			Permission p = (Permission) ProjectObjectService.get(permissionID, "Permission");
		
			User newUser = new User(name, password, s, p, "No Name", "No Email");
			ProjectObjectService.editObject("User", userID, newUser,0);
		}
		catch(Exception e){e.printStackTrace();}
	}

	/**
	 * This method deletes a user from the database
	 * @param id the id of the user
	 */
	public synchronized static String deleteUser(Long id)
	{
		String s = "0";
		try 
		{
			s = ProjectObjectService.delete(id, "User");
		} catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		
		return s;
	}
	
	/**
	 * This method adds a status to the database
	 * @param name the name of the status
	 */
	public synchronized static void addStatus(String name)
	{
		Status s = new Status(name);
		ProjectObjectService.addObject("Status", s);
		
	}
	
	/**
	 * This method gets all of the statuses in the database
	 * @return a string representing a JSON array
	 */
	public synchronized static String getAllStatuses()
	{
		return ProjectObjectService.getAllAsJsonString("Status");
	}
	
	/**
	 * This method edits a status in the database
	 * @param id the id of the status
	 * @param name the new name of the status
	 */
	public synchronized static void editStatus(Long id, String name)
	{
		Status s = new Status(name);
		try 
		{
			ProjectObjectService.editObject("Status", id, s,0);
		} catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
	}

	/**
	 * This method deletes a status from the database
	 * @param id the id of the status to be deleted
	 */
	public synchronized static String deleteStatus(Long id)
	{
		String s = "0";
		try 
		{
			s = ProjectObjectService.delete(id, "Status");
		} 
		catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		
		return s;
	}
	
	
	/**
	 * This method adds an item to the database.
	 * @param name the name of the item
	 * @return -1 if the operation failed
	 */
	public synchronized static int addItem(String name)
	{
		//Check if the item already exists
		int status = -1;
		String [] columns = {"name"};
		String [] values = {name};
		ProjectItem pI = null;
		try 
		{
			pI = (ProjectItem) QueryService.getObjectByValues(values, columns, "ProjectItem");
		} catch (ClassNotFoundException e) {}

		//If not, add the item
		if (pI == null)
		{
			ProjectItem newItem = new ProjectItem(name);
			ProjectObjectService.addObject("ProjectItem", newItem);
			status = 1;
		}
		else
		{
			System.out.println(pI.getName()+" "+name);
		}
		
		return status;
	}
	
	/**
	 * This method gets all of the administrative objects from the database. This is needed
	 * because multiple AJAX calls are not guarenteed to produce the same number of responses: sometimes,
	 * HTTP responses are combined into one response. Therefore, all of this needs to be combined into one call.
	 * @return a string representing a JSON array of the data
	 */
	public synchronized static String getAllAdminObjects()
	{
		Gson g = new Gson();
		
		HashMap<String, List<Object>> map = new HashMap<String, List<Object>>();
		List<Object> user = ProjectObjectService.getAll("User");
		List<Object> perm = ProjectObjectService.getAll("Permission");
		List<Object> status = ProjectObjectService.getAll("Status");
		
		map.put("user", user);
		map.put("permission", perm);
		map.put("status", status);
		
		return g.toJson(map);
	}
}
