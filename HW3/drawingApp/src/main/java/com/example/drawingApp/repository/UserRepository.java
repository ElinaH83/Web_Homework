package com.example.drawingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.drawingApp.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}