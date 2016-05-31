package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import objects.RequestHandler;
import services.AdminService;


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
		out = resp.getWriter();
		
		System.out.println("DOMAIN/ACTION: "+req.getParameter("domain")+" "+req.getParameter("action"));
		
		//Get parameters send through the POST request
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		
		//Get the domain and desired action
		String domain = parameters.get("domain");
		String action = parameters.get("action");
		String response = "";
		
		if (domain.equals("status"))
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
		}
		out.print(response);
	}
}
