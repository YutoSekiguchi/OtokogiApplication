package com.example.api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.models.User;
import com.example.api.repositories.UserRepository;
import com.example.api.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

   private final UserRepository userRepository;

   @Autowired
   public UserController(UserRepository userRepository) {
       this.userRepository = userRepository;
   }
   @Autowired
   private UserService userService;
   
   @GetMapping("/get/{id}")
   public ResponseEntity<User> getUserById(@PathVariable Long id) {
	   Optional<User> userOptional = userRepository.findById(id);

       if (userOptional.isPresent()) {
           User user = userOptional.get();
           return ResponseEntity.ok(user);
       } else {
            return ResponseEntity.notFound().build();
       }
   }
   
   // フレンドコードからユーザの取得
   @GetMapping("/get/{friendcode}/friendcode")
   public ResponseEntity<User> getUserByFriendCode(@PathVariable String friendCode) {
	   User gettedUser = userRepository.findByFriendCode(friendCode);
	   return ResponseEntity.ok(gettedUser);
   }
   
   @PostMapping("/signin")
   public ResponseEntity<User> signIn(@RequestBody User user) {
       User signedInUser = userService.signInOrRegisterUser(user);
       return ResponseEntity.ok(signedInUser);
   }

   @PostMapping("/login")
   public ResponseEntity<User> login(@RequestParam String mail) {
       User loggedInUser = userService.loginUser(mail);

       if (loggedInUser != null) {
           return ResponseEntity.ok(loggedInUser);
       } else {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }
   }
    
}