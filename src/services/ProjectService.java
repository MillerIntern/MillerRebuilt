package services;

import java.text.ParseException;


import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.google.gson.Gson;

import objects.HibernateUtil;
import projectObjects.CloseoutDetails;
import projectObjects.CostEstimate;
import projectObjects.Inspections;
import projectObjects.NewEquipment;
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectObject;
import projectObjects.ProjectRule;
import projectObjects.ProjectSpecScope;
import projectObjects.Region;
import projectObjects.RuleDomain;
import projectObjects.RuleResult;
import projectObjects.RuleSeverity;
import projectObjects.SalvageValue;
import projectObjects.Task;
import projectObjects.ChangeOrder;
import projectObjects.Subcontractor;
import projectObjects.City;
import projectObjects.MasterScope;
import services.helpers.MasterScopeFiller;
import services.helpers.ChangeOrderFiller;
import services.helpers.CloseoutDetailsFiller;
import services.helpers.CostEstimateFiller;
import services.helpers.EquipmentFiller;
import services.helpers.InspectionsFiller;
import services.helpers.PermitsFiller;
import services.helpers.ProjectInformationFiller;
import services.helpers.SalvageValueFiller;
import services.helpers.TaskFiller;
import services.helpers.SubcontractorFiller;
import services.helpers.CityFiller;
import services.helpers.ProjectRuleFiller;
import services.helpers.ProjectSpecScopeFiller;


/**
 * This class encapsulates logic to add, edit, and retrieve construction project information
 * @author Alex Campbell
 *
 */
public class ProjectService extends ProjectObjectService
{
	/**
	 * @param parameters
	 */
	public synchronized static long addNewProject(Map<String, String> parameters) throws ClassNotFoundException, ParseException, NumberFormatException {
		Project project = new Project();
		ProjectInformationFiller.fillProjectInformation(project, parameters);
		ProjectInformationFiller.fillPermits(project, parameters);
		ProjectInformationFiller.fillHVAC(project, parameters);
		ProjectInformationFiller.fillRefrigeration(project, parameters);
		ProjectInformationFiller.fillProjectClass(project, parameters);
		long projectID = (long) ProjectObjectService.addObject("Project", project);
		return projectID;
	}

