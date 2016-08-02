package services;

import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import projectObjects.RequestForInfo;

public class RequestForInfoService {
	
	public static void addRequestForInfo(int rfiNumber, String pType, String requester, String request, Date requestDate, Date obtainDate, 
			String response)
	{
		RequestForInfo reqForInfo = new RequestForInfo(rfiNumber, pType, requester, request, requestDate, obtainDate, response);
        ProjectObjectService.addObject("RequestForInfo", reqForInfo);
	}
	
	/**
	 * This method gets all of the RFIs in the database as a json string
	 * @return a string representing a JSON array
	 */
	public static String getAllRequestsAsJson()
	{
		List<Object> list = ProjectObjectService.getAll("RequestForInfo");

        return new Gson().toJson(list);
	}

}
