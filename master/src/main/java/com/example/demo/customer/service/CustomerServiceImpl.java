package com.example.demo.customer.service;

import com.example.demo.customer.entity.Customer;
import com.example.demo.customer.model.CustomerModel;
import com.example.demo.customer.repo.CustomerRepo;
import com.example.demo.customer.service.CustomerService;
import org.hibernate.HibernateException;
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
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public Page<Customer> findAllActiveByPage(Pageable pageable) {
        try {
            return customerRepo.findAllActiveByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllActiveByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<Customer> findById(Integer customerId) {
        try {
            return customerRepo.findById(customerId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }


    @Override
    public Page<Customer> findActiveCustomer(String name, Pageable pageable) {
        try {
            return customerRepo.findActiveCustomer(name, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findActiveCustomer error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Customer> findAllByPage(Pageable pageable) {
        try {
            return customerRepo.findAllByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Customer> findCustomer(String name, Pageable pageable) {
        try {
            return customerRepo.findCustomer(name, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findCustomer error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<Customer> findCustomerByPhone(String phone) {
        try {
            return customerRepo.findCustomerByPhone(phone);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Customer> update(CustomerModel cm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            return customerRepo.findById(cm.getCustomerId())
                    .map(customer -> {
                        if(cm.getCustomerName().equals("") || cm.getCustomerName() == null) {
                            customer.setCustomerName(customer.getCustomerName());
                        } else customer.setCustomerName(cm.getCustomerName());
                        if(cm.getPhone().equals("") || cm.getPhone() == null) {
                            customer.setPhone(customer.getPhone());
                        } else customer.setPhone(cm.getPhone());

                        customer.setEmail(cm.getEmail());
                        customer.setAddress(cm.getAddress());
                        customer.setGender(cm.getGender());
                        customer.setDob(cm.getDob());
                        customer.setDeleted(cm.getDeleted());
                        customer.setUpdateOn(now);
                        return Optional.ofNullable(customerRepo.save(customer));
                    })
                    .orElse(Optional.empty());
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Customer> upload( CustomerModel cm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            Customer customer = Customer.builder()
                    .customerName(cm.getCustomerName())
                    .phone(cm.getPhone())
                    .email(cm.getEmail())
                    .address(cm.getAddress())
                    .gender(cm.getGender())
                    .dob(cm.getDob())
                    .deleted(false)
                    .createOn(now)
                    .updateOn(now)
                    .build();
            if (customerRepo.save(customer) == null) throw new HibernateException("Can't insert new Customer");
            customer.setCustomerCode("KH" + customer.getCustomerId());
            return Optional.ofNullable(customerRepo.save(customer));
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean deleteById(Integer customerId) {
        try {
            return customerRepo.deleteByIdCustomer(customerId) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("deleteById error" + ex.toString());
            return false;
        }
    }

}
