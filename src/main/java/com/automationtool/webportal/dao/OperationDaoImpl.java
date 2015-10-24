package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Operations;



@Repository("operationDao")
public class OperationDaoImpl extends AbstractDao<String, Operations> implements OperationDao {

	@Override
	public List<Operations> findAllOperations() {
		Query query = getSession().createQuery("from Operations");
		List<Operations> list = query.list();
		return list;
		
	}

	@Override
	public Operations findOperationByKeyword(String keyword) {
		
		System.out.println("Executing query");
		Query query = getSession().createQuery("from Operations where keyword = :keyword");
		query.setString("keyword", keyword);
		return (Operations) query.uniqueResult();
		
		
	}

	@Override
	public List<String> findAllOperationName() {
		System.out.println("Getting all possible operation names");
		Query query = getSession().createQuery("Select op.keyword from Operations as op");
		
		List<String> list = query.list();
		System.out.println("Got all posible operation names" + list);
		return list;
	}

}
