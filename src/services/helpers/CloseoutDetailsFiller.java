package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.CloseoutDetails;
/**
 * @author Josh Mackin
 */
public class CloseoutDetailsFiller
{
	public synchronized static void fillCloseoutDetails(CloseoutDetails cd,  Map<String, String>params) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		int numOfChangeOrders;
		try
		{
			 numOfChangeOrders = Integer.parseInt(params.get("numOfChangeOrders"));
		}catch(NumberFormatException ex) { numOfChangeOrders = 0; }

		cd.setNumOfChangeOrders(numOfChangeOrders);

		int numOfChangeOrdersCompleted;
		try
		{
			 numOfChangeOrdersCompleted = Integer.parseInt(params.get("numOfChangeOrdersCompleted"));
		}catch(NumberFormatException ex) { numOfChangeOrdersCompleted = 0; }
		cd.setNumOfChangeOrdersCompleted(numOfChangeOrdersCompleted);
		/////////////
		int numOfMCSChangeOrders;
		try
		{
			 numOfMCSChangeOrders = Integer.parseInt(params.get("numOfMCSChangeOrders"));
		}catch(NumberFormatException ex) { numOfMCSChangeOrders = 0; }

		cd.setNumOfMCSChangeOrders(numOfMCSChangeOrders);

		int numOfMCSChangeOrdersCompleted;
		try
		{
			 numOfMCSChangeOrdersCompleted = Integer.parseInt(params.get("numOfMCSChangeOrdersCompleted"));
		}catch(NumberFormatException ex) { numOfMCSChangeOrdersCompleted = 0; }
		cd.setNumOfMCSChangeOrdersCompleted(numOfMCSChangeOrdersCompleted);

		
		/////////////////
		//Date mg2CompletionDate = null;
		//if(!params.get("mg2CompletionDate").isEmpty())
		//	mg2CompletionDate = formatter.parse(params.get("mg2CompletionDate"));

		//cd.setMg2CompletionDate(mg2CompletionDate);
		//cd.setMg2CompletionStatus(params.get("mg2CompletionStatus"));

		Date MCSDate = null;
		if(!params.get("MCSDate").isEmpty())
			MCSDate = formatter.parse(params.get("MCSDate"));
		cd.setMCSDate(MCSDate);
		cd.setMCSStatus(params.get("MCSStatus"));

		Date GCDate = null;
		if(!params.get("GCDate").isEmpty())
			GCDate = formatter.parse(params.get("GCDate"));
		cd.setGCDate(GCDate);
		cd.setGCStatus(params.get("GCStatus"));

		Date mechanicalDate = null;
		if(!params.get("mechanicalDate").isEmpty())
			mechanicalDate = formatter.parse(params.get("mechanicalDate"));
		cd.setMechanicalDate(mechanicalDate);
		cd.setMechanicalStatus(params.get("mechanicalStatus"));

		Date electricalDate = null;
		if(!params.get("electricalDate").isEmpty())
			electricalDate = formatter.parse(params.get("electricalDate"));
		cd.setElectricalDate(electricalDate);
		cd.setElectricalStatus(params.get("electricalStatus"));

		Date plumbingDate = null;
		if(!params.get("plumbingDate").isEmpty())
			plumbingDate = formatter.parse(params.get("plumbingDate"));
		cd.setPlumbingDate(plumbingDate);
		cd.setPlumbingStatus(params.get("plumbingStatus"));

		Date sprinkleDate = null;
		if(!params.get("sprinkleDate").isEmpty())
			sprinkleDate = formatter.parse(params.get("sprinkleDate"));
		cd.setSprinkleDate(sprinkleDate);
		cd.setSprinkleStatus(params.get("sprinkleStatus"));

		Date gasDate = null;
		if(!params.get("gasDate").isEmpty())
			gasDate = formatter.parse(params.get("gasDate"));
		cd.setGasDate(gasDate);
		cd.setGasStatus(params.get("gasStatus"));

		Date HTIDate = null;
		if(!params.get("HTIDate").isEmpty())
			HTIDate = formatter.parse(params.get("HTIDate"));
		cd.setHTIDate(HTIDate);
		cd.setHTIStatus(params.get("HTIStatus"));

		Date otherFinalLeinsDate = null;
		if(!params.get("otherFinalLeinsDate").isEmpty())
			otherFinalLeinsDate = formatter.parse(params.get("otherFinalLeinsDate"));
		cd.setOtherFinalLeinsDate(otherFinalLeinsDate);
		cd.setOtherFinalLeinsStatus(params.get("otherFinalLeinsStatus"));

