package services;

import java.util.List;

import objects.HashGen;
import objects.HibernateUtil;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import projectObjects.User;

public class LoginService 
{
	public static boolean Login(String username, String password) 
	{
		HashGen hG = new HashGen();
		String hashedPass = null;
		try
		{
		hashedPass = hG.getHash(password);
		}
		catch(Exception e)
		{
			System.out.println("Hashing went wrong");
		}
		boolean loggedIn = true;
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("name", username));
		List<User> matchingUser = criteria.list();
		
		if (matchingUser == null  || matchingUser.size() == 0)
			loggedIn = false;
		else if (!matchingUser.get(0).getPassword().equals(hashedPass))
			loggedIn = false;
		
		return loggedIn;
	}
}
