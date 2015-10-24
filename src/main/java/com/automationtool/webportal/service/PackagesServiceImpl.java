package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.PackagesDao;
import com.automationtool.webportal.model.Packages;

@Service("packagesService")
@Transactional
public class PackagesServiceImpl implements PackagesService {

	@Autowired
	private PackagesDao packages;
		
		@Override
		public List<Packages> findPackagesByApplicationId(int app_id) {
			
			return packages.findPackagesByApplicationId(app_id);
		}

		@Override
		public boolean createPackage(Packages package_new) {
			
			return packages.createNewPackage(package_new);
		}

		@Override
		public boolean editPackage(Packages package_edit) {
			
			return packages.updatePackage(package_edit);
		}
	

}
