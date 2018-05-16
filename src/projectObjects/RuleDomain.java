package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public enum RuleDomain {

	PermitsAndInspections("Permits/Inspections") , Scheduling("Scheduling") ,
	Tasks("Tasks") , Financial("Financial") , ChangeOrders("Change Orders") ,
	Closeout("Closeout") , Equipment("Equipment");
	
	private String domain;
	
	RuleDomain(String _domain)
	{
		domain = _domain;
	}
	
	public String getDomain()
	{
		return domain;
	}
	
	/**
	 * This method returns all of the rule domains in a list
	 * @return a list of all the rule domains.
	 */
	public synchronized static List<RuleDomain> returnAllAsList()
	{
		RuleDomain [] rs = RuleDomain.values();
		ArrayList<RuleDomain> list = new ArrayList<RuleDomain>(Arrays.asList(rs));
		
		return list;
	}
	
	
	/**
	 * This method returns all of the rule domains in a list
	 * @return a list of all the rule domains.
	 */
	public synchronized static Map<RuleDomain , Map<String , String>> returnAllAsMap()
	{
		RuleDomain [] rs = RuleDomain.values();

		Map<RuleDomain , Map<String , String>> domains = new HashMap<RuleDomain , Map<String , String>>();
		
		for(int i = 0; i < rs.length; i++)
		{
			Map<String , String> oneDomain = new HashMap<String , String>();
			oneDomain.put("domain", rs[i].domain);
			domains.put(rs[i] , oneDomain);
		}
		
		return domains;
	}
	
	/**
	 * This method returns the proper rule domain enum
	 */
	public static RuleDomain parseDomain(String _domain)
	{
		RuleDomain[] rs = RuleDomain.values();
		
		for(int i = 0; i < rs.length; i++)
		{
			if(rs[i].domain.equalsIgnoreCase(_domain))
				return rs[i];
		}
		
		return null;
	}
}
