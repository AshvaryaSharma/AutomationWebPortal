package com.automationtool.webportal.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.NonUiOperations;

@Repository("nonUiOperationDao")
public class NonUiOperationDaoImpl extends AbstractDao<String,NonUiOperations> implements NonUiOperationDao {

	

	@Override
	public NonUiOperations getNonUiOperationByName(String operationName) {
		Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("keyword", operationName));
        return (NonUiOperations) crit.uniqueResult();
	}

}
