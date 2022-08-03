package Servlets;

import java.io.*;
import java.util.Map;

import javax.servlet.*;
import javax.servlet.http.*;

import org.hibernate.cfg.Configuration;

import objects.RequestHandler;

import javax.servlet.annotation.*;
/* The Java file upload Servlet example */

@WebServlet(name = "InvUpload", urlPatterns = { "/fileuploadservlet" })
@MultipartConfig(
  fileSizeThreshold = 1024 * 1024 * 1, // 1 MB
  maxFileSize = 1024 * 1024 * 10,      // 10 MB
  maxRequestSize = 1024 * 1024 * 100   // 100 MB
)
public class InvUpload extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;
    
    private static final String UPLOAD_PATH = "D:/uploads";
	
	protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		out = response.getWriter();
		out.println("Invoice upload called");
		
		// TODO Auto-generated method stub
	    doPost(request,response);
		
		//doPost(req, resp);
	}

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    /* Receive file uploaded to the Servlet from the HTML5 form */
	
	  
	  	response.setContentType("text/html;charset=UTF-8");

	    // Create path components to save the file
	  	
	  	Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
		String invoiceLocation = configuration.getProperty("hibernate.invoice.location");
	  	
	  	//for local testing purpose
	    //final String path = "D:\\uploads\\";
	    
	    //for real deployment
	    //final String path = "\\\\192.168.0.250\\users2\\Saurabh\\";
		
		final String path = invoiceLocation;
		System.out.println("Invoice location is- " + path);
		
	  	final Part filePart = request.getPart("filepdf");
	    //final String fileName = getFileName(filePart);
	    final Part fileNamePart = request.getPart("fileName");
	    
	    final String fileName = request.getParameter("fileName") + ".pdf";
	    
	    System.out.println(fileName);

	    OutputStream out = null;
	    InputStream filecontent = null;
	    final PrintWriter writer = response.getWriter();

	    try {
	        out = new FileOutputStream(new File(path + File.separator
	                + fileName));
	        filecontent = filePart.getInputStream();

	        int read = 0;
	        final byte[] bytes = new byte[1024];

	        while ((read = filecontent.read(bytes)) != -1) {
	            out.write(bytes, 0, read);
	        }
	        //writer.println("New file " + fileName + " created at " + path);
	        writer.println("true");

	    } catch (FileNotFoundException fne) {
	        writer.println("You either did not specify a file to upload or are "
	                + "trying to upload a file to a protected or nonexistent "
	                + "location.");
	        writer.println("<br/> ERROR: " + fne.getMessage());

	    } finally {
	        if (out != null) {
	            out.close();
	        }
	        if (filecontent != null) {
	            filecontent.close();
	        }
	        if (writer != null) {
	            writer.close();
	        }
	    }
	}

	private String getFileName(final Part part) {
	    final String partHeader = part.getHeader("content-disposition");
	    //LOGGER.log(Level.INFO, "Part Header = {0}", partHeader);
	    for (String content : part.getHeader("content-disposition").split(";")) {
	        if (content.trim().startsWith("filename")) {
	            return content.substring(
	                    content.indexOf('=') + 1).trim().replace("\"", "");
	        }
	    }
	    return null;
	}
}