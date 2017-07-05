package comparators;

import java.util.Comparator;

import projectObjects.Task;

public class TaskComparator implements Comparator<Task>
{
	
	public int compare(Task t1, Task t2) 
	{
		return t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getAssignee().getFirstName());
	}
}