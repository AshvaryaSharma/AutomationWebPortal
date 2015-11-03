package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="user_view")
public class User_view {
	
	@Id
	@Column(name="sso_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String sso_id;
	
	@Column(name="first_name")
	private String first_name;
	
	@Column(name="last_name")
	private String last_name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="groupid")
	private int groupId;

	public String getSso_id() {
		return sso_id;
	}

	public void setSso_id(String sso_id) {
		this.sso_id = sso_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	
	
	public User_view() {
		
		
	}
	

	public User_view(String sso_id, String first_name, String last_name,
			String email, int groupId) {
		super();
		this.sso_id = sso_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.groupId = groupId;
	}

	@Override
	public String toString() {
		return "User_view [sso_id=" + sso_id + ", first_name=" + first_name
				+ ", last_name=" + last_name + ", email=" + email
				+ ", groupId=" + groupId + "]";
	}
	
	
	
}
