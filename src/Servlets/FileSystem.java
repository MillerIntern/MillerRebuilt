package Servlets;

import java.io.BufferedOutputStream;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.*;
import static java.nio.file.StandardOpenOption.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

import com.google.gson.Gson;

import objects.RequestHandler;
import projectObjects.City;
import projectObjects.EquipmentVendor;
import projectObjects.Person;
import projectObjects.ProjectItem;
import projectObjects.Region;
import projectObjects.State;
import projectObjects.Warehouse;
import services.LoginService;
import services.ProjectObjectService;


@WebServlet(description = "Servlet for handling filing requests", urlPatterns = { "/FileSystem" })
@MultipartConfig
public class FileSystem extends HttpServlet 
{	
	private static OutputStream out;
	
	private static final long serialVersionUID = 1L;   


    public FileSystem() 
    {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException 
	{
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Project.java\nIN: doPost()\nTime of transaction: " + timeStamp);
		
		File downloadFile = new File("/Users/andrewserensits/eclipse/jee-neon/Eclipse.app/Contents/MacOS/EmployeeFiles/NewTest.xlsx");
	        System.out.println("++++" + downloadFile.getAbsolutePath());
//	      System.out.println(uploadPathTemp+mergeFileName);
	        FileInputStream inStream = new FileInputStream(downloadFile);
	         // obtains ServletContext
	         ServletContext context = getServletContext();

	         // gets MIME type of the file
	         String mimeType = context.getMimeType(downloadFile.getCanonicalPath());
	         System.out.println("mimeType = " + mimeType);
	         if (mimeType == null) {        
	             // set to binary type if MIME mapping not found
	             mimeType = "application/octet-stream";
	         }

	         // modifies response
	         resp.setContentType(mimeType);
	         resp.setContentLength((int) downloadFile.length());

	         // forces download
	         String headerKey = "Content-Disposition";
	         String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
	         System.out.println(downloadFile.getName());
	         resp.setHeader(headerKey, headerValue);

	         // obtains response's output stream
	         OutputStream outStream = resp.getOutputStream();

	         byte[] buffer = new byte[4096];
	         int bytesRead = -1;

	         while ((bytesRead = inStream.read(buffer)) != -1) {
	             outStream.write(buffer, 0, bytesRead);
	         }

	         inStream.close();
	         outStream.close();

		


	}

	@SuppressWarnings("deprecation")
	protected synchronized void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
		String timeStamp = new SimpleDateFormat("[MM/dd/yyyy] @ HH.mm.ss").format(new java.util.Date());
		System.out.println("SERVLET: Project.java\nIN: doPost()\nTime of transaction: " + timeStamp);
		//String description = request.getParameter("description"); // Retrieves <input type="text" name="description">
	    Part filePart = request.getPart("file"); // Retrieves <input type="file" name="file">
	   // String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
	    String fileName = "SamplePDF.pdf";
	    InputStream fileContent = filePart.getInputStream();
	    // ... (do your job here)
		byte[] buffer = new byte[fileContent.available()];
		fileContent.read(buffer);
		
		File targetFile = new File("EmployeeFiles/WillItWork.xlsx");
		OutputStream outStream = new FileOutputStream(targetFile);
		outStream.write(buffer);
		outStream.close();
	 

	   
        
		
		
		
	}
	
	private synchronized static String getFilename(Part part) {
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                String filename = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
                System.out.println("FILE NAME = " + filename);
                return filename.substring(filename.lastIndexOf('/') + 1).substring(filename.lastIndexOf('\\') + 1); // MSIE fix.
            }
        }
        return null;
    }
}