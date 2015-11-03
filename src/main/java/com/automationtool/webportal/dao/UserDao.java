package com.automationtool.webportal.dao;

import com.automationtool.webportal.model.User;

public interface UserDao {

	User findById(int id);
    
    User findBySSO(String sso);

	void save(User user);

	int findGroupByUserId(String userId);
}
