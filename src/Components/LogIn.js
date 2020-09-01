import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "../Images/Close";
import IconRight from "../Images/IconRight";
import Visiblility from "../Images/Visibility";
import VisibilityOff from "../Images/VisibilityOff";

function LogIn(props) {
  const propsFromPartnersMobile = props.props;

  const [loginstate, setLogInState] = useState({
    logInEmail: "",
    logInPassword: "",
  });
  const { logInEmail, logInPassword } = loginstate;
  const isLoginBtnActive = !(logInEmail.length > 0 && logInPassword.length > 0);
  const [error, setError] = useState({ type: 0 });
  const [correct, setCorrect] = useState(false);
  const [pwvisibility, setPwVisibility] = useState(false);
  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  function inputLogin(e) {
    const { name, value } = e.target;
    setLogInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (logInEmail === "") {
      setCorrect(false);
      setError({ type: 0 });
    }

    if (regEmail.test(logInEmail)) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }

  function btnLogin(e) {
    const { logInEmail, logInPassword } = loginstate;
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
      setCorrect(false);
    }
  }

  function eyeIcon() {
    setPwVisibility(!pwvisibility);
  }

  return (
    <>
      <LoginInputBox correct={correct} error={error}>
        <div>
          <input
            value={loginstate.logInEmail}
            placeholder="이메일"
            className="logInEmail correctEmail errorForEmail"
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
          {correct &&
            error.type !== 1 &&
            error.type !== 2 &&
            logInEmail !== "" && (
              <div className="inputIcon" onClick={() => closeIcon("email")}>
                <IconRight />
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
      <ForgetPw
        onClick={() => propsFromPartnersMobile.history.push("/PickNewPwPage")}
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

    .correctEmail {
      ${({ correct }) => correct && `border-bottom: 1px solid green`}
    }

    .errorForEmail {
      ${({ error }) => error.type === 1 && `border-bottom: 1px solid red`}
      ${({ error }) => error.type === 2 && `border-bottom: 1px solid red`}
    }

    .inputIcon {
      left: 88%;
      top: 5%;
      position: absolute;
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
