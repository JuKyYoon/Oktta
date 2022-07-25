package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;

public interface BoardService {
    public boolean createBoard(Long idx, BoardDto board);
}
