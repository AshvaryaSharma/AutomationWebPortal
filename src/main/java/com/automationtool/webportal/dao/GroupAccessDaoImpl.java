package com.automationtool.webportal.dao;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.GroupAccess;

@Repository("groupAccessDao")
public class GroupAccessDaoImpl implements Serializable, GroupAccessDao {
	@Autowired
    private SessionFactory sessionFactory;
	
	@Override
	public List<BigInteger> getApplicationsByGroupId(int groupid) {
		
		System.out.println("Getting list of applications");
		Query query = sessionFactory.getCurrentSession().createQuery("Select pk.application.app_id from GroupAccess where pk.group.groupid = :groupid");
		query.setInteger("groupid", groupid);
		/*List<Application> app_list = query.list();*/
		List<BigInteger> list = query.list();
		System.out.println("List of applications fetched: " + list);
		return list;
	}

}
