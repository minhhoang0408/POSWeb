package com.example.demo.product.repo;



import com.example.demo.product.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

    @Query(value = "select c from Category c where c.catId = :id")
    Optional<Category> findById(@Param("id") Integer catId);

    @Query(value = "select c from Category c")
    Page<Category> findAllByPage(Pageable pageable);

    @Query(value = "select c from Category c where c.catName like %:name% or c.brand like %:name%")
    Page<Category> findCategory(@Param("name") String name, Pageable pageable);

    @Query(value = "select c from Category c where c.catName = :name and c.brand = :brand")
    Optional<Category> findExistedCategory(@Param("name") String name, @Param("brand") String brand);

}
