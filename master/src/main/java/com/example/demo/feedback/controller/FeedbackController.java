package com.example.demo.feedback.controller;

import com.example.demo.json.JsonResult;
import com.example.demo.feedback.model.FeedbackModel;
import com.example.demo.customer.service.CustomerService;
import com.example.demo.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/admin/feedback")
@CrossOrigin("*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/{id}")
    public ResponseEntity<JsonResult> findById(@PathVariable("id") Integer feedbackId) {
        return feedbackService.findById(feedbackId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }


    @GetMapping("/all")
    public ResponseEntity<JsonResult> findAllByPage(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(feedbackService.findAllByPage(pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Feedback not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/customer")
    public ResponseEntity<JsonResult> findByCustomerId(@RequestParam("id") Integer customerId,
                                                       @RequestParam("page") Integer page,
                                                       @RequestParam("size") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return Optional.ofNullable(feedbackService.findByCustomerId(customerId, pageable))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("Feedback not found"))
                .orElse(JsonResult.serverError("Internal Server Error"));

    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody FeedbackModel feedbackModel) {
        return customerService.findById(feedbackModel.getCustomerId())
                .map(cus -> {
                    return feedbackService.upload(feedbackModel)
                            .map(JsonResult::uploaded)
                            .orElse(JsonResult.saveError("Internal Server Error"));
                })
                .orElse(JsonResult.parentNotFound("Customer doesn't exist"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody FeedbackModel feedbackModel) {
        return feedbackService.update(feedbackModel)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("Internal Server Error"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResult> deleteById(@PathVariable("id") Integer feedbackId) {
        if (feedbackService.deleteById(feedbackId)) {
            return JsonResult.deleted();
        }
        return JsonResult.saveError("Internal Server Error");
    }

}
