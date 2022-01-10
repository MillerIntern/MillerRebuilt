package projectObjects;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import projectObjects.ChangeOrder;


@Entity
public class Project extends ProjectObject
{
	private Warehouse warehouse;
	private int McsNumber;
	private String scope;
	private ProjectClass projectClass;
	private ProjectItem projectItem;
	private Person projectManagers;
	private Set<Person> supervisors;
	private ProjectStatus status;
	private Date projectInitiatedDate;
	private Date siteSurvey;
	private Date budgetaryDue;
	private Date budgetarySubmitted;
	private Date proposalScopeDate;
	private Date draftScheduleDate;
	private Date proposalDue;
	private Date proposalSubmitted;
	private CloseoutDetails closeoutDetails;
	
	private int shouldInvoice;
	private int invoiced;
	private String projectNotes;
	private String managerNotes;
	private Date scheduledStartDate;
	private Date scheduledTurnover;
	
	/*
	private int laborTotal;
	private int laborInvoiced;
	private int laborToInvoice;
	private int laborPercentInvoiced;
	
	private int materialCosts;
	private int materialInvoiced;
	private int materialToInvoice;
	private int materialPercentInvoiced;
	
	private int projectAmount;
	private int projectInvoiced;
	private int projectToInvoice;
	private int projectPercentInvoiced;
	
	private int aiaTotal;
	private int aiaInvoiced;
	private int aiaToInvoice;
	private int aiaPercentInvoiced;
	
	private int totalProject;
	private int totalInvoiced;
	private int totalToInvoice;
	private int totalPercentInvoiced;
	*/
	
	private String customerNotes;
	
	private Date actualTurnover;
	private ProjectStage stage;
	private ProjectType projectType;
	private String zachUpdates;
	private String keyStatus;
	private String cost;
	private String customerNumber;
	
	private String DrawingsDue;
	private Inspections inspections;
	private Permits permits;
	private Set<ChangeOrder> changeOrders;
	private Set<Equipment> equipment;
	private Set<NewEquipment> projEquipment;
	
	private String autofillHVAC;
	private String autofillRefrigeration;
	private String autofillPermits;

	private int lowScore;
	private int mediumScore;
	private int highScore;
	private Date scoreLastUpdated;
	
	private CustomerApproval customerApproval;
			
	public Project(Warehouse warehouse, String scope,
			Person projectManagers, Set<Person> supervisors,
			Region region, ProjectStatus status, Date projectInitiatedDate,
			Date siteSurvey, Date costcoDueDate, Date proposalSubmitted, CloseoutDetails closeoutDetails,
			Set<ChangeOrder> changeOrders, int shouldInvoice, 
			/*int laborTotal, int laborInvoiced, int laborToInvoice, int laborPercentInvoiced, 
			int materialCosts, int materialInvoiced, int materialToInvoice, int materialPercentInvoiced,
			int projectAmount, int projectInvoiced, int projectToInvoice, int projectPercentInvoiced,
			int aiaTotal, int aiaInvoiced, int aiaToInvoice, int aiaPercentInvoiced,
			int totalProject, int totalInvoiced, int totalToInvoice, int totalPercentInvoiced,*/
			int invoiced, String projectNotes, String customerNotes, Date scheduledStartDate,
			Date scheduledTurnover, Date actualTurnover, ProjectType pType, String zUpdates, String keyStatus, 
			String cst, String custNum, Equipment equipList, String DrawingsDue, 
			Inspections inspections, Permits permits, Set<NewEquipment> projEquipment, String managerNotes, 
            Date budgetaryDue, Date budgetarySubmitted, String autofill_HVAC, String autofill_Refrigeration,
            String autofill_Permits, int _low, int _med, int _high, Date _scoreLast, Date proposalScopeDate,Date draftScheduleDate,
            CustomerApproval customerApproval)

