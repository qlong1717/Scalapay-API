package com.example.Backend.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.models.Order;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class orderController {
    
    @Value("${scalapay.api.base-url}")
    private String scalapayBaseUrl;

    @Value("${scalapay.api.auth-token}")
    private String scalapayAuthToken;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create-order")
    public ResponseEntity<String> OrderResquest(@RequestBody String order_request)  throws IOException, InterruptedException{

       ObjectMapper objectMapper = new ObjectMapper();
        Order order = objectMapper.readValue(order_request, Order.class);
        String un = objectMapper.writeValueAsString(order);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(scalapayBaseUrl+"/orders"))
                .header("accept", "application/json")
                .header("content-type", "application/json")
                .header("Authorization", "Bearer " + scalapayAuthToken)
                .POST(HttpRequest.BodyPublishers.ofString(un))
                .build();
        try{
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok(response.body());

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error:"+e.getMessage());
        }
    }
}