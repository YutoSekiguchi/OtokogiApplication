package com.example.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.models.Pay;

@Repository
public interface PayRepository extends JpaRepository<Pay, Long> {
	List<Pay> findByMid(Long mid);
	List<Pay> findByUid(Long uid);
	List<Pay> findByRid(Long rid);
}