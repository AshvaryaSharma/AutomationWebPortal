package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name="group_access")
public class GroupAccess {
	
	@Column(name="app_id")
	private long app_id;
	
	
	@Column(name="groupid")
	private long group_id;


	public long getApp_id() {
		return app_id;
	}


	public void setApp_id(long app_id) {
		this.app_id = app_id;
	}


	public long getGroup_id() {
		return group_id;
	}


	public void setGroup_id(long group_id) {
		this.group_id = group_id;
	}


	@Override
	public String toString() {
		return "GroupAccess [app_id=" + app_id + ", group_id=" + group_id + "]";
	}


	public GroupAccess() {
		
	}

	
}
