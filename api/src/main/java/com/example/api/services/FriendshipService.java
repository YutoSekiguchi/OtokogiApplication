package com.example.api.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.Friendship;
import com.example.api.models.User;
import com.example.api.repositories.FriendshipRepository;
import com.example.api.repositories.UserRepository;

@Service
public class FriendshipService {
	@Autowired
	private FriendshipRepository friendshipRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	// フレンド取得
	public List<User> getMyFriends(Long uid) {
		List<Long> myFriendIdList = getMyFriendIDs(uid);
		if (myFriendIdList != null && myFriendIdList.size() > 0) {			
			List<User> users = userRepository.findByIdIn(myFriendIdList);
			return users;
		} else {
			return List.of();
		}
	}
	
	// フレンド申請されてるユーザ取得
	public List<User> getAppliedUsers(Long friendId) {
		List<Long> appliedUserIdList = getAppliedUserIDs(friendId);
		if (appliedUserIdList != null && appliedUserIdList.size() > 0) {			
			List<User> users = userRepository.findByIdIn(appliedUserIdList);
			return users;
		} else {
			return List.of();
		}
		
	}
	
	// 自分のフレンドのidを全て取得
	public List<Long> getMyFriendIDs(Long uid) {
		List<Long> idList = new ArrayList<>();
		List<Friendship> myFriendshipList = friendshipRepository.findByStatusAndUidOrStatusAndFriendId(1, uid, 1, uid);
		if (myFriendshipList != null && myFriendshipList.size() > 0) {
			int size = myFriendshipList.size();
			for (int i=0; i<size; i++) {
				Friendship myFriendship = myFriendshipList.get(i);
				if (myFriendship.getUid() == uid) {
					idList.add(myFriendship.getFriendId());
				} else if (myFriendship.getFriendId() == uid) {
					idList.add(myFriendship.getUid());
				}
			}
			return idList;
		} else {
			return List.of();
		}
	}
	
	//自分に対してフレンド申請してるけどまだフレンドじゃないユーザのidを全て取得
	public List<Long> getAppliedUserIDs(Long friendId) {
		List<Long> idList = new ArrayList<>();
		List<Friendship> myFriendshipList = friendshipRepository.findByStatusAndFriendId(0, friendId);
		if (myFriendshipList != null && myFriendshipList.size() > 0) {
			int size = myFriendshipList.size();
			for (int i=0; i<size; i++) {
				idList.add(myFriendshipList.get(i).getUid());
			}
			return idList;
		} else {
			return List.of();
		}
	}
	
}