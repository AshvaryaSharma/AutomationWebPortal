package com.automationtool.webportal.model.viewModel;

import java.util.ArrayList;
import java.util.Arrays;

import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;

public class Testsuite {

	private TestsuiteDescription testsuite;
	private TestsuiteTestcases [] testcases;
	
	public Testsuite () {
		
	}
	
	
	public TestsuiteDescription getTestsuite() {
		return testsuite;
	}
	public void setTestsuite(TestsuiteDescription testsuite) {
		this.testsuite = testsuite;
	}
	public TestsuiteTestcases [] getTestcases() {
		return testcases;
	}
	public void setTestcases(TestsuiteTestcases [] testcases) {
		this.testcases = testcases;
	}
	public Testsuite(TestsuiteDescription testsuite,
			TestsuiteTestcases [] testcases) {
		
		this.testsuite = testsuite;
		this.testcases = testcases;
	}


	@Override
	public String toString() {
		return "Testsuite [testsuite=" + testsuite + ", testcases="
				+ Arrays.toString(testcases) + "]";
	}
	
	
}
