package com.automationtool.webportal.model.webservices.request;

import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.TestsuiteDescription;

public class TestcaseToTestsuites {

	private TestsuiteDescription testsuite;
	private Testcase testcase;
	private String browser;
	private String param1_name;
	private String param1_value;
	private String param2_name;
	private String param2_value;
	private String param3_name;
	private String param3_value;
	private String param4_name;
	private String param4_value;
	private String param5_name;
	private String param5_value;
	
	
	
	


	@Override
	public String toString() {
		return "TestcaseToTestsuites [testsuite=" + testsuite + ", testcase="
				+ testcase + ", browser=" + browser + ", param1_name="
				+ param1_name + ", param1_value=" + param1_value
				+ ", param2_name=" + param2_name + ", param2_value="
				+ param2_value + ", param3_name=" + param3_name
				+ ", param3_value=" + param3_value + ", param4_name="
				+ param4_name + ", param4_value=" + param4_value
				+ ", param5_name=" + param5_name + ", param5_value="
				+ param5_value + "]";
	}



	public TestsuiteDescription getTestsuite() {
		return testsuite;
	}



	public void setTestsuite(TestsuiteDescription testsuite) {
		this.testsuite = testsuite;
	}



	public Testcase getTestcase() {
		return testcase;
	}



	public void setTestcase(Testcase testcase) {
		this.testcase = testcase;
	}



	public String getBrowser() {
		return browser;
	}



	public void setBrowser(String browser) {
		this.browser = browser;
	}



	public String getParam1_name() {
		return param1_name;
	}



	public void setParam1_name(String param1_name) {
		this.param1_name = param1_name;
	}



	public String getParam1_value() {
		return param1_value;
	}



	public void setParam1_value(String param1_value) {
		this.param1_value = param1_value;
	}



	public String getParam2_name() {
		return param2_name;
	}



	public void setParam2_name(String param2_name) {
		this.param2_name = param2_name;
	}



	public String getParam2_value() {
		return param2_value;
	}



	public void setParam2_value(String param2_value) {
		this.param2_value = param2_value;
	}



	public String getParam3_name() {
		return param3_name;
	}



	public void setParam3_name(String param3_name) {
		this.param3_name = param3_name;
	}



	public String getParam3_value() {
		return param3_value;
	}



	public void setParam3_value(String param3_value) {
		this.param3_value = param3_value;
	}



	public String getParam4_name() {
		return param4_name;
	}



	public void setParam4_name(String param4_name) {
		this.param4_name = param4_name;
	}



	public String getParam4_value() {
		return param4_value;
	}



	public void setParam4_value(String param4_value) {
		this.param4_value = param4_value;
	}



	public String getParam5_name() {
		return param5_name;
	}



	public void setParam5_name(String param5_name) {
		this.param5_name = param5_name;
	}



	public String getParam5_value() {
		return param5_value;
	}



	public void setParam5_value(String param5_value) {
		this.param5_value = param5_value;
	}



	public TestcaseToTestsuites() {
		
	}

}
