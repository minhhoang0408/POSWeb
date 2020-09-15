package com.example.demo.product.repo.impl;

import com.example.demo.product.entity.Product;
import com.example.demo.product.repo.ProductRepoCustom;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class ProductRepoImpl implements ProductRepoCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Product> findMostInStock() {
        String query = "select * from product p where p.deleted = 0\n" +
                "order by p.quantity desc \n"+
                "limit 3";
        Query q = em.createNativeQuery(query, Product.class);
        return q.getResultList();
    }
}
