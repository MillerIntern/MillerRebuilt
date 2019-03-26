package comparators;

import java.util.Comparator;
import java.util.*;

import projectObjects.Task;

public class TaskComparator implements Comparator<Task>
{
	
	public int compare(Task t1, Task t2) 
	{			
		int comp = 0;
		if(t1.getType().equals("EMPLOYEE") && t2.getType().equals("EMPLOYEE"))
		{	
			comp = t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getAssignee().getFirstName());
			return comp;
		}
		else if(t1.getType().equals("EMPLOYEE") && t2.getType().equals("SUBCONTRACTOR"))
		{	
			comp = t1.getAssignee().getFirstName().compareToIgnoreCase(t2.getSubAssignee().getName());
			return comp;
		}
		else if(t1.getType().equals("SUBCONTRACTOR") && t2.getType().equals("EMPLOYEE"))
		{
			comp = t1.getSubAssignee().getName().compareToIgnoreCase(t2.getAssignee().getFirstName());
			return comp;
		}
		else if(t1.getType().equals("SUBCONTRACTOR") && t2.getType().equals("SUBCONTRACTOR"))
		{
			comp = t1.getSubAssignee().getName().compareToIgnoreCase(t2.getSubAssignee().getName());
		    return comp;
		}    
		else 
			return 0;
	}
}