package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="page_name")
public class PageName {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="page_id")
	private int pageid;
	
	@Column(name="page_name")
	private String pageName;
	
	@Column(name="page_url")
	private String pageUrl;
	
	@Column(name="app_id")
	private int appId;

	public int getPageid() {
		return pageid;
	}

	public void setPageid(int pageid) {
		this.pageid = pageid;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}

	public int getAppId() {
		return appId;
	}

	public void setAppId(int appId) {
		this.appId = appId;
	}

	public PageName() {
		
	}
	
	
}
