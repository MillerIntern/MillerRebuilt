package projectObjects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *	This holds data for all close out information on a particular project
 *
 *  @author Brian Fitzpatrick
 *
 */
@Entity
public class CloseoutCheckList extends ProjectObject
{
	@ManyToOne
	@JoinColumn(name = "generalCloseout_id")
	private GeneralCloseout generalCloseout;
	
	@ManyToOne
	@JoinColumn(name = "inspectionCloseout_id")
	private InspectionCloseout inspectionCloseout;
	
	@ManyToOne
	@JoinColumn(name = "hvacCloseout_id")
	private HvacCloseout hvacCloseout;
	
	@ManyToOne
	@JoinColumn(name = "refrigCloseout_id")
	private RefrigCloseout refrigCloseout;
	
	@ManyToOne
	@JoinColumn(name = "aiaCloseout_id")
	private AIACloseout aiaCloseout;
	
	public CloseoutCheckList(GeneralCloseout generalCloseout, InspectionCloseout inspectionCloseout, HvacCloseout hvacCloseout, RefrigCloseout refrigCloseout, AIACloseout aiaCloseout)
	{
		this.generalCloseout = generalCloseout;
		this.inspectionCloseout = inspectionCloseout;
		this.hvacCloseout = hvacCloseout;
		this.refrigCloseout = refrigCloseout;
		this.aiaCloseout = aiaCloseout;
	}
	
	public CloseoutCheckList()
	{
		this.generalCloseout = new GeneralCloseout();
		this.inspectionCloseout = new InspectionCloseout();
		this.hvacCloseout = new HvacCloseout();
		this.refrigCloseout = new RefrigCloseout();
		this.aiaCloseout = new AIACloseout();
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public GeneralCloseout getGeneralCloseout()
	{
		return generalCloseout;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public InspectionCloseout getInspectionCloseout()
	{
		return inspectionCloseout;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public HvacCloseout getHvacCloseout()
	{
		return hvacCloseout;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public RefrigCloseout getRefrigCloseout()
	{
		return refrigCloseout;
	}
	
	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public AIACloseout getAiaCloseout()
	{
		return aiaCloseout;
	}
	
	public void setGeneralCloseout(GeneralCloseout gc)
	{
		this.generalCloseout = gc;
	}
	
	public void setInspectionCloseout(InspectionCloseout ic)
	{
		this.inspectionCloseout = ic;
	}
	
	public void setHvacCloseout(HvacCloseout hc)
	{
		this.hvacCloseout = hc;
	}
	
	public void setRefrigCloseout(RefrigCloseout rc)
	{
		this.refrigCloseout = rc;
	}
	
	public void setAiaCloseout(AIACloseout ac)
	{
		this.aiaCloseout = ac;
	}
}
