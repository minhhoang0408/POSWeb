package com.example.demo.product.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@NoArgsConstructor
public class ProductQuantityModel {
    private Integer prodId;

    private Integer quantity;
}
