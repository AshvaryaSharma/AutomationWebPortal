package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.TestsuiteDao;
import com.automationtool.webportal.model.viewModel.Testsuite;


@Service("testsuiteService")
@Transactional
public class TestsuiteSeriveImpl implements TestsuiteService {

	@Autowired
	private TestsuiteDao testsuites;
	
	@Override
	public boolean createTestsuite(Testsuite testsuite) {
		try {
			/*testsuites.createTestSuite(testsuite);*/
			
			
			
		} catch (Exception e) {
			System.out.println("Error in creating testsuite");
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<Testsuite> getAllTestsuite() {
		return testsuites.getAllTestSuite();
		 
	}

}
