package projectObjects;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;

import projectObjects.ProjectObject;

@Entity
public class PendingInvoice extends ProjectObject {
	private String invoiceNumber;
	private String invoiceAmount;
	private String subNames;
	private Date submittedDate;
	private String briefDescription;
	private String status;
	private String dbCONum;
	private String poNum;
	private String notes;
	private String pendingInvoice_id;
	private String pendingInvoice_city;
	private String pendingInvoice_manager;
	private String pendingInvoice_item;
	private String pendingInvoice_state;
	private String pendingInvoice_stateabbr;
			
	




	public PendingInvoice(String invoiceNumber, String invoiceAmount, String subNames, Date submittedDate,
			String briefDescription, String status, String dbCONum, String poNum, String notes, String pendingInvoice_id,
			String pendingInvoice_city, String pendingInvoice_manager, String pendingInvoice_item, String pendingInvoice_state, 
			String pendingInvoice_stateabbr) {
		super();
		this.invoiceNumber = invoiceNumber;
		this.invoiceAmount = invoiceAmount;
		this.subNames = subNames;
		this.submittedDate = submittedDate;
		this.briefDescription = briefDescription;
		this.status = status;
		this.dbCONum = dbCONum;
		this.poNum = poNum;
		this.notes = notes;
		this.pendingInvoice_id = pendingInvoice_id;
		this.pendingInvoice_city = pendingInvoice_city;
		this.pendingInvoice_manager = pendingInvoice_manager;
		this.pendingInvoice_item = pendingInvoice_item;
		this.pendingInvoice_state = pendingInvoice_state;
		this.pendingInvoice_stateabbr = pendingInvoice_stateabbr;
	}
	


	public PendingInvoice() {
		
		this.invoiceNumber = null;
		this.invoiceAmount = null;
		this.subNames = null;
		this.submittedDate = null;
		this.briefDescription = null;
		this.status = null;
		this.dbCONum = null;
		this.poNum = null;
		this.notes = null;
		this.pendingInvoice_id = null;
		this.pendingInvoice_city = null;
		this.pendingInvoice_manager = null;
		this.pendingInvoice_item = null;
		this.pendingInvoice_state = null;
		this.pendingInvoice_stateabbr = null;
		
		
	}


	public synchronized String getInvoiceNumber() {
		return invoiceNumber;
	}
	public synchronized void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	public synchronized String getInvoiceAmount() {
		return invoiceAmount;
	}
	public synchronized void setInvoiceAmount(String invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public synchronized String getSubNames() {
		return subNames;
	}
	public synchronized void setSubNames(String subNames) {
		this.subNames = subNames;
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
	public synchronized String getStatus() {
		return status;
	}
	public synchronized void setStatus(String status) {
		this.status = status;
	}
	public synchronized String getDbCONum() {
		return dbCONum;
	}
	public synchronized void setDbCONum(String dbCONum) {
		this.dbCONum = dbCONum;
	}
	public synchronized String getPoNum() {
		return poNum;
	}
	public synchronized void setPoNum(String poNum) {
		this.poNum = poNum;
	}
	public synchronized String getNotes() {
		return notes;
	}
	public synchronized void setNotes(String notes) {
		this.notes = notes;
	}	
	public synchronized String getPendingInvoice_id() {
		return pendingInvoice_id;
	}

	public synchronized void setPendingInvoice_id(String pendingInvoice_id) {
		this.pendingInvoice_id = pendingInvoice_id;
	}
	public String getPendingInvoice_city() {
		return pendingInvoice_city;
	}
	public synchronized void setPendingInvoice_city(String pendingInvoice_city) {
		this.pendingInvoice_city = pendingInvoice_city;
	}
	public synchronized String getPendingInvoice_manager() {
		return pendingInvoice_manager;
	}
	public synchronized void setPendingInvoice_manager(String pendingInvoice_manager) {
		this.pendingInvoice_manager = pendingInvoice_manager;
	}
	public synchronized String getPendingInvoice_item() {
		return pendingInvoice_item;
	}
	public synchronized void setPendingInvoice_item(String pendingInvoice_item) {
		this.pendingInvoice_item = pendingInvoice_item;
	}
	public synchronized String getPendingInvoice_state() {
		return pendingInvoice_state;
	}
	public synchronized void setPendingInvoice_state(String pendingInvoice_state) {
		this.pendingInvoice_state = pendingInvoice_state;
	}
	public synchronized String getPendingInvoice_stateabbr() {
		return pendingInvoice_stateabbr;
	}
	public synchronized void setPendingInvoice_stateabbr(String pendingInvoice_stateabbr) {
		this.pendingInvoice_stateabbr = pendingInvoice_stateabbr;
	}

}
