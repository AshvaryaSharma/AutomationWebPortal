package com.automationtool.webportal.model.viewModel;

public class UpdateParamList {

	private int testsuite_id;
	private String parameter_name;
	private String parameter_value;
	
	public int getTestsuite_id() {
		return testsuite_id;
	}

	public void setTestsuite_id(int testsuite_id) {
		this.testsuite_id = testsuite_id;
	}

	public String getParameter_name() {
		return parameter_name;
	}

	public void setParameter_name(String parameter_name) {
		this.parameter_name = parameter_name;
	}

	public String getParameter_value() {
		return parameter_value;
	}

	public void setParameter_value(String parameter_value) {
		this.parameter_value = parameter_value;
	}

	public UpdateParamList() {
		
	}

}
