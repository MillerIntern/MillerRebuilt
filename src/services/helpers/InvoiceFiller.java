/**
 * author: Fardeen Yaqub
 *
 */

package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Invoice;


public class InvoiceFiller {
	
	/**
	 * @param t
	 * @param parameters
	 */
	
	public synchronized static void fillInvoiceInformation(Invoice i, Map<String, String> params, String sessionName) throws ParseException, ClassNotFoundException {
		
		i.setInvoiceID(params.get("invoiceID"));
		
		i.setAssociatedPE(params.get("associatedPE"));
		
		i.setInvoiceTitle(params.get("invoiceTitle"));
		
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");		
		Date submittedDate = null;
		if(params.get("submittedDate") != null && !params.get("submittedDate").isEmpty())
			submittedDate = formatter.parse(params.get("submittedDate"));
		i.setSubmittedDate(submittedDate);
		
		formatter = new SimpleDateFormat("MM/dd/yyyy");		
		Date submitRejectDate = null;
		if(params.get("submitRejectDate") != null && !params.get("submitRejectDate").isEmpty())
			submitRejectDate = formatter.parse(params.get("submitRejectDate"));
		i.setSubmitRejectDate(submitRejectDate);
		
		i.setInvoice_id(params.get("invoice_id"));
		
		i.setInvoiceNumber(params.get("invoiceNumber"));
		
		i.setInvoiceType(params.get("invoiceType"));
		
		double invoiceAmount;
		try
		{
			invoiceAmount = Double.parseDouble(params.get("invoiceAmount"));
		}catch(NumberFormatException ex) { invoiceAmount = 0; }
		i.setInvoiceAmount(invoiceAmount);
		
		
		i.setInvoiceCustomer(params.get("invoiceCustomer"));
		
		i.setInvoiceStatus(params.get("invoiceStatus"));
		
		i.setInvoiceApproval(params.get("invoiceApproval"));
		
		i.setApproval1(params.get("approval1"));
		i.setApproval2(params.get("approval2"));
		i.setApproval3(params.get("approval3"));
		
		i.setPeInvNum(params.get("peInvNum"));
		
		i.setNotes(params.get("notes"));
		
		//finanical stuff
		String laborInvoicedString = params.get("laborInvoiced");
		try {
			int laborInvoiced = Integer.parseInt(laborInvoicedString);
			i.setLaborInvoiced(laborInvoiced);
		} catch (NumberFormatException e) {
			i.setLaborInvoiced(0);

		}
		//i.setLaborInvoiced(Integer.parseInt(params.get("laborInvoiced")));
		
		String laborToInvoiceString = params.get("laborToInvoice");
		try {
			int laborToInvoice = Integer.parseInt(laborToInvoiceString);
			i.setLaborToInvoice(laborToInvoice);
		} catch (NumberFormatException e) {
			i.setLaborToInvoice(0);

		}
		//i.setLaborToInvoice(Integer.parseInt(params.get("laborToInvoice")));
		
		String laborPercentInvoicedString = params.get("laborPercentInvoiced");
		try {
			int laborPercentInvoiced = Integer.parseInt(laborPercentInvoicedString);
			i.setLaborPercentInvoiced(laborPercentInvoiced);
		} catch (NumberFormatException e) {
			i.setLaborPercentInvoiced(0);

		}		
	
		//i.setMaterialCosts(Integer.parseInt(params.get("materialCosts")));
		
		String materialInvoicedString = params.get("materialInvoiced");
		try {
			int materialInvoiced = Integer.parseInt(materialInvoicedString);
			i.setMaterialInvoiced(materialInvoiced);
		} catch (NumberFormatException e) {
			i.setMaterialInvoiced(0);

		}		
		//i.setMaterialInvoiced(Integer.parseInt(params.get("materialInvoiced")));
		
		String materialToInvoiceString = params.get("materialToInvoice");
		try {
			int materialToInvoice = Integer.parseInt(materialToInvoiceString);
			i.setMaterialToInvoice(materialToInvoice);
		} catch (NumberFormatException e) {
			i.setMaterialToInvoice(0);

		}		
		//i.setMaterialToInvoice(Integer.parseInt(params.get("materialToInvoice")));
		
		String materialPercentInvoicedString = params.get("materialPercentInvoiced");
		try {
			int materialPercentInvoiced = Integer.parseInt(materialPercentInvoicedString);
			i.setMaterialPercentInvoiced(materialPercentInvoiced);
		} catch (NumberFormatException e) {
			i.setMaterialPercentInvoiced(0);

		}		

		//i.setProjectAmount(Integer.parseInt(params.get("projectAmount")));

		String projectInvoicedString = params.get("projectInvoiced");
		try {
			int projectInvoiced = Integer.parseInt(projectInvoicedString);
			i.setProjectInvoiced(projectInvoiced);
		} catch (NumberFormatException e) {
			i.setProjectInvoiced(0);

		}
		//i.setProjectInvoiced(Integer.parseInt(params.get("projectInvoiced")));
		
		String projectToInvoiceString = params.get("projectToInvoice");
		try {
			int projectToInvoice = Integer.parseInt(projectToInvoiceString);
			i.setProjectToInvoice(projectToInvoice);
		} catch (NumberFormatException e) {
			i.setProjectToInvoice(0);

		}		
		//i.setProjectToInvoice(Integer.parseInt(params.get("projectToInvoice")));

		String projectPercentInvoicedString = params.get("projectPercentInvoiced");
		try {
			int projectPercentInvoiced = Integer.parseInt(projectPercentInvoicedString);
			i.setProjectPercentInvoiced(projectPercentInvoiced);
		} catch (NumberFormatException e) {
			i.setProjectPercentInvoiced(0);

		}
		//i.setProjectPercentInvoiced(Integer.parseInt(params.get("projectPercentInvoiced")));
		

		
		String aiaInvoicedString = params.get("aiaInvoiced");
		try {
			int aiaInvoiced = Integer.parseInt(aiaInvoicedString);
			i.setAiaInvoiced(aiaInvoiced);
		} catch (NumberFormatException e) {
			i.setAiaInvoiced(0);

		}	
		//i.setAiaInvoiced(Integer.parseInt(params.get("aiaInvoiced")));
		
		String aiaToInvoiceString = params.get("aiaToInvoice");
		try {
			int aiaToInvoice = Integer.parseInt(aiaToInvoiceString);
			i.setAiaToInvoice(aiaToInvoice);
		} catch (NumberFormatException e) {
			i.setAiaToInvoice(0);

		}
		//i.setAiaToInvoice(Integer.parseInt(params.get("aiaToInvoice")));
		
		String aiaPercentInvoicedString = params.get("aiaPercentInvoiced");
		try {
			int aiaPercentInvoiced = Integer.parseInt(aiaPercentInvoicedString);
			i.setAiaPercentInvoiced(aiaPercentInvoiced);
		} catch (NumberFormatException e) {
			i.setAiaPercentInvoiced(0);

		}


	}
}
