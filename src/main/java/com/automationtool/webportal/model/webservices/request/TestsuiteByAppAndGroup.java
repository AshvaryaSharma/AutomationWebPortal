package com.automationtool.webportal.model.webservices.request;

public class TestsuiteByAppAndGroup {
	
	private int app_id;
	
	private int group_id;

	public int getApp_id() {
		return app_id;
	}

	public void setApp_id(int app_id) {
		this.app_id = app_id;
	}

	public int getGroup_id() {
		return group_id;
	}

	public void setGroup_id(int group_id) {
		this.group_id = group_id;
	}

	@Override
	public String toString() {
		return "TestsuiteByAppAndGroup [app_id=" + app_id + ", group_id="
				+ group_id + "]";
	}

	public TestsuiteByAppAndGroup() {
		
		// TODO Auto-generated constructor stub
	}

}
