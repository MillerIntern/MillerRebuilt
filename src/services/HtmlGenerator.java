package services;

/**
 * This class generates HTML that is commonly used throughout the application
 * @author Alex Campbell
 * 
 * Modified by Brian Fitzpatrick
 */
public class HtmlGenerator 
{
	/**
	 * This method returns a String that contains the HTML code that defines the document's
	 * scripts and css imports, the navigation menu, and the structure of the document's body.
	 * @return HTML code.
	 */
	public static String generateHtmlHeader(String pageTitle)
	{
		String html = "<!DOCTYPE html><html id='hmtl'><head>"
			+ "<script type='text/javascript' src='DataTables-1.10.0/media/js/jquery.js' ></script>"
			//+ "<script type='text/javascript' src='css/theme/currentTheme/global.css'></script>"
			+ "<script type='text/javascript' src='DataTables-1.10.0/media/js/jquery.dataTables.js'></script>"
			+ "<script type='text/javascript' src='DataTables-1.10.0/extensions/TableTools/js/dataTables.tableTools.js'></script>"
			+ "<link rel='stylesheet' type='text/css' href='DataTables-1.10.0/media/css/jquery.dataTables.css'>"
			+ "<link href='DataTables-1.10.0/extensions/TableTools/css/dataTables.tableTools.css' type='text/css' rel='stylesheet'>"
			+ "<script type='text/javascript' src='js/global.js'></script>"
			+ "<script type='text/javascript' src='js/report.js'></script>"
			+ "<title>" + pageTitle + "</title>"
			+ "<meta charset='UTF-8'>"
			+ "</head>"

			+ "<body id='body'>"
			+ "<div id='content'>";
		
		return html;
	}
	
	//This method returns a string that closes the body and html tag of an html document.
	public static String generateHtmlCloser()
	{
		String html = "</body></html>";
		return html;
	}
}
