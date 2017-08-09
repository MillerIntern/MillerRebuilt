package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class Alert extends ProjectObject {
	
	private Project referencedProject;
	private Trigger setTrigger;
	private Date setDate;
	
	public Alert (Project project, Trigger trigger) {
		this.setReferencedProject(project);
		this.setSetTrigger(trigger);
	}

	public synchronized Project getReferencedProject() {
		return referencedProject;
	}

	public synchronized void setReferencedProject(Project referencedProject) {
		this.referencedProject = referencedProject;
	}

	public synchronized Trigger getSetTrigger() {
		return setTrigger;
	}

	public synchronized void setSetTrigger(Trigger setTrigger) {
		this.setTrigger = setTrigger;
	}

}
