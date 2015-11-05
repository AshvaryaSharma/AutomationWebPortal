package com.automationtool.webportal.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.controller.NewWebservicesController;
import com.automationtool.webportal.dao.PageNameDao;
import com.automationtool.webportal.dao.PageObjectDao;
import com.automationtool.webportal.model.PageName;
import com.automationtool.webportal.model.PageObject;
import com.automationtool.webportal.model.webservices.ApplicationList;
import com.automationtool.webportal.model.webservices.PageNames;
import com.automationtool.webportal.model.webservices.PageObjectList;

@Service("pageNameService")
@Transactional
public class PageNameServiceImpl implements PageNameService {

	private static final Logger logger = Logger.getLogger(PageNameServiceImpl.class);
	
	@Autowired
	PageNameDao pageName;
	
	@Autowired
	PageObjectDao pageObject;

	@Override
	public PageNames getPageNamesByApplicationId(int appId) {
		PageNames pages = null;
		logger.info("Getting all page name for application id: " + appId);
		try {
			List<PageName>page = pageName.getPageNamesByApplicationId(appId);
			if(page.size() == 0 || (page == null)) {
				logger.error("Got Null pointer or no page name returned for application id: " + appId);
				throw new Exception("No page object found");
			}
			
			pages = new PageNames();
			pages.setStatus("SUCCESS");
			pages.setPageNames(page);
		}catch(NullPointerException e) {
			pages = new PageNames("ERROR","Null Pointer Exception");
		}
		catch (Exception e) {
			logger.error("Got Error while getting Page Names by Application ID");
			System.out.println("Got Exceptions: " + e.getMessage());
			pages = new PageNames("ERROR", e.getMessage());
			System.out.println(pages.toString());
		} finally {
			logger.info("Returning page object: " + pages);
			return pages;
		}
		
	}

	@Override
	public PageObjectList getPageObjectsByPageId(int pageId) {
		PageObjectList pageObjectList = null;
		
		try {
			List<PageObject> pageObj = pageObject.getPageObjectListByPageId(pageId);
			if(pageObj.size()==0 || (pageObj==null)) {
				throw new Exception("No PageObject Returned for Page");
			}
			pageObjectList = new PageObjectList();
			pageObjectList.setStatus("SUCCESS");
			pageObjectList.setList(pageObj);
			
		} catch(NullPointerException e) {
			pageObjectList = new PageObjectList("ERROR" , "Null Pointer Exception");
		} catch(Exception e) {
			pageObjectList = new PageObjectList("ERROR" , e.getMessage());
		}
		finally {
			return pageObjectList;
		}
	}

}
