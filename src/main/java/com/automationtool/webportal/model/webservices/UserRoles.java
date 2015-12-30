package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.UserProfile;
public class UserRoles extends WebserviceTemplate {
	
	List<UserProfile> rolesList;
	public UserRoles(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public UserRoles() {
		// TODO Auto-generated constructor stub
	}

	public List<UserProfile> getRolesList() {
		return rolesList;
	}

	public void setRolesList(List<UserProfile> rolesList) {
		this.rolesList = rolesList;
	}

}
