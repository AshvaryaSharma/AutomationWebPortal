package com.websystique.springsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.websystique.springsecurity.service.KeywordService;

@RestController
public class WebserviceController {

	@Autowired
	KeywordService keywordService;
	
	
	@RequestMapping(value = "/webservice/keywords", method = RequestMethod.GET)
	public ResponseEntity<List<String>> listAllKeywords() {
		List<String> keywords = keywordService.listAllKeywords();
		if(keywords.isEmpty()){
            return new ResponseEntity<List<String>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<String>>(keywords, HttpStatus.OK);
	}
}
