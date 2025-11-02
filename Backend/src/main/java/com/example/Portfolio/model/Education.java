// src/main/java/.../model/Education.java
package com.example.Portfolio.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Education {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;        // p.ej. "Grado en Ingeniería Informática"
  private String institution;  // p.ej. "Universidad de Sevilla"
  private Integer startYear;   // 2022
  private Integer endYear;     // 2025 (o null si en curso)
  private String type;         // "FP", "Universidad", "Especialización"
  @Column(length = 2000)
  private String notes;        // opcional
}
