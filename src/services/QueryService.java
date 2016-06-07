package services;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import objects.HibernateUtil;

import org.hibernate.Criteria;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

import projectObjects.Project;
import projectObjects.Region;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class QueryService 
{
	static DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
	
	/**
	 * This method returns a list of projects that match specific query criteria
	 * @param pars a mapping of parameters and values from an HTTP request
	 * @return a list of projects that are returned from the query
	 * @throws ParseException
	 */
	
	public static List<String> convertStringToList(String str)
	{
		Gson gson = new Gson();
		Type type = new TypeToken<List<String>>() {}.getType();
		return gson.fromJson(str, type);
	}
	
	//REMODEL OF THE NON-DATE PARAMETERS COMPLETE
	public static List<Project> queryProjects(Map<String, String[]> pars) throws ParseException
	{	
		//Put parameter names in an array
		Set<String> paramNames = pars.keySet();
		
		//Dynamically create query criteria
		Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);
		Disjunction regionOr = Restrictions.disjunction();
		Iterator<String> iter = paramNames.iterator();
		//handles if how criteria for regions is added
		boolean manyRegions = false;
		SimpleExpression init = null;
		SimpleExpression costco = null;
		SimpleExpression proposal = null;
		SimpleExpression schStart = null;
		SimpleExpression schturnOver = null;
		SimpleExpression actTurnOver = null;
		
		
		//Add the criteria that is concerned with object ids
		while (iter.hasNext())
		{
			String paramName = iter.next();
			Disjunction or = Restrictions.disjunction();
			System.out.println();

			System.out.println(paramName);
			String v = pars.get(paramName)[0];
			System.out.println(v);
			if (!v.isEmpty() && v != null && !v.equals("none") && !paramName.equals("domain") && !paramName.equals("action") && !paramName.equals("title") && !paramName.equals("projectInitiatedDateRelation")
					&& !paramName.equals("costcoDueDateRelation") && !paramName.equals("proposalSubmittedRelation") && !paramName.equals("scheduledStartRelation") && !paramName.equals("scheduledTurnoverRelation") && !paramName.equals("actualTurnoverRelation") && !paramName.equals("onGoingRelation"))
			{
				List<String> dataList = convertStringToList(v);
				for(int i = 0; i < dataList.size(); i++)
				{
				
				//Checks to see if there are multiple parameters of the same type, if so OR them together
				if(dataList.size() > 1)
				{
					//check for dates
					if(paramName.contains("projectInitiatedDate") || paramName.contains("costcoDueDate") || paramName.contains("proposalSubmitted") || 
							paramName.contains("scheduledStartDate") || paramName.contains("scheduledTurnover") || paramName.contains("actualTurnover")||
							paramName.contains("onGoing"))
					{
						//Add the criteria that is concerned with dates
						if(paramName.contains("projectInitiatedDate"))
						{
							criteria.add(addDateRestriction("projectInitiatedDate", pars));
							i = dataList.size();
						}
						if(paramName.contains("costcoDueDate"))
						{
							criteria.add(addDateRestriction("costcoDueDate", pars));
							i = dataList.size();
						}
						if(paramName.contains("proposalSubmitted"))
						{
							criteria.add(addDateRestriction("proposalSubmitted", pars));
							i = dataList.size();
						}
						if(paramName.contains("scheduledStartDate"))
						{
							criteria.add(addDateRestriction("scheduledStartDate", pars));
							i = dataList.size();
						}
						if(paramName.contains("scheduledTurnover"))
						{
							criteria.add(addDateRestriction("scheduledTurnover", pars));
							i = dataList.size();
						}
						if(paramName.contains("actualTurnover"))
						{
							criteria.add(addDateRestriction("actualTurnover", pars));
							i = dataList.size();
						}
						if(paramName.contains("onGoing"))
						{
							criteria.add(addOnGoingDateRestriction("actualTurnover", pars));
							i = dataList.size();
						}
					}
					else
					{
						//The parameter is an id. The value must be a long
						if (paramName.contains(".id"))
						{
							or.add(Restrictions.eq(paramName, Long.parseLong(dataList.get(i))));
							System.out.println(dataList.get(i) + " Added to or");
						}
						else if (paramName.contains(".region"))
						{
							manyRegions = true;
							regionOr.add(Restrictions.eqOrIsNull("region",Region.valueOf(dataList.get(i))));
						}
					}
				}
				
				
				//If there is only one parameter for a type, and them together
				else
				{
					//check for dates
					if(paramName.contains("projectInitiatedDate") || paramName.contains("costcoDueDate") || paramName.contains("proposalSubmitted") || 
							paramName.contains("scheduledStartDate") || paramName.contains("scheduledTurnover") || paramName.contains("actualTurnover") ||
							paramName.contains("onGoing"))
					{
						//Add the criteria that is concerned with dates
						if(paramName.contains("projectInitiatedDate"))
							criteria.add(addDateRestriction("projectInitiatedDate", pars));
						if(paramName.contains("costcoDueDate"))
							criteria.add(addDateRestriction("costcoDueDate", pars));
						if(paramName.contains("proposalSubmitted"))
							criteria.add(addDateRestriction("proposalSubmitted", pars));
						if(paramName.contains("scheduledStartDate"))
							criteria.add(addDateRestriction("scheduledStartDate", pars));
						if(paramName.contains("scheduledTurnover"))
							criteria.add(addDateRestriction("scheduledTurnover", pars));
						if(paramName.contains("actualTurnover"))
							criteria.add(addDateRestriction("actualTurnover", pars));
						if(paramName.contains("onGoing"))
							criteria.add(addOnGoingDateRestriction("onGoing", pars));
					}
					else
					{	
						if (paramName.contains(".id"))
						{
							criteria.add(Restrictions.eq(paramName, Long.parseLong(dataList.get(i))));
							System.out.println(dataList.get(i) + "Added to and");
						}
						else if (paramName.contains(".region"))
							criteria.createCriteria("warehouse").add(Restrictions.eqOrIsNull("region",Region.valueOf(dataList.get(i))));

					}
				}
				}
			}
		criteria.add(or);
		}
		if(manyRegions)
		criteria.createCriteria("warehouse").add(regionOr);
		//This fixes the bug of the query returning duplicate results.
		criteria.setResultTransformer(Criteria.ROOT_ENTITY);
		
		//Execute the query and return the results
		List<Project> projects = criteria.list();
		return projects;
	}
	
	/**
	 * This method creates a date restriction that can be used to add to a query.
	 * @param propertyName the parameter name of the date in the URL
	 * @param map a mapping of the URL parameters/values
	 * @return an expression that can be added to a query
	 * @throws ParseException
	 */
	public static Disjunction addDateRestriction(String propertyName, Map<String, String[]> map) throws ParseException
	{

		Disjunction or = Restrictions.disjunction();
		Conjunction and = Restrictions.conjunction();
		List<String> dataList = convertStringToList(map.get(propertyName)[0]);
		List<String> comparisonList = convertStringToList(map.get(propertyName+"Relation")[0]);
		
		for(int i = 0; i < dataList.size(); i++)
		{
			
			
			if (dataList != null && !dataList.get(i).equals(""))
			{
				
					String date = dataList.get(i);
					String relation = comparisonList.get(i);
			
					if (relation.equals("<"))
					{
						Date d = formatter.parse(date);
						and.add(Restrictions.lt(propertyName, d));
						System.out.println("Date must be before "+d+" "+date);
					}
					else if (relation.equals("="))
					{
						Date d = formatter.parse(date);
						and.add(Restrictions.eq(propertyName, d));
					}
					else if (relation.equals(">"))
					{
						Date d = formatter.parse(date);
						and.add(Restrictions.gt(propertyName, d));
						System.out.println("Date must be after "+d+" "+date);
					}
				
			}
		}
		or.add(and);
		return or;
	}
	

	/**
	 * This method creates a date restriction that can be used to add to a query.
	 * @param propertyName the parameter name of the date in the URL
	 * @param map a mapping of the URL parameters/values
	 * @return an expression that can be added to a query
	 * @throws ParseException
	 */
	public static Criterion addOnGoingDateRestriction(String propertyName, Map<String, String[]> map) throws ParseException
	{

		Conjunction and = Restrictions.conjunction();
		Disjunction or = Restrictions.disjunction();
		Criterion ret = null;
		List<String> dataList = convertStringToList(map.get(propertyName)[0]);
		System.out.println(dataList.toString());
		List<String> comparisonList = convertStringToList(map.get(propertyName+"Relation")[0]);
		boolean isAnd = false;
		
		if(dataList.size() > 1 && dataList.size()%2 == 0)
			isAnd = true;
		System.out.println("Gets here! " + dataList.size() + " " + dataList.size()%2);	
		for(int i = 0; i < dataList.size(); i++)
		{
			System.out.println("Gets here!!");
			if(isAnd)
			{
				System.out.println("Gets here!!!");
					String date = dataList.get(i);
					String relation = comparisonList.get(i);
					
					Date d1 = formatter.parse(date);
					Date d2 = formatter.parse(dataList.get(i+1));
					int compar = d1.compareTo(d2);
					if(compar <= 0)
					{
						System.out.println("Gets here!!!!");
						and.add(Restrictions.lt("scheduledStartDate", d2));
						and.add(Restrictions.gt("scheduledTurnover", d1));
						and.add(Restrictions.lt("scheduledTurnover", d2));
					}
					else
					{
						System.out.println("Gets here!!!!!");
						and.add(Restrictions.lt("scheduledStartDate", d1));
						and.add(Restrictions.gt("scheduledTurnover", d2));
						and.add(Restrictions.lt("scheduledTurnover", d1));
					}
			}
			else if(!isAnd)
			{
				System.out.println("Improper format for on Going");
			}
		}
		if(isAnd)
			ret = and;
		else
			ret = or;
		
		return ret;
	}
	
	/**
	 * This method gets a project to edit by querying a project based on warehouse, stage, class, item, and project ID.
	 * @param warehouse a string representing the warehouse id
	 * @param stage a string representing the stage id
	 * @param classs a string representing the class id
	 * @param item a string representing the item id
	 * @param project a string representing the project id.
	 * @return
	 */
	public static String getProjectToEdit(String warehouse, String stage, String classs, String item, String project)
	{	
		
		//Put parameter names in an array
		ArrayList<String> paramNames = new ArrayList<String>() {{
		    add("warehouse.id");
		    add("stage.id");
		    add("projectClass.id");
		    add("mcsNumber");
		    add("projectItem.id");
		}};
		
		
		//Associate the parameters with values
		ArrayList<String> values = new ArrayList<String>();
			values.add((warehouse));
			values.add((stage));
			values.add((classs));
			values.add((project));
			values.add((item));
		
		//Create Query parameters dynamically
		Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);
		criteria.setResultTransformer(Criteria.ROOT_ENTITY);
		for (int i = 0; i < values.size(); i++)
		{
			String v = values.get(i);
			String paramName = paramNames.get(i);
			if (!v.isEmpty() && v != null && !paramName.equals("mcsNumber"))
				criteria.add(Restrictions.eq(paramName, Long.parseLong(v)));
			else if (!v.isEmpty() && v != null)
				criteria.add(Restrictions.eq(paramName, Integer.parseInt(v)));
		}
		
		//Get results and convert them to a json array
		List<Project> results = criteria.list();
		System.out.println("size is: " + results.size());
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		System.out.println(gson.toJson(results));
		
		return gson.toJson(results);
	}
	
	
	/**
	 * This method searches for an object in the database that matches all of the values.
	 * 
	 * @param values the values of the fields of the desired object
	 * @param columns the names of the fields of the desired object
	 * @param domain the table name of the desired object
	 * @return an object if an object is found, null if not
	 * @throws ClassNotFoundException
	 */
	public static Object getObjectByValues(Object [] values, String [] columns, String domain) throws ClassNotFoundException
	{
		Class c = Class.forName("projectObjects."+domain);
		Criteria criteria = HibernateUtil.getSession().createCriteria(c);

		for (int i = 0; i < values.length; i++)
		{
			SimpleExpression exp = Restrictions.eq(columns[i], values[i]);

			criteria.add(exp);
		}
		
		Object o = null;
		List l = criteria.list();
		if (l != null && l.size() > 0)
			o = l.get(0);
		
		return o;
	}
}
