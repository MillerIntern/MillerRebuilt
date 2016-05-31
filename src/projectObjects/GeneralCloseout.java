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
public class GeneralCloseout extends ProjectObject {

	@ManyToOne
	@JoinColumn(name = "asBuilts_id")
	private CloseoutInfo asBuilts;
	
	@ManyToOne
	@JoinColumn(name = "punchList_id")
	private CloseoutInfo punchList;
	
	@ManyToOne
	@JoinColumn(name = "permitsClosed_id")
	private CloseoutInfo permitsClosed;
	
	@ManyToOne
	@JoinColumn(name = "closeOutPhotos_id")
	private CloseoutInfo closeOutPhotos;
	
	@ManyToOne
	@JoinColumn(name = "revisions_id")
	private CloseoutInfo revisions;
		
		public GeneralCloseout(CloseoutInfo asBuilts, CloseoutInfo punchList, CloseoutInfo permitsClosed, CloseoutInfo closeOutPhotos, CloseoutInfo revisions)
		{
			this.asBuilts = asBuilts;
			this.punchList = punchList;
			this.permitsClosed = permitsClosed;
			this.closeOutPhotos = closeOutPhotos;
			this.revisions = revisions;
		}
		
		public GeneralCloseout()
		{
			this.asBuilts = null;
			this.punchList = null;
			this.permitsClosed = null;
			this.closeOutPhotos = null;
			this.revisions = null;
		}

		@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
		@Fetch(FetchMode.SELECT)
		@JoinColumn
		public CloseoutInfo getAsBuilts()
		{
			return this.asBuilts;
		}
		

		@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
		@Fetch(FetchMode.SELECT)
		@JoinColumn
		public CloseoutInfo getPunchList()
		{
			return this.punchList;
		}
		

		@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
		@Fetch(FetchMode.SELECT)
		@JoinColumn
		public CloseoutInfo getPermitsClosed()
		{
			return this.permitsClosed;
		}
		

		@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
		@Fetch(FetchMode.SELECT)
		@JoinColumn
		public CloseoutInfo getCloseOutPhotos()
		{
			return this.closeOutPhotos;
		}
		

		@OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
		@Fetch(FetchMode.SELECT)
		@JoinColumn
		public CloseoutInfo getRevisions()
		{
			return this.revisions;
		}
		
		public void setAsBuilts(CloseoutInfo aB)
		{
			this.asBuilts = aB;
		}
		
		public void setPunchList(CloseoutInfo pL)
		{
			this.punchList = pL;
		}
		
		public void setPermitsClosed(CloseoutInfo pC)
		{
			this.permitsClosed = pC;
		}
		
		public void setCloseOutPhotos(CloseoutInfo cP)
		{
			this.closeOutPhotos = cP;
		}
		
		public void setRevisions(CloseoutInfo r)
		{
			this.revisions = r;
		}		
}
