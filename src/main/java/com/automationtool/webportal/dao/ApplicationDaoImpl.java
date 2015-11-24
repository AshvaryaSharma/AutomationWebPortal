package com.automationtool.webportal.dao;

import java.math.BigInteger;
import java.util.List;





import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Application;


@Repository("applicationDao")
public class ApplicationDaoImpl extends AbstractDao<BigInteger,Application> implements ApplicationDao {

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
	public void deleteApplication(long application) {
		Application app = new Application();
		app.setApp_id(application);
		getSession().delete(app);
		
	}

	@Override
	public List<Application> findApplicationsByAppIds(List<BigInteger> appId) {
		
		Query query = getSession().createQuery("from Application where app_id IN :appId");
		query.setParameterList("appId", appId);
		List<Application> list = query.list();
		return list;
	}

	@Override
	public Application getApplicationById(int appid) {
		Query query = getSession().createQuery("from Application where app_id = :appId");
		query.setInteger("appId", appid);
		Application list = (Application) query.uniqueResult();
		return list;
	}

}
