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
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "display_name")
	private String displayName;

	@Column(name = "mail", nullable = false)
	private String mail;
	
	@Column(name = "image", nullable = false)
	private String image;
	
	@Column(name = "friend_code", nullable = false)
	private String friendCode;
	
	@CreationTimestamp
	@Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime createdAt;
	
	public User() {
	       // デフォルトコンストラクタ
	}

	public User(String name, String displayName, String mail, String image, String friendCode) {
		this.name = name;
        this.displayName = displayName;
        this.mail = mail;
        this.image = image;
        this.friendCode = friendCode;
        this.createdAt = LocalDateTime.now();
    }

   // ゲッターとセッター
	public Long getId() {
        return id;
    }
	public String getName() {
        return name;
    }

   public void setName(String name) {
       this.name = name;
   }

   public String getDisplayName() {
       return displayName;
   }

   public void setDisplayName(String displayName) {
       this.displayName = displayName;
   }

   public String getMail() {
       return mail;
   }

   public void setMail(String mail) {
       this.mail = mail;
   }

   public String getImage() {
       return image;
   }

   public void setImage(String image) {
       this.image = image;
   }

   public String getFriendCode() {
       return friendCode;
   }

   public void setFriendCode(String friendCode) {
       this.friendCode = friendCode;
   }

   public LocalDateTime getCreatedAt() {
       return createdAt;
   }
}