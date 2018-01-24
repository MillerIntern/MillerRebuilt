package projectObjects;

import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import services.ProjectObjectService;


@Entity
public class Subcontractor extends ProjectObject {
	
	private String name;
	
	private String email;
	
	public Subcontractor(String name , String email){
		this.name = name;
		this.email = email;
	}
	
	public Subcontractor(){
		this.name = null;
		this.email = null;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public synchronized static Subcontractor mapNameToSubcontractor(String name) {
		
		if (name == null) return null;
		
		name = name.replaceAll("\\s+","");	
		
		String subName;


		List<Object> subcontractors = ProjectObjectService.getAll("Subcontractor");
		
		for (int i = 0; i < subcontractors.size(); i++) {
			Subcontractor u = (Subcontractor)subcontractors.get(i);
			
			subName = u.getName();
			
			if(subName == null)
				continue;
			
			subName = subName.replaceAll("\\s+","");	

			
			if(subName.equalsIgnoreCase(name)) {
				return u;
			}
		}
		
		return null;
	}

}
	
