package com.example.demo.feedback.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class FeedbackModel {

    private Integer feedbackId;

    private String feedbackCode;

    private String feedbackNote;

    private Integer customerId;

}
