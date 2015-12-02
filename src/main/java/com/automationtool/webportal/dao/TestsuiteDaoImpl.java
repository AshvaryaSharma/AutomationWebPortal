package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Configuration;
import com.automationtool.webportal.model.Testcase;
import com.automationtool.webportal.model.Teststeps;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;
import com.automationtool.webportal.model.TestsuiteTestcasesId;
import com.automationtool.webportal.model.viewModel.Testsuite;
import com.automationtool.webportal.model.webservices.request.TestCaseAppAndTestsuiteId;
import com.automationtool.webportal.model.webservices.request.TestcaseToTestsuites;
import com.automationtool.webportal.model.webservices.request.TestsuiteByAppAndGroup;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("testsuiteDao")
public class TestsuiteDaoImpl implements Serializable, TestsuiteDao {
	private Session session;
	
	
	@Autowired
	private SessionFactory sessionFactory;
	
	
	public void init() {
		
		session = sessionFactory.getCurrentSession();
	}
	
	public TestsuiteDaoImpl() {
		
		
		
	}
	
	@Override
	public void createTestSuite(TestsuiteDescription testsuite) throws Exception {
		init();
		session.save(testsuite);
		
		
		
		

	}

	@Override
	public ArrayList<Testsuite> getAllTestSuite() {
		init();
		Query query = session.createQuery("from TestsuiteDescription");
		Testsuite testsuite = new Testsuite();
		System.out.println(":::::::::::::::::STRARTING::::::::::::");
		TestsuiteDescription testdesc = (TestsuiteDescription) query.uniqueResult();
		System.out.println("###########DESCITPION############# \n" + testdesc);
		Query query1 = session.createQuery("from TestsuiteTestcases");
		List<TestsuiteTestcases> testsuitemapp = query1.list();
		testsuite.setTestsuite(testdesc);
		
		
		
		testsuite.setTestcases(testsuitemapp.toArray(new TestsuiteTestcases[testsuitemapp.size()]));
		
		System.out.println(testsuite);
		
		ArrayList<Testsuite> suit = new ArrayList<Testsuite>();
		suit.add(testsuite);
		
		return suit;
		
		
	}

	@Override
	public List<TestsuiteDescription> getTestSuite(
			TestsuiteByAppAndGroup testReq) {
		init();
		Query query = session.createQuery("from TestsuiteDescription where app_id =:app_id and group_id =:group_id");
		query.setInteger("app_id", testReq.getApp_id());
		query.setInteger("group_id", testReq.getGroup_id());
		
		return query.list();
	}

	@Override
	public List<Configuration> getTestsuiteConfig(int testsuiteId) {
		init();
		Query query = session.createQuery("from Configuration where pk.testsuite.testsuite_id =:testsuiteId");
		query.setInteger("testsuiteId", testsuiteId);
		return query.list();
	}

	@Override
	public void updateTestSuite(TestsuiteDescription testsuiteDescription) {
		init();
		session.update(testsuiteDescription);
		
	}

	@Override
	public void deleteTestSuite(TestsuiteDescription testsuiteDescription) {
		init();
		session.delete(testsuiteDescription);
		
	}

	@Override
	public List<Testcase> getTestCasesForTestSuite(
			TestCaseAppAndTestsuiteId testSuiteInfo) {
		init();
		Query query = session.createQuery("from Testcase where app_id =:app_id and testcase_id NOT IN (Select test.pk.testcase.testcase_id from TestsuiteTestcases test where test.pk.testsuite.testsuite_id =:testsuite_id)");
		// and testcase_id NOT IN (Select test.pk.testcase.testcase_id from TestsuiteTestcases test where test.pk.testsuite.testsuite_id =:testsuite_id)
		query.setInteger("testsuite_id", testSuiteInfo.getTestsuite_Id());
		query.setInteger("app_id", testSuiteInfo.getApp_Id());
		
		return query.list();
		
	}

	@Override
	public void addTestcasesToTestcases(TestcaseToTestsuites test) {
		init();
		System.out.println("Adding: " + test);
		TestsuiteTestcases testcaseTestSuite = new TestsuiteTestcases();
		testcaseTestSuite.setTestcase(test.getTestcase());
		testcaseTestSuite.setTestsuite(test.getTestsuite());
		testcaseTestSuite.setBrowser(test.getBrowser());
		testcaseTestSuite.setParam1_name(test.getParam1_name());
		testcaseTestSuite.setParam1_value(test.getParam1_value());
		testcaseTestSuite.setParam2_name(test.getParam2_name());
		testcaseTestSuite.setParam2_value(test.getParam2_value());
		testcaseTestSuite.setParam3_name(test.getParam3_name());
		testcaseTestSuite.setParam3_value(test.getParam3_value());
		testcaseTestSuite.setParam4_name(test.getParam4_name());
		testcaseTestSuite.setParam4_value(test.getParam4_value());
		testcaseTestSuite.setParam5_name(test.getParam5_name());
		testcaseTestSuite.setParam5_value(test.getParam5_value());
		
		System.out.println("::::::::::ADDING::::::::::" + testcaseTestSuite);
		
		session.persist(testcaseTestSuite);
		
		
	}

	@Override
	public List<TestsuiteTestcases> getTestcasesForTestsuites(int testsuiteId) {
		init();
		Query query = session.createQuery("from TestsuiteTestcases where testsuite_id =:testsuite_id");
		query.setInteger("testsuite_id", testsuiteId);
		
		return query.list();
	}

}
