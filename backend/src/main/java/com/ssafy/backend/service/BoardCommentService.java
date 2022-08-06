package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardCommentDto;
import com.ssafy.backend.model.dto.RoomCommentDto;

import java.util.List;

public interface BoardCommentService {
    List<BoardCommentDto> getBoardCommentList(Long boardIdx);
    void createBoardComment(String id, Long idx, BoardCommentDto boardCommentDto);
    boolean updateBoardComment(String id, Long idx, BoardCommentDto boardCommentDto);
    boolean deleteBoardComment(String id, Long idx);
}
