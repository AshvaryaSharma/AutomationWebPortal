package com.automationtool.webportal.dao;

import java.util.List;




import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Application;


@Repository("applicationDao")
public class ApplicationDaoImpl extends AbstractDao<Integer,Application> implements ApplicationDao {

	@Override
	public List<Application> findAllApplication() {
		Query query = getSession().createQuery("from Application");
		List<Application> list = query.list();
		return list;
	}

	@Override
	public void createApplication(Application application) {
		persist(application);
		
	}

	@Override
	public void updateApplication(Application application) {
		getSession().update(application);
		
	}

	@Override
	public void deleteApplication(int application) {
		Application app = new Application();
		app.setApp_id(application);
		getSession().delete(app);
		
	}

}
