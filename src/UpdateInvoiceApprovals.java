

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
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
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import org.apache.commons.io.FileUtils;


import objects.RequestHandler;
import projectObjects.User;

/**
 * Servlet implementation class GetInvAttStatus
 */
@WebServlet("/UpdateApprovals")
public class UpdateInvoiceApprovals extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String UPLOAD_DIRECTORY = "upload";
	private static PrintWriter out;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateInvoiceApprovals() {
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
		System.out.println("Servlet is UpdateInvoiceApprovals.Java");
		
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
		
		if(action.equals("createApprovals")) {
			int projID = Integer.parseInt(parameters.get("project"));
			int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
			
			String query = "INSERT INTO invoiceapproval (project_id, invoice_id) VALUES (" + projID +
							" , " + invoiceID + ") ";
			
			System.out.println("Query is - " + query);
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    Boolean rs = st.execute(query);
			    
			    if (rs)
			    {
			    	System.out.println("Approvals created");
			        
			    }
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}
		
		//if action is to get of approvals in the system level
		if(action.equals("fetchNoOfApprovals")) {
			
			try {
				//get the number of approvals currently needed in the system
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
			    String approvalCountQuery = "SELECT * from no_of_approvals order by id desc limit 1";
			    
			    int noOfApprovals = 0;
			    System.out.println("Query is - " + approvalCountQuery);
			    
			    ResultSet rs = st.executeQuery(approvalCountQuery);
			    
			    JSONArray resp = convertToJSONArray(rs);
			    
			    while(rs.next()) {
			    	//System.out.println("inside while");
			    	noOfApprovals = rs.getInt("noOfApprovals");
			    	
			    }
			    
			    System.out.println("Result of query is- " + resp.toString());
			    
			    out = response.getWriter();
				out.println(resp.toString());
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}
		
		else if(action.equals("updateInvoiceApprovals")) {
			
			Gson g = new Gson();
			String userpermission = User.mapNameToUser((String) request.getSession().getAttribute("user")).getPermission().getName();
			
			System.out.println("User permission is- " + userpermission);
			
			
			if(userpermission.equals("basic")) {
				
			}
			
			else {
				int projID = Integer.parseInt(parameters.get("project"));
				int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
				String approvalStatus = parameters.get("approvalStatus");
				String statusDate = parameters.get("statusDate");
				
				//Date statusDate = parameters.get("statusDate");
				//System.out.println("Date is- " + statusDate);
				
				Date now = new Date();
				
				
				String pattern = "yyyy-MM-dd HH:mm:ss";
				SimpleDateFormat formatter = new SimpleDateFormat(pattern);
				
				String mysqlDateString = formatter.format(now);
				System.out.println("Java's Default Date Format: " + now);
		        System.out.println("Mysql's Default Date Format: " + mysqlDateString);
				
				try {
					Class.forName(myDriver);
					Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
					
					String query = "Select * from invoiceapproval where invoice_id = " + invoiceID;
					
					String username = (String)session.getAttribute("user");
					System.out.println("Query is- " + query);

						
					Statement st = conn.createStatement();
					
					// execute the query, and get a java resultset
				    ResultSet rs = st.executeQuery(query);
				    
				    while (rs.next())
				    {
				    	System.out.println("inside while");
				    	//first check that the status for the user1 already exists or not
				    	String userInDb1 = rs.getString("user_1");
				    	
				    	System.out.println("User in database is- " + userInDb1);
				    	
				    	//for first user field in database
				    	if (userInDb1 == null) {
				    		
				    		
				    		String updateQuery = "Update invoiceapproval set user_1 = '" + username + "', status_1 = '" + approvalStatus + "', date_1 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	else if (userInDb1.equals(username)) {
				    		//user 1 already exists update the users status
				    		String updateQuery = "Update invoiceapproval set status_1 = '" + approvalStatus + "', date_1 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	
				    	//first check that the status for the user2 already exists or not
				    	String userInDb2 = rs.getString("user_2");
				    	
				    	System.out.println("User 2 in database is- " + userInDb2);
				    	
				    	//for second user field in database
				    	if (userInDb2 == null) {
				    		
				    		
				    		String updateQuery = "Update invoiceapproval set user_2 = '" + username + "', status_2 = '" + approvalStatus + "', date_2 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	else if (userInDb2.equals(username)) {
				    		//user 1 already exists update the users status
				    		String updateQuery = "Update invoiceapproval set status_2 = '" + approvalStatus + "', date_2 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	
				    	//first check that the status for the user 3 already exists or not
				    	String userInDb3 = rs.getString("user_3");
				    	
				    	System.out.println("User 3 in database is- " + userInDb3);
				    	
				    	//for third user field in database
				    	if (userInDb3 == null) {
				    		
				    		
				    		String updateQuery = "Update invoiceapproval set user_3 = '" + username + "', status_3 = '" + approvalStatus + "', date_3 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	else if (userInDb3.equals(username)) {
				    		//user 4 already exists update the users status
				    		String updateQuery = "Update invoiceapproval set status_3 = '" + approvalStatus + "', date_3 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				        
				    	//first check that the status for the user 4 already exists or not
				    	String userInDb4 = rs.getString("user_4");
				    	
				    	System.out.println("User 3 in database is- " + userInDb4);
				    	
				    	//for fourth user field in database
				    	if (userInDb4 == null) {
				    		
				    		
				    		String updateQuery = "Update invoiceapproval set user_4 = '" + username + "', status_4 = '" + approvalStatus + "', date_4 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	else if (userInDb4.equals(username)) {
				    		//user 1 already exists update the users status
				    		String updateQuery = "Update invoiceapproval set status_4 = '" + approvalStatus + "', date_4 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	
				    	//first check that the status for the user 4 already exists or not
				    	String userInDb5 = rs.getString("user_4");
				    	
				    	System.out.println("User 5 in database is- " + userInDb5);
				    	
				    	//for fourth user field in database
				    	if (userInDb5 == null) {
				    		
				    		
				    		String updateQuery = "Update invoiceapproval set user_5 = '" + username + "', status_5 = '" + approvalStatus + "', date_5 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		System.out.println("Query is - " + updateQuery);
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	else if (userInDb5.equals(username)) {
				    		//user 1 already exists update the users status
				    		String updateQuery = "Update invoiceapproval set status_5 = '" + approvalStatus + "', date_5 = '" 
				    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
				    		
				    		
				    		Statement st2 = conn.createStatement();
				    		Boolean x = st2.execute(updateQuery);
				    		
				    		if(x) {
				    			System.out.println("Updated successfully");
				    		}
				    		break;
				    	}
				    	
				        //System.out.println("Status id is " + id);
				        
				        //response = Integer.toString(id);
				    	
				    	//update the invoice status in the main invoice queue based on the changed status of individual approvals
				    	updateInvoiceStatus(fetcnNoOfApprovals(), invoiceID);
				        
				    }
				}
				catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		
		else if(action.equals("FetchApprovals")) {
			
			int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
			
			String query = "Select * from invoiceapproval where invoice_id = " + invoiceID;
			
			System.out.println("Query is - " + query);
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    ResultSet rs = st.executeQuery(query);
			    
			    JSONArray resp = convertToJSONArray(rs);
			    
			    
			    
			    //response = (HttpServletResponse) resp;
			    //writer.println(respo);
			    //writer.close();
			    
			    //get the number of approvals currently needed in the system
			    Statement st2 = conn.createStatement();
			    String approvalCountQuery = "SELECT * from no_of_approvals order by id desc limit 1";
			    
			    int noOfApprovals = 0;
			    
			    ResultSet rs2 = st.executeQuery(approvalCountQuery);
			    while(rs2.next()) {
			    	//System.out.println("inside while");
			    	noOfApprovals = rs2.getInt("noOfApprovals");
			    	
			    }
			    
			    
			    
			    System.out.println("Current number of approvals is- " + noOfApprovals);
			    
			    Map<String , String> approvaljson = new HashMap<String , String>();
			    
			    approvaljson.put("noOfApprovals", noOfApprovals + "");
			    
			    resp.put(approvaljson);
			    
			    String respo = resp.toString();
			    //respo = respo.substring(1, respo.length() - 1);
			    
			    System.out.println("Response is- " + respo);
			    
			    out = response.getWriter();
				out.println(respo);
			}
			catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		
		else if(action.equals("modifyNoOfApprovals")) {
			
			System.out.println("Inside modify number of approvals");
			int noOfApprovals = Integer.parseInt(parameters.get("noOfApprovals"));
			
			Date now = new Date();
			String pattern = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);
			
			String mysqlDateString = formatter.format(now);
			
			String query = "Insert into no_of_approvals (date, noOfApprovals) values ('" + mysqlDateString + "', " + noOfApprovals + " )";
			
			System.out.println("Query is - " + query);
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    Boolean rs = st.execute(query);		   
			    
			    String resp = "false";
			    
			    if(rs) {
			    	//System.out.println("inside while");
			    	resp = "true";
			    }
			 
			    //respo = respo.substring(1, respo.length() - 1);
			    
			    //System.out.println("Response is- " + respo);
			    
			    out = response.getWriter();
				out.println(resp);
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
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

	//function to update invoice approval on invoice queue based on the approvals of the individual users
	public static void updateInvoiceStatus(int noOfApprovals, int invoiceID) {
		String status = "";
		
		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
		String createApprovalsmyDriver = configuration.getProperty("hibernate.connection.driver_class");
		String myUrl = configuration.getProperty("hibernate.connection.url");
		String dbuser = configuration.getProperty("hibernate.connection.username");
		String password = configuration.getProperty("hibernate.connection.password");
		
		try {
			Class.forName(myDriver);
			Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
			
			String query = "Select * from invoiceapproval where invoice_id = " + invoiceID;
			
			System.out.println("Query is- " + query);
		
			Statement st = conn.createStatement();
			
			// execute the query, and get a java resultset
		    ResultSet rs = st.executeQuery(query);
		    
		    while (rs.next())
		    {
		    	System.out.println("inside while");
		    	//first check that the status for the user1 already exists or not
		    	String status1 = rs.getString("status_1");
		    	String status2 = rs.getString("status_2");
		    	String status3 = rs.getString("status_3");
		    	String status4 = rs.getString("status_4");
		    	String status5 = rs.getString("status_5");
		    	
		    	System.out.println("User in database is- " + status1);
		    	
		    	//for first user field in database
		    	if (status1 == "Approved") {
		    		
		    		if(noOfApprovals == 1) {
		    			status = "Approved";
		    		}
		    		
		    		// two approvals and first is approved
		    		else if(noOfApprovals == 2) {
		    			
		    			// both first and second are approved
		    			if(status2 == "Approved") {
		    				status = "Approved";
		    			}
		    		}
		    		
		    		// if number of approvals are 3
		    		
		    		else
		    		if(status2 == "Approved")
		    		status = "Review";
		    		break;
		    	}
		    	else if (status1.equals(username)) {
		    		//user 1 already exists update the users status
		    		String updateQuery = "Update invoiceapproval set status_1 = '" + approvalStatus + "', date_1 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		
		    		System.out.println("Query is - " + updateQuery);
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	
		    	//first check that the status for the user2 already exists or not
		    	String userInDb2 = rs.getString("user_2");
		    	
		    	System.out.println("User 2 in database is- " + userInDb2);
		    	
		    	//for second user field in database
		    	if (userInDb2 == null) {
		    		
		    		
		    		String updateQuery = "Update invoiceapproval set user_2 = '" + username + "', status_2 = '" + approvalStatus + "', date_2 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		System.out.println("Query is - " + updateQuery);
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	else if (userInDb2.equals(username)) {
		    		//user 1 already exists update the users status
		    		String updateQuery = "Update invoiceapproval set status_2 = '" + approvalStatus + "', date_2 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	
		    	//first check that the status for the user 3 already exists or not
		    	String userInDb3 = rs.getString("user_3");
		    	
		    	System.out.println("User 3 in database is- " + userInDb3);
		    	
		    	//for third user field in database
		    	if (userInDb3 == null) {
		    		
		    		
		    		String updateQuery = "Update invoiceapproval set user_3 = '" + username + "', status_3 = '" + approvalStatus + "', date_3 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		System.out.println("Query is - " + updateQuery);
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	else if (userInDb3.equals(username)) {
		    		//user 4 already exists update the users status
		    		String updateQuery = "Update invoiceapproval set status_3 = '" + approvalStatus + "', date_3 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		        
		    	//first check that the status for the user 4 already exists or not
		    	String userInDb4 = rs.getString("user_4");
		    	
		    	System.out.println("User 3 in database is- " + userInDb4);
		    	
		    	//for fourth user field in database
		    	if (userInDb4 == null) {
		    		
		    		
		    		String updateQuery = "Update invoiceapproval set user_4 = '" + username + "', status_4 = '" + approvalStatus + "', date_4 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		System.out.println("Query is - " + updateQuery);
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	else if (userInDb4.equals(username)) {
		    		//user 1 already exists update the users status
		    		String updateQuery = "Update invoiceapproval set status_4 = '" + approvalStatus + "', date_4 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	
		    	//first check that the status for the user 4 already exists or not
		    	String userInDb5 = rs.getString("user_4");
		    	
		    	System.out.println("User 5 in database is- " + userInDb5);
		    	
		    	//for fourth user field in database
		    	if (userInDb5 == null) {
		    		
		    		
		    		String updateQuery = "Update invoiceapproval set user_5 = '" + username + "', status_5 = '" + approvalStatus + "', date_5 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		System.out.println("Query is - " + updateQuery);
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	else if (userInDb5.equals(username)) {
		    		//user 1 already exists update the users status
		    		String updateQuery = "Update invoiceapproval set status_5 = '" + approvalStatus + "', date_5 = '" 
		    				+ mysqlDateString + "' where invoice_id = " + invoiceID;
		    		
		    		
		    		Statement st2 = conn.createStatement();
		    		Boolean x = st2.execute(updateQuery);
		    		
		    		if(x) {
		    			System.out.println("Updated successfully");
		    		}
		    		break;
		    	}
		    	
		        //System.out.println("Status id is " + id);
		        
		        //response = Integer.toString(id);
		        
		    }
		}
		catch (Exception e) {
			e.printStackTrace();
		} 
	} 
	
	//function to fetch number of approvals
	public static int fetcnNoOfApprovals() {
		
		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
		String createApprovalsmyDriver = configuration.getProperty("hibernate.connection.driver_class");
		String myUrl = configuration.getProperty("hibernate.connection.url");
		String dbuser = configuration.getProperty("hibernate.connection.username");
		String password = configuration.getProperty("hibernate.connection.password");
		
		int noOfApprovals = 0;
		
		try {
			//get the number of approvals currently needed in the system
			Class.forName(myDriver);
			Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
			Statement st = conn.createStatement();
		    String approvalCountQuery = "SELECT * from no_of_approvals order by id desc limit 1";
		    
		    System.out.println("Query is - " + approvalCountQuery);
		    
		    ResultSet rs = st.executeQuery(approvalCountQuery);
		    
		    JSONArray resp = convertToJSONArray(rs);
		    
		    while(rs.next()) {
		    	//System.out.println("inside while");
		    	noOfApprovals = rs.getInt("noOfApprovals");
		    	
		    }
		    
		    System.out.println("Result of query is- " + resp.toString());
		    
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return noOfApprovals;
	}
}
