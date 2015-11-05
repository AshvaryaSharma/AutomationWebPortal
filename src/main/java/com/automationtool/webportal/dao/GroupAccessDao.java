package com.automationtool.webportal.dao;

import java.math.BigInteger;
import java.util.List;

public interface GroupAccessDao {
	
	List<BigInteger> getApplicationsByGroupId(int groupId);

	

}
