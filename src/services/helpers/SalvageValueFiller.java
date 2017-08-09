package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.CloseoutDetails;
import projectObjects.SalvageValue;

/**
 * @author Josh Mackin
 */
public class SalvageValueFiller
{
	public synchronized static SalvageValue fillSalvageValue(CloseoutDetails cd, Map<String, String>params) throws ParseException
	{
		SalvageValue sv = null;
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		Double salvageAmount = null;
		if(params.get("salvageAmount") != null)
			try
			{
				salvageAmount = Double.parseDouble(params.get("salvageAmount"));
			}catch(NumberFormatException nfe){}


		Date fsalvageDate  = null;
		if ((params.get("salvageDate") != null) && !(params.get("salvageDate")).isEmpty())
			fsalvageDate = formatter.parse(params.get("salvageDate"));
		if (salvageAmount != null && !params.get("salvageDate").isEmpty())
		{
			//If the salvageValue doesn't exist, make one
			if (cd.getSalvageValue() == null)
			{
				sv = new SalvageValue(fsalvageDate, salvageAmount);
			}

		}
		return sv;
	}
}
