package com.automationtool.webportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.User;
import com.automationtool.webportal.service.GroupService;
import com.automationtool.webportal.service.OperationService;
import com.automationtool.webportal.service.UserService;

@Controller
public class TestcaseController {
	
	@Autowired
	OperationService operationService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	GroupService groupService;
	
	@RequestMapping(value = "/utility/createTestCase" , method = RequestMethod.GET)
	public String createTestcase(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","create");
		model.addAttribute("testcaseId", 0);
		model.addAttribute("heading", "Create Test Case");
		model.addAttribute("button", "Create");
		model.addAttribute("team", getTeamName());
		return "testcase";
		
	}
	
	private String getPrincipal(){
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		
		User user = userService.findBySso(userName);
		
		return userName;
	}
	
	private String getTeamName() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		
		User user = userService.findBySso(userName);
		System.out.println("Got user: " + user);
		Group team = groupService.getGroupById(user.getGroupid());
		
		return team.getTeam_name();
		
	}

}
