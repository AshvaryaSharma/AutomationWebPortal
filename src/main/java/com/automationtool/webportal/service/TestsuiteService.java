package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.viewModel.Testsuite;

public interface TestsuiteService {

	boolean createTestsuite(Testsuite testsuite);

	List<Testsuite> getAllTestsuite();
}
