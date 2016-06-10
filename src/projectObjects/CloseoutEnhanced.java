package projectObjects;

import java.util.Date;

import javax.persistence.Entity;

/**
 * This was created to almost completely rehaul the prexisting closeout form on the site.
 * This single class holds about half of the total field entries for every project.
 *  Have fun going through all of them! :D
 * @author Josh Mackin
 *
 */
@Entity
public class CloseoutEnhanced extends ProjectObject
{
	private int numOfChangeOrders;
	private int numOfChangeOrdersCompleted;
	
	// Final Liens 
	private String MCSStatus;
	private Date MCSDate;
	private String MCSNotes;
	
	private String GCStatus;
	private Date GCDate;
	private String GCNotes;
	
	private String mechanicalStatus;
	private Date mechanicalDate;
	private String mechanicalNotes;
	
	private String electricalStatus;
	private Date electricalDate;
	private String electricalNotes;
	
	private String plumbingStatus;
	private Date plumbingDate;
	private String plumbingNotes;
	
	private String sprinkleStatus;
	private Date sprinkleDate;
	private String sprinkleNotes;
	
	private String roofingStatus;
	private Date roofingDate;
	private String roofingNotes;
	
	private String HTIStatus;
	private Date HTIDate;
	private String HTINotes;
	
	private String otherFinalLeinsStatus;
	private Date otherFinalLeinsDate;
	private String otherFinalLeinsNotes;
	
	// Inspections
	private String mechFinalStatus;
	private Date mechFinalDate;
	private String mechFinalNotes;
	
	private String elecFinalStatus;
	private Date elecFinalDate;
	private String elecFinalNotes;
	
	private String plumbingFinalStatus;
	private String plumbingFinalNotes;
	private Date plumbingFinalDate;
	
	private String sprinkleFinalStatus;
	private String sprinkleFinalNotes;
	private Date sprinkleFinalDate;
	
	private String buildingFinalStatus;
	private String buildingFinalNotes;
	private Date buildingFinalDate;
	
	private String tmpCertificateStatus; 
	private String tmpCertificateNotes;
	private Date tmpCertificateDate;
	
	private String certificateStatus;
	private String certificateNotes;
	private Date certificateDate;
	
	//Warranties
	private String MCSWarrantyStatus;
	private Date MCSWarrantyDate;
	private String MCSWarrantyNotes;
	
	private String GCWarrantyStatus;
	private Date GCWarrantyDate;
	private String GCWarrantyNotes;
	
	private String mechanicalWarrantyStatus;
	private Date mechanicalWarrantyDate;
	private String mechanicalWarrantyNotes;
	
	private String electricalWarrantyStatus;
	private Date electricalWarrantyDate;
	private String electricalWarrantyNotes;
	
	private String plumbingWarrantyStatus;
	private Date plumbingWarrantyDate;
	private String plumbingWarrantyNotes;
	
	private String sprinkleWarrantyStatus;
	private Date sprinkleWarrantyDate;
	private String sprinkleWarrantyNotes;
	
	private String roofingWarrantyStatus;
	private Date roofingWarrantyDate;
	private String roofingWarrantyNotes;
	
	private String HTIWarrantyStatus;
	private Date HTIWarrantyDate;
	private String HTIWarrantyNotes;
	
	private String otherWarrantyStatusA;
	private Date otherWarrantyDateA;
	private String otherWarrantyNotesA;
	
	private String otherWarrantyStatusB;
	private Date otherWarrantyDateB;
	private String otherWarrantyNotesB;
	
	private String equipmentSubmittalStatus;
	private Date equipmentSubmittalDate;
	private String equipmentSubmittalNotes;
	
	private String manualStatus;
	private Date manualDate;
	private String manualNotes;
	
	private String punchListStatus;
	private String punchListNotes;
	private Date punchListDate;
	
	private String asBuiltDrawingsStatus;
	private Date asBuiltDrawingsDate;
	private String asBuiltDrawingsNotes;
	
	private String closeOutPhotosStatus;
	private Date closeOutPhotosDate;
	private String closeOutPhotosNotes;
	
	private String HVACstartupFormStatus;
	private Date HVACstartupFormDate;
	private String HVACstartupFormNotes;
	
	private String alarmFormStatus;
	private Date alarmFormDate;
	private String alarmFormNotes;
	
