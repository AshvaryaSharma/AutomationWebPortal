package com.automationtool.webportal.model;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.automationtool.webportal.model.viewModel.Testsuite;


@Entity
@Table(name = "testpackage")
@AssociationOverrides({
		@AssociationOverride(name = "pk.testsuite", 
			joinColumns = @JoinColumn(name = "testsuite_id")),
		@AssociationOverride(name = "pk.testcase", 
			joinColumns = @JoinColumn(name = "testcase_id")) })
public class TestsuiteTestcases {

	private TestsuiteTestcasesId pk = new TestsuiteTestcasesId();
	
	@Transient
	public TestsuiteDescription getTestsuite() {
		return getPk().getTestsuite();
	}

	public void setTestsuite(TestsuiteDescription testsuite) {
		getPk().setTestsuite(testsuite);
	}

	@Transient
	public Testcase getTestcase() {
		return getPk().getTestcase();
	}

	public void setTestcase(Testcase testcase) {
		getPk().setTestcase(testcase);
	}
	
	@Column(name="param1_value")
	private String param1_value;
	
	@Column(name="param2_value")
	private String param2_value;
	
	@Column(name="param3_value")
	private String param3_value;
	
	@Column(name="param4_value")
	private String param4_value;
	
	@Column(name="param5_value")
	private String param5_value;
	
	@Column(name="param1_name")
	private String param1_name;
	
	@Column(name="param2_name")
	private String param2_name;
	
	@Column(name="param3_name")
	private String param3_name;
	
	@Column(name="param4_name")
	private String param4_name;
	
	@Column(name="param5_name")
	private String param5_name;
	
	@Column(name="browser")
	private String browser;
	
	
	@Override
	public String toString() {
		return "TestsuiteTestcases [pk=" + pk + ", param1_value="
				+ param1_value + ", param2_value=" + param2_value
				+ ", param3_value=" + param3_value + ", param4_value="
				+ param4_value + ", param5_value=" + param5_value
				+ ", param1_name=" + param1_name + ", param2_name="
				+ param2_name + ", param3_name=" + param3_name
				+ ", param4_name=" + param4_name + ", param5_name="
				+ param5_name + ", browser=" + browser + "]";
	}

	public String getParam1_value() {
		return param1_value;
	}

	public void setParam1_value(String param1_value) {
		this.param1_value = param1_value;
	}

	public String getParam2_value() {
		return param2_value;
	}

	public void setParam2_value(String param2_value) {
		this.param2_value = param2_value;
	}

	public String getParam3_value() {
		return param3_value;
	}

	public void setParam3_value(String param3_value) {
		this.param3_value = param3_value;
	}

	public String getParam4_value() {
		return param4_value;
	}

	public void setParam4_value(String param4_value) {
		this.param4_value = param4_value;
	}

	public String getParam5_value() {
		return param5_value;
	}

	public void setParam5_value(String param5_value) {
		this.param5_value = param5_value;
	}

	public String getParam1_name() {
		return param1_name;
	}

	public void setParam1_name(String param1_name) {
		this.param1_name = param1_name;
	}

	public String getParam2_name() {
		return param2_name;
	}

	public void setParam2_name(String param2_name) {
		this.param2_name = param2_name;
	}

	public String getParam3_name() {
		return param3_name;
	}

	public void setParam3_name(String param3_name) {
		this.param3_name = param3_name;
	}

	public String getParam4_name() {
		return param4_name;
	}

	public void setParam4_name(String param4_name) {
		this.param4_name = param4_name;
	}

	public String getParam5_name() {
		return param5_name;
	}

	public void setParam5_name(String param5_name) {
		this.param5_name = param5_name;
	}

	public String getBrowser() {
		return browser;
	}

	public void setBrowser(String browser) {
		this.browser = browser;
	}

	@EmbeddedId
	public TestsuiteTestcasesId getPk() {
		return pk;
	}
	public void setPk(TestsuiteTestcasesId pk) {
		this.pk = pk;
	}
	
	public TestsuiteTestcases() {
		
	}
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		TestsuiteTestcases that = (TestsuiteTestcases) o;

		if (getPk() != null ? !getPk().equals(that.getPk())
				: that.getPk() != null)
			return false;

		return true;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return (getPk() != null ? getPk().hashCode() : 0);
	}

	
	
	
	
	
	
	
}
