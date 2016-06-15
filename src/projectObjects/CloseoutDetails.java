package projectObjects;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * This class encapsulates all information about the "closeout" stage of a project.
 * A Closeout Detail is primarily concerned with dates that correspond to when various
 * data elements have been submitted or completed (ex: the date when the verisae shutdown report
 * has been submitted). All or none of these dates may be relevant to any particular project.
 * Every Project object must have a corresponding CloseoutDetail object.
 * 
 * @author Alex Campbell, Josh Mackin
 */
@Entity
public class CloseoutDetails extends ProjectObject
{
	/**
	 * The date that the as-builts have been submitted
	 */
	private Date asBuilts;
	
	/**
	 * The salvage value of a project
	 */
	private SalvageValue salvageValue;
	
	/**
	 * The date when the punch list has been submitted
	 */
	private Date punchList;
	
	/**
	 * The date when the alarm HVAC form has been submitted
	 */
	private Date alarmHvacForm;
	
	/**
	 * The date when the Air/Gas paperwork has been submitted
	 */
	private Date airGas;
	
	/**
	 * THe date when the permits for a project have been closed
	 */
	private Date permitsClosed;
	
	/**
	 * The date when the verisae / shutdown report has been submitted
	 */
	private Date verisaeShutdownReport;
	
	/**
	 * The date when the closeout book has been submitted
	 */
	private Date closeoutBook;
	
	/**
	 * The date when the closeout notes of a project has been submitted
	 */
	private Date closeoutNotes;
	
	private Date buildingPermitCL;
	
	private Date inspectionSOCL;
	
	private Date certCompletionCL;
	
	private Date mPunchListCL;
	
	private Date closeoutPhotosCL;
	
	private Date subConWarrantiesCL;
	
	private Date mCSWarranty;
	
	private Date equipmentSubCL;

	private Date traneCL;
	
	// New Closeout Fields
	private int numOfChangeOrders;
	private int numOfChangeOrdersCompleted;
	
	// Final Liens 
	private String MCSStatus;
	private Date MCSDate;
	
	private String GCStatus;
	private Date GCDate;
	
	private String mechanicalStatus;
	private Date mechanicalDate;
	
	private String electricalStatus;
	private Date electricalDate;
	
	private String plumbingStatus;
	private Date plumbingDate;
	
	private String sprinkleStatus;
	private Date sprinkleDate;
	
	private String roofingStatus;
	private Date roofingDate;
	
	private String HTIStatus;
	private Date HTIDate;
	
	private String otherFinalLeinsStatus;
	private Date otherFinalLeinsDate;

	
	// Inspections
	private String mechFinalStatus;
	private Date mechFinalDate;

	
	private String elecFinalStatus;
	private Date elecFinalDate;

	
	private String plumbingFinalStatus;

	private Date plumbingFinalDate;
	
	private String sprinkleFinalStatus;

	private Date sprinkleFinalDate;
	
	private String buildingFinalStatus;

	
	private String tmpCertificateStatus; 

	private Date tmpCertificateDate;
	
	private String certificateStatus;

	private Date certificateDate;
	
	//Warranties
	private String MCSWarrantyStatus;

	
	private String GCWarrantyStatus;
	private Date GCWarrantyDate;

	
	private String mechanicalWarrantyStatus;
	private Date mechanicalWarrantyDate;

	
	private String electricalWarrantyStatus;
	private Date electricalWarrantyDate;

	
	private String plumbingWarrantyStatus;
	private Date plumbingWarrantyDate;

	
	private String sprinkleWarrantyStatus;
	private Date sprinkleWarrantyDate;

	
	private String roofingWarrantyStatus;
	private Date roofingWarrantyDate;

	
	private String HTIWarrantyStatus;
	private Date HTIWarrantyDate;

	
	private String otherWarrantyStatusA;
	private Date otherWarrantyDateA;
	
	private String otherWarrantyStatusB;
	private Date otherWarrantyDateB;
	
	private String equipmentSubmittalStatus;

	
	private String manualStatus;
	private Date manualDate;

	
	private String punchListStatus;

	
	private String asBuiltDrawingsStatus;

	
	private String closeOutPhotosStatus;

	
	private String HVACstartupFormStatus;
	private Date HVACstartupFormDate;

	
	private String alarmFormStatus;

	
	private String verisaeReportStatus;

	
	private Date mg2CompletionDate;
	private String mg2CompletionStatus;
	
	private String finalInspectionNotes;
	private String finalLiensNotes;
	private String closeoutDocumentsNotes;
	private String warrantyNotes;
	

