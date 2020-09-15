package com.example.demo.product.repo;

import com.example.demo.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer>, ProductRepoCustom {

    @Query(value = "select p from Product p where p.deleted = false order by p.updateOn desc")
    Page<Product> findAllByPage(Pageable pageable);

    @Query(value = "select p from Product p where p.deleted = false and p.prodId = ?1")
    Optional<Product> findById(Integer prodId);

    @Query(value = "select p from Product p where p.deleted = false and p.prodCode = ?1")
    Optional<Product> findByProdCode(String prodCode);

    @Query(value = "select p from Product p where p.deleted = false and (p.prodName like %:name% or p.prodCode like %:name%) order by p.updateOn desc")
    Page<Product> findProduct(@Param("name")String name, Pageable pageable);

    @Query(value = "select p from Product p where p.deleted = false and (p.category.catName like %:name% or p.category.brand like %:name%)")
    Page<Product> findByCategory(@Param("name")String name, Pageable pageable);

    @Query(value = "select p from Product p where p.deleted = false and p.quantity <= ?1  order by p.quantity asc\n")
    Page<Product> findByQuantity(@Param("Quantity")int quantity, Pageable pageable);

    @Query(value = "select p from Product p where p.deleted = false and p.priceIn <= ?2 and p.priceIn >= ?1 order by p.priceIn asc")
    Page<Product> findByPriceIn(@Param("minPrice")BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice, Pageable pageable);

    @Query(value = "select p from Product p where p.deleted = false and p.priceOut <= ?2 and p.priceOut >= ?1 order by p.priceOut asc")
    Page<Product> findByPriceOut(@Param("minPrice")BigDecimal minPrice,@Param("maxPrice")BigDecimal maxPrice, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "update Product p set p.deleted = true where p.prodId = ?1")
    int deleteByIdProd(Integer prodId);

    @Query(value = "select p from Product p where p.prodCode like %:prodCode%")
    Optional<Product> findByCode(@Param("prodCode")String prodCode);
}
