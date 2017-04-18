package projectObjects;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import objects.HibernateUtil;

/**
 * @author jmackin
 *
 */
@Entity
public class Trigger extends ProjectObject {
	private String description;
	private int severity;
	private ArrayList<String> criteria;
	
	public Trigger (String description, int severity, String[] criteria) {
		this.description = description;
		this.severity = severity;
		this.criteria = new ArrayList<String>();
		for(int i = 0; i < criteria.length; i++) {
			this.criteria.add(criteria[i]);
		}
	}
	
	public void runTrigger() {

		ArrayList<Criterion> criterion = new ArrayList<Criterion>();
		for (int i = 0; i < criteria.size(); i++) {
			Criterion c = Restrictions.sqlRestriction(criteria.get(i));
			criterion.add(c);
		}
		
		Criteria criteria = HibernateUtil.getSession().createCriteria(Project.class);
		
		for (int i = 0; i < criterion.size(); i++)
		{
			criteria.add(criterion.get(i));
		}
		
		@SuppressWarnings("unchecked")
		List<Project> projects = criteria.list();
		System.out.println(this);
		System.out.println(projects.size());
		/*for(int i = 0; i < projects.size(); i++) {
			System.out.println(projects.get(i));
		}*/
	}
	
	public String toString() {
		return this.description + " - Serverity: " + this.severity; 
	}
}
