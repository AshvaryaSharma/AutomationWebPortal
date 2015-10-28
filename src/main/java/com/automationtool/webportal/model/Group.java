package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Entity
@Table(name="APP_GROUP")
public class Group {

	
	@Id
	@Column(name="groupid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int groupid;
	
	
	@Column(name="team_name")
	@Size(min = 0, max =50)
	private String team_name;


	@Override
	public String toString() {
		return "Group [groupid=" + groupid + ", team_name=" + team_name + "]";
	}


	public int getGroupid() {
		return groupid;
	}


	public void setGroupid(int groupid) {
		this.groupid = groupid;
	}


	public String getTeam_name() {
		return team_name;
	}


	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}


	public Group() {
		
	}
	
	
}
