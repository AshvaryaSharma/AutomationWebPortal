package com.automationtool.webportal.dao;

import java.math.BigInteger;
import java.util.List;

import com.automationtool.webportal.model.Application;

public interface ApplicationDao {
	
	List<Application> findAllApplication();

	void createApplication(Application application);

	void updateApplication(Application application);

	void deleteApplication(long application);

	List<Application> findApplicationsByAppIds(List<BigInteger> appId);

	
	
}
