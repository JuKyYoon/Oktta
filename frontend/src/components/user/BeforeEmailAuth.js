import React from 'react';
import {
  Alert,
  Container,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendEmail, logoutRequest } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const BeforeEmailAuth = () => {
  // 테마색 설정
  const theme = createTheme({
    palette: {
      veryperi: {
        main: '#6667AB',
        contrastText: '#fff',
      },
    },
  });

  const navigate = useNavigate();

  // 인증메일 보내기
  const sendEmailHandler = () => {
    sendEmail();
    console.log('인증이메일 발송!');
    alert('인증 이메일을 발송하였습니다.');

    logoutRequest();
    navigate('/user/login');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth='lg'>
          <Stack direction='row' spacing={2}>
            <Alert severity='warning'>
              이메일을 인증해서 OKTTA의 모든 서비스를 이용해보세요!
            </Alert>
            <Button
              color='veryperi'
              size='small'
              variant='contained'
              endIcon={<SendIcon />}
              onClick={sendEmailHandler}>
              인증 메일 보내기
            </Button>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default BeforeEmailAuth;
