import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../Images/Logo";

function PartnersDesktop() {
  const [activeTab, setActiveTab] = useState(true);
  const [state, setState] = useState({ name: "", email: "", password: "" });

  function inputRegisterHandler(e) {
    const { name, value } = e.target;
    const exprForName = /^[a-z0-9]{2,24}$/;
    const exprForPassword = /^[a-z0-9]{8}$/;
    if (name === "name" && exprForName.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "password" && exprForPassword.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    // setState((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  }

  return (
    <SignUp>
      <LogoWapper>
        <Logo />
      </LogoWapper>
      <Partners>partners</Partners>
      <TextWapper>
        <Register onClick={() => setActiveTab(true)}>
          <div className={activeTab && "tabStyle"}>가입</div>
        </Register>
        <SignIn onClick={() => setActiveTab(false)}>
          <div className={activeTab || "tabStyle"}>로그인</div>
        </SignIn>
      </TextWapper>
      {activeTab ? (
        <>
          <TextInput
            placeholder="이메일"
            name="email"
            className="Email"
            onChange={inputRegisterHandler}
          />
          <EmailExist className="EmailExist">
            이미 존재하는 이메일 입니다.
          </EmailExist>
          <EmailUse className="EmailUse">
            이미 사용중인 이메일 입니다.다시 시도해 주세요.
          </EmailUse>
          <TextInput placeholder="이름" className="name" />
          <TextInput
            placeholder="비밀번호 (8글자 이상)"
            type="password"
            className="password"
          />
        </>
      ) : (
        <>
          <TextInput placeholder="이메일" name="email" />
          <TextInput placeholder="비밀번호 (8글자 이상)" type="password" />
        </>
      )}
      <Agree>계정을 만들면 다음에 동의하는 것입니다 :</Agree>
      <ServiceWapper>
        <Service>서비스 이용약관</Service>
        <Privacy>개인 정보 정책</Privacy>
      </ServiceWapper>
      <Continue>계속</Continue>
    </SignUp>
  );
}

export default PartnersDesktop;

const SignUp = styled.div`
  position: absolute;
  top: 10%;
  width: 448px;
  height: 746px;
  background: #f2f6ff;
  border-radius: 16px;
  margin-left: 15%;
`;

const LogoWapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 64px;
`;

const Partners = styled.div`
  width: 67px;
  height: 30px;
  left: 483px;
  top: 259px;
  margin-left: 147px;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.04em;
  color: #424242;
`;

const Register = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #757575;
  width: 224px;
  padding-bottom: 17px;
  margin-left: 30px;
  cursor: pointer;
  .tabStyle {
    padding-bottom: 17px;
    color: #212121;
    border-bottom: 1px solid rgb(33, 33, 33);
  }
`;

const SignIn = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #757575;
  width: 224px;
  margin-right: 30px;
  cursor: pointer;

  .tabStyle {
    color: #212121;
    padding-bottom: 17px;
    border-bottom: 1px solid rgb(33, 33, 33);
  }
`;

const TextWapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
`;

const TextInput = styled.input`
  width: 400px;
  height: 56px;
  background: #ffffff;
  margin-top: 32px;
  margin-right: 24px;
  margin-left: 24px;
  padding: 20px;
  font-size: 16px;
  &.Email {
    border-bottom: 1px solid #fe0000;
  }
  & ~ .EmailExist {
    display: none;
  }
  & ~ .EmailUse {
    display: none;
  }

  /* &.name {
    border-bottom: 1px solid #fe0000;
    display: inline;
  }
  &.password {
    border-bottom: 1px solid #fe0000;
    display: inline;
  } */
`;

const Agree = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #424242;
  mix-blend-mode: normal;
  margin-top: 66px;
`;

const Service = styled.div`
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #212121;
  margin-top: 17px;
`;

const Privacy = styled.div`
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #212121;
  margin-left: 17px;
  margin-top: 17px;
`;

const ServiceWapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Continue = styled.button`
  height: 48px;
  width: 328px;
  top: calc(50% - 48px / 2);
  background: #bdbdbd;
  border-radius: 4px;
  margin-top: 65px;
  margin-left: 54px;
`;

const EmailExist = styled.div`
  color: #e64a19;
  margin-top: 6px;
  margin-left: 36px;
  display: none;
`;

const EmailUse = styled.div`
  color: #e64a19;
  margin-top: 6px;
  margin-left: 36px;
  display: none;
`;
