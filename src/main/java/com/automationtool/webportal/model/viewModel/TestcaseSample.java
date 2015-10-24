package com.automationtool.webportal.model.viewModel;

import java.util.Arrays;

import javax.persistence.Column;

import com.automationtool.webportal.model.Teststeps;

public class TestcaseSample {

	@Override
	public String toString() {
		return "TestcaseSample [testcase_id=" + testcase_id + ", package_id="
				+ package_id + ", testcase_name=" + testcase_name
				+ ", testcase_description=" + testcase_description
				+ ", teststeps=" + Arrays.toString(teststeps) + "]";
	}
	private int testcase_id;
	private int package_id;
	private String testcase_name;
	private String testcase_description;
	private Teststeps teststeps [];
	
	
	
	
	public TestcaseSample(int package_id, String testcase_name,
			String testcase_description, Teststeps[] teststeps) {
		
		this.package_id = package_id;
		this.testcase_name = testcase_name;
		this.testcase_description = testcase_description;
		this.teststeps = teststeps;
	}
	
	public TestcaseSample() {
		
	}
	
	public int getTestcase_id() {
		return testcase_id;
	}
	public void setTestcase_id(int testcase_id) {
		this.testcase_id = testcase_id;
	}
	public int getPackage_id() {
		return package_id;
	}
	public void setPackage_id(int package_id) {
		this.package_id = package_id;
	}
	public String getTestcase_name() {
		return testcase_name;
	}
	public void setTestcase_name(String testcase_name) {
		this.testcase_name = testcase_name;
	}
	public String getTestcase_description() {
		return testcase_description;
	}
	public void setTestcase_description(String testcase_description) {
		this.testcase_description = testcase_description;
	}
	public Teststeps[] getTeststeps() {
		return teststeps;
	}
	public void setTeststeps(Teststeps[] teststeps) {
		this.teststeps = teststeps;
	}
	
	
	
	
}
