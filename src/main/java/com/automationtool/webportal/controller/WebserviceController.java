package com.automationtool.webportal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;






















import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Operations;
import com.automationtool.webportal.model.Packages;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.User_view;
import com.automationtool.webportal.model.viewModel.TestcaseSample;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.OperationsList;
import com.automationtool.webportal.service.ApplicationService;
import com.automationtool.webportal.service.CreateTestcaseService;
import com.automationtool.webportal.service.KeywordService;
import com.automationtool.webportal.service.OperationService;
import com.automationtool.webportal.service.PackagesService;
import com.automationtool.webportal.service.TestsuiteService;
import com.automationtool.webportal.service.UserService;

@RestController

public class WebserviceController {

	@Autowired
	KeywordService keywordService;
	
	@Autowired
	OperationService operationService;
	
	@Autowired
	CreateTestcaseService createTestcaseService;
	
	@Autowired
	PackagesService packagesService;
	
	@Autowired
	ApplicationService applicationService;
	
	@Autowired
	TestsuiteService testsuiteService;
	
	@Autowired
	UserService userService;
	
	
	@RequestMapping(value="/webservice/getUserDetails" , method = RequestMethod.POST)
	public ResponseEntity<User_view> createNewTestsuite(@RequestBody String userId) {
		User_view flag;
		
		
		
		flag = userService.findUserDetailsByID(userId);
		
		if(flag== null) {
			return new ResponseEntity<User_view>(HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<User_view>( flag, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/webservice/findAllApplications" , method = RequestMethod.GET)
	public ResponseEntity<List<Application>> findAllApplications() {
		List<Application> application = createTestcaseService.findAllApplications();
		
		if(application.isEmpty()) {
			return new ResponseEntity<List<Application>>(HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<List<Application>>(application, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/webservice/findApplicationsByUserId" , method = RequestMethod.POST)
	public ResponseEntity<ApplicationList> findApplicationsByUserID(@RequestBody String userId) {
		ApplicationList application = createTestcaseService.findApplicationsByUserId(userId);
		
		if(application.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<ApplicationList>(application, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<ApplicationList>(application, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/webservice/createTestsuite" , method = RequestMethod.POST)
	public ResponseEntity<Boolean> createNewTestsuite(@RequestBody Testsuite testsuite) {
		boolean flag;
		
		System.out.println("::::::::::CREATING TEST SUITE::::::::::::");
		
		flag = testsuiteService.createTestsuite(testsuite);
		
		if(!flag) {
			return new ResponseEntity<Boolean>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<Boolean>(HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/webservice/getAllTestsuite" , method = RequestMethod.GET)
	public ResponseEntity<List<Testsuite>> createNewTestsuite() {
		boolean flag;
		List<Testsuite> testsuite;
		testsuite = testsuiteService.getAllTestsuite();
		
		if(testsuite.isEmpty()) {
			return new ResponseEntity<List<Testsuite>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Testsuite>>(testsuite, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/webservice/keywords", method = RequestMethod.GET)
	public ResponseEntity<List<String>> listAllKeywords() {
		List<String> keywords = keywordService.listAllKeywords();
		if(keywords.isEmpty()){
            return new ResponseEntity<List<String>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<String>>(keywords, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/webservice/findalloperations",method = RequestMethod.GET)
	public ResponseEntity<List<Operations>> findAllOperations() {
		List<Operations> operations =  operationService.findAllOperations();
		if(operations.isEmpty()) {
			return new ResponseEntity<List<Operations>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Operations>>(operations, HttpStatus.OK);
	}
	
	@RequestMapping(value ="/webservice/getOperation" , method = RequestMethod.POST)
	public ResponseEntity<Operations> findOperationByKeyword(@RequestBody String keyword) {
		
		System.out.println("Running webservice for keyword" + keyword);
		Operations operation = operationService.findOperationByKeyword(keyword);
		if(operation == null) {
			return new ResponseEntity<Operations>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Operations>(operation,HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/findpackagebyapplicationid" , method = RequestMethod.POST)
	public ResponseEntity<List<Packages>> findPackageByApplicationId(@RequestBody int app_id) {
		System.out.println("Getting packages for application id: " + app_id);
		
		List<Packages> packages = packagesService.findPackagesByApplicationId(app_id);
		
		if(packages == null) {
			return new ResponseEntity<List<Packages>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Packages>>(packages,HttpStatus.OK);
		
	}
	
	//-------------------------------------------------------------------------------------------------
	
	
	@RequestMapping(value="/webservice/findpackagebyapplicationidnew" , method = RequestMethod.POST)
	public ResponseEntity<List<Packages>> findPackageByApplicationIdNew(@RequestBody int app_id) {
		System.out.println("Getting packages for application id: " + app_id);
		
		List<Packages> packages = createTestcaseService.findPackagesByApplicationId(app_id);
		
		if(packages == null) {
			return new ResponseEntity<List<Packages>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Packages>>(packages,HttpStatus.OK);
		
	}
	
	@RequestMapping(value ="/webservice/gettestcasesbypackageid" , method = RequestMethod.POST)
	public ResponseEntity<List<Testcase>> findTestCasesByPackageId(@RequestBody int package_id) {
		
		System.out.println("Getting Test cases for package id: " + package_id);
		List<Testcase> testcases = createTestcaseService.getTestcasesByPackageId(package_id);
		if(testcases == null || testcases.size()==0) {
			return new ResponseEntity<List<Testcase>>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<List<Testcase>>(testcases,HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/addNewTestCase" , method = RequestMethod.POST)
	public ResponseEntity<Void> addNewTestCase(@RequestBody TestcaseSample testcase) {
		System.out.println("Creating new test case in package with id: " + testcase.getPackage_id());
		
		System.out.println("########## Testcase Object:#####################");
		
		System.out.println(testcase);
		System.out.println("##########-----------------#####################");
		
		boolean flag = createTestcaseService.createTestcase(testcase);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/addNewApplication" , method = RequestMethod.POST)
	public ResponseEntity<Void> addNewApplication(@RequestBody Application application) {
		/*System.out.println("Creating new Application " + application);*/
		
		System.out.println("########## Application Object:#####################");
		
		System.out.println(application);
		System.out.println("##########-----------------#####################");
		
		boolean flag = applicationService.createApplication(application);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/addNewPackage" , method = RequestMethod.POST)
	public ResponseEntity<Void> addNewPackage(@RequestBody Packages package_new) {
		/*System.out.println("Creating new Application " + application);*/
		
		System.out.println("########## Package Object:#####################");
		
		System.out.println(package_new);
		System.out.println("##########-----------------#####################");
		
		boolean flag = packagesService.createPackage(package_new);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/editPackage" , method = RequestMethod.POST)
	public ResponseEntity<Void> editPackage(@RequestBody Packages package_edit) {
		/*System.out.println("Creating new Application " + application);*/
		
		System.out.println("########## Package Object:#####################");
		
		System.out.println(package_edit);
		System.out.println("##########-----------------#####################");
		
		boolean flag = packagesService.editPackage(package_edit);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	
	
	@RequestMapping(value="/webservice/editApplication" , method = RequestMethod.POST)
	public ResponseEntity<Void> editApplication(@RequestBody Application application) {
		/*System.out.println("Creating new Application " + application);*/
		
		System.out.println("########## Application Object:#####################");
		
		System.out.println(application);
		System.out.println("##########-----------------#####################");
		
		boolean flag = applicationService.updateApplication(application);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	
	@RequestMapping(value="/webservice/removeApplication" , method = RequestMethod.POST)
	public ResponseEntity<Void> editApplication(@RequestBody int application) {
		/*System.out.println("Creating new Application " + application);*/
		
		System.out.println("########## Application Object ID:#####################");
		
		System.out.println(application);
		System.out.println("##########-----------------#####################");
		
		boolean flag = applicationService.deleteApplication(application);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/webservice/updateTestCase" , method = RequestMethod.POST)
	public ResponseEntity<Void> updateTestCase(@RequestBody TestcaseSample testcase) {
		System.out.println("Creating new test case in package with id: " + testcase.getPackage_id());
		
		System.out.println("########## UPDATE Testcase Object:#####################");
		
		System.out.println(testcase);
		System.out.println("##########-----------------#####################");
		
		boolean flag = createTestcaseService.updateTestcase(testcase);
		
		if(flag == false) {
			return new ResponseEntity<Void>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	
	
	@RequestMapping(value="/webservice/getTestcaseByTestcaseId" , method = RequestMethod.POST)
	public ResponseEntity<TestcaseSample> getTestcaseByTestcaseId(@RequestBody int testcase_id) {
		System.out.println("Getting testcase details for test id: " + testcase_id);
		
		TestcaseSample testcaseSample = createTestcaseService.getTestcase(testcase_id);
		
		System.out.println("Testcase: " + testcaseSample);
		
		if(testcaseSample == null) {
			return new ResponseEntity<TestcaseSample>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<TestcaseSample>(testcaseSample,HttpStatus.OK);
		
	}
	
	
	@RequestMapping(value="/webservice/deleteTestcasesByTestcaseId" , method = RequestMethod.POST)
	public ResponseEntity<String> deleteTestcasesByTestcaseId(@RequestBody int [] testcaseIDs) {
		
		System.out.println("Deleting test case for test case IDs: " + testcaseIDs[0] + " array: " + testcaseIDs);
		
		createTestcaseService.deleteTestCases(testcaseIDs);
		
		String status = "pass";
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	//-------------------------------------------------------------------------------------------------
	
	@RequestMapping(value ="/webservice/getOperation/{keyword}" , method = RequestMethod.GET)
	public ResponseEntity<Operations> findOperationByKeywordGet(@PathVariable String keyword) {
		
		System.out.println("Running webservice for keyword" + keyword);
		Operations operation = operationService.findOperationByKeyword(keyword);
		if(operation == null) {
			return new ResponseEntity<Operations>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Operations>(operation,HttpStatus.OK);
		
	}
	
	@RequestMapping(value ="/webservice/getAllOperationNames" , method = RequestMethod.GET)
	public ResponseEntity<OperationsList> findAllOperationName() {
		
		System.out.println("Getting all operation names");
		OperationsList operationnames = operationService.findAllOperationName();
		if(operationnames.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<OperationsList>(HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<OperationsList>(operationnames,HttpStatus.OK);
		
	}
	
	
}
