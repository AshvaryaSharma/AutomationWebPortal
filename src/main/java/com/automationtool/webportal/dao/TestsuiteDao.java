package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Configuration;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.viewModel.UpdateParamList;
import com.automationtool.webportal.model.webservices.request.TestCaseAppAndTestsuiteId;
import com.automationtool.webportal.model.webservices.request.TestcaseToTestsuites;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;

public interface TestsuiteDao {
	
	public void createTestSuite(TestsuiteDescription testsuite) throws Exception;

	public List<Testsuite> getAllTestSuite();

	public List<TestsuiteDescription> getTestSuite(
			TestsuiteByAppAndGroup testReq);

	public List<Configuration> getTestsuiteConfig(int testsuiteId);

	public void updateTestSuite(TestsuiteDescription testsuiteDescription);

	public void deleteTestSuite(TestsuiteDescription testsuiteDescription);

	public List<Testcase> getTestCasesForTestSuite(
			TestCaseAppAndTestsuiteId testSuiteInfo);

	public void addTestcasesToTestcases(TestcaseToTestsuites test);

	public List<TestsuiteTestcases> getTestcasesForTestsuites(int testsuiteId);

	public void updateTestcasesToTestcases(TestcaseToTestsuites test);

	public void deleteTestcasesFromTestsuite(TestsuiteTestcases test);

	public void updateTestParam(UpdateParamList config, int testsuiteId);

	public void deleteTestParam(String config, int testsuiteid);

}
