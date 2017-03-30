package projectObjects;

import java.util.ArrayList;

import javax.persistence.Entity;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

/**
 * @author jmackin
 *
 */
@Entity
public class Trigger extends ProjectObject {
	private String description;
	private int severity;
	private ArrayList<Criterion> criterion;
	
	public Trigger (String description, int severity, String[] criteria) {
		this.description = description;
		this.severity = severity;
		this.criterion = new ArrayList<Criterion>();
		for (int i = 0; i < criteria.length; i++) {
			Criterion c = Restrictions.sqlRestriction(criteria[i]);
			criterion.add(c);
		}
	}
}
