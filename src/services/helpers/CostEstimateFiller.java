package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.CostEstimate;
import projectObjects.Permits;

public class CostEstimateFiller
{

	public synchronized static void fillCostEstimate(CostEstimate ce,  Map<String, String>params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");


		System.out.println(params);
		
	}	
}