	private String verisaeReportStatus;
	private Date verisaeReportDate;
	private String verisaeReportNotes;

	public CloseoutEnhanced(String MCSStatus, Date MCSDate, String MCSNotes, String GCStatus, Date GCDate, String GCNotes,
	String mechanicalStatus, Date mechanicalDate, String mechanicalNotes, String electricalStatus, Date electricalDate,
	String electricalNotes, String plumbingNotes, Date plumbingDate, String plumbingStatus, String sprinkleStatus, Date sprinkleDate, 
	String sprinkleNotes, String roofingStatus, Date roofingDate, String roofingNotes, String HTIStatus, Date HTIDate, String HTINotes, 
	String otherFinalLeinsStatus, Date otherFinalLeinsDate, String otherFinalLeinsNotes, String MCSWarrantyStatus, Date MCSWarrantyDate, 
	String MCSWarrantyNotes,  Date mechanicalWarrantyDate, String mechanicalWarrantyNotes, 
	String electricalWarrantyStatus, Date electricalWarrantyDate, String electircalWarrantyNotes, String plumbingWarrantyStatus, 
	Date plumbingWarrantyDate, String plumbingWarrantyNotes, String sprinkleWarrantyStatus, Date sprinkleWarrantyDate, 
	String sprinkleWarrantynotes, String roofingWarrantyStatus, Date roofingWarrantyDate, String roofingWarrantyNotes, 
	String HTIWarrantyStatus, Date HTIWarrantyDate, String HTIWarrantyNotes, String otherWarrantyStatusA, Date otherWarrantyDateA, 
	String otherWarrantyNotesA, String otherWarrantyStatusB, Date otherWarrantyDateB, String otherWarrantyNotesB, String manualStatus, 
	Date manualDate, String manualNotes, String equipmentSubmittalStatus, Date equipmentSubmittalDate, String equipmentSubmittalNotes, 
	String asBuiltDrawingsStatus, Date asBuiltDrawingsDate, String asBuiltDrawingsNotes, 
	String closeOutPhotosStatus, Date closeOutPhotosDate, String closeOutPhotosNotes, String HVACstartupFormStatus, Date HVACstartupFormDate, 
	String HVACstartupFormNOtes, String alarmFormStatus, Date alarmFormDate, String alarmFormNotes, String verisaeReportStatus, 
	Date verisaeReportDate, String verisaeReportNotes, int numOfChangeOrders, int numOfChangeOrdersCompleted,
	String GCWarrantyNotes, Date GCWarrantyDate, String GCWarrantyStatus, String electricalWarrantyNotes, String sprinkleWarrantyNotes, 
	String HVACstartupFormNotes, String mechanicalWarrantyStatus, String mechFinalStatus, String mechFinalNotes, Date mechFinalDate,
	String elecFinalNotes, String elecFinalStatus, Date elecFinalDate, String plumbingFinalStatus, String plumbingFinalNotes, 
	Date plumbingFinalDate, String sprinkleFinalStatus, String sprinkleFinalNotes, Date sprinkleFinalDate, String buildingFinalStatus, 
	String buildingFinalNotes, Date buildingFinalDate, String tmpCertificateStatus, String tmpCertificateNotes, Date tmpCertificateDate,
	String certificateStatus, String certificateNotes, Date certificateDate, String punchListStatus, String punchListNotes,
	Date punchListDate)
	{
		this.MCSDate = MCSDate;											///
		this.MCSNotes = MCSNotes;
		this.MCSStatus = MCSStatus;
		this.GCDate = GCDate;											///
		this.GCNotes = GCNotes;
		this.GCStatus = GCStatus;
		this.mechanicalDate = mechanicalDate;
		this.mechanicalNotes = mechanicalNotes;
		this.mechanicalStatus = mechanicalStatus;
		this.electricalDate = electricalDate;
		this.electricalNotes = electricalNotes;
		this.electricalStatus = electricalStatus;
		this.plumbingDate = plumbingDate;
		this.plumbingNotes = plumbingNotes;
		this.plumbingStatus = plumbingStatus;
		this.sprinkleDate = sprinkleDate;
		this.sprinkleNotes = sprinkleNotes;
		this.sprinkleStatus = sprinkleStatus;
		this.roofingDate = roofingDate;
		this.roofingNotes = roofingNotes;
		this.roofingStatus = roofingStatus;
		this.HTIDate = HTIDate;
		this.HTINotes = HTINotes;
		this.HTIStatus = HTIStatus;
		this.otherFinalLeinsDate = otherFinalLeinsDate;
		this.otherFinalLeinsNotes = otherFinalLeinsNotes;
		this.otherFinalLeinsStatus = otherFinalLeinsStatus;
		this.MCSWarrantyDate = MCSWarrantyDate;
		this.MCSWarrantyNotes = MCSWarrantyNotes;
		this.MCSWarrantyStatus = MCSWarrantyStatus;
		this.GCWarrantyDate = GCWarrantyDate;
		this.GCWarrantyNotes = GCWarrantyNotes;
		this.GCWarrantyStatus = GCWarrantyStatus;
		this.mechanicalWarrantyDate = mechanicalWarrantyDate;
		this.mechanicalWarrantyNotes = mechanicalWarrantyNotes;
		this.mechanicalWarrantyStatus = mechanicalWarrantyStatus;
		this.electricalWarrantyDate = electricalWarrantyDate; 
		this.electricalWarrantyNotes = electricalWarrantyNotes;
		this.electricalWarrantyStatus = electricalWarrantyStatus;
		this.plumbingWarrantyDate = plumbingWarrantyDate;
		this.plumbingWarrantyNotes = plumbingWarrantyNotes;
		this.plumbingWarrantyStatus = plumbingWarrantyStatus;
		this.sprinkleWarrantyDate = sprinkleWarrantyDate;
		this.sprinkleWarrantyNotes = sprinkleWarrantyNotes;
		this.sprinkleWarrantyStatus = sprinkleWarrantyStatus;
		this.roofingWarrantyDate = roofingWarrantyDate;
		this.roofingWarrantyNotes = roofingWarrantyNotes;
		this.roofingWarrantyStatus = roofingWarrantyStatus;
		this.HTIWarrantyDate = HTIWarrantyDate;
		this.HTIWarrantyNotes = HTIWarrantyNotes;
		this.HTIWarrantyStatus = HTIWarrantyStatus;
		this.otherWarrantyDateA = otherWarrantyDateA;
		this.otherWarrantyNotesA = otherWarrantyNotesA;
		this.otherWarrantyStatusA = otherWarrantyStatusA;
		this.otherWarrantyDateB = otherWarrantyDateB;
		this.otherWarrantyNotesB = otherWarrantyNotesB;
		this.otherWarrantyStatusB = otherWarrantyStatusB;
		this.equipmentSubmittalDate = equipmentSubmittalDate;
		this.equipmentSubmittalNotes = equipmentSubmittalNotes;
		this.equipmentSubmittalStatus = equipmentSubmittalStatus;
		this.manualDate = manualDate;
		this.manualNotes = manualNotes;
		this.manualStatus = manualStatus;
		this.asBuiltDrawingsDate = asBuiltDrawingsDate;
		this.asBuiltDrawingsNotes = asBuiltDrawingsNotes;
		this.asBuiltDrawingsStatus = asBuiltDrawingsStatus;
		this.closeOutPhotosDate = closeOutPhotosDate;
		this.HVACstartupFormDate = HVACstartupFormDate;
		this.HVACstartupFormNotes = HVACstartupFormNotes;
		this.HVACstartupFormStatus = HVACstartupFormStatus;
		this.alarmFormDate = alarmFormDate;
		this.alarmFormNotes = alarmFormNotes;
		this.alarmFormStatus = alarmFormStatus;
		this.verisaeReportDate = verisaeReportDate;
		this.verisaeReportNotes = verisaeReportNotes; 
		this.verisaeReportStatus = verisaeReportStatus;
		this.numOfChangeOrders = numOfChangeOrders;
		this.numOfChangeOrdersCompleted = numOfChangeOrdersCompleted;
		
		this.mechFinalDate = mechFinalDate;
		this.mechFinalNotes = mechFinalNotes;
		this.mechFinalStatus = mechFinalStatus;
		this.elecFinalDate = elecFinalDate;
		this.elecFinalStatus = elecFinalStatus;
		this.elecFinalNotes = elecFinalNotes;
		this.plumbingFinalDate = plumbingFinalDate;
		this.plumbingFinalNotes = plumbingFinalNotes;
		this.plumbingFinalStatus = plumbingFinalStatus;
		this.buildingFinalDate = buildingFinalDate;
		this.buildingFinalNotes = buildingFinalNotes;
		this.buildingFinalStatus = buildingFinalStatus;
		this.tmpCertificateDate = tmpCertificateDate;
		this.tmpCertificateNotes = tmpCertificateNotes;
		this.tmpCertificateStatus = tmpCertificateStatus;
		this.certificateDate = certificateDate;
		this.certificateNotes = certificateNotes;
		this.certificateStatus = certificateStatus;
		this.punchListDate = punchListDate;
		this.punchListStatus = punchListStatus;
		this.punchListNotes = punchListNotes;
	}
	
