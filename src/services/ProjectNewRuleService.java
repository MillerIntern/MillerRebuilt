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
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectStatus;
import projectObjects.RuleDetails;
import projectObjects.SalvageValue;
import projectObjects.Task;
import projectObjects.TaskStatus;
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
			if(!(stage.equals("Budgetary")) && !(stage.equals("Proposal"))){
				RuleDetails rd = new RuleDetails("GeneralInfo", "permits TBD", "Permits must be either Yes or No", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
		}
		//2
		if(hvac == null|| hvac.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "HVAC TBD", "HVAC must be either Yes or No", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//3
		if(refrigeration == null || refrigeration.equals("2")) {
			RuleDetails rd = new RuleDetails("GeneralInfo", "Refrigeration TBD", "Refrigeration must be either Yes or No", 0);
			scoreYellow = true;
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
		if((stage.equals("Active")) && !(status == 4 || status == 11 || status == 30 || status == 35 || status == 29 || status == 26)) {
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
	
	public static ArrayList<RuleDetails> financialEvaluate(Project proj, List<PendingInvoice> pendInvs){
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
						" has been completed, please update the \"Actual Turnover\" date and change the \"Status\" to \"Closeout\".", 1);
				scoreRed = true;
				al.add(rd);
			}
			else {
				if((status != null) && !(status == 35)) {
					RuleDetails rd = new RuleDetails("Scheduling", "LateCloseout", "Scheduled Turnover date has passed. If the project "
							+ "has been completed, please change the \"Status\" to \"Closeout\".", 1);
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
					
					//3 //Updating this rule such that task needs to be completed will be shown only if the task is not late
					if(!(dueDate != null && taskStatus != null && dueDate.before(today) && taskStatus.equals("Open"))) {
						if(taskStatus != null && taskStatus.equals("Open")) {
							RuleDetails rd = new RuleDetails("Tasks", "OpenTask", String.format("%s~Task Needs to be completed", currentTask.getTitle()), 0);
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
					
				}
				
				if(status != null && (status.equals("1"))){
					//If the Change order status is preparing
					RuleDetails rd = new RuleDetails("ChangeOrders", "NeedToSubmitProposal", String.format("%s~Need to complete the change order proposal and submit", currentChangeOrder.getTitle()), changeOrderColorCode);
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
			

			
//			//OtherA
//			String otherAPermitRequired = permits.getOtherAPermit();
//			String otherAPermitStatus = permits.getOtherAPermitStatus();
//			Date otherAPermitLastUpdated = permits.getOtherA();
//			String otherAInspectionRequired = permits.getOtherAInspectionRequired();
//			String otherAInspectionStatus = permits.getOtherAInspectionStatus();
//			Date otherAInspectionLastUpdated = permits.getOtherAInspectionLastUpdated();
//			
//			//Other
//			String otherBPermitRequired = permits.getOtherBPermit();
//			String otherBPermitStatus = permits.getOtherBPermitStatus();
//			Date otherBPermitLastUpdated = permits.getOtherB();
//			String otherBInspectionRequired = permits.getOtherBInspectionRequired();
//			String otherBInspectionStatus = permits.getOtherBInspectionStatus();
//			Date otherBInspectionLastUpdated = permits.getOtherBInspectionLastUpdated();
			
			if(proj.getAutofillPermits()!=null && proj.getAutofillPermits().equals("1")) {
				

				
			
			}

			
		
		}
		return al;
	}
	
	public static ArrayList<RuleDetails> closeOutEvaluate( Project proj) {
		Date scheduledTurnoverDate = proj.getScheduledTurnover();
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		if(scheduledTurnoverDate != null && scheduledTurnoverDate.before(today)) {
			
			Long status = proj.getStatus().getId();
			
			CloseoutDetails closeOut = proj.getCloseoutDetails();
			
			Date punchListLastUpdated = closeOut.getPunchList();
			
			Date scheduledStartDate = proj.getScheduledStartDate();
			
			Date actualTurnoverDate = proj.getActualTurnover();
			
			
			//CloseOut Documents
			String hvacStartUpFormStatus = closeOut.getHVACstartupFormStatus();
			String verisaeReportStatus = closeOut.getVerisaeReportStatus();
			String alarmFormStatus = closeOut.getAlarmFormStatus();
			SalvageValue salvageValue = closeOut.getSalvageValue();
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
			
			//Warranty Letters and Final Liens
			String mcsWarrantyStatus = closeOut.getMCSWarrantyStatus();
			String gcWarrantyStatus = closeOut.getGCWarrantyStatus();
			String mechanicalWarrantyStatus = closeOut.getMechanicalWarrantyStatus();
			String electricalWarrantyStatus = closeOut.getElectricalWarrantyStatus();
			String plumbingWarrantyStatus = closeOut.getPlumbingWarrantyStatus();
			String gasWarrantyStatus = closeOut.getGasWarrantyStatus();
			String sprinklerWarrantyStatus = closeOut.getSprinkleWarrantyStatus();
			String htiWarrantyStatus = closeOut.getHTIWarrantyStatus();
//			String otherAWarrantyStatus = closeOut.getOtherWarrantyStatusA();
//			String otherBWarrantyStatus = closeOut.getOtherWarrantyStatusB();
		
			String mcsLienStatus = closeOut.getMCSStatus();
			String gcLienStatus = closeOut.getGCStatus();
			String mechanicalLienStatus = closeOut.getMechanicalStatus();
			String electricalLienStatus = closeOut.getElectricalStatus();
			String plumbingLienStatus = closeOut.getPlumbingStatus();
			String gasLienStatus = closeOut.getGasStatus();
			String sprinklerLienStatus = closeOut.getSprinkleStatus();
			String htiLienStatus = closeOut.getHTIStatus();
//			String otherALienStatus = closeOut.getOtherFinalLeinsStatus();
//			String otherBLienStatus = closeOut.getOtherFinalLeinsBStatus();
			
			//CloseOut Documents Rules
			int closeoutColorCode = 0;
			if(status != null && status ==35)
				closeoutColorCode = 1;
			

			//COSTCO CLOSEOUT SIGNOFF FORM 			
//			if(costcoCloseoutFormStatus!=null && !(costcoCloseoutFormStatus.equals("1") || costcoCloseoutFormStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus", "Costco Closeout SignOff Form status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (costcoCloseoutFormStatus != null) && !(costcoCloseoutFormStatus.equals("1") || costcoCloseoutFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus1", "Scheduled Start Date has passed, Costco Closeout SignOff Form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (costcoCloseoutFormStatus != null) && !(costcoCloseoutFormStatus.equals("1") || costcoCloseoutFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus2", "Actual Turnover Date has passed, Costco Closeout SignOff Form status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			
			
			//PUNCH LIST	
//			if(punchListStatus!=null && !(punchListStatus.equals("1") || punchListStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus", "Punch list status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (punchListStatus != null) && !(punchListStatus.equals("1") || punchListStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus1", "Scheduled Start Date has passed, Punch list status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (punchListStatus != null) && !(punchListStatus.equals("1") || punchListStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus2", "Actual Turnover Date has passed, Punch list status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			
			//AS-BUILT DRAWINGS
//			if(asBuiltDrawingStatus!=null && !(asBuiltDrawingStatus.equals("1") || asBuiltDrawingStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus", "As Built Drawing status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (asBuiltDrawingStatus != null) && !(asBuiltDrawingStatus.equals("1") || asBuiltDrawingStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus1", "Scheduled Start Date has passed, As Built Drawing status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (asBuiltDrawingStatus != null) && !(asBuiltDrawingStatus.equals("1") || asBuiltDrawingStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus2", "Actual Turnover Date has passed, As Built Drawing status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			
			//CLOSEOUT PHOTOS
//			if(closeOutPhotosStatus!=null && !(closeOutPhotosStatus.equals("1") || closeOutPhotosStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus", "Closeout photos status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (closeOutPhotosStatus != null) && !(closeOutPhotosStatus.equals("1") || closeOutPhotosStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus1", "Scheduled Start Date has passed, Close Out photo status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (closeOutPhotosStatus != null) && !(closeOutPhotosStatus.equals("1") || closeOutPhotosStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus2", "Actual Turnover Date has passed, Close Out photo status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			
			//HVAC STARTUP FORM
//			if(hvacStartUpFormStatus!=null && !(hvacStartUpFormStatus.equals("1") || hvacStartUpFormStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm", "Hvac Startup form status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (hvacStartUpFormStatus != null) && !(hvacStartUpFormStatus.equals("1") || hvacStartUpFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm1", "Scheduled Start Date has passed, Hvac Startup form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (hvacStartUpFormStatus != null) && !(hvacStartUpFormStatus.equals("1") || hvacStartUpFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm2", "Actual Turnover Date has passed, Hvac Startup form status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			//VERISAE REPORT
//			if(verisaeReportStatus!=null && !(verisaeReportStatus.equals("1") || verisaeReportStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus", "Verisae Report status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (verisaeReportStatus != null) && !(verisaeReportStatus.equals("1") || verisaeReportStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus1", "Scheduled Start Date has passed, Verisae Report status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (verisaeReportStatus != null) && !(verisaeReportStatus.equals("1") || verisaeReportStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus2", "Actual Turnover Date has passed, Verisae Report status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
			
			//ALARM FORM
//			if(alarmFormStatus!=null && !(alarmFormStatus.equals("1") || alarmFormStatus.equals("3"))) {
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus", "Alarm form status needs to be updated -Documents", closeoutColorCode);
//				scoreYellow = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) 
					&& scheduledStartDate != null && scheduledStartDate.before(today) 
					&& (alarmFormStatus != null) && !(alarmFormStatus.equals("1") || alarmFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus1", "Scheduled Start Date has passed, Alarm form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) 
					&& (alarmFormStatus != null) && !(alarmFormStatus.equals("1") || alarmFormStatus.equals("3"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus2", "Actual Turnover Date has passed, Alarm form status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			

		
			

			//SALVAGE VALUE 
			//4 Updating this rule such that rule is ignored if Refrigeration is No
			if(proj.getAutofillRefrigeration() != null && !(proj.getAutofillRefrigeration().equals("0")) && salvageValue != null && salvageValue.getValue() <= 0) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidsalvageValueAmount", "Salvage value amount needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);
			}
			

			//commenting it now until the fix in counting the CO's is perfect
			//8
//			if(numMcsCO != numMcsCOCompleted) {
//				RuleDetails rd = new RuleDetails("CloseOut", "mcsChangeOrdersIncomplete", "All change orders must be completed -Documents", 1);
//				scoreRed = true;
//				al.add(rd);
//			}
			

			

			

			
			//Final Inspections Rules
			
			//1
			if(buildingFinalInspectionStatus!=null && buildingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidBuildFinalInspStatus", "Building Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//2
			if(ceilingFinalInspectionStatus!=null && ceilingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCeilFinalInspStatus", "Ceiling Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//3
			if(mechanicalFinalInspectionStatus!=null && mechanicalFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidMechFinalInspStatus", "Mechanical Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//4
			if(electricalFinalInspectionStatus!=null && electricalFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidElecFinalInspStatus", "Electrical Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//5
			if(plumbingFinalInspectionStatus!=null && plumbingFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPlumbFinalInspStatus", "Plumbing Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//6
			if(gasFinalInspectionStatus!=null && gasFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidGasFinalInspStatus", "Gas Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//7
			if(sprinklerFinalInspectionStatus!=null && sprinklerFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidSprinkFinalInspStatus", "Sprinkler Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//8
			if(fireAlarmFinalInspectionStatus!=null && fireAlarmFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidFireFinalInspStatus", "Fire Alarm Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//9
			if(lowVoltageFinalInspectionStatus!=null && lowVoltageFinalInspectionStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidLowVoltFinalInspStatus", "Low Voltage Final Inspection Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//10
			if(tempCertOccupancyStatus!=null && tempCertOccupancyStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidTmpCertOccuStatus", "Temporary certifcate of occupancy Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//11
			if(certOccupancyStatus!=null && certOccupancyStatus.equals("6") ) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCertOccuStatus", "Certifcate of occupancy Status needs to be updated -Final Inspections", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
			
			
			
			//CANCELING THESE RULES FOR NOW AS PER BUA'S REQUEST
			
//			if(proj.getProjectClass().getId() == 2)
//			{
//				//Warranty Rules
//				
//				//1
//				if(mcsWarrantyStatus != null && (mcsWarrantyStatus.equals("6") || mcsWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mcsWarrantyRequired", "MCS Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//2
//				if(gcWarrantyStatus != null && (gcWarrantyStatus.equals("6") || gcWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gcWarrantyRequired", "GC Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//3
//				if(mechanicalWarrantyStatus != null && (mechanicalWarrantyStatus.equals("6") || mechanicalWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mechWarrantyRequired", "Mechanical Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//4
//				if(electricalWarrantyStatus != null && (electricalWarrantyStatus.equals("6") || electricalWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "elecWarrantyRequired", "Electrical Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//5
//				if(plumbingWarrantyStatus != null && (plumbingWarrantyStatus.equals("6") || plumbingWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "plumbWarrantyRequired", "Plumbing Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//						
//				//6
//				if(gasWarrantyStatus != null && (gasWarrantyStatus.equals("6"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gasWarrantyRequired", "Gas Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//7
//				if(sprinklerWarrantyStatus != null && (sprinklerWarrantyStatus.equals("6") || sprinklerWarrantyStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "sprinkWarrantyRequired", "Sprinkler Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//8
//				if(htiWarrantyStatus != null && (htiWarrantyStatus.equals("6"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "htiWarrantyRequired", "HTI Warranty needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//Lien Rules
//				
//				//1
//				if(mcsLienStatus != null && (mcsLienStatus.equals("6") || mcsLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mcsLienRequired", "MCS Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//2
//				if(gcLienStatus != null && (gcLienStatus.equals("6") || gcLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gcLienRequired", "GC Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//3
//				if(mechanicalLienStatus != null && (mechanicalLienStatus.equals("6") || mechanicalLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mechLienRequired", "Mechanical Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//4
//				if(electricalLienStatus != null && (electricalLienStatus.equals("6") || electricalLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "elecLienRequired", "Electrical Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//5
//				if(plumbingLienStatus != null && (plumbingLienStatus.equals("6") || plumbingLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "plumbLienRequired", "Plumbing Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//						
//				//6
//				if(gasLienStatus != null && (gasLienStatus.equals("6"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gasLienRequired", "Gas Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//7
//				if(sprinklerLienStatus != null && (sprinklerLienStatus.equals("6") || sprinklerLienStatus.equals("3"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "sprinkLienRequired", "Sprinkler Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//8
//				if(htiLienStatus != null && (htiLienStatus.equals("6"))) {
//					RuleDetails rd = new RuleDetails("CloseOut", "htiLienRequired", "HTI Lien needs to be completed -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//
//				
//			}
//			
//			if(proj.getProjectClass().getId() !=2) {
//				//Warranty
//				//1
//				if(mcsWarrantyStatus != null && mcsWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mcsWarrantyNA", "MCS Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//2
//				if(gcWarrantyStatus != null && gcWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gcWarrantyNA", "GC Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//3
//				if(mechanicalWarrantyStatus != null && mechanicalWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mechWarrantyNA", "Mechanical Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//4
//				if(electricalWarrantyStatus != null && electricalWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "elecWarrantyNA", "Electrical Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//5
//				if(plumbingWarrantyStatus != null && plumbingWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "plumbWarrantyNA", "Plumbing Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//6
//				if(gasWarrantyStatus != null && gasWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gasWarrantyNA", "Gas Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//7
//				if(sprinklerWarrantyStatus != null && sprinklerWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "sprinkWarrantyNA", "Sprinkler Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//8
//				if(htiWarrantyStatus != null && htiWarrantyStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "htiWarrantyNA", "HTI Warranty must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//Lien
//				//1
//				if(mcsLienStatus != null && mcsLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mcsLienNA", "MCS Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//2
//				if(gcLienStatus != null && gcLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gcLienNA", "GC Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//3
//				if(mechanicalLienStatus != null && mechanicalLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "mechLienNA", "Mechanical Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//4
//				if(electricalLienStatus != null && electricalLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "elecLienNA", "Electrical Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//5
//				if(plumbingLienStatus != null && plumbingLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "plumbLienNA", "Plumbing Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//6
//				if(gasLienStatus != null && gasLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "gasLienNA", "Gas Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//7
//				if(sprinklerLienStatus != null && sprinklerLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "sprinkLienNA", "Sprinkler Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				//8
//				if(htiLienStatus != null && htiLienStatus.equals("3")) {
//					RuleDetails rd = new RuleDetails("CloseOut", "htiLienNA", "HTI Lien must be equal to N/A -Warranty", 0);
//					scoreYellow = true;
//					al.add(rd);
//				}
//				
//				
//				
//			}

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


