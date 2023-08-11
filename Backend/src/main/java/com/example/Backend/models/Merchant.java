package com.example.Backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Merchant {
    private String redirectCancelUrl;
    private String redirectConfirmUrl;
}
