package com.automationtool.webportal.service;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.ApplicationDao;
import com.automationtool.webportal.dao.GroupAccessDao;
import com.automationtool.webportal.dao.PackagesDao;
import com.automationtool.webportal.dao.TestcaseDao;
import com.automationtool.webportal.dao.TeststepsDao;
import com.automationtool.webportal.dao.UserDao;
import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Packages;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.Teststeps;
import com.automationtool.webportal.model.viewModel.TestcaseSample;
import com.automationtool.webportal.model.webservices.ApplicationList;

@Service("createTestcaseService")
@Transactional
public class CreateTestcaseServiceImpl implements CreateTestcaseService {

	@Autowired
	private ApplicationDao application;
	
	@Autowired
	private PackagesDao packages;
	
	@Autowired
	private TestcaseDao testcase;
	
	@Autowired
	private TeststepsDao teststeps;
	
	@Autowired
	private UserDao user;
	
	@Autowired
	private GroupAccessDao groupAccess;
	
	@Override
	public List<Application> findAllApplications() {
		
		return application.findAllApplication();
	}


	@Override
	public List<Packages> findPackagesByApplicationId(int app_id) {
		
		return packages.findPackagesByApplicationId(app_id);
	}


	@Override
	public boolean createTestcase(int package_id, String testcaseName,
			String testcaseDescription) {
		Packages pckg = packages.findPackageByPackageId(package_id);
		Testcase testcase_new = new Testcase(testcaseName, testcaseDescription);
		
		testcase_new.setPackages(pckg);
		boolean flag;
		try {
			testcase.createTestcase(testcase_new);
			flag = true;
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		
		
		return flag;
	}


	@Override
	public boolean createTestcase(TestcaseSample testcaseSample) {
		boolean flag = false;
		
		Packages pckg = packages.findPackageByPackageId(testcaseSample.getPackage_id());
		System.out.println("Got package: " + pckg);
		Testcase new_testCase = new Testcase(testcaseSample.getTestcase_name(), testcaseSample.getTestcase_description());
		Teststeps new_testCase_teststeps [] = testcaseSample.getTeststeps();
		System.out.println("Test steps for creating: " + Arrays.toString(testcaseSample.getTeststeps()));
		System.out.println("No of Test steps: " + testcaseSample.getTeststeps().length);
		if(testcaseSample.getTeststeps().length == 0) {
			return false;
		}
		
		System.out.println("Setting package for new test case: " + pckg.getPackage_id());
		new_testCase.setPackages(pckg);
		try {
			testcase.createTestcase(new_testCase);
			flag=true;
		} catch (Exception e) {
			flag= false;
			e.printStackTrace();
		}
		
		if(flag) {
			
			try {
				
				for(Teststeps step : new_testCase_teststeps) {
					step.setTestcase(new_testCase);	
				}
				
				teststeps.createTestSteps(new_testCase_teststeps);
				
			} catch(Exception e) {
				
				flag = false;
				e.printStackTrace();
				
			}
		}
		
		System.out.println("Flag value returning " + flag);
		return flag;
	}


	@Override
	public List<Testcase> getTestcasesByPackageId(int package_id) {
		
		return testcase.getTestcasesByPackageId(package_id);
	}


	@Override
	public TestcaseSample getTestcase(int testcase_id) {
		TestcaseSample testSample;
		
		Testcase test;
		try {
			test = testcase.getTestCaseByTestcaseId(testcase_id);
		} catch (Exception e) {
			return null;
		}
		Teststeps steps [] = teststeps.getTestSteps(testcase_id);
		
		testSample = new TestcaseSample(test.getPackages().getPackage_id(), test.getTestcase_name(), test.getTestcase_description(), steps);
		testSample.setTestcase_id(testcase_id);
		
		return testSample;
	}


	@Override
	public void deleteTestCases(int[] testcaseIDs) {
		
		try {
			
			System.out.println("Deletting test cases");
			testcase.deleteTestcasesByTestcaseIds(testcaseIDs);
			System.out.println("Deleted successfully");
		} catch(Exception e) {
			
		}
		
	}


	@Override
	public boolean updateTestcase(TestcaseSample testcaseSample) {

		boolean flag = false;
		
		Packages pckg = packages.findPackageByPackageId(testcaseSample.getPackage_id());
		System.out.println("Got package: " + pckg);
		Testcase new_testCase = new Testcase(testcaseSample.getTestcase_name(), testcaseSample.getTestcase_description());
		Teststeps new_testCase_teststeps [] = testcaseSample.getTeststeps();
		System.out.println("Test steps for creating: " + Arrays.toString(testcaseSample.getTeststeps()));
		System.out.println("No of Test steps: " + testcaseSample.getTeststeps().length);
		if(testcaseSample.getTeststeps().length == 0) {
			return false;
		}

		System.out.println("Setting package for new test case: " + pckg.getPackage_id());
		new_testCase.setPackages(pckg);
		new_testCase.setTestcase_id(testcaseSample.getTestcase_id());
		try {
			testcase.updateTestcase(new_testCase);
			flag=true;
		} catch (Exception e) {
			flag= false;
			e.printStackTrace();
		}
		
		if(flag) {
			
			try {
				
				for(Teststeps step : new_testCase_teststeps) {
					step.setTestcase(new_testCase);	
				}
				
				teststeps.updateTestSteps(new_testCase_teststeps);
				
			} catch(Exception e) {
				
				flag = false;
				e.printStackTrace();
				
			}
		}
		
		System.out.println("Flag value returning " + flag);
		return flag;
		
	}


	@Override
	public ApplicationList findApplicationsByUserId(String userId) {
		
		ApplicationList appList = null;
		
		List<Application> list;
		try {
			int groupId = user.findGroupByUserId(userId);
			
			System.out.println("GroupId returned: " + groupId);
			List<BigInteger> appId = groupAccess.getApplicationsByGroupId(groupId);
			if(appId == null) {
				throw new Exception("User Team does not have access to any application");
			} else if(appId.size() == 0) {
				throw new Exception("User Team does not have access to any application");
			}
			System.out.println("List of appid:" + appId);
			list = application.findApplicationsByAppIds(appId);
			if(list == null) {
				throw new Exception("No Application List returned");
			}
			System.out.println("List of applications returned: " + list);
			
			appList = new ApplicationList();
			appList.setStatus("SUCCESS");
			appList.setApplicationList(list);
		} catch(NullPointerException e) {
			appList = new ApplicationList("ERROR","Null Pointer Exception");
		}
		
		catch (Exception e) {
			System.out.println("GOT EXCEPTION");
			appList = new ApplicationList("ERROR",e.getMessage());
			e.printStackTrace();
		} finally {
			return appList;
		}
		
		
		
	}

}
