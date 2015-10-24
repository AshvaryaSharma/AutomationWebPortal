package com.automationtool.webportal.service;

import com.automationtool.webportal.model.Application;

public interface ApplicationService {
	
	boolean createApplication(Application application);

	boolean updateApplication(Application application);

	boolean deleteApplication(int application);
}
