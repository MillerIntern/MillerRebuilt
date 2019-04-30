package projectObjects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class CostEstimate {
   

	@Id
	@GeneratedValue
	
	private Long project_id;
	private int genConProposalReq;
	private int genConSubName;
	private int genConStatus;
	private Date genConSubmitDate;
	private double genConCost;
	private String genConScope;
	private String genConNotes;
	private int refrigProposalReq;
	private int refrigSubName;
	private int refrigStatus;
	private Date refrigSubmitDate;
	private Double refrigCost;
	private String refrigScope;
	private String refrigNotes;
	private int mechanicalProposalReq;
	private int mechanicalSubName;
	private int mechanicalStatus;
	private Date mechanicalSubmitDate;
	private Double mechanicalCost;
	private String mechanicalScope;
	private String mechanicalNotes;
	private int electricalProposalReq;
	private int electricalSubName;
	private int electricalStatus;
	private Date electricalSubmitDate;
	private double electricalCost;
	private String electricalScope;
	private String electricalNotes;
	private int plumbingProposalReq;
	private int plumbingSubName;
	private int plumbingStatus;
	private Date plumbingSubmitDate;
	private double plumbingCost;
	private String plumbingScope;
	private String plumbingNotes;
	private int gasProposalReq;
	private int gasSubName;
	private int gasStatus;
	private Date gasSubmitDate;
	private double gasCost;
	private String gasScope;
	private String gasNotes;
	private int sprinklerProposalReq;
	private int sprinklerSubName;
	private int sprinklerStatus;
	private Date sprinklerSubmitDate;
	private double sprinklerCost;
	private String sprinklerScope;
	private String sprinklerNotes;
	private int fireAlarmProposalReq;
	private int fireAlarmSubName;
	private int fireAlarmStatus;
	private Date fireAlarmSubmitDate;
	private double fireAlarmCost;
	private String fireAlarmScope;
	private String fireAlarmNotes;
	private int carpenterProposalReq;
	private int carpenterSubName;
	private int carpenterStatus;
	private Date carpenterSubmitDate;
	private double carpenterCost;
	private String carpenterScope;
	private String carpenterNotes;
	private int equipmentProposalReq;
	private int equipmentSubName;
	private int equipmentStatus;
	private Date equipmentSubmitDate;
	private double equipmentCost;
	private String equipmentScope;
	private String equipmentNotes;
	private int supervisionProposalReq;
	private int supervisionSubName;
	private int supervisionStatus;
	private Date supervisionSubmitDate;
	private double supervisionCost;
	private String supervisionScope;
	private String supervisionNotes;
	private int profitProposalReq;
	private int profitSubName;
	private int profitStatus;
	private Date profitSubmitDate;
	private double profitCost;
	private String profitScope;
	private String profitNotes;
	private int taxesProposalReq;
	private int taxesSubName;
	private int taxesStatus;
	private Date taxesSubmitDate;
	private double taxesCost;
	private String taxesScope;
	private String taxesNotes;
	private int totalProposalReq;
	private int totalSubName;
	private int totalStatus;
	private Date totalSubmitDate;
	private double totalCost;
	private String totalScope;
	private String totalNotes;
	private int proj;
	
	public CostEstimate(Long proj, int genConProposalReq, int genConSubName, int genConStatus, Date genConSubmitDate, double genConCost,
						String genConScope, String genConNotes, int refrigProposalReq, int refrigSubName, int refrigStatus, Date refrigSubmitDate,
						double refrigCost, String refrigScope, String refrigNotes,int mechanicalProposalReq, int mechanicalSubName,
						int mechanicalStatus, Date mechanicalSubmitDate, double mechanicalCost, String mechanicalScope, String mechanicalNotes,
						int electricalProposalReq, int electricalSubName, int electricalStatus, Date electricalSubmitDate, double electricalCost,
						String electricalScope, String electricalNotes, int plumbingProposalReq, int plumbingSubName, int plumbingStatus,
						Date plumbingSubmitDate, double plumbingCost, String plumbingScope, String plumbingNotes, int gasProposalReq, int gasSubName,
						int gasStatus, Date gasSubmitDate, double gasCost, String gasScope, String gasNotes, int sprinklerProposalReq, 
						int sprinklerSubName, int sprinklerStatus, Date sprinklerSubmitDate, double sprinklerCost, String sprinklerScope, 
						String sprinklerNotes, int fireAlarmProposalReq, int fireAlarmSubName, int fireAlarmStatus, Date fireAlarmSubmitDate,
						double fireAlarmCost, String fireAlarmScope, String fireAlarmNotes, int carpenterProposalReq, int carpenterSubName,
						int carpenterStatus, Date carpenterSubmitDate, double carpenterCost, String carpenterScope, String carpenterNotes,
						int equipmentProposalReq, int equipmentSubName, int equipmentStatus, Date equipmentSubmitDate, double equipmentCost,
						String equipmentScope, String equipmentNotes, int supervisionProposalReq, int supervisionSubName, int supervisionStatus,
						Date supervisionSubmitDate, double supervisionCost, String supervisionScope, String supervisionNotes, int profitProposalReq,
						int profitSubName, int profitStatus, Date profitSubmitDate, double profitCost, String profitScope, String profitNotes,
						int taxesProposalReq, int taxesSubName, int taxesStatus, Date taxesSubmitDate, double taxesCost, String taxesScope,
						String taxesNotes, int totalProposalReq, int totalSubName, int totalStatus, Date totalSubmitDate, double totalCost,
						String totalScope, String totalNotes, int project)
	{
		this.project_id = proj;
		this.genConProposalReq = genConProposalReq;
		this.genConSubName = genConSubName;
		this.genConStatus = genConStatus;
		this.genConSubmitDate = genConSubmitDate;
		this.genConCost = genConCost;
		this.genConScope = genConScope;
		this.genConNotes = genConNotes;
		this.refrigProposalReq = refrigProposalReq;
		this.refrigSubName = refrigSubName;
		this.refrigStatus = refrigStatus;
		this.refrigSubmitDate = refrigSubmitDate;
		this.refrigCost = refrigCost;
		this.refrigScope = refrigScope;
		this.refrigNotes = refrigNotes;
		this.mechanicalProposalReq = mechanicalProposalReq;
		this.mechanicalSubName = mechanicalSubName;
		this.mechanicalStatus = mechanicalStatus;
		this.mechanicalSubmitDate = mechanicalSubmitDate;
		this.mechanicalCost = mechanicalCost;
		this.mechanicalScope = mechanicalScope;
		this.mechanicalNotes = mechanicalNotes;
		this.electricalProposalReq = electricalProposalReq;
		this.electricalSubName = electricalSubName;
		this.electricalStatus = electricalStatus;
		this.electricalSubmitDate = electricalSubmitDate;
		this.electricalCost = electricalCost;
		this.electricalScope = electricalScope;
		this.electricalNotes = electricalNotes;
		this.plumbingProposalReq = plumbingProposalReq;
		this.plumbingSubName = plumbingSubName;
		this.plumbingStatus = plumbingStatus;
		this.plumbingSubmitDate = plumbingSubmitDate;
		this.plumbingCost = plumbingCost;
		this.plumbingScope = plumbingScope;
		this.plumbingNotes = plumbingNotes;
		this.gasProposalReq = gasProposalReq;
		this.gasSubName = gasSubName;
		this.gasStatus = gasStatus;
		this.gasSubmitDate = gasSubmitDate;
		this.gasCost = gasCost;
		this.gasScope = gasScope;
		this.gasNotes = gasNotes;
		this.sprinklerProposalReq = sprinklerProposalReq;
		this.sprinklerSubName = sprinklerSubName;
		this.sprinklerStatus = sprinklerStatus;
		this.sprinklerSubmitDate = sprinklerSubmitDate;
		this.sprinklerCost = sprinklerCost;
		this.sprinklerScope = sprinklerScope;
		this.sprinklerNotes = sprinklerNotes;
		this.fireAlarmProposalReq = fireAlarmProposalReq;
		this.fireAlarmSubName = fireAlarmSubName;
		this.fireAlarmStatus = fireAlarmStatus;
		this.fireAlarmSubmitDate = fireAlarmSubmitDate;
		this.fireAlarmCost = fireAlarmCost;
		this.fireAlarmScope = fireAlarmScope;
		this.fireAlarmNotes = fireAlarmNotes;
		this.carpenterProposalReq = carpenterProposalReq;
		this.carpenterSubName = carpenterSubName;
		this.carpenterStatus = carpenterStatus;
		this.carpenterSubmitDate = carpenterSubmitDate;
		this.carpenterCost = carpenterCost;
		this.carpenterScope = carpenterScope;
		this.carpenterNotes = carpenterNotes;
		this.equipmentProposalReq = equipmentProposalReq;
		this.equipmentSubName = equipmentSubName;
		this.equipmentStatus = equipmentStatus;
		this.equipmentSubmitDate = equipmentSubmitDate;
		this.equipmentCost = equipmentCost;
		this.equipmentScope = equipmentScope;
		this.equipmentNotes = equipmentNotes;
		this.supervisionProposalReq = supervisionProposalReq;
		this.supervisionSubName = supervisionSubName;
		this.supervisionStatus = supervisionStatus;
		this.supervisionSubmitDate = supervisionSubmitDate;
		this.supervisionCost = supervisionCost;
		this.supervisionScope = supervisionScope;
		this.supervisionNotes = supervisionNotes;
		this.profitProposalReq = profitProposalReq;
		this.profitSubName = profitSubName;
		this.profitStatus = profitStatus;
		this.profitSubmitDate = profitSubmitDate;
		this.profitCost = profitCost;
		this.profitScope = profitScope;
		this.profitNotes = profitNotes;
		this.taxesProposalReq = taxesProposalReq;
		this.taxesSubName = taxesSubName;
		this.taxesStatus = taxesStatus;
		this.taxesSubmitDate = taxesSubmitDate;
		this.taxesCost = taxesCost;
		this.taxesScope = taxesScope;
		this.taxesNotes = taxesNotes;
		this.totalProposalReq = totalProposalReq;
		this.totalSubName = totalSubName;
		this.totalStatus = totalStatus;
		this.totalSubmitDate = totalSubmitDate;
		this.totalCost = totalCost;
		this.totalScope = totalScope;
		this.totalNotes = totalNotes;			
		this.proj = project;
	}
	
	public CostEstimate()
	{
		this.project_id = null;
		this.genConProposalReq = 0;
		this.genConSubName = 0;
		this.genConStatus = 0;
		this.genConSubmitDate = null;
		this.genConCost = 0.0;
		this.genConScope = null;
		this.genConNotes = null;
		this.refrigProposalReq = 0;
		this.refrigSubName = 0;
		this.refrigStatus = 0;
		this.refrigSubmitDate = null;
		this.refrigCost = 0.0;
		this.refrigScope = null;
		this.refrigNotes = null;
		this.mechanicalProposalReq = 0;
		this.mechanicalSubName = 0;
		this.mechanicalStatus = 0;
		this.mechanicalSubmitDate = null;
		this.mechanicalCost = 0.0;
		this.mechanicalScope = null;
		this.mechanicalNotes = null;
		this.electricalProposalReq = 0;
		this.electricalSubName = 0;
		this.electricalStatus = 0;
		this.electricalSubmitDate = null;
		this.electricalCost = 0.0;
		this.electricalScope = null;
		this.electricalNotes = null;
		this.plumbingProposalReq = 0;
		this.plumbingSubName = 0;
		this.plumbingStatus = 0;
		this.plumbingSubmitDate = null;
		this.plumbingCost = 0.0;
		this.plumbingScope = null;
		this.plumbingNotes = null;
		this.gasProposalReq = 0;
		this.gasSubName = 0;
		this.gasStatus = 0;
		this.gasSubmitDate = null;
		this.gasCost = 0.0;
		this.gasScope = null;
		this.gasNotes = null;
		this.sprinklerProposalReq = 0;
		this.sprinklerSubName = 0;
		this.sprinklerStatus = 0;
		this.sprinklerSubmitDate = null;
		this.sprinklerCost = 0.0;
		this.sprinklerScope = null;
		this.sprinklerNotes = null;
		this.fireAlarmProposalReq = 0;
		this.fireAlarmSubName = 0;
		this.fireAlarmStatus = 0;
		this.fireAlarmSubmitDate = null;
		this.fireAlarmCost = 0.0;
		this.fireAlarmScope = null;
		this.fireAlarmNotes = null;
		this.carpenterProposalReq = 0;
		this.carpenterSubName = 0;
		this.carpenterStatus = 0;
		this.carpenterSubmitDate = null;
		this.carpenterCost = 0.0;
		this.carpenterScope = null;
		this.carpenterNotes = null;
		this.equipmentProposalReq = 0;
		this.equipmentSubName = 0;
		this.equipmentStatus = 0;
		this.equipmentSubmitDate = null;
		this.equipmentCost = 0.0;
		this.equipmentScope = null;
		this.equipmentNotes = null;
		this.supervisionProposalReq = 0;
		this.supervisionSubName = 0;
		this.supervisionStatus = 0;
		this.supervisionSubmitDate = null;
		this.supervisionCost = 0.0;
		this.supervisionScope = null;
		this.supervisionNotes = null;
		this.profitProposalReq = 0;
		this.profitSubName = 0;
		this.profitStatus = 0;
		this.profitSubmitDate = null;
		this.profitCost = 0.0;
		this.profitScope = null;
		this.profitNotes = null;
		this.taxesProposalReq = 0;
		this.taxesSubName = 0;
		this.taxesStatus = 0;
		this.taxesSubmitDate = null;
		this.taxesCost = 0.0;
		this.taxesScope = null;
		this.taxesNotes = null;
		this.totalProposalReq = 0;
		this.totalSubName = 0;
		this.totalStatus = 0;
		this.totalSubmitDate = null;
		this.totalCost = 0.0;
		this.totalScope = null;
		this.totalNotes = null;		
		this.proj = 0;
	}


	public synchronized Long getProject()
	{
		return project_id;
	}
	
	public synchronized void setProject(Long project)
	{
		this.project_id = project;
	}

	

	public synchronized int getProj()
	{
		return proj;
	}
	
	public synchronized void setProj(int project)
	{
		this.proj = project;
	}
	
	public synchronized int getGenConProposalReq()
	{
		return genConProposalReq;
	}
	
	public synchronized void setGenConProposalReq(int propReq)
	{
		this.genConProposalReq = propReq;
	}
	
	public synchronized int getGenConSubName()
	{
		return genConSubName;
	}
	
	public synchronized void setGenConSubName(int sub)
	{
		this.genConSubName = sub;
	}
	
	public synchronized int getGenConStatus()
	{
		return genConStatus;
	}
	
	public synchronized void setGenConStatus(int status)
	{
		this.genConStatus = status;
	}
	
	public synchronized Date getGenConSubmitDate()
	{
		return genConSubmitDate;
	}

	public synchronized void setGenConSubmitDate(Date date)
	{
		this.genConSubmitDate = date;
	}
	
	public synchronized double getGenConCost()
	{
		return genConCost;
	}
	
	public synchronized void setGenConCost(double cost)
	{
		this.genConCost = cost;
	}
	
	public synchronized String getGenConScope()
	{
		return genConScope;
	}
	
	public synchronized void setGenConScope(String scope)
	{
		this.genConScope = scope;
	}
	
	public synchronized String getGenConNotes()
	{
		return genConNotes;
	}
	
	public synchronized void setGenConNotes(String notes)
	{
		this.genConNotes = notes;
	}

	public synchronized int getRefrigProposalReq()
	{
		return refrigProposalReq;
	}
	
	public synchronized void setRefrigProposalReq(int propReq)
	{
		this.refrigProposalReq = propReq;
	}
	
	public synchronized int getRefrigSubName()
	{
		return refrigSubName;
	}
	
	public synchronized void setRefrigSubName(int sub)
	{
		this.refrigSubName = sub;
	}
	
	public synchronized int getRefrigStatus()
	{
		return refrigStatus;
	}
	
	public synchronized void setRefrigStatus(int status)
	{
		this.refrigStatus = status;
	}
	
	public synchronized Date getRefrigSubmitDate()
	{
		return refrigSubmitDate;
	}

	public synchronized void setRefrigSubmitDate(Date date)
	{
		this.refrigSubmitDate = date;
	}
	
	public synchronized double getRefrigCost()
	{
		return refrigCost;
	}
	
	public synchronized void setRefrigCost(double cost)
	{
		this.refrigCost = cost;
	}
	
	public synchronized String getRefrigScope()
	{
		return refrigScope;
	}
	
	public synchronized void setRefrigScope(String scope)
	{
		this.refrigScope = scope;
	}
	
	public synchronized String getRefrigNotes()
	{
		return refrigNotes;
	}
	
	public synchronized void setRefrigNotes(String notes)
	{
		this.refrigNotes = notes;
	}
	
	public synchronized int getMechProposalReq()
	{
		return mechanicalProposalReq;
	}
	
	public synchronized void setMechProposalReq(int propReq)
	{
		this.mechanicalProposalReq = propReq;
	}
	
	public synchronized int getMechSubName()
	{
		return mechanicalSubName;
	}
	
	public synchronized void setMechSubName(int sub)
	{
		this.mechanicalSubName = sub;
	}
	
	public synchronized int getMechStatus()
	{
		return mechanicalStatus;
	}
	
	public synchronized void setMechStatus(int status)
	{
		this.mechanicalStatus = status;
	}
	
	public synchronized Date getMechSubmitDate()
	{
		return mechanicalSubmitDate;
	}

	public synchronized void setMechSubmitDate(Date date)
	{
		this.mechanicalSubmitDate = date;
	}
	
	public synchronized double getMechCost()
	{
		return mechanicalCost;
	}
	
	public synchronized void setMechCost(double cost)
	{
		this.mechanicalCost = cost;
	}
	
	public synchronized String getMechScope()
	{
		return mechanicalScope;
	}
	
	public synchronized void setMechScope(String scope)
	{
		this.mechanicalScope = scope;
	}
	
	public synchronized String getMechNotes()
	{
		return mechanicalNotes;
	}
	
	public synchronized void setMechNotes(String notes)
	{
		this.mechanicalNotes = notes;
	}
	
	public synchronized int getElecProposalReq()
	{
		return electricalProposalReq;
	}
	
	public synchronized void setElecProposalReq(int propReq)
	{
		this.electricalProposalReq = propReq;
	}
	
	public synchronized int getElecSubName()
	{
		return electricalSubName;
	}
	
	public synchronized void setElecSubName(int sub)
	{
		this.electricalSubName = sub;
	}
	
	public synchronized int getElecStatus()
	{
		return electricalStatus;
	}
	
	public synchronized void setElecStatus(int status)
	{
		this.electricalStatus = status;
	}
	
	public synchronized Date getElecSubmitDate()
	{
		return electricalSubmitDate;
	}

	public synchronized void setElecSubmitDate(Date date)
	{
		this.electricalSubmitDate = date;
	}
	
	public synchronized double getElecCost()
	{
		return electricalCost;
	}
	
	public synchronized void setElecCost(double cost)
	{
		this.electricalCost = cost;
	}
	
	public synchronized String getElecScope()
	{
		return electricalScope;
	}
	
	public synchronized void setElecScope(String scope)
	{
		this.electricalScope = scope;
	}
	
	public synchronized String getElecNotes()
	{
		return electricalNotes;
	}
	
	public synchronized void setElecNotes(String notes)
	{
		this.electricalNotes = notes;
	}

	public synchronized int getPlumbingProposalReq()
	{
		return plumbingProposalReq;
	}
	
	public synchronized void setPlumbingProposalReq(int propReq)
	{
		this.plumbingProposalReq = propReq;
	}
	
	public synchronized int getPlumbingSubName()
	{
		return plumbingSubName;
	}
	
	public synchronized void setPlumbingSubName(int sub)
	{
		this.plumbingSubName = sub;
	}
	
	public synchronized int getPlumbingStatus()
	{
		return plumbingStatus;
	}
	
	public synchronized void setPlumbingStatus(int status)
	{
		this.plumbingStatus = status;
	}
	
	public synchronized Date getPlumbingSubmitDate()
	{
		return plumbingSubmitDate;
	}

	public synchronized void setPlumbingSubmitDate(Date date)
	{
		this.plumbingSubmitDate = date;
	}
	
	public synchronized double getPlumbingCost()
	{
		return plumbingCost;
	}
	
	public synchronized void setPlumbingCost(double cost)
	{
		this.plumbingCost = cost;
	}
	
	public synchronized String getPlumbingScope()
	{
		return plumbingScope;
	}
	
	public synchronized void setPlumbingScope(String scope)
	{
		this.plumbingScope = scope;
	}
	
	public synchronized String getPlumbingNotes()
	{
		return plumbingNotes;
	}
	
	public synchronized void setPlumbingNotes(String notes)
	{
		this.plumbingNotes = notes;
	}
	
	public synchronized int getGasProposalReq()
	{
		return gasProposalReq;
	}
	
	public synchronized void setGasProposalReq(int propReq)
	{
		this.gasProposalReq = propReq;
	}
	
	public synchronized int getGasSubName()
	{
		return gasSubName;
	}
	
	public synchronized void setGasSubName(int sub)
	{
		this.gasSubName = sub;
	}
	
	public synchronized int getGasStatus()
	{
		return gasStatus;
	}
	
	public synchronized void setGasStatus(int status)
	{
		this.gasStatus = status;
	}
	
	public synchronized Date getGasSubmitDate()
	{
		return gasSubmitDate;
	}

	public synchronized void setGasSubmitDate(Date date)
	{
		this.gasSubmitDate = date;
	}
	
	public synchronized double getGasCost()
	{
		return gasCost;
	}
	
	public synchronized void setGasCost(double cost)
	{
		this.gasCost = cost;
	}
	
	public synchronized String getGasScope()
	{
		return gasScope;
	}
	
	public synchronized void setGasScope(String scope)
	{
		this.gasScope = scope;
	}
	
	public synchronized String getGasNotes()
	{
		return gasNotes;
	}
	
	public synchronized void setGasNotes(String notes)
	{
		this.gasNotes = notes;
	}
	
	public synchronized int getSprinklerProposalReq()
	{
		return sprinklerProposalReq;
	}
	
	public synchronized void setSprinklerProposalReq(int propReq)
	{
		this.sprinklerProposalReq = propReq;
	}
	
	public synchronized int getSprinklerSubName()
	{
		return sprinklerSubName;
	}
	
	public synchronized void setSprinklerSubName(int sub)
	{
		this.sprinklerSubName = sub;
	}
	
	public synchronized int getSprinklerStatus()
	{
		return sprinklerStatus;
	}
	
	public synchronized void setSprinklerStatus(int status)
	{
		this.sprinklerStatus = status;
	}
	
	public synchronized Date getSprinklerSubmitDate()
	{
		return sprinklerSubmitDate;
	}

	public synchronized void setSprinklerSubmitDate(Date date)
	{
		this.sprinklerSubmitDate = date;
	}
	
	public synchronized double getSprinklerCost()
	{
		return sprinklerCost;
	}
	
	public synchronized void setSprinklerCost(double cost)
	{
		this.sprinklerCost = cost;
	}
	
	public synchronized String getSprinklerScope()
	{
		return sprinklerScope;
	}
	
	public synchronized void setSprinklerScope(String scope)
	{
		this.sprinklerScope = scope;
	}
	
	public synchronized String getSprinklerNotes()
	{
		return sprinklerNotes;
	}
	
	public synchronized void setSprinklerNotes(String notes)
	{
		this.sprinklerNotes = notes;
	}
	
	public synchronized int getFireAlarmProposalReq()
	{
		return fireAlarmProposalReq;
	}
	
	public synchronized void setFireAlarmProposalReq(int propReq)
	{
		this.fireAlarmProposalReq = propReq;
	}
	
	public synchronized int getFireAlarmSubName()
	{
		return fireAlarmSubName;
	}
	
	public synchronized void setFireAlarmSubName(int sub)
	{
		this.fireAlarmSubName = sub;
	}
	
	public synchronized int getFireAlarmStatus()
	{
		return fireAlarmStatus;
	}
	
	public synchronized void setFireAlarmStatus(int status)
	{
		this.fireAlarmStatus = status;
	}
	
	public synchronized Date getFireAlarmSubmitDate()
	{
		return fireAlarmSubmitDate;
	}

	public synchronized void setFireAlarmSubmitDate(Date date)
	{
		this.fireAlarmSubmitDate = date;
	}
	
	public synchronized double getFireAlarmCost()
	{
		return fireAlarmCost;
	}
	
	public synchronized void setFireAlarmCost(double cost)
	{
		this.fireAlarmCost = cost;
	}
	
	public synchronized String getFireAlarmScope()
	{
		return fireAlarmScope;
	}
	
	public synchronized void setFireAlarmScope(String scope)
	{
		this.fireAlarmScope = scope;
	}
	
	public synchronized String getFireAlarmNotes()
	{
		return fireAlarmNotes;
	}
	
	public synchronized void setFireAlarmNotes(String notes)
	{
		this.fireAlarmNotes = notes;
	}
	
	public synchronized int getCarpenterProposalReq()
	{
		return carpenterProposalReq;
	}
	
	public synchronized void setCarpenterProposalReq(int propReq)
	{
		this.carpenterProposalReq = propReq;
	}
	
	public synchronized int getCarpenterSubName()
	{
		return carpenterSubName;
	}
	
	public synchronized void setCarpenterSubName(int sub)
	{
		this.carpenterSubName = sub;
	}
	
	public synchronized int getCarpenterStatus()
	{
		return carpenterStatus;
	}
	
	public synchronized void setCarpenterStatus(int status)
	{
		this.carpenterStatus = status;
	}
	
	public synchronized Date getCarpenterSubmitDate()
	{
		return carpenterSubmitDate;
	}

	public synchronized void setCarpenterSubmitDate(Date date)
	{
		this.carpenterSubmitDate = date;
	}
	
	public synchronized double getCarpenterCost()
	{
		return carpenterCost;
	}
	
	public synchronized void setCarpenterCost(double cost)
	{
		this.carpenterCost = cost;
	}
	
	public synchronized String getCarpenterScope()
	{
		return carpenterScope;
	}
	
	public synchronized void setCarpenterScope(String scope)
	{
		this.carpenterScope = scope;
	}
	
	public synchronized String getCarpenterNotes()
	{
		return carpenterNotes;
	}
	
	public synchronized void setCarpenterNotes(String notes)
	{
		this.carpenterNotes = notes;
	}
	
	public synchronized int getEquipProposalReq()
	{
		return equipmentProposalReq;
	}
	
	public synchronized void setEquipProposalReq(int propReq)
	{
		this.equipmentProposalReq = propReq;
	}
	
	public synchronized int getEquipgSubName()
	{
		return equipmentSubName;
	}
	
	public synchronized void setEquipSubName(int sub)
	{
		this.equipmentSubName = sub;
	}
	
	public synchronized int getEquipStatus()
	{
		return equipmentStatus;
	}
	
	public synchronized void setEquipStatus(int status)
	{
		this.equipmentStatus = status;
	}
	
	public synchronized Date getEquipSubmitDate()
	{
		return equipmentSubmitDate;
	}

	public synchronized void setEquipSubmitDate(Date date)
	{
		this.equipmentSubmitDate = date;
	}
	
	public synchronized double getEquipCost()
	{
		return equipmentCost;
	}
	
	public synchronized void setEquipCost(double cost)
	{
		this.equipmentCost = cost;
	}
	
	public synchronized String getEquipScope()
	{
		return equipmentScope;
	}
	
	public synchronized void setEquipScope(String scope)
	{
		this.equipmentScope = scope;
	}
	
	public synchronized String getEquipNotes()
	{
		return equipmentNotes;
	}
	
	public synchronized void setEquipNotes(String notes)
	{
		this.equipmentNotes = notes;
	}
	
	public synchronized int getSupervisionProposalReq()
	{
		return supervisionProposalReq;
	}
	
	public synchronized void setSupervisionProposalReq(int propReq)
	{
		this.supervisionProposalReq = propReq;
	}
	
	public synchronized int getSupervisionSubName()
	{
		return supervisionSubName;
	}
	
	public synchronized void setSupervisionSubName(int sub)
	{
		this.supervisionSubName = sub;
	}
	
	public synchronized int getSupervisionStatus()
	{
		return supervisionStatus;
	}
	
	public synchronized void setSupervisionStatus(int status)
	{
		this.supervisionStatus = status;
	}
	
	public synchronized Date getSupervisionSubmitDate()
	{
		return supervisionSubmitDate;
	}

	public synchronized void setSupervisionSubmitDate(Date date)
	{
		this.supervisionSubmitDate = date;
	}
	
	public synchronized double getSupervisionCost()
	{
		return supervisionCost;
	}
	
	public synchronized void setSupervisionCost(double cost)
	{
		this.supervisionCost = cost;
	}
	
	public synchronized String getSupervisionScope()
	{
		return supervisionScope;
	}
	
	public synchronized void setSupervisionScope(String scope)
	{
		this.supervisionScope = scope;
	}
	
	public synchronized String getSupervisionNotes()
	{
		return supervisionNotes;
	}
	
	public synchronized void setSupervisionNotes(String notes)
	{
		this.supervisionNotes = notes;
	}
	
	public synchronized int getProfitProposalReq()
	{
		return profitProposalReq;
	}
	
	public synchronized void setProfitProposalReq(int propReq)
	{
		this.profitProposalReq = propReq;
	}
	
	public synchronized int getProfitSubName()
	{
		return profitSubName;
	}
	
	public synchronized void setProfitSubName(int sub)
	{
		this.profitSubName = sub;
	}
	
	public synchronized int getProfitStatus()
	{
		return profitStatus;
	}
	
	public synchronized void setProfitStatus(int status)
	{
		this.profitStatus = status;
	}
	
	public synchronized Date getProfitSubmitDate()
	{
		return profitSubmitDate;
	}

	public synchronized void setProfitSubmitDate(Date date)
	{
		this.profitSubmitDate = date;
	}
	
	public synchronized double getProfitCost()
	{
		return profitCost;
	}
	
	public synchronized void setProfitCost(double cost)
	{
		this.profitCost = cost;
	}
	
	public synchronized String getProfitScope()
	{
		return profitScope;
	}
	
	public synchronized void setProfitScope(String scope)
	{
		this.profitScope = scope;
	}
	
	public synchronized String getProfitNotes()
	{
		return profitNotes;
	}
	
	public synchronized void setProfitNotes(String notes)
	{
		this.profitNotes = notes;
	}
	
	public synchronized int getTaxesProposalReq()
	{
		return taxesProposalReq;
	}
	
	public synchronized void setTaxesProposalReq(int propReq)
	{
		this.taxesProposalReq = propReq;
	}
	
	public synchronized int getTaxesSubName()
	{
		return taxesSubName;
	}
	
	public synchronized void setTaxesSubName(int sub)
	{
		this.taxesSubName = sub;
	}
	
	public synchronized int getTaxesStatus()
	{
		return taxesStatus;
	}
	
	public synchronized void setTaxesStatus(int status)
	{
		this.taxesStatus = status;
	}
	
	public synchronized Date getTaxesSubmitDate()
	{
		return taxesSubmitDate;
	}

	public synchronized void setTaxesSubmitDate(Date date)
	{
		this.taxesSubmitDate = date;
	}
	
	public synchronized double getTaxesCost()
	{
		return taxesCost;
	}
	
	public synchronized void setTaxesCost(double cost)
	{
		this.taxesCost = cost;
	}
	
	public synchronized String getTaxesScope()
	{
		return taxesScope;
	}
	
	public synchronized void setTaxesScope(String scope)
	{
		this.taxesScope = scope;
	}
	
	public synchronized String getTaxesNotes()
	{
		return taxesNotes;
	}
	
	public synchronized void setTaxesNotes(String notes)
	{
		this.taxesNotes = notes;
	}
	
	public synchronized int getTotalProposalReq()
	{
		return totalProposalReq;
	}
	
	public synchronized void setTotalProposalReq(int propReq)
	{
		this.totalProposalReq = propReq;
	}
	
	public synchronized int getTotalSubName()
	{
		return totalSubName;
	}
	
	public synchronized void setTotalSubName(int sub)
	{
		this.totalSubName = sub;
	}
	
	public synchronized int getTotalStatus()
	{
		return totalStatus;
	}
	
	public synchronized void setTotalStatus(int status)
	{
		this.totalStatus = status;
	}
	
	public synchronized Date getTotalSubmitDate()
	{
		return totalSubmitDate;
	}

	public synchronized void setTotalSubmitDate(Date date)
	{
		this.totalSubmitDate = date;
	}
	
	public synchronized double getTotalCost()
	{
		return totalCost;
	}
	
	public synchronized void setTotalCost(double cost)
	{
		this.totalCost = cost;
	}
	
	public synchronized String getTotalScope()
	{
		return totalScope;
	}
	
	public synchronized void setTotalScope(String scope)
	{
		this.totalScope = scope;
	}
	
	public synchronized String getTotalNotes()
	{
		return totalNotes;
	}
	
	public synchronized void setTotalNotes(String notes)
	{
		this.totalNotes = notes;
	}
}
