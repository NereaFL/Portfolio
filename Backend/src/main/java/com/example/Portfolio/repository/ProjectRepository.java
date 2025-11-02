package com.example.Portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Portfolio.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
