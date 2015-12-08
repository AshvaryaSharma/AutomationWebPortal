package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.Teststeps;
import com.automationtool.webportal.model.TestsuiteDescription;

public class TestcaseTemplate extends WebserviceTemplate {

	private Testcase testcaseDesc;
	
	private List<Teststeps> teststeps;
	
	
	public List<Teststeps> getTeststeps() {
		return teststeps;
	}

	public void setTeststeps(List<Teststeps> teststeps) {
		this.teststeps = teststeps;
	}

	

	
	public Testcase getTestcaseDesc() {
		return testcaseDesc;
	}

	public void setTestcaseDesc(Testcase testcaseDesc) {
		this.testcaseDesc = testcaseDesc;
	}

	public TestcaseTemplate(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public TestcaseTemplate() {
		// TODO Auto-generated constructor stub
	}

}
