package projectObjects;

import javax.persistence.Entity;

/**
 * This class is used to store the different equipment vendors to be used with 
 * @author Brian Fitzpatrick
 *
 */
@Entity
public class VendorStorage extends ProjectObject {


	/**
	 * The jsonString of Vendor information for a particular project
	 */
	private String jsonVendor;
	
	/**
	 * project with which this vendor is related
	 */
	private long projectid;
	
	public VendorStorage()
	{
		jsonVendor = null;
		projectid = 0;
	}
	
	public VendorStorage(String vendInformation, long pid)
	{
		jsonVendor = vendInformation;
		projectid = pid;
	}

	/**
	 * This method gets the name of the vendor
	 * @return the vendor's name
	 */
	public synchronized String getJsonVendor() {
		return jsonVendor;
	}
	
	/**
	 * This method gets the project id number
	 * @return id of the project
	 */
	public synchronized long getProjectid(){
		return projectid;
	}
	
	/**
	 * This method sets the project id number
	 * @param pid the new project id number
	 */
	public synchronized void setProjectid(long pid)
	{
		this.projectid = pid;
	}

	/**
	 * This method sets the name of the vendor.
	 * @param name the new name of the vendor
	 */
	public synchronized void setJsonVendor(String vendorString) {
		this.jsonVendor = vendorString;
	}
}
