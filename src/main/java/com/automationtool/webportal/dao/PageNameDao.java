package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.PageName;
import com.automationtool.webportal.model.webservices.PageNames;

public interface PageNameDao {

	List<PageName> getPageNamesByApplicationId(int appId);

}
