package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.HibernateException;
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
	public List<Teststeps> getTestSteps(int testcase_id) {
		System.out.println("Getting steststeps for testcase_id: " + testcase_id);
		
		Query query = getSession().createQuery("from Teststeps where testcase_id =:testcase_id order by stepNo");
		query.setInteger("testcase_id", testcase_id);
		List<Teststeps> list = query.list();
		
		
		
		/*return  list.toArray(new Teststeps[list.size()]);*/
		return list;
	}

	@Override
	public void updateTestSteps(Teststeps[] new_testCase_teststeps) {
		
		
			getSession().flush();
			for(Teststeps step : new_testCase_teststeps) {
				
				try {
					getSession().saveOrUpdate(step);
				} catch (Exception e) {
					
					e.printStackTrace();
				}
			}
		
		
	}
	
	@Override
	public void deleteTestSteps(Teststeps[] new_testCase_teststeps) {
		
		Query query = getSession().createQuery("from Teststeps where testcase_id =:testcase_id order by stepNo");
		query.setInteger("testcase_id", new_testCase_teststeps[0].getTestcase().getTestcase_id());
		List<Teststeps> list = query.list();
		
		for(Teststeps step: list) {
			boolean flag = false;
			for(Teststeps temp: new_testCase_teststeps) {
				if(temp.getTeststep_id() == step.getTeststep_id()) {
					flag =true;
					break;
				}
			}
			if(!flag) {
				getSession().delete(step);
			}
		}
	}

	

}
