package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import objects.RequestHandler;
import services.LoginService;
import services.TriggerService;

/**
 * Servlet implementation class Trigger
 */
@WebServlet(description = "This servlet handles requests for Project Triggers", urlPatterns = { "/Trigger" })
//@WebServlet("Trigger")
public class Trigger extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	PrintWriter out;
       
    public Trigger() 
    {
        super();
    }

	@SuppressWarnings("unused")
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		if(!LoginService.verify(req)) { resp.setContentType("plain/text"); out = resp.getWriter(); out.println("VERIFICATION_FAILURE"); return;}
		resp.setContentType("application/json");
		out = resp.getWriter();
		String response = "";
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		String action = parameters.get("action");
				
		if (action.equals("getTriggers")) {
			TriggerService ts = new TriggerService();
			response = ts.getAllTriggersAsJson();
		} else if(action.equals("getProjectTriggers")) {
			TriggerService ts = new TriggerService(Long.parseLong(req.getParameter("project_id")));
			response = ts.getAllSpecificTriggersAsJson();
		} else if(action.equals("submitTrigger")) {
			System.out.println("submitTrigger");
			
			JsonParser parser = new JsonParser();
			
			JsonObject info = null;
			if (!parameters.get("info").isEmpty() && parameters.get("info") != null) 
				info = parser.parse(parameters.get("info")).getAsJsonObject();
			System.out.println(info);
			
			if (info.get("description") == null) 
				; // error handling but shouldnt happen with client side validation
			if (info.get("severity") == null) 
				; // error handling but shouldnt happen with client side validation
			
			// TODO parameters.get("parameters") will yield a list of JSON object(s), not a single JSON object
			JsonObject params = null;
			if(!parameters.get("parameters").isEmpty() && parameters.get("parameters") != null)
				params = parser.parse(parameters.get("parameters")).getAsJsonObject();
			System.out.println(params);
			
			@SuppressWarnings("rawtypes")
			Class specifiedClass = matchObjectClass(params.get("object").getAsString());
			if (specifiedClass == null) 
				; // error handling

			if(params == null) {
				response = "Something has gone horribly wrong";
			} else {
				String[] triggerParams = getTriggerParams(params);
				System.out.println(triggerParams);
				//String[] params = {/*"cost = 0", "mcsNumber=-1"*/"CURDATE() between DATE_SUB(scheduledTurnover,INTERVAL 5 DAY) and DATE_SUB(scheduledTurnover,INTERVAL 0 DAY)"};
				projectObjects.Trigger trigger = new projectObjects.Trigger(specifiedClass, 
																		info.get("description").getAsString(), 
																		info.get("severity").getAsInt(), 
																		triggerParams);
				trigger.runTrigger();

				
				response = "submittedTrigger";
			}
		} else if (action.equals("getAlerts")) {
			
		}
		
		System.out.println("Response: " + response);
		out.print(response);
	}

	/**
	 * @param params
	 * @return
	 */
	private String[] getTriggerParams(JsonObject params) {
		if (params.get("type").getAsString().equals("Date")) {
			String[] triggerParams = {"CURDATE() between DATE_SUB(" + params.get("field").getAsString() +
										", INTERVAL " + params.get("highDate").getAsString() + " DAY) and DATE_SUB(" + 
										params.get("field").getAsString() + ", INTERVAL " + params.get("lowDate").getAsString() + " DAY)"};
			return triggerParams;
		} else if (params.get("type").getAsString().equals("Value")) {
			System.out.println("hello");;
			if (params.get("comparisonType").getAsString().equals("equal")) {
				System.out.println("elloooo");
				String[] triggerParams = {params.get("field").getAsString() + " = " + params.get("compareValue").getAsString()};
				return triggerParams;
			} else if (params.get("comparisonType").getAsString().equals("less")) {
				String[] triggerParams = {params.get("field").getAsString() + " < " + params.get("compareValue").getAsString()};
				return triggerParams;
			} else if (params.get("comparisonType").getAsString().equals("more")) {
				String[] triggerParams = {params.get("field").getAsString() + " > " + params.get("compareValue").getAsString()};
				return triggerParams;
			}
		}
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @param asString
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private Class matchObjectClass(String asString) {
		if(asString.equals("Project"))
			return projectObjects.Project.class;
		if(asString.equals("CloseoutDetails"))
			return projectObjects.CloseoutDetails.class;
		return null;
	}

}
