package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.ChangeOrder;

/**
 * @author jmackin
 */
public class ChangeOrderFiller 
{

	/**
	 * @param co
	 * @param params
	 */
	public static void fillChangeOrder(ChangeOrder co, Map<String, String> params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		Date proposalDate = null;
		if(!params.get("proposalDate").isEmpty())
			proposalDate = formatter.parse(params.get("proposalDate"));
		co.setProposalDate(proposalDate);
		
		Date submittedDate = null;
		if(!params.get("submittedDate").isEmpty())
			submittedDate = formatter.parse(params.get("submittedDate"));
		co.setSubmittedDate(submittedDate);
		
		Date approvedDate = null;
		if(!params.get("approvedDate").isEmpty())
			approvedDate = formatter.parse(params.get("approvedDate"));
		co.setApprovedDate(approvedDate);

		double cost;
		try
		{
			 cost = Double.parseDouble(params.get("cost"));
		}catch(NumberFormatException ex) { cost = 0; }
		co.setCost(cost);
		
		double sell;
		try
		{
			sell = Double.parseDouble(params.get("sell"));
		}catch(NumberFormatException ex) { sell = 0; }
		co.setSell(sell);
		
		co.setNotes(params.get("notes"));
		co.setBriefDescription(params.get("briefDescription"));
		co.setStatus(params.get("status"));
		co.setSubNames(params.get("subNames"));
		co.setMcsCO(params.get("mcsCO"));
		co.setType(params.get("customerCO"));
		co.setSubCO(params.get("subCO"));
		co.setSubmittedTo(params.get("submittedTo"));
	}

}
