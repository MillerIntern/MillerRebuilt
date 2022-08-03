/**
 * author: Saurabh Dewangan
 *
 */


package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.InvoiceApproval;

public class InvoiceApprovalFiller {
	
	public synchronized static void fillInvoiceApprovalInfoormation(InvoiceApproval ia, Map<String, String> params, String sessionName) throws ParseException, ClassNotFoundException  {
		
		Long projId;
		try {
			projId = Long.parseLong(params.get("projectID"));
			ia.setProjId(projId);
		} catch (NumberFormatException e) {
			ia.setProjId(0);
		}
		
		ia.setInvoiceID(params.get("invoiceID"));

		int invoiceApprovalId;
		try {
			invoiceApprovalId = Integer.parseInt(params.get("invoiceApprovalId"));
			ia.setProjId(invoiceApprovalId);
		} catch (NumberFormatException e) {
			ia.setProjId(0);
		}
		
		ia.setName1(params.get("name1"));
		ia.setStatus1(params.get("status1"));
		
		DateFormat formatter1 = new SimpleDateFormat("MM/dd/yyyy");		
		Date date1 = null;
		if(params.get("date1") != null && !params.get("date1").isEmpty())
			date1 = formatter1.parse(params.get("date1"));
		ia.setDate1(date1);
		
		//ia.setNotes1(params.get("notes1"));
		
		ia.setName2(params.get("name2"));
		ia.setStatus2(params.get("status2"));
		
		DateFormat formatter2 = new SimpleDateFormat("MM/dd/yyyy");		
		Date date2 = null;
		if(params.get("date2") != null && !params.get("date2").isEmpty())
			date2 = formatter2.parse(params.get("date2"));
		ia.setDate2(date2);
		
		//ia.setNotes2(params.get("notes2"));
		
		ia.setName3(params.get("name3"));
		ia.setStatus3(params.get("status3"));
		
		DateFormat formatter3 = new SimpleDateFormat("MM/dd/yyyy");		
		Date date3 = null;
		if(params.get("date3") != null && !params.get("date3").isEmpty())
			date3 = formatter3.parse(params.get("date3"));
		ia.setDate3(date3);
		
		//ia.setNotes3(params.get("notes3"));
		
		ia.setName4(params.get("name4"));
		ia.setStatus4(params.get("status4"));
		
		DateFormat formatter4 = new SimpleDateFormat("MM/dd/yyyy");		
		Date date4 = null;
		if(params.get("date4") != null && !params.get("date4").isEmpty())
			date4 = formatter4.parse(params.get("date4"));
		ia.setDate4(date4);
		
		//ia.setNotes4(params.get("notes4"));
		
		ia.setName5(params.get("name5"));
		ia.setStatus5(params.get("status5"));
		
		DateFormat formatter5 = new SimpleDateFormat("MM/dd/yyyy");		
		Date date5 = null;
		if(params.get("date5") != null && !params.get("date5").isEmpty())
			date5 = formatter5.parse(params.get("date5"));
		ia.setDate5(date5);
		
		//ia.setNotes5(params.get("notes5"));
		
		
	}

}
