package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
			
			String[] params = {/*"cost = 0", "mcsNumber=-1", */"CURDATE() between DATE_SUB(scheduledStartDate,INTERVAL 14 DAY) and DATE_SUB(scheduledStartDate,INTERVAL 7 DAY)"};
			projectObjects.Trigger trigger = new projectObjects.Trigger("Cost is zero!", 2, params);
			trigger.runTrigger();
			//s.addExpression(Restrictions.sqlRestriction("(shouldInvoice - invoiced) != 0"));

			
			response = "submittedTrigger";
		}
		
		System.out.println("Response: " + response);
		out.print(response);
	}

}
