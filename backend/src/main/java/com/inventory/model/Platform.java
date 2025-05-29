package com.inventory.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    
    private String description;
    private String location;
    
    @OneToMany(mappedBy = "platform")
    private List<Equipment> equipment;
} 