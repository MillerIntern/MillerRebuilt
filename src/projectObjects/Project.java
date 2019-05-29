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
	
	//private Equipment equipmentData;

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
	
	private String mcsNumberAndStage;
	private String permitsEval;
	private String hvac;
	private String refrigeration;
	private String permitsTBD;
	private String stageAndStatus;
	private String project;
	private String lateProposal;
	private String lateBudgetary;
	private String lateTurnover;
	private String emptyInitiation;
	private String earlierSchedTurnover;
	private String emptyCost;
	private String emptyCustNum;
	private String actualAndShouldInvoice;
	private String zeroShouldInvoice;
	private String zeroActualInvoice;
	private String earlierSiteSurvey;
	private String earlierDueDate;
	private String buildingReq;
	private String ceilingReq;
	private String mechanicalReq;
	private String electricalReq;
	private String plumbingReq;
	private String buildingPermitReqTBD;
	private String gasReq;
	private String sprinklerReq;
	private String fireAlarmReq;
	private String lowVoltageReq;
	private String ceilingPermitReqTBD;
	private String mechanicalPermitReqTBD;
	private String electricalPermitReqTBD;
	private String plumbingPermitReqTBD;
	private String gasPermitReqTBD;
	private String sprinklerPermitReqTBD;
	private String fireAlarmPermitReqTBD;
	private String lowVoltagePermitReqTBD;
	private String buildingInspReqTBD;
	private String ceilingInspReqTBD;
	private String mechanicalInspReqTBD;
	private String electricalInspReqTBD;
	private String plumbingInspReqTBD;
	private String gasInspReqTBD;
	private String sprinklerInspReqTBD;
	private String fireAlarmInspReqTBD;
	private String lowVoltageInspReqTBD;
	private String buildingPermitStatusTBD;
	private String ceilingPermitStatusTBD;
	private String mechanicalPermitStatusTBD;
	private String electricalPermitStatusTBD;
	private String plumbingPermitStatusTBD;
	private String gasPermitStatusTBD;
	private String sprinklerPermitStatusTBD;
	private String fireAlarmPermitStatusTBD;
	private String lowVoltagePermitStatusTBD;
	private String buildingInspStatusTBD;
	private String ceilingInspStatusTBD;
	private String mechanicalInspStatusTBD;
	private String electricalInspStatusTBD;
	private String plumbingInspStatusTBD;
	private String gasInspStatusTBD;
	private String sprinklerInspStatusTBD;
	private String fireAlarmInspStatusTBD;
	private String lowVoltageInspStatusTBD;
	private String buildingPermitYesNa;
	private String ceilingPermitYesNa;
	private String mechanicalPermitYesNa;
	private String electricalPermitYesNa;
	private String plumbingPermitYesNa;
	private String gasPermitYesNa;
	private String sprinklerPermitYesNa;
	private String fireAlarmPermitYesNa;
	private String lowVoltagePermitYesNa;
	private String buildingInspYesNa;
	private String ceilingInspYesNa;
	private String mechanicalInspYesNa;
	private String electricalInspYesNa;
	private String plumbingInspYesNa;
	private String gasInspYesNa;
	private String sprinklerInspYesNa;
	private String fireAlarmInspYesNa;
	private String lowVoltageInspYesNa;
	private String buildingPermitNoYes;
	private String ceilingPermitNoYes;
	private String mechanicalPermitNoYes;
	private String electricalPermitNoYes;
	private String plumbingPermitNoYes;
	private String gasPermitNoYes;
	private String sprinklerPermitNoYes;
	private String fireAlarmPermitNoYes;
	private String lowVoltagePermitNoYes;
	private String buildingInspNoYes;
	private String ceilingInspNoYes;
	private String mechanicalInspNoYes;
	private String electricalInspNoYes;
	private String plumbingInspNoYes;
	private String gasInspNoYes;
	private String sprinklerInspNoYes;
	private String fireAlarmInspNoYes;
	private String lowVoltageInspNoYes;
	
