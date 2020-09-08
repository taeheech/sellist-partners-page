import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import { logInApi, TOKEN } from "../../Config/urls";
import { footerBox } from "../../Config/commonStyles";

import Close from "../../Images/Close";
import Visiblility from "../../Images/Visibility";
import VisibilityOff from "../../Images/VisibilityOff";

function LogIn(props) {
  const propsFromHome = props.props;

  const [loginstate, setLogInState] = useState({
    logInEmail: "",
    logInPassword: "",
  });
  const { logInEmail, logInPassword } = loginstate;
  const isLoginBtnActive = !(logInEmail.length > 0 && logInPassword.length > 0);
  const emailFilled = logInEmail.length > 0;
  const pwFilled = logInPassword.length > 0;

  const [error1, setError1] = useState(false); //올바른 이메일이 아닙니다.
  const [error2, setError2] = useState(false); //계정존재 XX
  const [error3, setError3] = useState(false); //비밀번호 일치 X

  const [pwvisibility, setPwVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  function inputLogin(e) {
    const { name, value } = e.target;
    setLogInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value === "") {
      setError1(false);
      setError2(false);
      setError3(false);
    }
  }

  function btnLogin(e) {
    const { logInEmail, logInPassword } = loginstate;
    const formData = new FormData();
    formData.append("email", logInEmail);
    formData.append("password", logInPassword);
    if (!regEmail.test(logInEmail)) {
      setError1(true);
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
            //로그인성공
            localStorage.setItem("access_token", res.data.access_token);
            setOpen(true); //snackbar
            setUserName(res.data.name);
          } else if (res.error.type === 3) {
            setError2(true); //계정존재 XX
          } else if (res.error.type === 4) {
            setError3(true); //비밀번호 일치 X
          }
        });
    }
  }

  function closeIcon(param) {
    if (param === "email") {
      setLogInState((prevState) => ({
        ...prevState,
        logInEmail: "",
      }));
      setError1(false);
      setError2(false);
    }
  }

  function eyeIcon() {
    setPwVisibility(!pwvisibility);
  }

  return (
    <>
      <LoginInputBox
        error1={error1}
        error2={error2}
        error3={error3}
        emailFilled={emailFilled}
        pwFilled={pwFilled}
      >
        <div className="emailBox logInEmail ">
          <input
            value={loginstate.logInEmail}
            placeholder="이메일"
            className="correctEmail errorForEmail typingEmail"
            name="logInEmail"
            onChange={inputLogin}
          />
          {error1 && (
            <div className="closeIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
          {error2 && (
            <div className="closeIcon" onClick={() => closeIcon("email")}>
              <Close />
            </div>
          )}
        </div>
        {error1 && <div className="emailError">올바른 이메일이 아닙니다.</div>}
        {error2 && <div className="emailError">존재하지 않는 계정 입니다.</div>}
        <div className="pwBox logInPassword ">
          <input
            value={loginstate.logInPassword}
            placeholder="비밀번호"
            className="typingPw errorForPw"
            name="logInPassword"
            onChange={inputLogin}
            type={pwvisibility ? "text" : "password"}
          />
          {pwFilled && pwvisibility && (
            <div className="eyeIcon" onClick={eyeIcon}>
              <Visiblility />
            </div>
          )}
          {pwFilled && !pwvisibility && (
            <div className="eyeIcon" onClick={eyeIcon}>
              <VisibilityOff />
            </div>
          )}
        </div>
        {error3 && (
          <div className="passwordError">비밀번호가 일치하지 않습니다.</div>
        )}
      </LoginInputBox>
      <ForgetPw
        onClick={() => propsFromHome.history.push("/ForgotPasswordPage")}
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
          autoHideDuration={3000}
        >
          <SnackbarContent
            message={`${userName} 님, 로그인을 환영합니다!`}
            style={{
              backgroundColor: "#757575",
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

  .emailBox {
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
      ${({ error1 }) => error1 && `border-bottom: 1px solid red`}
      ${({ error2 }) => error2 && `border-bottom: 1px solid red`}
    }
    .typingEmail {
      ${({ emailFilled, error1, error2 }) =>
        emailFilled && !error1 && !error2 && `border-bottom: 1px solid #757575`}
    }
    .closeIcon {
      left: 88%;
      top: 5%;
      position: absolute;
    }

  }
  .pwBox{
    width: 100%;
    height: 56px;
    position: relative;
    
    input {
      padding: 13px;
      width: 100%;
      height: 56px;
      background: white;
      font-size: 16px;
    }
    .errorForPw {
      ${({ error3 }) => error3 && `border-bottom: 1px solid red`}
    }
    .typingPw {
      ${({ pwFilled, error3 }) =>
        pwFilled && !error3 && `border-bottom: 1px solid #757575`}
    }

    .eyeIcon {
      left: 88%;
      top: 6%;
      position: absolute;
    }
  }
  .logInPassword {
    ${({ error1, error2 }) => !error1 && !error2 && `margin-top: 5%;`}
    ${({ error1, emailFilled }) => error1 && emailFilled && `margin-top: 0.5%;`}
    ${({ error2, emailFilled }) => error2 && emailFilled && `margin-top: 0.5%;`}

    ${({ error3 }) => !error3 && `margin-bottom: 5%;`}
    ${({ error3, pwFilled }) => error3 && pwFilled && `margin-bottom: 0.5%;`}
  }

  .emailError,
  .passwordError {
    // top: -16px;
    font-size: 13px;
    color: #e64a19;
    left: 2%;
  }
`;

const FooterBox = footerBox;

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
