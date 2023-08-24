package com.example.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.repositories.RecordRepository;

@Service
public class RecordService {
	@Autowired
	private RecordRepository recordRepository;
	
}