package comparators;

import java.util.Comparator;


import projectObjects.ChangeOrder;

public class ChangeOrderNumberComparator implements Comparator<ChangeOrder>
{
	@Override
	public int compare(ChangeOrder p1, ChangeOrder p2) 
	{
		int num1 = Integer.parseInt(p1.getMcsCO());
		int num2 = Integer.parseInt(p2.getMcsCO());
		
		if(num1 < num2) return -1;
		else if(num1 > num2) return 1;
		else return 0;
	}
}