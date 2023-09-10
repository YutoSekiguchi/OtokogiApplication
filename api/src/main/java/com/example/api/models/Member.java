package com.example.api.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="members")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="rid", nullable = false)
	private Long rid;
	
	@Column(name="name", nullable = false)
	private String name;
	
	@Column(name="uid", nullable = false)
	private Long uid;
	
	@Column(name="ranking", nullable = false)
	private Integer ranking;
	
	@Column(name="total_price", nullable = false)
	private Integer totalPrice;
	
	@Column(name="total_drive", nullable = false)
	private Integer totalDrive;
	
	@Column(name="total_win", nullable = false)
	private Integer totalWin;
	
	@CreationTimestamp
	@Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime createdAt;
	
	public Member() {
		
	}
	
	public Member(Long rid, String name, Long uid, Integer ranking, Integer totalPrice, Integer totalDrive, Integer totalWin) {
		this.rid = rid;
		this.name = name;
		this.uid = uid;
		this.ranking = ranking;
		this.totalPrice = totalPrice;
		this.totalDrive = totalDrive;
		this.totalWin = totalWin;
		this.createdAt = LocalDateTime.now();
	}
	
	@ManyToOne
    @JoinColumn(name = "rid", referencedColumnName = "id", insertable = false, updatable = false)
    private RecordModel record;
	
	// ゲッターとセッター
	public Long getId() {
		return id;
	}
	
	public Long getRid() {
		return rid;
	}
	
	public void setRid(Long rid) {
		this.rid = rid;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Long getUid() {
		return uid;
	}
	
	public void setUid(Long uid) {
		this.uid = uid;
	}
	
	public Integer getRanking() {
		return ranking;
	}
	
	public void setRanking(Integer ranking) {
		this.ranking = ranking;
	}
	
	public Integer getTotalPrice() {
		return totalPrice;
	}
	
	public void setTotalPrice(Integer totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public Integer getTotalDrive() {
		return totalDrive;
	}
	
	public void setTotalDrive(Integer totalDrive) {
		this.totalDrive = totalDrive;
	}
	
	public Integer getTotalWin() {
		return totalWin;
	}
	
	public void setTotalWin(Integer totalWin) {
		this.totalWin = totalWin;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}