package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {
    @JsonProperty
    private String name;

    @JsonProperty
    private String line1;

    @JsonProperty
    private String suburb;

    @JsonProperty
    private String postCode;

    @JsonProperty
    private String countryCode;

    @JsonProperty
    private String phoneNumber;
}

