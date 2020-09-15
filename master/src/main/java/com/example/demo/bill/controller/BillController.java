package com.example.demo.bill.controller;

import com.example.demo.bill.model.BillModel;
import com.example.demo.bill.service.BillService;
import com.example.demo.json.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/admin/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/{id}")
    public ResponseEntity<JsonResult> findById(@PathVariable("id") Integer billId) {
        return billService.findById(billId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/full/{id}")
    public ResponseEntity<JsonResult> findFullInfoById(@PathVariable("id") Integer billId) {
        return billService.findFullInfoById(billId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/all")
    public ResponseEntity<JsonResult> findAllByPage(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(billService.findAllByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Bill not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("")
    public ResponseEntity<JsonResult> findBillByCode(@RequestParam("code") String code,
                                                     @RequestParam("page") Integer page,
                                                     @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        if(code.isEmpty()) {
            return Optional.ofNullable(billService.findAllByPage(pageable))
                    .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Bill not found"))
                    .orElse(JsonResult.serverError("Internal Server Error"));
        }else return Optional.ofNullable(billService.findBillByCode(code, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Bill not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/customer")
    public ResponseEntity<JsonResult> findByCustomer(@RequestParam("id") Integer customerId,
                                                     @RequestParam("page") Integer page,
                                                     @RequestParam("size") Integer size ) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(billService.findByCustomer(customerId, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Bill not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody BillModel billModel) {
        return billService.upload(billModel)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("Internal Server Error"));

    }

}