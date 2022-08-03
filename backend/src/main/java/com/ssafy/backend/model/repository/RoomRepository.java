package com.ssafy.backend.model.repository;

import com.ssafy.backend.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
