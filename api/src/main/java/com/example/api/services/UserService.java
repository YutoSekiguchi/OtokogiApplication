package com.example.api.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.User;
import com.example.api.repositories.UserRepository;

@Service
public class UserService {
	private List<User> users = new ArrayList<>();
	
	@Autowired
   private UserRepository userRepository;
	
//	public User getUserById(Long id) {
//        return userRepository.findById(id).orElse(null);
//    }
	
	public User signInOrRegisterUser(User user) {
       User existingUser = userRepository.findByMail(user.getMail());
       
       if (existingUser == null) {
           // ユーザが存在しない場合、新しいユーザを追加
           users.add(user);
           return user;
       } else {
           // ユーザが存在する場合、既存のユーザ情報を返す
           return existingUser;
       }
   }
	
	public User loginUser(String mail) {
       User existingUser = userRepository.findByMail(mail);
       
       if (existingUser != null) {
           return existingUser;
       } else {
           return null; // ログイン失敗
       }
   }
}