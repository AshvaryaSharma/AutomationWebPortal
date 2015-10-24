package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.Teststeps;


public interface TeststepsDao {

	void createTestSteps(Teststeps[] new_testCase_teststeps);

	Teststeps[] getTestSteps(int testcase_id);

	void updateTestSteps(Teststeps[] new_testCase_teststeps);

}
