package Servlets;

import java.io.IOException;


import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import objects.HashGen;
import objects.HibernateUtil;
import objects.RequestHandler;
import projectObjects.City;
import projectObjects.EquipmentVendor;
import projectObjects.Permission;
import projectObjects.Person;
import projectObjects.ProjectItem;
import projectObjects.ProjectRule;
import projectObjects.Region;
import projectObjects.State;
import projectObjects.Status;
import projectObjects.User;
import projectObjects.Warehouse;
import projectObjects.Subcontractor;
import services.LoginService;
import services.ProjectObjectService;
import services.ProjectService;
import services.helpers.ProjectRuleFiller;

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
	


	protected synchronized void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		if(!LoginService.verifyAdmin(req)) {resp.setContentType("plain/text"); out = resp.getWriter(); out.println("ADMINS_ONLY"); return;}
		out = resp.getWriter();
		
		//System.out.println("DOMAIN/ACTION: "+req.getParameter("domain")+" "+req.getParameter("action"));
		
		//Get parameters send through the POST request
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		
		//Get the domain and desired action
		String action = parameters.get("action");
		String response = "";
		
		
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Admin.java\nIN: doPost()\nTime of transaction: " + timeStamp);
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
			int warehouseID = Integer.parseInt(parameters.get("warehouseID"));
			City newCity = new City(city);
			ProjectObjectService.addObject("City", newCity);
			Warehouse warehouse = new Warehouse(warehouseID, newCity, State.valueOf(state), Region.valueOf(region));
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
		else if(action.equals("editItem"))
		{
			String newItemName = parameters.get("itemName");
			String itemID = parameters.get("itemId");
			Long id = Long.parseLong(itemID);
			
			ProjectItem pItem = new ProjectItem(newItemName);
			try {
				ProjectObjectService.editObject("ProjectItem", id , pItem , 1);
			} catch(Exception e) {
				e.printStackTrace();
			}
			response = "projectItem edited";
		}
		else if(action.equals("removeItem"))
		{
			System.out.println("REMOVING ITEM");
			String itemID = parameters.get("itemId");
			Long id = Long.parseLong(itemID);
			
			List<Object> projects = ProjectObjectService.getAll("Project");
			
			boolean inUse = false;
			for(Object obj : projects) {
				projectObjects.Project prj = (projectObjects.Project) obj;
				if(prj.getProjectItem().getId().equals(id)) {
					inUse = true;
					response = "IN_USE";
					break;
				}
					
		    }
		
			
			
			
			//ProjectObjectService.setNullProjectItemId(id);
			
			if(!inUse)
			{
				/*
				try {
					ProjectObjectService.delete(id , "ProjectItem");
				} catch(Exception e) {
					e.printStackTrace();
				}
				*/
				
				response = "projectItem removed";
			}

		}
		else if(action.equals("swapAndRemove"))
		{
			System.out.println("SWAPPING ITEM");
			
			String table = parameters.get("table");
			String column = parameters.get("column");
			String tableToRemoveFrom = parameters.get("tableToRemoveFrom");
			
			String oldObjectId = parameters.get("oldObjectId");
			Long oldId = Long.parseLong(oldObjectId);
			
			String newObjectId = parameters.get("newObjectId");
			Long newId = Long.parseLong(newObjectId);
			
			System.out.println(table + " " + column + " " + oldObjectId + " " + newObjectId);
			
			Session session = HibernateUtil.getSessionFactory().getCurrentSession();
			Transaction tx = session.beginTransaction();
									
			SQLQuery sqlQuery = session.createSQLQuery("update " + table +" set " + column + " = " + newObjectId + " where " + column + " = " + oldObjectId);

			sqlQuery.executeUpdate();
						
			tx.commit();

				
				try 
				{
					ProjectObjectService.delete(oldId , tableToRemoveFrom);
				} catch(Exception e) {
					e.printStackTrace();
				}
				
				
				response =  tableToRemoveFrom + " removed";
			

		}
		else if(action.equals("createSupplier"))
		{
			String vendorName = parameters.get("supplier");
			EquipmentVendor vendor = new EquipmentVendor(vendorName);
			ProjectObjectService.addObject("EquipmentVendor", vendor);
			response = "supplier created";
		}
		else if(action.equals("editEquipmentSupplier"))
		{
			String newSupplierName = parameters.get("supplierName");
			String supplierID = parameters.get("supplierId");
			Long id = Long.parseLong(supplierID);
			
			EquipmentVendor vendor = new EquipmentVendor(newSupplierName);
			try {
				ProjectObjectService.editObject("EquipmentVendor", id , vendor , 1);
			} catch(Exception e) {
				e.printStackTrace();
			}
			response = "equipment supplier edited";
		}
		else if(action.equals("createSubcontractor"))
		{
			
			System.out.println("Creating Subcontractor");
			
			try {
			response = ProjectService.createSubcontractor(parameters);
			} catch(ClassNotFoundException | ParseException e) {
				e.printStackTrace();
			}
			response = "subcontractor created";
		}
		else if(action.equals("editSubcontractor"))
		{
			String newSubName = parameters.get("name");
			String newSubEmail = parameters.get("email");
			String subID = parameters.get("subcontractorId");
			Long id = Long.parseLong(subID);
			
			Subcontractor sub = new Subcontractor(newSubName , newSubEmail);
			try {
				ProjectObjectService.editObject("Subcontractor", id , sub , 1);
			} catch(Exception e) {
				e.printStackTrace();
			}
			response = "subcontractor edited";
		}
		else if(action.equals("createCity"))
		{
			
			System.out.println("Creating City");
			
			try {
			response = ProjectService.createCity(parameters);
			} catch(ClassNotFoundException | ParseException e) {
				e.printStackTrace();
			}
			response = "city created";
		}
		else if(action.equals("editCity"))
		{
			String newCityName = parameters.get("cityName");
			String cityID = parameters.get("cityId");
			Long id = Long.parseLong(cityID);
			
			City city = new City(newCityName);
			try {
				ProjectObjectService.editObject("City", id , city , 1);
			} catch(Exception e) {
				e.printStackTrace();
			}
			response = "city edited";
		}
		else if(action.equals("addPerson"))
		{
			String username = parameters.get("username");
			Person person = new Person(username);
			ProjectObjectService.addObject("Person",  person);
			response = "person added";
		}
		else if(action.equals("addRule"))
		{
			ProjectRule rule = new ProjectRule();
			try {
			ProjectRuleFiller.fillRule(rule , parameters);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
			ProjectObjectService.addObject("ProjectRule",  rule);
			response = "rule added";
		}
		else if(action.equals("editRule"))
		{
			ProjectRule rule = new ProjectRule();
			Long ruleId = Long.parseLong(parameters.get("ruleId"));
			
 			try {
			ProjectService.editExistingRule(ruleId , parameters);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			
			response = "rule added";
		}
		else if(action.equals("deleteRule"))
		{
			Long ruleId = Long.parseLong(parameters.get("ruleId"));
			
 			try {
			ProjectObjectService.delete(ruleId , "ProjectRule");
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			
			response = "rule deleted";
		}
		else if(action.equals("addUser"))
		{
			String logInName = parameters.get("logInName");
			String firstName = parameters.get("firstName");
			String email = parameters.get("email");
			String password = parameters.get("password");
			
			String permission = parameters.get("permission");
			if(permission.equals("1")) permission = "admin";
			else if(permission.equals("3")) permission = "superadmin";
			else permission = "basic";
			
			String status = parameters.get("status");
			if(status.equals("1")) status = "admin";
			if(status.equals("3")) status = "superadmin";
			else status = "basic";
			
			String hashedPassword = null;
			HashGen generator = new HashGen();
			
			try {
				hashedPassword = generator.getHash(password);
			} catch (NoSuchAlgorithmException e) {
				System.out.println("Something went wrong while hashing!");
				e.printStackTrace();
			}
			
			Status statusObject = new Status(status);
			
			Permission permissionObject = null;
			if(permission.equals("admin")) permissionObject = new Permission(permission, true, true, true, true, false);
			else if(permission.equals("superadmin")) permissionObject = new Permission(permission, true, true, true, true, true);
			else permissionObject = new Permission(permission, true, true, false, true, false);
			
			User user = new User(logInName, hashedPassword, statusObject, permissionObject, firstName, email);
			
			
			ProjectObjectService.addUser(user, permissionObject, statusObject);
			response = "user added";
			
		}
		
		out.print(response);
	}
}
