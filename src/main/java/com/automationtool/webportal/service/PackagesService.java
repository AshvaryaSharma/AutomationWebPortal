package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.Packages;

public interface PackagesService {
	
	List<Packages> findPackagesByApplicationId(int app_id);

	boolean createPackage(Packages package_new);

	boolean editPackage(Packages package_edit);

}
