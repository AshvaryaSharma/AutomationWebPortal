package com.automationtool.webportal.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.NonUiOperations;
import com.automationtool.webportal.model.UiOperations;

@Repository("uiOperationDao")
public class UiOperationDaoImpl extends AbstractDao<String,UiOperations> implements UiOperationDao {

	

	@Override
	public UiOperations getNonUiOperationByName(String operationName) {
		Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("keyword", operationName));
        return (UiOperations) crit.uniqueResult();
	}

}
