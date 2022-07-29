package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.User;

public interface BoardService {
    public void createBoard(User user, BoardDto board);
}
