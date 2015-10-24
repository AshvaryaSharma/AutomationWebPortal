package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity()
@Table(name = "testsuite")
public class Testsuit {
	
	@Id
	@Column(name="testsuite_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int testsuite_id;
	
	@Column(name="testsuite_name", nullable = false)
	private String testsuite_name;
	
	@Column(name="testsuite_description", nullable = false)
	private String testsuite_description;

	public int getTestsuite_id() {
		return testsuite_id;
	}

	public void setTestsuite_id(int testsuite_id) {
		this.testsuite_id = testsuite_id;
	}

	public String getTestsuite_name() {
		return testsuite_name;
	}

	public void setTestsuite_name(String testsuite_name) {
		this.testsuite_name = testsuite_name;
	}

	public String getTestsuite_description() {
		return testsuite_description;
	}

	public void setTestsuite_description(String testsuite_description) {
		this.testsuite_description = testsuite_description;
	}

	public Testsuit(String testsuite_name, String testsuite_description) {
		
		this.testsuite_name = testsuite_name;
		this.testsuite_description = testsuite_description;
	}

	public Testsuit() {
		
	}

	@Override
	public String toString() {
		return "Testsuit [testsuite_id=" + testsuite_id + ", testsuite_name="
				+ testsuite_name + ", testsuite_description="
				+ testsuite_description + "]";
	}
	
	
}
