package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import projectObjects.MasterScope;

public class MasterScopeFiller
{
	public synchronized static void fillMasterScope(MasterScope ms,  Map<String, String>params) throws ParseException
	{
		
		int projItem;
		try {
			projItem = Integer.parseInt(params.get("item"));
			ms.setProjItem(projItem);
			System.out.println(projItem);
		} catch (NumberFormatException e) {
			ms.setProjItem(0);
		}
		
		int item;
		try {
			item = Integer.parseInt(params.get("projectItem"));
			ms.setItem(item);
			System.out.println(item);
		} catch (NumberFormatException e) {
			ms.setItem(0);
		}
		
		ms.setItem1(params.get("item1"));
		ms.setItem2(params.get("item2"));
		ms.setItem3(params.get("item3"));
		ms.setItem4(params.get("item4"));
		ms.setItem5(params.get("item5"));
		ms.setItem6(params.get("item6"));
		ms.setItem7(params.get("item7"));
		ms.setItem8(params.get("item8"));
		ms.setItem9(params.get("item9"));
		ms.setItem10(params.get("item10"));
		
		
		int quan1;
		try {
			quan1 = Integer.parseInt(params.get("quantity1"));
			ms.setQuantity1(quan1);
		} catch (NumberFormatException e) {
			ms.setQuantity1(0);
		}
		
		int quan2;
		try {
			quan2 = Integer.parseInt(params.get("quantity2"));
			ms.setQuantity2(quan2);
		} catch (NumberFormatException e) {
			ms.setQuantity2(0);
		}
		
		int quan3;
		try {
			quan3 = Integer.parseInt(params.get("quantity3"));
			ms.setQuantity3(quan3);
		} catch (NumberFormatException e) {
			ms.setQuantity3(0);
		}
		
		int quan4;
		try {
			quan4 = Integer.parseInt(params.get("quantity4"));
			ms.setQuantity4(quan4);
		} catch (NumberFormatException e) {
			ms.setQuantity4(0);
		}
		
		int quan5;
		try {
			quan5 = Integer.parseInt(params.get("quantity5"));
			ms.setQuantity5(quan5);
		} catch (NumberFormatException e) {
			ms.setQuantity5(0);
		}
		
		int quan6;
		try {
			quan6 = Integer.parseInt(params.get("quantity6"));
			ms.setQuantity6(quan6);
		} catch (NumberFormatException e) {
			ms.setQuantity6(0);
		}
		
		
		int quan7;
		try {
			quan7 = Integer.parseInt(params.get("quantity7"));
			ms.setQuantity7(quan7);
		} catch (NumberFormatException e) {
			ms.setQuantity7(0);
		}
		
		int quan8;
		try {
			quan8 = Integer.parseInt(params.get("quantity8"));
			ms.setQuantity8(quan8);
		} catch (NumberFormatException e) {
			ms.setQuantity8(0);
		}
		
		int quan9;
		try {
			quan9 = Integer.parseInt(params.get("quantity9"));
			ms.setQuantity9(quan9);
		} catch (NumberFormatException e) {
			ms.setQuantity9(0);
		}
		
		int quan10;
		try {
			quan10 = Integer.parseInt(params.get("quantity10"));
			ms.setQuantity10(quan10);
		} catch (NumberFormatException e) {
			ms.setQuantity10(0);
		}
		
	}
}
