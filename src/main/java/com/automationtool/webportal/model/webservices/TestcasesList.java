package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Testcase;

public class TestcasesList extends WebserviceTemplate {
	
	private List<Testcase> testcasesList;

	public TestcasesList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		
	}

	public TestcasesList() {
		
	}

	public List<Testcase> getTestcasesList() {
		return testcasesList;
	}

	public void setTestcasesList(List<Testcase> testcasesList) {
		this.testcasesList = testcasesList;
	}
	

}
