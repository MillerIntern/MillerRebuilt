

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
import java.sql.PreparedStatement;
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

import objects.HibernateUtil;
import objects.RequestHandler;
import projectObjects.User;
import services.ProjectObjectService;


import javax.persistence.CascadeType;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.OneToOne;
import javax.persistence.Persistence;

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
			int approval_id = 0;
			int noOfApprovals = fetcnNoOfApprovals();
			
			//get the recently inserted id of invoice
			String getid = "Select MAX(id) from invoice";

			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    ResultSet rs = st.executeQuery(getid);
			    
			    while (rs.next())
			    {
			    	System.out.println(rs);
			    	approval_id = rs.getInt(1);
			    	System.out.println("Id from invoice is- " + approval_id);
			        
			    }
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			
			Date now = new Date();
			String pattern = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);
			
			String mysqlDateString = formatter.format(now);
			
			System.out.println("Number of approval inside " + noOfApprovals);
			
			JSONArray approvingusers = fetchApprovingMembers();
			
			String query_start = "INSERT INTO invoiceapproval (approval_id, project_id, invoice_id";
			
			String query_end =  ") VALUES ("+ approval_id + ", " + projID +" , " + invoiceID + " ";
			
			String query_end_2 = ")";
			
			for(int i = 0; i < noOfApprovals; i++) {
				
				query_start = query_start + ", user_" + (i+1) + ", status_" + (i+1) + " ,date_" + (i+1);
				
				JSONObject obj = approvingusers.getJSONObject(i);
				query_end = query_end + ", '" + obj.getString("name") + "', 'Review', '" + mysqlDateString + "'" ;
				
				
			}
			
			String query = query_start + query_end + query_end_2;
			
			System.out.println("Query for create approvals is - " + query);
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				//Statement st = conn.createStatement();
				
				// Using prepared statement as to return the new generated approval_id
				PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
				
				// Execute the INSERT query
				int affectedRows = pstmt.executeUpdate();
				
				if (affectedRows == 0) {
				    System.out.println("No rows were inserted.");
				} else {
				    // Retrieve the generated keys (i.e., the last inserted ID)
				    ResultSet generatedKeys = pstmt.getGeneratedKeys();
				    if (generatedKeys.next()) {
				        int lastInsertedID = generatedKeys.getInt(1); // Assuming 'id' is an INT column
				        System.out.println("Approvals created and last Inserted ID: " + lastInsertedID);
				        
				        out = response.getWriter();
				        
				        JSONArray jsonArray = new JSONArray();
				        JSONObject jsonObject = new JSONObject();
				        jsonObject.put("result", "APPROVALS_ADDED");
				        jsonObject.put("approval_id", lastInsertedID);
				        jsonArray.put(jsonObject);
				        out.println(jsonArray.toString());
				    } else {
				        System.out.println("No generated keys were retrieved.");
				        out.println("ERROR UPDATING APPROVALS");
				    }
				}
				
				// execute the query, and get a java resultset
			    //int rs = st.executeUpdate(query);
			    //System.out.println("Query result is- " + rs);
			    /*if (rs > 0)
			    {
			    	System.out.println("Approvals created");
			    	
			    	out = response.getWriter();
					out.println("APPROVALS_ADDED");
					
					// Get the ID of the last inserted row immediately after the INSERT
					//Statement last_id = conn.createStatement();
					ResultSet new_approval_id_rs = st.executeQuery("select approval_id from invoiceapprovals SELECT LAST _INSERT_ID()");
					System.out.println("Approvals result is- " + new_approval_id_rs);
					int new_approval_id;
					while(new_approval_id_rs.next()) {
						new_approval_id = new_approval_id_rs.getInt(0);
						System.out.println("New Inserted approval Id is- " + new_approval_id);
					}
					
					
					JSONArray resp = convertToJSONArray(new_approval_id_rs);
					
					out.println(resp.toString());
			        
			    } */
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
			    
			    System.out.println("Updated number of approvals- " + resp.toString());
			    
			    out = response.getWriter();
				out.println(resp.toString());
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}
		

		else if(action.equals("clearInvoiceApprovalsAG")){
			//Need Status_1,2, 3 set to Review
			//Need date_1,2,3 set to empty

			
			int userApprovalIndex = Integer.parseInt(parameters.get("userApprovalIndex")) + 1;
			int approval_id = Integer.parseInt(parameters.get("id"));
			Date now = new Date();
			
			
			String pattern = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);
			
			String mysqlDateString = formatter.format(now);
			System.out.println("Java's Default Date Format: " + now);
	        System.out.println("Mysql's Default Date Format: " + mysqlDateString);
	        try {
	        	Class.forName(myDriver);
	        	Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
	        	Statement st = conn.createStatement();
	        	
	        	
	        	String username = (String)session.getAttribute("user");
	   				 	
	        	String rejectionHistoryNote = "Rejected by "+username +" on "+mysqlDateString;
	        	
	        	String query = "Update invoiceapproval set status_1 = 'Review', status_2 = 'Review', status_3 = 'Review', date_1 = '"+mysqlDateString + "', date_2 = '"+mysqlDateString 
	        			+ "', date_3 = '" +mysqlDateString + "', notes_"+ userApprovalIndex + "= '"+rejectionHistoryNote
	        			+  "' where approval_id = "+ approval_id;
	   			
	        	
	   			System.out.println("Query is- " + query);
	   			
	   			int x = st.executeUpdate(query);
	   			
	   			if(x>0) {
	   				out = response.getWriter();
	   				out.println("UPDATED_APPROVALS");
	   			} 
	   			
	   			//now update the status of invoice based on the status of individual approvals
//	   			updateInvoiceStatusAG(approval_id);
	        }
	        catch(Exception e) {
	        	e.printStackTrace();
	        }
			
			
			
			//Future - Update notes1,notes2, notes 3 to the previous approval information, make them save the history
			
			
			
		}
		
		else if(action.equals("updateInvoiceApprovalsAG")) {
			Gson g = new Gson();
			String userpermission = User.mapNameToUser((String) request.getSession().getAttribute("user")).getPermission().getName();
			//Why even check the user permission - looks like it should be handled on the front end
			
			int approval_id = Integer.parseInt(parameters.get("id"));

			
			String approvalStatus = parameters.get("approvalStatus");
			String statusDate = parameters.get("statusDate");
			int userApprovalIndex = Integer.parseInt(parameters.get("userApprovalIndex")) + 1;
			

			
			Date now = new Date();
			
			
			String pattern = "yyyy-MM-dd HH:mm:ss";
			SimpleDateFormat formatter = new SimpleDateFormat(pattern);
			
			String mysqlDateString = formatter.format(now);
			System.out.println("Java's Default Date Format: " + now);
	        System.out.println("Mysql's Default Date Format: " + mysqlDateString);
	        
	        try {
	        	Class.forName(myDriver);
	        	Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
	        	Statement st = conn.createStatement();
	        	
	        	
	        	String username = (String)session.getAttribute("user");
	   				 
	        	//String query = "Select * from invoiceapproval where invoice_id = " +invoiceID;
	   			
	        	String query = "Update invoiceapproval set user_" + userApprovalIndex + " = '" + username
	        			+ "', status_" + userApprovalIndex + " = '" + approvalStatus + "'"
	        			+ ", date_" + userApprovalIndex + " = '" + mysqlDateString + "'" 
	        			+  " where approval_id = "+ approval_id;
	   			
	        	
	   			System.out.println("Query is- " + query);
	   			
	   			int x = st.executeUpdate(query);
	   			
	   			if(x>0) {
	   				out = response.getWriter();
	   				out.println("UPDATED_APPROVALS");
	   			} 
	   			
	   			//now update the status of invoice based on the status of individual approvals
	   			updateInvoiceStatusAG(approval_id);
	        }
	        catch(Exception e) {
	        	e.printStackTrace();
	        }
			
			
			
		}
		
		else if(action.equals("updateInvoiceApprovals")) {
			
			Gson g = new Gson();
			String userpermission = User.mapNameToUser((String) request.getSession().getAttribute("user")).getPermission().getName();
			
			System.out.println("User permission is- " + userpermission);
			
			
			if(userpermission.equals("basic")) {
				int approval_id = Integer.parseInt(parameters.get("id"));
				int projID = Integer.parseInt(parameters.get("project"));
				int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
				int invUploaded = Integer.parseInt(parameters.get("invAvailable"));		
				System.out.println("Invoice pdf availability " + invUploaded);
				
				Date now = new Date();
				
				String pattern = "yyyy-MM-dd HH:mm:ss";
				SimpleDateFormat formatter = new SimpleDateFormat(pattern);
				
				String mysqlDateString = formatter.format(now);
				System.out.println("Java's Default Date Format: " + now);
		        System.out.println("Mysql's Default Date Format: " + mysqlDateString);
		        
		        try {
		        	Class.forName(myDriver);
		        	Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
		        	Statement st = conn.createStatement();
		        	
		        	
		        	String username = (String)session.getAttribute("user");
		   				 
		        	//String query = "Select * from invoiceapproval where invoice_id = " +invoiceID;
		   			
		        	String query = "";
		   			
		        	// make the invoice available field to 1 if
		        	if(invUploaded == 1) {
		        		query = "Update invoiceapproval set invavailable = " + invUploaded + " "
			        			+  " where approval_id = "+ approval_id;
		        		
		        	}
		        	
		        	else {
		        		query = "Update invoiceapproval set invavailable = " + invUploaded + " "
			        			+  " where approval_id = "+ approval_id;
		        	}
		        	
		   			System.out.println("Query is- " + query);
		   			
		   			int x = st.executeUpdate(query);
		   			
		   			if(x>0) {
		   				out = response.getWriter();
		   				out.println("UPDATED_APPROVALS");
		   			} 
		   			
		   			//now update the status of invoice based on the status of individual approvals
		   			updateInvoiceStatus(fetcnNoOfApprovals(),invoiceID);
		        }
		        catch(Exception e) {
		        	e.printStackTrace();
		        }
			}
			
			else {
				int approval_id = Integer.parseInt(parameters.get("id"));
				int projID = Integer.parseInt(parameters.get("project"));
				int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
				
				String approvalStatus = parameters.get("approvalStatus");
				String statusDate = parameters.get("statusDate");
				int userApprovalIndex = Integer.parseInt(parameters.get("userApprovalIndex")) + 1;
				
				int invUploaded = Integer.parseInt(parameters.get("invAvailable"));		
				System.out.println("Invoice pdf availability " + invUploaded);
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
		        	Statement st = conn.createStatement();
		        	
		        	
		        	String username = (String)session.getAttribute("user");
		   				 
		        	//String query = "Select * from invoiceapproval where invoice_id = " +invoiceID;
		   			
		        	String query = "Update invoiceapproval set user_" + userApprovalIndex + " = '" + username
		        			+ "', status_" + userApprovalIndex + " = '" + approvalStatus + "'"
		        			+ ", date_" + userApprovalIndex + " = '" + mysqlDateString + "'" 
		        			+  " where approval_id = "+ approval_id;
		   			
		        	// make the invoice available field to 1 if
		        	if(invUploaded == 1) {
		        		query = "Update invoiceapproval set user_" + userApprovalIndex + " = '" + username
			        			+ "', status_" + userApprovalIndex + " = '" + approvalStatus + "'"
			        			+ ", date_" + userApprovalIndex + " = '" + mysqlDateString + "'" 
			        			+ ", invavailable = " + invUploaded + " "
			        			+  " where approval_id = "+ approval_id;
		        		
		        	}
		        	
		   			System.out.println("Query is- " + query);
		   			
		   			int x = st.executeUpdate(query);
		   			
		   			if(x>0) {
		   				out = response.getWriter();
		   				out.println("UPDATED_APPROVALS");
		   			} 
		   			
		   			//now update the status of invoice based on the status of individual approvals
		   			updateInvoiceStatus(fetcnNoOfApprovals(),invoiceID);
		        }
		        catch(Exception e) {
		        	e.printStackTrace();
		        }
				
				/*
				 * try { Class.forName(myDriver); Connection conn =
				 * DriverManager.getConnection(myUrl, dbuser, password);
				 * 
				 * String query = "Select * from invoiceapproval where invoice_id = " +
				 * invoiceID;
				 * 
				 * String username = (String)session.getAttribute("user");
				 * System.out.println("Query is- " + query);
				 * 
				 * 
				 * Statement st = conn.createStatement();
				 * 
				 * // execute the query, and get a java resultset ResultSet rs =
				 * st.executeQuery(query);
				 * 
				 * while (rs.next()) { //System.out.println("inside while"); //first check that
				 * the status for the user1 already exists or not String userInDb1 =
				 * rs.getString("user_1");
				 * 
				 * System.out.println("User in database is- " + userInDb1);
				 * 
				 * //for first user field in database if (userInDb1 == null) {
				 * 
				 * 
				 * String updateQuery = "Update invoiceapproval set user_1 = '" + username +
				 * "', status_1 = '" + approvalStatus + "', date_1 = '" + mysqlDateString +
				 * "' where invoice_id = " + invoiceID; System.out.println("Query is - " +
				 * updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; } else if
				 * (userInDb1.equals(username)) { //user 1 already exists update the users
				 * status String updateQuery = "Update invoiceapproval set status_1 = '" +
				 * approvalStatus + "', date_1 = '" + mysqlDateString + "' where invoice_id = "
				 * + invoiceID;
				 * 
				 * System.out.println("Query is - " + updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; }
				 * 
				 * //first check that the status for the user2 already exists or not String
				 * userInDb2 = rs.getString("user_2");
				 * 
				 * System.out.println("User 2 in database is- " + userInDb2);
				 * 
				 * //for second user field in database if (userInDb2 == null) {
				 * 
				 * 
				 * String updateQuery = "Update invoiceapproval set user_2 = '" + username +
				 * "', status_2 = '" + approvalStatus + "', date_2 = '" + mysqlDateString +
				 * "' where invoice_id = " + invoiceID; System.out.println("Query is - " +
				 * updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; } else if
				 * (userInDb2.equals(username)) { //user 1 already exists update the users
				 * status String updateQuery = "Update invoiceapproval set status_2 = '" +
				 * approvalStatus + "', date_2 = '" + mysqlDateString + "' where invoice_id = "
				 * + invoiceID;
				 * 
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; }
				 * 
				 * //first check that the status for the user 3 already exists or not String
				 * userInDb3 = rs.getString("user_3");
				 * 
				 * System.out.println("User 3 in database is- " + userInDb3);
				 * 
				 * //for third user field in database if (userInDb3 == null) {
				 * 
				 * 
				 * String updateQuery = "Update invoiceapproval set user_3 = '" + username +
				 * "', status_3 = '" + approvalStatus + "', date_3 = '" + mysqlDateString +
				 * "' where invoice_id = " + invoiceID; System.out.println("Query is - " +
				 * updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; } else if
				 * (userInDb3.equals(username)) { //user 4 already exists update the users
				 * status String updateQuery = "Update invoiceapproval set status_3 = '" +
				 * approvalStatus + "', date_3 = '" + mysqlDateString + "' where invoice_id = "
				 * + invoiceID;
				 * 
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; }
				 * 
				 * //first check that the status for the user 4 already exists or not String
				 * userInDb4 = rs.getString("user_4");
				 * 
				 * System.out.println("User 3 in database is- " + userInDb4);
				 * 
				 * //for fourth user field in database if (userInDb4 == null) {
				 * 
				 * 
				 * String updateQuery = "Update invoiceapproval set user_4 = '" + username +
				 * "', status_4 = '" + approvalStatus + "', date_4 = '" + mysqlDateString +
				 * "' where invoice_id = " + invoiceID; System.out.println("Query is - " +
				 * updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; } else if
				 * (userInDb4.equals(username)) { //user 1 already exists update the users
				 * status String updateQuery = "Update invoiceapproval set status_4 = '" +
				 * approvalStatus + "', date_4 = '" + mysqlDateString + "' where invoice_id = "
				 * + invoiceID;
				 * 
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; }
				 * 
				 * //first check that the status for the user 4 already exists or not String
				 * userInDb5 = rs.getString("user_4");
				 * 
				 * System.out.println("User 5 in database is- " + userInDb5);
				 * 
				 * //for fourth user field in database if (userInDb5 == null) {
				 * 
				 * 
				 * String updateQuery = "Update invoiceapproval set user_5 = '" + username +
				 * "', status_5 = '" + approvalStatus + "', date_5 = '" + mysqlDateString +
				 * "' where invoice_id = " + invoiceID; System.out.println("Query is - " +
				 * updateQuery);
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; } else if
				 * (userInDb5.equals(username)) { //user 1 already exists update the users
				 * status String updateQuery = "Update invoiceapproval set status_5 = '" +
				 * approvalStatus + "', date_5 = '" + mysqlDateString + "' where invoice_id = "
				 * + invoiceID;
				 * 
				 * 
				 * Statement st2 = conn.createStatement(); Boolean x = st2.execute(updateQuery);
				 * 
				 * if(x) { System.out.println("Updated successfully"); } break; }
				 * 
				 * //System.out.println("Status id is " + id);
				 * 
				 * //response = Integer.toString(id);
				 * 
				 * }
				 * 
				 * //update the invoice status in the main invoice queue based on the changed
				 * status of individual approvals updateInvoiceStatus(fetcnNoOfApprovals(),
				 * invoiceID)); } catch (Exception e) { e.printStackTrace(); }
				 */
			}
		}
		
		//function to fech approvals of the invoices
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
		
		//function to fetch all the approvals of invoice approvals table
		else if(action.equals("FetchApprovalsAll")) {
			
			//int invoiceID = Integer.parseInt(parameters.get("invoiceID"));
			
			String query = "Select * from invoiceapproval";
			
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
			
			//System.out.println("Inside modify number of approvals");
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
		
		//get the approval members in the system level
		else if(action.equals("approvalMembersFetch")) {
			
			//System.out.println("Inside modify number of approvals");
			int noOfApprovals = fetcnNoOfApprovals();
			
			//fetch the users in the database
			String query = "Select * from approvingusers";
			
			System.out.println("Query is - " + query);
			
			JSONArray resp = new JSONArray();
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    ResultSet rs = st.executeQuery(query);		   
			    
			    JSONArray resp1 = new JSONArray();
			    resp1 = convertToJSONArray(rs);
			    
			    System.out.println("Approving users are- " + resp1);
			 
			    resp.put(resp1);
			    //respo = respo.substring(1, respo.length() - 1);
			    
			    //System.out.println("Response is- " + respo);
			    
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			//fetch all the users in the database
			String query2 = "Select * from user";
			
			
			
			try {
				Class.forName(myDriver);
				Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st = conn.createStatement();
				
				// execute the query, and get a java resultset
			    ResultSet rs = st.executeQuery(query2);		   
			    JSONArray resp2 = new JSONArray();
			    resp2 = convertToJSONArray(rs);
			    resp.put(resp2);
			    //System.out.println("Approving users are- " + resp);
			 
			    //respo = respo.substring(1, respo.length() - 1);
			    
			    //System.out.println("Response is- " + respo);
			    
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
	
			
			System.out.println("Approving users and all users are- " + resp);
			 
			
			out = response.getWriter();
			out.println(resp);
			
		}
		
		//update the approving members
		else if(action.equals("approvalMembersUpdateData")) {
			
			System.out.println("Inside modify approval members");
			int noOfApprovals = fetcnNoOfApprovals();
			
			//fetch the users in the database
			String users = parameters.get("users");
			System.out.println("Users for system level approvals are- " + users);
			
			JSONArray json = new JSONArray(users);
			
			System.out.println(json.length());
			Boolean result = false;
			for(int i=0; i<json.length(); i++) {
				JSONObject obj = json.getJSONObject(i);
				
				//String query = "Update approvingusers set userid"+ (i+1) + "="+ obj.getString("id") + ", name"+ (i+1) + "='" + obj.getString("name") + "' where id = 1";
				int k = i+1;
				String query = "Update approvingusers set userid = " + obj.getString("id") + ", name = '" + obj.getString("name") + "' where id = " + k;
				
				System.out.println("User update query is- " + query);
				try {
					Class.forName(myDriver);
					Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
					Statement st = conn.createStatement();
					
				    Boolean rs = st.execute(query);		   
				    
				    if(!rs) {
				    	result = true;
				    }
				    else {
				    	result = false;
				    }
				}
				catch (Exception e) {
					e.printStackTrace();
				}
				
			}
		
			out = response.getWriter();
			out.println(result.toString());
			
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
	
	
	public static void updateInvoiceStatusAG(int invoiceID) {
		String status = "Review";
		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
		String createApprovalsmyDriver = configuration.getProperty("hibernate.connection.driver_class");
		String myUrl = configuration.getProperty("hibernate.connection.url");
		String dbuser = configuration.getProperty("hibernate.connection.username");
		String password = configuration.getProperty("hibernate.connection.password");
		
		try {
			Class.forName(myDriver);
			Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
			
			//String
			
			String query = "Select * from invoiceapproval where approval_id = " + invoiceID;
			
			System.out.println("Query is- " + query);
		
			Statement st = conn.createStatement();
			
			// execute the query, and get a java resultset
		    ResultSet rs = st.executeQuery(query);
		    
		    //whether to update the invoice status in the original invoice queue or not
		    String updateOrNot = "false";
		    
		    while (rs.next())
		    {
		    	System.out.println("inside while");
		    	
		    	//first check that the status for the user1 already exists or not
		    	String status1 = rs.getString("status_1");
		    	String status2 = rs.getString("status_2");
		    	String status3 = rs.getString("status_3");
		    	String status4 = rs.getString("status_4");
		    	String status5 = rs.getString("status_5");
		    	
		    	System.out.println("Approvals data- " + status1);
		    	System.out.println("Approvals data- " + status2);
		    	System.out.println("Approvals data- " + status3);
		    	
		    	
		    	if(status1.equals("Approved") && status2.equals("Approved") && status3.equals("Approved")) {
		    		status = "Approved";
		    	}
		    	
		    	
		    	
		    	
		    	
		    	
		        //System.out.println("Status id is " + id);
		        
		        //response = Integer.toString(id);
		        
		    }
		    
	
		    //now update the status in the main invoice queue
		    String updateStatusQuery = "Update Invoice set invoiceStatus = '"+ status +"' where id = " + invoiceID;
		    System.out.println("updateStatusQuery - " + updateStatusQuery);
		    //EntityManager em;

		    //Begin transaction
		    Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		    Transaction tx = session.beginTransaction();

		    String hql = updateStatusQuery;
		    Query query1 = session.createQuery(hql);
		    query1.setCacheable(false);
		    int results = query1.executeUpdate();
		    tx.commit();



		    if(results == 1) {
		    	System.out.println("Query executed successfully");
		    }
		    
		    
		    
		    
		    
		}
		catch (Exception e) {
			e.printStackTrace();
		} 
		
	}

	//function to update invoice approval on invoice queue based on the approvals of the individual users
	public static void updateInvoiceStatus(int noOfApprovals, int invoiceID) {
		String status = "Review";
		
		//System.out.println("inside invoice status- " + noOfApprovals);
		
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
		    
		    //whether to update the invoice status in the original invoice queue or not
		    String updateOrNot = "false";
		    
		    while (rs.next())
		    {
		    	System.out.println("inside while");
		    	
		    	//first check that the status for the user1 already exists or not
		    	String status1 = rs.getString("status_1");
		    	String status2 = rs.getString("status_2");
		    	String status3 = rs.getString("status_3");
		    	String status4 = rs.getString("status_4");
		    	String status5 = rs.getString("status_5");
		    	
		    	System.out.println("Approvals data- " + status1);
		    	System.out.println("Approvals data- " + status2);
		    	System.out.println("Approvals data- " + status3);
		    	
		    	//System.out.println("User in database is- " + status1);
		    	
		    	
		    	
		    	//for each number of approvals
		    	if(noOfApprovals == 1) {
		    		if(status1.equals("Approved")) {
		    			status = "Approved";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 2) {
		    		//System.out.println("Inside no of approvals = 2");
		    		
		    		if(status1.equals("Approved") && status2.equals("Approved")) {
		    			status = "Approved";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 3) {
		    		//if(status1 == "Approved" && status2 == "Approved" && status3 == "Approved") {
		    		if(status1.equals("Approved") && status2.equals("Approved") && status3.equals("Approved")) {
			    		//System.out.println("inside if blah blah");
		    			status = "Approved";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 4) {
		    		if(status1.equals("Approved") && status2.equals("Approved") && status3.equals("Approved") && status4.equals("Approved")) {
		    			status = "Approved";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 5) {
		    		if(status1.equals("Approved") && status2.equals("Approved") && status3.equals("Approved") && status4.equals("Approved") && status5.equals("Approved")) {
		    			status = "Approved";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	
		    	//for each number of approvals for rejected
		    	if(noOfApprovals == 1) {
		    		if(status1.equals("Rejected")) {
		    			status = "Rejected";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 2) {
		    		if(status1.equals("Rejected") && status2.equals("Rejected")) {
		    			status = "Rejected";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 3) {
		    		if(status1.equals("Rejected") && status2.equals("Rejected") && status3.equals("Rejected")) {
		    			status = "Rejected";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 4) {
		    		if(status1.equals("Rejected") && status2.equals("Rejected") && status3.equals("Rejected") && status4.equals("Rejected")) {
		    			status = "Rejected";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	if(noOfApprovals == 5) {
		    		if(status1.equals("Rejected") && status2.equals("Rejected") && status3.equals("Rejected") && status4.equals("Rejected") && status5.equals("Rejected")) {
		    			status = "Rejected";
		    			updateOrNot = "true";
		    		}
		    	}
		    	else {
		    		//status = "Review";
		    	}
		    	
		    	
		    	
		        //System.out.println("Status id is " + id);
		        
		        //response = Integer.toString(id);
		        
		    }
		    
		    if(updateOrNot.equals("true")) {
		    	//now update the status in the main invoice queue
				String updateStatusQuery = "Update Invoice set invoiceStatus = '"+ status +"' where invoiceID = " + invoiceID;
				
				//EntityManager em;
				
				//Begin transaction
				Session session = HibernateUtil.getSessionFactory().getCurrentSession();
				Transaction tx = session.beginTransaction();
				
				String hql = updateStatusQuery;
				Query query1 = session.createQuery(hql);
				query1.setCacheable(false);
				int results = query1.executeUpdate();
				tx.commit();
				
				
				
				
				/*System.out.println("Query for approval update is- " + updateStatusQuery);
			
				Connection conn2 = DriverManager.getConnection(myUrl, dbuser, password);
				Statement st2 = conn2.createStatement();
				
				// execute the query, and get a java resultset
			    Boolean rss = st2.execute(updateStatusQuery); */
			    
			    if(results == 1) {
			    	System.out.println("Query executed successfully");
			    }
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
		    
		    while(rs.next()) {
		    	//System.out.println("inside while");
		    	noOfApprovals = rs.getInt("noOfApprovals");
		    	//System.out.println("Number of approvals in function is- " + noOfApprovals);
		    	
		    }
		    
		    //System.out.println("Result of query is- " + resp.toString());
		    
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return noOfApprovals;
	}
	
	//function to fetch the approving memeber
	public static JSONArray fetchApprovingMembers() {
		
		Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String myDriver = configuration.getProperty("hibernate.connection.driver_class");
		String createApprovalsmyDriver = configuration.getProperty("hibernate.connection.driver_class");
		String myUrl = configuration.getProperty("hibernate.connection.url");
		String dbuser = configuration.getProperty("hibernate.connection.username");
		String password = configuration.getProperty("hibernate.connection.password");
		
		int noOfApprovals = fetcnNoOfApprovals();
		
		//fetch the users in the database
		String query = "Select * from approvingusers";
		
		System.out.println("Query is - " + query);
		
		JSONArray ret = new JSONArray();
		
		try {
			Class.forName(myDriver);
			Connection conn = DriverManager.getConnection(myUrl, dbuser, password);
			Statement st = conn.createStatement();
			
			// execute the query, and get a java resultset
		    ResultSet rs = st.executeQuery(query);		   
		    
		    ret = convertToJSONArray(rs);
		   
		    
		    
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
			
}
