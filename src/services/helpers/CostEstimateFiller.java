package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.CostEstimate;
import projectObjects.Permits;

public class CostEstimateFiller
{

	public synchronized static void fillCostEstimate(CostEstimate ce,  Map<String, String>params) throws ParseException
	{
		System.out.println("cost est filler");
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		ce.setProject(Long.parseLong(params.get("projectID")));
		ce.setGenConProposalReq(Integer.parseInt(params.get("genConProposalReq")));
		ce.setGenConSubName(Integer.parseInt(params.get("genConSubName")));
		ce.setGenConStatus(Integer.parseInt(params.get("genConStatus")));
		
		Date genConSubmitDate = null;
		if(!params.get("genConSubmitDate").isEmpty())
			genConSubmitDate = formatter.parse(params.get("genConSubmitDate"));
		ce.setGenConSubmitDate(genConSubmitDate);
		
		double genConCost;
		try
		{
			 genConCost = Double.parseDouble(params.get("genConCost"));
		}catch(NumberFormatException ex) { genConCost = 0; }
		ce.setGenConCost(genConCost);

		ce.setGenConScope(params.get("genConScope"));
		ce.setGenConNotes(params.get("genConNotes"));
		
		ce.setRefrigProposalReq(Integer.parseInt(params.get("refrigProposalReq")));
		ce.setRefrigSubName(Integer.parseInt(params.get("refrigSubName")));
		ce.setRefrigStatus(Integer.parseInt(params.get("refrigStatus")));
		
		Date refrigSubmitDate = null;
		if(!params.get("refrigSubmitDate").isEmpty())
			refrigSubmitDate = formatter.parse(params.get("refrigSubmitDate"));
		ce.setRefrigSubmitDate(refrigSubmitDate);
		
		double refrigCost;
		try
		{
			 refrigCost = Double.parseDouble(params.get("refrigCost"));
		}catch(NumberFormatException ex) { refrigCost = 0; }
		ce.setRefrigCost(refrigCost);

		ce.setRefrigScope(params.get("refrigScope"));
		ce.setRefrigNotes(params.get("refrigNotes"));
		
		ce.setElecProposalReq(Integer.parseInt(params.get("electricalProposalReq")));
		ce.setElecSubName(Integer.parseInt(params.get("electricalSubName")));
		ce.setElecStatus(Integer.parseInt(params.get("electricalStatus")));
		
		Date electricalSubmitDate = null;
		if(!params.get("electricalSubmitDate").isEmpty())
			electricalSubmitDate = formatter.parse(params.get("electricalSubmitDate"));
		ce.setElecSubmitDate(electricalSubmitDate);
		
		double electricalCost;
		try
		{
			 electricalCost = Double.parseDouble(params.get("electricalCost"));
		}catch(NumberFormatException ex) { electricalCost = 0; }
		ce.setElecCost(electricalCost);

		ce.setElecScope(params.get("electricalScope"));
		ce.setElecNotes(params.get("electricalNotes"));
		
		ce.setPlumbingProposalReq(Integer.parseInt(params.get("plumbingProposalReq")));
		ce.setPlumbingSubName(Integer.parseInt(params.get("plumbingSubName")));
		ce.setPlumbingStatus(Integer.parseInt(params.get("plumbingStatus")));
		
		Date plumbingSubmitDate = null;
		if(!params.get("plumbingSubmitDate").isEmpty())
			plumbingSubmitDate = formatter.parse(params.get("plumbingSubmitDate"));
		ce.setPlumbingSubmitDate(plumbingSubmitDate);
		
		double plumbingCost;
		try
		{
			 plumbingCost = Double.parseDouble(params.get("plumbingCost"));
		}catch(NumberFormatException ex) { plumbingCost = 0; }
		ce.setPlumbingCost(plumbingCost);

		ce.setPlumbingScope(params.get("plumbingScope"));
		ce.setPlumbingNotes(params.get("plumbingNotes"));
		
		ce.setGasProposalReq(Integer.parseInt(params.get("gasProposalReq")));
		ce.setGasSubName(Integer.parseInt(params.get("gasSubName")));
		ce.setGasStatus(Integer.parseInt(params.get("gasStatus")));
		
		Date gasSubmitDate = null;
		if(!params.get("gasSubmitDate").isEmpty())
			gasSubmitDate = formatter.parse(params.get("gasSubmitDate"));
		ce.setGasSubmitDate(gasSubmitDate);
		
		double gasCost;
		try
		{
			 gasCost = Double.parseDouble(params.get("gasCost"));
		}catch(NumberFormatException ex) { gasCost = 0; }
		ce.setGasCost(gasCost);

		ce.setGasScope(params.get("gasScope"));
		ce.setGasNotes(params.get("gasNotes"));
		
		ce.setSprinklerProposalReq(Integer.parseInt(params.get("sprinklerProposalReq")));
		ce.setSprinklerSubName(Integer.parseInt(params.get("sprinklerSubName")));
		ce.setSprinklerStatus(Integer.parseInt(params.get("sprinklerStatus")));
		
		Date sprinklerSubmitDate = null;
		if(!params.get("sprinklerSubmitDate").isEmpty())
			sprinklerSubmitDate = formatter.parse(params.get("sprinklerSubmitDate"));
		ce.setSprinklerSubmitDate(sprinklerSubmitDate);
		
		double sprinklerCost;
		try
		{
			 sprinklerCost = Double.parseDouble(params.get("sprinklerCost"));
		}catch(NumberFormatException ex) { sprinklerCost = 0; }
		ce.setSprinklerCost(sprinklerCost);

		ce.setSprinklerScope(params.get("sprinklerScope"));
		ce.setSprinklerNotes(params.get("sprinklerNotes"));
		
		ce.setFireAlarmProposalReq(Integer.parseInt(params.get("fireAlarmProposalReq")));
		ce.setFireAlarmSubName(Integer.parseInt(params.get("fireAlarmSubName")));
		ce.setFireAlarmStatus(Integer.parseInt(params.get("fireAlarmStatus")));
		
		Date fireAlarmSubmitDate = null;
		if(!params.get("fireAlarmSubmitDate").isEmpty())
			fireAlarmSubmitDate = formatter.parse(params.get("fireAlarmSubmitDate"));
		ce.setFireAlarmSubmitDate(fireAlarmSubmitDate);
		
		double fireAlarmCost;
		try
		{
			 fireAlarmCost = Double.parseDouble(params.get("fireAlarmCost"));
		}catch(NumberFormatException ex) { fireAlarmCost = 0; }
		ce.setFireAlarmCost(fireAlarmCost);

		ce.setFireAlarmScope(params.get("fireAlarmScope"));
		ce.setFireAlarmNotes(params.get("fireAlarmNotes"));
		
		ce.setCarpenterProposalReq(Integer.parseInt(params.get("carpenterProposalReq")));
		ce.setCarpenterSubName(Integer.parseInt(params.get("carpenterSubName")));
		ce.setCarpenterStatus(Integer.parseInt(params.get("carpenterStatus")));
		
		Date carpenterSubmitDate = null;
		if(!params.get("carpenterSubmitDate").isEmpty())
			carpenterSubmitDate = formatter.parse(params.get("carpenterSubmitDate"));
		ce.setCarpenterSubmitDate(carpenterSubmitDate);
		
		double carpenterCost;
		try
		{
			 carpenterCost = Double.parseDouble(params.get("carpenterCost"));
		}catch(NumberFormatException ex) { carpenterCost = 0; }
		ce.setCarpenterCost(carpenterCost);

		ce.setCarpenterScope(params.get("carpenterScope"));
		ce.setCarpenterNotes(params.get("carpenterNotes"));
		
		ce.setEquipProposalReq(Integer.parseInt(params.get("equipmentProposalReq")));
		ce.setEquipSubName(Integer.parseInt(params.get("equipmentSubName")));
		ce.setEquipStatus(Integer.parseInt(params.get("equipmentStatus")));
		
		Date equipmentSubmitDate = null;
		if(!params.get("equipmentSubmitDate").isEmpty())
			equipmentSubmitDate = formatter.parse(params.get("equipmentSubmitDate"));
		ce.setEquipSubmitDate(equipmentSubmitDate);
		
		double equipmentCost;
		try
		{
			 equipmentCost = Double.parseDouble(params.get("equipmentCost"));
		}catch(NumberFormatException ex) { equipmentCost = 0; }
		ce.setEquipCost(equipmentCost);

		ce.setEquipScope(params.get("equipmentScope"));
		ce.setEquipNotes(params.get("equipmentNotes"));
		
		ce.setSupervisionProposalReq(Integer.parseInt(params.get("supervisionProposalReq")));
		ce.setSupervisionSubName(Integer.parseInt(params.get("supervisionSubName")));
		ce.setSupervisionStatus(Integer.parseInt(params.get("supervisionStatus")));
		
		Date supervisionSubmitDate = null;
		if(!params.get("supervisionSubmitDate").isEmpty())
			supervisionSubmitDate = formatter.parse(params.get("supervisionSubmitDate"));
		ce.setSupervisionSubmitDate(supervisionSubmitDate);
		
		double supervisionCost;
		try
		{
			 supervisionCost = Double.parseDouble(params.get("supervisionCost"));
		}catch(NumberFormatException ex) { supervisionCost = 0; }
		ce.setSupervisionCost(supervisionCost);

		ce.setSupervisionScope(params.get("supervisionScope"));
		ce.setSupervisionNotes(params.get("supervisionNotes"));
		
		ce.setProfitProposalReq(Integer.parseInt(params.get("profitProposalReq")));
		ce.setProfitSubName(Integer.parseInt(params.get("profitSubName")));
		ce.setProfitStatus(Integer.parseInt(params.get("profitStatus")));
		
		Date profitSubmitDate = null;
		if(!params.get("profitSubmitDate").isEmpty())
			profitSubmitDate = formatter.parse(params.get("profitSubmitDate"));
		ce.setProfitSubmitDate(profitSubmitDate);
		
		double profitCost;
		try
		{
			 profitCost = Double.parseDouble(params.get("profitCost"));
		}catch(NumberFormatException ex) { profitCost = 0; }
		ce.setProfitCost(profitCost);

		ce.setProfitScope(params.get("profitScope"));
		ce.setProfitNotes(params.get("profitNotes"));
		
		ce.setTaxesProposalReq(Integer.parseInt(params.get("taxesProposalReq")));
		ce.setTaxesSubName(Integer.parseInt(params.get("taxesSubName")));
		ce.setTaxesStatus(Integer.parseInt(params.get("taxesStatus")));
		
		Date taxesSubmitDate = null;
		if(!params.get("taxesSubmitDate").isEmpty())
			taxesSubmitDate = formatter.parse(params.get("taxesSubmitDate"));
		ce.setTaxesSubmitDate(taxesSubmitDate);
		
		double taxesCost;
		try
		{
			 taxesCost = Double.parseDouble(params.get("taxesCost"));
		}catch(NumberFormatException ex) { taxesCost = 0; }
		ce.setTaxesCost(taxesCost);

		ce.setTaxesScope(params.get("taxesScope"));
		ce.setTaxesNotes(params.get("taxesNotes"));
		
		ce.setTotalProposalReq(Integer.parseInt(params.get("totalProposalReq")));
		ce.setTotalSubName(Integer.parseInt(params.get("totalSubName")));
		ce.setTotalStatus(Integer.parseInt(params.get("totalStatus")));
		
		Date totalSubmitDate = null;
		if(!params.get("totalSubmitDate").isEmpty())
			totalSubmitDate = formatter.parse(params.get("totalSubmitDate"));
		ce.setTotalSubmitDate(totalSubmitDate);
		
		double totalCost;
		try
		{
			 totalCost = Double.parseDouble(params.get("totalCost"));
		}catch(NumberFormatException ex) { totalCost = 0; }
		ce.setTotalCost(totalCost);

		ce.setTotalScope(params.get("totalScope"));
		ce.setTotalNotes(params.get("totalNotes"));
	}	
}
