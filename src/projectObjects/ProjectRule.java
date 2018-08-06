package projectObjects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
public class ProjectRule extends ProjectObject
{
	private RuleDomain domain;
	private String title;
	private String field1;
	private String field2;
	private RuleSeverity severity;
	private Project project;
	private ProjectClass projectClass;
	private String failMessage;
	private String passMessage;
//	private String passed;
	
	public ProjectRule()
	{
		domain = null;
		field1 = null;
		field2 = null;
		severity = null;
		project = null;
		projectClass = null;
		failMessage = null;
		passMessage = null;
//		passed = null;
		title = null;
	}
	
	public ProjectRule(RuleDomain _domain , String _field1, String _field2, RuleSeverity _severity , Project _project , ProjectClass _projectClass , String _fail, 
			String _pass , String _title)
	{
		domain = _domain;
		severity = _severity;
		field1 = _field1;
		field2 = _field2;
		project = _project;
		projectClass = _projectClass;
		failMessage = _fail;
		passMessage = _pass;
//		passed = _passed;
		title = _title;
	}
	
	public String getField1()
	{
		return field1;
	}
	
	public void setField1(String _field)
	{
		field1 = _field;
	}
	
	public String getField2()
	{
		return field2;
	}
	
	public void setField2(String _field)
	{
		field2 = _field;
	}
	
	public RuleDomain getDomain()
	{
		return domain;
	}
	
	public void setDomain(RuleDomain dom)
	{
		this.domain = dom;
	}
	
	public RuleSeverity getSeverity()
	{
		return severity;
	}
	
	public void setSeverity(RuleSeverity _severity)
	{
		severity = _severity;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public Project getProject()
	{
		return project;
	}
	
	public void setProject(Project _project)
	{
		project = _project;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	public ProjectClass getProjectClass()
	{
		return projectClass;
	}
	
	public void setProjectClass(ProjectClass _projectClass)
	{
		projectClass = _projectClass;
	}
	
	public String getFailMessage()
	{
		return failMessage;
	}
	
	public void setFailMessage(String message)
	{
		failMessage = message;
	}
	
	public String getPassMessage()
	{
		return passMessage;
	}
	
	public void setPassMessage(String message)
	{
		passMessage = message;
	}

	
	public String getTitle()
	{
		return title;
	}
	
	public void setTitle(String _title)
	{
		title = _title;
	}
	
	public boolean evaluate(boolean _result)
	{
			
		System.out.println("RESULT = " + _result);
		
		if(_result)
			return true;
		else
			return false;
	}
}
