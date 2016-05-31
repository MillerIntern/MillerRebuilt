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
public class AIACloseout extends ProjectObject{
	
	@ManyToOne
	@JoinColumn(name = "mulvannyPunchList_id")
	private CloseoutInfo mulvannyPunchList;
	
	@ManyToOne
	@JoinColumn(name = "substantialCompletion_id")
	private CloseoutInfo substantialCompletion;

	@ManyToOne
	@JoinColumn(name = "subcontractorWarranty_id")
	private CloseoutInfo subcontractorWarranty;
	
	
	@ManyToOne
	@JoinColumn(name = "mcsWarranty_id")
	private CloseoutInfo mcsWarranty;
	
	@ManyToOne
	@JoinColumn(name = "lienRelease_id")
	private CloseoutInfo lienRelease;
	
	
	@ManyToOne
	@JoinColumn(name = "g704_id")
	private CloseoutInfo confirmCos;
	private CloseoutInfo G704;
	
	
	@ManyToOne
	@JoinColumn(name = "g706_id")
	private CloseoutInfo G706;
	
	@ManyToOne
	@JoinColumn(name = "g706A_id")
	private CloseoutInfo G706A;
	
	public AIACloseout(CloseoutInfo mPL, CloseoutInfo sC, CloseoutInfo scW, CloseoutInfo mcsW, CloseoutInfo lR, CloseoutInfo ccos, CloseoutInfo g74, CloseoutInfo g76, CloseoutInfo g76a)
	{
		this.mulvannyPunchList = mPL;
		this.substantialCompletion = sC;
		this.subcontractorWarranty = scW;
		this.mcsWarranty = mcsW;
		this.lienRelease = lR;
		this.confirmCos = ccos;
		this.G704 = g74;
		this.G706 = g76;
		this.G706A = g76a;	
	}
	
	public AIACloseout()
	{
		this.mulvannyPunchList = null;
		this.substantialCompletion = null;
		this.subcontractorWarranty = null;
		this.mcsWarranty = null;
		this.lienRelease = null;
		this.confirmCos = null;
		this.G704 = null;
		this.G706 = null;
		this.G706A = null;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getMulvannyPunchList()
	{
		return this.mulvannyPunchList;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getSubstantialCompletion()
	{
		return this.substantialCompletion;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getSubcontratorWarranty()
	{
		return this.subcontractorWarranty;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getMcsWarranty()
	{
		return this.mcsWarranty;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getLienRelease()
	{
		return this.lienRelease;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getConfirmCos()
	{
		return this.confirmCos;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getG704()
	{
		return this.G704;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getG706()
	{
		return this.G706;
	}

	@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public CloseoutInfo getG706A()
	{
		return this.G706A;
	}
	
	public void setMulvannyPunchList(CloseoutInfo mPL)
	{
		 this.mulvannyPunchList = mPL;
	}
	
	public void setSubstantialCompletion(CloseoutInfo sC)
	{
		 this.substantialCompletion = sC;
	}
	
	public void setSubcontratorWarranty(CloseoutInfo sW)
	{
		 this.subcontractorWarranty = sW;
	}
	
	public void setMcsWarranty(CloseoutInfo mcsW)
	{
		 this.mcsWarranty = mcsW;
	}
	
	public void setLienRelease(CloseoutInfo lR)
	{
		 this.lienRelease = lR;
	}
	
	public void setConfirmCos(CloseoutInfo ccos)
	{
		 this.confirmCos = ccos;
	}
	
	public void setG704(CloseoutInfo a)
	{
		 this.G704 = a;
	}
	
	public void setG706(CloseoutInfo a)
	{
		 this.G706 = a;
	}
	
	public void setG706A(CloseoutInfo a)
	{
		 this.G706A = a;
	}
	
}
