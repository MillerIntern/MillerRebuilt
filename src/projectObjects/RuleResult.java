package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
	DD_NN(0) , DD_NV(1) , DD_VN(2) , DD_EARLY(3) , DD_LATE(4) ,
	//Number Number (NN)
	NN_NN(5) , NN_NV(6) , NN_VN(7) , NN_LESS(8) , NN_GREATER(9) , NN_EQUAL(10) ,
	//Date Number (DN)
	DN_NN(11) , DN_NV(12) , DN_VN(13) , 
	//Number Date (ND)
	ND_NN(14) , ND_VN(15) , ND_NV(16),
	//Date (D)
	D_N(17) , D_N_LATE(18) , D_N_EARLY(19) , D_EARLY(20) , D_LATE(21) ,
	//String String (SS)
	SS_NN(22) , SS_NV(23) , SS_VN(24) , SS_VV(25) , 
	//Task Results (T)
	TASK_ONTIME(26) , TASK_LATE(27) , TASK_NULL_DUE(28) , TASK_NULL_STATUS(29) ,
	//Closeout Result (CLOSEOUT
	CLOSEOUT_NULL(30) , CLOSEOUT_COMPLETE(31) , CLOSEOUT_INCOMPLETE(32) , CLOSEOUT_NA(33) , CLOSEOUT_MCS_CO_REMAIN(34) , 
	CLOSEOUT_MG2_CO_REMAIN(35) , CLOSEOUT_NULL_STATUS(36) , 
	//Generic
	NULL_FIELD1(37) , NULL_FIELD2(38) , NULL_FIELDS(39);
	
	int type;
	
	RuleResult(int goal)
	{
		goal = type;
	}
	
	public int getType()
	{
		return type;
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
}
