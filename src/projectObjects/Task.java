package projectObjects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * @author jmackin
 *
 */
@Entity
public class Task extends ProjectObject {
	private String title;
	private String description;
	private Project project;
	private int severity;
	private Date dueDate;
	private Date assignedDate;
	private User assigner;
	private User assignee;
	private boolean completed;
	private String notes;
	
	public Task (String title, String description, Project p, int s, Date due, 
			Date assigned, User assigner, User assignee, boolean c, String notes) {
		this.title = title;
		this.description = description;
		this.project = p;
		this.severity = s;
		this.dueDate = due;
		this.assignedDate = assigned;
		this.assigner = assigner;
		this.assignee = assignee;
		this.completed = c;
		this.setNotes(notes);
	}
	
	public Task() {
		title = null;
		description = null;
		project = null;
		severity = -1;
		dueDate = null;
		assignedDate = null;
		assigner = null;
		assignee = null;
		completed = false;
		setNotes(null);
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public int getSeverity() {
		return severity;
	}
	public void setSeverity(int severity) {
		this.severity = severity;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public Date getAssignedDate() {
		return assignedDate;
	}
	public void setAssignedDate(Date assignedDate) {
		this.assignedDate = assignedDate;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public User getAssigner() {
		return assigner;
	}
	public void setAssigner(User assigner) {
		this.assigner = assigner;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public User getAssignee() {
		return assignee;
	}
	public void setAssignee(User assignee) {
		if(assignee == null) System.out.println("IT WAS NULLLLL");
		this.assignee = assignee;
	}
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String toString() {
		return this.title + ": " + this.description;
	}
}
