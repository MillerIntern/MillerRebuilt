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
public class RefrigCloseout extends ProjectObject {
	
	@ManyToOne
	@JoinColumn(name = "airGas_id")
	private CloseoutInfo airGas;
	
	@ManyToOne
	@JoinColumn(name = "hvacForm_id")
	private CloseoutInfo hvacForm;
	
	@ManyToOne
	@JoinColumn(name = "salvage_id")
	private CloseoutInfo salvage;
	
	public RefrigCloseout(CloseoutInfo aG, CloseoutInfo hF, CloseoutInfo s)
	{
		this.airGas = aG;
		this.hvacForm = hF;
		this.salvage = s;
	}
	
	public RefrigCloseout()
	{
		this.airGas = null;
		this.hvacForm = null;
		this.salvage = null;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getAirGas()
	{
		return this.airGas;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getHvacForm()
	{
		return this.hvacForm;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getSalvage()
	{
		return this.salvage;
	}
	
	public void setAirGas(CloseoutInfo aG)
	{
		 this.airGas = aG;
	}
	
	public void setHvacForm(CloseoutInfo hF)
	{
		 this.hvacForm = hF;
	}
	
	public void setSalvage(CloseoutInfo s)
	{
		 this.salvage = s;
	}
}
