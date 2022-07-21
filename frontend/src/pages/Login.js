import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


// 색깔 생성 부분
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
    const [email, setEmail] = useState('');
    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    // 비밀번호 입력 부분
    const [password, setPassword] = useState('');
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    // 임시 출력 부분
    const print = () => {
        console.log(email)
        console.log(password)
    };

    const dispatch = useDispatch();

    // 로그인 구현 부분
    const onSubmitHandler = (event) => {
        const data = {
            id: email,
            password: password,
        };

        dispatch(Login(data))
            .then((res) => {
                console.log(res);
            })
    };

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
                        onChange={onEmailHandler}
                    />
                    <br />
                    <TextField
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={onPasswordHandler}
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
