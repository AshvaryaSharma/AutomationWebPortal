package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="operation_ui")
public class UiOperations {
	
	@Id
	@Column(name="keyword")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String keyword;
	
	@Column(name="arg1")
	private String arg1;
	
	@Column(name="arg2")
	private String arg2;
	
	@Column(name="arg3")
	private String arg3;
	
	@Column(name="description")
	private String description;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getArg1() {
		return arg1;
	}

	public void setArg1(String arg1) {
		this.arg1 = arg1;
	}

	public String getArg2() {
		return arg2;
	}

	public void setArg2(String arg2) {
		this.arg2 = arg2;
	}

	public String getArg3() {
		return arg3;
	}

	public void setArg3(String arg3) {
		this.arg3 = arg3;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public UiOperations() {
		
	}
	


}
