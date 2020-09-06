import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import LogIn from "./LogIn";

import Logo from "../../Images/Logo";
import Close from "../../Images/Close";
import Visiblility from "../../Images/Visibility";
import VisibilityOff from "../../Images/VisibilityOff";
import Partners from "../../Images/Partners";

function HomeMobile(props) {
  const propsFromHomeDesktop = props.props;

  const [activeTab, setActiveTab] = useState(false);
  const [pwvisibility, setPwVisibility] = useState(false);
  const [state, setState] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState({ type: 0 });
  const [open, setOpen] = useState(false);

  const emailFilled = state.email.length > 0;
  const nameFilled = state.name.length > 0;
  const pwFilled = state.password.length > 0;
  const isRegisterBtnActive = !(
    state.name.length > 0 &&
    state.email.length > 0 &&
    state.password.length > 0
  );

  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|.|\*]+$/; //숫자나 특수문자( . 제외)는 포함될 수 없습니다.
  const regPassword = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]{8,}$/; //영문대소문,숫자,특수문자,최소8자

  function inputEmail(e) {
    const { name, value } = e.target;
    if (!(name === "email" && regEmail.test(value)) && emailFilled) {
      setError({ type: 4.5 });
    } else {
      setError({ type: 0 });
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function inputName(e) {
    const { name, value } = e.target;
    if (!(name === "name" && regName.test(value))) {
      setError({ type: 5 });
    } else {
      setError({ type: 0 });
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function inputPw(e) {
    const { name, value } = e.target;
    if (!(name === "password" && regPassword.test(value))) {
      setError({ type: 6 });
    } else {
      setError({ type: 0 });
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function btnRegister(e) {
    const { email, name, password } = state;
    if (!regEmail.test(email)) {
      setError({ type: 4.5 });
    }
    if (!regName.test(name)) {
      setError({ type: 5 });
    }
    if (!regPassword.test(password)) {
      setError({ type: 6 });
    }
    if (
      regEmail.test(email) &&
      regName.test(name) &&
      name.length <= 24 &&
      regPassword.test(password)
    ) {
      getFetch();
    }
  }

  function getFetch() {
    const { email, name, password } = state;
    const api = "https://api.buzzikid.com/PartnersApi/member_register.php";
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    fetch(api, {
      method: "post",
      headers: {
        Authorization: "6cz2w6BC9mgpAhKNmmgcSnpEnJX9w34mF3dzzMyAqzBYkBTfEE",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            setActiveTab(false);
          }, 2000);
        }
        if (res.error) {
          if (res.error.type === 1) {
            alert("다시확인");
          }
          if (res.error.type === 2) {
            alert("서버에러");
          }
          if (res.error.type === 3) {
            alert("회원가입 실패");
          }
          if (res.error.type === 4) {
            setError({ type: 4 }); //이미 사용 중인 이메일 입니다. 다시 시도해 주세요.
          }
        }
      });
  }

  function closeIcon(param) {
    setError({ type: 0 });
    if (param === "email") {
      setState((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    if (param === "name") {
      setState((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  }

  function eyeIcon() {
    setPwVisibility(!pwvisibility);
  }

  return (
    <Center>
      <Container>
        <TopBar>
          <div>
            <div className="rectangle"></div>
            <div className="circle"></div>
            <div className="triangle"></div>
          </div>
        </TopBar>
        <Content>
          <Header>
            <div>
              <div className="logo">
                <Logo />
              </div>
              <div className="partners">
                <Partners />
              </div>
            </div>
          </Header>
          <Tab>
            <ul>
              <li onClick={() => setActiveTab(true)}>
                <div className={activeTab && "tabStyle"}> 가 입 </div>
              </li>
              <li onClick={() => setActiveTab(false)}>
                <div className={activeTab || "tabStyle"}>로그인</div>
              </li>
            </ul>
          </Tab>
          {activeTab ? (
            <>
              <InputBox
                error={error}
                emailFilled={emailFilled}
                nameFilled={nameFilled}
                pwFilled={pwFilled}
              >
                <div>
                  <input
                    placeholder="이메일"
                    className="error correctEmail errorForEmail typingEmail"
                    name="email"
                    onChange={inputEmail}
                    value={state.email}
                  />
                  {error.type === 4 && (
                    <div
                      className="inputIcon"
                      onClick={() => closeIcon("email")}
                    >
                      <Close />
                    </div>
                  )}
                  {error.type === 4.5 && emailFilled && (
                    <div
                      className="inputIcon"
                      onClick={() => closeIcon("email")}
                    >
                      <Close />
                    </div>
                  )}
                </div>
                {error.type === 4 && (
                  <div className="emailError">
                    이미 사용 중인 이메일 입니다. 다시 시도해 주세요.
                  </div>
                )}
                {error.type === 4.5 && emailFilled && (
                  <div className="emailError">
                    사용할 수 없는 이메일 형식입니다.
                  </div>
                )}
                <div>
                  <input
                    placeholder="이름"
                    className="name error errorForName typingName"
                    name="name"
                    onChange={inputName}
                    value={state.name}
                  />
                  {error.type === 5 && nameFilled && (
                    <div
                      className="inputIcon"
                      onClick={() => closeIcon("name")}
                    >
                      <Close />
                    </div>
                  )}
                </div>
                {error.type === 5 && nameFilled && (
                  <div className="nameError">
                    숫자나 특수문자( . 제외)는 포함될 수 없습니다.
                  </div>
                )}
                <div>
                  <input
                    placeholder="비밀번호 (8글자 이상)"
                    type={pwvisibility ? "text" : "password"}
                    className="password error errorForPw typingPw"
                    name="password"
                    onChange={inputPw}
                    value={state.password}
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
                {error.type === 6 && pwFilled && (
                  <div className="passwordError">
                    비밀번호는 최소 8자 이상이어야 합니다.
                  </div>
                )}
              </InputBox>
              <FooterBox>
                <p>
                  계속 버튼을 클릭하면 서비스 이용약관 및 개인 정보 정책에 동의
                  하는 것으로 간주됩니다.
                </p>
                <div className="terms">
                  <div
                    onClick={() =>
                      propsFromHomeDesktop.history.push("/TermsOfService")
                    }
                  >
                    서비스 이용약관
                  </div>
                  <div
                    onClick={() =>
                      propsFromHomeDesktop.history.push("/PrivacyPolicy")
                    }
                  >
                    개인 정보 정책
                  </div>
                </div>
                <RegisterButton
                  disabled={isRegisterBtnActive}
                  onClick={() => btnRegister()}
                  button={isRegisterBtnActive}
                >
                  계속
                </RegisterButton>
                <Snackbar
                  anchorOrigin={{
                    vertical: "",
                    horizontal: "center",
                  }}
                  open={open}
                  autoHideDuration={2000}
                >
                  <SnackbarContent
                    message={`가입을 환영합니다 ${state.name} !`}
                    style={{
                      backgroundColor: " #E5E5E5",
                    }}
                  />
                </Snackbar>
              </FooterBox>
            </>
          ) : (
            <LogIn props={propsFromHomeDesktop} />
          )}
        </Content>
      </Container>
    </Center>
  );
}
export default HomeMobile;

const Center = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;

  @media screen and (min-width: 755px) {
    width: 420px;
    height: 660px;
    background: #f2f6ff;
    border-radius: 16px;
    margin-left: 6vw;
  }
`;
const Content = styled.div``;

const TopBar = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  height: 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;

  @media screen and (min-width: 755px) {
    border-radius: 20px;
    padding-top: 7px;
    padding-right: 7px;
    height: 24px;
    background: #f2f6ff;
    display: flex;
    justify-content: flex-end;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 53px;
    @media screen and (min-width: 755px) {
      display: none;
    }

    .rectangle {
      width: 10px;
      height: 10px;
      background: #212121;
    }
    .circle {
      width: 10px;
      height: 10px;
      background: #212121;
      border-radius: 100px;
    }
    .triangle {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 10px solid black;
    }
  }
`;

const Header = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    position: relative;
    width: 154px;
    height: 58px;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .partners {
      width: 67px;
      height: 23px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

const Tab = styled.div`
  margin-top: 10%;
  padding-right: 16px;
  padding-left: 16px;

  ul {
    display: flex;

    li {
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.08em;
      width: 100%;
      height: 29px;
      text-align: center;
      color: #757575;
      cursor: pointer;

      .tabStyle {
        height: 29px;
        border-bottom: 1px solid rgb(33, 33, 33);
        color: #212121;
      }
    }
  }
`;

const InputBox = styled.div`
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
      ${({ error }) => error.type === 4 && `border-bottom: 1px solid red`}
      ${({ error, emailFilled }) =>
        error.type === 4.5 && emailFilled && `border-bottom: 1px solid red`}
    }

    .errorForName {
      ${({ error, nameFilled }) =>
        error.type === 5 && nameFilled && `border-bottom: 1px solid red`}
    }

    .errorForPw {
      ${({ error, pwFilled }) =>
        error.type === 6 && pwFilled && `border-bottom: 1px solid red`}
    }
    .typingEmail {
      ${({ emailFilled, error }) =>
        emailFilled &&
        error.type !== 4 &&
        error.type !== 4.5 &&
        `border-bottom: 1px solid #757575`}
    }

    .typingName {
      ${({ nameFilled, error }) =>
        nameFilled && error.type !== 5 && `border-bottom: 1px solid #757575`}
    }

    .typingPw {
      ${({ error, pwFilled }) =>
        error.type !== 6 && pwFilled && `border-bottom: 1px solid #757575`}
    }
    .inputIcon {
      left: 88%;
      bottom: 5%;
      position: absolute;
    }
  }

  .emailError,
  .nameError,
  .passwordError {
    font-size: 13px;
    color: #e64a19;
    left: 2%;
  }

  .name {
    margin-top: 5%;
  }

  .password {
    margin-top: 5%;
  }
`;

const FooterBox = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  p {
    height: 10px;
    font-size: 14px;
    text-align: center;
    color: #424242;
    margin-bottom: 30px;
  }
  div {
    cursor: pointer;
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
    line-height: 10px;
    font-weight: bold;
    color: #212121;
  }
`;

const RegisterButton = styled.button`
  margin-top: 10%;
  height: 48px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  cursor: pointer;
  ${({ button }) =>
    button
      ? `background: #bdbdbd;`
      : `
background: #212121;
`};
`;
