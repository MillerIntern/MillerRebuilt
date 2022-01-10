package services;

import java.util.List;


import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import objects.HashGen;
import objects.HibernateUtil;
import projectObjects.User;

public class LoginService 
{
	public synchronized static boolean Login(String username, String password) {
		HashGen hG = new HashGen();
		
		String hashedPass = null;
		try {
			hashedPass = hG.getHash(password);
			
			System.out.println(hashedPass);
		} catch(Exception e) {
			System.out.println("Hashing went wrong");
		}
		boolean loggedIn = true;
		
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("name", username));
		

		@SuppressWarnings("unchecked")
		List<User> matchingUser = criteria.list();

		if (matchingUser == null  || matchingUser.size() == 0 || matchingUser.size() > 1)
			loggedIn = false;
		else if (!matchingUser.get(0).getPassword().equals(hashedPass))
			loggedIn = false;
		
		return loggedIn;
	}
	
	public synchronized static boolean verify(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("verified") == null) return false;
		if(!request.getSession().getAttribute("verified").equals("true")) return false;
		if(request.getSession().getAttribute("user") == null) return false;
		//System.out.println(request.getSession().getAttribute("user") + " session: " + request.getSession().getAttribute("verified"));
		return true;
	}

	/**
	 * @param req
	 * @return
	 */
	public synchronized static boolean verifyAdmin(HttpServletRequest req) 
	{
		if(req.getSession().getAttribute("isAdmin") == null) return false;
		if(req.getSession().getAttribute("isAdmin").equals("true")) return true;
		return false;
	}

	/**
	 * @param username
	 * @return
	 */
	public synchronized static String isAdmin(String username) 
	{
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("name", username));
		
		@SuppressWarnings("unchecked")
		List<User> matchingUser = criteria.list();
		
		if (matchingUser == null  || matchingUser.size() == 0)
			return "false";
		else if (matchingUser.get(0).getPermission().isCanAccessAdminPage())
			return "true";
		
		return "false";
	}
}
