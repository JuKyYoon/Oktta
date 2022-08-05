package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.CommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto> getCommentList(Long boardIdx, int category);
}
