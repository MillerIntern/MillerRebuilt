package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

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
public class ProjectInformationFiller
{
	public synchronized static void fillProjectInformation(Project currentProject,  Map<String, String>params) throws ParseException, NumberFormatException, ClassNotFoundException
	{
		// required
		currentProject.setWarehouse((Warehouse) ProjectObjectService.get(Long.parseLong(params.get("warehouse")), "Warehouse"));
		currentProject.setProjectClass((ProjectClass) ProjectObjectService.get(Long.parseLong(params.get("class")), "ProjectClass"));
		currentProject.setProjectItem((ProjectItem) ProjectObjectService.get(Long.parseLong(params.get("item")), "ProjectItem"));
		currentProject.setProjectManagers((Person) ProjectObjectService.get(Long.parseLong(params.get("manager")), "Person"));
		currentProject.addSupervisor((Person) ProjectObjectService.get(Long.parseLong(params.get("supervisor")), "Person"));
		currentProject.setStatus((ProjectStatus) ProjectObjectService.get(Long.parseLong(params.get("status")), "ProjectStatus"));
		currentProject.setStage((ProjectStage) ProjectObjectService.get(Long.parseLong(params.get("stage")), "ProjectStage"));
		currentProject.setProjectType((ProjectType) ProjectObjectService.get(Long.parseLong(params.get("pType")), "ProjectType"));

		String mcsNumberString = params.get("mcsNumber");
		try {
			int mcsNum = Integer.parseInt(mcsNumberString);
			currentProject.setMcsNumber(mcsNum);
		} catch(NumberFormatException e) {
			currentProject.setMcsNumber(0);

		}
		currentProject.setScope(params.get("scope"));
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		//Additional fields
		currentProject.setShouldInvoice(Integer.parseInt(params.get("shouldInvoice")));
		currentProject.setInvoiced(Integer.parseInt(params.get("actualInvoice")));
		currentProject.setProjectNotes(params.get("notes"));
		currentProject.setManagerNotes(params.get("managerNotes"));
		currentProject.setZachUpdates(params.get("refrigNotes"));
		currentProject.setCost(params.get("cost"));
		currentProject.setCustomerNumber(params.get("customerNumber"));
		
		Date finitiatedDate = null;
		if (!(params.get("initiated")).isEmpty())
			finitiatedDate = formatter.parse(params.get("initiated"));
		currentProject.setProjectInitiatedDate(finitiatedDate);

		Date fsurvey = null;
		if (!(params.get("survey")).isEmpty())
			fsurvey = formatter.parse(params.get("survey"));
		currentProject.setSiteSurvey(fsurvey);

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

		Date permitApp = null;
		if (!params.get("permitApp").isEmpty())
			permitApp = formatter.parse(params.get("permitApp"));
		currentProject.setPermitApplication(permitApp);
		
		//Autofill
		
		
		if(params.get("autofill-HVAC") != null && !(params.get("autofill-HVAC").equals("-1") || params.get("autofill-HVAC").equals(""))) {
			AutoFillService.autoFillProject(currentProject , "HVAC" , params.get("autofill-HVAC"));
		}
		
		if(params.get("autofill-Refrigeration") != null && !(params.get("autofill-Refrigeration").equals("-1") || params.get("autofill-Refrigeration").equals(""))) {
			AutoFillService.autoFillProject(currentProject , "Refrigeration" , params.get("autofill-Refrigeration"));
		}
		
		if(params.get("autofill-Permits") != null && !(params.get("autofill-Permits").equals("-1") || params.get("autofill-Permits").equals(""))) {
			AutoFillService.autoFillProject(currentProject , "Permits" , params.get("autofill-Permits"));
		}
			
	}
	
	public synchronized static void fillProjectScore(Project currentProject,  Map<String, String>params) throws ParseException, NumberFormatException, ClassNotFoundException
	{
		if(params.get("lowScore") != null)
			currentProject.setLowScore(Integer.parseInt(params.get("lowScore")));
		if(params.get("mediumScore") != null)
			currentProject.setMediumScore(Integer.parseInt(params.get("mediumScore")));
		if(params.get("highScore") != null)
			currentProject.setHighScore(Integer.parseInt(params.get("highScore")));
		
		Date now = new Date();
		
		currentProject.setScoreLastUpdated(now);
	}

}
