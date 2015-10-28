package com.automationtool.webportal.dao;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Group;
import com.automationtool.webportal.model.Testcase;


@Repository("groupDao")
public class GroupDaoImpl extends AbstractDao<Integer,Group> implements GroupDao {

	@Override
	public Group getGroupById(int id) {
		
		Query query = getSession().createQuery("from Group where groupid =:groupid");
		query.setInteger("groupid", id);
		
		return (Group) query.uniqueResult();
		
	}

}
