package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.Operations;
import com.automationtool.webportal.model.webservices.NonUIOperation;
import com.automationtool.webportal.model.webservices.OperationsList;
import com.automationtool.webportal.model.webservices.UiOperationObj;

public interface OperationService {

	
	List<Operations> findAllOperations();
	Operations findOperationByKeyword(String keyword);
	OperationsList findAllOperationName();
	NonUIOperation getNonUiOperationByName(String operationName);
	UiOperationObj getUiOperationByName(String operationName);
	
}
