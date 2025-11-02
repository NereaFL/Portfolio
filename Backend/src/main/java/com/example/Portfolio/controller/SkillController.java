package com.example.Portfolio.controller;

import com.example.Portfolio.model.Skill;
import com.example.Portfolio.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // ✅ Público
    @GetMapping
    public List<Skill> getAll() {
        return skillService.getAll();
    }

    // 🔐 Solo ADMIN
    @PostMapping("/admin")
    public Skill create(@RequestBody Skill skill) {
        return skillService.save(skill);
    }

    @PutMapping("/admin/{id}")
    public Skill update(@PathVariable Long id, @RequestBody Skill updated) {
        updated.setId(id);
        return skillService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        skillService.delete(id);
    }
}
