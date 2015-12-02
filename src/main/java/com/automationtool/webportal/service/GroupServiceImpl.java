package com.automationtool.webportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.GroupDao;
import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.webservices.GroupDesc;

@Service("groupService")
@Transactional
public class GroupServiceImpl implements GroupService {
	
	@Autowired
	private GroupDao group;
	
	@Override
	public Group getGroupById(int id) {
		
		Group grp = null;
		try {
			return group.getGroupById(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			
			System.out.println("#############GETTING EXCEPTION#####################");
			e.printStackTrace();
		}
		
		return grp;
	}

	@Override
	public GroupDesc getGroup(int groupId) {
		GroupDesc group;
		
		try {
			
			Group grp = getGroupById(groupId);
			group = new GroupDesc();
			group.setStatus("SUCCESS");
			group.setGroup(grp);
		} catch(Exception e) {
			
			group = new GroupDesc("ERROR",e.getLocalizedMessage());
		}
		
		return group;
	}

}
