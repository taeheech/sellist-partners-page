import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import { logInApi, TOKEN } from "../../Config/urls";

import Close from "../../Images/Close";
import Visiblility from "../../Images/Visibility";
import VisibilityOff from "../../Images/VisibilityOff";

function LogIn(props) {
  const propsFromPartnersMobile = props.props;

  const [loginstate, setLogInState] = useState({
    logInEmail: "",
    logInPassword: "",
  });
  const { logInEmail, logInPassword } = loginstate;
  const isLoginBtnActive = !(logInEmail.length > 0 && logInPassword.length > 0);
  const emailFilled = logInEmail.length > 0;
  const pwFilled = logInPassword.length > 0;

  const [error, setError] = useState({ type: 0 });
  const [pwvisibility, setPwVisibility] = useState(false);
  const [open, setOpen] = useState(false);

  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  function inputLogin(e) {
    const { name, value } = e.target;
    setLogInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value === "") {
      setError({ type: 0 });
    }
  }

  function btnLogin(e) {
    const { logInEmail, logInPassword } = loginstate;
    // const api = "https://api.buzzikid.com/PartnersApi/member_login.php";
    const formData = new FormData();
    formData.append("email", logInEmail);
    formData.append("password", logInPassword);
    if (!regEmail.test(logInEmail)) {
      setError({ type: 1 });
    } else {
      fetch(logInApi, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return res;
        })
        .then((res) => {
          if (res.success === 1) {
            localStorage.setItem("access_token", res.data.access_token);
            setOpen(true);
          } else if (res.error.type === 3) {
            setError({ type: 3 });
          } else if (res.error.type === 4) {
            setError({ type: 4 });
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
      <LoginInputBox
        error={error}
        emailFilled={emailFilled}
        pwFilled={pwFilled}
      >
        <div>
          <input
            value={loginstate.logInEmail}
            placeholder="이메일"
            className="logInEmail correctEmail errorForEmail typingEmail"
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
          {error.type === 3 && (
            <div className="inputIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
        </div>
        {error.type === 1 && (
          <div className="emailError">올바른 이메일이 아닙니다.</div>
        )}
        {error.type === 3 && (
          <div className="emailError">존재하지 않는 계정 입니다.</div>
        )}
        <div>
          <input
            value={loginstate.logInPassword}
            placeholder="비밀번호"
            className="logInPassword typingPw errorForPw"
            name="logInPassword"
            onChange={inputLogin}
            type={pwvisibility ? "text" : "password"}
          />
          {pwFilled && pwvisibility && (
            <div className="inputIcon" onClick={eyeIcon}>
              <Visiblility />
            </div>
          )}
          {pwFilled && !pwvisibility && (
            <div className="inputIcon" onClick={eyeIcon}>
              <VisibilityOff />
            </div>
          )}
        </div>
        {error.type === 4 && (
          <div className="passwordError">비밀번호가 일치하지 않습니다.</div>
        )}
      </LoginInputBox>
      <ForgetPw
        onClick={() =>
          propsFromPartnersMobile.history.push("/ForgotPasswordPage")
        }
      >
        비밀번호를 잊으셨나요?
      </ForgetPw>
      <FooterBox>
        <LoginButton
          button={isLoginBtnActive}
          onClick={btnLogin}
          disabled={isLoginBtnActive}
        >
          로그인
        </LoginButton>
        <Snackbar
          anchorOrigin={{
            vertical: "",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={2000}
        >
          <SnackbarContent
            message={`로그인을 환영합니다 !`}
            style={{
              backgroundColor: " #E5E5E5",
            }}
          />
        </Snackbar>
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
    }

    .errorForEmail {
      ${({ error }) => error.type === 1 && `border-bottom: 1px solid red`}
      ${({ error }) => error.type === 3 && `border-bottom: 1px solid red`}
    }
    .errorForPw {
      ${({ error }) => error.type === 4 && `border-bottom: 1px solid red`}
    }

    .typingEmail {
      ${({ emailFilled, error }) =>
        emailFilled && error.type === 0 && `border-bottom: 1px solid #757575`}
    }

    .typingPw {
      ${({ pwFilled, error }) =>
        pwFilled && error.type === 0 && `border-bottom: 1px solid #757575`}
    }

    .inputIcon {
      left: 88%;
      top: 5%;
      position: absolute;
    }

    .logInEmail {
      margin-bottom: 20px;
    }

    .logInPassword {
      margin-bottom: 20px;
    }
  }

  .emailError,
  .passwordError {
    top: -16px;
    font-size: 13px;
    color: #e64a19;
    left: 2%;
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
  margin-top: 25.4%;
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

const ForgetPw = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
`;
