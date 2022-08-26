package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.cfg.Configuration;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import objects.RequestHandler;
import services.ProjectNewRuleColorService;

/**
 * Servlet implementation class Customers
 */
@WebServlet("/Customers")
public class Customers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Customers() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//load a properties file from class path, inside static method
		System.out.println("Servlet is Customers.Java");
		
		final PrintWriter writer = response.getWriter();
		
		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
		String createApprovalsmyDriver = configuration.getProperty("hibernate.connection.driver_class");
		String myUrl = configuration.getProperty("hibernate.connection.url");
		String dbuser = configuration.getProperty("hibernate.connection.username");
		String password = configuration.getProperty("hibernate.connection.password");
		
		Map<String, String> parameters = RequestHandler.getParameters((request.getParameterMap()));
		
		//Get the domain and desired action
		//String domain = parameters.get("domain");
		String action = parameters.get("action");
		System.out.println("Action is - " + action);
		HttpSession session = request.getSession(false);
		
		if(action.equals("fetchCustomerEmails")){
			String customerGroup = parameters.get("CustomerGroup");
			//int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
			
			//System.out.println(parameters.get("customerGroups"));
			
			
			String data = parameters.get("customerGroups");
			
			JSONArray json = new JSONArray(data);
			
			
			System.out.println(json);
			
			//System.out.println(json.getJSONObject(0).get("projectInvoiced"));
			
			Map<String , String> customerEmails = new HashMap<String , String>();
			JSONArray resp = new JSONArray();
			
			for (int i = 0; i < json.length(); i++) {
				
				try {
					
					Class.forName(myDriver);
					Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
					Statement st = conn.createStatement();
					
				    JSONObject c = json.getJSONObject(i);
				    
				    String customerGroupValue = json.getJSONObject(i).getString("invoiceCustomer");
				    String id = json.getJSONObject(i).get("id").toString();

				    String customerEmailQuery = "Select * from customeremail where customergroup = '" + customerGroupValue +"'";
				    
				    //System.out.println("Query is- " + customerEmailQuery);
				    
				    // execute the query, and get a java resultset
				    ResultSet rs = st.executeQuery(customerEmailQuery);
				    
				    JSONArray respo = convertToJSONArray(rs);
				    
				    //System.out.println("Customer Emails response is - " + respo);
				    
				    Map<String , String> temp = new HashMap<String , String>();
				    temp.put("id", id);
				    
				    respo.put(temp);
				    
				    System.out.println("Respo value is- " + respo);
				    
				    resp.put(respo);
				    
				    
				    
				}
				
				catch (Exception e) {
					e.printStackTrace();
				}
				
				
				
			}
			String respo1 = customerEmails.toString();
		    
		    
		    System.out.println("Customer Email Response is- " + resp);
		    
		    writer.println(resp);
		    writer.close();	
			    

		}
		
		if(action.equals("fetchCustomerEmailsAll")){
			String customerGroup = parameters.get("CustomerGroup");
			
			Map<String , String> customerEmails = new HashMap<String , String>();
			JSONArray resp = new JSONArray();
			
			
			
			try {
				
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();

			    String customerEmailQuery = "Select * from customeremail";
			    
			    //System.out.println("Query is- " + customerEmailQuery);
			    
			    // execute the query, and get a java resultset
			    ResultSet rs = st.executeQuery(customerEmailQuery);
			    
			    resp = convertToJSONArray(rs);
			   			    
			}
			
			catch (Exception e) {
				e.printStackTrace();
			}
				
				
				
			String respo1 = customerEmails.toString();
		    
		    
		    System.out.println("Customer Email Response is- " + resp);
		    
		    writer.println(resp);
		    writer.close();	
			    

		}
	}
		
	
	
	public static JSONArray convertToJSONArray(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
        while (resultSet.next()) {
            JSONObject obj = new JSONObject();
            int total_rows = resultSet.getMetaData().getColumnCount();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));

            }
            jsonArray.put(obj);
        }
        return jsonArray;
    }

}
