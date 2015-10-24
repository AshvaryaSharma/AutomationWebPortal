package com.automationtool.webportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.ApplicationDao;
import com.automationtool.webportal.model.Application;


@Service("applicationService")
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private ApplicationDao app;
	
	@Override
	public boolean createApplication(Application application) {
		
		try {
			app.createApplication(application);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return false;
		}
		
		return true;
	}

	@Override
	public boolean updateApplication(Application application) {
		
		try {
			app.updateApplication(application);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return false;
		}
		
		return true;
	}

	@Override
	public boolean deleteApplication(int application) {

		try {
			app.deleteApplication(application);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return false;
		}
		
		return true;
	}

}
