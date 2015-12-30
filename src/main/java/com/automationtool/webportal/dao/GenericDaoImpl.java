package com.automationtool.webportal.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.UserProfile;

@Repository("genericDao")
public class GenericDaoImpl implements GenericDao, Serializable {

	public GenericDaoImpl() {
		// TODO Auto-generated constructor stub
	}
private Session session;
	
	
	@Autowired
	private SessionFactory sessionFactory;
	
	
	public void init() {
		
		session = sessionFactory.getCurrentSession();
	}

	@Override
	public List<UserProfile> getAllRoles() {
		init();
		Query query = session.createQuery("from UserProfile");
		return query.list();
		
	}

}
