import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';



const theme = createTheme({
    palette: {
        veryperi: {
            main: '#6667AB',
            contrastText: '#fff',
        },
    },
});

function Login() {
    // 이메일 입력 부분
    const [email, setEmail] = React.useState('');
    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    // 비밀번호 입력 부분
    const [password, setPassword] = React.useState('');
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    // 임시 출력 부분
    const print = () => {
        console.log(email)
        console.log(password)
    }

    return (
        <>
            <div className='loginform'>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                >
                    <TextField
                        label="이메일"
                        value={email}
                        onChange={emailChange}
                    />
                    <br />
                    <TextField
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        autoComplete="current-password"
                    />
                    <br />
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="veryperi" onClick={print}>로그인</Button>
                    </ThemeProvider>
                    <br />
                    {/* 임시 소셜 로그인 */}
                    <Link href="#" underline="none">네이버</Link>
                    <Link href="#" underline="none">카카오</Link>
                    <Link href="#" underline="none">구글</Link>
                    <br />
                    <Link href="pwInquiry" underline="none">비밀번호 찾기</Link>
                    <Link href="#" underline="none">회원가입</Link>
                </Box>
            </div></>
    );
}

export default Login;