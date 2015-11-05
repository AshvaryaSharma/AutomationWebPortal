package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Application;

public class ApplicationList extends WebserviceTemplate {
	
	private List<Application> applicationList;
	
	public List<Application> getApplicationList() {
		return applicationList;
	}

	public void setApplicationList(List<Application> applicationList) {
		this.applicationList = applicationList;
	}

	public ApplicationList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		
	}

	public ApplicationList() {
		
	}

}
