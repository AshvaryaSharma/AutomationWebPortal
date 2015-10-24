package com.automationtool.webportal.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="application")
public class Application {

	@Id
	@Column(name="app_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int app_id;
	
	public Application(String app_description, String app_name) {
		
		this.app_description = app_description;
		this.app_name = app_name;
	}
	
	public Application() {
		
	}

	@Override
	public String toString() {
		return "Application [app_id=" + app_id + ", app_description="
				+ app_description + ", app_name=" + app_name + "]";
	}

	public int getApp_id() {
		return app_id;
	}

	public void setApp_id(int app_id) {
		this.app_id = app_id;
	}

	public String getApp_description() {
		return app_description;
	}

	public void setApp_description(String app_description) {
		this.app_description = app_description;
	}

	public String getApp_name() {
		return app_name;
	}

	public void setApp_name(String app_name) {
		this.app_name = app_name;
	}

	

	@Column(name="application_description")
	private String app_description;
	
	@Column(name="application_name")
	private String app_name;
	
	
	
}
