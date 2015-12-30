package com.automationtool.webportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.GenericDao;
import com.automationtool.webportal.dao.UserDao;
import com.automationtool.webportal.dao.UserViewDao;
import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.UserProfile;
import com.automationtool.webportal.model.User_view;
import com.automationtool.webportal.model.webservices.UserDetail;
import com.automationtool.webportal.model.webservices.UserRoles;
import com.automationtool.webportal.model.webservices.WebserviceTemplate;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
    private UserDao dao;
	
	@Autowired
	private UserViewDao userView;
	
	@Autowired
	private GenericDao genericDao;
	
	
 
    public User findById(int id) {
        return dao.findById(id);
    }
 
    public User findBySso(String sso) {
        return dao.findBySSO(sso);
    }

	
	public UserDetail findUserDetailsByID(String id) {
		UserDetail userDetail = null;
		try {
			User_view user = userView.getUserDatabyId(id);
			if(user == null) {
				throw new Exception("No user information found :: Logged in user not valid");
			}
			
			userDetail = new UserDetail();
			userDetail.setStatus("SUCCESS");
			userDetail.setUserDetails(user);
		} catch (Exception e) {
			userDetail = new UserDetail("ERROR" , e.getLocalizedMessage());
		}
		
		return userDetail;
	}

	@Override
	public WebserviceTemplate checkUserExists(String ssoId) {
		WebserviceTemplate template = null;
		try {
			User_view user = userView.getUserDatabyId(ssoId);
			if(user == null) {
				throw new Exception("No user information found :: Logged in user not valid");
			}
			
			template = new UserDetail();
			template.setStatus("SUCCESS");
			
		} catch (Exception e) {
			template = new WebserviceTemplate("ERROR" , e.getLocalizedMessage());
		}
		
		return template;
	}

	@Override
	public UserRoles getAllRoles() {
		UserRoles userRoles = null;
		
		try {
			List<UserProfile> userProfile = genericDao.getAllRoles();
			if(userProfile.isEmpty()) {
				throw new Exception("No User Roles Found");
			}
			userRoles = new UserRoles();
			userRoles.setStatus("SUCCESS");
			userRoles.setRolesList(userProfile);
		}catch(Exception e) {
			
			userRoles = new UserRoles("ERROR", e.getLocalizedMessage());
		}
		return userRoles;
	}

}

