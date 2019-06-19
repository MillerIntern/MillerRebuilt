package services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonObject;

import projectObjects.ProjectRule;
import projectObjects.ProjectStage;
import projectObjects.ProjectStatus;
import projectObjects.RuleDomain;
//import projectObjects.RuleResult;
import projectObjects.Task;
import projectObjects.TaskStatus;
import projectObjects.ChangeOrder;
import projectObjects.CloseoutDetails;
import projectObjects.CloseoutStatus;
import projectObjects.NewEquipment;
import projectObjects.Permits;
import projectObjects.Project;
import projectObjects.ProjectClass;
import projectObjects.RuleDomain;
import projectObjects.RuleSeverity;

public class ProjectRuleService 
{
	public static boolean CloseoutEvaluate(ProjectRule _rule , Project proj )
	{
		CloseoutDetails co = proj.getCloseoutDetails();
		if(co == null)
			return true;
		
		ProjectClass project = proj.getProjectClass();
		
		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		Object field1 = CloseoutDetails.getCloseoutFields(f1 , co);
		Object field2 = CloseoutDetails.getCloseoutFields(f2 , co);
		
		if(f1.equals("punchListStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6") || field1.equals("3"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
				
		if(f1.equals("asBuiltDrawingsStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6") || field1.equals("3"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("closeOutPhotosStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6") || field1.equals("3"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("HVACstartupFormStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("verisaeReportStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("alarmFormStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("salvageValue") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("numOfMCSChangeOrders") && f2.equals("numOfMCSChangeOrdersCompleted"))
		{
			if(field1 == null || field2 == null )
				return true;
			
			if(field1.equals("0") && field2.equals("0"))
			{
				return true;
			}
			else if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("elecFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinkleFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("lowVolFinalStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("tmpCertificateStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("certificateStatus") && f2.equals("None"))
		{
			if(field1 == null )
				return true;
			
			if(field1.equals("6"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		return true;
		
	}

	
//	public static boolean ChangeOrderEvaluate(ProjectRule _rule , ChangeOrder _co)
//	{
//		ChangeOrder co = _co;
//		if(co == null)
//			return false;
//		
//		String f1 , f2;
//		f1 = _rule.getField1();
//		f2 = _rule.getField2();
//		
//		Object field1 = ChangeOrder.getChangeOrderFields(f1 , co);
//		Object field2 = ChangeOrder.getChangeOrderFields(f2 , co);
//		
//		if(field1 instanceof Date && field2 instanceof Date)
//			return _rule.evaluate(EvaluateDates((Date) field1 , (Date) field2));
//		else if(field1 instanceof Date && field2 == null)
//			return _rule.evaluate(EvaluateDates((Date) field1 , null));
//		else if(field1 == null && field2 instanceof Date)
//			return _rule.evaluate(EvaluateDates(null , (Date) field2));
//		
//		if(field1 instanceof Double && field2 instanceof Double)
//			return _rule.evaluate(EvaluateNumbers((Double) field1 , (Double) field2));
//		else if(field1 instanceof Double && field2 == null)
//			return _rule.evaluate(EvaluateNumbers((Double) field1 , null));
//		else if(field1 == null && field2 instanceof Double)
//			return _rule.evaluate(EvaluateNumbers(null , (Double) field2));
//		
//		return false;
//	}
//	
	public static boolean FinancialEvaluate(ProjectRule _rule , Project _proj)
	{
		Project proj = _proj;
		
		if(proj == null)	proj = _rule.getProject();
		//Maybe handle it elsewhere if the rule is newly created?
		
		if(proj == null) return false;
		
		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		Double field1 = Project.getFinancialFields(f1 , proj);
		Double field2 = Project.getFinancialFields(f2 , proj);
		
		if(f1.equals("cost") && f2.equals("None"))
		{
			if(field1 == null)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("customerNumber") && f2.equals("None"))
		{
			if(field1 == null)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("shouldInvoice") && f2.equals("actualInvoice"))
		{
			if(field1 == 0 && field2 == 0)
			{
				return true;
			}
			else if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("shouldInvoice") && f2.equals("None"))
		{
			if(field1 == 0)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("actualInvoice") && f2.equals("None"))
		{
			if(field1 == 0)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		return true;
	}
	
	
	public static Map<String , Object> EvaluateProjectTasks(ProjectRule rule , Project project)
	{
		if(rule == null || project == null)
			return null;
		
		Map<String , Object> map = new HashMap<String , Object>();
		List<Task> tasks = ProjectObjectService.getAllTasks(project.getId());
		map.put("TASKS", tasks);
		for(Task task : tasks)
		{
			boolean result;
			Map<String , Object> results = new HashMap<String , Object>();
			map.put(task.getId().toString(), results);
			
			result = TaskEvaluate(rule , task);
			
			results.put("title" , task.getTitle());
			if(task.getAssignee() == null)
				results.put("assignee", task.getSubAssignee());
			else
				results.put("assignee", task.getAssignee());
			results.put("dueDate", task.getDueDate());
			results.put("description", task.getDescription());
			results.put("notes", task.getNotes());
			results.put("status", task.getTaskStatus());
										
			if(result == true) {
				results.put("message" , rule.getPassMessage());
				results.put("passed", "true");
			}
			else {
				results.put("message" , rule.getFailMessage());
				results.put("passed", "false");
			}
		}
		
		return map;
		
	}	
	
	
	public static boolean TaskEvaluate(ProjectRule _rule , Task _task)
	{
		Task task = _task;
		if(task == null)
			return false;
		
		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		Object field1 = Task.getTaskFields(f1 , task);
		Object field2 = Task.getTaskFields(f2 , task);
		Date today = new Date();
		
		if(f1.equals("dueDate") && f2.equals("assignedDate"))
		{			
			if(field1 == null || field2 == null)
			{
				return true;
			}
			
			int result = ((Date) field1).compareTo((Date)field2);
			
			if(result == -1)
				return false;
			else
				return true;
		}
		
		if(f1.equals("dueDate") && f2.equals("status"))
		{
			if(field1 == null || field2 == null)
			{
				return true;
			}
			
			int result = ((Date) field1).compareTo(today);
			
			if(result == -1 && field2.equals("1"))
			{
				return false;
			}
			else
			{
				return true;
			}
			
		}
		
		if(f1.equals("status") && f2.equals("none"))
		{
			if(field1 == null)
			{
				return true;
			}
			
			if(field1.equals("1"))
			{
				return false;
			}
			else
			{
				return true;
			}
			
		}
		
			return true;
	}

	public static boolean SchedulingEvaluate(ProjectRule _rule , Project _proj)
	{
		Project proj = _proj;
		
		if(proj == null)	proj = _rule.getProject();
		//Maybe handle it elsewhere if the rule is newly created?
		
		if(proj == null) return false;
		
		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		System.out.println(f1 + "    " + f2);
		
		Date field1 = Project.getSchedulingFields(f1 , proj);
		Date field2 = Project.getSchedulingFields(f2 , proj);
		Date today = new Date();
		
		if(f1.equals("projectInitiatedDate") && f2.equals("None"))
		{
			
			if(field1 == null)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	
//		if(f1.equals("projectInitiatedDate") && f2.equals("siteSurvey"))
//		{
//			if(field1 == null || field2 == null)
//				return true;
//			
//			int result = field1.compareTo(today);
//			
//			if(result == 1)
//				return false;
//			else
//				return true;
//		}
//		
//		if(f1.equals("scheduledStartDate") && f2.equals("scheduledTurnover"))
//		{
//			if(field1 == null || field2 == null)
//				return true;
//			
//			int result = field1.compareTo(today);
//			
//			if(result == 1)
//				return false;
//			else
//				return true;
//		}
		
		if(f1.equals("proposalDue") && f2.equals("proposalSubmitted"))
		{	
			if(field1 == null)
				return true;
	
			int result = field1.compareTo(today);
			
			if((result == 0 || result == -1) && field2 == null)
				return false;
			else
				return true;
		}
		
		if(f1.equals("budgetaryDue") && f2.equals("budgetarySubmitted"))
		{	
			if(field1 == null)
				return true;
	
			int result = field1.compareTo(today);
			
			if((result == 0 || result == -1) && field2 == null)
				return false;
			else
				return true;
		}
		
		if(f1.equals("scheduledTurnover") && f2.equals("actualTurnover"))
		{	
			if(field1 == null)
				return true;
	
			int result = field1.compareTo(today);
			
			if((result == 0 || result == -1) && field2 == null)
				return false;
			else
				return true;
		}
		
		System.out.println("missed if");
		return true;
	}
	
	public static boolean generalInfoEvaluate(ProjectRule _rule, Project _proj)
	{
		Project proj = _proj;
		if(proj == null)	
			proj = _rule.getProject();
		
		if(proj == null)
			return false;
		
		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		System.out.println(f1 + "  &&  " + f2);
		
		Object field1 = Project.getGeneralInfoFields(f1 , proj);
		Object field2 = Project.getGeneralInfoFields(f2 , proj);
		
		
		if(f1.equals("autofillPermits") && f2.equals("None"))
		{
			
			if(field1 == null || field1.equals("default"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("autofillPermits"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("autofillHVAC") && f2.equals("None"))
		{
			if(field1 == null || field1.equals("default"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("autofillRefrigeration") && f2.equals("None"))
		{
			if(field1 == null || field1.equals("default"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("projectClass") && f2.equals("None"))
		{
			ProjectClass cl1 = (ProjectClass) field1;
			String projClass = cl1.getName();
			if(projClass.equals("--Please specify the project type--"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("McsNumber") && f2.equals("stage"))
		{	
			System.out.println(field1);
			ProjectStage fd2 = (ProjectStage) field2;
			String stage = fd2.getName();
			
			if((int)field1 <= 0 && stage.equals("Active"))
			{
				return false;
			}
			else
			{	
				return true;
			}
		}
		
		if(f1.equals("stage") && f2.equals("status"))
		{	
			ProjectStage fd3 = (ProjectStage) field1;
			String stageName = fd3.getName();
			ProjectStatus fd4 = (ProjectStatus) field2;
			String statusName = fd4.getName();
			
			if(stageName.equals("Active") && !(statusName.equals("Awaiting Direction") || statusName.equals("Awaiting Drawings") || statusName.equals("Awaiting Permit") || statusName.equals("Closeout") || statusName.equals("Scheduling") || statusName.equals("Scheduled")))			
			{
				_rule.setFailMessage("Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Closeout, Scheduled, or Scheduling if Stage is Active");
				return false;
			}
			else if(stageName.equals("Budgetary") && !(statusName.equals("Awaiting Direction") || statusName.equals("Awaiting Drawings") || statusName.equals("Preparing Proposal") || statusName.equals("Proposal Submitted")))			
			{
				_rule.setFailMessage("Status must be either Awaiting Direction, Awaiting Drawings, Preparing Proposal, or Proposal Submitted if Stage is Budgetary");
				return false;
			}
			else if(stageName.equals("Canceled") && !(statusName.equals("Closed") || statusName.equals("Lost")))			
			{
				_rule.setFailMessage("Status must be either Closed or Lost if Stage is Cancelled");
				return false;
			}
			else if(stageName.equals("Closed") && !(statusName.equals("Closed")))
			{
				_rule.setFailMessage("Status must be Closed if Stage is Closed");
			}
			else if(stageName.equals("On Hold") && !(statusName.equals("Awaiting Direction") || statusName.equals("Awaiting Drawings")))			
			{
				_rule.setFailMessage("Status must be either Awaiting Direction or Awaiting Drawings if Stage is On Hold");
				return false;
			}
			else if(stageName.equals("Proposal") && !(statusName.equals("Awaiting Direction") || statusName.equals("Awaiting Drawings") || statusName.equals("Awaiting Permit") || statusName.equals("Lost") || statusName.equals("Preparing Proposal") || statusName.equals("Proposal Submitted")))			
			{
				_rule.setFailMessage("Status must be either Awaiting Direction, Awaiting Drawings, Awaiting Permit, Lost, Preparing Proposal, or Proposal Submitted if Stage is Proposal");
				return false;
			}
			else
			{	
				return true;
			}	
		}
		
		System.out.println("missed if");
		return true;
		
	}
	
//	public static boolean EquipmentEvaluate(ProjectRule _rule , NewEquipment _eq)
//	{
//		NewEquipment eq = null;
//		
//		if(_eq == null)	return true;
//		
//		//Maybe handle it elsewhere if the rule is newly created?
//		
//		eq = _eq;
//		
//		String f1 , f2;
//		f1 = _rule.getField1();
//		f2 = _rule.getField2();
//		
//		Object field1 = NewEquipment.getNewEquipmentFields(f1 , eq);
//		Object field2 = NewEquipment.getNewEquipmentFields(f2 , eq);
//		
//
//		if(field1 instanceof Date && field2 instanceof Date)
//			return _rule.evaluate(EvaluateDates((Date) field1 , (Date) field2));
//		else if(field1 instanceof Date && field2 == null)
//			return _rule.evaluate(EvaluateDates((Date) field1 , null));
//		else if(field1 == null && field2 instanceof Date)
//			return _rule.evaluate(EvaluateDates(null , (Date) field2));
//		
//		return false;
//
//	}
//	
	public static boolean PermitAndInspectionEvaluate(ProjectRule _rule , Project _proj)
	{
		Project proj = _proj;
		
		if(proj == null)	proj = _rule.getProject();
		//Maybe handle it elsewhere if the rule is newly created?
		
		String permitReq = proj.getAutofillPermits();
		
		Permits perms = proj.getPermits();
		if(perms == null)
			return true;

		String f1 , f2;
		f1 = _rule.getField1();
		f2 = _rule.getField2();
		
		Object field1 = Permits.getPermitAndInspectionFields(f1 , perms);
		Object field2 = Permits.getPermitAndInspectionFields(f2 , perms);

		if(f1.equals("buildingPermitRequired") && f2.equals("buildingInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingPermitRequired") && f2.equals("ceilingInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalPermitRequired") && f2.equals("mechanicalInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	
		
		if(f1.equals("electricalPermitRequired") && f2.equals("electricalInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		
		if(f1.equals("plumbingPermitRequired") && f2.equals("plumbingInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	
		
		if(f1.equals("gasPermitRequired") && f2.equals("gasInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
	
		
		if(f1.equals("sprinklerPermitRequired") && f2.equals("sprinklerInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		
		if(f1.equals("fireAlarmPermitRequired") && f2.equals("fireAlarmInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		
		if(f1.equals("voltagePermitRequired") && f2.equals("voltageInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals(field2)))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
					
		if(f1.equals("buildingPermitRequired") && f2.equals("buildingPermitStatus"))
		{			
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingPermitRequired") && f2.equals("ceilingPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalPermitRequired") && f2.equals("mechanicalPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalPermitRequired") && f2.equals("electricalPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingPermitRequired") && f2.equals("plumbingPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasPermitRequired") && f2.equals("gasPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerPermitRequired") && f2.equals("sprinklerPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmPermitRequired") && f2.equals("fireAlarmPermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltagePermitRequired") && f2.equals("voltagePermitStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingInspectionRequired") && f2.equals("buildingInspectionStatus"))
		{			
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingInspectionRequired") && f2.equals("ceilingInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalInspectionRequired") && f2.equals("mechanicalInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalInspectionRequired") && f2.equals("electricalInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingInspectionRequired") && f2.equals("plumbingInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasInspectionRequired") && f2.equals("gasInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerInspectionRequired") && f2.equals("sprinklerInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmInspectionRequired") && f2.equals("fireAlarmInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltageInspectionRequired") && f2.equals("voltageInspectionStatus"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(field1.equals("1") && field2.equals("N/A"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingPermitStatus") && f2.equals("buildingPermitRequired"))
		{			
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingPermitStatus") && f2.equals("ceilingPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalPermitStatus") && f2.equals("mechanicalPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalPermitStatus") && f2.equals("electricalPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingPermitStatus") && f2.equals("plumbingPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasPermitStatus") && f2.equals("gasPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerPermitStatus") && f2.equals("sprinklerPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmPermitStatus") && f2.equals("fireAlarmPermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltagePermitStatus") && f2.equals("voltagePermitRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingInspectionStatus") && f2.equals("buildingInspectionRequired"))
		{			
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingInspectionStatus") && f2.equals("ceilingInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalInspectionStatus") && f2.equals("mechanicalInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalInspectionStatus") && f2.equals("electricalInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingInspectionStatus") && f2.equals("plumbingInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasInspectionStatus") && f2.equals("gasInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerInspectionStatus") && f2.equals("sprinklerInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmInspectionStatus") && f2.equals("fireAlarmInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltageInspectionStatus") && f2.equals("voltageInspectionRequired"))
		{
			if(field1 == null || field2 == null)
				return true;
			
			if(!(field1.equals("N/A")) && field2.equals("2"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmPermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltagePermitRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltageInspectionRequired"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("0"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmPermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltagePermitStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("buildingInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("ceilingInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("mechanicalInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("electricalInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("plumbingInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("gasInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("sprinklerInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("fireAlarmInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		if(f1.equals("voltageInspectionStatus"))
		{
			if(field1 == null)
				return true;
			
			if(field1.equals("TBD"))
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		
		return true;
		
	}
	
	public static Map<String , Object> EvaluateProject(List<ProjectRule> rules , Project project)
	{
		if(project == null || rules == null) return null;
		
		Map<String , Object> evaluation = new HashMap<String , Object>();
		evaluation.put("PROJECT", project);
		project.setLowScore(0);
		project.setMediumScore(0);
		project.setHighScore(0);
		
		System.out.println("eval project");
		
		for(ProjectRule rule : rules)
		{
			Map<String , Object> map = new HashMap<String , Object>();
			//evaluation.put(rule.getId().toString() , map);
			evaluation.put(rule.getTitle() , map);
			map.put("RULE_ID", rule.getId());
			map.put("RULE_TITLE", rule.getTitle());
			map.put("RULE_DOMAIN", rule.getDomain());

			if(rule.getProjectClass() == null || 
				 (rule.getProjectClass() != null && rule.getProjectClass().getName().equalsIgnoreCase(project.getProjectClass().getName())))
			{
				Boolean result = null;
				switch(rule.getDomain())
				{
					case PermitsAndInspections:
						result = PermitAndInspectionEvaluate(rule , project);
						map.put("type", "PermitsAndInspections");
						break;
					case Scheduling:
						result = SchedulingEvaluate(rule , project);
						map.put("siteSurvey", project.getSiteSurvey());
						map.put("budgetaryDue" , project.getBudgetaryDue());
						map.put("budgetarySubmitted", project.getBudgetarySubmitted());
						map.put("proposalDue", project.getProposalDue());
						map.put("proposalSubmitted", project.getProposalSubmitted());
						map.put("scheduledStartDate", project.getScheduledStartDate());
						map.put("projectInitiatedDate", project.getProjectInitiatedDate());
						map.put("scheduledTurnover", project.getScheduledTurnover());
						map.put("actualTurnover", project.getActualTurnover());
						map.put("type", "Scheduling");
						break;
					case GeneralInfo:
						result = generalInfoEvaluate(rule, project);
						map.put("McsNumber", project.getMcsNumber());
						map.put("warehouse", project.getWarehouse());
						map.put("projectItem", project.getProjectItem());
						map.put("projectManagers", project.getProjectManagers());
						map.put("supervisors", project.getSupervisors());
						map.put("stage", project.getStage());
						map.put("status", project.getStatus());
						map.put("projectType", project.getProjectType());
						map.put("projectClass", project.getProjectClass());
						map.put("autofillHVAC", project.getAutofillHVAC());
						map.put("autofillPermits", project.getAutofillPermits());
						map.put("autofillRefrigeration", project.getAutofillRefrigeration());
						map.put("scope", project.getScope());
						map.put("type", "GeneralInfo");
						break;
//					case Tasks:
//						Map<String, Object> taskMap = EvaluateProjectTasks(rule , project);
//						map.put("taskResults", taskMap);
//						map.put("type", "Task");
//						break;
					case Financial:
						result = FinancialEvaluate(rule , project);
						map.put("shouldInvoice", project.getShouldInvoice());
						map.put("actualInvoice", project.getInvoiced());
						map.put("cost", project.getCost());
						map.put("type", "Financial");
						break;
//					case ChangeOrders:
//					//	Map<String , Object> changeOrderMap = EvaluateProjectChangeOrders(rule , project);
//					//	map.put("changeOrderResults", changeOrderMap);
//						map.put("type", "ChangeOrders");
//						break;
					case Closeout:
						result = CloseoutEvaluate(rule , project);
						map.put("closeoutDetails", project.getCloseoutDetails());
						map.put("type", "Closeout");
						break;
//					case Equipment:
//					//	Map<String , Object> equipmentMap = EvaluateProjectChangeOrders(rule , project);
//					//	map.put("equipmentResults", equipmentMap);
//						map.put("type", "Equipment");
//						break;
					default:
						break;
				}
				if(result != null)
				{
					if(result == true) {
						map.put("message" , rule.getPassMessage());
						map.put("passed", "true");
					}
					else 
					{
						switch(rule.getSeverity())
						{
							case LOW:
								project.setLowScore(project.getLowScore() + 1);
								break;
							case MEDIUM:
								project.setMediumScore(project.getMediumScore() + 1);
								break;
							case HIGH:
								project.setHighScore(project.getHighScore() + 1);
								break;
						}
						map.put("message", rule.getFailMessage());
						map.put("passed", "false");
					}
				}
					
			}
		}
		
		return evaluation;
		
	}
	
	
	public static Map<String , Object> getScores(List<ProjectRule> rules , Project project)
	{
		if(project == null || rules == null) return null;
		
		Map<String , Object> evaluation = new HashMap<String , Object>();
		evaluation.put("PROJECT", project);
		project.setLowScore(0);
		project.setMediumScore(0);
		project.setHighScore(0);
		
		System.out.println("eval project");
		
		for(ProjectRule rule : rules)
		{
			Map<String , Object> map = new HashMap<String , Object>();
			evaluation.put(rule.getTitle() , map);
			map.put("RULE_ID", rule.getId());
			map.put("RULE_TITLE", rule.getTitle());
			map.put("RULE_DOMAIN", rule.getDomain());
			map.put("failMessage", rule.getFailMessage());
			map.put("passMessage", rule.getPassMessage());
			//map.put("passed", "false");
			
			if(rule.getProjectClass() == null || 
				 (rule.getProjectClass() != null && rule.getProjectClass().getName().equalsIgnoreCase(project.getProjectClass().getName())))
			{
				switch(rule.getDomain())
				{
					case PermitsAndInspections:
					//	result = PermitAndInspectionEvaluate(rule , project);
						map.put("type", "PermitsAndInspections");
						break;
					case Scheduling:
					//	result = SchedulingEvaluate(rule , project);
						map.put("siteSurvey", project.getSiteSurvey());
						map.put("budgetaryDue" , project.getBudgetaryDue());
						map.put("budgetarySubmitted", project.getBudgetarySubmitted());
						map.put("proposalDue", project.getProposalDue());
						map.put("proposalSubmitted", project.getProposalSubmitted());
						map.put("scheduledStartDate", project.getScheduledStartDate());
						map.put("projectInitiatedDate", project.getProjectInitiatedDate());
						map.put("scheduledTurnover", project.getScheduledTurnover());
						map.put("actualTurnover", project.getActualTurnover());
						map.put("type", "Scheduling");
						break;
					case GeneralInfo:
					//	result = generalInfoEvaluate(rule, project);
						map.put("McsNumber", project.getMcsNumber());
						map.put("warehouse", project.getWarehouse());
						map.put("projectItem", project.getProjectItem());
						map.put("projectManagers", project.getProjectManagers());
						map.put("supervisors", project.getSupervisors());
						map.put("stage", project.getStage());
						map.put("status", project.getStatus());
						map.put("projectType", project.getProjectType());
						map.put("projectClass", project.getProjectClass());
						map.put("autofillHVAC", project.getAutofillHVAC());
						map.put("autofillPermits", project.getAutofillPermits());
						map.put("autofillRefrigeration", project.getAutofillRefrigeration());
						map.put("scope", project.getScope());
						map.put("type", "GeneralInfo");
						break;
//					case Tasks:
//					//	Map<String , Object> taskMap = EvaluateProjectTasks(rule , project);
//						map.put("taskResults", taskMap);
//						map.put("type", "Task");
//						break;
					case Financial:
					//	result = FinancialEvaluate(rule , project);
						map.put("shouldInvoice", project.getShouldInvoice());
						map.put("actualInvoice", project.getInvoiced());
						map.put("cost", project.getCost());
						map.put("type", "Financial");
						break;
//					case ChangeOrders:
//					//	Map<String , Object> changeOrderMap = EvaluateProjectChangeOrders(rule , project);
//					//	map.put("changeOrderResults", changeOrderMap);
//						map.put("type", "ChangeOrders");
//						break;
					case Closeout:
					//	result = CloseoutEvaluate(rule , project.getCloseoutDetails());
						map.put("closeoutDetails", project.getCloseoutDetails());
						map.put("type", "Closeout");
						break;
//					case Equipment:
//					//	Map<String , Object> equipmentMap = EvaluateProjectChangeOrders(rule , project);
//					//	map.put("equipmentResults", equipmentMap);
//						map.put("type", "Equipment");
//						break;
					default:
						break;
				}	
			}
		}
		
		return evaluation;
		
	}
	


	
//	public static Map<String , Object> EvaluateProjectChangeOrders(ProjectRule rule , Project project)
//	{
//		if(rule == null || project == null)
//			return null;
//		
//		Map<String , Object> map = new HashMap<String , Object>();
//		Set<ChangeOrder> changeOrders = project.getChangeOrders();
//		
//
//		for(ChangeOrder co : changeOrders)
//		{
//			boolean result;
//			Map<String , Object> results = new HashMap<String , Object>();
//			map.put(co.getId().toString(), results);
//			
//			result = ChangeOrderEvaluate(rule , co);
//			
//			results.put("title" , co.getTitle());
//			results.put("proposalDate", co.getProposalDate());
//			results.put("submittedDate", co.getSubmittedDate());
//			results.put("approvedDate", co.getApprovedDate());
//			results.put("cost" , co.getCost());
//			results.put("sell", co.getSell());
//			results.put("submittedTo", co.getSubmittedTo());
//			results.put("description", co.getBriefDescription());
//			results.put("notes", co.getNotes());
//			results.put("status", co.getStatus());
//										
//			if(result == true) {
//				results.put("message" , rule.getPassMessage());
//				results.put("passed", "true");
//			}
//			else {
//				results.put("message" , rule.getFailMessage());
//				results.put("passed", "false");
//			}
//		}
//		
//		return map;
//		
//	}

	
//	public static Map<String , Object> EvaluateProjectEquipment(ProjectRule rule , Project project)
//	{
//		if(rule == null || project == null)
//			return null;
//		
//		Map<String , Object> map = new HashMap<String , Object>();
//		Set<NewEquipment> equipment = project.getProjEquipment();
//		
//
//		for(NewEquipment eq : equipment)
//		{
//			boolean result;
//			Map<String , Object> results = new HashMap<String , Object>();
//			map.put(eq.getId().toString(), results);
//			
//			result = EquipmentEvaluate(rule , eq);
//			
//			results.put("title" , eq.getEquipmentName());
//			results.put("orderedDate", eq.getOrderedDate());
//			results.put("deliveryDate", eq.getDeliveryDate());
//			results.put("estDeliveryDate", eq.getEstDeliveryDate());
//			results.put("vendor" , eq.getVendor());
//			results.put("description", eq.getDescription());
//			results.put("notes", eq.getNotes());
//			results.put("deliveryStatus", eq.getDeliveryStatus());
//			results.put("eqStatus", eq.getEqStatus());
//										
//			if(result == true) {
//				results.put("message" , rule.getPassMessage());
//				results.put("passed", "true");
//			}
//			else {
//				results.put("message" , rule.getFailMessage());
//				results.put("passed", "false");
//			}
//			
//		}
//		
//		return map;
//		
//	}
//

}