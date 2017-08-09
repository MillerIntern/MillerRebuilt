package Servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Servlet implementation class Logout
 */
@WebServlet(description = "logout servlet", urlPatterns = { "/Logout" })
public class Logout extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
    
    public Logout() 
    {
        super();
    }

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		
	}

	protected synchronized void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Logout.java\nIN: doPost()\nTime of Log Out: " + timeStamp);
		HttpSession session = req.getSession(false);
		session.invalidate();
	}

}

