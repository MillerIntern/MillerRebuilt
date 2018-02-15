package projectObjects;

import java.util.Date;


import java.util.HashSet;
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
	
	private Date proposalDue;
	
	private Date proposalSubmitted;
	
	private CloseoutDetails closeoutDetails;
		
	//private Set<ChangeOrder> changeOrders;
	
	private int shouldInvoice;
	
	private int invoiced;
	
	private String projectNotes;
	
	private String managerNotes;
	
	private Date scheduledStartDate;
	
	private Date scheduledTurnover;
	
	private Date actualTurnover;
	
	private ProjectStage stage;
	
	private ProjectType projectType;
	
	private String zachUpdates;
	
	private String cost;
	
	private String customerNumber;
	
	private Date permitApp;
	
	//private Equipment equipmentData;

	private String DrawingsDue;

	private Inspections inspections;
	
	private Permits permits;
	
	private Set<ChangeOrder> changeOrders;
	
	private Set<Equipment> equipment;
	private Set<NewEquipment> projEquipment;
	
	public Project(Warehouse warehouse, String scope,
			Person projectManagers, Set<Person> supervisors,
			Region region, ProjectStatus status, Date projectInitiatedDate,
			Date siteSurvey, Date costcoDueDate, Date proposalSubmitted, CloseoutDetails closeoutDetails,
			Set<ChangeOrder> changeOrders, int shouldInvoice,
			int invoiced, String projectNotes, Date scheduledStartDate,
			Date scheduledTurnover, Date actualTurnover, ProjectType pType, String zUpdates,
			String cst, String custNum, Date permitApp, Equipment equipList, String DrawingsDue, 
			Inspections inspections, Permits permits, Set<NewEquipment> projEquipment, String managerNotes, 
			Date budgetaryDue , Date budgetarySubmitted)
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
		this.scheduledStartDate = scheduledStartDate;
		this.scheduledTurnover = scheduledTurnover;
		this.actualTurnover = actualTurnover;
		this.McsNumber = 0;
		this.projectType = pType;
		this.zachUpdates = zUpdates;
		this.cost = cst;
		this.customerNumber = custNum;
		this.permitApp = permitApp;
		this.DrawingsDue=DrawingsDue;
		this.inspections= inspections;
		this.permits = permits;
		this.setProjEquipment(projEquipment);
		this.managerNotes = managerNotes;
		this.budgetaryDue = budgetaryDue;
		this.budgetarySubmitted = budgetarySubmitted;

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
		this.managerNotes = null;
		this.scheduledStartDate = null;
		this.scheduledTurnover = null;
		this.actualTurnover = null;
		this.McsNumber = 0;
		this.projectType = null;
		this.zachUpdates = null;
		this.cost = null;
		this.customerNumber = null;
		this.permitApp = null;
		this.DrawingsDue=null;
		this.setProjEquipment(new HashSet<NewEquipment>());
		this.budgetaryDue = null;
		this.budgetarySubmitted = null;
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

	@Column(length = 1000)
	public synchronized String getProjectNotes() {
		return projectNotes;
	}

	public synchronized void setProjectNotes(String projectNotes) {
		this.projectNotes = projectNotes;
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
	
	public synchronized Date getPermitApplication() {
		return permitApp;
	}

	public synchronized void setPermitApplication(Date permitApp) {
		this.permitApp = permitApp;
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
}
