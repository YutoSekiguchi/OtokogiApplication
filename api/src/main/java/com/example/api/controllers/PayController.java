package com.example.api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.Pay;
import com.example.api.repositories.PayRepository;
import com.example.api.services.PayService;

@RestController
@RequestMapping("/pays")
public class PayController {
	private final PayRepository payRepository;
	
	@Autowired
	public PayController(PayRepository payRepository) {
		this.payRepository = payRepository;
	}
	
	@Autowired
	private PayService payService;
	
	// idからpayの取得
	@GetMapping("/get/{id}")
	public ResponseEntity<Pay> getPayById(@PathVariable Long id) {
		Optional<Pay> payOptional = payRepository.findById(id);
		
		if (payOptional.isPresent()) {
			Pay pay = payOptional.get();
			return ResponseEntity.ok(pay);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// midからpay取得
	@GetMapping("get/{mid}/mid")
	public ResponseEntity<List<Pay>> getPaysByMid(@PathVariable Long mid) {
		List<Pay> gettedPays = payRepository.findByMid(mid);
		return ResponseEntity.ok(gettedPays);
	}
	
	// ridからpay取得
	@GetMapping("get/{rid}/rid")
	public ResponseEntity<List<Pay>> getPaysByRid(@PathVariable Long rid) {
		List<Pay> gettedPays = payRepository.findByRid(rid);
		return ResponseEntity.ok(gettedPays);
	}
	
	// 追加
	@PostMapping("")
	public ResponseEntity<Pay> postPay(@RequestBody Pay pay) {
		Pay joinedPay = payRepository.save(pay);
		return ResponseEntity.ok(joinedPay);
	}
	
	// 更新
	@PutMapping("/{id}")
	public ResponseEntity<Pay> updatePayId(@PathVariable Long id, @RequestBody Pay updatedPay) {
		Optional<Pay> payOptional = payRepository.findById(id);
		
		if (payOptional.isPresent()) {
			Pay pay = payOptional.get();
			pay.updateFrom(updatedPay);
			Pay savedPay = payRepository.save(pay);
		    return ResponseEntity.ok(savedPay);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}