package com.example.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.models.RecordModel;

@Repository
public interface RecordRepository extends JpaRepository<RecordModel, Long> {
	
}