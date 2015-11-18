package com.automationtool.webportal.model;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.automationtool.webportal.model.viewModel.Testsuite;

@Entity
@Table(name="configuration")
@AssociationOverrides({
	@AssociationOverride(name = "pk.testsuite", 
		joinColumns = @JoinColumn(name = "testsuite_id")),
	@AssociationOverride(name = "pk.parameter_name") })
public class Configuration {

	private ConfigurationId pk;
	
	@Transient
	public TestsuiteDescription getTestsuite() {
		return getPk().getTestsuite();
	}

	public void setGroup(TestsuiteDescription testsuite) {
		getPk().setTestsuite(testsuite);
	}

	@Transient
	public String getParameter_name() {
		return getPk().getParameter_name();
	}

	public void setParameter_name(String parameter_name) {
		getPk().setParameter_name(parameter_name);
	}
	
	
	@EmbeddedId
	public ConfigurationId getPk() {
		return pk;
	}
	
	public int hashCode() {
		// TODO Auto-generated method stub
		return (getPk() != null ? getPk().hashCode() : 0);
	}

	public void setPk(ConfigurationId pk) {
		this.pk = pk;
	}

	public String getParameter_value() {
		return parameter_value;
	}

	public void setParameter_value(String parameter_value) {
		this.parameter_value = parameter_value;
	}

	@Column(name="parameter_value")
	private String parameter_value;
	
	public Configuration() {
		
	}

}
