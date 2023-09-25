package com.example.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.api.models.Member;
import com.example.api.models.RecordModel;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	List<Member> findByUid(Long uid);
	List<Member> findByRid(Long rid);
//	long countByRid(Long rid);
	
	@Query("SELECT m.record FROM Member m WHERE m.uid = :userId")
    List<RecordModel> findRecordsByUserId(Long userId);
}