package comparators;

import java.util.Comparator;

import projectObjects.ProjectClass;

public class ProjectClassComparator implements Comparator<ProjectClass>
{
	@Override
	public int compare(ProjectClass p1, ProjectClass p2) 
	{
		return p1.getName().compareToIgnoreCase(p2.getName());
	}
}