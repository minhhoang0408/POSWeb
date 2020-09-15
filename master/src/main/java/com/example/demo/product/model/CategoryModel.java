package com.example.demo.product.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryModel {

    private Integer catId;

    private String catName;

    private String brand;

    private String catNote;

}
