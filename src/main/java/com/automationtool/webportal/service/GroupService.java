package com.automationtool.webportal.service;

import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.webservices.GroupDesc;

public interface GroupService {
	
	Group getGroupById(int id);

	GroupDesc getGroup(int groupId);

}
