package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.Packages;

@Repository("packagesDao")
public class PackagesDaoImpl extends AbstractDao<Integer,Packages> implements PackagesDao {

	@Override
	public List<Packages> findPackagesByApplicationId(int app_id) {
		System.out.println("Runnung API for appid " + app_id);
		Query query = getSession().createQuery("from Packages where app_id = :app_id");
		query.setInteger("app_id", app_id);
		List<Packages> list = query.list();
		return list;
	}

	@Override
	public Packages findPackageByPackageId(int package_id) {
		System.out.println("Geting Package with package id: " + package_id);
		
		Query query = getSession().createQuery("from Packages where package_id = :package_id");
		query.setInteger("package_id", package_id);
		Packages pckg = (Packages) query.uniqueResult();
		
		return pckg;
	}

	@Override
	public boolean createNewPackage(Packages package_new) {
		boolean flag = true;
		persist(package_new);
		return flag;
	}

	@Override
	public boolean updatePackage(Packages package_edit) {
		
		getSession().update(package_edit);
		return true;
	}
	
	

}
