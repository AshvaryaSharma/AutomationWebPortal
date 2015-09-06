package com.websystique.springsecurity;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.web.client.RestTemplate;

public class SpringRestTestClient {
	 
    public static final String REST_SERVICE_URI = "http://localhost:8080/AutomationToolWebPortal/";
     
    /* GET */
    @SuppressWarnings("unchecked")
    private static void listAllKeywords(){
        System.out.println("Testing listAllKeywords API-----------");
         
        RestTemplate restTemplate = new RestTemplate();
        List<String>usersMap = restTemplate.getForObject(REST_SERVICE_URI+"/webservice/keywords/", List.class);
         
        if(usersMap!=null){
            for(String str : usersMap){
               System.out.println(str);
            }
        }else{
            System.out.println("No user exist----------");
        }
    }
    
    public static void main(String args[]){
    	listAllKeywords();
    }

}
