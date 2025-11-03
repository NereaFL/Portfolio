package com.example.Portfolio.controller;

import com.example.Portfolio.model.Course;
import com.example.Portfolio.service.CourseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAll() {
        return courseService.getAll();
    }

    @GetMapping("/{id}")
    public Course getById(@PathVariable Long id) {
        return courseService.getById(id);
    }

    @PostMapping(value = "/admin", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Course create(
            @RequestPart("data") Course course,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        if (file != null && !file.isEmpty()) {
            String uploadDir = "src/main/resources/static/diplomas";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String originalName = file.getOriginalFilename();
            String extension = originalName != null && originalName.contains(".")
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : "";
            String fileName = course.getName().replaceAll("[^a-zA-Z0-9-_]", "_") + extension;

            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());

            // ✅ Ruta servida desde backend
            course.setDiplomaPath("course.setDiplomaPath(\"https://portfolio-backend-nerea.onrender.com/diplomas/\" + fileName);\r\n" + //
                                "/diplomas/" + fileName);
        }

        return courseService.save(course);
    }

    @PutMapping(value = "/admin/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Course update(
            @PathVariable Long id,
            @RequestPart("data") Course updated,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        updated.setId(id);

        if (file == null || file.isEmpty()) {
            Course existing = courseService.getById(id);
            if (existing != null) updated.setDiplomaPath(existing.getDiplomaPath());
        } else {
            String uploadDir = "src/main/resources/static/diplomas";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String originalName = file.getOriginalFilename();
            String extension = originalName != null && originalName.contains(".")
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : "";
            String fileName = updated.getName().replaceAll("[^a-zA-Z0-9-_]", "_") + extension;

            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());

            updated.setDiplomaPath("course.setDiplomaPath(\"https://portfolio-backend-nerea.onrender.com/diplomas/\" + fileName);\r\n" + //
                                "/diplomas/" + fileName);
        }

        return courseService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}
