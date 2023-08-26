package com.example.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByMail(String mail);
	User findByFriendCode(String friendCode);
	List<User> findByIdIn(List<Long> ids);
}