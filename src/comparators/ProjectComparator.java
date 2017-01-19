package comparators;

import java.util.Comparator;

import projectObjects.Project;

public class ProjectComparator implements Comparator<Project>
{

	@Override
	public int compare(Project p1, Project p2) 
	{
		if (p1.getStage().getName().equals("Active")
				&& p2.getStage().getName().equals("Proposal"))
			return 1;
		if (p1.getStage().getName().equals("Proposal")
				&& p2.getStage().getName().equals("Active"))
			return -1;
		else
		{
			String w1 = p1.getWarehouse().getCity().getName();
			String w2 = p2.getWarehouse().getCity().getName();
			
			return w1.compareToIgnoreCase(w2);
		}
	}
}
