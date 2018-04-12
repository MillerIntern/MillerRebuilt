/*
 * Gets Meeting Active Projects in new tab
 */
function generateMeetingReports() {
	window.open('/MillerRebuilt/Report?from=home&domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B2%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B1%2C6%2C9%2C8%5D&region.region=%5B%5D&status.id=%5B26%2C29%2C27%2C11%2C30%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Meeting+Projects&shownFields=%5B%22mcsNum%22%2C%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22scheduledStartDate%22%2C%22scheduledTurnover%22%2C%22actualTurnover%22%2C%22type%22%2C%22invoiced%22%2C%22shouldInvoice%22%2C%22projectNotes%22%5D');
	window.setTimeout(getMeetingProposal, 1000);
}

/*
 * Gets Meeting Proposals in new tab
 */
function getMeetingProposal() {
	window.open('/MillerRebuilt/Report?from=home&domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B1%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B1%2C6%2C9%2C8%5D&region.region=%5B%5D&status.id=%5B11%2C4%2C1%2C3%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Meeting+Proposals&shownFields=%5B%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22initiated%22%2C%22siteSurvey%22%2C%22costcoDueDate%22%2C%22proposalSubmitted%22%2C%22type%22%2C%22projectNotes%22%5D');
	window.setTimeout(getMeetingBudgetary, 1000);
}

/*
 *  Gets Meeting Budgetary Projects in new Tab
 */
function getMeetingBudgetary() {
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B8%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B%5D&region.region=%5B%5D&status.id=%5B1%2C4%2C11%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Meeting+Budgetary+Projects&shownFields=%5B%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22initiated%22%2C%22siteSurvey%22%2C%22costcoDueDate%22%2C%22proposalSubmitted%22%2C%22type%22%2C%22projectNotes%22%5D');
}

function generatePermitReport()
{
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B2%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B%5D&region.region=%5B%5D&status.id=%5B30%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Permits+for+Active+Projects&shownFields=%5B%22warehouse%22%2C%22item%22%2C%22status%22%2C%22buildingPermit%22%2C%22mechanicalPermit%22%2C%22electricalPermit%22%2C%22plumbingPermit%22%2C%22roofingPermit%22%2C%22sprinklerPermit%22%2C%22fireAlarmPermit%22%2C%22lowVoltagePermit%22%5D')
}

function findActivePermits()
{
	document.location.href= "projects.html?from=findAwaitingPermits";
}

function findUserProjects()
{
	document.location.href= "projects.html?from=findUserProjects";
}


/*
 * Gets all active projects
 */
function generateAllReports()
{
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B2%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B%5D&region.region=%5B%5D&status.id=%5B%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=All+Active+Projects&shownFields=%5B%22mcsNum%22%2C%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22scheduledStartDate%22%2C%22scheduledTurnover%22%2C%22actualTurnover%22%2C%22type%22%2C%22invoiced%22%2C%22shouldInvoice%22%2C%22projectNotes%22%5D');
	window.setTimeout(getAllProposals, 1000);
}

/*
 * Gets all proposals
 */
function getAllProposals()
{
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B1%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B%5D&region.region=%5B%5D&status.id=%5B%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=All+Proposals&shownFields=%5B%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22initiated%22%2C%22siteSurvey%22%2C%22costcoDueDate%22%2C%22proposalSubmitted%22%2C%22type%22%2C%22projectNotes%22%5D');
	window.setTimeout(getBudgetaryProjects, 1000);
}

/*
 * Gets all budgetary projects
 */
function getBudgetaryProjects()
{
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B8%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B%5D&region.region=%5B%5D&status.id=%5B%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=All+Budgetary+Projects&shownFields=%5B%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22initiated%22%2C%22siteSurvey%22%2C%22costcoDueDate%22%2C%22proposalSubmitted%22%2C%22type%22%2C%22projectNotes%22%5D');
}




function getUser() {
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'getUserInfo'
		}, complete: function (data) {
			if(data.responseJSON) {
			  console.log("USER = ", data.responseJSON);
		      if(data.responseJSON.permission.name != "admin") hideAdminContent();	 

				
			} else {
				console.log("GetUserData() RESPONSE = ",data);
				alert('Server Failure!');
				
			}
		}
	});
}






////////CONTENT BELOW APPLIES TO UPLOADING AND DOWNLOADING
function downloadFile() {
	$('#download').attr({target: "_blank", href : 'http://localhost:8080/EmployeeFiles/excelDummy.xlsx'});
}

/*
function uploadFile() {
	var file = $('#fileUpload')[0].files[0]
	var fd = new FormData();
	fd.append('theFile', file);
	$.ajax({
	    url: 'FileSystem',
	    type: 'POST',
	    processData: false,
	    contentType: false,
	    data: fd,
	    success: function (data, status, jqxhr) {
	        console.log("success!");
	    },
	    error: function (jqxhr, status, msg) {
	    	 console.log("error!");
	    }
	});
}
*/

function uploadFile() {
	$(function() {
        $('#upload-form').ajaxForm({
            success: function(msg) {
                alert("File has been uploaded successfully");
            },
            error: function(msg) {
                $("#upload-error").text("Couldn't upload file");
            }
        });
    });
}

function upload() {

    var formData = new FormData();

    formData.append("file", document.getElementById('uploadFile').files[0], 'SamplePDF.pdf');
 

    $.ajax({
    	type : 'POST',
    	url : 'FileSystem',
    	data : formData,
    	processData: false,
    	contentType: false
		, complete: function (data) {
			 //console.log("DONE WITH REQ");
			 console.log("DATA = ", data);
             
		}
	});
    
}

function s2ab(s) {
	  var buf = new ArrayBuffer(s.length);
	  var view = new Uint8Array(buf);
	  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	  return buf;
	}



function onDownload() {
	console.log("IN IT");
	
	var oReq = new XMLHttpRequest();
	oReq.open("GET", "FileSystem", true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(oEvent) {
	  var blob = new Blob([oReq.response], {type: "application/vnd.ms-excel"}); //application/vnd.ms-excel
	  console.log("BLOB = ", blob);
	  var url = window.URL.createObjectURL(blob);
	  console.log("URL = ", url);
	  let a = document.getElementById('download');
	
		
	  a.href = url;
	  a.download = "ItWorked.xlsx";
	  a.click();
	  window.URL.revokeObjectURL(url);
	};

	oReq.send();
}

function setHREF() {
	let a = document.getElementById('download');
	let file = document.getElementById('fileUpload').files[0];
	
	a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(file);
	a.download = "TestingTextFile.txt";
	
}

/**
 * 
 * <a id = "download">New Download</a>
    <form method="post" action="FileSystem" enctype="multipart/form-data">
            Select file to upload: <input type="file" name="file" id="uploadFile" />
            <input type="submit"/>
            <br/><br/>
     </form>
     <button onclick = "upload()">UPLOAD ME</button>
    <br><br>
    
    <button onclick="onDownload()"> DOWNLOAD </button>
 * 
 * 
 */
 
function sendText() {
	console.log("IN IT");
	
	$.ajax({
		type: 'POST',
		url: 'Project',
		data: {
			'domain': 'project',
			'action': 'sendText',
		}, complete: function (response) {
			console.log("RESPONSE FROM sendText() = ",response);			
			if (response.responseJSON) {
				console.log(response);
			}
			else { 
				console.log("ERROR RESPONE FROM sendText() = ", response);
			}
			
		}
	});
	

}















