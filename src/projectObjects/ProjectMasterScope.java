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
	private boolean item1;
	private boolean item2;
	private boolean item3;
	private boolean item4;
	private boolean item5;
	private boolean item6;
	private boolean item7;
	private boolean item8;
	private boolean item9;
	private boolean item10;
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

	public ProjectMasterScope(int item, Long id, boolean i1, boolean i2, boolean i3, boolean i4, boolean i5, boolean i6,
			                  boolean i7, boolean i8, boolean i9, boolean i10, int q1, int q2, int q3, int q4, int q5,
			                  int q6, int q7, int q8, int q9, int q10)
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
	}
	
	public ProjectMasterScope()
	{
		this.projItem = 0;
		this.projId = null;
		this.item1 = false;
		this.item2 = false;
		this.item3 = false;
		this.item4 = false;
		this.item5 = false;
		this.item6 = false;
		this.item7 = false;
	    this.item8 = false;
	    this.item9 = false;
	    this.item10 = false;
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
		return projItem;
	}
	
	public synchronized void setProjItem(int item)
	{
		this.projItem = item;
	}
	
	public synchronized Long getProjId()
	{
		return projId;
	}
	
	public synchronized void setProjId(Long id)
	{
		this.projId = id;
	}
	
	public synchronized boolean getItem1()
	{
		return item1;
	}
	
	public synchronized void setItem1(boolean item)
	{
		this.item1 = item;
	}
	
	public synchronized boolean getItem2()
	{
		return item2;
	}
	
	public synchronized void setItem2(boolean item)
	{
		this.item2 = item;
	}
	
	public synchronized boolean getItem3()
	{
		return item3;
	}
	
	public synchronized void setItem3(boolean item)
	{
		this.item3 = item;
	}
	
	public synchronized boolean getItem4()
	{
		return item4;
	}
	
	public synchronized void setItem4(boolean item)
	{
		this.item4 = item;
	}
	
	public synchronized boolean getItem5()
	{
		return item5;
	}
	
	public synchronized void setItem5(boolean item)
	{
		this.item5 = item;
	}
	
	public synchronized boolean getItem6()
	{
		return item6;
	}
	
	public synchronized void setItem6(boolean item)
	{
		this.item6 = item;
	}
	
	public synchronized boolean getItem7()
	{
		return item7;
	}
	
	public synchronized void setItem7(boolean item)
	{
		this.item7 = item;
	}
	
	public synchronized boolean getItem8()
	{
		return item8;
	}
	
	public synchronized void setItem8(boolean item)
	{
		this.item8 = item;
	}
	
	public synchronized boolean getItem9()
	{
		return item9;
	}
	
	public synchronized void setItem9(boolean item)
	{
		this.item9 = item;
	}
	
	public synchronized boolean getItem10()
	{
		return item10;
	}
	
	public synchronized void setItem10(boolean item)
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
		this.quantity1 = 8;
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

