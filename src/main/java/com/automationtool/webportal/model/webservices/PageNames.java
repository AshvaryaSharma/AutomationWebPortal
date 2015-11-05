package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.PageName;

public class PageNames extends WebserviceTemplate {
	
	List<PageName> pageNames;

	public List<PageName> getPageNames() {
		return pageNames;
	}

	public void setPageNames(List<PageName> pageNames) {
		this.pageNames = pageNames;
	}

	public PageNames(String status, String exceptionMessage) {
		this.status = status;
		this.exceptionMessage = exceptionMessage;
	}

	public PageNames() {
		// TODO Auto-generated constructor stub
	}

}
