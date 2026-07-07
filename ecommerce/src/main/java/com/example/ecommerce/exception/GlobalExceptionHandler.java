package com.example.ecommerce.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {



    // Resource Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> handleNotFound(
            ResourceNotFoundException ex
    ){

        Map<String,String> error =
                new HashMap<>();

        error.put(
                "message",
                ex.getMessage()
        );

        return error;
    }




    // Illegal Argument / Validation Error
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleBadRequest(
            IllegalArgumentException ex
    ){

        Map<String,String> error =
                new HashMap<>();

        error.put(
                "message",
                ex.getMessage()
        );

        return error;
    }





    // General Exception
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String,String> handleGeneralError(
            Exception ex
    ){

        Map<String,String> error =
                new HashMap<>();

        error.put(
                "message",
                "Something went wrong"
        );

        return error;
    }

}