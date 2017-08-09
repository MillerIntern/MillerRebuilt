package projectObjects;

import javax.persistence.Entity;

@Entity
public class ProjectType extends ProjectObject {

		String name;
		
		public ProjectType(String name)
		{
			this.name = name;
		}
		
		public ProjectType()
		{
			name = null;
		}
		
		public synchronized String getName()
		{
			return this.name;
		}
		
		public synchronized void setName(String name)
		{
			this.name = name;
		}
		

		
}
