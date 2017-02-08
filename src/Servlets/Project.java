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

import com.google.gson.Gson;

import objects.RequestHandler;
import services.LoginService;
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
		if(!LoginService.verify(req)) { resp.setContentType("plain/text"); out = resp.getWriter(); out.println("VERIFICATION_FAILURE"); return;}
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
				inspections = Long.parseLong(parameters.get("inspections"));
						
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
			System.out.println("hey");
			
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
				System.out.println("something went wrong with the build");
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
		else if(action.equals("addEquipment"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				ProjectService.addEquipment(projectID,  parameters);
			}
			catch(ClassNotFoundException | ParseException e)
			{
				e.printStackTrace();
			}
		}
		else if(action.equals("editEquipment"))
		{
			Long projectID = Long.parseLong(parameters.get("projectID"));
			try
			{
				ProjectService.editEquipment(projectID, parameters);
			}
			catch(ClassNotFoundException | ParseException e)
			{
				e.printStackTrace();
			}
		}
		else if (action.equals("get"))
		{
			System.out.println("GET");
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
		// Very aggressive request TODO: Would be great to somehow minify this request
		else if(action.equals("getAllProjects"))
		{
			System.out.println("getting the projects!");
			response = ProjectService.getAllProjectsAsJson();
		}
		else if(action.equals("getManager"))
		{
			response = getManager(req);
		}
		else if(action.equals("deleteProject"))
		{
			System.out.println("deleting a project");
			
			try {
				Gson gson = new Gson();
				response = ProjectService.delete(Long.parseLong(parameters.get("id")), "Project");
				response = gson.toJson(response);
			} catch (NumberFormatException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		
		if(!action.equals("getAllProjects"))
			System.out.println(response);
		out.println(response);
	}

	/**
	 * @param req
	 * @return
	 */
	private String getManager(HttpServletRequest req) 
	{
		String username = (String) req.getSession().getAttribute("user");
		/* UNDEFINED USERS: Alex, Tony, Jim, Craig*/
		if(username.equals("andy"))
			username = "Andy";
		else if(username.equals("joe"))
			username = "Joe";
		else if(username.equals("bart"))
			username ="Bart";
		else if(username.equals("dwgregory1"))
			username = "David";
		else if(username.equals("dschoener"))
			username = "Daves";
		else if(username.equals("sai"))
			username = "Sai";
		else if(username.equals("alex"))
			username = "Alex";
		else if(username.equals("jim"))
			username = "Jim";
		else if(username.equals("craig"))
			username = "Craig";
		else if(username.equals("tony"))
			username = "Tony";
		else username = "";
		Gson gson = new Gson();
		
		return gson.toJson(username);
	}
	
}
