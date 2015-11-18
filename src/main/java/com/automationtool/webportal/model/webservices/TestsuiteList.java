package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.TestsuiteDescription;

public class TestsuiteList extends WebserviceTemplate {
	
	private List<TestsuiteDescription> testSuite;
	
	public List<TestsuiteDescription> getTestSuite() {
		return testSuite;
	}

	public void setTestSuite(List<TestsuiteDescription> testSuite) {
		this.testSuite = testSuite;
	}

	public TestsuiteList() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TestsuiteList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	
	
}
