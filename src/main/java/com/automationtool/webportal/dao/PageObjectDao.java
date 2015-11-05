package com.automationtool.webportal.dao;

import java.util.List;

import com.automationtool.webportal.model.PageObject;

public interface PageObjectDao {

	List<PageObject> getPageObjectListByPageId(int pageId);

}
