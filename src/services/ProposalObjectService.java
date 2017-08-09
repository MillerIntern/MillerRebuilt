package services;

import java.io.File;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import objects.HibernateUtil;
import projectObjects.ProjectObject;


/**
 * This class performs actions on the database, such as adding,
 * updating, and deleting objects in the database.

 *
 */
public class ProposalObjectService 
{	
	final static private int IS_OWNED_BY_OTHER_OBJECT = -1;
	/**
	 * This class returns all objects of a certain type from the database.
	 * @param domain the type of object to be returned.
	 * @return a list of all objects of a specific type in the database.
	 */
	public synchronized static List<Object> getAll(String domain)
	{
		//Begin transaction
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		
		//Get all objects of type "domain"
        Query q = session.createQuery("from "+domain);
        @SuppressWarnings("unchecked")
		List<Object> list = q.list();
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
		Transaction tx = session.beginTransaction();
		
		@SuppressWarnings("rawtypes")
		Class c;
		try 
		{
			c = Class.forName("projectObjects."+domain);
			
			Criteria criteria = session.createCriteria(c);
			if (!domain.equals("Warehouse") && !domain.equals("Project") && !domain.equals("Inspections") && !domain.equals("Permits")  && !domain.equals("Equipment")&& !domain.equals("EquipmentStatus"))
				criteria.addOrder(Order.asc("name"));
			else if(domain.equals("Inspections"))
			{
				criteria.addOrder(Order.asc("id"));
			}
			else if(domain.equals("Permits"))
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
			
			else if (domain.equals("Warehouse"))
			{
				criteria.createAlias("city", "c");
				criteria.addOrder(Order.asc("c.name"));
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
		
		@SuppressWarnings("rawtypes")
		Class c;
		try 
		{
			c = Class.forName("proposalObjects."+domain);
			
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
		@SuppressWarnings("rawtypes")
		Class c = Class.forName("proposalObjects."+domain);
		
		//Get object from database that matches the id
		@SuppressWarnings("unchecked")
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
	@SuppressWarnings("unchecked")
	public synchronized static String getAsJSON(Long id, String domain) throws ClassNotFoundException
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();

		Object o;	
		Gson gson= new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		
		@SuppressWarnings("rawtypes")
		Class c = Class.forName("proposalObjects."+domain);
		
		//When convering dates to JSON format, don't use units smaller than days
		o = session.get(c, id);
		tx.commit();

	try{
		//What is this??
		File f= new File("/home/chris/Desktop/getAsJSON.txt");
		PrintWriter p= new PrintWriter(f);

		p.write("proposalObjects."+domain+" "+id+"\n");
		p.write(gson.toJson(o));
		p.flush();
		p.close();
	}
	catch(Exception e){}

		return gson.toJson(o);
	}
	
	/**
	 * This method deletes an object from the database.
	 * @param id the id of the object to be deleted
	 * @param domain the type of object
	 * @return a confirmation that the object has been deleted.
	 * @throws ClassNotFoundException
	 */
	public synchronized static int delete(Long id, String domain) throws ClassNotFoundException
	{
		int success = IS_OWNED_BY_OTHER_OBJECT;
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		@SuppressWarnings("rawtypes")
		Class c = Class.forName("proposalObjects."+domain);
		
		//Attempt to delete the object
		try
		{
		    @SuppressWarnings("unchecked")
			Object o = session.get(c, id); 
		    session.delete(o); 
		    tx.commit();
		    success = 1;
		}
		catch (Exception e) 
		{
			if (tx!=null) tx.rollback();
			System.out.println("NOTHING WENT WRONG");
		}
		
		return success;
	}
	
	/**
	 * This method adds an object to the database.
	 * @param domain the type of object that is to be added
	 * @param o the object to be added
	 * @return the id of the transaction
	 */
	public synchronized static String addObject(String domain, Object o)
	{
		System.out.println("add Project");
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(o);
		//long txID = Long.parseLong((String)session.save(o));
       // System.out.println("ID OF TRANSACTION: " + txID);
        tx.commit();
        //return (long) txID;
	    return "ok" ;
	}
	
	
	/**
	 * This method replaces an object in the database with a new object. This simpler and more efficient than
	 * getting an object from a database, changing specific fields, and updating the database.
	 * 
	 * @param domain the type of object that is going to be edited
	 * @param id the id of the object to be edited
	 * @param newObject the object that is to replace the object in the database.
	 * @throws ClassNotFoundException
	 */
/*
	
	public synchronized static void editObjects(long[] iDs,String[] domains,ProjectObject objects[]) throws ClassNotFoundException
	{
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		for(int i=0; i<iDs.length;i++)
		{
		//Get session and start transaction
		System.out.println(i);
		
				
				if(iDs[i]!=0 )
				{
				Class c = Class.forName("projectObjects."+domains[i]);
				
				//Copy fields of new object into old object, but keep the i
				ProjectObject oldObject = (ProjectObject) session.get(c, iDs[i]);
				ProjectObject newObject = objects[i];
				
				//Copy fields of new object into old object, but keep the id
				newObject.setId(iDs[i]);
				//if(i==iDs.length)
			//	{
					copyFieldByField(newObject, oldObject);
					session.update(oldObject);
					
				//}
				}
			
		//Save the change
		
		}
		tx.commit();
	}
	*/
	
	public synchronized static void editObject(String domain, Long id, ProjectObject newObject,  int i2) throws ClassNotFoundException, NonUniqueObjectException
	{
		
		//Get session and start transaction
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		//Get object from database
		@SuppressWarnings("rawtypes")
		Class c = Class.forName("proposalObjects."+domain);
		
		@SuppressWarnings("unchecked")
		ProjectObject oldObject2 = (ProjectObject) session.get(c, id);
		
		//Copy fields of new object into old object, but keep the id
		newObject.setId(id);
		copyFieldByField(newObject, oldObject2, i2);
		
		//session.update(oldObject2);
		
		session.saveOrUpdate(oldObject2);
		tx.commit();

		//Save the change
	
	}
	
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
		
			if((i2!=1 || !f.toString().contains("Inspections")) && (i2!=1 || !f.toString().contains("Closeout")) && (i2!=1 || !f.toString().contains("Permits"))
					&& (i2!=1 || !f.toString().contains("Equipment")))
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
			f.set(dest, value);
			
				
		} 
		catch (ReflectiveOperationException e) 
		{
			throw new RuntimeException(e);
		}
	}
}
