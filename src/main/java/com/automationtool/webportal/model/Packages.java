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
@Table(name="package")
public class Packages {
	
	
	@Id
	@Column(name="package_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int package_id;
	
	@Column(name="package_name" , nullable = false)
	private String package_name;
	
	@Column(name="package_description")
	private String package_description;
	
	
	
	@ManyToOne(optional=false)
	@JoinColumn(name="app_id")
	private Application application;

	public int getPackage_id() {
		return package_id;
	}

	public void setPackage_id(int package_id) {
		this.package_id = package_id;
	}

	public String getPackage_name() {
		return package_name;
	}

	public void setPackage_name(String package_name) {
		this.package_name = package_name;
	}

	public String getPackage_description() {
		return package_description;
	}

	public void setPackage_description(String package_description) {
		this.package_description = package_description;
	}

	

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public Packages(String package_name, String package_description) {
		super();
		this.package_name = package_name;
		this.package_description = package_description;
	}
	public Packages() {
		
	}
	
	
	

}