	{		
		this.warehouse = warehouse;
		this.scope = scope;
		this.projectManagers = projectManagers;
		this.supervisors = supervisors;
		this.status = status;
		this.projectInitiatedDate = projectInitiatedDate;
		this.siteSurvey = siteSurvey;
		this.proposalDue = costcoDueDate;
		this.proposalSubmitted = proposalSubmitted;
		this.closeoutDetails = closeoutDetails;
		this.setChangeOrders(changeOrders);
		this.shouldInvoice = shouldInvoice;
		this.invoiced = invoiced;
		this.projectNotes = projectNotes;
		this.customerNotes = customerNotes;
		this.scheduledStartDate = scheduledStartDate;
		this.scheduledTurnover = scheduledTurnover;
		this.actualTurnover = actualTurnover;
		this.McsNumber = 0;
		this.projectType = pType;
		this.zachUpdates = zUpdates;
		this.keyStatus = keyStatus;
		this.cost = cst;
		this.customerNumber = custNum;
		this.DrawingsDue=DrawingsDue;
		this.inspections= inspections;
		this.permits = permits;
		this.setProjEquipment(projEquipment);
		this.managerNotes = managerNotes;
		this.budgetaryDue = budgetaryDue;
		this.budgetarySubmitted = budgetarySubmitted;

		this.autofillHVAC = autofill_HVAC;
		this.autofillRefrigeration = autofill_Refrigeration;
		this.autofillPermits = autofill_Permits;
		
		this.lowScore = _low;
		this.mediumScore = _med;
		this.highScore = _high;
		this.scoreLastUpdated = _scoreLast; 
		
		this.proposalScopeDate = proposalScopeDate;
		this.draftScheduleDate = draftScheduleDate;
		
		this.customerApproval = customerApproval;
		
		/*
		this.laborTotal = laborTotal;
		this.laborInvoiced = laborInvoiced;
		this.laborToInvoice = laborToInvoice;
		this.laborPercentInvoiced = laborPercentInvoiced;
		
		this.materialCosts = materialCosts;
		this.materialInvoiced = materialInvoiced;
		this.materialToInvoice = materialToInvoice;
		this.materialPercentInvoiced = materialPercentInvoiced;
		
		this.projectAmount = projectAmount;
		this.projectInvoiced = projectInvoiced;
		this.projectToInvoice = projectToInvoice;
		this.projectPercentInvoiced = projectPercentInvoiced;
		
		this.aiaTotal = aiaTotal;
		this.aiaInvoiced = aiaInvoiced;
		this.aiaToInvoice = aiaToInvoice;
		this.aiaPercentInvoiced = aiaPercentInvoiced;
		
		this.totalProject = totalProject;
		this.totalInvoiced = totalInvoiced;
		this.totalToInvoice = totalToInvoice;
		this.totalPercentInvoiced = totalPercentInvoiced;
		*/
	}
	
	public Project() 
	{
		this.stage = null;
		this.warehouse = null;
		this.scope = null;
		this.supervisors = new HashSet<Person>();
		this.projectManagers = null;
		this.status = null;
		this.projectInitiatedDate = null;
		this.siteSurvey = null;
		this.proposalDue = null;
		this.proposalSubmitted = null;
		this.closeoutDetails = new CloseoutDetails();
		this.permits = new Permits();
		this.inspections = new Inspections();
		this.changeOrders = new HashSet<ChangeOrder>();
		this.equipment = new HashSet<Equipment>();
		
		this.shouldInvoice = 0;
		this.invoiced = 0;
		this.projectNotes = null;
		this.customerNotes = null;
		this.managerNotes = null;
		this.scheduledStartDate = null;
		this.scheduledTurnover = null;
		this.actualTurnover = null;
		this.McsNumber = 0;
		this.projectType = null;
		this.zachUpdates = null;
		this.keyStatus = null;
		this.cost = null;
		this.customerNumber = null;
		this.DrawingsDue=null;
		this.setProjEquipment(new HashSet<NewEquipment>());
		this.budgetaryDue = null;
		this.budgetarySubmitted = null;

		this.autofillHVAC = null;
		this.autofillPermits = null;
		this.autofillRefrigeration = null;

		this.lowScore = 0;
		this.mediumScore = 0;
		this.highScore = 0;
		this.scoreLastUpdated = null;
		this.proposalScopeDate = null;
		this.draftScheduleDate = null;
		
		this.customerApproval = null;
		
		/*
		this.laborTotal = 0;
		this.laborInvoiced = 0;
		this.laborToInvoice = 0;
		this.laborPercentInvoiced = 0;
		
		this.materialCosts = 0;
		this.materialInvoiced = 0;
		this.materialToInvoice = 0;
		this.materialPercentInvoiced = 0;
		
		this.projectAmount = 0;
		this.projectInvoiced = 0;
		this.projectToInvoice = 0;
		this.projectPercentInvoiced = 0;
		
		this.aiaTotal = 0;
		this.aiaInvoiced = 0;
		this.aiaToInvoice = 0;
		this.aiaPercentInvoiced = 0;
		
		this.totalProject = 0;
		this.totalInvoiced = 0;
		this.totalToInvoice = 0;
		this.totalPercentInvoiced = 0;
		*/
	}


	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized ProjectStage getStage() {
		return stage;
	}

