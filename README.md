# MillerTemp
####The objective of this file is to explain the system to anyone who is working on it.
Original Authors: Brian Fitzpatrick and Alex Campbell

Maintenance: Chris Taormino

Summer 2015: Ken Bayron



This system is designed to present a front end for a database of projects. The objective is to allow Miller Personel to maintain 
and query the database of projects while also generating reports based on the database. there are 4 major tabs on the website; 

###Triggers
         Triggers is a system set up by Brian, it is intended to alert website users of projects 
         which need to be updated. There are 3 levels of triggers; info, warning and severe. 
      
    The triggers.js page queries the java backend for triggers through the function getTriggers(). This 
    goes through Trigger.java in Servlets, specifically the doPost method. It calls the 
    getAllTriggersAsJsonand getAllSpecificTriggersAsJson in TriggerService which is in services. This
    service calls the  Trigger.java class in objects. This class has an arraylist of triggers which
    are initialized and then run. Running a trigger means to run the arraylist of criteria which 
    queries the database for any projects which match the criteria. These projects are returned up the
    chain to the website where they are displayed.

###Edit a Project
          Edit a Project is the page which allows Miller Personel to search for and edit projects.
    
    Clicking the button sends you to editSelect.html allows the user to query based on 2 
    pieces of required information; Warehouse and Stage, and 3 pieces of optional information; 
    type, item and ID. 
    
    Searching brings up a dialog which allows the user to select from the results of 
    the query.  By selecting a project, the user will then be forwarded to the projectData.html page. This 
    page allows the user the change any information inside a project and then save the changes. This work
    is done through the projectData.js file. It calls the addProject() function. This function checks to 
    ensure all required fields are filled and then creates a post request. The rest of the fucntions in 
    this file are devoted to filling the data on entry into projectData.html. The post request in 
    handled by Project.java in Servlets. The doPost() function operates on the action variable in the
    request. It uses the parameters map in the request to retrieve required information from the
    database. When submitting changed information to the database, the same function is called but
    a different if statemnt is invoked. 
    
    2015The parameters map is used to get all new information and then ProjectService.java in services is 
    used. The editProject() function is called with all relevant information and it uses hibernate to 
    update the database with all new information. This function creates a new project and then invokes 
    ProjectObjectService.java's editObject() method. This method finds the old project in the database,
    extracts it and then copies all new information from the new project into the old project. The old 
    project is then saved to the database with the new information in it.

###Add a Project
	Add a Project is the page which allows Miller Personel to create a new project in the database. This button will send the user 
	directly to the projectData.html page but without any data filled in. The user must then fill in all the boxes under the required
	information subheading before being able to save the project. A user can also elect to enter more information under the optional
	information subheading. The process by which this information is saved is the same as in the previous paragraph, refer to Edit a 
	Project for more information. The only change woul be that instead of calling the editProject() and editObject() methods in 
	ProjectService.java and ProjectObjectService.java respectively, the methods addProject() and addObject() would be called. These 
	methods function slightly differently in that they do not find an existing project in the database but rather create a new project
	and then add it directly.

###Generate Reports.
	Generate Reports is the most major function of the website. This page allows Miller Personel to create reports. Reports are 
	collections of projects compiled together based on common characteristics. For example, the Active Weekly report compiles all
	projects in the active stage. Where as the Proposal SE Refrigeration Report compiles all projects in the proposal stage which also
	are in the SE or PR regions. Clicking this button will send the user to query.html. This page allows the user to create the 
	parameters for the reports. The user can either use the upper portion of the page to create a custom report or use the lower
	portion of the page to open precreated reports. These precreated reports have 2 selectable categories, the stage and the modifier.
	The stage simply states which stage the modifiers are applied to and not all permutations are implemented. These are the most
	commonly used reports and are used by Miller Personel often. The work for these reports starts in query.js. the function 
	reportCreator() is called with the stage associated with the button pressed as its parameter. This function calls generateReports()
	with the string modifier+'_'+firstLetterOfTheStageSelected. This function compiles what fields are to be displayed in the report
	and then goes into a switch statemnt. This switch statement is for the precreated reports. Each of the cases represents one of the
	precreated reports that can be used. Inside of each case, the modifiers are placed into the proper data structures before the query
	is created. For example, there is a stack called pType which hold the Project Types to be placed into the project. Under some of 
	the cases certain numbers, represented by macros, are pushed onto the pType stack. These numbers represent the index of the type
	in the database. These data structures are placed into a POST request. This request is handled by Report.java in Servlets. The
	doGet() method is called. This method calls the queryProjects() method in QueryService.java in services. This method queries the
	database for the projects with the proper prerequisite attributes and compiles them into a string which can later be put into a
	document.

