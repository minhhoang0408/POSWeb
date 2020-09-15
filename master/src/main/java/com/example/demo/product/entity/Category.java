package com.example.demo.product.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(schema = "sapo_server", name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer catId;

    @Column(name = "name")
    private String catName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "note")
    private String catNote;

    @Column(name = "create_on")
    private Timestamp createOn;

    @Column(name = "update_on")
    private Timestamp updateOn;

}
