package projectObjects;

import java.util.Date;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Entity
@Embeddable
public class Permits extends ProjectObject
{
	private String permitNotes;
	private String inspectionNotes;
	
	private Date building;
	private String buildingPermitRequired;
	private String buildingPermitStatus;
	private String buildingInspectionRequired;
	private String buildingInspectionStatus;
	private Date buildingInspectionLastUpdated;
	
	private Date mechanical;
	private String mechanicalPermitRequired;
	private String mechanicalPermitStatus;
	private String mechanicalInspectionRequired;
	private String mechanicalInspectionStatus;
	private Date mechanicalInspectionLastUpdated;
	
	private Date electrical;
	private String electricalPermitRequired;
	private String electricalPermitStatus;
	private String electricalInspectionRequired;
	private String electricalInspectionStatus;
	private Date electricalInspectionLastUpdated;
	
	private Date plumbing;
	private String plumbingPermitRequired;
	private String plumbingPermitStatus;
	private String plumbingInspectionRequired;
	private String plumbingInspectionStatus;
	private Date plumbingInspectionLastUpdated;
	
	private Date fire_sprinkler;
	private String sprinklerPermitRequired;
	private String sprinklerPermitStatus;
	private String sprinklerInspectionRequired;
	private String sprinklerInspectionStatus;
	private Date sprinklerInspectionLastUpdated;
	
	private Date fire_alarm;
	private String fireAlarmPermitRequired;
	private String fireAlarmPermitStatus;
	private String fireAlarmInspectionRequired;
	private String fireAlarmInspectionStatus;
	private Date fireAlarmInspectionLastUpdated;
	
	private Date low_voltage;
	private String voltagePermitRequired;
	private String voltagePermitStatus;
	private String voltageInspectionRequired;
	private String voltageInspectionStatus;
	private Date voltageInspectionLastUpdated;
	
	private Date roofing;
	private String roofingPermitRequired;
	private String roofingPermitStatus;
	private String roofingInspectionRequired;
	private String roofingInspectionStatus;
	private Date roofingInspectionLastUpdated;
	
	private Date otherAPermit;
	private String otherAPermitStatus;
	private String otherAInspectionStatus;
	private Date otherAInspectionLastUpdated;
	
	private Date otherBPermit;
	private String otherBPermitStatus;
	private String otherBInspectionStatus;
	private Date otherBInspectionLastUpdated;	
	
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

	public synchronized void setBuildingPermitDate( Date a)
	{
		this.building = a;
	}
	
	public synchronized Date getBuildingPermitDate()
	{
		return this.building;
	}
	
	public synchronized void setMechanicalPermitDate(Date a)
	{
		this.mechanical = a;
	}
	
	public synchronized Date getMechanicalPermitDate()
	{
		return this.mechanical;
	}
	
	public synchronized void setElectricalPermitDate(Date a)
	{
		this.electrical = a;
	}
	
	public synchronized Date getElectricalPermitDate()
	{
		return this.electrical;
	}
	
	public synchronized void setPlumbingPermitDate(Date a)
	{
		this.plumbing= a;
	}
	

	
	public synchronized Date getPlumbingPermitDate()
	{
		return this.plumbing;
	}
	
	public synchronized void setFireSprinklerDate(Date a)
	{
		this.fire_sprinkler = a;
	}
	
	public synchronized Date getFireSprinklerDate()
	{
		return this.fire_sprinkler;
	}

	public synchronized void setFireAlarmPermitDate(Date a)
	{
		this.fire_alarm = a;
	}
	
	public synchronized Date getFireAlarmPermitDate()
	{
		return this.fire_alarm;
	}

	public synchronized void setLowVoltagePermitDate(Date a)
	{
		this.low_voltage = a;
	}
	
	public synchronized Date getLowVoltagePermitDate()
	{
		return this.low_voltage;
	}

	public synchronized Date getBuilding() {
		return building;
	}

	public synchronized void setBuilding(Date building) {
		this.building = building;
	}

	public synchronized String getBuildingPermitStatus() {
		return buildingPermitStatus;
	}
	
	public synchronized void setBuildingPermitStatus(String buildingPermitStatus) {
		this.buildingPermitStatus = buildingPermitStatus;
	}

	public synchronized String getBuildingPermitRequired() {
		return buildingPermitRequired;
	}
	
	public synchronized void setBuildingPermitRequired(String val) {
		this.buildingPermitRequired = val;
	}
	
	public synchronized String getBuildingInspectionRequired() {
		return buildingInspectionRequired;
	}
	
