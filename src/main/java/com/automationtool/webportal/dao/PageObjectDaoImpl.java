package com.automationtool.webportal.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.PageObject;

@Repository("pageObjectDao")
public class PageObjectDaoImpl extends AbstractDao<Integer,PageObject> implements PageObjectDao {

	@Override
	public List<PageObject> getPageObjectListByPageId(int pageId) {
		Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("pageNameId", pageId));
        return crit.list();
	}

}
