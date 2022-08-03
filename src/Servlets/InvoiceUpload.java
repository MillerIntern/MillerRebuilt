package Servlets;

import java.io.IOException;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import org.apache.commons.lang3.StringUtils;

import services.LoginService;

/**
 * Servlet implementation class Login
 */
@WebServlet(description = "Invoice upload servlet", urlPatterns = { "/InvoiceUpload" })
@MultipartConfig
public class InvoiceUpload extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;
    
    private static final String UPLOAD_PATH = "D:/uploads";
    
    
    
        
    public InvoiceUpload() 
    {
        super();
    }
    
    /*private String getFileName(final Part part) {
	    final String partHeader = part.getHeader("content-disposition");
	    //LOGGER.log(Level.INFO, "Part Header = {0}", partHeader);
	    for (String content : part.getHeader("content-disposition").split(";")) {
	        if (content.trim().startsWith("filename")) {
	            return content.substring(
	                    content.indexOf('=') + 1).trim().replace("\"", "");
	        }
	    }
	    return null;
	} */
    
    /**
     * Method to get file name from HTTP header content-disposition
     */
    private String getFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length() - 1);
            }
        }
        return null;
    }

	protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		out = response.getWriter();
		out.println("Invoice upload called");
		
		// TODO Auto-generated method stub
	    doPost(request,response);
		
		//doPost(req, resp);
	}

	protected synchronized void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{       
			
		/* Receive file uploaded to the Servlet from the HTML5 form */
		Part filePart = request.getPart("file");
	    String fileName = filePart.getSubmittedFileName();
	    
	    System.out.println(fileName);
	    
	    
	    for (Part part : request.getParts()) {
	      part.write("D:\\uploads\\" + fileName);
	    }
	    response.getWriter().print("FILE_UPLOADED");
	  }
	
	
}

