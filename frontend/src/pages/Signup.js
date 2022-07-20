import React, {useState} from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';




const Signup = () => {

    // 테마색 설정
    const theme = createTheme({
        palette: {
            veryperi: {
                main: '#6667AB',
                contrastText: '#fff',
                },
        },
    });



    // input값들 useState
    const [email, setEmail] = useState("");
    const emailChange = (event) => {
        setEmail(event.target.value);
        
    }

    const [pw, setPw] = useState("");
    const pwChange = (event) => {
        setPw(event.target.value);
        
    }

    const [pwCheck, setPwCheck] = useState("");
    const pwCheckChange = (event) => {
        setPwCheck(event.target.value);
        
    }

    const [nickNm, setNickNm] = useState("");
    const nickNmChange = (event) => {
        setNickNm(event.target.value);
        
    }

    // 이메일, 닉네임 중복체크 useState
    const [emailChecked, setEmailChecked] = useState(false);
    const [nickNmChecked, setNickNmChecked] = useState(false);


    // 회원가입버튼 클릭시 함수
    const handleSubmit = () =>{
        if(pw !== pwCheck){
            alert("비밀번호를 확인해주세요")
        } else if(emailChecked && nickNmChecked){
            // 회원가입 요청 보내기
        }
    }

    // 이메일 중복체크
    const verifyEmail = () =>{
        // 중복된 이메일 체크 후!!
        // 중복된 이메일이 없으면
        setEmailChecked(true);
        // 중복된 이메일이 있으면
        alert("이메일이 중복되었습니다.")
    }

    // 닉네임 중복체크
    const verifyNickNm = () =>{
        // 중복된 닉네임 체크 후!!
        // 중복된 닉네임 없으면
        setNickNmChecked(true);
        // 중복된 닉네임이 있으면
        alert("닉네임이 중복되었습니다.")
    }
    
    return (
        <div>
        <img src="/assets/oktta_logo.jpg"></img>
        <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
            
            <h2>회원가입</h2>
            <div>
            <FormControl>
                <InputLabel htmlFor="email" color='veryperi'>이메일</InputLabel>
                <Input id="email" aria-describedby="email-helper-text" color='veryperi' value={email} onChange={emailChange}/>
                <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
                <Button variant="outlined" color="veryperi" onClick={verifyEmail}>중복확인</Button>
            </div>
            <br/>
            <div>
            <FormControl>
                <InputLabel htmlFor="pw" color='veryperi'>비밀번호</InputLabel>
                <Input id="pw" type='password' aria-describedby="pw-helper-text" color='veryperi' value={pw} onChange={pwChange}/>
                <FormHelperText id="pw-helper-text">영문 + 숫자 조합으로 8자 이상으로 설정해주세요</FormHelperText>
            </FormControl>
            </div>
            <br/>
            <div>
            <FormControl>
                <InputLabel htmlFor="pwCheck" color='veryperi' >비밀번호 확인</InputLabel>
                <Input id="pwCheck" type='password' aria-describedby="pwCheck-helper-text"  color='veryperi' value={pwCheck} onChange={pwCheckChange}/>
                <FormHelperText id="pwCheck-helper-text">비밀번호가 같아야합니다.</FormHelperText>
            </FormControl>
            </div>
            <br/>
            <div>
            <FormControl>
                <InputLabel htmlFor="nickNm" color='veryperi'>닉네임</InputLabel>
                <Input id="nickNm" aria-describedby="nickNm-helper-text"  color='veryperi' value={nickNm} onChange={nickNmChange}/>
            </FormControl>
                <Button variant="outlined" color="veryperi" onClick={verifyNickNm}>중복확인</Button>
            </div>
            <br/><br/>
            <div>
            <Button variant="contained" color="veryperi" onClick={handleSubmit}>회원가입하기</Button>
            </div>
            
        </Container>
        </ThemeProvider>
            

        </div>
        
    )
}

export default Signup;