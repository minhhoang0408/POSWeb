package com.example.demo.product.repo;

import com.example.demo.product.entity.Product;
import java.util.List;

public interface ProductRepoCustom {
    List<Product> findMostInStock();
}
