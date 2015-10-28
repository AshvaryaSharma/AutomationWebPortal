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
@Table(name = "testcase_testsuite")
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
	
	@Column(name="parameter1")
	private String parameter1;
	@Column(name="parameter2")
	private String parameter2;
	@Column(name="parameter3")
	private String parameter3;
	@Column(name="parameter4")
	private String parameter4;
	@Column(name="parameter5")
	private String parameter5;
	
	@EmbeddedId
	public TestsuiteTestcasesId getPk() {
		return pk;
	}
	public void setPk(TestsuiteTestcasesId pk) {
		this.pk = pk;
	}
	public String getParameter1() {
		return parameter1;
	}
	public void setParameter1(String parameter1) {
		this.parameter1 = parameter1;
	}
	public String getParameter2() {
		return parameter2;
	}
	public void setParameter2(String parameter2) {
		this.parameter2 = parameter2;
	}
	public String getParameter3() {
		return parameter3;
	}
	public void setParameter3(String parameter3) {
		this.parameter3 = parameter3;
	}
	public String getParameter4() {
		return parameter4;
	}
	public void setParameter4(String parameter4) {
		this.parameter4 = parameter4;
	}
	public String getParameter5() {
		return parameter5;
	}
	public void setParameter5(String parameter5) {
		this.parameter5 = parameter5;
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

	@Override
	public String toString() {
		return "TestsuiteTestcases [pk=" + pk + ", parameter1=" + parameter1
				+ ", parameter2=" + parameter2 + ", parameter3=" + parameter3
				+ ", parameter4=" + parameter4 + ", parameter5=" + parameter5
				+ "]";
	}
	
	
	
	
	
}
