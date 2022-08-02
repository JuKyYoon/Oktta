package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.Board;
import com.ssafy.backend.model.entity.User;

import java.util.Map;

public interface BoardService {
    public BoardDto detailBoard(Long idx);
    public void createBoard(User user, BoardDto board);
    public int updateHit(Long idx);
}
