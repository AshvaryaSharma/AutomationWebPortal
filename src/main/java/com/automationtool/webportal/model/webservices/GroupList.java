package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Group;

public class GroupList extends WebserviceTemplate {
	
	
	List<Group> groupList;
	
	public List<Group> getGroupList() {
		return groupList;
	}

	public void setGroupList(List<Group> groupList) {
		this.groupList = groupList;
	}

	public GroupList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public GroupList() {
		// TODO Auto-generated constructor stub
	}

}
