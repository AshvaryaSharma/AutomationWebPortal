package com.automationtool.webportal.model.webservices.request;

import com.automationtool.webportal.model.viewModel.UpdateParamList;

public class TestsuiteConfig {

	private int testsuiteId;
	
	public TestsuiteConfig() {
		
	}
	
	private String [] deleteParamList;
	private UpdateParamList [] updateParamList;
	public int getTestsuiteId() {
		return testsuiteId;
	}
	public void setTestsuiteId(int testsuiteId) {
		this.testsuiteId = testsuiteId;
	}
	
	public String[] getDeleteParamList() {
		return deleteParamList;
	}
	public void setDeleteParamList(String[] deleteParamList) {
		this.deleteParamList = deleteParamList;
	}
	public UpdateParamList[] getUpdateParamList() {
		return updateParamList;
	}
	public void setUpdateParamList(UpdateParamList[] updateParamList) {
		this.updateParamList = updateParamList;
	}
	

}