	/**
	 * @param projID
	 * @param parameters
	 */
	public synchronized static long editExistingProject(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillProjectInformation(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	
	public synchronized static long editEvalProject(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillEvalInfo(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	
	public synchronized static long autofillPermits(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillPermits(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}

	
	public synchronized static long autofillHVAC(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillHVAC(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	
	public synchronized static long autofillRefrigeration(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillRefrigeration(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	
	public synchronized static long autofillProjectClass(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillProjectClass(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	/**
	 * @param ruleId
	 * @param parameters
	 */
	public synchronized static long editExistingRule(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		ProjectRule rule = null;
		
		try 
		{
			rule = (ProjectRule) ProjectObjectService.get(projID,  "ProjectRule");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
 		ProjectRuleFiller.fillRule(rule, parameters);
 		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(rule);
		tx.commit();
		
		return projID;
	}
	
//	public synchronized static long editRuleAfterEval(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
//		ProjectRule rule = null;
//		
//		try 
//		{
//			rule = (ProjectRule) ProjectObjectService.get(projID,  "ProjectRule");
//		} catch (ClassNotFoundException e) {
//			e.printStackTrace();
//		}
// 		ProjectRuleFiller.fillRuleAfterEval(rule, parameters);
// 		Session session = HibernateUtil.getSession();
//		Transaction tx = session.beginTransaction();
//		session.clear();
//		session.update(rule);
//		tx.commit();
//		
//		return projID;
//	}
	
	/**
	 * @param projID
	 * @param parameters
	 */
	public synchronized static long editExistingProjectScore(Long projID, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		Project currentProject = null;
		try {
			currentProject = (Project) ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillProjectScore(currentProject, parameters);

		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return projID;
	}
	
	/**
	 * @param projID
	 * @param parameters
	 */
	public synchronized static Project editExistingProjects(Project project, Map<String, String> parameters)  throws ClassNotFoundException, ParseException, NumberFormatException{
		if(project == null)
			return null;

		ProjectInformationFiller.fillProjectScore(project, parameters);

		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

		return project;
	}
	
	/**
	 * @param projID
	 * @param parameters
	 */
	public synchronized static void removeChangeOrder(Long projID, Long changeOrderID)  throws ClassNotFoundException{
		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	
        Iterator<projectObjects.ChangeOrder> iter = currentProject.getChangeOrders().iterator();
        while(iter.hasNext()) {
        	long id = iter.next().getId();
        	if(id == changeOrderID) {
        		System.out.println("REMOVED THE CHANGE ORDER FROM PROJECT: " + changeOrderID);
        		iter.remove();
        	}
        }
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

	}
	
	/**
	 * @param projID
	 * @param parameters
	 */
	public synchronized static void removeEquipment(Long projID, Long equipmentID)  throws ClassNotFoundException{
		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	
        Iterator<projectObjects.NewEquipment> iter = currentProject.getProjEquipment().iterator();
        while(iter.hasNext()) {
        	long id = iter.next().getId();
        	if(id == equipmentID) {
        		System.out.println("REMOVED THE EQUIPMENT FROM PROJECT: " + equipmentID);
        		iter.remove();
        	}
        }
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(currentProject);
		tx.commit();


		//ProjectObjectService.editObject("Project",projID,currentProject, 1);

	}
	
	
	


	/**
	 * This method gets all of the enumerated data that is needed by the dropdowns for the
	 * editSelect.html page
	 * @return a string representing a JSON array of data containing this data
	 */
	public synchronized static String getEditEnumsAsJSON()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("warehouse", ProjectObjectService.getAllAsJsonString("Warehouse"));
		map.put("stage", ProjectObjectService.getAllAsJsonString("ProjectStage"));
		map.put("item", ProjectObjectService.getAllAsJsonString("ProjectItem"));
		map.put("class", ProjectObjectService.getAllAsJsonString("ProjectClass"));
		map.put("inspections", ProjectObjectService.getAllAsJsonString("Inspections"));
		map.put("permits",ProjectObjectService.getAllAsJsonString("Permits"));
		map.put("equipmentvendor",ProjectObjectService.getAllAsJsonString("EquipmentVendor"));

		return g.toJson(map);
	}

	/**
	 * This method returns the data needed for the dropdowns on the query.html page
	 * @return a string repsenting a JSON array containing the data
	 */
	public synchronized static String getQueryEnumsAsJSON()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("warehouse", ProjectObjectService.getAllAsJsonString("Warehouse"));
		map.put("stage", ProjectObjectService.getAllAsJsonString("ProjectStage"));
		map.put("item", ProjectObjectService.getAllAsJsonString("ProjectItem"));
		map.put("class", ProjectObjectService.getAllAsJsonString("ProjectClass"));
		map.put("region", g.toJson(Region.returnAllAsList()));
		map.put("status", ProjectObjectService.getAllAsJsonString("ProjectStatus"));
		map.put("person", ProjectObjectService.getAllAsJsonString("Person"));
		map.put("type", ProjectObjectService.getAllAsJsonString("ProjectType"));
		map.put("inspections", ProjectObjectService.getAllAsJsonString("Inspections"));
		map.put("permits",ProjectObjectService.getAllAsJsonString("Permits"));
		map.put("equipmentvendor",ProjectObjectService.getAllAsJsonString("EquipmentVendor"));
		map.put("equipmentstatus",ProjectObjectService.getAllAsJsonString("EquipmentStatus"));

		//Turn the hashmap into a JSON array and return it
		return g.toJson(map);
	}

	/**
	 * This method gets all of the information in the database.
	 * @return A string representing a JSON array containing this information
	 */
	public synchronized static String getAllEnumsAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("warehouse", ProjectObjectService.getAllAsJsonString("Warehouse"));
		map.put("stage", ProjectObjectService.getAllAsJsonString("ProjectStage"));
		map.put("item", ProjectObjectService.getAllAsJsonString("ProjectItem"));
		map.put("class", ProjectObjectService.getAllAsJsonString("ProjectClass"));
		map.put("status", ProjectObjectService.getAllAsJsonString("ProjectStatus"));
		map.put("person", ProjectObjectService.getAllAsJsonString("Person"));
		map.put("type", ProjectObjectService.getAllAsJsonString("ProjectType"));
		map.put("inspections", ProjectObjectService.getAllAsJsonString("Inspections"));
		map.put("permits",ProjectObjectService.getAllAsJsonString("Permits"));
		map.put("equipmentvendor",ProjectObjectService.getAllAsJsonString("EquipmentVendor"));
		//map.put("equipment",ProjectObjectService.getAllAsJsonString("Equipment"));
		map.put("equipmentstatus",ProjectObjectService.getAllAsJsonString("EquipmentStatus"));
		map.put("closeoutstatus", ProjectObjectService.getAllAsJsonString("CloseoutStatus"));
		map.put("changeordertype", ProjectObjectService.getAllAsJsonString("ChangeOrderType"));
		map.put("changeorderstatus", ProjectObjectService.getAllAsJsonString("ChangeOrderStatus"));
		map.put("permitstage", ProjectObjectService.getAllAsJsonString("PermitStage"));

		return g.toJson(map);
	}

	/**
	 * previously we just got everything all the time. Now you send what you want
	 * and get back only what you need. This saves tons of time.
	 * @param parameters
	 * @return
	 */
	public synchronized static String getSpecificAsJson(Map<String, String> parameters) {
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();
		if(parameters.get("warehouse") != null && !parameters.get("warehouse").isEmpty())
			if(parameters.get("warehouse").equals("true"))
				map.put("warehouse", ProjectObjectService.getAllAsJsonString("Warehouse"));
		if(parameters.get("class") != null && !parameters.get("class").isEmpty())
			if(parameters.get("class").equals("true"))
				map.put("class", ProjectObjectService.getAllAsJsonString("ProjectClass"));
		if(parameters.get("item") != null && !parameters.get("item").isEmpty())
			if(parameters.get("item").equals("true"))
				map.put("item", ProjectObjectService.getAllAsJsonString("ProjectItem"));
		if(parameters.get("person") != null && !parameters.get("person").isEmpty())
			if(parameters.get("person").equals("true"))
				map.put("person", ProjectObjectService.getAllAsJsonString("Person"));
		if(parameters.get("type") != null && !parameters.get("type").isEmpty())
			if(parameters.get("type").equals("true"))
				map.put("type", ProjectObjectService.getAllAsJsonString("ProjectType"));
		if(parameters.get("status") != null && !parameters.get("status").isEmpty())
			if(parameters.get("status").equals("true"))
				map.put("status", ProjectObjectService.getAllAsJsonString("ProjectStatus"));
		if(parameters.get("stage") != null && !parameters.get("stage").isEmpty())
			if(parameters.get("stage").equals("true"))
				map.put("stage", ProjectObjectService.getAllAsJsonString("ProjectStage"));
		if(parameters.get("inspectionstatus") != null && !parameters.get("inspectionstatus").isEmpty())
			if(parameters.get("inspectionstatus").equals("true"))
				map.put("inspectionstatus", ProjectObjectService.getAllAsJsonString("InspectionStatus"));
		if(parameters.get("permitreq") != null && !parameters.get("permitreq").isEmpty())
			if(parameters.get("permitreq").equals("true"))
				map.put("permitreq", ProjectObjectService.getAllAsJsonString("PermitRequired"));
		if(parameters.get("inspectionreq") != null && !parameters.get("inspectionreq").isEmpty())
			if(parameters.get("inspectionreq").equals("true"))
				map.put("inspectionreq", ProjectObjectService.getAllAsJsonString("InspectionRequired"));
		if(parameters.get("permitstage") != null && !parameters.get("permitstage").isEmpty())
			if(parameters.get("permitstage").equals("true"))
				map.put("permitstage", ProjectObjectService.getAllAsJsonString("PermitStage"));
		if(parameters.get("closeoutstatus") != null && !parameters.get("closeoutstatus").isEmpty())
			if(parameters.get("closeoutstatus").equals("true"))
				map.put("closeoutstatus", ProjectObjectService.getAllAsJsonString("CloseoutStatus"));
		if(parameters.get("changeorderstatus") != null && !parameters.get("changeorderstatus").isEmpty())
			if(parameters.get("changeorderstatus").equals("true"))
				map.put("changeorderstatus", ProjectObjectService.getAllAsJsonString("ChangeOrderStatus"));
		if(parameters.get("changeordertype") != null && !parameters.get("changeordertype").isEmpty())
			if(parameters.get("changeordertype").equals("true"))
				map.put("changeordertype", ProjectObjectService.getAllAsJsonString("ChangeOrderType"));
		if(parameters.get("equipmentvendor") != null && !parameters.get("equipmentvendor").isEmpty())
			if(parameters.get("equipmentvendor").equals("true"))
				map.put("equipmentvendor",ProjectObjectService.getAllAsJsonString("EquipmentVendor"));
		if(parameters.get("equipmentstatus") != null && !parameters.get("equipmentstatus").isEmpty())
			if(parameters.get("equipmentstatus").equals("true"))
				map.put("equipmentstatus",ProjectObjectService.getAllAsJsonString("EquipmentStatus"));
		if(parameters.get("subcontractors") != null && !parameters.get("subcontractors").isEmpty())
			if(parameters.get("subcontractors").equals("true"))
				map.put("subcontractors",ProjectObjectService.getAllAsJsonString("Subcontractor"));
		if(parameters.get("cities") != null && !parameters.get("cities").isEmpty())
			if(parameters.get("cities").equals("true"))
				map.put("cities",ProjectObjectService.getAllAsJsonString("City"));
		if(parameters.get("project") != null && !parameters.get("project").isEmpty())
			if(parameters.get("project").equals("true"))
				map.put("project",ProjectObjectService.getAllAsJsonString("project"));		
		if(parameters.get("task_status") != null && !parameters.get("task_status").isEmpty())
			if(parameters.get("task_status").equals("true"))
				map.put("taskStatus",ProjectObjectService.getAllAsJsonString("TaskStatus"));
		if(parameters.get("users") != null && !parameters.get("users").isEmpty())
			if(parameters.get("users").equals("true"))
				map.put("users", ProjectObjectService.getAllAsJsonString("User"));
		if(parameters.get("projectRules") != null && !parameters.get("projectRules").isEmpty())
			if(parameters.get("projectRules").equals("true"))
				map.put("projectRules", ProjectObjectService.getAllAsJsonString("ProjectRule"));
		if(parameters.get("ruleDomains") != null && !parameters.get("ruleDomains").isEmpty())
			if(parameters.get("ruleDomains").equals("true"))
				map.put("ruleDomains", g.toJson(RuleDomain.returnAllAsMap()));
		if(parameters.get("ruleResults") != null && !parameters.get("ruleResults").isEmpty())
			if(parameters.get("ruleResults").equals("true"))
				map.put("ruleResults", g.toJson(RuleResult.returnAllAsMap()));
		if(parameters.get("ruleSeverity") != null && !parameters.get("ruleSeverity").isEmpty())
			if(parameters.get("ruleSeverity").equals("true"))
				map.put("ruleSeverity", g.toJson(RuleSeverity.returnAllAsMap()));
		//
		if(parameters.get("generalInfoFields") != null && !parameters.get("generalInfoFields").isEmpty())
			if(parameters.get("generalInfoFields").equals("true"))
				map.put("generalInfoFields", g.toJson(Project.getAllGeneralInfoFields()));
		if(parameters.get("changeOrderFields") != null && !parameters.get("changeOrderFields").isEmpty())
			if(parameters.get("changeOrderFields").equals("true"))
				map.put("changeOrderFields", g.toJson(ChangeOrder.getAllChangeOrderFields()));
		if(parameters.get("equipmentFields") != null && !parameters.get("equipmentFields").isEmpty())
			if(parameters.get("equipmentFields").equals("true"))
				map.put("equipmentFields", g.toJson(NewEquipment.getAllNewEquipmentFields()));
		if(parameters.get("closeoutFields") != null && !parameters.get("closeoutFields").isEmpty())
			if(parameters.get("closeoutFields").equals("true"))
				map.put("closeoutFields", g.toJson(CloseoutDetails.getAllCloseoutFields()));
		if(parameters.get("permitAndInspectionFields") != null && !parameters.get("permitAndInspectionFields").isEmpty())
			if(parameters.get("permitAndInspectionFields").equals("true"))
				map.put("permitAndInspectionFields", g.toJson(Permits.getAllPermitFields()));
		if(parameters.get("schedulingFields") != null && !parameters.get("schedulingFields").isEmpty())
			if(parameters.get("schedulingFields").equals("true"))
				map.put("schedulingFields", g.toJson(Project.getAllSchedulingFields()));
		if(parameters.get("financialFields") != null && !parameters.get("financialFields").isEmpty())
			if(parameters.get("financialFields").equals("true"))
				map.put("financialFields", g.toJson(Project.getAllFinancialFields()));
		if(parameters.get("taskFields") != null && !parameters.get("taskFields").isEmpty())
			if(parameters.get("taskFields").equals("true"))
				map.put("taskFields", g.toJson(Task.getAllTaskFields()));
		
		return g.toJson(map);
	}

	/**
	 * This method gets all of the projects
	 * @return A string representing a JSON array containing this information
	 */
	public synchronized static String getAllProjectsAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();
		String projects = ProjectObjectService.getAllAsJsonString("Project");
		map.put("projects", projects);


		return g.toJson(map);
	}

//	public synchronized static String getAllProjects()
//	{
//		List<projectObjects.Project> projects = ProjectObjectService.getAllProjects();
//		String proj = projects.toString();
//		System.out.println("projects = " + proj);
//		return proj;
//	}
//	
	/**
	 * This method gets all of the tasks
	 * @return A string representing a JSON array containing this information
	 */
	public synchronized static String getAllTasksAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("tasks", ProjectObjectService.getAllAsJsonString("Task"));


		return g.toJson(map);
	}

	public synchronized static String getAllEnumsEquipAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("person", ProjectObjectService.getAllAsJsonString("Person"));
		map.put("warehouse", ProjectObjectService.getAllAsJsonString("Warehouse"));
		map.put("item", ProjectObjectService.getAllAsJsonString("ProjectItem"));
		map.put("equipmentvendor",ProjectObjectService.getAllAsJsonString("EquipmentVendor"));
		map.put("equipment",ProjectObjectService.getAllAsJsonString("Equipment"));
		map.put("equipmentstatus",ProjectObjectService.getAllAsJsonString("EquipmentStatus"));

		return g.toJson(map);
	}

	public synchronized static String getAllEquipmentAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("equipment",ProjectObjectService.getAllAsJsonString("Equipment"));
		return g.toJson(map);
	}

	public synchronized static String[][] getGSON2DArray(HttpServletRequest req, String var)
	{
		Gson gson = new Gson();
		String[][] dummy = new String[0][0];  // The same type as your "newMap"
		String[][] array;

		array = gson.fromJson(req.getParameter(var), dummy.getClass());
		return array;
	}

	public synchronized static String[] getGSONArray(HttpServletRequest req, String var)
	{
		Gson gson = new Gson();
		String[] dummy = new String[0];  // The same type as your "newMap"
		String[] array;

		array = gson.fromJson(req.getParameter(var), dummy.getClass());

		return array;
	}

	public synchronized static void editCloseout(Long projectID, Map<String, String>params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Closeout:");

		String closeoutIDString = params.get("closeoutID");
		String salvageIDString = params.get("salvageID");
		Long closeoutID = (long)-1;
		Long salvageID = (long)-1;
		
		String numOfMCSChangeOrders = params.get("numOfMCSChangeOrders");

		try
		{
			closeoutID = Long.parseLong(closeoutIDString);
			salvageID = Long.parseLong(salvageIDString);
		}catch(Exception e){}


		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		fixSets(currentProject);

		CloseoutDetails cd = new CloseoutDetails();
		CloseoutDetailsFiller.fillCloseoutDetails(cd, params);
		SalvageValue sv = SalvageValueFiller.fillSalvageValue(cd, params);
		cd.setSalvageValue(sv);
		currentProject.setCloseoutDetails(cd);

		int i = 0;
		int k = 0;
		System.out.println(cd.getId());

		System.out.println(closeoutID);
		if(closeoutID!=0 && salvageID ==0)
		{
			i=0;
			ProjectObjectService.editObject("CloseoutDetails",closeoutID,cd,i);
			System.out.println(cd.getId()+ " is the id");

			k=1;
		}
		if(closeoutID!=0 && salvageID !=0)
		{
			i=2;
			ProjectObjectService.editObject("CloseoutDetails",closeoutID,cd,i);
			System.out.println(cd.getId() + " is the id");

			k=1;
		}

		if(salvageID!=0)
		{
			i=0;
			System.out.println("SV number: " + salvageID);
			ProjectObjectService.editObject("SalvageValue", salvageID, sv, i);
			k = 1;
		}
		ProjectObjectService.editObject("Project",projectID,currentProject,k);
		ProjectObjectService.deleteNullSetObjects();

	}

	
	public synchronized static String editCostEstimate(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit cost est:");

		CostEstimate ce = new CostEstimate();
		CostEstimateFiller.fillCostEstimate(ce, params);
		ProjectObjectService.addObject("CostEstimate", ce);
		
		return "edit Cost Estimate";
		
	}
	
	public synchronized static void editPermits(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Permits:");

		String permitsIDString = params.get("permitsID");
		Long permitsID = (long)-1;

		try
		{
			permitsID = Long.parseLong(permitsIDString);
		}catch(Exception e){}


		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		fixSets(currentProject);

		Permits permits = new Permits();
		PermitsFiller.fillPermits(permits, params);

		currentProject.setPermits(permits);

		int i = 0;
		int k = 0;

		if(permitsID!=0)
		{
			i=0;
			ProjectObjectService.editObject("Permits",permitsID,permits, i);
			k = 1;
		}
		ProjectObjectService.editObject("Project",projectID,currentProject,k);
		ProjectObjectService.deleteNullSetObjects();

	}

	public synchronized static void editInspections(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Inspections:");

		String inspectionIDString = params.get("inspectionID");
		Long inspectionID = (long)-1;

		try
		{
			inspectionID = Long.parseLong(inspectionIDString);
		}catch(Exception e){}
		System.out.println(inspectionID);


		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		fixSets(currentProject);

		Inspections inspection = new Inspections();
		InspectionsFiller.fillInspections(inspection, params);

		currentProject.setInspections(inspection);

		int i = 0;
		int k = 0;

		if(inspectionID!=0)
		{
			i=0;
			ProjectObjectService.editObject("Inspections",inspectionID,inspection, i);
			k = 1;
		}
		ProjectObjectService.editObject("Project",projectID,currentProject,k);
		ProjectObjectService.deleteNullSetObjects();

	}

	/*We could just delete this
	public synchronized static void editProjectInformation(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		Project currentProject = null;
		try {
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		ProjectInformationFiller.fillCloseoutDetails(currentProject, params);

		int k = 1;

		ProjectObjectService.editObject("Project",projectID,currentProject,k);

	}*/

	/**
	 * @param projectID
	 * @param parameters
	 */
	public synchronized static boolean addChangeOrder(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Add Change Order:");

		if(projectID == null) return false;
		
		Project currentProject = null;
		try
		{
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return false;
		}
		Set<NewEquipment> newEquipment = currentProject.getProjEquipment();
		Iterator<NewEquipment> eqiter = newEquipment.iterator();
		while(eqiter.hasNext())
		{
			eqiter.next().setId(null);
		}


		Set<ChangeOrder> changeOrders = currentProject.getChangeOrders();
		Iterator<ChangeOrder> iter = changeOrders.iterator();
		while(iter.hasNext())
		{
			iter.next().setId(null);
		}

		ChangeOrder co = new ChangeOrder();
		ChangeOrderFiller.fillChangeOrder(co, params);
		changeOrders.add(co);
		currentProject.setChangeOrders(changeOrders);
		int k;

		//ProjectObjectService.addToSet("ChangeOrder", projectID, co);
		k = 1;
		ProjectObjectService.editObject("Project",projectID,currentProject,k);
		ProjectObjectService.deleteNullSetObjects();
		return true;
	}

	/**
	 * @param projectID
	 * @param parameters
	 */
	public synchronized static boolean editChangeOrder(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Change Order:");
		Long changeOrderID;
		
		try 
		{
			changeOrderID = Long.parseLong(params.get("changeOrderID"));
		} 
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
		
		
		Project currentProject = null;
		try
		{
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Set<NewEquipment> newEquipment = currentProject.getProjEquipment();
		Iterator<NewEquipment> eqiter = newEquipment.iterator();
		while(eqiter.hasNext())
		{
			eqiter.next().setId(null);
		}


		Set<ChangeOrder> changeOrders = currentProject.getChangeOrders();
		Iterator<ChangeOrder> iter = changeOrders.iterator();
		ChangeOrder oldOrder = new ChangeOrder();

		while(iter.hasNext())
		{
			ChangeOrder item = iter.next();

			System.out.println(item.getId() + " is the ID compared to " + changeOrderID);
			if(item.getId().longValue() == changeOrderID.longValue())
			{
				System.out.println("Found the correct change order!");
				oldOrder = item;
				ChangeOrderFiller.fillChangeOrder(oldOrder, params);


			}
			item.setId(null);
		}
		currentProject.setChangeOrders(changeOrders);
		int k;

		k = 1;
		ProjectObjectService.editObject("ChangeOrder",changeOrderID,oldOrder,k);
		ProjectObjectService.deleteNullSetObjects();
		return true;
	}

	/**
	 * @param projectID
	 * @param parameters
	 */
	public synchronized static void addEquipment(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Add Equipment:");

		Project currentProject = null;
		try
		{
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			// TODO: We should do something meaningful in all of these catch blocks. Perhaps return with an error message?
		}
		Set<ChangeOrder> changeOrders = currentProject.getChangeOrders();
		Iterator<ChangeOrder> iterCO = changeOrders.iterator();
		while(iterCO.hasNext())
		{
			iterCO.next().setId(null);
		}

		Set<NewEquipment> newEquipment = currentProject.getProjEquipment();
		Iterator<NewEquipment> iter = newEquipment.iterator();
		while(iter.hasNext())
		{
			iter.next().setId(null);
		}

		NewEquipment eq = new NewEquipment();
		EquipmentFiller.fillNewEquipment(eq, params);
		System.out.println(eq);
		newEquipment.add(eq);
		System.out.println(newEquipment);
		currentProject.setProjEquipment(newEquipment);
		System.out.println(currentProject);
		int k;

		//ProjectObjectService.addToSet("ChangeOrder", projectID, co);
		k = 1;
		ProjectObjectService.editObject("Project",projectID,currentProject, k);
		ProjectObjectService.deleteNullSetObjects();
	}

	public synchronized static String addProjectSpecScope(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		ProjectSpecScope sp  = new ProjectSpecScope();
		ProjectSpecScopeFiller.fillProjectSpecScopeInfo(sp, params);
		ProjectObjectService.addObject("ProjectSpecScope", sp);
		
		return "ProjectSpecScope ADDED";
	
	}
	
	public synchronized static String addMasterScope( Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		MasterScope sp  = new MasterScope();
		MasterScopeFiller.fillMasterScope(sp, params);
		ProjectObjectService.addObject("MasterScope", sp);
		
		return "masterScope ADDED";
	
	}
	
	public synchronized static void editEquipment(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Equipment:");
		Long equipmentID = Long.parseLong(params.get("equipmentID"));

		Project currentProject = null;
		try
		{
			currentProject = (Project)ProjectObjectService.get(projectID,  "Project");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Set<ChangeOrder> changeOrders = currentProject.getChangeOrders();
		Iterator<ChangeOrder> chiter = changeOrders.iterator();
		while(chiter.hasNext())
		{
			chiter.next().setId(null);
		}


		Set<NewEquipment> equipment = currentProject.getProjEquipment();
		Iterator<NewEquipment> iter = equipment.iterator();
		NewEquipment oldEquipment = new NewEquipment();

		while(iter.hasNext())
		{
			NewEquipment item = iter.next();

			//System.out.println(item.getId() + " is the ID compared to " + equipmentID);
			if(item.getId().longValue() == equipmentID.longValue())
			{
				//System.out.println("Found the correct equipment!");
				oldEquipment = item;
				EquipmentFiller.fillNewEquipment(oldEquipment, params);


			}
			item.setId(null);
		}
		currentProject.setProjEquipment(equipment);
		int k;

		k = 1;
		ProjectObjectService.editObject("NewEquipment",equipmentID,oldEquipment,k);
		ProjectObjectService.deleteNullSetObjects();
	}

	private static void fixSets(Project currentProject)
	{
		Set<ChangeOrder> changeOrders = currentProject.getChangeOrders();
		Iterator<ChangeOrder> iterCO = changeOrders.iterator();
		while(iterCO.hasNext())
		{
			iterCO.next().setId(null);
		}

		Set<NewEquipment> newEquipment = currentProject.getProjEquipment();
		Iterator<NewEquipment> iter = newEquipment.iterator();
		while(iter.hasNext())
		{
			iter.next().setId(null);
		}
	}
	
	public synchronized static Set<ChangeOrder> removeChangeOrder(Project project, long changeOrderID){
		Set<ChangeOrder> changeOrders = project.getChangeOrders();
		Iterator<ChangeOrder> iterCO = changeOrders.iterator();
		while(iterCO.hasNext())
		{
			if(iterCO.next().getId() == changeOrderID) {
				iterCO.remove();
				System.out.println("FOUND CHANGE ORDER");
				break;
			}
		}
		
		return changeOrders;
		
	}

	/**
	 * @author Josh Mackin
	 * @return
	 */
	public synchronized static String getAllAlertsAsJson() {
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("projects", ProjectObjectService.getAllAsJsonString("Alert"));


		return g.toJson(map);
	}

	/**
	 * @author Josh Mackin
	 * @return
	 */
	public synchronized static String getAllTriggersAsJson() {
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();

		map.put("projects", ProjectObjectService.getAllAsJsonString("Trigger"));


		return g.toJson(map);
	}

	/**
	 * @param parameters
	 * @return
	 */
	public synchronized static String createTask(Map<String, String> parameters, String username) throws ClassNotFoundException, ParseException {
		Task t = new Task();

		TaskFiller.fillTaskInformation(t, parameters, username);

		ProjectObjectService.addObject("Task", t);
		
		return "TASK_ADDED";
	}
	
	/**
	 * @param parameters
	 * @return
	 */
	public synchronized static String createSubcontractor(Map<String, String> parameters) throws ClassNotFoundException, ParseException {
		Subcontractor s = new Subcontractor();

		SubcontractorFiller.fillSubcontractorInformation(s, parameters);

		ProjectObjectService.addObject("Subcontractor", s);
		
		return "SUBCONTRACTOR_ADDED";
	}
	
	/**
	 * @param parameters
	 * @return
	 */
	public synchronized static String createCity(Map<String, String> parameters) throws ClassNotFoundException, ParseException {				
		
		City city = new City();

		CityFiller.fillCity(city, parameters);

		ProjectObjectService.addObject("City", city);
		
		return "CITY_ADDED";
	}
	
}
