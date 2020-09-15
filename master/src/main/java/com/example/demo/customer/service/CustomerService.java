package com.example.demo.customer.service;

import com.example.demo.customer.entity.Customer;
import com.example.demo.customer.model.CustomerModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Page<Customer> findAllActiveByPage(Pageable pageable);

    Optional<Customer> findById(Integer customerId);

    Page<Customer> findActiveCustomer(String name, Pageable pageable);

    Page<Customer> findAllByPage(Pageable pageable);

    Page<Customer> findCustomer(String name, Pageable pageable);

    Optional<Customer> findCustomerByPhone(String phone);

    Optional<Customer> upload(CustomerModel customerModel);

    Optional<Customer> update(CustomerModel customerModel);

    boolean deleteById(Integer customerId);

}
