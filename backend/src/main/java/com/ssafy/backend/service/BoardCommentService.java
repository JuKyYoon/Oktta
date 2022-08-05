package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.BoardCommentDto;

import java.util.List;

public interface BoardCommentService {
    List<BoardCommentDto> getCommentList(Long boardIdx);
    void createComment(String id, Long idx, BoardCommentDto boardCommentDto);
    boolean updateComment(String id, Long idx, BoardCommentDto boardCommentDto);
    boolean deleteComment(String id, Long idx);
}
