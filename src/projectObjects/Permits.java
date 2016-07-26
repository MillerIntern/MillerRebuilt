package projectObjects;

import java.util.Date;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Entity
@Embeddable
public class Permits extends ProjectObject
{
	
	private Date building;
	private String buildingPermitStatus;
	private String buildingInspectionStatus;
	private Date buildingInspectionLastUpdated;
	private String buildingNotes;
	
	private Date mechanical;
	private String mechanicalPermitStatus;
	private String mechanicalInspectionStatus;
	private Date mechanicalInspectionLastUpdated;
	private String mechanicalNotes;
	
	private Date electrical;
	private String electricalPermitStatus;
	private String electricalInspectionStatus;
	private Date electricalInspectionLastUpdated;
	private String electricalNotes;
	
	private Date plumbing;
	private String plumbingPermitStatus;
	private String plumbingInspectionStatus;
	private Date plumbingInspectionLastUpdated;
	private String plumbingNotes;
	
	private Date fire_sprinkler;
	private String sprinklerPermitStatus;
	private String sprinklerInspectionStatus;
	private Date sprinklerInspectionLastUpdated;
	private String sprinklerNotes;
	
	private Date fire_alarm;
	private String fireAlarmPermitStatus;
	private String fireAlarmInspectionStatus;
	private Date fireAlarmInspectionLastUpdated;
	private String fireAlarmNotes;
	
	private Date low_voltage;
	private String voltagePermitStatus;
	private String voltageInspectionStatus;
	private Date voltageInspectionLastUpdated;
	private String voltageNotes;
	
	private Date roofing;
	private String roofingPermitStatus;
	private String roofingInspectionStatus;
	private Date roofingInspectionLastUpdated;
	private String roofingNotes;
	
	private Date otherAPermit;
	private String otherAPermitStatus;
	private String otherAInspectionStatus;
	private Date otherAInspectionLastUpdated;
	private String otherANotes;
	
	private Date otherBPermit;
	private String otherBPermitStatus;
	private String otherBInspectionStatus;
	private Date otherBInspectionLastUpdated;
	private String otherBNotes;
	
	
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

	public Date getBuilding() {
		return building;
	}

	public void setBuilding(Date building) {
		this.building = building;
	}

	public String getBuildingPermitStatus() {
		return buildingPermitStatus;
	}

	public void setBuildingPermitStatus(String buildingPermitStatus) {
		this.buildingPermitStatus = buildingPermitStatus;
	}

	public String getBuildingInspectionStatus() {
		return buildingInspectionStatus;
	}

	public void setBuildingInspectionStatus(String buildingInspectionStatus) {
		this.buildingInspectionStatus = buildingInspectionStatus;
	}

	public Date getBuildingInspectionLastUpdated() {
		return buildingInspectionLastUpdated;
	}

	public void setBuildingInspectionLastUpdated(Date buildingInspectionLastUpdated) {
		this.buildingInspectionLastUpdated = buildingInspectionLastUpdated;
	}

	public String getBuildingNotes() {
		return buildingNotes;
	}

	public void setBuildingNotes(String buildingNotes) {
		this.buildingNotes = buildingNotes;
	}

	public Date getMechanical() {
		return mechanical;
	}

	public void setMechanical(Date mechanical) {
		this.mechanical = mechanical;
	}

	public String getMechanicalPermitStatus() {
		return mechanicalPermitStatus;
	}

	public void setMechanicalPermitStatus(String mechanicalPermitStatus) {
		this.mechanicalPermitStatus = mechanicalPermitStatus;
	}

	public String getMechanicalInspectionStatus() {
		return mechanicalInspectionStatus;
	}

	public void setMechanicalInspectionStatus(String mechanicalInspectionStatus) {
		this.mechanicalInspectionStatus = mechanicalInspectionStatus;
	}

	public Date getMechanicalInspectionLastUpdated() {
		return mechanicalInspectionLastUpdated;
	}

	public void setMechanicalInspectionLastUpdated(Date mechanicalInspectionLastUpdated) {
		this.mechanicalInspectionLastUpdated = mechanicalInspectionLastUpdated;
	}

	public String getMechanicalNotes() {
		return mechanicalNotes;
	}

	public void setMechanicalNotes(String mechanicalNotes) {
		this.mechanicalNotes = mechanicalNotes;
	}

	public Date getElectrical() {
		return electrical;
	}

	public void setElectrical(Date electrical) {
		this.electrical = electrical;
	}

