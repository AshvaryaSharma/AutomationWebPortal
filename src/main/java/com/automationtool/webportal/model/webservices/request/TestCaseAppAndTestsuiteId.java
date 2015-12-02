package com.automationtool.webportal.model.webservices.request;

public class TestCaseAppAndTestsuiteId {

	@Override
	public String toString() {
		return "TestCaseAppAndTestsuiteId [app_Id=" + app_Id
				+ ", testsuite_Id=" + testsuite_Id + "]";
	}

	private int app_Id, testsuite_Id;
	
	public int getApp_Id() {
		return app_Id;
	}

	public void setApp_Id(int app_Id) {
		this.app_Id = app_Id;
	}

	public int getTestsuite_Id() {
		return testsuite_Id;
	}

	public void setTestsuite_Id(int testsuite_Id) {
		this.testsuite_Id = testsuite_Id;
	}

	public TestCaseAppAndTestsuiteId() {
		// TODO Auto-generated constructor stub
	}

}
