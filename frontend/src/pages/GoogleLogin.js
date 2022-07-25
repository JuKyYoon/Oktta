import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleLoginRequest } from "../services/userService.js";

const GoogleLogin = () => {
  const [user, setUser] = useState({});
  const src = "https://accounts.google.com/gsi/client";

  const dispatch = useDispatch();
  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    dispatch(googleLoginRequest(response.credential));
    // var userObject = jwt_decode(response.credential);
    // console.log(userObject);
    // setUser(userObject);
    document.getElementById("googleDiv").hidden = true;
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("googleDiv").hidden = false;
  };

  // global google
  const global_google = () => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("googleDiv"), {
      theme: "outline",
      size: "large",
    });
    // Google One Tap Login
    // 위치 옮기거나 쓰지 않거나
    google.accounts.id.prompt();
  };

  useEffect(() => {
    // add script
    if (!document.getElementById("google_login")) {
      const script = document.createElement("script");
      script.id = "google_login";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        global_google();
      };
      document.body.appendChild(script);
    } else {
      global_google();
    }
    document.body.removeChild(document.getElementById("google_login"));
  }, []);

  return (
    <>
      <div id="googleDiv"></div>
      {
        // 로그인이 되어있을 때 로그아웃 버튼
        Object.keys(user).length != 0 && (
          <button onClick={handleSignOut}>로그아웃</button>
        )
      }
    </>
  );
};

export default GoogleLogin;
