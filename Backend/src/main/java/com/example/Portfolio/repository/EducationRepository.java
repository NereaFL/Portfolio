// src/main/java/.../repository/EducationRepository.java
package com.example.Portfolio.repository;
import com.example.Portfolio.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Long> {}
