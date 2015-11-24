package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Packages;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.viewModel.TestcaseSample;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.TestcasesList;

public interface CreateTestcaseService {
	
	

	List<Packages> findPackagesByApplicationId(int app_id);
	
	boolean createTestcase(int package_id, String testcaseName, String testcaseDescription);

	boolean createTestcase(TestcaseSample testcase);
	
	boolean updateTestcase(TestcaseSample testcase);
	
	

	TestcaseSample getTestcase(int testcase_id);

	void deleteTestCases(int[] testcaseIDs);

	ApplicationList findApplicationsByUserId(String userId);

	List<Application> findAllApplications();

	TestcasesList getAllTestCasesByApplicationId(int appId);
	
	

}
