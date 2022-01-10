package projectObjects;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;

import projectObjects.ProjectObject;

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
	
	private String customerCOPnum;
	
	private String briefDescription;
	private String notes;
	
	private double cost;
	private double sell;
	
	private String mcsInvoiceStatus;
	private String subInvoiceStatus;
	
	private String peType;
	
	private String invoiceNumber;
	private String subInvoiceNumber;
	
	private int laborTotal;
	private int laborInvoiced;
	private int laborToInvoice;
	private int laborPercentInvoiced;
	
	private int materialCosts;
	private int materialInvoiced;
	private int materialToInvoice;
	private int materialPercentInvoiced;
	
	private int projectAmount;
	private int projectInvoiced;
	private int projectToInvoice;
	private int projectPercentInvoiced;
	
	private int aiaTotal;
	private int aiaInvoiced;
	private int aiaToInvoice;
	private int aiaPercentInvoiced;
	
	private int totalProject;
	private int totalInvoiced;
	private int totalToInvoice;
	private int totalPercentInvoiced;
	
	
	
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
					   String briefDescription, String notes, double cost, double sell, String mcsInvoiceStatus, String type, String peType,
					   String subInvoiceStatus, String customerCOPnum, String subCO, String title, String invoiceNumber, String subInvoiceNumber,
					   int laborTotal, int laborInvoiced, int laborToInvoice, int laborPercentInvoiced, 
						int materialCosts, int materialInvoiced, int materialToInvoice, int materialPercentInvoiced,
						int projectAmount, int projectInvoiced, int projectToInvoice, int projectPercentInvoiced,
						int aiaTotal, int aiaInvoiced, int aiaToInvoice, int aiaPercentInvoiced,
						int totalProject, int totalInvoiced, int totalToInvoice, int totalPercentInvoiced)
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
		this.customerCOPnum = customerCOPnum;
		this.subCO = subCO;
		this.sell = sell;
		this.type = type;
		this.title = title;
		this.invoiceNumber = invoiceNumber;
		
		this.mcsInvoiceStatus = mcsInvoiceStatus;
		this.subInvoiceStatus = subInvoiceStatus;
		this.subInvoiceNumber = subInvoiceNumber;
		
		this.peType = peType;
		
		this.laborTotal = laborTotal;
		this.laborInvoiced = laborInvoiced;
		this.laborToInvoice = laborToInvoice;
		this.laborPercentInvoiced = laborPercentInvoiced;
		
		this.materialCosts = materialCosts;
		this.materialInvoiced = materialInvoiced;
		this.materialToInvoice = materialToInvoice;
		this.materialPercentInvoiced = materialPercentInvoiced;
		
		this.projectAmount = projectAmount;
		this.projectInvoiced = projectInvoiced;
		this.projectToInvoice = projectToInvoice;
		this.projectPercentInvoiced = projectPercentInvoiced;
		
		this.aiaTotal = aiaTotal;
		this.aiaInvoiced = aiaInvoiced;
		this.aiaToInvoice = aiaToInvoice;
		this.aiaPercentInvoiced = aiaPercentInvoiced;
		
		this.totalProject = totalProject;
		this.totalInvoiced = totalInvoiced;
		this.totalToInvoice = totalToInvoice;
		this.totalPercentInvoiced = totalPercentInvoiced;
	
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
		this.customerCOPnum = null;
		this.title = null;
		this.invoiceNumber = null;
		this.mcsInvoiceStatus = null;
		this.subInvoiceStatus = null;
		this.subInvoiceNumber = null;
		this.peType = null;
		
		this.laborTotal = 0;
		this.laborInvoiced = 0;
		this.laborToInvoice = 0;
		this.laborPercentInvoiced = 0;
		
		this.materialCosts = 0;
		this.materialInvoiced = 0;
		this.materialToInvoice = 0;
		this.materialPercentInvoiced = 0;
		
		this.projectAmount = 0;
		this.projectInvoiced = 0;
		this.projectToInvoice = 0;
		this.projectPercentInvoiced = 0;
		
		this.aiaTotal = 0;
		this.aiaInvoiced = 0;
		this.aiaToInvoice = 0;
		this.aiaPercentInvoiced = 0;
		
		this.totalProject = 0;
		this.totalInvoiced = 0;
		this.totalToInvoice = 0;
		this.totalPercentInvoiced = 0;
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
		return customerCOPnum;
	}

	public synchronized void setSubmittedTo(String submittedTo) {
		this.customerCOPnum = submittedTo;
	}	
	
	public synchronized String getTitle() {
		return title;
	}
	
	public synchronized void setTitle(String title) {
		this.title = title;
	}
	
	public synchronized String getInvoiceNumber() {
		return invoiceNumber;
	}
	
	public synchronized void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}
	
	public synchronized String getCustomerCOPnum() {
		return customerCOPnum;
	}
	
	public synchronized void setCustomerCOPnum(String customerCOPnum) {
		this.customerCOPnum = customerCOPnum;
	}
	
	public synchronized String getMcsInvoiceStatus() {
		return mcsInvoiceStatus;
	}

	public synchronized void setMcsInvoiceStatus(String mcsInvoiceStatus) {
		this.mcsInvoiceStatus = mcsInvoiceStatus;
	}

	public synchronized String getSubInvoiceStatus() {
		return subInvoiceStatus;
	}

	public synchronized void setSubInvoiceStatus(String subInvoiceStatus) {
		this.subInvoiceStatus = subInvoiceStatus;
	}
	
	public synchronized String getSubInvoiceNumber() {
		return subInvoiceNumber;
	}

	public synchronized void setSubInvoiceNumber(String subInvoiceNumber) {
		this.subInvoiceNumber = subInvoiceNumber;
	}
	
	public String getPeType() {
		return peType;
	}


	public void setPeType(String peType) {
		this.peType = peType;
	}
	
	//New financial getters and setters
		public int getLaborTotal() {
			return laborTotal;
		}

		public void setLaborTotal(int laborTotal) {
			this.laborTotal = laborTotal;
		}

		public int getLaborInvoiced() {
			return laborInvoiced;
		}

		public void setLaborInvoiced(int laborInvoiced) {
			this.laborInvoiced = laborInvoiced;
		}

		public int getLaborToInvoice() {
			return laborToInvoice;
		}

		public void setLaborToInvoice(int laborToInvoice) {
			this.laborToInvoice = laborToInvoice;
		}

		public int getLaborPercentInvoiced() {
			return laborPercentInvoiced;
		}

		public void setLaborPercentInvoiced(int laborPercentInvoiced) {
			this.laborPercentInvoiced = laborPercentInvoiced;
		}

		public int getMaterialCosts() {
			return materialCosts;
		}

		public void setMaterialCosts(int materialCosts) {
			this.materialCosts = materialCosts;
		}

		public int getMaterialInvoiced() {
			return materialInvoiced;
		}

		public void setMaterialInvoiced(int materialInvoiced) {
			this.materialInvoiced = materialInvoiced;
		}

		public int getMaterialToInvoice() {
			return materialToInvoice;
		}

		public void setMaterialToInvoice(int materialToInvoice) {
			this.materialToInvoice = materialToInvoice;
		}

		public int getMaterialPercentInvoiced() {
			return materialPercentInvoiced;
		}

		public void setMaterialPercentInvoiced(int materialPercentInvoiced) {
			this.materialPercentInvoiced = materialPercentInvoiced;
		}

		public int getProjectAmount() {
			return projectAmount;
		}

		public void setProjectAmount(int projectAmount) {
			this.projectAmount = projectAmount;
		}

		public int getProjectInvoiced() {
			return projectInvoiced;
		}

		public void setProjectInvoiced(int projectInvoiced) {
			this.projectInvoiced = projectInvoiced;
		}

		public int getProjectToInvoice() {
			return projectToInvoice;
		}

		public void setProjectToInvoice(int projectToInvoice) {
			this.projectToInvoice = projectToInvoice;
		}

		public int getProjectPercentInvoiced() {
			return projectPercentInvoiced;
		}

		public void setProjectPercentInvoiced(int projectPercentInvoiced) {
			this.projectPercentInvoiced = projectPercentInvoiced;
		}
		
		public int getAiaTotal() {
			return aiaTotal;
		}

		public void setAiaTotal(int aiaTotal) {
			this.aiaTotal = aiaTotal;
		}

		public int getAiaInvoiced() {
			return aiaInvoiced;
		}

		public void setAiaInvoiced(int aiaInvoiced) {
			this.aiaInvoiced = aiaInvoiced;
		}

		public int getAiaToInvoice() {
			return aiaToInvoice;
		}

		public void setAiaToInvoice(int aiaToInvoice) {
			this.aiaToInvoice = aiaToInvoice;
		}

		public int getAiaPercentInvoiced() {
			return aiaPercentInvoiced;
		}

		public void setAiaPercentInvoiced(int aiaPercentInvoiced) {
			this.aiaPercentInvoiced = aiaPercentInvoiced;
		}

		public int getTotalProject() {
			return totalProject;
		}

		public void setTotalProject(int totalProject) {
			this.totalProject = totalProject;
		}

		public int getTotalInvoiced() {
			return totalInvoiced;
		}

		public void setTotalInvoiced(int totalInvoiced) {
			this.totalInvoiced = totalInvoiced;
		}

		public int getTotalToInvoice() {
			return totalToInvoice;
		}

		public void setTotalToInvoice(int totalToInvoice) {
			this.totalToInvoice = totalToInvoice;
		}

		public int getTotalPercentInvoiced() {
			return totalPercentInvoiced;
		}

		public void setTotalPercentInvoiced(int totalPercentInvoiced) {
			this.totalPercentInvoiced = totalPercentInvoiced;
		}

	
	public static Object getChangeOrderFields(String name , ChangeOrder co)
	{
		if(co == null || name == null)
			return null;
		
		if(name.equalsIgnoreCase("proposalDate"))
			return co.getProposalDate();
		else if(name.equalsIgnoreCase("submittedDate"))
			return co.getSubmittedDate();
		else if(name.equalsIgnoreCase("approvedDate"))
			return co.getApprovedDate();
		else if(name.equalsIgnoreCase("cost"))
			return (Double) co.getCost();
		else if(name.equalsIgnoreCase("sell"))
			return (Double) co.getSell();
		
		return null;
	}
	
	public static Map<String , String> getAllChangeOrderFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		fields.put("proposalDate" , "Date");
		fields.put("submittedDate" , "Date");
		fields.put("approvedDate" , "Date");
		fields.put("cost" , "Number");
		fields.put("sell" , "Number");
		fields.put("mcsCO" , "Number");
		fields.put("invoiceNumber" , "String");
		fields.put("customerCOPnum" , "String");
		fields.put("subCO" , "String");
		fields.put("status" , "String");
		fields.put("title" , "String");
		fields.put("briefDescription" , "String");
		fields.put("subNames" , "String");
		fields.put("type" , "String");
		fields.put("type" , "String");
		fields.put("mcsInvoiceStatus" , "String");
		fields.put("subInvoiceStatus" , "String");
		fields.put("subInvoiceNumber" , "String");
		fields.put("peType", "String");
		return fields;
	}
	
}
