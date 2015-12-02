package com.automationtool.webportal.model.webservices;

import com.automationtool.webportal.model.Group;

public class GroupDesc extends WebserviceTemplate {

	private Group group;
	public GroupDesc(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public GroupDesc() {
		// TODO Auto-generated constructor stub
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

}
