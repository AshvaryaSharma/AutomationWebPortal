package com.automationtool.webportal.model.webservices;

import com.automationtool.webportal.model.User_view;

public class UserDetail extends WebserviceTemplate {
	
	private User_view userDetails;

	public User_view getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(User_view userDetails) {
		this.userDetails = userDetails;
	}

	public UserDetail(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public UserDetail() {
		// TODO Auto-generated constructor stub
	}

}
