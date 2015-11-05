package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.NonUiOperations;

public interface NonUiOperationDao {

	NonUiOperations getNonUiOperationByName(String operationName);

}
