package services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;

import projectObjects.ChangeOrder;
import projectObjects.CloseoutDetails;
import projectObjects.Equipment;
import projectObjects.EquipmentStatus;
import projectObjects.EquipmentVendor;
import projectObjects.Inspections;
import projectObjects.Permits;
import projectObjects.Person;
import projectObjects.Project;
import projectObjects.ProjectClass;
import projectObjects.ProjectItem;
import projectObjects.ProjectStage;
import projectObjects.ProjectStatus;
import projectObjects.ProjectType;
import projectObjects.Region;
import projectObjects.SalvageValue;
import projectObjects.Warehouse;
import services.helpers.CloseoutDetailsFiller;
import services.helpers.InspectionsFiller;
import services.helpers.PermitsFiller;
import services.helpers.SalvageValueFiller;


/**
 * This class encapsulates logic to add, edit, and retrieve construction project information
 * @author Alex Campbell
 *
 */
public class ProjectService extends ProjectObjectService
{
	
	//private static Long iID;
	
	/**
	 * This method adds a project to the database. The fields REQUIRED for a project are specific arguments.
	 * The OPTIONAL fields for a projects are parsed from the HTTP Request parameter mapping
	 * 
	 * @param warehouseID the warehouse id
	 * @param managerID the manager id
	 * @param supervisorID the supervisor id
	 * @param classID the ProjectClass id
	 * @param projectItemID the ProjectItem id
	 * @param statusID the ProjectStatus id
	 * @param stageID the ProjectStage id
	 * @param scope the scope of the project
	 * @param params the parameter mapping of the HTTP Request
	 * @return
	 * @throws ClassNotFoundException
	 * @throws ParseException
	 * @throws IOException 
	 * @throws NumberFormatException 
	 */
	public  String addProject(Long warehouseID, Long managerID, Long supervisorID, Long classID, Long projectItemID, Long statusID, Long stageID, Long typeID, String scope, 
			Map<String, String>params, Long inspectionTN, HttpServletRequest req) throws ClassNotFoundException, ParseException, NumberFormatException, IOException
	{
		System.out.println("in add");
		System.out.println(params);
		//Initialize Services
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
	
		//Read Max ID from file
		File file = new File("C:\\TestEnvironment\\projectIdCount.txt");
		Integer maxId = 0;
		try
		{
			BufferedReader br = new BufferedReader(new FileReader(file));
		 
			String line = null;
			while ((line = br.readLine()) != null) {
		
				maxId = Integer.parseInt(line)+1;
			}
			br.close();
		}
		catch(Exception e)
		{
			System.out.println("Hah, I havent broken yet!");
		}

		
			Long maxID = (long) maxId;	
			System.out.println("Current ID: " + maxID);
		//Get REQUIRED project data
		Warehouse warehouse = (Warehouse) ProjectObjectService.get(warehouseID, "Warehouse");
		Person manager = (Person) ProjectObjectService.get(new Long(managerID), "Person");
		Person supervisor = (Person) ProjectObjectService.get(new Long(supervisorID), "Person");
		ProjectClass projectClass = (ProjectClass) ProjectObjectService.get(new Long(classID), "ProjectClass");
		ProjectStatus status = (ProjectStatus) ProjectObjectService.get(new Long(statusID), "ProjectStatus");
		ProjectItem item = (ProjectItem) ProjectObjectService.get(new Long(projectItemID), "ProjectItem");
		ProjectStage stage = (ProjectStage) ProjectObjectService.get(stageID, "ProjectStage");
		ProjectType pType = (ProjectType) ProjectObjectService.get(typeID, "ProjectType");
		String mcsNumString = params.get("mcsNumber");
		
		Inspections inspections = null;
		if(inspectionTN!=-1)
			inspections= (Inspections) ProjectObjectService.get(inspectionTN, "Inspections");
	
		int mcsNum = -1;
		//int fpo = -1;
		//Parse mcsNumber, change to -1 if it's not a number
		try
		{
			mcsNum = Integer.parseInt(mcsNumString);
			//fpo = Integer.parseInt(fpoString);
			System.out.println(mcsNum);
			
			
		}catch(Exception e){}

		//Get invoice values and notes
		int shouldInvoice = Integer.parseInt(params.get("shouldInvoice"));
		int actualInvoice = Integer.parseInt(params.get("actualInvoice"));
		String notes = params.get("notes");

		//Create and persist change orders if they exist
		String changeOrderJsonString = params.get("coItems");
		HashSet<ChangeOrder> changeOrders = ChangeOrderService.getChangeOrdersFromString(changeOrderJsonString);
				
		//assign values to dates, if they are not null
		Date finitiatedDate = null;
		Date fsurvey = null;
		Date fcostco = null;
		Date fproposal = null;
		Date fstart = null;
		Date fscheduled = null;
		Date factual = null;

		Date permitApp = null;
		
		//INspections
		Date fframing = null ; 
		Date fceiling = null; 
		Date froughMech = null; 
		Date froughElec= null;  
		Date froughPlumb = null; 
		Date fmechLightSmoke = null; 
		Date fmechFinal = null; 
		Date  felecFinal = null; 
		Date fplumbFinal = null; 
		Date ffireMarshal = null; 
		Date fhealth = null; 
		Date fbuildFinal = null; 
		//Long finspectionID = null; 
		
		//Create CloseoutDetails Object.
		CloseoutDetails cd = new CloseoutDetails();
		CloseoutDetailsFiller.fillCloseoutDetails(cd, params);
		SalvageValue sv = SalvageValueFiller.fillSalvageValue(cd, params);
		cd.setSalvageValue(sv);
		
		//Additional Fields
		String zachNotes = params.get("zachUpdates");
		String cost = params.get("cost");
		String customerNumber = params.get("customerNumber");
		
		if (!(params.get("initiated")).isEmpty())
			finitiatedDate = formatter.parse(params.get("initiated"));
		
		if (!(params.get("survey")).isEmpty())
			fsurvey = formatter.parse(params.get("survey"));
		
		if (!(params.get("costco")).isEmpty())
			fcostco = formatter.parse(params.get("costco"));
		
		if (!(params.get("proposal")).isEmpty())
			fproposal = formatter.parse(params.get("proposal"));
		

		
	// ***************Optional Inspections************************ \\
		if(!params.get("framing").isEmpty()) 
			fframing = formatter.parse(params.get("framing"));
		
		if(!params.get("ceiling").isEmpty()) 
			fceiling = formatter.parse(params.get("ceiling"));
		
		if(!params.get("roughMech").isEmpty()) 
			froughMech = formatter.parse(params.get("roughMech"));
		
		if(!params.get("roughElec").isEmpty()) 
			froughElec = formatter.parse(params.get("roughElec"));
			System.out.println(froughElec);
		
		if(!params.get("roughPlumb").isEmpty()) 
			froughPlumb = formatter.parse(params.get("roughPlumb"));
		
		if(!params.get("mechLightSmoke").isEmpty()) 
		{
			fmechLightSmoke = formatter.parse(params.get("mechLightSmoke"));
		}
		
		if(!params.get("fireMarshal").isEmpty()) 
			ffireMarshal = formatter.parse(params.get("fireMarshal"));
		
		if(!params.get("health").isEmpty()) 
			fhealth = formatter.parse(params.get("health"));
		
//---------------------------------------------Receiving ARRAYS ------------------------------------------------------------
		
		//If there were any added equipments
		String[] equipToAdd = getGSONArray(req, "newEquip");

		if(equipToAdd.length!=0)
		{
		System.out.println("in equipment");
		
		String[][] equipProj = getGSON2DArray(req, "project_eq");
		String[][] equipComponent = getGSON2DArray(req, "component_eq");
		String[][] equipVendor = getGSON2DArray(req, "vendor_eq");
		
		//String[] equipIDS = getGSONArray(req, "equipIDS");
		String[] equipPO = getGSONArray(req, "po_eq");
		String[] equipEDD = getGSONArray(req, "estimatedDeliveryDate_eq");
		String[] equipName  = getGSONArray(req, "equipName"); 
		String[] equipNotes = getGSONArray(req, "notes_eq");
		
		String[] equipStatus = getGSONArray(req, "status_eq");
		
		
		
		long longEquipPO[] = new long[equipToAdd.length];
		Date[] dateEquipEDD = new Date[equipToAdd.length];
		//Date[] dateEquipVD = new Date[equipToAdd.length];
		int[] array = new int[equipToAdd.length];
		
		
//-------------------------------------------------------------------------------------------------------
		
		/*-------Equipment Objects----------*/
		Equipment equip;
		Warehouse warehouse_eq;
		ProjectItem item_eq;
		EquipmentVendor vendor_eq;
		EquipmentStatus status_eq;
		
		DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");

		
		for(int i=0; i<equipToAdd.length;i++)
		{
			equip = new Equipment();
			
			// Convert Arrays to either int, long or Date
			array[i] =(int) Long.parseLong(equipToAdd[i]);
			
			//crashing
			if(!equipPO[array[i]].equals(""))
			{
				longEquipPO[i] = new Long(equipPO[array[i]]);
			}
			
			if(!equipEDD[array[i]].equals(""))
			{
				dateEquipEDD[i] = format1.parse(equipEDD[array[i]]) ;
				System.out.println(dateEquipEDD[i]);
			}

			
			 warehouse_eq = (Warehouse) ProjectObjectService.get(Long.parseLong(equipProj[array[i]][2]), "Warehouse");	
			 item_eq = (ProjectItem) ProjectObjectService.get(Long.parseLong(equipComponent[array[i]][1]), "ProjectItem");
			 vendor_eq = (EquipmentVendor) ProjectObjectService.get(new Long(equipVendor[array[i]][1]), "EquipmentVendor");
			 status_eq = (EquipmentStatus) ProjectObjectService.get(new Long(equipStatus[array[i]]), "EquipmentStatus");
			 	// 2D arrays
			 
				equip.setWarehouse(warehouse_eq);
				equip.setEquipmentVendor(vendor_eq);
				equip.setProjectItem(item_eq);
				equip.setEquipStatus(status_eq);
				
				//Regular Arrays
				equip.setPO(longEquipPO[i]);
				equip.setEstimatedDelivery(dateEquipEDD[i]);
				equip.setEquipName(equipName[array[i]]);
				equip.setNotes(equipNotes[array[i]]);
				equip.setEqpd(maxID);
				
				System.out.println("EQPD:" +  maxID);
	
				ProjectObjectService.addObject("Equipment", equip);
			}
		}


	
		
//-------------------------Inspections -------------------------------------------------------------------	
		if(inspections==null)
		{
			inspections = new Inspections();
		}
		
		//set inspection fields
		System.out.println("inspection ticket number " + inspectionTN);
		inspections.setTicketNumber(inspectionTN);
		inspections.setFraming(fframing);
		inspections.setCeiling(fceiling);
		inspections.setRoughin_Mechanical(froughMech);
		inspections.setRoughin_Electric(froughElec);
		inspections.setRoughin_Plumbing(froughPlumb);
		inspections.setMechanicalLightSmoke(fmechLightSmoke);
		inspections.setMechanical_Final(fmechFinal);
		inspections.setElectrical_Final(felecFinal);
		inspections.setPlumbing_Final(fplumbFinal);
		inspections.setFire_Marshal(ffireMarshal);
		inspections.setHealth(fhealth);
		inspections.setBuilding_Final(fbuildFinal);
		
		
		
		//Permit Fields
		Permits	permits = new Permits();
		PermitsFiller.fillPermits(permits, params);
		
		//Set required fields
		Project p = new Project();
		p.setMcsNumber(mcsNum);
		p.setProjectClass(projectClass);
		p.addProjectManager(manager);
		p.addSupervisor(supervisor);
		p.setStatus(status);
		p.setWarehouse(warehouse);
		p.setScope(scope);
		p.setProjectItem(item);
		p.setStage(stage);
		p.setProjectType(pType);
		
//***********Set optional fields*******************\\
		
		//objects for different tables\\
		
		p.setInspections(inspections);
		p.setCloseoutDetails(cd);
		p.setPermits(permits);

		p.setProjectInitiatedDate(finitiatedDate);
		p.setSiteSurvey(fsurvey);
		p.setCostcoDueDate(fcostco);
		p.setProposalSubmitted(fproposal);
		p.setScheduledStartDate(fstart);
		p.setScheduledTurnover(fscheduled);
		p.setActualTurnover(factual);
		p.setShouldInvoice(shouldInvoice);
		p.setInvoiced(actualInvoice);
		p.setProjectNotes(notes);
		p.setChangeOrders(changeOrders);
		p.setZachUpdates(zachNotes);
		p.setCost(cost);
		p.setCustomerNumber(customerNumber);
		p.setPermitApplication(permitApp);
		
		System.out.println(p.getCloseoutDetails().getId() + " closeout id");
		System.out.println(p.getPermits().getId() + "  status id");
		System.out.println(p.getInspections().getId() + "  inspection id");
		
		//Add the project to the database.
		ProjectObjectService.addObject("Project", p);
	
		
		PrintWriter writer = new PrintWriter(file.getAbsoluteFile(),"UTF-8" );
		writer.println(maxID);
		writer.close();
        return "OK";  
	}
	
