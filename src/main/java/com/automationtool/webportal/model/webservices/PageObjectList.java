package com.automationtool.webportal.model.webservices;


import java.util.List;

import com.automationtool.webportal.model.PageObject;

public class PageObjectList extends WebserviceTemplate {
	private List<PageObject> list;
	
	public List<PageObject> getList() {
		return list;
	}

	public void setList(List<PageObject> list) {
		this.list = list;
	}

	public PageObjectList() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PageObjectList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

}
