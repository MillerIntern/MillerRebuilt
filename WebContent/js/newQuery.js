
const SUB_ACTIVE_COLOR = "#802626";

function showSubreports(param)
{	
	console.log($(param).attr('id'));
	var projectType= $(param).attr('id');
	$(param).siblings().css(
	{
		"backgroundColor": "white",
		"color": "black",
	});

	$(param).css(
	{
		"color": "white",
		"backgroundColor": SUB_ACTIVE_COLOR
	});

	$(".reports").remove()
	
	if(projectType == 'activeProjects')
	{
		generateActiveProjectReports();
	}
	else if(projectType == 'proposalProjects')
	{
		generateProposalProjectReports();
	}
	else if(projectType == 'budgetaryProjects')
	{
		generateBudgetaryProjectReports();
	}
	else if(projectType == "other")
	{
		generateOtherProjectReports();
	}
}

function generateReport(param)
{
	console.log(param);
}

function generateOtherProjectReports()
{
	var emptyRow = document.createElement("tr");
	emptyRow.style.height = '10px';
	emptyRow.className = "reports";
	
	var tableRow = document.createElement("tr");
	tableRow.className = "reports";
	
	// TODO: Set correct ID's based off of the query.js bring over generateReport
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Closed Projects'));
	tableEntry.id = "ACTIVE_W";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Inactive Projects'));
	tableEntry.id = "ACTIVE_M";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	$("#quickReport").append(emptyRow);
	$("#quickReport").append(tableRow);	
}

function generateBudgetaryProjectReports()
{
	var emptyRow = document.createElement("tr");
	emptyRow.style.height = '10px';
	emptyRow.className = "reports";
	
	var tableRow = document.createElement("tr");
	tableRow.className = "reports";
	
	// TODO: Set correct ID's based off of the query.js bring over generateReport
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('All'));
	tableEntry.id = "ACTIVE_W";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Meeting'));
	tableEntry.id = "ACTIVE_M";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Service + On Hold'));
	tableEntry.id = "ACTIVE_O";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Closeout'));
	tableEntry.id = "CLOSEOUT_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	$("#quickReport").append(emptyRow);
	$("#quickReport").append(tableRow);
}

function generateProposalProjectReports()
{
	var emptyRow = document.createElement("tr");
	emptyRow.style.height = '10px';
	emptyRow.className = "reports";
	
	var tableRow = document.createElement("tr");
	tableRow.className = "reports";
	
	// TODO: Set correct ID's based off of the query.js bring over generateReport
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('All'));
	tableEntry.id = "ACTIVE_W";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Meeting'));
	tableEntry.id = "ACTIVE_M";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Service + On Hold'));
	tableEntry.id = "ACTIVE_O";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('J Dempsey'));
	tableEntry.id = "CLOSEOUT_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableRow2 = document.createElement("tr");
	tableRow2.className = "reports";
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Steve Meyer'));
	tableEntry.id = "MEYER_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('NE Refrigeration'));
	tableEntry.id = "ACTIVE_NE";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('SE Refrigeration'));
	tableEntry.id = "ACTIVE_SE";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);
	
	$("#quickReport").append(emptyRow);
	$("#quickReport").append(tableRow);
	$("#quickReport").append(tableRow2);
}

function generateActiveProjectReports()
{
	var emptyRow = document.createElement("tr");
	emptyRow.style.height = '10px';
	emptyRow.className = "reports";
	
	var tableRow = document.createElement("tr");
	tableRow.className = "reports";
	
	// TODO: Set correct ID's based off of the query.js bring over generateReport
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('All'));
	tableEntry.id = "ACTIVE_W";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Meeting'));
	tableEntry.id = "ACTIVE_M";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Service + On Hold'));
	tableEntry.id = "ACTIVE_O";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Closeout'));
	tableEntry.id = "CLOSEOUT_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow.appendChild(tableEntry);
	
	var tableRow2 = document.createElement("tr");
	tableRow2.className = "reports";
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('Steve Meyer'));
	tableEntry.id = "MEYER_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('NE Refrigeration'));
	tableEntry.id = "ACTIVE_NE";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);

	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('SE Refrigeration'));
	tableEntry.id = "ACTIVE_SE";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);
	
	var tableEntry = document.createElement("td");
	tableEntry.appendChild(document.createTextNode('J Dempsey'));
	tableEntry.id = "MEYER_A";
	tableEntry.onclick = function() {generateReport(this)};
	tableRow2.appendChild(tableEntry);

	
	$("#quickReport").append(emptyRow);
	$("#quickReport").append(tableRow);
	$("#quickReport").append(tableRow2);	
}