//	//	private String punchList;
////	private String asBuilt;
////	private String closeoutPhotos;
	
	public Project(Warehouse warehouse, String scope,
			Person projectManagers, Set<Person> supervisors,
			Region region, ProjectStatus status, Date projectInitiatedDate,
			Date siteSurvey, Date costcoDueDate, Date proposalSubmitted, CloseoutDetails closeoutDetails,
			Set<ChangeOrder> changeOrders, int shouldInvoice,
			int invoiced, String projectNotes, Date scheduledStartDate,
			Date scheduledTurnover, Date actualTurnover, ProjectType pType, String zUpdates,
			String cst, String custNum, Equipment equipList, String DrawingsDue, 
			Inspections inspections, Permits permits, Set<NewEquipment> projEquipment, String managerNotes, 
            Date budgetaryDue, Date budgetarySubmitted, String autofill_HVAC, String autofill_Refrigeration,
            String autofill_Permits, int _low, int _med, int _high, Date _scoreLast, String numAndStage, String permEval,
            String _hvac, String refrig, String permitsTbd, String stageStatus, String proj, String _lateProposal, 
            String _lateBudgetary, String _lateTurnover, String _emptyInitiation, String _earlierSchedTurnover,
            String _emptyCost, String _emptyCustNum, String _actualAndShouldInvoice, String _zeroShouldInvoice,
            String _zeroActualInvoice, String _earlierSiteSurvey, String _earlierDueDate, String _buildingReq,
            String _ceilingReq, String _mechanicalReq, String _electricalReq, String _plumbingReq, String _buildingPermitReqTBD,
            String _gasReq, String _sprinklerReq, String _fireAlarmReq,  String _lowVoltageReq, String _ceilingPermitReqTBD,
            String _mechanicalPermitReqTBD, String _electricalPermitReqTBD, String _plumbingPermitReqTBD, String _gasPermitReqTBD,
            String _sprinklerPermitReqTBD, String _fireAlarmPermitReqTBD, String _lowVoltagePermitReqTBD, String _buildingInspReqTBD,
            String _ceilingInspReqTBD, String _mechanicalInspReqTBD, String _electricalInspReqTBD, String _plumbingInspReqTBD,
            String _gasInspReqTBD, String _sprinklerInspReqTBD, String _fireAlarmInspReqTBD, String _lowVoltageInspReqTBD,
            String _buildingPermitStatusTBD, String _ceilingPermitStatusTBD, String _mechanicalPermitStatusTBD, 
            String _electricalPermitStatusTBD, String _plumbingPermitStatusTBD, String _gasPermitStatusTBD, String _sprinklerPermitStatusTBD,
            String _fireAlarmPermitStatusTBD, String _lowVoltagePermitStatusTBD, String _buildingInspStatusTBD, String _ceilingInspStatusTBD,
            String _mechanicalInspStatusTBD, String _electricalInspStatusTBD, String _plumbingInspStatusTBD, String _gasInspStatusTBD, 
            String _sprinklerInspStatusTBD, String _fireAlarmInspStatusTBD, String _lowVoltageInspStatusTBD, String _buildingPermitYesNa,
            String _ceilingPermitYesNa, String _mechanicalPermitYesNa,  String _electricalPermitYesNa, String _plumbingPermitYesNa, 
            String _gasPermitYesNa, String _sprinklerPermitYesNa, String _fireAlarmPermitYesNa, String _lowVoltagePermitYesNa,
            String _buildingInspYesNa, String _ceilingInspYesNa, String _mechanicalInspYesNa, String _electricalInspYesNa, 
            String _plumbingInspYesNa, String _gasInspYesNa, String _sprinklerInspYesNa, String _fireAlarmInspYesNa, 
            String _lowVoltageInspYesNa, String _buildingPermitNoYes, String _ceilingPermitNoYes, String _mechanicalPermitNoYes,
            String _electricalPermitNoYes, String _plumbingPermitNoYes, String _gasPermitNoYes, String _sprinklerPermitNoYes,
            String _fireAlarmPermitNoYes, String _lowVoltagePermitNoYes, String _buildingInspNoYes, String _ceilingInspNoYes,
            String _mechanicalInspNoYes, String _electricalInspNoYes, String _plumbingInspNoYes, String _gasInspNoYes,
            String _sprinklerInspNoYes, String _fireAlarmInspNoYes, String _lowVoltageInspNoYes)

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
		
		this.mcsNumberAndStage = numAndStage;
		this.permitsEval = permEval;
		this.hvac = _hvac;
		this.refrigeration = refrig;
		this.permitsTBD = permitsTbd;
		this.stageAndStatus = stageStatus;
		this.project = proj;
		this.lateProposal = _lateProposal;
		this.lateBudgetary = _lateBudgetary;
		this.lateTurnover = _lateTurnover;
		this.emptyInitiation = _emptyInitiation;
		this.earlierSchedTurnover = _earlierSchedTurnover;
		this.emptyCost = _emptyCost;
		this.emptyCustNum = _emptyCustNum;
		this.actualAndShouldInvoice = _actualAndShouldInvoice;
		this.zeroShouldInvoice = _zeroShouldInvoice;
		this.zeroActualInvoice = _zeroActualInvoice;
		this.earlierSiteSurvey = _earlierSiteSurvey;
		this.earlierDueDate = _earlierDueDate;
		this.buildingReq = _buildingReq;
		this.ceilingReq = _ceilingReq;
		this.mechanicalReq = _mechanicalReq;
		this.electricalReq = _electricalReq;
		this.plumbingReq = _plumbingReq;
		this.buildingPermitReqTBD = _buildingPermitReqTBD;
		this.gasReq = _gasReq;
		this.sprinklerReq = _sprinklerReq;
		this.fireAlarmReq = _fireAlarmReq;
		this.lowVoltageReq = _lowVoltageReq;
		this.ceilingPermitReqTBD = _ceilingPermitReqTBD;
		this.mechanicalPermitReqTBD = _mechanicalPermitReqTBD;
		this.electricalPermitReqTBD = _electricalPermitReqTBD;
		this.plumbingPermitReqTBD = _plumbingPermitReqTBD;
		this.gasPermitReqTBD = _gasPermitReqTBD;
		this.sprinklerPermitReqTBD = _sprinklerPermitReqTBD;
		this.fireAlarmPermitReqTBD = _fireAlarmPermitReqTBD;
		this.lowVoltagePermitReqTBD = _lowVoltagePermitReqTBD;
		this.buildingInspReqTBD = _buildingInspReqTBD;
		this.ceilingInspReqTBD = _ceilingInspReqTBD;
		this.mechanicalInspReqTBD = _mechanicalInspReqTBD;
		this.electricalInspReqTBD = _electricalInspReqTBD;
		this.plumbingInspReqTBD = _plumbingInspReqTBD;
		this.gasInspReqTBD = _gasInspReqTBD;
		this.sprinklerInspReqTBD = _sprinklerInspReqTBD;
		this.fireAlarmInspReqTBD = _fireAlarmInspReqTBD;
		this.lowVoltageInspReqTBD = _lowVoltageInspReqTBD;
		this.buildingPermitStatusTBD = _buildingPermitStatusTBD;
		this.ceilingPermitStatusTBD = _ceilingPermitStatusTBD;
		this.mechanicalPermitStatusTBD = _mechanicalPermitStatusTBD;
		this.electricalPermitStatusTBD = _electricalPermitStatusTBD;
		this.plumbingPermitStatusTBD = _plumbingPermitStatusTBD;
		this.gasPermitStatusTBD = _gasPermitStatusTBD;
		this.sprinklerPermitStatusTBD = _sprinklerPermitStatusTBD;
		this.fireAlarmPermitStatusTBD = _fireAlarmPermitStatusTBD;
		this.lowVoltagePermitStatusTBD = _lowVoltagePermitStatusTBD;
		this.buildingInspStatusTBD = _buildingInspStatusTBD;
		this.ceilingInspStatusTBD = _ceilingInspStatusTBD;
		this.mechanicalInspStatusTBD = _mechanicalInspStatusTBD;
		this.electricalInspStatusTBD = _electricalInspStatusTBD;
		this.plumbingInspStatusTBD = _plumbingInspStatusTBD;
		this.gasInspStatusTBD = _gasInspStatusTBD;
		this.sprinklerInspStatusTBD = _sprinklerInspStatusTBD;
		this.fireAlarmInspStatusTBD = _fireAlarmInspStatusTBD;
		this.lowVoltageInspStatusTBD = _lowVoltageInspStatusTBD;
		this.buildingPermitYesNa = _buildingPermitYesNa;
		this.ceilingPermitYesNa = _ceilingPermitYesNa;
		this.mechanicalPermitYesNa = _mechanicalPermitYesNa;
		this.electricalPermitYesNa = _electricalPermitYesNa;
		this.plumbingPermitYesNa = _plumbingPermitYesNa;
		this.gasPermitYesNa = _gasPermitYesNa;
		this.sprinklerPermitYesNa = _sprinklerPermitYesNa;
		this.fireAlarmPermitYesNa = _fireAlarmPermitYesNa;
		this.lowVoltagePermitYesNa = _lowVoltagePermitYesNa;
		this.buildingInspYesNa = _buildingInspYesNa;
		this.ceilingInspYesNa = _ceilingInspYesNa;
		this.mechanicalInspYesNa = _mechanicalInspYesNa;
		this.electricalInspYesNa = _electricalInspYesNa;
		this.plumbingInspYesNa = _plumbingInspYesNa;
		this.gasInspYesNa = _gasInspYesNa;
		this.sprinklerInspYesNa = _sprinklerInspYesNa;
		this.fireAlarmInspYesNa = _fireAlarmInspYesNa;
		this.lowVoltageInspYesNa = _lowVoltageInspYesNa;
		this.buildingPermitNoYes = _buildingPermitNoYes;
		this.ceilingPermitNoYes = _ceilingPermitNoYes;
		this.mechanicalPermitNoYes = _mechanicalPermitNoYes;
		this.electricalPermitNoYes = _electricalPermitNoYes;
		this.plumbingPermitNoYes = _plumbingPermitNoYes;
		this.gasPermitNoYes = _gasPermitNoYes;
		this.sprinklerPermitNoYes = _sprinklerPermitNoYes;
		this.fireAlarmPermitNoYes = _fireAlarmPermitNoYes;
		this.lowVoltagePermitNoYes = _lowVoltagePermitNoYes;
		this.buildingInspNoYes = _buildingInspNoYes;
		this.ceilingInspNoYes = _ceilingInspNoYes;
		this.mechanicalInspNoYes = _mechanicalInspNoYes;
		this.electricalInspNoYes = _electricalInspNoYes;
		this.plumbingInspNoYes = _plumbingInspNoYes;
		this.gasInspNoYes = _gasInspNoYes;
		this.sprinklerInspNoYes = _sprinklerInspNoYes;
		this.fireAlarmInspNoYes = _fireAlarmInspNoYes;
		this.lowVoltageInspNoYes = _lowVoltageInspNoYes;
		
