package com.example.Portfolio.controller;

import com.example.Portfolio.model.Project;
import com.example.Portfolio.service.ProjectService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // ✅ Público
    @GetMapping
    public List<Project> getAll() {
        return projectService.getAll();
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Long id) {
        return projectService.getById(id);
    }

    // 🔐 Solo ADMIN
    @PostMapping("/admin")
    public Project create(@RequestBody Project project) {
        return projectService.save(project);
    }

    @PutMapping("/admin/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project updated) {
        updated.setId(id);
        return projectService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        projectService.delete(id);
    }
}
