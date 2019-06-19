package services.helpers;

import java.text.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Project;
import projectObjects.Subcontractor;
import projectObjects.Task;
import projectObjects.TaskStatus;
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
	public synchronized static void fillTaskInformation(Task t, Map<String, String> params, String sessionName) throws ParseException, ClassNotFoundException {
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		Date dueDate = null;
		if(params.get("dueDate") != null && !params.get("dueDate").isEmpty())
			dueDate = formatter.parse(params.get("dueDate"));
		t.setDueDate(dueDate);
		
		Date assignedDate = null;
		if(params.get("initiatedDate") != null && !params.get("initiatedDate").isEmpty())
			assignedDate = formatter.parse(params.get("initiatedDate"));
		t.setAssignedDate(assignedDate);
		
		t.setDescription(params.get("description"));
		t.setTitle(params.get("title"));
		t.setSeverity(Integer.parseInt(params.get("severity")));
		t.setNotes(params.get("notes"));

		// TODO: Do different methods mapUsernameToUser & mapFirstnameToUser
		t.setAssignee(User.mapNameToUser(params.get("assignee")));
		t.setAssigner(User.mapNameToUser(sessionName));

		t.setSubAssignee(Subcontractor.mapNameToSubcontractor(params.get("subassignee")));
		
		t.setProject((Project)ProjectObjectService.get(Long.parseLong(params.get("project")), "Project"));
		
		if(!(params.get("status") == null || params.get("status").isEmpty()))
			t.setTaskStatus((TaskStatus) ProjectObjectService.get(Long.parseLong(params.get("status")), "TaskStatus"));
		else t.setTaskStatus(new TaskStatus("Open"));
		
		t.setCompleted(false);
		t.setType(params.get("type"));
	}
}
