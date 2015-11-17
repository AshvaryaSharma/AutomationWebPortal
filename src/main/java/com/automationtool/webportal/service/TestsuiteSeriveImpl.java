package com.automationtool.webportal.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.TestsuiteDao;
import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Configuration;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.ConfigurationList;
import com.automationtool.webportal.model.webservices.TestsuiteList;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;


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

	@Override
	public TestsuiteList findApplicationByAppAndGroup(
			TestsuiteByAppAndGroup testReq) {
		
		TestsuiteList testSuiteList = null;
		
		
		try {
			List<TestsuiteDescription>  listTestSuite = testsuites.getTestSuite(testReq);
			if(listTestSuite == null) {
				throw new Exception("No Testsuite found");
			} else if(listTestSuite.size() == 0) {
				throw new Exception("No Testsuite found");
			}
			System.out.println("List of testsuites" + listTestSuite);
			
			testSuiteList = new TestsuiteList();
			testSuiteList.setStatus("SUCCESS");
			testSuiteList.setTestSuite(listTestSuite);
		} catch(NullPointerException e) {
			testSuiteList = new TestsuiteList("ERROR","Null Pointer Exception");
		}
		
		catch (Exception e) {
			System.out.println("GOT EXCEPTION");
			testSuiteList = new TestsuiteList("ERROR",e.getMessage());
			e.printStackTrace();
		} finally {
			return testSuiteList;
		}
		
	}

	@Override
	public ConfigurationList getTestsuiteConfiguration(int testsuiteId) {
		ConfigurationList configList = null;
		
		
		try {
			List<Configuration>  config = testsuites.getTestsuiteConfig(testsuiteId);
			if(config == null) {
				throw new Exception("No Config found for testsuite");
			} else if(config.size() == 0) {
				throw new Exception("No Config found for testsuite");
			}
			System.out.println("List of testsuites" + config);
			
			configList = new ConfigurationList();
			configList.setStatus("SUCCESS");
			configList.setConfigList(config);
		} catch(NullPointerException e) {
			configList = new ConfigurationList("ERROR","Null Pointer Exception");
		}
		
		catch (Exception e) {
			System.out.println("GOT EXCEPTION");
			configList = new ConfigurationList("ERROR",e.getMessage());
			e.printStackTrace();
		} finally {
			return configList;
		}
		

	}

	

}
