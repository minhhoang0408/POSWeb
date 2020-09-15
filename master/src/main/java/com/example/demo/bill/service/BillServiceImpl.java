package com.example.demo.bill.service;

import com.example.demo.bill.entity.Bill;
import com.example.demo.bill.entity.BillItems;
import com.example.demo.bill.entity.BillItemsId;
import com.example.demo.bill.repo.BillRepo;
import com.example.demo.bill.repo.BillItemsRepo;
import com.example.demo.bill.model.BillModel;
import com.example.demo.customer.repo.CustomerRepo;
import com.example.demo.product.model.ProductQuantityModel;
import com.example.demo.product.repo.ProductRepo;
import com.example.demo.product.service.ProductService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillItemsRepo billItemsRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductService productService;

    @Override
    public Page<Bill> findAllByPage(Pageable pageable) {
        try {
            return billRepo.findAllByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Bill> findBillByCode(String code,Pageable pageable) {
        try {
            return billRepo.findBillByCode(code, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findBillByCode error" + ex.toString());
            return null;
        }
    }

    @Override
    public Optional<Bill> findById(Integer billId) {
        try {
            return billRepo.findById(billId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Optional<Bill> findFullInfoById(Integer billId) {
        try {
            return billRepo.findById(billId)
                    .map(bill -> {
                        bill.setBillItemsList(billItemsRepo.findByBillId(billId));
                        return Optional.of(bill);
                    })
                    .orElse(Optional.empty());
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findFullInfoById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Page<Bill> findByCustomer(Integer customerId, Pageable pageable) {
        try {
            return billRepo.findByCustomer(customerId, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findCustomer error" + ex.toString());
            return null;
        }
    }

    @Override
    @Transactional
    public Optional<Bill> upload(BillModel bm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());

        try {
            Bill b = Bill.builder()
                    .totalPrice(bm.getTotalPrice())
                    .discount(bm.getDiscount())
                    .cashIn(bm.getCashIn())
                    .cashOut(bm.getCashOut())
                    .billNote(bm.getBillNote())
                    .customer(customerRepo.findById(bm.getCustomerId()).orElse(null))
                    .createOn(now)
                    .build();
            if (billRepo.save(b) == null) throw new HibernateException("Can't insert new Bill");

            List<BillItems> billItemsList = bm.getBillItemsModel()
                    .stream()
                    .map(billItemsModel -> {
                        //tru kho
                        ProductQuantityModel productQuantityModel = new ProductQuantityModel();
                        productQuantityModel.setQuantity(billItemsModel.getQuantity());
                        productQuantityModel.setProdId(billItemsModel.getProdId());
                        productService.updateProductQuantity(productQuantityModel);
                        return BillItems.builder()
                                .billItemsId(new BillItemsId(b.getBillId(), billItemsModel.getProdId()))
                                .bill(b)
                                .product(productRepo.findById(billItemsModel.getProdId()).orElse(null))
                                .priceOut(billItemsModel.getPriceOut())
                                .quantity(billItemsModel.getQuantity())
                                .totalPrice(billItemsModel.getTotalPrice())
                                .discount(billItemsModel.getDiscount())
                                .build();
                    })
                    .collect(Collectors.toList());
            if (billItemsRepo.saveAll(billItemsList) == null) throw new HibernateException("Can't insert new Bill");

            b.setBillCode("HD" + b.getBillId());

            b.setBillItemsList(billItemsList);

            return Optional.ofNullable(billRepo.save(b));

        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return Optional.empty();
        }
    }

}

