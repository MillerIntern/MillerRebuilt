package comparators;

import java.util.Comparator;

import projectObjects.Task;

public class TaskComparator implements Comparator<Task>
{
	
	public int compare(Task t1, Task t2) 
	{
		//System.out.println(t1.getType()+ ",  " + t2.getType());
			
		if(t1.getType() == "EMPLOYEE" && t2.getType() == "EMPLOYEE")
			return t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getAssignee().getFirstName());
		else if(t1.getType() == "EMPLOYEE" && t2.getType() == "SUBCONTRACTOR")
			return t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getSubAssignee().getName());
		else if(t1.getType() == "SUBCONTRACTOR" && t2.getType() == "EMPLOYEE")
			return t1.getSubAssignee().getName().compareToIgnoreCase(t2.getAssignee().getFirstName());
		else if(t1.getType() == "SUBCONTRACTOR" && t2.getType() == "SUBCONTRACTOR")
			return t1.getSubAssignee().getName().compareToIgnoreCase(t2.getSubAssignee().getName());
		else 
			return 0;
	}
}