	public String getElectricalPermitStatus() {
		return electricalPermitStatus;
	}

	public void setElectricalPermitStatus(String electricalPermitStatus) {
		this.electricalPermitStatus = electricalPermitStatus;
	}

	public String getElectricalInspectionStatus() {
		return electricalInspectionStatus;
	}

	public void setElectricalInspectionStatus(String electricalInspectionStatus) {
		this.electricalInspectionStatus = electricalInspectionStatus;
	}

	public Date getElectricalInspectionLastUpdated() {
		return electricalInspectionLastUpdated;
	}

	public void setElectricalInspectionLastUpdated(Date electricalInspectionLastUpdated) {
		this.electricalInspectionLastUpdated = electricalInspectionLastUpdated;
	}

	public String getElectricalNotes() {
		return electricalNotes;
	}

	public void setElectricalNotes(String electricalNotes) {
		this.electricalNotes = electricalNotes;
	}

	public Date getPlumbing() {
		return plumbing;
	}

	public void setPlumbing(Date plumbing) {
		this.plumbing = plumbing;
	}

	public String getPlumbingPermitStatus() {
		return plumbingPermitStatus;
	}

	public void setPlumbingPermitStatus(String plumbingPermitStatus) {
		this.plumbingPermitStatus = plumbingPermitStatus;
	}

	public String getPlumbingInspectionStatus() {
		return plumbingInspectionStatus;
	}

	public void setPlumbingInspectionStatus(String plumbingInspectionStatus) {
		this.plumbingInspectionStatus = plumbingInspectionStatus;
	}

	public Date getPlumbingInspectionLastUpdated() {
		return plumbingInspectionLastUpdated;
	}

	public void setPlumbingInspectionLastUpdated(Date plumbingInspectionLastUpdated) {
		this.plumbingInspectionLastUpdated = plumbingInspectionLastUpdated;
	}

	public String getPlumbingNotes() {
		return plumbingNotes;
	}

	public void setPlumbingNotes(String plumbingNotes) {
		this.plumbingNotes = plumbingNotes;
	}

	public Date getFire_sprinkler() {
		return fire_sprinkler;
	}

	public void setFire_sprinkler(Date fire_sprinkler) {
		this.fire_sprinkler = fire_sprinkler;
	}

	public String getSprinklerPermitStatus() {
		return sprinklerPermitStatus;
	}

	public void setSprinklerPermitStatus(String sprinklerPermitStatus) {
		this.sprinklerPermitStatus = sprinklerPermitStatus;
	}

	public String getSprinklerInspectionStatus() {
		return sprinklerInspectionStatus;
	}

	public void setSprinklerInspectionStatus(String sprinklerInspectionStatus) {
		this.sprinklerInspectionStatus = sprinklerInspectionStatus;
	}

	public Date getSprinklerInspectionLastUpdated() {
		return sprinklerInspectionLastUpdated;
	}

	public void setSprinklerInspectionLastUpdated(Date sprinklerInspectionLastUpdated) {
		this.sprinklerInspectionLastUpdated = sprinklerInspectionLastUpdated;
	}

	public String getSprinklerNotes() {
		return sprinklerNotes;
	}

	public void setSprinklerNotes(String sprinklerNotes) {
		this.sprinklerNotes = sprinklerNotes;
	}

	public Date getFire_alarm() {
		return fire_alarm;
	}

	public void setFire_alarm(Date fire_alarm) {
		this.fire_alarm = fire_alarm;
	}

	public String getFireAlarmPermitStatus() {
		return fireAlarmPermitStatus;
	}

	public void setFireAlarmPermitStatus(String fireAlarmPermitStatus) {
		this.fireAlarmPermitStatus = fireAlarmPermitStatus;
	}

	public String getFireAlarmInspectionStatus() {
		return fireAlarmInspectionStatus;
	}

	public void setFireAlarmInspectionStatus(String fireAlarmInspectionStatus) {
		this.fireAlarmInspectionStatus = fireAlarmInspectionStatus;
	}

	public Date getFireAlarmInspectionLastUpdated() {
		return fireAlarmInspectionLastUpdated;
	}

	public void setFireAlarmInspectionLastUpdated(Date fireAlarmInspectionLastUpdated) {
		this.fireAlarmInspectionLastUpdated = fireAlarmInspectionLastUpdated;
	}

	public String getFireAlarmNotes() {
		return fireAlarmNotes;
	}

