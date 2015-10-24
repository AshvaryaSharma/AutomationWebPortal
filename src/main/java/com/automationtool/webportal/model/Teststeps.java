package com.automationtool.webportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="teststep")
public class Teststeps {
	
	@Id
	@Column(name="teststep_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long teststep_id;
	
	@Column(name="keyword" , nullable = false)
	private String keyword;
	
	@Column(name="arg1")
	private String arg1;
	
	@Column(name="arg2")
	private String arg2;
	
	@Column(name="arg3")
	private String arg3;
	
	@Column(name="arg4")
	private String arg4;
	
	@Column(name="arg5")
	private String arg5;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="testcase_id")
	private Testcase testcase;

	public long getTeststep_id() {
		return teststep_id;
	}

	public void setTeststep_id(long teststep_id) {
		this.teststep_id = teststep_id;
	}

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

	public String getArg4() {
		return arg4;
	}

	public void setArg4(String arg4) {
		this.arg4 = arg4;
	}

	public String getArg5() {
		return arg5;
	}

	public void setArg5(String arg5) {
		this.arg5 = arg5;
	}

	public Testcase getTestcase() {
		return testcase;
	}

	public Teststeps(String keyword, String arg1, String arg2, String arg3,
			String arg4, String arg5) {
		
		this.keyword = keyword;
		this.arg1 = arg1;
		this.arg2 = arg2;
		this.arg3 = arg3;
		this.arg4 = arg4;
		this.arg5 = arg5;
	}
	public Teststeps () {
		
	}

	public void setTestcase(Testcase testcase) {
		this.testcase = testcase;
	}

	@Override
	public String toString() {
		return "Teststeps [teststep_id=" + teststep_id + ", keyword=" + keyword
				+ ", arg1=" + arg1 + ", arg2=" + arg2 + ", arg3=" + arg3
				+ ", arg4=" + arg4 + ", arg5=" + arg5 + ", testcase="
				+ testcase + "]";
	}

}
