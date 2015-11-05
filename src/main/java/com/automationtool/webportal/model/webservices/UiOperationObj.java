package com.automationtool.webportal.model.webservices;

import com.automationtool.webportal.model.UiOperations;

public class UiOperationObj extends WebserviceTemplate {

	private UiOperations operation;
	
	
	public UiOperations getOperation() {
		return operation;
	}

	public void setOperation(UiOperations operation) {
		this.operation = operation;
	}

	public UiOperationObj(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public UiOperationObj() {
		// TODO Auto-generated constructor stub
	}

}
