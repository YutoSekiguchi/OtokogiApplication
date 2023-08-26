package com.example.api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.Friendship;
import com.example.api.models.User;
import com.example.api.repositories.FriendshipRepository;
import com.example.api.services.FriendshipService;

@RestController
@RequestMapping("/friendships")
public class FriendshipController {
	private final FriendshipRepository friendshipRepository;
	
	public FriendshipController(FriendshipRepository friendshipRepository) {
		this.friendshipRepository = friendshipRepository;
	}
	
	@Autowired
	private FriendshipService friendshipService;
	
	// 自分のフレンドの取得
	@GetMapping("/get/{uid}/myfriend")
	public ResponseEntity<List<User>> getFriendshipsByuid(@PathVariable Long uid) {
		List<User> myFriendList = friendshipService.getMyFriends(uid);
		return ResponseEntity.ok(myFriendList);
	}
	
	// 自分に対してフレンド申請してるけどまだフレンドじゃないユーザの取得
	@GetMapping("/get/{friendId}/applied")
	public ResponseEntity<List<User>> getAppliedUsersByFriendId(@PathVariable Long friendId) {
		List<User> appliedUserList = friendshipService.getAppliedUsers(friendId);
		return ResponseEntity.ok(appliedUserList);
	}
	
	// friendshipの追加
	@PostMapping("")
	public ResponseEntity<Friendship> postFriendship(@RequestBody Friendship friendship) {
		Friendship postedFriendship = friendshipRepository.save(friendship);
		return ResponseEntity.ok(postedFriendship);
	}
	
	// statusの変更
	@PutMapping("/{id}/change/status")
	public ResponseEntity<Friendship> putFriendshipById(@PathVariable Long id, @RequestParam Integer newStatus) {
		Optional<Friendship> optionalFriendship = friendshipRepository.findById(id);
        if (optionalFriendship.isPresent()) {
            Friendship friendship = optionalFriendship.get();
            friendship.setStatus(newStatus);
            friendshipRepository.save(friendship); // ステータスを更新して保存
            return ResponseEntity.ok(friendship);
        } else {
            return ResponseEntity.notFound().build();
        }
	}
}