package com.example.demo.bill.service;

import com.example.demo.bill.entity.Bill;
import com.example.demo.bill.model.BillModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BillService {

    Page<Bill> findAllByPage(Pageable pageable);

    Optional<Bill> findById(Integer billId);

    Page<Bill> findBillByCode(String code, Pageable pageable);

    Optional<Bill> findFullInfoById(Integer billId);

    Page<Bill> findByCustomer(Integer customerId, Pageable pageable);

    Optional<Bill> upload(BillModel billModel);

}
