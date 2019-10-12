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
			RuleDetails rd = new RuleDetails("GeneralInfo", "permits TBD", "Permits must be either Yes or No", 0);
			scoreYellow = true;
			al.add(rd);
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
		if((stage.equals("Budgetary")) && !(status == 4 || status == 11 || status == 1 || status == 3)) {
			RuleDetails rd = new RuleDetails("GeneralInfo", " InvalidaBudgetaryStage", "Status must be either Awaiting Direction, Awaiting Drawings, Preparing Proposal, or Proposal Submitted if the Stage is Budgetary", 0);
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
	
	public static ArrayList<RuleDetails> financialEvaluate(Project proj){
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
		
		return al;
	}
	
	public static ArrayList<RuleDetails> schedulingEvaluate(Project proj){
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		String projectStage = proj.getStage().getName();		
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
		if(proposalDueDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ProposalDueDate", "Proposal Due Date needs a value", 0);
			scoreYellow = true;
			al.add(rd);
		}
		//3
		if(proposalSubmittedDate == null) {
			RuleDetails rd = new RuleDetails("Scheduling", "ProposalSubmittedDate", "Proposal Submitted Date needs a value", 0);
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
		if((status != null) && (status == 35) && (scheduledTurnoverDate != null) && ((scheduledTurnoverDate).before(today)) && (actualTurnoverDate == null)) {
			RuleDetails rd = new RuleDetails("Scheduling", "LateActualTurnoverdDate", "Actual Turnover Date is late", 1);
			scoreRed = true;
			al.add(rd);
		}
		
		if(projectStage.equals("Budgetary")) {  //Budgetary Rules will be checked only if the project stage is Budgetary.	
			//15
			if(budgetaryDueDate == null) {
				RuleDetails rd = new RuleDetails("Scheduling", "BudgetaryDueDate", "Budgetary Due Date needs a value", 0);
				scoreYellow = true;
				al.add(rd);
			}
			//16
			if(budgetarySubmittedDate == null) {
				RuleDetails rd = new RuleDetails("Scheduling", "BudgetarySubmittedDate", "Budgetary Submitted Date needs a value", 0);
				scoreYellow = true;
				al.add(rd);
			}
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
				String customer = currentChangeOrder.getType(); //This is the Customer Field in ChangeOrder
				System.out.println("CUSTOMER IS " + customer);
				Date submitDate = currentChangeOrder.getSubmittedDate();
				Date approvedDate = currentChangeOrder.getApprovedDate();
				double cost = currentChangeOrder.getCost();
				double sell = currentChangeOrder.getSell();
				String invoiceNum = currentChangeOrder.getInvoiceNumber();
				String customerCopNum = currentChangeOrder.getCustomerCOPnum();
				String subCoNum = currentChangeOrder.getSubCO();
				
				if(!(status.equals("1"))) {   // "1" here means Preparing 
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
					if(status != null && !(status.equals("4")) && cost == 0) {
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
				
				else {
					//If the Change order status is preparing
					RuleDetails rd = new RuleDetails("ChangeOrders", "NeedToSubmitProposal", String.format("%s~Need to complete change order proposal and submit", currentChangeOrder.getTitle()), 0);
					scoreYellow = true;
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
				if(actDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidActualDeliveryDate", String.format("%s~Actual Delivery Date needs a value", currentEquipment.getEquipmentName()), 0);
					scoreYellow = true;
					al.add(rd);
				}
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
				//1
				if(buildingPermitRequired != null && buildingInspectionRequired != null &&(!(buildingPermitRequired.equals(buildingInspectionRequired)))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildReqInspNotEqual", "Building Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//2
				if(ceilingPermitRequired != null && ceilingInspectionRequired != null && (!(ceilingPermitRequired.equals(ceilingInspectionRequired)))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilReqInspNotEqual", "Ceiling Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//3
				if(mechanicalPermitRequired != null && mechanicalInspectionRequired != null &&(!(mechanicalPermitRequired.equals(mechanicalInspectionRequired)))) {
					RuleDetails rd = new RuleDetails("Permits", "MechReqInspNotEqual", "Mechanical Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//4
				if(electricalPermitRequired != null && electricalInspectionRequired != null && !(electricalPermitRequired.equals(electricalInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecReqInspNotEqual", "Electrical Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//5
				if(plumbingPermitRequired != null && plumbingInspectionRequired != null && !(plumbingPermitRequired.equals(plumbingInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbReqInspNotEqual", "Plumbing Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//6
				if(gasPermitRequired != null && gasInspectionRequired != null && !(gasPermitRequired.equals(gasInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "GasReqInspNotEqual", "Gas Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//7
				if(sprinklerPermitRequired != null && sprinklerInspectionRequired != null && !(sprinklerPermitRequired.equals(sprinklerInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinklerReqInspNotEqual", "Sprinkler Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//8
				if(fireAlarmPermitRequired != null && fireAlarmInspectionRequired != null && !(fireAlarmPermitRequired.equals(fireAlarmInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "FireReqInspNotEqual", "Fire Alarm Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//9
				if(lowVoltagePermitRequired != null && lowVoltageInspectionRequired != null && !(lowVoltagePermitRequired.equals(lowVoltageInspectionRequired))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltReqInspNotEqual", "Low Voltage Permit Required and Inspection need to be equal", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//10
				if( (buildingPermitRequired != null) && (buildingPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildPermitReqTBD", "Building Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//11
				if( (ceilingPermitRequired != null) && (ceilingPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilPermitReqTBD", "Ceiling Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//12
				if( (mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechPermitReqTBD", "Mechanical Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//13
				if( (electricalPermitRequired != null) && (electricalPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecPermitReqTBD", "Electrical Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//14
				if( (plumbingPermitRequired != null) && (plumbingPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbPremitReqTBD", "Plumbing Premit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//15
				if( (gasPermitRequired != null) && (gasPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasPermitReqTBD", "Gas Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//16
				if( (sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinPermitReqTBD", "Sprinkler Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//17
				if( (fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "FirePermitReqTBD", "Fire Alarm Permit Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//18
				if( (lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltPermitReqTBD", "Low Voltage Permit Requiredmust be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				//19
				if( (buildingInspectionRequired != null) && (buildingInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildInspReqTBD", "Building Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//20
				if( (ceilingInspectionRequired != null) && (ceilingInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilInspReqTBD", "Ceiling Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//21
				if( (mechanicalInspectionRequired != null) && (mechanicalInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechInspReqTBD", "Mechanical Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//22
				if( (electricalInspectionRequired != null) && (electricalInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecInspReqTBD", "Electrical Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//23
				if( (plumbingInspectionRequired != null) && (plumbingInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbInspReqTBD", "Plumbing Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//24
				if( (gasInspectionRequired != null) && (gasInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasInspReqTBD", "Gas Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//25
				if( (sprinklerInspectionRequired != null) && (sprinklerInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinkInspReqTBD", "Sprinkler Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//26
				if( (fireAlarmInspectionRequired != null) && (fireAlarmInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "FireInspReqTBD", "Fire Alarm Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//27
				if( (lowVoltageInspectionRequired != null) && (lowVoltageInspectionRequired.equals("0"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltInspReqTBD", "Low Voltage Inspection Required must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				
				//For some reason, the previous developer gave the TBD's below a value "TBD" Which is a string. Would've been simple if it stayed 0.
				
				//28
				if( (buildingPermitStatus!= null) && (buildingPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildPermitStatusTBD", "Building Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//29
				if( (ceilingPermitStatus!= null) && (ceilingPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilPermitStatusTBD", "Ceiling Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//30
				if( (mechanicalPermitStatus!= null) && (mechanicalPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechPermitStatusTBD", "Mechanical Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//31
				if( (electricalPermitStatus!= null) && (electricalPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecPermitStatusTBD", "Electrical Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//32
				if( (plumbingPermitStatus!= null) && (plumbingPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbPermitStatusTBD", "Plumbing Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//33
				if( (gasPermitStatus!= null) && (gasPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasPermitStatusTBD", "Gas Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//34
				if( (sprinklerPermitStatus!= null) && (sprinklerPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinklerPermitStatusTBD", "Sprinkler Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//35
				if( (fireAlarmPermitStatus!= null) && (fireAlarmPermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "FirePermitStatusTBD", "Fire Alarm Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//36
				if( (lowVoltagePermitStatus!= null) && (lowVoltagePermitStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltPermitStatusTBD", "Low Voltage Permit Status must be either Yes or No", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				
				
				//37
				if( (buildingInspectionStatus!= null) && (buildingInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildInspStatusTBD", "Building Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//38
				if( (ceilingInspectionStatus!= null) && (ceilingInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilInspStatusTBD", "Ceiling Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//39
				if( (mechanicalInspectionStatus!= null) && (mechanicalInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechInspStatusTBD", "Mechanical Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//40
				if( (electricalInspectionStatus!= null) && (electricalInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecInspStatusTBD", "Electrical Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//41
				if( (plumbingInspectionStatus!= null) && (plumbingInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbInspStatusTBD", "Plumbing Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//42
				if( (gasInspectionStatus!= null) && (gasInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasInspStatusTBD", "Gas Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//43
				if( (sprinklerInspectionStatus!= null) && (sprinklerInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinklerInspStatusTBD", "Sprinkler Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//44
				if( (fireAlarmInspectionStatus!= null) && (fireAlarmInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "FireInspStatusTBD", "Fire Alarm Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				//45
				if( (lowVoltageInspectionStatus!= null) && (lowVoltageInspectionStatus.equals("TBD"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltInspStatusTBD", "Low Voltage Inspection Status must be Updated", 0);
					scoreYellow = true;
					al.add(rd);
				}
				
				
				
				//46
				if((buildingPermitRequired != null) && (buildingPermitStatus != null) && (buildingPermitRequired.equals("1")) && (buildingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildPermStatusNA", "Building Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//47
				if((ceilingPermitRequired != null) && (ceilingPermitStatus != null) && (ceilingPermitRequired.equals("1")) && (ceilingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilPermStatusNA", "Ceiling Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//48
				if((mechanicalPermitRequired != null) && (mechanicalPermitStatus != null) && (mechanicalPermitRequired.equals("1")) && (mechanicalPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechPermStatusNA", "Mechanical Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//49
				if((electricalPermitRequired != null) && (electricalPermitStatus != null) && (electricalPermitRequired.equals("1")) && (electricalPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecPermStatusNA", " ELectrical Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//50
				if((plumbingPermitRequired != null) && (plumbingPermitStatus != null) && (plumbingPermitRequired.equals("1")) && (plumbingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbPermStatusNA", " Plumbing Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//51
				if((gasPermitRequired != null) && (gasPermitStatus != null) && (gasPermitRequired.equals("1")) && (gasPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasPermStatusNA", " Gas Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//52
				if((sprinklerPermitRequired != null) && (sprinklerPermitStatus != null) && (sprinklerPermitRequired.equals("1")) && (sprinklerPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinPermStatusNA", "Sprinkler Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//53
				if((fireAlarmPermitRequired != null) && (fireAlarmPermitStatus != null) && (fireAlarmPermitRequired.equals("1")) && (fireAlarmPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "FirePermStatusNA", "Fire Alarm Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//54
				if((lowVoltagePermitRequired != null) && (lowVoltagePermitStatus != null) && (lowVoltagePermitRequired.equals("1")) && (lowVoltagePermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltPermStatusNA", "Low Voltage Permit Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				
				
				//55
				if((buildingInspectionRequired != null) && (buildingInspectionStatus != null) && (buildingInspectionRequired.equals("1")) && (buildingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildInspStatusNA", "Building Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//56
				if((ceilingInspectionRequired != null) && (ceilingInspectionStatus != null) && (ceilingInspectionRequired.equals("1")) && (ceilingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilInspStatusNA", "Ceiling Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//57
				if((mechanicalInspectionRequired != null) && (mechanicalInspectionStatus != null) && (mechanicalInspectionRequired.equals("1")) && (mechanicalInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechInspStatusNA", "Mechanical Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//58
				if((electricalInspectionRequired != null) && (electricalInspectionStatus != null) && (electricalInspectionRequired.equals("1")) && (electricalInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecInspStatusNA", "Electrical Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//59
				if((plumbingInspectionRequired != null) && (plumbingInspectionStatus != null) && (plumbingInspectionRequired.equals("1")) && (plumbingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumInspStatusNA", "Plumbing Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//60
				if((gasInspectionRequired != null) && (gasInspectionStatus != null) && (gasInspectionRequired.equals("1")) && (gasInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasInspStatusNA", "Gas Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//61
				if((sprinklerInspectionRequired != null) && (sprinklerInspectionStatus != null) && (sprinklerInspectionRequired.equals("1")) && (sprinklerInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinInspStatusNA", "Sprinkler Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//62
				if((fireAlarmInspectionRequired != null) && (fireAlarmInspectionStatus != null) && (fireAlarmInspectionRequired.equals("1")) && (fireAlarmInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "FireInspStatusNA", "Fire Alarm Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//63
				if((lowVoltageInspectionRequired != null) && (lowVoltageInspectionStatus != null) && (lowVoltageInspectionRequired.equals("1")) && (lowVoltageInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltInspStatusNA", "Low Voltage Inspection Status cannot be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}

				
				
				//64
				if((buildingPermitRequired != null) && (buildingPermitStatus != null) && (buildingPermitRequired.equals("2")) && !(buildingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildPermStatusNotNA", "Building Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//65
				if((ceilingPermitRequired != null) && (ceilingPermitStatus != null) && (ceilingPermitRequired.equals("2")) && !(ceilingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilPermStatusNotNA", "Ceiling Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//66
				if((mechanicalPermitRequired != null) && (mechanicalPermitStatus != null) && (mechanicalPermitRequired.equals("2")) && !(mechanicalPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechPermStatusNotNA", "Mechanical Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//67
				if((electricalPermitRequired != null) && (electricalPermitStatus != null) && (electricalPermitRequired.equals("2")) && !(electricalPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecPermStatusNotNA", " ELectrical Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//68
				if((plumbingPermitRequired != null) && (plumbingPermitStatus != null) && (plumbingPermitRequired.equals("2")) && !(plumbingPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumbPermStatusNotNA", " Plumbing Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//69
				if((gasPermitRequired != null) && (gasPermitStatus != null) && (gasPermitRequired.equals("2")) && !(gasPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasPermStatusNotNA", " Gas Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//70
				if((sprinklerPermitRequired != null) && (sprinklerPermitStatus != null) && (sprinklerPermitRequired.equals("2")) && !(sprinklerPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinPermStatusNotNA", "Sprinkler Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//71
				if((fireAlarmPermitRequired != null) && (fireAlarmPermitStatus != null) && (fireAlarmPermitRequired.equals("2")) && !(fireAlarmPermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "FirePermStatusNotNA", "Fire Alarm Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//72
				if((lowVoltagePermitRequired != null) && (lowVoltagePermitStatus != null) && (lowVoltagePermitRequired.equals("2")) && !(lowVoltagePermitStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltPermStatusNotNA", "Low Voltage Permit Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				
				
				//73
				if((buildingInspectionRequired != null) && (buildingInspectionStatus != null) && (buildingInspectionRequired.equals("2")) && !(buildingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "BuildInspStatusNotNA", "Building Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//74
				if((ceilingInspectionRequired != null) && (ceilingInspectionStatus != null) && (ceilingInspectionRequired.equals("2")) && !(ceilingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "CeilInspStatusNotNA", "Ceiling Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//75
				if((mechanicalInspectionRequired != null) && (mechanicalInspectionStatus != null) && (mechanicalInspectionRequired.equals("2")) && !(mechanicalInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "MechInspStatusNotNA", "Mechanical Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//76
				if((electricalInspectionRequired != null) && (electricalInspectionStatus != null) && (electricalInspectionRequired.equals("2")) && !(electricalInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "ElecInspStatusNotNA", "Electrical Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//77
				if((plumbingInspectionRequired != null) && (plumbingInspectionStatus != null) && (plumbingInspectionRequired.equals("2")) && !(plumbingInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "PlumInspStatusNotNA", "Plumbing Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//78
				if((gasInspectionRequired != null) && (gasInspectionStatus != null) && (gasInspectionRequired.equals("2")) && !(gasInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "GasInspStatusNotNA", "Gas Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//79
				if((sprinklerInspectionRequired != null) && (sprinklerInspectionStatus != null) && (sprinklerInspectionRequired.equals("2")) && !(sprinklerInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "SprinInspStatusNotNA", "Sprinkler Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//80
				if((fireAlarmInspectionRequired != null) && (fireAlarmInspectionStatus != null) && (fireAlarmInspectionRequired.equals("2")) && !(fireAlarmInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "FireInspStatusNotNA", "Fire Alarm Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
				
				//81
				if((lowVoltageInspectionRequired != null) && (lowVoltageInspectionStatus != null) && (lowVoltageInspectionRequired.equals("2")) && !(lowVoltageInspectionStatus.equals("N/A"))) {
					RuleDetails rd = new RuleDetails("Permits", "LowVoltInspStatusNotNA", "Low Voltage Inspection Status must be N/A", 1);
					scoreRed = true;
					al.add(rd);
				}
			
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
			
			//1
			if(status != null && status == 35 && hvacStartUpFormStatus!=null && hvacStartUpFormStatus.equals("6")) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidHvacStartUpForm", "Hvac Startup form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
			//2
			if(status != null && status == 35 && verisaeReportStatus!=null && verisaeReportStatus.equals("6")) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidVerisaeReportStatus", "Verisae Report status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
			//3
			if(alarmFormStatus!=null && alarmFormStatus.equals("6")) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAlarmFormStatus", "Alarm form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
			//4 Updating this rule such that rule is ignored if Refrigeration is No
			if(proj.getAutofillRefrigeration() != null && !(proj.getAutofillRefrigeration().equals("0")) && salvageValue != null && salvageValue.getValue() <= 0) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidsalvageValueAmount", "Salvage value amount needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);
			}
			
//			//5
//			if((punchListStatus != null) && (punchListStatus.equals("6")) ) {					
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus", "Punch list status needs to be updated -Documents", 0);
//				scoreYellow = true;
//				al.add(rd);		
//			}
//			
//			//6
//			if((asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("6")) ) {					
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus", "As Built Drawing status needs to be updated -Documents", 0);
//				scoreYellow = true;
//				al.add(rd);		
//			}
//			
//			//7
//			if((closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("6")) ) {					
//				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus", "Close Out photo status needs to be updated -Documents", 0);
//				scoreYellow = true;
//				al.add(rd);		
//			}
			//commenting it now until the fix in counting the CO's is perfect
			//8
//			if(numMcsCO != numMcsCOCompleted) {
//				RuleDetails rd = new RuleDetails("CloseOut", "mcsChangeOrdersIncomplete", "All change orders must be completed -Documents", 1);
//				scoreRed = true;
//				al.add(rd);
//			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) && scheduledStartDate != null && scheduledStartDate.before(today) && (costcoCloseoutFormStatus != null) && (costcoCloseoutFormStatus.equals("2") || costcoCloseoutFormStatus.equals("4") || costcoCloseoutFormStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus1", "Costco Closeout SignOff Form status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) && scheduledStartDate != null && scheduledStartDate.before(today) && (punchListStatus != null) && (punchListStatus.equals("2") || punchListStatus.equals("4") || punchListStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus1", "Punch list status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(!(actualTurnoverDate != null && actualTurnoverDate.before(today)) && scheduledStartDate != null && scheduledStartDate.before(today) && (asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("4") || asBuiltDrawingStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus1", "As Built Drawing status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && !(actualTurnoverDate != null && actualTurnoverDate.before(today)) && scheduledStartDate != null && scheduledStartDate.before(today) && (closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("4") || closeOutPhotosStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus1", "Close Out photo status needs to be updated -Documents", 0);
				scoreYellow = true;
				al.add(rd);	
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) && (costcoCloseoutFormStatus != null) && (costcoCloseoutFormStatus.equals("2") || costcoCloseoutFormStatus.equals("4") || costcoCloseoutFormStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidcostcoCloseoutFormStatus2", "Costco Closeout SignOff Form status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) && (punchListStatus != null) && (punchListStatus.equals("2") || punchListStatus.equals("4") || punchListStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidPunchListStatus2", "Punch list status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			if(actualTurnoverDate != null && actualTurnoverDate.before(today) && (asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("4") || asBuiltDrawingStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidAsBuildDrwaingStatus2", "As Built Drawing status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);		
				
			}
			
			if(status != null && status == 35 && actualTurnoverDate != null && actualTurnoverDate.before(today) && (closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("4") || closeOutPhotosStatus.equals("6"))) {
				RuleDetails rd = new RuleDetails("CloseOut", "invalidCloseOutPhotoStatus2", "Close Out photo status needs to be updated -Documents", 1);
				scoreRed = true;
				al.add(rd);	
				
			}
			
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
			System.out.println("Score Red is");
			System.out.println(scoreRed);
			System.out.println("Score Yellow is");
			System.out.println(scoreYellow);
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
		System.out.println("Score Red is");
		System.out.println(scoreRed);
		System.out.println("Score Yellow is");
		System.out.println(scoreYellow);
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


