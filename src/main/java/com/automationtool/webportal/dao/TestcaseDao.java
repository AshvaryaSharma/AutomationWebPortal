package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Testcase;

public interface TestcaseDao {
	
	void createTestcase(Testcase testcase) throws Exception;
	List<Testcase> getAllTestCasesByApplicationId(int app_id);
	Testcase getTestCaseByTestcaseId(int testcase_id) throws Exception;
	void deleteTestcasesByTestcaseIds(int[] testcaseIDs) throws Exception;
	void updateTestcase(Testcase testcase) throws Exception;
}
