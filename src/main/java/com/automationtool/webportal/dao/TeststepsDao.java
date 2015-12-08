package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Teststeps;


public interface TeststepsDao {

	void createTestSteps(Teststeps[] new_testCase_teststeps);

	List<Teststeps> getTestSteps(int testcase_id);

	void updateTestSteps(Teststeps[] new_testCase_teststeps);

	void deleteTestSteps(Teststeps[] new_testCase_teststeps);

}
