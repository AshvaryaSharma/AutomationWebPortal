package com.automationtool.webportal.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;


@Embeddable
public class TestsuiteTestcasesId implements Serializable {

	private TestsuiteDescription testsuite;
	private Testcase testcase;
	
	@ManyToOne
	public TestsuiteDescription getTestsuite() {
		return testsuite;
	}
	public void setTestsuite(TestsuiteDescription testsuite) {
		this.testsuite = testsuite;
	}
	
	@ManyToOne
	public Testcase getTestcase() {
		return testcase;
	}
	public void setTestcase(Testcase testcase) {
		this.testcase = testcase;
	}
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        TestsuiteTestcasesId that = (TestsuiteTestcasesId) o;
        if (testsuite != null ? !testsuite.equals(that.testsuite) : that.testsuite != null) return false;
        if (testcase != null ? !testcase.equals(that.testcase) : that.testcase != null)
            return false;
        
        return true;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		int result;
        result = (testsuite != null ? testsuite.hashCode() : 0);
        result = 31 * result + (testsuite != null ? testsuite.hashCode() : 0);
        return result;
	}
	
	
	
}
