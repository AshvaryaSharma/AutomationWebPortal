package com.automationtool.webportal.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	/*@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("USER");
		auth.inMemoryAuthentication().withUser("Ashvarya").password("ashvarya123").roles("USER");
		auth.inMemoryAuthentication().withUser("admin").password("root123").roles("ADMIN");
		auth.inMemoryAuthentication().withUser("dba").password("root123").roles("ADMIN","DBA");
		auth.inMemoryAuthentication().withUser("Aditya").password("aditya123").roles("USER");
	}*/
	
	
	@Autowired
    @Qualifier("customUserDetailsService")
    UserDetailsService userDetailsService;
     
    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }
    
    
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
 
	  http.authorizeRequests()
	  //----------------------------------------------------------
	  	.antMatchers("/index").authenticated()
	  	.antMatchers("/webservice/**").permitAll()
	  	//-------------------------------------------------------
	  	.antMatchers("/", "/home").access("hasRole('USER') or hasRole('ADMIN')")
	  	
	  	.antMatchers("/protected/**").access("hasRole('USER') or hasRole('ADMIN')")
	  	.antMatchers("/utility/**").access("hasRole('USER') or hasRole('ADMIN')")
		.antMatchers("/admin/**").access("hasRole('ADMIN')")
		.antMatchers("/db/**").access("hasRole('ADMIN') and hasRole('DBA')")
		.and().formLogin()
		.and().formLogin().loginPage("/login")
        .usernameParameter("ssoId").passwordParameter("password")
        /*.and().csrf()*/
		.and().exceptionHandling().accessDeniedPage("/Access_Denied");
	  
	  http.csrf().disable();
 
	}
}
