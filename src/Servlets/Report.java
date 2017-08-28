package Servlets;

import java.io.IOException;


import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import Servlets.helpers.ReportHelper;
import comparators.ProjectItemComparator;
import comparators.ProjectRegionComparator;
import comparators.ProjectStageComparator;
import comparators.TaskComparator;
import comparators.WarehouseComparator;
import projectObjects.Project;
import projectObjects.Task;
import services.HtmlGenerator;
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
       
    public Report() 
    {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected synchronized void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Report.java\nIN: doGet()\nTime of transaction: " + timeStamp);
		resp.setContentType("text/html");
		out = resp.getWriter();

		
		//Get the list of projects
		Map<String, String[]> map = req.getParameterMap();
		String title = req.getParameter("title");
		String type = req.getParameter("type");
		
		if(title != null) 
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
			Long id = Long.parseLong(req.getParameter("id"));
			
			List<String> shownFields = new ArrayList<String>();
			String shownField = "changeOrderSolo";
			shownFields.add(shownField);
			shownFields.toString();
			
			List<projectObjects.Project> projects = new ArrayList<projectObjects.Project>();
			
			projectObjects.Project project = null;
			try {
				project = (Project) ProjectObjectService.get(id, "Project");
				projects.add(project);
				System.out.println("\nTYPE == " + type);
				out.println(generateProjectReport(projects, type, shownFields ));
				
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else 
		{
			List<projectObjects.Task> tasks = null;
            title = req.getParameter("task_title");
            
            tasks = acquireProperTasks(req);
			
            System.out.println("Tasks size = " +tasks.size());
			
					
	       //System.out.println(req.getParameter("onGoing"));
			
			System.out.println(title);
					
			
			List<String> shownFields = convertStringToList(req.getParameter("shownFields"));
			shownFields.toString();
			
			//Send HTML table of projects to front end
		   
			out.println(generateTaskReport(tasks, title, shownFields ));
		}
	}
	
	
	/**
	 * This function retrieves a list of tasks meeting a certain query
	 * @param The request containing the query info
	 * @return List of tasks
	 */
	public synchronized List<projectObjects.Task> acquireProperTasks(HttpServletRequest req){
		String assignee_id = req.getParameter("task_assignee");
		String status = req.getParameter("task_status");
		List<projectObjects.Task> tasks = null;
		
		if(assignee_id.equals("all") && status.equals("all")) tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasks();
		else tasks = (List<projectObjects.Task>) ProjectObjectService.getAllTasksForAssignee(assignee_id, status);
		
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
		System.out.println("PROJECTS OF INTEREST");

		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader(reportName));
		sb.append(makeBackLink());
	
		sb.append(generateTableHeader(shownFields));

		//Contents
		System.out.println("shown Fields are");
		for (int i = 0; i < shownFields.size(); i++)
		{
			
			System.out.print(shownFields.get(i)+" ");
		
		}

		if(reportName.equals("Adrienne's Report")) sortProjectsStage(projects);
		else if(reportName.contains("Change Orders")) sortProjectsChangeOrder(projects);
		else sortProjects(projects);
		
		sb.append("<tbody>");
		//Generate table contents
		for (int i = 0; i < projects.size(); i++)
		{
			projectObjects.Project p = projects.get(i);

			if(shownFields.get(0).equals("equipmentName") || shownFields.get(0).equals("changeOrder")
					|| shownFields.get(0).equals("changeOrderSolo"))
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
		System.out.println("TASKS OF INTEREST");

		StringBuilder sb = new StringBuilder();
		//Generate the html header
		sb.append(HtmlGenerator.generateHtmlHeader(reportName));
		sb.append(makeBackLink());
		sb.append(generateTableHeader(shownFields));

		//Contents
		System.out.println("shown Fields are");
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

			
				sb.append("<tr>");
				sb.append("<td>"+(i+1)+"</td>");
				for (int j = 0; j < shownFields.size(); j++)
				{	
					if(shownFields.get(j).equals("task_notes") || shownFields.get(j).equals("task_description")) 
						sb.append("<td>");
					else sb.append("<td align = 'center'>");
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
		Collections.sort(tasks, new TaskComparator());
		
	}
	
	public synchronized static String makePrintButton()
	{
		return "<input type='button' id='printButton' onclick='printPage()' value='Print Page' />";
	}
	
	public synchronized static String makeBackLink()
	{
		//double timestamp = System.currentTimeMillis();
		return "<input type='button' id='backButton' onclick='backPage()' value='Go Back' />";
	}

}