//		this.punchList = _punchList;
//		this.asBuilt = _asBuilt;
//		this.closeoutPhotos = _closeoutPhotos;
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
		
		this.mcsNumberAndStage = null;
		this.permitsEval = null;
		this.hvac = null;
		this.refrigeration = null;
		this.permitsTBD = null;
		this.stageAndStatus = null;
		this.project = null;
		this.lateProposal = null;
		this.lateBudgetary = null;
		this.lateTurnover = null;
		this.emptyInitiation = null;
		this.earlierSchedTurnover = null;
		this.emptyCost = null;
		this.emptyCustNum = null;
		this.actualAndShouldInvoice = null;
		this.zeroShouldInvoice = null;
		this.zeroActualInvoice = null;
		this.earlierSiteSurvey = null;
		this.earlierDueDate = null;
		this.buildingReq = null;
		this.ceilingReq = null;
		this.mechanicalReq = null;
		this.electricalReq = null;
		this.plumbingReq = null;
		this.buildingPermitReqTBD = null;
		this.gasReq = null;
		this.sprinklerReq = null;
		this.fireAlarmReq = null;
		this.lowVoltageReq = null;
		this.ceilingPermitReqTBD = null;
		this.mechanicalPermitReqTBD = null;
		this.electricalPermitReqTBD = null;
		this.plumbingPermitReqTBD = null;
		this.gasPermitReqTBD = null;
		this.sprinklerPermitReqTBD = null;
		this.fireAlarmPermitReqTBD = null;
		this.lowVoltagePermitReqTBD = null;
		this.buildingInspReqTBD = null;
		this.ceilingInspReqTBD = null;
		this.mechanicalInspReqTBD = null;
		this.electricalInspReqTBD = null;
		this.plumbingInspReqTBD = null;
		this.gasInspReqTBD = null;
		this.sprinklerInspReqTBD = null;
		this.fireAlarmInspReqTBD = null;
		this.lowVoltageInspReqTBD = null;
		this.buildingPermitStatusTBD = null;
		this.ceilingPermitStatusTBD = null;
		this.mechanicalPermitStatusTBD = null;
		this.electricalPermitStatusTBD = null;
		this.plumbingPermitStatusTBD = null;
		this.gasPermitStatusTBD = null;
		this.sprinklerPermitStatusTBD = null;
		this.fireAlarmPermitStatusTBD = null;
		this.lowVoltagePermitStatusTBD = null;
		this.buildingInspStatusTBD = null;
		this.ceilingInspStatusTBD = null;
		this.mechanicalInspStatusTBD = null;
		this.electricalInspStatusTBD = null;
		this.plumbingInspStatusTBD = null;
		this.gasInspStatusTBD = null;
		this.sprinklerInspStatusTBD = null;
		this.fireAlarmInspStatusTBD = null;
		this.lowVoltageInspStatusTBD = null;
		this.buildingPermitYesNa = null;
		this.ceilingPermitYesNa = null;
		this.mechanicalPermitYesNa = null;
		this.electricalPermitYesNa = null;
		this.plumbingPermitYesNa = null;
		this.gasPermitYesNa = null;
		this.sprinklerPermitYesNa = null;
		this.fireAlarmPermitYesNa = null;
		this.lowVoltagePermitYesNa = null;
		this.buildingInspYesNa = null;
		this.ceilingInspYesNa = null;
		this.mechanicalInspYesNa = null;
		this.electricalInspYesNa = null;
		this.plumbingInspYesNa = null;
		this.gasInspYesNa = null;
		this.sprinklerInspYesNa = null;
		this.fireAlarmInspYesNa = null;
		this.lowVoltageInspYesNa = null;
		this.buildingPermitNoYes = null;
		this.ceilingPermitNoYes = null;
		this.mechanicalPermitNoYes = null;
		this.electricalPermitNoYes = null;
		this.plumbingPermitNoYes = null;
		this.gasPermitNoYes = null;
		this.sprinklerPermitNoYes = null;
		this.fireAlarmPermitNoYes = null;
		this.lowVoltagePermitNoYes = null;
		this.buildingInspNoYes = null;
		this.ceilingInspNoYes = null;
		this.mechanicalInspNoYes = null;
		this.electricalInspNoYes = null;
		this.plumbingInspNoYes = null;
		this.gasInspNoYes = null;
		this.sprinklerInspNoYes = null;
		this.fireAlarmInspNoYes = null;
		this.lowVoltageInspNoYes = null;
		
