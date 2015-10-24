package com.automationtool.webportal.service;

import java.util.List;

import com.automationtool.webportal.model.Operations;

public interface OperationService {

	
	List<Operations> findAllOperations();
	Operations findOperationByKeyword(String keyword);
	List<String> findAllOperationName();
	
}
