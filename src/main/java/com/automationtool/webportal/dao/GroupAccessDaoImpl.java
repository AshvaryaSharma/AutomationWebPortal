package com.automationtool.webportal.dao;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.GroupAccess;

@Repository("groupAccessDao")
public class GroupAccessDaoImpl extends AbstractDao<BigInteger,GroupAccess> implements GroupAccessDao {

	@Override
	public List<BigInteger> getApplicationsByGroupId(int groupid) {
		
		Query query = getSession().createQuery("Select app_id from GroupAccess where group_id =:group_id");
		query.setInteger("group_id", groupid);
		List<BigInteger> list = query.list();
		return list;
	}

}
