package com.automationtool.webportal.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.NonUIOperation;
import com.automationtool.webportal.model.webservices.PageNames;
import com.automationtool.webportal.model.webservices.PageObjectList;
import com.automationtool.webportal.model.webservices.TestcasesList;
import com.automationtool.webportal.model.webservices.UiOperationObj;
import com.automationtool.webportal.model.webservices.UserDetail;
import com.automationtool.webportal.service.CreateTestcaseService;
import com.automationtool.webportal.service.OperationService;
import com.automationtool.webportal.service.PageNameService;
import com.automationtool.webportal.service.UserService;


@RestController
public class NewWebservicesController {

	@Autowired
	PageNameService pageService;
	
	@Autowired
	OperationService operationService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	CreateTestcaseService testcaseService;
	
	private static final Logger logger = Logger.getLogger(NewWebservicesController.class);
	
	@RequestMapping(value="/webservice/allPageNamesByApplication" , method = RequestMethod.POST)
	public ResponseEntity<PageNames> getAllPageNamesByApplication(@RequestBody int appId) {
		
		logger.info("--Getting All Page Names for application");
		PageNames pageNames = pageService.getPageNamesByApplicationId(appId);
		
		if(pageNames.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<PageNames>(pageNames, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<PageNames>(pageNames, HttpStatus.OK);
	}
	
	
	
	
	@RequestMapping(value="/webservice/gettestcasesByApplicationId" , method = RequestMethod.POST)
	public ResponseEntity<TestcasesList> getAllTestCasesByApplication(@RequestBody int appId) {
		
		logger.info("--Getting All Test Cases for application" + appId);
		TestcasesList testcaseList =  testcaseService.getAllTestCasesByApplicationId(appId);
		
		if(testcaseList.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<TestcasesList>(testcaseList, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<TestcasesList>(testcaseList, HttpStatus.OK);
	}
	
	@RequestMapping(value="/webservice/getLoggedUserDetails" , method = RequestMethod.GET)
	public ResponseEntity<UserDetail> createNewTestsuite() {
		UserDetail userDetail;
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userName = null;
		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		
		UserDetail user = userService.findUserDetailsByID(userName);
		
		if(user.getStatus().equalsIgnoreCase("ERROR")) {
			
			return new ResponseEntity<UserDetail>(user, HttpStatus.EXPECTATION_FAILED);
		}
		
		
		return new ResponseEntity<UserDetail>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value="/webservice/getPageObjectsByPageId" , method = RequestMethod.POST)
	public ResponseEntity<PageObjectList> getAllPageObjectsByPageId(@RequestBody int pageId) {
		
		logger.info("--Getting All Page Object for page id: " + pageId);
		PageObjectList pageObjects = pageService.getPageObjectsByPageId(pageId);
		
		if(pageObjects.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<PageObjectList>(pageObjects, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<PageObjectList>(pageObjects, HttpStatus.OK);
	}
	
	@RequestMapping(value="/webservice/getNonUiOperationByName" , method = RequestMethod.POST)
	public ResponseEntity<NonUIOperation> getNonUiOperationByName(@RequestBody String operationName) {
		
		logger.info("--Getting Operation Description for Non UI Operation: " + operationName);
		NonUIOperation nonuiOperation = operationService.getNonUiOperationByName(operationName);
		
		if(nonuiOperation.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<NonUIOperation>(nonuiOperation, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<NonUIOperation>(nonuiOperation, HttpStatus.OK);
	}
	
	@RequestMapping(value="/webservice/getUiOperationByName" , method = RequestMethod.POST)
	public ResponseEntity<UiOperationObj> getUiOperationByName(@RequestBody String operationName) {
		
		logger.info("--Getting Operation Description for UI Operation: " + operationName);
		UiOperationObj uiOperation = operationService.getUiOperationByName(operationName);
		
		if(uiOperation.getStatus().equalsIgnoreCase("ERROR")) {
			return new ResponseEntity<UiOperationObj>(uiOperation, HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<UiOperationObj>(uiOperation, HttpStatus.OK);
	}

}
