package com.example.api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.repositories.RecordRepository;
import com.example.api.services.RecordService;

@RestController
@RequestMapping("/records")
public class RecordController {
	private final RecordRepository recordRepository;
	
	public RecordController(RecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}
	@Autowired
	private RecordService recordService;
	
	// idからrecordを取得
	@GetMapping("/{id}")
	public ResponseEntity<Record> getRecordById(@PathVariable Long id) {
		Optional<Record> recordOptional = recordRepository.findById(id);
		
		if (recordOptional.isPresent()) {
			Record record = recordOptional.get();
			return ResponseEntity.ok(record);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// 追加
	@Transactional
	@PostMapping("")
	public ResponseEntity<Record> postRecord(@RequestBody Record record) {
		Record joinedRecord = recordRepository.save(record);
		return ResponseEntity.ok(joinedRecord);
	}
}