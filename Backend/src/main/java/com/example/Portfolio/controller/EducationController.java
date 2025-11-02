// src/main/java/.../controller/EducationController.java
package com.example.Portfolio.controller;

import com.example.Portfolio.model.Education;
import com.example.Portfolio.service.EducationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "*")
public class EducationController {
  private final EducationService service;
  public EducationController(EducationService service){ this.service = service; }

  // públicos
  @GetMapping public List<Education> all(){ return service.findAll(); }
  @GetMapping("/{id}") public Education one(@PathVariable Long id){ return service.find(id); }

  // admin
  @PostMapping("/admin") public Education create(@RequestBody Education e){ return service.save(e); }
  @PutMapping("/admin/{id}") public Education update(@PathVariable Long id, @RequestBody Education e){ e.setId(id); return service.save(e); }
  @DeleteMapping("/admin/{id}") public void remove(@PathVariable Long id){ service.delete(id); }
}
