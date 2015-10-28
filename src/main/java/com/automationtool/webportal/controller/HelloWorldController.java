package com.automationtool.webportal.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.servlet.ModelAndView;

import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.User;
import com.automationtool.webportal.service.GroupService;
import com.automationtool.webportal.service.UserService;

@Controller
public class HelloWorldController {

	@Autowired
	UserService userService;
	
	@Autowired
	GroupService groupService;
	
	@RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	public String homePage(ModelMap model) {
		model.addAttribute("team",getTeamName());
		model.addAttribute("user", getPrincipal());
		return "redirect:/utility/index";
	}
	
	@RequestMapping(value = { "/try", }, method = RequestMethod.GET)
	public ModelAndView tryPage() {
		//model.addAttribute("user", getPrincipal());
		System.out.println("Trying");
		return new ModelAndView("try");
	}

	//------------------------------------------------------------------------
	@RequestMapping(value = { "/utility/index"}, method = RequestMethod.GET)
	public String indexTestPage(ModelMap model){
		model.addAttribute("team",getTeamName());
		model.addAttribute("user", getPrincipal());
		
		return "dashboard";
	}
	
	@RequestMapping(value = { "/utility/package"}, method = RequestMethod.GET)
	public String packagePage(ModelMap model){
		model.addAttribute("team",getTeamName());
		model.addAttribute("user", getPrincipal());
		
		return "package";
	}
	
	@RequestMapping(value = { "/utility/saveAsNew"}, method = RequestMethod.POST)
	public String saveAsNewTestPage(@RequestBody int id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","SaveAsNew");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Save Test Case As New");
		model.addAttribute("button", "Save As");
		model.addAttribute("team",getTeamName());
		System.out.println("Testcase Action: SaveAsNew and id: " + id);
		return "testcase";
	}
	
	@RequestMapping(value = { "/utility/saveAs"}, method = RequestMethod.GET)
	public String saveAsNewTestPageGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		model.addAttribute("testcaseAction","SaveAsNew");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Save Test Case As New");
		model.addAttribute("button", "Save As");
		System.out.println("Testcase Action: SaveAsNew and id: " + id);
		return "testcase";
	}
	
	
	@RequestMapping(value = { "/utility/view"}, method = RequestMethod.GET)
	public String viewTestCaseGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		model.addAttribute("testcaseAction","view");
		model.addAttribute("testcaseId", id);
		model.addAttribute("heading", "Testcase Details");
		model.addAttribute("button", "OK");
		System.out.println("Testcase Action: View and id: " + id);
		return "testcase";
	}
	
	@RequestMapping(value = { "/utility/editTestCase"}, method = RequestMethod.GET)
	public String editestCaseGet(@RequestParam("id") String id, ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("testcaseAction","edit");
		model.addAttribute("testcaseId", id);
		model.addAttribute("team",getTeamName());
		model.addAttribute("heading", "Edit Test Case");
		model.addAttribute("button", "Edit");
		System.out.println("Testcase Action: Edit and id: " + id);
		return "testcase";
	}
	
	
	@RequestMapping(value = { "/utility/viewTestcase"}, method = RequestMethod.GET)
	public String viewIndexTestPage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		return "viewTestcase";
	}
	
	
	@RequestMapping(value = { "/utility/application"}, method = RequestMethod.GET)
	public String viewApplicationPage(ModelMap model){
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		return "application";
	}
	
	//------------------------------------------------------------------------
	@RequestMapping(value = "/protected", method = RequestMethod.GET)
	public String dashboard(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		return "dashboard";
	}

	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String adminPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		return "admin";
	}

	@RequestMapping(value = "/db", method = RequestMethod.GET)
	public String dbaPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		model.addAttribute("team",getTeamName());
		return "dba";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView loginPage() {
		System.out.println("DOing login");
        return new ModelAndView("login");
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
		model.addAttribute("team",getTeamName());
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
		
		User user = userService.findBySso(userName);
		
		return (user.getFirstName() + " " + user.getLastName());
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