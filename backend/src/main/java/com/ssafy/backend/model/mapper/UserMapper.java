package com.ssafy.backend.model.mapper;

import com.ssafy.backend.model.dto.UserDto;
import com.ssafy.backend.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper extends EntityMapper<UserDto, User> {
    UserMapper mapper = Mappers.getMapper(UserMapper.class);

    @Override
    @Mapping(target = "password", constant = "secret")
    UserDto toDto(final User entity);

    @Override
    User toEntity(final UserDto dto);
}
