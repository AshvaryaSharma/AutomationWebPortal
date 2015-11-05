package com.automationtool.webportal.model.webservices;

import com.automationtool.webportal.model.NonUiOperations;

public class NonUIOperation extends WebserviceTemplate {
	
	private NonUiOperations operation;
	
	public NonUiOperations getOperation() {
		return operation;
	}

	public void setOperation(NonUiOperations operation) {
		this.operation = operation;
	}

	public NonUIOperation(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public NonUIOperation() {
		// TODO Auto-generated constructor stub
	}

}
