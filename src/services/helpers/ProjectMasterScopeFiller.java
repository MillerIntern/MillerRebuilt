package services.helpers;

import java.text.ParseException;
import java.util.Map;

import projectObjects.ProjectMasterScope;

public class ProjectMasterScopeFiller {
	
	public synchronized static void fillProjectMasterScope(ProjectMasterScope pms,  Map<String, String>params) throws ParseException
	{
		System.out.println("fill proj master scope");	
		System.out.println(Long.parseLong(params.get("projectID")));
	
		Long projId;
		try {
			projId = Long.parseLong(params.get("projectID"));
			pms.setProjId(projId);
		} catch (NumberFormatException e) {
			pms.setProjId(null);
		}
		
		int projItem;
		try {
		    projItem = Integer.parseInt(params.get("projItem"));
			pms.setProjItem(projItem);
		} catch (NumberFormatException e) {
			pms.setProjItem(0);
		}
		
		int item;
		try {
		    item = Integer.parseInt(params.get("projItem"));
			pms.setItem(item);
		} catch (NumberFormatException e) {
			pms.setItem(0);
		}
		
		int proj;
		try {
		    proj = Integer.parseInt(params.get("proj"));
			pms.setProj(proj);
		} catch (NumberFormatException e) {
			pms.setProj(0);
		}
		
		pms.setItem1(params.get("i1"));
		pms.setItem2(params.get("i2"));
		pms.setItem3(params.get("i3"));
		pms.setItem4(params.get("i4"));
		pms.setItem5(params.get("i5"));
		pms.setItem6(params.get("i6"));
		pms.setItem7(params.get("i7"));
		pms.setItem8(params.get("i8"));
		pms.setItem9(params.get("i9"));
		pms.setItem10(params.get("i10"));
		
		int quan1;
		try {
			quan1 = Integer.parseInt(params.get("q1"));
			System.out.println("" + quan1);
			pms.setQuantity1(quan1);
		} catch (NumberFormatException e) {
			pms.setQuantity1(0);
		}
		
		int quan2;
		try {
			quan2 = Integer.parseInt(params.get("q2"));
			pms.setQuantity2(quan2);
		} catch (NumberFormatException e) {
			pms.setQuantity2(0);
		}
		
		int quan3;
		try {
			quan3 = Integer.parseInt(params.get("q3"));
			pms.setQuantity3(quan3);
		} catch (NumberFormatException e) {
			pms.setQuantity3(0);
		}
		
		int quan4;
		try {
			quan4 = Integer.parseInt(params.get("q4"));
			pms.setQuantity4(quan4);
		} catch (NumberFormatException e) {
			pms.setQuantity4(0);
		}
		
		int quan5;
		try {
			quan5 = Integer.parseInt(params.get("q5"));
			pms.setQuantity5(quan5);
		} catch (NumberFormatException e) {
			pms.setQuantity5(0);
		}
		
		int quan6;
		try {
			quan6 = Integer.parseInt(params.get("q6"));
			pms.setQuantity6(quan6);
		} catch (NumberFormatException e) {
			pms.setQuantity6(0);
		}
		
		
		int quan7;
		try {
			quan7 = Integer.parseInt(params.get("q7"));
			pms.setQuantity7(quan7);
		} catch (NumberFormatException e) {
			pms.setQuantity7(0);
		}
		
		int quan8;
		try {
			quan8 = Integer.parseInt(params.get("q8"));
			pms.setQuantity8(quan8);
		} catch (NumberFormatException e) {
			pms.setQuantity8(0);
		}
		
		int quan9;
		try {
			quan9 = Integer.parseInt(params.get("q9"));
			pms.setQuantity9(quan9);
		} catch (NumberFormatException e) {
			pms.setQuantity9(0);
		}
		
		int quan10;
		try {
			quan10 = Integer.parseInt(params.get("q10"));
			pms.setQuantity10(quan10);
		} catch (NumberFormatException e) {
			pms.setQuantity10(0);
		}
		
	}
}
