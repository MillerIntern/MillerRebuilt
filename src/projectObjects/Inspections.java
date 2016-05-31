package projectObjects;

import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Entity
@Embeddable
public class Inspections extends ProjectObject{

	private Date framing;
	private Date ceiling;
	private Date roughin_mechanical;
	private Date roughin_electric;
	private Date roughin_plumbing;
	private Date mechanicalLightSmoke;
	private Date mechanical_final;
	private Date electrical_final;
	private Date plumbing_final;
	private Date fire_marshal;
	private Date health;
	private Date building_final;
	private long ticketNumber;

	public Inspections(){
	}

	public Inspections(long ticketNumber, Date framing, Date ceiling, Date roughin_mechanical, Date roughin_plumbing, 
		Date mechanicallightsmoke, Date mechanical_final, Date electrical_final, Date plumbing_final, 
		Date fire_marshal, Date health, Date building_final){
		
		this.ticketNumber = ticketNumber;
		this.framing=framing;
		this.ceiling=ceiling;
		this.roughin_mechanical=roughin_mechanical;
		this.roughin_electric=roughin_electric;
		this.roughin_plumbing=roughin_plumbing;
		this.mechanicalLightSmoke= mechanicallightsmoke;
		this.mechanical_final=mechanical_final;
		this.electrical_final=electrical_final;
		this.plumbing_final=plumbing_final;
		this.fire_marshal=fire_marshal;
		this.health=health;
		this.building_final=building_final;
	}
	
	public void setTicketNumber(long ticketNumber){
		this.ticketNumber = ticketNumber ;
	}
	public long getTicketNumber()
	{
		return this.ticketNumber;
	}

	public Date getFraming(){
		return this.framing;
	}
	public void setFraming(Date framing){
		this.framing=framing;
	}

	public Date getCeiling(){
		return this.ceiling;
	}
	public void setCeiling(Date ceiling){
		this.ceiling=ceiling;
	}

	public Date getRoughin_Mechanical(){
		return this.roughin_mechanical;
	}
	public void setRoughin_Mechanical(Date roughin_mechanical){
		this.roughin_mechanical=roughin_mechanical;
	}

	public Date getRoughin_Electric(){
		return this.roughin_electric;
	}
	public void setRoughin_Electric(Date roughin_electric){
		this.roughin_electric=roughin_electric;
	}

	public Date getRoughin_Plumbing(){
		return this.roughin_plumbing;
	}
	public void setRoughin_Plumbing(Date roughin_plumbing){
		this.roughin_plumbing=roughin_plumbing;
	}

	public Date getMechanicalLightSmoke(){
		return this.mechanicalLightSmoke;
	}
	public void setMechanicalLightSmoke(Date mechanicallightsmoke){
		this.mechanicalLightSmoke=mechanicallightsmoke;
	}

	public Date getMechanical_Final(){
		return this.mechanical_final;
	}
	public void setMechanical_Final(Date mechanical_final){
		this.mechanical_final=mechanical_final;
	}

	public Date getElectrical_Final(){
		return this.electrical_final;
	}
	public void setElectrical_Final(Date electrical_final){
		this.electrical_final=electrical_final;
	}

	public Date getPlumbing_Final(){
		return this.plumbing_final;
	}
	public void setPlumbing_Final(Date plumbing_final){
		this.plumbing_final=plumbing_final;
	}

	public Date getFire_Marshal(){
		return this.fire_marshal;
	}
	public void setFire_Marshal(Date fire_marshal){
		this.fire_marshal=fire_marshal;
	}

	public Date getHealth(){
		return this.health;
	}
	public void setHealth(Date health){
		this.health=health;
	}

	public Date getBuilding_Final(){
		return this.building_final;
	}
	public void setBuilding_Final(Date building_final){
		this.building_final=building_final;
	}
}
