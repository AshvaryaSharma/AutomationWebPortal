package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Group;

public interface GroupDao {
	
	Group getGroupById(int id);

	List<Group> getAllGroups();

}
