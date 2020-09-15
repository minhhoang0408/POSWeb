package com.example.demo.product.service.impl;

import com.example.demo.exception.ProductQuantityException;
import com.example.demo.product.entity.Category;
import com.example.demo.product.entity.Product;
import com.example.demo.product.model.ProductModel;
import com.example.demo.product.model.ProductQuantityModel;
import com.example.demo.product.repo.ProductRepo;
import com.example.demo.product.repo.CategoryRepo;
import com.example.demo.product.service.ProductService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Page<Product> findAllByPage(Pageable pageable) {
        try {
            return productRepo.findAllByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<Product> findById(Integer prodId) {
        try {
            return productRepo.findById(prodId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Boolean findByProdCode(String prodCode) {
        try {
            if(productRepo.findByProdCode(prodCode).isPresent()) {return true;}
            else {return false;}
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return false;
        }
    }

    @Override
    public Page<Product> findByCategory(String name, Pageable pageable) {
        try {
            return productRepo.findByCategory(name, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findByCategory error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Product> findProduct(String name, Pageable pageable) {
        try {
            return productRepo.findProduct(name, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findProduct error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Product> findByPrice(String name, BigDecimal maxPrice, BigDecimal minPrice, Pageable pageable) {
        try {

            if(name.equals("price_in"))
                return productRepo.findByPriceIn(minPrice,maxPrice,pageable);
            else  return productRepo.findByPriceOut(minPrice,maxPrice,pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findProduct error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Product> findByQuantity(int quantity, Pageable pageable) {
        try {
            return productRepo.findByQuantity(quantity, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findByCategory error" + ex.toString());
            return null;
        }
    }

    @Override
    public List<Product> findMostInStock() {
        try {
            return productRepo.findMostInStock();
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findMostInStock error" + ex.toString());
            return null;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Product> update(ProductModel pm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            return categoryRepo.findById(pm.getCatId())
                    .map(cat -> {
                        return productRepo.findById(pm.getProdId())
                                .map(product -> {
                                    product.setProdName(pm.getProdName());
                                    product.setProdCode(pm.getProdCode());
                                    product.setQuantity(pm.getQuantity());
                                    product.setPriceIn(pm.getPriceIn());
                                    product.setPriceOut(pm.getPriceOut());
                                    product.setDiscount(pm.getDiscount());
                                    product.setImageLink(pm.getImageLink());
                                    product.setUpdateOn(now);
                                    product.setCategory(cat);
                                    return Optional.ofNullable(productRepo.save(product));
                                })
                                .orElse(Optional.empty());
                    })
                    .orElse(Optional.empty());
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Product> upload(ProductModel pm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            Category cat = categoryRepo.findById(pm.getCatId()).orElse(null);
            Product product = Product.builder()
                    .prodName(pm.getProdName())
                    .quantity(pm.getQuantity())
                    .priceIn(pm.getPriceIn())
                    .priceOut(pm.getPriceOut())
                    .discount(pm.getDiscount())
                    .imageLink(pm.getImageLink())
                    .prodCode(pm.getProdCode())
                    .deleted(false)
                    .createOn(now)
                    .updateOn(now)
                    .category(cat)
                    .build();
            return Optional.ofNullable(productRepo.save(product));
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean deleteById(Integer prodId) {
        try {
            return productRepo.deleteByIdProd(prodId) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("deleteById error" + ex.toString());
            return false;
        }
    }

    @Override
    public void updateProductQuantity(ProductQuantityModel productQuantityModel) {
        try {
            Product product = productRepo.findById(productQuantityModel.getProdId()).get();
            if (product.getQuantity() < productQuantityModel.getQuantity()) {
                throw new ProductQuantityException();
            }
            product.setQuantity(product.getQuantity() - productQuantityModel.getQuantity());
            productRepo.save(product);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update quantity error" + ex.toString());
            return;
        }
    }

}