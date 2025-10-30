package com.bunfood.bunfood.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
public class SuccessResDTO<T> {
    private LocalDateTime timestamp;
    private int statusCode;
    private String message;
    private T data;
    private PageResDTO pagination;

    public SuccessResDTO(LocalDateTime timestamp, int statusCode, String message, T data,
            PageResDTO pagination) {
        this.timestamp = LocalDateTime.now();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.pagination = pagination;
    }

}
