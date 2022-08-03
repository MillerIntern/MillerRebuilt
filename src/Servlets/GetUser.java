package Servlets;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.SQLQuery;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.google.gson.Gson;
import java.sql.*;

import objects.HibernateUtil;
import objects.RequestHandler;
import projectObjects.State;
import projectObjects.User;

import org.hibernate.cfg.Configuration;

/**
 * Servlet implementation class GetUser
 */
@WebServlet(description = "Servlet for handling admin requests", urlPatterns = {"/GetUser"})
public class GetUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static PrintWriter out;
	Properties prop = null;
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUser() {
    	
    	super();
    	
    	Properties prop = new Properties();
    	try {
    	    //load a properties file from class path, inside static method
    		InputStream in = new FileInputStream("hibernate.cfg.xml");
    		
    	    prop.load(in);

    	    //get the property value and print it out
    	    System.out.println(prop.getProperty("hibernate.connection.password"));
    	    //System.out.println(prop.getProperty("dbuser"));
    	    //System.out.println(prop.getProperty("dbpassword"));

    	} 
    	catch (IOException ex) {
    	    ex.printStackTrace();
    	}
    	
    	
        
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//resp.getWriter().append("Served at: ").append(req.getContextPath());
		
		out = resp.getWriter();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: GetUser.java\nIN: doPost()\nTime of transaction: " + timeStamp);
		
		String response = "";
		
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
    		
    		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
    		String action = parameters.get("action");

    		if(action.equals("getUserType"))
    		{
    			HttpSession session = req.getSession(false);
    			if (session != null) {
    	    	    
		    	    String username = (String)session.getAttribute("user");
					System.out.println("Username is " + username);
					String query = "SELECT status_id FROM user where name = '" + username + "'";
						
					Statement st = conn.createStatement();
					
					// execute the query, and get a java resultset
				    ResultSet rs = st.executeQuery(query);
				    
				    while (rs.next())
				      {
				        int id = rs.getInt("status_id");
				        System.out.println("Status id is " + id);
				        
				        response = Integer.toString(id);
				        
				      }
				
    			}
    		
    		//InputStream in = new FileInputStream("../hibernate.cfg.xml");
    		
    	    //prop.load(in);

    	    //get the property value and print it out
    	    //System.out.println(prop.getProperty("hibernate.connection.password"));
    	    //System.out.println(prop.getProperty("dbuser"));
    	    //System.out.println(prop.getProperty("dbpassword"));
    		}
    	} 
    	catch (Exception ex) {
    	    ex.printStackTrace();
    	}
		
		
    	out = resp.getWriter();
		out.println(response);
		
		
		/*if(action.equals("getUserType"))
		{
			HttpSession session = req.getSession(false);
			if (session != null) {
			    // a session exists
			    
				
				
				/*String username = (String)session.getAttribute("user");
				System.out.println("Username is " + username);
				
				//System.out.println("Username is " + User.getFirstName());
				
				Session querySession = HibernateUtil.getSessionFactory().getCurrentSession();
				Transaction tx = querySession.beginTransaction(); */
				/*
				SQLQuery query = querySession.createSQLQuery("SELECT status_id from user where name =" + username);
				
				List<Object[]> rows = query.list();
				for(Object[] row : rows){
					
					System.out.println("Usertype is " + row[0].toString());
				}
				 */
				
				/*Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
				criteria.add(Restrictions.eq("name", username));
				criteria.setProjection(Projections.projectionList()
						.add(Projections.property("status"))
						);
				
				List<String> rows = criteria.list();
				for(String row : rows){
					
					System.out.println("Usertype is " + row);
				} */
				
				//sqlQuery.
		//	} else {
			    // no session
		//	}
		
	}

}