	public synchronized void setBuildingInspectionRequired(String val) {
		this.buildingInspectionRequired = val;
	}
	
	public synchronized String getBuildingInspectionStatus() {
		return buildingInspectionStatus;
	}

	public synchronized void setBuildingInspectionStatus(String buildingInspectionStatus) {
		this.buildingInspectionStatus = buildingInspectionStatus;
	}

	public synchronized Date getBuildingInspectionLastUpdated() {
		return buildingInspectionLastUpdated;
	}

	public synchronized void setBuildingInspectionLastUpdated(Date buildingInspectionLastUpdated) {
		this.buildingInspectionLastUpdated = buildingInspectionLastUpdated;
	}

	public synchronized Date getMechanical() {
		return mechanical;
	}

	public synchronized void setMechanical(Date mechanical) {
		this.mechanical = mechanical;
	}

	public synchronized String getMechanicalPermitStatus() {
		return mechanicalPermitStatus;
	}

	public synchronized void setMechanicalPermitStatus(String mechanicalPermitStatus) {
		this.mechanicalPermitStatus = mechanicalPermitStatus;
	}
	
	public synchronized String getMechanicalPermitRequired() {
		return mechanicalPermitRequired;
	}
	
	public synchronized void setMechanicalPermitRequired(String val) {
		this.mechanicalPermitRequired = val;
	}
	
	public synchronized String getMechanicalInspectionRequired() {
		return mechanicalInspectionRequired;
	}
	
	public synchronized void setMechanicalInspectionRequired(String val) {
		this.mechanicalInspectionRequired = val;
	}

	public synchronized String getMechanicalInspectionStatus() {
		return mechanicalInspectionStatus;
	}

	public synchronized void setMechanicalInspectionStatus(String mechanicalInspectionStatus) {
		this.mechanicalInspectionStatus = mechanicalInspectionStatus;
	}

	public synchronized Date getMechanicalInspectionLastUpdated() {
		return mechanicalInspectionLastUpdated;
	}

	public synchronized void setMechanicalInspectionLastUpdated(Date mechanicalInspectionLastUpdated) {
		this.mechanicalInspectionLastUpdated = mechanicalInspectionLastUpdated;
	}

	public synchronized Date getElectrical() {
		return electrical;
	}

	public synchronized void setElectrical(Date electrical) {
		this.electrical = electrical;
	}

	public synchronized String getElectricalPermitStatus() {
		return electricalPermitStatus;
	}

	public synchronized void setElectricalPermitStatus(String electricalPermitStatus) {
		this.electricalPermitStatus = electricalPermitStatus;
	}
	
	public synchronized String getElectricalPermitRequired() {
		return electricalPermitRequired;
	}
	
	public synchronized void setElectricalPermitRequired(String val) {
		this.electricalPermitRequired = val;
	}
	
	public synchronized String getElectricalInspectionRequired() {
		return electricalInspectionRequired;
	}
	
	public synchronized void setElectricalInspectionRequired(String val) {
		this.electricalInspectionRequired = val;
	}	

	public synchronized String getElectricalInspectionStatus() {
		return electricalInspectionStatus;
	}

	public synchronized void setElectricalInspectionStatus(String electricalInspectionStatus) {
		this.electricalInspectionStatus = electricalInspectionStatus;
	}

	public synchronized Date getElectricalInspectionLastUpdated() {
		return electricalInspectionLastUpdated;
	}

	public synchronized void setElectricalInspectionLastUpdated(Date electricalInspectionLastUpdated) {
		this.electricalInspectionLastUpdated = electricalInspectionLastUpdated;
	}

	public synchronized Date getPlumbing() {
		return plumbing;
	}

	public synchronized void setPlumbing(Date plumbing) {
		this.plumbing = plumbing;
	}

	public synchronized String getPlumbingPermitStatus() {
		return plumbingPermitStatus;
	}

	public synchronized void setPlumbingPermitStatus(String plumbingPermitStatus) {
		this.plumbingPermitStatus = plumbingPermitStatus;
	}
	
	public synchronized String getPlumbingPermitRequired() {
		return plumbingPermitRequired;
	}
	
	public synchronized void setPlumbingPermitRequired(String val) {
		this.plumbingPermitRequired = val;
	}
	
	public synchronized String getPlumbingInspectionRequired() {
		return plumbingInspectionRequired;
	}
	
	public synchronized void setPlumbingInspectionRequired(String val) {
		this.plumbingInspectionRequired = val;
	}	

