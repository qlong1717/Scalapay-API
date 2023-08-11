package com.example.Backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consumer {

    private String email;
    private String surname;
    private String givenNames;
    private String phoneNumber;
}
