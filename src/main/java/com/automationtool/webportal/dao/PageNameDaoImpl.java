package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.PageName;
import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.webservices.PageNames;

@Repository("pageNameDao")
public class PageNameDaoImpl extends AbstractDao<Integer, PageName> implements PageNameDao {

	@Override
	public List<PageName> getPageNamesByApplicationId(int appId) {
		
		Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("appId", appId));
        return crit.list();
		
	}

}
