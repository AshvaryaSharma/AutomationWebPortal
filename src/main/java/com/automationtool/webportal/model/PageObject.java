package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="page_object")
public class PageObject {
	
	@Id
	@Column(name="page_object_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pageObjectId;
	
	@Column(name="page_id")
	private int pageNameId;
	
	@Column(name="page_object_name")
	private String pageObjectName;
	
	@Column(name="page_object_type")
	private String pageObjectType;
	
	@Column(name="page_object_locator_type")
	private String pageObjectLocatorType;
	
	
	@Column(name="page_object_locator_info")
	private String pageObjectLocatorInfo;


	public int getPageObjectId() {
		return pageObjectId;
	}


	public void setPageObjectId(int pageObjectId) {
		this.pageObjectId = pageObjectId;
	}


	public int getPageNameId() {
		return pageNameId;
	}


	public void setPageNameId(int pageNameId) {
		this.pageNameId = pageNameId;
	}


	public String getPageObjectName() {
		return pageObjectName;
	}


	public void setPageObjectName(String pageObjectName) {
		this.pageObjectName = pageObjectName;
	}


	public String getPageObjectType() {
		return pageObjectType;
	}


	public void setPageObjectType(String pageObjectType) {
		this.pageObjectType = pageObjectType;
	}


	public String getPageObjectLocatorType() {
		return pageObjectLocatorType;
	}


	public void setPageObjectLocatorType(String pageObjectLocatorType) {
		this.pageObjectLocatorType = pageObjectLocatorType;
	}


	public String getPageObjectLocatorInfo() {
		return pageObjectLocatorInfo;
	}


	public void setPageObjectLocatorInfo(String pageObjectLocatorInfo) {
		this.pageObjectLocatorInfo = pageObjectLocatorInfo;
	}


	public PageObject() {
		
		// TODO Auto-generated constructor stub
	}
	
	
	 

}