	public synchronized String getPlumbingInspectionStatus() {
		return plumbingInspectionStatus;
	}

	public synchronized void setPlumbingInspectionStatus(String plumbingInspectionStatus) {
		this.plumbingInspectionStatus = plumbingInspectionStatus;
	}

	public synchronized Date getPlumbingInspectionLastUpdated() {
		return plumbingInspectionLastUpdated;
	}

	public synchronized void setPlumbingInspectionLastUpdated(Date plumbingInspectionLastUpdated) {
		this.plumbingInspectionLastUpdated = plumbingInspectionLastUpdated;
	}

	public synchronized Date getFire_sprinkler() {
		return fire_sprinkler;
	}

	public synchronized void setFire_sprinkler(Date fire_sprinkler) {
		this.fire_sprinkler = fire_sprinkler;
	}

	public synchronized String getSprinklerPermitStatus() {
		return sprinklerPermitStatus;
	}

	public synchronized void setSprinklerPermitStatus(String sprinklerPermitStatus) {
		this.sprinklerPermitStatus = sprinklerPermitStatus;
	}
	
	public synchronized String getSprinklerPermitRequired() {
		return sprinklerPermitRequired;
	}
	
	public synchronized void setSprinklerPermitRequired(String val) {
		this.sprinklerPermitRequired = val;
	}
	
	public synchronized String getSprinklerInspectionRequired() {
		return sprinklerInspectionRequired;
	}
	
	public synchronized void setSprinklerInspectionRequired(String val) {
		this.sprinklerInspectionRequired = val;
	}
	
	public synchronized String getSprinklerInspectionStatus() {
		return sprinklerInspectionStatus;
	}

	public synchronized void setSprinklerInspectionStatus(String sprinklerInspectionStatus) {
		this.sprinklerInspectionStatus = sprinklerInspectionStatus;
	}

	public synchronized Date getSprinklerInspectionLastUpdated() {
		return sprinklerInspectionLastUpdated;
	}

	public synchronized void setSprinklerInspectionLastUpdated(Date sprinklerInspectionLastUpdated) {
		this.sprinklerInspectionLastUpdated = sprinklerInspectionLastUpdated;
	}

	public synchronized Date getFire_alarm() {
		return fire_alarm;
	}

	public synchronized void setFire_alarm(Date fire_alarm) {
		this.fire_alarm = fire_alarm;
	}

	public synchronized String getFireAlarmPermitStatus() {
		return fireAlarmPermitStatus;
	}

	public synchronized void setFireAlarmPermitStatus(String fireAlarmPermitStatus) {
		this.fireAlarmPermitStatus = fireAlarmPermitStatus;
	}
	
	public synchronized String getFireAlarmPermitRequired() {
		return fireAlarmPermitRequired;
	}
	
	public synchronized void setFireAlarmPermitRequired(String val) {
		this.fireAlarmPermitRequired = val;
	}
	
	public synchronized String getFireAlarmInspectionRequired() {
		return fireAlarmInspectionRequired;
	}
	
	public synchronized void setFireAlarmInspectionRequired(String val) {
		this.fireAlarmInspectionRequired = val;
	}	

	public synchronized String getFireAlarmInspectionStatus() {
		return fireAlarmInspectionStatus;
	}

	public synchronized void setFireAlarmInspectionStatus(String fireAlarmInspectionStatus) {
		this.fireAlarmInspectionStatus = fireAlarmInspectionStatus;
	}

	public synchronized Date getFireAlarmInspectionLastUpdated() {
		return fireAlarmInspectionLastUpdated;
	}

	public synchronized void setFireAlarmInspectionLastUpdated(Date fireAlarmInspectionLastUpdated) {
		this.fireAlarmInspectionLastUpdated = fireAlarmInspectionLastUpdated;
	}

	public synchronized Date getLow_voltage() {
		return low_voltage;
	}

	public synchronized void setLow_voltage(Date low_voltage) {
		this.low_voltage = low_voltage;
	}

	public synchronized String getVoltagePermitStatus() {
		return voltagePermitStatus;
	}

	public synchronized void setVoltagePermitStatus(String voltagePermitStatus) {
		this.voltagePermitStatus = voltagePermitStatus;
	}
	
	public synchronized String getVoltagePermitRequired() {
		return voltagePermitRequired;
	}
	
	public synchronized void setVoltagePermitRequired(String val) {
		this.voltagePermitRequired = val;
	}
	
	public synchronized String getVoltageInspectionRequired() {
		return voltageInspectionRequired;
	}
	
