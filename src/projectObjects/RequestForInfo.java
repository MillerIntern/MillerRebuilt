package projectObjects;

import java.util.Date;

import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * This class holds data for RFIs(Requests for information) and the information that goes along with them. This is additional
 * information correlated with the project that was not available at its conception.
 * @author Brian Fitzpatrick
 */

public class RequestForInfo extends ProjectObject {
	
	/**
	 * This is the rfi number associated with the request
	 */
	private int rfiNum;
	
	/**
	 * This is the type of project that this request is associated with, might change from string to its own class
	 */
	private String projectType;
	
	/**
	 * The information that is requested
	 */
	private String infoRequested;
	
	/**
	 * The the person who requested the information, might change from string to its own class
	 */
	private String infoRequester;
	
	/**
	 * The date that the information was requested
	 */
	private Date dateRequested;
	
	/**
	 * The date that the request was obtained
	 */
	private Date dateObtained;
	
	/**
	 * Response to the RFI
	 */
	private String response;
	
	public RequestForInfo()
	{
		this.rfiNum = 0;
		this.projectType = null;
		this.infoRequested = null;
		this.infoRequester = null;
		this.dateRequested = null;
		this.dateObtained = null;
		this.response = null;
	}
	
	public RequestForInfo(int rfiReqNum, String projType, String infoReq, String infoReqer, Date dateReq, Date dateObtain, String res)
	{
		this.rfiNum = rfiReqNum;
		this.projectType = projType;
		this.infoRequested = infoReq;
		this.infoRequester = infoReqer;
		this.dateRequested = dateReq;
		this.dateObtained = dateObtain;
		this.response = res;
	}
	
	/*
	 * ACCESSOR METHODS
	 */
	
	/**
	 * This method gets the rfiNum for the request
	 * @return the rfiNum
	 */
	public int getrfiNUm() {
		return rfiNum;
	}
	
	/**
	 * This method gets the projectType for the request
	 * @return the type of project
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public String getProjectType() {
		return projectType;
	}
	
	/**
	 * This method gets the info requested for the request
	 * @return the info requested
	 */
	public String getInfoRequested() {
		return infoRequested;
	}
	
	/**
	 * This method gets the requester of the info for the request
	 * @return the info requester
	 */
	@ManyToOne
	@Fetch(FetchMode.SELECT)
	public String getInfoRequester() {
		return infoRequester;
	}
	
	/**
	 * This method gets the date that the request was made
	 * @return the date Requested
	 */
	public Date getDateRequested() {
		return dateRequested;
	}
	
	/**
	 * This method gets the date that the information was obtained
	 * @return the date the information was obtained
	 */
	public Date getDateObatained() {
		return dateObtained;
	}
	
	
	/**
	 * This method gets the response to the request
	 * @return the response to the request
	 */
	public String getResponse() {
		return response;
	}
	
	/*
	 * MUTATORS
	 */
	
	/**
	 * This method sets the rfiNum's value
	 * @param num the rfiNum
	 */
	public void setrfiNum(int num) {
		this.rfiNum = num;
	}
	/**
	 * This method sets the type of project
	 * @param pType the project type
	 */
	public void setprojectType (String pType) {
		this.projectType = pType;
	}
	/**
	 * This method sets the information requested
	 * @param info the information requested
	 */
	public void setInfoRequested(String info) {
		this.infoRequested = info;
	}
	/**
	 * This method sets the requester of the info
	 * @param infoReq the info requester
	 */
	public void setInfoRequester(String infoReq) {
		this.infoRequester = infoReq;
	}
	/**
	 * This method sets date the request was made
	 * @param dateReq the date the request was made
	 */
	public void setDateRequested(Date dateReq) {
		this.dateRequested = dateReq;
	}
	
	/**
	 *This method sets the date the request was obtained
	 * @param dateObt the date the request was obtained
	 */
	public void setDateObtained(Date dateObt) {
		this.dateObtained = dateObt;
	}
	
	/**
	 * This method sets the response for the request
	 * @param res the response for the request
	 */
	public void setResponse(String res) {
		this.response = res;
	}
	
	
	
	
}
