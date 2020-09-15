package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.product.model.ProductModel;
import com.example.demo.product.model.ProductQuantityModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Optional<Product> findById(Integer prodId);
    Boolean findByProdCode(String prodCode);
    Page<Product> findAllByPage(Pageable pageable);

    Page<Product> findByCategory(String name, Pageable pageable);

    Page<Product> findProduct(String name, Pageable pageable);

    Page<Product> findByQuantity(int quantity, Pageable pageable);

    Page<Product> findByPrice(String name, BigDecimal maxPrice, BigDecimal minPrice, Pageable pageable);

    List<Product> findMostInStock();

    void updateProductQuantity(ProductQuantityModel productQuantityModel);

    Optional<Product> upload(ProductModel productModel);

    Optional<Product> update(ProductModel productModel);

    boolean deleteById(Integer prodId);

}
