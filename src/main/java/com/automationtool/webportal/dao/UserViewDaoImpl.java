package com.automationtool.webportal.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;


@Repository("userViewDao")
public class UserViewDaoImpl extends AbstractDao<String,User_view> implements UserViewDao {

	@Override
	public User_view getUserDatabyId(String id) {
		 	Criteria crit = createEntityCriteria();
	        crit.add(Restrictions.eq("sso_id", id));
	        return (User_view) crit.uniqueResult();
		
	}

}
