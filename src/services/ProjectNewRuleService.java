package services;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import projectObjects.ChangeOrder;
import projectObjects.NewEquipment;
import projectObjects.Project;
import projectObjects.RuleDetails;
import projectObjects.Task;
import projectObjects.TaskStatus;
public class ProjectNewRuleService {
	static Date today = new Date();
	
	
	public static ArrayList<RuleDetails> generalInfoEvaluate( Project proj) {
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		int mcsNumber = proj.getMcsNumber();
		String projectManager = proj.getProjectManagers().getName();
		String projectSupervisor = proj.getSupervisors().iterator().next().getName();
		String stage = proj.getStage().getName();
		Long status = proj.getStatus().getId();
		String hvac = proj.getAutofillHVAC();
		String refrigeration = proj.getAutofillRefrigeration();
		String permits = proj.getAutofillPermits();
		/* STAGE VALUES  
		 * Active = 2 
		 * Budgetary = 8
		 * Cancelled = 15
		 * Closed = 4
		 * OnHold = 9
		 * Proposal = 1
		 * 
		 * STATUS VALUES
		 * Awaiting Direction = 4
		 * Awaiting Drawings = 11
		 * Awaiting Permits = 30
		 * Budgetary Submitted = 37
		 * CloseOut = 35
		 * Lost = 34
		 * Preparing Proposal = 1
		 * Proposal Submitted = 3
		 * Scheduled = 29
		 * Scheduling = 26
		 * 
		 * */
		//1
		if(permits == null || permits.equals("0")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "permits TBD", "Permits must be either Yes or No", 0);
			al.add(rd);
		}
		//2
		if(hvac == null|| hvac.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "HVAC TBD", "HVAC must be either Yes or No", 0);
			al.add(rd);
		}
		//3
		if(refrigeration == null || refrigeration.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "Refrigeration TBD", "Refrigeration must be either Yes or No", 0);
			System.out.println("the cost is "+ proj.getCost());
			al.add(rd);
		}
		//4
		if(projectManager == projectSupervisor) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " SameManagerSupervisor", "Manager and Supervisor values should be different", 0);
			al.add(rd);
		}
		//5
		if(mcsNumber == 0 || mcsNumber == -1) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidMCS#", "MCS Project # needs to be updated", 0);
			al.add(rd);
		}
		//6
		if((stage.equals("Active")) && !(status == 4 || status == 11 || status == 30 || status == 35 || status == 29 || status == 26)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaActiveStage", "Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Closeout, Scheduled, or Scheduling if the Stage is Active", 0);
			al.add(rd);
		}
		//7
		if((stage.equals("Budgetary")) && !(status == 4 || status == 11 || status == 1 || status == 3)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaBudgetaryStage", "Status must be either Awaiting Direction, Awaiting Drawings, Preparing Proposal, or Proposal Submitted if the Stage is Budgetary", 0);
			al.add(rd);
		}
		//8
		//Stage Cancelled or On Hold
		//9
		if((stage.equals("Closed")) && !(status == 35)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaClosedStage", "Status must be Closed if the Stage is Closed", 1);
			al.add(rd);
		}
		//10
		if((stage.equals("Proposal")) && !(status == 4 || status == 11 || status == 30 || status == 34 || status == 1 || status == 3)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaProposalStage", "Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Lost, Preparing Proposal, or Proposal Submitted if the Stage is Proposal", 0);
			al.add(rd);
		}
		return al;
		
	}
	
	public static ArrayList<RuleDetails> financialEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		int actualInvoice = proj.getInvoiced();
		int shouldInvoice = proj.getShouldInvoice();
		String cost = proj.getCost();
		String customerNumber = proj.getCustomerNumber();
		
		//1
		if(actualInvoice == 0) {
			RuleDetails rd = new RuleDetails("Financial", "ActiualInvioceZero", "Actual Invoice needs a value other than 0", 0);
			al.add(rd);
		}
		//2
		if(shouldInvoice == 0) {
			RuleDetails rd = new RuleDetails("Financial", "ShouldInvioceZero", "Should Invoice needs a value other than 0", 0);
			al.add(rd);
		}
		//3
		if(cost.isEmpty()) {
			RuleDetails rd = new RuleDetails("Financial", "CostEmpty", "Cost needs a value", 0);
			al.add(rd);
		}
		//4 Need to review if customerNumber is needed
