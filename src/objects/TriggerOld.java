package objects;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import projectObjects.Project;

/**
 * This class represents a Project Trigger. Triggers will look for all Projects that 
 * match the Trigger's Criteria. Triggers also have severity levels associated with them.
 * @author Alex Campbell
 *
 */
public class TriggerOld 
{
	/**
	 * This holds all of the criteria that fires the trigger
	 */
	ArrayList<Criterion> criterion;
	
	/**
	 * This identifies the importance of the Trigger
	 */
	int severity;
	
	/**
	 * This is a description of the Trigger
	 */
	String desc;
	
	/**
	 * This is a list of all projects that match the trigger Criteria
	 */
	List<Project> projects;
	
	public static int INFO = 0;
	public static int WARNING = 1;
	public static int SEVERE = 2;
	
	public TriggerOld(int severity, String desc)
	{
		criterion = new ArrayList<Criterion>();
		this.severity = severity;
		this.desc = desc;
		projects = new ArrayList<Project>();
	}
	
	/**
	 * This method adds a query criteria to the trigger
	 * @param exp the criteria to add
	 */
	public void addExpression(Criterion exp)
	{		
		criterion.add(exp);
	}
	
	/**
	 * This method returns the severity level of the trigger
	 * @return
	 */
	public int getSeverity()
	{
		return severity;
	}
	
	/**
	 * This method sets the severity level of the trigger
	 * @param s a numeric severity level
	 */
	public void setSeverity(int s)
	{
		severity = s;
	}
	
	/**
	 * This method searches the project database for any projects that match the
	 * trigger's criteria.
	 */
	@SuppressWarnings("unchecked")
	public void runTrigger()
	{
		/*
		 * This needs to be a local variable because the Criteria class has circular references, which
		 * causes GSON to go into an infinite loop
		 */
		Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);
		
		for (int i = 0; i < criterion.size(); i++)
		{
			criteria.add(criterion.get(i));
		}
		projects = criteria.list();
		System.out.println(projects.size());
	}
	
	/**
	 * This method searches the project database for a certain project that match the
	 * trigger's criteria.
	 */
	@SuppressWarnings("unchecked")
	public void runCertainTrigger(long pid)
	{
		/*
		 * This needs to be a local variable because the Criteria class has circular references, which
		 * causes GSON to go into an infinite loop
		 */
		Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);
		criteria.add(Restrictions.sqlRestriction("id = "+pid));
		for (int i = 0; i < criterion.size(); i++)
		{
			criteria.add(criterion.get(i));
		}
		projects = criteria.list();
		System.out.println(projects.size());
	}
	
	public List<Project> getProjects()
	{
		return projects;
	}
}
