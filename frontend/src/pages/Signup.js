import React, {useState} from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkEmailRequest, checkNicknameRequest} from '../services/userService';
import { debounce } from 'lodash';



const debounceFunc = debounce((value, func)=>{func(value)
}, 1000)


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
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isPwValid, setIsPwValid] = useState(false);
    
    
    const emailChange = (event) => {
        setEmail(event.target.value);
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        setIsEmailValid(regEmail.test(event.target.value))
        if (isEmailValid) {
            setEmailChecked(debounceFunc(event.target.value, checkEmailRequest));
        }
        
    }

    const [pw, setPw] = useState("");
    const pwChange = (event) => {
        setPw(event.target.value);
        if(event.target.value){
            setIsPwValid(event.target.value === pwCheck)
        }
        
    }

    const [pwCheck, setPwCheck] = useState("");
    const pwCheckChange = (event) => {
        setPwCheck(event.target.value);
        if(event.target.value){
            setIsPwValid(pw === event.target.value)
        }
        
    }



    const [nickname, setNickname] = useState("");
    const nicknameChange = (event) => {
        setNickname(event.target.value);
        
        if(event.target.value){
            const regNickname = /[^\w\sㄱ-힣]|[\_]/g;
            setIsNicknameValid(!regNickname.test(event.target.value))
            if(isNicknameValid){
                setNicknameChecked(debounceFunc(event.target.value, checkNicknameRequest));
            }
        }
        
    }

    // 이메일, 닉네임 중복체크 useState
    // 바뀔때마다 db에서 체크하는 기능 구현하기!!!!!!!!
    const [emailChecked, setEmailChecked] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);


    // 회원가입버튼 클릭시 함수
    const handleSubmit = () =>{
        if(pw !== pwCheck){
            alert("비밀번호를 확인해주세요")
        } else if(emailChecked && nickNmChecked){
            // 회원가입 요청 보내기
        }
    }

   

  
    
    return (
        <div>
        
        <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
            
            <h2>회원가입</h2>
            <div>
            <FormControl>
                <InputLabel htmlFor="email" color='veryperi'>이메일</InputLabel>
                <Input id="email" aria-describedby="email-helper-text" color='veryperi' value={email} onChange={emailChange}/>
                <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <p>
                {isEmailValid ? (emailChecked ? "중복됨!" : "사용할수 있음") : "이메일 형식에 맞춰주세요"}
            </p>
                
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
                <InputLabel htmlFor="nickname" color='veryperi'>닉네임</InputLabel>
                <Input id="nickname" aria-describedby="nickNm-helper-text"  color='veryperi' value={nickname} onChange={nicknameChange}/>
                <FormHelperText id="nickname-helper-text">특수문자를 제외한 닉네임을 입력해주세요</FormHelperText>
            </FormControl>
                <p>
                    {isNicknameValid ? (nicknameChecked ? "중복됨!" : "사용할수 있음") : "닉네임 형식에 맞춰주세요"}
                </p>
            </div>
            <br/><br/>
            <div>
            <Button variant="contained" color="veryperi" onClick={handleSubmit} disabled={ !isPwValid}>회원가입하기</Button>
            </div>
            
        </Container>
        </ThemeProvider>
            

        </div>
        
    )
}

export default Signup;