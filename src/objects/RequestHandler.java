package objects;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * This class is designed to make handling the requests from a web page easier to manage.
 * For example, the HttpRequest.getParameters() function returns a mapping of Strings and
 * arrays of strings, so that requires one to say map.get("key")[0]. This class contains a method
 * to change the map into a simple parameter -> value mapping, eliminating the need for array 
 * indexing.
 * @author Alex Campbell
 *
 */
public class RequestHandler 
{	
	public static Map<String, String> getParameters(Map<String, String[]> parameters)
	{
		Map<String, String> parameterMap = new HashMap<String, String>();
		Set<String> keySet = parameters.keySet();
		
		Iterator<String> iter = keySet.iterator();
		while (iter.hasNext())
		{
			String key = (String)iter.next();
			String value = parameters.get(key)[0];
			parameterMap.put(key, value);			
		}
		
		return parameterMap;
	}
}
