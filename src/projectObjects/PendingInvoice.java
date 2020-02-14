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
			
	
	public PendingInvoice(String invoiceNumber, String invoiceAmount, String subNames, Date submittedDate,
			String briefDescription, String status, String dbCONum, String poNum, String notes) {
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

}
