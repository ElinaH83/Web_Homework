package com.example.drawingApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.drawingApp.entity.Drawing;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    Optional<Drawing> findByUserUsername(String username);
}