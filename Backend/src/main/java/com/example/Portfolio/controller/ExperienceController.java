package com.example.Portfolio.controller;

import com.example.Portfolio.model.Experience;
import com.example.Portfolio.service.ExperienceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "*")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    // ✅ Público
    @GetMapping
    public List<Experience> getAll() {
        return experienceService.getAll();
    }

    @GetMapping("/{id}")
    public Experience getById(@PathVariable Long id) {
        return experienceService.getById(id);
    }

    // 🔐 Solo ADMIN
    @PostMapping("/admin")
    public Experience create(@RequestBody Experience experience) {
        return experienceService.save(experience);
    }

    @PutMapping("/admin/{id}")
    public Experience update(@PathVariable Long id, @RequestBody Experience updated) {
        updated.setId(id);
        return experienceService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        experienceService.delete(id);
    }
}
