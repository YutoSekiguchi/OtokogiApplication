package com.example.api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.RecordModel;
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
	@GetMapping("/get/{id}")
	public ResponseEntity<RecordModel> getRecordById(@PathVariable Long id) {
		Optional<RecordModel> recordOptional = recordRepository.findById(id);
		
		if (recordOptional.isPresent()) {
			RecordModel record = recordOptional.get();
			return ResponseEntity.ok(record);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// url_codeから取得
	@GetMapping("/get/urlcode/{urlcode}")
	public ResponseEntity<RecordModel> getRecordByUrlCode(@PathVariable String urlcode) {
		RecordModel gettedRecord = recordRepository.findByUrlCode(urlcode);
		return ResponseEntity.ok(gettedRecord);
	}
	
	// 追加
	@PostMapping("")
	public ResponseEntity<RecordModel> postRecord(@RequestBody RecordModel record) {
		RecordModel joinedRecord = recordRepository.save(record);
		return ResponseEntity.ok(joinedRecord);
	}
	
	@PutMapping("/{id}/change/title")
	public ResponseEntity<RecordModel> putRecordTitleById(@PathVariable Long id, @RequestParam String newTitle) {
		Optional<RecordModel> optionalRecord = recordRepository.findById(id);
		if (optionalRecord.isPresent()) {
			RecordModel record = optionalRecord.get();
			record.setTitle(newTitle);
			recordRepository.save(record);
			return ResponseEntity.ok(record);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
}