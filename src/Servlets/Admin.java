package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import objects.RequestHandler;
import projectObjects.City;
import projectObjects.EquipmentVendor;
import projectObjects.ProjectItem;
import projectObjects.Region;
import projectObjects.State;
import projectObjects.Warehouse;
import services.LoginService;
import services.ProjectObjectService;


@WebServlet(description = "Servlet for handling admin requests", urlPatterns = { "/Admin" })
public class Admin extends HttpServlet 
{	
	private static PrintWriter out;
	
	private static final long serialVersionUID = 1L;   

    public Admin() 
    {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		if(!LoginService.verifyAdmin(req)) {resp.setContentType("plain/text"); out = resp.getWriter(); out.println("ADMINS_ONLY"); return;}
		out = resp.getWriter();
		
		//System.out.println("DOMAIN/ACTION: "+req.getParameter("domain")+" "+req.getParameter("action"));
		
		//Get parameters send through the POST request
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		
		//Get the domain and desired action
		String action = parameters.get("action");
		String response = "";
		
		
		if(action.equals("getStates"))
		{
			Gson gson = new Gson();
			response = gson.toJson(State.values());
		}
		else if(action.equals("createWarehouse"))
		{
			String city = parameters.get("city");
			String state = parameters.get("state");
			String region = parameters.get("region");
			City newCity = new City(city);
			ProjectObjectService.addObject("City", newCity);
			Warehouse warehouse = new Warehouse(-1, newCity, State.valueOf(state), Region.valueOf(region));
			ProjectObjectService.addObject("Warehouse", warehouse);
			response = "warehouse created";
		}
		else if(action.equals("createItem"))
		{
			String item = parameters.get("item");
			ProjectItem pItem = new ProjectItem(item);
			ProjectObjectService.addObject("ProjectItem", pItem);
			response = "projectItem created";
		}
		else if(action.equals("createVendor"))
		{
			String vendorName = parameters.get("vendor");
			EquipmentVendor vendor = new EquipmentVendor(vendorName);
			ProjectObjectService.addObject("EquipmentVendor", vendor);
			response = "vendor created";
		}
		/*if (domain.equals("status"))
		{
			if (action.equals("add"))
			{
				resp.setContentType("text/html");
				AdminService.addStatus(parameters.get("name"));
			}
			else if (action.equals("getAll"))
			{
				response = AdminService.getAllStatuses();
				resp.setContentType("application/json");
			}
			else if (action.equals("edit"))
			{
				Long id = Long.parseLong(parameters.get("id"));
				String name = parameters.get("name");
				AdminService.editStatus(id, name);
				resp.setContentType("text/html");
			}
			else if (action.equals("delete"))
			{
				resp.setContentType("text/html");
				Long id = Long.parseLong(parameters.get("id"));
				int s = AdminService.deleteStatus(id);
				if (s == -1)
					response = "fail";
			}
		}
		
		else if (domain.equals("permission"))
		{	
			if (action.equals("getAll"))
			{
				response = AdminService.getAllPermissionsAsJson();
				resp.setContentType("application/json");
			}
			else if (action.equals("add"))
			{
				resp.setContentType("text/html");
				String name = parameters.get("name");
				boolean query = Boolean.parseBoolean(parameters.get("canQuery"));
				boolean list = Boolean.parseBoolean(parameters.get("canList"));
				boolean admin = Boolean.parseBoolean(parameters.get("canAdmin"));
				boolean projects = Boolean.parseBoolean(parameters.get("canEditProjects"));
				System.out.println(query+" "+list+" "+admin+" "+projects);
				
				AdminService.addPermission(name, query, list, admin, projects);
			}
						
			else if (action.equals("edit"))
			{
				resp.setContentType("text/html");
				Long id = Long.parseLong(parameters.get("id"));
				String name = parameters.get("name");
				boolean query = Boolean.parseBoolean(parameters.get("canQuery"));
				boolean list = Boolean.parseBoolean(parameters.get("canList"));
				boolean admin = Boolean.parseBoolean(parameters.get("canAdmin"));
				boolean projects = Boolean.parseBoolean(parameters.get("canEditProjects"));
				
				AdminService.editPermission(id, name, query, list, admin, projects);
			}
			else if (action.equals("delete"))
			{
				resp.setContentType("text/html");
				Long id = Long.parseLong(parameters.get("id"));
				int s = AdminService.deletePermission(id);
				if (s == -1)
					response = "fail";
			}
		}
		
		else if (domain.equals("user"))
		{	
			if (action.equals("add"))
			{
				resp.setContentType("text/html");
				int s = AdminService.addUser(
						parameters.get("username"),
						parameters.get("password"),
						Long.parseLong(parameters.get("statusID")),
						Long.parseLong(parameters.get("permissionID"))
				);
				
				if (s == -1)
					response = "existing";
			}
			
			else if (action.equals("getAll"))
			{
				response = AdminService.getAllAdminObjects();
				resp.setContentType("application/json");
			}
			
			else if (action.equals("edit"))
			{
				resp.setContentType("text/html");
				AdminService.editUser(
						Long.parseLong(parameters.get("id")),
						parameters.get("username"),
						parameters.get("password"),
						Long.parseLong(parameters.get("statusID")),
						Long.parseLong(parameters.get("permissionID"))
				);
			}
			
			else if (action.equals("delete"))
			{
				resp.setContentType("text/html");
				Long id = Long.parseLong(parameters.get("id"));
				int s = AdminService.deleteUser(id);
				if (s == -1)
					response = "fail";
			}
		}
		
		else if (domain.equals("item"))
		{	
			if (action.equals("add"))
			{
				resp.setContentType("text/html");
				int s = AdminService.addItem(parameters.get("item"));
					
				if (s == -1)
					response = "existing";
			}
		}*/
		
		
		out.print(response);
	}
}
