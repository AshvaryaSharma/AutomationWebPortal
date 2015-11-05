package com.automationtool.webportal.model.webservices;

public class WebserviceTemplate {
	
	public String status;
	
	public String exceptionMessage;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getExceptionMessage() {
		return exceptionMessage;
	}

	public void setExceptionMessage(String exceptionMessage) {
		this.exceptionMessage = exceptionMessage;
	}

	public WebserviceTemplate(String status, String exceptionMessage) {
		
		this.status = status;
		this.exceptionMessage = exceptionMessage;
	}
	
public WebserviceTemplate() {
		
		
	}

}
