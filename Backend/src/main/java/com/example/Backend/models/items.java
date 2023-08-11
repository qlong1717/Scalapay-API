package com.example.Backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class items {
    private String name;
    private String category;
    private String[] subcategory;
    private String brand;
    private String sku;
    private String gtin;
    private int quantity;
    private Amount price;
}
