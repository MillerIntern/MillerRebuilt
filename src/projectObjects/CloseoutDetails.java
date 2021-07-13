package projectObjects;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	private int numOfMCSChangeOrders;
	private int numOfMCSChangeOrdersCompleted;
	
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
	
	private String gasStatus;
	private Date gasDate;
	
	private String sprinkleStatus;
	private Date sprinkleDate;
	
	
	private String HTIStatus;
	private Date HTIDate;
	
	private String otherFinalLeinsStatus;
	private Date otherFinalLeinsDate;

	private String otherFinalLeinsBStatus;
	private Date otherFinalLeinsBDate;
	
	// Inspections
	private String mechFinalStatus;
	private Date mechFinalDate;

	
	private String elecFinalStatus;
	private Date elecFinalDate;

	
	private String plumbingFinalStatus;
	private Date plumbingFinalDate;
	
	private String gasFinalStatus;
	private Date gasFinalDate;
	
	private String ceilingFinalStatus;
	private Date ceilingFinalDate;
	
	private String fireAlarmFinalStatus;
	private Date fireAlarmFinalDate;
	
	private String lowVolFinalStatus;
	private Date lowVolFinalDate;
	
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

	private String gasWarrantyStatus;
	private Date gasWarrantyDate;
	
	private String sprinkleWarrantyStatus;
	private Date sprinkleWarrantyDate;
	
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
	

	private String hvacCloseoutStatus;
	private String refrigerationCloseoutStatus;
	

	private String costcoSignoffStatus;
	private Date costcoSignoff;
	
	private String asBuiltDrawingsStatus;

	
	private String closeOutPhotosStatus;

	
	private String HVACstartupFormStatus;
	private Date HVACstartupFormDate;

	
	private String alarmFormStatus;
	
	private String salvageStatus;

	
	private String verisaeReportStatus;
	
	private String pbnMTStatus;
	private Date pbnMTDate;

	
	private Date mg2CompletionDate;
	private String mg2CompletionStatus;
	
	private String finalInspectionNotes;
	private String finalLiensNotes;
	private String closeoutDocumentsNotes;
	private String warrantyNotes;
	
	private String substantialCompletionStatus;
	private String paymentOfDebtsAndClaimsStatus;
	private String releaseOfLiensStatus;
	private String mulvannySignOffStatus;
	
	private Date substantialCompletionDate;
	private Date paymentOfDebtsAndClaimsDate;
	private Date releaseOfLiensDate;
	private Date mulvannySignOffDate;

	public CloseoutDetails(Date asBuilts, SalvageValue salvageValue,
			Date costcoSignoff, Date punchList, Date alarmHvacForm, Date airGas,
			Date permitsClosed, Date verisaeShutdownReport, 
			Date closeoutNotes,	Date buildingPermitCL, Date inspectionSOCL,	 Date certCompletionCL,
			Date mPunchListCL, Date closeoutPhotosCL, Date subConWarrantiesCL,
			Date mCSWarranty, Date equipmentSubCL, Date traneCL, Date MCSDate, String MCSStatus,
			Date GCDate, 
			String mechanicalStatus, Date electricalDate, String electricalStatus, Date plumbingDate, Date gasDate,
			String plumbingNotes, String sprinkleStatus, 
            Date HTIDate, String HTIStatus, 
			Date otherFinalLeinsDate, String MCSWarrantyStatus, 
			String otherFinalLeinsStatus, Date GCWarrantyDate, String GCWarrantyStatus, 
			Date mechanicalWarrantyDate, String mechanicalWarrantyStatus, 
			Date electricalWarrantyDate, String electricalWarrantyStatus, 
			Date plumbingWarrantyDate, Date gasWarrantyDate, String gasWarrantyStatus, String plumbingWarrantyStatus, 
			Date sprinkleWarrantyDate, String sprinkleWarrantyStatus, String ceilingWarrantyNotes, 
			String HTIWarrantyStatus, Date otherWarrantyDateAA, String otherWarrantyStatusA, Date otherWarrantyDateB, 
			String equipmentSubmittalStatus, Date manualDate, String manualStatus, 
			String asBuiltDrawingsNotes, String asBuiltDrawingsStatus, Date HVACstartupFormDate, 
			String HVACstartupFormNotes, String alarmFormStatus,
			String verisaeReportNotes, String verisaeReportStatus, int numOfChangeOrders, int numOfChangeOrdersCompleted, 
			Date mechFinalDate, String mechFinalStatus, Date elecFinalDate, String elecFinalStatus, 
			Date plumbingFinalDate, String plumbingFinalStatus, String gasFinalStatus, Date gasFinalDate,
			String ceilingFinalStatus, Date ceilingFinalDate, String fireAlarmFinalStatus, Date fireAlarmFinalDate,
			String lowVolFinalStatus, Date lowVolFinalDate, String otherFinalLiensBStatus, Date otherFinalLiensBDate,
			String buildingFinalNotes, String tmpCertificateStatus, Date certificateDate, String certificateStatus, 
			String costcoSignoffStatus, String punchListStatus, Date mg2CompletionDate, String mg2CompletionStatus, Date tmpCertificateDate, 
			String buildingFinalStatus, String HVACstartupFormStatus, String otherWarrantyStatusB, Date otherWarrantyDateA, 
			Date HTIWarrantyDate, String gasStatus, Date sprinkleDate, String plumbingStatus, 
			Date mechanicalDate, String GCStatus, String warrantyNotes, String finalLiensNotes, String finalInspectionNotes,
			String closeoutDocumentsNotes, String substantialCompletionStatus, Date substantialCompletionDate,
			String paymentOfDebtsAndClaimsStatus, Date paymentOfDebtsAndClaimsDate, String releaseOfLiensStatus,
			Date releaseOfLiensDate, String mulvannySignOffStatus, Date mulvannySignOffDate, String salvageStatus, String pbnMTStatus,
			Date pbnMTDate, String hvacCloseoutStatus, String refrigerationCloseoutStatus) 
	{
		this.asBuilts = asBuilts;
		this.salvageValue = salvageValue;
		this.costcoSignoff = costcoSignoff; 
		this.punchList = punchList;
		this.alarmHvacForm = alarmHvacForm;
		this.airGas = airGas;
		this.permitsClosed = permitsClosed;
		this.verisaeShutdownReport = verisaeShutdownReport;
		
		this.salvageStatus = salvageStatus;
		
		this.pbnMTStatus = pbnMTStatus;
		this.pbnMTDate = pbnMTDate;
	
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
		
		this.gasDate = gasDate;
		this.gasStatus = gasStatus;
		
		this.sprinkleDate = sprinkleDate;
		this.sprinkleStatus = sprinkleStatus;

		this.HTIDate = HTIDate;
		this.HTIStatus = HTIStatus;
		
		this.otherFinalLeinsDate = otherFinalLeinsDate;
		this.otherFinalLeinsStatus = otherFinalLeinsStatus;
		
		this.otherFinalLeinsBDate = otherFinalLeinsBDate;
		this.otherFinalLeinsBStatus = otherFinalLeinsBStatus;
		
		this.MCSWarrantyStatus = MCSWarrantyStatus;
		
		this.GCWarrantyDate = GCWarrantyDate;
		this.GCWarrantyStatus = GCWarrantyStatus;
		
		this.mechanicalWarrantyDate = mechanicalWarrantyDate;
		this.mechanicalWarrantyStatus = mechanicalWarrantyStatus;
		
		this.electricalWarrantyDate = electricalWarrantyDate; 
		this.electricalWarrantyStatus = electricalWarrantyStatus;
		
		this.plumbingWarrantyDate = plumbingWarrantyDate;
		this.plumbingWarrantyStatus = plumbingWarrantyStatus;
		
		this.gasWarrantyDate = gasWarrantyDate;
		this.gasWarrantyStatus = gasWarrantyStatus;
		
		this.sprinkleWarrantyDate = sprinkleWarrantyDate;
		
		this.sprinkleWarrantyStatus = sprinkleWarrantyStatus;

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
		
		this.gasFinalDate = gasFinalDate;
		this.gasFinalStatus = gasFinalStatus;
		
		this.ceilingFinalStatus = ceilingFinalStatus;
		this.ceilingFinalDate = ceilingFinalDate;
		
		this.fireAlarmFinalStatus = fireAlarmFinalStatus;
		this.fireAlarmFinalDate = fireAlarmFinalDate;
		
		this.lowVolFinalStatus = lowVolFinalStatus;
		this.lowVolFinalDate = lowVolFinalDate;
		
		this.buildingFinalStatus = buildingFinalStatus;
		this.tmpCertificateDate = tmpCertificateDate;
		
		this.tmpCertificateStatus = tmpCertificateStatus;
		this.certificateDate = certificateDate;
		
		this.certificateStatus = certificateStatus;
		this.costcoSignoffStatus = costcoSignoffStatus;
		this.punchListStatus = punchListStatus;
		
		this.hvacCloseoutStatus = hvacCloseoutStatus;
		this.refrigerationCloseoutStatus = refrigerationCloseoutStatus;
		
		
		this.mg2CompletionDate = mg2CompletionDate;
		this.mg2CompletionStatus = mg2CompletionStatus;
		
		this.closeoutDocumentsNotes = closeoutDocumentsNotes;
		this.finalInspectionNotes = finalInspectionNotes;
		this.finalLiensNotes = finalLiensNotes;
		this.warrantyNotes = warrantyNotes;
		
		this.substantialCompletionDate = substantialCompletionDate;
		this.substantialCompletionStatus = substantialCompletionStatus;
		this.paymentOfDebtsAndClaimsDate = paymentOfDebtsAndClaimsDate;
		this.paymentOfDebtsAndClaimsStatus = paymentOfDebtsAndClaimsStatus;
		this.releaseOfLiensDate = releaseOfLiensDate;
		this.releaseOfLiensStatus = releaseOfLiensStatus;
		this.mulvannySignOffDate = mulvannySignOffDate;
		this.mulvannySignOffStatus = mulvannySignOffStatus;
	}
	
	public CloseoutDetails() 
	{
		this.asBuilts = null;
		this.salvageValue = null;
		this.costcoSignoff = null;
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
		
		this.salvageStatus = null;
		
		this.pbnMTStatus = null;
		this.pbnMTDate = null;

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
		this.gasDate = null;
		
		this.gasStatus = null;
		this.sprinkleDate = null;
		
		this.sprinkleStatus = null;

		this.HTIDate = null;
		
		this.HTIStatus = null;
		this.otherFinalLeinsDate = null;
		
		this.otherFinalLeinsStatus = null;
		
		this.otherFinalLeinsBDate = null;
		this.otherFinalLeinsBStatus = null;
		
		this.MCSWarrantyStatus = null;
		this.GCWarrantyDate = null;
		
		this.GCWarrantyStatus = null;
		this.mechanicalWarrantyDate = null;
		
		this.mechanicalWarrantyStatus = null;
		this.electricalWarrantyDate = null; 
		
		this.electricalWarrantyStatus = null;
		this.plumbingWarrantyDate = null;
		
		this.plumbingWarrantyStatus = null;
		this.gasWarrantyDate = null;
		
		this.gasWarrantyStatus = null;
		this.sprinkleWarrantyDate = null;
		
		this.sprinkleWarrantyStatus = null;

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
		
		this.gasFinalDate = null;
		this.gasFinalStatus = null;
		
		this.ceilingFinalStatus = null;
		this.ceilingFinalDate = null;
		
		this.fireAlarmFinalStatus = null;
		this.fireAlarmFinalDate = null;
		
		this.lowVolFinalStatus = null;
		this.lowVolFinalDate = null;
		
		this.buildingFinalStatus = null;
		this.tmpCertificateDate = null;
		
		this.tmpCertificateStatus = null;
		this.certificateDate = null;
		
		this.certificateStatus = null;
		this.costcoSignoffStatus = null;
		this.punchListStatus = null;
		
		this.hvacCloseoutStatus = null;
		this.refrigerationCloseoutStatus = null;
		
		this.mg2CompletionDate = null;
		this.mg2CompletionStatus = null;
		
		this.warrantyNotes = null;
		this.closeoutDocumentsNotes = null;
		this.finalLiensNotes = null;
		this.finalInspectionNotes = null;
		
		this.substantialCompletionDate = null;
		this.substantialCompletionStatus = null;
		this.paymentOfDebtsAndClaimsDate = null;
		this.paymentOfDebtsAndClaimsStatus = null;
		this.releaseOfLiensDate = null;
		this.releaseOfLiensStatus = null;
		this.mulvannySignOffDate = null;
		this.mulvannySignOffStatus = null;
	}
	
	public synchronized String getCostcoSignoffStatus() {
		return costcoSignoffStatus;
	}

	public synchronized void setCostcoSignoffStatus(String costcoSignoffStatus) {
		this.costcoSignoffStatus = costcoSignoffStatus;
	}

	public synchronized Date getCostcoSignoff() {
		return costcoSignoff;
	}

	public synchronized void setCostcoSignoff(Date costcoSignoff) {
		this.costcoSignoff = costcoSignoff;
	}
	
	/*
	 * Salvage status getters and setters
	 */
	public synchronized String getSalvageStatus() {
		return salvageStatus;
	}
	
	public synchronized void setSalvageStatus(String salvageStatus) {
		this.salvageStatus= salvageStatus;
	}

	/**
	 * This method sets the id of this closeoutdetail
	 */
	public synchronized void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * This methdod gets the as-builts date of a project
	 * @return the date
	 */
	public synchronized Date getAsBuilts() {
		return asBuilts;
	}
	
	/**
	 * This method sets the asbuilts date of a project
	 * @param asBuilts the new date of the as-builts
	 */
	public synchronized void setAsBuilts(Date asBuilts) {
		this.asBuilts = asBuilts;
	}
	
	/**
	 * This method gets the Salvage Value object from this CloseoutDetail object.
	 * @return the salvage value of the project
	 */
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public synchronized SalvageValue getSalvageValue() {
		return salvageValue;
	}
	
	/**
	 * This method sets the salvage value of a project
	 * @param salvageValue the new salvage value of a project
	 */
	public synchronized void setSalvageValue(SalvageValue salvageValue) {
		this.salvageValue = salvageValue;
	}
	
	/**
	 * This method returns the submission date of a project's punchlist
	 * @return the date of the punchlist
	 */
	public synchronized Date getPunchList() {
		return punchList;
	}
	
	/**
	 * This method sets the submission date of a project's punchlist
	 * @param punchList the new date of the punchlist
	 */
	public synchronized void setPunchList(Date punchList) {
		this.punchList = punchList;
	}
	
	/**
	 * This method gets the submission date of the alarm/hvac report of a project
	 * @return the date of the form
	 */
	public synchronized Date getAlarmHvacForm() {
		return alarmHvacForm;
	}
	
	/**
	 * This method sets the submission date of an alarm/hvac report of a project
	 * @param alarmHvacForm the new submission date of the form
	 */
	public synchronized void setAlarmHvacForm(Date alarmHvacForm) {
		this.alarmHvacForm = alarmHvacForm;
	}
	
	/**
	 * This method returns the submission date of the air/gas form
	 * @return the date of the air/gas form
	 */
	public synchronized Date getAirGas() {
		return airGas;
	}
	
	/**
	 * This method sets the submission date of the air/gas form
	 * @param the new submission date for the air/gas form
	 */
	public synchronized void setAirGas(Date airGas) {
		this.airGas = airGas;
	}
	
	/**
	 * This method gets the submission date of the close-permits form
	 * @return the submission date
	 */
	public synchronized Date getPermitsClosed() {
		return permitsClosed;
	}
	
	/**
	 * This method sets the submission date of the permits-closed form
	 * @param permitsClosed the new submission date
	 */
	public synchronized void setPermitsClosed(Date permitsClosed) {
		this.permitsClosed = permitsClosed;
	}
	
	/**
	 * THis method gets the submission date of a verisae/shutdown report
	 * @return the date
	 */
	public synchronized Date getVerisaeShutdownReport() {
		return verisaeShutdownReport;
	}
	
	/**
	 * This method sets the submission date of a verisae/shutdown report
	 * @param verisaeShutdownReport
	 */
	public synchronized void setVerisaeShutdownReport(Date verisaeShutdownReport) {
		this.verisaeShutdownReport = verisaeShutdownReport;
	}
	
	public String getPbnMTStatus() {
		return pbnMTStatus;
	}

	public void setPbnMTStatus(String pbnMTStatus) {
		this.pbnMTStatus = pbnMTStatus;
	}

	public Date getPbnMTDate() {
		return pbnMTDate;
	}

	public void setPbnMTDate(Date pbnMTDate) {
		this.pbnMTDate = pbnMTDate;
	}

	
	
	/**
	 * This method gets the submission date of a closeout book
	 * @return the date
	 */
	public synchronized Date getCloseoutBook() {
		return closeoutBook;
	}
	
	/**
	 * THis method sets the submission date of the closeout book
	 * @param closeoutBook the date
	 */
	public synchronized void setCloseoutBook(Date closeoutBook) {
		this.closeoutBook = closeoutBook;
	}
	
	/**
	 * This method gets the submission date of closeout notes
	 * @return the date
	 */
	public synchronized Date getCloseoutNotes() {
		return closeoutNotes;
	}
	
	/**
	 * This method sets the submission date of closeout notes
	 * @param closeoutNotes the date
	 */
	public synchronized void setCloseoutNotes(Date closeoutNotes) {
		this.closeoutNotes = closeoutNotes;
	}
	
	
	public synchronized Date getBuildingPermitCL() {
		return buildingPermitCL;
	}
	
	public synchronized void setBuildingPermitCL(Date buildingPermitCL) {
		this.buildingPermitCL = buildingPermitCL;
	}
	
	public synchronized Date getInspectionSOCL() {
		return inspectionSOCL;
	}

	public synchronized void setInspectionSOCL(Date inspectionSOCL) {
		this.inspectionSOCL = inspectionSOCL;
	}
	
	public synchronized Date getCertCompletionCL() {
		return  certCompletionCL;
	}
	
	public synchronized void setCertCompletionCL(Date certCompletionCL) {
		this.certCompletionCL= certCompletionCL;
	}
	
	public synchronized void setMPunchListCL(Date  mPunchListCL) {
		this. mPunchListCL =  mPunchListCL;
	}
	
	public synchronized Date getMPunchListCL() {
		return  mPunchListCL;
	}
	
	public synchronized void setCloseoutPhotosCL(Date  closeoutPhotosCL  ) {
		this.closeoutPhotosCL  =  closeoutPhotosCL ;
	}
	
	public synchronized Date getCloseoutPhotosCL() {
		return  closeoutPhotosCL ;
	}
	
	public synchronized void setSubConWarrantiesCL(Date subConWarrantiesCL ) {
		this.subConWarrantiesCL  = subConWarrantiesCL ;
	}
	
	public synchronized Date getSubConWarrantiesCL() {
		return subConWarrantiesCL  ;
	}
	
	
	public synchronized void setMCSWarranty(Date mCSWarranty  ) {
		this.mCSWarranty  = mCSWarranty ;
	}
	
	public synchronized Date getMCSWarranty() {
		return mCSWarranty ;
	}
	
	
	public synchronized void setEquipmentSubCL(Date  equipmentSubCL ) {
		this.equipmentSubCL  =   equipmentSubCL;
	}
	
	public synchronized Date getEquipmentSubCL() {
		return  equipmentSubCL ;
	}
	
	public synchronized void setTraneCL(Date traneCL  ) {
		this.traneCL  = traneCL ;
	}
	
	public synchronized Date getTraneCL() {
		return traneCL ;
	}

	public synchronized int getNumOfChangeOrders() {
		return numOfChangeOrders;
	}

	public synchronized void setNumOfChangeOrders(int numOfChangeOrders) {
		this.numOfChangeOrders = numOfChangeOrders;
	}

	public synchronized int getNumOfChangeOrdersCompleted() {
		return numOfChangeOrdersCompleted;
	}

	public synchronized void setNumOfChangeOrdersCompleted(int numOfChangeOrdersCompleted) {
		this.numOfChangeOrdersCompleted = numOfChangeOrdersCompleted;
	}
	
	public synchronized int getNumOfMCSChangeOrders() {
		return numOfMCSChangeOrders;
	}
	
	public synchronized void setNumOfMCSChangeOrders(int numOfMCSChangeOrders) {
		this.numOfMCSChangeOrders = numOfMCSChangeOrders;
	}
	
	public synchronized int getNumOfMCSChangeOrdersCompleted() {
		return numOfMCSChangeOrdersCompleted;
	}
	
	public synchronized void setNumOfMCSChangeOrdersCompleted(int numOfMCSChangeOrdersCompleted) {
		this.numOfMCSChangeOrdersCompleted = numOfMCSChangeOrdersCompleted;
	}
	

	public synchronized String getMCSStatus() {
		return MCSStatus;
	}

	public synchronized void setMCSStatus(String mCSStatus) {
		MCSStatus = mCSStatus;
	}

	public synchronized Date getMCSDate() {
		return MCSDate;
	}

	public synchronized void setMCSDate(Date mCSDate) {
		MCSDate = mCSDate;
	}

	public synchronized String getGCStatus() {
		return GCStatus;
	}

	public synchronized void setGCStatus(String gCStatus) {
		GCStatus = gCStatus;
	}

	public synchronized Date getGCDate() {
		return GCDate;
	}

	public synchronized void setGCDate(Date gCDate) {
		GCDate = gCDate;
	}

	public synchronized String getMechanicalStatus() {
		return mechanicalStatus;
	}

	public synchronized void setMechanicalStatus(String mechanicalStatus) {
		this.mechanicalStatus = mechanicalStatus;
	}

	public synchronized Date getMechanicalDate() {
		return mechanicalDate;
	}

	public synchronized void setMechanicalDate(Date mechanicalDate) {
		this.mechanicalDate = mechanicalDate;
	}

	public synchronized String getElectricalStatus() {
		return electricalStatus;
	}

	public synchronized void setElectricalStatus(String electricalStatus) {
		this.electricalStatus = electricalStatus;
	}

	public synchronized Date getElectricalDate() {
		return electricalDate;
	}

	public synchronized void setElectricalDate(Date electricalDate) {
		this.electricalDate = electricalDate;
	}


	public synchronized String getPlumbingStatus() {
		return plumbingStatus;
	}

	public synchronized void setPlumbingStatus(String plumbingStatus) {
		this.plumbingStatus = plumbingStatus;
	}

	public synchronized Date getPlumbingDate() {
		return plumbingDate;
	}

	public synchronized void setPlumbingDate(Date plumbingDate) {
		this.plumbingDate = plumbingDate;
	}


	public synchronized String getSprinkleStatus() {
		return sprinkleStatus;
	}

	public synchronized void setSprinkleStatus(String sprinkleStatus) {
		this.sprinkleStatus = sprinkleStatus;
	}

	public synchronized Date getSprinkleDate() {
		return sprinkleDate;
	}

	public synchronized void setSprinkleDate(Date sprinkleDate) {
		this.sprinkleDate = sprinkleDate;
	}


	public synchronized String getGasStatus() {
		return gasStatus;
	}

	public synchronized void setGasStatus(String gasStatus) {
		this.gasStatus = gasStatus;
	}

	public synchronized Date getGasDate() {
		return gasDate;
	}

	public synchronized void setGasDate(Date gasDate) {
		this.gasDate = gasDate;
	}

	public synchronized String getHTIStatus() {
		return HTIStatus;
	}

	public synchronized void setHTIStatus(String hTIStatus) {
		HTIStatus = hTIStatus;
	}

	public synchronized Date getHTIDate() {
		return HTIDate;
	}

	public synchronized void setHTIDate(Date hTIDate) {
		HTIDate = hTIDate;
	}

	public synchronized String getOtherFinalLeinsStatus() {
		return otherFinalLeinsStatus;
	}

	public synchronized void setOtherFinalLeinsStatus(String otherFinalLeinsStatus) {
		this.otherFinalLeinsStatus = otherFinalLeinsStatus;
	}

	public synchronized Date getOtherFinalLeinsDate() {
		return otherFinalLeinsDate;
	}

	public synchronized void setOtherFinalLeinsDate(Date otherFinalLeinsDate) {
		this.otherFinalLeinsDate = otherFinalLeinsDate;
	}
	
	public synchronized String getOtherFinalLeinsBStatus() {
		return otherFinalLeinsBStatus;
	}

	public synchronized void setOtherFinalLeinsBStatus(String otherFinalLeinsBStatus) {
		this.otherFinalLeinsBStatus = otherFinalLeinsBStatus;
	}

	public synchronized Date getOtherFinalLeinsBDate() {
		return otherFinalLeinsBDate;
	}

	public synchronized void setOtherFinalLeinsBDate(Date otherFinalLeinsBDate) {
		this.otherFinalLeinsBDate = otherFinalLeinsBDate;
	}
	
	public synchronized String getMechFinalStatus() {
		return mechFinalStatus;
	}

	public synchronized void setMechFinalStatus(String mechFinalStatus) {
		this.mechFinalStatus = mechFinalStatus;
	}

	public synchronized Date getMechFinalDate() {
		return mechFinalDate;
	}

	public synchronized void setMechFinalDate(Date mechFinalDate) {
		this.mechFinalDate = mechFinalDate;
	}

	public synchronized String getElecFinalStatus() {
		return elecFinalStatus;
	}

	public synchronized void setElecFinalStatus(String elecFinalStatus) {
		this.elecFinalStatus = elecFinalStatus;
	}

	public synchronized Date getElecFinalDate() {
		return elecFinalDate;
	}

	public synchronized void setElecFinalDate(Date elecFinalDate) {
		this.elecFinalDate = elecFinalDate;
	}

	public synchronized String getPlumbingFinalStatus() {
		return plumbingFinalStatus;
	}

	public synchronized void setPlumbingFinalStatus(String plumbingFinalStatus) {
		this.plumbingFinalStatus = plumbingFinalStatus;
	}

	public synchronized Date getPlumbingFinalDate() {
		return plumbingFinalDate;
	}

	public synchronized void setPlumbingFinalDate(Date plumbingFinalDate) {
		this.plumbingFinalDate = plumbingFinalDate;
	}

	public synchronized String getGasFinalStatus() {
		return gasFinalStatus;
	}

	public synchronized void setGasFinalStatus(String gasFinalStatus) {
		this.gasFinalStatus = gasFinalStatus;
	}

	public synchronized Date getGasFinalDate() {
		return gasFinalDate;
	}

	public synchronized void setGasFinalDate(Date gasFinalDate) {
		this.gasFinalDate = gasFinalDate;
	}
	
	public synchronized String getCeilingFinalStatus() {
		return ceilingFinalStatus;
	}

	public synchronized void setCeilingFinalStatus(String ceilingFinalStatus) {
		this.ceilingFinalStatus = ceilingFinalStatus;
	}

	public synchronized Date getCeilingFinalDate() {
		return ceilingFinalDate;
	}

	public synchronized void setCeilingFinalDate(Date ceilingFinalDate) {
		this.ceilingFinalDate = ceilingFinalDate;
	}

	public synchronized String getSprinkleFinalStatus() {
		return sprinkleFinalStatus;
	}

	public synchronized void setSprinkleFinalStatus(String sprinkleFinalStatus) {
		this.sprinkleFinalStatus = sprinkleFinalStatus;
	}

	public synchronized Date getSprinkleFinalDate() {
		return sprinkleFinalDate;
	}

	public synchronized void setSprinkleFinalDate(Date sprinkleFinalDate) {
		this.sprinkleFinalDate = sprinkleFinalDate;
	}

	public synchronized String getFireAlarmFinalStatus() {
		return fireAlarmFinalStatus;
	}

	public synchronized void setFireAlarmFinalStatus(String fireAlarmFinalStatus) {
		this.fireAlarmFinalStatus = fireAlarmFinalStatus;
	}

	public synchronized Date getFireAlarmFinalDate() {
		return fireAlarmFinalDate;
	}

	public synchronized void setFireAlarmFinalDate(Date fireAlarmFinalDate) {
		this.fireAlarmFinalDate = fireAlarmFinalDate;
	}
	
	public synchronized String getLowVolFinalStatus() {
		return lowVolFinalStatus;
	}

	public synchronized void setLowVolFinalStatus(String lowVolFinalStatus) {
		this.lowVolFinalStatus = lowVolFinalStatus;
	}

	public synchronized Date getLowVolFinalDate() {
		return lowVolFinalDate;
	}

	public synchronized void setLowVolFinalDate(Date lowVolFinalDate) {
		this.lowVolFinalDate = lowVolFinalDate;
	}
	
	public synchronized String getBuildingFinalStatus() {
		return buildingFinalStatus;
	}

	public synchronized void setBuildingFinalStatus(String buildingFinalStatus) {
		this.buildingFinalStatus = buildingFinalStatus;
	}

	public synchronized String getTmpCertificateStatus() {
		return tmpCertificateStatus;
	}

	public synchronized void setTmpCertificateStatus(String tmpCertificateStatus) {
		this.tmpCertificateStatus = tmpCertificateStatus;
	}

	public synchronized Date getTmpCertificateDate() {
		return tmpCertificateDate;
	}

	public synchronized void setTmpCertificateDate(Date tmpCertificateDate) {
		this.tmpCertificateDate = tmpCertificateDate;
	}

	public synchronized String getCertificateStatus() {
		return certificateStatus;
	}

	public synchronized void setCertificateStatus(String certificateStatus) {
		this.certificateStatus = certificateStatus;
	}

	public synchronized Date getCertificateDate() {
		return certificateDate;
	}

	public synchronized void setCertificateDate(Date certificateDate) {
		this.certificateDate = certificateDate;
	}

	public synchronized String getMCSWarrantyStatus() {
		return MCSWarrantyStatus;
	}

	public synchronized void setMCSWarrantyStatus(String mCSWarrantyStatus) {
		MCSWarrantyStatus = mCSWarrantyStatus;
	}

	public synchronized String getGCWarrantyStatus() {
		return GCWarrantyStatus;
	}

	public synchronized void setGCWarrantyStatus(String gCWarrantyStatus) {
		GCWarrantyStatus = gCWarrantyStatus;
	}

	public synchronized Date getGCWarrantyDate() {
		return GCWarrantyDate;
	}

	public synchronized void setGCWarrantyDate(Date gCWarrantyDate) {
		GCWarrantyDate = gCWarrantyDate;
	}

	public synchronized String getMechanicalWarrantyStatus() {
		return mechanicalWarrantyStatus;
	}

	public synchronized void setMechanicalWarrantyStatus(String mechanicalWarrantyStatus) {
		this.mechanicalWarrantyStatus = mechanicalWarrantyStatus;
	}

	public synchronized Date getMechanicalWarrantyDate() {
		return mechanicalWarrantyDate;
	}

	public synchronized void setMechanicalWarrantyDate(Date mechanicalWarrantyDate) {
		this.mechanicalWarrantyDate = mechanicalWarrantyDate;
	}

	public synchronized String getElectricalWarrantyStatus() {
		return electricalWarrantyStatus;
	}

	public synchronized void setElectricalWarrantyStatus(String electricalWarrantyStatus) {
		this.electricalWarrantyStatus = electricalWarrantyStatus;
	}

	public synchronized Date getElectricalWarrantyDate() {
		return electricalWarrantyDate;
	}

	public synchronized void setElectricalWarrantyDate(Date electricalWarrantyDate) {
		this.electricalWarrantyDate = electricalWarrantyDate;
	}

	public synchronized String getPlumbingWarrantyStatus() {
		return plumbingWarrantyStatus;
	}

	public synchronized void setPlumbingWarrantyStatus(String plumbingWarrantyStatus) {
		this.plumbingWarrantyStatus = plumbingWarrantyStatus;
	}

	public synchronized Date getPlumbingWarrantyDate() {
		return plumbingWarrantyDate;
	}

	public synchronized void setPlumbingWarrantyDate(Date plumbingWarrantyDate) {
		this.plumbingWarrantyDate = plumbingWarrantyDate;
	}

	public synchronized String getSprinkleWarrantyStatus() {
		return sprinkleWarrantyStatus;
	}

	public synchronized void setSprinkleWarrantyStatus(String sprinkleWarrantyStatus) {
		this.sprinkleWarrantyStatus = sprinkleWarrantyStatus;
	}

	public synchronized Date getSprinkleWarrantyDate() {
		return sprinkleWarrantyDate;
	}

	public synchronized void setSprinkleWarrantyDate(Date sprinkleWarrantyDate) {
		this.sprinkleWarrantyDate = sprinkleWarrantyDate;
	}
	
	public synchronized String getGasWarrantyStatus() {
		return gasWarrantyStatus;
	}

	public synchronized void setGasWarrantyStatus(String gasWarrantyStatus) {
		this.gasWarrantyStatus = gasWarrantyStatus;
	}

	public synchronized Date getGasWarrantyDate() {
		return gasWarrantyDate;
	}

	public synchronized void setGasWarrantyDate(Date gasWarrantyDate) {
		this.gasWarrantyDate = gasWarrantyDate;
	}

	public synchronized String getHTIWarrantyStatus() {
		return HTIWarrantyStatus;
	}

	public synchronized void setHTIWarrantyStatus(String hTIWarrantyStatus) {
		HTIWarrantyStatus = hTIWarrantyStatus;
	}

	public synchronized Date getHTIWarrantyDate() {
		return HTIWarrantyDate;
	}

	public synchronized void setHTIWarrantyDate(Date hTIWarrantyDate) {
		HTIWarrantyDate = hTIWarrantyDate;
	}

	public synchronized String getOtherWarrantyStatusA() {
		return otherWarrantyStatusA;
	}

	public synchronized void setOtherWarrantyStatusA(String otherWarrantyStatusA) {
		this.otherWarrantyStatusA = otherWarrantyStatusA;
	}

	public synchronized Date getOtherWarrantyDateA() {
		return otherWarrantyDateA;
	}

	public synchronized void setOtherWarrantyDateA(Date otherWarrantyDateA) {
		this.otherWarrantyDateA = otherWarrantyDateA;
	}

	public synchronized String getOtherWarrantyStatusB() {
		return otherWarrantyStatusB;
	}

	public synchronized void setOtherWarrantyStatusB(String otherWarrantyStatusB) {
		this.otherWarrantyStatusB = otherWarrantyStatusB;
	}

	public synchronized Date getOtherWarrantyDateB() {
		return otherWarrantyDateB;
	}

	public synchronized void setOtherWarrantyDateB(Date otherWarrantyDateB) {
		this.otherWarrantyDateB = otherWarrantyDateB;
	}

	public synchronized String getEquipmentSubmittalStatus() {
		return equipmentSubmittalStatus;
	}

	public synchronized void setEquipmentSubmittalStatus(String equipmentSubmittalStatus) {
		this.equipmentSubmittalStatus = equipmentSubmittalStatus;
	}

	public synchronized String getManualStatus() {
		return manualStatus;
	}

	public synchronized void setManualStatus(String manualStatus) {
		this.manualStatus = manualStatus;
	}

	public synchronized Date getManualDate() {
		return manualDate;
	}

	public synchronized void setManualDate(Date manualDate) {
		this.manualDate = manualDate;
	}

	public synchronized String getPunchListStatus() {
		return punchListStatus;
	}

	public synchronized void setPunchListStatus(String punchListStatus) {
		this.punchListStatus = punchListStatus;
	}
	
	public String getHvacCloseoutStatus() {
		return hvacCloseoutStatus;
	}

	public void setHvacCloseoutStatus(String hvacCloseoutStatus) {
		this.hvacCloseoutStatus = hvacCloseoutStatus;
	}

	public String getRefrigerationCloseoutStatus() {
		return refrigerationCloseoutStatus;
	}

	public void setRefrigerationCloseoutStatus(String refrigerationCloseoutStatus) {
		this.refrigerationCloseoutStatus = refrigerationCloseoutStatus;
	}

	public synchronized String getAsBuiltDrawingsStatus() {
		return asBuiltDrawingsStatus;
	}

	public synchronized void setAsBuiltDrawingsStatus(String asBuiltDrawingsStatus) {
		this.asBuiltDrawingsStatus = asBuiltDrawingsStatus;
	}

	public synchronized String getCloseOutPhotosStatus() {
		return closeOutPhotosStatus;
	}

	public synchronized void setCloseOutPhotosStatus(String closeOutPhotosStatus) {
		this.closeOutPhotosStatus = closeOutPhotosStatus;
	}

	public synchronized String getHVACstartupFormStatus() {
		return HVACstartupFormStatus;
	}

	public synchronized void setHVACstartupFormStatus(String hVACstartupFormStatus) {
		HVACstartupFormStatus = hVACstartupFormStatus;
	}

	public synchronized Date getHVACstartupFormDate() {
		return HVACstartupFormDate;
	}

	public synchronized void setHVACstartupFormDate(Date hVACstartupFormDate) {
		HVACstartupFormDate = hVACstartupFormDate;
	}

	public synchronized String getAlarmFormStatus() {
		return alarmFormStatus;
	}

	public synchronized void setAlarmFormStatus(String alarmFormStatus) {
		this.alarmFormStatus = alarmFormStatus;
	}
	
	public synchronized String getVerisaeReportStatus() {
		return verisaeReportStatus;
	}

	public synchronized void setVerisaeReportStatus(String verisaeReportStatus) {
		this.verisaeReportStatus = verisaeReportStatus;
	}

	public synchronized Date getMg2CompletionDate() {
		return mg2CompletionDate;
	}

	public synchronized void setMg2CompletionDate(Date mg2CompletionDate) {
		this.mg2CompletionDate = mg2CompletionDate;
	}

	public synchronized String getMg2CompletionStatus() {
		return mg2CompletionStatus;
	}

	public synchronized void setMg2CompletionStatus(String mg2CompletionStatus) {
		this.mg2CompletionStatus = mg2CompletionStatus;
	}

	public synchronized String getFinalInspectionNotes() {
		return finalInspectionNotes;
	}

	public synchronized void setFinalInspectionNotes(String finalInspectionNotes) {
		this.finalInspectionNotes = finalInspectionNotes;
	}

	public synchronized String getFinalLiensNotes() {
		return finalLiensNotes;
	}

	public synchronized void setFinalLiensNotes(String finalLiensNotes) {
		this.finalLiensNotes = finalLiensNotes;
	}

	public synchronized String getCloseoutDocumentsNotes() {
		return closeoutDocumentsNotes;
	}

	public synchronized void setCloseoutDocumentsNotes(String closeoutDocumentsNotes) {
		this.closeoutDocumentsNotes = closeoutDocumentsNotes;
	}

	public synchronized String getWarrantyNotes() {
		return warrantyNotes;
	}

	public synchronized void setWarrantyNotes(String warrantyNotes) {
		this.warrantyNotes = warrantyNotes;
	}

	public synchronized String getSubstantialCompletionStatus() {
		return substantialCompletionStatus;
	}

	public synchronized void setSubstantialCompletionStatus(String substantialCompletionStatus) {
		this.substantialCompletionStatus = substantialCompletionStatus;
	}

	public synchronized String getPaymentOfDebtsAndClaimsStatus() {
		return paymentOfDebtsAndClaimsStatus;
	}

	public synchronized void setPaymentOfDebtsAndClaimsStatus(String paymentOfDebtsAndClaimsStatus) {
		this.paymentOfDebtsAndClaimsStatus = paymentOfDebtsAndClaimsStatus;
	}

	public synchronized String getReleaseOfLiensStatus() {
		return releaseOfLiensStatus;
	}

	public synchronized void setReleaseOfLiensStatus(String releaseOfLiensStatus) {
		this.releaseOfLiensStatus = releaseOfLiensStatus;
	}

	public synchronized String getMulvannySignOffStatus() {
		return mulvannySignOffStatus;
	}

	public synchronized void setMulvannySignOffStatus(String mulvannySignOffStatus) {
		this.mulvannySignOffStatus = mulvannySignOffStatus;
	}

	public synchronized Date getSubstantialCompletionDate() {
		return substantialCompletionDate;
	}

	public synchronized void setSubstantialCompletionDate(Date substantialCompletionDate) {
		this.substantialCompletionDate = substantialCompletionDate;
	}

	public synchronized Date getPaymentOfDebtsAndClaimsDate() {
		return paymentOfDebtsAndClaimsDate;
	}

	public synchronized void setPaymentOfDebtsAndClaimsDate(Date paymentOfDebtsAndClaimsDate) {
		this.paymentOfDebtsAndClaimsDate = paymentOfDebtsAndClaimsDate;
	}

	public synchronized Date getReleaseOfLiensDate() {
		return releaseOfLiensDate;
	}

	public synchronized void setReleaseOfLiensDate(Date releaseOfLiensDate) {
		this.releaseOfLiensDate = releaseOfLiensDate;
	}

	public synchronized Date getMulvannySignOffDate() {
		return mulvannySignOffDate;
	}

	public synchronized void setMulvannySignOffDate(Date mulvannySignOffDate) {
		this.mulvannySignOffDate = mulvannySignOffDate;
	}
		
	public static Object getCloseoutFields(String name , CloseoutDetails co)
	{
		if(co == null || name == null)
			return null;
	
		if(name.equalsIgnoreCase("numOfChangeOrders"))
			return (Double) (double) co.getNumOfChangeOrders();
		else if(name.equalsIgnoreCase("numOfChangeOrdersCompleted"))
			return (Double) (double) co.getNumOfChangeOrdersCompleted();
		else if(name.equalsIgnoreCase("numOfMCSChangeOrders"))
			return (Double) (double) co.getNumOfMCSChangeOrders();
		else if(name.equalsIgnoreCase("numOfMCSChangeOrdersCompleted"))
			return co.getNumOfMCSChangeOrdersCompleted();
		//All Strings from this point
		else if(name.equalsIgnoreCase("MCSStatus"))
			return co.getMCSStatus();
		else if(name.equalsIgnoreCase("GCStatus"))
			return co.getGCStatus();
		else if(name.equalsIgnoreCase("mechanicalStatus"))
			return co.getMechanicalStatus();
		else if(name.equalsIgnoreCase("electricalStatus"))
			return co.getElectricalStatus();
		else if(name.equalsIgnoreCase("plumbingStatus"))
			return co.getPlumbingStatus();
		else if(name.equalsIgnoreCase("gasStatus"))
			return co.getGasStatus();
		else if(name.equalsIgnoreCase("sprinkleStatus"))
			return co.getSprinkleStatus();
		else if(name.equalsIgnoreCase("HTIStatus"))
			return co.getHTIStatus();
		else if(name.equalsIgnoreCase("mulvannySignOffStatus"))
			return co.getMulvannySignOffStatus();
		else if(name.equalsIgnoreCase("releaseOfLiensStatus"))
			return co.getReleaseOfLiensStatus();
		else if(name.equalsIgnoreCase("paymentOfDebtsAndClaimsStatus"))
			return co.getPaymentOfDebtsAndClaimsStatus();
		else if(name.equalsIgnoreCase("substantialCompletionStatus"))
			return co.getSubstantialCompletionStatus();
		else if(name.equalsIgnoreCase("warrantyNotes"))
			return co.getWarrantyNotes();
		else if(name.equalsIgnoreCase("closeoutDocumentsNotes"))
			return co.getCloseoutDocumentsNotes();
		else if(name.equalsIgnoreCase("finalLiensNotes"))
			return co.getFinalLiensNotes();
		else if(name.equalsIgnoreCase("finalInspectionNotes"))
			return co.getFinalInspectionNotes();
		else if(name.equalsIgnoreCase("mg2CompletionStatus"))
			return co.getMg2CompletionStatus();
		else if(name.equalsIgnoreCase("verisaeReportStatus"))
			return co.getVerisaeReportStatus();
		else if(name.equalsIgnoreCase("alarmFormStatus"))
			return co.getAlarmFormStatus();
		else if(name.equalsIgnoreCase("HVACstartupFormStatus"))
			return co.getHVACstartupFormStatus();
		else if(name.equalsIgnoreCase("closeOutPhotosStatus"))
			return co.getCloseOutPhotosStatus();
		else if(name.equalsIgnoreCase("asBuiltDrawingsStatus"))
			return co.getAsBuiltDrawingsStatus();
		else if(name.equalsIgnoreCase("costcoSignoffStatus"))
			return co.getCostcoSignoffStatus();
		else if(name.equalsIgnoreCase("punchListStatus"))
			return co.getPunchListStatus();
		else if(name.equalsIgnoreCase("hvacCloseoutStatus"))
			return co.getHvacCloseoutStatus();
		else if(name.equalsIgnoreCase("refrigerationCloseoutStatus"))
			return co.getRefrigerationCloseoutStatus();
		else if(name.equalsIgnoreCase("manualStatus"))
			return co.getManualStatus();
		else if(name.equalsIgnoreCase("equipmentSubmittalStatus"))
			return co.getEquipmentSubmittalStatus();
		else if(name.equalsIgnoreCase("otherWarrantyStatusB"))
			return co.getOtherWarrantyStatusB();
		else if(name.equalsIgnoreCase("otherWarrantyStatusA"))
			return co.getOtherWarrantyStatusA();
		else if(name.equalsIgnoreCase("HTIWarrantyStatus"))
			return co.getHTIWarrantyStatus();
		else if(name.equalsIgnoreCase("sprinkleWarrantyStatus"))
			return co.getSprinkleWarrantyStatus();
		else if(name.equalsIgnoreCase("plumbingWarrantyStatus"))
			return co.getPlumbingWarrantyStatus();
		else if(name.equalsIgnoreCase("gasWarrantyStatus"))
			return co.getGasWarrantyStatus();
		else if(name.equalsIgnoreCase("electricalWarrantyStatus"))
			return co.getElectricalWarrantyStatus();
		else if(name.equalsIgnoreCase("mechanicalWarrantyStatus"))
			return co.getMechanicalWarrantyStatus();
		else if(name.equalsIgnoreCase("GCWarrantyStatus"))
			return co.getGCWarrantyStatus();
		else if(name.equalsIgnoreCase("MCSWarrantyStatus"))
			return co.getMCSWarrantyStatus();
		//
		else if(name.equalsIgnoreCase("certificateStatus"))
			return co.getCertificateStatus();
		else if(name.equalsIgnoreCase("tmpCertificateStatus"))
			return co.getTmpCertificateStatus();
		else if(name.equalsIgnoreCase("buildingFinalStatus"))
			return co.getBuildingFinalStatus();
		else if(name.equalsIgnoreCase("sprinkleFinalStatus"))
			return co.getSprinkleFinalStatus();
		else if(name.equalsIgnoreCase("plumbingFinalStatus"))
			return co.getPlumbingFinalStatus();
		else if(name.equalsIgnoreCase("gasFinalStatus"))
			return co.getGasFinalStatus();
		else if(name.equalsIgnoreCase("ceilingFinalStatus"))
			return co.getCeilingFinalStatus();
		else if(name.equalsIgnoreCase("fireAlarmFinalStatus"))
			return co.getFireAlarmFinalStatus();
		else if(name.equalsIgnoreCase("lowVolFinalStatus"))
			return co.getLowVolFinalStatus();
		else if(name.equalsIgnoreCase("elecFinalStatus"))
			return co.getElecFinalStatus();
		else if(name.equalsIgnoreCase("mechFinalStatus"))
			return co.getMechFinalStatus();
		else if(name.equalsIgnoreCase("otherFinalLeinsStatus"))
			return co.getOtherFinalLeinsStatus();
		else if(name.equalsIgnoreCase("otherFinalLeinsBStatus"))
			return co.getOtherFinalLeinsBStatus();
		
		return null;

	}
	
	public static Map<String , String> getAllCloseoutFields()
	{
		Map<String , String> fields = new HashMap<String , String>();
		
		fields.put("numOfChangeOrders" , "Number");
		fields.put("numOfChangeOrdersCompleted" , "Number");
		fields.put("numOfMCSChangeOrders" , "Number");
		fields.put("numOfMCSChangeOrdersCompleted" , "Number");
	    fields.put("salvageValue", "Number");
	    fields.put("salvageStatus","String");
	    fields.put("pbnMTStatus", "String");
	    fields.put("pbnMTDate", "Date");
		fields.put("MCSStatus" , "String");
		fields.put("MCSDate" , "Date");
		fields.put("GCStatus" , "String");
		fields.put("GCDate" , "Date");
		fields.put("mechanicalStatus" , "String");
		fields.put("mechanicalDate" , "Date");
		fields.put("electricalStatus" , "String");
		fields.put("electricalDate" , "Date");
		fields.put("plumbingStatus" , "String");
		fields.put("plumbingDate" , "Date");
		fields.put("gasStatus" , "String");
		fields.put("gasDate" , "Date");
		fields.put("sprinkleStatus" , "String");
		fields.put("sprinkleDate" , "Date");
		fields.put("HTIStatus" , "String");
		fields.put("HTIDate" , "Date");
		fields.put("mulvannySignOffStatus" , "String");
		fields.put("mulvannySignOffDate" , "Date");
		fields.put("releaseOfLiensStatus" , "String");
		fields.put("releaseOfLiensDate" , "Date");
		fields.put("paymentOfDebtsAndClaimsStatus" , "String");
		fields.put("paymentOfDebtsAndClaimsDate" , "Date");
		fields.put("substantialCompletionStatus" , "String");
		fields.put("substantialCompletionDate" , "Date");
		
		fields.put("warrantyNotes" , "String");
		fields.put("closeoutDocumentsNotes" , "String");
		fields.put("finalLiensNotes" , "String");
		fields.put("finalInspectionNotes" , "String");
		
		fields.put("mg2CompletionStatus" , "String");
		fields.put("mg2CompletionDate" , "Date");
		fields.put("verisaeReportStatus" , "String");
		fields.put("verisaeShutdownReport" , "Date");
		fields.put("alarmFormStatus" , "String");
		fields.put("alarmHvacForm" , "Date");
		fields.put("HVACstartupFormStatus" , "String");
		fields.put("HVACstartupFormDate" , "Date");
		fields.put("closeOutPhotosStatus" , "String");
		fields.put("closeoutPhotosCL" , "Date");
		fields.put("asBuiltDrawingsStatus" , "String");
		fields.put("asBuilts" , "Date");
		fields.put("costcoSignoffStatus" , "String");
		fields.put("costcoSignoff" , "Date");
		fields.put("punchListStatus" , "String");
		fields.put("hvacCloseoutStatus", "String");
		fields.put("refrigerationCloseoutStatus", "String");
		fields.put("punchList" , "Date");
		fields.put("manualStatus" , "String");
		fields.put("manualDate" , "Date");
		fields.put("equipmentSubmittalStatus" , "String");
		fields.put("equipmentSubCL" , "Date");
		fields.put("otherWarrantyStatusB" , "String");
		fields.put("otherWarrantyDateB" , "Date");
		fields.put("otherWarrantyStatusA" , "String");
		fields.put("otherWarrantyDateA" , "Date");
		fields.put("HTIWarrantyStatus" , "String");
		fields.put("HTIWarrantyDate" , "Date");
		fields.put("sprinkleWarrantyStatus" , "String");
		fields.put("sprinkleWarrantyDate" , "Date");
		fields.put("plumbingWarrantyStatus" , "String");
		fields.put("plumbingWarrantyDate" , "Date");
		fields.put("gasWarrantyStatus" , "String");
		fields.put("gasWarrantyDate" , "Date");
		fields.put("electricalWarrantyStatus" , "String");
		fields.put("electricalWarrantyDate" , "Date");
		fields.put("mechanicalWarrantyStatus" , "String");
		fields.put("mechanicalWarrantyDate" , "Date");
		fields.put("GCWarrantyStatus" , "String");
		fields.put("GCWarrantyDate" , "Date");
		fields.put("MCSWarrantyStatus" , "String");
		fields.put("MCSWarrantyDate" , "Date");
		fields.put("buildingFinalStatus" , "String");
		fields.put("buidlingFinalDate" , "Date");
		fields.put("sprinkleFinalStatus" , "String");
		fields.put("sprinkleFinalDate" , "Date");
		fields.put("plumbingFinalStatus" , "String");
		fields.put("plumbingFinalDate" , "Date");
		fields.put("gasFinalStatus" , "String");
		fields.put("gasFinalDate" , "Date");
		fields.put("ceilingFinalStatus" , "String");
		fields.put("ceilingFinalDate" , "Date");
		fields.put("fireAlarmFinalStatus" , "String");
		fields.put("fireAlarmFinalDate" , "Date");
		fields.put("lowVolFinalStatus" , "String");
		fields.put("lowVolFinalDate" , "Date");
		fields.put("elecFinalStatus" , "String");
		fields.put("elecFinalDate" , "Date");
		fields.put("mechFinalStatus" , "String");
		fields.put("otherFinalLeinsStatus" , "String");
		fields.put("otherFinalLeinsDate" , "Date");
		fields.put("otherFinalLeinsBStatus" , "String");
		fields.put("otherFinalLeinsBDate" , "Date");
		fields.put("certificateStatus" , "String");
		fields.put("certificateDate" , "Date");
		fields.put("tmpCertificateStatus" , "String");
		fields.put("tmpCertificateDate" , "Date");
		
		return fields;
	}
}