	public CloseoutDetails(Date asBuilts, SalvageValue salvageValue,
			Date punchList, Date alarmHvacForm, Date airGas,
			Date permitsClosed, Date verisaeShutdownReport, 
			Date closeoutNotes,	Date buildingPermitCL, Date inspectionSOCL,	 Date certCompletionCL,
			Date mPunchListCL, Date closeoutPhotosCL, Date subConWarrantiesCL,
			Date mCSWarranty, Date equipmentSubCL, Date traneCL, Date MCSDate, String MCSStatus,
			Date GCDate, 
			String mechanicalStatus, Date electricalDate, String electricalStatus, Date plumbingDate, 
			String plumbingNotes, String sprinkleStatus, 
			Date roofingDate, Date HTIDate, String HTIStatus, 
			Date otherFinalLeinsDate, String MCSWarrantyStatus, 
			String otherFinalLeinsStatus, Date GCWarrantyDate, String GCWarrantyStatus, 
			Date mechanicalWarrantyDate, String mechanicalWarrantyStatus, 
			Date electricalWarrantyDate, String electricalWarrantyStatus, 
			Date plumbingWarrantyDate, String plumbingWarrantyStatus, Date 
			sprinkleWarrantyDate, String sprinkleWarrantyStatus, Date roofingWarrantyDate, 
			String roofingWarrantyNotes, 
			String HTIWarrantyStatus, Date otherWarrantyDateAA, String otherWarrantyStatusA, 
			Date otherWarrantyDateB, 
			String equipmentSubmittalStatus, Date manualDate, String manualStatus, 
			String asBuiltDrawingsNotes, String asBuiltDrawingsStatus, Date HVACstartupFormDate, 
			String HVACstartupFormNotes, String alarmFormStatus,
			String verisaeReportNotes, String verisaeReportStatus, int numOfChangeOrders, int numOfChangeOrdersCompleted, 
			Date mechFinalDate, String mechFinalStatus, Date elecFinalDate, String elecFinalStatus, 
			Date plumbingFinalDate, String plumbingFinalStatus,
			String buildingFinalNotes, 
			String tmpCertificateStatus, Date certificateDate, String certificateStatus, 
			String punchListStatus, Date mg2CompletionDate, String mg2CompletionStatus, Date tmpCertificateDate, 
			String buildingFinalStatus, String HVACstartupFormStatus, String otherWarrantyStatusB, Date otherWarrantyDateA, 
			Date HTIWarrantyDate, String roofingWarrantyStatus, String roofingStatus, Date sprinkleDate, String plumbingStatus, 
			Date mechanicalDate, String GCStatus, String warrantyNotes, String finalLiensNotes, String finalInspectionNotes,
			String closeoutDocumentsNotes) 
	{
		this.asBuilts = asBuilts;
		this.salvageValue = salvageValue;
		this.punchList = punchList;
		this.alarmHvacForm = alarmHvacForm;
		this.airGas = airGas;
		this.permitsClosed = permitsClosed;
		this.verisaeShutdownReport = verisaeShutdownReport;
	
		this.closeoutNotes = closeoutNotes;

		this.buildingPermitCL = buildingPermitCL;
		this.inspectionSOCL = inspectionSOCL;
		this.certCompletionCL = certCompletionCL;
		this.mPunchListCL = mPunchListCL;
		this.closeoutPhotosCL = closeoutPhotosCL;
		this.subConWarrantiesCL = subConWarrantiesCL;
		this.mCSWarranty = mCSWarranty;
		this.equipmentSubCL = equipmentSubCL;
		this.traneCL = traneCL;
	
		this.MCSDate = MCSDate;											///
		
		this.MCSStatus = MCSStatus;
		this.GCDate = GCDate;											///
		
		this.GCStatus = GCStatus;
		this.mechanicalDate = mechanicalDate;
		
		this.mechanicalStatus = mechanicalStatus;
		this.electricalDate = electricalDate;
		
		this.electricalStatus = electricalStatus;
		this.plumbingDate = plumbingDate;
		
		this.plumbingStatus = plumbingStatus;
		this.sprinkleDate = sprinkleDate;
		
		this.sprinkleStatus = sprinkleStatus;
		this.roofingDate = roofingDate;
		
		this.roofingStatus = roofingStatus;
		this.HTIDate = HTIDate;
		
		this.HTIStatus = HTIStatus;
		this.otherFinalLeinsDate = otherFinalLeinsDate;
		
		this.otherFinalLeinsStatus = otherFinalLeinsStatus;
		
		this.MCSWarrantyStatus = MCSWarrantyStatus;
		this.GCWarrantyDate = GCWarrantyDate;
		
		this.GCWarrantyStatus = GCWarrantyStatus;
		this.mechanicalWarrantyDate = mechanicalWarrantyDate;
		
		this.mechanicalWarrantyStatus = mechanicalWarrantyStatus;
		this.electricalWarrantyDate = electricalWarrantyDate; 
		
		this.electricalWarrantyStatus = electricalWarrantyStatus;
		this.plumbingWarrantyDate = plumbingWarrantyDate;
		
		this.plumbingWarrantyStatus = plumbingWarrantyStatus;
		this.sprinkleWarrantyDate = sprinkleWarrantyDate;
		
		this.sprinkleWarrantyStatus = sprinkleWarrantyStatus;
		this.roofingWarrantyDate = roofingWarrantyDate;
		
		this.roofingWarrantyStatus = roofingWarrantyStatus;
		this.HTIWarrantyDate = HTIWarrantyDate;
		
		this.HTIWarrantyStatus = HTIWarrantyStatus;
		this.otherWarrantyDateA = otherWarrantyDateA;
		this.otherWarrantyStatusA = otherWarrantyStatusA;
		this.otherWarrantyDateB = otherWarrantyDateB;
		this.otherWarrantyStatusB = otherWarrantyStatusB;
		
		this.equipmentSubmittalStatus = equipmentSubmittalStatus;
		this.manualDate = manualDate;
		
		this.manualStatus = manualStatus;
		
		this.asBuiltDrawingsStatus = asBuiltDrawingsStatus;
		this.HVACstartupFormDate = HVACstartupFormDate;
		
		this.HVACstartupFormStatus = HVACstartupFormStatus;
		
		this.alarmFormStatus = alarmFormStatus;
		 
		this.verisaeReportStatus = verisaeReportStatus;
		this.numOfChangeOrders = numOfChangeOrders;
		this.numOfChangeOrdersCompleted = numOfChangeOrdersCompleted;
		
		this.mechFinalDate = mechFinalDate;
		
		this.mechFinalStatus = mechFinalStatus;
		this.elecFinalDate = elecFinalDate;
		this.elecFinalStatus = elecFinalStatus;
		
		this.plumbingFinalDate = plumbingFinalDate;
		
		this.plumbingFinalStatus = plumbingFinalStatus;
		
		this.buildingFinalStatus = buildingFinalStatus;
		this.tmpCertificateDate = tmpCertificateDate;
		
		this.tmpCertificateStatus = tmpCertificateStatus;
		this.certificateDate = certificateDate;
		
		this.certificateStatus = certificateStatus;
		this.punchListStatus = punchListStatus;
		
		
		this.mg2CompletionDate = mg2CompletionDate;
		this.mg2CompletionStatus = mg2CompletionStatus;
		
		this.closeoutDocumentsNotes = closeoutDocumentsNotes;
		this.finalInspectionNotes = finalInspectionNotes;
		this.finalLiensNotes = finalLiensNotes;
		this.warrantyNotes = warrantyNotes;
	}
	
