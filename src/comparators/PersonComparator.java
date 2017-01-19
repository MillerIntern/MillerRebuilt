package comparators;

import java.util.Comparator;

import projectObjects.Person;

public class PersonComparator implements Comparator<Person>
{
	@Override
	public int compare(Person p1, Person p2) 
	{
		return p1.getName().compareToIgnoreCase(p2.getName());
	}
}