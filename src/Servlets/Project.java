package Servlets;

import java.io.IOException;




import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;



import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.google.gson.Gson;

import objects.HibernateUtil;
import objects.RequestHandler;
import projectObjects.Task;
import projectObjects.User;
import services.LoginService;
import services.ProjectObjectService;
import services.ProjectService;
import services.QueryService;
import services.helpers.TaskFiller;
import objects.HashGen;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;




/**
 * Always code as if the guy who ends up maintaining your code 
 * will be a violent psychopath who knows where you live.
 * 
 *  -- Never Forgetti the Quoteroli 
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
     * TODO: This is pretty sloppy, if we could separate into different servlets or 
     * 				normalize the way we do stuff that would be great. It's just all over the place right now. 
     * 
     * This is where most of the java work is called from. The whatever.js
     * page will send a request to this URL given a set of parameters with 
     * an action. This method will result in data being written back out to 
     * the caller. 
     * 
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
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Project.java\nIN: doPost()\nTime of transaction: " + timeStamp);
		
		
		if(action == null) {
			resp.setContentType("plain/text"); 
			out = resp.getWriter(); 
			out.println("ACTION_FAILURE"); 
			return;
		}
		if (action.equals("getAllObjects"))
		{
			System.out.println("get All Objects");
			response = ProjectService.getAllEnumsAsJson();
			
		} else if(action.equals("sendTaskAlert")) {
			System.out.println("SENDING TASK ALERT");
	         String assignee = parameters.get("assignee");
	         User recipient = User.mapNameToUser(assignee);
			// Recipient's email ID needs to be mentioned.
		      String to = recipient.getEmail();

		      // Sender's email ID needs to be mentioned
		      String from = "mcstaskalert@millerconstructionservices.com";

		      // Assuming you are sending email from localhost
		      String host = "localhost";

		      // Get system properties
		      Properties properties = System.getProperties();

		      // Setup mail server
		      properties.setProperty("mail.smtp.host", host);


		      // Get the default Session object.
		      javax.mail.Session session = javax.mail.Session.getDefaultInstance(properties);

		      try {
		         // Create a default MimeMessage object.
		         MimeMessage message = new MimeMessage(session);

		         // Set From: header field of the header.
		         message.setFrom(new InternetAddress(from));

		         // Set To: header field of the header.
		         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

		         // Set Subject: header field
		         String subject, body;
		        
		         subject = "MCS Task Alert";		        
		         String projectItem = parameters.get("projectItem");
		         String warehouseCity = parameters.get("warehouseCity");
		         String warehouseID = parameters.get("warehouseID");
		         String warehouseState = parameters.get("warehouseState");
		         String severity = parameters.get("severity");
		         String dueDate = parameters.get("dueDate");
		         String description = parameters.get("description");
		         
		         if(dueDate != null ) {
		         System.out.println("Proj Item: "+projectItem+"\nDescription: "+description+"\nCity: "+warehouseCity+"\nID: "+warehouseID+
		        		 "\nState: "+warehouseState+"\nSeverity: "+severity); 
		         }
		         else {
		        	 System.out.println("Proj Item: "+projectItem+"\nDescription: "+description+"\nCity: "+warehouseCity+"\nID: "+warehouseID+
			        		 "\nState: "+warehouseState+"\nSeverity: "+severity+"\nDue Date: "+dueDate); 
		         }

		         
		         if(dueDate != null && !dueDate.equals("")) {
		         body = "Project:  " + warehouseCity + ", " + warehouseState +
		                " --- " + projectItem + "\n\nDescription: "+description+"\n\nWarehouse #: " + warehouseID + "\n\nPriority: " + severity + "\n\nDue Date: " +
		                dueDate;
		         } else {
		        	 body = "Project:  " + warehouseCity + ", " + warehouseState +
					            " --- " + projectItem + "\n\nDescription: "+description+"\n\nWarehouse #: " + warehouseID + "\n\nPriority: " + severity;
		         }
		         

		         message.setSubject(subject);

		         // Now set the actual message
		         message.setText(body);

		         // Send message
		         Transport.send(message);
		         System.out.println("Sent message successfully....");
		      }catch (MessagingException mex) {
		         mex.printStackTrace();
		      }
		} else if(action.equals("sendText")) {
			System.out.println("SENDING TEXT");

			 String phoneNumber = parameters.get("phoneNumber");
	         String textMessage = parameters.get("message");
	         String phoneCarrier = parameters.get("phoneCarrier");
	         System.out.println("Phone Number: " + phoneNumber);
	         System.out.println("Message: " + textMessage);
	         System.out.println("Phone Carrier: " + phoneCarrier);
			
	         String ATT = "txt.att.net";
	         String VERIZON = "vtext.com";
	         String SPRINT = "messaging.sprintpcs.com";
	         
	         switch("phoneCarrier") {
	         	case "1":
	         		phoneCarrier = ATT;
	         		break;
	         	case "2":
	         		phoneCarrier = VERIZON;
	         		break;
	         	case "3":
	         		phoneCarrier = SPRINT;
	         }
			// Recipient's email ID needs to be mentioned.
		      String to = phoneNumber+"@"+phoneCarrier ;
		      //to = "6106576953@txt.att.net";
		      // Sender's email ID needs to be mentioned
		      String from = "Bennett Wisner";

		      // Assuming you are sending email from localhost
		      String host = "localhost";

		      // Get system properties
		      Properties properties = System.getProperties();

		      // Setup mail server
		      properties.setProperty("mail.smtp.host", host);


		      // Get the default Session object.
		      javax.mail.Session session = javax.mail.Session.getDefaultInstance(properties);

		      try {
		         // Create a default MimeMessage object.
		         MimeMessage message = new MimeMessage(session);

		         // Set From: header field of the header.
		         message.setFrom(new InternetAddress(from));

		         // Set To: header field of the header.
		         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

		         // Set Subject: header field
		         String subject, body;
		        
		        // subject = "Text Test";		        
		         
		         body = textMessage;

		        // message.setSubject(subject);

		         // Now set the actual message
		         message.setText(body);

		         // Send message
		         Transport.send(message);
		         System.out.println("Sent message successfully....");
		      }catch (MessagingException mex) {
		         mex.printStackTrace();
		      }
		} else if (action.equals("getSpecificObjects")) {
			System.out.println("getting specific objects");
			response = ProjectService.getSpecificAsJson(parameters);
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
		} else if(action.equals("addNewProject")) {
			System.out.println("addingNewProject");
			
			try
			{
			Long projID = ProjectService.addNewProject(parameters);
			response = Long.toString(projID);
			}
			catch(ClassNotFoundException | ParseException e) 
			{
				e.printStackTrace();
			}
		} else if(action.equals("editExistingProject")) {
			System.out.println("editExistingProject");
			
			try {
				Long projID = Long.parseLong(parameters.get("projectID"));		
				ProjectService.editExistingProject(projID, parameters);		
				response = Long.toString(projID);
			} catch (NumberFormatException e) {
				System.out.println("ID retrieval failed");
			} catch(ClassNotFoundException | ParseException e) {
				System.out.println("Some other error!");
			}
		} else if (action.equals("editCloseout"))
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
		else if(action.equals("getWarehouse")) 
		{
			System.out.println("GET WAREHOUSE");
			try 
			{
				response = (String) ProjectObjectService.getAsJSON(Long.parseLong(parameters.get("id")), "Warehouse");
				System.out.println("project: "+response);
			} 
			catch (NumberFormatException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		} 
		else if(action.equals("getItem")) 
		{
			System.out.println("GET ITEM");
			try 
			{
				response = (String) ProjectObjectService.getAsJSON(Long.parseLong(parameters.get("id")), "ProjectItem");
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
			System.out.println("getting the projectsssss!");
			response = ProjectService.getAllProjectsAsJson();
		}
		else if(action.equals("getProjectsWithStage")){
			System.out.println("getting projects of certain stages!");
			String stages = parameters.get("stages");
			response = ProjectService.getAllProjectsWithStageAsJson(parameters.get("stages"));
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
		else if(action.equals("deleteProjectObject")) 
		{
			try {
				Gson gson = new Gson();
				response = ProjectService.delete(Long.parseLong(parameters.get("id")), parameters.get("domain"));
				response = gson.toJson(response);
			} catch (NumberFormatException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		else if(action.equals("deleteChangeOrder"))
		{
			System.out.println("deleting a change order");
			try {
				ProjectService.removeChangeOrder(Long.parseLong(parameters.get("projectID")), Long.parseLong(parameters.get("changeOrderID")));
				ProjectService.delete(Long.parseLong(parameters.get("changeOrderID")), "ChangeOrder");
				response = "DELETED";
				//PUT BACK CLASS NOT FOUND EXCEPTION
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		else if(action.equals("getProjectManagers"))
		{
			System.out.println("Gettng Names of All Project Managers");
			// TODO: Store User's name under User.class this implementation is really bad
			//String[] projectManagers = {"Adrienne","Alex","Andy", "Bart", "Craig", "Dave",
			//				   "David", "Joe", "Scott"};
			List<Object> projectManagers = ProjectObjectService.getAll("Person");
			// TODO: WHEN PEOPLE HAVE FIRST NAMES response = ProjectObjectService.getAllAsJsonString("User");
			Gson gson = new Gson();
			response = gson.toJson(projectManagers);
			System.out.println("Proj managers = " + response);
		}
		else if (action.equals("getUsers")) {
			System.out.println("Gettng Names of All Users");
			// TODO: Store User's name under User.class this implementation is really bad
			List<Object> users= ProjectObjectService.getAll("User");
			
			
			// TODO: WHEN PEOPLE HAVE FIRST NAMES response = ProjectObjectService.getAllAsJsonString("User");
			Gson gson = new Gson();
			response = gson.toJson(users);
		} else if (action.equals("createTask")) {
			System.out.println("Creating Task");
			
			try {
			response = ProjectService.createTask(parameters, (String) req.getSession().getAttribute("user"));
			} catch(ClassNotFoundException | ParseException e) {
				e.printStackTrace();
			}
		} else if (action.equals("getTasks")) {
			try {
				System.out.println("Getting Tasks");
				response = ProjectObjectService.getAllAsJsonString("Task");

			} catch (NumberFormatException e) {
				e.printStackTrace();
			}

		} else if (action.equals("getUserInfo")) {
			System.out.println("getting User Info");
			System.out.println("GET == " + req.getSession().getAttribute("user"));
			System.out.println(User.mapNameToUser((String)req.getSession().getAttribute("user")));
			Gson g = new Gson();
			response = g.toJson(User.mapNameToUser((String) req.getSession().getAttribute("user")));
			System.out.println("response = " +response);
		} else if (action.equals("updateTask")) {
			System.out.println("Updating Task");
			
			Task currentTask = null;
			try {
				long taskID = Long.parseLong(parameters.get("taskID"));
				currentTask = (Task)ProjectObjectService.get(taskID,  "Task");
			} catch (ClassNotFoundException | NumberFormatException e) {
				e.printStackTrace();
			}

			try {
				TaskFiller.fillTaskInformation(currentTask, parameters, (String) req.getSession().getAttribute("user"));
			} catch (ClassNotFoundException | ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			session.clear();
			session.update(currentTask);
			tx.commit();

			response =  "UPDATED_TASK";
			
		} else if (action.equals("getProjectTasks")) {
			System.out.println("getting Project tasks");
			response = ProjectObjectService.getProjectTasksAsJSON(Long.parseLong(parameters.get("id")));
		} else if (action.equals("closeTask")) {
			System.out.println("Closing Task");
			try {
				Task task = (Task)ProjectObjectService.get(Long.parseLong(parameters.get("taskID")), "Task");
				
				task.setCompleted(true);
				
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(task);
				tx.commit();
				response = "TASK_CLOSED";
			} catch (NumberFormatException | ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}  else if(action.equals("changePassword")){
		
			System.out.println("Change Password");
			try {
				User user = (User)ProjectObjectService.get(Long.parseLong(parameters.get("id")), "User");
				String pass = parameters.get("newPassword");
				System.out.println("NEW PASSWORD IS ......." + pass);

				
				HashGen hG = new HashGen();
				try{
					pass = hG.getHash(pass);
				}
				catch(Exception e)
				{
					System.out.println("hashing went really wrong!");
					e.printStackTrace();
				}
				finally{
				System.out.println("NEWER PASSWORD IS ......." + pass);
				user.setPassword(pass);
				
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(user);
				tx.commit();
				//HibernateUtil.closeDownSession();
				response = "USER_UPDATED";
				}
			} catch (NumberFormatException | ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		if(!(action.equals("getAllProjects") || action.equals("getTasks") ||
				action.equals("getSpecificObjects")))
			System.out.println("ACTION = " + action + "\nRESPONSE = " + response);
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
			username = "Dave";
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
