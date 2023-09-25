package com.example.api.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.Member;
import com.example.api.models.Pay;
import com.example.api.models.Transition;
import com.example.api.repositories.MemberRepository;
import com.example.api.repositories.PayRepository;
import com.example.api.services.PayService;

@RestController
@RequestMapping("/pays")
public class PayController {
	private final PayRepository payRepository;
	private final MemberRepository memberRepository;
	
	@Autowired
	public PayController(PayRepository payRepository, MemberRepository memberRepository) {
		this.payRepository = payRepository;
		this.memberRepository = memberRepository;
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
	
	@GetMapping("/get/{rid}/transition")
    public ResponseEntity<List<Transition>> getPayTransitionDataByRecordId(@PathVariable Long rid) {
    	List<Member> members = memberRepository.findByRid(rid);
        List<Pay> payAndMemberData =  payRepository.findByRid(rid);
        
        List<Transition> transitions = new ArrayList<Transition>();
       
        for(Member member: members) {
        	Transition transition = new Transition();
        	transition.setMid(member.getId());
        	transition.setUid(member.getUid());
        	transition.setRid(rid);
        	transition.setName(member.getName());
        	transition.setDate(new ArrayList<String>());
        	transition.setTransitionPrice(new ArrayList<Integer>());
        	transition.setTransitionDrive(new ArrayList<Integer>());
        	transition.setTransitionDriveBeer(new ArrayList<Integer>());
        	transitions.add(transition);
        }
        
        for(Pay pay: payAndMemberData) {
        	Long mid = pay.getMid();
        	Integer price = pay.getPrice();
        	String date = pay.getDate();
        	Integer drive = pay.getDrive();
        	Integer driveBeer = pay.getDriveBeer();
        	for(Transition transition: transitions) {
        		if (mid == transition.getMid()) {
        			transition.addTransitionData(date, price, drive, driveBeer);
        		} else {
        			transition.addTransitionData(date, 0, 0, 0);
        		}
        	}
        }
        
        return ResponseEntity.ok(transitions);
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
	
	// 削除
	@DeleteMapping("{id}")
	public ResponseEntity<String> deletePayByID(@PathVariable Long id) {
		if (!payRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		payRepository.deleteById(id);
		return ResponseEntity.ok("Successfully delete pay.");
	}
}