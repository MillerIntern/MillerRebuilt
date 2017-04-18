# Miller Rebuilt
### The objective of this file is to explain the system to anyone who is working on it.
#### Original Authors: Brian Fitzpatrick and Alex Campbell

#### Maintenance: Chris Taormino

###### Summer 2015: Ken Bayron 

#### Vast* Improvements and Rebuilding: Josh Mackin


This system is designed to present a front end for a database of projects. The objective is to allow 
Miller Personnel to maintain and query the database of projects while also generating reports based on 
the database. 

The homepage is the first page beyond the login that Miller Personnel will access. 
The page simply contains the nav bar which is present through the entire application, a place to put
notes and reminders and quick tools for ease of access. Most of the important functions though are 
found in the nav bar;

###Find Project
	Find Project is the page which allows Miller Personel to search for and then edit projects.
    
Clicking the button sends you to findProject.html whichs allows the user to query based on any 
basic project information. The two default fields are kept as Warehouse and Stage as the legacied
editProject.html had those as required fields. These parameters then filter the 
projects for display.

Clicking any of the displayed projects brings you to that project's projectManager.html page. 
This page allows the user the change any information inside a project and then save the 
changes. The projectManager page redirects users to other pages so that they can edit complex 
project information. This information is submitted in ajax requests to our java servlets. 

The post request is handled by Project.java in Servlets. The doPost() function operates 
on the action variable in the request. It uses the parameters map in the request to 
retrieve required information from the database. 

### Add Project
	Add a Project is the page which allows Miller Personel to create a new project in the database.

This button will send the user directly to the projectData.html page but without any data 
filled in. The user must then fill in all the boxes under the required information subheading
before being able to save the project. A user can also elect to enter more information under 
the optional information subheading. Though more of the complex information must be edited 
from the projectManager page.

The process by which this information is saved is the same as in the previous paragraph, refer 
to Edit a Project for more information. The only change would be that instead of calling the 
editProject() and editObject() methods in ProjectService.java and ProjectObjectService.java 
respectively, the methods addProject() and addObject() would be called. These methods function 
slightly differently in that they do not find an existing project in the database but rather
create a new project and then add it directly.

### Generate Reports.
	This page allows Miller Personel to create reports. This page is debatably the 
	most important on the entire site. 

Reports are collections of projects compiled together based on common characteristics. 
For example, the Active All report compiles all projects in the active stage. Where as 
the Proposal SE Refrigeration Report compiles all projects in the proposal stage which also
are in the SE or PR regions. 

Clicking _Reports_ will send the user to query.html. This page allows the user to create the 
parameters for the reports. The user can either use the upper portion of the page to create 
a custom report or use the lower portion of the page to open precreated reports. These 
precreated reports have 2 selectable categories, the stage and the modifier. The stage simply 
states which stage the modifiers are applied to and not all permutations are implemented. These 
are the most commonly used reports and are used by Miller Personnel often. 

The work for these reports starts in query.js. the function reportCreator() is called 
with the stage associated with the button pressed as its parameter. This function 
calls generateReports()with the string modifier+'_'+firstLetterOfTheStageSelected. 
This function compiles what fields are to be displayed in the report and then goes into 
a switch statemnt. This switch statement is for the precreated reports. Each of the cases 
represents one of the precreated reports that can be used. Inside of each case, the
modifiers are placed into the proper data structures before the query is created. For 
example, there is a stack called pType which hold the Project Types to be placed into 
the project. Under some of the cases certain numbers, represented by constants, are pushed 
onto the pType stack. These numbers represent the index of the type in the database. 
These data structures are placed into a POST request. 

This request is handled by Report.java in Servlets. The doGet() method is called. 
This method calls the queryProjects() method in QueryService.java in services. This 
method queries the database for the projects with the proper prerequisite attributes 
and compiles them into a string which can later be put into adocument.
	
### Triggers
     Triggers is a system set up by Brian, it is intended to alert website users of projects 
     which need to be updated. There are 3 levels of triggers; info, warning and severe. 
  
