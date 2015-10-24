package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Testcase;

@Repository("testcaseDao")
public class TestcaseDaoImpl extends AbstractDao<Integer,Testcase> implements TestcaseDao {

	@Override
	public void createTestcase(Testcase testcase) throws Exception {
		// TODO Auto-generated method stub
		persist(testcase);
		
	}

	@Override
	public List<Testcase> getTestcasesByPackageId(int id) {
		System.out.println("Getting all test cases for package id: " + id);
		
		Query query = getSession().createQuery("from Testcase where package_id =:package_id");
		query.setInteger("package_id", id);
		List<Testcase> testcases = query.list();
		return testcases;
	}

	@Override
	public Testcase getTestCaseByTestcaseId(int testcase_id) throws Exception {
		System.out.println("Getting testcase by testcase id :" + testcase_id);
		Query query = getSession().createQuery("from Testcase where testcase_id =:testcase_id");
		query.setInteger("testcase_id", testcase_id);
		
		return (Testcase) query.uniqueResult();
	}

	@Override
	public void deleteTestcasesByTestcaseIds(int[] testcaseIDs)
			throws Exception {
		
		for(int i=0; i < testcaseIDs.length ; i++) {
			Testcase testcase = new Testcase();
			testcase.setTestcase_id(testcaseIDs[i]);
			getSession().delete(testcase);
		}
		
	}

	@Override
	public void updateTestcase(Testcase testcase) throws Exception {
		
		getSession().update(testcase);
	}

	
	

}
