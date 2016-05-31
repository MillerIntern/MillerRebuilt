package projectObjects;

import java.lang.reflect.Field;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.NonUniqueObjectException;

/**
 * This class serves as the base for all project objects that can be stored in the database.
 * All database objects must have ids, and method for getting/setting these ids.
 * @author Alex Campbell
 *
 */
@MappedSuperclass
public abstract class ProjectObject 
{
	/**
	 * The database id of this object
	 */
	Long id;
	
	/**
	 * This method returns the id of this object. The annotation of the method
	 * tells the database to autogenerate the id when it is added to the database
	 * so that the id is unique.
	 * @return
	 */
	@GeneratedValue(strategy = GenerationType.AUTO)
	//@GeneratedValue(strategy=GenerationType.AUTO, generator="my_entity_seq_gen")
	//@SequenceGenerator(name="my_entity_seq_gen", sequenceName="MY_ENTITY_SEQ")
	@Id
	public Long getId()throws NonUniqueObjectException {
		return id;
	}
	
	/**
	 * This method sets the id of the object.
	 * @param id
	 */
	public void setId(Long id)
	{
		this.id = id;
	}
	
	/**
	 * This method returns an array of the ProjectObject's field names
	 * @return an array of the object's field names
	 */
	public static String [] getFieldNames()
	{
		Field [] fields = Project.class.getFields();
		String [] names = new String[fields.length];
		for (int i = 0; i < fields.length; i++)
		{
			names[i] = fields[i].getName();
		}
		
		return names;
	}
}
