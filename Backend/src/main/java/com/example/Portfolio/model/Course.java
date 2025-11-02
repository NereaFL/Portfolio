package com.example.Portfolio.model;

import jakarta.persistence.*;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;           // Nombre del curso
    private String institution;    // Academia, universidad, etc.
    private String duration;       // Ejemplo: "Enero 2023 - Marzo 2023"
    private String diplomaPath;    // Ruta local o URL al diploma
    @Column(length = 1000)
    private String description;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getDiplomaPath() { return diplomaPath; }
    public void setDiplomaPath(String diplomaPath) { this.diplomaPath = diplomaPath; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