	public synchronized void setVoltageInspectionRequired(String val) {
		this.voltageInspectionRequired = val;
	}

	public synchronized String getVoltageInspectionStatus() {
		return voltageInspectionStatus;
	}

	public synchronized void setVoltageInspectionStatus(String voltageInspectionStatus) {
		this.voltageInspectionStatus = voltageInspectionStatus;
	}

	public synchronized Date getVoltageInspectionLastUpdated() {
		return voltageInspectionLastUpdated;
	}

	public synchronized void setVoltageInspectionLastUpdated(Date voltageInspectionLastUpdated) {
		this.voltageInspectionLastUpdated = voltageInspectionLastUpdated;
	}

	public synchronized Date getRoofing() {
		return roofing;
	}

	public synchronized void setRoofing(Date roofing) {
		this.roofing = roofing;
	}

	public synchronized String getRoofingPermitStatus() {
		return roofingPermitStatus;
	}

	public synchronized void setRoofingPermitStatus(String roofingPermitStatus) {
		this.roofingPermitStatus = roofingPermitStatus;
	}
	
	public synchronized String getRoofingPermitRequired() {
		return roofingPermitRequired;
	}
	
	public synchronized void setRoofingPermitRequired(String val) {
		this.roofingPermitRequired = val;
	}
	
	public synchronized String getRoofingInspectionRequired() {
		return roofingInspectionRequired;
	}
	
	public synchronized void setRoofingInspectionRequired(String val) {
		this.roofingInspectionRequired = val;
	}	

	public synchronized String getRoofingInspectionStatus() {
		return roofingInspectionStatus;
	}

	public synchronized void setRoofingInspectionStatus(String roofingInspectionStatus) {
		this.roofingInspectionStatus = roofingInspectionStatus;
	}

	public synchronized Date getRoofingInspectionLastUpdated() {
		return roofingInspectionLastUpdated;
	}

	public synchronized void setRoofingInspectionLastUpdated(Date roofingInspectionLastUpdated) {
		this.roofingInspectionLastUpdated = roofingInspectionLastUpdated;
	}

	public synchronized Date getOtherAPermit() {
		return otherAPermit;
	}

	public synchronized void setOtherAPermit(Date otherAPermit) {
		this.otherAPermit = otherAPermit;
	}

	public synchronized String getOtherAPermitStatus() {
		return otherAPermitStatus;
	}

	public synchronized void setOtherAPermitStatus(String otherAPermitStatus) {
		this.otherAPermitStatus = otherAPermitStatus;
	}

	public synchronized String getOtherAInspectionStatus() {
		return otherAInspectionStatus;
	}

	public synchronized void setOtherAInspectionStatus(String otherAInspectionStatus) {
		this.otherAInspectionStatus = otherAInspectionStatus;
	}

	public synchronized Date getOtherAInspectionLastUpdated() {
		return otherAInspectionLastUpdated;
	}

	public synchronized void setOtherAInspectionLastUpdated(Date otherAInspectionLastUpdated) {
		this.otherAInspectionLastUpdated = otherAInspectionLastUpdated;
	}

	public synchronized Date getOtherBPermit() {
		return otherBPermit;
	}

	public synchronized void setOtherBPermit(Date otherBPermit) {
		this.otherBPermit = otherBPermit;
	}

	public synchronized String getOtherBPermitStatus() {
		return otherBPermitStatus;
	}

	public synchronized void setOtherBPermitStatus(String otherBPermitStatus) {
		this.otherBPermitStatus = otherBPermitStatus;
	}

	public synchronized String getOtherBInspectionStatus() {
		return otherBInspectionStatus;
	}

	public synchronized void setOtherBInspectionStatus(String otherBInspectionStatus) {
		this.otherBInspectionStatus = otherBInspectionStatus;
	}

	public synchronized Date getOtherBInspectionLastUpdated() {
		return otherBInspectionLastUpdated;
	}

	public synchronized void setOtherBInspectionLastUpdated(Date otherBInspectionLastUpdated) {
		this.otherBInspectionLastUpdated = otherBInspectionLastUpdated;
	}

	public synchronized String getPermitNotes() {
		return permitNotes;
	}

	public synchronized void setPermitNotes(String permitNotes) {
		this.permitNotes = permitNotes;
	}

	public synchronized String getInspectionNotes() {
		return inspectionNotes;
	}

	public synchronized void setInspectionNotes(String inspectionNotes) {
		this.inspectionNotes = inspectionNotes;
	}
}
