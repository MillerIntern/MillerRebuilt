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
import projectObjects.Person;
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
		else if(action.equals("addPerson"))
		{
			String username = parameters.get("username");
			Person person = new Person(username);
			ProjectObjectService.addObject("Person",  person);
			response = "person added";
		}
		
		out.print(response);
	}
}
