package com.inventory.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class GamingConsole extends Equipment {
    private String storage;
    private String version; // e.g., PS5 Digital Edition, Xbox Series X
    private String color;
    private Integer controllerCount;
    private boolean online; // Whether it's connected to online services
    private String firmwareVersion;
} 