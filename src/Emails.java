

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import objects.RequestHandler;
import projectObjects.ChangeOrder;
import services.ProjectObjectService;

/**
 * Servlet implementation class Emails
 */
@WebServlet("/Emails")
public class Emails extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static PrintWriter out;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Emails() {
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
		
		Map<String, String> parameters = RequestHandler.getParameters((request.getParameterMap()));
		
		//for sending output
		final PrintWriter writer = response.getWriter();
		
		//get the action
		String action = parameters.get("action");
		
		System.out.println("Action is - " + action);
		
		if(action.equals("getChangeOrderTitle")) {
			
			String projectID = parameters.get("projectID");
			String mcsCO = parameters.get("mcsPE");
			
			System.out.println("Project ID and mcsCO are- " + projectID + " and " + mcsCO);
			
			
			//get the recently inserted id of invoice
			String query = "Select title from change from invoice";

			String result;
			
			List<ChangeOrder> changeOrders = ProjectObjectService.getAllChangeOrders(Long.parseLong(parameters.get("projectID")));
			Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
			
			for(ChangeOrder co : changeOrders) {
				
				if(co.getMcsCO().equals(mcsCO)) {
					System.out.println("MCSCO found");
					
					result = gson.toJson(co);
					
					System.out.println("Change order title result is- " + result);
					
					out = response.getWriter();
					out.println(result);
				}
				
			}
			
		}

	}

}