	public CloseoutDetails() 
	{
		this.asBuilts = null;
		this.salvageValue = null;
		this.punchList = null;
		this.alarmHvacForm = null;
		this.airGas = null;
		this.permitsClosed = null;
		this.verisaeShutdownReport = null;
		this.closeoutBook = null;
		this.closeoutNotes = null;
		this.buildingPermitCL = null;
		this.inspectionSOCL = null;
		this.certCompletionCL = null;

		this.mPunchListCL = null;
		this.closeoutPhotosCL = null;
		this.subConWarrantiesCL = null; 
	 	this.mCSWarranty = null;
	 	this.equipmentSubCL = null;
	 	this.traneCL = null;
	 	 	
		this.MCSDate = null;											///
		
		this.MCSStatus = null;
		this.GCDate = null;											///
		
		this.GCStatus = null;
		this.mechanicalDate = null;
		
		this.mechanicalStatus = null;
		this.electricalDate = null;
		
		this.electricalStatus = null;
		this.plumbingDate = null;
		
		this.plumbingStatus = null;
		this.sprinkleDate = null;
		
		this.sprinkleStatus = null;
		this.roofingDate = null;
		
		this.roofingStatus = null;
		this.HTIDate = null;
		
		this.HTIStatus = null;
		this.otherFinalLeinsDate = null;
		
		this.otherFinalLeinsStatus = null;
		
		this.MCSWarrantyStatus = null;
		this.GCWarrantyDate = null;
		
		this.GCWarrantyStatus = null;
		this.mechanicalWarrantyDate = null;
		
		this.mechanicalWarrantyStatus = null;
		this.electricalWarrantyDate = null; 
		
		this.electricalWarrantyStatus = null;
		this.plumbingWarrantyDate = null;
		
		this.plumbingWarrantyStatus = null;
		this.sprinkleWarrantyDate = null;
		
		this.sprinkleWarrantyStatus = null;
		this.roofingWarrantyDate = null;
		
		this.roofingWarrantyStatus = null;
		this.HTIWarrantyDate = null;
		
		this.HTIWarrantyStatus = null;
		this.otherWarrantyDateA = null;
		this.otherWarrantyStatusA = null;
		this.otherWarrantyDateB = null;
		this.otherWarrantyStatusB = null;
		
		this.equipmentSubmittalStatus = null;
		this.manualDate = null;
		
		this.manualStatus = null;
		
		this.asBuiltDrawingsStatus = null;
		this.HVACstartupFormDate = null;
		
		this.HVACstartupFormStatus = null;
		
		this.alarmFormStatus = null;
		 
		this.verisaeReportStatus = null;
		this.numOfChangeOrders = 0;
		this.numOfChangeOrdersCompleted = 0;
		this.mechFinalDate = null;
		
		this.mechFinalStatus = null;
		this.elecFinalDate = null;
		this.elecFinalStatus = null;
		
		this.plumbingFinalDate = null;
		
		this.plumbingFinalStatus = null;
		
		this.buildingFinalStatus = null;
		this.tmpCertificateDate = null;
		
		this.tmpCertificateStatus = null;
		this.certificateDate = null;
		
		this.certificateStatus = null;
		this.punchListStatus = null;
		
		this.mg2CompletionDate = null;
		this.mg2CompletionStatus = null;
		
		this.warrantyNotes = null;
		this.closeoutDocumentsNotes = null;
		this.finalLiensNotes = null;
		this.finalInspectionNotes = null;
	}
	
