package com.automationtool.webportal.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="testcase")
public class Testcase {
	
	@Id
	@Column(name="testcase_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int testcase_id;
	
	@Column(name="testcase_name", nullable = false)
	private String testcase_name;
	
	@Column(name="testcase_description")
	private String testcase_description;
	
	

	public int getTestcase_id() {
		return testcase_id;
	}

	public void setTestcase_id(int testcase_id) {
		this.testcase_id = testcase_id;
	}

	public String getTestcase_name() {
		return testcase_name;
	}

	public void setTestcase_name(String testcase_name) {
		this.testcase_name = testcase_name;
	}

	public String getTestcase_description() {
		return testcase_description;
	}

	public void setTestcase_description(String testcase_description) {
		this.testcase_description = testcase_description;
	}

	
	
	public Testcase() {
		
	}

	public Testcase(String testcase_name, String testcase_description) {
		
		this.testcase_name = testcase_name;
		this.testcase_description = testcase_description;
	}
	
	@ManyToOne(optional=false)
	@JoinColumn(name="app_id")
	private Application application;

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}
	
}
