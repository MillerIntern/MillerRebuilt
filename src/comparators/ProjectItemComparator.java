package comparators;

import java.util.Comparator;

import projectObjects.Project;

public class ProjectItemComparator implements Comparator<Project>
{
	@Override
	public int compare(Project p1, Project p2) 
	{
		return p1.getProjectItem().getName().compareToIgnoreCase(p2.getProjectItem().getName());
	}
}