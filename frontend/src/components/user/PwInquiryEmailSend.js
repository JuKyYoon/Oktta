import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { pwInquiryEmailSendRequest } from "../../services/userService";


const PwInquiryEmailSend = () => {
  const [email, setEmail] = useState("");
  
  const emailUpdate = (event) => {
    setEmail(event.target.value);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      emailSend();
    }
  }
  
  const emailSend = () => {
    pwInquiryEmailSendRequest(email)
    .then((data) => {
      if (data.message === 'success') {
        alert('이메일이 발송되었습니다.');
        } else {
          alert('유효하지 않은 이메일입니다.');
        }
      })
      .catch()
  };

  return (
    <div className="form">
      <h2>비밀번호 찾기</h2>
        <div>
          <TextField
            helperText="비밀번호를 찾고자 하는 이메일을 입력해 주세요."
            label="이메일"
            type="email"
            value={email}
            onChange={emailUpdate}
            onKeyPress={handleKeyPress}
            color="veryperi"
          />
          <Button
            variant="contained"
            color="veryperi"
            onClick={emailSend}
            size="large"
            type="submit"
          >
            전송
          </Button>
        </div>
    </div>
  );
}

export default PwInquiryEmailSend;