	public CloseoutEnhanced()
	{
		this.MCSDate = null;											///
		this.MCSNotes = null;
		this.MCSStatus = null;
		this.GCDate = null;											///
		this.GCNotes = null;
		this.GCStatus = null;
		this.mechanicalDate = null;
		this.mechanicalNotes = null;
		this.mechanicalStatus = null;
		this.electricalDate = null;
		this.electricalNotes = null;
		this.electricalStatus = null;
		this.plumbingDate = null;
		this.plumbingNotes = null;
		this.plumbingStatus = null;
		this.sprinkleDate = null;
		this.sprinkleNotes = null;
		this.sprinkleStatus = null;
		this.roofingDate = null;
		this.roofingNotes = null;
		this.roofingStatus = null;
		this.HTIDate = null;
		this.HTINotes = null;
		this.HTIStatus = null;
		this.otherFinalLeinsDate = null;
		this.otherFinalLeinsNotes = null;
		this.otherFinalLeinsStatus = null;
		this.MCSWarrantyDate = null;
		this.MCSWarrantyNotes = null;
		this.MCSWarrantyStatus = null;
		this.GCWarrantyDate = null;
		this.GCWarrantyNotes = null;
		this.GCWarrantyStatus = null;
		this.mechanicalWarrantyDate = null;
		this.mechanicalWarrantyNotes = null;
		this.mechanicalWarrantyStatus = null;
		this.electricalWarrantyDate = null; 
		this.electricalWarrantyNotes = null;
		this.electricalWarrantyStatus = null;
		this.plumbingWarrantyDate = null;
		this.plumbingWarrantyNotes = null;
		this.plumbingWarrantyStatus = null;
		this.sprinkleWarrantyDate = null;
		this.sprinkleWarrantyNotes = null;
		this.sprinkleWarrantyStatus = null;
		this.roofingWarrantyDate = null;
		this.roofingWarrantyNotes = null;
		this.roofingWarrantyStatus = null;
		this.HTIWarrantyDate = null;
		this.HTIWarrantyNotes = null;
		this.HTIWarrantyStatus = null;
		this.otherWarrantyDateA = null;
		this.otherWarrantyNotesA = null;
		this.otherWarrantyStatusA = null;
		this.otherWarrantyDateB = null;
		this.otherWarrantyNotesB = null;
		this.otherWarrantyStatusB = null;
		this.equipmentSubmittalDate = null;
		this.equipmentSubmittalNotes = null;
		this.equipmentSubmittalStatus = null;
		this.manualDate = null;
		this.manualNotes = null;
		this.manualStatus = null;
		this.asBuiltDrawingsDate = null;
		this.asBuiltDrawingsNotes = null;
		this.asBuiltDrawingsStatus = null;
		this.closeOutPhotosDate = null;
		this.HVACstartupFormDate = null;
		this.HVACstartupFormNotes = null;
		this.HVACstartupFormStatus = null;
		this.alarmFormDate = null;
		this.alarmFormNotes = null;
		this.alarmFormStatus = null;
		this.verisaeReportDate = null;
		this.verisaeReportNotes = null; 
		this.verisaeReportStatus = null;
		this.numOfChangeOrders = 0;
		this.numOfChangeOrdersCompleted = 0;
		this.mechFinalDate = null;
		this.mechFinalNotes = null;
		this.mechFinalStatus = null;
		this.elecFinalDate = null;
		this.elecFinalStatus = null;
		this.elecFinalNotes = null;
		this.plumbingFinalDate = null;
		this.plumbingFinalNotes = null;
		this.plumbingFinalStatus = null;
		this.buildingFinalDate = null;
		this.buildingFinalNotes = null;
		this.buildingFinalStatus = null;
		this.tmpCertificateDate = null;
		this.tmpCertificateNotes = null;
		this.tmpCertificateStatus = null;
		this.certificateDate = null;
		this.certificateNotes = null;
		this.certificateStatus = null;
		this.punchListDate = null;
		this.punchListStatus = null;
		this.punchListNotes = null;
	}

