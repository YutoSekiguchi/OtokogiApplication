package com.example.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.models.Friendship;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
	List<Friendship> findByStatusAndUidOrStatusAndFriendId(Integer status1, Long uid, Integer status2, Long friendId);
	List<Friendship> findByStatusAndFriendId(Integer status, Long friendId);
}