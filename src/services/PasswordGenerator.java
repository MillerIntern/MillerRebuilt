package services;

import objects.HashGen;

import java.util.Scanner;

public class PasswordGenerator {
	
	public static void main(String [] args)
	{
		Scanner scan = new Scanner(System.in);
		HashGen hG = new HashGen();
		
		System.out.println("Enter the password to be hashed");
		String pass = scan.next();
		try{
			pass = hG.getHash(pass);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		scan.close();
	}
}
