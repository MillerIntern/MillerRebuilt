package projectObjects;

import java.util.Date;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


@Entity
public class Subcontractor extends ProjectObject {
	
	private Region region;
	
	private String trades;
	
	private String name;

	private String contacts;
	
	private String phone;

	private String mobile;
	
	private String email;
	
	private String workRegion;
	
	private String address;
	
	private City city;
	
	private State state;
	
	private String zip;
	
	private String notes;
	
	private int rank;
	
	public Subcontractor(Region region, String trades, String name, String contacts, String phone,
			String mobile, String email, String workRegion, String address, City city, State state, String zip,
			String notes, int rank){
		this.region = region;
		this.trades = trades;
		this.name = name;
		this.contacts = contacts;
		this.phone = phone;
		this.mobile = mobile;
		this.email = email;
		this.workRegion = workRegion;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.notes = notes;
		this.rank = rank;
	}
	
	public Subcontractor(){
		this.region = null;
		this.trades = null;
		this.name = null;
		this.contacts = null;
		this.phone = null;
		this.mobile = null;
		this.email = null;
		this.workRegion = null;
		this.address = null;
		this.city = null;
		this.state = null;
		this.zip = null;
		this.notes = null;
		this.rank = 0;
	}
	
	public Region getRegion(){
		return region;
	}
	
	public void setRegion(Region region){
		this.region = region;
	}
	
	public String getTrades(){
		return trades;
	}
	
	public void setTrades(String trades){
		this.trades = trades;
	}

	public String getName(){
		return name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public String getContacts(){
		return contacts;
	}
	
	public void setContacts(String contacts){
		this.contacts = contacts;
	}
	
	public String getPhone(){
		return phone;
	}
	
	public void setPhone(String phone){
		this.phone = phone;
	}
	
	public String getMobile(){
		return mobile;
	}
	
	public void setMobile(String mobile){
		this.mobile = mobile;
	}
	
	public String getEmail(){
		return email;
	}
	
	public void setEmail(String email){
		this.email = email;
	}
	
	public String getWorkRegion(){
		return workRegion;
	}
	
	public void setWorkRegion(String workRegion){
		this.workRegion = workRegion;
	}
	
	public String getAddress(){
		return address;
	}
	
	public void setAddress(String address){
		this.address = address;
	}
	
	@OneToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public City getCity(){
		return city;
	}
	
	public void setCity(City city){
		this.city = city;
	}
	
	@Enumerated(EnumType.STRING)
	public State getState(){
		return state;
	}
	
	public void setState(State state){
		this.state = state;
	}
	
	public String getZip(){
		return zip;
	}
	
	public void setZip(String zip){
		this.zip = zip;
	}
	
	public String getNotes(){
		return notes;
	}
	
	public void setNotes(String notes){
		this.notes = notes;
	}
	
	public int getRank(){
		return rank;
	}
	
	public void setRank(int rank){
		this.rank = rank;
	}

}
	