//		if(customerNumber.isEmpty()) {
//			RuleDetails rd = new RuleDetails("FinancialInfo", "CustomerNumberEmpty", "Customer Number needs a value", 1);
//			al.add(rd);
//		}
		//5
		if(actualInvoice != shouldInvoice) {
			RuleDetails rd = new RuleDetails("Financial", "ActualShouldNotEqual", "Actual Invoice and Should Invoice need to be equal", 0);
			al.add(rd);
		}
		return al;
	}
	
	public static ArrayList<RuleDetails> schedulingEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		Date projectInitiatedDate = proj.getProjectInitiatedDate();
		Date siteSurveyDate = proj.getSiteSurvey();
		Date budgetaryDueDate = proj.getBudgetaryDue();
		Date budgetarySubmittedDate = proj.getBudgetarySubmitted();
		Date proposalDueDate = proj.getProposalDue();
		Date proposalSubmittedDate = proj.getProposalSubmitted();
		Date scheduledStartDate = proj.getScheduledStartDate();
		Date scheduledTurnoverDate = proj.getScheduledTurnover();
		Date actualTurnoverDate = proj.getActualTurnover();
		
		//1
		if(siteSurveyDate == null ) {
			RuleDetails rd = new RuleDetails("Scheduling", "SiteSuveyDate", "Site Survey Date needs a value", 0);
			al.add(rd);
		}
		//2
		if(budgetaryDueDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "BudgetaryDueDate", "Budgetary Due Date needs a value", 0);
			al.add(rd);
		}
		//3
		if(budgetarySubmittedDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "BudgetarySubmittedDate", "Budgetary Submitted Date needs a value", 0);
			al.add(rd);
		}
		//4
		if(proposalDueDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ProposalDueDate", "Proposal Due Date needs a value", 0);
			al.add(rd);
		}
		//5
		if(proposalSubmittedDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ProposalSubmittedDate", "Proposal Submitted Date needs a value", 0);
			al.add(rd);
		}
		//6
		if(scheduledStartDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ScheduledStartDate", "Scheduled Start Date needs a value", 0);
			al.add(rd);
		}
		//7
		if(scheduledTurnoverDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ScheduledTurnoverDate", "Scheduled Turnover Date needs a value", 0);
			al.add(rd);
		}
		//8
		if(actualTurnoverDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ActualTurnoverDate", "Actual Turnover Date needs a value", 0);
			al.add(rd);
		}
		//9
		if((siteSurveyDate != null) && (projectInitiatedDate != null) && (siteSurveyDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierSiteSurveyDate", "Site Survey Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//10
		if((budgetaryDueDate != null) && (projectInitiatedDate != null) && (budgetaryDueDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierBudgetaryDueDate", "Budgetary Due Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//11
		if((budgetarySubmittedDate != null) && (projectInitiatedDate != null) && (budgetarySubmittedDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierBudgetarySubmittedDate", "Budgetary Submitted Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//12
		if((proposalDueDate != null) && (projectInitiatedDate != null) && (proposalDueDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierProposalDueDate", "Proposal Due Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//13
		if((proposalSubmittedDate != null) && (projectInitiatedDate != null) && (proposalSubmittedDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierProposalSubmittedDate", "Proposal Submitted Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//14
		if((scheduledStartDate != null) && (projectInitiatedDate != null) && (scheduledStartDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierScheduledStartDate", "Scheduled Start Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//15
		if((scheduledTurnoverDate != null) && (projectInitiatedDate != null) && (scheduledTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierScheduledTurnoverDate", "Scheduled Turnover Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//16
		if((actualTurnoverDate != null) && (projectInitiatedDate != null) && (actualTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierActualTurnoverDate", "Actual Turnover Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//17
		if((budgetaryDueDate != null) && ((budgetaryDueDate).before(today)) && (budgetarySubmittedDate == null)) {
			RuleDetails rd = new RuleDetails("Scheduling", "LateBudgetarySubmittedDate", "Budgetary Submitted date is late", 1);
			al.add(rd);
		}
		//18
		if((proposalDueDate != null) && ((proposalDueDate).before(today)) && (proposalSubmittedDate == null)) {
			RuleDetails rd = new RuleDetails("Scheduling", "LateProposalSubmittedDate", "Proposal Submitted date is late", 1);
			al.add(rd);
		}
		//19
		if((scheduledTurnoverDate != null) && ((scheduledTurnoverDate).before(today)) && (actualTurnoverDate == null)) {
			RuleDetails rd = new RuleDetails("Scheduling", "LateActualTurnoverdDate", "Actual Turnover date is late", 1);
			al.add(rd);
		}
		return al;
	}
	public static ArrayList<RuleDetails> tasksEvaluate(List<Task> task){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		if(task.size() != 0) {
			for(int i=0; i<task.size(); i++) {
				Date today = new Date();
				Task currentTask = task.get(i);
				Date dueDate = currentTask.getDueDate();
				Date initiatedDate = currentTask.getAssignedDate();
				String taskStatus = currentTask.getTaskStatus().getStatus();
				if(dueDate.before(initiatedDate)) {
					RuleDetails rd = new RuleDetails("Tasks", "IncorrectDueDate", String.format("TITLE:%s Due date must be later than initiated date ",currentTask.getTitle()), 0);
					al.add(rd);
				}
				if(dueDate.before(today) && taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("Tasks", "PassedDueDate", String.format("TITLE:%s Task is Late", currentTask.getTitle()), 1);
					al.add(rd);
				}
				if(taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("Tasks", "OpenTask", String.format("TITLE:%s Task Needs to be completed", currentTask.getTitle()), 0);
					al.add(rd);
				}
			}
		}

		return al;
	}
	

	public static ArrayList<RuleDetails> changeOrdersEvaluate(List<ChangeOrder> changeOrder){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		if(changeOrder.size() != 0) {
			for(int i=0; i<changeOrder.size(); i++) {
				ChangeOrder currentChangeOrder = changeOrder.get(i);
				String mcsCoNum = currentChangeOrder.getMcsCO();
				String title = currentChangeOrder.getTitle();
				String description = currentChangeOrder.getBriefDescription();
				String status = currentChangeOrder.getStatus();
				String subNames = currentChangeOrder.getSubNames();
				Date subsSubmittedDate = currentChangeOrder.getProposalDate(); //For some reason this was being saved under proposal date
				String customer = currentChangeOrder.getSubmittedTo(); //This is the Customer Field in ChangeOrder
				Date submitDate = currentChangeOrder.getSubmittedDate();
				Date approvedDate = currentChangeOrder.getApprovedDate();
				double cost = currentChangeOrder.getCost();
				double sell = currentChangeOrder.getSell();
				String invoiceNum = currentChangeOrder.getInvoiceNumber();
				String customerCopNum = currentChangeOrder.getCustomerCOPnum();
				String subCoNum = currentChangeOrder.getSubCO();

				//1
				if(mcsCoNum == null || mcsCoNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidMCSCo#", "MCS CO # needs to be updated", 0);
					al.add(rd);
				}
				//2
				if(title == null || title.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidTitle", "Title needs to be updated", 0);
					al.add(rd);
				}
				//3
				if(description == null || description.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidDescription", "Description needs to be updated", 0);
					al.add(rd);
				}
				//4
				if(status == null || status.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidStatus", "Status needs to be updated", 0);
					al.add(rd);
				}
				//5
				if(subNames == null || subNames.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubNames", "Sub Name(s) needs to be updated", 0);
					al.add(rd);
				}
				//6
				if(subsSubmittedDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubsSubmittedDate", "Subs Submitted Date needs a value", 0);
					al.add(rd);
				}
				//7
				if(customer == null || customer.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidCustomer", "Customer needs to be updated", 0);
					al.add(rd);
				}
				//8
				if(submitDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubmitDate", "Submit Date needs a value", 0);
					al.add(rd);
				}
				//9
				if(approvedDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidApprovedDate", "Approved Date needs a value", 0);
					al.add(rd);
				}
				//10
				if(cost == 0) {
					RuleDetails rd = new RuleDetails("Financial", "CostZero", "Cost needs a value other than 0", 0);
					al.add(rd);
				}
				//11
				if(sell == 0) {
					RuleDetails rd = new RuleDetails("Financial", "SellZero", "Sell needs a value other than 0", 0);
					al.add(rd);
				}
				//12
				if(invoiceNum == null || invoiceNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidInvoiceNum", "Invoice number needs to be updated", 0);
					al.add(rd);
				}
				//13
				if(customerCopNum == null || customerCopNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSustomerCopNum", "Customer COP number needs to be updated", 0);
					al.add(rd);
				}
				//14  
				if(subCoNum == null || subCoNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubCoNum", "Sub CO number needs to be updated", 0);
					al.add(rd);
				}
				//15
				if((submitDate != null) && (subsSubmittedDate != null) && (submitDate).before(subsSubmittedDate)) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierSubmitDate", "Submit Date is earlier than Sub Submitted Date", 0);
					al.add(rd);
				}
				//16
				if((approvedDate != null) && (subsSubmittedDate != null) && (approvedDate).before(subsSubmittedDate)) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierApprovedDate", "Approved Date is earlier than Sub Submitted Date", 0);
					al.add(rd);
				}

			}
		}

		return al;
	}
	public static ArrayList<RuleDetails> equipmentEvaluate(List<NewEquipment> equipment){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		if(equipment.size() != 0) {
			for(int i=0; i<equipment.size(); i++) {
				NewEquipment currentEquipment = equipment.get(i);
				String PoNum = currentEquipment.getPoNum();
				String equipmentName = currentEquipment.getEquipmentName();
				String description = currentEquipment.getDescription();
				String supplier = currentEquipment.getEqSupplier().getName();
				Date estDeliveryDate = currentEquipment.getEstDeliveryDate();
				Date orderedDate = currentEquipment.getOrderedDate();
				Date actDeliveryDate = currentEquipment.getDeliveryDate();
				String deliveryStatus = currentEquipment.getEqStatus().getName();
				
				
				

				//1
				if(PoNum == null || PoNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidPo#", "PO # needs to be updated", 0);
					al.add(rd);
				}
				//2
				if(equipmentName == null || equipmentName.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEquipmentName", "Equipment Name needs to be updated", 0);
					al.add(rd);
				}
				//3
				if(description == null || description.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDescription", "Description needs to be updated", 0);
					al.add(rd);
				}
				//4
				if(supplier == null || supplier.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidSupplier", "Supplier needs to be updated", 0);
					al.add(rd);
				}
				//5
				if(estDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEstDeliveryDate", "Estimated Delivery Date needs a value", 0);
					al.add(rd);
				}
				//6  
				if(orderedDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidOrderedDate", "Ordered Date needs a value", 0);
					al.add(rd);
				}
				//7 
				if(actDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidActualDeliveryDate", "Actual Delivery Date needs a value", 0);
					al.add(rd);
				}
				//8
				if(deliveryStatus == null || deliveryStatus.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDeliveryStatus", "Delivery Status must be given a value", 0);
					al.add(rd);
				}
				//9
				if((estDeliveryDate != null) && (orderedDate != null) && (estDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierEstDeliveryDate", "Estimated Delivery Date is earlier than Ordered Date", 0);
					al.add(rd);
				}
				//10
				if((actDeliveryDate != null) && (orderedDate != null) && (actDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierActDeliveryDate", "Actual Delivery Date is earlier than Ordered Date", 0);
					al.add(rd);
				}
				//11
				if((estDeliveryDate != null) && ((estDeliveryDate).before(today)) && (actDeliveryDate == null)) {
					RuleDetails rd = new RuleDetails("Equipment", "LateActualDeliveryDate", "Actual Delivery date is late", 1);
					al.add(rd);
				}
				//12
				if((orderedDate != null) && (deliveryStatus == null || deliveryStatus.isEmpty())) {
					RuleDetails rd = new RuleDetails("Equipment", " UnUpdatedDeliveryStatus", "Delivery Status needs to be updated", 0);
					al.add(rd);
				}

			}
		}

		return al;
	}
}


