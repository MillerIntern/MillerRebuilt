package services;
	
import java.util.List;

public class EquipService {
	
	public String generateEquipTableHeader(List<String> strings)
	{
		StringBuilder sb = new StringBuilder();
		sb.append("<table class='dataTable cell-border row-border'><thead><tr>");
		//This table header simply allows a column for the indices
		sb.append("<th>Index</th>");
		for (int i = 0; i < strings.size(); i++)
		{
			
			String value = strings.get(i);
			if(value.equals("number"))
			{
				sb.append("<th>");
				sb.append("Number");
			}
			else if (value.equals("project"))
			{
				sb.append("<th>");
				sb.append("Project");
			}
			else if (value.equals("po"))
			{
				sb.append("<th>");
				sb.append("PO#");
			}
			else if (value.equals("equipmentName"))
			{
				sb.append("<th>");
				sb.append("Equipment Name");
			}
			else if (value.equals("vendor"))
			{
				sb.append("<th>");
				sb.append("Vendor");
			}
			else if (value.equals("component"))
			{
				sb.append("<th>");
				sb.append("Component");
			}
			else if (value.equals("estimatedDeliveryDate"))
			{
				sb.append("<th>");
				sb.append("Estimated Delivery Date");
			}
		}
		sb.append("</tr>");
		sb.append("</thead>");
		return sb.toString();
	}

	
		
	}