The triggers.js page queries the java backend for triggers through the function getTriggers(). This 
goes through Trigger.java in Servlets, specifically the doPost method. It calls the 
getAllTriggersAsJsonand getAllSpecificTriggersAsJson in TriggerService which is in services. This
service calls the  Trigger.java class in objects. This class has an arraylist of triggers which
are initialized and then run. Running a trigger means to run the arraylist of criteria which 
queries the database for any projects which match the criteria. These projects are returned up the
chain to the website where they are displayed.

## Notes on Startup.

	Technologies Required: Java, Javascript/HTML/CSS, Apache Tomcat, A MySQL Server
	Recommmended Stuffs: Maven, Git, MAMP|WAMP|LAMP, Eclipse

There are a few required technologies to work on this project. The first of which is Java which is what
the entire backend/server is coded in. Javascript/HTML/CSS is also required. Any editor for these technologies 
is acceptable, Eclipse and Vim have been used on this project so far with success. These tools are of course used
for the web development side of the application. 

In addition to these languages, Apache Tomcat is required. This is the webserver that runs our webapp
both on the server and what we use to test locally. Never deploy to the server without thoroughly testing the 
stablity and functionality of an update. Miller Personnel use this software on a daily basis and any 
interruption in service is severe and to be avoided at all costs. 

#### Tomcat Primer

