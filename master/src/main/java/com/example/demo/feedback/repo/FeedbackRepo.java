package com.example.demo.feedback.repo;

import com.example.demo.feedback.entity.Feedback;
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
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {

    @Query(value = "select f from Feedback f")
    Page<Feedback> findAllByPage(Pageable pageable);

    @Query(value = "select f from Feedback f where f.feedbackId = ?1")
    Optional<Feedback> findById(Integer feedbackId);

    @Query(value = "select f from Feedback f where f.customer.customerId = :id")
    Page<Feedback> findByCustomerId(@Param("id") Integer customerId, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "delete from Feedback f where f.feedbackId= ?1")
    int deleteByIdFeedback(Integer feedbackId);

}
