package projectObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * This enumerating represents regions that a Warehouse may be associated with.
 * The enumerations are all of the cardinal directions (north, south, east, west, etc), with the exception of PR (puerto rico)
 * and MW (mid west).
 * @author Alex Campbell
 *
 */
public enum Region 
{
	NE(1, "NE"), N(2, "N"), NW(3, "NW"), W(4, "W"),
	SW(5, "SW"), S(6, "S"), SE(7, "SE"), E(8, "E"), 
	PR(9, "PR"), MW(10, "MW"), UNKNOWN(11, "UNKNOWN");
	
	int num;
	String name;
	
	Region(int n, String name)
	{
		this.num = n;
		this.name = name;
	}
	
	/**
	 * This method returns the full name of a region enumeration
	 * @return the region's full name
	 */
	public synchronized String getRegionName()
	{
		return name;
	}
	
	/**
	 * This method returns the "id" of a region enumeration
	 * @return the region's "id"
	 */
	public synchronized int getRegionNum()
	{
		return num;
	}
	
	/**
	 * This method returns all of the regions in a list
	 * @return a list of all the regions.
	 */
	public synchronized static List<Region> returnAllAsList()
	{
		Region [] rs = Region.values();
		ArrayList<Region> list = new ArrayList<Region>(Arrays.asList(rs));
		
		return list;
	}
}
