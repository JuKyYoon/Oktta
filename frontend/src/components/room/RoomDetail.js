import React from "react";

const ArticleDetail = () => {
  // 원래는 불러올 것인데 일단은 더미 데이터로 테스트
  const [title, content, userId, createDate] = [
    "이거 누가 잘못한겨>?",
    "아니 룰루 개못해",
    "양택훈",
    "2022-08-01 오후 3:51",
  ];

  return (
    <div>
      <h2>게시물 상세 페이지</h2>
      <div className="article_header">
        <div>{title}</div>
        <div>{userId}</div>
        <div>{createDate}</div>
      </div>
      <div className="article_body">{content}</div>
    </div>
  );
};

export default ArticleDetail;
