package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardDto;
import com.ssafy.backend.model.entity.User;

import java.util.List;

public interface BoardService {
    public BoardDto detailBoard(Long idx);
    public void createBoard(User user, BoardDto boardDto);
    public int updateHit(Long idx);
    public List<BoardDto> getBoardList(int category, int limit, int page);
    public int getLastPage(int category, int limit);
    public boolean deleteBoard(String id, Long idx);
    public boolean updateBoard(String id, Long idx, BoardDto boardDto);
}
