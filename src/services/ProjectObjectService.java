package services;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.OneToOne;
import javax.persistence.Persistence;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.TransactionException;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import objects.HibernateUtil;
import projectObjects.Inspections;
import projectObjects.NewEquipment;
import projectObjects.Permission;
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectObject;
import projectObjects.Status;
import projectObjects.Task;
import projectObjects.ChangeOrder;
import projectObjects.CostEstimate;

import java.util.Set;


/**
 * This class performs actions on the database, such as adding,
 * updating, and deleting objects in the database.

 *
 */
public class ProjectObjectService 
{	
	
	
	/**
	 * This class returns all objects of a certain type from the database.
	 * @param domain the type of object to be returned.
	 * @return a list of all objects of a specific type in the database.
	 */
	public synchronized static List<Object> getProjectSupervisors()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
				
		//Get all objects of type "domain"
		Query q = session.createQuery("from project_supervisors");
	    @SuppressWarnings("unchecked")
		List<Object> list = q.list();
	    tx.commit();
		        
	    return list;		
        
	}
	
	public synchronized static String getTheProjects()
	{
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		Query q = null;
		try
		{
			tx = session.beginTransaction();
		}
		catch(TransactionException ex)
		{		
			tx.commit();
		}
		
		Class<?> c;
		
		try 
		{
			c = Class.forName("projectObjects.Project");
			
			
			Criteria criteria = session.createCriteria(c);
				
				
				ProjectionList projectionList = Projections.projectionList();
				
				

				//THE ORDER OF THESE ADDS MATTERS DUE TO HOW THESE IDS ARE MATCHED ON THE FRONT END IN
				// projectRetrieval.js
				projectionList.add(Projections.property("id"));
				projectionList.add(Projections.property("mcsNumber"));
				projectionList.add(Projections.property("projectItem.id"));
				projectionList.add(Projections.property("projectType.id"));
				projectionList.add(Projections.property("stage.id"));
				projectionList.add(Projections.property("status.id"));
				projectionList.add(Projections.property("warehouse.id"));
				projectionList.add(Projections.property("projectManagers.id"));
				projectionList.add(Projections.property("projectClass.id"));	
				projectionList.add(Projections.property("mediumScore"));	
				projectionList.add(Projections.property("scheduledStartDate"));
				projectionList.add(Projections.property("scheduledTurnover"));
				projectionList.add(Projections.property("budgetaryDue"));
				projectionList.add(Projections.property("budgetarySubmitted"));
				projectionList.add(Projections.property("proposalDue"));
				projectionList.add(Projections.property("proposalSubmitted"));
				projectionList.add(Projections.property("keyStatus"));
				//projectionList.add(Projections.property("supervisors.name").as("supervisors.name"));

				criteria.setProjection(projectionList);
				
			List<?> list = criteria.list();
	       
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public synchronized static String getTheProjectsWithRuleResults()
	{
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		Query q = null;
		try
		{
		tx = session.beginTransaction();
		}
		catch(TransactionException ex)
		{
		
			tx.commit();
		}
		Class<?> c;
		
		try 
		{
			c = Class.forName("projectObjects.Project");
			
			
			Criteria criteria = session.createCriteria(c);
				
				
				ProjectionList projectionList = Projections.projectionList();
				
				

				//THE ORDER OF THESE ADDS MATTERS DUE TO HOW THESE IDS ARE MATCHED ON THE FRONT END IN
				// projectRetrieval.js
				projectionList.add(Projections.property("id"));
				projectionList.add(Projections.property("mcsNumber"));
				projectionList.add(Projections.property("projectItem.id"));
				projectionList.add(Projections.property("projectType.id"));
				projectionList.add(Projections.property("stage.id"));
				projectionList.add(Projections.property("status.id"));
				projectionList.add(Projections.property("warehouse.id"));
				projectionList.add(Projections.property("projectManagers.id"));
				projectionList.add(Projections.property("projectClass.id"));
				projectionList.add(Projections.property("lowScore"));
				projectionList.add(Projections.property("mediumScore"));
				projectionList.add(Projections.property("highScore"));
				projectionList.add(Projections.property("scoreLastUpdated"));


				//projectionList.add(Projections.property("supervisors.name").as("supervisors.name"));

				criteria.setProjection(projectionList);
				
			List<?> list = criteria.list();
	       
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public synchronized static String getSpecificFieldIdsOfProject(Map<String, String> parameters)
	{
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		Query q = null;
		try
		{
		tx = session.beginTransaction();
		}
		catch(TransactionException ex)
		{
		
			tx.commit();
		}
		Class<?> c;
		
		try 
		{
			c = Class.forName("projectObjects.Project");
			
			
			Criteria criteria = session.createCriteria(c);
				
				
				ProjectionList projectionList = Projections.projectionList();
				
				

				//THE ORDER OF THESE ADDS MATTERS DUE TO HOW THESE IDS ARE MATCHED ON THE FRONT END IN

				projectionList.add(Projections.property("id"));
				if(parameters.get("item") != null && !parameters.get("item").isEmpty())
					if(parameters.get("item").equals("true"))
						projectionList.add(Projections.property("projectItem.id") , "projectItem");
				
				if(parameters.get("stage") != null && !parameters.get("stage").isEmpty())
					if(parameters.get("stage").equals("true"))
						projectionList.add(Projections.property("stage.id") , "stage");
				
				if(parameters.get("status") != null && !parameters.get("status").isEmpty())
					if(parameters.get("status").equals("true"))
						projectionList.add(Projections.property("status.id") , "status");
				
				if(parameters.get("warehouse") != null && !parameters.get("warehouse").isEmpty())
					if(parameters.get("warehouse").equals("true"))
						projectionList.add(Projections.property("warehouse.id") , "warehouse");
				
				if(parameters.get("manager") != null && !parameters.get("manager").isEmpty())
					if(parameters.get("manager").equals("true"))
						projectionList.add(Projections.property("projectManagers.id") , "projectManagers");
				
				if(parameters.get("class") != null && !parameters.get("class").isEmpty())
					if(parameters.get("class").equals("true"))
						projectionList.add(Projections.property("projectClass.id") , "projectClass");

				criteria.setProjection(projectionList);
				
			List<?> list = criteria.list();
	       
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	/**
	 * This class returns all objects of a certain type from the database.
	 * @param domain the type of object to be returned.
	 * @return a list of all objects of a specific type in the database.
	 */
	public synchronized static List<Object> getAll(String domain)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = null;
		List<Object> listNew = null;
		
		try
		{
			tx = session.beginTransaction();
			//Get all objects of type "domain"
	        Query q = session.createQuery("from "+domain);
	        @SuppressWarnings("unchecked")
	        List<Object> list = q.list();
	        tx.commit();
	        listNew = list;
		}
		catch(TransactionException e)
		{
		   System.out.println("trans excep " + e);
		}
		
		return listNew;
	}
	
	/**
	 * This function returns all Projects from the database.
	 * @return a list of all Projects of a specific type in the database.
	 */
	public synchronized static List<projectObjects.Project> getAllRawProjects()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from Project");
        @SuppressWarnings("unchecked")
		List<projectObjects.Project> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	/**
	 * This function returns all Rules from the database.
	 * @return a list of all Rules of a specific type in the database.
	 */
	public synchronized static List<projectObjects.ProjectRule> getAllRules()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from ProjectRule");
        @SuppressWarnings("unchecked")
		List<projectObjects.ProjectRule> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	/**
	 * This function returns all Tasks from the database.
	 * @return a list of all Tasks of a specific type in the database.
	 */
	public synchronized static List<projectObjects.Task> getAllTasks()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from Task");
        @SuppressWarnings("unchecked")
		List<projectObjects.Task> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	/**
	 * This function returns all Tasks from the database for a given project.
	 * @return a list of all Tasks of a specific type in the database.
	 */
	public synchronized static List<projectObjects.Task> getAllTasks(Long projectId)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from Task where project_id = " + projectId);
        @SuppressWarnings("unchecked")
		List<projectObjects.Task> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	
	public synchronized static List<projectObjects.PendingInvoice> getAllPendInvs(Long projectId)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from PendingInvoice where pendingInvoice_id = " + projectId);
        @SuppressWarnings("unchecked")
		List<projectObjects.PendingInvoice> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	public synchronized static List<projectObjects.PendingInvoice> getAllPendInvs()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from PendingInvoice");
        @SuppressWarnings("unchecked")
		List<projectObjects.PendingInvoice> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	
	/**
	 * This function returns all Projects from the database.
	 * @return a list of all Projects in the database.
	 */
	public synchronized static List<projectObjects.Project> getAllProjects()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from Project");
        @SuppressWarnings("unchecked")
		List<projectObjects.Project> list = q.list();
   
        tx.commit();
        
        return list;
	}
	
	/**
	 * This function returns all Change Orders from the database.
	 * @return a list of all Change Orders with a specific status in the database.
	 */
	public synchronized static List<projectObjects.ChangeOrder> getAllChangeOrders()
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from ChangeOrder");
        @SuppressWarnings("unchecked")
		List<projectObjects.ChangeOrder> list = q.list();
   
        tx.commit();
        
        return list;
	}
	/**
	 * This function returns all Change Orders from the database for a given project.
	 * @return a list of all Change Orders with a specific status in the database.
	 */
	public synchronized static List<projectObjects.ChangeOrder> getAllChangeOrders(Long projectId)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from ChangeOrder where changeOrders_id = " + projectId);
        @SuppressWarnings("unchecked")
		List<projectObjects.ChangeOrder> list = q.list();
   
        tx.commit();
        
        return list;
	}
	/**
	 * This function returns all Equipment from the database for a given project.
	 * @return a list of all Equipment in the database.
	 */
	public synchronized static List<projectObjects.NewEquipment> getAllNewEquipment(Long projectId)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from NewEquipment where projEquipment_id = " + projectId);
        @SuppressWarnings("unchecked")
		List<projectObjects.NewEquipment> list = q.list();
   
        tx.commit();
        
        return list;
	}
	/**
	 * This function returns all Tasks from the database.
	 * @param task assignee_id
	 * @return a list of all Tasks of a specific assignee in the database.
	 */
	public synchronized static List<projectObjects.Task> getAllTasksForAssignee(String assignee_id, String status_id)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
		Query q = null;
		
        if(status_id.equals("all")) 
        	q = session.createQuery("from task where assignee_id = " + assignee_id);
        if(assignee_id.equals("all"))
        {
        	if(status_id.equals("1")) 
        		q = session.createQuery("from task where taskStatus_id = 1");
        	else if(status_id.equals("2")) 
        		q = session.createQuery("from task where taskStatus_id = 2");
        	else if(status_id.equals("3")) 
        		q = session.createQuery("from task where taskStatus_id = 3");
        	else if(status_id.equals("12")) 
        		q = session.createQuery("from task where taskStatus_id != 3");
        }
        else if(!assignee_id.equals("all"))
        {
        	if(status_id.equals("1")) 
        		q = session.createQuery("from task where taskStatus_id = 1 and assignee_id = " +assignee_id);
        	else if(status_id.equals("2")) 
        		q = session.createQuery("from task where taskStatus_id = 2 and assignee_id = " +assignee_id);
        	else if(status_id.equals("3")) 
        		q = session.createQuery("from task where taskStatus_id = 3 and assignee_id = " +assignee_id);
        	else if(status_id.equals("12")) 
        		q = session.createQuery("from task where taskStatus_id != 3 and assignee_id = " +assignee_id);
        }
        
        @SuppressWarnings("unchecked")
		List<projectObjects.Task> list = q.list();
        tx.commit();
        
        return list;
	}
	
	/**
	 * This function returns all Tasks from the database.
	 * @param task statuses
	 * @return a list of all Tasks of a specific status in the database.
	 */
	public synchronized static List<projectObjects.Task> getAllTasksByStatus(String statuses)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
		Query q = null;
		
		char[] status_ids = statuses.toCharArray();
		String taskQuery = "taskStatus_id = ";
		
		for(int i = 0; i < status_ids.length; i++)
		{
			taskQuery += status_ids[i] + " ";
			
			if(i != status_ids.length - 1) 
				taskQuery += " or taskStatus_id = ";
		}
		
		
		
		
		
		q = session.createQuery("from Task where " + taskQuery);
		
	    @SuppressWarnings("unchecked")
		List<projectObjects.Task> list = q.list();
        tx.commit();
        
        return list;
	}
	
	
	/**
	 * This method returns all objects of a certain type from the database,
	 * and formats them as a JSON array. This method is to be used to send information
	 * to the front-end of this application.
	 * 
	 * @param domain the type of object to be returned.
	 * @return A JSON array string representing all of the objects.
	 */
	public synchronized static String getAllAsJsonString(String domain) throws NonUniqueObjectException
	{
        Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		Query q = null;
		try
		{
		tx = session.beginTransaction();
		}
		catch(TransactionException ex)
		{
		
			tx.commit();
			return "ERROR";
		}
		Class<?> c;
		
		try 
		{
			c = Class.forName("projectObjects."+domain);
			
			Criteria criteria = session.createCriteria(c);
			if (!domain.equals("Warehouse") && 
				!domain.equals("Project") && 
				!domain.equals("Inspections") && 
				!domain.equals("Permits")  && 
				!domain.equals("Equipment")&& 
				!domain.equals("EquipmentStatus") && 
				!domain.equals("ChangeOrderStatus") &&
				!domain.equals("Proposal") && 
				!domain.equals("Task") &&
				!domain.equals("Subcontractor") &&
				!domain.equals("Trade") &&
				!domain.equals("ProjectRule"))
				criteria.addOrder(Order.asc("name"));
			else if(domain.equals("Inspections")) {
				criteria.addOrder(Order.asc("id"));
			} else if(domain.equals("Proposal")) {
				criteria.addOrder(Order.asc("id"));
			} else if(domain.equals("ChangeOrderStatus")) {
				criteria.addOrder(Order.asc("id"));	
			} else if(domain.equals("Permits")) {
				criteria.addOrder(Order.asc("id"));
			} else if(domain.equals("Equipment")) {
				criteria.addOrder(Order.asc("id"));
			} else if(domain.equals("EquipmentStatus")) {
				criteria.addOrder(Order.asc("id"));
			} else if(domain.equals("MasterScope")) {
				criteria.addOrder(Order.asc("id"));
			} else if (domain.equals("Warehouse")){
				criteria.createAlias("city", "c");
				criteria.addOrder(Order.asc("c.name"));
			} else if (domain.equals("Project")) {
				
				
				ProjectionList projectionList = Projections.projectionList();

				projectionList.add(Projections.property("id").as("id"));
				projectionList.add(Projections.property("mcsNumber").as("McsNumber"));
				projectionList.add(Projections.property("projectItem").as("projectItem"));
				projectionList.add(Projections.property("projectType").as("projectType"));
				projectionList.add(Projections.property("stage").as("stage"));
				projectionList.add(Projections.property("status").as("status"));
				projectionList.add(Projections.property("warehouse").as("warehouse"));
				projectionList.add(Projections.property("projectManagers").as("projectManagers"));
				projectionList.add(Projections.property("projectClass").as("projectClass"));
				projectionList.add(Projections.property("mediumScore").as("mediumScore"));
				projectionList.add(Projections.property("scheduledStartDate").as("scheduledStartDate"));
				projectionList.add(Projections.property("scheduledTurnover").as("scheduledTurnover"));
				projectionList.add(Projections.property("budgetaryDue"));
				projectionList.add(Projections.property("budgetarySubmitted"));
				projectionList.add(Projections.property("proposalDue"));
				projectionList.add(Projections.property("proposalSubmitted"));
				projectionList.add(Projections.property("keyStatus"));
				//projectionList.add(Projections.property("supervisors.name").as("supervisors.name"));

				criteria.setProjection(projectionList);
				
				
				
	
			} else if(domain.equals("Task")) {
				
				
				ProjectionList projectionList = Projections.projectionList();
				
				projectionList.add(Projections.property("id"));
				projectionList.add(Projections.property("project.id"));
				projectionList.add(Projections.property("assignedDate"));
				projectionList.add(Projections.property("assignee.id"));
				projectionList.add(Projections.property("subAssignee.id"));
				projectionList.add(Projections.property("dueDate"));
				projectionList.add(Projections.property("completed"));
				projectionList.add(Projections.property("description"));
				projectionList.add(Projections.property("notes"));
				projectionList.add(Projections.property("taskStatus"));
				projectionList.add(Projections.property("title"));
				projectionList.add(Projections.property("type"));
				projectionList.add(Projections.property("severity"));


				criteria.setProjection(projectionList);
				
				System.out.println("Task id = " + Order.asc("id"));
			}
			List<?> list = criteria.list();
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	

	
	public synchronized static String getID(String domain) throws NonUniqueObjectException
	{
        Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		Class<?> c;
		try 
		{
			c = Class.forName("projectObjects."+domain);
			
			Criteria criteria = session.createCriteria(c);
			if (!domain.equals("Warehouse") && !domain.equals("Project") && !domain.equals("Inspections") && !domain.equals("Permits") && !domain.equals("Equipment") && !domain.equals("EquipmentStatus"))
				criteria.addOrder(Order.asc("name"));
			else if(domain.equals("Inspections"))
			{
				criteria.addOrder(Order.asc("id"));
			}
			else if(domain.equals("Equipment"))
			{
				criteria.addOrder(Order.asc("id"));
			}
			else if(domain.equals("EquipmentStatus"))
			{
				criteria.addOrder(Order.asc("id"));
			}
			

	        List<?> list = criteria.list();
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return "";
	}	

	
	
	
	/**
	 * This method returns a single object of a certain type
	 * @param id the id of the object
	 * @param domain the type of object
	 * @return an object in the database
	 * @throws ClassNotFoundException
	 */
	public synchronized static Object get(Long id, String domain) throws ClassNotFoundException
	{		
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		
		Transaction tx = session.beginTransaction();
		
		//Get the Class from parsing the "domain" string.
		Class<?> c = Class.forName("projectObjects."+domain);
		//Get object from database that matches the id
		Object o = session.get(c, id);
		tx.commit();
		return o;
	}
	

	
	/**
	 * This method gets a particular object of a certain type from the database,
	 * and then formats it as a JSON string.
	 * @param id the id of the object
	 * @param domain the type of the object.
	 * @return A JSON string representing the object.
	 * @throws ClassNotFoundException
	 */
	public synchronized static String getAsJSON(Long id, String domain) throws ClassNotFoundException
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();

		Object o;	
		Gson gson= new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Class<?> c = Class.forName("projectObjects."+domain);
		
		//When convering dates to JSON format, don't use units smaller than days
		o = session.get(c, id);
		if(o instanceof projectObjects.Project)
			checkNullRows((projectObjects.Project)o);

		tx.commit();
	
		return gson.toJson(o);
	}
	
	/**
	 * this method is vital for any new fields that are added to the database
	 * This method will find any objects within a project that are null (weren't initialized when created)
	 * and then initialize them which gives them a ID which is needed to access any linked object's fields. 
	 * @param o the Project which needs to be checked
	 */
	private static void checkNullRows(projectObjects.Project o) {
		if(o.getPermits() == null)
		{
			o.setPermits(new Permits());
		}	
		if(o.getInspections() == null)
		{
			o.setInspections(new Inspections());
		}
		if(o.getChangeOrders() == null)
		{
			o.setChangeOrders(new HashSet<ChangeOrder>());
		}
		if(o.getProjEquipment() == null)
		{
			o.setProjEquipment(new HashSet<NewEquipment>());
		}
	}

	/**
	 * This method deletes an object from the database.
	 * @param id the id of the object to be deleted
	 * @param domain the type of object
	 * @return a confirmation that the object has been deleted.
	 * @throws ClassNotFoundException
	 */
	public synchronized static String delete(Long id, String domain) throws ClassNotFoundException
	{
		String success = "DELETED";
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		Class<?> c = Class.forName("projectObjects."+domain);
		//session.createQuery("delete from "+domain+" where id ="+id);
		//System.out.println("ATTEMPTING TO DELETE " + id);
		
		//Attempt to delete the object
		try
		{
			ProjectObject oldObject2 = (ProjectObject) session.get(c, id);
			System.out.println("ID = " + oldObject2.getId());

		   // Object o = session.get(c, id); 
		    session.delete(oldObject2); 
		    System.out.println("hi");
		    tx.commit();
		    System.out.println("hello");
		    success = "PROJECT_OBJECT_DELETED";
		}
		catch (Exception e) 
		{
			System.out.println(e.getMessage());
			if (tx!=null) tx.rollback();
			System.out.println("NOTHING WENT WRONG - kind of");
		}
		
		
		return success;
	}
	
	
	
	/**
	 * This method adds an object to the database.
	 * @param domain the type of object that is to be added
	 * @param o the object to be added
	 * @return the id of the transaction
	 */
	public synchronized static Serializable addObject(String domain, Object o)
	{
		System.out.println("add Object");
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		//session.save(o);
		
		Serializable txID = session.save(o);
        System.out.println("ID OF TRANSACTION: " + txID);
        tx.commit();
        HibernateUtil.closeDownSession();
        //return (long) txID;
	    return txID ;
	}
	
	/**
	 * This method adds an object to the database.
	 * @param domain the type of object that is to be added
	 * @param o the object to be added
	 * @return the id of the transaction
	 */
	public synchronized static long addUser(Object o, Permission permission, Status status)
	{
		System.out.println("add Object");
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		//session.save(o);
		
		session.save(permission);
		session.save(status);
		Long txID = (Long)session.save(o);
        System.out.println("ID OF TRANSACTION: " + txID);
        tx.commit();
       // HibernateUtil.closeDownSession();
        //return (long) txID;
	    return txID ;
	}
	
	
	
	/**
	 * TODO: I'm pretty sure this is awful garbage code that we don't need. See ProjectService.editExistingProject()
	 * 
	 * This method replaces an object in the database with a new object. This simpler and more efficient than
	 * getting an object from a database, changing specific fields, and updating the database.
	 * 
	 * @param domain the type of object that is going to be edited
	 * @param id the id of the object to be edited
	 * @param newObject the object that is to replace the object in the database.
	 * @throws ClassNotFoundException
	 */	
	public synchronized static long editObject(String domain, Long id, ProjectObject newObject,  int i2) throws ClassNotFoundException, NonUniqueObjectException
	{
		
		//Get session and start transaction
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
				
		//Get object from database
		Class<?> c = Class.forName("projectObjects."+domain);
		
		ProjectObject oldObject2 = (ProjectObject) session.get(c, id);
		
		//Copy fields of new object into old object, but keep the id
		newObject.setId(id);
		//System.out.println(newObject + " " + oldObject2);
		copyFieldByField(newObject, oldObject2, i2);
				
		session.saveOrUpdate(oldObject2);
		tx.commit();

		return id;
	}
	
	public synchronized static long editCostEst(String domain, Long id, CostEstimate newObject,  int i2) throws ClassNotFoundException, NonUniqueObjectException
	{
		
		//Get session and start transaction
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
				
		//Get object from database
		Class<?> c = Class.forName("projectObjects."+domain);
		
		ProjectObject oldObject2 = (ProjectObject) session.get(c, id);
		
		//Copy fields of new object into old object, but keep the id
		//newObject.setId(id);
		//System.out.println(newObject + " " + oldObject2);
		copyFieldByField(newObject, oldObject2, i2);
				
		session.saveOrUpdate(oldObject2);
		tx.commit();

		return id;
	}
	
	public synchronized static void editProjectScores(List<Project> newObjects,  int i2) throws ClassNotFoundException, NonUniqueObjectException
	{
		
		//Get session and start transaction
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		for(Project project : newObjects)
		{
			Map<String , String> parameters = new HashMap<String , String>();
			parameters.put("lowScore", String.valueOf(project.getLowScore()));
			parameters.put("mediumScore", String.valueOf(project.getMediumScore()));
			parameters.put("highScore", String.valueOf(project.getHighScore()));
			Project currentProject = null;
			
			try {		
				currentProject = ProjectService.editExistingProjects(project, parameters);		
			} catch (NumberFormatException e) {
				System.out.println("ID retrieval failed");
			} catch(ClassNotFoundException | ParseException e) {
				System.out.println("Some other error!");
			}
			
			if(currentProject != null)
				session.update(currentProject);
		}
		tx.commit();
	}
	
	public synchronized static void setNullProjectItemId(Long id)
	{
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		Query setNullIdsForItem = session.createSQLQuery("update project set projectItem_id = NULL where projectItem_id = " + id +";");
		setNullIdsForItem.executeUpdate();
		tx.commit();		
	}
	
	public synchronized static void updateProjectScore(Project project)
	{
		if(project == null)
			return;
		
		Date now = new Date();
		project.setScoreLastUpdated(now);
		Map<String , String> map = new HashMap<String , String>();
		map.put("lowScore", String.valueOf(project.getLowScore()));
		map.put("mediumScore", String.valueOf(project.getMediumScore()));
		map.put("highScore", String.valueOf(project.getHighScore()));
		map.put("scoreLastUpdated", String.valueOf(project.getScoreLastUpdated()));
		
		try
		{
			ProjectService.editExistingProjectScore(project.getId() , map);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

	}
	
	public synchronized static void updateProjectScores(List<Project> projects)
	{
		if(projects == null)
			return;
		
		
		try
		{
			ProjectObjectService.editProjectScores(projects , 1);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

	}
	
	/**
	 * TODO: This is a really hacky way to fix a problem with sets in projects
	 * @param session
	 */
	public synchronized static void deleteNullSetObjects() 
	{
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();

		Query deleteChangeOrders = session.createSQLQuery("delete from changeorder where changeOrders_id is NULL");
		deleteChangeOrders.executeUpdate();
		Query deleteEquipment = session.createSQLQuery("delete from newequipment where projEquipment_id is NULL");
		deleteEquipment.executeUpdate();
		
		tx.commit();
		
	}

	/*public synchronized static void editSetFromProject(String domain, Long id, ProjectObject o) throws ClassNotFoundException, NonUniqueObjectException
	{
		
		System.out.println("add to set");
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		session.saveOrUpdate(o);
		//long txID = Long.parseLong((String)session.save(o));
       // System.out.println("ID OF TRANSACTION: " + txID);
        tx.commit();
        //return (long) txID;
	}*/
	
	/**
	 * This method copies the fields of the src object into the fields of the dest object,
	 * no matter what kind of objects they are (They must be the same kind of object, though).
	 * This method is a wrapper method so that the public synchronized does not need to make the
	 * src.getClass call to give the ACTUAL copyFields a third argument
	 * 
	 * Source: http://vyazelenko.com/2013/10/29/copy-object-in-java-performance-comparison/
	 * 
	 * @param src The object we are copying fields from
	 * @param dest The object we are copying fields to.
	 */
	public synchronized static void copyFieldByField(Object src, Object dest, int i2) 
	{
		copyFields(src, dest, src.getClass(), i2);
	}
		
	/**
	 * This method copies the fields of the src object into the fields of the dest object,
	 * no matter what kind of objects they are (They must be the same kind of object, though).
	 * 
	 * Source: http://vyazelenko.com/2013/10/29/copy-object-in-java-performance-comparison/
	 * 
	 * @param src The object we are copying fields from
	 * @param dest The object we are copying fields to.
	 * @param klass The Class object from the src object
	 */
	private static void copyFields(Object src, Object dest, Class<?> klass, int i2) 
	{
		//Copy the fields from one object to another
		Field[] fields = klass.getDeclaredFields();
		for (Field f : fields) 
		{
			System.out.println(f.toString());
			/*
			 * I Don't know what this does, but it works...
			 */
			if((i2!=1 || !f.toString().contains("Inspections")) && 
			   (i2!=1 || !f.toString().contains("Closeout")) && 
			   (i2!=1 || !f.toString().contains("Permits")))
			//&& (i2!=1 || !f.toString().contains("Equipment")))
			{
				if(i2!=2 || !f.toString().contains("SalvageV"))
				{
					System.out.println("class: " + " " + src.getClass() +" Field: "  + f);
					f.setAccessible(true);
					copyFieldValue(src, dest, f);
				}
			}
		}
		 
		//Copy any fields that are also in the super class.
		klass = klass.getSuperclass();
		if (klass != null) 
		{
			copyFields(src, dest, klass, i2);
		}
	}
		 
	/**
	 * This method copies data from one field of object "src" to the same field of object "dest"
	 * 
	 * Source: http://vyazelenko.com/2013/10/29/copy-object-in-java-performance-comparison/
	 * 
	 * @param src the object we are copying the data from 
	 * @param dest the object we are copying the data to
	 * @param f the field of the object we are copying data from and to
	 */
	private static void copyFieldValue(Object src, Object dest, Field f) 
	{
		try 
		{
			//if src is of the Inspection object slip
			Object value = f.get(src);
			System.out.println(value.toString());
			System.out.println(dest.toString());
			f.set(dest, value);
		} 
		catch (Exception e) 
		{
			//throw new RuntimeException(e);
			System.out.println("exception = " + e);
		}
	}

	/**
	 * @param parseLong
	 * @return
	 */
	public synchronized static String getProjectTasksAsJSON(long projectID) {
        Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
		} catch(TransactionException ex) {	
			tx.commit();
			return "ERROR";
		}
		Class<?> c;
		
		try {
			c = Class.forName("projectObjects.Task");
			
			Criteria criteria = session.createCriteria(c);

			Criterion projectIDRestriction = Restrictions.sqlRestriction("project_id = " + projectID);
			criteria.add(projectIDRestriction);
			
	        List<?> list = criteria.list();
	        
	        tx.commit();

	        return gson.toJson(list);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	
	/**
	 * @param parseLong
	 * @return
	 */
	public synchronized static String getProjectPendInvsAsJSON(long projectID) {
        Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
		} catch(TransactionException ex) {	
			tx.commit();
			return "ERROR";
		}
		Class<?> c;
		
		try {
			c = Class.forName("projectObjects.PendingInvoice");
			
			Criteria criteria = session.createCriteria(c);

			Criterion projectIDRestriction = Restrictions.sqlRestriction("pendingInvoice_id = " + projectID);
			criteria.add(projectIDRestriction);
			
	        List<?> list = criteria.list();
	        
	        tx.commit();

	        return gson.toJson(list);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	
	

	public synchronized static String getComparableCostEst(int id) {
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createSQLQuery("select * from CostEstimate where projItem = " + id);
        @SuppressWarnings("unchecked")
		List<?> list = q.list();
   
        try
        {
        	tx.commit();
        }
        catch(TransactionException e)
        {
        	System.out.println("transaction exception");
        }
        
        return gson.toJson(list);
	}
	
	public synchronized static String getProjSpecScopesAsJSON(long projectID) {
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createSQLQuery("select * from ProjectSpecScope where proj = " + projectID);
        @SuppressWarnings("unchecked")
		List<projectObjects.ProjectSpecScope> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
        
	}
	
	
	public synchronized static String getMasterScopesAsJSON()
	{
		System.out.println("getting master scopes");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		Class<?> c;
		try 
		{
			c = Class.forName("projectObjects.MasterScope");
			
			Criteria criteria = session.createCriteria(c);
			
			ProjectionList projectionList = Projections.projectionList();

		    projectionList.add(Projections.distinct(Projections.property("projItem")));
			projectionList.add(Projections.property("id"));
			projectionList.add(Projections.property("item1"));
			projectionList.add(Projections.property("item2"));
			projectionList.add(Projections.property("item3"));
			projectionList.add(Projections.property("item4"));
			projectionList.add(Projections.property("item5"));
			projectionList.add(Projections.property("item6"));
			projectionList.add(Projections.property("item7"));
			projectionList.add(Projections.property("item8"));
			projectionList.add(Projections.property("item9"));
			projectionList.add(Projections.property("item10"));
			projectionList.add(Projections.property("quantity1"));
			projectionList.add(Projections.property("quantity2"));
			projectionList.add(Projections.property("quantity3"));
			projectionList.add(Projections.property("quantity4"));
			projectionList.add(Projections.property("quantity5"));
			projectionList.add(Projections.property("quantity6"));
			projectionList.add(Projections.property("quantity7"));
			projectionList.add(Projections.property("quantity8"));
			projectionList.add(Projections.property("quantity9"));
			projectionList.add(Projections.property("quantity10"));
		    
		    criteria.setProjection(projectionList);
		//Get all objects of type "domain"
       // Query q = session.createQuery("from MasterScope");
       // q.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        @SuppressWarnings("unchecked")
		List<projectObjects.ProjectSpecScope> list = criteria.list();
   
        tx.commit();
        
        return gson.toJson(list);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
        
		return null;
		
        
	}

	
	public synchronized static String getProjItemAsJSON(Long id)
	{
		System.out.println("getting proj item");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
	
		//Get all objects of type "domain"
        Query q = session.createQuery("from ProjectItem where id = " + id );
        @SuppressWarnings("unchecked")
		
		List<projectObjects.ProjectSpecScope> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
		
	}
	
	public synchronized static String getSpecMasterScope(Long id)
	{
		System.out.println("getting master Scope");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
	
		//Get all objects of type "domain"
        Query q = session.createQuery("from MasterScope where projItem = " + id );
        @SuppressWarnings("unchecked")
		
		List<Object> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
		
	}
	
	public synchronized static String getSpecProjScope(Long id)
	{
		System.out.println("getting proj scope");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
	
		//Get all objects of type "domain"
        Query q = session.createQuery("from ProjectSpecScope where itemNum = " + id );
        @SuppressWarnings("unchecked")
		
		List<Object> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
		
	}
	
	public synchronized static String getSpecProjMasterScope(Long id)
	{
		System.out.println("getting proj master Scope");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
	
		//Get all objects of type "domain"
        Query q = session.createQuery("from ProjectMasterScope where projId = " + id );
        @SuppressWarnings("unchecked")
		
		List<Object> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
	}
	
	public synchronized static String getSpecProject(Long id)
	{
		System.out.println("getting proj item");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx;
		List<Object> listNew = null;
		
		try
		{
		  tx = session.beginTransaction();
		//Get all objects of type "domain"
	        Query q = session.createQuery("from Project where id = " + id );
	        @SuppressWarnings("unchecked")
			
			List<Object> list = q.list();
	        tx.commit();
	        listNew = list;
		}
		catch(TransactionException e)
		{
			System.out.println("transaction exception" + e);
		}
		
        return gson.toJson(listNew);
	}
	
	public synchronized static String getSpecCostEst(int id)
	{
		System.out.println("getting cost est");
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
	
		//Get all objects of type "domain"
        Query q = session.createQuery("from CostEstimate where proj = " + id );
        @SuppressWarnings("unchecked")
		
		List<Object> list = q.list();
   
        tx.commit();
        
        return gson.toJson(list);
	}
	
	
	public synchronized static String deleteMasterScope(int projItem) throws ClassNotFoundException
	{
		String success = "DELETED";
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();

	    Query q = session.createQuery("delete from MasterScope where projItem =" + projItem);
	    q.executeUpdate();
	    System.out.println("ATTEMPTING TO DELETE " + projItem);
		tx.commit();
		
		return success;
	}
	

	public synchronized static String deleteProjSpecScope(int item) throws ClassNotFoundException
	{
		String success = "DELETED";
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
	
	    Query q = session.createQuery("delete from ProjectSpecScope where itemNum =" + item);
	    q.executeUpdate();
	    System.out.println("ATTEMPTING TO DELETE " + item);
		tx.commit();
		
		return success;
	}
	public synchronized static String getAllProjectIds(String domain) throws NonUniqueObjectException
	{
        Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		Query q = null;
		try
		{
		tx = session.beginTransaction();
		}
		catch(TransactionException ex)
		{
		
			tx.commit();
			return "ERROR";
		}
		Class<?> c;
		
		try 
		{
			c = Class.forName("projectObjects."+domain);
			
			Criteria criteria = session.createCriteria(c);
			if (domain.equals("Project")) {
				
				
				ProjectionList projectionList = Projections.projectionList();

				projectionList.add(Projections.property("id").as("id"));
//				projectionList.add(Projections.property("mcsNumber").as("McsNumber"));
				criteria.setProjection(projectionList);
				
				
				
	
			} 
			List<?> list = criteria.list();
	       
	        tx.commit();

	        return gson.toJson(list);
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return "";
	}
}