		Date otherFinalLeinsBDate = null;
		if(!params.get("otherFinalLeinsBDate").isEmpty())
			otherFinalLeinsBDate = formatter.parse(params.get("otherFinalLeinsBDate"));
		cd.setOtherFinalLeinsBDate(otherFinalLeinsBDate);
		cd.setOtherFinalLeinsBStatus(params.get("otherFinalLeinsBStatus"));
		
		Date mcsWarranty = null;
		if(!params.get("MCSWarranty").isEmpty())
			mcsWarranty = formatter.parse(params.get("MCSWarranty"));
		cd.setMCSWarranty(mcsWarranty);
		cd.setMCSWarrantyStatus(params.get("MCSWarrantyStatus"));

		Date GCWarrantyDate = null;
		if(!params.get("GCWarrantyDate").isEmpty())
			GCWarrantyDate = formatter.parse(params.get("GCWarrantyDate"));
		cd.setGCWarrantyDate(GCWarrantyDate);
		cd.setGCWarrantyStatus(params.get("GCWarrantyStatus"));

		Date mechanicalWarrantyDate = null;
		if(!params.get("mechanicalWarrantyDate").isEmpty())
			mechanicalWarrantyDate = formatter.parse(params.get("mechanicalWarrantyDate"));
		cd.setMechanicalWarrantyDate(mechanicalWarrantyDate);
		cd.setMechanicalWarrantyStatus(params.get("mechanicalWarrantyStatus"));

		Date electricalWarrantyDate = null;
		if(!params.get("electricalWarrantyDate").isEmpty())
			electricalWarrantyDate = formatter.parse(params.get("electricalWarrantyDate"));
		cd.setElectricalWarrantyDate(electricalWarrantyDate);
		cd.setElectricalWarrantyStatus(params.get("electricalWarrantyStatus"));

		Date plumbingWarrantyDate = null;
		if(!params.get("plumbingWarrantyDate").isEmpty())
			plumbingWarrantyDate = formatter.parse(params.get("plumbingWarrantyDate"));
		cd.setPlumbingWarrantyDate(plumbingWarrantyDate);
		cd.setPlumbingWarrantyStatus(params.get("plumbingWarrantyStatus"));

		Date sprinkleWarrantyDate = null;
		if(!params.get("sprinkleWarrantyDate").isEmpty())
			sprinkleWarrantyDate = formatter.parse(params.get("sprinkleWarrantyDate"));
		cd.setSprinkleWarrantyDate(sprinkleWarrantyDate);
		cd.setSprinkleWarrantyStatus(params.get("sprinkleWarrantyStatus"));

		Date gasWarrantyDate = null;
		if(!params.get("gasWarrantyDate").isEmpty())
			gasWarrantyDate = formatter.parse(params.get("gasWarrantyDate"));
		cd.setGasWarrantyDate(gasWarrantyDate);
		cd.setGasWarrantyStatus(params.get("gasWarrantyStatus"));
		
		Date HTIWarrantyDate = null;
		if(!params.get("HTIWarrantyDate").isEmpty())
			HTIWarrantyDate = formatter.parse(params.get("HTIWarrantyDate"));
		cd.setHTIWarrantyDate(HTIWarrantyDate);
		cd.setHTIWarrantyStatus(params.get("HTIWarrantyStatus"));

		Date otherWarrantyDateA = null;
		if(!params.get("otherWarrantyDateA").isEmpty())
			otherWarrantyDateA = formatter.parse(params.get("otherWarrantyDateA"));
		cd.setOtherWarrantyDateA(otherWarrantyDateA);
		cd.setOtherWarrantyStatusA(params.get("otherWarrantyStatusA"));

		Date otherWarrantyDateB = null;
		if(!params.get("otherWarrantyDateB").isEmpty())
			otherWarrantyDateB = formatter.parse(params.get("otherWarrantyDateB"));
		cd.setOtherWarrantyDateB(otherWarrantyDateB);
		cd.setOtherWarrantyStatusB(params.get("otherWarrantyStatusB"));

