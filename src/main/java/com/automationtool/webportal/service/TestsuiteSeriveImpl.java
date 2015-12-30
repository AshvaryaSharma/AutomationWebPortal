package com.automationtool.webportal.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.TestsuiteDao;
import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Configuration;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.viewModel.UpdateParamList;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.ConfigurationList;
import com.automationtool.webportal.model.webservices.TestcasesList;
import com.automationtool.webportal.model.webservices.TestcasesTestsuitesList;
import com.automationtool.webportal.model.webservices.TestsuiteList;
import com.automationtool.webportal.model.webservices.WebserviceTemplate;
import com.automationtool.webportal.model.webservices.request.TestCaseAppAndTestsuiteId;
import com.automationtool.webportal.model.webservices.request.TestcaseToTestsuites;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;
import com.automationtool.webportal.model.webservices.request.TestsuiteConfig;


@Service("testsuiteService")
@Transactional
public class TestsuiteSeriveImpl implements TestsuiteService {

	@Autowired
	private TestsuiteDao testsuites;
	
	@Override
	public WebserviceTemplate createTestsuite(TestsuiteDescription testsuite) {
		WebserviceTemplate status;
		try {
			testsuites.createTestSuite(testsuite);
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
			return status;
			
			
		} catch (Exception e) {
			status = new WebserviceTemplate("ERROR", e.getLocalizedMessage());
			return status;
		}
		
	}

	@Override
	public List<Testsuite> getAllTestsuite() {
		return testsuites.getAllTestSuite();
		 
	}

	@Override
	public TestsuiteList findTestsuiteByAppAndGroup(
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
			testSuiteList = new TestsuiteList("ERROR",e.getLocalizedMessage());
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

	@Override
	public WebserviceTemplate updateTestsuite(
			TestsuiteDescription testsuiteDescription) {
		WebserviceTemplate status;
		try {
			testsuites.updateTestSuite(testsuiteDescription);
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
			return status;
			
			
		} catch (Exception e) {
			status = new WebserviceTemplate("ERROR", e.getLocalizedMessage());
			return status;
		}
	}

	@Override
	public WebserviceTemplate deleteTestsuite(
			TestsuiteDescription testsuiteDescription) {
		WebserviceTemplate status;
		try {
			testsuites.deleteTestSuite(testsuiteDescription);
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
			return status;
			
			
		} catch (Exception e) {
			status = new WebserviceTemplate("ERROR", e.getLocalizedMessage());
			return status;
		}
	}

	@Override
	public TestcasesList getTestcasesBySuiteId(
			TestCaseAppAndTestsuiteId testSuiteInfo) {
		TestcasesList testcasesList = null;
		
		System.out.println("Getting info for testsuites: " + testSuiteInfo);
		
		try {
			List<Testcase>  listTestcases = testsuites.getTestCasesForTestSuite(testSuiteInfo);
			if(listTestcases == null) {
				throw new Exception("No Testsuite found");
			} else if(listTestcases.size() == 0) {
				throw new Exception("No Testsuite found");
			}
			System.out.println("List of testsuites" + listTestcases);
			
			testcasesList = new TestcasesList();
			testcasesList.setStatus("SUCCESS");
			testcasesList.setTestcasesList(listTestcases);
		} catch(NullPointerException e) {
			testcasesList = new TestcasesList("ERROR","Null Pointer Exception");
			e.printStackTrace();
		}
		
		catch (Exception e) {
			System.out.println("GOT EXCEPTION");
			testcasesList = new TestcasesList("ERROR",e.getLocalizedMessage());
			e.printStackTrace();
		} finally {
			return testcasesList;
		}
		
	}

	@Override
	public WebserviceTemplate addTestcasesToTestsuites(
			TestcaseToTestsuites[] testcases) {
		WebserviceTemplate status = null;
		System.out.println("Adding test cases to test suite: " + testcases);
		try {
			
			for(TestcaseToTestsuites test : testcases) {
				testsuites.addTestcasesToTestcases(test);
				
			}
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
			
		} catch(Exception e) {
			e.printStackTrace();
			status = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
			
		}
		return status;
	}

	@Override
	public TestcasesTestsuitesList getTestcasesForTestsuites(int testsuiteId) {
		TestcasesTestsuitesList testcaseList = null;
		try {
			
			List<TestsuiteTestcases> list = testsuites.getTestcasesForTestsuites(testsuiteId);
			
			if(list == null || list.size() == 0) {
				throw new Exception("No Testcases returned for Testsuite");
			}
			
			testcaseList = new TestcasesTestsuitesList();
			testcaseList.setStatus("SUCCESS");
			testcaseList.setTestcases(list);
		} catch(Exception e) {
			
			testcaseList = new TestcasesTestsuitesList("ERROR" , e.getLocalizedMessage());
		}
		
		return testcaseList;
	}

	@Override
	public WebserviceTemplate updateTestcasesToTestsuites(
			TestcaseToTestsuites[] testcases) {
		WebserviceTemplate status = null;
		System.out.println("Updating test cases to test suite: " + testcases);
		try {
			
			for(TestcaseToTestsuites test : testcases) {
				testsuites.updateTestcasesToTestcases(test);
				
			}
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
			
		} catch(Exception e) {
			status = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
			
		}
		return status;
	}

	@Override
	public WebserviceTemplate deleteTestcasesFromTestsuite(TestsuiteTestcases[] testcases) {
		WebserviceTemplate status = null;
		try {
			for(TestsuiteTestcases test : testcases) {
				System.out.println("deleting: " + testcases);
				testsuites.deleteTestcasesFromTestsuite(test);
				System.out.println("DELETED");
			}
			
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
		} catch(Exception e) {
			status = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
			
		}
		return status;
	}

	@Override
	public WebserviceTemplate updateTestsuiteConfig(
			UpdateParamList[] updateParamLists, int testsuiteId) {
		
		WebserviceTemplate status = null;
		try {
			for(UpdateParamList config : updateParamLists) {
				System.out.println("updating: " + config);
				testsuites.updateTestParam(config,testsuiteId);
				System.out.println("UPDATED");
			}
			
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
		} catch(Exception e) {
			e.printStackTrace();
			status = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
			
		}
		return status;
		
	}

	@Override
	public WebserviceTemplate deleteTestsuiteConfig(String[] deleteParamList,
			int testsuiteid) {
		WebserviceTemplate status = null;
		try {
			
			if(deleteParamList.length > 0) {
				for(String config : deleteParamList) {
					System.out.println("Deleting: " + config);
					testsuites.deleteTestParam(config, testsuiteid);
					System.out.println("DELETED");
				}
				
			}
			status = new WebserviceTemplate();
			status.setStatus("SUCCESS");
		} catch(Exception e) {
			status = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
			
		}
		return status;
		
		
		
	}

	

	

	

}
