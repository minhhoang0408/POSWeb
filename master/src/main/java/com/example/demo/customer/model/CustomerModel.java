package com.example.demo.customer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerModel {
   
    private Integer customerId;

    private String customerName;

    private String customerCode;

    private String phone;

    private String email;

    private String address;

    private String gender;

    private Date dob;

    private Boolean deleted;

}
