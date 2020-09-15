package com.example.demo.customer.controller;

import com.example.demo.customer.entity.Customer;
import com.example.demo.json.JsonResult;
import com.example.demo.customer.model.CustomerModel;
import com.example.demo.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/admin/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/{id}")
    public ResponseEntity<JsonResult> findById(@PathVariable("id") Integer customerId) {
        return customerService.findById(customerId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/all-active")
    public ResponseEntity<JsonResult> findAllActiveByPage(@RequestParam("page") Integer page,
                                                          @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(customerService.findAllActiveByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("")
    public ResponseEntity<JsonResult> findActiveCustomer(@RequestParam("name") String name,
                                                         @RequestParam("page") Integer page,
                                                         @RequestParam("size") Integer size ) {
        Pageable pageable = PageRequest.of(page, size);
        if(name.isEmpty()) {
            return Optional.ofNullable(customerService.findAllActiveByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        } else return Optional.ofNullable(customerService.findActiveCustomer(name, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/all")
    public ResponseEntity<JsonResult> findAllByPage(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(customerService.findAllByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/all-customer")
    public ResponseEntity<JsonResult> findCustomer(@RequestParam("name") String name,
                                                   @RequestParam("page") Integer page,
                                                   @RequestParam("size") Integer size ) {
        Pageable pageable = PageRequest.of(page, size);
        if(name.isEmpty()) {
            return Optional.ofNullable(customerService.findAllByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        } else return Optional.ofNullable(customerService.findCustomer(name, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Customer not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody CustomerModel customerModel) {
        if(customerService.findCustomerByPhone(customerModel.getPhone()).isPresent()){
            return JsonResult.saveError("customer");
        }else return customerService.upload(customerModel)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("Internal Server Error"));

    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody CustomerModel customerModel) {
        if (customerService.findById(customerModel.getCustomerId()).get().getPhone().equals(customerModel.getPhone())) {
            return customerService.update(customerModel)
                    .map(JsonResult::updated)
                    .orElse(JsonResult.saveError("Internal Server Error"));
        } else if(customerService.findCustomerByPhone(customerModel.getPhone()).isPresent()){
            return JsonResult.saveError("customer");
        }else return customerService.update(customerModel)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Internal Server Error"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<JsonResult> deleteById(@PathVariable("id") Integer customerId) {
        if (customerService.deleteById(customerId)) {
            return JsonResult.deleted();
        }
        return JsonResult.saveError("Internal Server Error");
    }

}
