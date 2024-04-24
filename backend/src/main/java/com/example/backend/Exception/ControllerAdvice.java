package com.example.backend.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.NativeWebRequest;
import org.zalando.problem.Problem;
import org.zalando.problem.Status;
import org.zalando.problem.spring.web.advice.ProblemHandling;

@RestControllerAdvice
public class ControllerAdvice implements ProblemHandling{
    @ExceptionHandler(Exception.class)
    public void todoException(Exception ex, NativeWebRequest request) {
        ex.printStackTrace();
        Problem problem = Problem.builder().withStatus(Status.INTERNAL_SERVER_ERROR)
                .withDetail(ex.getMessage()).build();

    }
}
