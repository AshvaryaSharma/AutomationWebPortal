package com.automationtool.webportal.model;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name="group_access")
@AssociationOverrides({
	@AssociationOverride(name = "pk.application", 
		joinColumns = @JoinColumn(name = "app_id")),
	@AssociationOverride(name = "pk.group", 
		joinColumns = @JoinColumn(name = "groupid")) })
public class GroupAccess {
	
	/*@Column(name="app_id")
	private long app_id;
	
	
	@Column(name="groupid")
	private long group_id;*/
	
	
	private GroupAccessId pk = new GroupAccessId();


	@Transient
	public Group getGroup() {
		return getPk().getGroup();
	}

	public void setGroup(Group group) {
		getPk().setGroup(group);
	}

	@Transient
	public Application getTestcase() {
		return getPk().getApplication();
	}

	public void setTestcase(Application application) {
		getPk().setApplication(application);
	}
	
	

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		GroupAccess that = (GroupAccess) o;

		if (getPk() != null ? !getPk().equals(that.getPk())
				: that.getPk() != null)
			return false;

		return true;
	}
	
	@EmbeddedId
	public GroupAccessId getPk() {
		return pk;
	}
	public void setPk(GroupAccessId pk) {
		this.pk = pk;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return (getPk() != null ? getPk().hashCode() : 0);
	}


	

	public GroupAccess() {
		
	}

	
}
