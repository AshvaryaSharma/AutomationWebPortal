package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Configuration;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;

public interface TestsuiteDao {
	
	public void createTestSuite(Testsuite testsuite) throws Exception;

	public List<Testsuite> getAllTestSuite();

	public List<TestsuiteDescription> getTestSuite(
			TestsuiteByAppAndGroup testReq);

	public List<Configuration> getTestsuiteConfig(int testsuiteId);

}
