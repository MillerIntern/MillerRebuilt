package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.CustomerApproval;
import projectObjects.Person;
import projectObjects.Project;
import projectObjects.ProjectClass;
import projectObjects.ProjectItem;
import projectObjects.ProjectStage;
import projectObjects.ProjectStatus;
import projectObjects.ProjectType;
import projectObjects.Warehouse;
import services.AutoFillService;
import services.ProjectObjectService;

/**
 * @author Josh Mackin
 */
public class ProjectInformationFiller {
	public synchronized static void fillProjectInformation(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		// required
		currentProject.setWarehouse(
				(Warehouse) ProjectObjectService.get(Long.parseLong(params.get("warehouse")), "Warehouse"));
		currentProject.setProjectClass(
				(ProjectClass) ProjectObjectService.get(Long.parseLong(params.get("class")), "ProjectClass"));
		currentProject.setProjectItem(
				(ProjectItem) ProjectObjectService.get(Long.parseLong(params.get("item")), "ProjectItem"));
		currentProject
				.setProjectManagers((Person) ProjectObjectService.get(Long.parseLong(params.get("manager")), "Person"));
		currentProject
				.addSupervisor((Person) ProjectObjectService.get(Long.parseLong(params.get("supervisor")), "Person"));
		currentProject.setStatus(
				(ProjectStatus) ProjectObjectService.get(Long.parseLong(params.get("status")), "ProjectStatus"));
		currentProject.setCustomerApproval(
				(CustomerApproval) ProjectObjectService.get(Long.parseLong(params.get("customerApproval")), "CustomerApproval"));
		currentProject
				.setStage((ProjectStage) ProjectObjectService.get(Long.parseLong(params.get("stage")), "ProjectStage"));
		currentProject.setProjectType(
				(ProjectType) ProjectObjectService.get(Long.parseLong(params.get("pType")), "ProjectType"));

		currentProject.setAutofillPermits(params.get("autofill-Permits"));
		currentProject.setAutofillHVAC(params.get("autofill-HVAC"));
		currentProject.setAutofillRefrigeration(params.get("autofill-Refrigeration"));
		
		String mcsNumberString = params.get("mcsNumber");
		try {
			int mcsNum = Integer.parseInt(mcsNumberString);
			currentProject.setMcsNumber(mcsNum);
		} catch (NumberFormatException e) {
			currentProject.setMcsNumber(0);

		}
		currentProject.setScope(params.get("scope"));
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		
		currentProject.setCustomerNotes(params.get("customerNotes"));

		// Additional fields
		currentProject.setShouldInvoice(Integer.parseInt(params.get("shouldInvoice")));
		currentProject.setInvoiced(Integer.parseInt(params.get("actualInvoice")));
		currentProject.setProjectNotes(params.get("notes"));
		currentProject.setKeyStatus(params.get("keyStatus"));
		currentProject.setManagerNotes(params.get("managerNotes"));
		currentProject.setZachUpdates(params.get("refrigNotes"));
		currentProject.setCost(params.get("cost"));
		currentProject.setCustomerNumber(params.get("customerNumber"));
		
		/*
		String laborTotalString = params.get("laborTotal");
		try {
			int laborTotal = Integer.parseInt(laborTotalString);
			currentProject.setLaborTotal(laborTotal);
		}catch (NumberFormatException e) {
			currentProject.setLaborTotal(0);
		}
		//currentProject.setLaborTotal(Integer.parseInt(params.get("laborTotal")));
		
		String laborInvoicedString = params.get("laborInvoiced");
		try {
			int laborInvoiced = Integer.parseInt(laborInvoicedString);
			currentProject.setLaborInvoiced(laborInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setLaborInvoiced(0);

		}
		//currentProject.setLaborInvoiced(Integer.parseInt(params.get("laborInvoiced")));
		
		String laborToInvoiceString = params.get("laborToInvoice");
		try {
			int laborToInvoice = Integer.parseInt(laborToInvoiceString);
			currentProject.setLaborToInvoice(laborToInvoice);
		} catch (NumberFormatException e) {
			currentProject.setLaborToInvoice(0);

		}
		//currentProject.setLaborToInvoice(Integer.parseInt(params.get("laborToInvoice")));
		
		String laborPercentInvoicedString = params.get("laborPercentInvoiced");
		try {
			int laborPercentInvoiced = Integer.parseInt(laborPercentInvoicedString);
			currentProject.setLaborPercentInvoiced(laborPercentInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setLaborPercentInvoiced(0);

		}		
		//currentProject.setLaborPercentInvoiced(Integer.parseInt(params.get("laborPercentInvoiced")));
		
		String materialCostsString = params.get("materialCosts");
		try {
			int materialCosts = Integer.parseInt(materialCostsString);
			currentProject.setMaterialCosts(materialCosts);
		} catch (NumberFormatException e) {
			currentProject.setMaterialCosts(0);

		}		
		//currentProject.setMaterialCosts(Integer.parseInt(params.get("materialCosts")));
		
		String materialInvoicedString = params.get("materialInvoiced");
		try {
			int materialInvoiced = Integer.parseInt(materialInvoicedString);
			currentProject.setMaterialInvoiced(materialInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setMaterialInvoiced(0);

		}		
		//currentProject.setMaterialInvoiced(Integer.parseInt(params.get("materialInvoiced")));
		
		String materialToInvoiceString = params.get("materialToInvoice");
		try {
			int materialToInvoice = Integer.parseInt(materialToInvoiceString);
			currentProject.setMaterialToInvoice(materialToInvoice);
		} catch (NumberFormatException e) {
			currentProject.setMaterialToInvoice(0);

		}		
		//currentProject.setMaterialToInvoice(Integer.parseInt(params.get("materialToInvoice")));
		
		String materialPercentInvoicedString = params.get("materialPercentInvoiced");
		try {
			int materialPercentInvoiced = Integer.parseInt(materialPercentInvoicedString);
			currentProject.setMaterialPercentInvoiced(materialPercentInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setMaterialPercentInvoiced(0);

		}		
		//currentProject.setMaterialPercentInvoiced(Integer.parseInt(params.get("materialPercentInvoiced")));
		
		String projectAmountString = params.get("projectAmount");
		try {
			int projectAmount = Integer.parseInt(projectAmountString);
			currentProject.setProjectAmount(projectAmount);
		} catch (NumberFormatException e) {
			currentProject.setProjectAmount(0);

		}	
		//currentProject.setProjectAmount(Integer.parseInt(params.get("projectAmount")));

		String projectInvoicedString = params.get("projectInvoiced");
		try {
			int projectInvoiced = Integer.parseInt(projectInvoicedString);
			currentProject.setProjectInvoiced(projectInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setProjectInvoiced(0);

		}
		//currentProject.setProjectInvoiced(Integer.parseInt(params.get("projectInvoiced")));
		
		String projectToInvoiceString = params.get("projectToInvoice");
		try {
			int projectToInvoice = Integer.parseInt(projectToInvoiceString);
			currentProject.setProjectToInvoice(projectToInvoice);
		} catch (NumberFormatException e) {
			currentProject.setProjectToInvoice(0);

		}		
		//currentProject.setProjectToInvoice(Integer.parseInt(params.get("projectToInvoice")));

		String projectPercentInvoicedString = params.get("projectPercentInvoiced");
		try {
			int projectPercentInvoiced = Integer.parseInt(projectPercentInvoicedString);
			currentProject.setProjectPercentInvoiced(projectPercentInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setProjectPercentInvoiced(0);

		}
		//currentProject.setProjectPercentInvoiced(Integer.parseInt(params.get("projectPercentInvoiced")));
		
		
		String aiaTotalString = params.get("aiaTotal");
		try {
			int aiaTotal = Integer.parseInt(aiaTotalString);
			currentProject.setAiaTotal(aiaTotal);
		} catch (NumberFormatException e) {
			currentProject.setAiaTotal(0);

		}
		//currentProject.setAiaTotal(Integer.parseInt(params.get("aiaTotal")));
		
		String aiaInvoicedString = params.get("aiaInvoiced");
		try {
			int aiaInvoiced = Integer.parseInt(aiaInvoicedString);
			currentProject.setAiaInvoiced(aiaInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setAiaInvoiced(0);

		}	
		//currentProject.setAiaInvoiced(Integer.parseInt(params.get("aiaInvoiced")));
		
		String aiaToInvoiceString = params.get("aiaToInvoice");
		try {
			int aiaToInvoice = Integer.parseInt(aiaToInvoiceString);
			currentProject.setAiaToInvoice(aiaToInvoice);
		} catch (NumberFormatException e) {
			currentProject.setAiaToInvoice(0);

		}
		//currentProject.setAiaToInvoice(Integer.parseInt(params.get("aiaToInvoice")));
		
		String aiaPercentInvoicedString = params.get("aiaPercentInvoiced");
		try {
			int aiaPercentInvoiced = Integer.parseInt(aiaPercentInvoicedString);
			currentProject.setAiaPercentInvoiced(aiaPercentInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setAiaPercentInvoiced(0);

		}
		//currentProject.setAiaPercentInvoiced(Integer.parseInt(params.get("aiaPercentInvoiced")));

		String totalProjectString = params.get("totalProject");
		try {
			int totalProject = Integer.parseInt(totalProjectString);
			currentProject.setTotalProject(totalProject);
		} catch (NumberFormatException e) {
			currentProject.setTotalProject(0);

		}
		//currentProject.setTotalProject(Integer.parseInt(params.get("totalProject")));
		
		String totalInvoicedString = params.get("totalInvoiced");
		try {
			int totalInvoiced = Integer.parseInt(totalInvoicedString);
			currentProject.setTotalInvoiced(totalInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setTotalInvoiced(0);

		}		
		//currentProject.setTotalInvoiced(Integer.parseInt(params.get("totalInvoiced")));
		
		String totalToInvoiceString = params.get("totalToInvoice");
		try {
			int totalToInvoice = Integer.parseInt(totalToInvoiceString);
			currentProject.setTotalToInvoice(totalToInvoice);
		} catch (NumberFormatException e) {
			currentProject.setTotalToInvoice(0);

		}			
		//currentProject.setTotalToInvoice(Integer.parseInt(params.get("totalToInvoice")));
		
		String totalPercentInvoicedString = params.get("totalPercentInvoiced");
		try {
			int totalPercentInvoiced = Integer.parseInt(totalPercentInvoicedString);
			currentProject.setTotalPercentInvoiced(totalPercentInvoiced);
		} catch (NumberFormatException e) {
			currentProject.setTotalPercentInvoiced(0);

		}
		*/
		//currentProject.setTotalPercentInvoiced(Integer.parseInt(params.get("totalPercentInvoiced")));
		

		Date finitiatedDate = null;
		if (!(params.get("initiated")).isEmpty())
			finitiatedDate = formatter.parse(params.get("initiated"));
		// else {
		// finitiatedDate = new Date();
		// }
		currentProject.setProjectInitiatedDate(finitiatedDate);

		Date fsurvey = null;
		if (!(params.get("survey")).isEmpty())
			fsurvey = formatter.parse(params.get("survey"));
		currentProject.setSiteSurvey(fsurvey);
		
		Date proposalScopeDate = null;
		if (!(params.get("proposalScopeDate")).isEmpty())
			proposalScopeDate = formatter.parse(params.get("proposalScopeDate"));
		currentProject.setProposalScopeDate(proposalScopeDate);
		
		Date draftScheduleDate = null;
		if (!(params.get("draftScheduleDate")).isEmpty())
			draftScheduleDate = formatter.parse(params.get("draftScheduleDate"));
		currentProject.setDraftScheduleDate(draftScheduleDate);

		Date fcostco = null;
		if (!(params.get("costco")).isEmpty())
			fcostco = formatter.parse(params.get("costco"));
		currentProject.setProposalDue(fcostco);

		Date fproposal = null;
		if (!(params.get("proposalDate")).isEmpty())
			fproposal = formatter.parse(params.get("proposalDate"));
		currentProject.setProposalSubmitted(fproposal);

		Date budgetaryDue = null;
		if (params.get("budgetaryDue") != null && !(params.get("budgetaryDue")).isEmpty())
			budgetaryDue = formatter.parse(params.get("budgetaryDue"));
		currentProject.setBudgetaryDue(budgetaryDue);

		Date budgetarySubmitted = null;
		if (params.get("budgetarySubmitted") != null && !(params.get("budgetarySubmitted")).isEmpty())
			budgetarySubmitted = formatter.parse(params.get("budgetarySubmitted"));
		currentProject.setBudgetarySubmitted(budgetarySubmitted);

		Date fstart = null;
		if (!params.get("startDate").isEmpty())
			fstart = formatter.parse(params.get("startDate"));
		currentProject.setScheduledStartDate(fstart);

		Date fscheduled = null;
		if (!params.get("scheduledTurnover").isEmpty())
			fscheduled = formatter.parse(params.get("scheduledTurnover"));
		currentProject.setScheduledTurnover(fscheduled);

		Date factual = null;
		if (!params.get("actualTurnover").isEmpty())
			factual = formatter.parse(params.get("actualTurnover"));
		currentProject.setActualTurnover(factual);
		
	}

	
	public synchronized static void fillEvalInfo(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
	
//		currentProject.setMcsNumAndStage((params.get("mcsNumberAndStage")));
//		currentProject.setPermitsEval(params.get("permits"));
//		currentProject.setHVAC(params.get("hvac"));
//		currentProject.setRefrigeration(params.get("refrigeration"));
//		currentProject.setPermitsTBD(params.get("permitsTBD"));
//		currentProject.setStageAndStatus(params.get("stageAndStatus"));
//		currentProject.setProject(params.get("project"));
//		
//		currentProject.setLateProposal(params.get("lateProposal"));
//		currentProject.setLateBudgetary(params.get("lateBudgetary"));
//		currentProject.setLateTurnover(params.get("lateTurnover"));
//		currentProject.setEmptyInitiation(params.get("emptyInitiation"));
//		currentProject.setEarlierSchedTurnover(params.get("earlierScheduledTurnover"));
//		currentProject.setEarlierSiteSurvey(params.get("earlierSiteSurvey"));
//	
//		currentProject.setEmptyCost(params.get("emptyCost"));
//		currentProject.setEmptyCustNum(params.get("emptyCustomerNumber"));
//		currentProject.setActualAndShouldInv(params.get("actualAndShouldInvoice"));
//		currentProject.setZeroShouldInv(params.get("zeroShouldInvoice"));
//		currentProject.setZeroActualInv(params.get("zeroActualInvoice"));
//		
//		currentProject.setEarlierDueDate(params.get("earlierDueDate"));
//		
//		currentProject.setBuildingRequired(params.get("buildingRequired"));
//		currentProject.setCeilingRequired(params.get("ceilingRequired"));
//		currentProject.setMechanicalRequired(params.get("mechanicalRequired"));
//		currentProject.setElectricalReq(params.get("electricalRequired"));
//		currentProject.setPlumbingReq(params.get("plumbingRequired"));
//		currentProject.setBuildingPermitReqTBD(params.get("buildingPermitReqTBD"));
//		currentProject.setGasReq(params.get("gasRequired"));
//		currentProject.setSprinklerReq(params.get("sprinklerRequired"));
//		currentProject.setFireAlarmReq(params.get("fireAlarmRequired"));
//		currentProject.setLowVoltageReq(params.get("lowVoltageRequired"));
//		currentProject.setCeilingPermitReqTBD(params.get("ceilingPermitReqTBD"));
//		currentProject.setMechanicalPermitReqTBD(params.get("mechanicalPermitReqTBD"));
//		currentProject.setElectricalPermitReqTBD(params.get("electricalPermitReqTBD"));
//		currentProject.setPlumbingPermitReqTBD(params.get("plumbingPermitReqTBD"));
//		currentProject.setGasPermitReqTBD(params.get("gasPermitReqTBD"));
//		currentProject.setSprinklerPermitReqTBD(params.get("sprinklerPermitReqTBD"));
//		currentProject.setFireAlarmPermitReqTBD(params.get("fireAlarmPermitReqTBD"));
//		currentProject.setLowVolPermitReqTBD(params.get("lowVoltagePermitReqTBD"));
//		currentProject.setBuildingInspReqTBD(params.get("buildingInspReqTBD"));
//		currentProject.setCeilingInspReqTBD(params.get("ceilingInspReqTBD"));
//		currentProject.setMechanicalInspReqTBD(params.get("mechanicalInspReqTBD"));
//		currentProject.setElectricalInspReqTBD(params.get("electricalInspReqTBD"));
//		currentProject.setPlumbingInspReqTBD(params.get("plumbingInspReqTBD"));
//		currentProject.setGasInspReqTBD(params.get("gasInspReqTBD"));
//		currentProject.setSprinklerInspReqTBD(params.get("sprinklerInspReqTBD"));
//		currentProject.setFireAlarmInspReqTBD(params.get("fireAlarmInspReqTBD"));
//		currentProject.setLowVolInspReqTBD(params.get("lowVoltageInspReqTBD"));
//		currentProject.setbuildingPermitStatusTBD(params.get("buildingPermitStatusTBD"));
//		currentProject.setCeilingPermitStatusTBD(params.get("ceilingPermitStatusTBD"));
//		currentProject.setMechanicalPermitStatusTBD(params.get("mechanicalPermitStatusTBD"));
//		currentProject.setElectricalPermitStatusTBD(params.get("electricalPermitStatusTBD"));
//		currentProject.setPlumbingPermitStatusTBD(params.get("plumbingPermitStatusTBD"));
//		currentProject.setGasPermitStatusTBD(params.get("gasPermitStatusTBD"));
//		currentProject.setSprinklerPermitStatusTBD(params.get("sprinklerPermitStatusTBD"));
//		currentProject.setFireAlarmPermitStatusTBD(params.get("fireAlarmPermitStatusTBD"));
//		currentProject.setLowVolPermitStatusTBD(params.get("lowVoltagePermitStatusTBD"));
//		currentProject.setBuildingInspStatusTBD(params.get("buildingInspStatusTBD"));
//		currentProject.setCeilingInspStatusTBD(params.get("ceilingInspStatusTBD"));
//		currentProject.setMechanicalInspStatusTBD(params.get("mechanicalInspStatusTBD"));
//		currentProject.setElectricalInspStatusTBD(params.get("electricalInspStatusTBD"));
//		currentProject.setPlumbingInspStatusTBD(params.get("plumbingInspStatusTBD"));
//		currentProject.setGasInspStatusTBD(params.get("gasInspStatusTBD"));
//		currentProject.setSprinklerInspStatusTBD(params.get("sprinklerInspStatusTBD"));
//		currentProject.setFireAlarmInspStatusTBD(params.get("fireAlarmInspStatusTBD"));
//		currentProject.setLowVolInspStatusTBD(params.get("lowVoltageInspStatusTBD"));
//		currentProject.setBuildingPermitYesNa(params.get("buildingPermitYesNa"));
//		currentProject.setCeilingPermitYesNa(params.get("ceilingPermitYesNa"));
//		currentProject.setMechanicalPermitYesNa(params.get("mechanicalPermitYesNa"));
//		currentProject.setElectricalPermitYesNa(params.get("electricalPermitYesNa"));
//		currentProject.setPlumbingPermitYesNa(params.get("plumbingPermitYesNa"));
//		currentProject.setGasPermitYesNa(params.get("gasPermitYesNa"));
//		currentProject.setSprinklerPermitYesNa(params.get("sprinklerPermitYesNa"));
//		currentProject.setFireAlarmPermitYesNa(params.get("fireAlarmPermitYesNa"));
//		currentProject.setLowVolPermitYesNa(params.get("lowVoltagePermitYesNa"));
//		currentProject.setBuildingInspYesNa(params.get("buildingInspYesNa"));
//		currentProject.setCeilingInspYesNa(params.get("ceilingInspYesNa"));
//		currentProject.setMechanicalInspYesNa(params.get("mechanicalInspYesNa"));
//		currentProject.setElectricalInspYesNa(params.get("electricalInspYesNa"));
//		currentProject.setPlumbingInspYesNa(params.get("plumbingInspYesNa"));
//		currentProject.setGasInspYesNa(params.get("gasInspYesNa"));
//		currentProject.setSprinklerInspYesNa(params.get("sprinklerInspYesNa"));
//		currentProject.setFireAlarmInspYesNa(params.get("fireAlarmInspYesNa"));
//		currentProject.setLowVolInspYesNa(params.get("lowVoltageInspYesNa"));
//		currentProject.setBuildingPermitNoYes(params.get("buildingPermitNoYes"));
//		currentProject.setCeilingPermitNoYes(params.get("ceilingPermitNoYes"));
//		currentProject.setMechanicalPermitNoYes(params.get("mechanicalPermitNoYes"));
//		currentProject.setElectricalPermitNoYes(params.get("electricalPermitNoYes"));
//		currentProject.setPlumbingPermitNoYes(params.get("plumbingPermitNoYes"));
//		currentProject.setGasPermitNoYes(params.get("gasPermitNoYes"));
//		currentProject.setSprinklerPermitNoYes(params.get("sprinklerPermitNoYes"));
//		currentProject.setFireAlarmPermitNoYes(params.get("fireAlarmPermitNoYes"));
//		currentProject.setLowVolPermitNoYes(params.get("lowVoltagePermitNoYes"));
//		currentProject.setBuildingInspNoYes(params.get("buildingInspNoYes"));
//		currentProject.setCeilingInspNoYes(params.get("ceilingInspNoYes"));
//		currentProject.setMechanicalInspNoYes(params.get("mechanicalInspNoYes"));
//		currentProject.setElectricalInspNoYes(params.get("electricalInspNoYes"));
//		currentProject.setPlumbingInspNoYes(params.get("plumbingInspNoYes"));
//		currentProject.setGasInspNoYes(params.get("gasInspNoYes"));
//		currentProject.setSprinklerInspNoYes(params.get("sprinklerInspNoYes"));
//		currentProject.setFireAlarmInspNoYes(params.get("fireAlarmInspNoYes"));
//		currentProject.setLowVolInspNoYes(params.get("lowVoltageInspNoYes"));
		
//		currentProject.setPunchList(params.get("punchList"));
//		currentProject.setCloseoutPhotos(params.get("closeoutPhotos"));
	}
	
