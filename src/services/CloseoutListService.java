package services;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import projectObjects.CloseoutCheckList;
import projectObjects.CloseoutInfo;
import projectObjects.Project;

public class CloseoutListService {
	
	public static final int asBuilts = 1;
	public static final int punchList = 2;
	public static final int permits = 3;
	public static final int closeoutPhotos = 4;
	public static final int revisions = 5;
	public static final int mechInspection = 6;
	public static final int elecInspection = 7;
	public static final int plumbInspection = 8;
	public static final int fireSprinklerInspection = 9;
	public static final int ansulInspection = 10;
	public static final int buildingInspection = 11;
	public static final int alarmForm = 12;
	public static final int hvacShutdown = 13;
	public static final int airGas = 14;
	public static final int hvacForm = 15;
	public static final int salvage = 16;
	public static final int mulvannyPunchList = 17;
	public static final int substantialCompletion = 18;
	public static final int subcontractorWarranty = 19;
	public static final int mcsWarranty = 20;
	public static final int lienRelease = 21;
	public static final int confirmCOs = 22;
	public static final int g704 = 23;
	public static final int g706 = 24;
	public static final int g706a = 25; 
	
	public static void setCheckList(long id, String [] a)
	{
		//Create Project object service, check list, and project to deal with
		CloseoutCheckList cL = new CloseoutCheckList();
		Project p = new Project();
		
		//Attempt to retrieve the project by id (Which should always work), and the check list
		try {
			p = (Project)ProjectObjectService.get(id,"Project");
			cL = p.getCloseoutCheckList();
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
		
		//Check to see if the project already has a check list
		if(cL == null)
		{
			//If it does not, create a check list and the appropriate sub categories
				cL = new CloseoutCheckList();

				for(int i = 0; i < a.length; i++)
				{
					CloseoutInfo b = new CloseoutInfo();
					if(a[i] != null && a[i] != "")
					{
					try {
						b.setDate(new SimpleDateFormat("MM/dd/yyyy").parse(a[i]));
					} 
					catch (ParseException e) {
						e.printStackTrace();
					}
					b.setInfo("");
					b.setId((long) i);
					if(i == asBuilts)
						cL.getGeneralCloseout().setAsBuilts(b);
					else if(i == punchList)
						cL.getGeneralCloseout().setPunchList(b);
					else if(i == permits)
						cL.getGeneralCloseout().setPermitsClosed(b);
					else if(i == closeoutPhotos)
						cL.getGeneralCloseout().setCloseOutPhotos(b);
					else if(i == revisions)
						cL.getGeneralCloseout().setRevisions(b);
					else if(i == mechInspection)
						cL.getInspectionCloseout().setMechanical(b);
					else if(i == elecInspection)
						cL.getInspectionCloseout().setElectric(b);
					else if(i == plumbInspection)
						cL.getInspectionCloseout().setPlumbing(b);
					else if(i == fireSprinklerInspection)
						cL.getInspectionCloseout().setFireSprinkler(b);
					else if(i == ansulInspection)
						cL.getInspectionCloseout().setAnsul(b);
					else if(i == buildingInspection)
						cL.getInspectionCloseout().setBuilding(b);
					else if(i == alarmForm)
						cL.getHvacCloseout().setAlarmForm(b);
					else if(i == hvacShutdown)
						cL.getHvacCloseout().setHvacShutdown(b);
					else if(i == airGas)
						cL.getRefrigCloseout().setAirGas(b);
					else if(i == hvacForm)
						cL.getRefrigCloseout().setHvacForm(b);
					else if(i == salvage)
						cL.getRefrigCloseout().setSalvage(b);
					else if(i == mulvannyPunchList)
						cL.getAiaCloseout().setMulvannyPunchList(b);
					else if(i == substantialCompletion)
						cL.getAiaCloseout().setSubstantialCompletion(b);
					else if(i == subcontractorWarranty)
						cL.getAiaCloseout().setSubcontratorWarranty(b);
					else if(i == mcsWarranty)
						cL.getAiaCloseout().setMcsWarranty(b);
					else if(i == lienRelease)
						cL.getAiaCloseout().setLienRelease(b);
					else if(i == confirmCOs)
						cL.getAiaCloseout().setConfirmCos(b);
					else if(i == g704)
						cL.getAiaCloseout().setG704(b);
					else if(i == g706)
						cL.getAiaCloseout().setG706(b);
					else if(i == g706a)
						cL.getAiaCloseout().setG706A(b);
					}
				}

				
		
		}
		
		p.setCloseoutCheckList(cL);
		try {
			ProjectObjectService.editObject("Project", p.getId(), p,0);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	
	}
	
}
