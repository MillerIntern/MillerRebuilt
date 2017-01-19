package comparators;

import java.util.Comparator;
import projectObjects.Project;

public class ProjectRegionComparator implements Comparator<Project>
{
	@Override
	public int compare(Project p1, Project p2) 
	{
		return p1.getWarehouse().getRegion().toString().compareToIgnoreCase(p2.getWarehouse().getRegion().toString());
	}
}