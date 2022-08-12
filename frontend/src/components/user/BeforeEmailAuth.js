import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { sendEmail } from "../../services/userService";

const BeforeEmailAuth = () => {
  const [clicked, setClicked] = useState(false);

  // 인증메일 보내기
  const sendEmailHandler = async () => {
    setClicked(true);
    const result = await sendEmail();
    if (result?.data?.message === "success") {
      alert("인증 이메일을 다시 발송하였습니다.");
    }
    else {
      alert("인증 이메일 전송에 실패하였습니다.");
      setClicked(false);
    };
  };

  return (
    <div className="email-auth-notice">
      <Alert severity="warning">
        이메일을 인증해서 OKTTA의 모든 서비스를 이용해보세요!
      </Alert>
      <Button
        disabled={clicked}
        color="error"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={sendEmailHandler}
      >
        인증 메일 보내기
      </Button>
    </div>
  );
};

export default BeforeEmailAuth;
