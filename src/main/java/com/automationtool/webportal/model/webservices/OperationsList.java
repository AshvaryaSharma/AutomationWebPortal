package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Operations;

public class OperationsList extends WebserviceTemplate {
	
	private List<Operations> operationList;
	
	public OperationsList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		
	}

	public List<Operations> getOperationList() {
		return operationList;
	}

	public void setOperationList(List<Operations> operationList) {
		this.operationList = operationList;
	}

	public OperationsList() {
		
	}

}
