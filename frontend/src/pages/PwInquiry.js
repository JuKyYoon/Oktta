import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";

const PwInquiry = () => {
  // 이메일 입력 부분
  const [email, setEmail] = React.useState("");
  const emailUpdate = (event) => {
    setEmail(event.target.value);
  };

  const emailSend = () => {
    // 비밀번호 변경을 위해 이메일 전송하는 함수를 넣어야 합니다.
  };

  return (
    <div className="form">
      <h2>비밀번호 찾기</h2>
      <TextField
        helperText="비밀번호를 찾고자 하는 이메일을 입력해 주세요."
        label="이메일"
        type="email"
        value={email}
        onChange={emailUpdate}
        color="veryperi"
      />
      <br />
      <Button
        variant="contained"
        color="veryperi"
        onClick={emailSend}
        size="large"
        type="submit"
      >
        다음
      </Button>
    </div>
  );
}

export default PwInquiry;
