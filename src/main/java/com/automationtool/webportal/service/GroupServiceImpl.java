package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;




import com.automationtool.webportal.dao.GroupDao;
import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.webservices.GroupDesc;
import com.automationtool.webportal.model.webservices.GroupList;

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

	@Override
	public GroupList getGroup() {
		GroupList groupList;
		try {
			
			List<Group> grpList = group.getAllGroups();
			
			if(grpList.isEmpty()) {
				throw new Exception("No Groups Present");
			}
			
			groupList = new GroupList();
			groupList.setStatus("Success");
			groupList.setGroupList(grpList);
			
		} catch (Exception e) {
			
			groupList = new GroupList("Error" , e.getLocalizedMessage());
		}
		// TODO Auto-generated method stub
		return groupList;
	}

}
