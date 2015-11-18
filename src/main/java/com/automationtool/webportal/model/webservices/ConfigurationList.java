package com.automationtool.webportal.model.webservices;

import java.util.List;

import com.automationtool.webportal.model.Configuration;

public class ConfigurationList extends WebserviceTemplate {
	
	private List<Configuration> configList;
	
	

	public List<Configuration> getConfigList() {
		return configList;
	}

	public void setConfigList(List<Configuration> configList) {
		this.configList = configList;
	}

	public ConfigurationList(String status, String exceptionMessage) {
		super(status, exceptionMessage);
		// TODO Auto-generated constructor stub
	}

	public ConfigurationList() {
		// TODO Auto-generated constructor stub
	}

}
