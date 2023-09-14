package com.example.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.repositories.PayRepository;

@Service
public class PayService {
	@Autowired
	private PayRepository payRepository;
	
}