	public void setFireAlarmNotes(String fireAlarmNotes) {
		this.fireAlarmNotes = fireAlarmNotes;
	}

	public Date getLow_voltage() {
		return low_voltage;
	}

	public void setLow_voltage(Date low_voltage) {
		this.low_voltage = low_voltage;
	}

	public String getVoltagePermitStatus() {
		return voltagePermitStatus;
	}

	public void setVoltagePermitStatus(String voltagePermitStatus) {
		this.voltagePermitStatus = voltagePermitStatus;
	}

	public String getVoltageInspectionStatus() {
		return voltageInspectionStatus;
	}

	public void setVoltageInspectionStatus(String voltageInspectionStatus) {
		this.voltageInspectionStatus = voltageInspectionStatus;
	}

	public Date getVoltageInspectionLastUpdated() {
		return voltageInspectionLastUpdated;
	}

	public void setVoltageInspectionLastUpdated(Date voltageInspectionLastUpdated) {
		this.voltageInspectionLastUpdated = voltageInspectionLastUpdated;
	}

	public String getVoltageNotes() {
		return voltageNotes;
	}

	public void setVoltageNotes(String voltageNotes) {
		this.voltageNotes = voltageNotes;
	}

	public Date getRoofing() {
		return roofing;
	}

	public void setRoofing(Date roofing) {
		this.roofing = roofing;
	}

	public String getRoofingPermitStatus() {
		return roofingPermitStatus;
	}

	public void setRoofingPermitStatus(String roofingPermitStatus) {
		this.roofingPermitStatus = roofingPermitStatus;
	}

	public String getRoofingInspectionStatus() {
		return roofingInspectionStatus;
	}

	public void setRoofingInspectionStatus(String roofingInspectionStatus) {
		this.roofingInspectionStatus = roofingInspectionStatus;
	}

	public Date getRoofingInspectionLastUpdated() {
		return roofingInspectionLastUpdated;
	}

	public void setRoofingInspectionLastUpdated(Date roofingInspectionLastUpdated) {
		this.roofingInspectionLastUpdated = roofingInspectionLastUpdated;
	}

	public String getRoofingNotes() {
		return roofingNotes;
	}

	public void setRoofingNotes(String roofingNotes) {
		this.roofingNotes = roofingNotes;
	}

	public Date getOtherAPermit() {
		return otherAPermit;
	}

	public void setOtherAPermit(Date otherAPermit) {
		this.otherAPermit = otherAPermit;
	}

	public String getOtherAPermitStatus() {
		return otherAPermitStatus;
	}

	public void setOtherAPermitStatus(String otherAPermitStatus) {
		this.otherAPermitStatus = otherAPermitStatus;
	}

	public String getOtherAInspectionStatus() {
		return otherAInspectionStatus;
	}

	public void setOtherAInspectionStatus(String otherAInspectionStatus) {
		this.otherAInspectionStatus = otherAInspectionStatus;
	}

	public Date getOtherAInspectionLastUpdated() {
		return otherAInspectionLastUpdated;
	}

	public void setOtherAInspectionLastUpdated(Date otherAInspectionLastUpdated) {
		this.otherAInspectionLastUpdated = otherAInspectionLastUpdated;
	}

	public String getOtherANotes() {
		return otherANotes;
	}

	public void setOtherANotes(String otherANotes) {
		this.otherANotes = otherANotes;
	}

	public Date getOtherBPermit() {
		return otherBPermit;
	}

	public void setOtherBPermit(Date otherBPermit) {
		this.otherBPermit = otherBPermit;
	}

	public String getOtherBPermitStatus() {
		return otherBPermitStatus;
	}

	public void setOtherBPermitStatus(String otherBPermitStatus) {
		this.otherBPermitStatus = otherBPermitStatus;
	}

	public String getOtherBInspectionStatus() {
		return otherBInspectionStatus;
	}

	public void setOtherBInspectionStatus(String otherBInspectionStatus) {
		this.otherBInspectionStatus = otherBInspectionStatus;
	}

	public Date getOtherBInspectionLastUpdated() {
		return otherBInspectionLastUpdated;
	}

	public void setOtherBInspectionLastUpdated(Date otherBInspectionLastUpdated) {
		this.otherBInspectionLastUpdated = otherBInspectionLastUpdated;
	}

	public String getOtherBNotes() {
		return otherBNotes;
	}

	public void setOtherBNotes(String otherBNotes) {
		this.otherBNotes = otherBNotes;
	}
	

	
	
	
	
	
}
