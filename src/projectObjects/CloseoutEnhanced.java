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
	private Date copSubmittedDate;
	private String copSubmittedNotes;
	private String copSubmittedStatus;
	
	private String copApprovedStatus;
	private Date copApprovedDate;
	private String copApprovedNotes;
	
	private String copCompletedStatus;
	private Date copCompletedDate;
	private String copCompletedNotes;
	
	private String changeOrderSubmittedStatus;
	private Date changeOrderSubmittedDate;
	private String changeOrderSubmittedNotes;
	
	private String changeOrderApprovedStatus;
	private Date changeOrderApprovedDate;
	private String changeOrderApprovedNotes;
	
	private String revisionsSubmittedStatus;
	private Date revisionsSubmittedDate;
	private String revisionsSubmittedNotes;
	
	private String revisionsApprovedStatus;
	private Date revisionsApprovedDate;
	private String revisionsApprovedNotes;
	
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
	
	// TODO: NONE OF THE INSPECTIONS ARE IN HERE
	
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
	
	private String bartOrSandyStatus;
	private Date bartOrSandyDate;
	private String bartOrSandyNotes;

	private String andyStatus;
	private Date andyDate;
	private String andyNotes;
	
	private String projectManagerStatus;
	private Date projectManagerDate;
	private String projectManagerNotes;

	public CloseoutEnhanced(Date copSubmittedDate, String copSubmittedNotes, String copSubmittedStatus,
	String copApprovedStatus, Date copApprovedDate, String copApprovedNotes, String copCompletedStatus, Date copCompletedDate,
	String copCompletedNotes, String changeOrderSubmittedStatus, Date changeOrderSubmittedDate, String changeOrderSubmittedNotes,
	String changeOrderApprovedStatus, Date changeOrderApprovedDate, String changeOrderApprovedNotes, String revisionsSubmittedStatus,
	Date revisionsSubmittedDate, String revisionsSubmittedNotes, String revisionsApprovedStatus, Date revisionsApprovedDate, 
	String revisionsApprovedNotes, String MCSStatus, Date MCSDate, String MCSNotes, String GCStatus, Date GCDate, String GCNotes,
	String mechanicalStatus, Date mechanicalDate, String mechanicalNotes, String electricalStatus, Date electricalDate,
	String electricalNotes, String plumbingNotes, Date plumbingDate, String plumbingStatus, String sprinkleStatus, Date sprinkleDate, 
	String sprinkleNotes, String roofingStatus, Date roofingDate, String roofingNotes, String HTIStatus, Date HTIDate, String HTINotes, 
	String otherFinalLeinsStatus, Date otherFinalLeinsDate, String otherFinalLeinsNotes, String MCSWarrantyStatus, Date MCSWarrantyDate, 
	String MCSWarrantyNotes, String mechanicalWarrantyStatus, Date mechanicalWarrantyDate, String mechanicalWarrantyNotes, 
	String electricalWarrantyStatus, Date electricalWarrantyDate, String electircalWarrantyNotes, String plumbingWarrantyStatus, 
	Date plumbingWarrantyDate, String plumbingWarrantyNotes, String sprinkleWarrantyStatus, Date sprinkleWarrantyDate, 
	String sprinkleWarrantynotes, String roofingWarrantyStatus, Date roofingWarrantyDate, String roofingWarrantyNotes, 
	String HTIWarrantyStatus, Date HTIWarrantyDate, String HTIWarrantyNotes, String otherWarrantyStatusA, Date otherWarrantyDateA, 
	String otherWarrantyNotesA, String otherWarrantyStatusB, Date otherWarrantyDateB, String otherWarrantyNotesB, String manualStatus, 
	Date manualDate, String manualNotes, String equipmentSubmittalStatus, Date equipmentSubmittalDate, String equipmentSubmittalNotes, 
	String asBuiltDrawingsStatus, Date asBuiltDrawingsDate, String asBuiltDrawingsNotes, 
	String closeOutPhotosStatus, Date closeOutPhotosDate, String closeOutPhotosNotes, String HVACstartupFormStatus, Date HVACstartupFormDate, 
	String HVACstartupFormNOtes, String alarmFormStatus, Date alarmFormDate, String alarmFormNotes, String verisaeReportStatus, 
	Date verisaeReportDate, String verisaeReportNotes, String bartOrSandyStatus, Date bartOrSandyDate, String bartOrSandyNotes,
	String andyStatus, Date andyDate, String andyNotes, String projectManagerStatus, Date projectManagerDate, String projectManagerNotes,
	String GCWarrantyNotes, Date GCWarrantyDate, String GCWarrantyStatus, String electricalWarrantyNotes, String sprinkleWarrantyNotes, 
	String HVACstartupFormNotes)
	{
		this.copSubmittedDate = copSubmittedDate; 						///
		this.copSubmittedNotes = copSubmittedNotes;
		this.copSubmittedStatus = copSubmittedStatus;
		this.copApprovedDate = copApprovedDate;							///
		this.copApprovedNotes = copApprovedNotes;
		this.copApprovedStatus = copApprovedStatus;
		this.copCompletedDate = copCompletedDate; 						///
		this.copCompletedNotes = copCompletedNotes;
		this.copCompletedStatus = copCompletedStatus;
		this.changeOrderSubmittedDate = changeOrderSubmittedDate;		///
		this.changeOrderSubmittedNotes = changeOrderSubmittedNotes;
		this.changeOrderSubmittedStatus = changeOrderSubmittedStatus;
		this.changeOrderApprovedDate = changeOrderApprovedDate;			///
		this.changeOrderApprovedNotes = changeOrderApprovedNotes;
		this.changeOrderApprovedStatus = changeOrderApprovedStatus;
		this.revisionsSubmittedDate = revisionsSubmittedDate; 			///
		this.revisionsSubmittedNotes = revisionsSubmittedNotes;
		this.revisionsSubmittedStatus = revisionsSubmittedStatus;
		this.revisionsApprovedDate = revisionsApprovedDate;				///
		this.revisionsApprovedNotes = revisionsApprovedNotes;
		this.revisionsApprovedStatus = revisionsApprovedStatus;
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
		//TODO: INSPECTIONS STILL
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
		//TODO: Punch List
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
		this.bartOrSandyDate = bartOrSandyDate;
		this.bartOrSandyNotes = bartOrSandyNotes;
		this.bartOrSandyStatus = bartOrSandyStatus;
	}
	
	public CloseoutEnhanced()
	{
		this.copSubmittedDate = null;
		this.copSubmittedNotes = null;
		this.copSubmittedStatus = null;
	}
	
	
	
	public void setCopSubmittedDate(Date copSubmittedDate) 
	{
		this.copSubmittedDate = copSubmittedDate;
	}

	public void setCopSubmittedNotes(String copSubmittedNotes) 
	{
		this.copSubmittedNotes = copSubmittedNotes;
	}

	public void setCopSubmittedStatus(String copSubmittedStatus) 
	{
		this.copSubmittedStatus = convert(copSubmittedStatus);
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
	
	
	public Date getCopSubmittedDate()
	{
		return copSubmittedDate;
	}
	
	public String getCopSubmittedNotes()
	{
		return copSubmittedNotes;
	}
	
	public String getCopSubmittedStatus()
	{
		return copSubmittedStatus;
	}

	public String getCopApprovedStatus() {
		return copApprovedStatus;
	}

	public void setCopApprovedStatus(String copApprovedStatus) {
		this.copApprovedStatus = copApprovedStatus;
	}

	public Date getCopApprovedDate() {
		return copApprovedDate;
	}

	public void setCopApprovedDate(Date copApprovedDate) {
		this.copApprovedDate = copApprovedDate;
	}

	public String getCopApprovedNotes() {
		return copApprovedNotes;
	}

	public void setCopApprovedNotes(String copApprovedNotes) {
		this.copApprovedNotes = copApprovedNotes;
	}

	public String getCopCompletedStatus() {
		return copCompletedStatus;
	}

	public void setCopCompletedStatus(String copCompletedStatus) {
		this.copCompletedStatus = copCompletedStatus;
	}

	public Date getCopCompletedDate() {
		return copCompletedDate;
	}

	public void setCopCompletedDate(Date copCompletedDate) {
		this.copCompletedDate = copCompletedDate;
	}

	public String getCopCompletedNotes() {
		return copCompletedNotes;
	}

	public void setCopCompletedNotes(String copCompletedNotes) {
		this.copCompletedNotes = copCompletedNotes;
	}

	public String getChangeOrderSubmittedStatus() {
		return changeOrderSubmittedStatus;
	}

	public void setChangeOrderSubmittedStatus(String changeOrderSubmittedStatus) {
		this.changeOrderSubmittedStatus = changeOrderSubmittedStatus;
	}

	public Date getChangeOrderSubmittedDate() {
		return changeOrderSubmittedDate;
	}

	public void setChangeOrderSubmittedDate(Date changeOrderSubmittedDate) {
		this.changeOrderSubmittedDate = changeOrderSubmittedDate;
	}

	public String getChangeOrderSubmittedNotes() {
		return changeOrderSubmittedNotes;
	}

	public void setChangeOrderSubmittedNotes(String changeOrderSubmittedNotes) {
		this.changeOrderSubmittedNotes = changeOrderSubmittedNotes;
	}

	public String getChangeOrderApprovedStatus() {
		return changeOrderApprovedStatus;
	}

	public void setChangeOrderApprovedStatus(String changeOrderApprovedStatus) {
		this.changeOrderApprovedStatus = changeOrderApprovedStatus;
	}

	public Date getChangeOrderApprovedDate() {
		return changeOrderApprovedDate;
	}

	public void setChangeOrderApprovedDate(Date changeOrderApprovedDate) {
		this.changeOrderApprovedDate = changeOrderApprovedDate;
	}

	public String getChangeOrderApprovedNotes() {
		return changeOrderApprovedNotes;
	}

	public void setChangeOrderApprovedNotes(String changeOrderApprovedNotes) {
		this.changeOrderApprovedNotes = changeOrderApprovedNotes;
	}

	public String getRevisionsSubmittedStatus() {
		return revisionsSubmittedStatus;
	}

	public void setRevisionsSubmittedStatus(String revisionsSubmittedStatus) {
		this.revisionsSubmittedStatus = revisionsSubmittedStatus;
	}

	public Date getRevisionsSubmittedDate() {
		return revisionsSubmittedDate;
	}

	public void setRevisionsSubmittedDate(Date revisionsSubmittedDate) {
		this.revisionsSubmittedDate = revisionsSubmittedDate;
	}

	public String getRevisionsSubmittedNotes() {
		return revisionsSubmittedNotes;
	}

	public void setRevisionsSubmittedNotes(String revisionsSubmittedNotes) {
		this.revisionsSubmittedNotes = revisionsSubmittedNotes;
	}

	public String getRevisionsApprovedStatus() {
		return revisionsApprovedStatus;
	}

	public void setRevisionsApprovedStatus(String revisionsApprovedStatus) {
		this.revisionsApprovedStatus = revisionsApprovedStatus;
	}

	public Date getRevisionsApprovedDate() {
		return revisionsApprovedDate;
	}

	public void setRevisionsApprovedDate(Date revisionsApprovedDate) {
		this.revisionsApprovedDate = revisionsApprovedDate;
	}

	public String getRevisionsApprovedNotes() {
		return revisionsApprovedNotes;
	}

	public void setRevisionsApprovedNotes(String revisionsApprovedNotes) {
		this.revisionsApprovedNotes = revisionsApprovedNotes;
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

	public String getBartOrSandyStatus() {
		return bartOrSandyStatus;
	}

	public void setBartOrSandyStatus(String bartOrSandyStatus) {
		this.bartOrSandyStatus = bartOrSandyStatus;
	}

	public Date getBartOrSandyDate() {
		return bartOrSandyDate;
	}

	public void setBartOrSandyDate(Date bartOrSandyDate) {
		this.bartOrSandyDate = bartOrSandyDate;
	}

	public String getBartOrSandyNotes() {
		return bartOrSandyNotes;
	}

	public void setBartOrSandyNotes(String bartOrSandyNotes) {
		this.bartOrSandyNotes = bartOrSandyNotes;
	}

	public String getAndyStatus() {
		return andyStatus;
	}

	public void setAndyStatus(String andyStatus) {
		this.andyStatus = andyStatus;
	}

	public Date getAndyDate() {
		return andyDate;
	}

	public void setAndyDate(Date andyDate) {
		this.andyDate = andyDate;
	}

	public String getAndyNotes() {
		return andyNotes;
	}

	public void setAndyNotes(String andyNotes) {
		this.andyNotes = andyNotes;
	}

	public String getProjectManagerStatus() {
		return projectManagerStatus;
	}

	public void setProjectManagerStatus(String projectManagerStatus) {
		this.projectManagerStatus = projectManagerStatus;
	}

	public Date getProjectManagerDate() {
		return projectManagerDate;
	}

	public void setProjectManagerDate(Date projectManagerDate) {
		this.projectManagerDate = projectManagerDate;
	}

	public String getProjectManagerNotes() {
		return projectManagerNotes;
	}

	public void setProjectManagerNotes(String projectManagerNotes) {
		this.projectManagerNotes = projectManagerNotes;
	}
}
