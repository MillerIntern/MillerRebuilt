package projectObjects;

public class RuleDetails {
	String ruleName;
	public synchronized String getRuleName() {
		return ruleName;
	}

	public synchronized void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public synchronized String getFailMessage() {
		return failMessage;
	}

	public synchronized void setFailMessage(String failMessage) {
		this.failMessage = failMessage;
	}

	public synchronized int getSeverity() {
		return severity;
	}

	public synchronized void setSeverity(int severity) {
		this.severity = severity;
	}

	String failMessage;
	int severity;
	String ruleCategory;
	
	public synchronized String getRuleCategory() {
		return ruleCategory;
	}

	public synchronized void setRuleCategory(String ruleCategory) {
		this.ruleCategory = ruleCategory;
	}

	public RuleDetails(String ruleCategory, String ruleName, String failMessage,int severity){
		this.ruleCategory = ruleCategory;
		this.ruleName = ruleName;
		this.failMessage = failMessage;
		this.severity = severity;
	}

}
