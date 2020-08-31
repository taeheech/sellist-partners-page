import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "../Images/Close";
import IconRight from "../Images/IconRight";
import Visiblility from "../Images/Visibility";
import VisibilityOff from "../Images/VisibilityOff";
function LogIn() {
  const [loginstate, setLogInState] = useState({
    logInEmail: "",
    logInPassword: "",
  });
  const { logInEmail, logInPassword } = loginstate;
  const isLoginBtnActive = !(logInEmail.length > 0 && logInPassword.length > 0);
  const [error, setError] = useState({ type: 0 });
  const [pwvisibility, setPwVisibility] = useState(false);
  function inputLogin(e) {
    const { name, value } = e.target;
    setLogInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function btnLogin(e) {
    const { logInEmail, logInPassword } = loginstate;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const api = "https://api.buzzikid.com/PartnersApi/member_login.php";
    const formData = new FormData();
    formData.append("email", logInEmail);
    formData.append("password", logInPassword);
    if (!regEmail.test(logInEmail)) {
      setError({ type: 1 });
    } else {
      fetch(api, {
        method: "POST",
        headers: {
          Authorization: "6cz2w6BC9mgpAhKNmmgcSnpEnJX9w34mF3dzzMyAqzBYkBTfEE",
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then((res) => {
          if (res.success === 1) {
            alert("로그인 성공!");
            localStorage.setItem("access_token", res.data.access_token);
          }
          if (res.success === 0) {
            setError({ type: 2 });
          }
        });
    }
  }
  function closeIcon(param) {
    setError({ type: 0 });
    if (param === "email") {
      setLogInState((prevState) => ({
        ...prevState,
        logInEmail: "",
      }));
    }
  }
  function eyeIcon() {
    setPwVisibility(!pwvisibility);
  }
  return (
    <>
      <LoginInputBox>
        <div>
          <input
            value={loginstate.logInEmail}
            placeholder="이메일"
            className="logInEmail"
            name="logInEmail"
            onChange={inputLogin}
          />
          {error.type === 1 && (
            <div className="inputIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
          {error.type === 2 && (
            <div className="inputIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
        </div>
        {error.type === 1 && (
          <div className="emailError">올바른 이메일이 아닙니다.</div>
        )}
        {error.type === 2 && (
          <div className="emailError">존재하지 않는 계정 입니다.</div>
        )}
        <div>
          <input
            value={loginstate.logInPassword}
            type="logInPassword"
            placeholder="비밀번호"
            name="logInPassword"
            onChange={inputLogin}
            type={pwvisibility ? "text" : "password"}
          />
          {pwvisibility ? (
            <div className="inputIcon" onClick={eyeIcon}>
              <Visiblility />
            </div>
          ) : (
            <div className="inputIcon" onClick={eyeIcon}>
              <VisibilityOff />
            </div>
          )}
        </div>
        {error.type === 3 && (
          <div className="passwordError">비밀번호가 일치하지 않습니다.</div>
        )}
      </LoginInputBox>
      <FooterBox>
        <LoginButton
          button={isLoginBtnActive}
          onClick={btnLogin}
          disabled={isLoginBtnActive}
        >
          로그인
        </LoginButton>
      </FooterBox>
    </>
  );
}
export default LogIn;

const LoginInputBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  div {
    width: 100%;
    position: relative;
    input {
      padding: 13px;
      width: 100%;
      height: 56px;
      background: white;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .inputIcon {
      left: 88%;
      top: 5%;
      position: absolute;
    }
  }
  .emailError,
  .passwordError {
    font-size: 13px;
    color: #e64a19;
    left: 2%;
  }
  .logInEmail {
  }
  .logInPassword {
    margin-top: 5%;
  }
`;
const FooterBox = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;
  p {
    height: 18px;
    font-size: 14px;
    text-align: center;
    color: #424242;
  }
  .terms {
    margin-top: 5%;
    display: flex;
    justify-content: space-evenly;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.08em;
  }
  div {
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    color: #212121;
  }
`;
const LoginButton = styled.button`
  margin-top: 35%;
  height: 48px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  ${({ button }) =>
    button
      ? `background: #BDBDBD;`
      : `
      background: #212121;
  `}
`;
