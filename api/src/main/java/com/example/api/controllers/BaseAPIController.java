package com.example.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseAPIController {
	@GetMapping("/")
	public String base() {
		return "Hello!!";
	}
	
	@GetMapping("/v1")
	public String basev1() {
		return "otokogiAPI";
	}
}