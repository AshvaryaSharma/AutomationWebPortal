package com.automationtool.webportal.service;

import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;
import com.automationtool.webportal.model.webservices.UserDetail;

public interface UserService {

	User findById(int id);
    
    User findBySso(String sso);
    
    UserDetail findUserDetailsByID(String userId);
    
}