	public synchronized void setStage(ProjectStage stage) {
		this.stage = stage;
	}

	public synchronized Date getScheduledStartDate() {
		return scheduledStartDate;
	}

	public synchronized void setScheduledStartDate(Date scheduledStartDate) {
		this.scheduledStartDate = scheduledStartDate;
	}

	public synchronized Date getScheduledTurnover() {
		return scheduledTurnover;
	}

	public synchronized void setScheduledTurnover(Date scheduledTurnover) {
		this.scheduledTurnover = scheduledTurnover;
	}

	public synchronized Date getActualTurnover() {
		return actualTurnover;
	}

	public synchronized void setActualTurnover(Date actualTurnover) {
		this.actualTurnover = actualTurnover;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized ProjectClass getProjectClass() {
		return projectClass;
	}

	public synchronized void setProjectClass(ProjectClass projectClass) {
		this.projectClass = projectClass;
	}
	
	
	/*customer approval*/
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized CustomerApproval getCustomerApproval() {
		return customerApproval;
	}

	public synchronized void setCustomerApproval(CustomerApproval customerApproval) {
		this.customerApproval = customerApproval;
	}
	

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized Warehouse getWarehouse() {
		return warehouse;
	}

	public synchronized void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	@Column(length = 1000)
	public synchronized String getScope() {
		return scope;
	}
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	public synchronized int getMcsNumber()
	{
		return McsNumber;
	}
	
	public synchronized void setMcsNumber(int num)
	{
		McsNumber = num;
	}

	public synchronized void setScope(String scope) {
		this.scope = scope;
	}

	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "project_managers",
	      joinColumns = {@JoinColumn(name = "project_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public synchronized Person getProjectManagers() {
		return projectManagers;
	}

	public synchronized void setProjectManagers(Person projectManagers) {
		this.projectManagers = projectManagers;
	}

	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "project_supervisors",
	      joinColumns = {@JoinColumn(name = "project_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public synchronized Set<Person> getSupervisors() {
		return supervisors;
	}

	public synchronized void setSupervisors(Set<Person> supervisors) {
		this.supervisors = supervisors;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized ProjectStatus getStatus() {
		return status;
	}

	public synchronized void setStatus(ProjectStatus status) {
		this.status = status;
	}

	public synchronized Date getProjectInitiatedDate() {
		return projectInitiatedDate;
	}

	public synchronized void setProjectInitiatedDate(Date projectInitiatedDate) {
		this.projectInitiatedDate = projectInitiatedDate;
	}

	public synchronized Date getSiteSurvey() {
		return siteSurvey;
	}

	public synchronized void setSiteSurvey(Date siteSurvey) {
		this.siteSurvey = siteSurvey;
	}
	
	public synchronized Date getProposalScopeDate() {
		return proposalScopeDate;
	}

	public synchronized void setProposalScopeDate(Date proposalScopeDate) {
		this.proposalScopeDate = proposalScopeDate;
	}

	public synchronized Date getDraftScheduleDate() {
		return draftScheduleDate;
	}

	public synchronized void setDraftScheduleDate(Date draftScheduleDate) {
		this.draftScheduleDate = draftScheduleDate;
	}
	
	public synchronized Date getProposalDue() {
		return proposalDue;
	}

	public synchronized void setProposalDue(Date costcoDueDate) {
		this.proposalDue = costcoDueDate;
	}

	public synchronized Date getProposalSubmitted() {
		return proposalSubmitted;
	}

	public synchronized void setProposalSubmitted(Date proposalSubmitted) {
		this.proposalSubmitted = proposalSubmitted;
	}
	
	public synchronized Date getBudgetarySubmitted() {
		return budgetarySubmitted;
	}

	public synchronized void setBudgetarySubmitted(Date budgetarySubmitted) {
		this.budgetarySubmitted = budgetarySubmitted;
	}
	
	public synchronized Date getBudgetaryDue() {
		return budgetaryDue;
	}

	public synchronized void setBudgetaryDue(Date budgetaryDue) {
		this.budgetaryDue = budgetaryDue;
	}

	@ElementCollection
	@OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Set<ChangeOrder> getChangeOrders() {
		return changeOrders;
	}

	public synchronized void setChangeOrders(Set<ChangeOrder> changeOrders) {
		this.changeOrders = changeOrders;
	}

	public synchronized int getShouldInvoice() {
		return shouldInvoice;
	}

	public synchronized void setShouldInvoice(int shouldInvoice) {
		this.shouldInvoice = shouldInvoice;
	}

	public synchronized int getInvoiced() {
		return invoiced;
	}

	public synchronized void setInvoiced(int invoiced) {
		this.invoiced = invoiced;
	}
	
	/*
	//New financial getters and setters
	public int getLaborTotal() {
		return laborTotal;
	}

	public void setLaborTotal(int laborTotal) {
		this.laborTotal = laborTotal;
	}

	public int getLaborInvoiced() {
		return laborInvoiced;
	}

	public void setLaborInvoiced(int laborInvoiced) {
		this.laborInvoiced = laborInvoiced;
	}

	public int getLaborToInvoice() {
		return laborToInvoice;
	}

	public void setLaborToInvoice(int laborToInvoice) {
		this.laborToInvoice = laborToInvoice;
	}

	public int getLaborPercentInvoiced() {
		return laborPercentInvoiced;
	}

	public void setLaborPercentInvoiced(int laborPercentInvoiced) {
		this.laborPercentInvoiced = laborPercentInvoiced;
	}

	public int getMaterialCosts() {
		return materialCosts;
	}

	public void setMaterialCosts(int materialCosts) {
		this.materialCosts = materialCosts;
	}

	public int getMaterialInvoiced() {
		return materialInvoiced;
	}

	public void setMaterialInvoiced(int materialInvoiced) {
		this.materialInvoiced = materialInvoiced;
	}

	public int getMaterialToInvoice() {
		return materialToInvoice;
	}

	public void setMaterialToInvoice(int materialToInvoice) {
		this.materialToInvoice = materialToInvoice;
	}

	public int getMaterialPercentInvoiced() {
		return materialPercentInvoiced;
	}

	public void setMaterialPercentInvoiced(int materialPercentInvoiced) {
		this.materialPercentInvoiced = materialPercentInvoiced;
	}

	public int getProjectAmount() {
		return projectAmount;
	}

	public void setProjectAmount(int projectAmount) {
		this.projectAmount = projectAmount;
	}

	public int getProjectInvoiced() {
		return projectInvoiced;
	}

	public void setProjectInvoiced(int projectInvoiced) {
		this.projectInvoiced = projectInvoiced;
	}

	public int getProjectToInvoice() {
		return projectToInvoice;
	}

	public void setProjectToInvoice(int projectToInvoice) {
		this.projectToInvoice = projectToInvoice;
	}

	public int getProjectPercentInvoiced() {
		return projectPercentInvoiced;
	}

	public void setProjectPercentInvoiced(int projectPercentInvoiced) {
		this.projectPercentInvoiced = projectPercentInvoiced;
	}

	public int getAiaTotal() {
		return aiaTotal;
	}

	public void setAiaTotal(int aiaTotal) {
		this.aiaTotal = aiaTotal;
	}

	public int getAiaInvoiced() {
		return aiaInvoiced;
	}

	public void setAiaInvoiced(int aiaInvoiced) {
		this.aiaInvoiced = aiaInvoiced;
	}

	public int getAiaToInvoice() {
		return aiaToInvoice;
	}

	public void setAiaToInvoice(int aiaToInvoice) {
		this.aiaToInvoice = aiaToInvoice;
	}

	public int getAiaPercentInvoiced() {
		return aiaPercentInvoiced;
	}

	public void setAiaPercentInvoiced(int aiaPercentInvoiced) {
		this.aiaPercentInvoiced = aiaPercentInvoiced;
	}

	public int getTotalProject() {
		return totalProject;
	}

	public void setTotalProject(int totalProject) {
		this.totalProject = totalProject;
	}

	public int getTotalInvoiced() {
		return totalInvoiced;
	}

	public void setTotalInvoiced(int totalInvoiced) {
		this.totalInvoiced = totalInvoiced;
	}

	public int getTotalToInvoice() {
		return totalToInvoice;
	}

	public void setTotalToInvoice(int totalToInvoice) {
		this.totalToInvoice = totalToInvoice;
	}

	public int getTotalPercentInvoiced() {
		return totalPercentInvoiced;
	}

	public void setTotalPercentInvoiced(int totalPercentInvoiced) {
		this.totalPercentInvoiced = totalPercentInvoiced;
	}
	*/

	@Column(length = 1000)
	public synchronized String getProjectNotes() {
		return projectNotes;
	}

	public synchronized void setProjectNotes(String projectNotes) {
		this.projectNotes = projectNotes;
	}
	
	
	@Column(length = 1000)
	public synchronized String getCustomerNotes() {
		return customerNotes;
	}

	public synchronized void setCustomerNotes(String customerNotes) {
		this.customerNotes = customerNotes;
	}
	
	//TODO: A project should have multiple supervisors, but the GUI does not support this right now.
	public synchronized void addSupervisor(Person p)
	{
		if (supervisors.size() == 0)
			supervisors.add(p);
		else
		{
			supervisors.clear();
			supervisors.add(p);
		}
	}
	
	//TODO: A project should have multiple managers, but the GUI does not support this right now.
	public synchronized void addProjectManager(Person p)
	{
		/*if (projectManagers.size() == 0)
			projectManagers.add(p);
		else
		{
			projectManagers.clear();
			projectManagers.add(p);
		}*/this.projectManagers = p;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized ProjectItem getProjectItem() {
		return projectItem;
	}

	public synchronized void setProjectItem(ProjectItem projectItem) {
		this.projectItem = projectItem;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public synchronized ProjectType getProjectType() {
		return projectType;
	}

	public synchronized void setProjectType(ProjectType pType) {
		projectType = pType;
	}
	
	@Column(length = 1000)
	public synchronized String getZachUpdates() {
		return zachUpdates;
	}
	
	public synchronized void setZachUpdates(String zUpdates) {
		this.zachUpdates = zUpdates;
	}
	
	@Column(length = 300)
	public synchronized String getKeyStatus() {
		return keyStatus;
	}
	
	public synchronized void setKeyStatus(String keyStatus) {
		this.keyStatus = keyStatus;
	}
	
	public synchronized String getCost() {
		return cost;
	}

	public synchronized void setCost(String cst) {
		this.cost = cst;
	}
	
	public synchronized String getCustomerNumber() {
		return customerNumber;
	}

	public synchronized void setCustomerNumber(String custNum) {
		this.customerNumber = custNum;
	}
		
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized CloseoutDetails getCloseoutDetails()
	{
		return this.closeoutDetails;
	}
	
	public synchronized void setCloseoutDetails(CloseoutDetails closeoutDetails)
	{
		this.closeoutDetails = closeoutDetails;
	}

	public synchronized void setDrawingsDue(String DrawingsDue)
	{
		this.DrawingsDue=DrawingsDue;
	}
	public synchronized String getDrawingsDue()
	{
		return this.DrawingsDue;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Inspections getInspections(){
		return this.inspections;
	}
	public synchronized void setInspections(Inspections inspections){
		this.inspections=inspections;
	}
	
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Permits getPermits(){
		return this.permits;
	}
	
	public synchronized void setPermits(Permits permits){
		this.permits=permits;
	}
	
	@ElementCollection
	@OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Set<Equipment> getEquipment() {
		return equipment;
	}

	public synchronized void setEquipment(Set<Equipment> equipment) {
		this.equipment = equipment;
	}

	public synchronized String toString()
	{
		return "Project ID: "  + id.toString();
	}

	@ElementCollection
	@OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized Set<NewEquipment> getProjEquipment() {
		return projEquipment;
	}

	public synchronized void setProjEquipment(Set<NewEquipment> projEquipment) {
		this.projEquipment = projEquipment;
	}
	
	public synchronized String getManagerNotes() {
		return managerNotes;
	}
	
	public synchronized void setManagerNotes(String managerNotes) {
		this.managerNotes = managerNotes;
	}
	
	public synchronized String getAutofillHVAC() {
		return autofillHVAC;
	}
	
	public synchronized void setAutofillHVAC(String autofill_HVAC) {
		this.autofillHVAC = autofill_HVAC;
	}
	
	public synchronized String getAutofillRefrigeration() {
		return autofillRefrigeration;
	}
	
	public synchronized void setAutofillRefrigeration(String autofill_Refrigeration) {
		this.autofillRefrigeration = autofill_Refrigeration;
	}
	
	public synchronized String getAutofillPermits() {
		return autofillPermits;
	}
	
	public synchronized void setAutofillPermits(String autofill_Permits) {
		this.autofillPermits = autofill_Permits;
	}
	
	public int getLowScore()
	{
		return lowScore;
	}
	
	public void setLowScore(int _low)
	{
		lowScore = _low;
	}
	
	public int getMediumScore()
	{
		return mediumScore;
	}
	
	public void setMediumScore(int _medium)
	{
		mediumScore = _medium;
	}
	
	public int getHighScore()
	{
		return highScore;
	}
	
	public void setHighScore(int _high)
	{
		highScore = _high;
	}
	
	public Date getScoreLastUpdated()
	{
		return scoreLastUpdated;
	}
	
	public void setScoreLastUpdated(Date date)
	{
		scoreLastUpdated = date;
	}
	
	
	
	public static Date getSchedulingFields(String name , Project project)
	{
		if(name.equalsIgnoreCase("projectInitiatedDate"))
			return project.getProjectInitiatedDate();
		else if(name.equalsIgnoreCase("siteSurvey"))
			return project.getSiteSurvey();
		else if(name.equalsIgnoreCase("budgetaryDue"))
			return project.getBudgetaryDue();
		else if(name.equalsIgnoreCase("budgetarySubmitted"))
			return project.getBudgetarySubmitted();
		else if(name.equalsIgnoreCase("proposalDue"))
			return project.getProposalDue();
		else if(name.equalsIgnoreCase("proposalSubmitted"))
			return project.getProposalSubmitted();
		else if(name.equalsIgnoreCase("scheduledStartDate"))
			return project.getScheduledStartDate();
		else if(name.equalsIgnoreCase("scheduledTurnover"))
			return project.getScheduledTurnover();
		else if(name.equalsIgnoreCase("actualTurnover"))
			return project.getActualTurnover();
		
		return null;
	}
	
	public static Object getGeneralInfoFields(String name , Project project)
	{
		if(name.equalsIgnoreCase("McsNumber"))
			return project.getMcsNumber();
		if(name.equalsIgnoreCase("warehouse"))
			return project.getWarehouse();
		if(name.equalsIgnoreCase("projectManagers"))
			return project.getProjectManagers();
		if(name.equalsIgnoreCase("projectItem"))
			return project.getProjectItem();
		if(name.equalsIgnoreCase("supervisors"))
			return project.getSupervisors();
		if(name.equalsIgnoreCase("stage"))
			return project.getStage();
		if(name.equalsIgnoreCase("status"))
			return project.getStatus();
		if(name.equalsIgnoreCase("projectType"))
			return project.getProjectType();
		if(name.equalsIgnoreCase("projectClass"))
			return project.getProjectClass();
		if(name.equalsIgnoreCase("autofillHVAC"))
			return project.getAutofillHVAC();
		if(name.equalsIgnoreCase("autofillPermits"))
			return project.getAutofillPermits();
		if(name.equalsIgnoreCase("autofillRefrigeration"))
			return project.getAutofillRefrigeration();
		if(name.equalsIgnoreCase("scope"))
			return project.getScope();
		
		
		if(name.equalsIgnoreCase("autofillCustomerApproval"))
			return project.getCustomerApproval();
		
		return null;
	}
	
	public static Map<String , String> getAllSchedulingFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		
		fields.put("projectInitiatedDate" , "Date");
		fields.put("siteSurvey" , "Date");
		fields.put("budgetaryDue" , "Date");
		fields.put("budgetarySubmitted" , "Date");
		fields.put("proposalSubmitted" , "Date");
		fields.put("proposalDue" , "Date");
		fields.put("proposalSubmitted" , "Date");
		fields.put("scheduledStartDate" , "Date");
		fields.put("scheduledTurnover" , "Date");
		fields.put("actualTurnover" , "Date");
				

		return fields;
	}
	
	public static Double getFinancialFields(String name , Project project)
	{
		if(name.equalsIgnoreCase("shouldInvoice"))
			return (Double) (double) project.getShouldInvoice();
		else if(name.equalsIgnoreCase("actualInvoice"))
			return (Double) (double) project.getInvoiced();
		else if(name.equalsIgnoreCase("cost"))
		{
			if(project.getCost() == null || project.getCost().isEmpty())
				return null;
			else
				return (Double) (double) Double.parseDouble(project.getCost());
		}
		/*
		//labor 
		else if(name.equalsIgnoreCase("laborTotal"))
			return (Double) (double) project.getLaborTotal();
		else if(name.equalsIgnoreCase("laborInvoiced"))
			return (Double) (double) project.getLaborInvoiced();
		else if(name.equalsIgnoreCase("laborToInvoice"))
			return (Double) (double) project.getLaborToInvoice();
		else if(name.equalsIgnoreCase("laborPercentInvoiced"))
			return (Double) (double) project.getLaborPercentInvoiced();
		
		//material
		else if(name.equalsIgnoreCase("materialCosts"))
			return (Double) (double) project.getMaterialCosts();
		else if(name.equalsIgnoreCase("materialInvoiced"))
			return (Double) (double) project.getMaterialInvoiced();
		else if(name.equalsIgnoreCase("materialToInvoice"))
			return (Double) (double) project.getMaterialToInvoice();
		else if(name.equalsIgnoreCase("materialPercentInvoiced"))
			return (Double) (double) project.getMaterialPercentInvoiced();
		
		//project
		else if(name.equalsIgnoreCase("projectAmount"))
			return (Double) (double) project.getProjectAmount();
		else if(name.equalsIgnoreCase("projectInvoiced"))
			return (Double) (double) project.getProjectInvoiced();
		else if(name.equalsIgnoreCase("projectToInvoice"))
			return (Double) (double) project.getProjectToInvoice();
		else if(name.equalsIgnoreCase("projectPercentInvoiced"))
			return (Double) (double) project.getProjectPercentInvoiced();
		
		//aia
		else if(name.equalsIgnoreCase("aiaTotal"))
			return (Double) (double) project.getAiaTotal();
		else if(name.equalsIgnoreCase("aiaInvoiced"))
			return (Double) (double) project.getAiaInvoiced();
		else if(name.equalsIgnoreCase("aiaToInvoice"))
			return (Double) (double) project.getAiaToInvoice();
		else if(name.equalsIgnoreCase("aiaPercentInvoiced"))
			return (Double) (double) project.getAiaPercentInvoiced();
		
		//total
		else if(name.equalsIgnoreCase("totalProject"))
			return (Double) (double) project.getTotalProject();
		else if(name.equalsIgnoreCase("totalInvoiced"))
			return (Double) (double) project.getTotalInvoiced();
		else if(name.equalsIgnoreCase("totalToInvoice"))
			return (Double) (double) project.getTotalToInvoice();
		else if(name.equalsIgnoreCase("totalPercentInvoiced"))
			return (Double) (double) project.getTotalPercentInvoiced();
		*/
		
		return null;
	}
	
	public static Map<String , String> getAllFinancialFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		fields.put("shouldInvoice" , "Number");
		fields.put("actualInvoice" , "Number");
		fields.put("cost" , "Number");
		fields.put("customerNumber", "Number");
		
		fields.put("laborTotal", "Number");
		fields.put("laborInvoiced", "Number");
		fields.put("laborToInvoice", "Number");
		fields.put("laborPercentInvoiced", "Number");
		
		fields.put("materialCosts", "Number");
		fields.put("materialInvoiced", "Number");
		fields.put("materialToInvoice", "Number");
		fields.put("materialPercentInvoiced", "Number");
		
		fields.put("projectAmount", "Number");
		fields.put("projectInvoiced", "Number");
		fields.put("projectToInvoice", "Number");
		fields.put("projectPercentInvoiced", "Number");
		
		fields.put("aiaTotal", "Number");
		fields.put("aiaInvoiced", "Number");
		fields.put("aiaToInvoice", "Number");
		fields.put("aiaPercentInvoiced", "Number");
		
		fields.put("totalProject", "Number");
		fields.put("totalInvoiced", "Number");
		fields.put("totalToInvoice", "Number");
		fields.put("totalPercentInvoiced", "Number");
		
		return fields;
	}
	
	public static Map<String , String> getAllGeneralInfoFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		
		fields.put("McsNumber" , "Number");
		fields.put("warehouse" , "String");
		fields.put("projectManagers" , "String");
		fields.put("projectItem", "String");
		fields.put("supervisors", "String");
		fields.put("stage", "String");
		fields.put("status", "String");
		fields.put("projectType", "String");
		fields.put("projectClass", "String");
		fields.put("autofillPermits", "String");
		fields.put("autofillHVAC", "String");
		fields.put("autofillRefrigeration", "String");
		fields.put("scope", "String");
		
		fields.put("autofillCustomerApproval", "String");

		return fields;
	}

}

