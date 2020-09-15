package com.example.demo.product.controller;

import com.example.demo.json.JsonResult;
import com.example.demo.product.entity.Product;
import com.example.demo.product.model.ProductModel;
import com.example.demo.product.service.CategoryService;
import com.example.demo.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import  org.apache.commons.lang3.RandomUtils;

import java.math.BigDecimal;
import java.util.Optional;

import static org.apache.commons.lang3.RandomUtils.nextInt;

@RestController
@RequestMapping("api/admin/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<JsonResult> findById(@PathVariable("id") Integer prodId) {
        return productService.findById(prodId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/all")
    public ResponseEntity<JsonResult> findAllByPage(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(productService.findAllByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/cat")
    public ResponseEntity<JsonResult> findByCategory(@RequestParam("name") String name,
                                                     @RequestParam("page") Integer page,
                                                     @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        if(name.isEmpty()) {
            return Optional.ofNullable(productService.findAllByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        } else return Optional.ofNullable(productService.findByCategory(name, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/quantity")
    public ResponseEntity<JsonResult> findByQuantity(@RequestParam("quantity") int quantity,
                                                     @RequestParam("page") Integer page,
                                                     @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(productService.findByQuantity(quantity, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/product-code")
    public ResponseEntity<Boolean> findByProductCode(@RequestParam("product_code") String prodCode) {
        return new ResponseEntity<Boolean>(productService.findByProdCode(prodCode), HttpStatus.OK);
    }

    @GetMapping("/product-code/new")
    public ResponseEntity<String> getProductCode() {
        String prodCode=null;
        while(!productService.findByProdCode(prodCode)){
            prodCode="SKU"+String.valueOf(nextInt(0, 100000));
            if(!productService.findByProdCode(prodCode))
                return new ResponseEntity<>(prodCode,HttpStatus.OK);
        }
        return new ResponseEntity<>("a",HttpStatus.OK);
    }

    @GetMapping("/price")
    public ResponseEntity<JsonResult> findByPrice(@RequestParam("name") String name,
                                                  @RequestParam("max_price") BigDecimal maxPrice,
                                                  @RequestParam("min_price") BigDecimal minPrice,
                                                  @RequestParam("page") Integer page,
                                                  @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        System.out.println(minPrice);
        return Optional.ofNullable(productService.findByPrice(name, maxPrice, minPrice, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("")
    public ResponseEntity<JsonResult> findProduct(@RequestParam("name") String name,
                                                     @RequestParam("page") Integer page,
                                                     @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        if(name.isEmpty()) {
            return Optional.ofNullable(productService.findAllByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        } else return Optional.ofNullable(productService.findProduct(name, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Product not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/most-in-stock")
    public ResponseEntity<JsonResult> findMostInStock() {
        return Optional.ofNullable(productService.findMostInStock())
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody ProductModel productModel) {
        return categoryService.findById(productModel.getCatId())
                .map(cat -> {
                    return productService.upload(productModel)
                            .map(JsonResult::uploaded)
                            .orElse(JsonResult.saveError("Internal Server Error"));
                })
                .orElse(JsonResult.parentNotFound("Category doesn't exist"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody ProductModel productModel) {
        return productService.update(productModel)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Internal Server Error"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<JsonResult> deleteById(@PathVariable("id") Integer prodId) {
        if (productService.deleteById(prodId)) {
            return JsonResult.deleted();
        }
        return JsonResult.saveError("Internal Server Error");
    }

}

