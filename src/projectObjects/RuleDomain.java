package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum RuleDomain {

	PermitsAndInspections("PermitsAndInspections") , Scheduling("Scheduling") ,
	Tasks("Tasks") , Financial("Financial") , ChangeOrders("ChangeOrders") ,
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
