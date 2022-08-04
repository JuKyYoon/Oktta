package com.ssafy.backend.model.mapper;

import com.ssafy.backend.model.dto.RoomDto;
import com.ssafy.backend.model.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoomMapper extends EntityMapper<RoomDto, Room> {
    RoomMapper mapper = Mappers.getMapper(RoomMapper.class);

    @Override
    RoomDto toDto(final Room entity);

    @Override
    Room toEntity(final RoomDto dto);
}
