package com.automationtool.webportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.automationtool.webportal.service.OperationService;

@Controller
public class TestcaseController {
	
	@Autowired
	OperationService operationService;
	
	@RequestMapping(value = "/createTestCase" , method = RequestMethod.GET)
	public String createTestcase(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","create");
		model.addAttribute("testcaseId", 0);
		model.addAttribute("heading", "Create Test Case");
		model.addAttribute("button", "Create");
		return "protected/testCases/testcase";
		
	}
	
	private String getPrincipal(){
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

}
