package com.example.Portfolio.controller;

import com.example.Portfolio.model.Person;
import com.example.Portfolio.service.PersonService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // ✅ Público
    @GetMapping
    public List<Person> getAll() {
        return personService.getAll();
    }

    @GetMapping("/{id}")
    public Person getById(@PathVariable Long id) {
        return personService.getById(id);
    }

    // Solo ADMIN
    @PostMapping("/admin")
    public Person create(@RequestBody Person person) {
        return personService.save(person);
    }

    @PutMapping("/admin/{id}")
    public Person update(@PathVariable Long id, @RequestBody Person updated) {
        updated.setId(id);
        return personService.save(updated);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable Long id) {
        personService.delete(id);
    }
}
