package com.bunfood.bunfood.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bunfood.bunfood.dto.FailureResDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<FailureResDTO> handleValidationException(MethodArgumentNotValidException ex) {
        String errorCode = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .findFirst()
                .orElse("Invalid input");

        FailureResDTO response = new FailureResDTO();
        response.setStatusCode(400);
        response.setErrorCode(errorCode);

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<FailureResDTO> handleAccessDenied(AccessDeniedException ex) {
        FailureResDTO response = new FailureResDTO();
        response.setStatusCode(403);
        response.setErrorCode("ACCESS_DENIED");
        response.setMessage("You do not have permission to access this resource.");

        ex.printStackTrace();

        return ResponseEntity.status(403).body(response);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<FailureResDTO> handleApiException(ApiException ex) {
        FailureResDTO response = new FailureResDTO();
        response.setStatusCode(ex.getStatusCode());
        response.setErrorCode(ex.getErrorCode());
        response.setMessage(ex.getMessage());
        return ResponseEntity.status(ex.getStatusCode()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherExceptions(Exception ex) {
        // Vấn đề là những lỗi phát sinh tự động này sẽ để lộ thông tin nhạy cảm
        // => nên hash thông tin 500 + in lỗi ra console cho dev biết!
        ex.printStackTrace();

        FailureResDTO response = new FailureResDTO();
        response.setStatusCode(500);
        response.setErrorCode("INTERNAL_ERROR");
        return ResponseEntity.status(500).body(response);
    }

}
