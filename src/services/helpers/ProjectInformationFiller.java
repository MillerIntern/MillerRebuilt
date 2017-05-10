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
import services.ProjectObjectService;


/**
 * @author Josh Mackin
 */
public class ProjectInformationFiller
{
	public static void fillProjectInformation(Project currentProject,  Map<String, String>params) throws ParseException, NumberFormatException, ClassNotFoundException
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
		currentProject.setCostcoDueDate(fcostco);

		Date fproposal = null;
		if (!(params.get("proposalDate")).isEmpty())
			fproposal = formatter.parse(params.get("proposalDate"));
		currentProject.setProposalSubmitted(fproposal);

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
	}
}
