package comparators;

import java.util.Comparator;

import projectObjects.Task;

public class TaskComparator implements Comparator<Task>
{
	
	public int compare(Task t1, Task t2) 
	{
		if(t1.getSubAssignee() == null && t2.getSubAssignee() == null)
			return t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getAssignee().getFirstName());
		else if(t1.getSubAssignee() == null && t2.getAssignee() == null)
			return t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getSubAssignee().getName());
		else if(t1.getAssignee() == null && t2.getSubAssignee() == null)
			return t1.getSubAssignee().getName().compareToIgnoreCase(t2.getAssignee().getFirstName());
		else
			return t1.getSubAssignee().getName().compareToIgnoreCase(t2.getSubAssignee().getName());
		
	}
}