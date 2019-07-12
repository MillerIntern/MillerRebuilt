package services;

import java.util.HashMap;

import org.hibernate.Session;
import org.hibernate.Transaction;

import objects.HibernateUtil;
import projectObjects.Project;
import projectObjects.RuleDetails;


public class ProjectNewRuleColorService {
	
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

		String generalColor = "green";
		int mcsNumber = proj.getMcsNumber();
		String projectManager = proj.getProjectManagers().getName();
		String projectSupervisor = proj.getSupervisors().iterator().next().getName();
		String stage = proj.getStage().getName();
		Long status = proj.getStatus().getId();
		String hvac = proj.getAutofillHVAC();
		String refrigeration = proj.getAutofillRefrigeration();
		String permits = proj.getAutofillPermits();
		int mediumScore = 0 ;
		
		if(permits == null || permits.equals("0")) {
			generalColor = "yellow";
		}
		//2
		if(hvac == null|| hvac.equals("2")) {
			generalColor = "yellow";
		}
		//3
		if(refrigeration == null || refrigeration.equals("2")) {
			generalColor = "yellow";
		}
		//4
		if(projectManager == projectSupervisor) {
			generalColor = "yellow";
		}
		//5
		if(mcsNumber == 0 || mcsNumber == -1) {
			generalColor = "red";
		}
		//6
		if((stage.equals("Active")) && !(status == 4 || status == 11 || status == 30 || status == 35 || status == 29 || status == 26)) {
			generalColor = "yellow";
		}
		//7
		if((stage.equals("Budgetary")) && !(status == 4 || status == 11 || status == 1 || status == 3)) {
			generalColor = "yellow";
		}
		//8
		//Stage Cancelled or On Hold
		//9
		if((stage.equals("Closed")) && !(status == 35)) {
			generalColor = "yellow";
		}
		//10
		if((stage.equals("Proposal")) && !(status == 4 || status == 11 || status == 30 || status == 34 || status == 1 || status == 3)) {
			generalColor = "yellow";
		}				

		
		if(generalColor.equals("green")) { 
			proj.setMediumScore(0);
			}
		else if(generalColor.equals("yellow")) { 
			proj.setMediumScore(1);
		}
		else if(generalColor.equals("red")) { 
			proj.setMediumScore(2);
		}
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.clear();
		session.update(proj);
		tx.commit();
		 projectsIdColor.put(projects[i], generalColor);
			}

			return projectsIdColor;
		}

	}
