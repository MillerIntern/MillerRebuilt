package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

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
	private String title;
	private String status;
	private String type;
	
	private String mcsCO;
	private String subCO;
	
	private String subNames;
	
	private Date proposalDate;
	private Date submittedDate;
	private Date approvedDate;
	
	private String submittedTo;
	
	private String briefDescription;
	private String notes;
	
	private double cost;
	private double sell;
	
	
	
	/**
	 * This method constructs a new change order. Change orders need types, statuses, dates, and 
	 * monetary amounts
	 * 
	 * @param type the type of change order
	 * @param status the status of the change order
	 * @param date the date that the change order was initiated on
	 * @param amount the amount of money that the change order is associated with
	 */
	public ChangeOrder(String status, Date apprvDate, String mcsCO, String subNames, Date proposalDate, Date submittedDate,
					   String briefDescription, String notes, double cost, double sell, String type,
					   String submittedTo, String subCO, String title)
	{
		this.status = status;
		this.approvedDate = apprvDate;
		this.mcsCO = mcsCO;
		this.subNames = subNames;
		this.proposalDate = proposalDate;
		this.submittedDate = submittedDate;
		this.briefDescription = briefDescription;
		this.notes = notes;
		this.cost = cost;
		this.submittedTo = submittedTo;
		this.subCO = subCO;
		this.sell = sell;
		this.setType(type);
		this.title = title;
	}
	
	public ChangeOrder()
	{
		this.status = null;
		this.approvedDate = null;
		this.setType(null);
		this.mcsCO = null;
		this.subNames = null;
		this.proposalDate = null;
		this.submittedDate = null;
		this.briefDescription = null;
		this.notes = null;
		this.cost = 0;
		this.sell = 0;
		this.subCO = null;
		this.submittedTo = null;
		this.title = null;
	}



	public synchronized String getStatus() {
		return status;
	}

	/**
	 * This methdo sets the status of a change order
	 * @param status the status of the change order
	 */
	public synchronized void setStatus(String status) {
		this.status = status;
	}

	public synchronized String getType() {
		return type;
	}

	public synchronized void setType(String type) {
		this.type = type;
	}
	
	/**
	 * This method gets the approved date of a change order
	 * @return the approved date of the change order
	 */
	public synchronized Date getApprovedDate() {
		return approvedDate;
	}
	
	/**
	 * This method sets the approved date of the change order
	 * @param approvedDate
	 */
	public synchronized void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}

	public synchronized String getMcsCO() {
		return mcsCO;
	}

	public synchronized void setMcsCO(String mcsCO) {
		this.mcsCO = mcsCO;
	}

	public synchronized String getSubNames() {
		return subNames;
	}

	public synchronized void setSubNames(String subNames) {
		this.subNames = subNames;
	}

	public synchronized Date getProposalDate() {
		return proposalDate;
	}

	public synchronized void setProposalDate(Date proposalDate) {
		this.proposalDate = proposalDate;
	}

	public synchronized Date getSubmittedDate() {
		return submittedDate;
	}

	public synchronized void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}

	public synchronized String getBriefDescription() {
		return briefDescription;
	}

	public synchronized void setBriefDescription(String briefDescription) {
		this.briefDescription = briefDescription;
	}

	public synchronized String getNotes() {
		return notes;
	}

	public synchronized void setNotes(String notes) {
		this.notes = notes;
	}

	public synchronized double getCost() {
		return cost;
	}

	public synchronized void setCost(double cost) {
		this.cost = cost;
	}

	public synchronized double getSell() {
		return sell;
	}

	public synchronized void setSell(double sell) {
		this.sell = sell;
	}

	public synchronized String getSubCO() {
		return subCO;
	}

	public synchronized void setSubCO(String subCO) {
		this.subCO = subCO;
	}

	public synchronized String getSubmittedTo() {
		return submittedTo;
	}

	public synchronized void setSubmittedTo(String submittedTo) {
		this.submittedTo = submittedTo;
	}	
	
	public synchronized String getTitle() {
		return title;
	}
	
	public synchronized void setTitle(String title) {
		this.title = title;
	}
}
