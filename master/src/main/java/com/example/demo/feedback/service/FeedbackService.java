package com.example.demo.feedback.service;

import com.example.demo.feedback.entity.Feedback;
import com.example.demo.feedback.model.FeedbackModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface FeedbackService {

    Optional<Feedback> findById(Integer feedbackId);

    Page<Feedback> findAllByPage(Pageable pageable);

    Page<Feedback> findByCustomerId(Integer customerId, Pageable pageable);

    Optional<Feedback> upload(FeedbackModel feedbackModel);

    Optional<Feedback> update(FeedbackModel feedbackModel);

    boolean deleteById(Integer idProd);
}