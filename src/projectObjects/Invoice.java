/**
 * author: Fardeen Yaqub
 *
 */

package projectObjects;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Invoice extends ProjectObject {
	
	private String invoiceID;
	private String associatedPE;
	private String invoiceTitle;
	private String invoiceNumber;
	private String invoiceType;
	private Date submittedDate;
	private Date submitRejectDate;
	private Date completedDate;
	private double invoiceAmount;
	private String invoiceCustomer;
	private String invoiceStatus;
	private String invoiceApproval;
	private String notes;

	
	
	
	private String invoice_id;
	
	private String peInvNum;
	
	private String approval1;
	private String approval2;
	private String approval3;
	private String invoiceFileName;


	private double laborInvoiced;
	private double laborToInvoice;
	private double laborPercentInvoiced;
	
	private double materialInvoiced;
	private double materialToInvoice;
	private double materialPercentInvoiced;
	
	private double projectInvoiced;
	private double projectToInvoice;
	private double projectPercentInvoiced;
	
	private double aiaInvoiced;
	private double aiaToInvoice;
	private double aiaPercentInvoiced;
	
	
	
	//Adding these as part of the notes feature
	private boolean incorrectAmount;
	private boolean incorrectCustomer;
	private boolean customerRejected;
	private boolean incompleteWork;
	
	public Invoice(String invoiceID, String associatedPE, String invoiceTitle, String invoiceNumber, String invoiceType, Date submittedDate, Date completedDate, double invoiceAmount,
			String invoiceCustomer, String invoiceStatus, String invoiceApproval, String notes, boolean incorrectAmount, boolean incorrectCustomer, boolean customerRejected, boolean incompleteWork,String invoice_id, 
			Date submitRejectDate, String approval1, String approval2,
			String approval3, String peInvNum, String invoiceFileName,
			double laborInvoiced, double laborToInvoice, double laborPercentInvoiced, 
			double materialInvoiced, double materialToInvoice, double materialPercentInvoiced,
			double projectInvoiced, double projectToInvoice, double projectPercentInvoiced,
			double aiaInvoiced, double aiaToInvoice, double aiaPercentInvoiced) {
		
	

		//super();
		this.invoiceID = invoiceID;
		this.associatedPE = associatedPE;
		this.invoiceTitle = invoiceTitle;
		this.invoiceNumber = invoiceNumber;
		this.invoiceType = invoiceType;
		this.submittedDate = submittedDate;
		this.completedDate = completedDate;
		this.submitRejectDate = submitRejectDate;
		this.invoiceAmount = invoiceAmount;
		this.invoiceCustomer = invoiceCustomer;
		this.invoiceStatus = invoiceStatus;
		this.invoiceApproval = invoiceApproval;
		this.notes = notes;
		this.invoice_id = invoice_id;
		
		this.peInvNum = peInvNum; 
		this.invoiceFileName = invoiceFileName;
		
		this.approval1 = approval1;
		this.approval2 = approval2;
		this.approval3 = approval3;
		
		this.laborInvoiced = laborInvoiced;
		this.laborToInvoice = laborToInvoice;
		this.laborPercentInvoiced = laborPercentInvoiced;
		
		this.materialInvoiced = materialInvoiced;
		this.materialToInvoice = materialToInvoice;
		this.materialPercentInvoiced = materialPercentInvoiced;
		
		this.projectInvoiced = projectInvoiced;
		this.projectToInvoice = projectToInvoice;
		this.projectPercentInvoiced = projectPercentInvoiced;
		
		this.aiaInvoiced = aiaInvoiced;
		this.aiaToInvoice = aiaToInvoice;
		this.aiaPercentInvoiced = aiaPercentInvoiced;
	
		this.incorrectAmount = incorrectAmount;
		this.incorrectCustomer = incorrectCustomer;
		this.customerRejected = customerRejected;
		this.incompleteWork = incompleteWork;
		
	}
	
	public Invoice() {
		
		this.invoiceID = null;
		this.associatedPE = null;
		this.invoiceTitle = null;
		this.invoiceNumber = null;
		this.invoiceType = null;
		this.submittedDate = null;
		this.completedDate = null;
		this.submitRejectDate = null;
		this.invoiceAmount = 0;
		this.invoiceCustomer = null;
		this.invoiceStatus = null;
		this.invoiceApproval = null;
		this.notes = null;
		this.invoice_id = null;
		
		this.peInvNum = null;
		
		this.approval1 = null;
		this.approval2 = null;
		this.approval3 = null;
		this.invoiceFileName = null;
		
		this.laborInvoiced = 0;
		this.laborToInvoice = 0;
		this.laborPercentInvoiced = 0;
		
		this.materialInvoiced = 0;
		this.materialToInvoice = 0;
		this.materialPercentInvoiced = 0;
		
		this.projectInvoiced = 0;
		this.projectToInvoice = 0;
		this.projectPercentInvoiced = 0;
		
		this.aiaInvoiced = 0;
		this.aiaToInvoice = 0;
		this.aiaPercentInvoiced = 0;
		
		this.incorrectAmount = false;
		this.incorrectCustomer = false;
		this.customerRejected = false;
		this.incompleteWork = false;
		
	}
	
	public String getInvoiceFileName() {
		return invoiceFileName;
	}

	public void setInvoiceFileName(String invoiceFileName) {
		this.invoiceFileName = invoiceFileName;
	}
	
	public String getPeInvNum() {
		return peInvNum;
	}

	public void setPeInvNum(String peInvNum) {
		this.peInvNum = peInvNum;
	}

	public Date getSubmitRejectDate() {
		return submitRejectDate;
	}

	public void setSubmitRejectDate(Date submitRejectDate) {
		this.submitRejectDate = submitRejectDate;
	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

	public String getInvoiceID() {
		return invoiceID;
	}

	public void setInvoiceID(String invoiceID) {
		this.invoiceID = invoiceID;
	}

	public String getAssociatedPE() {
		return associatedPE;
	}

	public void setAssociatedPE(String associatedPE) {
		this.associatedPE = associatedPE;
	}

	public String getInvoiceTitle() {
		return invoiceTitle;
	}

	public void setInvoiceTitle(String invoiceTitle) {
		this.invoiceTitle = invoiceTitle;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public String getInvoiceType() {
		return invoiceType;
	}

	public void setInvoiceType(String invoiceType) {
		this.invoiceType = invoiceType;
	}

	public Date getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}
	
	
	public Date getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
	}
	

	public double getInvoiceAmount() {
		return invoiceAmount;
	}

	public void setInvoiceAmount(double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	public String getInvoiceCustomer() {
		return invoiceCustomer;
	}

	public void setInvoiceCustomer(String invoiceCustomer) {
		this.invoiceCustomer = invoiceCustomer;
	}

	public String getInvoiceStatus() {
		return invoiceStatus;
	}

	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	public String getInvoiceApproval() {
		return invoiceApproval;
	}

	public void setInvoiceApproval(String invoiceApproval) {
		this.invoiceApproval = invoiceApproval;
	}

	@Column(length = 1000)
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	
	public double getLaborInvoiced() {
		return laborInvoiced;
	}

	public void setLaborInvoiced(double laborInvoiced) {
		this.laborInvoiced = laborInvoiced;
	}

	public double getLaborToInvoice() {
		return laborToInvoice;
	}

	public void setLaborToInvoice(double laborToInvoice) {
		this.laborToInvoice = laborToInvoice;
	}

	public double getLaborPercentInvoiced() {
		return laborPercentInvoiced;
	}

	public void setLaborPercentInvoiced(double laborPercentInvoiced) {
		this.laborPercentInvoiced = laborPercentInvoiced;
	}

	public double getMaterialInvoiced() {
		return materialInvoiced;
	}

	public void setMaterialInvoiced(double materialInvoiced) {
		this.materialInvoiced = materialInvoiced;
	}

	public double getMaterialToInvoice() {
		return materialToInvoice;
	}

	public void setMaterialToInvoice(double materialToInvoice) {
		this.materialToInvoice = materialToInvoice;
	}

	public double getMaterialPercentInvoiced() {
		return materialPercentInvoiced;
	}

	public void setMaterialPercentInvoiced(double materialPercentInvoiced) {
		this.materialPercentInvoiced = materialPercentInvoiced;
	}

	public double getProjectInvoiced() {
		return projectInvoiced;
	}

	public void setProjectInvoiced(double projectInvoiced) {
		this.projectInvoiced = projectInvoiced;
	}

	public double getProjectToInvoice() {
		return projectToInvoice;
	}

	public void setProjectToInvoice(double projectToInvoice) {
		this.projectToInvoice = projectToInvoice;
	}

	public double getProjectPercentInvoiced() {
		return projectPercentInvoiced;
	}

	public void setProjectPercentInvoiced(double projectPercentInvoiced) {
		this.projectPercentInvoiced = projectPercentInvoiced;
	}

	public double getAiaInvoiced() {
		return aiaInvoiced;
	}

	public void setAiaInvoiced(double aiaInvoiced) {
		this.aiaInvoiced = aiaInvoiced;
	}

	public double getAiaToInvoice() {
		return aiaToInvoice;
	}

	public void setAiaToInvoice(double aiaToInvoice) {
		this.aiaToInvoice = aiaToInvoice;
	}

	public double getAiaPercentInvoiced() {
		return aiaPercentInvoiced;
	}

	public void setAiaPercentInvoiced(double aiaPercentInvoiced) {
		this.aiaPercentInvoiced = aiaPercentInvoiced;
	}
	
	public String getApproval1() {
		return approval1;
	}

	public void setApproval1(String approval1) {
		this.approval1 = approval1;
	}

	public String getApproval2() {
		return approval2;
	}

	public void setApproval2(String approval2) {
		this.approval2 = approval2;
	}

	public String getApproval3() {
		return approval3;
	}

	public void setApproval3(String approval3) {
		this.approval3 = approval3;
	}
	
	
	public boolean getIncorrectAmount() {
		return incorrectAmount;
	}

	public void setIncorrectAmount(boolean incorrectAmount) {
		this.incorrectAmount = incorrectAmount;
	}

	public boolean getIncorrectCustomer() {
		return incorrectCustomer;
	}

	public void setIncorrectCustomer(boolean incorrectCustomer) {
		this.incorrectCustomer = incorrectCustomer;
	}

	public boolean getCustomerRejected() {
		return customerRejected;
	}

	public void setCustomerRejected(boolean customerRejected) {
		this.customerRejected = customerRejected;
	}

	public boolean getIncompleteWork() {
		return incompleteWork;
	}

	public void setIncompleteWork(boolean incompleteWork) {
		this.incompleteWork = incompleteWork;
	}

	
}