package projectObjects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
public class InspectionCloseout extends ProjectObject {
	
	@ManyToOne
	@JoinColumn(name = "mechanical_id")
	private CloseoutInfo mechancial;

	
	@ManyToOne
	@JoinColumn(name = "electric_id")
	private CloseoutInfo electric;
	
	@ManyToOne
	@JoinColumn(name = "plumbing_id")
	private CloseoutInfo plumbing;
	
	
	@ManyToOne
	@JoinColumn(name = "fireSprinkler_id")
	private CloseoutInfo fireSprinkler;
	
	@ManyToOne
	@JoinColumn(name = "ansul_id")
	private CloseoutInfo ansul;
	
	@ManyToOne
	@JoinColumn(name = "company_id")
	private CloseoutInfo building;
	
	public InspectionCloseout(CloseoutInfo m, CloseoutInfo e, CloseoutInfo p, CloseoutInfo fs, CloseoutInfo a, CloseoutInfo b)
	{
		this.mechancial = m;
		this.electric = e;
		this.plumbing = p;
		this.fireSprinkler = fs;
		this.ansul = a;
		this.building = b;
	}
	
	public InspectionCloseout()
	{
		this.mechancial = null;
		this.electric = null;
		this.plumbing = null;
		this.fireSprinkler = null;
		this.ansul = null;
		this.building = null;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getMechanical()
	{
		return this.mechancial;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getElectric()
	{
		return this.electric;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getPlumbing()
	{
		return this.plumbing;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getFireSprinkler()
	{
		return this.fireSprinkler;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getAnsul()
	{
		return this.ansul;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getBuilding()
	{
		return this.building;
	}
	
	public void setMechanical(CloseoutInfo m)
	{
		 this.mechancial = m;
	}
	
	public void setElectric(CloseoutInfo e)
	{
		 this.electric = e;
	}
	
	public void setPlumbing(CloseoutInfo p)
	{
		 this.plumbing = p;
	}
	
	public void setFireSprinkler(CloseoutInfo fs)
	{
		 this.fireSprinkler = fs;
	}
	
	public void setAnsul(CloseoutInfo a)
	{
		 this.ansul = a;
	}
	
	public void setBuilding(CloseoutInfo b)
	{
		 this.building = b;
	}
}
