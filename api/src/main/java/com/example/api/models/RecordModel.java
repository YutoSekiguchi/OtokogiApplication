package com.example.api.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="records")
public class RecordModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "title", nullable = false)
	private String title;
	
	@Column(name = "date", nullable = false)
	private String date;
	
	@Column(name = "total_price", nullable = false)
	private Integer totalPrice;
	
	@Column(name = "url_code", nullable = false)
	private String urlCode;
	
	@CreationTimestamp
	@Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime createdAt;
	
	public RecordModel() {
	}
	
	public RecordModel(String title, String date, Integer totalPrice, String urlCode) {
		this.title = title;
		this.date = date;
		this.totalPrice = totalPrice;
		this.urlCode = urlCode;
		this.createdAt = LocalDateTime.now();
	}
	
	// ゲッターとセッター
	public Long getId() {
		return id;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public Integer getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Integer totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public String getUrlCode() {
		return urlCode;
	}
	public void setUrlCode(String urlCode) {
		this.urlCode = urlCode;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	// 一括更新用のセッター
	public void updateFrom(RecordModel updateRecord) {
		if (updateRecord.getTitle() != null) {
			this.setTitle(updateRecord.getTitle());
		}
		if (updateRecord.getDate() != null) {
			this.setDate(updateRecord.getDate());
		}
		if (updateRecord.getTotalPrice() != null) {
			this.setTotalPrice(updateRecord.getTotalPrice());
		}
		if (updateRecord.getUrlCode() != null) {
			this.setUrlCode(updateRecord.getUrlCode());
		}
	}
}