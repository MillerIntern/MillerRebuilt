package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import projectObjects.Project;
import projectObjects.Task;
import projectObjects.User;
import services.ProjectObjectService;

/**
 * @author jmackin
 *
 */
public class TaskFiller {

	/**
	 * @param t
	 * @param parameters
	 */
	public static void fillTaskInformation(Task t, Map<String, String> params, String sessionName) throws ParseException, ClassNotFoundException {
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		Date dueDate = null;
		if(!params.get("dueDate").isEmpty())
			dueDate = formatter.parse(params.get("dueDate"));
		t.setDueDate(dueDate);
		
		Date assignedDate = null;
		if(!params.get("initiatedDate").isEmpty())
			assignedDate = formatter.parse(params.get("initiatedDate"));
		t.setAssignedDate(assignedDate);
		
		t.setDescription(params.get("description"));
		t.setTitle(params.get("title"));
		t.setSeverity(Integer.parseInt(params.get("severity")));
		t.setNotes(params.get("notes"));

		t.setAssignee(mapNameToUser(params.get("assignee")));
		t.setAssignee(mapNameToUser(sessionName));
		
		t.setProject((Project)ProjectObjectService.get(Long.parseLong(params.get("project")), "Project"));
	}
	
	// This method compares the firstnames that are sent to the task form against
	// the firstnames in the database. Also compares the session stored username against 
	// users' usernames in the database. 
	// TODO: This method makes patchwork of first names which should be in the database
	private static User mapNameToUser(String name) {
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
			} else if (name.equals("Daves") && u.getName().equals("dschoener")) {
				return u;
			} else if (name.equals("Sandy") && u.getName().equals("sandy")) {
				return u;
			}
		}
		
		return null;
	}

}
