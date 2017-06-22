package projectObjects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * This class represents a task status. A task status is always associated with a Task
 * @author Andrew Serensits (JMJ)
 */
@Entity
@Table(name = "taskstatus")
public class TaskStatus extends ProjectObject
{
	/**
	 * The name of the status
	 */
	private String status;
	
	public TaskStatus()
	{
		id = new Long(-1);
		status = "open";
	}
	
	public TaskStatus(String status)
	{
		id = new Long(1);
		this.status = status;
	}
	

	/**
	 * This method gets the status of the task
	 * @return
	 */
	@Column(name = "status")
	public String getStatus() {
		return status;
	}
	
	/**
	 * This method sets the status of a task
	 * @param status
	 */
	public void setStatus(String status) {
		this.status = status;
	}
}
