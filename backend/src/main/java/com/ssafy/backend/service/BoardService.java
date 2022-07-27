package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;

public interface BoardService {
    public void createBoard(Long idx, BoardDto board);
}
