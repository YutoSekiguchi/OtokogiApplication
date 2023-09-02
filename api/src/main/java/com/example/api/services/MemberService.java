package com.example.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.models.Member;
import com.example.api.repositories.MemberRepository;

@Service
public class MemberService {
	@Autowired
	private MemberRepository memberRepository;
	
	@Transactional
    public void modify(Long id, Member member) {
        Member memberAtDb = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id is not existed")); 
        memberAtDb.setRanking(member.getRanking());
        memberAtDb.setTotalPrice(member.getTotalPrice());
        memberAtDb.setTotalDrive(member.getTotalDrive());
        memberAtDb.setTotalWin(member.getTotalWin());

        memberRepository.save(memberAtDb);
    }
}