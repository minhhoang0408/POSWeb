package com.example.demo.bill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillItemsModel {
    private int prodId;
    private int priceOut;
    private int quantity;
    private BigDecimal discount;
    private BigDecimal totalPrice;
}
