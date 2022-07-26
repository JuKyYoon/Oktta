import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const theme = createTheme({
  palette: {
    veryperi: {
      main: "#6667AB",
      contrastText: "#fff",
    },
  },
});

function PwInquiry() {
  // 이메일 입력 부분
  const [email, setEmail] = React.useState("");
  const emailUpdate = (event) => {
    setEmail(event.target.value);
  };
  const print = () => {
    console.log(email);
  };

  // 이메일 코드 입력 부분
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
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
          onClick={handleClickOpen}
          size="large"
          type="submit"
        >
          다음
        </Button>
        {/* 이메일 코드 입력 부분 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>코드 확인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              이메일에 보낸 코드를 입력하세요.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="이메일 코드"
              type="email"
              fullWidth
              variant="standard"
              color="veryperi"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            {/* 코드 유효한지 확인 기능 넣어야 합니다. */}
            <Button onClick={handleClose}>확인</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default PwInquiry;