		/* tempholder
		Date mechFinalDate = null;
		if(!params.get("mechFinalDate").isEmpty())
			mechFinalDate = formatter.parse(params.get("mechFinalDate"));
		cd.setMechFinalDate(mechFinalDate);
		cd.setMechFinalStatus(params.get("mechFinalStatus"));

		Date elecFinalDate = null;
		if(!params.get("elecFinalDate").isEmpty())
			elecFinalDate = formatter.parse(params.get("elecFinalDate"));
		cd.setElecFinalDate(elecFinalDate);
		cd.setElecFinalStatus(params.get("elecFinalStatus"));

		Date plumbingFinalDate = null;
		if(!params.get("plumbingFinalDate").isEmpty())
			plumbingFinalDate = formatter.parse(params.get("plumbingFinalDate"));
		cd.setPlumbingFinalDate(plumbingFinalDate);
		cd.setPlumbingFinalStatus(params.get("plumbingFinalStatus"));
		
		Date gasFinalDate = null;
		if(!params.get("gasFinalDate").isEmpty())
			gasFinalDate = formatter.parse(params.get("gasFinalDate"));
		cd.setGasFinalDate(gasFinalDate);
		cd.setGasFinalStatus(params.get("gasFinalStatus"));
		
		Date ceilingFinalDate = null;
		if(!params.get("ceilingFinalDate").isEmpty())
			ceilingFinalDate = formatter.parse(params.get("ceilingFinalDate"));
		cd.setCeilingFinalDate(ceilingFinalDate);
		cd.setCeilingFinalStatus(params.get("ceilingFinalStatus"));
		
		Date fireAlarmFinalDate = null;
		if(!params.get("fireAlarmFinalDate").isEmpty())
			fireAlarmFinalDate = formatter.parse(params.get("fireAlarmFinalDate"));
		cd.setFireAlarmFinalDate(fireAlarmFinalDate);
		cd.setFireAlarmFinalStatus(params.get("fireAlarmFinalStatus"));

		Date lowVolFinalDate = null;
		if(!params.get("lowVolFinalDate").isEmpty())
			lowVolFinalDate = formatter.parse(params.get("lowVolFinalDate"));
		cd.setLowVolFinalDate(lowVolFinalDate);
		cd.setLowVolFinalStatus(params.get("lowVolFinalStatus"));
		
		Date sprinkleFinalDate = null;
		if(!params.get("sprinkleFinalDate").isEmpty())
			sprinkleFinalDate = formatter.parse(params.get("sprinkleFinalDate"));
		cd.setSprinkleFinalDate(sprinkleFinalDate);
		cd.setSprinkleFinalStatus(params.get("sprinkleFinalStatus"));

		Date buildingFinal = null;
		if(!params.get("buildingPermitCL").isEmpty())
			buildingFinal = formatter.parse(params.get("buildingPermitCL"));
		cd.setBuildingPermitCL(buildingFinal);
		cd.setBuildingFinalStatus(params.get("buildingFinalStatus"));

		Date tmpCertificateDate = null;
		if(!params.get("tmpCertificateDate").isEmpty())
			tmpCertificateDate = formatter.parse(params.get("tmpCertificateDate"));
		cd.setTmpCertificateDate(tmpCertificateDate);
		cd.setTmpCertificateStatus(params.get("tmpCertificateStatus"));

		Date certificateDate = null;
		if(!params.get("certificateDate").isEmpty())
			certificateDate = formatter.parse(params.get("certificateDate"));
		cd.setCertificateDate(certificateDate);
		cd.setCertificateStatus(params.get("certificateStatus"));
*/
		Date equipmentSubmittal = null;
		if(!params.get("equipmentSubCL").isEmpty())
			equipmentSubmittal = formatter.parse(params.get("equipmentSubCL"));
		cd.setEquipmentSubCL(equipmentSubmittal);
		cd.setEquipmentSubmittalStatus(params.get("equipmentSubmittalStatus"));

		Date manualDate = null;
		if(!params.get("manualDate").isEmpty())
			manualDate = formatter.parse(params.get("manualDate"));
		cd.setManualDate(manualDate);
		cd.setManualStatus(params.get("manualStatus"));

		Date costcoSignoff = null;
		if(!params.get("costcoSignoff").isEmpty())
			costcoSignoff = formatter.parse(params.get("costcoSignoff"));
		cd.setCostcoSignoff(costcoSignoff);
		cd.setCostcoSignoffStatus(params.get("costcoSignoffStatus"));
		
		Date punchList = null;
		if(!params.get("punchList").isEmpty())
			punchList = formatter.parse(params.get("punchList"));
		cd.setPunchList(punchList);
		cd.setPunchListStatus(params.get("punchListStatus"));

