package projectObjects;

import javax.persistence.Entity;

/**
 * @author jmackin
 *
 */
@Entity
public class Alert extends ProjectObject {
	
	private Project referencedProject;
	private Trigger setTrigger;
	
	public Alert (Project project, Trigger trigger) {
		this.setReferencedProject(project);
		this.setSetTrigger(trigger);
	}

	public Project getReferencedProject() {
		return referencedProject;
	}

	public void setReferencedProject(Project referencedProject) {
		this.referencedProject = referencedProject;
	}

	public Trigger getSetTrigger() {
		return setTrigger;
	}

	public void setSetTrigger(Trigger setTrigger) {
		this.setTrigger = setTrigger;
	}

}
