package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Teststeps;


@Repository("teststepsDao")
public class TeststepsDaoImpl extends AbstractDao<Long,Teststeps> implements TeststepsDao {

	@Override
	public void createTestSteps(Teststeps[] new_testCase_teststeps) {
		
		for (Teststeps step : new_testCase_teststeps) {
			persist(step);
		}
	}

	@Override
	public Teststeps[] getTestSteps(int testcase_id) {
		System.out.println("Getting steststeps for testcase_id: " + testcase_id);
		
		Query query = getSession().createQuery("from Teststeps where testcase_id =:testcase_id");
		query.setInteger("testcase_id", testcase_id);
		List<Teststeps> list = query.list();
		
		
		
		return  list.toArray(new Teststeps[list.size()]);
	}

	@Override
	public void updateTestSteps(Teststeps[] new_testCase_teststeps) {
		for(Teststeps step : new_testCase_teststeps) {
			
			getSession().saveOrUpdate(step);
		}
		
	}

}
