package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import projectObjects.Person;
import projectObjects.Project;
import services.HtmlGenerator;
import services.QueryService;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import comparators.ProjectItemComparator;
import comparators.ProjectRegionComparator;
import comparators.WarehouseComparator;

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
		
		System.out.println("I am doing things and stuffs");
		
		//Get the list of projects
		Map<String, String[]> map = req.getParameterMap();
		List<projectObjects.Project> projects = null;
		try 
		{
			projects = QueryService.queryProjects(map);
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
			sb.append("<tr>");
			sb.append("<td>"+(i+1)+"</td>");
			projectObjects.Project p = projects.get(i);
			for (int j = 0; j < shownFields.size(); j++)
			{	
				sb.append("<td>");
				String value = getValueFromProject(shownFields.get(j), p);
				//System.out.println(value);
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
	
	public String generateTableHeader(List<String> strings)
	{
		StringBuilder sb = new StringBuilder();
		sb.append("<table class='dataTable cell-border row-border'><thead><tr>");
		//This table header simply allows a column for the indices
		sb.append("<th>Index</th>");
		for (int i = 0; i < strings.size(); i++)
		{
			
			String value = strings.get(i);
			if(value.equals("mcsNum"))
			{
				sb.append("<th>");
				sb.append("MCS Number");
			}
			else if (value.equals("warehouse"))
			{
				sb.append("<th>");
				sb.append("Warehouse");
			}
			else if (value.equals("stage"))
			{
				sb.append("<th>");
				sb.append("Stage");
			}
			else if (value.equals("item"))
			{
				sb.append("<th>");
				sb.append("Item");
			}
			else if (value.equals("supervisor"))
			{
				sb.append("<th>");
				sb.append("Supervisor");
			}
			else if (value.equals("manager"))
			{
				sb.append("<th>");
				sb.append("Manager");
			}
			else if (value.equals("region"))
			{
				sb.append("<th>");
				sb.append("Region");
			}
			else if (value.equals("class"))
			{
				sb.append("<th>");
				sb.append("Project Classification");
			}
			else if (value.equals("scope"))
			{
				sb.append("<th class = 'longText'>");
				sb.append("Project Scope");
			}
			else if (value.equals("initiated"))
			{
				sb.append("<th>");
				sb.append("Initiated Date");
			}
			else if (value.equals("status"))
			{
				sb.append("<th>");
				sb.append("Project Status");
			}
			else if (value.equals("scheduledStartDate"))
			{
				sb.append("<th>");
				sb.append("Scheduled Start Date");
			}
			else if (value.equals("shouldInvoice"))
			{	
				sb.append("<th>");
				sb.append("Should Invoice %");
			}
			else if (value.equals("invoiced"))
			{	
				sb.append("<th>");
				sb.append("Invoiced %");
			}
			else if (value.equals("alarmHvacForm"))
			{	
				sb.append("<th>");
				sb.append("Alarm/HVAC Form");
			}
			else if (value.equals("punchList"))
			{	
				sb.append("<th>");
				sb.append("Punch List");
			}
			else if (value.equals("scheduledTurnover"))
			{	
				sb.append("<th>");
				sb.append("Scheduled Turn Over");
			}
			else if (value.equals("actualTurnover"))
			{	
				sb.append("<th>");
				sb.append("Actual Turn Over");
			}
			else if (value.equals("initiated"))
			{	
				sb.append("<th>");
				sb.append("Project initiated date");
			}
			else if (value.equals("siteSurvey"))
			{	
				sb.append("<th>");
				sb.append("Site Survey");
			}
			else if (value.equals("costcoDueDate"))
			{	
				sb.append("<th>");
				sb.append("Costco Due Date");
			}
			else if (value.equals("proposalSubmitted"))
			{	
				sb.append("<th>");
				sb.append("Proposal Submitted");
			}
			else if (value.equals("type"))
			{	
				sb.append("<th>");
				sb.append("Type");
			}
			else if (value.equals("asBuilts"))
			{	
				sb.append("<th>");
				sb.append("As-Builts");
			}
			else if (value.equals("salvageValue"))
			{
				sb.append("<th>");
				sb.append("Salvage Value");
			}
			else if (value.equals("airGas"))
			{	
				sb.append("<th>");
				sb.append("Air Gas");
			}
			else if (value.equals("permitsClosed"))
			{	
				sb.append("<th>");
				sb.append("Permits Closed");
			}
			else if (value.equals("verisaeShutdownReport"))
			{	
				sb.append("<th>");
				sb.append("Verisae/Shut Down Report");
			}
			else if (value.equals("projectNotes"))
			{	
				sb.append("<th class = 'longText'>");
				sb.append("Project and Financial Notes");
			
			}
			else if(value.equals("custNum"))
			{
				sb.append("<th class>");
				sb.append("Customer Number");
			}
			else if(value.equals("cost"))
			{
				sb.append("<th>");
				sb.append("Project Cost");
			}
			else if(value.equals("zachNotes"))
			{
				sb.append("<th class = 'longText'>");
				sb.append("Refrigeration Notes");				
			}
			else if(value.equals("permitApp"))
			{
				sb.append("<th>");
				sb.append("Permit Application");
			}
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
		DateFormat dForm = new SimpleDateFormat("MM/dd/yyyy");
		/*
		if(value.equals("proposalSubmitted") && p.getProposalSubmitted() != null )
		{
			System.out.println("hi");
			System.out.println(p.getProposalSubmitted().equals("Proposal Submitted"));
		}*/
		
		if(value.equals("mcsNum"))
		{
			String mcsNumber = "tbd";
			if (p.getMcsNumber() != -1)
				mcsNumber = String.valueOf(p.getMcsNumber());
			
			return String.valueOf(mcsNumber);					
		}
		else if (value.equals("warehouse") && p.getWarehouse() != null)
		{
			return (p.getWarehouse().getCity().getName() + ", " + p.getWarehouse().getState().getAbbreviation() + "-#" + p.getWarehouse().getWarehouseID());
		}
		else if (value.equals("stage") && p.getStage() != null)
			return p.getStage().getName();
		else if (value.equals("item") && p.getProjectItem() != null)
			return p.getProjectItem().getName();
		
		else if (value.equals("supervisor") )
			return getFirstFromSet(p.getSupervisors()).getName();
		else if (value.equals("manager"))
			return getFirstFromSet(p.getProjectManagers()).getName();
		else if (value.equals("region") && p.getWarehouse() != null && p.getWarehouse().getRegion() != null)
			return p.getWarehouse().getRegion().getRegionName();
		else if (value.equals("class") && p.getProjectClass() != null)
			return p.getProjectClass().getName();
		else if (value.equals("scope"))
			return p.getScope();
		
		else if (value.equals("initiated") && p.getProjectInitiatedDate() != null)
			return dForm.format(p.getProjectInitiatedDate()).toString();
		
		else if (value.equals("status") && p.getStatus() != null)
			return p.getStatus().getName();
		
		else if (value.equals("scheduledStartDate") && p.getScheduledStartDate() != null)
			return dForm.format(p.getScheduledStartDate()).toString();
		else if (value.equals("shouldInvoice"))
			return String.valueOf(p.getShouldInvoice());
		else if (value.equals("invoiced"))
			return String.valueOf(p.getInvoiced());
		else if (value.equals("alarmHvacForm") && p.getCloseoutDetails().getAlarmHvacForm() != null)
			return dForm.format(p.getCloseoutDetails().getAlarmHvacForm());
		else if (value.equals("punchList") && p.getCloseoutDetails().getPunchList() != null)
			return dForm.format(p.getCloseoutDetails().getPunchList());
		else if (value.equals("scheduledTurnover") && p.getScheduledTurnover() != null)
			return dForm.format(p.getScheduledTurnover()).toString();
		else if (value.equals("actualTurnover") && p.getActualTurnover() != null)
			return dForm.format(p.getActualTurnover()).toString();
		else if (value.equals("actualTurnover") && p.getActualTurnover() != null)
			return dForm.format(p.getActualTurnover()).toString();
		else if (value.equals("initiated") && p.getProjectInitiatedDate() != null)
			return dForm.format(p.getProjectInitiatedDate()).toString();
		else if (value.equals("siteSurvey") && p.getSiteSurvey() != null)
			return dForm.format(p.getSiteSurvey()).toString();
		
		else if (value.equals("costcoDueDate") && p.getCostcoDueDate() != null)
			return dForm.format(p.getCostcoDueDate()).toString();
		
		else if (value.equals("proposalSubmitted") && p.getProposalSubmitted() != null)
			return dForm.format(p.getProposalSubmitted()).toString();
		
		else if (value.equals("type") && p.getProjectType() != null)
			return p.getProjectType().getName();
		
		else if (value.equals("asBuilts") && p.getCloseoutDetails().getAsBuilts() != null)
			return dForm.format(p.getCloseoutDetails().getAsBuilts());
		
		else if (value.equals("salvageValue") && p.getCloseoutDetails().getSalvageValue() != null)
			return "$"+ p.getCloseoutDetails().getSalvageValue().getValue() + " " + dForm.format(p.getCloseoutDetails().getSalvageValue().getDate());
		
		else if (value.equals("airGas") && p.getCloseoutDetails().getAirGas() != null)
			return dForm.format(p.getCloseoutDetails().getAirGas());
		
		else if (value.equals("permitsClosed") && p.getCloseoutDetails().getPermitsClosed() != null)
			return dForm.format(p.getCloseoutDetails().getPermitsClosed());
		
		else if (value.equals("verisaeShutdownReport") && p.getCloseoutDetails().getVerisaeShutdownReport() != null)
			return dForm.format(p.getCloseoutDetails().getVerisaeShutdownReport());
		
		else if (value.equals("projectNotes"))
			return String.valueOf(p.getProjectNotes());
		
		else if (value.equals("custNum") && p.getCustomerNumber() != null)
			return String.valueOf(p.getCustomerNumber());
		else if (value.equals("cost") && p.getCost() != null)
			return String.valueOf(p.getCost());
		else if (value.equals("zachNotes") && p.getZachUpdates() != null)
			return String.valueOf(p.getZachUpdates());
		else if (value.equals("permitApp") && p.getPermitApplication() != null)
			return dForm.format(p.getPermitApplication()).toString();
		
			else
			return "---";
	}


	public Person getFirstFromSet(Set<Person> set)
	{
		Iterator<Person> i = set.iterator();
		if (i.hasNext())
			return i.next();
		else
			return new Person("---");
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
