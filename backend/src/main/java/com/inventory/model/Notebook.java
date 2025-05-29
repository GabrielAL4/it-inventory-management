package com.inventory.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Notebook extends Equipment {
    private String processor;
    private String ram;
    private String storage;
    private String operatingSystem;
    private String screenSize;
    private String batteryHealth;
} 