	/**
	 * This method edits a project that exists in the database. The REQUIRED fields for a project are given as arguments,
	 * while optional fields for a project are parsed from the HTTP request parameter mapping.
	 * 
	 * @param warehouseID the warehouse id
	 * @param managerID the manager id
	 * @param supervisorID the supervisor id
	 * @param classID the class id
	 * @param projectItemID the projectItem id
	 * @param statusID the ProjectStatus id
	 * @param stageID the ProjectStage id
	 * @param scope the scope of the project
	 * @param params the HTTP request parameter mapping
	 * @throws ClassNotFoundException
	 * @throws ParseException
	 */
	public static void editProject(Long warehouseID, Long managerID, Long supervisorID, Long classID, Long projectItemID, 
			Long statusID, Long stageID, Long typeID, String scope, Map<String, String>params, Long inspectionTN, 
			HttpServletRequest req) throws ClassNotFoundException, ParseException
	{
		
		System.out.println(params);
		//Initialize Services
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		System.out.println("in edit");
		//Get essential project data
		Warehouse warehouse = (Warehouse) ProjectObjectService.get(warehouseID, "Warehouse");
		Person manager = (Person) ProjectObjectService.get(new Long(managerID), "Person");
		Person supervisor = (Person) ProjectObjectService.get(new Long(supervisorID), "Person");
		ProjectClass projectClass = (ProjectClass) ProjectObjectService.get(new Long(classID), "ProjectClass");
		ProjectStatus status = (ProjectStatus) ProjectObjectService.get(new Long(statusID), "ProjectStatus");
		ProjectItem item = (ProjectItem) ProjectObjectService.get(new Long(projectItemID), "ProjectItem");
		ProjectStage stage = (ProjectStage) ProjectObjectService.get(stageID, "ProjectStage");
		ProjectType pType = (ProjectType) ProjectObjectService.get(typeID, "ProjectType");
		
		String mcsNumString = params.get("mcsNumber");
		
		//ID's 
		String iIDString = params.get("inspectionID");
		String closeoutIDString = params.get("closeoutID");
		String salvageIDString = params.get("salvageID");
		String permitsIDString = params.get("permitsID");
		
		int mcsNum = -1;
		Long iID = (long)-1;
		Long closeoutID = (long)-1;
		Long salvageID = (long)-1;
		Long permitsID = (long)-1;

		
		//Parse mcsNumber, change to -1 if it's not a number
		try
		{
			mcsNum = Integer.parseInt(mcsNumString);
			iID = Long.parseLong(iIDString);
			closeoutID = Long.parseLong(closeoutIDString);
			salvageID = Long.parseLong(salvageIDString);
			permitsID = Long.parseLong(permitsIDString);		
			
		}catch(Exception e){}
		
		//SMALL FIX BUT NOT CORRECT
		
		Inspections inspections = new Inspections();
		
		//inspections=(Inspections) ProjectObjectService.get(new Long(iID), "Inspections");
		
		System.out.println("inspection ID : " + iID);
		System.out.println("closeoutID : " + closeoutID);

		
		
		int shouldInvoice = Integer.parseInt(params.get("shouldInvoice"));
		int actualInvoice = Integer.parseInt(params.get("actualInvoice"));
		String notes = params.get("notes");
		
		//Additional fields
		String zachNotes = params.get("zachUpdates");
		String cost = params.get("cost");
		String customerNumber = params.get("customerNumber");
		
		//Parse change orders from strong
		//String changeOrderJsonString = params.get("coItems");
		//ChangeOrderService orderService = new ChangeOrderService();
		//HashSet<ChangeOrder> changeOrders = ChangeOrderService.getChangeOrdersFromString(changeOrderJsonString);
		
		Date finitiatedDate = null;
		Date fsurvey = null;
		Date fcostco = null;
		Date fproposal = null;
		Date fstart = null;
		Date fscheduled = null;
		Date factual = null;

		Date permitApp = null;
		
		Date fframing = null ; 
		Date fceiling = null; 
		Date froughMech = null; 
		Date froughElec= null;  
		Date froughPlumb = null; 
		Date fmechLightSmoke = null; 
		Date fmechFinal = null; 
		Date  felecFinal = null; 
		Date fplumbFinal = null; 
		Date ffireMarshal = null; 
		Date fhealth = null; 
		Date fbuildFinal = null; 
		
		//closeout

		
		//assign values to dates, if they are not null

		
		if (!(params.get("initiated")).isEmpty())
			finitiatedDate = formatter.parse(params.get("initiated"));
		
		if (!(params.get("survey")).isEmpty())
			fsurvey = formatter.parse(params.get("survey"));
		
		if (!(params.get("costco")).isEmpty())
			fcostco = formatter.parse(params.get("costco"));
		
		if (!(params.get("proposal")).isEmpty())
			fproposal = formatter.parse(params.get("proposal"));
		
//********************CLOSEOUTDETAILS OPTIONAL**************************\\
		
		if (!params.get("startDate").isEmpty())
			fstart = formatter.parse(params.get("startDate"));
		
		if (!params.get("scheduledTurnover").isEmpty())
			fscheduled = formatter.parse(params.get("scheduledTurnover"));
		
		if (!params.get("actualTurnover").isEmpty())
			factual = formatter.parse(params.get("actualTurnover"));
		
		if (!params.get("permitApp").isEmpty())
			permitApp = formatter.parse(params.get("permitApp"));
		
		// Closeout!
		
		CloseoutDetails cd = new CloseoutDetails();
		CloseoutDetailsFiller.fillCloseoutDetails(cd, params);
		SalvageValue sv = SalvageValueFiller.fillSalvageValue(cd, params);
		cd.setSalvageValue(sv);
		//ID's
		System.out.println("Salvage ID: " + salvageID);
		
// ************************Optional Inspections************************ \\
		if(!params.get("framing").isEmpty()) 
			fframing = formatter.parse(params.get("framing"));
				
		if(!params.get("ceiling").isEmpty()) 
			fceiling = formatter.parse(params.get("ceiling"));
				
		if(!params.get("roughMech").isEmpty()) 
			froughMech = formatter.parse(params.get("roughMech"));
				
		if(!params.get("roughElec").isEmpty()) 
			froughElec = formatter.parse(params.get("roughElec"));
			
		if(!params.get("roughPlumb").isEmpty()) 
			froughPlumb = formatter.parse(params.get("roughPlumb"));
		
		if(!params.get("mechLightSmoke").isEmpty()) 
		{
			fmechLightSmoke = formatter.parse(params.get("mechLightSmoke"));
		}
				
		if(!params.get("fireMarshal").isEmpty()) 
			ffireMarshal = formatter.parse(params.get("fireMarshal"));
				
		if(!params.get("health").isEmpty()) 
			fhealth = formatter.parse(params.get("health"));
		
		Long id = Long.parseLong(params.get("projectID"));
		String[] equipToAdd = getGSONArray(req, "newEquip");
		

		if(equipToAdd != null&& equipToAdd.length!=0)
		{
		System.out.println("in equipment");
		// ---------------------------Receiving ARRAYS -----------------------------------------------
			
		String[][] equipProj = getGSON2DArray(req, "project_eq");
		String[][] equipComponent = getGSON2DArray(req, "component_eq");
		String[][] equipVendor = getGSON2DArray(req, "vendor_eq");

	 	// 2D arrays

	
		
		String[] equipIDS = getGSONArray(req, "equipIDS");
		String[] equipPO = getGSONArray(req, "po_eq");
		String[] equipEDD = getGSONArray(req, "estimatedDeliveryDate_eq");
		String[] equipName  = getGSONArray(req, "equipName"); 
		String[] equipNotes = getGSONArray(req, "notes_eq");
		String[] equipStatus = getGSONArray(req, "status_eq");
		
		
		
		long longEquipPO[] = new long[equipToAdd.length];
		Date[] dateEquipEDD = new Date[equipToAdd.length];
		int[] array = new int[equipToAdd.length];
		long[] longEquipIds = new long[equipIDS.length];
		System.out.println("equip length" + array.length);
		
		
		//-------------------------------------------------------------------------------------------------
		
		//Equipment Objects
		Equipment equip;
		Warehouse warehouse_eq;
		ProjectItem item_eq;
		EquipmentVendor vendor_eq;
		EquipmentStatus status_eq;
		
		DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");

		
		for(int i=0; i<equipToAdd.length;i++)
			{
			equip = new Equipment();
			// Convert Arrays to either int, long or Date
			array[i] =(int) Long.parseLong(equipToAdd[i]);
			
			//crashing
			if(!equipPO[array[i]].equals(""))
			{
				longEquipPO[i] = new Long(equipPO[array[i]]);
			}
			
			if(!equipEDD[array[i]].equals(""))
			{
				System.out.println("estimated date " + equipEDD[array[i]]);
				dateEquipEDD[i] = format1.parse(equipEDD[array[i]]) ;
			}
			
			 warehouse_eq = (Warehouse) ProjectObjectService.get(Long.parseLong(equipProj[array[i]][2]), "Warehouse");	
			 item_eq = (ProjectItem) ProjectObjectService.get(Long.parseLong(equipComponent[array[i]][1]), "ProjectItem");
			 vendor_eq = (EquipmentVendor) ProjectObjectService.get(new Long(equipVendor[array[i]][1]), "EquipmentVendor");
			 status_eq = (EquipmentStatus) ProjectObjectService.get(new Long(equipStatus[array[i]]), "EquipmentStatus");
			 
				longEquipIds[i] = new Long(equipIDS[array[i]]);
				System.out.println("equip ids" + longEquipIds[i]);
			
			 	// 2D arrays
			 
				equip.setWarehouse(warehouse_eq);
				equip.setEquipmentVendor(vendor_eq);
				equip.setProjectItem(item_eq);
				equip.setEquipStatus(status_eq);
				
				//Regular Arrays
				equip.setPO(longEquipPO[i]);
				equip.setEstimatedDelivery(dateEquipEDD[i]);
				equip.setEquipName(equipName[array[i]]);
				equip.setNotes(equipNotes[array[i]]);
				equip.setEqpd(id);
				
				if((Equipment) ProjectObjectService.get(longEquipIds[i], "Equipment")!=null)
					ProjectObjectService.editObject("Equipment",longEquipIds[i],equip, 0);
				else
				{
					System.out.println("here");
					ProjectObjectService.addObject("Equipment", equip);
				}
				
				
				
				}
		}
		


		
				
		//Closeout fields
		/*cd.setPunchList(fpunchList);
		cd.setAsBuilts(fasBuilts);
		cd.setAirGas(fairGas);
		cd.setAlarmHvacForm(falarmHvac);
		cd.setCloseoutBook(fcloseoutBook);
		cd.setCloseoutNotes(fcloseoutNotes);
		cd.setPermitsClosed(fpermits);
		cd.setVerisaeShutdownReport(fverisae);
		cd.setSalvageValue(sv);
		
		cd.setMPunchListCL(mPunchListCLf) ;
		cd.setCloseoutPhotosCL(closeoutPhotosCLf);
		cd.setSubConWarrantiesCL(subConWarrantiesCLf);
		cd.setMCSWarranty(MCSWarrantyf);
		cd.setEquipmentSubCL(equipmentSubClf);
		cd.setTraneCL(traneCLf);

		cd.setBuildingPermitCL(buldingPermitCLf);
		cd.setInspectionSOCL(inspectionSOCLf);
		cd.setCertCompletionCL(certCompletionCLf);*/
				
		
		//create inspections Object.

				//set inspection fields
		System.out.println(inspectionTN);
		inspections.setTicketNumber(inspectionTN);
		inspections.setFraming(fframing);
		inspections.setCeiling(fceiling);
		inspections.setRoughin_Mechanical(froughMech);
		inspections.setRoughin_Electric(froughElec);
		inspections.setRoughin_Plumbing(froughPlumb);
		inspections.setMechanicalLightSmoke(fmechLightSmoke);
		inspections.setMechanical_Final(fmechFinal);
		inspections.setElectrical_Final(felecFinal);
		inspections.setPlumbing_Final(fplumbFinal);
		inspections.setFire_Marshal(ffireMarshal);
		inspections.setHealth(fhealth);
		inspections.setBuilding_Final(fbuildFinal);
		
		
		Permits	permits = new Permits();
		PermitsFiller.fillPermits(permits, params);
		


		
		//Create new project to replace the old one
		Project p = new Project();
		p.setMcsNumber(mcsNum);
		p.setProjectClass(projectClass);
		p.addProjectManager(manager);
		p.addSupervisor(supervisor);
		p.setStatus(status);
		p.setWarehouse(warehouse);
		p.setScope(scope);
		p.setProjectItem(item);
		p.setStage(stage);
		p.setProjectInitiatedDate(finitiatedDate);
		p.setSiteSurvey(fsurvey);
		p.setCostcoDueDate(fcostco);
		p.setProposalSubmitted(fproposal);
		p.setScheduledStartDate(fstart);
		p.setScheduledTurnover(fscheduled);
		p.setActualTurnover(factual);
		p.setShouldInvoice(shouldInvoice);
		p.setInvoiced(actualInvoice);
		p.setProjectNotes(notes);
		//p.setChangeOrders(changeOrders);
		p.setProjectType(pType);
		p.setZachUpdates(zachNotes);
		p.setCost(cost);
		p.setCustomerNumber(customerNumber);
		p.setPermitApplication(permitApp);
		p.setCloseoutDetails(cd);
		p.setInspections(inspections);
		p.setPermits(permits);

				

		//Replace the old project with the new project.
		
		System.out.println("Project ID : " + id);
		
		
		System.out.println("SV number: " + salvageID);
		System.out.println("PERMITS number: " + permitsID); 
	//	long[] iDs = {iID,/*closeoutID,*/id} ;
	//	String[] domains = {"Inspections",/*"CloseoutDetails",*/"Project" };
	//  ProjectObject[] objects ={inspections, /*cd,*/ p};
				
		
	int i = 0;
	int k = 0;
		if(iID!=0)
		{
			 i = 0;
			ProjectObjectService.editObject("Inspections",iID,inspections, i);	
			k = 1;
		}
		if(closeoutID!=0 && salvageID ==0)
		{	
			i=0;
			ProjectObjectService.editObject("CloseoutDetails",closeoutID,cd,i);
			k=1;
		}
		if(closeoutID!=0 && salvageID !=0)
		{	
			i=2;
			ProjectObjectService.editObject("CloseoutDetails",closeoutID,cd,i);
			k=1;
		}
		
		if(salvageID!=0)
		{
			i=0;
			System.out.println("SV number: " + salvageID);
			ProjectObjectService.editObject("SalvageValue", salvageID, sv, i);
			k = 1;
		}
		if(permitsID!=0)
		{
			System.out.println("We get here");
			i=0;
			ProjectObjectService.editObject("Permits",permitsID,permits, i);	
			k = 1;
		}
			
		 System.out.println("k = " + k);
			ProjectObjectService.editObject("Project",id,p,k);
			//ProjectObjectService.editObjects(iDs,domains, objects);
		System.out.println("END");		
	}
	
