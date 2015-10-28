package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.Application;
import com.automationtool.webportal.model.Teststeps;
import com.automationtool.webportal.model.TestsuiteDescription;
import com.automationtool.webportal.model.TestsuiteTestcases;
import com.automationtool.webportal.model.TestsuiteTestcasesId;
import com.automationtool.webportal.model.viewModel.Testsuite;

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
	public void createTestSuite(Testsuite testsuite) throws Exception {
		init();
		Transaction transaction = null;
		transaction = session.beginTransaction();
		session.save(testsuite.getTestsuite());
			
		for(TestsuiteTestcases testcases : testsuite.getTestcases()) {
			
			testcases.setTestsuite(testsuite.getTestsuite());
			session.save(testcases);
			
		}
		
		session.getTransaction().commit();
		
		

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

}
