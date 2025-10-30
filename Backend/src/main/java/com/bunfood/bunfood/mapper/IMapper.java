package com.bunfood.bunfood.mapper;

public interface IMapper<E, ReqDTO, ResDTO> {
    E convertToEntity(ReqDTO dto);

    ResDTO convertToResDTO(E entity);
}