package com.example.demo.product.service.impl;

import com.example.demo.product.entity.Category;
import com.example.demo.product.model.CategoryModel;
import com.example.demo.product.repo.CategoryRepo;
import com.example.demo.product.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Optional<Category> findById(Integer catId) {
        try {
            return categoryRepo.findById(catId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

//    @Override
//    public List<Category> findAll() {
//        try {
//            return categoryRepo.findAll();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            System.out.println("findAll error" + ex.toString());
//            return null;
//        }
//    }

    @Override
    public Page<Category> findAllByPage(Pageable pageable) {
        try {
            return categoryRepo.findAllByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Category> findCategory(String name, Pageable pageable) {
        try {
            return categoryRepo.findCategory(name, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findCategory error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<Category> findExistedCategory(String name, String brand) {
        try {
            return categoryRepo.findExistedCategory(name, brand);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findExistedCategory error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Category> upload( CategoryModel cm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            Category category = Category.builder()
                    .catName(cm.getCatName())
                    .brand(cm.getBrand())
                    .catNote(cm.getCatNote())
                    .createOn(now)
                    .updateOn(now)
                    .build();
            return Optional.ofNullable(categoryRepo.save(category));
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Category> update(CategoryModel cm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            return categoryRepo.findById(cm.getCatId())
                    .map(category -> {
                        category.setCatName(cm.getCatName());
                        category.setBrand(cm.getBrand());
                        category.setCatNote(cm.getCatNote());
                        category.setUpdateOn(now);
                        return Optional.ofNullable(categoryRepo.save(category));
                    })
                    .orElse(Optional.empty());
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error" + ex.toString());
            return Optional.empty();
        }
    }

}
