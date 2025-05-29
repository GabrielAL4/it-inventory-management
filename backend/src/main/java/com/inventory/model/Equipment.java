package com.inventory.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String rfidTag;

    private String serialNumber;
    private String manufacturer;
    private String model;
    private LocalDateTime purchaseDate;
    private String status; // AVAILABLE, IN_USE, MAINTENANCE, RETIRED
    
    @ManyToOne
    private Platform platform; // Where the equipment is deployed
    
    private String location; // Physical location or department
    private String notes;
    private LocalDateTime lastUpdated;
} 