	/**
	 * This method sets the id of this closeoutdetail
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * This methdod gets the as-builts date of a project
	 * @return the date
	 */
	public Date getAsBuilts() {
		return asBuilts;
	}
	
	/**
	 * This method sets the asbuilts date of a project
	 * @param asBuilts the new date of the as-builts
	 */
	public void setAsBuilts(Date asBuilts) {
		this.asBuilts = asBuilts;
	}
	
	/**
	 * This method gets the Salvage Value object from this CloseoutDetail object.
	 * @return the salvage value of the project
	 */
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public SalvageValue getSalvageValue() {
		return salvageValue;
	}
	
	/**
	 * This method sets the salvage value of a project
	 * @param salvageValue the new salvage value of a project
	 */
	public void setSalvageValue(SalvageValue salvageValue) {
		this.salvageValue = salvageValue;
	}
	
	/**
	 * This method returns the submission date of a project's punchlist
	 * @return the date of the punchlist
	 */
	public Date getPunchList() {
		return punchList;
	}
	
	/**
	 * This method sets the submission date of a project's punchlist
	 * @param punchList the new date of the punchlist
	 */
	public void setPunchList(Date punchList) {
		this.punchList = punchList;
	}
	
	/**
	 * This method gets the submission date of the alarm/hvac report of a project
	 * @return the date of the form
	 */
	public Date getAlarmHvacForm() {
		return alarmHvacForm;
	}
	
	/**
	 * This method sets the submission date of an alarm/hvac report of a project
	 * @param alarmHvacForm the new submission date of the form
	 */
	public void setAlarmHvacForm(Date alarmHvacForm) {
		this.alarmHvacForm = alarmHvacForm;
	}
	
	/**
	 * This method returns the submission date of the air/gas form
	 * @return the date of the air/gas form
	 */
	public Date getAirGas() {
		return airGas;
	}
	
	/**
	 * This method sets the submission date of the air/gas form
	 * @param the new submission date for the air/gas form
	 */
	public void setAirGas(Date airGas) {
		this.airGas = airGas;
	}
	
	/**
	 * This method gets the submission date of the close-permits form
	 * @return the submission date
	 */
	public Date getPermitsClosed() {
		return permitsClosed;
	}
	
	/**
	 * This method sets the submission date of the permits-closed form
	 * @param permitsClosed the new submission date
	 */
	public void setPermitsClosed(Date permitsClosed) {
		this.permitsClosed = permitsClosed;
	}
	
