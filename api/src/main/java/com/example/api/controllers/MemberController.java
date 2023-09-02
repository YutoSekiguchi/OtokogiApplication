package com.example.api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.Member;
import com.example.api.repositories.MemberRepository;
import com.example.api.services.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {
	private final MemberRepository memberRepository;
	
	public MemberController(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	@Autowired
	private MemberService memberService;
	
	// idからmemberの取得
	@GetMapping("/get/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
		Optional <Member> memberOptional = memberRepository.findById(id);
		
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			return ResponseEntity.ok(member);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	
	// 追加
	@Transactional
	@PostMapping("")
	public ResponseEntity<Member> postMember(@RequestBody Member member) {
		Member joinedMember = memberRepository.save(member);
		return ResponseEntity.ok(joinedMember);
	}
	
	// 変更
	@Transactional
	@PutMapping("/put/{id}")
	public ResponseEntity<Member> putMember(@PathVariable Long id, @RequestBody Member member) {
		memberService.modify(id, member);
		return ResponseEntity.ok(member);
	}
}