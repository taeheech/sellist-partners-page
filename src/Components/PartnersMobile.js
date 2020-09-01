import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import Logo from "../Images/Logo";
import Close from "../Images/Close";
import IconRight from "../Images/IconRight";
import Visiblility from "../Images/Visibility";
import VisibilityOff from "../Images/VisibilityOff";
import Partners from "../Images/Partners";

function PartnersMobile(props) {
  const propsFromHomeDesktop = props.props;

  const [activeTab, setActiveTab] = useState(false);
  const [pwvisibility, setPwVisibility] = useState(false);
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const isRegisterBtnActive = !(
    state.name.length > 0 &&
    state.email.length > 0 &&
    state.password.length > 0
  );
  const [error, setError] = useState({ type: 0 });
  const [correct, setCorrect] = useState(false);

  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
  const regPassword = /^[a-z0-9]{8,24}$/;

  function inputRegister(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (regEmail.test(state.email)) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }

  function btnRegister(e) {
    const { email, name, password } = state;
    if (!regEmail.test(email)) {
      setError({ type: 4.5 });
    }
    if (!regName.test(name)) {
      setError({ type: 5 });
    }
    // if (name.length <= 24) {
    //   setError({ type: 5.5 });
    // }
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
          alert("회원가입 성공!");
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
            <InputBox correct={correct} error={error}>
              <div>
                <input
                  placeholder="이메일"
                  className="error correctEmail errorForEmail"
                  name="email"
                  onChange={inputRegister}
                  value={state.email}
                />
                {error.type === 4 && (
                  <div className="inputIcon" onClick={() => closeIcon("email")}>
                    <Close />
                  </div>
                )}
                {error.type === 4.5 && (
                  <div className="inputIcon" onClick={() => closeIcon("email")}>
                    <Close />
                  </div>
                )}
                {correct &&
                  error.type !== 4 &&
                  error.type !== 4.5 &&
                  state.email !== "" && (
                    <div
                      className="inputIcon"
                      onClick={() => closeIcon("email")}
                    >
                      <IconRight />
                    </div>
                  )}
              </div>
              {error.type === 4 && (
                <div className="emailError">
                  이미 사용 중인 이메일 입니다. 다시 시도해 주세요.
                </div>
              )}
              {error.type === 4.5 && (
                <div className="emailError">사용할 수 없는 이메일입니다.</div>
              )}
              <div>
                <input
                  placeholder="이름"
                  className="name error errorForName"
                  name="name"
                  onChange={inputRegister}
                  value={state.name}
                />
                {error.type === 5 && (
                  <div className="inputIcon" onClick={() => closeIcon("name")}>
                    <Close />
                  </div>
                )}
              </div>
              {error.type === 5 && (
                <div className="nameError">
                  이름은 영문 소문자, 숫자, 마침표, 밑줄만을 포함할 수 있습니다.
                </div>
              )}
              {error.type === 5.5 && (
                <div className="nameError">
                  최대 사용 가능한 글자 수는 24입니다.
                </div>
              )}
              <div>
                <input
                  placeholder="비밀번호 (8글자 이상)"
                  type={pwvisibility ? "text" : "password"}
                  className="password error"
                  name="password"
                  onChange={inputRegister}
                  value={state.password}
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
              {error.type === 6 && (
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
            </FooterBox>
          </>
        ) : (
          <LogIn props={propsFromHomeDesktop} />
        )}
      </Content>
    </Container>
  );
}
export default PartnersMobile;

const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;

  @media screen and (min-width: 755px) {
    position: relative;
    width: 420px;
    height: 660px;
    background: #f2f6ff;
    border-radius: 16px;
    margin-left: 10%;
    top: 5%;
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

    .correctEmail {
      ${({ correct }) => correct && `border-bottom: 1px solid green`}
    }

    .errorForEmail {
      ${({ error }) => error.type === 4 && `border-bottom: 1px solid red`}
      ${({ error }) => error.type === 4.5 && `border-bottom: 1px solid red`}
    }

    .errorForName {
      ${({ error }) => error.type === 5 && `border-bottom: 1px solid red`}
      ${({ error }) => error.type === 5.5 && `border-bottom: 1px solid red`}
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
