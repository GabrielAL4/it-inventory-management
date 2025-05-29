package com.inventory.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Tablet extends Equipment {
    private String operatingSystem;
    private String screenSize;
    private String storage;
    private String ram;
    private String processor;
    private String batteryCapacity;
    private boolean cellular; // Whether it has cellular connectivity
    private String imei; // Only for cellular models
} 