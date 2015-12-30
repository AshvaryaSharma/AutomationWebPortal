package com.automationtool.webportal.service;

import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.webservices.GroupDesc;
import com.automationtool.webportal.model.webservices.GroupList;

public interface GroupService {
	
	Group getGroupById(int id);

	GroupDesc getGroup(int groupId);

	GroupList getGroup();

}
