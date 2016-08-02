package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import objects.RequestHandler;
import services.CloseoutListService;
import services.ProjectObjectService;
import services.ProjectService;
import services.QueryService;

/**
 * Always code as if the guy who ends up maintaining your code 
 * will be a violent psychopath who knows where you live.
 * 
 */
@WebServlet("/Project")
public class Project extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	private static PrintWriter out;
       
    public Project() 
    {
        super();
    }

    /**
     * This is where most of the java work is called from. The whatever.js
     * page will send a request to this URL given a set of parameters with 
     * an action. This method will result in data being written back out to 
     * the caller. 
     * 
     * important calls
     * 	{	
     * 		[
     * 		action: "getAllObjects",
     * 		response: JSON object of information from databse
     * 		],
     * 		[
     * 		action: "add",
     *		params: JSON information of project,
     * 		response: ID of new project,
     * 		],
     * 		[
     * 		action : 'edit<*>', 
     * 		params: JSON infomration of project,
     * 		],
     * 		[
     * 		action : GET 
     * 		params: id of project to get
     * 		response: JSON'd project information
     * 		]
     * 		
     * }
     */
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		resp.setContentType("application/json");
		out = resp.getWriter();
		String response = "";
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		
		//Get the domain and desired action
		//String domain = parameters.get("domain");
		String action = parameters.get("action");
		ProjectService ps = new ProjectService();
		
		if (action.equals("getAllObjects"))
		{
			System.out.println("get All Objects");
			response = ProjectService.getAllEnumsAsJson();
			
		}
		else if (action.equals("getEditQueryObjects"))
		{
			System.out.println("qenum");
			response = ProjectService.getEditEnumsAsJSON();
		}
		else if (action.equals("getProjectToEdit"))
		{
			System.out.println("getEdit");
			String warehouse = (parameters.get("warehouse"));
			String stage = (parameters.get("stage"));
			String classID = (parameters.get("class"));
			String itemID = (parameters.get("item"));
			String projectID = (parameters.get("id"));
			//add a search by permit
			//String inspections= (parameters.get("inspections"));
			response = QueryService.getProjectToEdit(warehouse, stage, classID, itemID, projectID);
		}
		else if (action.equals("getEditableProject"))
		{
			System.out.println("getEditableProject");
			String warehouse = (parameters.get("whID"));
			String stage = (parameters.get("stageID"));
			String classID = (parameters.get("classID"));
			String itemID = (parameters.get("itemID"));
			String projectID = (parameters.get("projectID"));
			//String inspections=(parameters.get("inspections"));
			response = QueryService.getProjectToEdit(warehouse, stage, classID, itemID, projectID);
		}
		else if (action.equals("add"))
		{
			System.out.println("add");
			Long inspections;
			Long warehouse = Long.parseLong(parameters.get("warehouse"));
			Long projectClass = Long.parseLong(parameters.get("class"));
			Long projectItem = Long.parseLong(parameters.get("projectItem"));
			Long manager = Long.parseLong(parameters.get("manager"));
			Long supervisor = Long.parseLong(parameters.get("supervisor"));
			Long status = Long.parseLong(parameters.get("status"));
			Long stage = Long.parseLong(parameters.get("stage"));
			String scope = parameters.get("scope");
			Long pType = Long.parseLong(parameters.get("pType"));	
		
			if((String) parameters.get("inspections")=="")		
				inspections = (long) -1;
			else
				inspections =Long.parseLong(parameters.get("inspections"));
						
			try 
			{ 	
				Long projID = ps.addProject(warehouse, manager, supervisor, projectClass, projectItem, status, stage, pType, scope, parameters,inspections, req);
				response = ProjectService.getAsJSON(projID, "Project");
					
			} catch (ClassNotFoundException | ParseException e) 
			{
				
				e.printStackTrace();
			}
		}
		else if (action.equals("edit"))
		{
			System.out.println("edit");
			Long inspections;
			Long warehouse = Long.parseLong(parameters.get("warehouse"));
			Long projectClass = Long.parseLong(parameters.get("class"));
			Long projectItem = Long.parseLong(parameters.get("projectItem"));
			Long manager = Long.parseLong(parameters.get("manager"));
			Long supervisor = Long.parseLong(parameters.get("supervisor"));
			Long status = Long.parseLong(parameters.get("status"));
			Long stage = Long.parseLong(parameters.get("stage"));
			//Long inspections= Long.parseLong(parameters.get("inspections"));
			String scope = parameters.get("scope");
			Long pType = Long.parseLong(parameters.get("pType"));
 
			
			if((String) parameters.get("inspections")=="")		
				inspections = (long) -1;
			else
				inspections =Long.parseLong(parameters.get("inspections"));
			
			try 
			{
				    System.out.println("inspections in edit: " + inspections);
				    ProjectService.editProject(warehouse, manager, supervisor, projectClass, projectItem, status, stage, pType, scope, parameters,inspections, req);
			  
			} catch (ClassNotFoundException | ParseException e) 
			{
				e.printStackTrace();
			}
		}
		else if (action.equals("editCloseout"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
			ProjectService.editCloseout(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e) 
			{
				e.printStackTrace();
			}
		}
		else if(action.equals("editPermits"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
			ProjectService.editPermits(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e) 
			{
				e.printStackTrace();
			}
		}
		else if(action.equals("editInspections"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				ProjectService.editInspections(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e) 
			{
				e.printStackTrace();
			}
		}
		/**
		 * this one doesnt work. It actually wipes all required information from a project
		 */
		else if(action.equals("editProjectInfo"))
		{
			/*Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				//ProjectService.editProjectInformation(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e)
			{
				e.printStackTrace();
			}*/
		}
		else if(action.equals("addChangeOrder"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				ProjectService.addChangeOrder(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e)
			{
				e.printStackTrace();
			}
		}
		else if(action.equals("editChangeOrder"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				ProjectService.editChangeOrder(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e)
			{
				e.printStackTrace();
			}
		}
		else if (action.equals("get"))
		{
			System.out.println("GET");
			System.out.println(response);
			try 
			{
				response = (String) ProjectObjectService.getAsJSON(Long.parseLong(parameters.get("id")), "Project");
				System.out.println("project: "+response);
			} 
			catch (NumberFormatException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		else if (action.equals("getQueryEnums"))
		{
			response = ProjectService.getQueryEnumsAsJSON();
		}
		else if (action.equals("getAllEquipmentObjects"))
		{
			response = ProjectService.getAllEnumsEquipAsJson();
		}
		else if(action.equals("setCloseoutList"))
		{
			System.out.println("in SetCLOSEOUT LIST");
			CloseoutListService.setCheckList(Long.parseLong(parameters.get("id")),new String[]{parameters.get("asBuilts"),parameters.get("punchList"),parameters.get("permits"),parameters.get("closeOutPhoto"),parameters.get("revisions"),parameters.get("mechanicalInspection"),parameters.get("electricInspection"),parameters.get("plumbingInspection"),parameters.get("fireSprinklerInspection"),parameters.get("ansulInspection"),parameters.get("buildingInspection"),parameters.get("alarmForm"),
												parameters.get("hvacShutDown"),parameters.get("airGas"),parameters.get("hvacForm"),parameters.get("salvageValue"),parameters.get("mulvannyPunchList"),parameters.get("substantialCompletion"),parameters.get("subcontractorWarranty"),parameters.get("mcsWarranty"),parameters.get("lienRelease"),parameters.get("confirmCOs"),parameters.get("g704"),parameters.get("g706"),parameters.get("g706a")});
		}
		// Very aggressive request
		else if(action.equals("getAllProjects"))
		{
			System.out.println("getting the projects!");
			response = ProjectService.getAllProjectsAsJson();
		}
		
		if(!action.equals("getAllProjects"))
			System.out.println(response);
		out.println(response);
		
		
	}
	
}
