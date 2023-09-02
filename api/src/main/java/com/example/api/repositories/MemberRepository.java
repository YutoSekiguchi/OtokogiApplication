package com.example.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.models.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByUid(Long uid);
}