package projectObjects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ProjectMasterScope {
	
	@Id
	@GeneratedValue
	
	private int projItem;
	private Long projId;
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
	private int proj;
	private int item;

	public ProjectMasterScope(int item, Long id, String i1, String i2, String i3, String i4, String i5, String i6,
			                  String i7, String i8, String i9, String i10, int q1, int q2, int q3, int q4, int q5,
			                  int q6, int q7, int q8, int q9, int q10, int proj, int i)
	{
		this.projItem = item;
		this.projId = id;
		this.item1 = i1;
		this.item2 = i2;
		this.item3 = i3;
		this.item4 = i4;
		this.item5 = i5;
		this.item6 = i6;
		this.item7 = i7;
	    this.item8 = i8;
	    this.item9 = i9;
	    this.item10 = i10;
		this.quantity1 = q1;
		this.quantity2 = q2;
		this.quantity3 = q3;
		this.quantity4 = q4;
		this.quantity5 = q5;
		this.quantity6 = q6;
		this.quantity7 = q7;
		this.quantity8 = q8;
		this.quantity9 = q9;
		this.quantity10 = q10;
		this.proj = proj;
		this.item = i;
	}
	
	public ProjectMasterScope()
	{
		this.projItem = 0;
		this.projId = null;
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
		this.proj = 0;
		this.item = 0;
	}
	
	public synchronized int getProjItem()
	{
		return projItem;
	}
	
	public synchronized void setProjItem(int item)
	{
		this.projItem = item;
	}
	
	public synchronized int getItem()
	{
		return item;
	}
	
	public synchronized void setItem(int item)
	{
		this.item = item;
	}
	
	public synchronized Long getProjId()
	{
		return projId;
	}
	
	public synchronized void setProjId(Long id)
	{
		this.projId = id;
	}
	
	
	public synchronized int getProj()
	{
		return proj;
	}
	
	public synchronized void setProj(int id)
	{
		this.proj = id;
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
	
	public synchronized void setQuantity1(int q)
	{
		this.quantity1 = q;
	}
	
	public synchronized int getQuantity2()
	{
		return quantity2;
	}
	
	public synchronized void setQuantity2(int q)
	{
		this.quantity2 = q;
	}
	
	public synchronized int getQuantity3()
	{
		return quantity3;
	}
	
	public synchronized void setQuantity3(int q)
	{
		this.quantity3 = q;
	}
	
	public synchronized int getQuantity4()
	{
		return quantity4;
	}
	
	public synchronized void setQuantity4(int q)
	{
		this.quantity4 = q;
	}
	
	public synchronized int getQuantity5()
	{
		return quantity5;
	}
	
	public synchronized void setQuantity5(int q)
	{
		this.quantity5 = q;
	}
	
	public synchronized int getQuantity6()
	{
		return quantity6;
	}
	
	public synchronized void setQuantity6(int q)
	{
		this.quantity6 = q;
	}
	
	public synchronized int getQuantity7()
	{
		return quantity7;
	}
	
	public synchronized void setQuantity7(int q)
	{
		this.quantity7 = q;
	}
	
	public synchronized int getQuantity8()
	{
		return quantity8;
	}
	
	public synchronized void setQuantity8(int q)
	{
		this.quantity8 = q;
	}
	
	public synchronized int getQuantity9()
	{
		return quantity9;
	}
	
	public synchronized void setQuantity9(int q)
	{
		this.quantity9 = q;
	}
	
	public synchronized int getQuantity10()
	{
		return quantity10;
	}
	
	public synchronized void setQuantity10(int q)
	{
		this.quantity10 = q;
	}
}

