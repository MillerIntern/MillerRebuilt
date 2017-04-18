package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.text.ParseException;
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
import comparators.WarehouseComparator;
import projectObjects.Project;
import services.HtmlGenerator;
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
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		resp.setContentType("text/html");
		out = resp.getWriter();
				
		//Get the list of projects
		Map<String, String[]> map = req.getParameterMap();
		List<projectObjects.Project> projects = null;
		try 
		{
			projects = QueryService.queryProjects(map);
			System.out.println(projects.size());
		} 
		catch (ParseException e) 
		{
			System.out.println("Something went wrong with parsing the parameters");
			e.printStackTrace();
		}
				
		//System.out.println(req.getParameter("onGoing"));
		String title = req.getParameter("title");
		
				
		
		List<String> shownFields = convertStringToList(req.getParameter("shownFields"));
		shownFields.toString();
		
		//Send HTML table of projects to front end
		out.println(generateProjectReport(projects, title, shownFields ));
		}
	
	/**
	 * This method generates an HTML page representing projects that are to be included in the report.
	 * @param projects A list of projects
	 * @param reportName the name of the report
	 * @return a String representing the HTML the report page.
	 */
	public String generateProjectReport(List<projectObjects.Project> projects, String reportName, List<String> shownFields)
	{
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
		sortProjects(projects);
		sb.append("<tbody>");
		//Generate table contents
		for (int i = 0; i < projects.size(); i++)
		{
			projectObjects.Project p = projects.get(i);

			if(shownFields.get(0).equals("equipmentName") || shownFields.get(0).equals("changeOrder"))
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
	
	public String generateTableHeader(List<String> strings)
	{
		StringBuilder sb = new StringBuilder();
		sb.append("<table class='dataTable cell-border row-border'><thead><tr>");
		//This table header simply allows a column for the indices
		sb.append("<th>Index</th>");
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
	
	public List<String> convertStringToList(String str)
	{
		Gson gson = new Gson();
		Type type = new TypeToken<List<String>>() {}.getType();
		return gson.fromJson(str, type);
	}
	
	public String getValueFromProject(String value, Project p)
	{
		// Call to report helper to get data from project based on a value
		return ReportHelper.getReportVal(value, p);
	}

	public void sortProjects(List<projectObjects.Project> projects)
	{
		Collections.sort(projects, new WarehouseComparator());
		Collections.sort(projects, new ProjectItemComparator());
		Collections.sort(projects, new ProjectRegionComparator());		
	}
	
	public static String makePrintButton()
	{
		return "<input type='button' id='printButton' onclick='printPage()' value='Print Page' />";
	}
	
	public static String makeBackLink()
	{
		//double timestamp = System.currentTimeMillis();
		return "<input type='button' id='backButton' onclick='backPage()' value='Go Back' />";
	}

}
