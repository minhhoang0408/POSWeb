package com.example.demo.product.service;

import com.example.demo.product.entity.Category;
import com.example.demo.product.model.CategoryModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Optional<Category> findById(Integer idCat);

//    List<Category> findAll();

    Page<Category> findAllByPage(Pageable pageable);

    Page<Category> findCategory(String name, Pageable pageable);

    Optional<Category> findExistedCategory(String name, String brand);

    Optional<Category> upload(CategoryModel categoryModel);

    Optional<Category> update(CategoryModel categoryModel);

}
