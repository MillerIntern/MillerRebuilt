package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.PendingInvoice;


/**
 * @author akashgurram
 *
 */

public class PendInvFiller {
	
	/**
	 * @param t
	 * @param parameters
	 */
	
	public synchronized static void fillPendInvInformation(PendingInvoice p, Map<String, String> params, String sessionName) throws ParseException, ClassNotFoundException {
		
		p.setInvoiceNumber(params.get("invoiceNum"));
		p.setInvoiceAmount(params.get("invoiceAmt"));
		p.setSubNames(params.get("subNames"));
		
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");		
		Date submittedDate = null;
		if(params.get("submittedDate") != null && !params.get("submittedDate").isEmpty())
			submittedDate = formatter.parse(params.get("submittedDate"));
		p.setSubmittedDate(submittedDate);
		p.setBriefDescription(params.get("description"));
		p.setStatus(params.get("pendStatus"));
		p.setDbCONum(params.get("dbCoNum"));
		p.setPoNum(params.get("poNum"));
		p.setNotes(params.get("notes"));
		p.setPendingInvoice_id(params.get("pendingInvoice_id"));
		p.setPendingInvoice_city(params.get("pendingInvoice_city"));
		p.setPendingInvoice_item(params.get("pendingInvoice_item"));
		p.setPendingInvoice_manager(params.get("pendingInvoice_manager"));
		p.setPendingInvoice_state(params.get("pendingInvoice_state"));
		p.setPendingInvoice_stateabbr(params.get("pendingInvoice_stateabbr"));
		

	}
}
