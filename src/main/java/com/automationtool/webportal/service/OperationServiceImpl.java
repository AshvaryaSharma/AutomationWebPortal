package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.OperationDao;
import com.automationtool.webportal.model.Operations;


@Service("operationService")
@Transactional
public class OperationServiceImpl implements OperationService {

	@Autowired
	private OperationDao dao;
	
	@Override
	public List<Operations> findAllOperations() {
		return dao.findAllOperations();
	}

	@Override
	public Operations findOperationByKeyword(String keyword) {
		return dao.findOperationByKeyword(keyword);
	}

	@Override
	public List<String> findAllOperationName() {
		
		return dao.findAllOperationName();
	}

}
