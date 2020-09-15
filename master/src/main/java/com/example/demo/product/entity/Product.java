package com.example.demo.product.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table( schema = "sapo_server", name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer prodId;

    @Column(name = "code")
    private String prodCode;

    @Column(name = "name")
    private String prodName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price_in")
    private BigDecimal priceIn;

    @Column(name = "price_out")
    private BigDecimal priceOut;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "image_link")
    private String imageLink;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "create_on")
    private Timestamp createOn;

    @Column(name = "update_on")
    private Timestamp updateOn;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
