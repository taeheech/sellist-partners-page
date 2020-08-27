import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../Images/Logo";
import Partners from "../Images/Partners";

function PartnersMobile(props) {
  const [activeTab, setActiveTab] = useState(true);
  const [state, setState] = useState({ name: "", email: "", password: "" });

  function inputRegisterHandler(e) {
    const { name, value } = e.target;
    const exprForName = /^[A-Za-z\u3130-\u318F\uAC00-\uD7AF]{2,24}$/; //한글,영문(대소문), 숫자XX
    const exprForPassword = /^[a-z0-9]{8}$/;

    console.log(exprForName.test(value));

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

  async function signUpHandler() {
    const { email, name, password } = state;
    const api =
      "https://api.buzzikid.com/PartnersApi/member_register.php?email=aaa&password=aa&name=taehee";

    fetch(api, {
      method: "post",
      headers: {
        Authorization: "6cz2w6BC9mgpAhKNmmgcSnpEnJX9w34mF3dzzMyAqzBYkBTfEE",
      },
      body: {
        email,
        name,
        password,
      },
    }).then((res) => console.log(res));
  }

  console.log(state);

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
              <div className={activeTab && "tabStyle"}> 가입 </div>
            </li>
            <li onClick={() => setActiveTab(false)}>
              <div className={activeTab || "tabStyle"}>로그인</div>
            </li>
          </ul>
        </Tab>
        {activeTab ? (
          <>
            <InputBox>
              <input
                placeholder="이메일"
                type="text"
                className="email"
                name="email"
                onChange={inputRegisterHandler}
              />
              <input
                placeholder="이름"
                type="text"
                className="name"
                name="name"
                onChange={inputRegisterHandler}
              />
              <input
                placeholder="비밀번호 (8글자 이상)"
                type="password"
                name="password"
                onChange={inputRegisterHandler}
              />
            </InputBox>
            <FooterBox>
              <p>
                계속 버튼을 클릭하면 서비스 이용약관 및 개인 정보 정책에 동의
                하는 것으로 간주됩니다.
              </p>
              <div className="terms">
                <div onClick={() => props.history.push("/TermsOfService")}>
                  서비스 이용약관
                </div>
                <div onClick={() => props.history.push("/PrivacyPolicy")}>
                  개인 정보 정책
                </div>
              </div>
              <Button onClick={() => signUpHandler()}>계속</Button>
            </FooterBox>
          </>
        ) : (
          <>
            <InputBox>
              <input placeholder="이메일" className="email" />
              <input placeholder="비밀번호" />
            </InputBox>
            <FooterBox>
              <div>비밀번호를 잊으셨나요?</div>
              <Button>로그인</Button>
            </FooterBox>
          </>
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
`;
const Content = styled.div``;
const TopBar = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  height: 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;

  div {
    display: flex;
    justify-content: space-between;
    width: 53px;

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
    width 154px;
    height: 58px;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .partners {
      width:67px;
      height:30px;
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
    justify-content: space-between;

    li {
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.08em;
      width: 154px;
      height: 29px;
      text-align: center;
      color: #757575;

      .tabStyle {
        width: 154px;
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

  input {
    padding: 13px;
    width: 100%;
    height: 56px;
    background: white;
    font-size: 16px;
  }

  .email {
    margin-bottom: 5%;
  }

  .name {
    margin-bottom: 5%;
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

const Button = styled.button`
  margin-top: 10%;
  height: 48px;
  background: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #FFFFFF;
}
`;
