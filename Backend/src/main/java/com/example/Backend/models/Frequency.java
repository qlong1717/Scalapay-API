package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Frequency {

    @JsonProperty
    private int number;
    
    @JsonProperty
    private String frequencyType;
}
