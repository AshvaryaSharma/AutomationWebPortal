package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.viewModel.Testsuite;

public interface TestsuiteDao {
	
	public void createTestSuite(Testsuite testsuite) throws Exception;

	public List<Testsuite> getAllTestSuite();

}
