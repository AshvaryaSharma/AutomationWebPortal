package com.automationtool.webportal.service;

import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;
import com.automationtool.webportal.model.webservices.UserDetail;
import com.automationtool.webportal.model.webservices.UserRoles;
import com.automationtool.webportal.model.webservices.WebserviceTemplate;

public interface UserService {

	User findById(int id);
    
    User findBySso(String sso);
    
    UserDetail findUserDetailsByID(String userId);

	WebserviceTemplate checkUserExists(String ssoId);

	UserRoles getAllRoles();
    
}
