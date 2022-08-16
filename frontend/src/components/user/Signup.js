import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import {
  checkEmailRequest,
  checkNicknameRequest,
  signupRequest,
} from "../../services/userService";
import { debounce } from "lodash";
import { useNavigate } from "react-router";

const debounceFunc = debounce(async (value, request, setState) => {
  const result = await request(value)
  if (result?.data?.message) {
    setState(result?.data?.message)
  } else {
    alert('올바르지 않은 접근입니다.')
  };
}, 500);

const formData = new FormData();

const Signup = () => {
  // input값들 useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  // 유효성 확인 결과 변수
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  // 이메일, 닉네임 중복체크 useState
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [banned, setBanned] = useState(false);

  const [uploadOpen, setUploadOpen] = useState(false);
  const navigate = useNavigate();

  const emailChange = (event) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const isEmailValid = regEmail.test(event.target.value.trim());

    setEmail(event.target.value.trim());
    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      debounceFunc(
        event.target.value.trim(),
        checkEmailRequest,
        setEmailChecked
      );
    }
  };

  const passwordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
    const isPasswordValid = regPassword.test(event.target.value.trim());

    setPassword(event.target.value.trim());
    setIsPasswordValid(isPasswordValid);

    if (event.target.value.trim() && isPasswordValid) {
      setIsPasswordSame(
        event.target.value.trim() && event.target.value.trim() === passwordCheck
      );
    }
  };

  const passwordCheckChange = (event) => {
    setPasswordCheck(event.target.value.trim());
    setIsPasswordSame(password === event.target.value.trim());
  };

  const nicknameChange = (event) => {
    setNickname(event.target.value.trim());
    setNicknameChecked(false);

    if (event.target.value.trim()) {
      const regNickname = /[^\w\sㄱ-힣]|[\_]/g;
      const isNicknameValid = !regNickname.test(event.target.value.trim());
      setIsNicknameValid(isNicknameValid);

      const banned = event.target.value.trim().includes('deleteuser') || event.target.value.trim() === '알수없음' || event.target.value.trim().length > 10;
      setBanned(banned);

      if (isNicknameValid && !banned) {
        setNicknameChecked(false);
        debounceFunc(
          event.target.value.trim(),
          checkNicknameRequest,
          setNicknameChecked
        );
      }
    }
  };

  // 회원가입 구현 부분
  const handleSubmit = async () => {
    const user = {
      id: email,
      password: password,
      nickname: nickname,
    };

    formData.delete('user');
    formData.append('user', new Blob([JSON.stringify(user)], { type: "application/json" }));

    if (formData.get('profileImg') === null) {
      formData.append('profileImg', new Blob([], { type: "image/png" }));
    };

    const result = await signupRequest(formData);
    if (result?.data?.message === "success") {
      alert("회원가입을 축하드립니다! \n이메일을 확인하여 이메일 인증을 완료해주세요.");
      navigate("/user/login");
    } else if (result?.data?.message === "fail") {
      alert("회원가입에 실패하였습니다!");
    } else {
      alert('잘못된 파일 형식입니다.');
    };
  };

  const profileSelect = useRef();
  const profileShow = useRef();
  const fileUpload = () => {
    profileSelect.current.onClick = handleFileInput();
    profileSelect.current.click();
  }

  const handleFileInput = (event) => {
    if (!uploadOpen) {
      setUploadOpen(true);
    }
    else {
      const file = event?.target?.files[0];
      if (file) {
        profileShow.current.style.display = '';
        profileShow.current.src = URL.createObjectURL(file);
        console.log(file);
        formData.append('profileImg', new Blob([file], { type: file.type }), file.name);
      }
      else {
        const getFile = formData?.get('profileImg');
        if (getFile) {
          formData.append('profileImg', getFile, getFile.name);
        }
      };
      setUploadOpen(false);
    }
  };

  const delProfile = () => {
    if (formData.get('profileImg')) {
      formData.delete('profileImg');
    }
    profileShow.current.style.display = 'none';
  }

  return (
    <div className="signup">
    <div className="signup-form">
      <h2>회원가입</h2>
      <br />
      <FormControl sx={{width: 315}}>
        <InputLabel htmlFor="email" color="veryperi">
          이메일
        </InputLabel>
        <Input
          id="email"
          color="veryperi"
          value={email}
          onChange={emailChange}
          />
        <FormHelperText
          error={!!email && (!isEmailValid || emailChecked === "fail")}
          >
          {email
            ? isEmailValid
            ? emailChecked
            ? emailChecked === 'success'
            ? '사용 가능한 이메일입니다.'
            : '이미 사용중인 이메일입니다.'
            : '이메일 중복 여부를 확인중입니다.'
            : '유효하지 않은 이메일입니다.'
            : '이메일을 입력해 주세요.'}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl sx={{width: 315}}>
        <InputLabel htmlFor="password" color="veryperi">
          비밀번호
        </InputLabel>
        <Input
          id="password"
          type="password"
          color="veryperi"
          value={password}
          onChange={passwordChange}
          />
        <FormHelperText error={!!password && !isPasswordValid}>
          {isPasswordValid
            ? "안전한 비밀번호입니다."
            : "영문 + 숫자 조합으로 8~16자로 설정해주세요."}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl sx={{width: 315}}>
        <InputLabel htmlFor="passwordCheck" color="veryperi">
          비밀번호 확인
        </InputLabel>
        <Input
          type="password"
          color="veryperi"
          value={passwordCheck}
          onChange={passwordCheckChange}
          />
        <FormHelperText error={!!passwordCheck && !isPasswordSame}>
          {!passwordCheck || isPasswordSame
            ? " "
            : "비밀번호가 일치하지 않습니다."}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{width: 315}}>
        <InputLabel htmlFor="nickname" color="veryperi">
          닉네임
        </InputLabel>
        <Input color="veryperi" value={nickname} onChange={nicknameChange} />
        <FormHelperText
          error={!!nickname && (!isNicknameValid || nicknameChecked === "fail" || banned)}
          >
          {nickname
            ? isNicknameValid
            ? !banned
            ? nicknameChecked
            ? nicknameChecked === 'success'
            ? '사용 가능한 닉네임입니다.'
            : '이미 사용중인 닉네임입니다.'
            : '닉네임 중복 여부를 확인중입니다.'
            : '사용할 수 없는 닉네임입니다.'
            : '닉네임에 특수문자를 사용할 수 없습니다.'
            : '10글자 이하의 닉네임을 입력해주세요.'}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl sx={{width: 315}}>
        <p>프로필 이미지 업로드 (선택)</p>
        <div className="signup-profile">
          <div className="profile-left">
            <Button onClick={fileUpload}>업로드</Button>
            <Button onClick={delProfile}>삭제</Button>
          </div>
          <input
            type='file'
            accept='image/*'
            onChange={event => handleFileInput(event)}
            style={{ display: 'none' }}
            id='profileUploadBtn'
            ref={profileSelect}
            />
            <div className="signup-profile-image">
              <img src="#" alt="profile-image" ref={profileShow} style={{ display: 'none'}} />
            </div>
        </div>
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        color="veryperi"
        onClick={handleSubmit}
        disabled={
          !isEmailValid ||
          emailChecked !== "success" ||
          !isPasswordValid ||
          !isPasswordSame ||
          !isNicknameValid ||
          banned ||
          !nickname ||
          nicknameChecked !== "success"
        }
        >
        가입하기
      </Button>
    </div>
  </div>
  );
};

export default Signup;
