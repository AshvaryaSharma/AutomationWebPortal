package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Packages;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.viewModel.TestcaseSample;

public interface CreateTestcaseService {
	
	List<Application> findAllApplications();

	List<Packages> findPackagesByApplicationId(int app_id);
	
	boolean createTestcase(int package_id, String testcaseName, String testcaseDescription);

	boolean createTestcase(TestcaseSample testcase);
	
	boolean updateTestcase(TestcaseSample testcase);
	
	List<Testcase> getTestcasesByPackageId(int package_id);

	TestcaseSample getTestcase(int testcase_id);

	void deleteTestCases(int[] testcaseIDs);

}
