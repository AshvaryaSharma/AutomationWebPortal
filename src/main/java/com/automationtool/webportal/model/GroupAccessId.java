package com.automationtool.webportal.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class GroupAccessId implements Serializable {
	private Application application;
	private Group group;
	
	@ManyToOne
	public Application getApplication() {
		return application;
	}
	public void setApplication(Application application) {
		this.application = application;
	}
	
	@ManyToOne
	public Group getGroup() {
		return group;
	}
	public void setGroup(Group group) {
		this.group = group;
	}
	
	
	public boolean equals(Object o) {
		if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        GroupAccessId that = (GroupAccessId) o;
        if (application != null ? !application.equals(that.application) : that.application != null) return false;
        if (group != null ? !group.equals(that.group) : that.group != null)
            return false;
        
        return true;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		int result;
        result = (application != null ? application.hashCode() : 0);
        result = 31 * result + (group != null ? group.hashCode() : 0);
        return result;
	}
	
	
}
