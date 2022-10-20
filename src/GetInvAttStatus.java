

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.hibernate.cfg.Configuration;

import objects.RequestHandler;

/**
 * Servlet implementation class GetInvAttStatus
 */
@WebServlet("/GetInvAttStatus")
public class GetInvAttStatus extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String UPLOAD_DIRECTORY = "upload";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetInvAttStatus() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		

		
		Map<String, String> parameters = RequestHandler.getParameters((request.getParameterMap()));
		
		//Get the domain and desired action
		//String domain = parameters.get("domain");
		String action = parameters.get("action");
		
		System.out.println("Action is - " + action);
		
		if(action.equals("GetInvAttStatus")) {
			
			// constructs the directory path to store upload file
			String uploadPath = getServletContext().getRealPath("")
			    + File.separator + UPLOAD_DIRECTORY;
			
			//System.out.println("")
			
			final PrintWriter writer = response.getWriter();
			String status = parameters.get("invStatus");
			String invId = parameters.get("invId");
			String mcsPE = parameters.get("mcsPE");
			String host = parameters.get("host");
			
			//String path = "D:\\uploads\\";
			
			Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
			String invoiceLocation = configuration.getProperty("hibernate.invoice.location");
		  	
		  	//for local testing purpose
		    //final String path = "D:\\uploads\\";
		    
		    //for real deployment
		    //final String path = "\\\\192.168.0.250\\users2\\Saurabh\\";
			
			String path = invoiceLocation ;
			System.out.println("Invoice location is- " + path);
			path = path  + mcsPE + ".pdf";
			
			System.out.println(path);
			
			File tempFile = new File(path);

			boolean exists = tempFile.exists();
			
			if(exists) {
				writer.println("true");
			}
			else {
				writer.println("false");
			}
		}
		
		if(action.equals("GetInvoice")) {
			
			//PrintWriter out = response.getWriter();
			
			//ServletOutputStream out
			
			/*String mcsPE = parameters.get("mcsPE");
			String path = "D:\\uploads\\";
			path = path  + mcsPE + ".pdf";
			
			System.out.println(path);
			
			// File path is passed as parameter
	        File file = new File(path);
	        
	        int BUFF_SIZE = 1024;
	        byte[] buffer = new byte[BUFF_SIZE];
	        response.setContentType("application/pdf");
	        response.setHeader("Content-Type", "application/pdf");
	        FileInputStream fis = new FileInputStream(path);
	        //try (PrintWriter out = response.getWriter()) {
	        try  {
	           
	           response.setContentLength((int) file.length());
	            OutputStream os = response.getOutputStream();

	            try {
	                int byteRead = 0;
	                while ((byteRead = fis.read()) != -1) {
	                os.write(buffer, 0, byteRead);

	                }
	                os.flush();
	                } catch (Exception excp) {
	                excp.printStackTrace();
	            } finally {
	                os.close();
	                fis.close();
	            }
	        }
	        finally {
	        	
	        } */
	        
		
			
			/*
			 //get the filename from the "file" parameter
		      String fileName = (String) request.getParameter("mcsPE");
		      if (fileName == null || fileName.equals(""))
		           throw new ServletException(
		            "Invalid or non-existent file parameter in SendPdf servlet.");
		      
		      // add the .pdf suffix if it doesn't already exist
		      if (fileName.indexOf(".pdf") == -1)
		          fileName = fileName + ".pdf";
		          
		      //where are PDFs kept?
		     String pdfDir = "D:\\uploads\\";
		     if (pdfDir == null || pdfDir.equals(""))
		           throw new ServletException(
		             "Invalid or non-existent 'pdfDir' context-param.");
		          
		     ServletOutputStream stream = null;
		     BufferedInputStream buf = null;
		     try{
		     
		     stream = response.getOutputStream( );
		     File pdf = new File(pdfDir + "/" + fileName);
		     
		     //set response headers
		     response.setContentType("application/pdf");
		      
		     response.addHeader("Content-Disposition","attachment; filename="+fileName );

		     //response.addHeader("Content-Disposition","inline; filename="+fileName );

		     
		     response.setContentLength( (int) pdf.length( ) );
		      
		     FileInputStream input = new FileInputStream(pdf);
		     buf = new BufferedInputStream(input);
		     int readBytes = 0;

		     //read from the file; write to the ServletOutputStream
		     while((readBytes = buf.read( )) != -1)
		        stream.write(readBytes);

		     } catch (IOException ioe){
		     
		        throw new ServletException(ioe.getMessage( ));
		         
		     } finally {
		         
		     //close the input/output streams
		         if (stream != null)
		             stream.close( );
		          if (buf != null)
		          buf.close( );
		     }*/
			String host = parameters.get("host");
			final PrintWriter writer = response.getWriter();
			System.out.println("Host address is" + host);
			
			//String temppath = getServletContext().getResource("").toString();
			//String temppath = getServletContext().getRealPath("");
			
			//System.out.println("Upload base path is- " + temppath);
			
			
			
			
			// constructs the directory path to store upload file
			String uploadPath = getServletContext().getRealPath("")
					+ File.separator + UPLOAD_DIRECTORY;
			//String uploadPath = getServletContext().getRealPath("");
					
			System.out.println("Upload path is " + uploadPath);
			
			String pathForServer = uploadPath.substring(10);
			System.out.println("Path for server is -" + pathForServer);
			
			String fileName = (String) request.getParameter("mcsPE");
			fileName = fileName + ".pdf";
			//String pdfDir = "D:\\uploads\\";
			Configuration configuration= new Configuration().configure("hibernate.cfg.xml");
			String pdfDir = configuration.getProperty("hibernate.invoice.location");
			File pdf = new File(pdfDir + "/" + fileName);
			
			final String dir = System.getProperty("user.dir");
	        System.out.println("current dir = " + dir);
	        //String newFile = "D:\\Bikky\\MillerConstruction\\github\\MillerRebuilt\\WebContent\\tempfiles\\" + fileName;
	        String newFile = uploadPath + File.separator + fileName;
	        
	        //System.out.println(newFile);
	        
	        File source = new File(pdfDir + "\\" + fileName);
	        File dest = new File(newFile);
	        try {
	            FileUtils.copyFile(source, dest);
	            writer.println("true");
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        
		} 
	}

}