##Notes on Startup.

	Technologies Required: Java, Javascript/HTML/CSS, Apache Tomcat, Apache Maven, Git

	There are a few required technologies to work on this project. The first of which is Java. Javascript/HTML/CSS is also required. Any 
	editor for these technologies is acceptable, Eclipse and Vim have been used on this project so far with success. In addition
	Apache Tomcat is required. This is a webserver which can be used locally to test software before deployment. Never deploy to the 
	server without thoroughly testing the stablity and functionality of an update. Miller Personel use this software on a daily basis 
	and any interruption in service is severe and to be avoided at all costs. 
		A primer on using Tomcat with the miller application
			Tomcat is a webserver which can be used locally to test updates. You can download it from apache's main website.
			There are only a few relevant pieces of information. First, about the files inside the distribution which are
			important. There are 2 files in the bin folder which you will use regularly, these are startup and shutdown.
			There are multiple versions of these files, for linux use the .sh versions, for windows use the .bat versions.
			These will be used to start and stop the server. The next important file is the webapps folder. This is where
			you will place your war file before starting the server. When you start the server, the war file will expand into
			a directory. This signifies that the war has deployed properly and can now be accessed via the webserver. The 
			default location of the webserver is localhost:8080. If you type that into a web browser on the same compuer which
			tomcat exists, it will take you to the tomcat page. From heer you can access the web manager and also the
			applications deployed to the server. A note on deploying the miller site. The war file will not be created with 
			the correct name. The war needs to be named MillerSite.war when it is deployed to the server. Now that you have
			a war file named MillerSite.war inside the webapps folder and have run the startup script. you can go to the 
			url localhost:8080/MillerSite to find the web application. Before this web application can be used though, a 
			file must be moved. Inside the webapp folder, and inside the expanded directory of the MillerSite webapp you 
			will find files and folders. Inside the WEB-INF folder you will find a file called hibernate.cfg.xml. This file
			must be moved into the classes folder inside the same folder you found the xml file. You now have an operational
			local server to test updates on.
	There are also a few recommended technologies for ths project. The first is Apache Maven. Maven is a build tool used to compile
	and package software. It can be found on apache's main wedsite as well. Installing on windows is not as simple as running an 
	executable unfortunately. You have to download it and then set up a few enviornment variables. There are multiple online tutorials
	that are helpful for this. On linux, open a command prompt and then type sudo apt-get install maven. This will install maven onto 
	the machine and allow it to be used from the command line. The main reasons for using maven on this project is the ability for 
	it to manage dependencies. Maven uses a file called pom.xml. This file is at the top level of the project and directs maven on 
	what to compile and how tp compile it. In addition, Maven's pom file also includes dependency management. Instead of creating 
	a library folder, downloading jar files and placing them into this folder, Maven can be told to download these files for you. 
	This is the major functionality of the pom file that you will be using.
		A primer on using Maven dependencies with the miller application
			Inside the pom.xml file, you will see a number of sections of xml. Most of these are already set up and do not
			need to be touched. But one particular part of xml may need to be changed if newer versions of the software we
			use comes out or need software is required. The section looks like this:
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
			This is the dependecy section of the pom file which exists at the writing of this document. The important piece
			of information here is each section of xml inside the <dependency></dependency> tag. These pieces of xml each specify
			a jar file to download. Refer to mvnrepository.com if you need to find any of these sections of xml. You can search
			for any piece of software or jar file that you need there and it will give you the corresponding maven dependency
			to place inside the pom file. Now that you understand dependencies, building will make more sense. When using 
			maven to build, find the top level of the project. This level will have the pom.xml file in it. When inside this 
			level type "mvn clean install" into the command prompt. This can be done on either windows or linux but it is 
			important to note that there are other ways to do this on windows. This is simply the way that I found to be the
			easiest. Once this is done, maven will empty its target folder and redownload all the dependencies. It will then 
			compile the java code and create the war file. If there is an issue wth compilation, such as compile time errors
			which would be displayed in Eclipse, they will be displayed after a compilation error report. Once everything 
			compiles properly, go into the target folder at the top level of the project. There will be a file inside this 
			folder called miller-0.0.1-SNAPSHOT.war. This is the file which must be renamed and moved into the webapps folder
			inside the tomcat folder. There are 3 important pieces of information in this command. "Mvn" is the invocation of
			the maven tool. "Clean" is the command which tells maven to delet everything is the target directory and redownload
			the dependencies for the project, it is possible to simply mvn install, and it will be much faster, but it can cause 
			problems sometimes. When in doubt, always clean before installing. And finally "install". This is the command which
			tells maven to compile everything and create a war file. A note, the project is already in maven file structure and
			will need to be modified if you plan on not using maven. I strongly recommend maven. 
	The next technology is git. Git	is the technology which allows us to version control our software. It is similar to svn but is 
	currently controlled on a remote server run by BitBucket. You must be added to the Miller team and given access to the repository 
	before checking out the project. Of course, if you are reading this you almost certainly have access to the project because this file 
	is stored in the repository. There are a variety of tutorials online to help with the installation and use of git. This is not a 
	recommended piece of technology, it is required. Version control was non-existant early on in this project and it made life harder 
	for everyone when passing the project between developers. We must maintain version control. Git has a similar process to svn. First 
	you must add a file(git add filename), then you must commit the file (git commit -m"the comment"), then you must push the file(git 
	push remotename branchname) to the remote repository. This is done whenever a change is made, not simply when a new file is added. 
	You can type git status to see what files are ready to be committed. It is recommended that, whenever making a new addition to the 
	system you branch off the master branch and develop on the branch. When the development is finsihed, you must join it back to the 
	master branch. It is also highly recommended to put comments in commits. It will help when reverting to earlier working versions. 

