package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import objects.RequestHandler;
import services.LoginService;
import services.ProjectService;
import services.TriggerService;

/**
 * @author Josh Mackin
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


	protected synchronized void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Trigger.java\nIN: doPost()\nTime of transaction: " + timeStamp);
		if(!LoginService.verify(req)) { resp.setContentType("plain/text"); out = resp.getWriter(); out.println("VERIFICATION_FAILURE"); return;}
		resp.setContentType("application/json");
		out = resp.getWriter();
		String response = "";
		Map<String, String> parameters = RequestHandler.getParameters((req.getParameterMap()));
		String action = parameters.get("action");

		if (action.equals("getTriggers")) {
			// TODO: Currently triggers are created but not managable (editable, deletable), they should be further refinable.
			System.out.println("getting the alerts!");
			response = ProjectService.getAllAlertsAsJson();
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
			JsonArray params = null;
			if(!parameters.get("parameters").isEmpty() && parameters.get("parameters") != null)
				params = parser.parse(parameters.get("parameters")).getAsJsonArray();
			System.out.println("Params = " + params);
			
			@SuppressWarnings("rawtypes")
			Class specifiedClass = matchObjectClass(info.get("object").getAsString());
			if (specifiedClass == null) 
				; // error handling

			if(params == null) {
				response = "Something has gone horribly wrong";
			} else {
				String[] triggerParams = getTriggerParams(params);
				System.out.println(triggerParams);
				if (triggerParams == null) {
					System.out.println("trigger submission failed");
					response = "badFields";
				} else {
					projectObjects.Trigger trigger = new projectObjects.Trigger(specifiedClass, 
							info.get("description").getAsString(), 
							info.get("severity").getAsInt(), 
							triggerParams);
					//ProjectObjectService.addObject("projectObject.Trigger", trigger);
					trigger.runTrigger();

					response = "submittedTrigger";
				}
			}
		} else if (action.equals("getAlerts")) {
			System.out.println("getting the alerts!");
			response = ProjectService.getAllAlertsAsJson();
		}

		System.out.println("Response: " + response);
		out.print(response);
	}

	/**
	 * @param params
	 * @return
	 */

	private String[] getTriggerParams(JsonArray params) {
		String[] tParams = new String[params.size()];
		
		for (int i = 0; i < params.size(); i++) {
			JsonObject e = params.get(i).getAsJsonObject();
			if(e.get("type").getAsString().equals("Date")) {
				tParams[i] = "CURDATE() between DATE_SUB(" + e.get("field").getAsString() +
						", INTERVAL " + e.get("highDate").getAsString() + " DAY) and DATE_SUB(" + 
						e.get("field").getAsString() + ", INTERVAL " + e.get("lowDate").getAsString() + " DAY)";
			} else if (e.get("type").getAsString().equals("Value")) {
				if (e.get("comparisonType").getAsString().equals("equal")) {
					tParams[i] = e.get("field").getAsString() + " = " + e.get("compareValue").getAsString();
				} else if (e.get("comparisonType").getAsString().equals("less")) {
					tParams[i] = e.get("field").getAsString() + " < " + e.get("compareValue").getAsString();
				} else if (e.get("comparisonType").getAsString().equals("more")) {
					tParams[i] = e.get("field").getAsString() + " > " + e.get("compareValue").getAsString();
				}
			}
		}
		return tParams;
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
