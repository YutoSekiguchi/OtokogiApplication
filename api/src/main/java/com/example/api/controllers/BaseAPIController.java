package com.example.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseAPIController {
	@RequestMapping(path="/", method=RequestMethod.GET)
	public String base() {
		return "Hello!!";
	}
	
	@RequestMapping(path="/v1", method=RequestMethod.GET)
	public String basev1() {
		return "otokogiAPI";
	}
}