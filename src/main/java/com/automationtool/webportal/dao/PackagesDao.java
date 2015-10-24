package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.Packages;

public interface PackagesDao {

	List<Packages> findPackagesByApplicationId(int app_id);
	
	Packages findPackageByPackageId(int package_id);

	boolean createNewPackage(Packages package_new);

	boolean updatePackage(Packages package_edit);

}