//		this.punchList = null;
//		this.asBuilt = null;
//		this.closeoutPhotos = null;

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
	
	public synchronized String getMcsNumAndStage()
	{
		return mcsNumberAndStage;
	}
	
	public synchronized void setMcsNumAndStage(String numStage)
	{
	    this.mcsNumberAndStage = numStage;
	}
	
	public synchronized String getPermitsEval()
	{
		return permitsEval;
	}
	
	public synchronized void setPermitsEval(String permit)
	{
	    this.permitsEval = permit;
	}
	
	public synchronized String getHVAC()
	{
		return hvac;
	}
	
	public synchronized void setHVAC(String hva)
	{
	    this.hvac = hva;
	}
	
	public synchronized String getRefrigeration()
	{
		return refrigeration;
	}
	
	public synchronized void setRefrigeration(String refrig)
	{
	    this.refrigeration = refrig;
	}
	
	public synchronized String getPermitsTBD()
	{
		return permitsTBD;
	}
	
	public synchronized void setPermitsTBD(String permTbd)
	{
	    this.permitsTBD = permTbd;
	}
	
	public synchronized String getStageAndStatus()
	{
		return stageAndStatus;
	}
	
	public synchronized void setStageAndStatus(String stageStatus)
	{
	    this.stageAndStatus = stageStatus;
	}
	
	public synchronized String getProject()
	{
		return project;
	}
	
	public synchronized void setProject(String proj)
	{
	    this.project = proj;
	}
	
	public synchronized String getLateProposal()
	{
		return lateProposal;
	}
	
	public synchronized void setLateProposal(String prop)
	{
	    this.lateProposal = prop;
	}
	
	public synchronized String getLateBudgetary()
	{
		return lateBudgetary;
	}
	
	public synchronized void setLateBudgetary(String bud)
	{
	    this.lateBudgetary = bud;
	}
	
	public synchronized String getLateTurnover()
	{
		return lateTurnover;
	}
	
	public synchronized void setLateTurnover(String turn)
	{
	    this.lateTurnover = turn;
	}
	
	public synchronized String getEmptyInitiation()
	{
		return emptyInitiation;
	}
	
	public synchronized void setEmptyInitiation(String init)
	{
	    this.emptyInitiation = init;
	}
	
	public synchronized String getEarlierSchedTurnover()
	{
		return earlierSchedTurnover;
	}
	
	public synchronized void setEarlierSchedTurnover(String sched)
	{
	    this.earlierSchedTurnover = sched;
	}
	
	public synchronized String getEmptyCost()
	{
		return emptyCost;
	}
	
	public synchronized void setEmptyCost(String cost)
	{
	    this.emptyCost = cost;
	}
	
	public synchronized String getEmptyCustNum()
	{
		return emptyCustNum;
	}
	
	public synchronized void setEmptyCustNum(String num)
	{
	    this.emptyCustNum = num;
	}
	
	public synchronized String getActualAndShouldInv()
	{
		return actualAndShouldInvoice;
	}
	
	public synchronized void setActualAndShouldInv(String inv)
	{
	    this.actualAndShouldInvoice = inv;
	}
	
	public synchronized String getZeroShouldInv()
	{
		return zeroShouldInvoice;
	}
	
	public synchronized void setZeroShouldInv(String inv)
	{
	    this.zeroShouldInvoice = inv;
	}
	
	public synchronized String getZeroActualInv()
	{
		return zeroActualInvoice;
	}
	
	public synchronized void setZeroActualInv(String inv)
	{
	    this.zeroActualInvoice = inv;
	}
	
	public synchronized String getEarlierSiteSurvey()
	{
		return earlierSiteSurvey;
	}
	
	public synchronized void setEarlierSiteSurvey(String surv)
	{
	    this.earlierSiteSurvey = surv;
	}
	
	public synchronized String getEarlierDueDate()
	{
		return earlierDueDate;
	}
	
	public synchronized void setEarlierDueDate(String date)
	{
	    this.earlierDueDate = date;
	}
	
	public synchronized String getBuildingRequired()
	{
		return buildingReq;
	}
	
	public synchronized void setBuildingRequired(String req)
	{
	    this.buildingReq = req;
	}
	
	public synchronized String getCeilingRequired()
	{
		return ceilingReq;
	}
	
	public synchronized void setCeilingRequired(String req)
	{
	    this.ceilingReq = req;
	}
	
	public synchronized String getMechanicalRequired()
	{
		return mechanicalReq;
	}
	
	public synchronized void setMechanicalRequired(String req)
	{
	    this.mechanicalReq = req;
	}
	
	public synchronized String getElectricalReq()
	{
		return electricalReq;
	}
	
	public synchronized void setElectricalReq(String req)
	{
	    this.electricalReq = req;
	}
	
	public synchronized String getPlumbingReq()
	{
		return plumbingReq;
	}
	
	public synchronized void setPlumbingReq(String req)
	{
	    this.plumbingReq = req;
	}
	
	public synchronized String getBuildingPermitReqTBD()
	{
		return buildingPermitReqTBD;
	}
	
	public synchronized void setBuildingPermitReqTBD(String tbd)
	{
	    this.buildingPermitReqTBD = tbd;
	}
	
	public synchronized String getGasReq()
	{
		return gasReq;
	}
	
	public synchronized void setGasReq(String req)
	{
	    this.gasReq = req;
	}
	
	public synchronized String getSprinklerReq()
	{
		return sprinklerReq;
	}
	
	public synchronized void setSprinklerReq(String req)
	{
	    this.sprinklerReq = req;
	}
	
	public synchronized String getFireAlarmReq()
	{
		return fireAlarmReq;
	}
	
	public synchronized void setFireAlarmReq(String req)
	{
	    this.fireAlarmReq = req;
	}
	
	public synchronized String getLowVoltageReq()
	{
		return lowVoltageReq;
	}
	
	public synchronized void setLowVoltageReq(String req)
	{
	    this.lowVoltageReq = req;
	}
	
	public synchronized String getCeilingPermitReqTBD()
	{
		return ceilingPermitReqTBD;
	}
	
	public synchronized void setCeilingPermitReqTBD(String tbd)
	{
	    this.ceilingPermitReqTBD = tbd;
	}
	
	public synchronized String getMechanicalPermitReqTBD()
	{
		return mechanicalPermitReqTBD;
	}
	
	public synchronized void setMechanicalPermitReqTBD(String tbd)
	{
	    this.mechanicalPermitReqTBD = tbd;
	}
	
	public synchronized String getElectricalPermitReqTBD()
	{
		return electricalPermitReqTBD;
	}
	
	public synchronized void setElectricalPermitReqTBD(String tbd)
	{
	    this.electricalPermitReqTBD = tbd;
	}
	
	public synchronized String getPlumbingPermitReqTBD()
	{
		return plumbingPermitReqTBD;
	}
	
	public synchronized void setPlumbingPermitReqTBD(String tbd)
	{
	    this.plumbingPermitReqTBD = tbd;
	}
	
	public synchronized String getGasPermitReqTBD()
	{
		return gasPermitReqTBD;
	}
	
	public synchronized void setGasPermitReqTBD(String tbd)
	{
	    this.gasPermitReqTBD = tbd;
	}
	
	public synchronized String getSprinklerPermitReqTBD()
	{
		return sprinklerPermitReqTBD;
	}
	
	public synchronized void setSprinklerPermitReqTBD(String tbd)
	{
	    this.sprinklerPermitReqTBD = tbd;
	}
	
	public synchronized String getFireAlarmPermitReqTBD()
	{
		return fireAlarmPermitReqTBD;
	}
	
	public synchronized void setFireAlarmPermitReqTBD(String tbd)
	{
	    this.fireAlarmPermitReqTBD = tbd;
	}
	
	public synchronized String getLowVolPermitReqTBD()
	{
		return lowVoltagePermitReqTBD;
	}
	
	public synchronized void setLowVolPermitReqTBD(String tbd)
	{
	    this.lowVoltagePermitReqTBD = tbd;
	}
	
	public synchronized String getBuildingInspReqTBD()
	{
		return buildingInspReqTBD;
	}
	
	public synchronized void setBuildingInspReqTBD(String tbd)
	{
	    this.buildingInspReqTBD = tbd;
	}
	
	public synchronized String getCeilingInspReqTBD()
	{
		return ceilingInspReqTBD;
	}
	
	public synchronized void setCeilingInspReqTBD(String tbd)
	{
	    this.ceilingInspReqTBD = tbd;
	}
	
	public synchronized String getMechanicalInspReqTBD()
	{
		return mechanicalInspReqTBD;
	}
	
	public synchronized void setMechanicalInspReqTBD(String tbd)
	{
	    this.mechanicalInspReqTBD = tbd;
	}
	
	public synchronized String getElectricalInspReqTBD()
	{
		return electricalInspReqTBD;
	}
	
	public synchronized void setElectricalInspReqTBD(String tbd)
	{
	    this.electricalInspReqTBD = tbd;
	}
	
	public synchronized String getPlumbingInspReqTBD()
	{
		return plumbingInspReqTBD;
	}
	
	public synchronized void setPlumbingInspReqTBD(String tbd)
	{
	    this.plumbingInspReqTBD = tbd;
	}
	
	public synchronized String getGasInspReqTBD()
	{
		return gasInspReqTBD;
	}
	
	public synchronized void setGasInspReqTBD(String tbd)
	{
	    this.gasInspReqTBD = tbd;
	}
	
	public synchronized String getSprinklerInspReqTBD()
	{
		return sprinklerInspReqTBD;
	}
	
	public synchronized void setSprinklerInspReqTBD(String tbd)
	{
	    this.sprinklerInspReqTBD = tbd;
	}
	
	public synchronized String getFireAlarmInspReqTBD()
	{
		return fireAlarmInspReqTBD;
	}
	
	public synchronized void setFireAlarmInspReqTBD(String tbd)
	{
	    this.fireAlarmInspReqTBD = tbd;
	}
	
	public synchronized String getLowVolInspReqTBD()
	{
		return lowVoltageInspReqTBD;
	}
	
	public synchronized void setLowVolInspReqTBD(String tbd)
	{
	    this.lowVoltageInspReqTBD = tbd;
	}
	
	public synchronized String getbuildingPermitStatusTBD()
	{
		return buildingPermitStatusTBD;
	}
	
	public synchronized void setbuildingPermitStatusTBD(String tbd)
	{
	    this.buildingPermitStatusTBD = tbd;
	}
	
	public synchronized String getCeilingPermitStatusTBD()
	{
		return ceilingPermitStatusTBD;
	}
	
	public synchronized void setCeilingPermitStatusTBD(String tbd)
	{
	    this.ceilingPermitStatusTBD = tbd;
	}
	
	public synchronized String getMechanicalPermitStatusTBD()
	{
		return mechanicalPermitStatusTBD;
	}
	
	public synchronized void setMechanicalPermitStatusTBD(String tbd)
	{
	    this.mechanicalPermitStatusTBD = tbd;
	}
	
	public synchronized String getElectricalPermitStatusTBD()
	{
		return electricalPermitStatusTBD;
	}
	
	public synchronized void setElectricalPermitStatusTBD(String tbd)
	{
	    this.electricalPermitStatusTBD = tbd;
	}
	
	public synchronized String getPlumbingPermitStatusTBD()
	{
		return plumbingPermitStatusTBD;
	}
	
	public synchronized void setPlumbingPermitStatusTBD(String tbd)
	{
	    this.plumbingPermitStatusTBD = tbd;
	}
	
	public synchronized String getGasPermitStatusTBD()
	{
		return gasPermitStatusTBD;
	}
	
	public synchronized void setGasPermitStatusTBD(String tbd)
	{
	    this.gasPermitStatusTBD = tbd;
	}
	
	public synchronized String getSprinklerPermitStatusTBD()
	{
		return sprinklerPermitStatusTBD;
	}
	
	public synchronized void setSprinklerPermitStatusTBD(String tbd)
	{
	    this.sprinklerPermitStatusTBD = tbd;
	}
	
	public synchronized String getFireAlarmPermitStatusTBD()
	{
		return fireAlarmPermitStatusTBD;
	}
	
	public synchronized void setFireAlarmPermitStatusTBD(String tbd)
	{
	    this.fireAlarmPermitStatusTBD = tbd;
	}
	
	public synchronized String getLowVolPermitStatusTBD()
	{
		return lowVoltagePermitStatusTBD;
	}
	
	public synchronized void setLowVolPermitStatusTBD(String tbd)
	{
	    this.lowVoltagePermitStatusTBD = tbd;
	}
	
	public synchronized String getBuildingInspStatusTBD()
	{
		return buildingInspStatusTBD;
	}
	
	public synchronized void setBuildingInspStatusTBD(String tbd)
	{
	    this.buildingInspStatusTBD = tbd;
	}
	
	public synchronized String getCeilingInspStatusTBD()
	{
		return ceilingInspStatusTBD;
	}
	
	public synchronized void setCeilingInspStatusTBD(String tbd)
	{
	    this.ceilingInspStatusTBD = tbd;
	}
	
	public synchronized String getMechanicalInspStatusTBD()
	{
		return mechanicalInspStatusTBD;
	}
	
	public synchronized void setMechanicalInspStatusTBD(String tbd)
	{
	    this.mechanicalInspStatusTBD = tbd;
	}
	
	public synchronized String getElectricalInspStatusTBD()
	{
		return electricalInspStatusTBD;
	}
	
	public synchronized void setElectricalInspStatusTBD(String tbd)
	{
	    this.electricalInspStatusTBD = tbd;
	}
	
	public synchronized String getPlumbingInspStatusTBD()
	{
		return plumbingInspStatusTBD;
	}
	
	public synchronized void setPlumbingInspStatusTBD(String tbd)
	{
	    this.plumbingInspStatusTBD = tbd;
	}
	
	public synchronized String getGasInspStatusTBD()
	{
		return gasInspStatusTBD;
	}
	
	public synchronized void setGasInspStatusTBD(String tbd)
	{
	    this.gasInspStatusTBD = tbd;
	}
	
	public synchronized String getSprinklerInspStatusTBD()
	{
		return sprinklerInspStatusTBD;
	}
	
	public synchronized void setSprinklerInspStatusTBD(String tbd)
	{
	    this.sprinklerInspStatusTBD = tbd;
	}
	
	public synchronized String getFireAlarmInspStatusTBD()
	{
		return fireAlarmInspStatusTBD;
	}
	
	public synchronized void setFireAlarmInspStatusTBD(String tbd)
	{
	    this.fireAlarmInspStatusTBD = tbd;
	}
	
	public synchronized String getLowVolInspStatusTBD()
	{
		return lowVoltageInspStatusTBD;
	}
	
	public synchronized void setLowVolInspStatusTBD(String tbd)
	{
	    this.lowVoltageInspStatusTBD = tbd;
	}
	
	public synchronized String getBuildingPermitYesNa()
	{
		return buildingPermitYesNa;
	}
	
	public synchronized void setBuildingPermitYesNa(String tbd)
	{
	    this.buildingPermitYesNa = tbd;
	}
	
	public synchronized String getCeilingPermitYesNa()
	{
		return ceilingPermitYesNa;
	}
	
	public synchronized void setCeilingPermitYesNa(String tbd)
	{
	    this.ceilingPermitYesNa = tbd;
	}
	
	public synchronized String getMechanicalPermitYesNa()
	{
		return mechanicalPermitYesNa;
	}
	
	public synchronized void setMechanicalPermitYesNa(String tbd)
	{
	    this.mechanicalPermitYesNa = tbd;
	}
	
	public synchronized String getElectricalPermitYesNa()
	{
		return electricalPermitYesNa;
	}
	
	public synchronized void setElectricalPermitYesNa(String tbd)
	{
	    this.electricalPermitYesNa = tbd;
	}
	
	public synchronized String getPlumbingPermitYesNa()
	{
		return plumbingPermitYesNa;
	}
	
	public synchronized void setPlumbingPermitYesNa(String tbd)
	{
	    this.plumbingPermitYesNa = tbd;
	}
	
	public synchronized String getGasPermitYesNa()
	{
		return gasPermitYesNa;
	}
	
	public synchronized void setGasPermitYesNa(String tbd)
	{
	    this.gasPermitYesNa = tbd;
	}
	
	public synchronized String getSprinklerPermitYesNa()
	{
		return sprinklerPermitYesNa;
	}
	
	public synchronized void setSprinklerPermitYesNa(String tbd)
	{
	    this.sprinklerPermitYesNa = tbd;
	}
	
	public synchronized String getFireAlarmPermitYesNa()
	{
		return fireAlarmPermitYesNa;
	}
	
	public synchronized void setFireAlarmPermitYesNa(String tbd)
	{
	    this.fireAlarmPermitYesNa = tbd;
	}
	
	public synchronized String getLowVolPermitYesNa()
	{
		return lowVoltagePermitYesNa;
	}
	
	public synchronized void setLowVolPermitYesNa(String tbd)
	{
	    this.lowVoltagePermitYesNa = tbd;
	}

	public synchronized String getBuildingInspYesNa()
	{
		return buildingInspYesNa;
	}
	
	public synchronized void setBuildingInspYesNa(String tbd)
	{
	    this.buildingInspYesNa = tbd;
	}
	
	public synchronized String getCeilingInspYesNa()
	{
		return ceilingInspYesNa;
	}
	
	public synchronized void setCeilingInspYesNa(String tbd)
	{
	    this.ceilingInspYesNa = tbd;
	}
	
	public synchronized String getMechanicalInspYesNa()
	{
		return mechanicalInspYesNa;
	}
	
	public synchronized void setMechanicalInspYesNa(String tbd)
	{
	    this.mechanicalInspYesNa = tbd;
	}
	
	public synchronized String getElectricalInspYesNa()
	{
		return electricalInspYesNa;
	}
	
	public synchronized void setElectricalInspYesNa(String tbd)
	{
	    this.electricalInspYesNa = tbd;
	}
	
	public synchronized String getPlumbingInspYesNa()
	{
		return plumbingInspYesNa;
	}
	
	public synchronized void setPlumbingInspYesNa(String tbd)
	{
	    this.plumbingInspYesNa = tbd;
	}
	
	public synchronized String getGasInspYesNa()
	{
		return gasInspYesNa;
	}
	
	public synchronized void setGasInspYesNa(String tbd)
	{
	    this.gasInspYesNa = tbd;
	}
	
	public synchronized String getSprinklerInspYesNa()
	{
		return sprinklerInspYesNa;
	}
	
	public synchronized void setSprinklerInspYesNa(String tbd)
	{
	    this.sprinklerInspYesNa = tbd;
	}
	
	public synchronized String getFireAlarmInspYesNa()
	{
		return fireAlarmInspYesNa;
	}
	
	public synchronized void setFireAlarmInspYesNa(String tbd)
	{
	    this.fireAlarmInspYesNa = tbd;
	}
	
	public synchronized String getLowVolInspYesNa()
	{
		return lowVoltageInspYesNa;
	}
	
	public synchronized void setLowVolInspYesNa(String tbd)
	{
	    this.lowVoltageInspYesNa = tbd;
	}
	
	public synchronized String getBuildingPermitNoYes()
	{
		return buildingPermitNoYes;
	}
	
	public synchronized void setBuildingPermitNoYes(String tbd)
	{
	    this.buildingPermitNoYes = tbd;
	}
	
	public synchronized String getCeilingPermitNoYes()
	{
		return ceilingPermitNoYes;
	}
	
	public synchronized void setCeilingPermitNoYes(String tbd)
	{
	    this.ceilingPermitNoYes = tbd;
	}
	
	public synchronized String getMechanicalPermitNoYes()
	{
		return mechanicalPermitNoYes;
	}
	
	public synchronized void setMechanicalPermitNoYes(String tbd)
	{
	    this.mechanicalPermitNoYes = tbd;
	}
	
	public synchronized String getElectricalPermitNoYes()
	{
		return electricalPermitNoYes;
	}
	
	public synchronized void setElectricalPermitNoYes(String tbd)
	{
	    this.electricalPermitNoYes = tbd;
	}
	
	public synchronized String getPlumbingPermitNoYes()
	{
		return plumbingPermitNoYes;
	}
	
	public synchronized void setPlumbingPermitNoYes(String tbd)
	{
	    this.plumbingPermitNoYes = tbd;
	}
	
	public synchronized String getGasPermitNoYes()
	{
		return gasPermitNoYes;
	}
	
	public synchronized void setGasPermitNoYes(String tbd)
	{
	    this.gasPermitNoYes = tbd;
	}
	
	public synchronized String getSprinklerPermitNoYes()
	{
		return sprinklerPermitNoYes;
	}
	
	public synchronized void setSprinklerPermitNoYes(String tbd)
	{
	    this.sprinklerPermitNoYes = tbd;
	}
	
	public synchronized String getFireAlarmPermitNoYes()
	{
		return fireAlarmPermitNoYes;
	}
	
	public synchronized void setFireAlarmPermitNoYes(String tbd)
	{
	    this.fireAlarmPermitNoYes = tbd;
	}
	
	public synchronized String getLowVolPermitNoYes()
	{
		return lowVoltagePermitNoYes;
	}
	
	public synchronized void setLowVolPermitNoYes(String tbd)
	{
	    this.lowVoltagePermitNoYes = tbd;
	}

	public synchronized String getBuildingInspNoYes()
	{
		return buildingInspNoYes;
	}
	
	public synchronized void setBuildingInspNoYes(String tbd)
	{
	    this.buildingInspNoYes = tbd;
	}
	
	public synchronized String getCeilingInspNoYes()
	{
		return ceilingInspNoYes;
	}
	
	public synchronized void setCeilingInspNoYes(String tbd)
	{
	    this.ceilingInspNoYes = tbd;
	}
	
	public synchronized String getMechanicalInspNoYes()
	{
		return mechanicalInspNoYes;
	}
	
	public synchronized void setMechanicalInspNoYes(String tbd)
	{
	    this.mechanicalInspNoYes = tbd;
	}
	
	public synchronized String getElectricalInspNoYes()
	{
		return electricalInspNoYes;
	}
	
	public synchronized void setElectricalInspNoYes(String tbd)
	{
	    this.electricalInspNoYes = tbd;
	}
	
	public synchronized String getPlumbingInspNoYes()
	{
		return plumbingInspNoYes;
	}
	
	public synchronized void setPlumbingInspNoYes(String tbd)
	{
	    this.plumbingInspNoYes = tbd;
	}
	
	public synchronized String getGasInspNoYes()
	{
		return gasInspNoYes;
	}
	
	public synchronized void setGasInspNoYes(String tbd)
	{
	    this.gasInspNoYes = tbd;
	}
	
	public synchronized String getSprinklerInspNoYes()
	{
		return sprinklerInspNoYes;
	}
	
	public synchronized void setSprinklerInspNoYes(String tbd)
	{
	    this.sprinklerInspNoYes = tbd;
	}
	
	public synchronized String getFireAlarmInspNoYes()
	{
		return fireAlarmInspNoYes;
	}
	
	public synchronized void setFireAlarmInspNoYes(String tbd)
	{
	    this.fireAlarmInspNoYes = tbd;
	}
	
	public synchronized String getLowVolInspNoYes()
	{
		return lowVoltageInspNoYes;
	}
	
	public synchronized void setLowVolInspNoYes(String tbd)
	{
	    this.lowVoltageInspNoYes = tbd;
	}
//	
//	
//	public synchronized String getPunchList()
//	{
//		return punchList;
//	}
//	
//	public synchronized void setPunchList(String pl)
//	{
//	    this.punchList = pl;
//	}
//	
//	public synchronized String getAsBuilt()
//	{
//		return asBuilt;
//	}
//	
//	public synchronized void setAsBuilt(String as)
//	{
//	    this.asBuilt = as;
//	}
//	
//	public synchronized String getCloseoutPhotos()
//	{
//		return closeoutPhotos;
//	}
//	
//	public synchronized void setCloseoutPhotos(String cp)
//	{
//	    this.closeoutPhotos = cp;
//	}
//	
	
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
		
		return null;
	}
	
	public static Map<String , String> getAllFinancialFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		fields.put("shouldInvoice" , "Number");
		fields.put("actualInvoice" , "Number");
		fields.put("cost" , "Number");
		fields.put("customerNumber", "Number");

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

		return fields;
	}

}

