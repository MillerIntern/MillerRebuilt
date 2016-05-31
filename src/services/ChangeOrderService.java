package services;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import projectObjects.ChangeOrder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * This class provides methods in order to parse Change orders from strings (which come from HTTP requests).
 * @author Alex Campbell
 *
 */
public class ChangeOrderService extends ProjectObjectService
{
	/**
	 * This method parses a json string into a Set of ChangeOrder objects
	 * 
	 * @param json a string representing a JSON array
	 * @return A Set of change orders
	 * @throws ParseException
	 * @throws NumberFormatException
	 * @throws ClassNotFoundException
	 */
	public static HashSet<ChangeOrder> getChangeOrdersFromString(String json) throws ParseException, NumberFormatException, ClassNotFoundException
	{	
		//Initialize variables
		DateFormat formatter = new SimpleDateFormat("mm/dd/yyyy");
		HashSet<ChangeOrder> cos = new HashSet<ChangeOrder>();
		
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		Type collectionType = new TypeToken<HashSet<ChangeOrder>>(){}.getType();
		cos = gson.fromJson(json, collectionType);
		
		return cos;
	}
	
	public static HashSet<ChangeOrder> editChangeOrders(HashSet<ChangeOrder> newOrders, HashSet<ChangeOrder>oldOrders)
	{
		Iterator<ChangeOrder> newChangeOrders = newOrders.iterator();
		Iterator<ChangeOrder> oldChangeOrders = oldOrders.iterator();
		
		while (oldChangeOrders.hasNext())
		{
			ChangeOrder oldOrder = oldChangeOrders.next();
			if (!newOrders.contains(oldOrder))
			{
				oldOrders.remove(oldOrder);
			}
			
		}
		
		return oldOrders;
	}
	
	public static void removeChangeOrders(Set<ChangeOrder> cos)
	{
		Iterator<ChangeOrder> oldChangeOrders = cos.iterator();
		while (oldChangeOrders.hasNext())
		{
			ChangeOrder co = oldChangeOrders.next();
			try {
				ProjectObjectService.delete(co.getId(), "ChangeOrder");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
		}
	}
}
