package comparators;

import java.util.Comparator;

import projectObjects.Project;


public class ProjectStageComparator implements Comparator<Project>
{
	@Override
	public int compare(Project p1, Project p2) 
	{
		return p1.getStage().getName().compareToIgnoreCase(p2.getStage().getName());
	}
}