package com.example.Portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Portfolio.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
