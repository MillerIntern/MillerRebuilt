package services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;

import objects.HashGen;
import objects.HibernateUtil;
import objects.RequestHandler;
import projectObjects.User;

public class LoginService 
{
	public synchronized static boolean Login(String username, String password) {
		HashGen hG = new HashGen();
		
		String hashedPass = null;
		try {
			hashedPass = hG.getHash(password);
			
			System.out.println(hashedPass);
		} catch(Exception e) {
			System.out.println("Hashing went wrong");
		}
		boolean loggedIn = true;
		
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("name", username));
		

		@SuppressWarnings("unchecked")
		List<User> matchingUser = criteria.list();

		if (matchingUser == null  || matchingUser.size() == 0 || matchingUser.size() > 1)
			loggedIn = false;
		else if (!matchingUser.get(0).getPassword().equals(hashedPass))
			loggedIn = false;
		
		return loggedIn;
	}
	
	public synchronized static boolean verify(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("verified") == null) return false;
		if(!request.getSession().getAttribute("verified").equals("true")) return false;
		if(request.getSession().getAttribute("user") == null) return false;
		//System.out.println(request.getSession().getAttribute("user") + " session: " + request.getSession().getAttribute("verified"));
		return true;
	}

	/**
	 * @param req
	 * @return
	 */
	public synchronized static boolean verifyAdmin(HttpServletRequest req) 
	{
		if(req.getSession().getAttribute("isAdmin") == null) return false;
		if(req.getSession().getAttribute("isAdmin").equals("true")) return true;
		return false;
	}

	/**
	 * @param username
	 * @return
	 */
	public synchronized static String isAdmin(String username) 
	{
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("name", username));
		
		@SuppressWarnings("unchecked")
		List<User> matchingUser = criteria.list();
		
		if (matchingUser == null  || matchingUser.size() == 0)
			return "false";
		else if (matchingUser.get(0).getPermission().isCanAccessAdminPage())
			return "true";
		
		return "false";
	}
	
	public synchronized static int userType(String username) {
		
		int userType = 0;
		
		Properties prop = new Properties();
    	try {
    	    //load a properties file from class path, inside static method
    		
    		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
    		
    		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
    		String myUrl = configuration.getProperty("hibernate.connection.url");
    		String dbuser = configuration.getProperty("hibernate.connection.username");
    		String password = configuration.getProperty("hibernate.connection.password");
    		Class.forName(myDriver);
    		Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
    		// create our mysql database connection
    		
    		

    		
		    	    
			System.out.println("Username is " + username);
			String query = "SELECT status_id FROM user where name = '" + username + "'";
				
			Statement st = conn.createStatement();
			
			// execute the query, and get a java resultset
		    ResultSet rs = st.executeQuery(query);
		    
		    while (rs.next())
		      {
		        int id = rs.getInt("status_id");
		        System.out.println("Status id is " + id);
		        
		        userType = id;
		        
		      }
				
			
		
    		//InputStream in = new FileInputStream("../hibernate.cfg.xml");
    		
    	    //prop.load(in);

    	    //get the property value and print it out
    	    //System.out.println(prop.getProperty("hibernate.connection.password"));
    	    //System.out.println(prop.getProperty("dbuser"));
    	    //System.out.println(prop.getProperty("dbpassword"));
		    //return userType;
    	} 
    	catch (Exception ex) {
    	    ex.printStackTrace();
    	}
		return userType;
	}

}