That should be most of what anyone working on this project needs to know on starting with the software. Any future developers should feel free
to add to this document as more things are added to the software. If more information is required, contact the last developer.


*******Updating Tasks**********

	Reports
		- To add new reports of already existing data within the Database the code in order to do this is all in Query.js. If the values have just been added
		  then you must make sure that java is correctly storing that data in the database and that you edit the Report.java class in order to allow for the 
		  searching of those objects to be placed within the Reports. In the Query.js method edits must be made to the generateReport, getAllSpecifiedFields methods. You must also
		  add constants for the new report. First constant which needs to be changed is the REPORT_TYPES as you must add the new report name, which will affect the drop download
		  next, make sure to edit REPORT_VALS to also include those inclusions. After doing this you need to create constants for the type of report for each of the 
		  project types of Active, Inactive, Closed etc. look around line 115 for examples. If you need to construct a whole new scheme for the report one which does not exist
		  create a new key around lines 171. Examples are their for replication. For Specific filtering capabilities, within your report you must take a look at lines 40 to around 80 
		  where their are constants created to do this. The numbers which the constants are equal to are the ID correspondence within the MySql Database. In generateReport 
		  add the conditionals for the new created report, if you make a mistake here this will affect the data which will come out of the report.
		  
	MySQL
		- For those who are new to mySQL
			* make sure when you insert values into the Database keep to the already existing format.
				- ex. if you misspell a state or put a space between the states such as New York the database will crash. 
