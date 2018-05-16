package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum RuleSeverity {

	LOW(1 , "Low") , MEDIUM(2 , "Medium") , HIGH(3 , "High");
	int severity;
	String level;
	
	RuleSeverity(int _severity , String _level)
	{
		severity = _severity;
		level = _level;
	}
	
	public int getSeverity()
	{
		return severity;
	}
	
	public String getLevel()
	{
		return level;
	}
	
	/**
	 * This method returns all of the rule severities in a list
	 * @return a list of all the rule severities.
	 */
	public synchronized static List<RuleSeverity> returnAllAsList()
	{
		RuleSeverity [] rs = RuleSeverity.values();
		ArrayList<RuleSeverity> list = new ArrayList<RuleSeverity>(Arrays.asList(rs));
		
		return list;
	}
	
	/**
	 * This method returns all of the rule severity in a list
	 * @return a list of all the rule severities.
	 */
	public synchronized static Map<RuleSeverity , Map<String , String>> returnAllAsMap()
	{
		RuleSeverity [] rs = RuleSeverity.values();

		Map<RuleSeverity , Map<String , String>> severities = new HashMap<RuleSeverity , Map<String , String>>();
		
		for(int i = 0; i < rs.length; i++)
		{
			Map<String , String> oneSeverity = new HashMap<String , String>();
			oneSeverity.put("severity", String.valueOf(rs[i].severity));
			oneSeverity.put("severityName", rs[i].level);
			severities.put(rs[i] , oneSeverity);
		}
		
		return severities;
	}
	
	/**
	 * This method returns the proper rule severity enum
	 */
	public static RuleSeverity parseSeverity(int _severity)
	{
		RuleSeverity[] rs = RuleSeverity.values();
		
		for(int i = 0; i < rs.length; i++)
		{
			if(rs[i].severity == _severity)
				return rs[i];
		}
		
		return null;
	}
}
