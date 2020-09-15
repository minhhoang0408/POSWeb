package com.example.demo.bill.entity;

import com.example.demo.product.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(schema = "sapo_server", name = "bill_items")
public class BillItems {

    @EmbeddedId
    private BillItemsId billItemsId;

    @JsonIgnore
    @MapsId("billId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    private Bill bill;

    @MapsId("prodId")
    @ManyToOne(optional = false)
    @JoinColumn(name = "prod_id", referencedColumnName = "id")
    private Product product;

    @Column(name = "price_out")
    private Integer priceOut;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

}
