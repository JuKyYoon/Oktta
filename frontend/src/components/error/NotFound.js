import React from "react";

const NotFound = () => {
  return (
    <div id="container">
      <h1>
        죄송합니다.
        <br />
        요청하신 페이지를 찾을 수 없습니다.
      </h1>
      <div className="content">
        <p>
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
        <p>
          관련 문의사항은 <strong>주경이</strong>
          에게 알려주시면 친절하게 안내해 드리겠습니다.
        </p>
        <p>감사합니다.</p>
      </div>
    </div>
  );
};

export default NotFound;
