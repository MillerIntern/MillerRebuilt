package Servlets;

import java.io.IOException;



import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import Servlets.helpers.ReportHelper;
import comparators.ProjectItemComparator;
import comparators.ProjectRegionComparator;
import comparators.ProjectStageComparator;
import comparators.TaskComparator;
import comparators.WarehouseComparator;
import objects.HibernateUtil;
import projectObjects.Project;
import projectObjects.Task;
import services.HtmlGenerator;
import services.LoginService;
import services.ProjectObjectService;
import services.QueryService;

/**
 *
 */
@WebServlet(description = "Servlet that handles generating reports", urlPatterns = { "/Report" })
public class Report extends HttpServlet 
{
	String proposalFilter[] = {"status"} ;
	
	
	private static final long serialVersionUID = 1L;
	private static PrintWriter out;
	private static boolean tableIndex = true;
       
    public Report() 
    {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected synchronized void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		if(!LoginService.verify(req)) { resp.setContentType("plain/text"); out = resp.getWriter(); out.println("VERIFICATION_FAILURE"); return;}
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Report.java\nIN: doGet()\nTime of transaction: " + timeStamp);
		resp.setContentType("text/html");
		out = resp.getWriter();

		
		//Get the list of projects
		Map<String, String[]> map = req.getParameterMap();
		String title = req.getParameter("title");
		String type = req.getParameter("type");
		
		if((title != null && type != null && !type.equals("ChangeOrderStatuses"))) 
		{
		

			List<projectObjects.Project> projects = null;
			try 
			{
				projects = QueryService.queryProjects(map);
				System.out.println("Projects size = " +projects.size());
			} 
			catch (ParseException e) 
			{
				System.out.println("Something went wrong with parsing the parameters");
				e.printStackTrace();
			}
			
		
					
			//System.out.println(req.getParameter("onGoing"));
			
			System.out.println(title);
					
			
			List<String> shownFields = convertStringToList(req.getParameter("shownFields"));
			shownFields.toString();
			
			//Send HTML table of projects to front end
		
			out.println(generateProjectReport(projects, title, shownFields ));
		} 
		else if(type != null)
		{
			
			if(type.equals("TaskReport")) 
			{
				List<projectObjects.Task> tasks = null;
	            
	            type = "Task Report";
	            tasks = acquireProperTasks(req);
								
	            String[] taskFields = {"warehouse","task_item","task_title","task_assignee","task_subassignee","task_description","task_created_date",
                "task_due_date", "task_status", "task_priority","task_notes"};
				
				List<String> shownFields = new ArrayList<>();
				for(int i = 0; i < taskFields.length; i++){
					shownFields.add(taskFields[i]);
				}
				shownFields.toString();
				
				//Send HTML table of projects to front end
			   
				out.println(generateTaskReport(tasks, type, shownFields ));
			}
			else if(type.equals("ChangeOrderStatuses"))
			{
				
				String status = req.getParameter("status.id");
				status = status.replace("[","");
				status = status.replace("]","");
				status = status.replace("\"", "");
				
				System.out.println("CO STATUSES == " + status);
				List<String> shownFields = new ArrayList<String>();
				String shownField = "changeOrder_" + status;
				shownFields.add(shownField);
				shownFields.toString();
				
				List<projectObjects.Project> projects = null;
				
				long before = System.currentTimeMillis();
				System.out.println("BEFORE : " + before);
				
				//projects =  ProjectObjectService.getAllProjects();
				
				Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);	
				
				projects = criteria.list();
	
				long after =System.currentTimeMillis();
				System.out.println("TOOK : " + (after - before));
				
				out.println(generateChangeOrderReport(projects, title, shownFields ));
				
				
			}
			else if(type.equals("Equipment Report")) {
				//System.out.println("IT is coming ");

				Long id = Long.parseLong(req.getParameter("id"));
				
				List<String> shownFields = new ArrayList<String>();
				String shownField = "equipmentSolo";
				tableIndex = false;
				shownFields.add(shownField);
				shownFields.toString();
				
				List<projectObjects.Project> projects = new ArrayList<projectObjects.Project>();
				
				projectObjects.Project project = null;
				try {
					project = (Project) ProjectObjectService.get(id, "Project");
					projects.add(project);
					out.println(generateProjectReport(projects, type, shownFields ));
					
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				
			}
			else if(type.contains("Project Task Report")) {
				//System.out.println("IT is coming 123 ");
				String projStatus = type.split("~")[1];				
				Long id = Long.parseLong(req.getParameter("id"));				
				List<String> shownFields = new ArrayList<String>();
				String shownField = "projectTaskSolo";				
				tableIndex = false;
				shownFields.add(shownField);
				shownFields.add(projStatus);
				shownFields.toString();
				
				List<projectObjects.Project> projects = new ArrayList<projectObjects.Project>();
				
				projectObjects.Project project = null;
				try {
					project = (Project) ProjectObjectService.get(id, "Project");
					projects.add(project);
					out.println(generateProjectReport(projects, type, shownFields ));
					
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				
			}
			
			else if(type.contains("Project PendInv Report")) {				
				String projStatus = type.split("~")[1];				
				Long id = Long.parseLong(req.getParameter("id"));				
				List<String> shownFields = new ArrayList<String>();
				String shownField = "projectPendInvSolo";				
				tableIndex = false;
				shownFields.add(shownField);
				shownFields.add(projStatus);
				shownFields.toString();
				
				List<projectObjects.Project> projects = new ArrayList<projectObjects.Project>();
				
				projectObjects.Project project = null;
				try {
					project = (Project) ProjectObjectService.get(id, "Project");
					projects.add(project);
					out.println(generateProjectReport(projects, type, shownFields ));
					
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				
			}
			
			else if(type.contains("All PendInv Report")) {				
				String projStatus = type.split("~")[1];											
				List<String> shownFields = new ArrayList<String>();
				String shownField = "allPendInv";				
				tableIndex = false;
				shownFields.add(shownField);
				shownFields.add(projStatus);
				shownFields.toString();									
				out.println(generatePendInvReport(type, shownFields ));								
			}
			
			
			
			else //ChangeOrder report for one project
			{
			Long id = Long.parseLong(req.getParameter("id"));
			
			List<String> shownFields = new ArrayList<String>();
			String shownField = "changeOrderSolo";
			tableIndex = false;
			shownFields.add(shownField);
			shownFields.toString();
			
			List<projectObjects.Project> projects = new ArrayList<projectObjects.Project>();
			
			projectObjects.Project project = null;
			try {
				project = (Project) ProjectObjectService.get(id, "Project");
				projects.add(project);
				out.println(generateProjectReport(projects, type, shownFields ));
				
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		}
		else 
		{
			List<projectObjects.Task> tasks = null;
			List<projectObjects.Task> assigneeTasks = new ArrayList<projectObjects.Task>();
			title = req.getParameter("task_title");
            
            String assignees = req.getParameter("task_assignee");
            String[] assigneeNums = assignees.split(" ");
            System.out.println("assignee " + assignees);
            
            tasks = acquireProperTasks(req);
            System.out.println("Tasks size = " + tasks.size());
            
            if(!assignees.equals("all"))
            {	
	            for(int i = 0; i < assigneeNums.length; i++)
	            {	
	       		     System.out.println("Assignee: " + assigneeNums[i]);
	            	 for(int j = 0; j < tasks.size(); j++)
	                 {   
	            		 if(tasks.get(j).getType().equals("EMPLOYEE"))
	            		 {	 
		            		 //System.out.println(getValueFromTask("task_assignee_num", tasks.get(j)));
		            		 if(assigneeNums[i].equals(getValueFromTask("task_assignee_num", tasks.get(j))))
		            		 {
		            			 //System.out.println(getValueFromTask("task_assignee", tasks.get(j)));
		            			 assigneeTasks.add(tasks.get(j));
		            		 }
	            		 }
	                 }	 
	            }
            }
//            for(int i = 0; i < assigneeTasks.size(); i++)
//            {	
//            	System.out.println(getValueFromTask("task_assignee_num", tasks.get(i))); 
//            }
            
            System.out.println("Tasks size = " + assigneeTasks.size());
            System.out.println("Tasks size = " + tasks.size());
			
					
	       //System.out.println(req.getParameter("onGoing"));
			
			System.out.println(title);
					
			
			List<String> shownFields = convertStringToList(req.getParameter("shownFields"));
			shownFields.toString();
			
			if(assignees.equals("all"))
			{
				out.println(generateTaskReport(tasks, title, shownFields ));
			}
			else
			{
				out.println(generateTaskReport(assigneeTasks, title, shownFields ));
			}
			//Send HTML table of projects to front end
		}
	}
	
	
	/**
	 * This function retrieves a list of tasks meeting a certain query
	 * @param The request containing the query info
	 * @return List of tasks
	 */
	public synchronized List<projectObjects.Task> acquireProperTasks(HttpServletRequest req){
		String assignee_id = req.getParameter("task_assignee");
		String statuses = req.getParameter("task_statuses");
		List<projectObjects.Task> tasks = null;
		
		System.out.println(assignee_id);
		System.out.println(statuses);
		
		if(statuses != null) 
			tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasksByStatus(statuses);
		else if(assignee_id != null && !assignee_id.equals("all")) 
			tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasksForAssignee(assignee_id, statuses);
//		if(assignee_id.equals("all") && statuses.equals("all")) 
//			tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasks();
		else 
			tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasks();
		
		return tasks;
	}
	
	/**
	 * This function retrieves a list of tasks meeting a certain query
	 * @param The request containing the query info
	 * @return List of tasks
	 */
	public synchronized List<projectObjects.ChangeOrder> acquireProperChangeOrders(String status){

		List<projectObjects.ChangeOrder> changeOrders = null;
		List<projectObjects.ChangeOrder> properChangeOrders = new ArrayList<projectObjects.ChangeOrder>();
		
		changeOrders = (List<projectObjects.ChangeOrder>) ProjectObjectService.getAllChangeOrders();
		
		for(projectObjects.ChangeOrder co: changeOrders){
			System.out.println("CO STATUS EQAULS == " + co.getStatus());
			if(co.getStatus().equals(status)) properChangeOrders.add(co);
		}
		
		return properChangeOrders;
	}
	
	
	
	/**
	 * This function retrieves a list of tasks given the task ids
	 * @param The request containing the task ids
	 * @return List of tasks
	 */
	
	public synchronized List<projectObjects.Task> acquireSpecificTasks(HttpServletRequest req){

		List<projectObjects.Task> tasks = new ArrayList<>();
		//List<projectObjects.Task> tasksOfInterest = new ArrayList<>();
		///List<String> taskIds = new ArrayList<>();
		
		int i = 1;
	    while(req.getParameter("id"+i) != null) {
	    //	taskIds.add(req.getParameter("id" + i));
	    	Long id = Long.parseLong(req.getParameter("id" + i));
	    	
	    	try {
				tasks.add((projectObjects.Task) ProjectObjectService.get(id, "Task"));
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
	    	i++;
	    }
		
		return tasks;
	}
	
	
	
	/**
	 * This method generates an HTML page representing projects that are to be included in the report.
	 * @param projects A list of projects
	 * @param reportName the name of the report
	 * @return a String representing the HTML the report page.
	 */
	public synchronized String generateProjectReport(List<projectObjects.Project> projects, String reportName, List<String> shownFields)
	{
		//System.out.println("PROJECTS OF INTEREST");
		System.out.println(projects);
		System.out.println(reportName);
		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader(reportName));
		sb.append(makeBackLink());
	
		sb.append(generateTableHeader(shownFields));

		//Contents
		System.out.println("shown Fields are: ");
		for (int i = 0; i < shownFields.size(); i++)
		{
			
			System.out.print(shownFields.get(i)+" ");
		
		}

		if(reportName.equals("Adrienne's Report")) sortProjectsStage(projects);
		else if(reportName.contains("Change Orders")) sortProjectsChangeOrder(projects);
		//Changing it so that instead of just specific projects like drain pan etc., be removed, now removing all the projects with permits = No
		//WRITING THIS PART SO THAT Drain Pan, Evaporators, and Refrigerant Conversion items will not be visible in the Project Report		
		else if(reportName.contains("Permits")) {
			for (int i = 0; i < projects.size(); i++) {
				projectObjects.Project p = projects.get(i);
//				System.out.println("GETAUTO "+p.getAutofillPermits()+ p.getWarehouse() + p.getProjectItem().getName());				
				if(p.getAutofillPermits() != null && p.getAutofillPermits().equals("2")) {
					System.out.println("Coming here here");
					projects.remove(i);
					i--;		
				}
			}
			System.out.println("\nProj len is ");
			System.out.println(projects.size());
			sortProjects(projects);
		}
		
		else sortProjects(projects);
		
		sb.append("<tbody>");
		//Generate table contents
		for (int i = 0; i < projects.size(); i++)
		{
			projectObjects.Project p = projects.get(i);

			if(shownFields.get(0).equals("equipmentName") || shownFields.get(0).equals("changeOrder")
					|| shownFields.get(0).equals("changeOrderSolo") || shownFields.get(0).equals("equipmentSolo"))
			{				
				//System.out.println("IT is coming here 1");				
				String value = getValueFromProject(shownFields.get(0), p);
				System.out.println(value);
				sb.append(value);
			}
			
			else if(shownFields.get(0).equals("projectTaskSolo"))
			{
				//System.out.println("IT is coming here 111");				
				String value = getValueFromProject(shownFields.get(0)+"~"+shownFields.get(1), p);
				System.out.println(value);
				sb.append(value);
			}
			else if(shownFields.get(0).equals("projectPendInvSolo"))
			{							
				String value = getValueFromProject(shownFields.get(0)+"~"+shownFields.get(1), p);				
				sb.append(value);
			}
			else if(shownFields.get(0).equals("allPendInv"))
			{							
				String value = getValueFromProject(shownFields.get(0)+"~"+shownFields.get(1), p);				
				sb.append(value);
			}
			else
			{
				// if(shownFields.contains("permitReport""))

				sb.append("<tr>");
				sb.append("<td>"+(i+1)+"</td>");
				for (int j = 0; j < shownFields.size(); j++)
				{	
					sb.append("<td>");
					String value = getValueFromProject(shownFields.get(j), p);
					sb.append(value);
					sb.append("</td>");		
					
				}
				
				sb.append("</tr>");
			}
			
		}
		sb.append("<tbody>");
		sb.append("</table>");
		sb.append(HtmlGenerator.generateHtmlCloser());
		return sb.toString();
		
	}
	
	/**
	 * This method generates an HTML page representing Pending Invoices of all Projects that are to be included in the report.
	 * @param reportName the name of the report
	 * @return a String representing the HTML the report page.
	 */
	public synchronized String generatePendInvReport(String reportName, List<String> shownFields)
	{
		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader("Pending Invoices - OPEN"));
		sb.append(makeBackLink());	
		sb.append(generateTableHeader(shownFields));

		//Contents
		sb.append("<tbody>");
		//Generate table contents
		if(shownFields.get(0).equals("allPendInv"))
		{							
			projectObjects.Project p = null;
			String value = getValueFromProject(shownFields.get(0)+"~"+shownFields.get(1), p);				
			sb.append(value);
		}
		sb.append("<tbody>");
		sb.append("</table>");
		sb.append(HtmlGenerator.generateHtmlCloser());
		return sb.toString();		
	}
	
	/**
	 * This method generates an HTML page representing projects that are to be included in the report.
	 * @param projects A list of projects
	 * @param reportName the name of the report
	 * @return a String representing the HTML the report page.
	 */
	public synchronized String generateChangeOrderReport(List<projectObjects.Project> projects, String reportName, List<String> shownFields)
	{
		//System.out.println("PROJECTS OF INTEREST");

		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader(reportName));
		sb.append(makeBackLink());
		sb.append(generateTableHeader(shownFields));

		//Contents
		System.out.println("Shown Fields are: ");
		for (int i = 0; i < shownFields.size(); i++)
		{
			
			System.out.print(shownFields.get(i)+" ");
		
		}


	    sortProjectsChangeOrder(projects);
	
		
		sb.append("<tbody>");
		//Generate table contents
		
		for (int i = 0; i < projects.size(); i++)
		{
			
			projectObjects.Project p = projects.get(i);

			if(shownFields.get(0).equals("equipmentName") || shownFields.get(0).equals("changeOrder")
					|| shownFields.get(0).equals("changeOrderSolo")  || shownFields.get(0).contains("changeOrder_"))
			{
				
				String value = getValueFromProject(shownFields.get(0), p);
				sb.append(value);
			}
			else
			{
				// if(shownFields.contains("permitReport""))

				sb.append("<tr>");
				sb.append("<td>"+(i+1)+"</td>");
				for (int j = 0; j < shownFields.size(); j++)
				{	
					sb.append("<td>");
					String value = getValueFromProject(shownFields.get(j), p);
					sb.append(value);
					sb.append("</td>");		
					
				}
				
				sb.append("</tr>");
			}
			
		}
		
		sb.append("<tbody>");
		sb.append("</table>");
		sb.append(HtmlGenerator.generateHtmlCloser());
		return sb.toString();
		
	}
	
	
	/**
	 * This method generates an HTML page representing tasks that are to be included in the report.
	 * @param tasks A list of tasks
	 * @param reportName the name of the report
	 * @return a String representing the HTML the report page.
	 */
	public synchronized String generateTaskReport(List<projectObjects.Task> tasks, String reportName, List<String> shownFields)
	{
		//System.out.println("TASKS OF INTEREST");

		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader(reportName));
		sb.append(makeBackLink());
		sb.append(generateTableHeader(shownFields));

		//Contents
		System.out.println("Shown fields are: ");
		for (int i = 0; i < shownFields.size(); i++)
		{
			
			System.out.print(shownFields.get(i)+" ");
		
		}
        
		sortTasks(tasks);
		sb.append("<tbody>");
		//Generate table contents
		for (int i = 0; i < tasks.size(); i++)
		{
			projectObjects.Task t = (projectObjects.Task) tasks.get(i);

			if(getValueFromTask("task_assignee", t).equals("Bart"))
				continue;
			
				sb.append("<tr>");
				sb.append("<td>"+(i+1)+"</td>");
				for (int j = 0; j < shownFields.size(); j++)
				{					
					sb.append("<td>");
					String value = getValueFromTask(shownFields.get(j), t);
					sb.append(value);
					sb.append("</td>");		
				}
				
				sb.append("</tr>");
		}
			
		
		sb.append("<tbody>");
		sb.append("</table>");
		sb.append(HtmlGenerator.generateHtmlCloser());
		return sb.toString();
		
	}
	

	
	public synchronized String generateTableHeader(List<String> strings)
	{
		StringBuilder sb = new StringBuilder();
		sb.append("<table class='dataTable cell-border row-border'><thead><tr>");
		//This table header simply allows a column for the indices
		sb.append("<th class='tableIndex'>Index</th>");
		for (int i = 0; i < strings.size(); i++)
		{
			
			String value = strings.get(i);
			
			// Call To Report Helper to get header for each table entry
			ReportHelper.appendReportProjectHeader(sb, value);
			sb.append("</th>");
		}
		sb.append("</tr>");
		sb.append("</thead>");
		
		return sb.toString();
	}

	
	public synchronized List<String> convertStringToList(String str)
	{
		Gson gson = new Gson();
		Type type = new TypeToken<List<String>>() {}.getType();
		return gson.fromJson(str, type);
	}
	
	public synchronized String getValueFromProject(String value, Project p)
	{
		// Call to report helper to get data from project based on a value
		return ReportHelper.getReportVal(value, p);
	}
	
	public synchronized String getValueFromTask(String value, Task t)
	{
		// Call to report helper to get data from project based on a value
		return ReportHelper.getReportVal(value, t);
	}

	public synchronized void sortProjects(List<projectObjects.Project> projects)
	{
		Collections.sort(projects, new WarehouseComparator());
		Collections.sort(projects, new ProjectItemComparator());
		Collections.sort(projects, new ProjectRegionComparator());		
	}
	
	public synchronized void sortProjectsStage(List<projectObjects.Project> projects)
	{
		Collections.sort(projects, new WarehouseComparator());
		Collections.sort(projects, new ProjectItemComparator());
		Collections.sort(projects, new ProjectRegionComparator());	
		Collections.sort(projects, new ProjectStageComparator());
	}
	
	public synchronized void sortProjectsChangeOrder(List<projectObjects.Project> projects)
	{
		Collections.sort(projects, new ProjectItemComparator());	
		Collections.sort(projects, new WarehouseComparator());	
	}
	
    
	
	public synchronized void sortTasks(List<projectObjects.Task> tasks)
	{
		if(tasks.size() > 1)
			Collections.sort(tasks, new TaskComparator());
		
	}
	
	public synchronized static String makePrintButton()
	{
		return "<input type='button' id='printButton' onclick='printPage()' value='Print Page' />";
	}
	
	public synchronized static String makeBackLink()
	{
		//double timestamp = System.currentTimeMillis();
		return "<input type='button' id='backButton' style = 'display:none' onclick='backPage()' value='Go Back' />";
	}
	
	public synchronized static String makeDeleteButton()
	{
		//double timestamp = System.currentTimeMillis();
		return "<input type='button' id='deleteButton' onclick='deleteRow()' value='Delete Row' />";
	}

}
