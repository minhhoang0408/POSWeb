package com.example.demo.feedback.entity;

import com.example.demo.customer.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table( schema = "sapo_server", name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer feedbackId;

    @Column(name = "code")
    private String feedbackCode;

    @Column(name = "note")
    private String feedbackNote;

    @Column(name = "create_on")
    private Timestamp createOn;

    @Column(name = "update_on")
    private Timestamp updateOn;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