	/**
	 * THis method gets the submission date of a verisae/shutdown report
	 * @return the date
	 */
	public Date getVerisaeShutdownReport() {
		return verisaeShutdownReport;
	}
	
	/**
	 * This method sets the submission date of a verisae/shutdown report
	 * @param verisaeShutdownReport
	 */
	public void setVerisaeShutdownReport(Date verisaeShutdownReport) {
		this.verisaeShutdownReport = verisaeShutdownReport;
	}
	
	/**
	 * This method gets the submission date of a closeout book
	 * @return the date
	 */
	public Date getCloseoutBook() {
		return closeoutBook;
	}
	
	/**
	 * THis method sets the submission date of the closeout book
	 * @param closeoutBook the date
	 */
	public void setCloseoutBook(Date closeoutBook) {
		this.closeoutBook = closeoutBook;
	}
	
	/**
	 * This method gets the submission date of closeout notes
	 * @return the date
	 */
	public Date getCloseoutNotes() {
		return closeoutNotes;
	}
	
	/**
	 * This method sets the submission date of closeout notes
	 * @param closeoutNotes the date
	 */
	public void setCloseoutNotes(Date closeoutNotes) {
		this.closeoutNotes = closeoutNotes;
	}
	
	
	public Date getBuildingPermitCL() {
		return buildingPermitCL;
	}
	
	public void setBuildingPermitCL(Date buildingPermitCL) {
		this.buildingPermitCL = buildingPermitCL;
	}
	
	public Date getInspectionSOCL() {
		return inspectionSOCL;
	}

	public void setInspectionSOCL(Date inspectionSOCL) {
		this.inspectionSOCL = inspectionSOCL;
	}
	
	public Date getCertCompletionCL() {
		return  certCompletionCL;
	}
	
	public void setCertCompletionCL(Date certCompletionCL) {
		this.certCompletionCL= certCompletionCL;
	}
	
	public void setMPunchListCL(Date  mPunchListCL) {
		this. mPunchListCL =  mPunchListCL;
	}
	
	public Date getMPunchListCL() {
		return  mPunchListCL;
	}
	
	public void setCloseoutPhotosCL(Date  closeoutPhotosCL  ) {
		this.closeoutPhotosCL  =  closeoutPhotosCL ;
	}
	
	public Date getCloseoutPhotosCL() {
		return  closeoutPhotosCL ;
	}
	
	public void setSubConWarrantiesCL(Date subConWarrantiesCL ) {
		this.subConWarrantiesCL  = subConWarrantiesCL ;
	}
	
	public Date getSubConWarrantiesCL() {
		return subConWarrantiesCL  ;
	}
	
	
	public void setMCSWarranty(Date mCSWarranty  ) {
		this.mCSWarranty  = mCSWarranty ;
	}
	
	public Date getMCSWarranty() {
		return mCSWarranty ;
	}
	
	
	public void setEquipmentSubCL(Date  equipmentSubCL ) {
		this.equipmentSubCL  =   equipmentSubCL;
	}
	
	public Date getEquipmentSubCL() {
		return  equipmentSubCL ;
	}
	
	public void setTraneCL(Date traneCL  ) {
		this.traneCL  = traneCL ;
	}
	
	public Date getTraneCL() {
		return traneCL ;
	}

	public int getNumOfChangeOrders() {
		return numOfChangeOrders;
	}

	public void setNumOfChangeOrders(int numOfChangeOrders) {
		this.numOfChangeOrders = numOfChangeOrders;
	}

	public int getNumOfChangeOrdersCompleted() {
		return numOfChangeOrdersCompleted;
	}

	public void setNumOfChangeOrdersCompleted(int numOfChangeOrdersCompleted) {
		this.numOfChangeOrdersCompleted = numOfChangeOrdersCompleted;
	}

	public String getMCSStatus() {
		return MCSStatus;
	}

	public void setMCSStatus(String mCSStatus) {
		MCSStatus = mCSStatus;
	}

	public Date getMCSDate() {
		return MCSDate;
	}

	public void setMCSDate(Date mCSDate) {
		MCSDate = mCSDate;
	}

	public String getGCStatus() {
		return GCStatus;
	}

	public void setGCStatus(String gCStatus) {
		GCStatus = gCStatus;
	}

	public Date getGCDate() {
		return GCDate;
	}

	public void setGCDate(Date gCDate) {
		GCDate = gCDate;
	}

	public String getMechanicalStatus() {
		return mechanicalStatus;
	}

