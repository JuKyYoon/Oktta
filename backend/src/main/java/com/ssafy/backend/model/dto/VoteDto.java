package com.ssafy.backend.model.dto;

import com.ssafy.backend.model.entity.Vote;

public class VoteDto {
    private Long first;
    private Long second;
    private Long third;
    private Long fourth;
    private Long fifth;
    private Long total;

    public VoteDto() {}

    public VoteDto(Vote vote) {
        this.first = vote.getFirst();
        this.second = vote.getSecond();
        this.third = vote.getThird();
        this.fourth = vote.getFourth();
        this.fifth = vote.getFifth();
        this.total = vote.getTotal();
    }

    public Long getFirst() {
        return first;
    }

    public void setFirst(Long first) {
        this.first = first;
    }

    public Long getSecond() {
        return second;
    }

    public void setSecond(Long second) {
        this.second = second;
    }

    public Long getThird() {
        return third;
    }

    public void setThird(Long third) {
        this.third = third;
    }

    public Long getFourth() {
        return fourth;
    }

    public void setFourth(Long fourth) {
        this.fourth = fourth;
    }

    public Long getFifth() {
        return fifth;
    }

    public void setFifth(Long fifth) {
        this.fifth = fifth;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
