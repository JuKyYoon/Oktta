package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;

public interface BoardService {
    public boolean createBoard(String nickname, BoardDto board);
}
