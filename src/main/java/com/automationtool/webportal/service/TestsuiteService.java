package com.automationtool.webportal.service;

import java.util.List;













import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.viewModel.UpdateParamList;
import com.automationtool.webportal.model.webservices.ConfigurationList;
import com.automationtool.webportal.model.webservices.TestcasesList;
import com.automationtool.webportal.model.webservices.TestcasesTestsuitesList;
import com.automationtool.webportal.model.webservices.TestsuiteList;
import com.automationtool.webportal.model.webservices.WebserviceTemplate;
import com.automationtool.webportal.model.webservices.request.TestCaseAppAndTestsuiteId;
import com.automationtool.webportal.model.webservices.request.TestcaseToTestsuites;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;
import com.automationtool.webportal.model.webservices.request.TestsuiteConfig;

public interface TestsuiteService {

	WebserviceTemplate createTestsuite(TestsuiteDescription testsuiteDescription);

	List<Testsuite> getAllTestsuite();

	TestsuiteList findTestsuiteByAppAndGroup(TestsuiteByAppAndGroup testReq);

	ConfigurationList getTestsuiteConfiguration(int testsuiteId);

	WebserviceTemplate updateTestsuite(TestsuiteDescription testsuiteDescription);

	WebserviceTemplate deleteTestsuite(TestsuiteDescription testsuiteDescription);

	TestcasesList getTestcasesBySuiteId(TestCaseAppAndTestsuiteId testSuiteInfo);

	WebserviceTemplate addTestcasesToTestsuites(TestcaseToTestsuites[] testcases);

	TestcasesTestsuitesList getTestcasesForTestsuites(int testsuiteId);

	WebserviceTemplate updateTestcasesToTestsuites(
			TestcaseToTestsuites[] testcases);

	WebserviceTemplate deleteTestcasesFromTestsuite(TestsuiteTestcases[] testcases);

	WebserviceTemplate updateTestsuiteConfig(UpdateParamList[] updateParamLists, int i);

	WebserviceTemplate deleteTestsuiteConfig(String[] deleteParamList, int i);
	
	
}
