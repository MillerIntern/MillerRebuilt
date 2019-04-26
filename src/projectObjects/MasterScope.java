package projectObjects;

public class MasterScope {
	
	
	private int projectItem;
	private String item1;
	private String item2;
	private String item3;
	private String item4;
	private String item5;
	private String item6;
	private String item7;
	private String item8;
	private String item9;
	private String item10;
	private int quantity1;
	private int quantity2;
	private int quantity3;
	private int quantity4;
	private int quantity5;
	private int quantity6;
	private int quantity7;
	private int quantity8;
	private int quantity9;
	private int quantity10;

	
	public MasterScope(int projItem, String item1, String item2, String item3, String item4, String item5, String item6, 
			           String item7, String item8, String item9, String item10, int quantity1, int quantity2, int quantity3,
			           int quantity4, int quantity5, int quantity6, int quantity7, int quantity8, int quantity9, int quantity10)
	{
	   	this.projectItem = projItem;
	   	this.item1 = item1;
	   	this.item2 = item2;
	   	this.item3 = item3;
	   	this.item4 = item4;
	   	this.item5 = item5;
	   	this.item6 = item6;
	   	this.item7 = item7;
	   	this.item8 = item8;
	   	this.item9 = item9;
	   	this.item10 = item10;
	   	this.quantity1 = quantity1;
	   	this.quantity2 = quantity2;
	   	this.quantity3 = quantity3;
	   	this.quantity4 = quantity4;
	   	this.quantity5 = quantity5;
	   	this.quantity6 = quantity6;
	   	this.quantity7 = quantity7;
	   	this.quantity8 = quantity8;
	   	this.quantity9 = quantity9;
	   	this.quantity10 = quantity10;
	}
	
	public MasterScope()
	{
	   	this.projectItem = 0;
	   	this.item1 = null;
	   	this.item2 = null;
	   	this.item3 = null;
	   	this.item4 = null;
	   	this.item5 = null;
	   	this.item6 = null;
	   	this.item7 = null;
	   	this.item8 = null;
	   	this.item9 = null;
	   	this.item10 = null;
	   	this.quantity1 = 0;
	   	this.quantity2 = 0;
	   	this.quantity3 = 0;
	   	this.quantity4 = 0;
	   	this.quantity5 = 0;
	   	this.quantity6 = 0;
	   	this.quantity7 = 0;
	   	this.quantity8 = 0;
	   	this.quantity9 = 0;
	   	this.quantity10 = 0;	
	}
	
	public synchronized int getProjItem()
	{
		return projectItem;
	}
	
	public synchronized void setProjItem(int item)
	{	
		this.projectItem = item;
	}
	
	public synchronized String getItem1()
	{
		return item1;
	}
	
	public synchronized void setItem1(String item)
	{	
		this.item1 = item;
	}
	
	public synchronized String getItem2()
	{
		return item2;
	}
	
	public synchronized void setItem2(String item)
	{	
		this.item2 = item;
	}
	
	public synchronized String getItem3()
	{
		return item3;
	}
	
	public synchronized void setItem3(String item)
	{	
		this.item3 = item;
	}
	
	public synchronized String getItem4()
	{
		return item4;
	}
	
	public synchronized void setItem4(String item)
	{	
		this.item4 = item;
	}
	
	public synchronized String getItem5()
	{
		return item5;
	}
	
	public synchronized void setItem5(String item)
	{	
		this.item5 = item;
	}
	
	public synchronized String getItem6()
	{
		return item6;
	}
	
	public synchronized void setItem6(String item)
	{	
		this.item6 = item;
	}
	
	public synchronized String getItem7()
	{
		return item7;
	}
	
	public synchronized void setItem7(String item)
	{	
		this.item7 = item;
	}
	
	public synchronized String getItem8()
	{
		return item8;
	}
	
	public synchronized void setItem8(String item)
	{	
		this.item8 = item;
	}
	
	public synchronized String getItem9()
	{
		return item9;
	}
	
	public synchronized void setItem9(String item)
	{	
		this.item9 = item;
	}
	
	public synchronized String getItem10()
	{
		return item10;
	}
	
	public synchronized void setItem10(String item)
	{	
		this.item10 = item;
	}
	
	public synchronized int getQuantity1()
	{
		return quantity1;
	}
	
	public synchronized void setQuantity1(int quantity)
	{	
		this.quantity1 = quantity;
	}
	
	public synchronized int getQuantity2()
	{
		return quantity2;
	}
	
	public synchronized void setQuantity2(int quantity)
	{	
		this.quantity2 = quantity;
	}
	public synchronized int getQuantity3()
	{
		return quantity3;
	}
	
	public synchronized void setQuantity3(int quantity)
	{	
		this.quantity3 = quantity;
	}
	
	public synchronized int getQuantity4()
	{
		return quantity4;
	}
	
	public synchronized void setQuantity4(int quantity)
	{	
		this.quantity4 = quantity;
	}
	
	public synchronized int getQuantity5()
	{
		return quantity5;
	}
	
	public synchronized void setQuantity5(int quantity)
	{	
		this.quantity5 = quantity;
	}
	
	public synchronized int getQuantity6()
	{
		return quantity6;
	}
	
	public synchronized void setQuantity6(int quantity)
	{	
		this.quantity6 = quantity;
	}
	
	public synchronized int getQuantity7()
	{
		return quantity7;
	}
	
	public synchronized void setQuantity7(int quantity)
	{	
		this.quantity7 = quantity;
	}
	
	public synchronized int getQuantity8()
	{
		return quantity8;
	}
	
	public synchronized void setQuantity8(int quantity)
	{	
		this.quantity8 = quantity;
	}
	
	public synchronized int getQuantity9()
	{
		return quantity9;
	}
	
	public synchronized void setQuantity9(int quantity)
	{	
		this.quantity9 = quantity;
	}
	
	public synchronized int getQuantity10()
	{
		return quantity10;
	}
	
	public synchronized void setQuantity10(int quantity)
	{	
		this.quantity10 = quantity;
	}
}