package com.example.demo.product.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductModel {

    private Integer prodId;

    private String prodCode;

    private String prodName;

    private Integer quantity;

    private BigDecimal priceIn;

    private BigDecimal priceOut;

    private BigDecimal discount;

    private String imageLink;

    private Integer catId;

}
