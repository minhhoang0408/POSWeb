package com.example.demo.feedback.service;

import com.example.demo.customer.repo.CustomerRepo;
import com.example.demo.feedback.repo.FeedbackRepo;
import com.example.demo.feedback.entity.Feedback;
import com.example.demo.customer.entity.Customer;
import com.example.demo.feedback.model.FeedbackModel;
import com.example.demo.feedback.service.FeedbackService;
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
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public Optional<Feedback> findById(Integer feedbackId) {
        try {
            return feedbackRepo.findById(feedbackId);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findById error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    public Page<Feedback> findAllByPage(Pageable pageable) {
        try {
            return feedbackRepo.findAllByPage(pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findAllByPage error" + ex.toString());
            return null;
        }
    }

    @Override
    public Page<Feedback> findByCustomerId(Integer customerId, Pageable pageable) {
        try {
            return feedbackRepo.findByCustomerId(customerId, pageable);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("findByCustomerId error" + ex.toString());
            return null;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Optional<Feedback> update(FeedbackModel fm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            return customerRepo.findById(fm.getCustomerId())
                    .map(cus -> {
                        return feedbackRepo.findById(fm.getFeedbackId())
                                .map(feedback -> {
                                    feedback.setFeedbackNote(fm.getFeedbackNote());
                                    feedback.setUpdateOn(now);
                                    feedback.setCustomer(cus);
                                    return Optional.ofNullable(feedbackRepo.save(feedback));
                                })
                                .orElse(Optional.empty());
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
    public Optional<Feedback> upload(FeedbackModel fm) {
        Date date = new Date();
        Timestamp now = new Timestamp(date.getTime());
        try {
            Customer cus = customerRepo.findById(fm.getCustomerId()).orElse(null);
            Feedback feedback = Feedback.builder()
                    .feedbackNote(fm.getFeedbackNote())
                    .createOn(now)
                    .updateOn(now)
                    .customer(cus)
                    .build();
            if (feedbackRepo.save(feedback) == null) throw new HibernateException("Can't insert new Feedback");
            feedback.setFeedbackCode("FB" + feedback.getFeedbackId());
            return Optional.ofNullable(feedbackRepo.save(feedback));
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("upload error" + ex.toString());
            return Optional.empty();
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public boolean deleteById(Integer feedbackId) {
        try {
            return feedbackRepo.deleteByIdFeedback(feedbackId) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("deleteById error" + ex.toString());
            return false;
        }
    }

}
