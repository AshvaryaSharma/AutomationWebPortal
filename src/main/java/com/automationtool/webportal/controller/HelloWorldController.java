package com.automationtool.webportal.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HelloWorldController {


	
	@RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	public String homePage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "protected/dashboard";
	}

	//------------------------------------------------------------------------
	@RequestMapping(value = { "/index"}, method = RequestMethod.GET)
	public String indexTestPage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","create");
		model.addAttribute("testcaseId", 0);
		model.addAttribute("heading", "Create Test Case");
		model.addAttribute("button", "Create");
		return "protected/testCases/testcase";
	}
	
	@RequestMapping(value = { "/package"}, method = RequestMethod.GET)
	public String packagePage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		
		return "protected/testCases/package";
	}
	
	@RequestMapping(value = { "/saveAsNew"}, method = RequestMethod.POST)
	public String saveAsNewTestPage(@RequestBody int id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","SaveAsNew");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Save Test Case As New");
		model.addAttribute("button", "Save As");
		System.out.println("Testcase Action: SaveAsNew and id: " + id);
		return "protected/testCases/testcase";
	}
	
	@RequestMapping(value = { "/saveAs"}, method = RequestMethod.GET)
	public String saveAsNewTestPageGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","SaveAsNew");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Save Test Case As New");
		model.addAttribute("button", "Save As");
		System.out.println("Testcase Action: SaveAsNew and id: " + id);
		return "protected/testCases/testcase";
	}
	
	
	@RequestMapping(value = { "/view"}, method = RequestMethod.GET)
	public String viewTestCaseGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","view");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Testcase Details");
		model.addAttribute("button", "OK");
		System.out.println("Testcase Action: View and id: " + id);
		return "protected/testCases/testcase";
	}
	
	@RequestMapping(value = { "/editTestCase"}, method = RequestMethod.GET)
	public String editestCaseGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","edit");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Edit Test Case");
		model.addAttribute("button", "Edit");
		System.out.println("Testcase Action: Edit and id: " + id);
		return "protected/testCases/testcase";
	}
	
	
	@RequestMapping(value = { "/viewTestcase"}, method = RequestMethod.GET)
	public String viewIndexTestPage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		return "protected/testCases/viewTestcase";
	}
	
	
	@RequestMapping(value = { "/application"}, method = RequestMethod.GET)
	public String viewApplicationPage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		return "protected/testCases/application";
	}
	
	//------------------------------------------------------------------------
	@RequestMapping(value = "/protected", method = RequestMethod.GET)
	public String dashboard(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "protected/dashboard";
	}

	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String adminPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "admin";
	}

	@RequestMapping(value = "/db", method = RequestMethod.GET)
	public String dbaPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "dba";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage() {
        return "login";
    }
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	   public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
	      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	      if (auth != null){    
	         new SecurityContextLogoutHandler().logout(request, response, auth);
	      }
	      return "redirect:/login?logout";
	   }

	@RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
	public String accessDeniedPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "accessDenied";
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