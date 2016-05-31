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
 * @author Alex Campbell
 *
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
	

	public CloseoutDetails(Date asBuilts, SalvageValue salvageValue,
			Date punchList, Date alarmHvacForm, Date airGas,
			Date permitsClosed, Date verisaeShutdownReport, 
			Date closeoutNotes,	Date buildingPermitCL, Date inspectionSOCL,	 Date certCompletionCL,
			Date mPunchListCL, Date closeoutPhotosCL, Date subConWarrantiesCL,
			Date mCSWarranty, Date equipmentSubCL, Date traneCL) 
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
	
	
	
	
	
}