	public void setMechanicalStatus(String mechanicalStatus) {
		this.mechanicalStatus = mechanicalStatus;
	}

	public Date getMechanicalDate() {
		return mechanicalDate;
	}

	public void setMechanicalDate(Date mechanicalDate) {
		this.mechanicalDate = mechanicalDate;
	}

	public String getElectricalStatus() {
		return electricalStatus;
	}

	public void setElectricalStatus(String electricalStatus) {
		this.electricalStatus = electricalStatus;
	}

	public Date getElectricalDate() {
		return electricalDate;
	}

	public void setElectricalDate(Date electricalDate) {
		this.electricalDate = electricalDate;
	}


	public String getPlumbingStatus() {
		return plumbingStatus;
	}

	public void setPlumbingStatus(String plumbingStatus) {
		this.plumbingStatus = plumbingStatus;
	}

	public Date getPlumbingDate() {
		return plumbingDate;
	}

	public void setPlumbingDate(Date plumbingDate) {
		this.plumbingDate = plumbingDate;
	}


	public String getSprinkleStatus() {
		return sprinkleStatus;
	}

	public void setSprinkleStatus(String sprinkleStatus) {
		this.sprinkleStatus = sprinkleStatus;
	}

	public Date getSprinkleDate() {
		return sprinkleDate;
	}

	public void setSprinkleDate(Date sprinkleDate) {
		this.sprinkleDate = sprinkleDate;
	}


	public String getRoofingStatus() {
		return roofingStatus;
	}

	public void setRoofingStatus(String roofingStatus) {
		this.roofingStatus = roofingStatus;
	}

	public Date getRoofingDate() {
		return roofingDate;
	}

	public void setRoofingDate(Date roofingDate) {
		this.roofingDate = roofingDate;
	}


	public String getHTIStatus() {
		return HTIStatus;
	}

	public void setHTIStatus(String hTIStatus) {
		HTIStatus = hTIStatus;
	}

	public Date getHTIDate() {
		return HTIDate;
	}

	public void setHTIDate(Date hTIDate) {
		HTIDate = hTIDate;
	}

	public String getOtherFinalLeinsStatus() {
		return otherFinalLeinsStatus;
	}

	public void setOtherFinalLeinsStatus(String otherFinalLeinsStatus) {
		this.otherFinalLeinsStatus = otherFinalLeinsStatus;
	}

	public Date getOtherFinalLeinsDate() {
		return otherFinalLeinsDate;
	}

	public void setOtherFinalLeinsDate(Date otherFinalLeinsDate) {
		this.otherFinalLeinsDate = otherFinalLeinsDate;
	}
	
	public String getMechFinalStatus() {
		return mechFinalStatus;
	}

	public void setMechFinalStatus(String mechFinalStatus) {
		this.mechFinalStatus = mechFinalStatus;
	}

	public Date getMechFinalDate() {
		return mechFinalDate;
	}

	public void setMechFinalDate(Date mechFinalDate) {
		this.mechFinalDate = mechFinalDate;
	}

	public String getElecFinalStatus() {
		return elecFinalStatus;
	}

	public void setElecFinalStatus(String elecFinalStatus) {
		this.elecFinalStatus = elecFinalStatus;
	}

	public Date getElecFinalDate() {
		return elecFinalDate;
	}

	public void setElecFinalDate(Date elecFinalDate) {
		this.elecFinalDate = elecFinalDate;
	}

	public String getPlumbingFinalStatus() {
		return plumbingFinalStatus;
	}

	public void setPlumbingFinalStatus(String plumbingFinalStatus) {
		this.plumbingFinalStatus = plumbingFinalStatus;
	}

	public Date getPlumbingFinalDate() {
		return plumbingFinalDate;
	}

	public void setPlumbingFinalDate(Date plumbingFinalDate) {
		this.plumbingFinalDate = plumbingFinalDate;
	}

	public String getSprinkleFinalStatus() {
		return sprinkleFinalStatus;
	}

	public void setSprinkleFinalStatus(String sprinkleFinalStatus) {
		this.sprinkleFinalStatus = sprinkleFinalStatus;
	}

	public Date getSprinkleFinalDate() {
		return sprinkleFinalDate;
	}

	public void setSprinkleFinalDate(Date sprinkleFinalDate) {
		this.sprinkleFinalDate = sprinkleFinalDate;
	}

	public String getBuildingFinalStatus() {
		return buildingFinalStatus;
	}

	public void setBuildingFinalStatus(String buildingFinalStatus) {
		this.buildingFinalStatus = buildingFinalStatus;
	}

