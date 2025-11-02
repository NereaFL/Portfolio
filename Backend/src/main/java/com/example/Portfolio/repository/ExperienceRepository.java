package com.example.Portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Portfolio.model.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
}
