package services;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import projectObjects.Project;
import projectObjects.RuleDetails;
import projectObjects.Task;
import projectObjects.TaskStatus;
public class ProjectNewRuleService {
	
	
	
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
	
	public static ArrayList<RuleDetails> financialInfoEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		int actualInvoice = proj.getInvoiced();
		int shouldInvoice = proj.getShouldInvoice();
		String cost = proj.getCost();
		String customerNumber = proj.getCustomerNumber();
		
		//1
		if(actualInvoice == 0) {
			RuleDetails rd = new RuleDetails("FinancialInfo", "ActiualInvioceZero", "Actual Invoice needs a value other than 0", 0);
			al.add(rd);
		}
		//2
		if(shouldInvoice == 0) {
			RuleDetails rd = new RuleDetails("FinancialInfo", "ShouldInvioceZero", "Should Invoice needs a value other than 0", 0);
			al.add(rd);
		}
		//3
		if(cost.isEmpty()) {
			RuleDetails rd = new RuleDetails("FinancialInfo", "CostEmpty", "Cost needs a value", 0);
			al.add(rd);
		}
		//4 Need to review if customerNumber is needed
//		if(customerNumber.isEmpty()) {
//			RuleDetails rd = new RuleDetails("FinancialInfo", "CustomerNumberEmpty", "Customer Number needs a value", 1);
//			al.add(rd);
//		}
		//5
		if(actualInvoice != shouldInvoice) {
			RuleDetails rd = new RuleDetails("FinancialInfo", "ActualShouldNotEqual", "Actual Invoice and Should Invoice need to be equal", 0);
			al.add(rd);
		}
		return al;
	}
	
	public static ArrayList<RuleDetails> schedulingInfoEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		Date today = new Date();
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
			RuleDetails rd = new RuleDetails("SchedulingInfo", "SiteSuveyDate", "Site Survey Date needs a value", 0);
			al.add(rd);
		}
		//2
		if(budgetaryDueDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "BudgetaryDueDate", "Budgetary Due Date needs a value", 0);
			al.add(rd);
		}
		//3
		if(budgetarySubmittedDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "BudgetarySubmittedDate", "Budgetary Submitted Date needs a value", 0);
			al.add(rd);
		}
		//4
		if(proposalDueDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "ProposalDueDate", "Proposal Due Date needs a value", 0);
			al.add(rd);
		}
		//5
		if(proposalSubmittedDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "ProposalSubmittedDate", "Proposal Submitted Date needs a value", 0);
			al.add(rd);
		}
		//6
		if(scheduledStartDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "ScheduledStartDate", "Scheduled Start Date needs a value", 0);
			al.add(rd);
		}
		//7
		if(scheduledTurnoverDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "ScheduledTurnoverDate", "Scheduled Turnover Date needs a value", 0);
			al.add(rd);
		}
		//8
		if(actualTurnoverDate == null) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "ActualTurnoverDate", "Actual Turnover Date needs a value", 0);
			al.add(rd);
		}
		//9
		if((siteSurveyDate != null) && (projectInitiatedDate != null) && (siteSurveyDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierSiteSurveyDate", "Site Survey Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//10
		if((budgetaryDueDate != null) && (projectInitiatedDate != null) && (budgetaryDueDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierBudgetaryDueDate", "Budgetary Due Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//11
		if((budgetarySubmittedDate != null) && (projectInitiatedDate != null) && (budgetarySubmittedDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierBudgetarySubmittedDate", "Budgetary Submitted Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//12
		if((proposalDueDate != null) && (projectInitiatedDate != null) && (proposalDueDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierProposalDueDate", "Proposal Due Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//13
		if((proposalSubmittedDate != null) && (projectInitiatedDate != null) && (proposalSubmittedDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierProposalSubmittedDate", "Proposal Submitted Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//14
		if((scheduledStartDate != null) && (projectInitiatedDate != null) && (scheduledStartDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierScheduledStartDate", "Scheduled Start Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//15
		if((scheduledTurnoverDate != null) && (projectInitiatedDate != null) && (scheduledTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierScheduledTurnoverDate", "Scheduled Turnover Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//16
		if((actualTurnoverDate != null) && (projectInitiatedDate != null) && (actualTurnoverDate).before(projectInitiatedDate)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "EarlierActualTurnoverDate", "Actual Turnover Date is earlier than Project Initiation Date", 0);
			al.add(rd);
		}
		//17
		if((budgetaryDueDate != null) && ((budgetaryDueDate).after(today)) && (budgetarySubmittedDate == null)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "LateBudgetarySubmittedDate", "Budgetary Submitted date is late", 1);
			al.add(rd);
		}
		//18
		if((proposalDueDate != null) && ((proposalDueDate).after(today)) && (proposalSubmittedDate == null)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "LateProposalSubmittedDate", "Proposal Submitted date is late", 1);
			al.add(rd);
		}
		//19
		if((scheduledTurnoverDate != null) && ((scheduledTurnoverDate).after(today)) && (actualTurnoverDate == null)) {
			RuleDetails rd = new RuleDetails("SchedulingInfo", "LateActualTurnoverdDate", "Actual Turnover date is late", 1);
			al.add(rd);
		}
		return al;
	}
	public static ArrayList<RuleDetails> tasksInfoEvaluate(List<Task> task){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		if(task.size() != 0) {
			for(int i=0; i<task.size(); i++) {
				Date today = new Date();
				Task currentTask = task.get(i);
				Date dueDate = currentTask.getDueDate();
				Date initiatedDate = currentTask.getAssignedDate();
				String taskStatus = currentTask.getTaskStatus().getStatus();
				if(dueDate.before(initiatedDate)) {
					RuleDetails rd = new RuleDetails("TasksInfo", "IncorrectDueDate", String.format("TITLE:%s Due date must be later than initiated date ",currentTask.getTitle()), 0);
					al.add(rd);
				}
				if(dueDate.before(today) && taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("TasksInfo", "PassedDueDate", String.format("TITLE:%s Task is Late", currentTask.getTitle()), 1);
					al.add(rd);
				}
				if(taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("TasksInfo", "OpenTask", String.format("TITLE:%s Task Needs to be completed", currentTask.getTitle()), 0);
					al.add(rd);
				}
			}
		}

		return al;
	}
	

}