	public String getTmpCertificateStatus() {
		return tmpCertificateStatus;
	}

	public void setTmpCertificateStatus(String tmpCertificateStatus) {
		this.tmpCertificateStatus = tmpCertificateStatus;
	}

	public Date getTmpCertificateDate() {
		return tmpCertificateDate;
	}

	public void setTmpCertificateDate(Date tmpCertificateDate) {
		this.tmpCertificateDate = tmpCertificateDate;
	}

	public String getCertificateStatus() {
		return certificateStatus;
	}

	public void setCertificateStatus(String certificateStatus) {
		this.certificateStatus = certificateStatus;
	}

	public Date getCertificateDate() {
		return certificateDate;
	}

	public void setCertificateDate(Date certificateDate) {
		this.certificateDate = certificateDate;
	}

	public String getMCSWarrantyStatus() {
		return MCSWarrantyStatus;
	}

	public void setMCSWarrantyStatus(String mCSWarrantyStatus) {
		MCSWarrantyStatus = mCSWarrantyStatus;
	}

	public String getGCWarrantyStatus() {
		return GCWarrantyStatus;
	}

	public void setGCWarrantyStatus(String gCWarrantyStatus) {
		GCWarrantyStatus = gCWarrantyStatus;
	}

	public Date getGCWarrantyDate() {
		return GCWarrantyDate;
	}

	public void setGCWarrantyDate(Date gCWarrantyDate) {
		GCWarrantyDate = gCWarrantyDate;
	}

	public String getMechanicalWarrantyStatus() {
		return mechanicalWarrantyStatus;
	}

	public void setMechanicalWarrantyStatus(String mechanicalWarrantyStatus) {
		this.mechanicalWarrantyStatus = mechanicalWarrantyStatus;
	}

	public Date getMechanicalWarrantyDate() {
		return mechanicalWarrantyDate;
	}

	public void setMechanicalWarrantyDate(Date mechanicalWarrantyDate) {
		this.mechanicalWarrantyDate = mechanicalWarrantyDate;
	}

	public String getElectricalWarrantyStatus() {
		return electricalWarrantyStatus;
	}

	public void setElectricalWarrantyStatus(String electricalWarrantyStatus) {
		this.electricalWarrantyStatus = electricalWarrantyStatus;
	}

	public Date getElectricalWarrantyDate() {
		return electricalWarrantyDate;
	}

	public void setElectricalWarrantyDate(Date electricalWarrantyDate) {
		this.electricalWarrantyDate = electricalWarrantyDate;
	}

	public String getPlumbingWarrantyStatus() {
		return plumbingWarrantyStatus;
	}

	public void setPlumbingWarrantyStatus(String plumbingWarrantyStatus) {
		this.plumbingWarrantyStatus = plumbingWarrantyStatus;
	}

	public Date getPlumbingWarrantyDate() {
		return plumbingWarrantyDate;
	}

	public void setPlumbingWarrantyDate(Date plumbingWarrantyDate) {
		this.plumbingWarrantyDate = plumbingWarrantyDate;
	}

	public String getSprinkleWarrantyStatus() {
		return sprinkleWarrantyStatus;
	}

	public void setSprinkleWarrantyStatus(String sprinkleWarrantyStatus) {
		this.sprinkleWarrantyStatus = sprinkleWarrantyStatus;
	}

	public Date getSprinkleWarrantyDate() {
		return sprinkleWarrantyDate;
	}

	public void setSprinkleWarrantyDate(Date sprinkleWarrantyDate) {
		this.sprinkleWarrantyDate = sprinkleWarrantyDate;
	}

	public String getRoofingWarrantyStatus() {
		return roofingWarrantyStatus;
	}

	public void setRoofingWarrantyStatus(String roofingWarrantyStatus) {
		this.roofingWarrantyStatus = roofingWarrantyStatus;
	}

	public Date getRoofingWarrantyDate() {
		return roofingWarrantyDate;
	}

	public void setRoofingWarrantyDate(Date roofingWarrantyDate) {
		this.roofingWarrantyDate = roofingWarrantyDate;
	}

	public String getHTIWarrantyStatus() {
		return HTIWarrantyStatus;
	}

	public void setHTIWarrantyStatus(String hTIWarrantyStatus) {
		HTIWarrantyStatus = hTIWarrantyStatus;
	}

	public Date getHTIWarrantyDate() {
		return HTIWarrantyDate;
	}

	public void setHTIWarrantyDate(Date hTIWarrantyDate) {
		HTIWarrantyDate = hTIWarrantyDate;
	}

