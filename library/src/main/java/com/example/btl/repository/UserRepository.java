package com.example.btl.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.btl.entity.User;

public interface UserRepository extends JpaRepository<User , Integer> {
	User findByUsername(String username);
}