Tomcat is the server used both for local testing and server deployment. You can find the download [here](http://tomcat.apache.org/download-80.cgi). At this page you will want to download the core-zip file. 
Once unzipped, you practically have tomcat installed. But how?! You might be asking. There's two files that you will
be using to boot and shutdown your server that around found in your tomcatX.X.X/bin folder. These files are the startup
and shutdown files. There are multiple versions of these files, for linux/OSX use the .sh versions and for windows 
use the .bat versions. These will be used to start and stop the server. 

Startup for Linux/OSX
```shell
<tomcat_base>/bin/startup.sh
```
Startup for Windows
```shell
cd <tomcat_base>\bin
startup
```
At this point, you should be able to run the startup script and access the tomcat server at localhost:8080.

The next important directory is the webapps folder. This is where you will place your .war (webapp) file for your server.
Tomcat will automatically expand war file into a directory (but only if the server is running!). If your .war file expanded, the application has deployed properly and can now be accessed via the webserver. Logs are found in <tomcat_dir>/logs and can provide useful information if deployment is going roughly. 
So if you are deploying MillerRebuilt.war to your tomcat server, you should now be able to navigate to localhost:8080/MillerRebuilt without a 404 error. 

These [instructions](https://www.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html) have proven to be useful for the setup if instructions are still unclear. 

#### Eclipse

Just use it. It makes life easier. 
You will want to download the Eclipse Web Tools in order to generate .war files which is essentially the webapp. Which is incredibly useful for deployment. 

You also will be able to host your tomcat server from eclipse which makes it so you don't have to do recreate a .war file and then startup your tomcat server every time you want to test. You just tell ecllipse to go.

If you installed the webtools correctly, you should be able to create a server via Prefernces -> Server -> Apache TomcatvX. These [instructions](http://www.vogella.com/tutorials/EclipseWTP/article.html) may help you getting eclipse setup. 

#### MySQL w/ Java Primer
If you're following along, you just deployed a webapp to a tomcat server and have access to the index.html page of your website. If you try to login, noting happens! In fact, things break and ~~there's no solution~~ you need not worry. The database is not connected with your site yet! 

The first thing we need to do is get a MySQL server up and running locally. You will want to download/install the [bitnami stack](https://bitnami.com/stacks) for your OS. 

[For Window](https://bitnami.com/stack/wamp)

[For OSX](https://bitnami.com/stack/mamp)

[For Linux](https://bitnami.com/stack/lamp)

Once you install your stack, you should be able to open up your manager and start your servers. This will start a MySQL Database and Apache Web Server. You should now be able to access http://localhost:3306/phpmyadmin/ which is your local MySQL manager. Once you login there, on the side bar click create and create a new database called testdb. Once that completes, on the navigation bar select import and then import the .sql file you were given by the previous intern. You now have your MySQL database running with all of the right information in it. 

Note: You can do this via the command line as well, using the tools in yourStack/mysql/bin/

Once you have the database running, you need to get java to run with it. Take the hibernate.cfg.xml that you were provided and slap it into the directory where you are building the classes. So you should have:

		<build_path>/
					/comparators
					...
					/Servlet.helpers
					/hibernate.cfg.xml

And that should be it! You should be able to startup the site and then login. If you still can't get access, check the tomcat logs for more information. 

#### Primer

Maven is a build tool used to compile and package software. It can be found on apache's main website as well and can also be installed into eclipse. Try [this](http://stackoverflow.com/questions/8620127/maven-in-eclipse-step-by-step-installation) to install into eclipse. Otherwise there are other online tutorials that are helpful for installation onto your particular OS (if not using eclipse). 

Maven uses a file called pom.xml. This file is at the top level of the project and directs maven on what to compile and how to compile it. In addition, Maven's pom file also includes dependency management. Instead of creating a library folder, downloading jar files and placing them into this folder, Maven can be told to download these files for you. This is the major functionality of the pom file that you will be using.

Inside the pom.xml file, you will see a number of sections of xml. Most of these are already set up and do not
need to be touched. But one particular part of xml may need to be changed if newer versions of the software we
use comes out or need software is required. The section looks like this:
```xml
	<dependencies>
 			<dependency>
       				<groupId>org.hibernate</groupId>
        			<artifactId>hibernate-core</artifactId>
        			<version>4.3.5.Final</version>
 			</dependency>
 			<dependency>
        			<groupId>javax.servlet</groupId>
	                <artifactId>javax.servlet-api</artifactId>
      				 <version>3.0.1</version>
			</dependency>
   			<dependency>
       				<groupId>org.hibernate</groupId>
        			<artifactId>hibernate-entitymanager</artifactId>
        			<version>4.3.6.Final</version>
 			</dependency>
 			<dependency>
        			<groupId>com.google.code.gson</groupId>
        			<artifactId>gson</artifactId>
        			<version>2.2.4</version>
 			</dependency>
 			<dependency>
        			<groupId>mysql</groupId>
        			<artifactId>mysql-connector-java</artifactId>
        			<version>5.1.32</version>
 			</dependency>
	</dependencies>
```
This is the dependecy section of the pom file which exists at the writing of this document. The important piece of information here is each section of xml inside the <dependency></dependency> tag. These pieces of xml each specify a jar file to download. Refer to mvnrepository.com if you need to find any of these sections of xml. You can search for any piece of software or jar file that you need there and it will give you the corresponding maven dependency to place inside the pom file. 
			
Now that you understand dependencies, building will make more sense. When using maven to build, find the top level of the project. This level will have the pom.xml file in it. When inside this level type "mvn clean install" into the command prompt. This can be done on either windows or linux but it is important to note that there are other ways to do this on windows. This is simply the way that I found to be the easiest. Once this is done, maven will empty its target folder and redownload all the dependencies. It will then compile the java code and create the war file. If there is an issue wth compilation, such as compile time errors which would be displayed in Eclipse, they will be displayed after a compilation error report. 
			
Once everything compiles properly, go into the target folder at the top level of the project. There will be a file inside this folder called miller-0.0.1-SNAPSHOT.war. This is the file which must be renamed and moved into the webapps folder inside the tomcat folder. There are 3 important pieces of information in this command. "Mvn" is the invocation of the maven tool. "Clean" is the command which tells maven to delet everything is the target directory and redownload the dependencies for the project, it is possible to simply mvn install, and it will be much faster, but it can cause problems sometimes. When in doubt, always clean before installing. And finally "install". This is the command which tells maven to compile everything and create a war file. 

```
	A note: The project is already in maven file structure and 
	will need to be modified if you plan on not using maven. 
		
	I strongly recommend maven. 
				-- One of the Initial Developers for This
```
```
	A reply: The project already has its dependencies
	so why bother using maven anymore? I'll just pass them
	down forever and we'll never need to update.
	
	I strongly recommend doing nothing.
				-- The Next Guy
```
At some point the maven build system was completely lost because a developer decided that it would be best to abandon good software engineering practices. It has more recently come back (Spring 2017) so that we can keep our software dependencies managed properly and up to date. Ensure that you continue to build this project with maven!

#### Git Primer
Git	is the technology which allows us to version control our software.
```
	It is similar to svn but is currently controlled on a remote server run by 
	BitBucket. You must be added to the Miller team and given access to the 
	repository before checking out the project. Of course, if you are reading 
	this you almost certainly have access to the project because this file is 
	stored in the repository. 
	
	This is not a recommended piece of technology, it is required. Version control was
	non-existant early on in this project and it made life harder for everyone when 
	passing the project between developers. 
	We must maintain version control.
```

[2016, Josh Mackin] I don't know exactly when this was written but it was written with a good heart. Version control is incredibly important to the project. What I was given to start off with was a zip file full of code with actual compilation errors, tons of problems with the functional requirements of the program and only 4 commits. They were:

```json
	{
		"title": "hi",
		"description": null,
		"changes": "all files added"
	},
	{
		"title": "create initialization.txt",
		"description": null,
		"changes": "added init.txt to the project"
	},
	{
		"title": "starting out at miller refrig. Help",
		"description": null, 
		"changes": "init.txt now has the text: UPDATE FREQUENTLY TO GITHUB 
						      DOCUMENT AND COMMENT EVERYTHING"
	},
	{
		"title": "update init.txt",
		"description": null,
		"changes": "more stuff in init.txt"
	}
```
So when I was given this project and there was very little documentation, almost nothing to work off of. It's almost silly that there are commits asking for help because if we had the entire tree that person could have referred to old code and found solutions there. I'm not saying that asking for help is bad, I'm saying that bad documentation is bad. 

Since then I abandoned that tree as it was simply easier start afresh, perhaps Rebuilt? So I cleaned out a lot of random garbage that was in there and created this repository. Since then I've been committing frequently to show the progression of tasks. So now if a new intern wants to see, perhaps, modify the query.js they could check out [Closeout Reports](https://github.com/MillerIntern/MillerRebuilt/commit/bd505b3d186fe6c9ab20fb45b970626193f2fd58) a commit I made after adding the closeout reports to the system. 

So if nothing else, use git so that we have a history to work from so that new interns can arrive and not be given nothing. [MillerOld](https://github.com/MillerIntern/MillerOld) is the repository from before it was rebuilt. It's now kept for legacy reasons. 

Commit yourself to git!
[/2016, Josh Mackin]

##### Actual Primer Now...

There are a variety of tutorials online to help with the installation and use of git. Git has a similar process to svn.

First you must add a file(git add filename), then you must commit the file (git commit -m"the comment"), then you must push the file(git push remotename branchname) to the remote repository. This is done whenever a change is made, not simply when a new file is added. You can type git status to see what files are ready to be committed. It is recommended that, whenever making a new addition to the system you branch off the master branch and develop on the branch. 

When the development is finished, you must join it back to the master branch. It is also highly recommended to put comments in commits. It will help when reverting to earlier working versions. 

Or you can just noob it up and use GitHub desktop like me. Super easy. 


#### End Notes
That should be most of what anyone working on this project needs to know on starting with the software. Any future developers should feel free to add to this document as more things are added to the software. If more information is required, contact the last developer.


##### Updating Tasks

	Reports
		- To add new reports of already existing data within the Database the code in 
		order to do this is all in Query.js. If the values have just been added then
		you must make sure that java is correctly storing that data in the database 
		and that you edit the Report.java class in order to allow for the searching of
		those objects to be place within the Reports. In the Query.js method edits must 
		be made to the generateReport, getAllSpecifiedFields methods. You must also add
		constants for the new report. First constant which needs to be changed is the 
		REPORT_TYPES as you must add the new report name, which will affect the drop 
		download next, make sure to edit REPORT_VALS to also include those inclusions. 
		After doing this you need to create constants for the type of report for each 
		of the project types of Active,	Inactive, Closed etc. look around line 115 for 
		examples. If you need to construct a whole new scheme for the report one which 
		does not exist create a new key around lines 171. Examples are their for 
		replication. For Specific filtering capabilities, within your report you must 
		take a look at lines 40 to around 80 where their are constants created to do this. 
		The numbers which the constants are equal to are the ID correspondence within 
		the MySql Database. In generateReport add the conditionals for the new created 
		report, if you make a mistake here this will affect the data which will
		come out of the report.


	MySQL
		- For those who are new to mySQL
			* make sure when you insert values into the Database keep to the
					already existing format.
				- ex. if you misspell a state or put a space between the 
						states such as New York the database will crash. 
				
				
*vastness is relative
