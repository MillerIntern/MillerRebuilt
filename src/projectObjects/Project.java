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
	
	private Date costcoDueDate;
	
	private Date proposalSubmitted;
	
	private CloseoutDetails closeoutDetails;
	
	private CloseoutCheckList closeoutCheckList;
	
	private Set<ChangeOrder> changeOrders;
	
	private int shouldInvoice;
	
	private int invoiced;
	
	private String projectNotes;
	
	private Date scheduledStartDate;
	
	private Date scheduledTurnover;
	
	private Date actualTurnover;
	
	private ProjectStage stage;
	
	private ProjectType projectType;
	
	private String zachUpdates;
	
	private String cost;
	
	private String customerNumber;
	
	private Date permitApp;
	
	private Equipment equipmentData;

	private String DrawingsDue;

	private Inspections inspections;
	
	private Permits permits;
	
	private Equipment equipment;
	
	private long eqpd;
	/*
	private Set<EquipmentType> equipmentList;
	
	private Set<EquipVendor> equipmentVendors;
	*/
	//private RequestForInfo rfi;

	public Project(Warehouse warehouse, String scope,
			Person projectManagers, Set<Person> supervisors,
			Region region, ProjectStatus status, Date projectInitiatedDate,
			Date siteSurvey, Date costcoDueDate, Date proposalSubmitted, CloseoutDetails closeoutDetails,
			CloseoutCheckList closeoutCheckList,
			Set<ChangeOrder> changeOrders, int shouldInvoice,
			int invoiced, String projectNotes, Date scheduledStartDate,
			Date scheduledTurnover, Date actualTurnover, ProjectType pType, String zUpdates,
			String cst, String custNum, Date permitApp, Equipment equipList, String DrawingsDue, Inspections inspections)
	{
		// Set<EquipmentType> equips, Set<EquipVendor> vendorList
		
		this.warehouse = warehouse;
		this.scope = scope;
		this.projectManagers = projectManagers;
		this.supervisors = supervisors;
		this.status = status;
		this.projectInitiatedDate = projectInitiatedDate;
		this.siteSurvey = siteSurvey;
		this.costcoDueDate = costcoDueDate;
		this.proposalSubmitted = proposalSubmitted;
		this.closeoutDetails = closeoutDetails;
		this.closeoutCheckList = closeoutCheckList;
		this.changeOrders = changeOrders;
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
		this.equipmentData = equipList;
		this.DrawingsDue=DrawingsDue;
		this.inspections= inspections;
		//this.equipmentList = equips;
		//this.equipmentVendors = vendorList;
		//this.rfi = requestInfo;
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
		this.costcoDueDate = null;
		this.proposalSubmitted = null;
		this.closeoutDetails = new CloseoutDetails();
		this.closeoutCheckList = new CloseoutCheckList();
		this.changeOrders = new HashSet<ChangeOrder>();
		this.shouldInvoice = 0;
		this.invoiced = 0;
		this.projectNotes = null;
		this.scheduledStartDate = null;
		this.scheduledTurnover = null;
		this.actualTurnover = null;
		this.McsNumber = 0;
		this.projectType = null;
		this.zachUpdates = null;
		this.cost = null;
		this.customerNumber = null;
		this.permitApp = null;
		this.equipmentData = null;
		this.DrawingsDue=null;
		this.inspections=null;
		//this.equipmentList = new HashSet<EquipmentType>();
		//this.equipmentVendors = new HashSet<EquipVendor>();
		//this.rfi = null;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectStage getStage() {
		return stage;
	}

	public void setStage(ProjectStage stage) {
		this.stage = stage;
	}

	public Date getScheduledStartDate() {
		return scheduledStartDate;
	}

	public void setScheduledStartDate(Date scheduledStartDate) {
		this.scheduledStartDate = scheduledStartDate;
	}

	public Date getScheduledTurnover() {
		return scheduledTurnover;
	}

	public void setScheduledTurnover(Date scheduledTurnover) {
		this.scheduledTurnover = scheduledTurnover;
	}

	public Date getActualTurnover() {
		return actualTurnover;
	}

	public void setActualTurnover(Date actualTurnover) {
		this.actualTurnover = actualTurnover;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectClass getProjectClass() {
		return projectClass;
	}

	public void setProjectClass(ProjectClass projectClass) {
		this.projectClass = projectClass;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	@Column(length = 1000)
	public String getScope() {
		return scope;
	}
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getMcsNumber()
	{
		return McsNumber;
	}
	
	public void setMcsNumber(int num)
	{
		McsNumber = num;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "project_managers",
	      joinColumns = {@JoinColumn(name = "project_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public Person getProjectManagers() {
		return projectManagers;
	}

	public void setProjectManagers(Person projectManagers) {
		this.projectManagers = projectManagers;
	}

	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "project_supervisors",
	      joinColumns = {@JoinColumn(name = "project_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public Set<Person> getSupervisors() {
		return supervisors;
	}

	public void setSupervisors(Set<Person> supervisors) {
		this.supervisors = supervisors;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectStatus getStatus() {
		return status;
	}

	public void setStatus(ProjectStatus status) {
		this.status = status;
	}

	public Date getProjectInitiatedDate() {
		return projectInitiatedDate;
	}

	public void setProjectInitiatedDate(Date projectInitiatedDate) {
		this.projectInitiatedDate = projectInitiatedDate;
	}

	public Date getSiteSurvey() {
		return siteSurvey;
	}

	public void setSiteSurvey(Date siteSurvey) {
		this.siteSurvey = siteSurvey;
	}

	public Date getCostcoDueDate() {
		return costcoDueDate;
	}

	public void setCostcoDueDate(Date costcoDueDate) {
		this.costcoDueDate = costcoDueDate;
	}

	public Date getProposalSubmitted() {
		return proposalSubmitted;
	}

	public void setProposalSubmitted(Date proposalSubmitted) {
		this.proposalSubmitted = proposalSubmitted;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutCheckList getCloseoutCheckList() {
		return closeoutCheckList;
	}

	public void setCloseoutCheckList(CloseoutCheckList closeoutCheckList) {
		this.closeoutCheckList = closeoutCheckList;
	}

	@ElementCollection
	@OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Set<ChangeOrder> getChangeOrders() {
		return changeOrders;
	}

	public void setChangeOrders(Set<ChangeOrder> changeOrders) {
		this.changeOrders = changeOrders;
	}

	public int getShouldInvoice() {
		return shouldInvoice;
	}

	public void setShouldInvoice(int shouldInvoice) {
		this.shouldInvoice = shouldInvoice;
	}

	public int getInvoiced() {
		return invoiced;
	}

	public void setInvoiced(int invoiced) {
		this.invoiced = invoiced;
	}

	@Column(length = 1000)
	public String getProjectNotes() {
		return projectNotes;
	}

	public void setProjectNotes(String projectNotes) {
		this.projectNotes = projectNotes;
	}
	
	//TODO: A project should have multiple supervisors, but the GUI does not support this right now.
	public void addSupervisor(Person p)
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
	public void addProjectManager(Person p)
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
	public ProjectItem getProjectItem() {
		return projectItem;
	}

	public void setProjectItem(ProjectItem projectItem) {
		this.projectItem = projectItem;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectType getProjectType() {
		return projectType;
	}

	public void setProjectType(ProjectType pType) {
		projectType = pType;
	}
	
	@Column(length = 1000)
	public String getZachUpdates() {
		return zachUpdates;
	}
	
	public void setZachUpdates(String zUpdates) {
		this.zachUpdates = zUpdates;
	}
	
	public String getCost() {
		return cost;
	}

	public void setCost(String cst) {
		this.cost = cst;
	}
	
	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String custNum) {
		this.customerNumber = custNum;
	}
	
	public Date getPermitApplication() {
		return permitApp;
	}

	public void setPermitApplication(Date permitApp) {
		this.permitApp = permitApp;
	}
	
	/*
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Equipment getEquipmentData() {
		return equipmentData;
	}

	public void setEquipmentData(Equipment equipmentData) {
		this.equipmentData = equipmentData;
	}*/
	
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutDetails getCloseoutDetails()
	{
		return this.closeoutDetails;
	}
	
	public void setCloseoutDetails(CloseoutDetails closeoutDetails)
	{
		this.closeoutDetails = closeoutDetails;
	}

	public void setDrawingsDue(String DrawingsDue)
	{
		this.DrawingsDue=DrawingsDue;
	}
	public String getDrawingsDue()
	{
		return this.DrawingsDue;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Inspections getInspections(){
		return this.inspections;
	}
	public void setInspections(Inspections inspections){
		this.inspections=inspections;
	}
	
	
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Permits getPermits(){
		return this.permits;
	}
	
	public void setPermits(Permits permits){
		this.permits=permits;
	}
	
	/*
	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Equipment getEquipment()
	{
		return this.equipment;
	}
	
	public void setEquipment(Equipment equipment)
	{
		this.equipment = equipment;
	}
	*/
	
	public void setEqpd(long id )
	{
		this.eqpd = id;
	}
	
	public long getEqpd()
	{
		return this.eqpd;
	}
	
	
	
	
	
	//public 
		
	/*
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "equipmentType",
	      joinColumns = {@JoinColumn(name = "equip_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public Set<EquipmentType> getEquipment(){
		return equipmentList;
	}
	
	
	public void setEquipList(Set<EquipmentType> equipList)
	{
		this.equipmentList = equipList;
	}
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinTable(name = "equipVendor",
	      joinColumns = {@JoinColumn(name = "vendor_id")},
	      inverseJoinColumns = @JoinColumn(name = "id"))
	public Set<EquipVendor> getEquipVendor(){
		return equipmentVendors;
	}
	
	
	public void setEquipVendors(Set<EquipVendor> equipVens)
	{
		this.equipmentVendors = equipVens;
	}
	/*
	public RequestForInfo getRequestForInformation()
	{
		return rfi;
	}
	
	public void setRequestForInformation(RequestForInfo info)
	{
		this.rfi = info;
	}
	*/
}
