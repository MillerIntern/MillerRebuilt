package services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import projectObjects.RuleDetails;
import projectObjects.SalvageValue;
import projectObjects.Task;


public class ProjectNewRuleColorService {
	static Date today = new Date();
	static boolean taskBreak = false;
	static boolean equipmentBreak = false;
	static boolean changeOrderBreak = false;
	public static HashMap<String, String> generalInfoColor(String[] projects) {
		 HashMap<String, String> projectsIdColor = new HashMap<String, String>();

			for(int i=0;i<projects.length; i++) {

				projectObjects.Project proj = null;
				try 
				{
				 proj = (projectObjects.Project) ProjectObjectService.get(Long.parseLong(projects[i]), "Project");
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				
				List<Task> task = ProjectObjectService.getAllTasks(Long.parseLong(projects[i]));
				List<ChangeOrder> changeOrder = ProjectObjectService.getAllChangeOrders(Long.parseLong(projects[i]));
				List<NewEquipment> equipment = ProjectObjectService.getAllNewEquipment(Long.parseLong(projects[i]));

		String scoreColor = "green";
		
		
		
		int mcsNumber = proj.getMcsNumber();
		String projectManager = proj.getProjectManagers().getName();
		String projectSupervisor = proj.getSupervisors().iterator().next().getName();
		String stage = proj.getStage().getName();
		Long status = proj.getStatus().getId();
		String hvac = proj.getAutofillHVAC();
		String refrigeration = proj.getAutofillRefrigeration();
		String Gpermits = proj.getAutofillPermits();
		int mediumScore = 0 ;
		//GENERAL RULES
		if(Gpermits == null || Gpermits.equals("0")) {
			scoreColor = "yellow";
		}
		//2
		if(hvac == null|| hvac.equals("2")) {
			scoreColor = "yellow";
		}
		//3
		if(refrigeration == null || refrigeration.equals("2")) {
			scoreColor = "yellow";
		}
		//4
		if(projectManager == projectSupervisor) {
			scoreColor = "yellow";
		}
		//5
		if(mcsNumber == 0 || mcsNumber == -1) {
			scoreColor = "yellow";
		}
		//6
		if((stage.equals("Active")) && !(status == 4 || status == 11 || status == 30 || status == 35 || status == 29 || status == 26)) {
			scoreColor = "yellow";
		}
		//7
		if((stage.equals("Budgetary")) && !(status == 4 || status == 11 || status == 1 || status == 3)) {
			scoreColor = "yellow";
		}
		//8
		//Stage Cancelled or On Hold
		//9
		if((stage.equals("Closed")) && !(status == 35)) {
			scoreColor = "yellow";
		}
		//10
		if((stage.equals("Proposal")) && !(status == 4 || status == 11 || status == 30 || status == 34 || status == 1 || status == 3)) {
			scoreColor = "yellow";
		}	
		
		
		//FINANCIAL RULES
		
		int actualInvoice = proj.getInvoiced();
		int shouldInvoice = proj.getShouldInvoice();
		String cost = proj.getCost();
		String customerNumber = proj.getCustomerNumber();
		
		//1
		if(actualInvoice == 0) {
			scoreColor = "yellow";
		}
		//2
		if(shouldInvoice == 0) {
			scoreColor = "yellow";
		}
		
		//Removing this rule for now as per Andy's Instruction
//		//3
//		if(cost.isEmpty()) {
//		scoreColor = "yellow";
//		}

		//4
		if(actualInvoice != shouldInvoice) {
			scoreColor = "yellow";
		}
		
		
		/*
		 * //5 Need to review if customerNumber is needed if(customerNumber.isEmpty()) {
		 * RuleDetails rd = new RuleDetails("FinancialInfo", "CustomerNumberEmpty",
		 * "Customer Number needs a value", 1); al.add(rd); }
		 */
		
		
		//SCHEDULING RULES
		
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
		
		
		//1
//		if(siteSurveyDate == null ) {
//		scoreColor = "yellow";	
//		}

		//2
		if(proposalDueDate == null) {
			scoreColor = "yellow";
		}
		//3
		if(proposalSubmittedDate == null) {
			scoreColor = "yellow";
		}
		//4
		if(scheduledStartDate == null) {
			scoreColor = "yellow";
		}
		//5
		if(scheduledTurnoverDate == null) {

		}
		//6
		if((scheduledTurnoverDate != null) && (scheduledTurnoverDate.before(today))) {
			if(actualTurnoverDate == null) {
				scoreColor = "yellow";
			}
		}
		

		//IGNORING THIS RULE FOR NOW AS PER ANDY'S INSTRUCTION
		/*
		 * //7 if((siteSurveyDate != null) && (projectInitiatedDate != null) &&
		 * (siteSurveyDate).before(projectInitiatedDate)) { RuleDetails rd = new
		 * RuleDetails("Scheduling", "EarlierSiteSurveyDate",
		 * "Site Survey Date is earlier than Project Initiation Date", 0); al.add(rd); }
		 */

		//8
		if((proposalDueDate != null) && (projectInitiatedDate != null) && (proposalDueDate).before(projectInitiatedDate)) {
			scoreColor = "yellow";
		}
		//9
		if((proposalSubmittedDate != null) && (projectInitiatedDate != null) && (proposalSubmittedDate).before(projectInitiatedDate)) {
			scoreColor = "yellow";
		}
		//10
		if((scheduledStartDate != null) && (projectInitiatedDate != null) && (scheduledStartDate).before(projectInitiatedDate)) {
			scoreColor = "yellow";
		}
		//11
		if((scheduledTurnoverDate != null) && (projectInitiatedDate != null) && (scheduledTurnoverDate).before(projectInitiatedDate)) {
			scoreColor = "yellow";
		}
		//12
		if((actualTurnoverDate != null) && (projectInitiatedDate != null) && (actualTurnoverDate).before(projectInitiatedDate)) {
			scoreColor = "yellow";
		}

		//13
		if((proposalDueDate != null) && ((proposalDueDate).before(today)) && (proposalSubmittedDate == null)) {
			scoreColor = "red";
			proj.setMediumScore(2);
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			session.clear();
			session.update(proj);
			tx.commit();
			projectsIdColor.put(projects[i], scoreColor);
			continue;
		}
		//14
		if((scheduledTurnoverDate != null) && ((scheduledTurnoverDate).before(today)) && (actualTurnoverDate == null)) {
			scoreColor = "red";
			proj.setMediumScore(2);
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			session.clear();
			session.update(proj);
			tx.commit();
			projectsIdColor.put(projects[i], scoreColor);
			continue;
		}
		
		if(projectStage.equals("Budgetary")) {  //Budgetary Rules will be checked only if the project stage is Budgetary.	
			//15
			if(budgetaryDueDate == null) {
				scoreColor = "yellow";
			}
			//16
			if(budgetarySubmittedDate == null) {
				scoreColor = "yellow";
			}
			//17
			if((budgetaryDueDate != null) && (projectInitiatedDate != null) && (budgetaryDueDate).before(projectInitiatedDate)) {
				scoreColor = "red";
				proj.setMediumScore(2);
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(proj);
				tx.commit();
				projectsIdColor.put(projects[i], scoreColor);
				continue;
			}
			//18
			if((budgetarySubmittedDate != null) && (projectInitiatedDate != null) && (budgetarySubmittedDate).before(projectInitiatedDate)) {
				scoreColor = "yellow";
			}
			//19
			if((budgetaryDueDate != null) && ((budgetaryDueDate).before(today)) && (budgetarySubmittedDate == null)) {
				scoreColor = "red";
				proj.setMediumScore(2);
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(proj);
				tx.commit();
				projectsIdColor.put(projects[i], scoreColor);
				continue;
			}
		}
		
		//TASK RULES
		if(task.size() != 0) {
			
			taskBreak = false;
			for(int j=0; j<task.size(); j++) {
				Date today = new Date();
				Task currentTask = task.get(j);
				Date dueDate = currentTask.getDueDate();
				Date initiatedDate = currentTask.getAssignedDate();
				String taskStatus = currentTask.getTaskStatus().getStatus();
				
				//1
				if(dueDate != null && initiatedDate != null && dueDate.before(initiatedDate)) {
					scoreColor = "yellow";
				}
				
				//2
				if(dueDate != null && taskStatus != null && dueDate.before(today) && taskStatus.equals("Open")) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					taskBreak = true;
					break;
				}
				
				//3 //Updating this rule such that task needs to be completed will be shown only if the task is not late
				if(!(dueDate != null && taskStatus != null && dueDate.before(today) && taskStatus.equals("Open"))) {
					if(taskStatus != null && taskStatus.equals("Open")) {
						scoreColor = "yellow";
					}
					
				}
				
			}
			if(taskBreak == true) {
				continue;
			}
		}
		
		//CHANGEORDER RULES
		if(changeOrder.size() != 0) {
			for(int j=0; j<changeOrder.size(); j++) {
				ChangeOrder currentChangeOrder = changeOrder.get(j);
				String mcsCoNum = currentChangeOrder.getMcsCO();
				String title = currentChangeOrder.getTitle();
				String description = currentChangeOrder.getBriefDescription();
				String COStatus = currentChangeOrder.getStatus();
				String subNames = currentChangeOrder.getSubNames();
				Date subsSubmittedDate = currentChangeOrder.getProposalDate(); //For some reason this was being saved under proposal date
				String customer = currentChangeOrder.getType(); //This is the Customer Field in ChangeOrder
				System.out.println("CUSTOMER IS " + customer);
				Date submitDate = currentChangeOrder.getSubmittedDate();
				Date approvedDate = currentChangeOrder.getApprovedDate();
				double COCost = currentChangeOrder.getCost();
				double sell = currentChangeOrder.getSell();
				String invoiceNum = currentChangeOrder.getInvoiceNumber();
				String customerCopNum = currentChangeOrder.getCustomerCOPnum();
				String subCoNum = currentChangeOrder.getSubCO();

				//1
				if(mcsCoNum == null || mcsCoNum.isEmpty()) {
					scoreColor = "yellow";;
				}
				//2
				if(title == null || title.isEmpty()) {
					scoreColor = "yellow";
				}
				//3
				if(description == null || description.isEmpty()) {
					scoreColor = "yellow";
				}
				//4
				if(COStatus == null || COStatus.isEmpty()) {
					scoreColor = "yellow";
				}
				//5
				if(subNames == null || subNames.isEmpty()) {
					scoreColor = "yellow";
				}
				//6
				if(COStatus != null && !(COStatus.equals("4")) && subsSubmittedDate == null) {
					scoreColor = "yellow";
				}
				//7
				if(customer == null || customer.isEmpty()) {
					scoreColor = "yellow";
				}
				//8
				if(COStatus != null && !(COStatus.equals("4")) && (customer!= null && (!(customer.equals("7")) && !(customer.equals("8")))) && submitDate == null) {
					scoreColor = "yellow";
				}
				//9
				if(COStatus != null && !(COStatus.equals("4")) && approvedDate == null) {
					scoreColor = "yellow";
				}
				//10
				if(COStatus != null && !(COStatus.equals("4"))&& COCost == 0) {
					scoreColor = "yellow";
				}
				//11
				if(COStatus != null && !(COStatus.equals("4")) && (customer!= null && (!(customer.equals("7")) && !(customer.equals("8")))) && sell == 0) {
					scoreColor = "yellow";
				}
				
				
				//BUA ASKED ME TO REMOVE THESE RULES FOR NOW
//				//12
//				if(invoiceNum == null || invoiceNum.isEmpty()) {
//				scoreColor = "yellow";
//				}						
//				
//				//13
//				if(customerCopNum == null || customerCopNum.isEmpty()) {
//				scoreColor = "yellow";
//				}
//				//14  
//				if(subCoNum == null || subCoNum.isEmpty()) {
//				scoreColor = "yellow";
//				}
				
				
				
				
				//15
				if((submitDate != null) && (subsSubmittedDate != null) && (submitDate).before(subsSubmittedDate)) {
					scoreColor = "yellow";
				}
				//16
				if((approvedDate != null) && (subsSubmittedDate != null) && (approvedDate).before(subsSubmittedDate)) {
					scoreColor = "yellow";
				}

			}
		}
		
		//EQUIPMENT RULES
		if(equipment.size() != 0) {
			for(int j=0; j<equipment.size(); j++) {
				NewEquipment currentEquipment = equipment.get(j);
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
					scoreColor = "yellow";
				}
				//2
				if(equipmentName == null || equipmentName.isEmpty()) {
					scoreColor = "yellow";
				}
				//3
				if(description == null || description.isEmpty()) {
					scoreColor = "yellow";
				}
				//4
				if(supplier == null) {
					scoreColor = "yellow";
				}
				//5
				if(estDeliveryDate == null) {
					scoreColor = "yellow";
				}
				//6  
				if(orderedDate == null) {
					scoreColor = "yellow";
				}
				//7 
				if(actDeliveryDate == null) {
					scoreColor = "yellow";
				}
				//8
				if(deliveryStatus == null) {
					scoreColor = "yellow";
				}
				//9
				if((estDeliveryDate != null) && (orderedDate != null) && (estDeliveryDate).before(orderedDate)) {
					scoreColor = "yellow";
				}
				//10
				if((actDeliveryDate != null) && (orderedDate != null) && (actDeliveryDate).before(orderedDate)) {
					scoreColor = "yellow";
				}
				//11
				if((estDeliveryDate != null) && ((estDeliveryDate).before(today)) && (actDeliveryDate == null)) {
					scoreColor = "yellow";
				}
				//12
				if((orderedDate != null) && (deliveryStatus == null)) {
					scoreColor = "yellow";
				}

			}
		}
		
//		//PERMIT RULES
		Permits permits = proj.getPermits();
		
		
		if(permits != null) {
			//Building
			System.out.println("project is");
			System.out.println(projects[i]);
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
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//2
				if(ceilingPermitRequired != null && ceilingInspectionRequired != null && (!(ceilingPermitRequired.equals(ceilingInspectionRequired)))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//3
				if(mechanicalPermitRequired != null && mechanicalInspectionRequired != null &&(!(mechanicalPermitRequired.equals(mechanicalInspectionRequired)))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//4
				if(electricalPermitRequired != null && electricalInspectionRequired != null && !(electricalPermitRequired.equals(electricalInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//5
				if(plumbingPermitRequired != null && plumbingInspectionRequired != null && !(plumbingPermitRequired.equals(plumbingInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//6
				if(gasPermitRequired != null && gasInspectionRequired != null && !(gasPermitRequired.equals(gasInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//7
				if(sprinklerPermitRequired != null && sprinklerInspectionRequired != null && !(sprinklerPermitRequired.equals(sprinklerInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//8
				if(fireAlarmPermitRequired != null && fireAlarmInspectionRequired != null && !(fireAlarmPermitRequired.equals(fireAlarmInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//9
				if(lowVoltagePermitRequired != null && lowVoltageInspectionRequired != null && !(lowVoltagePermitRequired.equals(lowVoltageInspectionRequired))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//10
				if( (buildingPermitRequired != null) && (buildingPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//11
				if( (ceilingPermitRequired != null) && (ceilingPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//12
				if( (mechanicalPermitRequired != null) && (mechanicalPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//13
				if( (electricalPermitRequired != null) && (electricalPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//14
				if( (plumbingPermitRequired != null) && (plumbingPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//15
				if( (gasPermitRequired != null) && (gasPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//16
				if( (sprinklerPermitRequired != null) && (sprinklerPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//17
				if( (fireAlarmPermitRequired != null) && (fireAlarmPermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//18
				if( (lowVoltagePermitRequired != null) && (lowVoltagePermitRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				//19
				if( (buildingInspectionRequired != null) && (buildingInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//20
				if( (ceilingInspectionRequired != null) && (ceilingInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//21
				if( (mechanicalInspectionRequired != null) && (mechanicalInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//22
				if( (electricalInspectionRequired != null) && (electricalInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//23
				if( (plumbingInspectionRequired != null) && (plumbingInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//24
				if( (gasInspectionRequired != null) && (gasInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//25
				if( (sprinklerInspectionRequired != null) && (sprinklerInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//26
				if( (fireAlarmInspectionRequired != null) && (fireAlarmInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				//27
				if( (lowVoltageInspectionRequired != null) && (lowVoltageInspectionRequired.equals("0"))) {
					scoreColor = "yellow";
				}
				
				
				//For some reason, the previous developer gave the TBD's below a value "TBD" Which is a string. Would've been simple if it stayed 0.
				
				//28
				if( (buildingPermitStatus!= null) && (buildingPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//29
				if( (ceilingPermitStatus!= null) && (ceilingPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//30
				if( (mechanicalPermitStatus!= null) && (mechanicalPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//31
				if( (electricalPermitStatus!= null) && (electricalPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//32
				if( (plumbingPermitStatus!= null) && (plumbingPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//33
				if( (gasPermitStatus!= null) && (gasPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//34
				if( (sprinklerPermitStatus!= null) && (sprinklerPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//35
				if( (fireAlarmPermitStatus!= null) && (fireAlarmPermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//36
				if( (lowVoltagePermitStatus!= null) && (lowVoltagePermitStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				
				
				
				//37
				if( (buildingInspectionStatus!= null) && (buildingInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//38
				if( (ceilingInspectionStatus!= null) && (ceilingInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//39
				if( (mechanicalInspectionStatus!= null) && (mechanicalInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//40
				if( (electricalInspectionStatus!= null) && (electricalInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//41
				if( (plumbingInspectionStatus!= null) && (plumbingInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//42
				if( (gasInspectionStatus!= null) && (gasInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//43
				if( (sprinklerInspectionStatus!= null) && (sprinklerInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//44
				if( (fireAlarmInspectionStatus!= null) && (fireAlarmInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				//45
				if( (lowVoltageInspectionStatus!= null) && (lowVoltageInspectionStatus.equals("TBD"))) {
					scoreColor = "yellow";
				}
				
				
				
				//46
				if((buildingPermitRequired != null) && (buildingPermitStatus != null) && (buildingPermitRequired.equals("1")) && (buildingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//47
				if((ceilingPermitRequired != null) && (ceilingPermitStatus != null) && (ceilingPermitRequired.equals("1")) && (ceilingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//48
				if((mechanicalPermitRequired != null) && (mechanicalPermitStatus != null) && (mechanicalPermitRequired.equals("1")) && (mechanicalPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//49
				if((electricalPermitRequired != null) && (electricalPermitStatus != null) && (electricalPermitRequired.equals("1")) && (electricalPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//50
				if((plumbingPermitRequired != null) && (plumbingPermitStatus != null) && (plumbingPermitRequired.equals("1")) && (plumbingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//51
				if((gasPermitRequired != null) && (gasPermitStatus != null) && (gasPermitRequired.equals("1")) && (gasPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//52
				if((sprinklerPermitRequired != null) && (sprinklerPermitStatus != null) && (sprinklerPermitRequired.equals("1")) && (sprinklerPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//53
				if((fireAlarmPermitRequired != null) && (fireAlarmPermitStatus != null) && (fireAlarmPermitRequired.equals("1")) && (fireAlarmPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//54
				if((lowVoltagePermitRequired != null) && (lowVoltagePermitStatus != null) && (lowVoltagePermitRequired.equals("1")) && (lowVoltagePermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				
				
				//55
				if((buildingInspectionRequired != null) && (buildingInspectionStatus != null) && (buildingInspectionRequired.equals("1")) && (buildingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//56
				if((ceilingInspectionRequired != null) && (ceilingInspectionStatus != null) && (ceilingInspectionRequired.equals("1")) && (ceilingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//57
				if((mechanicalInspectionRequired != null) && (mechanicalInspectionStatus != null) && (mechanicalInspectionRequired.equals("1")) && (mechanicalInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//58
				if((electricalInspectionRequired != null) && (electricalInspectionStatus != null) && (electricalInspectionRequired.equals("1")) && (electricalInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//59
				if((plumbingInspectionRequired != null) && (plumbingInspectionStatus != null) && (plumbingInspectionRequired.equals("1")) && (plumbingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//60
				if((gasInspectionRequired != null) && (gasInspectionStatus != null) && (gasInspectionRequired.equals("1")) && (gasInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//61
				if((sprinklerInspectionRequired != null) && (sprinklerInspectionStatus != null) && (sprinklerInspectionRequired.equals("1")) && (sprinklerInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//62
				if((fireAlarmInspectionRequired != null) && (fireAlarmInspectionStatus != null) && (fireAlarmInspectionRequired.equals("1")) && (fireAlarmInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//63
				if((lowVoltageInspectionRequired != null) && (lowVoltageInspectionStatus != null) && (lowVoltageInspectionRequired.equals("1")) && (lowVoltageInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}

				
				
				//64
				if((buildingPermitRequired != null) && (buildingPermitStatus != null) && (buildingPermitRequired.equals("2")) && !(buildingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//65
				if((ceilingPermitRequired != null) && (ceilingPermitStatus != null) && (ceilingPermitRequired.equals("2")) && !(ceilingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//66
				if((mechanicalPermitRequired != null) && (mechanicalPermitStatus != null) && (mechanicalPermitRequired.equals("2")) && !(mechanicalPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//67
				if((electricalPermitRequired != null) && (electricalPermitStatus != null) && (electricalPermitRequired.equals("2")) && !(electricalPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//68
				if((plumbingPermitRequired != null) && (plumbingPermitStatus != null) && (plumbingPermitRequired.equals("2")) && !(plumbingPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//69
				if((gasPermitRequired != null) && (gasPermitStatus != null) && (gasPermitRequired.equals("2")) && !(gasPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//70
				if((sprinklerPermitRequired != null) && (sprinklerPermitStatus != null) && (sprinklerPermitRequired.equals("2")) && !(sprinklerPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//71
				if((fireAlarmPermitRequired != null) && (fireAlarmPermitStatus != null) && (fireAlarmPermitRequired.equals("2")) && !(fireAlarmPermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//72
				if((lowVoltagePermitRequired != null) && (lowVoltagePermitStatus != null) && (lowVoltagePermitRequired.equals("2")) && !(lowVoltagePermitStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				
				
				//73
				if((buildingInspectionRequired != null) && (buildingInspectionStatus != null) && (buildingInspectionRequired.equals("2")) && !(buildingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//74
				if((ceilingInspectionRequired != null) && (ceilingInspectionStatus != null) && (ceilingInspectionRequired.equals("2")) && !(ceilingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//75
				if((mechanicalInspectionRequired != null) && (mechanicalInspectionStatus != null) && (mechanicalInspectionRequired.equals("2")) && !(mechanicalInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//76
				if((electricalInspectionRequired != null) && (electricalInspectionStatus != null) && (electricalInspectionRequired.equals("2")) && !(electricalInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//77
				if((plumbingInspectionRequired != null) && (plumbingInspectionStatus != null) && (plumbingInspectionRequired.equals("2")) && !(plumbingInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//78
				if((gasInspectionRequired != null) && (gasInspectionStatus != null) && (gasInspectionRequired.equals("2")) && !(gasInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//79
				if((sprinklerInspectionRequired != null) && (sprinklerInspectionStatus != null) && (sprinklerInspectionRequired.equals("2")) && !(sprinklerInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//80
				if((fireAlarmInspectionRequired != null) && (fireAlarmInspectionStatus != null) && (fireAlarmInspectionRequired.equals("2")) && !(fireAlarmInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
				
				//81
				if((lowVoltageInspectionRequired != null) && (lowVoltageInspectionStatus != null) && (lowVoltageInspectionRequired.equals("2")) && !(lowVoltageInspectionStatus.equals("N/A"))) {
					scoreColor = "red";
					proj.setMediumScore(2);
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					session.clear();
					session.update(proj);
					tx.commit();
					projectsIdColor.put(projects[i], scoreColor);
					continue;
				}
			
			
		}
		
		
		}
		
		
		//CLOSEOUT RULES
		
		if(scheduledTurnoverDate != null && scheduledTurnoverDate.before(today)) {
			
			CloseoutDetails closeOut = proj.getCloseoutDetails();
			
			Date punchListLastUpdated = closeOut.getPunchList();
			
			Date scheduledStartDateNew = proj.getScheduledStartDate();
			
			Date actualTurnoverDateNew = proj.getActualTurnover();
			
			//CloseOut Documents
			String hvacStartUpFormStatus = closeOut.getHVACstartupFormStatus();
			String verisaeReportStatus = closeOut.getVerisaeReportStatus();
			String alarmFormStatus = closeOut.getAlarmFormStatus();
			SalvageValue salvageValue = closeOut.getSalvageValue();		
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
			if(hvacStartUpFormStatus!=null && hvacStartUpFormStatus.equals("6")) {
				scoreColor = "yellow";
			}
			
			//2
			if(verisaeReportStatus!=null && verisaeReportStatus.equals("6")) {
				scoreColor = "yellow";
			}
			
			//3
			if(alarmFormStatus!=null && alarmFormStatus.equals("6")) {
				scoreColor = "yellow";
			}
			
			//4 Updating this rule such that rule is ignored if Refrigeration is No
			if(proj.getAutofillRefrigeration() != null && !(proj.getAutofillRefrigeration().equals("0")) && salvageValue != null && salvageValue.getValue() <= 0) {
				scoreColor = "yellow";
			}
			
//			//5
//			if((punchListStatus != null) && (punchListStatus.equals("6")) ) {					
//				scoreColor = "yellow";	
//			}
//			
//			//6
//			if((asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("6")) ) {					
//				scoreColor = "yellow";	
//			}
//			
//			//7
//			if((closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("6")) ) {					
//				scoreColor = "yellow";	
//			}
			
			//commenting it now until the fix in counting the CO's is perfect
//			//8
//			if(numMcsCO != numMcsCOCompleted) {
//				scoreColor = "red";
//				proj.setMediumScore(2);
//				Session session = HibernateUtil.getSession();
//				Transaction tx = session.beginTransaction();
//				session.clear();
//				session.update(proj);
//				tx.commit();
//				projectsIdColor.put(projects[i], scoreColor);
//				continue;
//			}
			
			if(!(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today)) && scheduledStartDateNew != null && scheduledStartDateNew.before(today) && (punchListStatus != null) && (punchListStatus.equals("2") || punchListStatus.equals("4") || punchListStatus.equals("6"))) {
				scoreColor = "yellow";			
				
			}
			
			if(!(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today)) && scheduledStartDateNew != null && scheduledStartDateNew.before(today) && (asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("4") || asBuiltDrawingStatus.equals("6"))) {
				scoreColor = "yellow";		
				
			}
			
			if(!(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today)) && scheduledStartDateNew != null && scheduledStartDateNew.before(today) && (closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("4") || closeOutPhotosStatus.equals("6"))) {
				scoreColor = "yellow";	
				
			}
			
			
			if(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today) && (punchListStatus != null) && (punchListStatus.equals("2") || punchListStatus.equals("4") || punchListStatus.equals("6"))) {
				scoreColor = "red";
				proj.setMediumScore(2);
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(proj);
				tx.commit();
				projectsIdColor.put(projects[i], scoreColor);
				continue;	
				
			}
			
			if(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today) && (asBuiltDrawingStatus != null) && (asBuiltDrawingStatus.equals("2") || asBuiltDrawingStatus.equals("4") || asBuiltDrawingStatus.equals("6"))) {
				scoreColor = "red";
				proj.setMediumScore(2);
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(proj);
				tx.commit();
				projectsIdColor.put(projects[i], scoreColor);
				continue;		
				
			}
			
			if(actualTurnoverDateNew != null && actualTurnoverDateNew.before(today) && (closeOutPhotosStatus != null) && (closeOutPhotosStatus.equals("2") || closeOutPhotosStatus.equals("4") || closeOutPhotosStatus.equals("6"))) {
				scoreColor = "red";
				proj.setMediumScore(2);
				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				session.clear();
				session.update(proj);
				tx.commit();
				projectsIdColor.put(projects[i], scoreColor);
				continue;
				
			}
			
			
			//Final Inspections Rules
			
			//1
			if(buildingFinalInspectionStatus!=null && buildingFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//2
			if(ceilingFinalInspectionStatus!=null && ceilingFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//3
			if(mechanicalFinalInspectionStatus!=null && mechanicalFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//4
			if(electricalFinalInspectionStatus!=null && electricalFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//5
			if(plumbingFinalInspectionStatus!=null && plumbingFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//6
			if(gasFinalInspectionStatus!=null && gasFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//7
			if(sprinklerFinalInspectionStatus!=null && sprinklerFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//8
			if(fireAlarmFinalInspectionStatus!=null && fireAlarmFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//9
			if(lowVoltageFinalInspectionStatus!=null && lowVoltageFinalInspectionStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//10
			if(tempCertOccupancyStatus!=null && tempCertOccupancyStatus.equals("6") ) {
				scoreColor = "yellow";
			}
			//11
			if(certOccupancyStatus!=null && certOccupancyStatus.equals("6") ) {
				scoreColor = "yellow";
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


		}
		if(scoreColor.equals("green")) { 
			proj.setMediumScore(0);
			}
		else if(scoreColor.equals("yellow")) { 
			proj.setMediumScore(1);
		}
		else if(scoreColor.equals("red")) { 
			proj.setMediumScore(2);
		}
		 Session session = HibernateUtil.getSession();
		 Transaction tx = session.beginTransaction();
		session.clear();
		session.update(proj);
		tx.commit();
		 projectsIdColor.put(projects[i], scoreColor);
			}


			return projectsIdColor;
		}

	}
