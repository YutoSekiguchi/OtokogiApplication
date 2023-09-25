package com.example.api.models;

import java.util.List;

public class Transition {
	private Long rid;
	private Long mid;
	private Long uid;
	private String name;
	private List<String> date;
	private List<Integer> transitionPrice;
	private List<Integer> transitionDrive;
	private List<Integer> transitionDriveBeer;
	
	public Transition() {}
	
	public Transition(Long rid, Long mid, Long uid, String name, List<String> date, List<Integer> transitionPrice, List<Integer> transitionDrive, List<Integer> transitionDriveBeer) {
		this.rid = rid;
		this.mid = mid;
		this.uid = uid;
		this.name = name;
		this.date = date;
		this.transitionPrice = transitionPrice;
		this.transitionDrive = transitionDrive;
		this.transitionDriveBeer = transitionDriveBeer;
	}
	
	// getter/setter
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
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public List<String> getDate() {
		return date;
	}
	
	public void setDate(List<String> date) {
		this.date = date;
	}
	
	public List<Integer> getTransitionPrice() {
		return transitionPrice;
	}
	
	public Integer getLastTransitionPrice() {
		if (transitionPrice.isEmpty()) {
			return 0;
		} else {
			return transitionPrice.get(transitionPrice.size() - 1);
		}
	}
	
	public void setTransitionPrice(List<Integer> transitionPrice) {
		this.transitionPrice = transitionPrice;
	}
	
	public List<Integer> getTransitionDrive() {
		return transitionDrive;
	}
	
	public Integer getLastTransitionDrive() {
		if (transitionDrive.isEmpty()) {
			return 0;
		} else {
			return transitionDrive.get(transitionDrive.size() - 1);
		}
	}
	
	public void setTransitionDrive(List<Integer> transitionDrive) {
		this.transitionDrive = transitionDrive;
	}
	
	public List<Integer> getTransitionDriveBeer() {
		return transitionDriveBeer;
	}
	
	public Integer getLastTransitionDriveBeer() {
		if (transitionDriveBeer.isEmpty()) {
			return 0;
		} else {
			return transitionDriveBeer.get(transitionDriveBeer.size() - 1);
		}
	}
	
	public void setTransitionDriveBeer(List<Integer> transitionDriveBeer) {
		this.transitionDriveBeer = transitionDriveBeer;
	}
	
	public void addTransitionData(String date, Integer price, Integer drive, Integer driveBeer) {
		this.date.add(date);
		this.transitionPrice.add(getLastTransitionPrice() + price);
		this.transitionDrive.add(getLastTransitionDrive() +  drive);
		this.transitionDriveBeer.add(getLastTransitionDriveBeer() + driveBeer);
	}
}