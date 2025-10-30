package com.bunfood.bunfood.dto;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageResDTO {

    private int currentPage;

    private int totalPages;

    private long totalItems;

    public PageResDTO(Page page) {
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalItems = page.getTotalElements();
    }

    public PageResDTO(int currentPage, int totalPages, long totalItems) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }

}
