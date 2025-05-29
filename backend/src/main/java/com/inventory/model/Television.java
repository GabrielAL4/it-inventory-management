package com.inventory.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Television extends Equipment {
    private String screenSize;
    private String resolution;
    private String displayType; // LED, OLED, etc.
    private boolean smartTv;
    private String operatingSystem; // For smart TVs
    private Integer hdmiPorts;
} 