package Servlets;

import java.io.IOException;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import services.LoginService;

/**
 * Servlet implementation class Login
 */
@WebServlet(description = "login servlet", urlPatterns = { "/Login" })
public class Login extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;
    
        
    public Login() 
    {
        super();
    }

	protected synchronized void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		out = resp.getWriter();
		out.println("Hello!");;
	}

	protected synchronized void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Login.java\nIN: doPost()\nTime of Log In: " + timeStamp);
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		
		String serverResponse = "";

		if (LoginService.Login(username, password))
		{
			HttpSession session = req.getSession(true);
			session.setAttribute("user", username);
			session.setAttribute("verified", "true");
			session.setAttribute("isAdmin", LoginService.isAdmin(username));
			session.setMaxInactiveInterval(-1);	// A negative time indicates the session should never timeout.
			serverResponse = "true";
		}
		else
			serverResponse = "false";
		
		resp.setContentType("text/plain");
		out = resp.getWriter();
		out.println(serverResponse);
		
		
	}
}

