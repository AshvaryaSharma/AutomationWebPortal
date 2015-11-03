package com.automationtool.webportal.service;

import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;

public interface UserService {

	User findById(int id);
    
    User findBySso(String sso);
    
    User_view findUserDetailsByID(String userId);
    
}
