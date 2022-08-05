package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.CommentDto;
import com.ssafy.backend.model.entity.Comment;
import com.ssafy.backend.model.repository.CommentRepository;
import com.ssafy.backend.model.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    private static final Logger LOGGER = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<CommentDto> getCommentList(Long boardIdx, int category) {
        List<Comment> commentList = commentRepository.findCommentsByBoardIdxAndCategory(boardIdx, category);
        List<CommentDto> list = new ArrayList<>();

        for(Comment c : commentList){
            String nickname = userRepository.findNicknameByIdx(c.getUser().getIdx());
            list.add(new CommentDto(nickname, c.getContent(), c.getCreateTime()));
        }

        return list;
    }
}
