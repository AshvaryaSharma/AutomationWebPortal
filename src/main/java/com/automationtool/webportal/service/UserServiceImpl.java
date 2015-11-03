package com.automationtool.webportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.automationtool.webportal.dao.UserDao;
import com.automationtool.webportal.dao.UserViewDao;
import com.automationtool.webportal.model.User;
import com.automationtool.webportal.model.User_view;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
    private UserDao dao;
	
	@Autowired
	private UserViewDao userView;
	
	
 
    public User findById(int id) {
        return dao.findById(id);
    }
 
    public User findBySso(String sso) {
        return dao.findBySSO(sso);
    }

	
	public User_view findUserDetailsByID(String id) {
		
		return userView.getUserDatabyId(id);
	}

}
