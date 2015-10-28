package com.automationtool.webportal.service;

import com.automationtool.webportal.model.User;

public interface UserService {

	User findById(int id);
    
    User findBySso(String sso);
    
}
