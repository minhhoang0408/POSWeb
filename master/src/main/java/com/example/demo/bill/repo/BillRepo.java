package com.example.demo.bill.repo;

import com.example.demo.bill.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepo extends JpaRepository<Bill, Integer> {

    @Query(value = "select b from Bill b where b.billId = ?1")
    Optional<Bill> findById(Integer billId);

    @Query(value = "select b from Bill b where b.customer.customerId = :id order by b.createOn desc")
    Page<Bill> findByCustomer(@Param("id") Integer customerId, Pageable pageable);

    @Query(value = "select b from Bill b where b.billCode like %:code% order by b.createOn desc")
    Page<Bill> findBillByCode(@Param("code") String code, Pageable pageable);

    @Query(value = "select b from Bill b order by b.createOn desc")
    Page<Bill> findAllByPage(Pageable pageable);

}
