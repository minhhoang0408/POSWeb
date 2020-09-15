package com.example.demo.product.controller;

import com.example.demo.json.JsonResult;
import com.example.demo.product.model.CategoryModel;
import com.example.demo.product.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/admin/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<JsonResult> findById(@PathVariable("id") Integer catId) {
        return categoryService.findById(catId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

//    @GetMapping("/all")
//    public ResponseEntity<JsonResult> findAll() {
//        return Optional.ofNullable(categoryService.findAll())
//                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Category not found"))
//                .orElse(JsonResult.serverError("Internal Server Error"));
//    }

    @GetMapping("/all")
    public ResponseEntity<JsonResult> findAllByPage(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(categoryService.findAllByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Category not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("")
    public ResponseEntity<JsonResult> findCustomer(@RequestParam("name") String name,
                                                   @RequestParam("page") Integer page,
                                                   @RequestParam("size") Integer size ) {
        Pageable pageable = PageRequest.of(page, size);
        if(name.isEmpty()) {
            return Optional.ofNullable(categoryService.findAllByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Category not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        } else return Optional.ofNullable(categoryService.findCategory(name, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Category not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody CategoryModel categoryModel) {
        if(categoryService.findExistedCategory(categoryModel.getCatName(), categoryModel.getBrand()).isPresent()) {
            return JsonResult.saveError("category");
        }else return categoryService.upload(categoryModel)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("Internal Server Error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody CategoryModel categoryModel) {
        return categoryService.update(categoryModel)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Internal Server Error"));
    }

}
