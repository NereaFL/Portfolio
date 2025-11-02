package com.example.Portfolio.controller;

import com.example.Portfolio.model.Course;
import com.example.Portfolio.service.CourseService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // ✅ Público
    @GetMapping
    public List<Course> getAll() {
        return courseService.getAll();
    }

    @GetMapping("/{id}")
    public Course getById(@PathVariable Long id) {
        return courseService.getById(id);
    }

    // 🔐 Solo ADMIN
    @PostMapping("/admin")
    public Course create(@RequestBody Course course) {
        return courseService.save(course);
    }

    @PutMapping("/admin/{id}")
    public Course update(@PathVariable Long id, @RequestBody Course updated) {
        updated.setId(id);
        return courseService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}
