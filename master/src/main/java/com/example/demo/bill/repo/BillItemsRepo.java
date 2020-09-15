package com.example.demo.bill.repo;

import com.example.demo.bill.entity.BillItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillItemsRepo extends JpaRepository<BillItems, Integer> {

    @Query(value = "select s from BillItems s where s.bill.billId = ?1")
    List<BillItems> findByBillId(Integer billId);

    @Query(value = "select s from BillItems s where s.product.prodId = ?1")
    List<BillItems> findByProduct(Integer prodId);

}
