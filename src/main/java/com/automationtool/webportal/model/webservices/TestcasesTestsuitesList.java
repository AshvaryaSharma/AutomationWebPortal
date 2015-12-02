package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.TestsuiteTestcases;

public class TestcasesTestsuitesList extends WebserviceTemplate {

	private List<TestsuiteTestcases> testcases;
	
	public List<TestsuiteTestcases> getTestcases() {
		return testcases;
	}

	public void setTestcases(List<TestsuiteTestcases> testcases) {
		this.testcases = testcases;
	}

	public TestcasesTestsuitesList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public TestcasesTestsuitesList() {
		// TODO Auto-generated constructor stub
	}

}
