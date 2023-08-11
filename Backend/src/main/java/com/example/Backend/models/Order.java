package com.example.Backend.models;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @JsonProperty
    private List<items> items;

    @JsonProperty
    private Address billing;

    @JsonProperty
    private Consumer consumer;

    @JsonProperty
    private Merchant merchant;

    @JsonProperty
    private Address shipping;

    @JsonProperty
    private List<Discount> discounts;

    @JsonProperty
    private Amount taxAmount;

    @JsonProperty
    private Amount totalAmount;

    @JsonProperty
    private Amount shippingAmount;

    @JsonProperty
    private String merchantReference;

    @JsonProperty
    private String type;

    @JsonProperty
    private String product;

    @JsonProperty
    private Frequency frequency;

    @JsonProperty
    private long orderExpiryMilliseconds;

    public Order(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Order order = objectMapper.readValue(json, Order.class);

        this.items = order.getItems();
        this.billing = order.getBilling();
        this.consumer = order.getConsumer();
        this.merchant = order.getMerchant();
        this.shipping = order.getShipping();
        this.discounts = order.getDiscounts();
        this.taxAmount = order.getTaxAmount();
        this.totalAmount = order.getTotalAmount();
        this.shippingAmount = order.getShippingAmount();
        this.merchantReference = order.getMerchantReference();
        this.type = order.getType();
        this.product = order.getProduct();
        this.frequency = order.getFrequency();
        this.orderExpiryMilliseconds = order.getOrderExpiryMilliseconds();
    }
}
