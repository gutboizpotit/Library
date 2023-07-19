package com.example.btl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.btl.entity.User;
import com.example.btl.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User addUser(User user) {
		if( user != null ) {
			userRepository.save(user);
		}
		return null;
	}
	
	public User getOneUser(String username) {
		return userRepository.findByUsername(username);
	}
	
	public List<User> getAllUser() {
		return userRepository.findAll();
	}
}
