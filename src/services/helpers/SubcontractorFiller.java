package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Person;
import projectObjects.Project;
import projectObjects.ProjectClass;
import projectObjects.ProjectItem;
import projectObjects.ProjectStage;
import projectObjects.ProjectStatus;
import projectObjects.ProjectType;
import projectObjects.Region;
import projectObjects.State;
import projectObjects.Task;
import projectObjects.TaskStatus;
import projectObjects.User;
import projectObjects.Warehouse;
import projectObjects.Subcontractor;
import projectObjects.City;


import services.ProjectObjectService;
import java.util.List;

public class SubcontractorFiller {

	/**
	 * @param t
	 * @param parameters
	 */
	public synchronized static void fillSubcontractorInformation(Subcontractor s, Map<String, String> parameters) throws ParseException, ClassNotFoundException {
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		String name = parameters.get("name");
		String email = parameters.get("email");

		s.setName(name);
		s.setEmail(email);
			
	}
}
