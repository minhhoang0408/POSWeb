package com.example.demo.bill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillModel {

    private Integer customerId;

    private BigDecimal totalPrice;

    private BigDecimal discount;

    private BigDecimal cashIn;

    private BigDecimal cashOut;

    private String billNote;

    private List<BillItemsModel> billItemsModel;
}