		Date asBuilts = null;
		if(!params.get("asBuilts").isEmpty())
			asBuilts = formatter.parse(params.get("asBuilts"));
		cd.setAsBuilts(asBuilts);
		cd.setAsBuiltDrawingsStatus(params.get("asBuiltDrawingsStatus"));

		Date closeOutPhotos = null;
		if(!params.get("closeoutPhotosCL").isEmpty())
			closeOutPhotos = formatter.parse(params.get("closeoutPhotosCL"));
		cd.setCloseoutPhotosCL(closeOutPhotos);
		cd.setCloseOutPhotosStatus(params.get("closeOutPhotosStatus"));

		Date HVACstartupFormDate = null;
		if(!params.get("HVACstartupFormDate").isEmpty())
			HVACstartupFormDate = formatter.parse(params.get("HVACstartupFormDate"));
		cd.setHVACstartupFormDate(HVACstartupFormDate);
		cd.setHVACstartupFormStatus(params.get("HVACstartupFormStatus"));

		
		Date alarmForm = null;
		if(!params.get("alarmHvac").isEmpty())
			alarmForm = formatter.parse(params.get("alarmHvac"));
		cd.setAlarmHvacForm(alarmForm);
		cd.setAlarmFormStatus(params.get("alarmFormStatus"));

		
		Date pbnMTDate = null;
		if(!params.get("pbnMTDate").isEmpty())
			pbnMTDate = formatter.parse(params.get("pbnMTDate"));
		cd.setPbnMTDate(pbnMTDate);
		cd.setPbnMTStatus(params.get("pbnMTStatus"));
		
		
		cd.setSalvageStatus(params.get("salvageStatus"));

		Date verisaeDate = null;
		if(!params.get("verisae").isEmpty())
			verisaeDate = formatter.parse(params.get("verisae"));
		cd.setVerisaeShutdownReport(verisaeDate);
		cd.setVerisaeReportStatus(params.get("verisaeReportStatus"));

		cd.setFinalInspectionNotes(params.get("finalInspectionNotes"));
		cd.setFinalLiensNotes(params.get("finalLiensNotes"));
		cd.setCloseoutDocumentsNotes(params.get("closeoutDocumentsNotes"));
		cd.setWarrantyNotes(params.get("warrantyNotes"));

		Date substantialCompletionDate = null;
		if(params.get("substantialCompletionDate") != null)
		if(!params.get("substantialCompletionDate").isEmpty())
			substantialCompletionDate = formatter.parse(params.get("substantialCompletionDate"));
		cd.setSubstantialCompletionDate(substantialCompletionDate);
		if(params.get("substantialCompletionStatus") != null)
		cd.setSubstantialCompletionStatus(params.get("substantialCompletionStatus"));

		Date paymentOfDebtsAndClaimsDate = null;
		if(params.get("paymentOfDebtsAndClaimsDate") != null)

		if(!params.get("paymentOfDebtsAndClaimsDate").isEmpty())
			paymentOfDebtsAndClaimsDate = formatter.parse(params.get("paymentOfDebtsAndClaimsDate"));
		cd.setPaymentOfDebtsAndClaimsDate(paymentOfDebtsAndClaimsDate);
		if(params.get("paymentOfDebtsAndClaimsStatus") != null)

		cd.setPaymentOfDebtsAndClaimsStatus(params.get("paymentOfDebtsAndClaimsStatus"));

		Date releaseOfLiensDate = null;
		if(params.get("releaseOfLiensDate") != null)

		if(!params.get("releaseOfLiensDate").isEmpty())
			releaseOfLiensDate = formatter.parse(params.get("releaseOfLiensDate"));
		cd.setReleaseOfLiensDate(releaseOfLiensDate);
		if(params.get("releaseOfLiensStatus") != null)

		cd.setReleaseOfLiensStatus(params.get("releaseOfLiensStatus"));

		Date mulvannySignOffDate = null;
		if(params.get("mulvannySignOffDate") != null)

		if(!params.get("mulvannySignOffDate").isEmpty())
			mulvannySignOffDate = formatter.parse(params.get("mulvannySignOffDate"));
		cd.setMulvannySignOffDate(mulvannySignOffDate);
		if(params.get("mulvannySignOffStatus") != null)

		cd.setMulvannySignOffStatus(params.get("mulvannySignOffStatus"));

	}
}
