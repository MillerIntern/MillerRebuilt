package projectObjects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * This class models the various change orders of a project: these are revisions or extra
 * aspects of a project that are added later in a project's lifecycle. A project can have
 * multiple change orders
 * @author Alex Campbell
 *
 */
@Entity
public class ChangeOrder extends ProjectObject
{
	/**
	 * The status of the change order
	 */
	private ChangeOrderStatus status;
	
	/**
	 * The submission date of the change order
	 */
	private Date submissionDate;
	
	/**
	 * The completion date of the change order
	 */
	private Date completedDate;
	
	/**
	 * The due date of the change order
	 */
	private Date dueDate;
	
	/**
	 * The due date of the change order
	 */
	private Date approvedDate;
	
	/**
	 * Person who requested the CO
	 */
	private String requested;
	
	
	/**
	 * The monetary value of the change order
	 */
	private double amount;
	
	/**
	 * This method constructs a new change order. Change orders need types, statuses, dates, and 
	 * monetary amounts
	 * 
	 * @param type the type of change order
	 * @param status the status of the change order
	 * @param date the date that the change order was initiated on
	 * @param amount the amount of money that the change order is associated with
	 */
	public ChangeOrder(ChangeOrderStatus status, Date subdate, Date compDate, Date dueDate, Date apprvDate, String req, double amount)
	{
		this.status = status;
		this.submissionDate = subdate;
		this.amount = amount;
		this.completedDate = compDate;
		this.dueDate = dueDate;
		this.approvedDate = apprvDate;
		this.requested = req;
	}
	
	public ChangeOrder()
	{
		this.status = null;
		this.submissionDate = null;
		this.amount = 0;
		this.completedDate = null;
		this.dueDate = null;
		this.approvedDate = null;
		this.requested = null;
	}



	/**
	 * This method gets the status of the change order
	 * @return
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ChangeOrderStatus getStatus() {
		return status;
	}

	/**
	 * This methdo sets the status of a change order
	 * @param status the status of the change order
	 */
	public void setStatus(ChangeOrderStatus status) {
		this.status = status;
	}

	/**
	 * This method gets the submission date of a change order
	 * @return the submission date of the change order
	 */
	public Date getSubmissionDate() {
		return submissionDate;
	}

	/**
	 * This method sets the submission date of the change order
	 * @param submissionDate
	 */
	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}
	
	/**
	 * This method gets the due date of a change order
	 * @return the due date of the change order
	 */
	public Date getDueDate() {
		return dueDate;
	}
	
	/**
	 * This method sets the due date of the change order
	 * @param dueDate
	 */
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	
	/**
	 * This method gets the completed date of a change order
	 * @return the completed date of the change order
	 */
	public Date getCompletedDate() {
		return completedDate;
	}
	
	/**
	 * This method sets the completed date of the change order
	 * @param completedDate
	 */
	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
	}
	
	/**
	 * This method gets the approved date of a change order
	 * @return the approved date of the change order
	 */
	public Date getApprovedDate() {
		return approvedDate;
	}
	
	/**
	 * This method sets the approved date of the change order
	 * @param approvedDate
	 */
	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}

	

	/**
	 * This method returns the monetary value of the change order
	 * @return the value of the change order
	 */
	public double getAmount() {
		return amount;
	}

	/**
	 * This method sets the monetary value of the change order
	 * @param amount
	 */
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	/**
	 * This method returns the requester of the CO
	 * @return the requester
	 */
	public String getRequested(){
		return requested;
	}
	
	/**
	 * This sets the requester of the CO
	 * @param requested
	 */
	public void setRequested(String requested){
		this.requested = requested;
	}
	
}
