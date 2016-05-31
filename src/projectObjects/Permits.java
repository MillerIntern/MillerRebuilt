package projectObjects;

import java.util.Date;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Entity
@Embeddable
public class Permits extends ProjectObject
{
	
	private Date building;
	private Date mechanical;
	private Date electrical;
	private Date plumbing;
	private Date fire_sprinkler;
	private Date fire_alarm;
	private Date low_voltage;
	
	public Permits()
	{
		
	}
	
	public Permits(Date buildingPermitDate,	Date mechanicalPermitDate, Date electricalPermitDate, Date plumbingPermitDate, Date fireSprinklerDate,
				   Date fireAlarmPermitDate,Date lowVoltagePermitDate)
	 {
		this.building = buildingPermitDate ;
		this.mechanical = mechanicalPermitDate;
		this.electrical = electricalPermitDate;
		this.plumbing = plumbingPermitDate;
		this.fire_sprinkler = fireSprinklerDate;
		this.fire_alarm = fireAlarmPermitDate;
		this.low_voltage = lowVoltagePermitDate;
		
	  }

	public void setBuildingPermitDate( Date a)
	{
		this.building = a;
	}
	
	public Date getBuildingPermitDate()
	{
		return this.building;
	}
	
	public void setMechanicalPermitDate(Date a)
	{
		this.mechanical = a;
	}
	
	public Date getMechanicalPermitDate()
	{
		return this.mechanical;
	}
	
	public void setElectricalPermitDate(Date a)
	{
		this.electrical = a;
	}
	
	public Date getElectricalPermitDate()
	{
		return this.electrical;
	}
	
	public void setPlumbingPermitDate(Date a)
	{
		this.plumbing= a;
	}
	

	
	public Date getPlumbingPermitDate()
	{
		return this.plumbing;
	}
	
	public void setFireSprinklerDate(Date a)
	{
		this.fire_sprinkler = a;
	}
	
	public Date getFireSprinklerDate()
	{
		return this.fire_sprinkler;
	}

	public void setFireAlarmPermitDate(Date a)
	{
		this.fire_alarm = a;
	}
	
	public Date getFireAlarmPermitDate()
	{
		return this.fire_alarm;
	}

	public void setLowVoltagePermitDate(Date a)
	{
		this.low_voltage = a;
	}
	
	public Date getLowVoltagePermitDate()
	{
		return this.low_voltage;
	}
	

	
	
	
	
	
}
