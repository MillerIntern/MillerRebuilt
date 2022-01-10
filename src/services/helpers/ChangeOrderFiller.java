package services.helpers;

import java.text.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.ChangeOrder;

/**
 * @author jmackin
 */
public class ChangeOrderFiller 
{

	/**
	 * @param co
	 * @param params
	 */
	public synchronized static void fillChangeOrder(ChangeOrder co, Map<String, String> params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		Date proposalDate = null;
		if(!params.get("proposalDate").isEmpty())
			proposalDate = formatter.parse(params.get("proposalDate"));
		co.setProposalDate(proposalDate);
		
		Date submittedDate = null;
		if(!params.get("submittedDate").isEmpty())
			submittedDate = formatter.parse(params.get("submittedDate"));
		co.setSubmittedDate(submittedDate);
		
		Date approvedDate = null;
		if(!params.get("approvedDate").isEmpty())
			approvedDate = formatter.parse(params.get("approvedDate"));
		co.setApprovedDate(approvedDate);

		double cost;
		try
		{
			 cost = Double.parseDouble(params.get("cost"));
		}catch(NumberFormatException ex) { cost = 0; }
		co.setCost(cost);
		
		double sell;
		try
		{
			sell = Double.parseDouble(params.get("sell"));
		}catch(NumberFormatException ex) { sell = 0; }
		co.setSell(sell);
		
		co.setNotes(params.get("notes"));
		co.setBriefDescription(params.get("briefDescription"));
		co.setStatus(params.get("status"));
		co.setSubNames(params.get("subNames"));
		co.setMcsCO(params.get("mcsCO"));
		co.setType(params.get("customerCO"));
		co.setSubCO(params.get("subCO"));
		co.setTitle(params.get("title"));
		co.setInvoiceNumber(params.get("invoiceNumber"));
		co.setCustomerCOPnum(params.get("customerCOPnum"));
		co.setMcsInvoiceStatus(params.get("mcsInvoiceStatus"));
		co.setSubInvoiceStatus(params.get("subInvoiceStatus"));
		co.setPeType(params.get("peType"));
		co.setSubInvoiceNumber(params.get("subInvoiceNumber"));
		
		//finanical stuff
		String laborTotalString = params.get("laborTotal");
		try {
			int laborTotal = Integer.parseInt(laborTotalString);
			co.setLaborTotal(laborTotal);
		}catch (NumberFormatException e) {
			co.setLaborTotal(0);
		}
		//co.setLaborTotal(Integer.parseInt(params.get("laborTotal")));
		
		String laborInvoicedString = params.get("laborInvoiced");
		try {
			int laborInvoiced = Integer.parseInt(laborInvoicedString);
			co.setLaborInvoiced(laborInvoiced);
		} catch (NumberFormatException e) {
			co.setLaborInvoiced(0);

		}
		//co.setLaborInvoiced(Integer.parseInt(params.get("laborInvoiced")));
		
		String laborToInvoiceString = params.get("laborToInvoice");
		try {
			int laborToInvoice = Integer.parseInt(laborToInvoiceString);
			co.setLaborToInvoice(laborToInvoice);
		} catch (NumberFormatException e) {
			co.setLaborToInvoice(0);

		}
		//co.setLaborToInvoice(Integer.parseInt(params.get("laborToInvoice")));
		
		String laborPercentInvoicedString = params.get("laborPercentInvoiced");
		try {
			int laborPercentInvoiced = Integer.parseInt(laborPercentInvoicedString);
			co.setLaborPercentInvoiced(laborPercentInvoiced);
		} catch (NumberFormatException e) {
			co.setLaborPercentInvoiced(0);

		}		
		//co.setLaborPercentInvoiced(Integer.parseInt(params.get("laborPercentInvoiced")));
		
		String materialCostsString = params.get("materialCosts");
		try {
			int materialCosts = Integer.parseInt(materialCostsString);
			co.setMaterialCosts(materialCosts);
		} catch (NumberFormatException e) {
			co.setMaterialCosts(0);

		}		
		//co.setMaterialCosts(Integer.parseInt(params.get("materialCosts")));
		
		String materialInvoicedString = params.get("materialInvoiced");
		try {
			int materialInvoiced = Integer.parseInt(materialInvoicedString);
			co.setMaterialInvoiced(materialInvoiced);
		} catch (NumberFormatException e) {
			co.setMaterialInvoiced(0);

		}		
		//co.setMaterialInvoiced(Integer.parseInt(params.get("materialInvoiced")));
		
		String materialToInvoiceString = params.get("materialToInvoice");
		try {
			int materialToInvoice = Integer.parseInt(materialToInvoiceString);
			co.setMaterialToInvoice(materialToInvoice);
		} catch (NumberFormatException e) {
			co.setMaterialToInvoice(0);

		}		
		//co.setMaterialToInvoice(Integer.parseInt(params.get("materialToInvoice")));
		
		String materialPercentInvoicedString = params.get("materialPercentInvoiced");
		try {
			int materialPercentInvoiced = Integer.parseInt(materialPercentInvoicedString);
			co.setMaterialPercentInvoiced(materialPercentInvoiced);
		} catch (NumberFormatException e) {
			co.setMaterialPercentInvoiced(0);

		}		
		//co.setMaterialPercentInvoiced(Integer.parseInt(params.get("materialPercentInvoiced")));
		
		String projectAmountString = params.get("projectAmount");
		try {
			int projectAmount = Integer.parseInt(projectAmountString);
			co.setProjectAmount(projectAmount);
		} catch (NumberFormatException e) {
			co.setProjectAmount(0);

		}	
		//co.setProjectAmount(Integer.parseInt(params.get("projectAmount")));

		String projectInvoicedString = params.get("projectInvoiced");
		try {
			int projectInvoiced = Integer.parseInt(projectInvoicedString);
			co.setProjectInvoiced(projectInvoiced);
		} catch (NumberFormatException e) {
			co.setProjectInvoiced(0);

		}
		//co.setProjectInvoiced(Integer.parseInt(params.get("projectInvoiced")));
		
		String projectToInvoiceString = params.get("projectToInvoice");
		try {
			int projectToInvoice = Integer.parseInt(projectToInvoiceString);
			co.setProjectToInvoice(projectToInvoice);
		} catch (NumberFormatException e) {
			co.setProjectToInvoice(0);

		}		
		//co.setProjectToInvoice(Integer.parseInt(params.get("projectToInvoice")));

		String projectPercentInvoicedString = params.get("projectPercentInvoiced");
		try {
			int projectPercentInvoiced = Integer.parseInt(projectPercentInvoicedString);
			co.setProjectPercentInvoiced(projectPercentInvoiced);
		} catch (NumberFormatException e) {
			co.setProjectPercentInvoiced(0);

		}
		//co.setProjectPercentInvoiced(Integer.parseInt(params.get("projectPercentInvoiced")));
		
		
		String aiaTotalString = params.get("aiaTotal");
		try {
			int aiaTotal = Integer.parseInt(aiaTotalString);
			co.setAiaTotal(aiaTotal);
		} catch (NumberFormatException e) {
			co.setAiaTotal(0);

		}
		//co.setAiaTotal(Integer.parseInt(params.get("aiaTotal")));
		
		String aiaInvoicedString = params.get("aiaInvoiced");
		try {
			int aiaInvoiced = Integer.parseInt(aiaInvoicedString);
			co.setAiaInvoiced(aiaInvoiced);
		} catch (NumberFormatException e) {
			co.setAiaInvoiced(0);

		}	
		//co.setAiaInvoiced(Integer.parseInt(params.get("aiaInvoiced")));
		
		String aiaToInvoiceString = params.get("aiaToInvoice");
		try {
			int aiaToInvoice = Integer.parseInt(aiaToInvoiceString);
			co.setAiaToInvoice(aiaToInvoice);
		} catch (NumberFormatException e) {
			co.setAiaToInvoice(0);

		}
		//co.setAiaToInvoice(Integer.parseInt(params.get("aiaToInvoice")));
		
		String aiaPercentInvoicedString = params.get("aiaPercentInvoiced");
		try {
			int aiaPercentInvoiced = Integer.parseInt(aiaPercentInvoicedString);
			co.setAiaPercentInvoiced(aiaPercentInvoiced);
		} catch (NumberFormatException e) {
			co.setAiaPercentInvoiced(0);

		}
		//co.setAiaPercentInvoiced(Integer.parseInt(params.get("aiaPercentInvoiced")));

		String totalProjectString = params.get("totalProject");
		try {
			int totalProject = Integer.parseInt(totalProjectString);
			co.setTotalProject(totalProject);
		} catch (NumberFormatException e) {
			co.setTotalProject(0);

		}
		//co.setTotalProject(Integer.parseInt(params.get("totalProject")));
		
		String totalInvoicedString = params.get("totalInvoiced");
		try {
			int totalInvoiced = Integer.parseInt(totalInvoicedString);
			co.setTotalInvoiced(totalInvoiced);
		} catch (NumberFormatException e) {
			co.setTotalInvoiced(0);

		}		
		//co.setTotalInvoiced(Integer.parseInt(params.get("totalInvoiced")));
		
		String totalToInvoiceString = params.get("totalToInvoice");
		try {
			int totalToInvoice = Integer.parseInt(totalToInvoiceString);
			co.setTotalToInvoice(totalToInvoice);
		} catch (NumberFormatException e) {
			co.setTotalToInvoice(0);

		}			
		//co.setTotalToInvoice(Integer.parseInt(params.get("totalToInvoice")));
		
		String totalPercentInvoicedString = params.get("totalPercentInvoiced");
		try {
			int totalPercentInvoiced = Integer.parseInt(totalPercentInvoicedString);
			co.setTotalPercentInvoiced(totalPercentInvoiced);
		} catch (NumberFormatException e) {
			co.setTotalPercentInvoiced(0);

		}
	}
}
