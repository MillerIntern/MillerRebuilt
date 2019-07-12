package services;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import projectObjects.ChangeOrder;
import projectObjects.NewEquipment;
import projectObjects.Permits;
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
					RuleDetails rd = new RuleDetails("Tasks", "IncorrectDueDate", String.format("%s ~ Due date must be later than initiated date ",currentTask.getTitle()), 0);
					al.add(rd);
				}
				if(dueDate.before(today) && taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("Tasks", "PassedDueDate", String.format("%s ~ Task is Late", currentTask.getTitle()), 1);
					al.add(rd);
				}
				if(taskStatus.equals("Open")) {
					RuleDetails rd = new RuleDetails("Tasks", "OpenTask", String.format("%s ~ Task Needs to be completed", currentTask.getTitle()), 0);
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
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidMCSCo#", String.format("%s ~ MCS CO # needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//2
				if(title == null || title.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidTitle", String.format("%s ~ Title needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//3
				if(description == null || description.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidDescription", String.format("%s ~ Description needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//4
				if(status == null || status.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidStatus", String.format("%s ~ Status needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//5
				if(subNames == null || subNames.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubNames", String.format("%s ~ Sub Name(s) needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//6
				if(subsSubmittedDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubsSubmittedDate", String.format("%s ~ Subs Submitted Date needs a value", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//7
				if(customer == null || customer.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidCustomer", String.format("%s ~ Customer needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//8
				if(submitDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubmitDate", String.format("%s ~ Submit Date needs a value", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//9
				if(approvedDate == null) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidApprovedDate", String.format("%s ~ Approved Date needs a value", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//10
				if(cost == 0) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "CostZero", String.format("%s ~ Cost needs a value other than 0", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//11
				if(sell == 0) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "SellZero", String.format("%s ~ Sell needs a value other than 0", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//12
				if(invoiceNum == null || invoiceNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidInvoiceNum", String.format("%s ~ Invoice number needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//13
				if(customerCopNum == null || customerCopNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSustomerCopNum", String.format("%s ~ Customer COP number needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//14  
				if(subCoNum == null || subCoNum.isEmpty()) {
					RuleDetails rd = new RuleDetails("ChangeOrders", " InvalidSubCoNum", String.format("%s ~ Sub CO number needs to be updated", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//15
				if((submitDate != null) && (subsSubmittedDate != null) && (submitDate).before(subsSubmittedDate)) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierSubmitDate", String.format("%s ~ Submit Date is earlier than Sub Submitted Date", currentChangeOrder.getTitle()), 0);
					al.add(rd);
				}
				//16
				if((approvedDate != null) && (subsSubmittedDate != null) && (approvedDate).before(subsSubmittedDate)) {
					RuleDetails rd = new RuleDetails("ChangeOrders", "EarlierApprovedDate", String.format("%s ~ Approved Date is earlier than Sub Submitted Date", currentChangeOrder.getTitle()), 0);
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
					RuleDetails rd = new RuleDetails("Equipment", " InvalidPo#", String.format("%s ~ PO # needs to be updated", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//2
				if(equipmentName == null || equipmentName.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEquipmentName", String.format("%s ~ Equipment Name needs to be updated", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//3
				if(description == null || description.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDescription", String.format("%s ~ Description needs to be updated",currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//4
				if(supplier == null || supplier.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidSupplier", String.format("%s ~ Supplier needs to be updated", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//5
				if(estDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidEstDeliveryDate", String.format("%s ~ Estimated Delivery Date needs a value", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//6  
				if(orderedDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidOrderedDate", String.format("%s ~ Ordered Date needs a value", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//7 
				if(actDeliveryDate == null) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidActualDeliveryDate", String.format("%s ~ Actual Delivery Date needs a value", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//8
				if(deliveryStatus == null || deliveryStatus.isEmpty()) {
					RuleDetails rd = new RuleDetails("Equipment", " InvalidDeliveryStatus", String.format("%s ~ Delivery Status must be given a value", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//9
				if((estDeliveryDate != null) && (orderedDate != null) && (estDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierEstDeliveryDate", String.format("%s ~ Estimated Delivery Date is earlier than Ordered Date", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//10
				if((actDeliveryDate != null) && (orderedDate != null) && (actDeliveryDate).before(orderedDate)) {
					RuleDetails rd = new RuleDetails("Equipment", "EarlierActDeliveryDate", String.format("%s ~ Actual Delivery Date is earlier than Ordered Date", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}
				//11
				if((estDeliveryDate != null) && ((estDeliveryDate).before(today)) && (actDeliveryDate == null)) {
					RuleDetails rd = new RuleDetails("Equipment", "LateActualDeliveryDate", String.format("%s ~ Actual Delivery date is late", currentEquipment.getEquipmentName()), 1);
					al.add(rd);
				}
				//12
				if((orderedDate != null) && (deliveryStatus == null || deliveryStatus.isEmpty())) {
					RuleDetails rd = new RuleDetails("Equipment", " UnUpdatedDeliveryStatus", String.format("%s ~ Delivery Status needs to be updated", currentEquipment.getEquipmentName()), 0);
					al.add(rd);
				}

			}
		}

		return al;
	}
	
	public static ArrayList<RuleDetails> permitsInfoEvaluate( Project proj) {
		ArrayList<RuleDetails> al=new ArrayList<RuleDetails>();
		Permits permits = proj.getPermits();
		
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
		
//		//OtherA
//		String otherAPermitRequired = permits.getOtherAPermit();
//		String otherAPermitStatus = permits.getOtherAPermitStatus();
//		Date otherAPermitLastUpdated = permits.getOtherA();
//		String otherAInspectionRequired = permits.getOtherAInspectionRequired();
//		String otherAInspectionStatus = permits.getOtherAInspectionStatus();
//		Date otherAInspectionLastUpdated = permits.getOtherAInspectionLastUpdated();
//		
//		//Other
//		String otherBPermitRequired = permits.getOtherBPermit();
//		String otherBPermitStatus = permits.getOtherBPermitStatus();
//		Date otherBPermitLastUpdated = permits.getOtherB();
//		String otherBInspectionRequired = permits.getOtherBInspectionRequired();
//		String otherBInspectionStatus = permits.getOtherBInspectionStatus();
//		Date otherBInspectionLastUpdated = permits.getOtherBInspectionLastUpdated();
		
		//1
		if(!(buildingPermitRequired.equals(buildingInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "BuildReqInspNotEqual", "Building Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//2
		if(!(ceilingPermitRequired.equals(ceilingInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "CeilReqInspNotEqual", "Ceiling Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//3
		if(!(mechanicalPermitRequired.equals(mechanicalInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "MechReqInspNotEqual", "Mechanical Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//4
		if(!(electricalPermitRequired.equals(electricalInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "ElecReqInspNotEqual", "Electrical Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//5
		if(!(plumbingPermitRequired.equals(plumbingInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "PlumbReqInspNotEqual", "Plumbing Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//6
		if(!(gasPermitRequired.equals(gasInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "GasReqInspNotEqual", "Gas Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//7
		if(!(sprinklerPermitRequired.equals(sprinklerInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "SprinklerReqInspNotEqual", "Sprinkler Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//8
		if(!(fireAlarmPermitRequired.equals(fireAlarmInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "FireReqInspNotEqual", "FireAlarm Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//9
		if(!(lowVoltagePermitRequired.equals(lowVoltageInspectionRequired))) {
			RuleDetails rd = new RuleDetails("Permits", "LowVoltReqInspNotEqual", "Low Voltage Permit Required and Inspection need to be equal", 1);
			al.add(rd);
		}
		
		//10
		if( (buildingPermitRequired != null) && (buildingPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "BuildPermitReqTBD", "Building Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//11
		if( (ceilingPermitRequired != null) && (ceilingPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "CeilPermitReqTBD", "Ceiling Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//12
		if( (mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "MechPermitReqTBD", "Mechanical Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//13
		if( (electricalPermitRequired != null) && (electricalPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "ElecPermitReqTBD", "Electrical Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//14
		if( (plumbingPermitRequired != null) && (plumbingPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "PlumbPremitReqTBD", "Plumbing Premit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//15
		if( (gasPermitRequired != null) && (gasPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "GasPermitReqTBD", "Gas Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//16
		if( (sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "SprinPermitReqTBD", "Sprinkler Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//17
		if( (fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "FirePermitReqTBD", "FireAlarm Permit Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		//18
		if( (lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "LowVoltPermitReqTBD", "Low Voltage Permit Requiredmust be either Yes or No", 0);
			al.add(rd);
		}
		
		//20
		if( (buildingInspectionRequired != null) && (buildingInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "BuildInspReqTBD", "Building Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//21
		if( (ceilingInspectionRequired != null) && (ceilingInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "CeilInspReqTBD", "Ceiling Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//22
		if( (mechanicalInspectionRequired != null) && (mechanicalInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "MechInspReqTBD", "Mechanical Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//23
		if( (electricalInspectionRequired != null) && (electricalInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "ElecInspReqTBD", "Electrical Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//24
		if( (plumbingInspectionRequired != null) && (plumbingInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "PlumbInspReqTBD", "Plumbing Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//25
		if( (gasInspectionRequired != null) && (gasInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "GasInspReqTBD", "Gas Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//26
		if( (sprinklerInspectionRequired != null) && (sprinklerInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "SprinkInspReqTBD", "Sprinkler Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//27
		if( (fireAlarmInspectionRequired != null) && (fireAlarmInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "FireInspReqTBD", "FireAlarm Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		//28
		if( (lowVoltageInspectionRequired != null) && (lowVoltageInspectionRequired.equals("0"))) {
			RuleDetails rd = new RuleDetails("Permits", "LowVoltInspReqTBD", "Low Voltage Inspection Required must be either Yes or No", 0);
			al.add(rd);
		}
		
		
		//For some reason, the previous developer gave the TBD's below a value "TBD" Which is a string. Woudlve been simple if it stayed 0.
		
		//29
		if( (buildingPermitStatus!= null) && (buildingPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "BuildPermitStatusTBD", "Building Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//30
		if( (ceilingPermitStatus!= null) && (ceilingPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "CeilPermitStatusTBD", "Ceiling Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//31
		if( (mechanicalPermitStatus!= null) && (mechanicalPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "MechPermitStatusTBD", "Mechanical Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//32
		if( (electricalPermitStatus!= null) && (electricalPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "ElecPermitStatusTBD", "Electrical Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//33
		if( (plumbingPermitStatus!= null) && (plumbingPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "PlumbPermitStatusTBD", "Plumbing Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//34
		if( (gasPermitStatus!= null) && (gasPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "GasPermitStatusTBD", "Gas Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//35
		if( (sprinklerPermitStatus!= null) && (sprinklerPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "SprinklerPermitStatusTBD", "Sprinkler Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//36
		if( (fireAlarmPermitStatus!= null) && (fireAlarmPermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "FirePermitStatusTBD", "FireAlarm Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		//37
		if( (lowVoltagePermitStatus!= null) && (lowVoltagePermitStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "LowVoltPermitStatusTBD", "Low Voltage Permit Status must be either Yes or No", 0);
			al.add(rd);
		}
		
		
		
		//38
		if( (buildingInspectionStatus!= null) && (buildingInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "BuildInspStatusTBD", "Building Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//39
		if( (ceilingInspectionStatus!= null) && (ceilingInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "CeilInspStatusTBD", "Ceiling Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//40
		if( (mechanicalInspectionStatus!= null) && (mechanicalInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "MechInspStatusTBD", "Mechanical Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//41
		if( (electricalInspectionStatus!= null) && (electricalInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "ElecInspStatusTBD", "Electrical Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//42
		if( (plumbingInspectionStatus!= null) && (plumbingInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "PlumbInspStatusTBD", "Plumbing Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//43
		if( (gasInspectionStatus!= null) && (gasInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "GasInspStatusTBD", "Gas Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//44
		if( (sprinklerInspectionStatus!= null) && (sprinklerInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "SprinklerInspStatusTBD", "Sprinkler Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//45
		if( (fireAlarmInspectionStatus!= null) && (fireAlarmInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "FireInspStatusTBD", "FireAlarm Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		//46
		if( (lowVoltageInspectionStatus!= null) && (lowVoltageInspectionStatus.equals("TBD"))) {
			RuleDetails rd = new RuleDetails("Permits", "LowVoltInspStatusTBD", "Low Voltage Inspection Status must be either Yes or No", 0);
			al.add(rd);
		}
		
		return al;
		
	}
}