	public String getOtherWarrantyStatusA() {
		return otherWarrantyStatusA;
	}

	public void setOtherWarrantyStatusA(String otherWarrantyStatusA) {
		this.otherWarrantyStatusA = otherWarrantyStatusA;
	}

	public Date getOtherWarrantyDateA() {
		return otherWarrantyDateA;
	}

	public void setOtherWarrantyDateA(Date otherWarrantyDateA) {
		this.otherWarrantyDateA = otherWarrantyDateA;
	}

	public String getOtherWarrantyStatusB() {
		return otherWarrantyStatusB;
	}

	public void setOtherWarrantyStatusB(String otherWarrantyStatusB) {
		this.otherWarrantyStatusB = otherWarrantyStatusB;
	}

	public Date getOtherWarrantyDateB() {
		return otherWarrantyDateB;
	}

	public void setOtherWarrantyDateB(Date otherWarrantyDateB) {
		this.otherWarrantyDateB = otherWarrantyDateB;
	}

	public String getEquipmentSubmittalStatus() {
		return equipmentSubmittalStatus;
	}

	public void setEquipmentSubmittalStatus(String equipmentSubmittalStatus) {
		this.equipmentSubmittalStatus = equipmentSubmittalStatus;
	}

	public String getManualStatus() {
		return manualStatus;
	}

	public void setManualStatus(String manualStatus) {
		this.manualStatus = manualStatus;
	}

	public Date getManualDate() {
		return manualDate;
	}

	public void setManualDate(Date manualDate) {
		this.manualDate = manualDate;
	}

	public String getPunchListStatus() {
		return punchListStatus;
	}

	public void setPunchListStatus(String punchListStatus) {
		this.punchListStatus = punchListStatus;
	}

	public String getAsBuiltDrawingsStatus() {
		return asBuiltDrawingsStatus;
	}

	public void setAsBuiltDrawingsStatus(String asBuiltDrawingsStatus) {
		this.asBuiltDrawingsStatus = asBuiltDrawingsStatus;
	}

	public String getCloseOutPhotosStatus() {
		return closeOutPhotosStatus;
	}

	public void setCloseOutPhotosStatus(String closeOutPhotosStatus) {
		this.closeOutPhotosStatus = closeOutPhotosStatus;
	}

	public String getHVACstartupFormStatus() {
		return HVACstartupFormStatus;
	}

	public void setHVACstartupFormStatus(String hVACstartupFormStatus) {
		HVACstartupFormStatus = hVACstartupFormStatus;
	}

	public Date getHVACstartupFormDate() {
		return HVACstartupFormDate;
	}

	public void setHVACstartupFormDate(Date hVACstartupFormDate) {
		HVACstartupFormDate = hVACstartupFormDate;
	}

	public String getAlarmFormStatus() {
		return alarmFormStatus;
	}

	public void setAlarmFormStatus(String alarmFormStatus) {
		this.alarmFormStatus = alarmFormStatus;
	}
	
	public String getVerisaeReportStatus() {
		return verisaeReportStatus;
	}

	public void setVerisaeReportStatus(String verisaeReportStatus) {
		this.verisaeReportStatus = verisaeReportStatus;
	}

	public Date getMg2CompletionDate() {
		return mg2CompletionDate;
	}

	public void setMg2CompletionDate(Date mg2CompletionDate) {
		this.mg2CompletionDate = mg2CompletionDate;
	}

	public String getMg2CompletionStatus() {
		return mg2CompletionStatus;
	}

	public void setMg2CompletionStatus(String mg2CompletionStatus) {
		this.mg2CompletionStatus = mg2CompletionStatus;
	}

	public String getFinalInspectionNotes() {
		return finalInspectionNotes;
	}

	public void setFinalInspectionNotes(String finalInspectionNotes) {
		this.finalInspectionNotes = finalInspectionNotes;
	}

	public String getFinalLiensNotes() {
		return finalLiensNotes;
	}

	public void setFinalLiensNotes(String finalLiensNotes) {
		this.finalLiensNotes = finalLiensNotes;
	}

	public String getCloseoutDocumentsNotes() {
		return closeoutDocumentsNotes;
	}

	public void setCloseoutDocumentsNotes(String closeoutDocumentsNotes) {
		this.closeoutDocumentsNotes = closeoutDocumentsNotes;
	}

	public String getWarrantyNotes() {
		return warrantyNotes;
	}

	public void setWarrantyNotes(String warrantyNotes) {
		this.warrantyNotes = warrantyNotes;
	}
	
	
	
	
	
}
