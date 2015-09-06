package com.websystique.springsecurity.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service("keywordService")
public class KeywordServiceImpl implements KeywordService {

	private static List<String> keywords;
	
	static{
		keywords= populateDummyKeywords();
    }
	
	@Override
	public List<String> listAllKeywords() {
		
		return keywords;
	}

	private static List<String> populateDummyKeywords() {
		List<String> keywords = new ArrayList<String>();
		keywords.add("OpenBrowser");
		keywords.add("EnterUrl");
		keywords.add("click");
		keywords.add("Enter Text");
		
		
		return keywords;
	}

}
