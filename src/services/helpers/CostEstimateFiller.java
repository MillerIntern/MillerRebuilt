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

		System.out.println(Long.parseLong(params.get("projectID")));
	
		
		Long proj;
		try {
			proj = Long.parseLong(params.get("projectID"));
			ce.setProject(proj);
		} catch (NumberFormatException e) {
			ce.setProject(null);
		}
		
		
		int project;
		try {
		    project = Integer.parseInt(params.get("projectID"));
			ce.setProj(project);
		} catch (NumberFormatException e) {
			ce.setProj(0);
		}
		
		int projItem;
		try {
		    projItem = Integer.parseInt(params.get("projItem"));
			ce.setProjItem(projItem);
		} catch (NumberFormatException e) {
			ce.setProjItem(0);
		}
		
		
		int genConProposalReq;
		try {
			genConProposalReq = Integer.parseInt(params.get("genConProposalReq"));
			ce.setGenConProposalReq(genConProposalReq);
		} catch (NumberFormatException e) {
			ce.setGenConProposalReq(0);
		}
		
		int genConSubName;
		try {
			genConSubName = Integer.parseInt(params.get("genConSubName"));
			ce.setGenConSubName(genConSubName);
		} catch (NumberFormatException e) {
			ce.setGenConSubName(0);
		}
		
		int genConStatus;
		try {
			genConStatus = Integer.parseInt(params.get("genConStatus"));
			ce.setGenConStatus(genConStatus);
		} catch (NumberFormatException e) {
			ce.setGenConStatus(0);
		}
		
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
		
		
		
		
		int refrigProposalReq;
		try {
			refrigProposalReq = Integer.parseInt(params.get("refrigProposalReq"));
			ce.setRefrigProposalReq(refrigProposalReq);
		} catch (NumberFormatException e) {
			ce.setRefrigProposalReq(0);
		}
		
		int refrigSubName;
		try {
			refrigSubName = Integer.parseInt(params.get("refrigSubName"));
			ce.setRefrigSubName(refrigSubName);
		} catch (NumberFormatException e) {
			ce.setRefrigSubName(0);
		}
		
		int refrigStatus;
		try {
			refrigStatus = Integer.parseInt(params.get("refrigStatus"));
			ce.setRefrigStatus(refrigStatus);
		} catch (NumberFormatException e) {
			ce.setRefrigStatus(0);
		}
		
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
		
		
		
		
		int mechProposalReq;
		try {
			mechProposalReq = Integer.parseInt(params.get("mechanicalProposalReq"));
			ce.setMechProposalReq(mechProposalReq);
		} catch (NumberFormatException e) {
			ce.setMechProposalReq(0);
		}
		
		int mechSubName;
		try {
			mechSubName = Integer.parseInt(params.get("mechanicalSubName"));
			ce.setMechSubName(mechSubName);
		} catch (NumberFormatException e) {
			ce.setMechSubName(0);
		}
		
		int mechStatus;
		try {
			mechStatus = Integer.parseInt(params.get("mechanicalStatus"));
			ce.setMechStatus(mechStatus);
		} catch (NumberFormatException e) {
			ce.setMechStatus(0);
		}
		
		Date mechanicalSubmitDate = null;
		if(!params.get("mechanicalSubmitDate").isEmpty())
			mechanicalSubmitDate = formatter.parse(params.get("mechanicalSubmitDate"));
		ce.setMechSubmitDate(mechanicalSubmitDate);
		
		double mechanicalCost;
		try
		{
			 mechanicalCost = Double.parseDouble(params.get("mechanicalCost"));
		}catch(NumberFormatException ex) { mechanicalCost = 0; }
		ce.setMechCost(mechanicalCost);

		ce.setMechScope(params.get("mechanicalScope"));
		ce.setMechNotes(params.get("mechanicalNotes"));
		
		
		
		
		int elecProposalReq;
		try {
			elecProposalReq = Integer.parseInt(params.get("electricalProposalReq"));
			ce.setElecProposalReq(elecProposalReq);
		} catch (NumberFormatException e) {
			ce.setElecProposalReq(0);
		}
		
		int elecSubName;
		try {
			elecSubName = Integer.parseInt(params.get("electricalSubName"));
			ce.setElecSubName(elecSubName);
		} catch (NumberFormatException e) {
			ce.setElecSubName(0);
		}
		
		int elecStatus;
		try {
			elecStatus = Integer.parseInt(params.get("electricalStatus"));
			ce.setElecStatus(elecStatus);
		} catch (NumberFormatException e) {
			ce.setElecStatus(0);
		}
		
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
		
		
		
		
		int plumProposalReq;
		try {
			plumProposalReq = Integer.parseInt(params.get("plumbingProposalReq"));
			ce.setPlumbingProposalReq(plumProposalReq);
		} catch (NumberFormatException e) {
			ce.setPlumbingProposalReq(0);
		}
		
		int plumSubName;
		try {
			plumSubName = Integer.parseInt(params.get("plumbingSubName"));
			ce.setPlumbingSubName(plumSubName);
		} catch (NumberFormatException e) {
			ce.setPlumbingSubName(0);
		}
		
		int plumStatus;
		try {
			plumStatus = Integer.parseInt(params.get("plumbingStatus"));
			ce.setPlumbingStatus(plumStatus);
		} catch (NumberFormatException e) {
			ce.setPlumbingStatus(0);
		}
		
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
		
		
		
		
		int gasProposalReq;
		try {
			gasProposalReq = Integer.parseInt(params.get("gasProposalReq"));
			ce.setGasProposalReq(gasProposalReq);
		} catch (NumberFormatException e) {
			ce.setGasProposalReq(0);
		}
		
		int gasSubName;
		try {
			gasSubName = Integer.parseInt(params.get("gasSubName"));
			ce.setGasSubName(gasSubName);
		} catch (NumberFormatException e) {
			ce.setGasSubName(0);
		}
		
		int gasStatus;
		try {
			gasStatus = Integer.parseInt(params.get("gasStatus"));
			ce.setGasStatus(gasStatus);
		} catch (NumberFormatException e) {
			ce.setGasStatus(0);
		}
		
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
		
		
		
		
		int sprinklerProposalReq;
		try {
			sprinklerProposalReq = Integer.parseInt(params.get("sprinklerProposalReq"));
			ce.setSprinklerProposalReq(sprinklerProposalReq);
		} catch (NumberFormatException e) {
			ce.setSprinklerProposalReq(0);
		}
		
		int sprinklerSubName;
		try {
			sprinklerSubName = Integer.parseInt(params.get("sprinklerSubName"));
			ce.setSprinklerSubName(sprinklerSubName);
		} catch (NumberFormatException e) {
			ce.setSprinklerSubName(0);
		}
		
		int sprinklerStatus;
		try {
			sprinklerStatus = Integer.parseInt(params.get("sprinklerStatus"));
			ce.setSprinklerStatus(sprinklerStatus);
		} catch (NumberFormatException e) {
			ce.setSprinklerStatus(0);
		}
		
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
		
		
		
		
		int fireProposalReq;
		try {
			fireProposalReq = Integer.parseInt(params.get("fireAlarmProposalReq"));
			ce.setFireAlarmProposalReq(fireProposalReq);
		} catch (NumberFormatException e) {
			ce.setFireAlarmProposalReq(0);
		}
		
		int fireSubName;
		try {
			fireSubName = Integer.parseInt(params.get("fireAlarmSubName"));
			ce.setFireAlarmSubName(fireSubName);
		} catch (NumberFormatException e) {
			ce.setFireAlarmSubName(0);
		}
		
		int fireStatus;
		try {
			fireStatus = Integer.parseInt(params.get("fireAlarmStatus"));
			ce.setFireAlarmStatus(fireStatus);
		} catch (NumberFormatException e) {
			ce.setFireAlarmStatus(0);
		}
		
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
		
		
		
		
		int carpProposalReq;
		try {
			carpProposalReq = Integer.parseInt(params.get("carpenterProposalReq"));
			ce.setCarpenterProposalReq(carpProposalReq);
		} catch (NumberFormatException e) {
			ce.setCarpenterProposalReq(0);
		}
		
		int carpSubName;
		try {
			carpSubName = Integer.parseInt(params.get("carpenterSubName"));
			ce.setCarpenterSubName(carpSubName);
		} catch (NumberFormatException e) {
			ce.setCarpenterSubName(0);
		}
		
		int carpStatus;
		try {
			carpStatus = Integer.parseInt(params.get("carpenterStatus"));
			ce.setCarpenterStatus(carpStatus);
		} catch (NumberFormatException e) {
			ce.setCarpenterStatus(0);
		}
		
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
		
		
		
		
		int equipProposalReq;
		try {
			equipProposalReq = Integer.parseInt(params.get("equipmentProposalReq"));
			ce.setEquipProposalReq(equipProposalReq);
		} catch (NumberFormatException e) {
			ce.setEquipProposalReq(0);
		}
		
		int equipSubName;
		try {
			equipSubName = Integer.parseInt(params.get("equipmentSubName"));
			ce.setEquipSubName(equipSubName);
		} catch (NumberFormatException e) {
			ce.setEquipSubName(0);
		}
		
		int equipStatus;
		try {
			equipStatus = Integer.parseInt(params.get("equipmentStatus"));
			ce.setEquipStatus(equipStatus);
		} catch (NumberFormatException e) {
			ce.setEquipStatus(0);
		}
		
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
		
		
		
		
		int superProposalReq;
		try {
			superProposalReq = Integer.parseInt(params.get("supervisionProposalReq"));
			ce.setSupervisionProposalReq(superProposalReq);
		} catch (NumberFormatException e) {
			ce.setSupervisionProposalReq(0);
		}
		
		int superSubName;
		try {
			superSubName = Integer.parseInt(params.get("supervisionSubName"));
			ce.setSupervisionSubName(superSubName);
		} catch (NumberFormatException e) {
			ce.setSupervisionSubName(0);
		}
		
		int superStatus;
		try {
			superStatus = Integer.parseInt(params.get("supervisionStatus"));
			ce.setSupervisionStatus(superStatus);
		} catch (NumberFormatException e) {
			ce.setSupervisionStatus(0);
		}
		
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
		
		
		
		
		int profitProposalReq;
		try {
			profitProposalReq = Integer.parseInt(params.get("profitProposalReq"));
			ce.setProfitProposalReq(profitProposalReq);
		} catch (NumberFormatException e) {
			ce.setProfitProposalReq(0);
		}
		
		int profitSubName;
		try {
			profitSubName = Integer.parseInt(params.get("profitSubName"));
			ce.setProfitSubName(profitSubName);
		} catch (NumberFormatException e) {
			ce.setProfitSubName(0);
		}
		
		int profitStatus;
		try {
			profitStatus = Integer.parseInt(params.get("profitStatus"));
			ce.setProfitStatus(profitStatus);
		} catch (NumberFormatException e) {
			ce.setProfitStatus(0);
		}
		
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
		
		
		
		
		int taxProposalReq;
		try {
			taxProposalReq = Integer.parseInt(params.get("taxesProposalReq"));
			ce.setTaxesProposalReq(taxProposalReq);
		} catch (NumberFormatException e) {
			ce.setTaxesProposalReq(0);
		}
		
		int taxSubName;
		try {
			taxSubName = Integer.parseInt(params.get("taxesSubName"));
			ce.setTaxesSubName(taxSubName);
		} catch (NumberFormatException e) {
			ce.setTaxesSubName(0);
		}
		
		int taxStatus;
		try {
			taxStatus = Integer.parseInt(params.get("taxesStatus"));
			ce.setTaxesStatus(taxStatus);
		} catch (NumberFormatException e) {
			ce.setTaxesStatus(0);
		}
		
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
		
		
		
		
		int totalProposalReq;
		try {
			totalProposalReq = Integer.parseInt(params.get("totalProposalReq"));
			ce.setTotalProposalReq(totalProposalReq);
		} catch (NumberFormatException e) {
			ce.setTotalProposalReq(0);
		}
		
		int totalSubName;
		try {
			totalSubName = Integer.parseInt(params.get("totalSubName"));
			ce.setTotalSubName(totalSubName);
		} catch (NumberFormatException e) {
			ce.setTotalSubName(0);
		}
		
		int totalStatus;
		try {
			totalStatus = Integer.parseInt(params.get("totalStatus"));
			ce.setTotalStatus(totalStatus);
		} catch (NumberFormatException e) {
			ce.setTotalStatus(0);
		}
		
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
