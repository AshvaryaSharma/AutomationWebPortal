package com.automationtool.webportal.service;


import com.automationtool.webportal.model.webservices.PageNames;
import com.automationtool.webportal.model.webservices.PageObjectList;

public interface PageNameService {

	PageNames getPageNamesByApplicationId(int appId);

	PageObjectList getPageObjectsByPageId(int pageId);

}
