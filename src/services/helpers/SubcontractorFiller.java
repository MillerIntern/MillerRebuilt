package services.helpers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import projectObjects.Person;
import projectObjects.Project;
import projectObjects.ProjectClass;
import projectObjects.ProjectItem;
import projectObjects.ProjectStage;
import projectObjects.ProjectStatus;
import projectObjects.ProjectType;
import projectObjects.Region;
import projectObjects.State;
import projectObjects.Task;
import projectObjects.TaskStatus;
import projectObjects.User;
import projectObjects.Warehouse;
import projectObjects.Subcontractor;
import projectObjects.City;


import services.ProjectObjectService;
import java.util.List;

public class SubcontractorFiller {

	/**
	 * @param t
	 * @param parameters
	 */
	public synchronized static void fillSubcontractorInformation(Subcontractor s, Map<String, String> parameters) throws ParseException, ClassNotFoundException {
		DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		int region = Integer.parseInt(parameters.get("region"));
		String trades = parameters.get("trades");
		String name = parameters.get("name");
		String contacts = parameters.get("contacts");
		String phone = parameters.get("phone");
		String mobile = parameters.get("mobile");
		String email = parameters.get("email");
		String workRegion = parameters.get("workRegion");
		String address = parameters.get("address");
		String state = parameters.get("state");
		String zip = parameters.get("zip");
		String notes = parameters.get("notes");
		int rank = Integer.parseInt(parameters.get("rank"));
		String cityID = parameters.get("cityID");
		
		List<Region> regions = Region.returnAllAsList();
		Region correctRegion = null;
		for(Region reg: regions){
			if(reg.getRegionNum() == region){
				correctRegion = reg;
				break;
			}
		}
		
		List<State> states = State.returnAllAsList();
		State correctState = null;
		for(State st: states){
			if(st.getName() == state){
				correctState = st;
				break;
			}
		}
		
		
		s.setAddress(address);
		s.setRegion(correctRegion);
		s.setCity((City) ProjectObjectService.get(Long.parseLong(cityID), "City"));
		s.setTrades(trades);
		s.setName(name);
		s.setContacts(contacts);
		s.setPhone(phone);
		s.setMobile(mobile);
		s.setEmail(email);
		s.setWorkRegion(workRegion);
		s.setAddress(address);
		s.setState(correctState);
		s.setZip(zip);
		s.setNotes(notes);
		s.setRank(rank);

		
	}
}
