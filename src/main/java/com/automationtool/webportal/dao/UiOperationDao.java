package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.UiOperations;

public interface UiOperationDao {

	UiOperations getNonUiOperationByName(String operationName);

}
