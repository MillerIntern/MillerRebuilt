package comparators;

import java.util.Comparator;

import projectObjects.Project;

public class WarehouseComparator implements Comparator<Project>
{
	@Override
	public int compare(Project p1, Project p2) 
	{
		return p1.getWarehouse().getCity().getName().compareToIgnoreCase(p2.getWarehouse().getCity().getName());
	}
}
