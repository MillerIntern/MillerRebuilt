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
public class HvacCloseout extends ProjectObject {
	
	@ManyToOne
	@JoinColumn(name = "alarmForm_id")
	private CloseoutInfo alarmForm;
	
	@ManyToOne
	@JoinColumn(name = "hvacShutdown_id")
	private CloseoutInfo hvacShutdown;
	
	public HvacCloseout(CloseoutInfo aF, CloseoutInfo hS)
	{
		this.alarmForm = aF;
		this.hvacShutdown = hS;
	}
	
	public HvacCloseout()
	{
		this.alarmForm = null;
		this.hvacShutdown = null;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getAlarmForm()
	{
		return this.alarmForm;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getHvacShutdown()
	{
		return this.hvacShutdown;
	}
	
	public void setAlarmForm(CloseoutInfo af)
	{
		 this.alarmForm = af;
	}
	
	public void setHvacShutdown(CloseoutInfo hS)
	{
		 this.hvacShutdown = hS;
	}
}
