import React, { useState } from "react";
import { Alert, Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { sendEmail } from "../../services/userService";

const BeforeEmailAuth = () => {
  const [clicked, setClicked] = useState(false);

  // 인증메일 보내기
  const sendEmailHandler = () => {
    setClicked(true);
    sendEmail()
      .then((res) => {})
      .catch((err) => console.log(err));
    alert("인증 이메일을 발송하였습니다.");
  };

  return (
    <Stack direction="row" spacing={2}>
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
    </Stack>
  );
};

export default BeforeEmailAuth;
