package com.automationtool.webportal.dao;

import java.util.List;




import com.automationtool.webportal.model.Operations;

public interface OperationDao {
	
	List<Operations> findAllOperations();
	Operations findOperationByKeyword(String keyword);
	List<Operations> findAllOperationName();

}
