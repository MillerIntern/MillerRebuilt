package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum RuleSeverity {

	GREEN(1) , YELLOW(2) , RED(3);
	int severity;
	
	RuleSeverity(int _severity)
	{
		severity = _severity;
	}
	
	public int getSeverity()
	{
		return severity;
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
