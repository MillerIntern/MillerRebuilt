/*
 * Gets Meeting Active Projects in new tab
 */
function generateMeetingReports() {
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B2%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B1%2C6%2C9%2C8%5D&region.region=%5B%5D&status.id=%5B26%2C29%2C27%2C11%2C30%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Meeting+Projects&shownFields=%5B%22mcsNum%22%2C%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22scheduledStartDate%22%2C%22scheduledTurnover%22%2C%22actualTurnover%22%2C%22type%22%2C%22invoiced%22%2C%22shouldInvoice%22%2C%22projectNotes%22%5D');
	window.setTimeout(getMeetingProposal, 1000);
}

/*
 * Gets Meeting Proposals in new tab
 */
function getMeetingProposal() {
	window.open('/MillerRebuilt/Report?domain=project&action=query&warehouse.id=%5B%5D&stage.id=%5B1%5D&projectClass.id=%5B%5D&projectItem.id=%5B%5D&projectType.id=%5B1%2C6%2C9%2C8%5D&region.region=%5B%5D&status.id=%5B11%2C4%2C1%2C3%5D&projectInitiatedDate=%5B%5D&projectInitiatedDateRelation=%5B%5D&costcoDueDate=%5B%5D&costcoDueDateRelation=%5B%5D&proposalSubmitted=%5B%5D&proposalSubmittedRelation=%5B%5D&scheduledStartDate=%5B%5D&scheduledStartDateRelation=%5B%5D&scheduledTurnover=%5B%5D&scheduledTurnoverRelation=%5B%5D&actualTurnover=%5B%5D&actualTurnoverRelation=%5B%5D&onGoing=%5B%5D&onGoingRelation=%5B%5D&projectManagers.id=%5B%5D&title=Meeting+Proposals&shownFields=%5B%22stage%22%2C%22warehouse%22%2C%22item%22%2C%22scope%22%2C%22class%22%2C%22manager%22%2C%22supervisor%22%2C%22region%22%2C%22status%22%2C%22initiated%22%2C%22siteSurvey%22%2C%22costcoDueDate%22%2C%22proposalSubmitted%22%2C%22type%22%2C%22projectNotes%22%5D');
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
	document.location.href=FINDPROJECT + '?type=search&id=activePermit';
}

function findUserProjects()
{
	document.location.href= FINDPROJECT + '?type=search&id=user';
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


