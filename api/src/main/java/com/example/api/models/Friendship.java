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
@Table(name="friendships")
public class Friendship {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "uid", nullable = false)
	private Long uid;
	
	@Column(name = "friend_id", nullable = false)
	private Long friendId;
	
	@Column(name = "status", nullable = false)
	private Integer status;
	
	@CreationTimestamp
	@Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime createdAt;
	
	public Friendship() {
		
	}
	
	public Friendship(Long uid, Long friendId, Integer status) {
		this.uid = uid;
		this.friendId = friendId;
		this.status = status;
		this.createdAt = LocalDateTime.now();
	}
	
	// ゲッターとセッター
	public Long getId() {
		return id;
	}
	
	public Long getUid() {
		return uid;
	}
	
	public void setUid(Long uid) {
		this.uid = uid;
	}
	
	public Long getFriendId() {
		return friendId;
	}
	
	public void setFriendId(Long friendId) {
		this.friendId = friendId;
	}
	
	public Integer getStatus() {
		return status;
	}
	
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
}