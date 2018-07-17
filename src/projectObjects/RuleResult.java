package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The point of this class is to represent the possible goals that a rule could have
 * @author andrewserensits
 *
 */
public enum RuleResult 
{
	
	//Format of name:
	//First two letters: the type of data the rule is looking at
	//Second half of name: possible relations that data could have with
	//Possible Relations: [suffix = f1Val/f2Val]
	//	each other
	
	//Date Date (DD)
	DD_NN(0 , "Both dates are empty" , false) ,
	DD_NV(1 , "Date 1 is empty/Date 2 is not empty" , false) ,
	DD_VN(2 , "Date 1 is not empty / Date 2 is empty" , false) , 
	DD_EARLY(3 , "Date 1 is earlier than Date 2" , true) ,
	DD_LATE(4 , "Date 1 is later than Date 2" , true) ,
	//Number Number (NN)
	//NN_N(40 , "Field 1 is empty" , true), 
	NN_NN(5 , "Both numbers are empty" , false) , 
	NN_NV(6 , "First number is empty / Second number is not empty" , false) , 
	NN_VN(7 , "First number is not empty / Second number is empty" , false) ,
	NN_LESS(8 , "First number is less than second number" , true) , 
	NN_GREATER(9 , "First number is greater than second number" , true) ,
	NN_EQUAL(10 , "Both numbers are equal" , true) ,
	//Date Number (DN)
	DN_NN(11 , "Both the date and number are empty" , false) ,
	DN_NV(12 , "The date is empty but the number is not" , false) , 
	DN_VN(13 , "The date is not empty but the number is" , false) , 
	//Number Date (ND)
	ND_NN(14 , "Both the date and number are empty" , false) ,
	ND_VN(15 , "The number is not empty, the date is" , false) , 
	ND_NV(16 , "The number is empty, the date is not" , false),
	//Date (D)
	D_N(17 , "The date is empty" , true) ,
	D_N_LATE(18 , "Date is empty, also late" , false) ,
	D_N_EARLY(19 , "Date is empty, still not due" , false) , 
	D_EARLY(20 , "The date is on schedule" , true) ,
	D_LATE(21 , "The date is late" , true) ,
	//String String (SS)
	//SS_N(41 , "Field 1 is empty" , true) ,
	SS_NN(22 , "Both Fields are empty" , true) ,
	SS_NV(23 , "Field 1 is empty, Field 2 is not empty" , true) , 
	SS_VN(24 , "Field 1 is not empty , Field 2 is empty" , true) ,
	SS_VV(25 , "Neither Field is empty" , true) ,
	// General Info (PROJ)
	PROJ_TBD(26, "Field 1's value is TBD", true),
	PROJ_NN(27, "The values of stage and status match", true),
	PROJ_S(28, "The project # doesnt reflect the current stage", true),
	PROJ_N(29, "Field 1 is empty", true), 
	//Task Results (T)
	TASK_ONTIME(30 , "Task is on time" , true) ,
	TASK_LATE(31 , "Task is late" , false ) ,
	TASK_NULL_DUE(32 , "Task does not contain a due date" , false) , 
	TASK_NULL_STATUS(33 , "Task status is null" , false) ,
	TASK_BDD(34, "Due Date is earlier than created Date", true),
	//Closeout Result (CLOSEOUT
	CLOSEOUT_NULL(36 , "No data for desired closeout field" , false) ,
	CLOSEOUT_COMPLETE(37 , "Desired closeout field is complete" , true) , 
	CLOSEOUT_INCOMPLETE(38 , "Desired closeout field is incomplete" , true) ,
	CLOSEOUT_NA(39 , "Desired closeout field is N/A" , true) , 
	CLOSEOUT_MCS_CO_REMAIN(40 , "MCS Change Orders remaining to be completed" , false) , 
	CLOSEOUT_MG2_CO_REMAIN(41 , "MG2 Change Orders remaining to be completed" , false) , 
	CLOSEOUT_NULL_STATUS(42 , "Empty closeout status for desired field" , false) , 
	//Generic
	NULL_FIELD1(43 , "Field 1 is empty" , false) ,
	NULL_FIELD2(44 , "Field 2 is empty" , false) , 
	NULL_FIELDS(45 , "Both fields are empty" , false);
	
	int type;
	String meaning;
	boolean visibleToUser;
	
	RuleResult(int goal , String _meaning , boolean _visible)
	{
		goal = type;
		meaning = _meaning;
		visibleToUser = _visible;
	}
	
	public int getType()
	{
		return type;
	}
	
	public String getMeaning()
	{
		return meaning;
	}
	
	/**
	 * This method returns all of the rule goals in a list
	 * @return a list of all the rule goals.
	 */
	public synchronized static List<RuleResult> returnAllAsList()
	{
		RuleResult [] rg = RuleResult.values();
		ArrayList<RuleResult> list = new ArrayList<RuleResult>(Arrays.asList(rg));
		
		return list;
	}
	
	/**
	 * This method returns all of the rule domains in a list
	 * @return a list of all the rule domains.
	 */
	public synchronized static Map<RuleResult , Map<String , String>> returnAllAsMap()
	{
		RuleResult [] rs = RuleResult.values();

		Map<RuleResult , Map<String , String>> domains = new HashMap<RuleResult , Map<String , String>>();
		
		for(int i = 0; i < rs.length; i++)
		{
			Map<String , String> oneDomain = new HashMap<String , String>();
			oneDomain.put("meaning", rs[i].meaning);
			oneDomain.put("visible", String.valueOf(rs[i].visibleToUser));
			oneDomain.put("id", String.valueOf(rs[i]));

			domains.put(rs[i] , oneDomain);
		}
		
		return domains;
	}
	

	public static RuleResult parseRuleGoal(int _goal)
	{
		RuleResult[] rg = RuleResult.values();
		
		for(int i = 0; i < rg.length; i++)
		{
			if(rg[i].type == _goal)
				return rg[i];
		}
		
		return null;
	}
	
	public static RuleResult parseRuleGoal(String _goal)
	{
		RuleResult[] rg = RuleResult.values();
		
		for(int i = 0; i < rg.length; i++)
		{
			if(String.valueOf(rg[i]).equalsIgnoreCase(_goal))
				return rg[i];
		}
		
		return null;
	}
}