	private static String convert(String copSubmittedStatus)
	{
		if(copSubmittedStatus.equals("1"))
			return "Complete";
		if(copSubmittedStatus.equals("2"))
			return "Incomplete";
		if(copSubmittedStatus.equals("3"))
			return "N/A";
		return "Null";
	}
	
	public void setMCSStatus(String mCSStatus) {
		MCSStatus = mCSStatus;
	}
	
	public String getMCSStatus()
	{
		return MCSStatus;
	}

	public Date getMCSDate() {
		return MCSDate;
	}

	public void setMCSDate(Date mCSDate) {
		MCSDate = mCSDate;
	}

	public String getMCSNotes() {
		return MCSNotes;
	}

	public void setMCSNotes(String mCSNotes) {
		MCSNotes = mCSNotes;
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

	public String getGCNotes() {
		return GCNotes;
	}

	public void setGCNotes(String gCNotes) {
		GCNotes = gCNotes;
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

	public String getMechanicalNotes() {
		return mechanicalNotes;
	}

	public void setMechanicalNotes(String mechanicalNotes) {
		this.mechanicalNotes = mechanicalNotes;
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

	public String getElectricalNotes() {
		return electricalNotes;
	}

	public void setElectricalNotes(String electricalNotes) {
		this.electricalNotes = electricalNotes;
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

	public String getPlumbingNotes() {
		return plumbingNotes;
	}

	public void setPlumbingNotes(String plumbingNotes) {
		this.plumbingNotes = plumbingNotes;
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

	public String getSprinkleNotes() {
		return sprinkleNotes;
	}

	public void setSprinkleNotes(String sprinkleNotes) {
		this.sprinkleNotes = sprinkleNotes;
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

	public String getRoofingNotes() {
		return roofingNotes;
	}

	public void setRoofingNotes(String roofingNotes) {
		this.roofingNotes = roofingNotes;
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

	public String getHTINotes() {
		return HTINotes;
	}

	public void setHTINotes(String hTINotes) {
		HTINotes = hTINotes;
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

	public String getOtherFinalLeinsNotes() {
		return otherFinalLeinsNotes;
	}

	public void setOtherFinalLeinsNotes(String otherFinalLeinsNotes) {
		this.otherFinalLeinsNotes = otherFinalLeinsNotes;
	}

	public String getMCSWarrantyStatus() {
		return MCSWarrantyStatus;
	}

	public void setMCSWarrantyStatus(String mCSWarrantyStatus) {
		MCSWarrantyStatus = mCSWarrantyStatus;
	}

	public Date getMCSWarrantyDate() {
		return MCSWarrantyDate;
	}

	public void setMCSWarrantyDate(Date mCSWarrantyDate) {
		MCSWarrantyDate = mCSWarrantyDate;
	}

	public String getMCSWarrantyNotes() {
		return MCSWarrantyNotes;
	}

	public void setMCSWarrantyNotes(String mCSWarrantyNotes) {
		MCSWarrantyNotes = mCSWarrantyNotes;
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

	public String getGCWarrantyNotes() {
		return GCWarrantyNotes;
	}

	public void setGCWarrantyNotes(String gCWarrantyNotes) {
		GCWarrantyNotes = gCWarrantyNotes;
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

	public String getMechanicalWarrantyNotes() {
		return mechanicalWarrantyNotes;
	}

	public void setMechanicalWarrantyNotes(String mechanicalWarrantyNotes) {
		this.mechanicalWarrantyNotes = mechanicalWarrantyNotes;
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

	public String getElectricalWarrantyNotes() {
		return electricalWarrantyNotes;
	}

	public void setElectricalWarrantyNotes(String electricalWarrantyNotes) {
		this.electricalWarrantyNotes = electricalWarrantyNotes;
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

	public String getPlumbingWarrantyNotes() {
		return plumbingWarrantyNotes;
	}

	public void setPlumbingWarrantyNotes(String plumbingWarrantyNotes) {
		this.plumbingWarrantyNotes = plumbingWarrantyNotes;
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

	public String getSprinkleWarrantyNotes() {
		return sprinkleWarrantyNotes;
	}

	public void setSprinkleWarrantyNotes(String sprinkleWarrantyNotes) {
		this.sprinkleWarrantyNotes = sprinkleWarrantyNotes;
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

	public String getRoofingWarrantyNotes() {
		return roofingWarrantyNotes;
	}

	public void setRoofingWarrantyNotes(String roofingWarrantyNotes) {
		this.roofingWarrantyNotes = roofingWarrantyNotes;
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

	public String getHTIWarrantyNotes() {
		return HTIWarrantyNotes;
	}

	public void setHTIWarrantyNotes(String hTIWarrantyNotes) {
		HTIWarrantyNotes = hTIWarrantyNotes;
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

	public String getOtherWarrantyNotesA() {
		return otherWarrantyNotesA;
	}

	public void setOtherWarrantyNotesA(String otherWarrantyNotesA) {
		this.otherWarrantyNotesA = otherWarrantyNotesA;
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

	public String getOtherWarrantyNotesB() {
		return otherWarrantyNotesB;
	}

	public void setOtherWarrantyNotesB(String otherWarrantyNotesB) {
		this.otherWarrantyNotesB = otherWarrantyNotesB;
	}

	public String getEquipmentSubmittalStatus() {
		return equipmentSubmittalStatus;
	}

	public void setEquipmentSubmittalStatus(String equipmentSubmittalStatus) {
		this.equipmentSubmittalStatus = equipmentSubmittalStatus;
	}

	public Date getEquipmentSubmittalDate() {
		return equipmentSubmittalDate;
	}

	public void setEquipmentSubmittalDate(Date equipmentSubmittalDate) {
		this.equipmentSubmittalDate = equipmentSubmittalDate;
	}

	public String getEquipmentSubmittalNotes() {
		return equipmentSubmittalNotes;
	}

	public void setEquipmentSubmittalNotes(String equipmentSubmittalNotes) {
		this.equipmentSubmittalNotes = equipmentSubmittalNotes;
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

	public String getManualNotes() {
		return manualNotes;
	}

	public void setManualNotes(String manualNotes) {
		this.manualNotes = manualNotes;
	}

	public String getAsBuiltDrawingsStatus() {
		return asBuiltDrawingsStatus;
	}

	public void setAsBuiltDrawingsStatus(String asBuiltDrawingsStatus) {
		this.asBuiltDrawingsStatus = asBuiltDrawingsStatus;
	}

	public Date getAsBuiltDrawingsDate() {
		return asBuiltDrawingsDate;
	}

	public void setAsBuiltDrawingsDate(Date asBuiltDrawingsDate) {
		this.asBuiltDrawingsDate = asBuiltDrawingsDate;
	}

	public String getAsBuiltDrawingsNotes() {
		return asBuiltDrawingsNotes;
	}

	public void setAsBuiltDrawingsNotes(String asBuiltDrawingsNotes) {
		this.asBuiltDrawingsNotes = asBuiltDrawingsNotes;
	}

	public String getCloseOutPhotosStatus() {
		return closeOutPhotosStatus;
	}

	public void setCloseOutPhotosStatus(String closeOutPhotosStatus) {
		this.closeOutPhotosStatus = closeOutPhotosStatus;
	}

	public Date getCloseOutPhotosDate() {
		return closeOutPhotosDate;
	}

	public void setCloseOutPhotosDate(Date closeOutPhotosDate) {
		this.closeOutPhotosDate = closeOutPhotosDate;
	}

	public String getCloseOutPhotosNotes() {
		return closeOutPhotosNotes;
	}

	public void setCloseOutPhotosNotes(String closeOutPhotosNotes) {
		this.closeOutPhotosNotes = closeOutPhotosNotes;
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

	public String getHVACstartupFormNotes() {
		return HVACstartupFormNotes;
	}

	public void setHVACstartupFormNotes(String hVACstartupFormNotes) {
		HVACstartupFormNotes = hVACstartupFormNotes;
	}

	public String getAlarmFormStatus() {
		return alarmFormStatus;
	}

	public void setAlarmFormStatus(String alarmFormStatus) {
		this.alarmFormStatus = alarmFormStatus;
	}

	public Date getAlarmFormDate() {
		return alarmFormDate;
	}

	public void setAlarmFormDate(Date alarmFormDate) {
		this.alarmFormDate = alarmFormDate;
	}

	public String getAlarmFormNotes() {
		return alarmFormNotes;
	}

	public void setAlarmFormNotes(String alarmFormNotes) {
		this.alarmFormNotes = alarmFormNotes;
	}

	public String getVerisaeReportStatus() {
		return verisaeReportStatus;
	}

	public void setVerisaeReportStatus(String verisaeReportStatus) {
		this.verisaeReportStatus = verisaeReportStatus;
	}

	public Date getVerisaeReportDate() {
		return verisaeReportDate;
	}

	public void setVerisaeReportDate(Date verisaeReportDate) {
		this.verisaeReportDate = verisaeReportDate;
	}

	public String getVerisaeReportNotes() {
		return verisaeReportNotes;
	}

	public void setVerisaeReportNotes(String verisaeReportNotes) {
		this.verisaeReportNotes = verisaeReportNotes;
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

	public String getMechFinalNotes() {
		return mechFinalNotes;
	}

	public void setMechFinalNotes(String mechFinalNotes) {
		this.mechFinalNotes = mechFinalNotes;
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

	public String getElecFinalNotes() {
		return elecFinalNotes;
	}

	public void setElecFinalNotes(String elecFinalNotes) {
		this.elecFinalNotes = elecFinalNotes;
	}

	public String getPlumbingFinalStatus() {
		return plumbingFinalStatus;
	}

	public void setPlumbingFinalStatus(String plumbingFinalStatus) {
		this.plumbingFinalStatus = plumbingFinalStatus;
	}

	public String getPlumbingFinalNotes() {
		return plumbingFinalNotes;
	}

	public void setPlumbingFinalNotes(String plumbingFinalNotes) {
		this.plumbingFinalNotes = plumbingFinalNotes;
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

	public String getSprinkleFinalNotes() {
		return sprinkleFinalNotes;
	}

	public void setSprinkleFinalNotes(String sprinkleFinalNotes) {
		this.sprinkleFinalNotes = sprinkleFinalNotes;
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

	public String getBuildingFinalNotes() {
		return buildingFinalNotes;
	}

	public void setBuildingFinalNotes(String buildingFinalNotes) {
		this.buildingFinalNotes = buildingFinalNotes;
	}

	public Date getBuildingFinalDate() {
		return buildingFinalDate;
	}

	public void setBuildingFinalDate(Date buildingFinalDate) {
		this.buildingFinalDate = buildingFinalDate;
	}

	public String getTmpCertificateStatus() {
		return tmpCertificateStatus;
	}

	public void setTmpCertificateStatus(String tmpCertificateStatus) {
		this.tmpCertificateStatus = tmpCertificateStatus;
	}

	public String getTmpCertificateNotes() {
		return tmpCertificateNotes;
	}

	public void setTmpCertificateNotes(String tmpCertificateNotes) {
		this.tmpCertificateNotes = tmpCertificateNotes;
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

	public String getCertificateNotes() {
		return certificateNotes;
	}

	public void setCertificateNotes(String certificateNotes) {
		this.certificateNotes = certificateNotes;
	}

	public Date getCertificateDate() {
		return certificateDate;
	}

	public void setCertificateDate(Date certificateDate) {
		this.certificateDate = certificateDate;
	}

	public String getPunchListStatus() {
		return punchListStatus;
	}

	public void setPunchListStatus(String punchListStatus) {
		this.punchListStatus = punchListStatus;
	}

	public String getPunchListNotes() {
		return punchListNotes;
	}

	public void setPunchListNotes(String punchListNotes) {
		this.punchListNotes = punchListNotes;
	}

	public Date getPunchListDate() {
		return punchListDate;
	}

	public void setPunchListDate(Date punchListDate) {
		this.punchListDate = punchListDate;
	}
}
