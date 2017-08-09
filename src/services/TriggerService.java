package services;

import java.util.ArrayList;

import objects.TriggerOld;

import org.hibernate.criterion.Restrictions;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * This was a previous mockup of the trigger system where triggers were not actually saved to the database and not
 * dynamic whatsoever. --- Gone Unused
 */
public class TriggerService
{
	/**
	 * This holds all of the triggers of the system
	 */
	ArrayList<TriggerOld> triggers;
	
	Long projectNum;

	public TriggerService()
	{
		triggers = new ArrayList<TriggerOld>();
		initializeTriggers();
	}

	public TriggerService(long pID)
	{
		triggers = new ArrayList<TriggerOld>();
		projectNum = pID;
		initializeTriggers();
	}

	/**
	 * This method creates all of the triggers
	 */
	public synchronized void initializeTriggers()
	{
		triggers.add(getInvoiceTrigger());
		triggers.add(getUnassignedMCS());
		triggers.add(costcoDueDateInfo());
		triggers.add(costcoDueDateWarning());
		triggers.add(costcoDueDateSevere());
		triggers.add(startDateInfo());
		triggers.add(startDateWarning());
		triggers.add(startDateSevere());
		triggers.add(scheduledTurnOverInfo());
		triggers.add(scheduledTurnOverWarning());
		triggers.add(scheduledTurnOverSevere());
	}

	/**
	 * This method creates a Trigger that is fired when a project's "should Invoice" field is greater
	 * than a project's "invoiced" field.
	 * @return the Invoice Trigger
	 */
	public synchronized TriggerOld getInvoiceTrigger()
	{
		String desc = "Should Invoice/Actual Invoice Mismatch";
		TriggerOld s = new TriggerOld(1, desc);
		s.addExpression(Restrictions.sqlRestriction("(shouldInvoice - invoiced) != 0"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects have an MCS number that is -1
	 * @return the MCSNumber trigger
	 */
	public synchronized TriggerOld getUnassignedMCS()
	{
		String desc = "MCS Number not assigned";
		TriggerOld s = new TriggerOld(1, desc);
		s.addExpression(Restrictions.sqlRestriction("mcsNumber = -1 AND stage_id = 2"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next 2 weeks
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld startDateInfo()
	{
		String desc = "Project is starting soon!";
		TriggerOld s = new TriggerOld(0, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledStartDate,INTERVAL 14 DAY) and DATE_SUB(scheduledStartDate,INTERVAL 7 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next 1 week
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld startDateWarning()
	{
		String desc = "Project is starting soon!";
		TriggerOld s = new TriggerOld(1, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledStartDate,INTERVAL 6 DAY) and DATE_SUB(scheduledStartDate,INTERVAL 3 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next 3 days
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld startDateSevere()
	{
		String desc = "Project is starting soon!";
		TriggerOld s = new TriggerOld(2, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledStartDate,INTERVAL 2 DAY) and scheduledStartDate"));
		return s;
	}

	public synchronized TriggerOld costcoDueDateInfo()
	{
		String desc = "Costco due date is soon!";
		TriggerOld s = new TriggerOld(0, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(costcoDueDate,INTERVAL 7 DAY) and DATE_SUB(costcoDueDate,INTERVAL 4 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next 1 week
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld costcoDueDateWarning()
	{
		String desc = "Costco due date is soon!";
		TriggerOld s = new TriggerOld(1, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(costcoDueDate,INTERVAL 3 DAY) and DATE_SUB(costcoDueDate,INTERVAL 2 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next day
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld costcoDueDateSevere()
	{
		String desc = "Costco due date is soon!";
		TriggerOld s = new TriggerOld(2, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(costcoDueDate,INTERVAL 1 DAY) and costcoDueDate"));
		return s;
	}
	
	public synchronized TriggerOld scheduledTurnOverInfo()
	{
		String desc = "Turn over is soon!";
		TriggerOld s = new TriggerOld(0, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledTurnover,INTERVAL 7 DAY) and DATE_SUB(scheduledTurnover,INTERVAL 4 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next 1 week
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld scheduledTurnOverWarning()
	{
		String desc = "Turn over is soon!";
		TriggerOld s = new TriggerOld(1, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledTurnover,INTERVAL 3 DAY) and DATE_SUB(scheduledTurnover,INTERVAL 2 DAY)"));
		return s;
	}

	/**
	 * This method creates a trigger that is fired when any projects are starting in the next day
	 * @return the timeElapsed
	 */
	public synchronized TriggerOld scheduledTurnOverSevere()
	{
		String desc = "Turn over is soon!";
		TriggerOld s = new TriggerOld(2, desc);
		s.addExpression(Restrictions.sqlRestriction("CURDATE() between DATE_SUB(scheduledTurnover,INTERVAL 1 DAY) and scheduledTurnover"));
		return s;
	}

	/**
	 * This method returns all of the project triggers as JSON variables
	 * @return A string representing the triggers as Json objects
	 */
	public synchronized String getAllTriggersAsJson()
	{
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();

		for (int i = 0; i < triggers.size(); i++)
		{
			triggers.get(i).runTrigger();
		}

		return gson.toJson(triggers);
	}

	/**
	 * This method returns all of the project triggers as JSON variables
	 * @return A string representing the triggers as Json objects
	 */
	public synchronized String getAllSpecificTriggersAsJson()
	{
		Gson gson = new GsonBuilder().setDateFormat("MM/dd/yyyy").create();
		for (int i = 0; i < triggers.size(); i++)
		{
			triggers.get(i).runCertainTrigger(projectNum);
		}

		return gson.toJson(triggers);
	}
}
