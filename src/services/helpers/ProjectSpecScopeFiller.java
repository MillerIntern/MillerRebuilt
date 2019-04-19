package services.helpers;

import java.text.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Project;
import projectObjects.Subcontractor;
import projectObjects.Task;
import projectObjects.ProjectSpecScope;
import projectObjects.TaskStatus;
import projectObjects.User;
import services.ProjectObjectService;

public class ProjectSpecScopeFiller {

	public synchronized static void fillProjectSpecScopeInfo(ProjectSpecScope sp, Map<String, String> params) throws ParseException, ClassNotFoundException 
	{
		System.out.println("fill Project spec scope");
		
		System.out.println(Long.parseLong(params.get("projectID")));
		
		int item;
		try {
			item = Integer.parseInt(params.get("itemNum"));
			sp.setItem(item);
		} catch (NumberFormatException e) {
			sp.setItem(0);
		}
		
		Long projs;
		try {
			projs = Long.parseLong(params.get("projectID"));
			sp.setProj(projs);
		} catch(NumberFormatException e) {
			sp.setProj(null);
		}
		
		
	//	sp.setProj((Project)ProjectObjectService.get(Long.parseLong(params.get("projectID")), "Project"));
		
		sp.setDescription(params.get("description"));
		sp.setTitle(params.get("title"));
		sp.setSubNames(params.get("subNames"));
		sp.setNotes(params.get("notes"));
		//sp.setItem(params.get("itemNum"));
		//System.out.println(params.get("itemNum"));
	}
}

