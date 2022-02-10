package services;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import objects.HibernateUtil;
import projectObjects.ChangeOrder;
import projectObjects.CloseoutDetails;
import projectObjects.EquipmentStatus;
import projectObjects.EquipmentVendor;
import projectObjects.NewEquipment;
import projectObjects.PendingInvoice;
import projectObjects.Invoice;
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectStatus;
import projectObjects.RuleDetails;
import projectObjects.SalvageValue;
import projectObjects.Task;
import projectObjects.TaskStatus;
import projectObjects.CustomerApproval;

//used to get the project type
import projectObjects.ProjectClass;

public class ProjectNewRuleService {
	static Date today = new Date();
	static boolean scoreYellow = false;
	static boolean scoreRed = false;
	
	public static ArrayList<RuleDetails> generalInfoEvaluate( Project proj) {
		scoreYellow = false;
		scoreRed = false;
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		int mcsNumber = proj.getMcsNumber();
		String projectManager = proj.getProjectManagers().getName();
		String projectSupervisor = proj.getSupervisors().iterator().next().getName();
		String stage = proj.getStage().getName();
		Long status = proj.getStatus().getId();
		String hvac = proj.getAutofillHVAC();
		String refrigeration = proj.getAutofillRefrigeration();
		String permits = proj.getAutofillPermits();
		String customerApproval = proj.getCustomerApproval().getName();
		
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
		 * Awaiting Equipment = 12
		 * Budgetary Submitted = 37
		 * CloseOut = 35
		 * Lost = 34
		 * Preparing Proposal = 1
		 * Proposal Submitted = 3
		 * Scheduled = 29
		 * Scheduling = 26
		 * 
		 * */
		
		//if customer approval is "Pending" && stage is "Active"
		if(customerApproval.equals("Pending") && stage.equals("Active")) {
			
			RuleDetails rd = new RuleDetails("GeneralInfo", "CustomerApprovalActive", "Stage is active but Customer Approval is still pending", 1);
			scoreRed = true;
			al.add(rd);
		}
		
				
		//1
		if(permits == null || permits.equals("0")) {
			if(!(stage.equals("Budgetary")) && !(stage.equals("Proposal"))){
				RuleDetails rd = new RuleDetails("GeneralInfo", "permits TBD", "Permits must be either Yes or No", 1);
				scoreRed = true;
				al.add(rd);
			}
			
		}
		
		//2
		if(hvac == null|| hvac.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "HVAC TBD", "HVAC must be either Yes or No", 1);
			scoreRed = true;
			al.add(rd);
		}
		//3
		if(refrigeration == null || refrigeration.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "Refrigeration TBD", "Refrigeration must be either Yes or No", 1);
			scoreRed = true;
			al.add(rd);
		}
		//4
		if(projectManager == projectSupervisor) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " SameManagerSupervisor", "Manager and Supervisor values should be different", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//5
		if((stage.equals("Active")) && (mcsNumber == 0 || mcsNumber == -1)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidMCS#", "MCS Project # needs to be updated", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//6
		if((stage.equals("Active")) && !(status == 4 || status == 11 || status == 30 || status == 35 || status == 29 || status == 26 || status == 12)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaActiveStage", "Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Closeout, Scheduled, or Scheduling if the Stage is Active", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//7
		if((stage.equals("Budgetary")) && !(status == 4 || status == 11 || status == 37 || status == 1)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaBudgetaryStage", "Status must be either Awaiting Direction, Awaiting Drawings, Budgetary Submitted, or Preparing Proposal if the Stage is Budgetary", 0);
			scoreYellow = true;
			al.add(rd);
		}

		//8
		if((stage.equals("Proposal")) && !(status == 4 || status == 11 || status == 30 || status == 34 || status == 1 || status == 3)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaProposalStage", "Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Lost, Preparing Proposal, or Proposal Submitted if the Stage is Proposal", 0);
			scoreYellow = true;
			al.add(rd);
		}
		return al;
		
	}
	
	public static ArrayList<RuleDetails> financialEvaluate(Project proj, List<PendingInvoice> pendInvs, List<Invoice> invoice){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		int actualInvoice = proj.getInvoiced();
		int shouldInvoice = proj.getShouldInvoice();
		String cost = proj.getCost();
		String customerNumber = proj.getCustomerNumber();
		Long status = proj.getStatus().getId();
//		//1
//		if(status != null && status == 35 && actualInvoice == 0) {
//			RuleDetails rd = new RuleDetails("Financial", "ActiualInvoiceZero", "Actual Invoice needs a value other than 0", 0);
//			scoreYellow = true;
//			al.add(rd);
//		}
		//2
		if(status != null && status == 35 && shouldInvoice == 0) {
			RuleDetails rd = new RuleDetails("Financial", "ShouldInvoiceZero", "Should Invoice needs a value other than 0", 0);
			scoreYellow = true;
			al.add(rd);
		}
		
		//Removing this rule for now as per Andy's Instruction
//		//3
//		if(cost.isEmpty()) {
//			RuleDetails rd = new RuleDetails("Financial", "CostEmpty", "Cost needs a value", 0);
//			scoreYellow = true;
//			al.add(rd);
//		}

		//4
		if((status != null && status == 35) && (actualInvoice != shouldInvoice)) {
			RuleDetails rd = new RuleDetails("Financial", "ActualShouldNotEqual", "Need to invoice "+shouldInvoice +" %", 0);
			scoreYellow = true;
			al.add(rd);
		}
		
		
		/*
		 * //5 Need to review if customerNumber is needed if(customerNumber.isEmpty()) {
		 * RuleDetails rd = new RuleDetails("FinancialInfo", "CustomerNumberEmpty",
		 * "Customer Number needs a value", 1); al.add(rd); }
		 */
		if(pendInvs.size() != 0) {
			for(int i=0; i<pendInvs.size(); i++) {				
				PendingInvoice currentPendInvs = pendInvs.get(i);								
				String pendInvsStatus = currentPendInvs.getStatus();
				
				if(pendInvsStatus != null && (pendInvsStatus.equals("Open"))) {															
					RuleDetails rd = new RuleDetails("Financial", "PendInvsOpen", " Please check the pending invoice (s)", 0);
					scoreYellow = true;
					al.add(rd);		
					break;
				}					
				}				
			}
		
		return al;
	}
	
	public static ArrayList<RuleDetails> schedulingEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		String projectStage = proj.getStage().getName();
		String projectStatus = proj.getStatus().getName();
		Date projectInitiatedDate = proj.getProjectInitiatedDate();
		Date siteSurveyDate = proj.getSiteSurvey();
		Date budgetaryDueDate = proj.getBudgetaryDue();
		Date budgetarySubmittedDate = proj.getBudgetarySubmitted();
		Date proposalDueDate = proj.getProposalDue();
		Date proposalSubmittedDate = proj.getProposalSubmitted();
		Date scheduledStartDate = proj.getScheduledStartDate();
		Date scheduledTurnoverDate = proj.getScheduledTurnover();
		Date actualTurnoverDate = proj.getActualTurnover();
		
		Long status = proj.getStatus().getId();
		
		//1
//		if(siteSurveyDate == null ) {
//			RuleDetails rd = new RuleDetails("Scheduling", "SiteSuveyDate", "Site Survey Date needs a value", 0);
//			al.add(rd);
//		}

		//2
		
		//Removing this rule as per Bua's task
//		if(proposalDueDate == null) {
//			RuleDetails rd = new RuleDetails("Scheduling", "ProposalDueDate", "Proposal Due Date needs a value", 0);
//			scoreYellow = true;
//			al.add(rd);
//		}
		//3
		//Removing this rule as per Bua's task
//		if(proposalSubmittedDate == null) {
//			RuleDetails rd = new RuleDetails("Scheduling", "ProposalSubmittedDate", "Proposal Submitted Date needs a value", 0);
//			scoreYellow = true;
//			al.add(rd);
//		}
		
		//Adding a new rule to compensate for the previous two rules.
		
		if((projectStage.equals("Proposal")) && !((projectStatus.equals("Awaiting Direction")) || (projectStatus.equals("Awaiting Drawings"))) 
				&& (proposalSubmittedDate == null)){
			RuleDetails rd = new RuleDetails("Scheduling", "ProposalSubmittedDate", "Need to submit the proposal", 0);
			scoreYellow = true;
			al.add(rd);
			
		}
		
		
		//4
		if((status != null) && (status == 35 || status == 29) && scheduledStartDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ScheduledStartDate", "Scheduled Start Date needs a value", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//5
		if((status != null) && (status == 35 || status == 29) && scheduledTurnoverDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ScheduledTurnoverDate", "Scheduled Turnover Date needs a value", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//6  BUA asked me to remove this, but technically it is same as the Actual Turnover date is late Rule
//		if((scheduledTurnoverDate != null) && (scheduledTurnoverDate.before(today))) {
//			if((status != null) && (status == 35) && (actualTurnoverDate == null)) {
//				RuleDetails rd = new RuleDetails("Scheduling", "ActualTurnoverDate", "Actual Turnover Date needs a value", 0);
//				scoreYellow = true;
//				al.add(rd);
//			}
//		}
		

		//IGNORING THIS RULE FOR NOW AS PER ANDY'S INSTRUCTION
		/*
		 * //7 if((siteSurveyDate != null) && (projectInitiatedDate != null) &&
		 * (siteSurveyDate).before(projectInitiatedDate)) { RuleDetails rd = new
		 * RuleDetails("Scheduling", "EarlierSiteSurveyDate",
		 * "Site Survey Date is earlier than Project Initiation Date", 0); al.add(rd); }
		 */

		//8
		if((proposalDueDate != null) && (projectInitiatedDate != null) && (proposalDueDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierProposalDueDate", "Proposal Due Date is earlier than Project Initiation Date", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//9
		if((proposalSubmittedDate != null) && (projectInitiatedDate != null) && (proposalSubmittedDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierProposalSubmittedDate", "Proposal Submitted Date is earlier than Project Initiation Date", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//10
		if((scheduledStartDate != null) && (projectInitiatedDate != null) && (scheduledStartDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierScheduledStartDate", "Scheduled Start Date is earlier than Project Initiation Date", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//11
		if((scheduledTurnoverDate != null) && (projectInitiatedDate != null) && (scheduledTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierScheduledTurnoverDate", "Scheduled Turnover Date is earlier than Project Initiation Date", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//12
		if((actualTurnoverDate != null) && (projectInitiatedDate != null) && (actualTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("Scheduling", "EarlierActualTurnoverDate", "Actual Turnover Date is earlier than Project Initiation Date", 0);
			scoreYellow = true;
			al.add(rd);
		}

		//13
		if((proposalDueDate != null) && ((proposalDueDate).before(today)) && (proposalSubmittedDate == null)) {
			RuleDetails rd = new RuleDetails("Scheduling", "LateProposalSubmittedDate", "Proposal Submitted Date is late", 1);
			scoreRed = true;
			al.add(rd);
		}
		//14
		if( projectStage != null && projectStage.equals("Active") && (scheduledTurnoverDate != null) && ((scheduledTurnoverDate).before(today))){
//			(status != null) && (status == 35)
//			
			if(actualTurnoverDate == null) {
				RuleDetails rd = new RuleDetails("Scheduling", "LateActualTurnoverdDate", "Scheduled Turnover date has passed. If the project" + 
						" has been Completed, please update the \"Actual Turnover\" date and change the \"Status\" to \"Closeout\".", 1);
				scoreRed = true;
				al.add(rd);
			}
			else {
				if((status != null) && !(status == 35)) {
					RuleDetails rd = new RuleDetails("Scheduling", "LateCloseout", "Scheduled Turnover date has passed. If the project "
							+ "has been Completed, please change the \"Status\" to \"Closeout\".", 1);
					scoreRed = true;
					al.add(rd);
				}
			}

		}
		
		if(projectStage.equals("Budgetary")) {  //Budgetary Rules will be checked only if the project stage is Budgetary.	
			//15
			if(budgetaryDueDate == null) {
				RuleDetails rd = new RuleDetails("Scheduling", "BudgetaryDueDate", "Budgetary Due Date needs a value", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//Removing this rule as per Andy's request - Akash
//			//16
//			if(budgetarySubmittedDate == null) {
//				RuleDetails rd = new RuleDetails("Scheduling", "BudgetarySubmittedDate", "Budgetary Submitted Date needs a value", 0);
//				scoreYellow = true;
//				al.add(rd);
//			}
			//17
			if((budgetaryDueDate != null) && (projectInitiatedDate != null) && (budgetaryDueDate).before(projectInitiatedDate)) {
				RuleDetails rd = new RuleDetails("Scheduling", "EarlierBudgetaryDueDate", "Budgetary Due Date is earlier than Project Initiation Date", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//18
			if((budgetarySubmittedDate != null) && (projectInitiatedDate != null) && (budgetarySubmittedDate).before(projectInitiatedDate)) {
				RuleDetails rd = new RuleDetails("Scheduling", "EarlierBudgetarySubmittedDate", "Budgetary Submitted Date is earlier than Project Initiation Date", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//19
			if((budgetaryDueDate != null) && ((budgetaryDueDate).before(today)) && (budgetarySubmittedDate == null)) {
				RuleDetails rd = new RuleDetails("Scheduling", "LateBudgetarySubmittedDate", "Budgetary Submitted Date is late", 1);
				scoreRed = true;
				al.add(rd);
			}
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
				
				if(taskStatus != null && !(taskStatus.equals("Closed"))) {
				
					//1
					if(dueDate != null && initiatedDate != null && dueDate.before(initiatedDate)) {
						RuleDetails rd = new RuleDetails("Tasks", "IncorrectDueDate", String.format("%s~Due Date must be later than initiated date ",currentTask.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					
					//2
					if(dueDate != null && taskStatus != null && dueDate.before(today) && taskStatus.equals("Open")) {
						RuleDetails rd = new RuleDetails("Tasks", "PassedDueDate", String.format("%s~Task is Late", currentTask.getTitle()), 1);
						scoreRed = true;
						al.add(rd);
					}
					
					//3 //Updating this rule such that task needs to be Completed will be shown only if the task is not late
					if(!(dueDate != null && taskStatus != null && dueDate.before(today) && taskStatus.equals("Open"))) {
						if(taskStatus != null && taskStatus.equals("Open")) {
							RuleDetails rd = new RuleDetails("Tasks", "OpenTask", String.format("%s~Task Needs to be Completed", currentTask.getTitle()), 0);
							scoreYellow = true;
							al.add(rd);
						}
				}
					
				}
				
			}
		}

		return al;
	}
	

	public static ArrayList<RuleDetails> changeOrdersEvaluate(Project proj, List<ChangeOrder> changeOrder){
		Long projectStatus = proj.getStatus().getId();
		int changeOrderColorCode = 0;
		if(projectStatus != null && projectStatus ==35)
			changeOrderColorCode = 1;
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
				String customer = currentChangeOrder.getType(); //This is the Customer Field in ChangeOrder				
				Date submitDate = currentChangeOrder.getSubmittedDate();
				Date approvedDate = currentChangeOrder.getApprovedDate();
				double cost = currentChangeOrder.getCost();
				double sell = currentChangeOrder.getSell();
				String invoiceNum = currentChangeOrder.getInvoiceNumber();
				String customerCopNum = currentChangeOrder.getCustomerCOPnum();
				String subCoNum = currentChangeOrder.getSubCO();
				String mcsInvoiceStatus = currentChangeOrder.getMcsInvoiceStatus();
				String subInvoiceStatus = currentChangeOrder.getSubInvoiceStatus();
				
		
				if(status != null && !(status.equals("1")) && !(status.equals("4"))) {   // "1" here means Preparing 
					//1
					if(mcsCoNum == null || mcsCoNum.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidMCSCo#", String.format("%s~MCS CO # needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//2
					if(title == null || title.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidTitle", String.format("%s~Title needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//3
					if(description == null || description.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidDescription", String.format("%s~Description needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//4
					if(status == null || status.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidStatus", String.format("%s~Status needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//5
					if(subNames == null || subNames.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubNames", String.format("%s~Sub Name(s) needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//6
					if(status != null && !(status.equals("4")) && subsSubmittedDate == null) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubsSubmittedDate", String.format("%s~Subs Submitted Date needs a value", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//7
					if(customer == null || customer.isEmpty()) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidCustomer", String.format("%s~Customer needs to be updated", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//8
					if(status != null && !(status.equals("4")) && (customer!= null && (!(customer.equals("7")) && !(customer.equals("8")))) && submitDate == null) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubmitDate", String.format("%s~Submit Date needs a value", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//9
					if(status != null && !(status.equals("4")) && approvedDate == null) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidApprovedDate", String.format("%s~Approved Date needs a value", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//10
					if(status != null && !(status.equals("4")) && (customer!= null && (!customer.equals("7"))) && cost == 0) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "CostZero", String.format("%s~Cost needs a value other than 0", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//11
					if(status != null && !(status.equals("4")) && (customer!= null && (!(customer.equals("7")) && !(customer.equals("8")))) && sell == 0) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "SellZero", String.format("%s~Sell needs a value other than 0", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					
					
					//BUA ASKED ME TO REMOVE THESE RULES FOR NOW
//					//12
//					if(invoiceNum == null || invoiceNum.isEmpty()) {
//						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidInvoiceNum", String.format("%s~Invoice number needs to be updated", currentChangeOrder.getTitle()), 0);
//						scoreYellow = true;
//						al.add(rd);
//					}						
//					
//					//13
//					if(customerCopNum == null || customerCopNum.isEmpty()) {
//						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSustomerCopNum", String.format("%s~Customer COP number needs to be updated", currentChangeOrder.getTitle()), 0);
//						al.add(rd);
//					}
//					//14  
//					if(subCoNum == null || subCoNum.isEmpty()) {
//						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubCoNum", String.format("%s~Sub CO number needs to be updated", currentChangeOrder.getTitle()), 0);
//						al.add(rd);
//					}
					
					
					//placeholder
					
					//removing these rules because submit date or approval date being earlier than sub submitted date is not an issue
					/*
					//15
					if((submitDate != null) && (subsSubmittedDate != null) && (submitDate).before(subsSubmittedDate)) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierSubmitDate", String.format("%s~Submit Date is earlier than Sub Submitted Date", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					//16
					if((approvedDate != null) && (subsSubmittedDate != null) && (approvedDate).before(subsSubmittedDate)) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierApprovedDate", String.format("%s~Approved Date is earlier than Sub Submitted Date", currentChangeOrder.getTitle()), 0);
						scoreYellow = true;
						al.add(rd);
					}
					*/
					
				}
				
				if(status != null && (status.equals("1"))){
					//If the Change order status is preparing
					RuleDetails rd = new RuleDetails("ChangeOrders", "NeedToSubmitProposal", String.format("%s~Need to Complete the change order proposal and submit", currentChangeOrder.getTitle()), changeOrderColorCode);
					if(changeOrderColorCode == 1)
						scoreRed = true;
					else
						scoreYellow = true;
					al.add(rd);
					
				}
				if(status != null && (status.equals("4"))) {
					if(approvedDate == null) {
						RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidApprovedDateRejected", String.format("%s~Change Order Rejected, provide a date in approved date", currentChangeOrder.getTitle()), changeOrderColorCode);
						if(changeOrderColorCode == 1)
							scoreRed = true;
						else
							scoreYellow = true;
						al.add(rd);
					}
					
				}
				
				if(status != null && (status.equals("2"))){ // 2 = "Submitted"
					RuleDetails rd = new RuleDetails("ChangeOrders", "NeedToApproveProposal", String.format("%s~Need to get Approval for this Change Order", currentChangeOrder.getTitle()), changeOrderColorCode);
					if(changeOrderColorCode == 1)
						scoreRed = true;
					else
						scoreYellow = true;
					al.add(rd);
					
				}
				
				//placeholder
				//If the status is approved it needs to be updated to Complete
				if(status != null && status.equals("3")) { // 3 = "Approved"
					
					RuleDetails rd = new RuleDetails("ChangeOrders", "ChangeOrderNeedsUpdate", String.format("%s~Status needs to be updated", currentChangeOrder.getTitle()), 0);
					scoreYellow = true;
					al.add(rd);
					
				}
				
				if(projectStatus != null && projectStatus == 35 && status != null && (status.equals("3"))){ // 3 = "Approved"
					RuleDetails rd = new RuleDetails("ChangeOrders", "NeedToCompleteProposal", String.format("%s~Need to Complete the Change Order", currentChangeOrder.getTitle()), changeOrderColorCode);
					if(changeOrderColorCode == 1)
						scoreRed = true;
					else
						scoreYellow = true;
					al.add(rd);
					
				}
				
				
				if(status != null && (status.equals("5"))) { // 5 == Complete
					
					if(subInvoiceStatus != null && subInvoiceStatus.equals("0")) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "subInvoiceNo", String.format("%s~Awaiting the Sub Invoice", currentChangeOrder.getTitle()), changeOrderColorCode);
						if(changeOrderColorCode == 1)
							scoreRed = true;
						else
							scoreYellow = true;
						al.add(rd);
					}
					
					if(mcsInvoiceStatus != null && mcsInvoiceStatus.equals("0")) {
						RuleDetails rd = new RuleDetails("ChangeOrders", "mcsInvoiceNo", String.format("%s~Need to invoice Customer", currentChangeOrder.getTitle()), changeOrderColorCode);
						if(changeOrderColorCode == 1)
							scoreRed = true;
						else
							scoreYellow = true;
						al.add(rd);
					}
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
				EquipmentVendor supplier = currentEquipment.getEqSupplier();
				Date estDeliveryDate = currentEquipment.getEstDeliveryDate();
				Date orderedDate = currentEquipment.getOrderedDate();
				Date actDeliveryDate = currentEquipment.getDeliveryDate();
				EquipmentStatus deliveryStatus = currentEquipment.getEqStatus();
				
				
				

				//1
				if(PoNum == null || PoNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidPo#", String.format("%s~PO # needs to be updated", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//2
				if(equipmentName == null || equipmentName.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEquipmentName", String.format("%s~Equipment Name needs to be updated", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//3
				if(description == null || description.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDescription", String.format("%s~Description needs to be updated",currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//4
				if(supplier == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidSupplier", String.format("%s~Supplier needs to be updated", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//5
				if(estDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEstDeliveryDate", String.format("%s~Estimated Delivery Date needs a value", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//6  
				if(orderedDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidOrderedDate", String.format("%s~Ordered Date needs a value", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//7 
//				if(actDeliveryDate == null) {
//					RuleDetails rd = new RuleDetails("Equipment", " InvalidActualDeliveryDate", String.format("%s~Actual Delivery Date needs a value", currentEquipment.getEquipmentName()), 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
				//8
				if(deliveryStatus == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDeliveryStatus", String.format("%s~Delivery Status must be given a value", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//9
				if((estDeliveryDate != null) && (orderedDate != null) && (estDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierEstDeliveryDate", String.format("%s~Estimated Delivery Date is earlier than Ordered Date", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//10
				if((actDeliveryDate != null) && (orderedDate != null) && (actDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierActDeliveryDate", String.format("%s~Actual Delivery Date is earlier than Ordered Date", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//11
				if((estDeliveryDate != null) && ((estDeliveryDate).before(today)) && (actDeliveryDate == null)) {
					RuleDetails rd = new RuleDetails("Equipment", "LateActualDeliveryDate", String.format("%s~Actual Delivery Date is late", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
				//12
				if((orderedDate != null) && (deliveryStatus == null)) {
					RuleDetails rd = new RuleDetails("Equipment", " UnUpdatedDeliveryStatus", String.format("%s~Delivery Status needs to be updated", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}

			}
		}

		return al;
	}
	
	public static ArrayList<RuleDetails> permitsEvaluate( Project proj) {
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		Permits permits = proj.getPermits();
		
		if(permits!=null) {
			
			//Building
			String buildingPermitRequired = permits.getBuildingPermitRequired();
			String buildingPermitStatus = permits.getBuildingPermitStatus();
			Date buildingPermitLastUpdated = permits.getBuilding();
			String buildingInspectionRequired = permits.getBuildingInspectionRequired();
			String buildingInspectionStatus = permits.getBuildingInspectionStatus();
			Date buildingInspectionLastUpdated = permits.getBuildingInspectionLastUpdated();
			
			//Ceiling
			String ceilingPermitRequired = permits.getCeilingPermitRequired();
			String ceilingPermitStatus = permits.getCeilingPermitStatus();
			Date ceilingPermitLastUpdated = permits.getCeiling();
			String ceilingInspectionRequired = permits.getCeilingInspectionRequired();
			String ceilingInspectionStatus = permits.getCeilingInspectionStatus();
			Date ceilingInspectionLastUpdated = permits.getCeilingInspectionLastUpdated();
			
			//Mechanical
			String mechanicalPermitRequired = permits.getMechanicalPermitRequired();
			String mechanicalPermitStatus = permits.getMechanicalPermitStatus();
			Date mechanicalPermitLastUpdated = permits.getMechanical();
			String mechanicalInspectionRequired = permits.getMechanicalInspectionRequired();
			String mechanicalInspectionStatus = permits.getMechanicalInspectionStatus();
			Date mechanicalInspectionLastUpdated = permits.getMechanicalInspectionLastUpdated();
			
			//Electrical
			String electricalPermitRequired = permits.getElectricalPermitRequired();
			String electricalPermitStatus = permits.getElectricalPermitStatus();
			Date electricalPermitLastUpdated = permits.getElectrical();
			String electricalInspectionRequired = permits.getElectricalInspectionRequired();
			String electricalInspectionStatus = permits.getElectricalInspectionStatus();
			Date electricalInspectionLastUpdated = permits.getElectricalInspectionLastUpdated();
			
			//Plumbing
			String plumbingPermitRequired = permits.getPlumbingPermitRequired();
			String plumbingPermitStatus = permits.getPlumbingPermitStatus();
			Date plumbingPermitLastUpdated = permits.getPlumbing();
			String plumbingInspectionRequired = permits.getPlumbingInspectionRequired();
			String plumbingInspectionStatus = permits.getPlumbingInspectionStatus();
			Date plumbingInspectionLastUpdated = permits.getPlumbingInspectionLastUpdated();
		
			//Gas
			String gasPermitRequired = permits.getGasPermitRequired();
			String gasPermitStatus = permits.getGasPermitStatus();
			Date gasPermitLastUpdated = permits.getGas();
			String gasInspectionRequired = permits.getGasInspectionRequired();
			String gasInspectionStatus = permits.getGasInspectionStatus();
			Date gasInspectionLastUpdated = permits.getGasInspectionLastUpdated();
			
			//Sprinkler
			String sprinklerPermitRequired = permits.getSprinklerPermitRequired();
			String sprinklerPermitStatus = permits.getSprinklerPermitStatus();
			Date sprinklerPermitLastUpdated = permits.getFire_sprinkler();
			String sprinklerInspectionRequired = permits.getSprinklerInspectionRequired();
			String sprinklerInspectionStatus = permits.getSprinklerInspectionStatus();
			Date sprinklerInspectionLastUpdated = permits.getSprinklerInspectionLastUpdated();
			
			//Fire_alarm
			String fireAlarmPermitRequired = permits.getFireAlarmPermitRequired();
			String fireAlarmPermitStatus = permits.getFireAlarmPermitStatus();
			Date fireAlarmPermitLastUpdated = permits.getFire_alarm();
			String fireAlarmInspectionRequired = permits.getFireAlarmInspectionRequired();
			String fireAlarmInspectionStatus = permits.getFireAlarmInspectionStatus();
			Date fireAlarmInspectionLastUpdated = permits.getFireAlarmInspectionLastUpdated();
			
			//Low_voltage	
			String lowVoltagePermitRequired = permits.getVoltagePermitRequired();
			String lowVoltagePermitStatus = permits.getVoltagePermitStatus();
			Date lowVoltagePermitLastUpdated = permits.getLow_voltage();
			String lowVoltageInspectionRequired = permits.getVoltageInspectionRequired();
			String lowVoltageInspectionStatus = permits.getVoltageInspectionStatus();
			Date lowVoltageInspectionLastUpdated = permits.getVoltageInspectionLastUpdated();
			
			//Temp Certificate of Occupation
			
			String tempCertOccupancyInspectionRequired = permits.getTempCertOccupancyInspectionRequired();
			String tempCertOccupancyInspectionStatus = permits.getTempCertOccupancyInspectionStatus();
			Date tempCertOccupancyInspectionLastUpdated = permits.getTempCertOccupancyInspectionLastUpdated();
			
			//Certificate of Occupation
			String certOccupancyInspectionRequired = permits.getCertOccupancyInspectionRequired();
			String certOccupancyInspectionStatus = permits.getCertOccupancyInspectionStatus();
			Date certOccupancyInspectionLastUpdated = permits.getCertOccupancyInspectionLastUpdated();
			
			Date buildPermExpireDate = permits.getBuildPermExpireDate();
			

			Date scheduledStartDate = proj.getScheduledStartDate();

			//Gets current time in milliseconds
			//using long because we could exceed the max integer length
			long currentMillis = new Date().getTime();
			
			//counts how many milliseconds there are in 30 days. Important that l is with 30 since the compiler HAS to know
			//we're using long numbers (using long because we could exceed the max integer length)
			long millisIn30Days = 30l * 24 * 60 * 60 * 1000;
			
			
			//schedule start date is within 30 days of today
			if(scheduledStartDate != null && scheduledStartDate.getTime() < (currentMillis + millisIn30Days) && !scheduledStartDate.before(today)) {
				
				String permitsTBD = "";
				if((buildingPermitRequired != null) && (buildingPermitRequired.equals("0"))) {
					permitsTBD += "Building, ";
				}
				
				if((ceilingPermitRequired != null) && (ceilingPermitRequired.equals("0"))) {
					permitsTBD += "Ceiling, ";
				}
				
				if((mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("0"))) {
					permitsTBD += "Mechanical, ";
				}
				
				if((electricalPermitRequired != null) && (electricalPermitRequired.equals("0"))) {
					permitsTBD += "Electrical, ";
				}
				
				if((plumbingPermitRequired != null) && (plumbingPermitRequired.equals("0"))) {
					permitsTBD += "Plumbing, ";
				}
				
				if((gasPermitRequired != null) && (gasPermitRequired.equals("0"))) {
					permitsTBD += "Gas, ";
				}
				
				if((sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("0"))) {
					permitsTBD += "Sprinkler, ";
				}
				
				if((fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("0"))) {
					permitsTBD += "Fire Alarm, ";
				}
				
				if((lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("0"))) {
					permitsTBD += "Low Voltage, ";
				}
				
				if(!permitsTBD.equals("")) {
					String result = null;
					if ((permitsTBD != null) && (permitsTBD.length() > 0)) {
					      result = permitsTBD.substring(0, permitsTBD.length() - 2);
					   }
					
					RuleDetails rd = new RuleDetails("Permits", "permitsTBD", "Scheduled start date is within a month of today, these permits are still TBD - "+result, 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				
			}

			
			if(proj.getAutofillPermits()!=null && proj.getAutofillPermits().equals("1")) {
				

				scheduledStartDate = proj.getScheduledStartDate();
				Date scheduledTurnoverDate = proj.getScheduledTurnover();
				Date actualTurnoverDate = proj.getActualTurnover();				
				

				//Building permit is issued but expiration date has not been set
				if((buildingPermitRequired != null) && (buildingPermitRequired.equals("1"))
						&& (buildingPermitStatus != null && (buildingPermitStatus.equals("Issued")) 
						&& buildPermExpireDate == null)) { 
					
					RuleDetails rd = new RuleDetails("Permits", "buildPermitExpireMonth", "Building Permit has been issued, set Building Permit Expiration Date", 1);
					scoreRed = true;
					al.add(rd);
				
				}
				
				//build permit is required and not closed and there is a building permit expiration date
				else if(buildingPermitStatus!= null && !(buildingPermitStatus.equals("Closed")) 
						&& buildingPermitRequired.equals("1") && buildPermExpireDate != null){
				
				
					//If the Building Permit Expiration Date has passed 
					if(buildPermExpireDate.before(today)) {
						
						RuleDetails rd = new RuleDetails("Permits", "buildPermitExpireMonth", "The Building Permit Expiration Date has passed and building permit status is not closed", 1);
						scoreRed = true;
						al.add(rd);
					}
					
					//if the Building Permit Expiration Date is within a month of today
					else if(buildPermExpireDate.getTime() < (currentMillis + millisIn30Days)) {
						RuleDetails rd = new RuleDetails("Permits", "buildPermitExpireMonth", "The Building Permit Expiration Date is within a month", 1);
						scoreRed = true;
						al.add(rd);
					}	
				}
				
				
				/*
				 * LATEST RULES 07/16/2020
				 * akashgurram18@gmail.com
				 * To-do -> Disable all the other old rules in permits and inspections
				 * 
				 */
				
				
				
				/* 
				 * Permit Rules for 1st Timeline --> Scheduled Start Date has passed but not the Actual Turnover Date
				 */
				
				
				if((scheduledStartDate != null && scheduledStartDate.before(today)) && !(actualTurnoverDate != null && actualTurnoverDate.before(today))) {
					
					String permitsToBeIssued = "";
					if((buildingPermitRequired != null) && (buildingPermitRequired.equals("1"))
							&& (buildingPermitStatus!= null && !(buildingPermitStatus.equals("Issued") || buildingPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Building, ";
					}
					
					if((ceilingPermitRequired != null) && (ceilingPermitRequired.equals("1"))
							&& (ceilingPermitStatus!= null && !(ceilingPermitStatus.equals("Issued") || ceilingPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Ceiling, ";
					}
					
					if((mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("1"))
							&& (mechanicalPermitStatus!= null && !(mechanicalPermitStatus.equals("Issued") || mechanicalPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Mechanical, ";
					}
					
					if((electricalPermitRequired != null) && (electricalPermitRequired.equals("1"))
							&& (electricalPermitStatus!= null && !(electricalPermitStatus.equals("Issued") || electricalPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Electrical, ";
					}
					
					if((plumbingPermitRequired != null) && (plumbingPermitRequired.equals("1"))
							&& (plumbingPermitStatus!= null && !(plumbingPermitStatus.equals("Issued") || plumbingPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Plumbing, ";
					}
					
					if((gasPermitRequired != null) && (gasPermitRequired.equals("1"))
							&& (gasPermitStatus!= null && !(gasPermitStatus.equals("Issued") || gasPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Gas, ";
					}
					
					if((sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("1"))
							&& (sprinklerPermitStatus!= null && !(sprinklerPermitStatus.equals("Issued") || sprinklerPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Sprinkler, ";
					}
					
					if((fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("1"))
							&& (fireAlarmPermitStatus!= null && !(fireAlarmPermitStatus.equals("Issued") || fireAlarmPermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Fire Alarm, ";
					}
					
					if((lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("1"))
							&& (lowVoltagePermitStatus!= null && !(lowVoltagePermitStatus.equals("Issued") || lowVoltagePermitStatus.equals("Closed")))) {
						permitsToBeIssued += "Low Voltage, ";
					}
					
					if(!permitsToBeIssued.equals("")) {
						String result = null;
						if ((permitsToBeIssued != null) && (permitsToBeIssued.length() > 0)) {
						      result = permitsToBeIssued.substring(0, permitsToBeIssued.length() - 2);
						   }
						
						RuleDetails rd = new RuleDetails("Permits", "permitsToBeIssued", "Following Permits need to be Issued - "+result, 1);
						scoreRed = true;
						al.add(rd);
					}
					
				}
				
				
				/* 
				 * Permit Rules for 2nd Timeline --> Actual Turnover Date has passed
				 */
				if( actualTurnoverDate != null && actualTurnoverDate.before(today)) {
					
					String permitsToBeClosed = "";
					if((buildingPermitRequired != null) && (buildingPermitRequired.equals("1"))
							&& (buildingPermitStatus!= null && !(buildingPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Building, ";
					}
					
					if((ceilingPermitRequired != null) && (ceilingPermitRequired.equals("1"))
							&& (ceilingPermitStatus!= null && !(ceilingPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Ceiling, ";
					}
					
					if((mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("1"))
							&& (mechanicalPermitStatus!= null && !(mechanicalPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Mechanical, ";
					}
					
					if((electricalPermitRequired != null) && (electricalPermitRequired.equals("1"))
							&& (electricalPermitStatus!= null && !(electricalPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Electrical, ";
					}
					
					if((plumbingPermitRequired != null) && (plumbingPermitRequired.equals("1"))
							&& (plumbingPermitStatus!= null && !(plumbingPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Plumbing, ";
					}
					
					if((gasPermitRequired != null) && (gasPermitRequired.equals("1"))
							&& (gasPermitStatus!= null && !(gasPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Gas, ";
					}
					
					if((sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("1"))
							&& (sprinklerPermitStatus!= null && !(sprinklerPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Sprinkler, ";
					}
					
					if((fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("1"))
							&& (fireAlarmPermitStatus!= null && !(fireAlarmPermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Fire Alarm, ";
					}
					
					if((lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("1"))
							&& (lowVoltagePermitStatus!= null && !(lowVoltagePermitStatus.equals("Closed")))) {
						permitsToBeClosed += "Low Voltage, ";
					}
					
					if(!permitsToBeClosed.equals("")) {
						String result = null;
						if ((permitsToBeClosed != null) && (permitsToBeClosed.length() > 0)) {
						      result = permitsToBeClosed.substring(0, permitsToBeClosed.length() - 2);
						   }
						
						RuleDetails rd = new RuleDetails("Permits", "permitsToBeClosed", "Following Permits need to be Closed - "+result, 1);
						scoreRed = true;
						al.add(rd);
					}
					
				}
				
				/* 
				 * Inspection Rules  --> Scheduled Turnover Date has passed
				 */
				if( scheduledTurnoverDate != null && scheduledTurnoverDate.before(today)) {
					
					String inspectionsToBeClosed = "";
					if((buildingInspectionRequired != null) && (buildingInspectionRequired.equals("1"))
							&& (buildingInspectionStatus!= null && !(buildingInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Building, ";
					}
					
					if((ceilingInspectionRequired != null) && (ceilingInspectionRequired.equals("1"))
							&& (ceilingInspectionStatus!= null && !(ceilingInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Ceiling, ";
					}
					
					if((mechanicalInspectionRequired != null) && (mechanicalInspectionRequired.equals("1"))
							&& (mechanicalInspectionStatus!= null && !(mechanicalInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Mechanical, ";
					}
					
					if((electricalInspectionRequired != null) && (electricalInspectionRequired.equals("1"))
							&& (electricalInspectionStatus!= null && !(electricalInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Electrical, ";
					}
					
					if((plumbingInspectionRequired != null) && (plumbingInspectionRequired.equals("1"))
							&& (plumbingInspectionStatus!= null && !(plumbingInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Plumbing, ";
					}
					
					if((gasInspectionRequired != null) && (gasInspectionRequired.equals("1"))
							&& (gasInspectionStatus!= null && !(gasInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Gas, ";
					}
					
					if((sprinklerInspectionRequired != null) && (sprinklerInspectionRequired.equals("1"))
							&& (sprinklerInspectionStatus!= null && !(sprinklerInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Sprinkler, ";
					}
					
					if((fireAlarmInspectionRequired != null) && (fireAlarmInspectionRequired.equals("1"))
							&& (fireAlarmInspectionStatus!= null && !(fireAlarmInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Fire Alarm, ";
					}
					
					if((lowVoltageInspectionRequired != null) && (lowVoltageInspectionRequired.equals("1"))
							&& (lowVoltageInspectionStatus!= null && !(lowVoltageInspectionStatus.equals("Complete")))) {
						inspectionsToBeClosed += "Low Voltage, ";
					}
					
					//temp certificate of occupancy
					if((tempCertOccupancyInspectionRequired != null) && (tempCertOccupancyInspectionRequired.equals("1"))
						&& (tempCertOccupancyInspectionStatus != null && !(tempCertOccupancyInspectionStatus.equals("Complete")))){
							
							inspectionsToBeClosed += "Temp Certificate of Occupancy, ";
						}
					
					//certificate of occupancy
					if((certOccupancyInspectionRequired != null) && (certOccupancyInspectionRequired.equals("1"))
						&& (certOccupancyInspectionStatus != null && !(certOccupancyInspectionStatus.equals("Complete")))){
							
							inspectionsToBeClosed += "Certificate of Occupancy, ";
						}
					
					if(!inspectionsToBeClosed.equals("")) {
						String result = null;
						if ((inspectionsToBeClosed != null) && (inspectionsToBeClosed.length() > 0)) {
						      result = inspectionsToBeClosed.substring(0, inspectionsToBeClosed.length() - 2);
						   }
						
						RuleDetails rd = new RuleDetails("Permits", "inspectionsToBeClosed", "Following Inspections need to be Scheduled and Passed - "+result, 1);
						scoreRed = true;
						al.add(rd);
					}
					
				}
				
			
			}

			
		
		}
		return al;
	}
	
	public static ArrayList<RuleDetails> closeOutEvaluate( Project proj) {
		Date scheduledTurnoverDate = proj.getScheduledTurnover();
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		
		CloseoutDetails closeout = proj.getCloseoutDetails();
		
		String hvacCloseoutStatus = closeout.getHvacCloseoutStatus();
		String refrigerationCloseoutStatus = closeout.getRefrigerationCloseoutStatus();
		
		//if the project is currently in the active stage
		if(proj.getStage().getName().equals("Active")) {
			
			//if HVAC is set to "Yes" and hvacCloseoutStatus is "No" 
			if(hvacCloseoutStatus != null && proj.getAutofillHVAC().equals("1") && hvacCloseoutStatus.equals("2")) {
				
				RuleDetails rd = new RuleDetails("CloseOut", "hvacCloseoutStatusNotSet", "Project is in active stage, HVAC is set to Yes but change order hasn't been made ", 0);
				scoreYellow = true;
				al.add(rd);	
			}
			
			//if Refrigeration is set to "Yes" and refrigerationCloseoutStatus is "No" 
			if(refrigerationCloseoutStatus != null && proj.getAutofillRefrigeration().equals("1") && refrigerationCloseoutStatus.equals("2")) {
				
				RuleDetails rd = new RuleDetails("CloseOut", "refrigerationCloseoutStatusNotSet", "Project is in active stage, Refrigeration is set to Yes but change order hasn't been made ", 0);
				scoreYellow = true;
				al.add(rd);	
			}
			
		}
		
		
		if(scheduledTurnoverDate != null && scheduledTurnoverDate.before(today)) {
			
			Long status = proj.getStatus().getId();
			
			CloseoutDetails closeOut = proj.getCloseoutDetails();
			
			Date punchListLastUpdated = closeOut.getPunchList();
			
			Date scheduledStartDate = proj.getScheduledStartDate();
			
			Date actualTurnoverDate = proj.getActualTurnover();
			
			//Gets the project type (AIA or PO). In this case we are using it to check if the project is an AIA
			ProjectClass projectType = proj.getProjectClass(); 
			
			
			//CloseOut Documents
			String hvacStartUpFormStatus = closeOut.getHVACstartupFormStatus();
			String verisaeReportStatus = closeOut.getVerisaeReportStatus();
			String alarmFormStatus = closeOut.getAlarmFormStatus();
			String pbnMTStatus = closeOut.getPbnMTStatus();
			SalvageValue salvageValue = closeOut.getSalvageValue();
			String salvageStatus = closeOut.getSalvageStatus();
			String costcoCloseoutFormStatus = closeOut.getCostcoSignoffStatus();
			String punchListStatus = closeOut.getPunchListStatus();
			String asBuiltDrawingStatus = closeOut.getAsBuiltDrawingsStatus();
			String closeOutPhotosStatus = closeOut.getCloseOutPhotosStatus();
			int numMcsCO = closeOut.getNumOfMCSChangeOrders();
			int numMcsCOCompleted = closeOut.getNumOfMCSChangeOrdersCompleted();
			
			//Final Inspections
			String buildingFinalInspectionStatus = closeOut.getBuildingFinalStatus();
			String ceilingFinalInspectionStatus = closeOut.getCeilingFinalStatus();
			String mechanicalFinalInspectionStatus = closeOut.getMechFinalStatus();
			String electricalFinalInspectionStatus = closeOut.getElecFinalStatus();
			String plumbingFinalInspectionStatus = closeOut.getPlumbingFinalStatus();
			String gasFinalInspectionStatus = closeOut.getGasFinalStatus();
			String sprinklerFinalInspectionStatus = closeOut.getSprinkleFinalStatus();
			String fireAlarmFinalInspectionStatus = closeOut.getFireAlarmFinalStatus();
			String lowVoltageFinalInspectionStatus = closeOut.getLowVolFinalStatus();
			String tempCertOccupancyStatus = closeOut.getTmpCertificateStatus();
			String certOccupancyStatus = closeOut.getCertificateStatus();
			
			//Warranty Letters 
			String mcsWarrantyStatus = closeOut.getMCSWarrantyStatus();
			String gcWarrantyStatus = closeOut.getGCWarrantyStatus();
			String mechanicalWarrantyStatus = closeOut.getMechanicalWarrantyStatus();
			String electricalWarrantyStatus = closeOut.getElectricalWarrantyStatus();
			String plumbingWarrantyStatus = closeOut.getPlumbingWarrantyStatus();
			String gasWarrantyStatus = closeOut.getGasWarrantyStatus();
			String sprinklerWarrantyStatus = closeOut.getSprinkleWarrantyStatus();
			String htiWarrantyStatus = closeOut.getHTIWarrantyStatus();
			String otherAWarrantyStatus = closeOut.getOtherWarrantyStatusA();
			String otherBWarrantyStatus = closeOut.getOtherWarrantyStatusB();
		
			//Final Liens
			String mcsLienStatus = closeOut.getMCSStatus();
			String gcLienStatus = closeOut.getGCStatus();
			String mechanicalLienStatus = closeOut.getMechanicalStatus();
			String electricalLienStatus = closeOut.getElectricalStatus();
			String plumbingLienStatus = closeOut.getPlumbingStatus();
			String gasLienStatus = closeOut.getGasStatus();
			String sprinklerLienStatus = closeOut.getSprinkleStatus();
			String htiLienStatus = closeOut.getHTIStatus();
			String otherALienStatus = closeOut.getOtherFinalLeinsStatus();
			String otherBLienStatus = closeOut.getOtherFinalLeinsBStatus();
			
			//AIA
			String substantialComplete = closeOut.getSubstantialCompletionStatus();
			String paymentOfDebtsAndClaimStatus = closeOut.getPaymentOfDebtsAndClaimsStatus();
			String releaseOfLienStatus = closeOut.getReleaseOfLiensStatus();
			String mulvannySignOffStatus = closeOut.getMulvannySignOffStatus();
			String equipmentSubmittalStatus = closeOut.getEquipmentSubmittalStatus();
			String manualStatus = closeOut.getManualStatus();
			
			//CloseOut Documents Rules
			int closeoutColorCode = 0;
			
			//35 means the project is in closeout
			if(status != null && status ==35)
				closeoutColorCode = 1;
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (costcoCloseoutFormStatus != null) && !(costcoCloseoutFormStatus.equals("2") || costcoCloseoutFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus1", "Costco Closeout SignOff Form status needs to be \"Complete\"", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (costcoCloseoutFormStatus != null) && !(costcoCloseoutFormStatus.equals("2") || costcoCloseoutFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus2", "Costco Closeout SignOff Form status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (punchListStatus != null) && !(punchListStatus.equals("2") || punchListStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus1", "Punch list status needs to be \"Complete\"", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (punchListStatus != null) && !(punchListStatus.equals("2") || punchListStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus2", "Punch list status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);		
			
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (asBuiltDrawingStatus != null) && !(asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus1", "As Built Drawing status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (asBuiltDrawingStatus != null) && !(asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus2", "As Built Drawing status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (closeOutPhotosStatus != null) && !(closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus1", "Close Out photo status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (closeOutPhotosStatus != null) && !(closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus2", "Close Out photo status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (hvacStartUpFormStatus != null) && !(hvacStartUpFormStatus.equals("2") || hvacStartUpFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm1", "Hvac Startup form status needs to be \"Complete\"", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (hvacStartUpFormStatus != null) && !(hvacStartUpFormStatus.equals("2") || hvacStartUpFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm2", "Hvac Startup form status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (verisaeReportStatus != null) && !(verisaeReportStatus.equals("2") || verisaeReportStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus1", "Verisae Report status needs to be \"Complete\"", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (verisaeReportStatus != null) && !(verisaeReportStatus.equals("2") || verisaeReportStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus2", "Verisae Report status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (alarmFormStatus != null) && !(alarmFormStatus.equals("2") || alarmFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus1", "Alarm form status needs to be updated \"Complete\"", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (alarmFormStatus != null) && !(alarmFormStatus.equals("2") || alarmFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus2", "Alarm form status needs to be \"Complete\"", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			

			//If refrigeration is yes and salvage status is incomplete
			if(status != null && status == 35 && proj.getAutofillRefrigeration() != null && !(proj.getAutofillRefrigeration().equals("0")) && salvageStatus != null && !(salvageStatus.equals("2") || salvageStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidsalvageStatus", "Salvage status needs to be \"Complete\" ", 1);
				scoreRed = true;
				al.add(rd);
			}
			
			//If refrigeration is yes and PBN/MT Status is incomplete
			if(status != null && status == 35 && proj.getAutofillRefrigeration() != null && !(proj.getAutofillRefrigeration().equals("0")) && pbnMTStatus != null && !(pbnMTStatus.equals("2") || pbnMTStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidpbnMTStatus", "PBN/MT Screenshot status needs to be \"Complete\" ", 1);
				scoreRed = true;
				al.add(rd);
			}
						
			
			
			/*
			 * Final inspections is being removed from closeout so these rules aren't needed anymore
			 * 
			 */
			
			//Final Inspections Rules
			/*
			//1
			if(buildingFinalInspectionStatus!=null && buildingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidBuildFinalInspStatus", "Building Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//2
			if(ceilingFinalInspectionStatus!=null && ceilingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCeilFinalInspStatus", "Ceiling Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//3
			if(mechanicalFinalInspectionStatus!=null && mechanicalFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidMechFinalInspStatus", "Mechanical Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//4
			if(electricalFinalInspectionStatus!=null && electricalFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidElecFinalInspStatus", "Electrical Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//5
			if(plumbingFinalInspectionStatus!=null && plumbingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPlumbFinalInspStatus", "Plumbing Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//6
			if(gasFinalInspectionStatus!=null && gasFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidGasFinalInspStatus", "Gas Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//7
			if(sprinklerFinalInspectionStatus!=null && sprinklerFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidSprinkFinalInspStatus", "Sprinkler Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//8
			if(fireAlarmFinalInspectionStatus!=null && fireAlarmFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidFireFinalInspStatus", "Fire Alarm Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//9
			if(lowVoltageFinalInspectionStatus!=null && lowVoltageFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidLowVoltFinalInspStatus", "Low Voltage Final Inspection Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			*/
			/*
			 *Updating the below two rules on 08/29/2020 As per Andy and Bua's requirement.
			 *Rule will be triggered if status is either 2,4,6, i.e., InComplete, Required or TBD.		
			 */
			/*
			//10
			if(tempCertOccupancyStatus!=null && (tempCertOccupancyStatus.equals("2") || tempCertOccupancyStatus.equals("4") || tempCertOccupancyStatus.equals("6")) ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidTmpCertOccuStatus", "Temporary certifcate of occupancy Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//11
			if(certOccupancyStatus!=null && (certOccupancyStatus.equals("2") || certOccupancyStatus.equals("4")|| certOccupancyStatus.equals("6")) ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCertOccuStatus", "Certifcate of occupancy Status needs to be \"Complete\" ", 0);
				scoreYellow = true;
				al.add(rd);
			}
			*/
			
			//if the project is an AIA contract and in closeout, make extra aia score card check
			if(projectType != null && projectType.getName().equals("AIA Contract") && status != null && status == 35) {
				
				
				//If MCS Warranty status is not Complete or N/A, creates a red score card 
				if(!(mcsWarrantyStatus.equals("2") || mcsWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "mcsWarrantyRequired", "MCS Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}

				//If GC Warranty status is not Complete or N/A, creates a red score card 
				if(!(gcWarrantyStatus.equals("2") || gcWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "GCWarrantyRequired", "GC Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Electrical Warranty status is not Complete or N/A, creates a red score card 
				if(!(mechanicalWarrantyStatus.equals("2") || mechanicalWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "MechanicalWarrantyRequired", "Mechanical Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Electrical Warranty status is not Complete or N/A, creates a red score card 
				if(!(electricalWarrantyStatus.equals("2") || electricalWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "ElectricalWarrantyRequired", "Electrical Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Plumbing Warranty status is not Complete or N/A, creates a red score card 
				if(!(plumbingWarrantyStatus.equals("2") || plumbingWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "PlumbingWarrantyRequired", "Plumbing Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Gas Warranty status is not Complete or N/A, creates a red score card 
				if(!(gasWarrantyStatus.equals("2") || gasWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "GasWarrantyRequired", "Gas Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Sprinkler Warranty status is not Complete or N/A, creates a red score card 
				if(!(sprinklerWarrantyStatus.equals("2") || sprinklerWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "SprinklerWarrantyRequired", "Sprinkler Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Polymer Floors Warranty status is not Complete or N/A, creates a red score card 
				if(!(htiWarrantyStatus.equals("2") || htiWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "PolymerFloorsWarrantyRequired", "Polymer Floors Warranty status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Other Warranty (B) status is not Complete or N/A, creates a red score card 
				if(!(otherAWarrantyStatus.equals("2") || otherAWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "OtherWarrantyARequired", "Other Warranty (A) status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Other Warranty (B) status is not Complete or N/A, creates a red score card 
				if(!(otherBWarrantyStatus.equals("2") || otherBWarrantyStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "OtherWarrantyBRequired", "Other Warranty (B) status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If MCS Lien status is not Complete or N/A, creates a red score card 
				if(!(mcsLienStatus.equals("2") || mcsLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "mcsLienRequired", "MCS Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If GC Lien status is not Complete or N/A, creates a red score card 
				if(!(gcLienStatus.equals("2") || gcLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "gcLienRequired", "GC Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Mechanical Lien status is not Complete or N/A, creates a red score card 
				if(!(mechanicalLienStatus.equals("2") || mechanicalLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "mechanicalLienRequired", "Mechanical Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Electrical Lien status is not Complete or N/A, creates a red score card 
				if(!(electricalLienStatus.equals("2") || electricalLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "ElectricalLienRequired", "Electrical Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Plumbing Lien status is not Complete or N/A, creates a red score card 
				if(!(plumbingLienStatus.equals("2") || plumbingLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "PlumbingLienRequired", "Plumbing Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Gas Lien status is not Complete or N/A, creates a red score card 
				if(!(gasLienStatus.equals("2") || gasLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "gasLienRequired", "Gas Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Sprinkler Lien status is not Complete or N/A, creates a red score card 
				if(!(sprinklerLienStatus.equals("2") || sprinklerLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "sprinklerLienRequired", "Sprinkler Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Polymer Floor Lien status is not Complete or N/A, creates a red score card 
				if(!(htiLienStatus.equals("2") || htiLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "polymerFloorLienRequired", "Polymer Floor Lien status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Other Lien status (A) is not Complete or N/A, creates a red score card 
				if(!(otherALienStatus.equals("2") || otherALienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusARequired", "Other Lien status (A) needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				

				//If Other Lien status (B) is not Complete or N/A, creates a red score card 
				if(!(otherBLienStatus.equals("2") || otherBLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "Other Lien status (B) needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}

				
				//If G704 - Certificate of Substantial Completion  is not Complete or N/A, creates a red score card 
				if(!(substantialComplete.equals("2") || substantialComplete.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "G704 - Certificate of Substantial Completion status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}

				//If G706 - Affidavit of Payment of Debts and Claims is not Complete or N/A, creates a red score card 
				if(!(paymentOfDebtsAndClaimStatus.equals("2") || paymentOfDebtsAndClaimStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "G706 - Affidavit of Payment of Debts and Claims status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				//If G706A - Contractor's Lien Releases  is not Complete or N/A, creates a red score card 
				if(!(releaseOfLienStatus.equals("2") || releaseOfLienStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "G706A - Contractor's Lien Releases needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				//If MG2 Project Sign-off is not Complete or N/A, creates a red score card 
				if(!(mulvannySignOffStatus.equals("2") || mulvannySignOffStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "MG2 Project Sign-off needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				//If Equipment Submittal status is not Complete or N/A, creates a red score card 
				if(!(equipmentSubmittalStatus.equals("2") || equipmentSubmittalStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "Equipment Submittal status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				//If Operations and Maintenance Manuals status is not Complete or N/A, creates a red score card 
				if(!(manualStatus.equals("2") || manualStatus.equals("3"))) {
				
					RuleDetails rd = new RuleDetails("CloseOut", "otherLienStatusBRequired", "Operations and Maintenance Manuals status needs to be \"Complete\" ", 1);
					scoreRed = true;
					al.add(rd);
					
				}
				
			}
			
			
			if(scoreRed)
			{
				proj.setMediumScore(2);
			}
			else if(scoreYellow) {
				proj.setMediumScore(1);
			}
			else {
				proj.setMediumScore(0);
			}
			
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			session.clear();
			session.update(proj);
			tx.commit();
			return al;
		}

		if(scoreRed)
		{
			proj.setMediumScore(2);
		}
		else if(scoreYellow) {
			proj.setMediumScore(1);
		}
		else {
			proj.setMediumScore(0);
		}
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(proj);
		tx.commit();
		return al;
		
		
	}
}


