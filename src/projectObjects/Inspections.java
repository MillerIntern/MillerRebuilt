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
		Date fire_marshal, Date health, Date building_final, Date roughin_electric){
		
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
	
	public synchronized void setTicketNumber(long ticketNumber){
		this.ticketNumber = ticketNumber ;
	}
	public synchronized long getTicketNumber()
	{
		return this.ticketNumber;
	}

	public synchronized Date getFraming(){
		return this.framing;
	}
	public synchronized void setFraming(Date framing){
		this.framing=framing;
	}

	public synchronized Date getCeiling(){
		return this.ceiling;
	}
	public synchronized void setCeiling(Date ceiling){
		this.ceiling=ceiling;
	}

	public synchronized Date getRoughin_Mechanical(){
		return this.roughin_mechanical;
	}
	public synchronized void setRoughin_Mechanical(Date roughin_mechanical){
		this.roughin_mechanical=roughin_mechanical;
	}

	public synchronized Date getRoughin_Electric(){
		return this.roughin_electric;
	}
	public synchronized void setRoughin_Electric(Date roughin_electric){
		this.roughin_electric=roughin_electric;
	}

	public synchronized Date getRoughin_Plumbing(){
		return this.roughin_plumbing;
	}
	public synchronized void setRoughin_Plumbing(Date roughin_plumbing){
		this.roughin_plumbing=roughin_plumbing;
	}

	public synchronized Date getMechanicalLightSmoke(){
		return this.mechanicalLightSmoke;
	}
	public synchronized void setMechanicalLightSmoke(Date mechanicallightsmoke){
		this.mechanicalLightSmoke=mechanicallightsmoke;
	}

	public synchronized Date getMechanical_Final(){
		return this.mechanical_final;
	}
	public synchronized void setMechanical_Final(Date mechanical_final){
		this.mechanical_final=mechanical_final;
	}

	public synchronized Date getElectrical_Final(){
		return this.electrical_final;
	}
	public synchronized void setElectrical_Final(Date electrical_final){
		this.electrical_final=electrical_final;
	}

	public synchronized Date getPlumbing_Final(){
		return this.plumbing_final;
	}
	public synchronized void setPlumbing_Final(Date plumbing_final){
		this.plumbing_final=plumbing_final;
	}

	public synchronized Date getFire_Marshal(){
		return this.fire_marshal;
	}
	public synchronized void setFire_Marshal(Date fire_marshal){
		this.fire_marshal=fire_marshal;
	}

	public synchronized Date getHealth(){
		return this.health;
	}
	public synchronized void setHealth(Date health){
		this.health=health;
	}

	public synchronized Date getBuilding_Final(){
		return this.building_final;
	}
	public synchronized void setBuilding_Final(Date building_final){
		this.building_final=building_final;
	}
}
