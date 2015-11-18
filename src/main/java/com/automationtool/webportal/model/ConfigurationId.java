package com.automationtool.webportal.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

import com.automationtool.webportal.model.viewModel.Testsuite;

@Embeddable
public class ConfigurationId implements Serializable {

	private TestsuiteDescription testsuite;
	
	private String parameter_name;
	
	@ManyToOne
	public TestsuiteDescription getTestsuite() {
		return testsuite;
	}

	public void setTestsuite(TestsuiteDescription testsuite) {
		this.testsuite = testsuite;
	}
	
	
	public String getParameter_name() {
		return parameter_name;
	}

	public void setParameter_name(String parameter_name) {
		this.parameter_name = parameter_name;
	}

	public boolean equals(Object o) {
		if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        ConfigurationId that = (ConfigurationId) o;
        if (testsuite != null ? !testsuite.equals(that.testsuite) : that.testsuite != null) return false;
        if (parameter_name != null ? !parameter_name.equals(that.parameter_name) : that.parameter_name != null)
            return false;
        
        return true;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		int result;
        result = (testsuite != null ? testsuite.hashCode() : 0);
        result = 31 * result + (parameter_name != null ? parameter_name.hashCode() : 0);
        return result;
	}
	
	public ConfigurationId() {
		
	}

}
