package projectObjects;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.hibernate.exception.SQLGrammarException;

import objects.HibernateUtil;

/**
 * @author jmackin
 *
 */
@Entity
public class Trigger extends ProjectObject {

	private String description;
	private int severity;
	private Set<String> criteria;
	@SuppressWarnings("rawtypes")
	private Class objectClass;
	
	public Trigger (@SuppressWarnings("rawtypes") Class objectClass, String description, int severity, String[] criteria) {
		this.objectClass = objectClass;
		this.description = description;
		this.severity = severity;
		this.criteria = new HashSet<String>();
		for(int i = 0; i < criteria.length; i++) {
			this.criteria.add(criteria[i]);
		}
	}
	
	public void runTrigger() {

		ArrayList<Criterion> criterion = new ArrayList<Criterion>();
		Iterator<String> it = criteria.iterator();
		while(it.hasNext()) {
			Criterion c = Restrictions.sqlRestriction(it.next());
			criterion.add(c);
		}
		/*for (int i = 0; i < criteria.size(); i++) {
			Criterion c = Restrictions.sqlRestriction(criteria.);
			criterion.add(c);
		}*/
		
		Criteria criteria = HibernateUtil.getSession().createCriteria(objectClass);
		
		for (int i = 0; i < criterion.size(); i++)
		{
			criteria.add(criterion.get(i));
		}
		
		try {
		@SuppressWarnings("unchecked")
		List<Project> projects = criteria.list();
		
		System.out.println(this);
		System.out.println(projects.size());
		
		for(int i = 0; i < projects.size(); i++) {
			Alert a = new Alert(projects.get(i), this);
			
			// TODO: hibernate.save(a);
		}
		} catch (SQLGrammarException e) {
			System.out.println("Class/Field association mapping failed");
		}
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getSeverity() {
		return severity;
	}

	public void setSeverity(int severity) {
		this.severity = severity;
	}

	@ElementCollection(targetClass=String.class)
    @JoinColumn
	public Set<String> getCriteria() {
		return criteria;
	}

	public void setCriteria(Set<String> criteria) {
		this.criteria = criteria;
	}

	public Class getObjectClass() {
		return objectClass;
	}

	public void setObjectClass(Class objectClass) {
		this.objectClass = objectClass;
	}

	public String toString() {
		return this.description + " - Severity: " + this.severity; 
	}
}
