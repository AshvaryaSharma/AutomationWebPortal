package com.automationtool.webportal.service;

import java.util.List;




import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.webservices.ConfigurationList;
import com.automationtool.webportal.model.webservices.TestsuiteList;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;

public interface TestsuiteService {

	boolean createTestsuite(Testsuite testsuite);

	List<Testsuite> getAllTestsuite();

	TestsuiteList findApplicationByAppAndGroup(TestsuiteByAppAndGroup testReq);

	ConfigurationList getTestsuiteConfiguration(int testsuiteId);
}
