package com.example.demo.exception;

import lombok.Data;

@Data
public class ProductQuantityException extends RuntimeException  {
    private String message;
    public ProductQuantityException(){
        this.message = "Số lượng sản phẩm trong kho không đủ";
    }
}
