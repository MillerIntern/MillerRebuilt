/**
 * author: Saurabh Dewangan
 *
 */

package projectObjects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class InvoiceApproval {

	private long projId;
	private String invoiceID;
	private int invoiceApprovalId;
	private int noOfApproval;
	private String name1;
	private String status1;
	private Date date1;
	//private String notes1;
	private String name2;
	private String status2;
	private Date date2;
	//private String notes2;
	private String name3;
	private String status3;
	private Date date3;
	//private String notes3;
	private String name4;
	private String status4;
	private Date date4;
	//private String notes4;
	private String name5;
	private String status5;
	private Date date5;
	//private String notes5;
	
	public InvoiceApproval(long projId, String invoiceID, int invoiceApprovalId,
			String name1, String status1, Date date1, String notes1,
			String name2, String status2, Date date2, String notes2,
			String name3, String status3, Date date3, String notes3,
			String name4, String status4, Date date4, String notes4,
			String name5, String status5, Date date5, String notes5) {
		
		this.projId = projId;
		this.invoiceID = invoiceID;
		this.invoiceApprovalId = invoiceApprovalId;
		this.name1 = name1;
		this.status1 = status1;
		this.date1 = date1;
		//this.notes1 = notes1;
		this.name2 = name2;
		this.status2 = status2;
		this.date2 = date2;
		//this.notes2 = notes2;
		this.name3 = name3;
		this.status3 = status3;
		this.date3 = date3;
		//this.notes3 = notes3;
		this.name4 = name4;
		this.status4 = status4;
		this.date4 = date4;
		//this.notes4 = notes4;
		this.name5 = name5;
		this.status5 = status5;
		this.date5 = date5;
		//this.notes5 = notes5;
		
	}
	
	public InvoiceApproval() {
		this.projId = 0;
		this.invoiceID = null;
		this.invoiceApprovalId = 0;
		this.name1 = null;
		this.status1 = null;
		this.date1 = null;
		//this.notes1 = null;
		this.name2 = null;
		this.status2 = null;
		this.date2 = null;
		//this.notes2 = null;
		this.name3 = null;
		this.status3 = null;
		this.date3 = null;
		//this.notes3 = null;
		this.name4 = null;
		this.status4 = null;
		this.date4 = null;
		//this.notes4 = null;
		this.name5 = null;
		this.status5 = null;
		this.date5 = null;
		//this.notes5 = null;
	}

	public long getProjId() {
		return projId;
	}

	public synchronized void setProjId(long projId) {
		this.projId = projId;
	}

	public String getInvoiceID() {
		return invoiceID;
	}

	public void setInvoiceID(String invoiceID) {
		this.invoiceID = invoiceID;
	}

	public int getInvoiceApprovalId() {
		return invoiceApprovalId;
	}

	public void setInvoiceApprovalId(int invoiceApprovalId) {
		this.invoiceApprovalId = invoiceApprovalId;
	}

	public int getNoOfApproval() {
		return noOfApproval;
	}

	public void setNoOfApproval(int noOfApproval) {
		this.noOfApproval = noOfApproval;
	}

	public String getName1() {
		return name1;
	}

	public void setName1(String name1) {
		this.name1 = name1;
	}

	public String getStatus1() {
		return status1;
	}

	public void setStatus1(String status1) {
		this.status1 = status1;
	}

	public Date getDate1() {
		return date1;
	}

	public void setDate1(Date date1) {
		this.date1 = date1;
	}

	/*public String getNotes1() {
		return notes1;
	}

	public void setNotes1(String notes1) {
		this.notes1 = notes1;
	} */

	public String getName2() {
		return name2;
	}

	public void setName2(String name2) {
		this.name2 = name2;
	}

	public String getStatus2() {
		return status2;
	}

	public void setStatus2(String status2) {
		this.status2 = status2;
	}

	public Date getDate2() {
		return date2;
	}

	public void setDate2(Date date2) {
		this.date2 = date2;
	}

	/*public String getNotes2() {
		return notes2;
	}

	public void setNotes2(String notes2) {
		this.notes2 = notes2;
	} */

	public String getName3() {
		return name3;
	}

	public void setName3(String name3) {
		this.name3 = name3;
	}

	public String getStatus3() {
		return status3;
	}

	public void setStatus3(String status3) {
		this.status3 = status3;
	}

	public Date getDate3() {
		return date3;
	}

	public void setDate3(Date date3) {
		this.date3 = date3;
	}

	/*public String getNotes3() {
		return notes3;
	}

	public void setNotes3(String notes3) {
		this.notes3 = notes3;
	} */

	public String getName4() {
		return name4;
	}

	public void setName4(String name4) {
		this.name4 = name4;
	}

	public String getStatus4() {
		return status4;
	}

	public void setStatus4(String status4) {
		this.status4 = status4;
	}

	public Date getDate4() {
		return date4;
	}

	public void setDate4(Date date4) {
		this.date4 = date4;
	}

	/*(public String getNotes4() {
		return notes4;
	}

	public void setNotes4(String notes4) {
		this.notes4 = notes4;
	} */

	public String getName5() {
		return name5;
	}

	public void setName5(String name5) {
		this.name5 = name5;
	}

	public String getStatus5() {
		return status5;
	}

	public void setStatus5(String status5) {
		this.status5 = status5;
	}

	public Date getDate5() {
		return date5;
	}

	public void setDate5(Date date5) {
		this.date5 = date5;
	}

	/*public String getNotes5() {
		return notes5;
	}

	public void setNotes5(String notes5) {
		this.notes5 = notes5;
	} */
	
	
}
