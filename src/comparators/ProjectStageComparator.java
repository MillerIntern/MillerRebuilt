package comparators;

import java.util.Comparator;

import projectObjects.ProjectStage;

public class ProjectStageComparator implements Comparator<ProjectStage>
{
	@Override
	public int compare(ProjectStage p1, ProjectStage p2) 
	{
		return p1.getName().compareToIgnoreCase(p2.getName());
	}
}