	public synchronized static void fillProjectScore(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		if (params.get("lowScore") != null)
			currentProject.setLowScore(Integer.parseInt(params.get("lowScore")));
		if (params.get("mediumScore") != null)
			currentProject.setMediumScore(Integer.parseInt(params.get("mediumScore")));
		if (params.get("highScore") != null)
			currentProject.setHighScore(Integer.parseInt(params.get("highScore")));

		Date now = new Date();

		currentProject.setScoreLastUpdated(now);
	}

	public synchronized static void fillPermits(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		
		if (params.get("autofill-Permits") != null
				&& !(params.get("autofill-Permits").equals("-1") || params.get("autofill-Permits").equals(""))) {
			AutoFillService.autoFillProject(currentProject, "Permits", params.get("autofill-Permits"));
			currentProject.setAutofillPermits(params.get("autofill-Permits"));
		}
	
	}
	
	public synchronized static void fillHVAC(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		
		if (params.get("autofill-HVAC") != null
			&& !(params.get("autofill-HVAC").equals("-1") || params.get("autofill-HVAC").equals(""))) {
		AutoFillService.autoFillProject(currentProject, "HVAC", params.get("autofill-HVAC"));
		currentProject.setAutofillHVAC(params.get("autofill-HVAC"));
		}
	}
	
	
	public synchronized static void fillRefrigeration(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		
		if (params.get("autofill-Refrigeration") != null && !(params.get("autofill-Refrigeration").equals("-1")
			|| params.get("autofill-Refrigeration").equals(""))) {
		AutoFillService.autoFillProject(currentProject, "Refrigeration", params.get("autofill-Refrigeration"));
		currentProject.setAutofillRefrigeration(params.get("autofill-Refrigeration"));
		}
	}

	
	public synchronized static void fillProjectClass(Project currentProject, Map<String, String> params)
			throws ParseException, NumberFormatException, ClassNotFoundException {
		
		if (params.get("class") != null && !(params.get("class").equals("-1") || params.get("class").equals(""))) {
		AutoFillService.autoFillProject(currentProject, "ProjectClass", params.get("class"));
		currentProject.setProjectClass(
				(ProjectClass) ProjectObjectService.get(Long.parseLong(params.get("class")), "ProjectClass"));
		}
	}

}
