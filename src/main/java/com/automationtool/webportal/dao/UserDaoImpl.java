package com.automationtool.webportal.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.automationtool.webportal.model.User;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {
 
    public User findById(int id) {
        return getByKey(id);
    }
 
    public User findBySSO(String sso) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("ssoId", sso));
        return (User) crit.uniqueResult();
    }

	@Override
	public void save(User user) {
		persist(user);
		
	}

	@Override
	public int findGroupByUserId(String userId) throws Exception {


		Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("ssoId", userId));
        User user =  (User) crit.uniqueResult();
        
        
		return user.getGroupid();
	}
 
     
}
