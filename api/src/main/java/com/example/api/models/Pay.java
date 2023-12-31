package com.example.api.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="pays")
public class Pay {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="rid", nullable = false)
	private Long rid;
	
	@Column(name="mid", nullable = false)
	private Long mid;
	
	@Column(name="uid", nullable = false)
	private Long uid;
	
	@Column(name="other_uids", nullable = false)
	private String otherUids;
	
	@Column(name="price", nullable = false)
	private Integer price;
	
	@Column(name="drive", nullable = false)
	private Integer drive;
	
	@Column(name="drive_beer", nullable = false)
	private Integer driveBeer;
	
	@Column(name="detail")
	private String detail;
	
	@Column(name="date", nullable = false)
	private String date;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mid", referencedColumnName = "id", insertable = false, updatable = false)
    private Member member;
	
	@CreationTimestamp
	@Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime createdAt;
	
	public Pay() {
		
	}
	
	public Pay(Long rid, Long mid, Long uid, String otherUids, Integer price, Integer drive, Integer driveBeer, String detail, String date) {
		this.rid = rid;
		this.mid = mid;
		this.uid = uid;
		this.otherUids = otherUids;
		this.price = price;
		this.drive = drive;
		this.driveBeer = driveBeer;
		this.detail = detail;
		this.date = date;
		this.createdAt = LocalDateTime.now();
	}
	
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
	
	public Long getMid() {
		return mid;
	}
	
	public void setMid(Long mid) {
		this.mid = mid;
	}
	
	public Long getUid() {
		return uid;
	}
	
	public void setUid(Long uid) {
		this.uid = uid;
	}
	
	public String getOtherUids() {
		return otherUids;
	}
	
	public void setOtherUids(String otherUids) {
		this.otherUids = otherUids;
	}
	
	public Integer getPrice() {
		return price;
	}
	
	public void setPrice(Integer price) {
		this.price = price;
	}
	
	public Integer getDrive() {
		return drive;
	}
	
	public void setDrive(Integer drive) {
		this.drive = drive;
	}
	
	public Integer getDriveBeer() { 
		return driveBeer;
	}
	
	public void setDriveBeer(Integer driveBeer) {
		this.driveBeer = driveBeer;
	}
	
	public String getDetail() {
		return detail;
	}
	
	public void setDetail(String detail) {
		this.detail = detail;
	}
	
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getMemberName() {
        return member != null ? member.getName() : null;
    }
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	// 一括更新用のセッターメソッド
    public void updateFrom(Pay updatedPay) {
        if (updatedPay.getRid() != null) {
            this.setRid(updatedPay.getRid());
        }
        if (updatedPay.getMid() != null) {
            this.setMid(updatedPay.getMid());
        }
        if (updatedPay.getUid() != null) {
            this.setUid(updatedPay.getUid());
        }
        if (updatedPay.getOtherUids() != null) {
            this.setOtherUids(updatedPay.getOtherUids());
        }
        if (updatedPay.getPrice() != null) {
            this.setPrice(updatedPay.getPrice());
        }
        if (updatedPay.getDrive() != null) {
            this.setDrive(updatedPay.getDrive());
        }
        if (updatedPay.getDriveBeer() != null) {
            this.setDriveBeer(updatedPay.getDriveBeer());
        }
        if (updatedPay.getDetail() != null) {
            this.setDetail(updatedPay.getDetail());
        }
        if (updatedPay.getDate() != null) {
            this.setDate(updatedPay.getDate());
        }
    }
	
}