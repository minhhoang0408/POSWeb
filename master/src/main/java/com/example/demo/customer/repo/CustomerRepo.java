package com.example.demo.customer.repo;

import com.example.demo.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {

    @Query(value = "select c from Customer c where c.deleted = false order by c.updateOn desc")
    Page<Customer> findAllActiveByPage(Pageable pageable);

    @Query(value = "select c from Customer c where c.customerId = ?1")
    Optional<Customer> findById(Integer customerId);

    @Query(value = "select c from Customer c where c.deleted = false and (c.customerName like %:name% or c.phone like %:name%) order by c.updateOn desc")
    Page<Customer> findActiveCustomer(@Param("name") String name, Pageable pageable);

    @Query(value = "select c from Customer c order by c.updateOn desc, c.deleted asc")
    Page<Customer> findAllByPage(Pageable pageable);

    @Query(value = "select c from Customer c where (c.customerName like %:name% or c.phone like %:name%) order by c.updateOn desc, c.deleted asc")
    Page<Customer> findCustomer(@Param("name") String name, Pageable pageable);

    @Query(value = "select c from Customer c where c.phone = :phone")
    Optional<Customer> findCustomerByPhone(@Param("phone") String phone);

    @Modifying
    @Transactional
    @Query(value = "update Customer c set c.deleted = true where c.customerId = ?1")
    int deleteByIdCustomer(Integer customerId);

}

