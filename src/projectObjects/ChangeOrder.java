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
					   String submittedTo, String subCO)
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
	}



	public String getStatus() {
		return status;
	}

	/**
	 * This methdo sets the status of a change order
	 * @param status the status of the change order
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getMcsCO() {
		return mcsCO;
	}

	public void setMcsCO(String mcsCO) {
		this.mcsCO = mcsCO;
	}

	public String getSubNames() {
		return subNames;
	}

	public void setSubNames(String subNames) {
		this.subNames = subNames;
	}

	public Date getProposalDate() {
		return proposalDate;
	}

	public void setProposalDate(Date proposalDate) {
		this.proposalDate = proposalDate;
	}

	public Date getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}

	public String getBriefDescription() {
		return briefDescription;
	}

	public void setBriefDescription(String briefDescription) {
		this.briefDescription = briefDescription;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public double getSell() {
		return sell;
	}

	public void setSell(double sell) {
		this.sell = sell;
	}

	public String getSubCO() {
		return subCO;
	}

	public void setSubCO(String subCO) {
		this.subCO = subCO;
	}

	public String getSubmittedTo() {
		return submittedTo;
	}

	public void setSubmittedTo(String submittedTo) {
		this.submittedTo = submittedTo;
	}	
}