	/**
	 * This method gets all of the enumerated data that is needed by the dropdowns for the
	 * editSelect.html page
	 * @return a string representing a JSON array of data containing this data
	 */
	public static String getEditEnumsAsJSON()
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
	public static String getQueryEnumsAsJSON()
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
	public static String getAllEnumsAsJson()
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
		map.put("equipment",ProjectObjectService.getAllAsJsonString("Equipment"));
		map.put("equipmentstatus",ProjectObjectService.getAllAsJsonString("EquipmentStatus"));
		map.put("closeoutstatus", ProjectObjectService.getAllAsJsonString("CloseoutStatus"));
		
		return g.toJson(map);
	}
	
	/**
	 * This method gets all of the projects
	 * @return A string representing a JSON array containing this information
	 */
	public static String getAllProjectsAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();
		
		map.put("projects", ProjectObjectService.getAllAsJsonString("Project"));
		
		return g.toJson(map);
	}
	
	public static String getAllEnumsEquipAsJson()
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
	
	public static String getAllEquipmentAsJson()
	{
		Gson g = new Gson();
		HashMap<String, String> map = new HashMap<String, String>();
		
		map.put("equipment",ProjectObjectService.getAllAsJsonString("Equipment"));
		return g.toJson(map);
	}
	
	public static String[][] getGSON2DArray(HttpServletRequest req, String var)
	{
		Gson gson = new Gson();
		String[][] dummy = new String[0][0];  // The same type as your "newMap"
		String[][] array;
		
		array = gson.fromJson(req.getParameter(var), dummy.getClass());
		return array;	
	}
	
	public static String[] getGSONArray(HttpServletRequest req, String var)
	{
		Gson gson = new Gson();
		String[] dummy = new String[0];  // The same type as your "newMap"
		String[] array;
		
		array = gson.fromJson(req.getParameter(var), dummy.getClass());
		
		return array;	
	}

	public static void editCloseout(Long projectID, Map<String, String>params) throws ClassNotFoundException, ParseException
	{
		System.out.println("In Edit Closeout:");

		String closeoutIDString = params.get("closeoutID");
		String salvageIDString = params.get("salvageID");
		Long closeoutID = (long)-1;
		Long salvageID = (long)-1;

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
	}

	public static void editPermits(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
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
	}

	public static void editInspections(Long projectID, Map<String, String> params) throws ClassNotFoundException, ParseException
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
	}	
}
