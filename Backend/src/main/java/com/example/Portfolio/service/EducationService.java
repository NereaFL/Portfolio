package com.example.Portfolio.service;

import com.example.Portfolio.model.Education;
import com.example.Portfolio.repository.EducationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EducationService {

    private final EducationRepository repo;

    public EducationService(EducationRepository repo) {
        this.repo = repo;
    }

    public List<Education> findAll() {
        // Devuelve los registros del más nuevo al más antiguo
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Education find(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Education save(Education e) {
        return repo.save(e);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
