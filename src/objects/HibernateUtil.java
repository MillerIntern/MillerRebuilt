package objects;

import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

/**
 * This class controls session creation / management. Sessions are needed by Hibernate to access the database with their API.
 * @author Alex Campbell
 *
 */
public class HibernateUtil {

	private static SessionFactory sessionFactory = null;
	private static Session session = null;

	/**
	 * This method gets the session factory
	 * @return the session factory
	 * @throws HibernateException
	 */
	public static SessionFactory getSessionFactory() throws HibernateException 
	{
		if (sessionFactory == null || sessionFactory.isClosed())
		{
			// configures settings from hibernate.cfg.xml
			Configuration configuration= new Configuration().configure("hibernate.cfg.xml"); 
			
			StandardServiceRegistryBuilder serviceRegistryBuilder = new StandardServiceRegistryBuilder();
			
			// If you miss the below line then it will complaing about a missing dialect setting
			serviceRegistryBuilder.applySettings(configuration.getProperties());
			
			ServiceRegistry serviceRegistry = serviceRegistryBuilder.build();
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);

		}
		return sessionFactory;
	}
	
	/**
	 * This method is used to get the session factory specifically used in the testing environment
	 * This method is never used in the current building of the system
	 * @return the session factory
	 * @throws HibernateException
	 */
	public static SessionFactory getTestSessionFactory() throws HibernateException 
	{
			Configuration configuration=new Configuration().configure("test.cfg.xml"); 
			configuration.configure();
			StandardServiceRegistryBuilder serviceRegistryBuilder = new StandardServiceRegistryBuilder();
			Properties p;
			p = new Properties();
			
			p.put("hibernate.connection.url", "jdbc:mysql://localhost:3306/testdb");
			p.put("hibernate.hbm2ddl.auto","create");
			configuration.addProperties(p);
			
			// If you miss the below line then it will complaing about a missing dialect setting
			serviceRegistryBuilder.applySettings(configuration.getProperties());
			
			ServiceRegistry serviceRegistry = serviceRegistryBuilder.build();
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);

		return sessionFactory;
	}
	
	/***************** NOT NEEDED AS OF NOW **********************************/
	public static void setUpTestEnvironment()
	{
		session = getTestSessionFactory().openSession();   
	}
	
	public static Session getSession()
	{
		if (session == null)
		{
			session = getSessionFactory().openSession(); 
		}
		return session;
	}
	/**************************************************************************/
	
	/**
	 * This method closes down the session and closes all sockets connecting to the database
	 */
	public static void closeDownSession()
	{
		session.flush();
		sessionFactory.close();
		session = null;
	}
}